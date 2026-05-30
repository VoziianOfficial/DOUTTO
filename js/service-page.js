'use strict';

(function () {
    const config = window.SITE_CONFIG;

    document.addEventListener('DOMContentLoaded', () => {
        if (!config) {
            console.warn('SITE_CONFIG is missing on service page.');
            return;
        }

        const service = getCurrentService();

        if (!service) {
            console.warn('No matching service found for this page.');
            return;
        }

        injectServiceContent(service);
        initServiceTabs(service);
        injectServiceFaq(service);
        injectServiceFaqSchema(service);
        injectServiceSchema(service);
    });

    function getCurrentService() {
        const serviceId = document.body.dataset.serviceId;

        if (!serviceId || !Array.isArray(config.services)) {
            return null;
        }

        return config.services.find((service) => service.id === serviceId) || null;
    }

    function injectServiceContent(service) {
        if (!service.page) {
            return;
        }

        setText('[data-service-kicker]', service.page.kicker);
        setText('[data-service-hero-title]', service.page.heroTitle);
        setText('[data-service-hero-text]', service.page.heroText);
        setText('[data-service-overview-title]', service.page.overviewTitle);
        setText('[data-service-overview-text]', service.page.overviewText);
    }

    function initServiceTabs(service) {
        const tabsRoot = document.querySelector('[data-service-tabs]');

        if (!tabsRoot || !Array.isArray(service.tabs) || !service.tabs.length) {
            return;
        }

        const buttonsWrap = tabsRoot.querySelector('.service-tabs__buttons');
        const panel = tabsRoot.querySelector('[data-service-tab-panel]');
        const image = tabsRoot.querySelector('[data-service-tab-image]');
        const title = tabsRoot.querySelector('[data-service-tab-title]');
        const text = tabsRoot.querySelector('[data-service-tab-text]');
        const list = tabsRoot.querySelector('[data-service-tab-list]');

        if (!buttonsWrap || !panel || !image || !title || !text || !list) {
            return;
        }

        buttonsWrap.innerHTML = service.tabs.map((tab, index) => {
            return `
            <button class="service-tabs__button ${index === 0 ? 'is-active' : ''}" type="button" role="tab"
                aria-selected="${index === 0 ? 'true' : 'false'}"
                aria-controls="service-tab-panel"
                data-service-tab="${escapeHtml(tab.id)}">
                <i data-lucide="${escapeHtml(tab.icon || 'circle-dot')}" aria-hidden="true"></i>
                <span>${escapeHtml(tab.label)}</span>
            </button>
        `;
        }).join('');

        const buttons = Array.from(buttonsWrap.querySelectorAll('[data-service-tab]'));

        const activateTab = (tabId, shouldFocus = false) => {
            const tabData = service.tabs.find((tab) => tab.id === tabId);

            if (!tabData) {
                return;
            }

            panel.classList.add('is-changing');

            buttons.forEach((button) => {
                const isActive = button.dataset.serviceTab === tabId;

                button.classList.toggle('is-active', isActive);
                button.setAttribute('aria-selected', String(isActive));
                button.setAttribute('tabindex', isActive ? '0' : '-1');

                if (isActive && shouldFocus) {
                    button.focus();
                }
            });

            window.setTimeout(() => {
                image.src = tabData.image;
                image.alt = tabData.title;
                title.textContent = tabData.title;
                text.textContent = tabData.text;

                list.innerHTML = tabData.compare.map((item) => {
                    return `<li>${escapeHtml(item)}</li>`;
                }).join('');

                panel.classList.remove('is-changing');
            }, 160);
        };

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                activateTab(button.dataset.serviceTab);
            });

            button.addEventListener('keydown', (event) => {
                const currentIndex = buttons.indexOf(button);
                let nextIndex = currentIndex;

                if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                    event.preventDefault();
                    nextIndex = currentIndex + 1 >= buttons.length ? 0 : currentIndex + 1;
                    activateTab(buttons[nextIndex].dataset.serviceTab, true);
                }

                if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                    event.preventDefault();
                    nextIndex = currentIndex - 1 < 0 ? buttons.length - 1 : currentIndex - 1;
                    activateTab(buttons[nextIndex].dataset.serviceTab, true);
                }

                if (event.key === 'Home') {
                    event.preventDefault();
                    activateTab(buttons[0].dataset.serviceTab, true);
                }

                if (event.key === 'End') {
                    event.preventDefault();
                    activateTab(buttons[buttons.length - 1].dataset.serviceTab, true);
                }
            });
        });

        activateTab(service.tabs[0].id);

        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
    }
    function injectServiceFaq(service) {
        const faqMount = document.querySelector('[data-service-faq]');

        if (!faqMount || !Array.isArray(service.faqs) || !service.faqs.length) {
            return;
        }

        faqMount.innerHTML = service.faqs.map((faq) => {
            return `
                <article class="faq-item">
                    <button class="faq-item__button" type="button" aria-expanded="false">
                        <span>${escapeHtml(faq.question)}</span>
                        <i data-lucide="plus" aria-hidden="true"></i>
                    </button>

                    <div class="faq-item__panel">
                        <p>${escapeHtml(faq.answer)}</p>
                    </div>
                </article>
            `;
        }).join('');

        initLocalFaqAccordions(faqMount);

        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
    }

    function initLocalFaqAccordions(root) {
        const items = root.querySelectorAll('.faq-item');

        items.forEach((item) => {
            const button = item.querySelector('.faq-item__button');
            const panel = item.querySelector('.faq-item__panel');

            if (!button || !panel) {
                return;
            }

            panel.style.maxHeight = '0px';

            button.addEventListener('click', () => {
                const isOpen = item.classList.contains('is-open');

                item.classList.toggle('is-open', !isOpen);
                button.setAttribute('aria-expanded', String(!isOpen));

                panel.style.maxHeight = isOpen ? '0px' : `${panel.scrollHeight}px`;
            });
        });
    }

    function injectServiceFaqSchema(service) {
        if (!Array.isArray(service.faqs) || !service.faqs.length) {
            return;
        }

        const schema = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: service.faqs.map((faq) => {
                return {
                    '@type': 'Question',
                    name: faq.question,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: faq.answer
                    }
                };
            })
        };

        const existingSchema = document.querySelector('script[data-service-faq-schema]');

        if (existingSchema) {
            existingSchema.remove();
        }

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.dataset.serviceFaqSchema = 'true';
        script.textContent = JSON.stringify(schema);

        document.head.appendChild(script);
    }

    function injectServiceSchema(service) {
        const schema = {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.title,
            description: service.summary,
            serviceType: service.title,
            areaServed: {
                '@type': 'Country',
                name: 'United States'
            },
            provider: {
                '@type': 'Organization',
                name: config.company.name,
                email: config.contact.email,
                telephone: config.contact.phoneRaw,
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: config.company.address
                },
                description: config.footerText
            },
            url: window.location.href,
            isRelatedTo: {
                '@type': 'WebSite',
                name: config.company.name,
                url: window.location.origin
            }
        };

        const existingSchema = document.querySelector('script[data-service-schema]');

        if (existingSchema) {
            existingSchema.remove();
        }

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.dataset.serviceSchema = 'true';
        script.textContent = JSON.stringify(schema);

        document.head.appendChild(script);
    }

    function setText(selector, value) {
        if (!value) {
            return;
        }

        document.querySelectorAll(selector).forEach((element) => {
            element.textContent = value;
        });
    }

    function escapeHtml(value) {
        return String(value || '')
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
    }
})();