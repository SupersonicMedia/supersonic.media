document.addEventListener('DOMContentLoaded', () => {
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    const heroGlow = document.getElementById('heroGlow');
    const heroSection = document.getElementById('heroSection');

    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let started = false;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!started) {
            started = true;
            dotX = mouseX;
            dotY = mouseY;
            ringX = mouseX;
            ringY = mouseY;
            dot.style.opacity = '1';
            ring.style.opacity = '0.5';
        }

        if (heroSection && heroGlow) {
            const rect = heroSection.getBoundingClientRect();
            if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
                heroGlow.style.transform = `translate(${e.clientX - rect.left - 200}px, ${e.clientY - rect.top - 200}px)`;
                heroGlow.style.left = '0';
                heroGlow.style.top = '0';
            }
        }
    });

    function animateCursor() {
        dotX += (mouseX - dotX) * 0.35;
        dotY += (mouseY - dotY) * 0.35;
        dot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;

        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverTargets = document.querySelectorAll('a, button, .service-card, .project-card');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });

    document.body.style.cursor = 'none';
    document.querySelectorAll('a, button').forEach(el => {
        el.style.cursor = 'none';
    });
});
