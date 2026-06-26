/**
 * APEX PRIME — PRODUCTION JAVASCRIPT
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const TIMING = { SPLASH_VISIBLE: 2500, SPLASH_FADE: 800, HERO_STAGGER: 180 };

    const DOM = {
        splashScreen: document.getElementById('splash-screen'),
        heroElements: [
            document.querySelector('.navbar'),
            document.querySelector('.hero-tag'),
            document.querySelector('.hero-content h1'),
            document.querySelector('.hero-content p'),
            document.querySelector('.hero-content .btn'),
            document.querySelector('.scroll-indicator')
        ],
        sections: document.querySelectorAll('.section'),
        navLinks: document.querySelectorAll('.navbar ul a')
    };

    function initSequence() {
        if (DOM.splashScreen) {
            setTimeout(() => {
                DOM.splashScreen.classList.add('fade');
                setTimeout(() => {
                    DOM.splashScreen.remove();
                    triggerHeroReveal();
                }, TIMING.SPLASH_FADE);
            }, TIMING.SPLASH_VISIBLE);
        } else {
            triggerHeroReveal();
        }
    }

    function triggerHeroReveal() {
        DOM.heroElements.forEach((el, i) => {
            if (el) setTimeout(() => el.classList.add('reveal-active'), i * TIMING.HERO_STAGGER);
        });
    }

    function initObservers() {
        const sectionObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show-section');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        DOM.sections.forEach(s => sectionObserver.observe(s));

        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    DOM.navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        }, { rootMargin: '-20% 0px -70% 0px' });

        DOM.sections.forEach(s => navObserver.observe(s));
    }

    initSequence();
    initObservers();
});
