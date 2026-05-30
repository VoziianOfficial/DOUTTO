'use strict';

(function () {
    document.addEventListener('DOMContentLoaded', () => {
        initHomeHeroSlideshow();
        injectHomeFaqSchema();
    });

    function initHomeHeroSlideshow() {
        const hero = document.querySelector('.home-hero');

        if (!hero) {
            return;
        }

        const slides = Array.from(hero.querySelectorAll('.home-hero__slide'));
        const dots = Array.from(hero.querySelectorAll('[data-hero-dot]'));
        const prevButton = hero.querySelector('[data-hero-prev]');
        const nextButton = hero.querySelector('[data-hero-next]');
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!slides.length) {
            return;
        }

        let activeIndex = slides.findIndex((slide) => slide.classList.contains('is-active'));

        if (activeIndex < 0) {
            activeIndex = 0;
        }

        let slideshowTimer = null;
        const intervalDelay = 6200;

        const setActiveSlide = (nextIndex) => {
            const safeIndex = normalizeIndex(nextIndex, slides.length);

            slides.forEach((slide, index) => {
                slide.classList.toggle('is-active', index === safeIndex);
            });

            dots.forEach((dot, index) => {
                const isActive = index === safeIndex;

                dot.classList.toggle('is-active', isActive);
                dot.setAttribute('aria-current', isActive ? 'true' : 'false');
            });

            activeIndex = safeIndex;
        };

        const goNext = () => {
            setActiveSlide(activeIndex + 1);
        };

        const goPrev = () => {
            setActiveSlide(activeIndex - 1);
        };

        const startAutoplay = () => {
            if (prefersReducedMotion || slides.length <= 1) {
                return;
            }

            stopAutoplay();

            slideshowTimer = window.setInterval(goNext, intervalDelay);
        };

        const stopAutoplay = () => {
            if (slideshowTimer) {
                window.clearInterval(slideshowTimer);
                slideshowTimer = null;
            }
        };

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                goPrev();
                startAutoplay();
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                goNext();
                startAutoplay();
            });
        }

        dots.forEach((dot) => {
            dot.addEventListener('click', () => {
                const index = Number(dot.dataset.heroDot);

                if (Number.isNaN(index)) {
                    return;
                }

                setActiveSlide(index);
                startAutoplay();
            });
        });

        hero.addEventListener('mouseenter', stopAutoplay);
        hero.addEventListener('mouseleave', startAutoplay);

        hero.addEventListener('focusin', stopAutoplay);
        hero.addEventListener('focusout', startAutoplay);

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoplay();
            } else {
                startAutoplay();
            }
        });

        setActiveSlide(activeIndex);
        startAutoplay();
    }

    function normalizeIndex(index, total) {
        if (index < 0) {
            return total - 1;
        }

        if (index >= total) {
            return 0;
        }

        return index;
    }

    function injectHomeFaqSchema() {
        const page = document.body.dataset.page;

        if (page !== 'home') {
            return;
        }

        const faqItems = [
            {
                question: 'How do I compare local appliance repair providers?',
                answer: 'Start by choosing the appliance category and reviewing local provider options, availability, diagnostic fees, quote details, credentials, and warranty questions.'
            },
            {
                question: 'Does DOUTTO repair appliances directly?',
                answer: 'No. DOUTTO is not a direct appliance repair company. It helps homeowners compare independent local provider options.'
            },
            {
                question: 'Are provider quotes usually free?',
                answer: 'Quote and diagnostic fee policies vary by provider. Homeowners should ask each company about fees, parts, labor, timing, and written estimate terms.'
            }
        ];

        const schema = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map((item) => {
                return {
                    '@type': 'Question',
                    name: item.question,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: item.answer
                    }
                };
            })
        };

        const existingSchema = document.querySelector('script[data-home-faq-schema]');

        if (existingSchema) {
            existingSchema.remove();
        }

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.dataset.homeFaqSchema = 'true';
        script.textContent = JSON.stringify(schema);

        document.head.appendChild(script);
    }
})();