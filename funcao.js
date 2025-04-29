document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.video-background');
    const parallax = document.querySelector('.parallax');
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Função para garantir que o vídeo está rodando (apenas desktop)
    if (!isMobile) {
        function ensureVideoIsPlaying() {
            if (video.paused) {
                video.play().catch(function(e) {
                    console.log('Video play failed:', e);
                });
            }
        }

        // Tenta iniciar o vídeo imediatamente
        ensureVideoIsPlaying();

        // Verifica o vídeo a cada segundo
        setInterval(ensureVideoIsPlaying, 1000);

        // Reinicia o vídeo quando a página fica visível
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden) {
                ensureVideoIsPlaying();
            }
        });

        // Eventos touch para garantir que o vídeo continue rodando
        document.addEventListener('touchstart', ensureVideoIsPlaying);
        document.addEventListener('touchend', ensureVideoIsPlaying);

        // Tenta reiniciar o vídeo se ele pausar
        video.addEventListener('pause', ensureVideoIsPlaying);
    }
    
    // Efeito parallax suave apenas para desktop
    if (!isMobile) {
        window.addEventListener('scroll', function() {
            let scrolled = window.pageYOffset;
            requestAnimationFrame(function() {
                video.style.transform = `translateY(${scrolled * 0.3}px)`;
            });
        }, { passive: true });
    }

    // Inicializa AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }

    // Inicialização do Swiper
    const stepsSwiper = new Swiper('.steps-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });

    // Inicialização do Swiper para tecnologias
    const techSwiper = new Swiper('.tech-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20
            }
        }
    });

    // Verificação de tamanho de tela
    function checkScreenSize() {
        const grid = document.querySelector('.steps-grid');
        const swiper = document.querySelector('.steps-swiper');
        
        if (window.innerWidth >= 1025) {
            grid.style.display = 'grid';
            swiper.style.display = 'none';
        } else {
            grid.style.display = 'none';
            swiper.style.display = 'block';
        }
    }

    // Verificar tamanho da tela ao carregar e redimensionar
    window.addEventListener('load', checkScreenSize);
    window.addEventListener('resize', checkScreenSize);

    // Animação de scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contador de Atendimentos
    function animateCounter() {
        const counter = document.querySelector('.counter-number');
        if (!counter) return;

        const targetNumber = 1500; // Número total de clientes atendidos
        const duration = 2000; // Duração da animação em milissegundos
        const startTime = performance.now();
        const startNumber = 0;

        function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Easing function para suavizar a animação
            const easeOutQuad = t => t * (2 - t);
            
            const currentNumber = Math.floor(easeOutQuad(progress) * targetNumber);
            counter.textContent = currentNumber.toLocaleString('pt-BR');

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // Inicia a animação quando o elemento estiver visível
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
                observer.unobserve(entry.target);
            }
        });
    });

    const counterElement = document.querySelector('.attendance-counter');
    if (counterElement) {
        observer.observe(counterElement);
    }

    // Calculadora de Orçamento
    const calculator = {
        currentStep: 1,
        totalSteps: 4,
        selectedType: null,
        pages: 5,
        features: [],
        prices: {
            institucional: 1000,
            ecommerce: 2000,
            landing: 800,
            page: 200,
            blog: 300,
            contact: 150,
            gallery: 200,
            seo: 400,
            responsive: 300,
            analytics: 150
        },

        init() {
            this.setupEventListeners();
            this.updateNavigation();
        },

        setupEventListeners() {
            // Seleção de tipo de site
            document.querySelectorAll('.option-card').forEach(card => {
                card.addEventListener('click', () => {
                    document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
                    card.classList.add('selected');
                    this.selectedType = card.dataset.value;
                });
            });

            // Slider de páginas
            const pagesSlider = document.getElementById('pagesRange');
            const pagesValue = document.getElementById('pagesValue');
            pagesSlider.addEventListener('input', () => {
                this.pages = parseInt(pagesSlider.value);
                pagesValue.textContent = this.pages;
            });

            // Checkboxes de funcionalidades
            document.querySelectorAll('.feature-option input').forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    if (checkbox.checked) {
                        this.features.push(checkbox.value);
                    } else {
                        this.features = this.features.filter(f => f !== checkbox.value);
                    }
                });
            });

            // Botões de navegação
            document.getElementById('nextStep').addEventListener('click', () => this.nextStep());
            document.getElementById('prevStep').addEventListener('click', () => this.prevStep());
        },

        nextStep() {
            if (this.currentStep < this.totalSteps) {
                this.currentStep++;
                this.updateSteps();
                this.updateNavigation();
                if (this.currentStep === this.totalSteps) {
                    this.calculatePrice();
                }
            }
        },

        prevStep() {
            if (this.currentStep > 1) {
                this.currentStep--;
                this.updateSteps();
                this.updateNavigation();
            }
        },

        updateSteps() {
            document.querySelectorAll('.calculator-step').forEach(step => {
                step.classList.remove('active');
            });
            document.querySelector(`.calculator-step[data-step="${this.currentStep}"]`).classList.add('active');
        },

        updateNavigation() {
            const prevButton = document.getElementById('prevStep');
            const nextButton = document.getElementById('nextStep');

            prevButton.style.display = this.currentStep === 1 ? 'none' : 'block';
            nextButton.textContent = this.currentStep === this.totalSteps ? 'Recalcular' : 'Próximo';
        },

        calculatePrice() {
            if (!this.selectedType) return;

            let total = this.prices[this.selectedType];
            
            // Adiciona custo por página extra (além da primeira)
            if (this.pages > 1) {
                total += (this.pages - 1) * this.prices.page;
            }

            // Adiciona custo das funcionalidades selecionadas
            this.features.forEach(feature => {
                total += this.prices[feature];
            });

            // Formata o preço
            const formattedPrice = total.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            // Atualiza o display
            document.getElementById('finalPrice').textContent = formattedPrice;

            // Atualiza o link do WhatsApp
            const whatsappLink = document.getElementById('whatsappLink');
            const message = `Olá! Gostaria de um orçamento para um site ${this.selectedType} com ${this.pages} páginas e as seguintes funcionalidades: ${this.features.join(', ')}. Valor estimado: R$ ${formattedPrice}`;
            whatsappLink.href = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
        }
    };

    // Inicializa a calculadora
    if (document.querySelector('.calculator-container')) {
        calculator.init();
    }

    // Agendador de Reunião
    const calendarDays = document.getElementById('calendarDays');
    const currentMonthElement = document.getElementById('currentMonth');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const timeSlots = document.getElementById('timeSlots');
    const confirmation = document.getElementById('confirmation');
    const whatsappButton = document.getElementById('whatsappButton');
    const selectedDateElement = document.getElementById('selectedDate');
    const selectedTimeElement = document.getElementById('selectedTime');

    let currentDate = new Date();
    let selectedDate = null;
    let selectedTime = null;

    // Horários disponíveis
    const availableTimes = [
        '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
    ];

    // Renderizar calendário
    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        // Atualizar título do mês
        currentMonthElement.textContent = new Date(year, month).toLocaleDateString('pt-BR', {
            month: 'long',
            year: 'numeric'
        }).toUpperCase();

        // Primeiro dia do mês
        const firstDay = new Date(year, month, 1);
        // Último dia do mês
        const lastDay = new Date(year, month + 1, 0);
        // Dia da semana do primeiro dia
        const firstDayIndex = firstDay.getDay();
        // Total de dias no mês
        const totalDays = lastDay.getDate();

        calendarDays.innerHTML = '';

        // Dias vazios no início
        for (let i = 0; i < firstDayIndex; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day disabled';
            calendarDays.appendChild(emptyDay);
        }

        // Dias do mês
        for (let day = 1; day <= totalDays; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;

            const date = new Date(year, month, day);
            
            // Marcar dia atual
            if (isToday(date)) {
                dayElement.classList.add('today');
            }

            // Desabilitar dias passados
            if (isPastDate(date)) {
                dayElement.classList.add('disabled');
            } else {
                dayElement.addEventListener('click', () => selectDate(date, dayElement));
            }

            calendarDays.appendChild(dayElement);
        }
    }

    // Renderizar horários
    function renderTimeSlots() {
        timeSlots.innerHTML = '';
        availableTimes.forEach(time => {
            const timeSlot = document.createElement('div');
            timeSlot.className = 'time-slot';
            timeSlot.textContent = time;
            timeSlot.addEventListener('click', () => selectTime(time, timeSlot));
            timeSlots.appendChild(timeSlot);
        });
    }

    // Selecionar data
    function selectDate(date, element) {
        // Remover seleção anterior
        const previousSelected = document.querySelector('.calendar-day.selected');
        if (previousSelected) {
            previousSelected.classList.remove('selected');
        }

        // Adicionar nova seleção
        element.classList.add('selected');
        selectedDate = date;
        
        // Formatar data para exibição
        const formattedDate = date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
        selectedDateElement.textContent = formattedDate;

        // Mostrar confirmação se horário já estiver selecionado
        if (selectedTime) {
            showConfirmation();
        }
    }

    // Selecionar horário
    function selectTime(time, element) {
        // Remover seleção anterior
        const previousSelected = document.querySelector('.time-slot.selected');
        if (previousSelected) {
            previousSelected.classList.remove('selected');
        }

        // Adicionar nova seleção
        element.classList.add('selected');
        selectedTime = time;
        selectedTimeElement.textContent = time;

        // Mostrar confirmação se data já estiver selecionada
        if (selectedDate) {
            showConfirmation();
        }
    }

    // Mostrar confirmação
    function showConfirmation() {
        confirmation.style.display = 'block';
        whatsappButton.style.display = 'inline-block';
        
        // Atualizar link do WhatsApp
        const message = `Olá! Gostaria de agendar uma reunião para o dia ${selectedDate.toLocaleDateString('pt-BR')} às ${selectedTime}.`;
        whatsappButton.href = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    }

    // Verificar se é hoje
    function isToday(date) {
        const today = new Date();
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    }

    // Verificar se é data passada
    function isPastDate(date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    }

    // Event listeners
    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // Inicializar
    renderCalendar();
    renderTimeSlots();
});