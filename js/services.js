'use strict';

(function () {
    const config = window.SITE_CONFIG;

    document.addEventListener('DOMContentLoaded', () => {
        if (!config) {
            console.warn('SITE_CONFIG is missing on services page.');
            return;
        }

        initServicesPageSchema();
        initServicesCardKeyboardFocus();
    });

    function initServicesPageSchema() {
        const page = document.body.dataset.page;

        if (page !== 'services') {
            return;
        }

        const schema = {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Appliance Repair Provider Comparison Services',
            description:
                'Explore appliance repair categories and compare local provider options through the DOUTTO matching platform.',
            url: window.location.href,
            isPartOf: {
                '@type': 'WebSite',
                name: config.company.name,
                url: window.location.origin
            },
            about: config.services.map((service) => {
                return {
                    '@type': 'Service',
                    name: service.title,
                    description: service.summary,
                    areaServed: 'United States',
                    provider: {
                        '@type': 'Organization',
                        name: config.company.name
                    },
                    url: new URL(service.href, window.location.href).href
                };
            })
        };

        const existingSchema = document.querySelector('script[data-services-schema]');

        if (existingSchema) {
            existingSchema.remove();
        }

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.dataset.servicesSchema = 'true';
        script.textContent = JSON.stringify(schema);

        document.head.appendChild(script);
    }

    function initServicesCardKeyboardFocus() {
        const cards = document.querySelectorAll('.service-card');

        if (!cards.length) {
            return;
        }

        cards.forEach((card) => {
            card.addEventListener('focus', () => {
                card.classList.add('is-keyboard-focused');
            });

            card.addEventListener('blur', () => {
                card.classList.remove('is-keyboard-focused');
            });
        });
    }
})();