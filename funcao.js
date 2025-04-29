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

    // Verificar tamanho da tela e ajustar exibição
    function checkScreenSize() {
        const stepsGrid = document.querySelector('.steps-grid');
        const stepsSwiper = document.querySelector('.steps-swiper');
        
        if (window.innerWidth >= 1025) {
            if (stepsGrid) {
                stepsGrid.style.display = 'grid';
                stepsGrid.style.visibility = 'visible';
                stepsGrid.style.opacity = '1';
            }
            if (stepsSwiper) {
                stepsSwiper.style.display = 'none';
                stepsSwiper.style.visibility = 'hidden';
                stepsSwiper.style.opacity = '0';
            }
        } else {
            if (stepsGrid) {
                stepsGrid.style.display = 'none';
                stepsGrid.style.visibility = 'hidden';
                stepsGrid.style.opacity = '0';
            }
            if (stepsSwiper) {
                stepsSwiper.style.display = 'block';
                stepsSwiper.style.visibility = 'visible';
                stepsSwiper.style.opacity = '1';
            }
        }
    }

    // Inicialização do Swiper
    const stepsSwiper = document.querySelector('.steps-swiper');
    if (stepsSwiper) {
        new Swiper('.steps-swiper', {
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
    }

    // Verificar tamanho da tela ao carregar e redimensionar
    checkScreenSize();
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
});