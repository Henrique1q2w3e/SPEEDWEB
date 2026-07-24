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

// Formulário de matrícula
const matriculaForm = document.getElementById('matriculaForm');
if (matriculaForm) {
    matriculaForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const existing = this.querySelector('.form-alert');
        if (existing) existing.remove();

        const alertDiv = document.createElement('div');
        alertDiv.className = 'form-alert';
        alertDiv.textContent = 'Matrícula enviada com sucesso! Entraremos em contato em breve.';
        this.appendChild(alertDiv);

        this.reset();
        setTimeout(() => alertDiv.remove(), 6000);
    });
}

// Máscara de telefone
const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
    telefoneInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        if (value.length > 2) value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        if (value.length > 9) value = `${value.slice(0, 9)}-${value.slice(9)}`;
        e.target.value = value;
    });
}

// Animação de entrada
const revealTargets = document.querySelectorAll('.modality-card, .testimonial-card, .plan-card, .stat-card');
revealTargets.forEach(el => el.classList.add('fade-in-el'));

const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

// Contadores animados
const counters = document.querySelectorAll('.counter');
const startCounting = (counter) => {
    const target = +counter.getAttribute('data-target');
    const speed = 200;
    const inc = target / speed;
    const step = () => {
        const count = +counter.innerText;
        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            requestAnimationFrame(step);
        } else {
            counter.innerText = target;
        }
    };
    step();
};

const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounting(entry.target);
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// Gráfico de crescimento de alunos
const chartCanvas = document.getElementById('alunosChart');
if (chartCanvas && typeof Chart !== 'undefined') {
    new Chart(chartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['2021', '2022', '2023', '2024', '2025', '2026'],
            datasets: [{
                label: 'Crescimento de Alunos',
                data: [800, 1200, 1500, 1800, 2200, 2500],
                fill: true,
                backgroundColor: 'rgba(255, 61, 61, 0.1)',
                borderColor: 'rgba(255, 61, 61, 1)',
                tension: 0.4,
                pointBackgroundColor: 'rgba(255, 61, 61, 1)',
                pointBorderColor: '#0d0d0f',
                pointBorderWidth: 2,
                pointRadius: 5,
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: '#f5f5f7', font: { family: 'Poppins' } } },
                title: {
                    display: true,
                    text: 'Crescimento de Alunos ao Longo dos Anos',
                    color: '#f5f5f7',
                    font: { size: 16, family: 'Poppins' },
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255,255,255,0.08)' },
                    ticks: { color: '#9a9aa2', font: { family: 'Poppins' } },
                },
                x: {
                    grid: { color: 'rgba(255,255,255,0.08)' },
                    ticks: { color: '#9a9aa2', font: { family: 'Poppins' } },
                },
            },
            animation: { duration: 1500, easing: 'easeInOutQuart' },
        },
    });
}
