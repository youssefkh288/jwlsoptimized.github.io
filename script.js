// Performance optimizations
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Custom cursor with performance optimization
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.className = 'cursor-follower';
document.body.appendChild(cursorFollower);

let rafId = null;
document.addEventListener('mousemove', (e) => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        setTimeout(() => {
            cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        }, 100);
    });
});

// Loader with performance optimization
window.addEventListener('load', () => {
    requestAnimationFrame(() => {
        const loader = document.querySelector('.loader');
        loader.classList.add('fade-out');
    });
});

// Initialize animations with performance optimization
const initAnimations = () => {
    const elementsToAnimate = document.querySelectorAll(
        '.hero-content h1, .hero-content p, .section-header, .product-card, .about-content, .about-content p, .contact-content'
    );
    
    elementsToAnimate.forEach(element => {
        element.classList.add('reveal');
    });
};

// Intersection Observer with performance optimization
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            requestAnimationFrame(() => {
                entry.target.classList.add('active');
            });
        } else {
            requestAnimationFrame(() => {
                entry.target.classList.remove('active');
            });
        }
    });
}, observerOptions);

// Smooth scroll with performance optimization
const smoothScroll = (e) => {
    e.preventDefault();
    const target = document.querySelector(e.currentTarget.getAttribute('href'));
    if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', smoothScroll);
});

// Navbar scroll effect with performance optimization
const navbar = document.querySelector('.main-nav');
let lastScroll = 0;

const handleScroll = debounce(() => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        requestAnimationFrame(() => {
            navbar.classList.remove('scroll-up', 'scroll-down');
            navbar.style.backgroundColor = 'var(--primary)';
            navbar.style.boxShadow = '0 2px 20px rgba(160, 140, 175, 0.2)';
            navbar.classList.remove('scrolled');
        });
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        requestAnimationFrame(() => {
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(160, 140, 175, 0.15)';
            navbar.classList.add('scrolled');
        });
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        requestAnimationFrame(() => {
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
            navbar.style.backgroundColor = 'var(--primary)';
            navbar.style.boxShadow = '0 2px 20px rgba(160, 140, 175, 0.2)';
            navbar.classList.add('scrolled');
        });
    }
    lastScroll = currentScroll;
}, 16);

window.addEventListener('scroll', handleScroll, { passive: true });

// Mobile menu with performance optimization
const menuButton = document.querySelector('.menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (menuButton) {
    menuButton.addEventListener('click', () => {
        requestAnimationFrame(() => {
            menuButton.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    });
}

// Product card hover effects with performance optimization
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        requestAnimationFrame(() => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 20px 40px rgba(160, 140, 175, 0.2)';
        });
    });
    
    card.addEventListener('mouseleave', () => {
        requestAnimationFrame(() => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
});

// Parallax effect with performance optimization
const handleParallax = debounce(() => {
    const hero = document.querySelector('.hero');
    if (hero) {
        requestAnimationFrame(() => {
            hero.style.backgroundPositionY = window.pageYOffset * 0.5 + 'px';
        });
    }
}, 16);

window.addEventListener('scroll', handleParallax, { passive: true });

// Cart functionality with performance optimization
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const updateCartBadge = () => {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        requestAnimationFrame(() => {
            badge.textContent = cart.length;
            badge.style.display = cart.length > 0 ? 'flex' : 'none';
        });
    }
};

// Add to cart with performance optimization
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function() {
        const product = JSON.parse(this.dataset.product);
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartBadge();
        
        const message = document.createElement('div');
        message.className = 'success-message';
        message.textContent = 'Added to cart!';
        document.body.appendChild(message);
        
        setTimeout(() => {
            requestAnimationFrame(() => {
                message.remove();
            });
        }, 2000);
    });
});

// Initialize cart badge
const initCartBadge = () => {
    const cartIcon = document.querySelector('.fa-shopping-cart')?.parentElement;
    if (cartIcon) {
        cartIcon.classList.add('cart-icon-container');
        const badge = document.createElement('div');
        badge.className = 'cart-badge';
        cartIcon.appendChild(badge);
        updateCartBadge();
    }
};

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    initAnimations();
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
    initCartBadge();
}); 