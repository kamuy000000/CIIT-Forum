const app = document.getElementById('app'), dlg = document.getElementById('dlg');
const SK = KEY + '_s';
const $ = (s, r = document) => r.querySelector(s);
const cur = () => { const u = getUser(localStorage.getItem(SK)); return u && u.role === 'user' && u.status === 'active' ? u : null; };
const go = h => { location.hash = h; };
const toggle = (a, v) => { const i = a.indexOf(v); i < 0 ? a.push(v) : a.splice(i, 1); };
const thr = id => db.threads.find(t => t.id === id);
const refresh = () => { const y = scrollY; route(); scrollTo(0, y); };
function toast(m, bad) { const t = $('#toast'); t.textContent = m; t.className = 'toast show' + (bad ? ' bad' : ''); clearTimeout(toast.t); toast.t = setTimeout(() => t.className = 'toast', 3500); }
const closeBtn = () => dlg.close();
const NEED = { nt: 'start a thread', like: 'like posts', rt: 'reply to comments', rp: 'report content', join: 'join groups', leave: 'leave groups', int: 'mark events as interested' };
function askLogin(what) {
    dlg.innerHTML = `<h2>Log in to ${what}</h2><p>You can read posts and comments without an account. Log in or sign up to take part.</p>
    <div class="row"><button type="button" class="btn" id="lx">Not now</button><a class="btn" href="signup.html">Sign up</a><a class="btn primary" href="login.html">Log in</a></div>`;
    dlg.showModal(); $('#lx').onclick = closeBtn;
}
function vGate(r) {
    app.innerHTML = `<div class="card narrow"><h1>Log in to view ${r === 'messages' ? 'your messages' : 'profiles'}</h1><p>Posts, groups and events are open to everyone. Profiles and messages are for members only.</p>
    <div class="row"><a class="btn" href="signup.html">Sign up</a><a class="btn primary" href="login.html">Log in</a></div></div>`;
}

function header() {
    const me = cur(), h = location.hash || '#/feed';
    document.body.classList.remove('open');
    document.body.classList.toggle('is-guest', !me);
    $('#auth-actions').hidden = !!me;
    $('#join-cta').hidden = !!me;
    $('#pp-card').hidden = !me;
    $('#lo').hidden = !me;
    $('#li').hidden = !!me;
    $('#su').hidden = !!me;
    document.querySelectorAll('[data-user-only]').forEach(el => el.hidden = !me);
    if (me) $('#profile-link').href = '#/profile/' + me.id;
    document.querySelectorAll('[data-nav]').forEach(a => {
        const on = h.startsWith('#/' + a.dataset.nav);
        a.classList.toggle('on', on);
        on ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current');
    });
    $('#sg-title').textContent = me ? 'Suggested groups' : 'Explore groups';
    const sg = db.groups.filter(g => !me || !me.groups.includes(g.id)).slice(0, 3);
    $('#sg').innerHTML = sg.map(g => `<div class="split"><a href="#/group/${g.id}">${esc(g.name)}</a>${me ? `<button class="btn small" data-a="join" data-id="${g.id}">Join</button>` : ''}</div>`).join('') || '<p class="hint">You have joined every group.</p>';
    if (!me) return;
    const pp = db.users.filter(u => u.role === 'user' && u.status === 'active' && u.id !== me.id && !me.blocked.includes(u.id))
        .map(u => ({ u, s: u.showInterests ? u.interests.filter(i => me.interests.includes(i)) : [] }))
        .sort((a, b) => b.s.length - a.s.length).slice(0, 3);
    $('#pp').innerHTML = pp.map(({ u, s }) => `<div style="margin:.4rem 0"><a href="#/profile/${u.id}">${esc(u.name)}</a><p class="meta">${s.length ? 'Shares ' + esc(s.join(', ')) : (esc(u.course) || 'Fellow student')}</p></div>`).join('') || '<p class="hint">No suggestions yet.</p>';
}

