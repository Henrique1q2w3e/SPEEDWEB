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
        'ecommerce': 3000,
        'landing': 800
    };

    // Preços adicionais por funcionalidade
    const featurePrices = {
        'blog': 500,
        'form': 200,
        'gallery': 300,
        'seo': 800,
        'responsive': 400,
        'analytics': 200
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

        // Adicionar custo por páginas extras (após 5 páginas)
        if (selectedPages > 5) {
            total += (selectedPages - 5) * 200;
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
            const message = `Olá! Gostaria de um orçamento para um site ${selectedType} com ${selectedPages} páginas e as seguintes funcionalidades: ${selectedFeatures.join(', ')}. Valor estimado: R$ ${total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
            whatsappButton.href = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
        }
    }

    // Inicialização
    updateNavigationButtons();
    console.log('Calculadora inicializada'); // Para debug
});
