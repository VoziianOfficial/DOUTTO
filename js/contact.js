'use strict';

(function () {
    const config = window.SITE_CONFIG;

    document.addEventListener('DOMContentLoaded', () => {
        if (!config) {
            console.warn('SITE_CONFIG is missing on contact page.');
            return;
        }

        injectContactFormCopy();
        initContactForm();
        initContactPageSchema();
    });

    function injectContactFormCopy() {
        const formConfig = config.forms && config.forms.contact;

        if (!formConfig) {
            return;
        }

        setText('[data-contact-form-title]', formConfig.title);
        setText('[data-contact-form-text]', formConfig.text);
        setText('[data-contact-submit]', formConfig.submitText);
        setText('[data-contact-consent]', formConfig.consentText);
        setText('[data-contact-success-title]', formConfig.successTitle);
        setText('[data-contact-success-text]', formConfig.successText);
    }

    function initContactForm() {
        const form = document.querySelector('[data-contact-form]');

        if (!form) {
            return;
        }

        const successMessage = form.querySelector('[data-contact-success]');
        const submitButton = form.querySelector('[data-contact-submit]');

        const fields = {
            name: form.elements.name,
            phone: form.elements.phone,
            email: form.elements.email,
            zip: form.elements.zip,
            appliance: form.elements.appliance,
            message: form.elements.message,
            consent: form.elements.consent
        };

        Object.entries(fields).forEach(([fieldName, field]) => {
            if (!field) {
                return;
            }

            const eventName = field.type === 'checkbox' || field.tagName === 'SELECT'
                ? 'change'
                : 'input';

            field.addEventListener(eventName, () => {
                validateSingleField(fieldName, field, form);
            });
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const isValid = validateForm(fields, form);

            if (!isValid) {
                const firstInvalid = form.querySelector('.is-invalid input, .is-invalid select, .is-invalid textarea');

                if (firstInvalid) {
                    firstInvalid.focus();
                }

                return;
            }

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
            }

            window.setTimeout(() => {
                if (successMessage) {
                    successMessage.hidden = false;
                }

                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = getSubmitText();
                }

                form.reset();
                clearAllErrors(form);

                if (successMessage) {
                    successMessage.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }

                if (window.lucide && typeof window.lucide.createIcons === 'function') {
                    window.lucide.createIcons();
                }
            }, 650);
        });
    }

    function validateForm(fields, form) {
        let isValid = true;

        Object.entries(fields).forEach(([fieldName, field]) => {
            if (!field) {
                return;
            }

            const fieldValid = validateSingleField(fieldName, field, form);

            if (!fieldValid) {
                isValid = false;
            }
        });

        return isValid;
    }

    function validateSingleField(fieldName, field, form) {
        const value = field.type === 'checkbox'
            ? field.checked
            : String(field.value || '').trim();

        let message = '';

        switch (fieldName) {
            case 'name':
                if (!value) {
                    message = 'Please enter your name.';
                } else if (value.length < 2) {
                    message = 'Name should include at least 2 characters.';
                }
                break;

            case 'phone': {
                const digits = String(value).replace(/\D/g, '');

                if (!value) {
                    message = 'Please enter your phone number.';
                } else if (digits.length < 7) {
                    message = 'Please enter a valid phone number.';
                }
                break;
            }

            case 'email':
                if (!value) {
                    message = 'Please enter your email address.';
                } else if (!isValidEmail(value)) {
                    message = 'Please enter a valid email address.';
                }
                break;

            case 'zip':
                if (!value) {
                    message = 'Please enter your ZIP code.';
                } else if (!isValidZip(value)) {
                    message = 'Please enter a valid ZIP code.';
                }
                break;

            case 'appliance':
                if (!value) {
                    message = 'Please choose an appliance type.';
                }
                break;

            case 'message':
                if (!value) {
                    message = 'Please describe the appliance issue.';
                } else if (value.length < 8) {
                    message = 'Please add a little more detail about the issue.';
                }
                break;

            case 'consent':
                if (!value) {
                    message = 'Please confirm that you understand this is a provider comparison request.';
                }
                break;

            default:
                break;
        }

        setFieldError(form, fieldName, message);

        return !message;
    }

    function setFieldError(form, fieldName, message) {
        const error = form.querySelector(`[data-error-for="${fieldName}"]`);
        const field = form.elements[fieldName];
        const fieldWrapper = field && field.closest('.form-field');

        if (error) {
            error.textContent = message;
        }

        if (fieldWrapper) {
            fieldWrapper.classList.toggle('is-invalid', Boolean(message));
        }

        if (fieldName === 'consent') {
            const checkbox = form.querySelector('.form-checkbox');

            if (checkbox) {
                checkbox.classList.toggle('is-invalid', Boolean(message));
            }
        }

        if (field) {
            field.setAttribute('aria-invalid', message ? 'true' : 'false');
        }
    }

    function clearAllErrors(form) {
        form.querySelectorAll('.is-invalid').forEach((element) => {
            element.classList.remove('is-invalid');
        });

        form.querySelectorAll('[data-error-for]').forEach((error) => {
            error.textContent = '';
        });

        Array.from(form.elements).forEach((field) => {
            if (field && field.removeAttribute) {
                field.removeAttribute('aria-invalid');
            }
        });
    }

    function initContactPageSchema() {
        const page = document.body.dataset.page;

        if (page !== 'contact') {
            return;
        }

        const schema = {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: `Contact ${config.company.name}`,
            description:
                `Contact ${config.company.name} to request appliance repair provider comparison options in selected USA service areas.`,
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

        const existingSchema = document.querySelector('script[data-contact-schema]');

        if (existingSchema) {
            existingSchema.remove();
        }

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.dataset.contactSchema = 'true';
        script.textContent = JSON.stringify(schema);

        document.head.appendChild(script);
    }

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function isValidZip(value) {
        return /^\d{5}(-\d{4})?$/.test(value);
    }

    function getSubmitText() {
        return (
            config.forms &&
            config.forms.contact &&
            config.forms.contact.submitText
        ) || 'Request Options';
    }

    function setText(selector, value) {
        document.querySelectorAll(selector).forEach((element) => {
            element.textContent = value;
        });
    }
})();