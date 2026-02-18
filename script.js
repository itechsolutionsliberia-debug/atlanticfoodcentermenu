// Cart Management
let cart = [];

// DOM Elements
const cartToggle = document.getElementById('cartToggle');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const closeModal = document.getElementById('closeModal');
const checkoutForm = document.getElementById('checkoutForm');
const successModal = document.getElementById('successModal');
const closeSuccessModal = document.getElementById('closeSuccessModal');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    setupEventListeners();
    setupCategoryScroll();
    updateCartDisplay();
});

// Setup Event Listeners
function setupEventListeners() {
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });

    // Cart toggle
    cartToggle.addEventListener('click', () => {
        cartSidebar.classList.add('active');
    });

    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
    });

    // Checkout
    checkoutBtn.addEventListener('click', handleCheckout);
    closeModal.addEventListener('click', closeCheckoutModal);
    checkoutForm.addEventListener('submit', handleSubmitOrder);

    // Success modal
    closeSuccessModal.addEventListener('click', () => {
        successModal.classList.remove('active');
        clearCart();
        cartSidebar.classList.remove('active');
    });

    // Close modals on outside click
    checkoutModal.addEventListener('click', (e) => {
        if (e.target === checkoutModal) {
            closeCheckoutModal();
        }
    });

    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.remove('active');
        }
    });
}

// Category Smooth Scroll
function setupCategoryScroll() {
    const categoryLinks = document.querySelectorAll('.category-link');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update active class
                categoryLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Highlight active category on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('.menu-category');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        categoryLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Add to Cart
function handleAddToCart(e) {
    const button = e.currentTarget;
    const menuItem = button.closest('.menu-item');
    
    const item = {
        name: menuItem.dataset.name,
        price: parseFloat(menuItem.dataset.price),
        category: menuItem.dataset.category,
        quantity: 1
    };

    // Check if item already in cart
    const existingItem = cart.find(cartItem => cartItem.name === item.name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(item);
    }

    saveCart();
    updateCartDisplay();
    showNotification(`${item.name} added to cart!`);
    
    // Animation feedback
    button.innerHTML = '<i class="fas fa-check"></i> Added';
    button.style.background = '#27ae60';
    
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-plus"></i> Add';
        button.style.background = 'linear-gradient(135deg, var(--primary-color), #e74c3c)';
    }, 1000);
}

// Update Cart Display
function updateCartDisplay() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        checkoutBtn.disabled = true;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-header">
                    <h4>${item.name}</h4>
                    <button class="remove-item" onclick="removeFromCart('${item.name}')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="cart-item-details">
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
                        <span class="item-quantity">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
                    </div>
                    <span class="item-total">$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            </div>
        `).join('');
        checkoutBtn.disabled = false;
    }

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Update Quantity
function updateQuantity(itemName, change) {
    const item = cart.find(cartItem => cartItem.name === itemName);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(itemName);
        } else {
            saveCart();
            updateCartDisplay();
        }
    }
}

// Remove from Cart
function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    saveCart();
    updateCartDisplay();
    showNotification('Item removed from cart');
}

// Clear Cart
function clearCart() {
    cart = [];
    saveCart();
    updateCartDisplay();
}

// Handle Checkout
function handleCheckout() {
    if (cart.length === 0) return;

    // Populate checkout items list
    const checkoutItemsList = document.getElementById('checkoutItemsList');
    checkoutItemsList.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <span>${item.name} x ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');

    // Update checkout total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('checkoutTotal').textContent = `$${total.toFixed(2)}`;

    // Show checkout modal
    checkoutModal.classList.add('active');
}

// Close Checkout Modal
function closeCheckoutModal() {
    checkoutModal.classList.remove('active');
    checkoutForm.reset();
}

// Handle Submit Order
async function handleSubmitOrder(e) {
    e.preventDefault();

    const formData = new FormData(checkoutForm);
    const customerName = formData.get('customerName');
    const customerPhone = formData.get('customerPhone');
    const customerEmail = formData.get('customerEmail');
    const deliveryAddress = formData.get('deliveryAddress');
    const orderNotes = formData.get('orderNotes');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Prepare order data
    const orderData = {
        customer: {
            name: customerName,
            phone: customerPhone,
            email: customerEmail,
            address: deliveryAddress
        },
        items: cart,
        total: total.toFixed(2),
        notes: orderNotes,
        orderDate: new Date().toLocaleString(),
        orderNumber: 'AFC-' + Date.now()
    };

    // Prepare email content
    const emailBody = formatOrderEmail(orderData);

    // Submit order (using mailto as fallback)
    try {
        // In production, you would send this to a backend API
        // For now, we'll create a mailto link
        const mailtoLink = `mailto:info@atlanticfoodcenter.com?subject=New Order - ${orderData.orderNumber}&body=${encodeURIComponent(emailBody)}`;
        
        // Also log to console for debugging
        console.log('Order Data:', orderData);
        console.log('Email Body:', emailBody);

        // Open mailto link
        window.location.href = mailtoLink;

        // Show success modal
        setTimeout(() => {
            closeCheckoutModal();
            successModal.classList.add('active');
        }, 500);

    } catch (error) {
        console.error('Error submitting order:', error);
        alert('There was an error submitting your order. Please contact us directly at info@atlanticfoodcenter.com or call 0880 080 080');
    }
}

// Format Order Email
function formatOrderEmail(orderData) {
    let email = `
NEW ORDER RECEIVED
==================

Order Number: ${orderData.orderNumber}
Order Date: ${orderData.orderDate}

CUSTOMER INFORMATION
====================
Name: ${orderData.customer.name}
Phone: ${orderData.customer.phone}
Email: ${orderData.customer.email}
Delivery Address: ${orderData.customer.address}

ORDER DETAILS
=============
`;

    orderData.items.forEach(item => {
        email += `\n${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
    });

    email += `\n\n-------------------`;
    email += `\nTOTAL: $${orderData.total}`;

    if (orderData.notes) {
        email += `\n\nSPECIAL INSTRUCTIONS
=====================
${orderData.notes}`;
    }

    email += `\n\n-------------------
Please contact the customer to confirm the order.

Atlantic Food Center
www.atlanticfoodcenter.com
0880 080 080`;

    return email;
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('atlanticFoodCart', JSON.stringify(cart));
}

// Load Cart from LocalStorage
function loadCart() {
    const savedCart = localStorage.getItem('atlanticFoodCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Show Notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'linear-gradient(135deg, #27ae60, #2ecc71)',
        color: 'white',
        padding: '15px 25px',
        borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        zIndex: '1000',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        animation: 'slideIn 0.3s ease-out',
        fontSize: '1rem',
        fontWeight: '500'
    });

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);