function route() {
    const p = location.hash.split('/'), r = p[1] || '', arg = decodeURIComponent(p.slice(2).join('/')), me = cur();
    header();
    document.title = APP;
    if (!me && (r === 'profile' || r === 'messages')) return vGate(r);
    const v = { feed: () => vFeed(), group: () => vFeed(arg), groups: vGroups, thread: () => vThread(arg), events: vEvents, profile: () => vProfile(arg), messages: () => vMsgs(arg), search: () => vSearch(arg) };
    (v[r] || (() => vFeed()))();
}

const vis = t => { const me = cur(); return !t.removed && !(me && me.blocked.includes(t.author)); };
function card(t) {
  const g = db.groups.find(x => x.id === t.group);
  return `<article class="card"><a class="tl" href="#/thread/${t.id}"><h3>${esc(t.title)}</h3></a><p class="snip">${esc(t.body.slice(0, 140))}${t.body.length > 140 ? '…' : ''}</p>
  <p class="meta"><span class="badge">${esc(g ? g.name : 'General')}</span> ${esc(nameOf(t.author))} · ${ago(t.date)} · ${t.likes.length} likes · ${t.comments.filter(c => !c.removed).length} comments</p></article>`;
}
function vFeed(gid) {
  const me = cur(), g = gid && db.groups.find(x => x.id === gid);
  if (gid && !g) return go('#/groups');
  const list = db.threads.filter(t => vis(t) && (!g || t.group === gid)).sort((a, b) => b.date - a.date);
  const ev = db.events.filter(e => e.date >= new Date().toISOString().slice(0, 10)).sort((a, b) => a.date.localeCompare(b.date))[0];
  app.innerHTML = (me && me.warning ? `<div class="warn" role="alert"><b>Warning from the admin team:</b> ${esc(me.warning)} <a href="rules.html" target="_blank">Read the rules</a><div class="row"><button class="btn small" data-a="ack">I understand</button></div></div>` : '') +
    `<div class="bar"><h1>${g ? esc(g.name) : 'Latest threads'}</h1><button class="btn primary" data-a="nt" data-g="${gid || ''}">New thread</button></div>` +
    (g ? `<p>${esc(g.desc)}</p>` : '') +
    (ev && !g ? `<a class="card" style="display:block;text-decoration:none;color:inherit" href="#/events"><b>Next event:</b> ${esc(ev.name)} · ${esc(ev.date)} at ${esc(ev.time)}, ${esc(ev.place)}</a>` : '') +
    (list.length ? list.map(card).join('') : '<div class="card"><p>You\'re all caught up. Be the first to start a thread.</p></div>');
}
function openComposer(gid) {
  const me = cur(), d = db.drafts[me.id] || {}, has = d.title || d.body;
  dlg.innerHTML = `<form id="cf"><h2>New thread</h2>${has ? '<p class="note">Draft restored.</p>' : ''}
  <label for="cg">Group</label><select id="cg">${db.groups.map(g => `<option value="${g.id}" ${g.id === (d.group || gid || 'g1') ? 'selected' : ''}>${esc(g.name)}</option>`).join('')}</select>
  <label for="ct">Title</label><input id="ct" maxlength="120" value="${esc(d.title || '')}">
  <label for="cb">Message</label><textarea id="cb" rows="6" maxlength="2000">${esc(d.body || '')}</textarea>
  <p class="hint">By posting you agree to the <a href="rules.html" target="_blank">Community Rules</a>.</p>
  <p class="status" id="cs" role="status"></p><p class="err" id="ce" role="alert"></p>
  <div class="row"><button type="button" class="btn" id="cx">Close</button><button type="button" class="btn danger" id="cd">Discard draft</button><button class="btn primary" id="cp">Post</button></div></form>`;
  dlg.showModal();
  const sd = () => { db.drafts[me.id] = { group: $('#cg').value, title: $('#ct').value, body: $('#cb').value }; saveDB(); $('#cs').textContent = 'Draft saved'; };
  ['#cg', '#ct', '#cb'].forEach(s => $(s).oninput = sd);
  $('#cx').onclick = closeBtn;
  $('#cd').onclick = () => { if (confirm('Discard this draft?')) { delete db.drafts[me.id]; saveDB(); dlg.close(); toast('Draft discarded.'); } };
  $('#cf').onsubmit = async e => {
    e.preventDefault();
    const title = $('#ct').value.trim(), body = $('#cb').value.trim();
    if (title.length < 3) return $('#ce').textContent = 'Add a title with at least 3 characters.';
    if (!body) return $('#ce').textContent = 'Write a message before posting.';
    $('#ce').textContent = ''; $('#cp').disabled = true; $('#cs').textContent = 'Posting…';
    await sleep(700);
    if (db.offline) { $('#cp').disabled = false; $('#cp').textContent = 'Retry'; $('#cs').innerHTML = '<span class="err">Couldn\'t post. Your draft is saved. Check your connection and retry.</span>'; return; }
    const t = { id: 't' + sid(), title, body, author: me.id, group: $('#cg').value, date: Date.now(), likes: [], comments: [] };
    db.threads.push(t); delete db.drafts[me.id]; saveDB(); dlg.close(); toast('Posted.'); go('#/thread/' + t.id);
  };
}

