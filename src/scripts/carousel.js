(function() {
    const track = document.getElementById('homeCarouselTrack');
    const cards = track.querySelectorAll('.carousel-card');
    const prevBtn = document.getElementById('homePrevBtn');
    const nextBtn = document.getElementById('homeNextBtn');
    const counter = document.getElementById('homeCurrentSlide');
    const dots = document.querySelectorAll('#homeCarouselProgress .progress-dot');
    let current = 0;
    const total = cards.length;

    function goTo(index) {
        if (index < 0) index = total - 1;
        if (index >= total) index = 0;
        current = index;
        track.style.transform = `translateX(-${current * 100}%)`;
        counter.textContent = String(current + 1).padStart(2, '0');
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));
    dots.forEach(dot => dot.addEventListener('click', () => goTo(parseInt(dot.dataset.index))));

    let touchStartX = 0;
    const wrapper = track.parentElement;
    wrapper.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    wrapper.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) { diff > 0 ? goTo(current + 1) : goTo(current - 1); }
    });

    // Favicon error handling
    document.querySelectorAll('.card-favicon-img').forEach(img => {
        img.addEventListener('error', () => { img.style.display = 'none'; });
        img.addEventListener('load', () => { const fb = img.nextElementSibling; if(fb) fb.style.display = 'none'; });
    });

    goTo(0);

    // Auto-advance every 5s
    let autoPlay = setInterval(() => { goTo(current + 1 >= total ? 0 : current + 1); }, 5000);
    const resetAuto = () => { clearInterval(autoPlay); autoPlay = setInterval(() => { goTo(current + 1 >= total ? 0 : current + 1); }, 5000); };
    prevBtn.addEventListener('click', resetAuto);
    nextBtn.addEventListener('click', resetAuto);
    dots.forEach(dot => dot.addEventListener('click', resetAuto));
    wrapper.addEventListener('touchend', resetAuto);
})();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
