/**
 * Main JavaScript file for Anish Kandi's portfolio website
 */

document.addEventListener('DOMContentLoaded', () => {
    // —— Bootstrap tooltips & popovers ——
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(el => new bootstrap.Tooltip(el));
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(el => new bootstrap.Popover(el));

    // —— Scroll-to-top button ——
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) scrollTopBtn.classList.add('show');
            else scrollTopBtn.classList.remove('show');
        });
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // —— Smooth anchor scrolling & active nav highlight ——
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            e.preventDefault();
            const el = document.querySelector(targetId);
            if (!el) return;
            const offset = navbar ? navbar.offsetHeight : 0;
            const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        const offset = navbar ? navbar.offsetHeight + 50 : 0;
        sections.forEach(sec => {
            const top = sec.offsetTop - offset;
            if (window.pageYOffset >= top && window.pageYOffset < top + sec.offsetHeight) {
                current = sec.id;
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href').includes(current));
        });
    });

    // —— Contact form: validation + fetch + toast ——
    const contactForm = document.getElementById('contactForm');
    const toastEl = document.getElementById('toast');
    if (contactForm) {
        contactForm.addEventListener('submit', async e => {
            e.preventDefault();
            if (!contactForm.checkValidity()) {
                contactForm.classList.add('was-validated');
                return;
            }
            // send via fetch; assumes form.action is set
            const res = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm)
            });
            if (res.ok && toastEl) {
                toastEl.classList.add('show');
                setTimeout(() => toastEl.classList.remove('show'), 3000);
                contactForm.reset();
                contactForm.classList.remove('was-validated');
            } else {
                alert('Oops! Something went wrong.');
            }
        });
    }

    // —— Theme toggle ——
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        // apply saved
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark');
            themeBtn.textContent = '☀️';
        }
        themeBtn.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            themeBtn.textContent = isDark ? '☀️' : '🌙';
        });
    }

    // —— Hamburger menu & sticky header ——
    const navToggle = document.getElementById('nav-toggle');
    const navLinksContainer = document.getElementById('nav-links');
    if (navToggle && navLinksContainer) {
        navToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('open');
        });
    }
    const siteNav = document.getElementById('site-nav');
    if (siteNav) {
        window.addEventListener('scroll', () => {
            siteNav.classList.toggle('sticky', window.scrollY > 50);
        });
    }

    // —— Scroll-triggered animations ——  
    const animateEls = document.querySelectorAll('.animate-on-scroll');
    const checkInView = () => {
        const topWindow = window.scrollY;
        const bottomWindow = topWindow + window.innerHeight;
        animateEls.forEach(el => {
            const topEl = el.offsetTop;
            const bottomEl = topEl + el.offsetHeight;
            if (bottomEl >= topWindow && topEl <= bottomWindow) {
                el.classList.add('animated');
            }
        });
    };
    window.addEventListener('scroll', checkInView);
    window.addEventListener('resize', checkInView);
    checkInView();

    // —— Portfolio filter buttons ——
    document.querySelectorAll('[data-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.dataset.filter;
            document.querySelectorAll('.project-grid .card').forEach(card => {
                card.style.display = (cat === 'all' || card.dataset.category === cat)
                    ? 'block' : 'none';
            });
        });
    });

    // —— Simple Lightbox ——
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const img = document.createElement('img');
            img.src = btn.dataset.src;
            lightbox.innerHTML = '';
            lightbox.appendChild(img);
            lightbox.classList.add('active');
        });
    });
    lightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    // —— Custom cursor ——
    const cursor = document.createElement('div');
    cursor.id = 'cursor';
    document.body.appendChild(cursor);
    document.addEventListener('mousemove', e => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
});
