/**
 * Writz Hub - Complete Landing Page JavaScript
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
    },
    downloadCount: 1000000,
    usersCount: 50000,
    scriptsCount: 250
};

// ===================================
// Theme Management
// ===================================
class ThemeManager {
    constructor() {
        this.themeToggle = document.querySelector('.theme-toggle');
        this.preferredTheme = localStorage.getItem('theme') || 
            (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
        this.init();
    }
    
    init() {
        this.applyTheme(this.preferredTheme);
        this.bindEvents();
    }
    
    bindEvents() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Watch for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }
    
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.updateThemeToggle(theme);
    }
    
    updateThemeToggle(theme) {
        if (!this.themeToggle) return;
        const icon = this.themeToggle.querySelector('.theme-icon');
        if (icon) {
            icon.innerHTML = theme === 'dark' ? 
                `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/>
                    <line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>` : 
                `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>`;
        }
    }
}

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
            if (this.cursor) this.cursor.style.display = 'none';
            if (this.follower) this.follower.style.display = 'none';
            return;
        }
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.update();
        });
        
        // Track hover state
        const interactiveElements = document.querySelectorAll('a, button, .btn, .feature-card, .executor-logo, .stat-card, .blog-card, .testimonial-card, .faq-item, .doc-card');
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
            if (this.cursor) {
                this.cursor.style.transform = `translate(-50%, -50%) translate(${this.cursorX}px, ${this.cursorY}px)`;
            }
            if (this.follower) {
                this.follower.style.transform = `translate(-50%, -50%) translate(${this.followerX}px, ${this.followerY}px)`;
            }
            
            // Update cursor states
            if (this.cursor) this.cursor.classList.toggle('click', this.isClicking);
            if (this.follower) {
                this.follower.classList.toggle('hover', this.isHovering);
                this.follower.classList.toggle('click', this.isClicking);
            }
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
// Download Counter (Simulated)
// ===================================
class DownloadCounter {
    constructor() {
        this.counterElement = document.getElementById('download-counter');
        if (!this.counterElement) return;
        
        this.currentCount = parseInt(localStorage.getItem('downloadCount')) || CONFIG.downloadCount;
        this.updateCounter();
        this.startIncrementing();
    }
    
    updateCounter() {
        this.counterElement.textContent = this.currentCount.toLocaleString('fr-FR');
    }
    
    startIncrementing() {
        setInterval(() => {
            this.currentCount += Math.floor(Math.random() * 10) + 1;
            this.updateCounter();
            localStorage.setItem('downloadCount', this.currentCount);
        }, 5000);
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
// FAQ Accordion
// ===================================
class FAQAccordion {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
    }
    
    init() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => this.toggleItem(item));
            }
        });
    }
    
    toggleItem(item) {
        const isActive = item.classList.contains('active');
        
        // Close all items
        this.faqItems.forEach(i => i.classList.remove('active'));
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    }
}

// ===================================
// Doc Tabs
// ===================================
class DocTabs {
    constructor() {
        this.tabs = document.querySelectorAll('.doc-tab');
        this.contents = document.querySelectorAll('.doc-content');
        this.init();
    }
    
    init() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', (e) => this.switchTab(e, tab));
        });
        
        // Activate first tab by default
        if (this.tabs.length > 0 && this.contents.length > 0) {
            this.tabs[0].classList.add('active');
            this.contents[0].classList.add('active');
        }
    }
    
    switchTab(e, tab) {
        e.preventDefault();
        
        const targetId = tab.getAttribute('href') || tab.getAttribute('data-target');
        const targetContent = document.querySelector(targetId);
        
        if (!targetContent) return;
        
        // Remove active class from all tabs and contents
        this.tabs.forEach(t => t.classList.remove('active'));
        this.contents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        targetContent.classList.add('active');
    }
}

// ===================================
// Contact Form
// ===================================
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        if (!this.form) return;
        
        this.successMessage = this.form.querySelector('.form-success');
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        this.showLoading();
        
        setTimeout(() => {
            this.hideLoading();
            this.showSuccess();
            this.form.reset();
        }, 1500);
    }
    
    showLoading() {
        const submitBtn = this.form.querySelector('[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner"></span> Envoi en cours...';
        }
    }
    
    hideLoading() {
        const submitBtn = this.form.querySelector('[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Envoyer le message';
        }
    }
    
    showSuccess() {
        if (this.successMessage) {
            this.successMessage.style.display = 'block';
            setTimeout(() => {
                this.successMessage.style.display = 'none';
            }, 5000);
        }
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
                    
                    // Update active nav link
                    this.updateActiveNav(anchor);
                }
            });
        });
        
        // Update active nav on scroll
        window.addEventListener('scroll', () => this.updateActiveNavOnScroll());
    }
    
    updateActiveNav(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }
    
    updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
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
        this.marquees.forEach(marquee => {
            // Clone marquee content for seamless loop
            const content = marquee.innerHTML;
            marquee.innerHTML += content;
        });
    }
}

// ===================================
// Ripple Effect
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
            el.style.borderRight = '2px solid var(--accent-blue)';
            
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
// Initialize Everything
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new ThemeManager();
    new CustomCursor();
    new ParticleCanvas();
    new ScrollAnimator();
    new Counter();
    new DownloadCounter();
    new TiltEffect();
    new FAQAccordion();
    new DocTabs();
    new ContactForm();
    new Marquee();
    new HeaderScroller();
    new MobileMenu();
    new SmoothScroller();
    new RippleEffect();
    new Typewriter();
    new ParallaxEffect();
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
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
        
        .spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
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
    `;
    document.head.appendChild(style);
    
    // Store original text for glitch effect
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.setAttribute('data-text', heroTitle.textContent);
    }
    
    console.log('%c Writz Hub ', 'background: #0a0a0a; color: #00d4ff; font-size: 20px; font-weight: bold; padding: 10px;');
    console.log('%c Complete Landing Page Loaded! ', 'color: #a0a0a0; font-size: 12px;');
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
// Animate on Scroll - Enhanced
// ===================================
class EnhancedScrollAnimator {
    constructor() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                        
                        // Trigger stagger animations for children
                        const children = entry.target.querySelectorAll('[data-stagger]');
                        children.forEach((child, index) => {
                            setTimeout(() => {
                                child.classList.add('visible');
                            }, index * 100);
                        });
                    }, delay * 1000);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe all sections
        document.querySelectorAll('section, .glass-card, .feature-card, .stat-card, .testimonial-card, .blog-card, .doc-card').forEach(el => {
            this.observer.observe(el);
        });
    }
}

// Initialize enhanced scroll animator
new EnhancedScrollAnimator();
