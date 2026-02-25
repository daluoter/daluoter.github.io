document.addEventListener('DOMContentLoaded', () => {
    // Navigation Toggle for Mobile - with accessibility support
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';

            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');

            // Update ARIA attribute for accessibility
            hamburger.setAttribute('aria-expanded', !isExpanded);
        });

        // Close menu with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.focus();
            }
        });
    }

    // Smooth Scroll for Anchor Links (Optional if scroll-behavior: smooth is not enough for offset)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu on click
            if (navLinks) {
                navLinks.classList.remove('active');
            }
            if (hamburger) {
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Image Slider
    const sliderImages = document.querySelectorAll('.slider-img');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentImg = 0;

    if (sliderImages.length > 0) {
        function showImage(index) {
            sliderImages.forEach(img => img.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            if (sliderImages[index]) sliderImages[index].classList.add('active');
            if (dots[index]) dots[index].classList.add('active');
        }

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                currentImg = (currentImg - 1 + sliderImages.length) % sliderImages.length;
                showImage(currentImg);
            });

            nextBtn.addEventListener('click', () => {
                currentImg = (currentImg + 1) % sliderImages.length;
                showImage(currentImg);
            });
        }

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                currentImg = parseInt(e.target.getAttribute('data-index'));
                showImage(currentImg);
            });
        });
    }

    console.log("Portfolio Loaded - Future Tech Mode Activated");

    // Scroll Animation Observer - with reduced motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show-section');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, observerOptions);

        const sections = document.querySelectorAll('.section, .project-card, .timeline-item, .skill-category');
        sections.forEach(el => {
            el.classList.add('hidden-section');
            observer.observe(el);
        });
    } else {
        // For users who prefer reduced motion, show all sections immediately
        const sections = document.querySelectorAll('.section, .project-card, .timeline-item, .skill-category');
        sections.forEach(el => {
            el.classList.add('show-section');
        });
    }
});
