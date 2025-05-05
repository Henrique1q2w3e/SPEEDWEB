document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.video-background');
    const parallax = document.querySelector('.parallax');
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Cache do vídeo
    let videoCache = null;
    let isVideoLoaded = false;
    let retryCount = 0;
    const MAX_RETRIES = 3;
    let lastPlayTime = 0;
    let isRecovering = false;
    
    // Função para garantir que o vídeo está rodando
    function ensureVideoIsPlaying() {
        if (!video) return;
        
        if (video.paused) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(function(e) {
                    console.log('Video play failed:', e);
                    // Tenta recarregar o vídeo se falhar
                    video.load();
                    setTimeout(() => {
                        video.play().catch(function(e) {
                            console.log('Video reload failed:', e);
                        });
                    }, 100);
                });
            }
        }
    }

    // Função para pré-carregar o vídeo
    function preloadVideo() {
        if (!isVideoLoaded) {
            video.load();
            video.play().then(() => {
                isVideoLoaded = true;
                retryCount = 0;
            }).catch(() => {
                // Se falhar, tenta novamente em 500ms
                setTimeout(preloadVideo, 500);
            });
        }
    }

    // Função para reiniciar o vídeo completamente
    function restartVideo() {
        if (isRecovering) return;
        isRecovering = true;
        
        video.currentTime = lastPlayTime;
        video.load();
        video.play().then(() => {
            isRecovering = false;
            retryCount = 0;
        }).catch(function(e) {
            console.log('Video restart failed:', e);
            setTimeout(() => {
                isRecovering = false;
                restartVideo();
            }, 500);
        });
    }

    // Salvar o tempo atual do vídeo periodicamente
    setInterval(() => {
        if (video && !video.paused) {
            lastPlayTime = video.currentTime;
        }
    }, 1000);

    // Configurações específicas para mobile
    if (isMobile) {
        video.setAttribute('playsinline', '');
        video.setAttribute('x5-playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.setAttribute('x5-video-player-type', 'h5');
        video.setAttribute('x5-video-player-fullscreen', 'false');
        video.setAttribute('preload', 'auto');
        
        // Força o carregamento do vídeo
        preloadVideo();
    }

    // Eventos para manter o vídeo rodando
    window.addEventListener('load', ensureVideoIsPlaying);
    
    // Quando a página recebe foco novamente
    window.addEventListener('focus', ensureVideoIsPlaying);
    
    // Quando a página é mostrada novamente (incluindo quando volta do histórico)
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            ensureVideoIsPlaying();
        }
    });

    // Quando a visibilidade da página muda
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            ensureVideoIsPlaying();
        }
    });

    // Eventos touch para garantir que o vídeo continue rodando
    document.addEventListener('touchstart', ensureVideoIsPlaying);
    document.addEventListener('touchend', ensureVideoIsPlaying);

    // Tenta iniciar o vídeo imediatamente
    ensureVideoIsPlaying();

    // Verifica o vídeo periodicamente
    setInterval(ensureVideoIsPlaying, 1000);

    // Tenta reiniciar o vídeo se ele pausar
    video.addEventListener('pause', function() {
        setTimeout(ensureVideoIsPlaying, 100);
    });
    
    video.addEventListener('ended', function() {
        video.currentTime = 0;
        ensureVideoIsPlaying();
    });

    // Configurações para desktop
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
            duration: 1000,
            once: true,
            offset: 100
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
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        breakpoints: {
            576: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 3
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
    const calculatorSteps = document.querySelectorAll('.calculator-step');
    const nextButton = document.getElementById('nextStep');
    const prevButton = document.getElementById('prevStep');
    const pagesRange = document.getElementById('pagesRange');
    const pagesValue = document.getElementById('pagesValue');
    const finalPrice = document.getElementById('finalPrice');
    const whatsappLink = document.getElementById('whatsappLink');
    let currentStep = 1;
    let selectedType = '';
    let selectedPages = 5;
    let selectedFeatures = [];

    // Atualizar valor do range
    pagesRange.addEventListener('input', function() {
        selectedPages = parseInt(this.value);
        pagesValue.textContent = selectedPages;
    });

    // Selecionar tipo de site
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            selectedType = this.dataset.value;
        });
    });

    // Selecionar funcionalidades
    document.querySelectorAll('.feature-option input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                selectedFeatures.push(this.value);
            } else {
                selectedFeatures = selectedFeatures.filter(feature => feature !== this.value);
            }
        });
    });

    // Navegação entre passos
    nextButton.addEventListener('click', function() {
        if (currentStep < calculatorSteps.length) {
            calculatorSteps[currentStep - 1].classList.remove('active');
            currentStep++;
            calculatorSteps[currentStep - 1].classList.add('active');
            updateNavigationButtons();
            
            if (currentStep === calculatorSteps.length) {
                calculatePrice();
            }
        }
    });

    prevButton.addEventListener('click', function() {
        if (currentStep > 1) {
            calculatorSteps[currentStep - 1].classList.remove('active');
            currentStep--;
            calculatorSteps[currentStep - 1].classList.add('active');
            updateNavigationButtons();
        }
    });

    function updateNavigationButtons() {
        prevButton.style.display = currentStep === 1 ? 'none' : 'block';
        nextButton.textContent = currentStep === calculatorSteps.length - 1 ? 'Calcular' : 'Próximo';
    }

    function calculatePrice() {
        let basePrice = 0;
        
        // Preço base por tipo de site
        switch(selectedType) {
            case 'institucional':
                basePrice = 1500;
                break;
            case 'ecommerce':
                basePrice = 3000;
                break;
            case 'landing':
                basePrice = 800;
                break;
        }

        // Adicionar valor por página extra
        const extraPages = Math.max(0, selectedPages - 5);
        basePrice += extraPages * 200;

        // Adicionar valor por funcionalidade
        selectedFeatures.forEach(feature => {
            switch(feature) {
                case 'blog':
                    basePrice += 500;
                    break;
                case 'contact':
                    basePrice += 200;
                    break;
                case 'gallery':
                    basePrice += 300;
                    break;
                case 'seo':
                    basePrice += 800;
                    break;
                case 'responsive':
                    basePrice += 400;
                    break;
                case 'analytics':
                    basePrice += 200;
                    break;
            }
        });

        finalPrice.textContent = basePrice.toLocaleString('pt-BR', {minimumFractionDigits: 2});
        
        // Atualizar link do WhatsApp
        const message = `Olá! Gostaria de um orçamento para um site ${selectedType} com ${selectedPages} páginas e as seguintes funcionalidades: ${selectedFeatures.join(', ')}. Valor estimado: R$ ${basePrice.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
        whatsappLink.href = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    }

    // Inicializar navegação
    updateNavigationButtons();

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

    // Animação do scroll down
    document.querySelector('.scroll-down').addEventListener('click', function() {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });

    // Otimização de performance
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback para browsers que não suportam lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Interatividade dos Planos de Manutenção
    document.querySelectorAll('.maintenance-card').forEach(card => {
        // Efeito hover para cards não destacados
        if (!card.classList.contains('featured')) {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
            });
        }

        // Evento de clique no botão de contratação
        const ctaButton = card.querySelector('.plan-cta .btn');
        if (ctaButton) {
            ctaButton.addEventListener('click', function(e) {
                e.preventDefault();
                const planName = card.querySelector('.plan-header h3').textContent;
                const planPrice = card.querySelector('.price .amount').textContent;
                
                // Rola suavemente até o formulário de contato
                const contactForm = document.getElementById('contact');
                if (contactForm) {
                    contactForm.scrollIntoView({ behavior: 'smooth' });
                    
                    // Após a rolagem, mostra um alerta com as informações do plano
                    setTimeout(() => {
                        alert(`Você selecionou o plano ${planName} no valor de R$ ${planPrice}/mês. Preencha o formulário abaixo para finalizar sua contratação.`);
                    }, 1000);
                }
            });
        }
    });

}); // Fim do DOMContentLoaded