function cmHtml(c, t, rep) {
  if (c.removed) return '';
  const me = cur(); if (me && me.blocked.includes(c.author)) return '';
  return `<div class="cm"><p class="meta"><a href="#/profile/${c.author}">${esc(nameOf(c.author))}</a> · ${ago(c.date)}</p><p>${esc(c.body)}</p>
  <div class="acts">${rep ? '' : `<button class="lnk" data-a="rt" data-id="${c.id}">Reply</button>`}<button class="lnk" data-a="rp" data-t="comment" data-id="${c.id}" data-th="${t.id}">Report</button>${me && c.author === me.id ? `<button class="lnk" data-a="dc" data-id="${c.id}" data-th="${t.id}">Delete</button>` : ''}</div>
  ${rep ? '' : `<div class="replies">${c.replies.map(r => cmHtml(r, t, 1)).join('')}</div><form class="rf" hidden data-id="${c.id}" data-th="${t.id}"><label class="sr" for="r${c.id}">Your reply</label><textarea id="r${c.id}" rows="2" maxlength="1000"></textarea><button class="btn small primary">Add reply</button></form>`}</div>`;
}
function vThread(id) {
  const me = cur(), t = thr(id);
  if (!t || t.removed) { app.innerHTML = '<div class="card"><h1>Thread not found</h1><p>It may have been deleted or removed.</p><a class="btn" href="#/feed">Back to home</a></div>'; return; }
  const g = db.groups.find(x => x.id === t.group), liked = !!me && t.likes.includes(me.id), mine = !!me && t.author === me.id;
  app.innerHTML = `<p><a href="#/${g ? 'group/' + g.id : 'feed'}">← Back to ${g ? esc(g.name) : 'home'}</a></p>
  <article class="card"><span class="badge">${esc(g ? g.name : 'General')}</span><h1>${esc(t.title)}</h1>
  <p class="meta"><a href="#/profile/${t.author}">${esc(nameOf(t.author))}</a> · ${ago(t.date)}${t.edited ? ' · edited' : ''}</p><p style="white-space:pre-wrap">${esc(t.body)}</p>
  <div class="acts"><button class="btn small" data-a="like" data-id="${t.id}" aria-pressed="${liked}">${liked ? '♥ Liked' : '♡ Like'} (${t.likes.length})</button>
  <button class="lnk" data-a="rp" data-t="thread" data-id="${t.id}" data-th="${t.id}">Report</button>
  ${mine ? `<button class="lnk" data-a="et" data-id="${t.id}">Edit</button><button class="lnk" data-a="dt" data-id="${t.id}">Delete</button>` : ''}</div></article>
  ${me ? `<form id="cmf" class="card"><label for="cmt">Add a comment</label><textarea id="cmt" rows="3" maxlength="1000"></textarea><p class="err" id="cme" role="alert"></p><button class="btn primary">Comment</button></form>` : `<div class="card"><h2>Join the discussion</h2><p>Log in to comment, like or report. You can read everything without an account.</p><div class="row"><a class="btn" href="signup.html">Sign up</a><a class="btn primary" href="login.html">Log in</a></div></div>`}
  <h2>${t.comments.filter(c => !c.removed).length} comments</h2>${t.comments.map(c => cmHtml(c, t)).join('') || '<p class="hint">No comments yet. Start the conversation.</p>'}`;
  if (me) $('#cmf').onsubmit = e => { e.preventDefault(); const v = $('#cmt').value.trim(); if (!v) return $('#cme').textContent = 'Write something before commenting.'; t.comments.push({ id: sid(), author: me.id, body: v, date: Date.now(), replies: [] }); saveDB(); toast('Comment posted.'); refresh(); };
}
function openReport(type, id, th) {
  dlg.innerHTML = `<form id="rf2"><h2>Report ${type}</h2><p class="hint">Reports are reviewed by the admin team.</p>
  <label for="rr">Which rule does this break?</label><select id="rr">${RULES.map(r => `<option>${esc(r[0])}</option>`).join('')}<option>Something else</option></select>
  <label for="rd">Details (optional)</label><textarea id="rd" rows="3" maxlength="300"></textarea>
  <div class="row"><button type="button" class="btn" id="rx">Cancel</button><button class="btn primary">Send report</button></div></form>`;
  dlg.showModal(); $('#rx').onclick = closeBtn;
  $('#rf2').onsubmit = e => {
    e.preventDefault(); const me = cur();
    if (db.reports.some(r => r.reporter === me.id && r.target === id && r.status === 'open')) { dlg.close(); return toast('You already reported this. The admins will review it.', 1); }
    db.reports.push({ id: sid(), type, target: id, threadId: th, reporter: me.id, reason: $('#rr').value, details: $('#rd').value.trim(), date: Date.now(), status: 'open' });
    saveDB(); dlg.close(); toast('Report received. Thank you for helping keep the forum safe.');
  };
}

