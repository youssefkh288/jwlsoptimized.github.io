// Custom cursor
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.className = 'cursor-follower';
document.body.appendChild(cursorFollower);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('fade-out');
    }, 1000);
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Add reveal class to elements that should animate
    const elementsToAnimate = document.querySelectorAll(
        '.hero-content h1, .hero-content p, .section-header, .product-card, .about-content, .about-content p, .contact-content'
      );
      
    elementsToAnimate.forEach(element => {
        element.classList.add('reveal');
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, observerOptions);

// Observe all elements with reveal class
document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.main-nav');
let lastScroll = 0;
let isScrolling;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Clear our timeout throughout the scroll
    window.clearTimeout(isScrolling);
    
    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(() => {
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up', 'scroll-down');
            navbar.style.backgroundColor = 'var(--primary)';
            navbar.style.boxShadow = '0 2px 20px rgba(160, 140, 175, 0.2)';
            navbar.classList.remove('scrolled');
        }
    }, 66);
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up', 'scroll-down');
        navbar.style.backgroundColor = 'var(--primary)';
        navbar.style.boxShadow = '0 2px 20px rgba(160, 140, 175, 0.2)';
        navbar.classList.remove('scrolled');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(160, 140, 175, 0.15)';
        navbar.classList.add('scrolled');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
        navbar.style.backgroundColor = 'var(--primary)';
        navbar.style.boxShadow = '0 2px 20px rgba(160, 140, 175, 0.2)';
        navbar.classList.add('scrolled');
    }
    lastScroll = currentScroll;
});

// Mobile menu toggle
const menuButton = document.querySelector('.menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (menuButton) {
    menuButton.addEventListener('click', () => {
        menuButton.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && !e.target.closest('.nav-menu') && !e.target.closest('.menu-btn')) {
        navMenu.classList.remove('active');
        menuButton.classList.remove('active');
    }
});

// Product card hover effects
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 20px 40px rgba(160, 140, 175, 0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Add loading animation
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
});

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart badge
function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        badge.textContent = cart.length;
        badge.style.display = cart.length > 0 ? 'flex' : 'none';
    }
}

// Add to cart functionality
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function() {
        const product = JSON.parse(this.dataset.product);
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartBadge();
        
        // Show success message
        const message = document.createElement('div');
        message.className = 'success-message';
        message.textContent = 'Added to cart!';
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 2000);
    });
});

// Update cart badge on page load
document.addEventListener('DOMContentLoaded', updateCartBadge);

// Add cart badge to cart icon
const cartIcon = document.querySelector('.fa-shopping-cart').parentElement;
cartIcon.classList.add('cart-icon-container');
const badge = document.createElement('div');
badge.className = 'cart-badge';
cartIcon.appendChild(badge);
updateCartBadge(); 