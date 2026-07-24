// Catálogo de produtos
const products = {
    whey1: {
        name: 'Whey Gold Standard',
        price: 189.90,
        image: '../imagens/gold-morango.webp',
        description: 'Whey Protein de alta qualidade, com 24g de proteína por dose. Ideal para ganho de massa muscular e recuperação pós-treino.',
        flavors: {
            baunilha: '../imagens/gold-baunilha.webp',
            chocolate: '../imagens/gold-chocolate.png',
            morango: '../imagens/gold-morango.webp',
        },
    },
    whey2: {
        name: 'Whey Isolado Probiótica',
        price: 199.90,
        image: '../imagens/iso-pro-chocolate.webp',
        description: 'Whey Isolado com 27g de proteína por dose. Baixo teor de lactose e gordura.',
        flavors: {
            baunilha: '../imagens/iso-pro-baulinha.png',
            chocolate: '../imagens/iso-pro-chocolate.webp',
            morango: '../imagens/iso-pro-morango.webp',
        },
    },
    whey3: {
        name: 'Whey Max Titanium',
        price: 169.90,
        image: '../imagens/max.webp',
        description: 'Whey Protein com 23g de proteína por dose. Excelente custo-benefício.',
    },
    whey4: {
        name: 'Whey Isolado Growth',
        price: 179.90,
        image: '../imagens/iso-gro.avif',
        description: 'Whey Isolado premium com 26g de proteína por dose. Alta absorção.',
        flavors: {
            baunilha: '../imagens/grow-baunilha.webp',
            chocolate: '../imagens/grow-chocolate.webp',
            morango: '../imagens/grow-morango.jpg',
        },
    },
    creatina1: {
        name: 'Creatina Monohidratada Growth',
        price: 89.90,
        image: '../imagens/creatina-grow.jpg',
        description: 'Creatina monohidratada pura, 300g. Aumenta a força e o volume muscular.',
    },
    creatina2: {
        name: 'Creatina HCL Max Titanium',
        price: 99.90,
        image: '../imagens/creatina-max.webp',
        description: 'Creatina HCL com melhor absorção. 120 cápsulas.',
    },
    creatina3: {
        name: 'Creatina Creapure Probiótica',
        price: 129.90,
        image: '../imagens/creatina-probiotica.webp',
        description: 'Creatina Creapure alemã, 300g. Máxima pureza e eficácia.',
    },
    creatina4: {
        name: 'Creatina Integral',
        price: 129.90,
        image: '../imagens/creatina-integral.webp',
        description: 'Creatina integral, 300g. Máxima pureza e eficácia.',
    },
    mass1: {
        name: 'Mass Titanium',
        price: 159.90,
        image: '../imagens/mass-max-chocolate.webp',
        description: 'Hipercalórico premium com 50g de proteína por dose. Ideal para ganho de peso e massa muscular.',
        flavors: {
            baunilha: '../imagens/mass-max-baunilha.webp',
            chocolate: '../imagens/mass-max-chocolate.webp',
            morango: '../imagens/mass-max-morango.webp',
        },
    },
    mass2: {
        name: 'Mass Probiótica',
        price: 169.90,
        image: '../imagens/mass-probiotica-chocolate.webp',
        description: 'Hipercalórico com 55g de proteína por dose. Rico em carboidratos complexos.',
        flavors: {
            baunilha: '../imagens/mass-probiotica-baulinha.webp',
            chocolate: '../imagens/mass-probiotica-chocolate.webp',
            morango: '../imagens/mass-probiotica-morango.webp',
        },
    },
    mass3: {
        name: 'Mass Growth',
        price: 149.90,
        image: '../imagens/mass-grow-chocolate.jpg',
        description: 'Hipercalórico com 48g de proteína por dose. Excelente custo-benefício.',
        flavors: {
            baunilha: '../imagens/mass-grow-baunilha.webp',
            chocolate: '../imagens/mass-grow-chocolate.jpg',
            morango: '../imagens/mass-grow-morango.webp',
        },
    },
    mass4: {
        name: 'Mass Integral',
        price: 149.90,
        image: '../imagens/mass-integral-chocolate.webp',
        description: 'Hipercalórico com 48g de proteína por dose. Rico em carboidratos de digestão lenta.',
        flavors: {
            baunilha: '../imagens/mass-integral-baunilha.webp',
            chocolate: '../imagens/mass-integral-chocolate.webp',
            morango: '../imagens/mass-integral-morango.webp',
        },
    },
    pre1: {
        name: 'Pre-Workout Integral',
        price: 129.90,
        image: '../imagens/pre-integral.webp',
        description: 'Pré-treino com cafeína, beta-alanina e creatina. Aumenta a energia e o foco durante o treino.',
    },
    pre2: {
        name: 'Pre-Workout Black Max',
        price: 139.90,
        image: '../imagens/pre-max.webp',
        description: 'Pré-treino com alta concentração de cafeína e beta-alanina. Máximo foco e energia.',
    },
    pre3: {
        name: 'Pre-Workout Growth',
        price: 119.90,
        image: '../imagens/pre-grow.webp',
        description: 'Pré-treino com fórmula balanceada. Ideal para iniciantes e intermediários.',
    },
    pre4: {
        name: 'Pre-Workout Bope',
        price: 90.90,
        image: '../imagens/pre-bope.webp',
        description: 'Pré-treino de alta intensidade, fórmula concentrada.',
    },
};

