'use strict';

(function () {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.warn('SITE_CONFIG is missing. Make sure /js/config.js is loaded before /js/main.js.');
        return;
    }

    const SELECTORS = {
        headerMount: '[data-site-header]',
        footerMount: '[data-site-footer]',
        cookieMount: '[data-cookie-banner]',
        sectionNavMount: '[data-section-nav]',
        serviceCards: '[data-service-cards]',
        platformSteps: '[data-platform-steps]',
        comparisonFactors: '[data-comparison-factors]',
        issueStrip: '[data-issue-strip]',
        faqItem: '.faq-item',
        faqButton: '.faq-item__button',
        faqPanel: '.faq-item__panel'
    };

    const state = {
        dropdownCloseTimer: null,
        activeTrap: null,
        lastFocusedElement: null
    };

    document.addEventListener('DOMContentLoaded', () => {
        applyPageMeta();
        renderHeader();
        renderFooter();
        renderCookieBanner();

        injectConfigValues();
        renderServiceCards();
        renderPlatformSteps();
        renderComparisonFactors();
        renderIssueStrip();

        initServicesDropdown();
        initMobileMenu();
        initSearchOverlay();
        initCookieBanner();
        initFaqAccordions();
        initSectionNavigation();
        initSmoothScrolling();
        initRevealOnScroll();
        initActiveNavigation();

        refreshIcons();
    });

    function getCurrentPage() {
        const pageFromBody = document.body.dataset.page;

        if (pageFromBody) {
            return `${pageFromBody}.html`;
        }

        const path = window.location.pathname;
        const filename = path.substring(path.lastIndexOf('/') + 1);

        return filename || 'index.html';
    }

    function normalizeHref(href) {
        if (!href) {
            return '';
        }

        return href
            .replace('./', '')
            .replace('/', '')
            .replace('#', '');
    }

    function getPageKey() {
        const current = getCurrentPage();

        if (current === 'home.html') {
            return 'index.html';
        }

        return current;
    }

    function applyPageMeta() {
        const pageKey = getPageKey();
        const meta = config.pageMeta && config.pageMeta[pageKey];

        if (!meta) {
            console.warn(`No pageMeta found for ${pageKey}`);
            return;
        }

        if (meta.title) {
            document.title = meta.title;
        }

        if (meta.description) {
            let description = document.querySelector('meta[name="description"]');

            if (!description) {
                description = document.createElement('meta');
                description.setAttribute('name', 'description');
                document.head.appendChild(description);
            }

            description.setAttribute('content', meta.description);
        }
    }

    function refreshIcons() {
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
    }

    function escapeHtml(value) {
        return String(value || '')
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
    }

    function renderHeader() {
        const mount = document.querySelector(SELECTORS.headerMount);

        if (!mount) {
            return;
        }

        const navigationMarkup = config.navigation.map((item) => {
            const isServices = item.hasDropdown || item.label.toLowerCase() === 'services';

            if (isServices) {
                return `
                    <li class="site-nav__item site-nav__item--services" data-services-dropdown-item>
                        <a class="site-nav__link" href="./${escapeHtml(item.href)}" data-nav-link data-services-dropdown-trigger>
                            <span>${escapeHtml(item.label)}</span>
                            <i data-lucide="chevron-down" aria-hidden="true"></i>
                        </a>

                        ${createServicesDropdownMarkup()}
                    </li>
                `;
            }

            return `
                <li class="site-nav__item">
                    <a class="site-nav__link" href="./${escapeHtml(item.href)}" data-nav-link>
                        ${escapeHtml(item.label)}
                    </a>
                </li>
            `;
        }).join('');

        mount.innerHTML = `
            <header class="site-header" data-header>
                <div class="container site-header__inner">
                    <a class="site-logo" href="./index.html" aria-label="${escapeHtml(config.company.name)} home">
                        <span class="site-logo__icon" aria-hidden="true">
                            <img src="${escapeHtml(config.brand.logoPath)}" alt="" />
                        </span>

                        <span class="site-logo__text">
                            <span class="site-logo__name" data-company-name>${escapeHtml(config.company.name)}</span>
                            <span class="site-logo__tagline">${escapeHtml(config.brand.tagline)}</span>
                        </span>
                    </a>

                    <nav class="site-nav" aria-label="Primary navigation">
                        <ul class="site-nav">
                            ${navigationMarkup}
                        </ul>
                    </nav>

                    <div class="site-header__actions">
                        <a class="btn btn--primary header-phone" href="tel:${escapeHtml(config.contact.phoneRaw)}" data-phone-link>
                            <span data-phone-text>${escapeHtml(config.contact.phoneButtonText)}</span>
                        </a>

                        <button class="header-icon-btn header-search" type="button" aria-label="Open site search" data-search-open>
                            <i data-lucide="search" aria-hidden="true"></i>
                        </button>

                        <button class="mobile-menu-toggle" type="button" aria-label="Open mobile menu" aria-controls="mobileMenu" aria-expanded="false" data-mobile-menu-open>
                            <i data-lucide="menu" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </header>

            ${createMobileMenuMarkup()}
            ${createSearchOverlayMarkup()}
        `;
    }

    function createServicesDropdownMarkup() {
        const serviceLinks = config.services.map((service) => {
            return `
                <a class="services-dropdown__link" href="./${escapeHtml(service.href)}">
                    <span class="services-dropdown__icon" aria-hidden="true">
                        <i data-lucide="${escapeHtml(service.icon)}"></i>
                    </span>

                    <span>
                        <strong>${escapeHtml(service.title)}</strong>
                        <span>${escapeHtml(service.dropdownText || service.summary)}</span>
                    </span>
                </a>
            `;
        }).join('');

        return `
            <div class="services-dropdown" data-services-dropdown>
                <div class="services-dropdown__panel">
                    <div class="services-dropdown__head">
                        <div>
                            <strong>Appliance repair categories</strong>
                            <span>Compare provider options by service type.</span>
                        </div>

                        <i data-lucide="wrench" aria-hidden="true"></i>
                    </div>

                    <div class="services-dropdown__grid">
                        ${serviceLinks}
                    </div>

                    <div class="services-dropdown__footer">
                        <a class="text-link" href="./services.html">
                            View all services
                            <i data-lucide="arrow-right" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    function createMobileMenuMarkup() {
        const navLinks = config.navigation.map((item) => {
            return `
                <a class="mobile-menu__link" href="./${escapeHtml(item.href)}" data-mobile-nav-link>
                    <span>${escapeHtml(item.label)}</span>
                    <i data-lucide="arrow-right" aria-hidden="true"></i>
                </a>
            `;
        }).join('');

        const serviceLinks = config.services.map((service) => {
            return `
                <a class="mobile-menu__service" href="./${escapeHtml(service.href)}">
                    <strong>${escapeHtml(service.shortTitle)}</strong>
                    <span>${escapeHtml(service.title)}</span>
                </a>
            `;
        }).join('');

        const legalLinks = config.legalLinks.map((link) => {
            return `
                <a class="mobile-menu__legal-link" href="./${escapeHtml(link.href)}">
                    ${escapeHtml(link.label)}
                </a>
            `;
        }).join('');

        return `
            <aside class="mobile-menu" id="mobileMenu" data-mobile-menu aria-label="Mobile menu">
                <div class="mobile-menu__backdrop" data-mobile-menu-close></div>

                <div class="mobile-menu__panel" role="dialog" aria-modal="true" aria-label="Mobile navigation">
                    <div class="mobile-menu__top">
                        <a class="site-logo" href="./index.html" aria-label="${escapeHtml(config.company.name)} home">
                            <span class="site-logo__icon" aria-hidden="true">
                                <img src="${escapeHtml(config.brand.logoPath)}" alt="" />
                            </span>

                            <span class="site-logo__text">
                                <span class="site-logo__name">${escapeHtml(config.company.name)}</span>
                            </span>
                        </a>

                        <button class="mobile-menu-close" type="button" aria-label="Close mobile menu" data-mobile-menu-close>
    <svg class="mobile-menu-close__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M6 6L18 18M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
</button>

                        
                    </div>

                    <div class="mobile-menu__content">
                        <div class="mobile-menu__group">
                            <p class="mobile-menu__label">Navigation</p>
                            <nav class="mobile-menu__nav" aria-label="Mobile primary navigation">
                                ${navLinks}
                            </nav>
                        </div>

                        <div class="mobile-menu__group">
                            <p class="mobile-menu__label">Services</p>
                            <div class="mobile-menu__services">
                                ${serviceLinks}
                            </div>
                        </div>

                        <div class="mobile-menu__group">
                            <p class="mobile-menu__label">Contact</p>

                            <div class="mobile-menu__contact">
                                <a class="mobile-menu__contact-link" href="tel:${escapeHtml(config.contact.phoneRaw)}" data-phone-link>
                                    <i data-lucide="phone" aria-hidden="true"></i>
                                    <span data-phone-text>${escapeHtml(config.contact.phoneDisplay)}</span>
                                </a>

                                <a class="mobile-menu__contact-link" href="mailto:${escapeHtml(config.contact.email)}" data-email-link>
                                    <i data-lucide="mail" aria-hidden="true"></i>
                                    <span data-email-text>${escapeHtml(config.contact.email)}</span>
                                </a>
                            </div>

                            <p class="mobile-menu__small" data-service-area>
                                ${escapeHtml(config.company.serviceArea)}
                            </p>
                        </div>

                        <div class="mobile-menu__group">
                            <p class="mobile-menu__label">Legal</p>
                            <div class="mobile-menu__legal">
                                ${legalLinks}
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        `;
    }

    function createSearchOverlayMarkup() {
        return `
            <div class="search-overlay" data-search-overlay aria-hidden="true">
                <div class="search-overlay__backdrop" data-search-close></div>

                <div class="search-overlay__dialog" role="dialog" aria-modal="true" aria-labelledby="search-title">
                    <div class="search-overlay__head">
                        <div>
                            <h2 id="search-title">Search DOUTTO</h2>
                            <p>Search pages, service categories, and legal information.</p>
                        </div>

                        <button class="search-close" type="button" aria-label="Close search" data-search-close>
                            <i data-lucide="x" aria-hidden="true"></i>
                        </button>
                    </div>

                    <div class="search-overlay__body">
                        <label class="search-field">
                            <span class="sr-only">Search query</span>
                            <i data-lucide="search" aria-hidden="true"></i>
                            <input type="search" placeholder="Try refrigerator, dishwasher, privacy..." data-search-input />
                        </label>

                        <div class="search-results" data-search-results></div>
                    </div>
                </div>
            </div>
        `;
    }

    function renderFooter() {
        const mount = document.querySelector(SELECTORS.footerMount);

        if (!mount) {
            return;
        }

        const navLinks = config.navigation.map((item) => {
            return `<a class="site-footer__link" href="./${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`;
        }).join('');

        const serviceLinks = config.services.map((service) => {
            return `<a class="site-footer__link" href="./${escapeHtml(service.href)}">${escapeHtml(service.title)}</a>`;
        }).join('');

        const legalLinks = config.legalLinks.map((link) => {
            return `<a class="site-footer__link" href="./${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`;
        }).join('');

        mount.innerHTML = `
            <footer class="site-footer">
                <div class="container">
                    <div class="site-footer__top">
                        <div class="site-footer__brand">
                            <a class="site-logo" href="./index.html" aria-label="${escapeHtml(config.company.name)} home">
                                <span class="site-logo__icon" aria-hidden="true">
                                    <img src="${escapeHtml(config.brand.logoPath)}" alt="" />
                                </span>

                                <span class="site-logo__text">
                                    <span class="site-logo__name" data-company-name>${escapeHtml(config.company.name)}</span>
                                    <span class="site-logo__tagline">${escapeHtml(config.brand.tagline)}</span>
                                </span>
                            </a>

                            <p data-footer-text>${escapeHtml(config.footerText)}</p>
                        </div>

                        <div class="site-footer__column">
                            <p class="site-footer__title">Navigation</p>
                            ${navLinks}
                        </div>

                        <div class="site-footer__column">
                            <p class="site-footer__title">Services</p>
                            ${serviceLinks}
                        </div>

                        <div class="site-footer__column">
                            <p class="site-footer__title">Contact</p>

                            <div class="site-footer__contact">
                                <a href="tel:${escapeHtml(config.contact.phoneRaw)}" data-phone-link>
                                    <i data-lucide="phone" aria-hidden="true"></i>
                                    <span data-phone-text>${escapeHtml(config.contact.phoneDisplay)}</span>
                                </a>

                                <a href="mailto:${escapeHtml(config.contact.email)}" data-email-link>
                                    <i data-lucide="mail" aria-hidden="true"></i>
                                    <span data-email-text>${escapeHtml(config.contact.email)}</span>
                                </a>

                                <span>
                                    <i data-lucide="map-pin" aria-hidden="true"></i>
                                    <span data-company-address>${escapeHtml(config.company.address)}</span>
                                </span>

                                <span>
                                    <i data-lucide="badge-check" aria-hidden="true"></i>
                                    <span data-company-id>${escapeHtml(config.company.companyId)}</span>
                                </span>
                            </div>

                            <p class="site-footer__text" data-service-area>
                                ${escapeHtml(config.company.serviceArea)}
                            </p>
                        </div>
                    </div>

                    <div class="site-footer__disclaimer">
                        <p data-disclaimer>${escapeHtml(config.disclaimer)}</p>
                    </div>

                    <div class="site-footer__bottom">
                        <p>
                            © <span data-current-year></span>
                            <span data-company-name>${escapeHtml(config.company.name)}</span>.
                            All rights reserved.
                        </p>

                        <div class="site-footer__bottom-links">
                            ${legalLinks}
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }

    function renderCookieBanner() {
        const mount = document.querySelector(SELECTORS.cookieMount);

        if (!mount || !config.cookieBanner) {
            return;
        }

        const legalLinks = config.legalLinks.map((link) => {
            return `<a href="./${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`;
        }).join('');

        mount.innerHTML = `
            <section class="cookie-banner" data-cookie-panel aria-label="Cookie preferences">
                <div class="cookie-banner__inner">
                    <h2>${escapeHtml(config.cookieBanner.title)}</h2>

                    <p>${escapeHtml(config.cookieBanner.text)}</p>

                    <div class="cookie-banner__links">
                        ${legalLinks}
                    </div>

                    <div class="cookie-banner__actions">
                        <button class="btn btn--primary" type="button" data-cookie-accept>
                            ${escapeHtml(config.cookieBanner.acceptText)}
                        </button>

                        <button class="btn btn--ghost-light" type="button" data-cookie-decline>
                            ${escapeHtml(config.cookieBanner.declineText)}
                        </button>
                    </div>
                </div>
            </section>
        `;
    }

    function injectConfigValues() {
        const company = config.company || {};
        const contact = config.contact || {};
        const currentYear = String(new Date().getFullYear());

        /*
            Эти значения — старые дефолтные данные сайта.
            Они нужны, чтобы JS мог найти DOUTTO / старый номер / старую почту
            даже в обычном тексте без data-атрибутов.
        */
        const defaultTokens = {
            companyName: 'DOUTTO',
            companyId: 'DOUTTO-APR-4928',
            address: '4187 Copper Ridge Avenue, Austin, TX 78731, USA',
            phoneRaw: '+18885550148',
            phoneDisplay: '(888) 555-0148',
            phoneDisplayPlain: '888-555-0148',
            email: 'support@doutto.com'
        };

        /*
            1) Стандартная подстановка по data-атрибутам.
            Это самый чистый способ.
        */
        setText('[data-company-name]', company.name);
        setText('[data-company-id]', company.companyId);
        setText('[data-company-address]', company.address);
        setText('[data-address-text]', company.address);
        setText('[data-service-area]', company.serviceArea);
        setText('[data-footer-text]', config.footerText);
        setText('[data-disclaimer]', config.disclaimer);
        setText('[data-current-year]', currentYear);

        setText('[data-phone-text]', contact.phoneDisplay);
        setText('[data-email-text]', contact.email);
        setText('[data-support-hours]', contact.supportHours);

     
        document.querySelectorAll('.header-phone [data-phone-text]').forEach((element) => {
            element.textContent = contact.phoneButtonText || contact.phoneDisplay;
        });

        document.querySelectorAll('[data-phone-link], a[href^="tel:"]').forEach((link) => {
            link.setAttribute('href', `tel:${contact.phoneRaw}`);
        });

        document.querySelectorAll('[data-email-link], a[href^="mailto:"]').forEach((link) => {
            link.setAttribute('href', `mailto:${contact.email}`);
        });

   
        const replacements = createGlobalReplacements(defaultTokens, company, contact);

        replaceTextInDom(document.body, replacements);
        replaceCommonAttributes(replacements);
        replaceDocumentMeta(replacements);
    }

    function createGlobalReplacements(defaultTokens, company, contact) {
        const pairs = [
            [defaultTokens.companyName, company.name],
            [defaultTokens.companyId, company.companyId],
            [defaultTokens.address, company.address],
            [defaultTokens.phoneRaw, contact.phoneRaw],
            [defaultTokens.phoneDisplay, contact.phoneDisplay],
            [defaultTokens.phoneDisplayPlain, contact.phoneDisplay],
            [defaultTokens.email, contact.email]
        ];

        return pairs
            .filter(([from, to]) => {
                return from && to && String(from) !== String(to);
            })
            .sort((a, b) => {
                return String(b[0]).length - String(a[0]).length;
            });
    }

    function replaceTextInDom(root, replacements) {
        if (!root || !replacements.length) {
            return;
        }

        const ignoredTags = new Set([
            'SCRIPT',
            'STYLE',
            'NOSCRIPT',
            'SVG',
            'PATH',
            'CLIPPATH'
        ]);

        const walker = document.createTreeWalker(
            root,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode(node) {
                    const parent = node.parentElement;

                    if (!parent || ignoredTags.has(parent.tagName)) {
                        return NodeFilter.FILTER_REJECT;
                    }

                    if (!node.nodeValue || !node.nodeValue.trim()) {
                        return NodeFilter.FILTER_REJECT;
                    }

                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );

        const textNodes = [];

        while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
        }

        textNodes.forEach((node) => {
            const nextValue = replaceTokens(node.nodeValue, replacements);

            if (nextValue !== node.nodeValue) {
                node.nodeValue = nextValue;
            }
        });
    }

    function replaceCommonAttributes(replacements) {
        if (!replacements.length) {
            return;
        }

        const attributes = [
            'title',
            'alt',
            'aria-label',
            'placeholder',
            'content'
        ];

        document.querySelectorAll('*').forEach((element) => {
            if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG', 'PATH'].includes(element.tagName)) {
                return;
            }

            attributes.forEach((attribute) => {
                if (!element.hasAttribute(attribute)) {
                    return;
                }

                const currentValue = element.getAttribute(attribute);
                const nextValue = replaceTokens(currentValue, replacements);

                if (nextValue !== currentValue) {
                    element.setAttribute(attribute, nextValue);
                }
            });
        });
    }

    function replaceDocumentMeta(replacements) {
        if (!replacements.length) {
            return;
        }

        document.title = replaceTokens(document.title, replacements);

        document.querySelectorAll('meta[name="description"]').forEach((meta) => {
            const currentValue = meta.getAttribute('content') || '';
            const nextValue = replaceTokens(currentValue, replacements);

            if (nextValue !== currentValue) {
                meta.setAttribute('content', nextValue);
            }
        });
    }

    function replaceTokens(value, replacements) {
        let result = String(value || '');

        replacements.forEach(([from, to]) => {
            result = result.replace(
                new RegExp(escapeRegExp(from), 'g'),
                String(to)
            );
        });

        return result;
    }

    function escapeRegExp(value) {
        return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    function setText(selector, value) {
        document.querySelectorAll(selector).forEach((element) => {
            element.textContent = value;
        });
    }

    function renderServiceCards() {
        document.querySelectorAll(SELECTORS.serviceCards).forEach((mount) => {
            const variant = mount.dataset.serviceCards || 'default';
            mount.innerHTML = config.services.map((service) => {
                const isHomeCards = variant === 'home';

                return `
        <a class="service-card ${isHomeCards ? 'service-card--home' : ''} service-card--${escapeHtml(service.id)}" href="./${escapeHtml(service.href)}" style="--service-image: url('${escapeHtml(service.image)}');">
            <span class="service-card__scanner" aria-hidden="true"></span>

            <span class="service-card__icon" aria-hidden="true">
                <i data-lucide="${escapeHtml(service.icon)}"></i>
            </span>

            <span class="service-card__content">
                <span class="service-card__label">${isHomeCards ? 'Appliance category' : 'Provider options'}</span>

                <span class="service-card__title-wrap">
                    <h3>${escapeHtml(service.title)}</h3>
                </span>

                <span class="service-card__line" aria-hidden="true"></span>

                ${isHomeCards ? '' : `<p>${escapeHtml(service.summary)}</p>`}

                <span class="service-card__cta">
                    Explore service
                    <i data-lucide="arrow-right" aria-hidden="true"></i>
                </span>
            </span>
        </a>
    `;
            }).join('');
        });
    }

    function renderPlatformSteps() {
        document.querySelectorAll(SELECTORS.platformSteps).forEach((mount) => {
            mount.innerHTML = config.platformSteps.map((step) => {
                return `
                    <article class="platform-step">
                        <div class="platform-step__top">
                            <span class="platform-step__number">${escapeHtml(step.number)}</span>

                            <span class="platform-step__icon" aria-hidden="true">
                                <i data-lucide="${escapeHtml(step.icon)}"></i>
                            </span>
                        </div>

                        <h3>${escapeHtml(step.title)}</h3>
                        <p>${escapeHtml(step.text)}</p>
                    </article>
                `;
            }).join('');
        });
    }

    function renderComparisonFactors() {
        document.querySelectorAll(SELECTORS.comparisonFactors).forEach((mount) => {
            mount.innerHTML = config.comparisonFactors.map((factor) => {
                return `
                    <article class="comparison-factor">
                        <span class="comparison-factor__icon" aria-hidden="true">
                            <i data-lucide="${escapeHtml(factor.icon)}"></i>
                        </span>

                        <h3>${escapeHtml(factor.title)}</h3>
                        <p>${escapeHtml(factor.text)}</p>
                    </article>
                `;
            }).join('');
        });
    }

    function renderIssueStrip() {
        document.querySelectorAll(SELECTORS.issueStrip).forEach((mount) => {
            mount.innerHTML = config.issueStrip.map((issue) => {
                return `
                    <article class="issue-pill">
                        <span class="issue-pill__icon" aria-hidden="true">
                            <i data-lucide="${escapeHtml(issue.icon)}"></i>
                        </span>

                        <span>${escapeHtml(issue.label)}</span>
                    </article>
                `;
            }).join('');
        });
    }

    function initServicesDropdown() {
        const item = document.querySelector('[data-services-dropdown-item]');

        if (!item) {
            return;
        }

        const trigger = item.querySelector('[data-services-dropdown-trigger]');
        const dropdown = item.querySelector('[data-services-dropdown]');

        if (!trigger || !dropdown) {
            return;
        }

        const openDropdown = () => {
            window.clearTimeout(state.dropdownCloseTimer);
            item.classList.add('is-open');
            trigger.setAttribute('aria-expanded', 'true');
        };

        const closeDropdown = () => {
            state.dropdownCloseTimer = window.setTimeout(() => {
                if (!item.matches(':hover') && !item.contains(document.activeElement)) {
                    item.classList.remove('is-open');
                    trigger.setAttribute('aria-expanded', 'false');
                }
            }, 180);
        };

        trigger.setAttribute('aria-haspopup', 'true');
        trigger.setAttribute('aria-expanded', 'false');

        item.addEventListener('mouseenter', openDropdown);
        item.addEventListener('mouseleave', closeDropdown);

        trigger.addEventListener('focus', openDropdown);

        dropdown.addEventListener('focusin', openDropdown);
        dropdown.addEventListener('focusout', closeDropdown);

        item.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                item.classList.remove('is-open');
                trigger.setAttribute('aria-expanded', 'false');
                trigger.focus();
            }
        });
    }

    function initMobileMenu() {
        const menu = document.querySelector('[data-mobile-menu]');
        const panel = menu && menu.querySelector('.mobile-menu__panel');
        const openButton = document.querySelector('[data-mobile-menu-open]');
        const closeButtons = document.querySelectorAll('[data-mobile-menu-close]');

        if (!menu || !panel || !openButton) {
            return;
        }

        menu.inert = true;

        const openMenu = () => {
            state.lastFocusedElement = document.activeElement;
            menu.classList.add('is-open');
            menu.inert = false;
            openButton.setAttribute('aria-expanded', 'true');
            document.body.classList.add('is-locked');

            requestAnimationFrame(() => {
                const closeButton = menu.querySelector('.mobile-menu-close');
                if (closeButton) {
                    closeButton.focus();
                }
            });

            activateFocusTrap(panel);
        };

        const closeMenu = () => {
            menu.classList.remove('is-open');
            menu.inert = true;
            openButton.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('is-locked');
            deactivateFocusTrap();

            if (state.lastFocusedElement && typeof state.lastFocusedElement.focus === 'function') {
                state.lastFocusedElement.focus();
            }
        };

        openButton.addEventListener('click', openMenu);

        closeButtons.forEach((button) => {
            button.addEventListener('click', closeMenu);
        });

        menu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menu.classList.contains('is-open')) {
                closeMenu();
            }
        });
    }

    function initSearchOverlay() {
        const overlay = document.querySelector('[data-search-overlay]');
        const dialog = overlay && overlay.querySelector('.search-overlay__dialog');
        const openButtons = document.querySelectorAll('[data-search-open]');
        const closeButtons = document.querySelectorAll('[data-search-close]');
        const input = overlay && overlay.querySelector('[data-search-input]');
        const results = overlay && overlay.querySelector('[data-search-results]');

        if (!overlay || !dialog || !input || !results || !openButtons.length) {
            return;
        }

        overlay.inert = true;

        const renderResults = (query = '') => {
            const normalizedQuery = query.trim().toLowerCase();
            const items = config.searchItems || [];

            const filteredItems = normalizedQuery
                ? items.filter((item) => {
                    const haystack = `${item.title} ${item.type} ${item.description}`.toLowerCase();
                    return haystack.includes(normalizedQuery);
                })
                : items;

            if (!filteredItems.length) {
                results.innerHTML = `<p class="search-empty">No matching pages found. Try another keyword.</p>`;
                return;
            }

            results.innerHTML = filteredItems.map((item) => {
                return `
                    <a class="search-result" href="./${escapeHtml(item.href)}">
                        <span>${escapeHtml(item.type)}</span>
                        <strong>${escapeHtml(item.title)}</strong>
                        <p>${escapeHtml(item.description)}</p>
                    </a>
                `;
            }).join('');
        };

        const openSearch = () => {
            state.lastFocusedElement = document.activeElement;
            overlay.classList.add('is-open');
            overlay.inert = false;
            overlay.setAttribute('aria-hidden', 'false');
            document.body.classList.add('is-locked');

            renderResults('');

            requestAnimationFrame(() => {
                input.value = '';
                input.focus();
            });

            activateFocusTrap(dialog);
        };

        const closeSearch = () => {
            overlay.classList.remove('is-open');
            overlay.inert = true;
            overlay.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('is-locked');
            deactivateFocusTrap();

            if (state.lastFocusedElement && typeof state.lastFocusedElement.focus === 'function') {
                state.lastFocusedElement.focus();
            }
        };

        openButtons.forEach((button) => {
            button.addEventListener('click', openSearch);
        });

        closeButtons.forEach((button) => {
            button.addEventListener('click', closeSearch);
        });

        input.addEventListener('input', () => {
            renderResults(input.value);
        });

        results.addEventListener('click', (event) => {
            const link = event.target.closest('a');

            if (link) {
                closeSearch();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && overlay.classList.contains('is-open')) {
                closeSearch();
            }
        });
    }

    function initCookieBanner() {
        const banner = document.querySelector('[data-cookie-panel]');

        if (!banner || !config.cookieBanner) {
            return;
        }

        const acceptButton = banner.querySelector('[data-cookie-accept]');
        const declineButton = banner.querySelector('[data-cookie-decline]');
        const storageKey = config.cookieBanner.storageKey;

        const savedChoice = safeStorageGet(storageKey);

        if (!savedChoice) {
            window.setTimeout(() => {
                banner.classList.add('is-visible');
            }, 600);
        }

        const saveChoice = (choice) => {
            safeStorageSet(storageKey, choice);
            banner.classList.remove('is-visible');
        };

        if (acceptButton) {
            acceptButton.addEventListener('click', () => saveChoice('accepted'));
        }

        if (declineButton) {
            declineButton.addEventListener('click', () => saveChoice('declined'));
        }
    }

    function safeStorageGet(key) {
        try {
            return window.localStorage.getItem(key);
        } catch (error) {
            return null;
        }
    }

    function safeStorageSet(key, value) {
        try {
            window.localStorage.setItem(key, value);
        } catch (error) {
            console.warn('Unable to save cookie preference.', error);
        }
    }

    function initFaqAccordions() {
        document.querySelectorAll(SELECTORS.faqItem).forEach((item) => {
            const button = item.querySelector(SELECTORS.faqButton);
            const panel = item.querySelector(SELECTORS.faqPanel);

            if (!button || !panel) {
                return;
            }

            panel.style.maxHeight = '0px';

            button.addEventListener('click', () => {
                const isOpen = item.classList.contains('is-open');

                item.classList.toggle('is-open', !isOpen);
                button.setAttribute('aria-expanded', String(!isOpen));

                if (isOpen) {
                    panel.style.maxHeight = '0px';
                } else {
                    panel.style.maxHeight = `${panel.scrollHeight}px`;
                }
            });
        });
    }

    function initSectionNavigation() {
        const mount = document.querySelector(SELECTORS.sectionNavMount);

        if (!mount) {
            return;
        }

        const sections = Array.from(document.querySelectorAll('[data-section][id]'))
            .filter((section) => section.offsetParent !== null);

        if (sections.length < 3) {
            mount.innerHTML = '';
            return;
        }

        mount.innerHTML = `
        <nav class="section-nav" aria-label="Page section navigation">
            ${sections.map((section) => {
            const label = section.dataset.section || section.id;

            return `
                    <a class="section-nav__link" href="#${escapeHtml(section.id)}" data-section-nav-link>
                        <span class="section-nav__label">${escapeHtml(label)}</span>
                        <span class="section-nav__dot" aria-hidden="true"></span>
                    </a>
                `;
        }).join('')}
        </nav>
    `;

        const links = Array.from(mount.querySelectorAll('[data-section-nav-link]'));

        const setActiveLink = (id) => {
            links.forEach((link) => {
                link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
            });
        };

        const updateActiveSection = () => {
            const header = document.querySelector('[data-header]');
            const headerHeight = header ? header.offsetHeight : 0;

            const scrollTop = window.scrollY;
            const checkPoint = scrollTop + headerHeight + window.innerHeight * 0.38;

            let activeSection = sections[0];

            sections.forEach((section) => {
                if (section.offsetTop <= checkPoint) {
                    activeSection = section;
                }
            });

            const isNearTop = scrollTop <= 40;
            const isNearBottom =
                window.innerHeight + scrollTop >= document.documentElement.scrollHeight - 80;

            if (isNearTop) {
                activeSection = sections[0];
            }

            if (isNearBottom) {
                activeSection = sections[sections.length - 1];
            }

            setActiveLink(activeSection.id);
        };

        let ticking = false;

        const onScroll = () => {
            if (ticking) {
                return;
            }

            window.requestAnimationFrame(() => {
                updateActiveSection();
                ticking = false;
            });

            ticking = true;
        };

        links.forEach((link) => {
            link.addEventListener('click', () => {
                const id = link.getAttribute('href').replace('#', '');
                setActiveLink(id);
            });
        });

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', updateActiveSection);

        updateActiveSection();
    }

    function initSmoothScrolling() {
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a[href^="#"]');

            if (!link) {
                return;
            }

            const targetId = link.getAttribute('href');

            if (!targetId || targetId === '#') {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const header = document.querySelector('[data-header]');
            const offset = header ? header.offsetHeight + 14 : 14;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({
                top,
                behavior: 'smooth'
            });
        });
    }

    function initRevealOnScroll() {
        const revealTargets = document.querySelectorAll(
            '.service-card, .platform-step, .comparison-factor, .faq-item, .contact-options__card, .about-model__card, .about-values__card'
        );

        if (!revealTargets.length || !('IntersectionObserver' in window)) {
            return;
        }

        revealTargets.forEach((target) => {
            target.classList.add('reveal-up');
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        revealTargets.forEach((target) => observer.observe(target));
    }

    function initActiveNavigation() {
        const pageKey = getPageKey();
        const current = pageKey === 'index.html' ? 'index.html' : pageKey;

        document.querySelectorAll('[data-nav-link], [data-mobile-nav-link]').forEach((link) => {
            const href = normalizeHref(link.getAttribute('href'));

            if (!href) {
                return;
            }

            const isActive = href === current || (current.includes('-repair.html') && href === 'services.html');
            link.classList.toggle('is-active', isActive);
        });
    }

    function activateFocusTrap(container) {
        deactivateFocusTrap();

        const handleKeydown = (event) => {
            if (event.key !== 'Tab') {
                return;
            }

            const focusableElements = getFocusableElements(container);

            if (!focusableElements.length) {
                return;
            }

            const first = focusableElements[0];
            const last = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        container.addEventListener('keydown', handleKeydown);
        state.activeTrap = {
            container,
            handleKeydown
        };
    }

    function deactivateFocusTrap() {
        if (!state.activeTrap) {
            return;
        }

        state.activeTrap.container.removeEventListener('keydown', state.activeTrap.handleKeydown);
        state.activeTrap = null;
    }

    function getFocusableElements(container) {
        return Array.from(
            container.querySelectorAll(
                'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
        ).filter((element) => {
            return Boolean(
                element.offsetWidth ||
                element.offsetHeight ||
                element.getClientRects().length
            );
        });
    }
})();