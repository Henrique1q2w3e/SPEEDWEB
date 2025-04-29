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
});