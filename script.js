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
  order: ["about", "interests", "photos", "comments", "posts"],
  hide: [],
  css: "",
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
const T = (t) => ({ ...DEF, ...t }),
  CK = ["n", "bio", "st", "q", "song", "loc", "int", "about"],
  CK2 = [...CK, "ph", "av", "bimg", "order", "hide"];
const U = (id, n, p, o) => ({ id, n, t: T({ ...PRE[p], ...o }), wall: o.w || [] });
const SEED = {
  users: [
    U("u1", "User1", "Midnight", {
      bio: "BSCS 3rd year",
      st: "Debugging life ☕",
      q: "It works on my machine.",
      song: "Lo-fi beats",
      loc: "Quezon City",
      int: "coding, ramen, chess",
      about: "Ask me about Python and why my code only works at 2 AM.",
      w: [{ u: "u2", t: "Best study buddy ever!" }],
    }),
    U("u2", "Bogart", "Bubblegum", {
      bio: "BA Multimedia",
      st: "Drawing till dawn",
      q: "Make it pop!",
      song: "City pop mix",
      loc: "Manila",
      int: "art, anime, matcha",
      about: "Poster designer and sticker addict.",
      w: [{ u: "u3", t: "Loved your org fair poster 🎨" }],
    }),
    U("u3", "Jo", "Sunset", {
      bio: "BSIT 2nd year",
      st: "Looking for org mates",
      q: "Sleep is optional.",
      loc: "Makati",
      int: "events, photography",
      about: "Org officer. Come say hi at the booth!",
    }),
    U("u4", "John", "Forest", {
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
  };
const load = () => {
  try {
    const s = JSON.parse(localStorage.getItem("ciitf2") || "null");
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
    localStorage.setItem("ciitf2", JSON.stringify(S));
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
  S.posts.forEach((p) => {
    p.c = CATS[p.c] || p.c;
    p.by = p.by || [];
  });
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
const avh = (u) => (T(u.t).av ? `<img src="${T(u.t).av}" alt="">` : esc(u.n[0]));
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
  const posts = S.posts.filter((p) => p.u === u.id);
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
      `<h3>Comments</h3>${
        (u.wall || [])
          .map((c) => {
            const w = user(c.u);
            return `<div class="cm" style="${bub(w)}"><b style="color:${T(w.t).name}">${esc(w.n)}</b><br>${esc(c.t)}</div>`;
          })
          .join("") || `<span class="mut">No comments yet.</span>`
      }${ed || u.id == S.me.id ? "" : `<div style="display:flex;gap:6px;margin-top:8px"><input id="wc" placeholder="Leave a comment" aria-label="Comment"><button class="btn" data-a="wall">Send</button></div>`}`,
    posts: () =>
      `<h3>Posts</h3>${posts.map((p) => `<div>• ${esc(p.t)}</div>`).join("") || `<span class="mut">No posts yet.</span>`}`,
  };
  return `<div id="pw" style="font-family:${FONTS[s.font]};font-size:${s.sz}px;${plain ? "" : safe(t.css)}"><section class="hero" style="${card}overflow:hidden"><div class="ban" style="background:${t.bimg ? `url(${t.bimg}) center/cover` : s.ban || s.accent}"></div><div class="hrow"><div class="av big" style="background:${s.accent}">${t.av ? `<img src="${t.av}" alt="">` : esc(nm[0] || "?")}</div><div><h1 style="color:${s.name}" ${e("n")}>${esc(nm)}</h1>${ln("", "bio")}${ln("💬", "st")}${ln("❝", "q")}${ln("🎵", "song")}${ln("📍", "loc")}</div></div></section>
 <div class="blks">${t.order
   .filter((k) => !t.hide.includes(k))
   .map(
     (k) =>
       `<section class="blk ${k == "photos" || k == "comments" ? "span" : ""}" style="${card}">${B[k]()}</section>`,
   )
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
  ["themes", "🎨 Themes"],
  ["colors", "Colors"],
  ["bg", "Background"],
  ["style", "Style"],
  ["media", "Media"],
  ["blocks", "Blocks"],
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
    ? `<button class="btn" data-a="edit">✏️ Edit profile</button>`
    : `<button class="btn sm" data-a="back">← Back to my profile</button><label style="margin:0;display:flex;gap:6px;align-items:center;color:#12212b"><input type="checkbox" data-plain ${V.plain ? "checked" : ""}> View without custom theme</label>`;
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
  const M = {
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
    blocks: `<b>Show, hide and reorder sections</b>${d.order.map((k, i) => `<div style="display:flex;gap:8px;align-items:center;padding:3px 0"><label style="margin:0;flex:1;display:flex;gap:6px;align-items:center"><input type="checkbox" data-b="${k}" ${d.hide.includes(k) ? "" : "checked"}>${k[0].toUpperCase() + k.slice(1)}</label><button class="btn sm g" data-a="mv" data-v="${i}:-1" aria-label="Move up">↑</button><button class="btn sm g" data-a="mv" data-v="${i}:1" aria-label="Move down">↓</button></div>`).join("")}`,
    adv: `<label>Custom style (CSS declarations only, applied to your whole profile)<textarea rows="3" data-k="css" placeholder="letter-spacing:1px; text-shadow:0 1px 2px #0003;">${esc(d.css)}</textarea></label><div class="mut" style="color:#566873">Links, imports and positioning are blocked to keep the forum safe.</div>`,
  };
  return `<div>${M[p]}</div>`;
}
function likeBtn(p) {
  const liked = p.by.includes(S.me.id);
  return `<button class="btn sm g" data-a="like" data-v="${p.id}" aria-pressed="${liked}" style="${liked ? "color:#e0245e;border-color:#e0245e" : ""}">${liked ? "❤️ Liked" : "♡ Like"}</button>`;
}
function bodyPosts() {
  const q = V.q.toLowerCase(),
    ps = S.posts.filter((p) => (p.t + p.b + p.c + user(p.u).n).toLowerCase().includes(q));
  return (
    (V.comp
      ? `<div class="card"><b>New post</b><input id="pt" placeholder="Title" aria-label="Title"><textarea id="pb" rows="2" placeholder="What’s on your mind?" aria-label="Message" style="margin-top:6px"></textarea><div style="display:flex;gap:8px;margin-top:6px"><select id="pc" aria-label="Category" style="flex:1"><option>Regular post</option><option>Concern</option><option>Org Board</option></select><button class="btn" data-a="post">Post</button><button class="btn g" data-a="comp">Cancel</button></div><div class="err" id="pe" role="alert"></div></div>`
      : `<button class="btn" data-a="comp" style="margin-bottom:10px">＋ New post</button>`) +
    (ps
      .slice(0, V.more ? 99 : 3)
      .map((p) => {
        const a = user(p.u),
          o = V.open === p.id;
        return `<article class="card"><span class="tag">${esc(p.c)}</span><h3 style="margin:4px 0 2px;font-size:16px">${esc(p.t)}</h3><div class="clip">${esc(p.b)}</div><div class="mut"><a href="#" data-a="visit" data-v="${a.id}" style="color:var(--cyd)">${esc(a.n)}</a> · ${p.l} likes · ${p.cm.length} comments</div><div style="margin-top:6px">${likeBtn(p)} <button class="btn sm g" data-a="open" data-v="${p.id}" aria-expanded="${o}">💬 ${o ? "Hide" : "Comments"}</button></div>${
          o
            ? p.cm
                .map((c) => {
                  const w = user(c.u);
                  return `<div class="cm" style="${bub(w)}"><b style="color:${T(w.t).name}">${esc(w.n)}</b><br>${esc(c.t)}</div>`;
                })
                .join("") +
              `<div style="display:flex;gap:6px;margin-top:6px"><input id="cc" placeholder="Write a comment" aria-label="Comment"><button class="btn" data-a="cmt" data-v="${p.id}">Send</button></div>`
            : ""
        }</article>`;
      })
      .join("") || `<div class="card mut">No threads match “${esc(V.q)}”.</div>`) +
    (ps.length > 3
      ? `<button class="btn sm g" data-a="more">${V.more ? "Show less" : "Show " + (ps.length - 3) + " more"}</button>`
      : "")
  );
}
function bodyPeople() {
  const q = V.q.toLowerCase(),
    l = S.users.filter((u) => u.id !== S.me.id && u.n.toLowerCase().includes(q));
  return `<h3 style="margin:0 0 8px">Friends & people</h3><div class="fr">${l.map((u) => `<button class="tile" data-a="visit" data-v="${u.id}"><span class="av sm" style="background:${T(u.t).accent}">${avh(u)}</span><span>${esc(u.n)}<br><span class="mut">${esc(T(u.t).bio)}</span></span></button>`).join("") || `<span class="mut">No people match.</span>`}</div>`;
}
function sideInner() {
  const sh = S.show;
  return `<div class="tabs" role="group" aria-label="Sections">${[
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
 <div class="card"><button class="btn g sm" data-a="rules" aria-expanded="${S.rules}">${S.rules ? "▾" : "▸"} Rules</button>${S.rules ? `<ul><li>Be respectful</li><li>No harassment or hate speech</li><li>No spam or unauthorized selling</li></ul>` : ""}</div><button class="btn g sm" data-a="reset">Reset demo data</button>`;
}
function render() {
  const a = $("#app");
  if (!S.me) {
    a.innerHTML = `<div class="login card"><h1 style="color:var(--cyd)">CIIT Forum</h1><p class="mut">${V.login == "up" ? "Create your account" : "Log in to continue"}. An account is required.</p>${V.login == "up" ? `<label for="ln">Display name (a nickname is fine)</label><input id="ln">` : ""}<label for="le">Email</label><input id="le" type="email" placeholder="you@example.com"><label for="lp">Password</label><input id="lp" type="password" placeholder="At least 8 characters"><div class="err" id="lerr" role="alert" style="min-height:22px"></div><button class="btn" style="width:100%" data-a="auth">${V.login == "up" ? "Sign up" : "Log in"}</button><button class="btn g" style="width:100%;margin-top:8px" data-a="anon">Continue anonymously</button><p><a href="#" data-a="tog" style="color:var(--cyd)">${V.login == "up" ? "I already have an account" : "Create an account"}</a> · <a href="#" data-a="forgot" style="color:var(--cyd)">Forgot password?</a></p><p class="mut">Any email works. Your email is never shown to others.</p></div>`;
    return;
  }
  const sm = $("#main")?.scrollTop,
    sa = $("#side")?.scrollTop,
    own = !V.view || V.view == S.me.id,
    vu = own ? S.me : user(V.view),
    t = V.edit || T(vu.t);
  a.innerHTML = `<header class="hdr"><b>CIIT Forum</b><input id="q" type="search" placeholder="Search threads, people…" aria-label="Search" value="${esc(V.q)}"><span class="sp"></span><span>${esc(S.me.n)}</span><button class="btn g sm" data-a="out">Log out</button></header>
 <div class="mt"><button class="tab" data-a="mt" data-v="profile" aria-selected="${V.tab == "profile"}">Profile</button><button class="tab" data-a="mt" data-v="feed" aria-selected="${V.tab == "feed"}">Feed</button></div>
 <div class="wrap"><main id="main" class="${V.tab == "feed" ? "hid" : ""}" style="${bgCSS(own || !V.plain ? t : T({}))}"><div class="bar" id="bar">${barHTML(own, vu)}</div><div id="panel">${V.edit ? panel() : ""}</div><div id="pvw">${prof(vu, t, !!V.edit, V.plain && !own)}</div>${V.edit ? `<div class="sv"><button class="btn" data-a="save">Save</button><button class="btn g" data-a="cancel">Cancel</button><button class="btn g" data-a="def">Reset to default</button><span id="warn">${warn(V.edit)}</span></div>` : ""}</main>
 <aside id="side" class="${V.tab == "profile" ? "hid" : ""}" style="background:${sideBg(t)}">${sideInner()}</aside></div>`;
  if (sm) $("#main").scrollTop = sm;
  if (sa) $("#side").scrollTop = sa;
}
function pv() {
  const d = V.edit;
  $("#pvw").innerHTML = prof(S.me, d, true, false);
  $("#main").style.cssText = bgCSS(d);
  $("#side").style.background = sideBg(d);
}
function rp() {
  $("#bar").innerHTML = barHTML(true, S.me);
  $("#panel").innerHTML = panel();
}
const draft = () => {
  V.edit = JSON.parse(JSON.stringify({ ...T(S.me.t), n: S.me.n }));
  V.panel = "themes";
  V.tab = "profile";
};
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-a]");
  if (!b) return;
  if (b.tagName == "A") e.preventDefault();
  act(b.dataset.a, b.dataset.v);
});
document.addEventListener("input", (e) => {
  const b = e.target;
  if (b.id == "q") {
    V.q = b.value;
    const s = $("#side");
    s.innerHTML = sideInner();
    return;
  }
  const k = b.dataset.k;
  if (!k || !V.edit) return;
  V.edit[k] = b.isContentEditable ? b.textContent : b.value;
  if (!b.isContentEditable) {
    const sp = $("#v_" + k);
    if (sp) sp.textContent = b.value;
    pv();
  }
  $("#warn").innerHTML = warn(V.edit);
});
document.addEventListener("change", (e) => {
  const b = e.target;
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
      const e = $("#le").value.trim(),
        p = $("#lp").value,
        n = $("#ln") ? $("#ln").value.trim() : "",
        er = $("#lerr");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))
        return (er.textContent = "Please enter a valid email address.");
      if (p.length < 8) return (er.textContent = "Password must be at least 8 characters.");
      if (V.login == "up" && !n) return (er.textContent = "Please enter a display name.");
      join(n || e.split("@")[0]);
    },
    anon() {
      join(
        "Anon " +
          ["Panda", "Falcon", "Mango", "Comet", "Otter"][(Math.random() * 5) | 0] +
          " " +
          ((100 + Math.random() * 900) | 0),
      );
    },
    out() {
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
      const { n, ...t } = V.edit;
      if (
        (JSON.stringify(t) != JSON.stringify(T(S.me.t)) || n != S.me.n) &&
        !confirm("Discard your unsaved changes?")
      )
        return;
      V.edit = null;
      V.panel = null;
      render();
    },
    visit() {
      V.view = v == S.me.id ? null : v;
      V.plain = false;
      V.tab = "profile";
      V.edit = null;
      render();
      $("#main").scrollTop = 0;
    },
    back() {
      V.view = null;
      render();
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
      render();
    },
    comp() {
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
      if (!t || !b) return ($("#pe").textContent = "Please add both a title and a message.");
      S.posts.unshift({
        id: Date.now(),
        c: $("#pc").value,
        u: S.me.id,
        t,
        b,
        l: 0,
        cm: [],
        by: [],
      });
      V.comp = 0;
      save();
      render();
      toast("Posted!");
    },
    reset() {
      if (!confirm("Reset all demo data?")) return;
      localStorage.removeItem("ciitf2");
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
  });
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
  };
  S.users = S.users.filter((u) => u.id != "me");
  S.users.push(S.me);
  save();
  draft();
  render();
  toast("Welcome, " + n + "! Make your profile your own.");
}
render();
