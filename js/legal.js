'use strict';

(function () {
    const config = window.SITE_CONFIG;

    document.addEventListener('DOMContentLoaded', () => {
        if (!config) {
            console.warn('SITE_CONFIG is missing on legal page.');
            return;
        }

        initLegalSchema();
        initLegalSidebarActiveState();
        initLegalExternalLinkSafety();
    });

    function initLegalSchema() {
        const page = document.body.dataset.page;

        if (!page || !isLegalPage(page)) {
            return;
        }

        const pageTitleMap = {
            'privacy-policy': 'Privacy Policy',
            'cookie-policy': 'Cookie Policy',
            'terms-of-service': 'Terms of Service'
        };

        const schema = {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: `${pageTitleMap[page]} | ${config.company.name}`,
            description: getLegalDescription(page),
            url: window.location.href,
            isPartOf: {
                '@type': 'WebSite',
                name: config.company.name,
                url: window.location.origin
            },
            publisher: {
                '@type': 'Organization',
                name: config.company.name,
                email: config.contact.email,
                telephone: config.contact.phoneRaw,
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: config.company.address
                },
                description: config.footerText
            }
        };

        const existingSchema = document.querySelector('script[data-legal-schema]');

        if (existingSchema) {
            existingSchema.remove();
        }

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.dataset.legalSchema = 'true';
        script.textContent = JSON.stringify(schema);

        document.head.appendChild(script);
    }

    function initLegalSidebarActiveState() {
        const sidebar = document.querySelector('.legal-sidebar');
        const links = Array.from(document.querySelectorAll('.legal-sidebar__nav a[href^="#"]'));

        if (!sidebar || !links.length || !('IntersectionObserver' in window)) {
            return;
        }

        const sections = links
            .map((link) => {
                const id = link.getAttribute('href');
                return id ? document.querySelector(id) : null;
            })
            .filter(Boolean);

        if (!sections.length) {
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const activeId = `#${entry.target.id}`;

                links.forEach((link) => {
                    link.classList.toggle('is-active', link.getAttribute('href') === activeId);
                });
            });
        }, {
            root: null,
            threshold: 0.24,
            rootMargin: '-18% 0px -64% 0px'
        });

        sections.forEach((section) => observer.observe(section));

        links.forEach((link) => {
            link.addEventListener('click', () => {
                links.forEach((item) => item.classList.remove('is-active'));
                link.classList.add('is-active');
            });
        });
    }

    function initLegalExternalLinkSafety() {
        const legalContent = document.querySelector('.legal-content');

        if (!legalContent) {
            return;
        }

        legalContent.querySelectorAll('a[href^="http"]').forEach((link) => {
            const url = new URL(link.href);
            const currentHost = window.location.hostname;

            if (url.hostname !== currentHost) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }

    function isLegalPage(page) {
        return ['privacy-policy', 'cookie-policy', 'terms-of-service'].includes(page);
    }

    function getLegalDescription(page) {
        const descriptions = {
            'privacy-policy': `Read the ${config.company.name} Privacy Policy for this independent appliance repair provider matching platform.`,
            'cookie-policy': `Read the ${config.company.name} Cookie Policy and learn how cookie preferences may work on this website.`,
            'terms-of-service': `Read the ${config.company.name} Terms of Service for using this independent appliance repair provider matching platform.`
        };

        return descriptions[page] || `Read legal information for ${config.company.name}.`;
    }
})();