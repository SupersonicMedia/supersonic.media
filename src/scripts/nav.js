const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => links.classList.toggle('open'));

document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
        const nl = document.getElementById('navLinks');
        if (nl) nl.classList.remove('open');
    });
});
