"use strict";

window.addEventListener("load", () => {
    const SPLASH_HOLD_DELAY = 2500;
    const SPLASH_FADE_DURATION = 1300;
    const HERO_STAGGER_DELAY = 180;
    const SECTION_REVEAL_THRESHOLD = 0.18;

    const documentBody = document.body;
    const splashScreen = document.getElementById("splash-screen");
    const navigation = document.querySelector("nav");
    const heroTag = document.querySelector(".hero-tag");
    const heroHeading = document.querySelector(".hero-content h1");
    const heroParagraph = document.querySelector(".hero-content p");
    const ctaButton = document.querySelector(".btn");
    const scrollIndicator = document.querySelector(".scroll-indicator");
    const revealSections = document.querySelectorAll(".section");
    const navigationLinks = document.querySelectorAll('nav a[href^="#"]');

    documentBody.classList.add("is-loading");

    const revealElement = (element, delay = 0) => {
        if (!element) return;

        window.setTimeout(() => {
            element.classList.add("show");
        }, delay);
    };

    const animateHero = () => {
        [
            navigation,
            heroTag,
            heroHeading,
            heroParagraph,
            ctaButton,
            scrollIndicator
        ].forEach((element, index) => {
            revealElement(element, index * HERO_STAGGER_DELAY);
        });
    };

    const removeSplashScreen = () => {
        if (!splashScreen) {
            documentBody.classList.remove("is-loading");
            animateHero();
            return;
        }

        splashScreen.classList.add("fade");

        window.setTimeout(() => {
            splashScreen.remove();
            documentBody.classList.remove("is-loading");
            animateHero();
        }, SPLASH_FADE_DURATION);
    };

    const initSplashScreen = () => {
        window.setTimeout(removeSplashScreen, SPLASH_HOLD_DELAY);
    };

    const initSectionReveal = () => {
        if (!revealSections.length || !("IntersectionObserver" in window)) {
            revealSections.forEach((section) => {
                section.classList.add("show-section");
            });
            return;
        }

        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("show-section");
                observer.unobserve(entry.target);
            });
        }, {
            threshold: SECTION_REVEAL_THRESHOLD
        });

        revealSections.forEach((section) => {
            sectionObserver.observe(section);
        });
    };

    const clearActiveNavigation = () => {
        navigationLinks.forEach((link) => {
            link.classList.remove("active");
        });
    };

    const setActiveNavigation = (sectionId) => {
        clearActiveNavigation();

        if (!sectionId) return;

        const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);

        if (activeLink) {
            activeLink.classList.add("active");
        }
    };

    const initActiveNavigation = () => {
        const trackedSections = ["about", "hub", "contact"]
            .map((id) => document.getElementById(id))
            .filter(Boolean);

        if (!trackedSections.length || !("IntersectionObserver" in window)) return;

        const navigationObserver = new IntersectionObserver((entries) => {
            const visibleEntry = entries
                .filter((entry) => entry.isIntersecting)
                .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

            if (visibleEntry) {
                setActiveNavigation(visibleEntry.target.id);
                return;
            }

            clearActiveNavigation();
        }, {
            rootMargin: "-35% 0px -45% 0px",
            threshold: [0.15, 0.35, 0.6]
        });

        trackedSections.forEach((section) => {
            navigationObserver.observe(section);
        });
    };

    initSectionReveal();
    initActiveNavigation();
    initSplashScreen();
}, {
    once: true
});

        trackedSections.forEach((section) => {
            navigationObserver.observe(section);
        });
    };

    initSectionReveal();
    initActiveNavigation();
    initSplashScreen();
}, {
    once: true
});