function vGroups() {
  const me = cur();
  app.innerHTML = `<h1>Interest groups</h1><p>Open to every course and year level.</p><div class="grid two">${db.groups.map(g => { const j = !!me && me.groups.includes(g.id), n = db.users.filter(u => u.groups.includes(g.id)).length; return `<div class="card"><h3>${esc(g.name)}</h3><p>${esc(g.desc)}</p><p class="meta">${n} members · ${db.threads.filter(t => t.group === g.id && !t.removed).length} threads</p><div class="row"><a class="btn small" href="#/group/${g.id}">Open</a><button class="btn small ${j ? '' : 'primary'}" data-a="${j ? 'leave' : 'join'}" data-id="${g.id}">${j ? 'Leave group' : 'Join group'}</button></div></div>`; }).join('')}</div>`;
}
function vEvents() {
  const me = cur(), ev = db.events.slice().sort((a, b) => a.date.localeCompare(b.date));
  app.innerHTML = `<h1>Upcoming events</h1>${ev.map(e => { const i = !!me && e.interested.includes(me.id); return `<article class="card"><h3>${esc(e.name)}</h3><p class="meta">${esc(e.date)} · ${esc(e.time)} · ${esc(e.place)}<br>Organized by ${esc(e.organizer)}</p><p>${esc(e.desc)}</p><div class="split"><span class="hint">${e.interested.length} interested</span><button class="btn small ${i ? '' : 'primary'}" data-a="int" data-id="${e.id}" aria-pressed="${i}">${i ? '✓ Interested' : 'Interested'}</button></div></article>`; }).join('')}`;
}

