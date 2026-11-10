
const APP = 'CIIT Forum', KEY = 'ciit_forum_v1';
const RULES = [
  ['Be respectful', 'Treat everyone with courtesy. No insults, bullying or personal attacks.'],
  ['No harassment or hate speech', 'Do not target people for who they are, including race, gender, religion, disability, course or year level.'],
  ['No spam or unauthorized selling', 'Do not flood groups with repeated posts or ads. Selling goods or services is only allowed in the Business group.'],
  ['Protect privacy', 'Do not share anyone\'s personal details, private messages or photos without their permission.'],
  ['No explicit, violent or illegal content', 'No sexual content, threats, cheating services or illegal activity.'],
  ['Post in the right place', 'Pick the group that fits your thread and keep replies on topic.'],
  ['Be honest', 'No impersonation, fake events or misleading information.']
];
const INTERESTS = ['Gaming', 'Art', 'Tech', 'Business', 'Music', 'Sports', 'Photography', 'Anime'];
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const MINUTE = 60 * 1000, HOUR = 60 * MINUTE, DAY = 24 * HOUR;
const sid = () => Math.random().toString(36).slice(2, 9);
const sleep = ms => new Promise(r => setTimeout(r, ms));
function ago(t) {
  const s = (Date.now() - t) / 1000;
  if (s < 60) return 'just now';
  if (s < 3600) return Math.floor(s / 60) + ' min ago';
  if (s < 86400) return Math.floor(s / 3600) + ' h ago';
  return Math.floor(s / 86400) + ' d ago';
}
function seed() {
  const n = Date.now(), iso = d => new Date(n + d * DAY).toISOString().slice(0, 10);
  const user = (id, name, email, role, x) => Object.assign({ id, name, email, role, pass: role === 'admin' ? 'Admin123!' : 'Password1', bio: '', course: '', year: '', interests: [], showInterests: true, status: 'active', reason: '', warning: '', blocked: [], groups: [] }, x);
  const cm = (a, b, ago_, r) => ({ id: sid(), author: a, body: b, date: n - ago_ * MINUTE, replies: r || [] });
  return {
    offline: false, drafts: {}, messages: [], reports: [], log: [],
    users: [
      user('u1', 'testuser1', 'testuser1@example.com', 'user', { bio: 'Nerd.', course: 'BS Computer Science', year: '2nd year', interests: ['Gaming', 'Tech', 'Photography'], groups: ['g1', 'g3'] }),
      user('u2', 'testuser2', 'testuser2@example.com', 'user', { bio: 'Business Student.', course: 'Entrepreneurship', year: '2nd year', interests: ['Business', 'Music', 'Art'], groups: ['g4'] }),
      user('u3', 'testuser3', 'testuser3@example.com', 'user', { bio: 'Artist.', course: 'Multimedia Arts', year: '3rd year', interests: ['Art', 'Gaming', 'Anime'], groups: ['g2', 'g1'] }),
      user('a1', 'Forum Admin', 'admin@example.com', 'admin', {})
    ],
    groups: [
      { id: 'g1', name: 'Gaming', desc: 'Games.' },
      { id: 'g2', name: 'Art & Design', desc: 'Art stuffs.' },
      { id: 'g3', name: 'Tech & Coding', desc: 'Coding stuffs.' },
      { id: 'g4', name: 'Business', desc: 'Business,Side hustles etc.' },
      { id: 'g5', name: 'Music', desc: 'Jam sessions.' },
      { id: 'g6', name: 'Campus News', desc: 'Announcements and updates from clubs and organizations.' }
    ],
    events: [
      { id: 'e1', name: 'Test1', date: iso(3), time: '1:00 PM', place: 'Labas ng CIIT', organizer: 'Esports Club', desc: '5v5 suntukan.', interested: ['u1'] },
      { id: 'e2', name: 'Test2', date: iso(6), time: '5:30 PM', place: 'Cafe', organizer: 'Art & Design Group', desc: 'Art Styff.', interested: [] },
      { id: 'e3', name: 'Test3', date: iso(12), time: '9:00 AM', place: 'CIIT PlayLab', organizer: 'Tech & Coding Group', desc: 'Code.', interested: ['u2'] }
    ],
    threads: [
      { id: 't1', title: 'Post1', body: 'testpostlangpo.', author: 'u1', group: 'g3', date: n - 50 * MINUTE, likes: ['u2'], comments: [cm('u3', 'Testcommentpo', 30, [cm('u1', 'galing.', 20)])] },
      { id: 't2', title: 'Post2', body: 'testpost2.', author: 'u3', group: 'g1', date: n - 5 * HOUR, likes: ['u1'], comments: [cm('u1', 'testulit', 200)] },
      { id: 't3', title: 'Post3', body: 'testpost3.', author: 'u2', group: 'g6', date: n - 26 * HOUR, likes: [], comments: [] },
      { id: 't4', title: 'post4', body: 'testt4.', author: 'u2', group: 'g5', date: n - 3 * DAY, likes: [], comments: [] }
    ]
  };
}
function loadDB() {
  try { const r = localStorage.getItem(KEY); if (r) return JSON.parse(r); } catch (e) { }
  const d = seed(); try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) { } return d;
}
let db = loadDB();
function saveDB() { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) { } }
function resetDB() { localStorage.removeItem(KEY); localStorage.removeItem(KEY + '_s'); localStorage.removeItem(KEY + '_a'); location.reload(); }
const getUser = id => db.users.find(u => u.id === id);
const nameOf = id => { const u = getUser(id); return u ? u.name : 'Deleted user'; };
const findC = (arr, id) => { for (const c of arr) { if (c.id === id) return c; const r = findC(c.replies || [], id); if (r) return r; } };