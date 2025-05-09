// Dados dos produtos (simulando um banco de dados)
const products = {
    // Whey Proteins
    whey1: {
        name: 'Whey Gold Standard',
        price: 189.90,
        image: 'https://via.placeholder.com/400x400',
        description: 'Whey Protein de alta qualidade, com 24g de proteína por dose. Ideal para ganho de massa muscular e recuperação pós-treino.',
        flavors: ['Chocolate', 'Baunilha', 'Morango', 'Cookies & Cream']
    },
    whey2: {
        name: 'Whey Isolado Probiótica',
        price: 199.90,
        image: 'https://via.placeholder.com/400x400',
        description: 'Whey Isolado com 27g de proteína por dose. Baixo teor de lactose e gordura.',
        flavors: ['Chocolate', 'Baunilha', 'Morango', 'Doce de Leite']
    },
    whey3: {
        name: 'Whey Max Titanium',
        price: 169.90,
        image: 'https://via.placeholder.com/400x400',
        description: 'Whey Protein com 23g de proteína por dose. Excelente custo-benefício.',
        flavors: ['Chocolate', 'Baunilha', 'Morango', 'Cookies & Cream', 'Chocolate Branco']
    },
    whey4: {
        name: 'Whey Isolado Growth',
        price: 179.90,
        image: 'https://via.placeholder.com/400x400',
        description: 'Whey Isolado premium com 26g de proteína por dose. Alta absorção.',
        flavors: ['Chocolate', 'Baunilha', 'Morango', 'Chocolate Branco', 'Cookies & Cream']
    },

    // Creatinas
    creatina1: {
        name: 'Creatina Monohidratada Growth',
        price: 89.90,
        image: 'https://via.placeholder.com/400x400',
        description: 'Creatina monohidratada pura, 300g. Aumenta a força e o volume muscular.',
        flavors: ['Sem sabor']
    },
    creatina2: {
        name: 'Creatina HCL Max Titanium',
        price: 99.90,
        image: 'https://via.placeholder.com/400x400',
        description: 'Creatina HCL com melhor absorção. 120 cápsulas.',
        flavors: ['Sem sabor']
    },
    creatina3: {
        name: 'Creatina Creapure Probiótica',
        price: 129.90,
        image: 'https://via.placeholder.com/400x400',
        description: 'Creatina Creapure alemã, 300g. Máxima pureza e eficácia.',
        flavors: ['Sem sabor']
    },

    // Hipercalóricos
    mass1: {
        name: 'Mass Titanium',
        price: 159.90,
        image: 'https://via.placeholder.com/400x400',
        description: 'Hipercalórico premium com 50g de proteína por dose. Ideal para ganho de peso e massa muscular.',
        flavors: ['Chocolate', 'Baunilha', 'Morango']
    },
    mass2: {
        name: 'Mass Probiótica',
        price: 169.90,
        image: 'https://via.placeholder.com/400x400',
        description: 'Hipercalórico com 55g de proteína por dose. Rico em carboidratos complexos.',
        flavors: ['Chocolate', 'Baunilha', 'Morango', 'Doce de Leite']
    },
    mass3: {
        name: 'Mass Growth',
        price: 149.90,
        image: 'https://via.placeholder.com/400x400',
        description: 'Hipercalórico com 48g de proteína por dose. Excelente custo-benefício.',
        flavors: ['Chocolate', 'Baunilha', 'Morango', 'Chocolate Branco']
    },

    // Pré-treinos
    pre1: {
        name: 'Pre-Workout Explosion',
        price: 129.90,
        image: 'https://via.placeholder.com/400x400',
        description: 'Pré-treino com cafeína, beta-alanina e creatina. Aumenta a energia e o foco durante o treino.',
        flavors: ['Frutas Vermelhas', 'Laranja', 'Limão']
    },
    pre2: {
        name: 'Pre-Workout Black Max',
        price: 139.90,
        image: 'https://via.placeholder.com/400x400',
        description: 'Pré-treino com alta concentração de cafeína e beta-alanina. Máximo foco e energia.',
        flavors: ['Frutas Vermelhas', 'Laranja', 'Limão', 'Tutti-Frutti']
    },
    pre3: {
        name: 'Pre-Workout Growth',
        price: 119.90,
        image: 'https://via.placeholder.com/400x400',
        description: 'Pré-treino com fórmula balanceada. Ideal para iniciantes e intermediários.',
        flavors: ['Frutas Vermelhas', 'Laranja', 'Limão', 'Uva']
    },

    // Barras de Proteína
    barra1: {
        name: 'Protein Bar Growth',
        price: 12.90,
        image: 'https://via.placeholder.com/400x400',
        description: 'Barra de proteína com 20g de proteína. Snack perfeito para qualquer hora do dia.',
        flavors: ['Chocolate', 'Caramelo', 'Cookies & Cream']
    },
    barra2: {
        name: 'Protein Bar Max Titanium',
        price: 14.90,
        image: 'https://via.placeholder.com/400x400',
        description: 'Barra de proteína premium com 22g de proteína. Baixo teor de açúcar.',
        flavors: ['Chocolate', 'Caramelo', 'Cookies & Cream', 'Chocolate Branco']
    },
    barra3: {
        name: 'Protein Bar Probiótica',
        price: 13.90,
        image: 'https://via.placeholder.com/400x400',
        description: 'Barra de proteína com 21g de proteína. Rico em fibras e proteínas.',
        flavors: ['Chocolate', 'Caramelo', 'Cookies & Cream', 'Doce de Leite']
    }
};

