// Otimizações de Performance
document.addEventListener('DOMContentLoaded', function() {
    // Cache de elementos DOM
    const elements = {
        video: document.querySelector('.video-background'),
        form: document.getElementById('briefingForm'),
        steps: document.querySelectorAll('.briefing-step'),
        progressBar: document.querySelector('.progress-bar'),
        prevBtn: document.getElementById('prevStep'),
        nextBtn: document.getElementById('nextStep'),
        exportBtn: document.getElementById('exportWhatsApp'),
        previewContent: document.getElementById('briefingPreview')
    };

    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Otimização de scroll
    const handleScroll = throttle(() => {
        if (elements.video) {
            const scrollPosition = window.scrollY;
            elements.video.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    }, 16);

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Otimização de resize
    const handleResize = debounce(() => {
        if (elements.video) {
            elements.video.style.height = window.innerWidth <= 768 ? '100vh' : '800px';
        }
    }, 250);

    window.addEventListener('resize', handleResize, { passive: true });

    // Otimização de animações
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

    // Otimização de formulário
    if (elements.form) {
        let currentStep = 1;
        const totalSteps = elements.steps.length;

        const updateProgress = () => {
            const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
            elements.progressBar.style.width = `${progress}%`;
            elements.progressBar.setAttribute('aria-valuenow', progress);
        };

        const validateStep = (step) => {
            const currentStepElement = elements.steps[step - 1];
            const inputs = currentStepElement.querySelectorAll('input[required], select[required], textarea[required]');
            
            return Array.from(inputs).every(input => {
                const isValid = input.value.trim() !== '';
                input.classList.toggle('is-invalid', !isValid);
                return isValid;
            });
        };

        const updateButtons = () => {
            elements.prevBtn.style.display = currentStep === 1 ? 'none' : 'block';
            elements.nextBtn.style.display = currentStep === totalSteps ? 'none' : 'block';
            elements.exportBtn.style.display = currentStep === totalSteps ? 'block' : 'none';
        };

        const updatePreview = () => {
            const formData = new FormData(elements.form);
            const previewHTML = generatePreviewHTML(formData);
            elements.previewContent.innerHTML = previewHTML;
        };

        const generatePreviewHTML = (formData) => {
            return `
                <h4>Informações Básicas</h4>
                <p><strong>Empresa:</strong> ${formData.get('companyName')}</p>
                <p><strong>Contato:</strong> ${formData.get('contactName')}</p>
                <p><strong>E-mail:</strong> ${formData.get('email')}</p>
                <p><strong>Telefone:</strong> ${formData.get('phone')}</p>

                <h4>Sobre o Projeto</h4>
                <p><strong>Tipo de Site:</strong> ${formData.get('projectType')}</p>
                <p><strong>Descrição:</strong> ${formData.get('projectDescription')}</p>
                <p><strong>Público-Alvo:</strong> ${formData.get('targetAudience')}</p>

                <h4>Design e Funcionalidades</h4>
                <p><strong>Preferências de Design:</strong> ${formData.get('designPreferences')}</p>
                <p><strong>Esquema de Cores:</strong> ${formData.get('colorScheme')}</p>
                <p><strong>Funcionalidades:</strong></p>
                <ul>
                    ${formData.get('contactForm') ? '<li>Formulário de Contato</li>' : ''}
                    ${formData.get('newsletter') ? '<li>Newsletter</li>' : ''}
                    ${formData.get('blog') ? '<li>Blog</li>' : ''}
                    ${formData.get('socialMedia') ? '<li>Integração com Redes Sociais</li>' : ''}
                </ul>

                <h4>Prazo e Orçamento</h4>
                <p><strong>Prazo:</strong> ${formData.get('deadline')}</p>
                <p><strong>Orçamento:</strong> ${formData.get('budget')}</p>
                <p><strong>Informações Adicionais:</strong> ${formData.get('additionalInfo')}</p>
            `;
        };

        elements.nextBtn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                elements.steps[currentStep - 1].classList.remove('active');
                currentStep++;
                elements.steps[currentStep - 1].classList.add('active');
                updateProgress();
                updateButtons();
                if (currentStep === totalSteps) {
                    updatePreview();
                }
            }
        });

        elements.prevBtn.addEventListener('click', () => {
            elements.steps[currentStep - 1].classList.remove('active');
            currentStep--;
            elements.steps[currentStep - 1].classList.add('active');
            updateProgress();
            updateButtons();
        });

        elements.exportBtn.addEventListener('click', () => {
            const formData = new FormData(elements.form);
            const message = generateWhatsAppMessage(formData);
            const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });

        const generateWhatsAppMessage = (formData) => {
            return `*Briefing - Novo Projeto*\n\n` +
                   `*Informações Básicas*\n` +
                   `Empresa: ${formData.get('companyName')}\n` +
                   `Contato: ${formData.get('contactName')}\n` +
                   `E-mail: ${formData.get('email')}\n` +
                   `Telefone: ${formData.get('phone')}\n\n` +
                   `*Sobre o Projeto*\n` +
                   `Tipo de Site: ${formData.get('projectType')}\n` +
                   `Descrição: ${formData.get('projectDescription')}\n` +
                   `Público-Alvo: ${formData.get('targetAudience')}\n\n` +
                   `*Design e Funcionalidades*\n` +
                   `Preferências: ${formData.get('designPreferences')}\n` +
                   `Cores: ${formData.get('colorScheme')}\n` +
                   `Funcionalidades:\n` +
                   `${formData.get('contactForm') ? '- Formulário de Contato\n' : ''}` +
                   `${formData.get('newsletter') ? '- Newsletter\n' : ''}` +
                   `${formData.get('blog') ? '- Blog\n' : ''}` +
                   `${formData.get('socialMedia') ? '- Redes Sociais\n\n' : ''}` +
                   `*Prazo e Orçamento*\n` +
                   `Prazo: ${formData.get('deadline')}\n` +
                   `Orçamento: ${formData.get('budget')}\n` +
                   `Informações Adicionais: ${formData.get('additionalInfo')}`;
        };

        // Inicialização
        updateProgress();
        updateButtons();
    }

    // Calculadora de Orçamento
    const calculatorSteps = document.querySelectorAll('.calculator-step');
    const nextButton = document.getElementById('nextButton');
    const backButton = document.getElementById('backButton');
    const pagesRange = document.getElementById('pagesRange');
    const pagesValue = document.querySelector('.pages-value');
    const priceDisplay = document.querySelector('.price-display');
    const whatsappButton = document.getElementById('whatsappButton');
    
    console.log('Elementos:', {
        calculatorSteps,
        nextButton,
        backButton,
        pagesRange,
        pagesValue,
        priceDisplay,
        whatsappButton
    }); // Para debug

    // Estado da calculadora
    let currentStep = 1;
    let selectedType = '';
    let selectedPages = 5;
    let selectedFeatures = [];

    // Preços base por tipo de site
    const basePrices = {
        'institucional': 1500,
        'ecommerce': 2300,
        'landing': 1200
    };

    // Preços adicionais por funcionalidade
    const featurePrices = {
        'blog': 100,
        'form': 250,
        'gallery': 250,
        'seo': 100,
        'responsive': 100,
        'analytics': 500
    };

    // Seleção de tipo de site
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', function() {
            console.log('Card clicado:', this.dataset.type); // Para debug
            document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            selectedType = this.dataset.type;
            console.log('Tipo selecionado:', selectedType); // Para debug
        });
    });

    // Atualização do número de páginas
    if (pagesRange && pagesValue) {
        pagesRange.addEventListener('input', function() {
            selectedPages = parseInt(this.value);
            pagesValue.textContent = selectedPages;
            console.log('Páginas selecionadas:', selectedPages); // Para debug
        });
    }

    // Seleção de funcionalidades
    document.querySelectorAll('.feature-option input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                selectedFeatures.push(this.value);
            } else {
                selectedFeatures = selectedFeatures.filter(feature => feature !== this.value);
            }
            console.log('Funcionalidades selecionadas:', selectedFeatures); // Para debug
        });
    });

    // Navegação entre passos
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            console.log('Botão próximo clicado'); // Para debug
            if (currentStep < calculatorSteps.length) {
                if (currentStep === 1 && !selectedType) {
                    alert('Por favor, selecione um tipo de site');
                    return;
                }

                calculatorSteps[currentStep - 1].classList.remove('active');
                currentStep++;
                calculatorSteps[currentStep - 1].classList.add('active');
                updateNavigationButtons();

                if (currentStep === calculatorSteps.length) {
                    calculatePrice();
                }
                console.log('Passo atual:', currentStep); // Para debug
            }
        });
    }

    if (backButton) {
        backButton.addEventListener('click', function() {
            console.log('Botão voltar clicado'); // Para debug
            if (currentStep > 1) {
                calculatorSteps[currentStep - 1].classList.remove('active');
                currentStep--;
                calculatorSteps[currentStep - 1].classList.add('active');
                updateNavigationButtons();
                console.log('Passo atual:', currentStep); // Para debug
            }
        });
    }

    // Atualização dos botões de navegação
    function updateNavigationButtons() {
        if (backButton) {
            backButton.style.display = currentStep > 1 ? 'block' : 'none';
        }
        if (nextButton) {
            nextButton.textContent = currentStep === calculatorSteps.length ? 'Recalcular' : 'Próximo';
        }
        console.log('Botões atualizados'); // Para debug
    }

    // Cálculo do preço final
    function calculatePrice() {
        let total = basePrices[selectedType] || 0;
        console.log('Preço base:', total); // Para debug

        // Adicionar custo por páginas extras (após 1 página)
        if (selectedPages > 1) {
            total += (selectedPages - 1) * 200;
        }
        console.log('Preço com páginas:', total); // Para debug

        // Adicionar custo das funcionalidades selecionadas
        selectedFeatures.forEach(feature => {
            total += featurePrices[feature] || 0;
        });
        console.log('Preço final:', total); // Para debug

        // Atualizar exibição do preço
        if (priceDisplay) {
            priceDisplay.textContent = `R$ ${total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
        }

        // Atualizar link do WhatsApp
        if (whatsappButton) {
            const message = `Olá! Gostaria de um orçamento para um site ${selectedType} com ${selectedPages} página${selectedPages > 1 ? 's' : ''} e as seguintes funcionalidades: ${selectedFeatures.join(', ')}. Valor estimado: R$ ${total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
            whatsappButton.href = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
        }
    }

    // Inicialização
    updateNavigationButtons();
    console.log('Calculadora inicializada'); // Para debug

    // Inicialização dos Carrosséis
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
            },
            1024: {
                slidesPerView: 5,
                spaceBetween: 30
            }
        },
        touchRatio: 1,
        grabCursor: true,
        resistance: true,
        resistanceRatio: 0.85,
        preventInteractionOnTransition: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        // Configurações específicas para iOS
        touchStartPreventDefault: false,
        touchMoveStopPropagation: false,
        iOSEdgeSwipeDetection: true,
        iOSEdgeSwipeThreshold: 20,
        touchReleaseOnEdges: true,
        followFinger: true,
        threshold: 5,
        touchAngle: 45,
        simulateTouch: true
    });

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
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 6,
                spaceBetween: 30
            }
        },
        touchRatio: 1,
        grabCursor: true,
        resistance: true,
        resistanceRatio: 0.85,
        preventInteractionOnTransition: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        // Configurações específicas para iOS
        touchStartPreventDefault: false,
        touchMoveStopPropagation: false,
        iOSEdgeSwipeDetection: true,
        iOSEdgeSwipeThreshold: 20,
        touchReleaseOnEdges: true,
        followFinger: true,
        threshold: 5,
        touchAngle: 45,
        simulateTouch: true
    });

    // Verificação de tamanho de tela para mostrar/esconder carrosséis
    function checkScreenSize() {
        const stepsGrid = document.querySelector('.steps-grid');
        const stepsSwiperContainer = document.querySelector('.steps-swiper');
        const techGrid = document.querySelector('.tech-grid');
        const techSwiperContainer = document.querySelector('.tech-swiper');
        
        if (window.innerWidth >= 1024) {
            if (stepsGrid) stepsGrid.style.display = 'grid';
            if (stepsSwiperContainer) stepsSwiperContainer.style.display = 'none';
            if (techGrid) techGrid.style.display = 'grid';
            if (techSwiperContainer) techSwiperContainer.style.display = 'none';
        } else {
            if (stepsGrid) stepsGrid.style.display = 'none';
            if (stepsSwiperContainer) stepsSwiperContainer.style.display = 'block';
            if (techGrid) techGrid.style.display = 'none';
            if (techSwiperContainer) techSwiperContainer.style.display = 'block';
        }
    }

    // Verificar tamanho da tela ao carregar e redimensionar
    window.addEventListener('load', checkScreenSize);
    window.addEventListener('resize', checkScreenSize);

    // Inicializar verificação
    checkScreenSize();

    // Animação dos números das estatísticas
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const count = parseInt(target.getAttribute('data-count'));
                    const duration = 2000; // 2 segundos
                    const step = count / (duration / 16); // 60fps
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= count) {
                            clearInterval(timer);
                            current = count;
                        }
                        target.textContent = Math.floor(current);
                    }, 16);
                    
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => observer.observe(stat));
    }

    // Inicializar animações quando o DOM estiver carregado
    animateStats();
});

