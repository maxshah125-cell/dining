document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Page Loader
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        gsap.to(loader, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                loader.style.display = 'none';
                initHeroAnimations();
            }
        });
    });

    // 2. Custom Cursor (Desktop Only)
    const cursor = document.querySelector('.custom-cursor');
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX - 10,
                y: e.clientY - 10,
                duration: 0.1
            });
        });

        // Hover effect for links
        document.querySelectorAll('a, button').forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(cursor, { scale: 2.5, backgroundColor: 'rgba(197, 160, 89, 0.1)', borderColor: 'transparent' });
            });
            link.addEventListener('mouseleave', () => {
                gsap.to(cursor, { scale: 1, backgroundColor: 'transparent', borderColor: '#C5A059' });
            });
        });
    }

    // 3. Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 4. Hero Animations (GSAP)
    function initHeroAnimations() {
        const tl = gsap.timeline();
        
        tl.to('.hero-title', {
            opacity: 1,
            y: -20,
            duration: 1.2,
            ease: "power4.out"
        })
        .to('.hero-subtitle', {
            opacity: 1,
            y: -10,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8")
        .to('.hero-btns', {
            opacity: 1,
            y: 0,
            duration: 0.8
        }, "-=0.6");
    }

    // 5. Scroll Reveal (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => observer.observe(el));

    // 6. Parallax Effect
    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        const bg = document.querySelector('.parallax-bg');
        bg.style.transform = `translateY(${scrollValue * 0.4}px)`;
    });

    // 7. Accessibility: Respect Reduced Motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        gsap.globalTimeline.clear();
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
    }
});