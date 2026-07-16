// Mark JS as active — CSS uses this to safely set initial hidden state
document.body.classList.add('js-ready');

// ---- Navbar scroll ----
const navbar = document.getElementById('navbar');
const heroScroll = document.getElementById('hero-scroll');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    if (heroScroll) {
        heroScroll.style.opacity = window.scrollY > 80 ? '0' : '1';
    }
}, { passive: true });

if (heroScroll) {
    heroScroll.addEventListener('click', () => {
        const target = document.querySelector('.problem');
        if (target) window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
    });
}

// ---- Mobile nav ----
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => navMenu.classList.toggle('active'));

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
});

// Close on outside click
document.addEventListener('click', e => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// ---- FAQ accordion ----
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
    });
});

// ---- Smooth scroll ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const heading = target.querySelector('h2, h3, .section-title') || target;
        const top = heading.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

// ---- Scroll-reveal (staggered) ----
const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.step-card, .feature-card, .pricing-card, .faq-item, .problem-stat')
    .forEach((el, i) => {
        // Stagger delay within each sibling group
        const siblings = el.parentElement.querySelectorAll(':scope > ' + el.tagName + ', :scope > .feature-card, :scope > .step-card, :scope > .pricing-card, :scope > .faq-item, :scope > .problem-stat');
        const idx = Array.from(siblings).indexOf(el);
        el.style.transitionDelay = `${Math.min(idx * 60, 300)}ms`;
        revealObs.observe(el);
    });

// ---- Stat counter animation ----
function animateCounter(el, target, suffix, isFloat, duration) {
    const start = performance.now();
    const update = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = target * eased;
        el.textContent = isFloat ? val.toFixed(1) + suffix : Math.round(val) + suffix;
        if (t < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
}

const statObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const raw = el.textContent.trim();
        const num = parseFloat(raw);
        if (isNaN(num) || num === 0) return;
        const suffix = raw.replace(num.toString(), '').replace(String(Math.round(num)), '');
        const isFloat = raw.includes('.');
        animateCounter(el, num, suffix, isFloat, 1400);
        statObs.unobserve(el);
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-big').forEach(el => statObs.observe(el));

// ---- Contact form submit ----
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', () => {
        const btn = form.querySelector('button[type="submit"]');
        btn.textContent = 'Sending...';
        btn.disabled = true;
    });
}