// Cabeçalho: muda de estilo ao rolar
const header = document.getElementById('siteHeader');
const onScrollHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
onScrollHeader();
window.addEventListener('scroll', onScrollHeader, { passive: true });

// Menu mobile
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
navToggle.addEventListener('click', () => siteNav.classList.toggle('open'));
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => siteNav.classList.remove('open'));
});

// Carrinho
let cart = [];

const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const cartScrim = document.getElementById('cartScrim');
const closeCartBtn = document.getElementById('closeCart');
const cartItemsEl = document.getElementById('cartItems');
const cartCountEl = document.getElementById('cartCount');
const totalAmountEl = document.getElementById('totalAmount');

function toggleCart(open) {
    const shouldOpen = open ?? !cartSidebar.classList.contains('active');
    cartSidebar.classList.toggle('active', shouldOpen);
    cartScrim.classList.toggle('active', shouldOpen);
}

function updateCart() {
    cartCountEl.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalAmountEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;

    if (cart.length === 0) {
        cartItemsEl.innerHTML = '<p class="cart-empty">Seu carrinho está vazio.</p>';
        return;
    }

    cartItemsEl.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                ${item.flavor ? `<p>Sabor: ${item.flavor}</p>` : ''}
                <p>R$ ${item.price.toFixed(2).replace('.', ',')} x ${item.quantity}</p>
            </div>
            <button class="remove-item" data-key="${item.key}" aria-label="Remover">&times;</button>
        </div>
    `).join('');

    cartItemsEl.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => {
            cart = cart.filter(item => item.key !== button.dataset.key);
            updateCart();
        });
    });
}

function addToCart(productId, product, flavor, image, quantity) {
    const key = `${productId}-${flavor || 'default'}`;
    const existing = cart.find(item => item.key === key);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ key, name: product.name, price: product.price, image, flavor, quantity });
    }
    updateCart();
    toggleCart(true);
}

cartIcon.addEventListener('click', () => toggleCart());
closeCartBtn.addEventListener('click', () => toggleCart(false));
cartScrim.addEventListener('click', () => toggleCart(false));

// Modal de produto
const productModal = document.getElementById('productModal');
const modalClose = document.getElementById('modalClose');
const productImage = document.getElementById('productImage');
const productName = document.getElementById('productName');
const productPrice = document.getElementById('productPrice');
const productDescription = document.getElementById('productDescription');
const flavorSelector = document.getElementById('flavorSelector');
const flavorButtons = document.getElementById('flavorButtons');
const quantityInput = document.getElementById('quantity');
const addToCartBtn = document.getElementById('addToCartBtn');

let currentProductId = null;
let currentFlavor = null;

function openProductModal(productId) {
    const product = products[productId];
    if (!product) return;

    currentProductId = productId;
    currentFlavor = null;

    productName.textContent = product.name;
    productPrice.textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
    productDescription.textContent = product.description;
    quantityInput.value = 1;

    if (product.flavors) {
        flavorSelector.style.display = 'block';
        const flavorNames = Object.keys(product.flavors);
        currentFlavor = flavorNames[0];
        productImage.src = product.flavors[currentFlavor];

        flavorButtons.innerHTML = flavorNames.map((flavor, i) => `
            <button type="button" class="flavor-btn${i === 0 ? ' active' : ''}" data-flavor="${flavor}">${flavor}</button>
        `).join('');

        flavorButtons.querySelectorAll('.flavor-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                flavorButtons.querySelectorAll('.flavor-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFlavor = btn.dataset.flavor;
                productImage.src = product.flavors[currentFlavor];
            });
        });
    } else {
        flavorSelector.style.display = 'none';
        productImage.src = product.image;
    }

    productModal.classList.add('active');
}

function closeProductModal() {
    productModal.classList.remove('active');
    currentProductId = null;
}

document.querySelectorAll('.view-product').forEach(button => {
    button.addEventListener('click', () => openProductModal(button.dataset.product));
});

modalClose.addEventListener('click', closeProductModal);
productModal.addEventListener('click', (e) => {
    if (e.target === productModal) closeProductModal();
});

document.getElementById('decreaseQuantity').addEventListener('click', () => {
    const value = parseInt(quantityInput.value, 10);
    if (value > 1) quantityInput.value = value - 1;
});

document.getElementById('increaseQuantity').addEventListener('click', () => {
    const value = parseInt(quantityInput.value, 10);
    if (value < 10) quantityInput.value = value + 1;
});

quantityInput.addEventListener('change', () => {
    let value = parseInt(quantityInput.value, 10);
    if (isNaN(value) || value < 1) value = 1;
    if (value > 10) value = 10;
    quantityInput.value = value;
});

addToCartBtn.addEventListener('click', () => {
    if (!currentProductId) return;
    const product = products[currentProductId];
    const quantity = parseInt(quantityInput.value, 10) || 1;
    const image = currentFlavor ? product.flavors[currentFlavor] : product.image;
    addToCart(currentProductId, product, currentFlavor, image, quantity);
    closeProductModal();
});

// Estado inicial
updateCart();
