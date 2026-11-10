const AK = KEY + '_a', app = document.getElementById('app'), topEl = document.getElementById('top'), dlg = document.getElementById('dlg');
const $ = (s, r = document) => r.querySelector(s);
const adm = () => { const u = getUser(localStorage.getItem(AK)); return u && u.role === 'admin' ? u : null; };
let tab = 'users', q = '';
function toast(m, bad) { const t = $('#toast'); t.textContent = m; t.className = 'toast show' + (bad ? ' bad' : ''); clearTimeout(toast.t); toast.t = setTimeout(() => t.className = 'toast', 3500); }
const logit = t => { db.log.unshift({ t: Date.now(), text: adm().name + ' ' + t }); saveDB(); };

function render() {
  const a = adm();
  if (!a) {
    topEl.innerHTML = `<a class="brand" href="#">${APP} Admin</a><span class="sp"></span><a class="btn ghost small" href="index.html">Back to forum</a>`;
    app.innerHTML = `<section class="card narrow"><h1>Admin login</h1><form id="f" novalidate><label for="e">Email</label><input id="e" type="email"><label for="p">Password</label><input id="p" type="password"><p class="err" id="err" role="alert"></p><button class="btn primary">Log in</button></form><p class="hint">Demo: admin@example.com / Admin123!</p></section>`;
    $('#f').onsubmit = e => { e.preventDefault(); const u = db.users.find(x => x.email === $('#e').value.trim().toLowerCase() && x.pass === $('#p').value && x.role === 'admin'); if (!u) return $('#err').textContent = 'Email or password is incorrect, or this is not an admin account.'; localStorage.setItem(AK, u.id); render(); };
    return;
  }
  const open = db.reports.filter(r => r.status === 'open').length;
  topEl.innerHTML = `<a class="brand" href="#">${APP} Admin</a><nav class="tabs" aria-label="Admin">${[['users', 'Users'], ['reports', 'Reports' + (open ? ' (' + open + ')' : '')], ['log', 'Activity log']].map(([k, l]) => `<a href="#" data-tab="${k}" ${tab === k ? 'class="on" aria-current="page"' : ''}>${l}</a>`).join('')}</nav><button class="btn ghost small" id="lo">Log out</button>`;
  $('#lo').onclick = () => { localStorage.removeItem(AK); render(); };
  topEl.querySelectorAll('[data-tab]').forEach(x => x.onclick = e => { e.preventDefault(); tab = x.dataset.tab; render(); });
  app.innerHTML = tab === 'users' ? users() : tab === 'reports' ? reports() : log();
  const s = $('#us'); if (s) s.oninput = () => { q = s.value; const p = s.selectionStart; render(); const n = $('#us'); n.focus(); n.setSelectionRange(p, p); };
}
function users() {
  const l = q.toLowerCase(), list = db.users.filter(u => !l || u.name.toLowerCase().includes(l) || u.email.includes(l));
  return `<h1>Users</h1><label class="sr" for="us">Search users</label><input id="us" type="search" placeholder="Search by name or email" value="${esc(q)}" style="margin-bottom:.75rem">` +
    list.map(u => `<div class="card"><div class="split"><div><b>${esc(u.name)}</b> <span class="badge">${u.role === 'admin' ? 'Admin' : u.status}</span><p class="meta">${esc(u.email)}${u.warning ? ' · warned' : ''}${u.reason ? ' · ' + esc(u.reason) : ''}</p></div>
    ${u.role === 'admin' ? '' : `<div class="acts"><button class="btn small" data-u="warn" data-id="${u.id}">Warn</button>${u.status === 'active' ? `<button class="btn small" data-u="suspend" data-id="${u.id}">Suspend</button><button class="btn small danger" data-u="ban" data-id="${u.id}">Ban</button>` : `<button class="btn small primary" data-u="reinstate" data-id="${u.id}">Reinstate</button>`}<button class="btn small danger" data-u="delete" data-id="${u.id}">Delete</button></div>`}</div></div>`).join('') || '<p class="hint">No users match.</p>';
}
function target(r) {
  if (r.type === 'user') { const u = getUser(r.target); return u ? { text: u.name, author: u.id } : null; }
  const t = db.threads.find(x => x.id === r.threadId); if (!t) return null;
  if (r.type === 'thread') return t.removed ? null : { text: t.title + ': ' + t.body, author: t.author, obj: t };
  const c = findC(t.comments, r.target); return c && !c.removed ? { text: c.body, author: c.author, obj: c } : null;
}
function reports() {
  const rs = db.reports.slice().sort((a, b) => (a.status === 'open' ? 0 : 1) - (b.status === 'open' ? 0 : 1) || b.date - a.date);
  return `<h1>Reports</h1>` + (rs.map(r => { const t = target(r), o = r.status === 'open'; return `<div class="card ${o ? '' : 'dim'}"><p class="meta"><span class="badge">${r.type}</span> reported by ${esc(nameOf(r.reporter))} · ${ago(r.date)} · ${o ? 'Open' : esc(r.status)}</p><p><b>${esc(r.reason)}</b>${r.details ? ': ' + esc(r.details) : ''}</p><blockquote style="margin:.4rem 0;padding-left:.7rem;border-left:3px solid var(--line)">${t ? esc(t.text.slice(0, 200)) : '<i>Content no longer available</i>'}</blockquote>
  ${o ? `<div class="acts"><button class="btn small" data-r="dismiss" data-id="${r.id}">Dismiss</button>${t && r.type !== 'user' ? `<button class="btn small danger" data-r="remove" data-id="${r.id}">Remove content</button>` : ''}${t ? `<button class="btn small" data-u="warn" data-id="${t.author}" data-rep="${r.id}">Warn user</button><button class="btn small danger" data-u="suspend" data-id="${t.author}" data-rep="${r.id}">Suspend user</button>` : ''}</div>` : ''}</div>`; }).join('') || '<div class="card"><p>No reports. All clear.</p></div>');
}
const log = () => `<h1>Activity log</h1>` + (db.log.map(l => `<div class="card"><p>${esc(l.text)}</p><p class="meta">${new Date(l.t).toLocaleString()}</p></div>`).join('') || '<p class="hint">No moderation actions yet.</p>');

