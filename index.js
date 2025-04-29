/*
 * SPEEDWEB - Main JavaScript
 * Contém toda a funcionalidade interativa e animações do site
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // 1. Inicialização do AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // 2. Header fixo com mudança ao scrollar
    const header = document.querySelector('.header');
    const headerScrolled = function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('load', headerScrolled);
    window.addEventListener('scroll', headerScrolled);
    
    // 3. Botão de voltar ao topo
    const backToTop = document.querySelector('.back-to-top');
    const backToTopShow = function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    };
    window.addEventListener('load', backToTopShow);
    window.addEventListener('scroll', backToTopShow);
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 4. Fechar barra de navegação mobile ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
    
    // 5. Scroll suave para links de ancoragem
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 6. Inicialização do Swiper para depoimentos
    const testimonialsSwiper = new Swiper('.testimonials-swiper', {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        slidesPerView: 1,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 20
            }
        }
    });
    
    // 7. Efeito Parallax para cobrir o banner (NOVO E FEITO CORRETAMENTE)
    function setupBannerParallax() {
        const banner = document.querySelector('.banner');
        const overlay = document.querySelector('.parallax-overlay');
        
        if (!banner || !overlay) return;

        // Configuração do efeito principal
        const scene = new ScrollMagic.Scene({
            triggerElement: banner,
            duration: '200%',
            triggerHook: 0.3,
            offset: 50
        })
        .setTween(gsap.to(overlay, {
            y: '0%',
            ease: 'power2.inOut'
        }))
        .addTo(new ScrollMagic.Controller());

        // Fallback para caso ScrollMagic não carregue
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            const bannerHeight = banner.offsetHeight;
            const progress = Math.min(scrollY / (bannerHeight * 1.5), 1);
            overlay.style.transform = `translateY(${progress * 100}%)`;
        });
    }

    // 8. Efeitos de hover para cards de serviço
    const setupServiceCards = function() {
        const serviceIcons = document.querySelectorAll('.service-icon');
        
        serviceIcons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.animation = 'pulse 1s infinite';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.animation = 'none';
            });
        });
    };
    
    // 9. Inicialização do ScrollMagic para outras animações
    const initScrollMagic = function() {
        const controller = new ScrollMagic.Controller();
        
        // Timeline com pontos animados
        const timeline = document.querySelector('.timeline');
        if (timeline) {
            new ScrollMagic.Scene({
                triggerElement: timeline,
                offset: 50,
                triggerHook: 0.8,
                reverse: false
            })
            .setClassToggle('.timeline-dot', 'animated')
            .addTo(controller);
        }
        
        // Parallax na seção de portfólio
        const portfolioSection = document.querySelector('.portfolio-section');
        if (portfolioSection) {
            new ScrollMagic.Scene({
                triggerElement: portfolioSection,
                triggerHook: 1,
                duration: '200%'
            })
            .setTween(gsap.to('.portfolio-section', {
                backgroundPosition: '0% 100%',
                ease: 'none'
            }))
            .addTo(controller);
        }
    };
    
    // 10. Inicialização controlada das animações
    function initAnimations() {
        setupBannerParallax();
        setupServiceCards();
        
        if (typeof ScrollMagic !== 'undefined' && typeof gsap !== 'undefined') {
            initScrollMagic();
        } else {
            setTimeout(initAnimations, 500);
        }
    }
    
    // 11. Manipulação do formulário de orçamento
    const quoteForm = document.getElementById('quoteForm');
    const successAlert = document.getElementById('successAlert');
    const closeAlert = document.getElementById('closeAlert');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            setTimeout(function() {
                quoteForm.reset();
                successAlert.classList.add('show');
                setTimeout(function() {
                    successAlert.classList.remove('show');
                }, 5000);
            }, 1000);
        });
    }
    
    if (closeAlert) {
        closeAlert.addEventListener('click', function() {
            successAlert.classList.remove('show');
        });
    }
    
    // 12. Efeito hover para cards em mobile
    const setupMobilePortfolioHover = function() {
        if (window.innerWidth < 992) {
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            portfolioItems.forEach(item => {
                item.addEventListener('click', function() {
                    portfolioItems.forEach(i => i.classList.remove('active'));
                    this.classList.add('active');
                });
            });
        }
    };
    
    // 13. Animação do logo
    const animateLogo = function() {
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.style.opacity = '0';
            logo.style.transform = 'translateY(-20px)';
            
            setTimeout(function() {
                logo.style.transition = 'all 0.5s ease-out';
                logo.style.opacity = '1';
                logo.style.transform = 'translateY(0)';
            }, 300);
        }
    };
    
    // 14. Animação dos links do menu
    const animateNavLinks = function() {
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                link.style.transition = 'all 0.3s ease-out';
                link.style.transitionDelay = (index * 0.1) + 's';
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, 500);
        });
    };
    
    // 15. Campos do formulário
    const enhanceFormFields = function() {
        const formControls = document.querySelectorAll('.form-control, .form-select');
        formControls.forEach(control => {
            control.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            control.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });
    };
    
    // 16. Destaque de seção ativa
    const setupScrollEffects = function() {
        const sections = document.querySelectorAll('section');
        window.addEventListener('scroll', function() {
            const scrollPos = window.scrollY + window.innerHeight * 0.7;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPos > sectionTop && scrollPos < sectionTop + sectionHeight) {
                    const id = section.getAttribute('id');
                    if (id) {
                        const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
                        if (navLink) {
                            document.querySelectorAll('.nav-link').forEach(link => {
                                link.classList.remove('active');
                            });
                            navLink.classList.add('active');
                        }
                    }
                }
            });
        });
    };
    
    // 17. Inicialização geral
    function initAll() {
        initAnimations();
        setupMobilePortfolioHover();
        animateLogo();
        animateNavLinks();
        enhanceFormFields();
        setupScrollEffects();
        
        window.addEventListener('resize', function() {
            setupMobilePortfolioHover();
        });
    }
    
    // Inicia tudo
    initAll();
});

// 18. Controle do menu fixo
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('hidden');
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 80) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
});