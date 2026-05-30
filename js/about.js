'use strict';

(function () {
    const config = window.SITE_CONFIG;

    document.addEventListener('DOMContentLoaded', () => {
        if (!config) {
            console.warn('SITE_CONFIG is missing on about page.');
            return;
        }

        initAboutSchema();
        initAboutMarquee();
    });

    function initAboutSchema() {
        const page = document.body.dataset.page;

        if (page !== 'about') {
            return;
        }

        const schema = {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: `About ${config.company.name}`,
            description:
                `${config.company.name} is an independent appliance repair provider matching platform that helps homeowners compare local provider options.`,
            url: window.location.href,
            isPartOf: {
                '@type': 'WebSite',
                name: config.company.name,
                url: window.location.origin
            },
            mainEntity: {
                '@type': 'Organization',
                name: config.company.name,
                email: config.contact.email,
                telephone: config.contact.phoneRaw,
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: config.company.address
                },
                description: config.footerText,
                areaServed: 'United States'
            }
        };

        const existingSchema = document.querySelector('script[data-about-schema]');

        if (existingSchema) {
            existingSchema.remove();
        }

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.dataset.aboutSchema = 'true';
        script.textContent = JSON.stringify(schema);

        document.head.appendChild(script);
    }

    function initAboutMarquee() {
        const marquee = document.querySelector('.about-marquee__track');
        const line = marquee && marquee.querySelector('.about-marquee__line');

        if (!marquee || !line) {
            return;
        }

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            line.style.animation = 'none';
            line.style.flexWrap = 'wrap';
            line.style.justifyContent = 'center';
            return;
        }

        const originalItems = Array.from(line.children);

        if (!originalItems.length) {
            return;
        }

        const currentWidth = line.scrollWidth;
        const viewportWidth = window.innerWidth;

        if (currentWidth < viewportWidth * 2) {
            originalItems.forEach((item) => {
                line.appendChild(item.cloneNode(true));
            });
        }

        marquee.addEventListener('focusin', () => {
            line.style.animationPlayState = 'paused';
        });

        marquee.addEventListener('focusout', () => {
            line.style.animationPlayState = 'running';
        });
    }
})();