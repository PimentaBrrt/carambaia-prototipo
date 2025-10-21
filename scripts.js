document.querySelector('.menu-btn').addEventListener('click', function () {
    document.querySelector('.menu').classList.toggle('active');
    document.querySelector('.header-overlay').classList.toggle('active');
});

document.querySelector('.header-overlay').addEventListener('click', function () {
    document.querySelector('.menu').classList.remove('active');
    this.classList.remove('active');
});

if (window.innerWidth <= 992) {
    const menuItemsWithChildren = document.querySelectorAll('.menu-item-has-children > a');
    menuItemsWithChildren.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const submenu = this.nextElementSibling;
            submenu.classList.toggle('active');
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o carrossel
    var myCarousel = document.getElementById('projectsCarousel');
    var carousel = new bootstrap.Carousel(myCarousel, {
        interval: false,
        wrap: true,
        touch: true // Habilita swipe em dispositivos móveis
    });
    
    // Atualiza os indicadores personalizados quando o carrossel muda
    myCarousel.addEventListener('slid.bs.carousel', function(event) {
        var activeIndex = event.to;
        var indicators = document.querySelectorAll('#customIndicators .custom-indicator');
        
        // Remove a classe active de todos os indicadores
        indicators.forEach(function(indicator) {
            indicator.classList.remove('active');
        });
        
        // Adiciona a classe active ao indicador correspondente
        if (indicators[activeIndex]) {
            indicators[activeIndex].classList.add('active');
        }
    });
    
    // Adiciona evento de clique aos indicadores personalizados
    var customIndicators = document.querySelectorAll('#customIndicators .custom-indicator');
    customIndicators.forEach(function(indicator, index) {
        indicator.addEventListener('click', function() {
            carousel.to(index);
        });
        
        // Adiciona suporte a teclado para acessibilidade
        indicator.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                carousel.to(index);
            }
        });
    });
    
    // Melhoria: Adiciona suporte a swipe para mobile
    let startX = 0;
    let endX = 0;
    
    myCarousel.addEventListener('touchstart', function(e) {
        startX = e.changedTouches[0].screenX;
    });
    
    myCarousel.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (startX - endX > swipeThreshold) {
            // Swipe para a esquerda - próximo slide
            carousel.next();
        } else if (endX - startX > swipeThreshold) {
            // Swipe para a direita - slide anterior
            carousel.prev();
        }
    }
    
    // Botão "Ver Mais Projetos"
    const verMaisBtn = document.querySelector('.btn-more');
    if (verMaisBtn) {
        verMaisBtn.addEventListener('click', function() {
            alert('Esta funcionalidade levaria à página completa de projetos sociais.');
        });
    }
    
    // Ajusta o carrossel no redimensionamento da tela
    window.addEventListener('resize', function() {
        // Força uma atualização do carrossel se necessário
        carousel.pause();
    });
});