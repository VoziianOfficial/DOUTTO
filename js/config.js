'use strict';

window.SITE_CONFIG = {
    company: {
        name: 'DOUTTO',
        companyId: 'DOUTTO-APR-4928',
        address: '4187 Copper Ridge Avenue, Austin, TX 78731, USA',
        serviceArea: 'Independent appliance repair provider matching across selected areas in the United States'
    },

    contact: {
        phoneRaw: '+18885550148',
        phoneDisplay: '(888) 555-0148',
        phoneButtonText: 'Call Now',
        email: 'support@doutto.com',
        supportHours: 'Mon–Fri, 8:00 AM–7:00 PM'
    },

    brand: {
        logoPath: './assets/icons/logo.svg',
        faviconPath: './assets/icons/favicon.svg',
        tagline: 'Compare local appliance repair providers with clarity.'
    },

    navigation: [
        {
            label: 'Home',
            href: 'index.html'
        },
        {
            label: 'Services',
            href: 'services.html',
            hasDropdown: true
        },
        {
            label: 'About',
            href: 'about.html'
        },
        {
            label: 'Contact',
            href: 'contact.html'
        }
    ],

    services: [
        {
            id: 'refrigerator',
            title: 'Refrigerator Repair',
            shortTitle: 'Refrigerator',
            href: 'refrigerator-repair.html',
            image: '../assets/images/refrigerator-repair.jpg',
            icon: 'refrigerator',
            summary: 'Compare local providers for cooling issues, leaks, strange noises, and refrigerator performance problems.',
            dropdownText: 'Cooling issues, leaks, ice maker concerns and more.',
            page: {
                kicker: 'Refrigerator provider comparison',
                heroTitle: 'Compare Refrigerator Repair Provider Options',
                heroText: 'Review local provider options for refrigerator cooling concerns, leaks, noise, ice maker issues, and performance problems.',
                overviewTitle: 'Explore refrigerator repair provider categories with more clarity.',
                overviewText: 'DOUTTO helps homeowners compare independent local provider options for common refrigerator repair categories. Availability, pricing, diagnostic fees, parts, timing, and warranties may vary by provider and location.'
            },
            tabs: [
                {
                    id: 'cooling',
                    label: 'Cooling Issues',
                    image: '../assets/images/refrigerator-repair.jpg',
                    title: 'Cooling performance concerns',
                    text: 'Compare providers for refrigerators that are warm, inconsistent, cycling too often, or not holding temperature.',
                    compare: [
                        'Diagnostic fee and quote structure',
                        'Experience with cooling systems',
                        'Parts availability',
                        'Timing and service area'
                    ]
                },
                {
                    id: 'leaks',
                    label: 'Leaks',
                    image: '../assets/images/refrigerator-repair.jpg',
                    title: 'Leaks and water issues',
                    text: 'Review provider options for water pooling, dispenser leaks, drain concerns, or suspected line issues.',
                    compare: [
                        'Water line experience',
                        'Possible parts or drain inspection',
                        'Service area coverage',
                        'Warranty questions'
                    ]
                },
                {
                    id: 'noise',
                    label: 'Noise',
                    image: '../assets/images/refrigerator-repair.jpg',
                    title: 'Unusual refrigerator noise',
                    text: 'Compare local companies for buzzing, rattling, clicking, or motor-related sound concerns.',
                    compare: [
                        'Diagnosis process',
                        'Brand and model familiarity',
                        'Estimated appointment timing',
                        'Labor and parts details'
                    ]
                },
                {
                    id: 'ice-maker',
                    label: 'Ice Maker',
                    image: '../assets/images/refrigerator-repair.jpg',
                    title: 'Ice maker and dispenser issues',
                    text: 'Explore providers for ice makers that stop producing, leak, jam, or dispense inconsistently.',
                    compare: [
                        'Ice maker parts availability',
                        'Diagnostic pricing',
                        'Brand-specific experience',
                        'Follow-up warranty terms'
                    ]
                }
            ],
            faqs: [
                {
                    question: 'Does DOUTTO repair refrigerators directly?',
                    answer: 'No. DOUTTO is an independent matching platform that helps homeowners compare local refrigerator repair provider options.'
                },
                {
                    question: 'What should I compare before choosing a refrigerator repair provider?',
                    answer: 'Compare service area, diagnostic fees, quote details, availability, parts, warranty terms, and licensing or insurance information.'
                },
                {
                    question: 'Can provider availability vary by location?',
                    answer: 'Yes. Local availability may vary by ZIP code, appliance type, provider schedule, and service category.'
                }
            ]
        },

        {
            id: 'washer-dryer',
            title: 'Washer & Dryer',
            shortTitle: 'Washer & Dryer',
            href: 'washer-dryer-repair.html',
            image: '../assets/images/washer-dryer-repair.jpg',
            icon: 'washing-machine',
            summary: 'Review provider options for laundry appliance problems, drainage issues, heating concerns, and cycle failures.',
            dropdownText: 'Drainage problems, heating concerns, noise and more.',
            page: {
                kicker: 'Laundry appliance provider comparison',
                heroTitle: 'Compare Washer & Dryer Repair Provider Options',
                heroText: 'Review local provider options for washer drainage issues, dryer heating concerns, spin cycle problems, vibration, and unusual noise.',
                overviewTitle: 'Review laundry appliance repair categories before contacting providers.',
                overviewText: 'DOUTTO helps homeowners compare independent local options for washer and dryer repair categories. Homeowners should review quote details, timing, provider credentials, and warranty terms before selecting a company.'
            },
            tabs: [
                {
                    id: 'washer-drainage',
                    label: 'Washer Drainage',
                    image: '../assets/images/washer-dryer-repair.jpg',
                    title: 'Washer drainage problems',
                    text: 'Compare providers for washers that do not drain, stop mid-cycle, show drainage errors, or leave water inside.',
                    compare: [
                        'Drainage diagnostic process',
                        'Possible pump or hose inspection',
                        'Quote structure',
                        'Service area availability'
                    ]
                },
                {
                    id: 'dryer-heating',
                    label: 'Dryer Heating',
                    image: '../assets/images/washer-dryer-repair.jpg',
                    title: 'Dryer heating concerns',
                    text: 'Review local provider options for dryers that do not heat, take too long to dry, or show heating-related symptoms.',
                    compare: [
                        'Heating element experience',
                        'Vent and safety questions',
                        'Diagnosis fee',
                        'Warranty terms'
                    ]
                },
                {
                    id: 'spin-cycle',
                    label: 'Spin Cycle',
                    image: '../assets/images/washer-dryer-repair.jpg',
                    title: 'Spin cycle and movement issues',
                    text: 'Explore providers for washer spin issues, incomplete cycles, balance problems, or drum movement concerns.',
                    compare: [
                        'Cycle diagnosis approach',
                        'Parts availability',
                        'Timing expectations',
                        'Labor and quote clarity'
                    ]
                },
                {
                    id: 'vibration-noise',
                    label: 'Vibration / Noise',
                    image: '../assets/images/washer-dryer-repair.jpg',
                    title: 'Vibration and unusual noise',
                    text: 'Compare local provider options for loud operation, shaking, banging, squeaking, or vibration concerns.',
                    compare: [
                        'Inspection process',
                        'Brand and model familiarity',
                        'Availability',
                        'Warranty questions'
                    ]
                }
            ],
            faqs: [
                {
                    question: 'Does DOUTTO send laundry appliance technicians?',
                    answer: 'No. DOUTTO does not perform repair work directly. It helps homeowners compare independent local provider options.'
                },
                {
                    question: 'What affects washer or dryer repair pricing?',
                    answer: 'Pricing may depend on the appliance issue, parts, diagnostic fees, brand or model, labor, and provider availability.'
                },
                {
                    question: 'Should I ask about licensing and insurance?',
                    answer: 'Yes. Homeowners should verify licensing, insurance, quote details, warranties, and service availability before choosing a provider.'
                }
            ]
        },

        {
            id: 'dishwasher',
            title: 'Dishwasher Repair',
            shortTitle: 'Dishwasher',
            href: 'dishwasher-repair.html',
            image: '../assets/images/dishwasher-repair.jpg',
            icon: 'panels-top-left',
            summary: 'Find local provider options for leaks, drainage issues, cleaning problems, and dishwasher error codes.',
            dropdownText: 'Leaks, drainage, cleaning problems and error codes.',
            page: {
                kicker: 'Dishwasher provider comparison',
                heroTitle: 'Compare Dishwasher Repair Provider Options',
                heroText: 'Explore local provider options for dishwasher drainage problems, leaks, cleaning performance issues, and error codes.',
                overviewTitle: 'Compare dishwasher repair options without direct-service claims.',
                overviewText: 'DOUTTO is an independent platform that helps homeowners review dishwasher repair provider categories. The platform does not perform repairs and does not guarantee provider work.'
            },
            tabs: [
                {
                    id: 'not-draining',
                    label: 'Not Draining',
                    image: '../assets/images/dishwasher-repair.jpg',
                    title: 'Dishwasher not draining',
                    text: 'Compare providers for standing water, drainage errors, clogged lines, or incomplete drain cycles.',
                    compare: [
                        'Drain inspection process',
                        'Diagnostic fee',
                        'Possible parts discussion',
                        'Appointment timing'
                    ]
                },
                {
                    id: 'leaking',
                    label: 'Leaking',
                    image: '../assets/images/dishwasher-repair.jpg',
                    title: 'Dishwasher leaks',
                    text: 'Review local options for leaks around the door, beneath the unit, or near water connections.',
                    compare: [
                        'Leak diagnosis process',
                        'Insurance and credentials',
                        'Quote clarity',
                        'Warranty questions'
                    ]
                },
                {
                    id: 'not-cleaning',
                    label: 'Not Cleaning',
                    image: '../assets/images/dishwasher-repair.jpg',
                    title: 'Poor cleaning performance',
                    text: 'Explore providers for dishwashers leaving residue, spotting, incomplete cycles, or spray arm concerns.',
                    compare: [
                        'Cleaning system inspection',
                        'Brand familiarity',
                        'Parts and labor details',
                        'Service area'
                    ]
                },
                {
                    id: 'error-codes',
                    label: 'Error Codes',
                    image: '../assets/images/dishwasher-repair.jpg',
                    title: 'Dishwasher error codes',
                    text: 'Compare providers for displayed error codes, cycle interruptions, and electronic control concerns.',
                    compare: [
                        'Code diagnosis approach',
                        'Model experience',
                        'Estimated timing',
                        'Quote and warranty details'
                    ]
                }
            ],
            faqs: [
                {
                    question: 'Does DOUTTO repair dishwashers directly?',
                    answer: 'No. DOUTTO helps homeowners compare independent local dishwasher repair provider options.'
                },
                {
                    question: 'What should I ask a dishwasher repair provider?',
                    answer: 'Ask about diagnostic fees, quote details, parts, timing, service area, warranty terms, licensing, and insurance.'
                },
                {
                    question: 'Can I compare providers for dishwasher leaks?',
                    answer: 'Yes. DOUTTO helps homeowners explore provider options for dishwasher leaks, drainage issues, cleaning problems, and error codes.'
                }
            ]
        },

        {
            id: 'oven-range',
            title: 'Oven & Range',
            shortTitle: 'Oven & Range',
            href: 'oven-range-repair.html',
            image: '../assets/images/oven-range-repair.jpg',
            icon: 'cooking-pot',
            summary: 'Compare repair providers for heating issues, burners, temperature problems, and range performance concerns.',
            dropdownText: 'Heating, burners, ignition and temperature concerns.',
            page: {
                kicker: 'Oven and range provider comparison',
                heroTitle: 'Compare Oven & Range Repair Provider Options',
                heroText: 'Review local provider options for oven heating issues, range burners, temperature control concerns, and ignition problems.',
                overviewTitle: 'Review oven and range repair categories before choosing a provider.',
                overviewText: 'DOUTTO helps homeowners compare independent local options for oven and range repair categories. Homeowners remain responsible for verifying provider credentials, quote details, warranties, and availability.'
            },
            tabs: [
                {
                    id: 'heating-issues',
                    label: 'Heating Issues',
                    image: '../assets/images/oven-range-repair.jpg',
                    title: 'Oven heating concerns',
                    text: 'Compare providers for ovens that do not heat, heat slowly, overheat, or stop during cooking cycles.',
                    compare: [
                        'Heating diagnosis process',
                        'Parts availability',
                        'Labor and quote details',
                        'Warranty terms'
                    ]
                },
                {
                    id: 'burners',
                    label: 'Burners',
                    image: '../assets/images/oven-range-repair.jpg',
                    title: 'Range burner problems',
                    text: 'Explore providers for burners that will not light, heat unevenly, click repeatedly, or respond inconsistently.',
                    compare: [
                        'Burner diagnosis approach',
                        'Appliance type experience',
                        'Timing and service area',
                        'Safety-related questions'
                    ]
                },
                {
                    id: 'temperature-control',
                    label: 'Temperature Control',
                    image: '../assets/images/oven-range-repair.jpg',
                    title: 'Temperature control issues',
                    text: 'Review provider options for temperature swings, inaccurate readings, sensor concerns, or inconsistent baking results.',
                    compare: [
                        'Temperature testing process',
                        'Sensor or control board questions',
                        'Quote structure',
                        'Warranty details'
                    ]
                },
                {
                    id: 'ignition',
                    label: 'Ignition',
                    image: '../assets/images/oven-range-repair.jpg',
                    title: 'Ignition concerns',
                    text: 'Compare local options for ignition clicking, delayed lighting, failed ignition, or related range performance concerns.',
                    compare: [
                        'Ignition diagnosis process',
                        'Provider credentials',
                        'Parts discussion',
                        'Availability'
                    ]
                }
            ],
            faqs: [
                {
                    question: 'Does DOUTTO service ovens or ranges directly?',
                    answer: 'No. DOUTTO is an independent matching platform and does not perform oven or range repairs directly.'
                },
                {
                    question: 'What should I compare for oven or range repair?',
                    answer: 'Compare diagnostic fees, safety-related questions, parts, timing, quote details, provider credentials, and warranty terms.'
                },
                {
                    question: 'Can provider options vary by appliance type?',
                    answer: 'Yes. Some providers may focus on certain appliance types, brands, models, or service areas.'
                }
            ]
        }
    ],

    searchItems: [
        {
            title: 'Home',
            type: 'Page',
            href: 'index.html',
            description: 'Compare local appliance repair provider options through DOUTTO.'
        },
        {
            title: 'Services',
            type: 'Page',
            href: 'services.html',
            description: 'Explore appliance repair categories and local provider comparison options.'
        },
        {
            title: 'About',
            type: 'Page',
            href: 'about.html',
            description: 'Learn how DOUTTO works as an independent appliance repair matching platform.'
        },
        {
            title: 'Contact',
            type: 'Page',
            href: 'contact.html',
            description: 'Request provider comparison options or contact DOUTTO.'
        },
        {
            title: 'Refrigerator Repair',
            type: 'Service',
            href: 'refrigerator-repair.html',
            description: 'Compare providers for cooling issues, leaks, noise, and ice maker concerns.'
        },
        {
            title: 'Washer & Dryer Repair',
            type: 'Service',
            href: 'washer-dryer-repair.html',
            description: 'Review providers for drainage, heating, spin cycle, vibration, and noise concerns.'
        },
        {
            title: 'Dishwasher Repair',
            type: 'Service',
            href: 'dishwasher-repair.html',
            description: 'Find providers for leaks, drainage issues, cleaning problems, and error codes.'
        },
        {
            title: 'Oven & Range Repair',
            type: 'Service',
            href: 'oven-range-repair.html',
            description: 'Compare providers for heating, burner, temperature, and ignition concerns.'
        },
        {
            title: 'Privacy Policy',
            type: 'Legal',
            href: 'privacy-policy.html',
            description: 'Review privacy information for DOUTTO.'
        },
        {
            title: 'Cookie Policy',
            type: 'Legal',
            href: 'cookie-policy.html',
            description: 'Learn how cookie preferences work on DOUTTO.'
        },
        {
            title: 'Terms of Service',
            type: 'Legal',
            href: 'terms-of-service.html',
            description: 'Read the terms for using DOUTTO.'
        }
    ],

    issueStrip: [
        {
            label: 'Not Cooling',
            icon: 'refrigerator'
        },
        {
            label: 'Leaking',
            icon: 'droplets'
        },
        {
            label: 'Not Draining',
            icon: 'waves'
        },
        {
            label: 'Not Heating',
            icon: 'sun'
        },
        {
            label: 'Unusual Noise',
            icon: 'volume-2'
        },
        {
            label: 'Error Codes',
            icon: 'badge-alert'
        }
    ],

    comparisonFactors: [
        {
            title: 'Service Area',
            text: 'Provider coverage can vary by city, ZIP code, appliance category, and schedule.',
            icon: 'map-pin'
        },
        {
            title: 'Appliance Expertise',
            text: 'Some providers may focus on certain appliance types, brands, or models.',
            icon: 'wrench'
        },
        {
            title: 'Quote Clarity',
            text: 'Compare diagnostic fees, labor, parts, travel costs, and written estimate details.',
            icon: 'clipboard-check'
        },
        {
            title: 'Availability',
            text: 'Ask about response windows, scheduling options, and same-day availability when relevant.',
            icon: 'calendar-clock'
        },
        {
            title: 'Licensing & Insurance',
            text: 'Homeowners should verify provider credentials and insurance before choosing a company.',
            icon: 'shield-check'
        },
        {
            title: 'Warranty Questions',
            text: 'Ask about parts warranties, labor warranties, exclusions, and follow-up terms.',
            icon: 'badge-check'
        }
    ],

    platformSteps: [
        {
            number: '01',
            title: 'Tell what appliance needs attention',
            text: 'Share the appliance category and the issue you want to compare provider options for.',
            icon: 'message-circle'
        },
        {
            number: '02',
            title: 'Review local provider categories',
            text: 'Explore repair categories and local availability based on the appliance issue.',
            icon: 'clipboard-list'
        },
        {
            number: '03',
            title: 'Compare availability and quote details',
            text: 'Review timing, possible diagnostic fees, service area, and quote information.',
            icon: 'scale'
        },
        {
            number: '04',
            title: 'Choose a provider independently',
            text: 'Select the provider that fits your needs after verifying credentials and details.',
            icon: 'shield-check'
        }
    ],

    legalLinks: [
        {
            label: 'Privacy Policy',
            href: 'privacy-policy.html'
        },
        {
            label: 'Cookie Policy',
            href: 'cookie-policy.html'
        },
        {
            label: 'Terms of Service',
            href: 'terms-of-service.html'
        }
    ],

    socialLinks: [
        {
            label: 'Facebook',
            href: '#',
            icon: 'facebook'
        },
        {
            label: 'X',
            href: '#',
            icon: 'twitter'
        },
        {
            label: 'Instagram',
            href: '#',
            icon: 'instagram'
        }
    ],

    forms: {
        contact: {
            title: 'Request provider comparison options',
            text: 'Share a few details and DOUTTO will help you move toward relevant appliance repair provider options.',
            submitText: 'Request Options',
            successTitle: 'Request received',
            successText: 'Thank you. Your request has been captured for demo purposes. A real implementation would connect this form to a secure backend or CRM.',
            consentText: 'I agree that DOUTTO may use my details to help process my request for appliance repair provider comparison options. I understand DOUTTO does not perform repairs directly.'
        }
    },

    cookieBanner: {
        storageKey: 'doutto_cookie_consent',
        title: 'Cookie preferences',
        text: 'DOUTTO uses cookies and similar technologies to improve site experience and understand visitor interactions. You can accept or decline non-essential cookies.',
        acceptText: 'Accept',
        declineText: 'Decline'
    },

    footerText: 'DOUTTO is an independent appliance repair provider matching platform that helps homeowners compare local repair provider options. DOUTTO does not perform appliance repairs directly and does not employ the providers listed through the platform.',

    disclaimer: 'Disclaimer: This site is a free service to assist homeowners in connecting with local service providers. All contractors/providers are independent and this site does not warrant or guarantee any work performed. It is the responsibility of the homeowner to verify that the hired contractor furnishes the necessary license and insurance required for the work being performed. All persons depicted in a photo or video are actors or models and not contractors listed on this site.',

    pageMeta: {
        'index.html': {
            title: 'DOUTTO | Compare Local Appliance Repair Providers',
            description: 'DOUTTO helps homeowners compare local appliance repair provider options for refrigerators, washers, dryers, dishwashers, ovens, and ranges.'
        },
        'services.html': {
            title: 'Appliance Repair Services | DOUTTO',
            description: 'Explore appliance repair categories and compare local provider options through the DOUTTO matching platform.'
        },
        'about.html': {
            title: 'About DOUTTO | Appliance Repair Provider Matching',
            description: 'Learn how DOUTTO helps homeowners compare independent local appliance repair provider options.'
        },
        'contact.html': {
            title: 'Contact DOUTTO | Request Provider Comparison Options',
            description: 'Contact DOUTTO to request appliance repair provider comparison options in selected USA service areas.'
        },
        'refrigerator-repair.html': {
            title: 'Refrigerator Repair Provider Options | DOUTTO',
            description: 'Compare local refrigerator repair provider options for cooling issues, leaks, noise, and ice maker concerns.'
        },
        'washer-dryer-repair.html': {
            title: 'Washer & Dryer Repair Provider Options | DOUTTO',
            description: 'Review local washer and dryer repair provider options for drainage, heating, spin cycle, vibration, and noise concerns.'
        },
        'dishwasher-repair.html': {
            title: 'Dishwasher Repair Provider Options | DOUTTO',
            description: 'Compare dishwasher repair provider options for leaks, drainage problems, cleaning issues, and error codes.'
        },
        'oven-range-repair.html': {
            title: 'Oven & Range Repair Provider Options | DOUTTO',
            description: 'Compare local oven and range repair provider options for heating, burners, temperature control, and ignition concerns.'
        },
        'privacy-policy.html': {
            title: 'Privacy Policy | DOUTTO',
            description: 'Read the DOUTTO Privacy Policy.'
        },
        'cookie-policy.html': {
            title: 'Cookie Policy | DOUTTO',
            description: 'Read the DOUTTO Cookie Policy.'
        },
        'terms-of-service.html': {
            title: 'Terms of Service | DOUTTO',
            description: 'Read the DOUTTO Terms of Service.'
        }
    }
};