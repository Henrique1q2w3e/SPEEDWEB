// Dados dos produtos (simulando um banco de dados)
const products = {
    // Whey Proteins
    whey1: {
        name: 'Whey Gold Standard',
        price: 189.90,
        image: '../imagens/gold-chocolate.jpg',
        description: 'Whey Protein de alta qualidade, com 24g de proteína por dose. Ideal para ganho de massa muscular e recuperação pós-treino.',
        flavors: {
            'baunilha': '../imagens/gold-baunilha.webp',
            'chocolate': '../imagens/gold-chocolate.jpg',
            'morango': '../imagens/gold-morango.webp'
        }
    },
    whey2: {
        name: 'Whey Isolado Probiótica',
        price: 199.90,
        image: '../imagens/probi-isolado.png',
        description: 'Whey Isolado com 27g de proteína por dose. Baixo teor de lactose e gordura.',
        flavors: {
            'baunilha': '../imagens/iso-pro-baulinha.png',
            'chocolate': '../imagens/iso-pro-chocolate.webp',
            'morango': '../imagens/iso-pro-morango.webp'
        }
    },
    whey3: {
        name: 'Whey Max Titanium',
        price: 169.90,
        image: '../imagens/max.webp',
        description: 'Whey Protein com 23g de proteína por dose. Excelente custo-benefício.',
        flavors: {
            'baunilha': '../imagens/max-baunilha.webp',
            'chocolate': '../imagens/max-chocolate.webp',
            'morango': '../imagens/max-morango.webp'
        }
    },
    whey4: {
        name: 'Whey Isolado Growth',
        price: 179.90,
        image: '../imagens/iso-gro.avif',
        description: 'Whey Isolado premium com 26g de proteína por dose. Alta absorção.',
        flavors: {
            'baunilha': '../imagens/grow-baunilha.webp',
            'chocolate': '../imagens/grow-chocolate.webp',
            'morango': '../imagens/grow-morango.jpg'
        }
    },

    // Creatinas
    creatina1: {
        name: 'Creatina Monohidratada Growth',
        price: 89.90,
        image: '../imagens/creatina-grow.jpg',
        description: 'Creatina monohidratada pura, 300g. Aumenta a força e o volume muscular.',
        hasFlavors: false
    },
    creatina2: {
        name: 'Creatina HCL Max Titanium',
        price: 99.90,
        image: '../imagens/creatina-max.jpg',
        description: 'Creatina HCL com melhor absorção. 120 cápsulas.',
        hasFlavors: false
    },
    creatina3: {
        name: 'Creatina Creapure Probiótica',
        price: 129.90,
        image: '../imagens/creatina-probiotica.jpg',
        description: 'Creatina Creapure alemã, 300g. Máxima pureza e eficácia.',
        hasFlavors: false
    },
    creatina4: {
        name: 'Creatina intregral',
        price: 129.90,
        image: '../imagens/creatina-integral.webp',
        description: 'Creatina intregral, 300g. Máxima pureza e eficácia.',
        hasFlavors: false
    },

    // Hipercalóricos
    mass1: {
        name: 'Mass Titanium',
        price: 159.90,
        image: 'https://via.placeholder.com/400x400',
        description: 'Hipercalórico premium com 50g de proteína por dose. Ideal para ganho de peso e massa muscular.',
        flavors: {
            'baunilha': '../imagens/mass-probiotica-baulinha.webp',
            'chocolate': '../imagens/mass-probiotica-chocolate.webp',
            'morango': '../imagens/mass-probiotica-morango.webp'
        }
    },
    mass2: {
        name: 'Mass Probiótica',
        price: 169.90,
        image: 'https://via.placeholder.com/400x400',
        description: 'Hipercalórico com 55g de proteína por dose. Rico em carboidratos complexos.',
        flavors: {
            'baunilha': '../imagens/mass-probiotica-baulinha.webp',
            'chocolate': '../imagens/mass-probiotica-chocolate.webp',
            'morango': '../imagens/mass-probiotica-morango.webp'
        }
    },
    mass3: {
        name: 'Mass Growth',
        price: 149.90,
        image: 'https://via.placeholder.com/400x400',
        description: 'Hipercalórico com 48g de proteína por dose. Excelente custo-benefício.',
        flavors: {
            'baunilha': '../imagens/mass-grow-baunilha.webp',
            'chocolate': '  ../imagens/mass-grow-chocolate.jpg',
            'morango': '../imagens/mass-grow-morango.webp'
        }
    },
    mass4: {
        name: 'Mass Growth',
        price: 149.90,
        image: 'https://via.placeholder.com/400x400',
        description: 'Hipercalórico com 48g de proteína por dose. Excelente custo-benefício.',
        flavors: {
            'baunilha': '../imagens/mass-integral-baunilha.webp',
            'chocolate': '  ../imagens/mass-integral-chocolate.webp',
            'morango': '../imagens/mass-integral-morango.webp'
        }
    },

    // Pré-treinos
    pre1: {
        name: 'Pre-Workout intregral',
        price: 129.90,
        image: '../imagens/pre-integral.jpg',
        description: 'Pré-treino com cafeína, beta-alanina e creatina. Aumenta a energia e o foco durante o treino.',
        hasFlavors: false
    },
    pre2: {
        name: 'Pre-Workout Black Max',
        price: 139.90,
        image: '../imagens/pre-max.jpg',
        description: 'Pré-treino com alta concentração de cafeína e beta-alanina. Máximo foco e energia.',
        hasFlavors: false
    },
        pre3: {
            name: 'Pre-Workout Growth',
            price: 119.90,
            image: '../imagens/pre-grow.webp',
            description: 'Pré-treino com fórmula balanceada. Ideal para iniciantes e intermediários.',
            hasFlavors: false
        },
    pre4: {
        name: 'Pre-Workout Bope',
        price: 90.90,
        image: '../imagens/pre-bope.webp',
        description: 'Pré-treino com fórmula balanceada. Ideal para iniciantes e intermediários.',
        hasFlavors: false
    },
        

    // Barras de Proteína
    barra1: {
        name: 'Protein Bar Growth',
        price: 12.90,
        image: 'https://via.placeholder.com/400x400',
        description: 'Barra de proteína com 20g de proteína. Snack perfeito para qualquer hora do dia.',
        flavors: {
            'chocolate': '../imagens/barra-growth-chocolate.webp',
            'caramelo': '../imagens/barra-growth-caramelo.webp',
            'cookies': '../imagens/barra-growth-cookies.webp'
        }
    },
    barra2: {
        name: 'Protein Bar Max Titanium',
        price: 14.90,
        image: 'https://via.placeholder.com/400x400',
        description: 'Barra de proteína premium com 22g de proteína. Baixo teor de açúcar.',
        flavors: {
            'chocolate': '../imagens/barra-max-chocolate.webp',
            'caramelo': '../imagens/barra-max-caramelo.webp',
            'cookies': '../imagens/barra-max-cookies.webp'
        }
    },
    barra3: {
        name: 'Protein Bar Probiótica',
        price: 13.90,
        image: 'https://via.placeholder.com/400x400',
        description: 'Barra de proteína com 21g de proteína. Rico em fibras e proteínas.',
        flavors: {
            'chocolate': '../imagens/barra-pro-chocolate.webp',
            'caramelo': '../imagens/barra-pro-caramelo.webp',
            'cookies': '../imagens/barra-pro-cookies.webp'
        }
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
        ${Object.keys(product.flavors).map(flavor => `
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

// Product Modal and Flavor Selection
document.addEventListener('DOMContentLoaded', function() {
    const productModal = new bootstrap.Modal(document.getElementById('productModal'));
    const productImage = document.getElementById('productImage');
    const productName = document.getElementById('productName');
    const productPrice = document.getElementById('productPrice');
    const flavorButtons = document.querySelectorAll('.flavor-btn');
    const quantityInput = document.getElementById('quantity');
    const decreaseQuantityBtn = document.getElementById('decreaseQuantity');
    const increaseQuantityBtn = document.getElementById('increaseQuantity');
    let currentProductId = null;

    // Handle product card clicks
    document.querySelectorAll('.view-product').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.product;
            const product = products[productId];
            if (!product) return;

            currentProductId = productId;
            const productCard = this.closest('.product-card');
            const name = productCard.querySelector('h3').textContent;
            const price = productCard.querySelector('.price').textContent;

            // Update modal content
            productName.textContent = name;
            productPrice.textContent = price;

            // Show/hide flavor selector based on product type
            const flavorSelector = document.querySelector('.flavor-selector');
            if (product.hasFlavors === false) {
                flavorSelector.style.display = 'none';
                productImage.src = product.image;
            } else {
                flavorSelector.style.display = 'block';
                // Update flavor buttons with product-specific images
                flavorButtons.forEach(btn => {
                    const flavor = btn.dataset.flavor;
                    if (product.flavors[flavor]) {
                        btn.dataset.image = product.flavors[flavor];
                    }
                });

                // Set initial image
                const initialFlavor = flavorButtons[0].dataset.flavor;
                productImage.src = product.flavors[initialFlavor] || product.image;

                // Reset flavor selection
                flavorButtons.forEach(btn => btn.classList.remove('active'));
                flavorButtons[0].classList.add('active');
            }

            // Reset quantity
            quantityInput.value = 1;

            // Show modal
            productModal.show();
        });
    });

    // Handle flavor selection
    flavorButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            flavorButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update product image
            const newImage = this.dataset.image;
            productImage.src = newImage;
        });
    });

    // Handle quantity controls
    decreaseQuantityBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    increaseQuantityBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue < 10) {
            quantityInput.value = currentValue + 1;
        }
    });

    // Handle quantity input validation
    quantityInput.addEventListener('change', () => {
        let value = parseInt(quantityInput.value);
        if (isNaN(value) || value < 1) {
            quantityInput.value = 1;
        } else if (value > 10) {
            quantityInput.value = 10;
        }
    });

    // Handle add to cart
    document.querySelector('.add-to-cart').addEventListener('click', function() {
        if (!currentProductId) return;

        const product = products[currentProductId];
        const selectedFlavor = document.querySelector('.flavor-btn.active').dataset.flavor;
        const quantity = parseInt(quantityInput.value);

        // Add to cart
        const cartItem = {
            id: currentProductId,
            name: product.name,
            price: product.price,
            image: productImage.src,
            flavor: selectedFlavor,
            quantity: quantity
        };

        // Check if item already exists in cart
        const existingItemIndex = cart.findIndex(item => 
            item.id === cartItem.id && item.flavor === cartItem.flavor
        );

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push(cartItem);
        }

        // Update cart UI
        updateCartCount();
        updateCartTotal();
        renderCartItems();

        // Show success message
        alert('Produto adicionado ao carrinho!');
        
        // Close modal
        productModal.hide();
    });
});
