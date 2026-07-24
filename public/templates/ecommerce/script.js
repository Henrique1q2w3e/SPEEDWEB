// Cabeçalho: muda de estilo ao rolar
const header = document.getElementById('siteHeader');
const onScrollHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
onScrollHeader();
window.addEventListener('scroll', onScrollHeader, { passive: true });

// Menu mobile
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
navToggle.addEventListener('click', () => siteNav.classList.toggle('open'));

// Scroll suave
document.querySelectorAll('.nav-link, a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#' || !href.startsWith('#')) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        siteNav.classList.remove('open');
    });
});

// Animação de entrada
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.product-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Newsletter
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const existing = this.parentElement.querySelector('.form-alert');
        if (existing) existing.remove();

        const alertDiv = document.createElement('div');
        alertDiv.className = 'form-alert form-alert--success';
        alertDiv.textContent = 'Obrigado por se inscrever!';
        this.insertAdjacentElement('afterend', alertDiv);

        this.reset();
        setTimeout(() => alertDiv.remove(), 5000);
    });
}