function vProfile(id) {
  const me = cur(), u = getUser(id);
  if (!u || u.role !== 'user') { app.innerHTML = '<div class="card"><h1>Profile not found</h1><a class="btn" href="#/feed">Back to home</a></div>'; return; }
  if (u.id === me.id) {
    app.innerHTML = `<h1>My profile</h1><form class="card" id="pf"><label for="pn">Display name</label><input id="pn" maxlength="30" value="${esc(u.name)}">
    <label for="pb">Bio</label><textarea id="pb" rows="3" maxlength="200">${esc(u.bio)}</textarea>
    <label for="pc">Course (optional)</label><input id="pc" maxlength="40" value="${esc(u.course)}"><label for="py">Year level (optional)</label><input id="py" maxlength="20" value="${esc(u.year)}">
    <fieldset style="border:0;padding:0;margin:.8rem 0 0"><legend><b>Interests</b></legend>${INTERESTS.map(i => `<label class="chk"><input type="checkbox" name="int" value="${i}" ${u.interests.includes(i) ? 'checked' : ''}>${i}</label>`).join('')}</fieldset>
    <label class="chk"><input type="checkbox" id="ps" ${u.showInterests ? 'checked' : ''}> Show my interests, course and year on my profile</label>
    <p class="err" id="pe" role="alert"></p><button class="btn primary">Save profile</button></form>
    ${me.blocked.length ? `<div class="card"><h2>Blocked people</h2>${me.blocked.map(b => `<div class="split"><span>${esc(nameOf(b))}</span><button class="btn small" data-a="unblk" data-id="${b}">Unblock</button></div>`).join('')}</div>` : ''}`;
    $('#pf').onsubmit = e => {
      e.preventDefault(); const n = $('#pn').value.trim(); if (n.length < 2) return $('#pe').textContent = 'Display name must be at least 2 characters.';
      Object.assign(u, { name: n, bio: $('#pb').value.trim(), course: $('#pc').value.trim(), year: $('#py').value.trim(), showInterests: $('#ps').checked, interests: [...document.querySelectorAll('[name=int]:checked')].map(x => x.value) });
      saveDB(); toast('Profile saved.'); refresh();
    };
    return;
  }
  const blocked = me.blocked.includes(u.id);
  app.innerHTML = `<p><a href="#/feed">← Back</a></p><article class="card"><h1>${esc(u.name)}</h1><p>${esc(u.bio) || '<span class="hint">No bio yet.</span>'}</p>
  ${u.showInterests ? `<p class="meta">${esc([u.course, u.year].filter(Boolean).join(' · '))}</p><p>${u.interests.map(i => `<span class="chip">${i}</span>`).join('') || '<span class="hint">No interests added.</span>'}</p>` : '<p class="hint">This person keeps their details private.</p>'}
  <div class="row">${blocked ? `<button class="btn" data-a="unblk" data-id="${u.id}">Unblock</button>` : `<a class="btn primary" href="#/messages/${u.id}">Message</a><button class="btn" data-a="blk" data-id="${u.id}">Block</button>`}<button class="btn danger" data-a="rp" data-t="user" data-id="${u.id}">Report</button></div></article>`;
}

