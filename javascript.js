let cart = [];
let currentIndex = 0;

// Generar productos del HTML y añadir evento de clic al botón de cada producto
function initializeProducts() {
    const products = document.querySelectorAll(".product-card");
    products.forEach((productCard, index) => {
        const addToCartBtn = productCard.querySelector(".add-to-cart");
        addToCartBtn.addEventListener("click", () => addToCart(productCard, index));
    });
}

// Agregar al carrito con cantidad
function addToCart(productCard, index) {
    const productName = productCard.querySelector("h3").innerText;
    const productPrice = parseFloat(productCard.querySelector(".price").getAttribute("data-price"));
    const quantity = parseInt(productCard.querySelector(".quantity-input").value);

    cart.push({ name: productName, price: productPrice, quantity: quantity });
    alert(`${productName} agregado al carrito!`);
}

// Movimiento del carrusel
function moveCarousel(direction) {
    const carousel = document.querySelector(".carousel");
    const productWidth = document.querySelector(".product-card").offsetWidth;
    const gap = 24; // Espacio entre productos
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = document.querySelectorAll(".product-card").length - 1;
    } else if (currentIndex >= document.querySelectorAll(".product-card").length) {
        currentIndex = 0;
    }

    carousel.style.transform = `translateX(-${currentIndex * (productWidth + gap)}px)`;
}

// Mostrar carrito con cantidades
function showCart() {
    const cartModal = document.getElementById("cartModal");
    const cartItems = document.getElementById("cartItems");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const itemRow = document.createElement("div");
        itemRow.classList.add("cart-item");
        itemRow.innerHTML = `
            <p>${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartItems.appendChild(itemRow);
        total += item.price * item.quantity;
    });

    cartItems.innerHTML += `<p><strong>Total: $${total.toFixed(2)}</strong></p>`;
    cartModal.style.display = "flex";
}

function closeCart() {
    document.getElementById("cartModal").style.display = "none";
}

function removeFromCart(index) {
    cart.splice(index, 1);
    showCart();
}

function confirmOrder() {
    alert("Pedido confirmado. Gracias por su compra!");
    cart = [];
    closeCart();
}

// Inicializar productos al cargar la página
document.addEventListener("DOMContentLoaded", initializeProducts);
