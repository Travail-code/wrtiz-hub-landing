// ===== Mobile Menu =====
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn?.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

mobileMenu?.addEventListener('click', (e) => {
    if (e.target.classList.contains('mobile-nav-link') || e.target.closest('.btn')) {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== Header scroll =====
const header = document.getElementById('header');
const onScrollHeader = () => {
    if (window.scrollY > 20) header?.classList.add('scrolled');
    else header?.classList.remove('scrolled');
};
window.addEventListener('scroll', onScrollHeader, { passive: true });
onScrollHeader();

// ===== Scroll Animations =====
const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-animation]');
    if (!elements.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseFloat(entry.target.dataset.delay || 0);
                setTimeout(() => entry.target.classList.add('animated'), delay * 1000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    elements.forEach(el => observer.observe(el));
};

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerHeight = header?.offsetHeight || 70;
            const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ===== Particles =====
const initParticles = () => {
    const container = document.getElementById('particles');
    if (!container) return;
    const count = window.innerWidth < 768 ? 22 : 38;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.animationDelay = (Math.random() * 8) + 's';
        p.style.animationDuration = (7 + Math.random() * 10) + 's';
        p.style.width = p.style.height = (1.5 + Math.random() * 2) + 'px';
        container.appendChild(p);
    }
};

// ===== 3D Tilt on Executor (mouse parallax) =====
const initExecutorTilt = () => {
    const stage = document.querySelector('.executor-stage');
    const card = document.querySelector('.hero-executor');
    if (!stage || !card || window.innerWidth < 992) return;

    let raf = null;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    // Pause CSS float while interacting
    const onMove = (e) => {
        const rect = stage.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        targetX = Math.max(-1, Math.min(1, dx)) * 8;  // max rotateY deg
        targetY = Math.max(-1, Math.min(1, dy)) * -6; // max rotateX deg
        card.style.animation = 'none';
    };

    const onLeave = () => {
        targetX = 0;
        targetY = 0;
        // restore float after a moment
        setTimeout(() => {
            if (Math.abs(currentX) < 0.5 && Math.abs(currentY) < 0.5) {
                card.style.animation = '';
            }
        }, 400);
    };

    const tick = () => {
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;
        card.style.transform = `rotateX(${currentY}deg) rotateY(${currentX}deg) translateY(${Math.sin(Date.now()/900)*6}px)`;
        raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    stage.addEventListener('mousemove', onMove);
    stage.addEventListener('mouseleave', onLeave);
};

// ===== Toast =====
window.showToast = (msg) => {
    let toast = document.getElementById('global-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'global-toast';
        toast.style.cssText = `
            position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%) translateY(20px);
            background: rgba(20,20,20,0.95); border: 1px solid rgba(255,255,255,0.15);
            color: #fff; padding: 12px 20px; border-radius: 12px; font-size: 0.9rem;
            font-weight: 500; z-index: 9999; opacity: 0; transition: all 0.3s ease;
            box-shadow: 0 8px 32px rgba(0,0,0,0.5); pointer-events: none;
        `;
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
    }, 2200);
};

document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    initParticles();
    initExecutorTilt();
});