const STAT = { sent: 'Sent', delivered: 'Delivered', failed: 'Failed to send' };
function vMsgs(pid) {
  const me = cur(), mine = db.messages.filter(m => m.from === me.id || m.to === me.id).sort((a, b) => a.date - b.date);
  const partners = [...new Set(mine.map(m => m.from === me.id ? m.to : m.from).reverse())];
  if (!pid) {
    app.innerHTML = `<h1>Messages</h1>` + (partners.length ? partners.map(p => { const last = mine.filter(m => m.from === p || m.to === p).pop(); return `<a class="card" style="display:block;text-decoration:none;color:inherit" href="#/messages/${p}"><b>${esc(nameOf(p))}</b><p class="meta">${esc(last.body.slice(0, 80))} · ${ago(last.date)}</p></a>`; }).join('') : '<div class="card"><p>No messages yet. Open someone\'s profile and tap Message to say hi.</p></div>');
    return;
  }
  const u = getUser(pid); if (!u || u.role !== 'user') return go('#/messages');
  const blocked = me.blocked.includes(pid) || u.blocked.includes(me.id), conv = mine.filter(m => m.from === pid || m.to === pid);
  app.innerHTML = `<p><a href="#/messages">← All messages</a></p><h1>${esc(u.name)}</h1>
  ${conv.map(m => `<div class="bub ${m.from === me.id ? 'mine' : ''}">${esc(m.body)}${m.from === me.id ? `<div class="meta ${m.status === 'failed' ? 'err' : ''}">${STAT[m.status]}${m.status === 'failed' ? ` <button class="lnk" data-a="rm" data-id="${m.id}">Retry</button>` : ''}</div>` : ''}</div>`).join('') || '<p class="hint">Say hello to start the conversation.</p>'}
  ${blocked ? '<p class="note">You can\'t message this person.</p>' : `<form id="mf" class="card"><label for="mb">Message</label><textarea id="mb" rows="2" maxlength="500"></textarea><p class="err" id="me" role="alert"></p><button class="btn primary">Send</button></form>`}`;
  const f = $('#mf'); if (f) f.onsubmit = e => {
    e.preventDefault(); const b = $('#mb').value.trim(); if (!b) return $('#me').textContent = 'Write a message first.';
    const m = { id: sid(), from: me.id, to: pid, body: b, date: Date.now(), status: db.offline ? 'failed' : 'sent' }; db.messages.push(m); saveDB(); refresh();
    if (!db.offline) deliver(m, pid); else toast('Message failed to send. Tap Retry.', 1);
  };
}
function deliver(m, pid) { setTimeout(() => { if (m.status === 'sent') { m.status = 'delivered'; saveDB(); if (location.hash === '#/messages/' + pid) refresh(); } }, 900); }

function vSearch(q) {
  const l = q.toLowerCase(), has = s => s.toLowerCase().includes(l);
  const th = db.threads.filter(t => vis(t) && (has(t.title) || has(t.body))), gr = db.groups.filter(g => has(g.name) || has(g.desc));
  const us = db.users.filter(u => u.role === 'user' && u.id !== (cur() || {}).id && (has(u.name) || (u.showInterests && u.interests.some(has))));
  app.innerHTML = `<h1>Results for “${esc(q)}”</h1><h2>Threads</h2>${th.map(card).join('') || '<p class="hint">No threads found.</p>'}
  <h2>Groups</h2>${gr.map(g => `<a class="card" style="display:block;color:inherit;text-decoration:none" href="#/group/${g.id}"><b>${esc(g.name)}</b><p class="meta">${esc(g.desc)}</p></a>`).join('') || '<p class="hint">No groups found.</p>'}
  <h2>People</h2>${us.map(u => `<a class="card" style="display:block;color:inherit;text-decoration:none" href="#/profile/${u.id}"><b>${esc(u.name)}</b><p class="meta">${u.showInterests ? esc(u.interests.join(', ')) : ''}</p></a>`).join('') || '<p class="hint">No people found.</p>'}`;
}


