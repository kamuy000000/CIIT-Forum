const $ = (s) => document.querySelector(s),
  esc = (s) =>
    String(s ?? "").replace(
      /[&<>"]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
    );
const FONTS = {
  Default: "system-ui,sans-serif",
  Georgia: "Georgia,serif",
  Trebuchet: "'Trebuchet MS',sans-serif",
  Verdana: "Verdana,sans-serif",
  Courier: "'Courier New',monospace",
  Comic: "'Comic Sans MS',cursive",
  Impact: "Impact,sans-serif",
  Script: "'Brush Script MT',cursive",
};
const DEF = {
  bg: "#dff3fb",
  bg2: "",
  accent: "#0b8fbf",
  ban: "",
  name: "#033250",
  bubble: "#ffffff",
  cb: "solid",
  font: "Default",
  sz: 16,
  rad: 14,
  op: 92,
  card: "light",
  pat: "none",
  ov: 0,
  tile: 0,
  img: "",
  bimg: "",
  av: "",
  bio: "",
  st: "",
  q: "",
  song: "",
  loc: "",
  int: "",
  about: "",
  ph: [],
  order: ["about", "photos", "comments", "interests", "posts"],
  hide: [],
  pv: 1,
  aw: 1,
  ls: 1,
  css: "",
  lay: "classic",
  psz: "balanced",
  pcw: 0,
  dm: 1,
};
const PRE = {
  Ocean: {},
  Sunset: {
    bg: "#ffe8cc",
    bg2: "#ffc9a0",
    accent: "#d9480f",
    name: "#7a2e0b",
    bubble: "#fff4e6",
    font: "Georgia",
    cb: "dashed",
  },
  Midnight: {
    bg: "#14172b",
    bg2: "#2b1d4d",
    accent: "#7c9cff",
    name: "#c5d1ff",
    bubble: "#222747",
    font: "Verdana",
    card: "dark",
    op: 85,
    pat: "dots",
  },
  Retro: {
    bg: "#fff9db",
    accent: "#e03997",
    name: "#a61e63",
    font: "Courier",
    cb: "dotted",
    pat: "stripes",
  },
  Forest: {
    bg: "#dfe9dc",
    bg2: "#a9c3a3",
    accent: "#4a7a5c",
    name: "#2f5a3f",
    bubble: "#f1f7ee",
    font: "Georgia",
  },
  Bubblegum: {
    bg: "#ffe3f1",
    bg2: "#d7ccff",
    accent: "#e0489b",
    name: "#8a1e5e",
    font: "Comic",
    rad: 28,
    pat: "dots",
  },
};
const DEMO = { id: "demo", email: "demo@ciit.edu.ph", pw: "ciit1234" },
  DEFAV = "img/Default%20Icon.jpg",
  LBL = { about: "About me", interests: "Interests", photos: "Photos", comments: "Comments", posts: "Posts" },
  GM = [
    ["info", "Profile Information", "Name, bio, status, and quote", "✏️"],
    ["themes", "Appearance and Themes", "Start from a ready-made theme", "🎨"],
    ["colors", "Background and Colors", "Colors, image, and patterns", "🌈"],
    ["style", "Fonts and Typography", "Fonts, text size, and corners", "🔤"],
    ["media", "Profile and Banner Images", "Picture, banner, and photo gallery", "🖼️"],
    ["layout", "Profile Layout", "Classic or Centered Timeline, post width", "🧱"],
    ["arrange", "Section Arrangement", "Reorder and hide profile sections", "🗂️"],
    ["privacy", "Privacy Settings", "Comments, visibility, and messages", "🔒"],
  ],
  gmenu = () =>
    `<div class="gm" role="menu" aria-label="Customize Profile"><div class="gh">Customize Profile</div>${GM.map(([k, t, d, i]) => `<button class="gi" role="menuitem" data-a="gm" data-v="${k}"><span aria-hidden="true">${i}</span><span><b>${t}</b><br><small>${d}</small></span><span aria-hidden="true">›</span></button>`).join("")}</div>`;
const T = (t) => ({ ...DEF, ...t }),
  CK = ["n", "bio", "st", "q", "song", "loc", "int", "about", "pv", "aw", "ls", "dm", "lay", "psz", "pcw"],
  CK2 = [...CK, "ph", "av", "bimg", "order", "hide"];
const U = (id, n, p, o) => ({ id, n, t: T({ ...PRE[p], ...o }), wall: o.w || [], views: o.vw || 0 });
const SEED = {
  users: [
    U("demo", "Mochi", "Forest", {
      av: "img/MainProfileFortesting.jpg",
      vw: 4872,
      bio: "BSCS 3rd year · CIIT Quezon City",
      st: "Testing the new forum ✨",
      q: "Peace, love, and clean commits.",
      song: "Lo-fi study beats",
      loc: "Quezon City, Philippines",
      int: "cats, coding, matcha, sketching, early-2000s web",
      about: "Hi! I’m the test account for the CIIT Forum demo. I like cats, cozy playlists, and building things that feel a little like the early-2000s web.",
      ph: ["img/MainProfileFortesting.jpg"],
      w: [
        { u: "u1", t: "Best study buddy ever! Always shares the notes.", r: 5 },
        { u: "u2", t: "Made me the cutest sticker pack. Cheers to our friendship!", r: 5 },
        { u: "u3", t: "Reliable org mate, never misses a meeting.", r: 4 },
        { u: "u4", t: "Carried our game jam team. GG!", r: 5 },
      ],
    }),
    U("u1", "User1", "Midnight", {
      av: "img/profile1.jpg",
      vw: 1203,
      bio: "BSCS 3rd year",
      st: "Debugging life ☕",
      q: "It works on my machine.",
      song: "Lo-fi beats",
      loc: "Quezon City",
      int: "coding, ramen, chess",
      about: "Ask me about Python and why my code only works at 2 AM.",
      w: [{ u: "u2", t: "Best study buddy ever!", r: 5 }],
    }),
    U("u2", "Bogart", "Bubblegum", {
      av: "img/profile2.jpg",
      vw: 860,
      bio: "BA Multimedia",
      st: "Drawing till dawn",
      q: "Make it pop!",
      song: "City pop mix",
      loc: "Manila",
      int: "art, anime, matcha",
      about: "Poster designer and sticker addict.",
      w: [{ u: "u3", t: "Loved your org fair poster 🎨", r: 4 }],
    }),
    U("u3", "Jo", "Sunset", {
      av: "img/Profile3.jpg",
      vw: 541,
      bio: "BSIT 2nd year",
      st: "Looking for org mates",
      q: "Sleep is optional.",
      loc: "Makati",
      int: "events, photography",
      about: "Org officer. Come say hi at the booth!",
    }),
    U("u4", "John", "Forest", {
      vw: 322,
      bio: "BS Game Dev",
      st: "Playing Valorant",
      q: "GG no re.",
      song: "Game OST",
      loc: "Pasig",
      int: "games, plants, cats",
      about: "Making tiny games and big messes.",
    }),
  ],
  posts: [
    {
      id: 1,
      c: "Org Board",
      u: "u3",
      t: "Org fair this Friday!",
      b: "All orgs are invited to set up booths at the lobby. Sign up at the SSC office.",
      l: 12,
      cm: [
        { u: "u2", t: "Our org is in! 🎨" },
        { u: "u1", t: "What time does it start?" },
      ],
    },
    {
      id: 2,
      c: "Concern",
      u: "u1",
      t: "Who knows how to enroll in electives?",
      b: "Is the portal down for everyone or just me?",
      l: 5,
      cm: [{ u: "u4", t: "Try again after 5 PM, worked for me." }],
    },
    {
      id: 3,
      c: "Regular post",
      u: "u4",
      t: "Valorant night at the lab",
      b: "Bring your own mouse. Casual only!",
      l: 9,
      cm: [],
    },
    {
      id: 4,
      c: "Org Board",
      u: "u2",
      t: "Art org needs poster designers",
      b: "Beginner friendly. Drop a comment if you’re interested.",
      l: 7,
      cm: [{ u: "u3", t: "Count me in." }],
    },
  ],
};
let S,
  V = {
    view: null,
    edit: null,
    panel: null,
    plain: false,
    open: null,
    tab: "profile",
    q: "",
    login: "in",
    comp: 0,
    more: 0,
    cat: "All",
    d: { t: "", b: "", c: "Regular post" },
    pop: null,
  };
Object.assign(V, { ret: null, mfrom: null, enter: 0, fresh: null, page: null, mc: null, ms: "", md: {}, mnew: 0, ptab: "posts", chat: { open: 0, min: 0, cid: null } });
const load = () => {
  try {
    const s = JSON.parse(localStorage.getItem("ciitf4") || "null");
    if (s) return s;
  } catch (e) {}
  return {
    me: null,
    users: SEED.users,
    posts: SEED.posts,
    show: { posts: true, people: true },
    rules: true,
  };
};
const save = () => {
  try {
    localStorage.setItem("ciitf4", JSON.stringify(S));
    return true;
  } catch (e) {
    return false;
  }
};
const CATS = {
  Announcements: "Org Board",
  "Concerns (Q&A)": "Concern",
  "Org Boards": "Org Board",
  Hangout: "Regular post",
};
function normalize() {
  S.show = S.show || { posts: true, people: true };
  S.convs = S.convs || seedConvs();
  S.posts.forEach((p, i) => {
    p.c = CATS[p.c] || p.c;
    p.by = p.by || [];
    p.ts = p.ts || Date.now() - (i + 1) * 5 * 36e5;
  });
  if (S.me) S.me = S.users.find((u) => u.id === S.me.id) || S.me;
}
S = load();
normalize();
const lum = (h) => {
  const c = [1, 3, 5].map((i) => {
    let v = parseInt(h.substr(i, 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const rat = (a, b) => {
  const x = lum(a),
    y = lum(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};
const on = (bg) => (lum(bg) > 0.4 ? "#12212b" : "#ffffff"),
  user = (id) => S.users.find((u) => u.id === id) || S.me;
const safe = (s) =>
  esc(
    String(s || "")
      .replace(/url\(|@|expression|javascript|behavior|position|[<>{}\\]/gi, "")
      .slice(0, 400),
  );
function toast(m) {
  const t = $("#toast");
  t.textContent = m;
  t.classList.add("on");
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove("on"), 2400);
}
const bub = (u) => {
  const t = T(u.t);
  return `border:${t.cb == "none" ? "none" : "2px " + t.cb + " " + t.accent};background:${t.bubble};color:${on(t.bubble)};font-family:${FONTS[t.font]}`;
};
const avh = (u) => `<img src="${T(u.t).av || DEFAV}" alt="">`;
function bgCSS(t) {
  const L = [],
    Z = [],
    P = {
      dots: ["radial-gradient(rgba(0,0,0,.15) 1.5px,transparent 1.5px)", "18px 18px"],
      stripes: [
        "repeating-linear-gradient(45deg,rgba(0,0,0,.07) 0 10px,transparent 10px 20px)",
        "auto",
      ],
      grid: [
        "linear-gradient(rgba(0,0,0,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.08) 1px,transparent 1px)",
        "24px 24px,24px 24px",
      ],
    }[t.pat];
  if (P) {
    L.push(P[0]);
    Z.push(P[1]);
  }
  if (+t.ov) {
    const a = t.ov / 100;
    L.push(`linear-gradient(rgba(0,0,0,${a}),rgba(0,0,0,${a}))`);
    Z.push("auto");
  }
  if (t.img) {
    L.push(`url(${t.img})`);
    Z.push(+t.tile ? "auto" : "cover");
  } else if (t.bg2) {
    L.push(`linear-gradient(135deg,${t.bg},${t.bg2})`);
    Z.push("auto");
  }
  return (
    `background-color:${t.bg};` +
    (L.length ? `background-image:${L.join(",")};background-size:${Z.join(",")};` : "")
  );
}
const postW = (t) => (+t.pcw > 0 ? Math.min(960, Math.max(360, +t.pcw)) : { compact: 440, balanced: 640, wide: 880 }[t.psz] || 640),
  rsz = (w) =>
    `<div class="rsz" data-rsz role="separator" tabindex="0" aria-orientation="vertical" aria-label="Resize post section width. Use the left and right arrow keys." aria-valuemin="360" aria-valuemax="960" aria-valuenow="${w}"></div>`,
  mobile = () => matchMedia("(max-width:860px)").matches;

/* ---------- Messaging (demo: stored in this browser only; see README for backend needs) ---------- */
function seedConvs() {
  const n = Date.now(),
    H1 = 36e5;
  return [
    { id: "demo|u1", p: ["demo", "u1"], rd: { demo: n - 4 * H1 }, hd: {}, m: [
      { f: "u1", t: "Hey Mochi! Do you have the notes from Thursday’s class?", ts: n - 5 * H1 },
      { f: "demo", t: "Yep, I’ll upload them tonight.", ts: n - 4 * H1 },
      { f: "u1", t: "You’re the best 🙏 Are you joining the org fair too?", ts: n - 2 * H1 } ] },
    { id: "demo|u2", p: ["demo", "u2"], rd: {}, hd: {}, m: [
      { f: "u2", t: "Love your new profile theme! The Forest look is so cozy 🌿", ts: n - 26 * H1 } ] },
  ];
}
const cid = (a, b) => [a, b].sort().join("|"),
  curC = () => (V.page == "msgs" ? V.mc : V.chat.cid),
  getC = (id) => (S.convs || []).find((c) => c.id == id),
  mkC = (uid) => {
    const id = cid(S.me.id, uid);
    let c = getC(id);
    if (!c) S.convs.push((c = { id, p: [S.me.id, uid], m: [], rd: {}, hd: {} }));
    return c;
  },
  other = (c) => user(c.p.find((x) => x != S.me.id) || c.p[0]),
  vis = (c) => c.m.filter((m) => m.ts > (c.hd[S.me.id] || 0)),
  lastTs = (c) => vis(c).slice(-1)[0]?.ts || Date.now(),
  unr = (c) => vis(c).filter((m) => m.f != S.me.id && m.ts > (c.rd[S.me.id] || 0)).length,
  myc = () => S.convs.filter((c) => c.p.includes(S.me.id) && (vis(c).length || c.id == curC())).sort((a, b) => lastTs(b) - lastTs(a)),
  totU = () => S.convs.filter((c) => c.p.includes(S.me.id)).reduce((n, c) => n + unr(c), 0),
  mark = (c) => {
    if (c) c.rd[S.me.id] = Date.now();
    save();
  },
  sameDay = (a, b) => new Date(a).toDateString() == new Date(b).toDateString(),
  fmtT = (ts) => (sameDay(ts, Date.now()) ? new Date(ts).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : new Date(ts).toLocaleDateString([], { month: "short", day: "numeric" })),
  fmtM = (ts) => (sameDay(ts, Date.now()) ? "" : new Date(ts).toLocaleDateString([], { month: "short", day: "numeric" }) + ", ") + new Date(ts).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
  mcol = () => {
    const a = T(S.me.t).accent;
    return rat(on(a), a) >= 4.5 ? a : "#033250";
  },
  mvars = () => `--mb:${mcol()};--mt:${on(mcol())};`;
const pick = () =>
  `<div class="fr" role="group" aria-label="Start a conversation with">${S.users.filter((u) => u.id != S.me.id && +T(u.t).dm !== 0).map((u) => `<button class="ftile" data-a="mstart" data-v="${u.id}"><img src="${T(u.t).av || DEFAV}" alt=""><span>${esc(u.n)}</span></button>`).join("") || `<span class="mut">No one is available to message.</span>`}</div>`;
function mlist(an) {
  const q = (V.ms || "").toLowerCase(),
    cs = myc().filter((c) => other(c).n.toLowerCase().includes(q));
  return (
    cs.map((c) => {
      const o = other(c), v = vis(c), l = v[v.length - 1], n = unr(c);
      return `<button class="mrow${c.id == curC() ? " on" : ""}" data-a="${an}" data-v="${c.id}" aria-current="${c.id == curC()}"><span class="av">${avh(o)}</span><span class="mi"><b>${esc(o.n)}${n ? `<span class="sr"> (${n} unread)</span>` : ""}</b><span class="mp${n ? " un" : ""}">${l ? (l.f == S.me.id ? "You: " : "") + esc(l.t) : "No messages yet"}</span></span><span class="mm">${l ? fmtT(l.ts) : ""}${n ? `<span class="bdg" aria-hidden="true">${n}</span>` : ""}</span></button>`;
    }).join("") ||
    `<div class="mut" style="padding:12px">${q ? "No conversations match your search." : "No conversations yet. Press ＋ New to start one."}</div>`
  );
}
function mthread(c, id) {
  const o = other(c), v = vis(c), lo = v.map((m) => m.f == S.me.id).lastIndexOf(true);
  const log = v.map((m, i) => {
    const me = m.f == S.me.id;
    return `${i == 0 || !sameDay(v[i - 1].ts, m.ts) ? `<div class="mday">${new Date(m.ts).toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}</div>` : ""}<div class="mg ${me ? "me" : "th"}"><div class="mb"><span class="sr">${me ? "You" : esc(o.n)}: </span>${esc(m.t)}</div><div class="mtm">${fmtM(m.ts)}${me && i == lo ? " · Saved on this device" : ""}</div></div>`;
  }).join("") || `<div class="mut" style="margin:auto;text-align:center">No messages yet. Say hi to ${esc(o.n)} 👋</div>`;
  const off = +T(o.t).dm === 0;
  return `<div class="mlog" role="log" aria-live="polite" aria-label="Messages with ${esc(o.n)}" tabindex="0">${log}</div>${off ? `<div class="mcomp mut">${esc(o.n)} has turned messages off, so you can’t send new ones.</div>` : `<div class="mcomp"><input id="${id}" maxlength="500" autocomplete="off" placeholder="Write a message… (Enter to send)" aria-label="Message to ${esc(o.n)}" value="${esc(V.md[c.id] || "")}"><button class="btn" data-a="msend">Send</button></div><div class="err" id="merr" role="alert" style="padding:0 12px 6px"></div>`}`;
}
function mpHTML() {
  const c = getC(V.mc), o = c && other(c);
  return `<div class="mgrid${c ? " has" : ""}"><section class="mpn mlistp" style="${mvars()}" aria-label="Conversations"><div class="mph"><button class="ib" data-a="mexit" aria-label="Back to forum">←</button><b style="flex:1;font-size:18px">Messages</b><button class="btn sm" data-a="mnew" aria-expanded="${!!V.mnew}">＋ New</button></div>${V.mnew ? `<div class="mpick">${pick()}</div>` : ""}<div style="padding:0 10px 8px"><input id="ms" type="search" placeholder="Search conversations" aria-label="Search conversations" value="${esc(V.ms || "")}"></div><div id="mlist" class="mlist">${mlist("mopen")}</div><div class="demo" style="margin:8px">Demo mode: messages are saved only in this browser. Delivery between real accounts needs a backend.</div></section><section class="mpn mthread" style="${mvars()}" aria-label="Conversation">${c ? `<div class="mph"><button class="ib mbk" data-a="mback" aria-label="Back to conversations">←</button><span class="av">${avh(o)}</span><b style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis">${esc(o.n)}</b><button class="btn sm g" data-a="visit" data-v="${o.id}">View profile</button><button class="btn sm g" data-a="mdel" data-v="${c.id}" aria-label="Delete conversation with ${esc(o.n)}">Delete</button></div>${mthread(c, "mi")}` : `<div class="mempty">Select a conversation, or press ＋ New to start one.</div>`}</section></div>`;
}
const IP = {
    home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/>',
    profile: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
    people: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.6 3-6 7-6s7 2.4 7 6"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8"/><path d="M18 14.2c2.3.7 4 2.5 4 5.8"/>',
    msgs: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
  },
  ico = (k) => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${IP[k]}</svg>`,
  curNav = () => (V.page == "msgs" ? "msgs" : V.page == "home" ? "home" : V.page == "people" ? "people" : V.view && V.view != S.me.id ? V.ret || "" : "profile"),
  navB = (k, l) => `<button class="nv" data-a="nav" data-v="${k}"${curNav() == k ? ' aria-current="page"' : ""}>${ico(k)}<span>${l}</span></button>`;
const navM = () => {
  const n = totU();
  return `<button class="nv" id="mnav" data-a="msgpage" aria-label="Messages${n ? `, ${n} unread` : ""}"${curNav() == "msgs" ? ' aria-current="page"' : ""}>${ico("msgs")}<span>Messages</span>${n ? `<span class="bdg" aria-hidden="true">${n}</span>` : ""}</button>`;
};
const navHTML = () => `<nav class="mnv" aria-label="Main">${navB("home", "Home")}${navB("profile", "Profile")}${navB("people", "People")}${navM()}</nav>`;
function chatHTML() {
  if (!S.me || V.page == "msgs") return "";
  const n = totU(), c = V.chat;
  if (!c.open) return `<button class="btn cfab" data-a="cht" aria-label="Open chat${n ? `, ${n} unread` : ""}"><span aria-hidden="true">💬</span> Chat${n ? `<span class="bdg" aria-hidden="true">${n}</span>` : ""}</button>`;
  const cv = getC(c.cid), o = cv && other(cv);
  return `<section class="cw${c.min ? " min" : ""}" style="${mvars()}" aria-label="Chat window"><div class="cwh">${cv && !c.min ? `<button class="ib" data-a="cback" aria-label="Back to all chats">←</button>` : ""}<b class="cwt">${cv ? esc(o.n) : "Messages"}${n && (c.min || !cv) ? `<span class="bdg" aria-label="${n} unread">${n}</span>` : ""}</b><button class="ib" data-a="cmin" aria-label="${c.min ? "Expand chat" : "Minimize chat"}" aria-expanded="${!c.min}">${c.min ? "▢" : "–"}</button><button class="ib" data-a="cmax" aria-label="Open in full Messages page">⤢</button><button class="ib" data-a="ccls" aria-label="Close chat">✕</button></div>${c.min ? "" : `<div class="cwb">${cv ? mthread(cv, "ci") : `<div class="cwtop"><input id="ms" type="search" placeholder="Search conversations" aria-label="Search conversations" value="${esc(V.ms || "")}"><button class="btn sm" data-a="mnew" aria-expanded="${!!V.mnew}">＋ New</button></div>${V.mnew ? `<div class="mpick">${pick()}</div>` : ""}<div id="mlist" class="mlist">${mlist("copen")}</div>`}</div>`}</section>`;
}
function mr(f) {
  const n = $("#mnav"), p = $("#mp"), c = $("#chat");
  if (n) n.outerHTML = navM();
  if (p) p.innerHTML = mpHTML();
  if (c) c.innerHTML = chatHTML();
  document.querySelectorAll(".mlog").forEach((l) => (l.scrollTop = l.scrollHeight));
  if (f) $(f)?.focus();
}
const sideBg = (t) => `color-mix(in srgb,${t.accent} 28%,#0f1b24)`;
function prof(u, t0, ed, plain) {
  const t = T(t0),
    s = plain ? T({}) : t,
    dk = s.card == "dark",
    ink = dk ? "#f2f6f8" : "#12212b",
    card = `background:${dk ? `rgba(18,24,38,${s.op / 100})` : `rgba(255,255,255,${s.op / 100})`};color:${ink};border-radius:${s.rad}px;`,
    nm = t.n ?? u.n;
  const e = (k) =>
    ed
      ? `contenteditable="true" data-k="${k}" class="ce" role="textbox" aria-label="Edit ${k}"`
      : "";
  const ln = (ic, k) => (t[k] || ed ? `<div>${ic} <span ${e(k)}>${esc(t[k])}</span></div>` : "");
  const posts = S.posts.filter((p) => p.u === u.id),
    mine = u.id === S.me.id;
  const W = postW(t),
    cardT = `background:${dk ? "rgba(18,24,38," : "rgba(255,255,255,"}${Math.max(+s.op, 88) / 100});color:${ink};border-radius:${s.rad}px;`,
    pcards = (tl) =>
      posts
        .map((p) => {
          const a = user(p.u);
          return `<article class="pcard${tl ? " tlp" : ""}" style="${tl ? cardT : ""}"><div class="pm pmh"><span class="av xs">${avh(a)}</span><b>${esc(a.n)}</b><span class="tag" data-c="${esc(p.c)}">${esc(p.c)}</span></div><h4>${esc(p.t)}</h4><p>${esc(p.b)}</p><div class="pm">♥ ${p.l} likes · 💬 ${p.cm.length} comments</div></article>`;
        })
        .join("") || `<span class="pm">No posts yet.</span>`;
  const B = {
    about: () => `<h3>About me</h3><p style="margin:0" ${e("about")}>${esc(t.about)}</p>`,
    interests: () =>
      `<h3>Interests</h3>${
        t.int
          .split(",")
          .filter((x) => x.trim())
          .map(
            (x) =>
              `<span class="chip" style="background:${s.accent};color:${on(s.accent)}">${esc(x.trim())}</span>`,
          )
          .join("") || `<span class="mut">None yet.</span>`
      }`,
    photos: () =>
      `<h3>Photos</h3><div class="ph">${t.ph.map((p, i) => `<img src="${p}" alt="Photo ${i + 1} by ${esc(nm)}">`).join("") || `<span class="mut">No photos yet.</span>`}</div>`,
    comments: () =>
      `<h3 class="serif">Comments</h3>${
        (u.wall || [])
          .map((c) => {
            const w = user(c.u);
            return `<div class="tm"><span class="av sm">${avh(w)}</span><div class="cm" style="${bub(w)}"><b style="color:${T(w.t).name}">${esc(w.n)}</b><br>${esc(c.t)}</div></div>`;
          })
          .join("") || `<span class="mut">No comments yet.</span>`
      }${ed || mine ? "" : !+t.aw ? `<div class="mut">${esc(nm)} has turned off comments on this profile.</div>` : `<div style="display:flex;gap:6px;margin-top:8px"><input id="wc" maxlength="200" placeholder="Write a comment (Enter to send)" aria-label="Comment"><button class="btn" data-a="wall">Send</button></div>`}`,
    posts: () => `<h3>Posts</h3>${pcards(0)}`,
  };
  const ban = t.bimg ? `url(${t.bimg}) center/cover` : s.ban || s.accent,
    gear = mine && !ed ? `<button class="gear" data-a="gear" data-tip="Customize Profile" aria-label="Customize Profile" aria-haspopup="true" aria-expanded="${!!V.menu}"><img src="img/Gear.jpg" alt="" width="30" height="30"></button>${V.menu ? gmenu() : ""}` : "",
    st = `font-family:${FONTS[s.font]};font-size:${s.sz}px;--pw:${W}px;${plain ? "" : safe(t.css)}`,
    port = `<div class="port" style="border-color:${s.accent}"><img src="${t.av || DEFAV}" alt="Profile picture of ${esc(nm)}"></div>`,
    ids = [ln("🎓", "bio"), ln("📍", "loc"), ln("🎵", "song")].join(""),
    qb = `<div class="qbox" style="border-color:${s.accent}">${ln("💬", "st")}${ln("❝", "q")}</div>`;
  if (t.lay == "timeline") {
    const vs = t.order.filter((k) => !t.hide.includes(k)),
      TM = { about: "about", interests: "about", photos: "photos", comments: "comments", posts: "posts" },
      TN = { posts: "Posts", about: "About", photos: "Photos", comments: "Comments" },
      tk = [...new Set(vs.map((k) => TM[k]))],
      cur = tk.includes(V.ptab) ? V.ptab : tk[0],
      body = cur == "posts" ? pcards(1) : vs.filter((k) => TM[k] == cur).map((k) => `<section class="blk" style="${cardT}">${B[k]()}</section>`).join("");
    return `<div id="pw" class="lay-tl" style="${st}"><section class="tlh" style="${cardT}">${gear}<div class="ban" style="background:${ban};border-radius:${s.rad}px ${s.rad}px 0 0"></div><div class="tlr">${port}<div class="tli"><h1 style="color:${s.name}" ${e("n")}>${esc(nm)}</h1><div class="tlm">${ids}</div>${qb}</div></div></section><div class="tltabs" role="tablist" aria-label="Profile sections" style="${cardT}">${tk.map((k) => `<button class="tab" role="tab" data-a="ptab" data-v="${k}" aria-selected="${k == cur}" style="${k == cur ? `background:${s.accent};color:${on(s.accent)};border-color:${s.accent}` : ""}">${TN[k]}</button>`).join("")}</div><div class="tlc" role="tabpanel">${body}</div>${ed ? rsz(W) : ""}</div>`;
  }
  return `<div id="pw" class="lay-cl" style="${st}"><section class="pf"><div class="pcol">${port}<div class="dt" style="${card}">${ids}</div></div><div class="pmw">${gear}<div class="pmain" style="${card}overflow:hidden"><div class="ban" style="background:${ban}"></div><div class="pinfo"><h1 style="color:${s.name}" ${e("n")}>${esc(nm)}</h1>${qb}</div></div></div></section>
 <div class="blks">${t.order
   .filter((k) => !t.hide.includes(k))
   .map((k) => `<section class="blk ${k == "photos" || k == "comments" ? "span" : k == "posts" ? "span pblk" : ""}" style="${card}">${B[k]()}${k == "posts" && ed ? rsz(W) : ""}</section>`)
   .join("")}</div></div>`;
}
function warn(d) {
  const cc = d.card == "dark" ? "#121826" : "#ffffff",
    a = rat(d.name, cc),
    b = rat(d.name, d.bubble),
    m = [];
  if (a < 4.5) m.push(`Name color is hard to read on cards (${a.toFixed(1)}:1).`);
  if (b < 4.5) m.push(`Name color is hard to read on comment bubbles (${b.toFixed(1)}:1).`);
  if (+d.op < 55) m.push("Cards are very transparent, so text may be hard to read.");
  return m.length
    ? `<span class="err">⚠ ${m.join(" ")}</span> <button class="btn sm" data-a="fix">Fix automatically</button>`
    : `<span class="ok">✓ Everything is readable</span>`;
}
const PN = [
  ["info", "Profile Info"],
  ["themes", "Themes"],
  ["colors", "Colors"],
  ["bg", "Background"],
  ["style", "Fonts"],
  ["media", "Images"],
  ["layout", "Layout"],
  ["blocks", "Sections"],
  ["privacy", "Privacy"],
  ["adv", "Advanced"],
];
function barHTML(own, vu) {
  if (V.edit)
    return (
      `<b>Editing</b>` +
      PN.map(
        ([k, l]) =>
          `<button class="tab" data-a="pn" data-v="${k}" aria-pressed="${V.panel == k}">${l}</button>`,
      ).join("") +
      `<span class="mut" style="color:#566873">Tip: click text on the profile to edit it</span>`
    );
  return own
    ? ""
    : `<button class="btn sm g" data-a="back">← Back to ${{ home: "Home", people: "People", msgs: "Messages" }[V.ret] || "my profile"}</button> ${+T(vu.t).dm === 0 ? `<button class="btn sm" disabled title="${esc(vu.n)} has turned messages off">✉ Messages off</button>` : `<button class="btn sm" data-a="mstart" data-v="${vu.id}">✉ Message ${esc(vu.n)}</button>`}`;
}
function panel() {
  const d = V.edit,
    p = V.panel;
  if (!p) return "";
  const C = (k, l) =>
      `<label>${l}<input type="color" data-k="${k}" value="${d[k] || d.accent}"></label>`,
    Sl = (k, l, o) =>
      `<label>${l}<select data-k="${k}">${o.map(([v, n]) => `<option value="${v}" ${d[k] == v ? "selected" : ""}>${n}</option>`).join("")}</select></label>`,
    Rg = (k, l, a, b) =>
      `<label>${l}: <span id="v_${k}">${d[k]}</span><input type="range" min="${a}" max="${b}" data-k="${k}" value="${d[k]}"></label>`,
    Up = (k, l) =>
      `<label>${l}<input type="file" accept="image/png,image/jpeg,image/webp" data-up="${k}"></label>`,
    Rm = (k, l) => (d[k] ? `<button class="btn sm g" data-a="rm" data-v="${k}">${l}</button>` : "");
  const I = (k, l, m) => `<label>${l}<input data-k="${k}" maxlength="${m}" value="${esc(d[k])}"></label>`;
  const M = {
    info: `<div class="pn">${I("n", "Display name", 30)}${I("bio", "Course / year", 40)}${I("loc", "Location", 40)}${I("st", "Status", 60)}${I("q", "Favorite quote", 80)}${I("song", "Now playing", 40)}</div><label>About me<textarea rows="2" maxlength="200" data-k="about">${esc(d.about)}</textarea></label>`,
    layout: `<b>Profile layout</b><div class="lays" role="group" aria-label="Profile layout">${[["classic", "Classic Layout", "Friendster-style portrait, details and sections around your posts.", "▤"], ["timeline", "Centered Timeline Layout", "Compact header, then your posts in one centered column over your background.", "☰"]].map(([k, l, x, i]) => `<button class="lay${d.lay == k ? " on" : ""}" data-a="lay" data-v="${k}" aria-pressed="${d.lay == k}"><span aria-hidden="true" class="li">${i}</span><b>${l}</b><small>${x}</small></button>`).join("")}</div><b>Post section width</b><div class="tabs" role="group" aria-label="Post section width" style="margin-top:6px">${[["compact", "Compact"], ["balanced", "Balanced"], ["wide", "Wide"]].map(([k, l]) => `<button class="tab" data-a="psz" data-v="${k}" aria-pressed="${d.psz == k && !+d.pcw}">${l}</button>`).join("")}</div><label>Fine-tune width: <span id="v_pcw">${postW(d)}</span> px<input type="range" min="360" max="960" step="10" data-k="pcw" value="${postW(d)}"></label><div class="mut" style="color:#566873">On desktop you can also drag the handle on the right edge of your posts. On phones the width always fits the screen. Switching layouts never deletes your info or posts. Press Save to keep your choice.</div>`,
    privacy: `<div class="pn">${Sl("aw", "Comments from others", [[1, "Allowed"], [0, "Turned off"]])}${Sl("ls", "Show me in Friends & people", [[1, "Yes"], [0, "No, hide me"]])}${Sl("dm", "Who can message me", [[1, "Anyone in the forum"], [0, "No one (messages off)"]])}</div><div class="mut" style="color:#566873">Changes apply after you press Save.</div>`,
    themes: `<b>Start from a theme (your text and photos are kept)</b><div class="tabs" style="margin-top:6px">${Object.keys(
      PRE,
    )
      .map(
        (k) =>
          `<button class="tab" style="background:#fff;color:#12212b;border-color:#c5ccc8" data-a="pre" data-v="${k}">${k}</button>`,
      )
      .join("")}</div>`,
    colors: `<div class="pn">${C("bg", "Background")}${C("bg2", "Gradient end")}${C("accent", "Accent / avatar")}${C("ban", "Banner color")}${C("name", "Name color")}${C("bubble", "Comment bubble")}${Sl(
      "card",
      "Card style",
      [
        ["light", "Light cards"],
        ["dark", "Dark cards"],
      ],
    )}${Rg("op", "Card opacity %", 30, 100)}</div><button class="btn sm g" style="margin-top:6px" data-a="rm" data-v="bg2">No gradient</button>`,
    bg: `<div class="pn">${Up("img", "Background image")}${Sl("tile", "Image mode", [
      [0, "Cover"],
      [1, "Tile"],
    ])}${Sl("pat", "Pattern", [
      ["none", "None"],
      ["dots", "Dots"],
      ["stripes", "Stripes"],
      ["grid", "Grid"],
    ])}${Rg("ov", "Darken image %", 0, 80)}</div>${Rm("img", "Remove image")}<div class="err" id="uerr" role="alert"></div>`,
    style: `<div class="pn">${Sl(
      "font",
      "Font",
      Object.keys(FONTS).map((f) => [f, f]),
    )}${Sl("sz", "Text size", [
      [14, "Small"],
      [16, "Medium"],
      [19, "Large"],
    ])}${Rg("rad", "Corner roundness", 0, 36)}${Sl("cb", "Comment border", [
      ["solid", "Solid"],
      ["dashed", "Dashed"],
      ["dotted", "Dotted"],
      ["none", "None"],
    ])}</div>`,
    media: `<div class="pn">${Up("av", "Profile picture")}${Up("bimg", "Banner image")}${Up("ph", "Add a photo (up to 6)")}<label>Interests (comma separated)<input data-k="int" maxlength="90" value="${esc(d.int)}"></label></div>${Rm("av", "Remove picture")} ${Rm("bimg", "Remove banner")}<div class="ph" style="margin-top:8px;max-width:420px">${d.ph.map((x, i) => `<div><img src="${x}" alt="Photo ${i + 1}"><button class="btn sm g" data-a="rmph" data-v="${i}">Remove</button></div>`).join("")}</div><div class="err" id="uerr" role="alert"></div>`,
    blocks: `<b>Show, hide and reorder sections</b>${d.order.map((k, i) => `<div style="display:flex;gap:8px;align-items:center;padding:3px 0"><label style="margin:0;flex:1;display:flex;gap:6px;align-items:center"><input type="checkbox" data-b="${k}" ${d.hide.includes(k) ? "" : "checked"}>${LBL[k]}</label><button class="btn sm g" data-a="mv" data-v="${i}:-1" aria-label="Move up">↑</button><button class="btn sm g" data-a="mv" data-v="${i}:1" aria-label="Move down">↓</button></div>`).join("")}`,
    adv: `<label>Custom style (CSS declarations only, applied to your whole profile)<textarea rows="3" data-k="css" placeholder="letter-spacing:1px; text-shadow:0 1px 2px #0003;">${esc(d.css)}</textarea></label><div class="mut" style="color:#566873">Links, imports and positioning are blocked to keep the forum safe.</div>`,
  };
  return `<div>${M[p]}</div>`;
}
function likeBtn(p) {
  const liked = p.by.includes(S.me.id);
  return `<button class="btn sm g${V.pop == p.id ? " pop" : ""}" data-a="like" data-v="${p.id}" aria-pressed="${liked}" style="${liked ? "color:#e0245e;border-color:#e0245e" : ""}">${liked ? "❤️ Liked" : "♡ Like"}</button>`;
}
const CI = { Concern: "❓", "Org Board": "📌", "Regular post": "💬" };
const ago = (ts) => {
    if (!ts) return "";
    const d = (Date.now() - ts) / 1000;
    return d < 60 ? "Just now" : d < 3600 ? Math.floor(d / 60) + "m ago" : d < 86400 ? Math.floor(d / 3600) + "h ago" : d < 604800 ? Math.floor(d / 86400) + "d ago" : new Date(ts).toLocaleDateString([], { month: "short", day: "numeric" });
  },
  fullT = (ts) => new Date(ts).toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
function bodyPosts(f) {
  const q = V.q.toLowerCase(),
    all = S.posts.filter((p) => (p.t + p.b + p.c + user(p.u).n).toLowerCase().includes(q)).sort((a, b) => (f ? (b.ts || 0) - (a.ts || 0) : 0)),
    ps = all.filter((p) => V.cat == "All" || p.c == V.cat),
    shown = f ? ps : ps.slice(0, V.more ? 99 : 3),
    d = V.d,
    w = f ? "post" : "thread";
  const form = `<div class="card"><b>New post</b><label for="pt">Title <span class="cnt" id="ptc">${d.t.length}/80</span></label><input id="pt" maxlength="80" value="${esc(d.t)}" aria-describedby="pe"><label for="pb">Message <span class="cnt" id="pbc">${d.b.length}/500</span></label><textarea id="pb" rows="3" maxlength="500" aria-describedby="pe" placeholder="What’s on your mind? (Ctrl+Enter to post)">${esc(d.b)}</textarea><label for="pc">Category</label><select id="pc">${Object.keys(CI).map((c) => `<option ${d.c == c ? "selected" : ""}>${c}</option>`).join("")}</select><div class="mut" style="margin-top:4px">Concern = a question or problem · Org Board = announcements · Regular post = everything else</div><div style="display:flex;gap:8px;margin-top:8px"><button class="btn" data-a="post">Post</button><button class="btn g" data-a="comp">Cancel</button></div><div class="err" id="pe" role="alert"></div></div>`;
  const comp = V.comp
    ? form
    : f
      ? `<div class="card fprompt"><span class="av md" aria-hidden="true">${avh(S.me)}</span><span class="mut fpt">What’s on your mind, ${esc(S.me.n)}?</span><button class="btn" data-a="comp">＋ New post</button></div>`
      : `<button class="btn" data-a="comp" style="margin-bottom:10px">＋ New post</button>`;
  const chips = `<div class="tabs" role="group" aria-label="Filter by category">${["All", ...Object.keys(CI)].map((c) => `<button class="tab" data-a="cat" data-v="${c}" aria-pressed="${V.cat == c}">${CI[c] ? CI[c] + " " : ""}${c}</button>`).join("")}</div>`;
  const status = `<div class="mut" role="status" aria-live="polite" style="margin:0 0 8px">Showing ${shown.length} of ${ps.length} ${w}${ps.length == 1 ? "" : "s"}${V.q ? ` for “${esc(V.q)}”` : ""}</div>`;
  const list = shown
    .map((p) => {
      const a = user(p.u),
        o = V.open === p.id,
        cms = o
          ? p.cm.map((c) => {
              const x = user(c.u);
              return `<div class="cm" style="${bub(x)}"><b style="color:${T(x.t).name}">${esc(x.n)}</b><br>${esc(c.t)}</div>`;
            }).join("") + `<div style="display:flex;gap:6px;margin-top:6px"><input id="cc" placeholder="Write a comment (Enter to send)" aria-label="Comment"><button class="btn" data-a="cmt" data-v="${p.id}">Send</button></div>`
          : "";
      if (f)
        return `<article class="card fcard${V.fresh == p.id ? " fresh" : ""}" aria-labelledby="ft${p.id}"><header class="fh"><button class="avb" data-a="visit" data-v="${a.id}" aria-label="View ${esc(a.n)}’s profile"><span class="av md">${avh(a)}</span></button><div class="fm"><a href="#" data-a="visit" data-v="${a.id}" class="fn">${esc(a.n)}</a>${p.u == S.me.id ? ' <span class="tag">You</span>' : ""}<div class="mut"><time datetime="${new Date(p.ts).toISOString()}" title="${esc(fullT(p.ts))}">${ago(p.ts)}</time></div></div><span class="tag" data-c="${esc(p.c)}"><span aria-hidden="true">${CI[p.c] || ""}</span> ${esc(p.c)}</span></header><h3 id="ft${p.id}" class="ftt">${esc(p.t)}</h3><p class="fb">${esc(p.b)}</p><div class="mut fct">♥ ${p.l} ${p.l == 1 ? "like" : "likes"} · 💬 ${p.cm.length} ${p.cm.length == 1 ? "comment" : "comments"}</div><div class="fa">${likeBtn(p)} <button class="btn sm g" data-a="open" data-v="${p.id}" aria-expanded="${o}">💬 ${o ? "Hide comments" : "Comment"}</button></div>${cms}</article>`;
      return `<article class="card"><span class="tag" data-c="${esc(p.c)}"><span aria-hidden="true">${CI[p.c] || ""}</span> ${esc(p.c)}</span>${p.u == S.me.id ? ' <span class="tag">You</span>' : ""}<h3 style="margin:6px 0 2px;font-size:18px">${esc(p.t)}</h3><div class="clip">${esc(p.b)}</div><div class="mut"><a href="#" data-a="visit" data-v="${a.id}" style="color:var(--cyd)">${esc(a.n)}</a> · ${p.l} likes · ${p.cm.length} comments</div><div style="margin-top:6px">${likeBtn(p)} <button class="btn sm g" data-a="open" data-v="${p.id}" aria-expanded="${o}">💬 ${o ? "Hide" : "Comments"}</button></div>${cms}</article>`;
    })
    .join("");
  const empty = `<div class="card mut">No ${w}s match${V.q ? ` “${esc(V.q)}”` : ""}${V.cat != "All" ? ` in ${esc(V.cat)}` : ""}. <button class="btn sm g" data-a="clr">Clear search &amp; filters</button></div>`;
  return f
    ? comp + `<div class="fbar">${chips}${status}</div>` + (list || empty)
    : comp + chips + status + (list || empty) + (ps.length > 3 ? `<button class="btn sm g" data-a="more">${V.more ? "Show less" : "Show " + (ps.length - 3) + " more"}</button>` : "");
}
function bodyPeople() {
  const q = V.q.toLowerCase(),
    l = S.users.filter((u) => u.id !== S.me.id && +T(u.t).ls !== 0 && u.n.toLowerCase().includes(q));
  return `<h3 style="margin:0 0 8px">Friends <span class="mut">${l.length}</span></h3><div class="fr">${l.map((u) => `<button class="ftile" data-a="visit" data-v="${u.id}"><img src="${T(u.t).av || DEFAV}" alt=""><span>${esc(u.n)}</span></button>`).join("") || `<span class="mut">No people match.</span>`}</div>`;
}
const rulesBlock = () => `<div class="card"><button class="btn g sm" data-a="rules" aria-expanded="${S.rules}">${S.rules ? "▾" : "▸"} Rules</button>${S.rules ? `<ul><li>Be respectful</li><li>No harassment or hate speech</li><li>No spam or unauthorized selling</li></ul>` : ""}</div>`;
function pgVars(t) {
  const dk = t.card == "dark",
    o = Math.max(+t.op, 92) / 100;
  return (dk ? `--card:rgba(18,24,38,${o});--tx:#f2f6f8;--mut:#b6c8d2;--bd:rgba(255,255,255,.22);--cyd:#8fdcf8;--soft:rgba(255,255,255,.14);` : `--card:rgba(255,255,255,${o});--tx:#12212b;--mut:#566873;--bd:rgba(0,0,0,.14);--cyd:#0b6f93;--soft:#dff3fb;`) + mvars() + `font-family:${FONTS[t.font] || FONTS.Default};--r:${Math.min(+t.rad, 20)}px;`;
}
function feedBody() {
  return bodyPosts(1) + rulesBlock() + `<div style="text-align:center;margin-bottom:12px"><button class="btn g sm" data-a="reset">Reset demo data</button></div>`;
}
function peopleBody() {
  const q = V.q.toLowerCase(),
    l = S.users.filter((u) => u.id !== S.me.id && +T(u.t).ls !== 0 && (u.n + " " + T(u.t).bio + " " + T(u.t).loc).toLowerCase().includes(q));
  return `<div class="mut" role="status" aria-live="polite" style="margin:0 0 10px">${l.length} ${l.length == 1 ? "person" : "people"}${V.q ? ` match “${esc(V.q)}”` : " in the CIIT community"}</div><div class="pgrid">${l.map((u) => { const t = T(u.t); return `<article class="card pcd" style="border-top:5px solid ${t.accent}"><button class="avb" data-a="visit" data-v="${u.id}" aria-label="View ${esc(u.n)}’s profile"><span class="av lg">${avh(u)}</span></button><div class="pci"><a href="#" data-a="visit" data-v="${u.id}" class="fn">${esc(u.n)}</a><div class="mut">${esc(t.bio) || "CIIT student"}</div>${t.st ? `<div class="mut">💬 ${esc(t.st)}</div>` : ""}</div><div class="pca"><button class="btn sm g" data-a="visit" data-v="${u.id}">View profile</button>${+t.dm === 0 ? `<button class="btn sm" disabled title="${esc(u.n)} has turned messages off">✉ Messages off</button>` : `<button class="btn sm" data-a="mstart" data-v="${u.id}">✉ Message</button>`}</div></article>`; }).join("") || `<div class="card mut" style="grid-column:1/-1">No one matches. <button class="btn sm g" data-a="clr">Clear search</button></div>`}</div>`;
}
function homePage() {
  const t = T(S.me.t), pe = V.page == "people", en = V.enter ? " enter" : "";
  return `<main id="main" tabindex="-1" class="pgm" style="${bgCSS(t)}"><div class="feed${en}" style="${pgVars(t)}"><section class="card fhd"><h1>${pe ? "People" : "Home"}</h1><p class="mut" style="margin:2px 0 0">${pe ? "Discover students and school staff. Open a profile or say hi." : "The latest from students, organizations and school staff."}</p></section><div id="fd">${pe ? peopleBody() : feedBody()}</div></div></main>`;
}
const refreshQ = () => {
  const f = $("#fd"), s = $("#side");
  if (f) f.innerHTML = V.page == "people" ? peopleBody() : feedBody();
  else if (s) s.innerHTML = sideInner();
};
function sideInner() {
  const sh = S.show,
    hint = S.hint !== false ? `<div class="card"><b>Welcome! 3 quick steps</b><ol style="margin:6px 0;padding-left:20px"><li>Press the <b>⚙ gear</b> on your banner to make your page your own</li><li>Open a thread and leave a comment</li><li>Ask a question under <b>Concern</b></li></ol><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn sm" data-a="nav" data-v="home">Go to Home Feed →</button><button class="btn sm g" data-a="hint">Got it, hide this</button></div></div>` : "";
  return hint + `<div class="tabs" role="group" aria-label="Sections">${[
    ["posts", "Posts"],
    ["people", "People"],
  ]
    .map(
      ([k, l]) =>
        `<button class="tab" data-a="tg" data-v="${k}" aria-pressed="${sh[k]}">${l}</button>`,
    )
    .join(
      "",
    )}</div><div id="sb">${sh.posts ? `<div>${bodyPosts()}</div>` : ""}${sh.people ? `<div style="margin-bottom:12px">${bodyPeople()}</div>` : ""}</div>
 ${rulesBlock()}<button class="btn g sm" data-a="reset">Reset demo data</button>`;
}
function render() {
  const a = $("#app");
  if (!S.me) {
    a.innerHTML = `<div class="login card"><h1 style="color:var(--cyd)">CIIT Forum</h1><p class="mut">${V.login == "up" ? "Create your account" : "Log in to continue"}. An account is required.</p>${V.login == "up" ? `<label for="ln">Display name</label><input id="ln" autocomplete="nickname" aria-describedby="lerr">` : ""}<label for="le">Email</label><input id="le" type="email" autocomplete="email" aria-describedby="lerr" placeholder="you@example.com"><label for="lp">Password</label><input id="lp" type="password" autocomplete="current-password" aria-describedby="lerr" placeholder="At least 8 characters"><label style="display:flex;gap:6px;align-items:center;font-weight:400"><input type="checkbox" data-showpw> Show password</label><div class="err" id="lerr" role="alert" style="min-height:22px"></div><button class="btn" style="width:100%" data-a="auth">${V.login == "up" ? "Sign up" : "Log in"}</button>${V.login == "in" ? `<div class="demo"><b>Try the demo account</b><br>Email: ${DEMO.email}<br>Password: ${DEMO.pw}<br><button class="btn sm g" style="margin-top:6px" data-a="demo">Fill in demo login</button></div>` : ""}<p><a href="#" data-a="tog" style="color:var(--cyd)">${V.login == "up" ? "I already have an account" : "Create an account"}</a> · <a href="#" data-a="forgot" style="color:var(--cyd)">Forgot password?</a></p></div>`;
    return;
  }
  const sm = $("#main")?.scrollTop,
    sa = $("#side")?.scrollTop,
    own = !V.view || V.view == S.me.id,
    vu = own ? S.me : user(V.view),
    t = V.edit || T(vu.t);
  a.innerHTML = `<a class="skip" href="#main">Skip to content</a><header class="hdr"><a href="#" class="brand" data-a="home" aria-label="CIIT Forum home">CIIT Forum</a><input id="q" type="search" placeholder="${V.page =="people" ?"Search people…" :"Search posts, people… (press /)"}" aria-label="Search threads and people" value="${esc(V.q)}"><span class="sp"></span>${navHTML()}<span class="who" style="color:#cfe3ec">Signed in as <strong>${esc(S.me.n)}</strong></span><button class="btn g sm" data-a="out">Log out</button></header>
 ${V.page == "home" || V.page == "people" ? homePage() : V.page == "msgs" ? `<div class="mpg" style="${bgCSS(T(S.me.t))}"><div id="mp">${mpHTML()}</div></div>` : `<div class="mt"><button class="tab" data-a="mt" data-v="profile" aria-selected="${V.tab == "profile"}">Profile</button><button class="tab" data-a="mt" data-v="feed" aria-selected="${V.tab == "feed"}">Feed</button></div>
 <div class="wrap"><main id="main" tabindex="-1" class="${V.tab == "feed" ? "hid" : ""}" style="${bgCSS(own || !V.plain ? t : T({}))}">${V.edit || !own ? `<div class="bar" id="bar">${barHTML(own, vu)}</div>` : ""}<div id="panel">${V.edit ? panel() : ""}</div><div id="pvw">${prof(vu, t, !!V.edit, V.plain && !own)}</div>${V.edit ? `<div class="sv"><button class="btn" data-a="save">Save</button><button class="btn g" data-a="cancel">Cancel</button><button class="btn g" data-a="def">Reset to default</button><span id="dirty" class="mut" style="color:#566873" role="status">No changes yet</span> <span id="warn">${warn(V.edit)}</span></div>` : ""}</main>
 <aside id="side" aria-label="Forum threads and people" class="${V.tab == "profile" ? "hid" : ""}" style="background:${sideBg(t)}">${sideInner()}</aside></div>`}<div id="chat">${chatHTML()}</div>`;
  V.enter = 0;
  if (sm && $("#main")) $("#main").scrollTop = sm;
  if (sa && $("#side")) $("#side").scrollTop = sa;
  document.querySelectorAll(".mlog").forEach((l) => (l.scrollTop = l.scrollHeight));
}
function pv() {
  const d = V.edit;
  $("#pvw").innerHTML = prof(S.me, d, true, false);
  $("#main").style.cssText = bgCSS(d);
  $("#side").style.background = sideBg(d);
  ds();
}
function rp() {
  $("#bar").innerHTML = barHTML(true, S.me);
  $("#panel").innerHTML = panel();
}
const isDirty = () => {
  if (!V.edit) return false;
  const { n, ...t } = V.edit;
  return JSON.stringify(t) != JSON.stringify(T(S.me.t)) || n != S.me.n;
};
const discardOk = () => !isDirty() || confirm("Discard your unsaved changes?");
const ds = () => {
  const d = $("#dirty");
  if (!d) return;
  const x = isDirty();
  d.textContent = x ? "● Unsaved changes" : "No changes yet";
  d.className = x ? "dirty" : "mut";
};
window.addEventListener("beforeunload", (e) => {
  if (isDirty()) { e.preventDefault(); e.returnValue = ""; }
});
document.addEventListener("keydown", (e) => {
  const t = e.target, typing = /INPUT|TEXTAREA|SELECT/.test(t.tagName) || t.isContentEditable;
  if (e.key == "/" && !typing && $("#q")) { e.preventDefault(); $("#q").focus(); return; }
  if ((e.key == "ArrowDown" || e.key == "ArrowUp") && t.classList?.contains("gi")) {
    e.preventDefault();
    const it = [...document.querySelectorAll(".gi")], i = it.indexOf(t) + (e.key == "ArrowDown" ? 1 : -1);
    it[(i + it.length) % it.length].focus();
    return;
  }
  if ((e.key == "ArrowLeft" || e.key == "ArrowRight") && t.dataset?.rsz !== undefined && V.edit) {
    e.preventDefault();
    V.edit.pcw = Math.min(960, Math.max(360, postW(V.edit) + (e.key == "ArrowRight" ? 20 : -20)));
    V.edit.psz = "custom";
    pv();
    rp();
    $("[data-rsz]")?.focus();
    return;
  }
  if (e.key == "Escape") {
    if (V.chat.open && t.closest && t.closest("#chat")) { act("ccls"); return; }
    if (V.menu) { V.menu = false; render(); $('[data-a="gear"]')?.focus(); }
    else if (V.edit) act("cancel");
    else if (V.comp) act("comp");
    else if (t.id == "q" && V.q) { V.q = ""; t.value = ""; refreshQ(); }
    return;
  }
  if (e.key == "Enter" && t.tagName == "INPUT" && !e.shiftKey) {
    const m = { le: "auth", lp: "auth", ln: "auth", cc: "cmt", wc: "wall", mi: "msend", ci: "msend" }[t.id];
    if (m) { e.preventDefault(); $(`[data-a="${m}"]`)?.click(); }
  }
  if (e.key == "Enter" && (e.ctrlKey || e.metaKey) && t.id == "pb") $('[data-a="post"]')?.click();
});
const draft = () => {
  V.edit = JSON.parse(JSON.stringify({ ...T(S.me.t), n: S.me.n }));
  V.panel = "themes";
  V.tab = "profile";
};
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-a]");
  if (V.menu && !e.target.closest(".gm") && !(b && b.dataset.a == "gear")) {
    V.menu = false;
    render();
  }
  if (!b) return;
  if (b.tagName == "A") e.preventDefault();
  const a = b.dataset.a, v = b.dataset.v;
  act(a, v);
  if (document.activeElement === document.body || !document.body.contains(document.activeElement)) {
    const sel = `[data-a="${a}"]` + (v != null ? `[data-v="${CSS.escape(v)}"]` : "");
    const el = (a == "comp" && V.comp && $("#pt")) || (a == "open" && V.open && $("#cc")) || (a == "gear" && V.menu && $(".gi")) || $(sel) ||
      (a == "post" && $('[data-a="comp"]')) || $("#main") || $("#le");
    el && el.focus();
  }
});
document.addEventListener("input", (e) => {
  const b = e.target;
  if (b.id == "pt" || b.id == "pb") {
    const k = b.id == "pt" ? "t" : "b";
    V.d[k] = b.value;
    b.removeAttribute("aria-invalid");
    $("#" + b.id + "c").textContent = b.value.length + "/" + (k == "t" ? 80 : 500);
    return;
  }
  if (b.id == "mi" || b.id == "ci") {
    V.md[curC()] = b.value;
    b.removeAttribute("aria-invalid");
    const er = $("#merr");
    if (er) er.textContent = "";
    return;
  }
  if (b.id == "ms") {
    V.ms = b.value;
    $("#mlist").innerHTML = mlist(V.page == "msgs" ? "mopen" : "copen");
    return;
  }
  if (b.id == "q") {
    V.q = b.value;
    refreshQ();
    return;
  }
  const k = b.dataset.k;
  if (!k || !V.edit) return;
  V.edit[k] = b.isContentEditable ? b.textContent : b.value;
  if (k == "pcw") V.edit.psz = "custom";
  if (!b.isContentEditable) {
    const sp = $("#v_" + k);
    if (sp) sp.textContent = b.value;
    pv();
  }
  $("#warn").innerHTML = warn(V.edit);
  ds();
});
document.addEventListener("change", (e) => {
  const b = e.target;
  if (b.id == "pc") V.d.c = b.value;
  if (b.hasAttribute("data-showpw")) $("#lp").type = b.checked ? "text" : "password";
  if (b.hasAttribute("data-plain")) {
    V.plain = b.checked;
    render();
  }
  if (b.dataset.b) {
    const h = V.edit.hide,
      k = b.dataset.b,
      i = h.indexOf(k);
    if (b.checked && i > -1) h.splice(i, 1);
    if (!b.checked && i < 0) h.push(k);
    pv();
  }
  if (b.dataset.up) upload(b.files[0], b.dataset.up);
  if (b.dataset.k == "pcw") rp();
  if (b.dataset.k == "card" || b.dataset.k == "bubble" || b.dataset.k == "name")
    $("#warn").innerHTML = warn(V.edit);
});
function upload(f, k) {
  const er = $("#uerr"),
    bad = (m) => {
      if (er) er.textContent = m;
      toast(m);
    };
  if (!f) return;
  if (!["image/png", "image/jpeg", "image/webp"].includes(f.type))
    return bad("Unsupported file type. Please choose a JPG, PNG or WebP image.");
  if (f.size > 512000)
    return bad(
      "That image is " + Math.round(f.size / 1024) + " KB. Please choose one under 500 KB.",
    );
  if (k == "ph" && V.edit.ph.length >= 6)
    return bad("You can add up to 6 photos. Remove one first.");
  const r = new FileReader();
  r.onload = () => {
    k == "ph" ? V.edit.ph.push(r.result) : (V.edit[k] = r.result);
    rp();
    pv();
    toast("Image added to preview");
  };
  r.readAsDataURL(f);
}
function act(a, v) {
  const A = {
    tog() {
      V.login = V.login == "in" ? "up" : "in";
      render();
    },
    forgot() {
      $("#lerr").textContent = "Demo only: a reset link would be sent to your email.";
    },
    auth() {
      const E = $("#le"), P = $("#lp"), N = $("#ln"), er = $("#lerr"),
        e = E.value.trim(), p = P.value, n = N ? N.value.trim() : "";
      [E, P, N].forEach((x) => x && x.removeAttribute("aria-invalid"));
      er.textContent = "";
      const bad = (x, m) => { er.textContent = m; x.setAttribute("aria-invalid", "true"); x.focus(); };
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return bad(E, "Please enter a valid email, like you@example.com.");
      if (p.length < 8) return bad(P, "Password needs at least 8 characters (yours has " + p.length + ").");
      if (V.login == "up" && !n) return bad(N, "Please choose a display name. A nickname is fine.");
      if (V.login == "in" && e.toLowerCase() == DEMO.email) {
        if (p !== DEMO.pw) return bad(P, "That’s not the demo password. It’s shown below the form.");
        return loginAs(DEMO.id);
      }
      join(n || e.split("@")[0]);
    },
    demo() {
      $("#le").value = DEMO.email;
      $("#lp").value = DEMO.pw;
      $("#lerr").textContent = "Demo login filled in. Press Log in.";
      $('[data-a="auth"]').focus();
    },
    gear() {
      V.menu = !V.menu;
      render();
    },
    gm() {
      V.menu = false;
      draft();
      V.panel = { info: "info", themes: "themes", colors: "colors", style: "style", media: "media", layout: "layout", arrange: "blocks", privacy: "privacy" }[v];
      render();
    },
    out() {
      if (!discardOk()) return;
      resetView();
      S.me = null;
      S.users = S.users.filter((u) => u.id != "me");
      save();
      V.view = null;
      V.edit = null;
      render();
    },
    edit() {
      draft();
      render();
    },
    pn() {
      V.panel = V.panel == v ? null : v;
      rp();
    },
    pre() {
      const o = V.edit,
        n = T(PRE[v]);
      CK2.forEach((k) => (n[k] = o[k]));
      V.edit = JSON.parse(JSON.stringify(n));
      pv();
      rp();
      $("#warn").innerHTML = warn(V.edit);
    },
    def() {
      const o = V.edit,
        n = T({});
      CK.forEach((k) => (n[k] = o[k]));
      V.edit = n;
      pv();
      rp();
      toast("Reset to default theme");
    },
    rm() {
      V.edit[v] = v == "bg2" ? "" : "";
      pv();
      rp();
    },
    rmph() {
      V.edit.ph.splice(+v, 1);
      rp();
      pv();
    },
    mv() {
      const [i, d] = v.split(":").map(Number),
        o = V.edit.order,
        j = i + d;
      if (j < 0 || j >= o.length) return;
      [o[i], o[j]] = [o[j], o[i]];
      rp();
      pv();
    },
    fix() {
      const d = V.edit,
        cc = d.card == "dark" ? "#121826" : "#ffffff";
      d.name = on(cc);
      if (rat(d.name, d.bubble) < 4.5) d.bubble = cc;
      d.op = Math.max(+d.op, 70);
      rp();
      pv();
      $("#warn").innerHTML = warn(d);
    },
    save() {
      const { n, ...t } = V.edit;
      if (!n.trim()) return toast("Your name can’t be empty.");
      S.me.n = n.trim();
      S.me.t = t;
      V.edit = null;
      V.panel = null;
      const ok = save();
      render();
      toast(
        ok
          ? "Profile saved"
          : "Saved for now, but images are too big to keep after you close the tab",
      );
    },
    cancel() {
      if (!discardOk()) return;
      V.edit = null;
      V.panel = null;
      render();
    },
    nav() {
      if (!discardOk()) return;
      Object.assign(V, { edit: null, panel: null, menu: false, view: null, ret: null, enter: 1, plain: false });
      if (v == "home" || v == "people") {
        V.page = v;
        if (v == "home" && S.me.seen === false) {
          S.me.seen = true;
          save();
        }
      } else {
        V.page = null;
        V.tab = "profile";
      }
      render();
      const m = $("#main");
      if (m) m.scrollTop = 0;
    },
    visit() {
      if (!discardOk()) return;
      V.ret = ["home", "people", "msgs"].includes(V.page) ? V.page : V.view ? V.ret : null;
      V.page = null;
      V.view = v == S.me.id ? null : v;
      if (!V.view) V.ret = null;
      V.plain = false;
      V.tab = "profile";
      V.edit = null;
      render();
      $("#main").scrollTop = 0;
    },
    back() {
      V.view = null;
      if (V.ret) {
        V.page = V.ret;
        V.ret = null;
        V.enter = 1;
      }
      render();
    },
    home() {
      v = "home";
      A.nav();
    },
    hint() {
      S.hint = false;
      save();
      render();
      toast("Tip hidden. You can reset it from “Reset demo data”.");
    },
    cat() {
      V.cat = v;
      V.more = 0;
      render();
    },
    clr() {
      V.q = "";
      V.cat = "All";
      render();
      toast("Showing all threads");
    },
    tg() {
      S.show[v] = !S.show[v];
      if (!S.show.posts && !S.show.people) {
        S.show = { posts: true, people: true };
        toast("Both sections were off, so both are showing again");
      }
      save();
      render();
    },
    rules() {
      S.rules = !S.rules;
      save();
      render();
    },
    mt() {
      V.tab = v;
      render();
    },
    open() {
      V.open = V.open == +v ? null : +v;
      render();
    },
    like() {
      const p = S.posts.find((x) => x.id == v),
        i = p.by.indexOf(S.me.id);
      if (i < 0) {
        p.by.push(S.me.id);
        p.l++;
        toast("Liked");
      } else {
        p.by.splice(i, 1);
        p.l--;
        toast("Like removed");
      }
      save();
      V.pop = +v;
      render();
      V.pop = null;
    },
    comp() {
      if (V.comp) {
        if ((V.d.t || V.d.b) && !confirm("Discard this draft?")) return;
        V.d = { t: "", b: "", c: "Regular post" };
      }
      V.comp = !V.comp;
      render();
    },
    more() {
      V.more = !V.more;
      render();
    },
    cmt() {
      const i = $("#cc");
      if (!i.value.trim()) return toast("Write something first");
      S.posts.find((x) => x.id == v).cm.push({ u: S.me.id, t: i.value.trim() });
      save();
      render();
      toast("Comment posted");
    },
    wall() {
      const i = $("#wc");
      if (!i.value.trim()) return toast("Write something first");
      const u = user(V.view);
      (u.wall = u.wall || []).push({ u: S.me.id, t: i.value.trim() });
      save();
      render();
      toast("Comment posted");
    },
    post() {
      const t = $("#pt").value.trim(),
        b = $("#pb").value.trim();
      if (!t || !b) {
        $("#pe").textContent = !t ? "Please add a title." : "Please write a message.";
        const f = $(!t ? "#pt" : "#pb");
        f.setAttribute("aria-invalid", "true");
        return f.focus();
      }
      S.posts.unshift({
        id: Date.now(),
        ts: Date.now(),
        c: $("#pc").value,
        u: S.me.id,
        t,
        b,
        l: 0,
        cm: [],
        by: [],
      });
      V.comp = 0;
      V.d = { t: "", b: "", c: "Regular post" };
      V.cat = "All";
      V.q = "";
      save();
      V.fresh = S.posts[0].id;
      render();
      V.fresh = null;
      const m = $("#main");
      if (m) m.scrollTop = 0;
      toast("Posted! Your post is at the top of the feed.");
    },
    lay() {
      V.edit.lay = v;
      pv();
      rp();
      toast((v == "timeline" ? "Centered Timeline" : "Classic") + " layout previewed. Press Save to keep it.");
    },
    psz() {
      V.edit.psz = v;
      V.edit.pcw = 0;
      pv();
      rp();
    },
    ptab() {
      V.ptab = v;
      V.edit ? pv() : render();
    },
    msgpage() {
      if (V.page == "msgs") return;
      if (!discardOk()) return;
      V.edit = null;
      V.panel = null;
      V.menu = false;
      V.mfrom = V.page;
      V.page = "msgs";
      render();
      $("#ms")?.focus();
    },
    mexit() {
      V.page = V.mfrom || null;
      V.enter = 1;
      render();
      $("#mnav")?.focus();
    },
    mopen() {
      V.mc = v;
      mark(getC(v));
      mr("#mi");
    },
    mback() {
      V.mc = null;
      mr();
      $("#ms")?.focus();
    },
    mnew() {
      V.mnew = V.mnew ? 0 : 1;
      mr(V.mnew ? ".mpick .ftile" : "");
    },
    mstart() {
      const c = mkC(v);
      V.mnew = 0;
      V.ms = "";
      mark(c);
      if (V.page == "msgs" || mobile()) {
        V.page = "msgs";
        V.mc = c.id;
        render();
        $("#mi")?.focus();
      } else {
        V.chat = { open: 1, min: 0, cid: c.id };
        mr("#ci");
      }
    },
    copen() {
      V.chat.cid = v;
      mark(getC(v));
      mr("#ci");
    },
    cback() {
      V.chat.cid = null;
      mr("#ms");
    },
    cht() {
      if (mobile()) return act("msgpage");
      V.chat.open = 1;
      V.chat.min = 0;
      mr(".cw .mlist .mrow, #ci, #ms");
    },
    cmin() {
      V.chat.min = !V.chat.min;
      if (!V.chat.min) mark(getC(V.chat.cid));
      mr(V.chat.min ? '[data-a="cmin"]' : "#ci, #ms");
    },
    cmax() {
      V.mc = V.chat.cid;
      V.chat.open = 0;
      V.mfrom = V.page;
      V.page = "msgs";
      mark(getC(V.mc));
      render();
    },
    ccls() {
      V.chat = { open: 0, min: 0, cid: null };
      mr('[data-a="cht"]');
    },
    msend() {
      const i = $("#mi") || $("#ci"), c = getC(curC()), er = $("#merr");
      if (!i || !c) return;
      const t = i.value.trim();
      if (!t) {
        er.textContent = "Type a message before sending.";
        i.setAttribute("aria-invalid", "true");
        return i.focus();
      }
      if (+T(other(c).t).dm === 0) return (er.textContent = other(c).n + " has turned messages off.");
      const ts = Date.now();
      c.m.push({ f: S.me.id, t, ts });
      c.rd[S.me.id] = ts;
      delete V.md[c.id];
      const ok = save();
      mr("#" + i.id);
      if (!ok) toast("Couldn’t save on this device. Storage may be full.");
    },
    mdel() {
      if (!confirm("Delete this conversation from your inbox? The other person keeps their copy.")) return;
      const c = getC(v);
      c.hd[S.me.id] = Date.now();
      if (V.page == "msgs") V.mc = null;
      if (V.chat.cid == v) V.chat.cid = null;
      save();
      mr();
      toast("Conversation deleted");
    },
    reset() {
      if (!confirm("Reset all demo data?")) return;
      localStorage.removeItem("ciitf4");
      S = load();
      normalize();
      V.view = null;
      V.edit = null;
      render();
      toast("Demo data reset");
    },
  };
  A[a] && A[a]();
}
function resetView() {
  Object.assign(V, {
    view: null,
    edit: null,
    panel: null,
    plain: false,
    open: null,
    tab: "profile",
    q: "",
    comp: 0,
    more: 0,
    cat: "All",
    d: { t: "", b: "", c: "Regular post" },
    page: null,
    ret: null,
    mfrom: null,
    enter: 0,
    fresh: null,
    mc: null,
    ms: "",
    md: {},
    mnew: 0,
    ptab: "posts",
    chat: { open: 0, min: 0, cid: null },
  });
}
function loginAs(id) {
  resetView();
  S.me = S.users.find((u) => u.id == id);
  V.page = S.me.seen === false ? null : "home";
  V.enter = 1;
  save();
  render();
  toast("Welcome back, " + S.me.n + "!");
}
function join(n) {
  resetView();
  try {
    joinNow(n);
  } catch (err) {
    S.me = null;
    render();
    $("#lerr").textContent = "Something went wrong: " + err.message;
  }
}
function joinNow(n) {
  S.me = {
    id: "me",
    n,
    t: T({ bio: "CIIT student", st: "Just joined!", q: "Hello, CIIT!" }),
    wall: [],
    seen: false,
  };
  S.users = S.users.filter((u) => u.id != "me");
  S.users.push(S.me);
  save();
  draft();
  render();
  toast("Welcome, " + n + "! Make your profile your own.");
}
let DR = null;
document.addEventListener("pointerdown", (e) => {
  const h = e.target.closest?.("[data-rsz]");
  if (!h || !V.edit) return;
  e.preventDefault();
  DR = { x: e.clientX, w: postW(V.edit), h };
  h.setPointerCapture?.(e.pointerId);
  document.body.classList.add("rszing");
});
document.addEventListener("pointermove", (e) => {
  if (!DR) return;
  const w = Math.round(Math.min(960, Math.max(360, DR.w + 2 * (e.clientX - DR.x))) / 10) * 10;
  V.edit.pcw = w;
  V.edit.psz = "custom";
  $("#pw").style.setProperty("--pw", w + "px");
  DR.h.setAttribute("aria-valuenow", w);
  ds();
});
const endDrag = () => {
  if (!DR) return;
  DR = null;
  document.body.classList.remove("rszing");
  rp();
};
document.addEventListener("pointerup", endDrag);
document.addEventListener("pointercancel", endDrag);
if (S.me && S.me.seen !== false) V.page = "home";
render();
