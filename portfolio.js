// Inicialização do AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true
});

// Gerenciamento de Templates
class TemplateManager {
    constructor() {
        this.modal = document.getElementById('templatePreview');
        this.frame = document.getElementById('templateFrame');
        this.closeBtn = document.querySelector('.btn-close-preview');
        this.categoryButtons = document.querySelectorAll('.btn-category');
        this.templateCards = document.querySelectorAll('.template-card');
        this.viewButtons = document.querySelectorAll('.btn-view');

        this.init();
    }

    init() {
        // Inicializar eventos
        this.initCategoryFilters();
        this.initTemplatePreview();
        this.initCloseButton();
        this.initKeyboardEvents();
    }

    initCategoryFilters() {
        this.categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remover classe active de todos os botões
                this.categoryButtons.forEach(btn => btn.classList.remove('active'));
                // Adicionar classe active ao botão clicado
                button.classList.add('active');

                const category = button.dataset.category;
                this.filterTemplates(category);
            });
        });
    }

    filterTemplates(category) {
        this.templateCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                // Adicionar animação de fade in
                card.style.animation = 'fadeIn 0.5s ease-out forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }

    initTemplatePreview() {
        this.viewButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const templateId = button.dataset.template;
                this.openTemplatePreview(templateId);
            });
        });
    }

    openTemplatePreview(templateId) {
        // Carregar o template no iframe
        this.frame.src = `templates/${templateId}/index.html`;
        
        // Mostrar o modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevenir scroll do body

        // Adicionar classe para animação de entrada
        setTimeout(() => {
            this.modal.style.opacity = '1';
        }, 10);
    }

    initCloseButton() {
        this.closeBtn.addEventListener('click', () => {
            this.closeTemplatePreview();
        });
    }

    closeTemplatePreview() {
        // Adicionar animação de saída
        this.modal.style.opacity = '0';
        
        // Remover o modal após a animação
        setTimeout(() => {
            this.modal.classList.remove('active');
            this.frame.src = ''; // Limpar o iframe
            document.body.style.overflow = ''; // Restaurar scroll do body
        }, 300);
    }

    initKeyboardEvents() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeTemplatePreview();
            }
        });
    }
}

// Inicializar o gerenciador de templates quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new TemplateManager();
}); 