const onClick = e => {
  const b = e.target.closest('[data-a]'); if (!b) return;
  const me = cur(), a = b.dataset.a, id = b.dataset.id;
  if (!me) return askLogin(NEED[a] || 'do that');
  if (a === 'nt') return openComposer(b.dataset.g);
  if (a === 'ack') { me.warning = ''; saveDB(); return refresh(); }
  if (a === 'like') { toggle(thr(id).likes, me.id); saveDB(); return refresh(); }
  if (a === 'rt') { const f = $('.rf[data-id="' + id + '"]'); f.hidden = !f.hidden; if (!f.hidden) $('textarea', f).focus(); return; }
  if (a === 'rp') return openReport(b.dataset.t, id, b.dataset.th);
  if (a === 'dt') { if (confirm('Delete this thread? This cannot be undone.')) { thr(id).removed = true; saveDB(); toast('Thread deleted.'); go('#/feed'); } return; }
  if (a === 'et') { const t = thr(id), v = prompt('Edit your message:', t.body); if (v && v.trim()) { t.body = v.trim(); t.edited = 1; saveDB(); toast('Thread updated.'); refresh(); } return; }
  if (a === 'dc') { if (confirm('Delete this comment?')) { findC(thr(b.dataset.th).comments, id).removed = true; saveDB(); toast('Comment deleted.'); refresh(); } return; }
  if (a === 'join' || a === 'leave') { toggle(me.groups, id); saveDB(); toast(a === 'join' ? 'You joined the group.' : 'You left the group.'); return refresh(); }
  if (a === 'int') { const ev = db.events.find(x => x.id === id); toggle(ev.interested, me.id); saveDB(); toast(ev.interested.includes(me.id) ? 'Marked as interested.' : 'Interest removed.'); return refresh(); }
  if (a === 'blk') { if (confirm('Block ' + nameOf(id) + '? You won\'t see their posts or get their messages.')) { me.blocked.push(id); saveDB(); toast('User blocked. You can unblock from your profile.'); refresh(); } return; }
  if (a === 'unblk') { toggle(me.blocked, id); saveDB(); toast('User unblocked.'); return refresh(); }
  if (a === 'rm') { const m = db.messages.find(x => x.id === id); if (db.offline) return toast('Still offline. Try again later.', 1); m.status = 'sent'; saveDB(); refresh(); deliver(m, m.to); }
};
app.addEventListener('click', onClick); $('#rside').addEventListener('click', onClick);
app.addEventListener('submit', e => {
  const f = e.target.closest('.rf'); if (!f) return; e.preventDefault();
  const v = $('textarea', f).value.trim(); if (!v) return toast('Write a reply first.', 1);
  findC(thr(f.dataset.th).comments, f.dataset.id).replies.push({ id: sid(), author: cur().id, body: v, date: Date.now(), replies: [] }); saveDB(); toast('Reply added.'); refresh();
});
$('#off').checked = !!db.offline;
$('#off').onchange = e => { db.offline = e.target.checked; saveDB(); toast(db.offline ? 'Test mode: connection lost. Posts and messages will fail.' : 'Connection restored.'); };
$('#reset').onclick = () => { if (confirm('Reset all demo data and log out?')) resetDB(); };
$('#sf').onsubmit = e => { e.preventDefault(); const q = $('#q').value.trim(); if (q) go('#/search/' + encodeURIComponent(q)); };
$('#lo').onclick = () => { localStorage.removeItem(SK); location.hash = '#/feed'; route(); toast('You have been logged out.'); };
// Remember where a guest was so login can bring them back
document.addEventListener('click', e => { if (!cur() && e.target.closest('a[href="login.html"],a[href="signup.html"]')) sessionStorage.setItem('next', location.hash); });
$('#bg').onclick = () => { const o = document.body.classList.toggle('open'); $('#bg').setAttribute('aria-expanded', o); $('#bg').setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); };
const flash = sessionStorage.getItem('flash'); if (flash) { sessionStorage.removeItem('flash'); toast(flash); }
window.addEventListener('hashchange', route); route();

$('#scrim').onclick = () => document.body.classList.remove('open');
document.addEventListener('keydown', e => { if (e.key === 'Escape') document.body.classList.remove('open'); });