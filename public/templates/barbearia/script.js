// Cabeçalho: muda de estilo ao rolar
const header = document.getElementById('siteHeader');
const onScrollHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
onScrollHeader();
window.addEventListener('scroll', onScrollHeader, { passive: true });

// Menu mobile
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
navToggle.addEventListener('click', () => siteNav.classList.toggle('open'));

// Navegação: scroll suave + link ativo
class NavigationManager {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.initSmoothScroll();
        this.initActiveLink();
    }

    initSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                siteNav.classList.remove('open');
            });
        });
    }

    initActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                if (window.pageYOffset >= section.offsetTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            this.navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
            });
        });
    }
}

// Agendamento
class AppointmentManager {
    constructor() {
        this.form = document.getElementById('appointmentForm');
        this.dateInput = document.getElementById('date');
        this.init();
    }

    init() {
        this.initDatePicker();
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.validateForm()) this.submitAppointment();
        });
    }

    initDatePicker() {
        if (typeof flatpickr !== 'function') return;
        flatpickr(this.dateInput, {
            locale: 'pt',
            dateFormat: 'd/m/Y',
            minDate: 'today',
            maxDate: new Date().fp_incr(30),
            disableMobile: true,
        });
    }

    validateForm() {
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const date = this.dateInput.value;
        const time = this.form.querySelector('input[name="time"]:checked');
        const barber = document.getElementById('barber').value;

        if (!name || !phone || !service || !date || !time || !barber) {
            this.showAlert('Por favor, preencha todos os campos.', 'error');
            return false;
        }

        return true;
    }

    submitAppointment() {
        const time = this.form.querySelector('input[name="time"]:checked');
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            date: this.dateInput.value,
            time: time ? time.value : '',
            barber: document.getElementById('barber').value,
        };

        console.log('Dados do agendamento:', formData);
        this.showAlert('Agendamento realizado com sucesso!', 'success');
        this.form.reset();
    }

    showAlert(message, type) {
        const existing = this.form.parentElement.querySelector('.form-alert');
        if (existing) existing.remove();

        const alertDiv = document.createElement('div');
        alertDiv.className = `form-alert form-alert--${type}`;
        alertDiv.textContent = message;
        this.form.insertAdjacentElement('beforebegin', alertDiv);

        setTimeout(() => alertDiv.remove(), 5000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AppointmentManager();
    new NavigationManager();
});
