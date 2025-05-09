// Dados dos produtos
const products = {
    1: {
        name: "Camiseta Oversized",
        price: 129.90,
        description: "Camiseta oversized com corte moderno e confortável. Ideal para o dia a dia com estilo urbano.",
        image: "https://via.placeholder.com/300x400"
    },
    2: {
        name: "Camiseta Graphic",
        price: 149.90,
        description: "Camiseta com estampa exclusiva DEMANICO. Design único e atemporal.",
        image: "https://via.placeholder.com/300x400"
    },
    3: {
        name: "Calça Cargo",
        price: 249.90,
        description: "Calça cargo com múltiplos bolsos e design funcional. Perfeita para o estilo streetwear.",
        image: "https://via.placeholder.com/300x400"
    },
    4: {
        name: "Calça Jogger",
        price: 199.90,
        description: "Calça jogger com elástico na barra e cintura. Conforto e estilo em um só produto.",
        image: "https://via.placeholder.com/300x400"
    },
    5: {
        name: "Short Cargo",
        price: 159.90,
        description: "Short cargo com bolsos laterais e design urbano. Ideal para dias quentes com estilo.",
        image: "https://via.placeholder.com/300x400"
    },
    6: {
        name: "Short Tactical",
        price: 179.90,
        description: "Short tactical com design militar e múltiplos bolsos. Durabilidade e estilo.",
        image: "https://via.placeholder.com/300x400"
    },
    7: {
        name: "Moletom Oversized",
        price: 299.90,
        description: "Moletom oversized com capuz e bolsos frontais. Conforto e estilo para o inverno.",
        image: "https://via.placeholder.com/300x400"
    },
    8: {
        name: "Moletom Graphic",
        price: 329.90,
        description: "Moletom com estampa exclusiva e design moderno. Peça versátil para o dia a dia.",
        image: "https://via.placeholder.com/300x400"
    },
    9: {
        name: "Tênis Urban",
        price: 399.90,
        description: "Tênis urbano com design minimalista e confortável. Ideal para o dia a dia.",
        image: "https://via.placeholder.com/300x400"
    },
    10: {
        name: "Tênis Street",
        price: 449.90,
        description: "Tênis street com design exclusivo e detalhes em dourado. Estilo único.",
        image: "https://via.placeholder.com/300x400"
    }
};

// Carrinho de compras
let cart = [];

// Elementos do DOM
const productModal = document.getElementById('productModal');
const cartModal = document.getElementById('cartModal');
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

// Funções auxiliares
function formatPrice(price) {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
}

function updateCartCount() {
    cartCount.textContent = cart.length;
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = formatPrice(total);
}

function updateCartItems() {
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <h3>${item.name}</h3>
                <p>${formatPrice(item.price)}</p>
            </div>
            <button onclick="removeFromCart('${item.id}')" class="remove-item">×</button>
        </div>
    `).join('');
    updateCartTotal();
}

function openProductModal(productId) {
    const product = products[productId];
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductDescription').textContent = product.description;
    document.getElementById('modalProductPrice').textContent = formatPrice(product.price);
    document.getElementById('addToCartBtn').onclick = () => addToCart(productId);
    productModal.classList.add('active');
}

// Event Listeners para os cards de produtos
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
        if (e.target.closest('.view-icon')) return;
        const productId = card.dataset.id;
        openProductModal(productId);
    });
});

// Event Listeners para os ícones de visualização
document.querySelectorAll('.view-icon').forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = icon.closest('.product-card');
        const productId = card.dataset.id;
        openProductModal(productId);
    });
});

// Funções do Modal do Produto
document.querySelector('.close-modal').addEventListener('click', () => {
    productModal.classList.remove('active');
});

productModal.addEventListener('click', (e) => {
    if (e.target === productModal) {
        productModal.classList.remove('active');
    }
});

// Funções do Carrinho
function addToCart(productId) {
    const product = products[productId];
    cart.push({
        id: productId,
        name: product.name,
        price: product.price
    });
    
    updateCartCount();
    updateCartItems();
    productModal.classList.remove('active');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartItems();
}

// Event Listeners do Carrinho
cartIcon.addEventListener('click', () => {
    cartModal.classList.add('active');
});

document.querySelector('.close-cart').addEventListener('click', () => {
    cartModal.classList.remove('active');
});

cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
    }
});

// Carousel functionality
document.querySelectorAll('.carousel').forEach(carousel => {
    const container = carousel.querySelector('.carousel-container');
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');
    const cards = carousel.querySelectorAll('.product-card');
    const cardWidth = cards[0].offsetWidth + 32; // card width + gap

    let currentPosition = 0;
    const maxPosition = (cards.length - 1) * cardWidth;

    function updateCarousel() {
        container.style.transform = `translateX(-${currentPosition}px)`;
        prevButton.style.opacity = currentPosition === 0 ? '0.5' : '1';
        nextButton.style.opacity = currentPosition >= maxPosition ? '0.5' : '1';
    }

    prevButton.addEventListener('click', () => {
        if (currentPosition > 0) {
            currentPosition = Math.max(0, currentPosition - cardWidth);
            updateCarousel();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPosition < maxPosition) {
            currentPosition = Math.min(maxPosition, currentPosition + cardWidth);
            updateCarousel();
        }
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    container.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentPosition < maxPosition) {
                currentPosition = Math.min(maxPosition, currentPosition + cardWidth);
            } else if (diff < 0 && currentPosition > 0) {
                currentPosition = Math.max(0, currentPosition - cardWidth);
            }
            updateCarousel();
        }
    }

    updateCarousel();
});

// Newsletter form handling
const newsletterForm = document.getElementById('newsletterForm');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    alert(`Obrigado por se inscrever! Enviaremos novidades para: ${email}`);
    newsletterForm.reset();
});

// Inicialização
updateCartCount();
updateCartItems();