function apply(u, type, reason, rep) {
  if (type === 'warn') u.warning = reason;
  if (type === 'suspend') { u.status = 'suspended'; u.reason = reason; }
  if (type === 'ban') { u.status = 'banned'; u.reason = reason; }
  if (type === 'reinstate') { u.status = 'active'; u.reason = ''; }
  const name = u.name; if (type === 'delete') db.users = db.users.filter(x => x !== u);
  if (rep) { const r = db.reports.find(x => x.id === rep); if (r) r.status = 'actioned: ' + type; }
  logit(type + (type === 'warn' ? 'ed ' : type === 'delete' ? 'd ' : 'ed ') + name + (reason ? ' (' + reason + ')' : '')); toast('Done: ' + type + ' ' + name + '.'); render();
}
app.addEventListener('click', e => {
  const b = e.target.closest('[data-u],[data-r]'); if (!b) return; const id = b.dataset.id;
  if (b.dataset.r) {
    const r = db.reports.find(x => x.id === id), t = target(r);
    if (b.dataset.r === 'remove' && t) { t.obj.removed = true; r.status = 'content removed'; logit('removed reported ' + r.type); } else { r.status = 'dismissed'; logit('dismissed a report'); }
    saveDB(); toast('Report updated.'); return render();
  }
  const u = getUser(id), type = b.dataset.u, rep = b.dataset.rep;
  if (!u) return toast('That user no longer exists.', 1);
  if (type === 'reinstate') return apply(u, type, '', rep);
  if (type === 'delete') { if (confirm('Permanently delete ' + u.name + '?')) apply(u, type, '', rep); return; }
  dlg.innerHTML = `<form id="af"><h2>${type[0].toUpperCase() + type.slice(1)} ${esc(u.name)}</h2><label for="ar">Reason (shown to the user)</label><select id="ar">${RULES.map(r => `<option>${esc(r[0])}</option>`).join('')}</select><p class="err" id="ae"></p><div class="row"><button type="button" class="btn" id="ax">Cancel</button><button class="btn primary">Confirm</button></div></form>`;
  dlg.showModal(); $('#ax').onclick = () => dlg.close();
  $('#af').onsubmit = ev => { ev.preventDefault(); const rs = $('#ar').value; dlg.close(); apply(u, type, rs, rep); };
});
render();
