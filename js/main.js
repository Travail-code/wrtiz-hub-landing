// ===== Mobile Menu =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuBtn?.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
mobileMenu?.addEventListener('click', (e) => {
    if (e.target.classList.contains('mobile-nav-link')) {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// ===== Scroll Animations =====
const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-animation]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay * 1000);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
};

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', animateOnScroll);

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Counter Animation =====
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
};

// ===== FAQ Accordion =====
const initFAQ = () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        question?.addEventListener('click', () => {
            const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer')?.style.setProperty('max-height', '0px');
                    otherItem.querySelector('.faq-icon')?.classList.remove('fa-minus');
                    otherItem.querySelector('.faq-icon')?.classList.add('fa-plus');
                }
            });
            
            // Toggle current item
            if (isOpen) {
                answer.style.maxHeight = '0px';
                icon?.classList.remove('fa-minus');
                icon?.classList.add('fa-plus');
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon?.classList.remove('fa-plus');
                icon?.classList.add('fa-minus');
            }
        });
    });
};

// ===== Contact Form =====
const initContactForm = () => {
    const form = document.querySelector('.contact-form');
    
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn?.textContent || 'Send Message';
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        submitBtn.textContent = 'Message Sent!';
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            form.reset();
        }, 2000);
    });
};

// ===== Blog Filter =====
const initBlogFilter = () => {
    const filterBtns = document.querySelectorAll('.blog-filter-btn');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.filter;
            
            blogPosts.forEach(post => {
                if (category === 'all' || post.dataset.category === category) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });
};

// ===== Theme Toggle =====
const initThemeToggle = () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    themeToggle?.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('light-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Check saved theme
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-theme');
    }
};

// ===== Custom Cursor =====
const initCustomCursor = () => {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('custom-cursor-dot');
    document.body.appendChild(cursorDot);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    const animateCursor = () => {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    };
    
    animateCursor();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .script-card, .executor-logo');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
};

// ===== Particles Background =====
const initParticles = () => {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
        particlesContainer.appendChild(particle);
    }
};

// ===== Typing Effect =====
const initTypingEffect = () => {
    const typingElement = document.querySelector('.typing-effect');
    if (!typingElement) return;
    
    const text = typingElement.dataset.text || '';
    const speed = typingElement.dataset.speed || 100;
    let i = 0;
    
    const type = () => {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    
    type();
};

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    initFAQ();
    initContactForm();
    initBlogFilter();
    initThemeToggle();
    // initCustomCursor();
    // initParticles();
    // initTypingEffect();
});

// ===== GitHub Stars Counter =====
const updateGitHubStars = async () => {
    try {
        const response = await fetch('https://api.github.com/repos/Travail-code/wrtiz-hub-landing');
        const data = await response.json();
        const starsElement = document.querySelector('.github-stars');
        if (starsElement) {
            starsElement.textContent = data.stargazers_count || '0';
        }
    } catch (error) {
        console.error('Error fetching GitHub stars:', error);
    }
};

// Update GitHub stars on page load
updateGitHubStars();
