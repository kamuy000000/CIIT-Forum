// Logic for login
const SK = KEY + '_s';
const $ = s => document.querySelector(s);

function toast(m, bad) {
    const t = $('#toast');
    t.textContent = m;
    t.className = 'toast show' + (bad ? ' bad' : '');
    clearTimeout(toast.t);
    toast.t = setTimeout(() => t.className = 'toast', 3500);
}

// Saved Logged in straight to forum/admin page
const here = getUser(localStorage.getItem(SK));
if (here && here.status === 'active') location.replace(here.role === 'admin' ? 'admin.html' : 'index.html');

// Message left by the previous page (for example after logging out)
const flash = sessionStorage.getItem('flash');
if (flash) { sessionStorage.removeItem('flash'); toast(flash); }

if ($('#login')) {
    $('#sp').onchange = e => $('#pw').type = e.target.checked ? 'text' : 'password';
    $('#login').onsubmit = e => {
        e.preventDefault();
        const email = $('#email').value.trim().toLowerCase(), pw = $('#pw').value;
        const err = m => $('#err').textContent = m;
        if (!email || !pw) return err('Enter your email and password.');
        if (!/^\S+@\S+\.\S+$/.test(email)) return err('Enter a valid email address, like name@example.com.');
        const u = db.users.find(x => x.email === email);
        if (!u || u.pass !== pw) return err('Email or password is incorrect. Check both and try again.');
        if (u.status === 'banned') return err('This account has been banned. Reason: ' + (u.reason || 'Rule violation') + '.');
        if (u.status === 'suspended') return err('This account is suspended. Reason: ' + (u.reason || 'Rule violation') + '. Contact the admin to appeal.');
        localStorage.setItem(SK, u.id);
        sessionStorage.setItem('flash', 'Welcome back, ' + u.name + '.');
        if (u.role === 'admin') { location.href = 'admin.html'; return; }
        const next = sessionStorage.getItem('next') || '#/feed';
        sessionStorage.removeItem('next');
        location.href = 'index.html' + next;
    };
}

if ($('#signup')) {
    $('#signup').onsubmit = e => {
        e.preventDefault();
        const name = $('#name').value.trim(), email = $('#email').value.trim().toLowerCase();
        const pw = $('#pw').value, pw2 = $('#pw2').value, er = [];
        if (name.length < 2) er.push('Display name must be at least 2 characters.');
        if (!/^\S+@\S+\.\S+$/.test(email)) er.push('Enter a valid email address, like name@example.com.');
        else if (db.users.some(u => u.email === email)) er.push('That email is already registered. Try logging in instead.');
        if (pw.length < 8 || !/[A-Za-z]/.test(pw) || !/\d/.test(pw)) er.push('Password needs at least 8 characters, with a letter and a number.');
        if (pw !== pw2) er.push('Passwords do not match.');
        if (!$('#ag').checked) er.push('You must agree to the Community Rules to continue.');
        $('#err').innerHTML = er.map(x => '<p>' + esc(x) + '</p>').join('');
        if (er.length) return;
        const u = { id: 'u' + sid(), name, email, role: 'user', pass: pw, bio: '', course: '', year: '', interests: [], showInterests: true, status: 'active', reason: '', warning: '', blocked: [], groups: [] };
        db.users.push(u);
        saveDB();
        localStorage.setItem(SK, u.id);
        sessionStorage.setItem('flash', 'Account created. Add your interests to find people like you.');
        location.href = 'index.html#/profile/' + u.id;
    };
}