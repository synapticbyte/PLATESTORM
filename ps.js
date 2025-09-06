// PLATESTORM Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for internal links
    initSmoothScroll();
    
    // Add parallax effect to hero section
    initParallaxEffect();
    
    // Animate elements on scroll
    initScrollAnimations();
    
    // Add hover effects to cards
    initCardEffects();
    
    // Counter animation for spec values
    initCounterAnimation();
    
    // CTA button click handler
    initCTAHandler();
});

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroTitle = document.querySelector('.hero-title');
    const subtitle = document.querySelector('.subtitle');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
        
        if (heroTitle) {
            heroTitle.style.transform = `translateY(${scrolled * parallaxSpeed * 0.3}px)`;
        }
        
        if (subtitle) {
            subtitle.style.transform = `translateY(${scrolled * parallaxSpeed * 0.2}px)`;
        }
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Animate children with stagger effect
                const children = entry.target.querySelectorAll('.feature-card, .spec-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('.page').forEach(section => {
        observer.observe(section);
    });
    
    // Initial state for animated elements
    document.querySelectorAll('.feature-card, .spec-item').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

// Enhanced card hover effects
function initCardEffects() {
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--mouse-x', `${x}px`);
            this.style.setProperty('--mouse-y', `${y}px`);
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--mouse-x', `${x}px`);
            this.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// Animate counter numbers
function initCounterAnimation() {
    const counters = document.querySelectorAll('.spec-value');
    const animationDuration = 2000; // 2 seconds
    
    const animateCounter = (counter) => {
        const target = counter.innerText;
        const isPercentage = target.includes('%');
        const isDecimal = target.includes('.');
        const isDuration = target.includes('dB');
        
        let finalValue = parseFloat(target.replace(/[^0-9.]/g, ''));
        let currentValue = 0;
        const increment = finalValue / (animationDuration / 16);
        
        const updateCounter = () => {
            currentValue += increment;
            
            if (currentValue < finalValue) {
                if (isDecimal) {
                    counter.innerText = currentValue.toFixed(1) + (isPercentage ? '%' : '');
                } else {
                    counter.innerText = Math.floor(currentValue) + (isPercentage ? '%' : '') + (isDuration ? 'dB' : '');
                }
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCounter();
    };
    
    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// CTA button handler
function initCTAHandler() {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Show alert or perform action
            alert('Welcome to the PLATESTORM Revolution! Contact us for more information.');
        });
    }
}

// Add dynamic gradient animation on mouse move
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    document.documentElement.style.setProperty('--mouse-x-percent', `${x * 100}%`);
    document.documentElement.style.setProperty('--mouse-y-percent', `${y * 100}%`);
});

// Page load animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero title letters
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerText;
        heroTitle.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.animationDelay = `${index * 0.1}s`;
            span.className = 'letter-animation';
            heroTitle.appendChild(span);
        });
    }
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);