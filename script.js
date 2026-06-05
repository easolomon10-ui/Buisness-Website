// Mark JS as active so CSS can safely set initial hidden state for fade-ins
document.body.classList.add('js-ready');

// Navbar: add scrolled class after hero
const navbar = document.getElementById('navbar');
const heroScroll = document.getElementById('hero-scroll');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    // Hide scroll arrow once user starts scrolling
    if (heroScroll) {
        heroScroll.style.opacity = window.scrollY > 80 ? '0' : '1';
    }
}, { passive: true });

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.closest('.faq-item');
        const isOpen = item.classList.contains('open');

        // Close all
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

        // Open clicked if it was closed
        if (!isOpen) {
            item.classList.add('open');
        }
    });
});

// Smooth scroll offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

// Fade-in on scroll (CSS handles initial hidden state via .js-ready)
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    },
    { threshold: 0.1 }
);

document.querySelectorAll('.step-card, .feature-card, .pricing-card, .faq-item, .problem-stat').forEach(el => {
    observer.observe(el);
});

// Contact form submit feedback
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', e => {
        const btn = form.querySelector('button[type="submit"]');
        btn.textContent = 'Sending...';
        btn.disabled = true;
    });
}
