/**
 * ==========================================================================
 * APEX PRIME — PRODUCTION JAVASCRIPT (GENESIS I)
 * Luxury, Minimalist Core Performance Architecture
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ==========================================================================
       CONFIGURATION & CACHE
       ========================================================================== */
    
    const TIMING = {
        SPLASH_VISIBLE: 2500,
        SPLASH_FADE: 800,
        HERO_STAGGER: 180
    };

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

    /* ==========================================================================
       SPLASH SCREEN & HERO SEQUENCE
       ========================================================================== */

    function initSplashAndHero() {
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
        DOM.heroElements.forEach((element, index) => {
            if (element) {
                setTimeout(() => {
                    element.classList.add('reveal-active');
                }, index * TIMING.HERO_STAGGER);
            }
        });
    }

    /* ==========================================================================
       SECTION REVEAL (ONE-TIME OBSERVATION)
       ========================================================================== */

    function initSectionReveals() {
        if (!DOM.sections.length) return;

        const revealOptions = {
            root: null,
            threshold: 0.15 
        };

        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show-section');
                    observer.unobserve(entry.target); 
                }
            });
        }, revealOptions);

        DOM.sections.forEach(section => sectionObserver.observe(section));
    }

    /* ==========================================================================
       NAVIGATION STATE (ACTIVE LINK HIGHLIGHTING)
       ========================================================================== */

    function initNavigationHighlight() {
        if (!DOM.sections.length || !DOM.navLinks.length) return;

        const navOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px' 
        };

        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeId = entry.target.getAttribute('id');
                    
                    DOM.navLinks.forEach(link => {
                        // Correct logic: remove 'active' from all, add to matching link
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${activeId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, navOptions);

        DOM.sections.forEach(section => navObserver.observe(section));
    }

    // Execution
    initSplashAndHero();
    initSectionReveals();
    initNavigationHighlight();
});
