/**
 * Writz Hub - Landing Page JavaScript
 * Modern, Premium Tech Theme with Advanced Animations
 */

// ===================================
// Configuration & Constants
// ===================================
const CONFIG = {
    cursor: {
        followSpeed: 0.15,
        hoverScale: 60,
        clickScale: 20
    },
    particles: {
        count: 50,
        size: { min: 1, max: 3 },
        speed: { min: 0.1, max: 0.5 },
        opacity: { min: 0.05, max: 0.2 },
        mouseInfluence: 0.02
    },
    animations: {
        scrollThreshold: 0.1,
        staggerDelay: 0.1
    }
};

// ===================================
// Custom Cursor
// ===================================
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.follower = document.querySelector('.cursor-follower');
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.followerX = 0;
        this.followerY = 0;
        this.isHovering = false;
        this.isClicking = false;
        
        this.init();
    }
    
    init() {
        // Hide cursor on mobile
        if (window.innerWidth < 768) {
            this.cursor.style.display = 'none';
            this.follower.style.display = 'none';
            return;
        }
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.update();
        });
        
        // Track hover state
        const interactiveElements = document.querySelectorAll('a, button, .btn, .feature-card, .executor-logo, .stat-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.isHovering = true);
            el.addEventListener('mouseleave', () => this.isHovering = false);
        });
        
        // Track click state
        document.addEventListener('mousedown', () => this.isClicking = true);
        document.addEventListener('mouseup', () => this.isClicking = false);
        
        // Start animation loop
        this.animate();
    }
    
    update() {
        // Direct cursor follows mouse
        this.cursorX = this.mouseX;
        this.cursorY = this.mouseY;
        
        // Follower with smoothing
        this.followerX += (this.mouseX - this.followerX) * CONFIG.cursor.followSpeed;
        this.followerY += (this.mouseY - this.followerY) * CONFIG.cursor.followSpeed;
    }
    
    animate() {
        if (window.innerWidth >= 768) {
            // Update cursor position
            this.cursor.style.transform = `translate(-50%, -50%) translate(${this.cursorX}px, ${this.cursorY}px)`;
            this.follower.style.transform = `translate(-50%, -50%) translate(${this.followerX}px, ${this.followerY}px)`;
            
            // Update cursor states
            this.cursor.classList.toggle('click', this.isClicking);
            this.follower.classList.toggle('hover', this.isHovering);
            this.follower.classList.toggle('click', this.isClicking);
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// ===================================
// Particle Background
// ===================================
class ParticleCanvas {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseRadius = 100;
        
        this.init();
    }
    
    init() {
        this.resize();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < CONFIG.particles.count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * (CONFIG.particles.size.max - CONFIG.particles.size.min) + CONFIG.particles.size.min,
                speedX: (Math.random() - 0.5) * (CONFIG.particles.speed.max - CONFIG.particles.speed.min) + CONFIG.particles.speed.min,
                speedY: (Math.random() - 0.5) * (CONFIG.particles.speed.max - CONFIG.particles.speed.min) + CONFIG.particles.speed.min,
                opacity: Math.random() * (CONFIG.particles.opacity.max - CONFIG.particles.opacity.min) + CONFIG.particles.opacity.min,
                baseX: Math.random() * this.canvas.width,
                baseY: Math.random() * this.canvas.height
            });
        }
    }
    
    bindEvents() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });
        
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid pattern
        this.drawGrid();
        
        // Update and draw particles
        this.particles.forEach(particle => {
            // Move particle
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.speedX *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.speedY *= -1;
            }
            
            // Mouse influence
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.mouseRadius) {
                const force = (this.mouseRadius - distance) / this.mouseRadius;
                particle.x -= dx * force * CONFIG.particles.mouseInfluence;
                particle.y -= dy * force * CONFIG.particles.mouseInfluence;
            }
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawGrid() {
        const gridSize = 40;
        const lineOpacity = 0.03;
        
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`;
        this.ctx.lineWidth = 1;
        
        // Horizontal lines
        for (let y = 0; y < this.canvas.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
        
        // Vertical lines
        for (let x = 0; x < this.canvas.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
    }
}

// ===================================
// Scroll Animations
// ===================================
class ScrollAnimator {
    constructor() {
        this.animatedElements = document.querySelectorAll('[data-animation]');
        this.observer = null;
        this.init();
    }
    
    init() {
        // Set up Intersection Observer
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay * 1000);
                }
            });
        }, {
            threshold: CONFIG.animations.scrollThreshold,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe all animated elements
        this.animatedElements.forEach(el => {
            this.observer.observe(el);
        });
        
        // Handle word reveal animations
        this.handleWordReveal();
    }
    
    handleWordReveal() {
        const words = document.querySelectorAll('.word');
        words.forEach((word, index) => {
            word.style.setProperty('--word-index', index);
            word.style.animationDelay = `${index * 0.1}s`;
        });
    }
}

// ===================================
// Counter Animation
// ===================================
class Counter {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.observer = null;
        this.init();
    }
    
    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        this.counters.forEach(counter => {
            this.observer.observe(counter);
        });
    }
    
    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out-cubic)
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOutCubic * target);
            
            element.textContent = current.toLocaleString('fr-FR');
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
}

// ===================================
// Tilt Effect
// ===================================
class TiltEffect {
    constructor() {
        this.elements = document.querySelectorAll('[data-tilt]');
        this.init();
    }
    
    init() {
        this.elements.forEach(el => {
            el.addEventListener('mousemove', (e) => this.handleMove(e, el));
            el.addEventListener('mouseleave', (e) => this.handleLeave(e, el));
        });
    }
    
    handleMove(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }
    
    handleLeave(e, element) {
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
}

// ===================================
// Marquee Animation
// ===================================
class Marquee {
    constructor() {
        this.marquees = document.querySelectorAll('.marquee');
        this.init();
    }
    
    init() {
        // Marquee animation is handled by CSS
        // Just ensure it's running
    }
}

// ===================================
// Header Scroll Effect
// ===================================
class HeaderScroller {
    constructor() {
        this.header = document.querySelector('.header');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        });
    }
}

// ===================================
// Mobile Menu
// ===================================
class MobileMenu {
    constructor() {
        this.btn = document.querySelector('.mobile-menu-btn');
        this.menu = document.querySelector('.mobile-menu');
        this.init();
    }
    
    init() {
        if (!this.btn || !this.menu) return;
        
        this.btn.addEventListener('click', () => {
            this.btn.classList.toggle('active');
            this.menu.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const links = this.menu.querySelectorAll('.mobile-nav-link');
        links.forEach(link => {
            link.addEventListener('click', () => {
                this.btn.classList.remove('active');
                this.menu.classList.remove('active');
            });
        });
    }
}

// ===================================
// Smooth Scroll
// ===================================
class SmoothScroller {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
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
    }
}

// ===================================
// Button Ripple Effect
// ===================================
class RippleEffect {
    constructor() {
        this.buttons = document.querySelectorAll('.btn');
        this.init();
    }
    
    init() {
        this.buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.createRipple(e, btn);
            });
        });
    }
    
    createRipple(e, element) {
        const ripple = document.createElement('span');
        ripple.classList.add('btn-ripple');
        
        // Position the ripple
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        // Add ripple to button
        element.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// ===================================
// Glitch Effect (for hero title)
// ===================================
class GlitchEffect {
    constructor() {
        this.title = document.querySelector('.hero-title');
        this.init();
    }
    
    init() {
        if (!this.title) return;
        
        // Add glitch effect on hover
        this.title.addEventListener('mouseenter', () => {
            this.title.classList.add('glitch');
        });
        
        this.title.addEventListener('mouseleave', () => {
            this.title.classList.remove('glitch');
        });
    }
}

// ===================================
// Parallax Effect
// ===================================
class ParallaxEffect {
    constructor() {
        this.elements = document.querySelectorAll('[data-parallax]');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            this.elements.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.5;
                const yPos = -(window.pageYOffset * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// ===================================
// Typewriter Effect
// ===================================
class Typewriter {
    constructor() {
        this.elements = document.querySelectorAll('.typewriter');
        this.init();
    }
    
    init() {
        this.elements.forEach(el => {
            const text = el.textContent;
            const speed = parseFloat(el.getAttribute('data-speed')) || 50;
            
            // Clear text and set up typing
            el.textContent = '';
            el.style.borderRight = '2px solid var(--accent-primary)';
            
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    el.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                    // Remove cursor after typing
                    setTimeout(() => {
                        el.style.borderRight = 'none';
                    }, 1000);
                }
            }, speed);
        });
    }
}

// ===================================
// Initialize Everything
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new CustomCursor();
    new ParticleCanvas();
    new ScrollAnimator();
    new Counter();
    new TiltEffect();
    new Marquee();
    new HeaderScroller();
    new MobileMenu();
    new SmoothScroller();
    new RippleEffect();
    new GlitchEffect();
    new ParallaxEffect();
    new Typewriter();
    
    // Add glitch CSS dynamically
    const glitchStyle = document.createElement('style');
    glitchStyle.textContent = `
        .glitch {
            position: relative;
            animation: glitch-skew 1s infinite linear alternate-reverse;
        }
        
        .glitch::before,
        .glitch::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        
        .glitch::before {
            left: 2px;
            text-shadow: -2px 0 var(--accent-primary);
            clip: rect(44px, 450px, 56px, 0);
            animation: glitch-anim 5s infinite linear alternate-reverse;
        }
        
        .glitch::after {
            left: -2px;
            text-shadow: -2px 0 var(--accent-primary);
            clip: rect(44px, 450px, 56px, 0);
            animation: glitch-anim2 5s infinite linear alternate-reverse;
        }
        
        @keyframes glitch-anim {
            0% { clip: rect(31px, 9999px, 94px, 0); transform: skew(0.5deg); }
            5% { clip: rect(70px, 9999px, 71px, 0); transform: skew(0.5deg); }
            10% { clip: rect(29px, 9999px, 24px, 0); transform: skew(0.5deg); }
            15% { clip: rect(64px, 9999px, 51px, 0); transform: skew(0.5deg); }
            20% { clip: rect(82px, 9999px, 31px, 0); transform: skew(0.5deg); }
            25% { clip: rect(45px, 9999px, 66px, 0); transform: skew(0.5deg); }
            30% { clip: rect(27px, 9999px, 38px, 0); transform: skew(0.5deg); }
            35% { clip: rect(58px, 9999px, 89px, 0); transform: skew(0.5deg); }
            40% { clip: rect(12px, 9999px, 77px, 0); transform: skew(0.5deg); }
            45% { clip: rect(91px, 9999px, 42px, 0); transform: skew(0.5deg); }
            50% { clip: rect(36px, 9999px, 95px, 0); transform: skew(0.5deg); }
            55% { clip: rect(73px, 9999px, 18px, 0); transform: skew(0.5deg); }
            60% { clip: rect(49px, 9999px, 63px, 0); transform: skew(0.5deg); }
            65% { clip: rect(84px, 9999px, 27px, 0); transform: skew(0.5deg); }
            70% { clip: rect(21px, 9999px, 86px, 0); transform: skew(0.5deg); }
            75% { clip: rect(67px, 9999px, 54px, 0); transform: skew(0.5deg); }
            80% { clip: rect(38px, 9999px, 79px, 0); transform: skew(0.5deg); }
            85% { clip: rect(55px, 9999px, 33px, 0); transform: skew(0.5deg); }
            90% { clip: rect(76px, 9999px, 48px, 0); transform: skew(0.5deg); }
            95% { clip: rect(43px, 9999px, 91px, 0); transform: skew(0.5deg); }
            100% { clip: rect(62px, 9999px, 22px, 0); transform: skew(0.5deg); }
        }
        
        @keyframes glitch-anim2 {
            0% { clip: rect(65px, 9999px, 100px, 0); transform: skew(-0.5deg); }
            5% { clip: rect(52px, 9999px, 74px, 0); transform: skew(-0.5deg); }
            10% { clip: rect(79px, 9999px, 85px, 0); transform: skew(-0.5deg); }
            15% { clip: rect(75px, 9999px, 5px, 0); transform: skew(-0.5deg); }
            20% { clip: rect(67px, 9999px, 61px, 0); transform: skew(-0.5deg); }
            25% { clip: rect(14px, 9999px, 79px, 0); transform: skew(-0.5deg); }
            30% { clip: rect(1px, 9999px, 66px, 0); transform: skew(-0.5deg); }
            35% { clip: rect(86px, 9999px, 30px, 0); transform: skew(-0.5deg); }
            40% { clip: rect(23px, 9999px, 98px, 0); transform: skew(-0.5deg); }
            45% { clip: rect(85px, 9999px, 72px, 0); transform: skew(-0.5deg); }
            50% { clip: rect(71px, 9999px, 75px, 0); transform: skew(-0.5deg); }
            55% { clip: rect(2px, 9999px, 48px, 0); transform: skew(-0.5deg); }
            60% { clip: rect(30px, 9999px, 16px, 0); transform: skew(-0.5deg); }
            65% { clip: rect(59px, 9999px, 50px, 0); transform: skew(-0.5deg); }
            70% { clip: rect(41px, 9999px, 62px, 0); transform: skew(-0.5deg); }
            75% { clip: rect(2px, 9999px, 82px, 0); transform: skew(-0.5deg); }
            80% { clip: rect(47px, 9999px, 73px, 0); transform: skew(-0.5deg); }
            85% { clip: rect(3px, 9999px, 27px, 0); transform: skew(-0.5deg); }
            90% { clip: rect(26px, 9999px, 55px, 0); transform: skew(-0.5deg); }
            95% { clip: rect(42px, 9999px, 97px, 0); transform: skew(-0.5deg); }
            100% { clip: rect(38px, 9999px, 49px, 0); transform: skew(-0.5deg); }
        }
        
        @keyframes glitch-skew {
            0% { transform: skew(0deg); }
            10% { transform: skew(0deg); }
            11% { transform: skew(1deg); }
            12% { transform: skew(0deg); }
            50% { transform: skew(0deg); }
            51% { transform: skew(-0.5deg); }
            52% { transform: skew(0deg); }
            100% { transform: skew(0deg); }
        }
        
        .btn-ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(glitchStyle);
    
    // Store original text for glitch effect
    if (this.title) {
        this.title.setAttribute('data-text', this.title.textContent);
    }
    
    console.log('%c Writz Hub ', 'background: #0a0a0a; color: #fff; font-size: 20px; font-weight: bold; padding: 10px;');
    console.log('%c Landing Page Loaded Successfully! ', 'color: #a0a0a0; font-size: 12px;');
});

// ===================================
// Performance Optimization
// ===================================
window.addEventListener('load', () => {
    // Lazy load images
    document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
    });
    
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
});

// ===================================
// Keyboard Navigation
// ===================================
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
        mobileBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// ===================================
// Preloader (Optional)
// ===================================
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});