document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.video-background');
    
    function forcePlay() {
        video.muted = true;
        video.playsInline = true;
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(function(error) {
                // Auto-retry on failure
                setTimeout(forcePlay, 100);
            });
        }
    }
    
    // Try to play as soon as possible
    forcePlay();
    
    // Retry on page visibility change
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            forcePlay();
        }
    });
    
    // Retry on focus
    window.addEventListener('focus', forcePlay);
    
    // Prevent pause
    video.addEventListener('pause', function() {
        forcePlay();
    });
});

// Smooth Scroll Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        // Optimize scroll performance
        let ticking = false;
        let lastScrollY = 0;
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const currentScrollY = window.scrollY;
                    
                    // Handle scroll changes
                    if (Math.abs(currentScrollY - lastScrollY) > 5) {
                        lastScrollY = currentScrollY;
                    }
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        }, { passive: true });

        // Smooth scroll for anchor links
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
    }
});

// Smooth scroll for the scroll-down button
document.querySelector('.scroll-down').addEventListener('click', function(e) {
    e.preventDefault();
    
    const nextSection = document.querySelector('.main-content');
    const offset = window.innerHeight;
    
    window.scrollTo({
        top: offset,
        behavior: 'smooth'
    });
}, { passive: false });

// Optimize AOS animations for mobile
AOS.init({
    duration: 600,
    once: true,
    disable: window.innerWidth < 768,
    startEvent: 'DOMContentLoaded'
});