// Carrinho de compras
let cart = [];

// Elementos do DOM
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.querySelector('.cart-sidebar');
const closeCartBtn = document.querySelector('.close-cart');
const cartItems = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const totalAmount = document.querySelector('.total-amount');
const productModal = new bootstrap.Modal(document.getElementById('productModal'));

// Funções do Carrinho
function toggleCart() {
    cartSidebar.classList.toggle('active');
}

function updateCartCount() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalAmount.textContent = `R$ ${total.toFixed(2)}`;
}

function renderCartItems() {
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>Sabor: ${item.flavor}</p>
                <p>R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <button class="remove-item" data-id="${item.id}">&times;</button>
        </div>
    `).join('');

    // Adicionar eventos aos botões de remover
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            removeFromCart(id);
        });
    });
}

function addToCart(product, flavor) {
    const existingItem = cart.find(item => item.id === product.id && item.flavor === flavor);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            flavor: flavor,
            quantity: 1
        });
    }

    updateCartCount();
    updateCartTotal();
    renderCartItems();
    toggleCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartCount();
    updateCartTotal();
    renderCartItems();
}

// Funções do Modal
function openProductModal(productId) {
    const product = products[productId];
    if (!product) return;

    const modal = document.getElementById('productModal');
    modal.querySelector('.modal-product-image').src = product.image;
    modal.querySelector('.modal-product-name').textContent = product.name;
    modal.querySelector('.modal-product-description').textContent = product.description;
    modal.querySelector('.modal-product-price').textContent = `R$ ${product.price.toFixed(2)}`;

    // Preencher opções de sabor
    const flavorSelect = modal.querySelector('#flavor');
    flavorSelect.innerHTML = `
        <option value="">Selecione um sabor</option>
        ${product.flavors.map(flavor => `
            <option value="${flavor}">${flavor}</option>
        `).join('')}
    `;

    // Configurar botão de adicionar ao carrinho
    const addToCartBtn = modal.querySelector('.add-to-cart');
    addToCartBtn.onclick = () => {
        const selectedFlavor = flavorSelect.value;
        if (!selectedFlavor) {
            alert('Por favor, selecione um sabor');
            return;
        }
        addToCart(product, selectedFlavor);
        productModal.hide();
    };

    productModal.show();
}

// Scroll Animation
function handleScrollAnimation() {
    const categories = document.querySelectorAll('.product-category');
    categories.forEach(category => {
        const rect = category.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight * 0.8);
        
        if (isVisible) {
            category.classList.add('visible');
        }
    });
}

// Inicialização dos Swipers
document.addEventListener('DOMContentLoaded', () => {
    // Configuração comum para todos os swipers
    const swiperConfig = {
        slidesPerView: 'auto',
        spaceBetween: 20,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            480: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 20
            }
        }
    };

    // Inicializar cada swiper
    new Swiper('.whey-swiper', swiperConfig);
    new Swiper('.creatina-swiper', swiperConfig);
    new Swiper('.mass-swiper', swiperConfig);
    new Swiper('.pre-swiper', swiperConfig);
    new Swiper('.barras-swiper', swiperConfig);

    // Eventos do carrinho
    cartIcon.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);

    // Eventos dos produtos
    document.querySelectorAll('.view-product').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.product;
            openProductModal(productId);
        });
    });

    // Scroll animation
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation(); // Inicial check
});
