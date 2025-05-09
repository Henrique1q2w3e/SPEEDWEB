// Gerenciamento do Formulário de Agendamento
class AppointmentManager {
    constructor() {
        this.form = document.getElementById('appointmentForm');
        this.init();
    }

    init() {
        this.initFormValidation();
        this.initDateValidation();
        this.initTimeValidation();
    }

    initFormValidation() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (this.validateForm()) {
                this.submitAppointment();
            }
        });
    }

    validateForm() {
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const barber = document.getElementById('barber').value;

        if (!name || !phone || !service || !date || !time || !barber) {
            this.showAlert('Por favor, preencha todos os campos.', 'error');
            return false;
        }

        if (!this.validatePhone(phone)) {
            this.showAlert('Por favor, insira um número de telefone válido.', 'error');
            return false;
        }

        return true;
    }

    validatePhone(phone) {
        const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
        return phoneRegex.test(phone);
    }

    initDateValidation() {
        const dateInput = document.getElementById('date');
        const today = new Date();
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 1); // Permitir agendamento até 1 mês à frente

        dateInput.min = today.toISOString().split('T')[0];
        dateInput.max = maxDate.toISOString().split('T')[0];
    }

    initTimeValidation() {
        const timeSelect = document.getElementById('time');
        const dateInput = document.getElementById('date');

        dateInput.addEventListener('change', () => {
            const selectedDate = new Date(dateInput.value);
            const today = new Date();
            const currentHour = today.getHours();

            // Limpar opções de horário
            timeSelect.innerHTML = '<option value="">Selecione um horário</option>';

            // Adicionar horários disponíveis
            const availableHours = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
            
            availableHours.forEach(hour => {
                const option = document.createElement('option');
                option.value = hour;
                option.textContent = hour;

                // Se for hoje, desabilitar horários passados
                if (selectedDate.toDateString() === today.toDateString()) {
                    const hourValue = parseInt(hour.split(':')[0]);
                    if (hourValue <= currentHour) {
                        option.disabled = true;
                    }
                }

                timeSelect.appendChild(option);
            });
        });
    }

    submitAppointment() {
        // Simular envio do formulário
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            barber: document.getElementById('barber').value
        };

        // Aqui você pode adicionar a lógica para enviar os dados para o servidor
        console.log('Dados do agendamento:', formData);

        // Mostrar mensagem de sucesso
        this.showAlert('Agendamento realizado com sucesso!', 'success');
        this.form.reset();
    }

    showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`;
        alertDiv.role = 'alert';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

        this.form.insertAdjacentElement('beforebegin', alertDiv);

        // Remover alerta após 5 segundos
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
}

// Gerenciamento da Navegação
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
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    initActiveLink() {
        const sections = document.querySelectorAll('section');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    new AppointmentManager();
    new NavigationManager();
}); 