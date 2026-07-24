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
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        siteNav.classList.remove('open');
    });
});

// Formulário de contato
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const existing = this.querySelector('.form-alert');
        if (existing) existing.remove();

        const alertDiv = document.createElement('div');
        alertDiv.className = 'form-alert';
        alertDiv.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
        this.appendChild(alertDiv);

        this.reset();
        setTimeout(() => alertDiv.remove(), 6000);
    });
}

// Animação ao rolar
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.differential, .service-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});
