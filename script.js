/* StarnyX Technologies — public website interactions.
   WhatsApp is the public contact channel. Discord webhook secrets stay on Vercel server-side.
*/
const STARNYX_CONFIG = Object.freeze({
  whatsappNumber: '917385585398',
  businessName: 'StarnyX Technologies',
  offerCode: 'DIWALI25'
});

const waBase = `https://wa.me/${STARNYX_CONFIG.whatsappNumber}`;
const buildWhatsAppUrl = (message) => `${waBase}?text=${encodeURIComponent(message)}`;

// Mobile navigation.
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });
  navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
  }));
}

// Public platform status notice — shared across all pages.
function createPlatformNotice() {
  const header = document.querySelector('.site-header');
  if (!header || document.querySelector('.platform-notice')) return;
  const notice = document.createElement('aside');
  notice.className = 'platform-notice';
  notice.setAttribute('aria-label', 'Platform update');
  notice.innerHTML = `
    <div class="platform-notice-inner container">
      <span class="platform-notice-label"><i aria-hidden="true"></i> PLATFORM UPDATE</span>
      <p>You’re visiting our secondary public platform. The main StarnyX business application is currently under construction.</p>
      <a href="https://wa.me/${STARNYX_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello StarnyX Technologies, I would like to know more about your services.') }" target="_blank" rel="noopener noreferrer">Talk to us <span aria-hidden="true">↗</span></a>
    </div>`;
  header.insertAdjacentElement('afterend', notice);
}
createPlatformNotice();

// Current year and active navigation state.
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
const currentFile = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
document.querySelectorAll('.nav-links a[href]').forEach((link) => {
  const target = link.getAttribute('href').split('?')[0].split('#')[0].toLowerCase();
  if (target === currentFile) link.setAttribute('aria-current', 'page');
});

// WhatsApp direct contact links.
const defaultWhatsAppMessage = 'Hello StarnyX Technologies, I would like to discuss a digital project.';
document.querySelectorAll('.whatsapp-link, .footer-whatsapp, .whatsapp-float, [data-whatsapp]').forEach((link) => {
  if (!link.getAttribute('href') || link.getAttribute('href') === '#') {
    link.href = buildWhatsAppUrl(defaultWhatsAppMessage);
  }
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  if (link.classList.contains('whatsapp-float')) link.hidden = false;
});

// Read service selection from links such as quote.html?service=Website%20Development.
const params = new URLSearchParams(window.location.search);
const quoteService = document.getElementById('quote-service');
if (quoteService && params.has('service')) {
  const requested = params.get('service');
  const option = [...quoteService.options].find((item) => item.value === requested || item.text === requested);
  if (option) quoteService.value = option.value || option.text;
}

// Public enquiry: open WhatsApp for the visitor and notify the private Discord channel via Vercel.
const contactForm = document.getElementById('contact-form');
const formNote = document.getElementById('form-note');
if (contactForm) {
  const startedAt = Date.now();
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const enquiry = {
      name: String(formData.get('name') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      service: String(formData.get('service') || 'Not sure yet').trim(),
      budget: String(formData.get('budget') || 'Not specified').trim(),
      message: String(formData.get('message') || '').trim(),
      company_website: String(formData.get('company_website') || ''),
      source: currentFile
    };

    if (!enquiry.name || enquiry.message.length < 8) {
      if (formNote) formNote.textContent = 'Please add your name and a little more detail about your project.';
      return;
    }
    if (Date.now() - startedAt < 900) {
      if (formNote) formNote.textContent = 'Please review your details before submitting.';
      return;
    }

    const whatsappMessage = [
      `Hello ${STARNYX_CONFIG.businessName}, I would like to request a project quotation.`,
      '',
      `Name: ${enquiry.name}`,
      enquiry.phone ? `My WhatsApp: ${enquiry.phone}` : '',
      `Service: ${enquiry.service}`,
      `Budget: ${enquiry.budget}`,
      '',
      'Project details:',
      enquiry.message,
      '',
      `Offer code: ${STARNYX_CONFIG.offerCode} (if eligible)`
    ].filter(Boolean).join('\n');

    const whatsappUrl = buildWhatsAppUrl(whatsappMessage);
    // Reserve a tab synchronously during the user gesture. If popups are blocked,
    // wait for the Discord request before navigating this page to WhatsApp.
    const whatsappWindow = window.open('about:blank', '_blank');
    if (whatsappWindow) {
      whatsappWindow.opener = null;
      whatsappWindow.location.href = whatsappUrl;
    }

    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton) submitButton.disabled = true;
    let discordStatus = 'UNREACHABLE';
    try {
      const response = await fetch('/api/discord', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiry)
      });
      const result = await response.json().catch(() => ({}));
      discordStatus = result.code || (response.ok ? 'UNKNOWN' : 'DELIVERY_FAILED');
    } catch {
      discordStatus = 'UNREACHABLE';
    } finally {
      if (submitButton) submitButton.disabled = false;
    }

    if (formNote) {
      const whatsappInstruction = 'WhatsApp is ready with your enquiry. Review the message and tap Send to submit it.';
      if (discordStatus === 'DISPATCHED') {
        formNote.textContent = `${whatsappInstruction} A private Discord notification was delivered.`;
      } else if (discordStatus === 'NOT_CONFIGURED') {
        formNote.textContent = `${whatsappInstruction} Discord notifications are not configured yet.`;
      } else if (discordStatus === 'ORIGIN_NOT_ALLOWED') {
        formNote.textContent = `${whatsappInstruction} The current website origin is not allowed by the Discord endpoint configuration.`;
      } else {
        formNote.textContent = `${whatsappInstruction} Discord notification could not be delivered; continue through WhatsApp.`;
      }
    }
    if (!whatsappWindow) window.location.assign(whatsappUrl);
  });
}

// Small rule-based StarnyX guide. It uses local JavaScript only; no AI API or private data.
const botKnowledge = [
  { keys: ['website', 'web development', 'landing page', 'business website'], title: 'Website Development', text: 'We can help with company websites, landing pages, service catalogues, portfolio sites and responsive marketing pages. A typical delivery can include page structure, visual design, mobile layouts, enquiry journeys, metadata and deployment preparation.', link: 'services.html' },
  { keys: ['web app', 'web application', 'saas', 'dashboard', 'portal', 'admin panel'], title: 'Web Applications & SaaS', text: 'We can scope customer portals, admin dashboards, booking flows, internal tools, user workflows and API/database integrations. The architecture and milestones are defined around your requirements.', link: 'services.html#service-details' },
  { keys: ['mobile', 'android', 'ios', 'app development', 'mobile app'], title: 'Mobile App Development', text: 'We can discuss iOS and Android app planning, cross-platform implementation where suitable, onboarding, API-connected screens, notifications and release preparation.', link: 'services.html#service-details' },
  { keys: ['ui', 'ux', 'design', 'prototype', 'wireframe'], title: 'UI/UX Design', text: 'Our design scope can include user flows, information architecture, wireframes, high-fidelity screens, interactive prototypes, reusable design systems and developer handoff.', link: 'services.html#service-details' },
  { keys: ['cloud', 'devops', 'hosting', 'deployment', 'domain', 'vercel'], title: 'Cloud & DevOps', text: 'We can help plan hosting and deployment, Vercel configuration, domain/DNS and SSL setup, environment configuration, release workflows and monitoring foundations.', link: 'services.html#service-details' },
  { keys: ['automation', 'integration', 'api', 'webhook', 'discord'], title: 'Automation & Integrations', text: 'We can discuss API connections, webhook alerts, data synchronisation, tool integrations and automation of repetitive business workflows.', link: 'services.html#service-details' },
  { keys: ['price', 'pricing', 'cost', 'budget', 'quote'], title: 'Pricing & Quotations', text: 'We do not publish made-up fixed prices. Share your requirements and preferred budget; StarnyX will review the scope and discuss a written quotation before work begins.', link: 'pricing.html' },
  { keys: ['diwali', 'offer', 'discount', 'diwali25', '25%'], title: 'Diwali Special — DIWALI25', text: 'The Diwali special offers up to 25% off selected StarnyX service fees. Eligibility and the final discount depend on project scope and availability. Third-party charges are excluded unless confirmed in writing.', link: 'offers.html' },
  { keys: ['process', 'how does it work', 'steps', 'start'], title: 'How a project starts', text: 'We start with a WhatsApp discussion, clarify goals and requirements, prepare a written scope and quotation, agree milestones, then move into design, build, review and launch.', link: 'about.html' },
  { keys: ['contact', 'whatsapp', 'talk', 'human', 'person'], title: 'Talk to StarnyX', text: 'You can contact the StarnyX team directly on WhatsApp at +91 73855 85398. Share your service area and a short project brief to get started.', action: 'whatsapp' }
];

function addBotMessage(container, text, type = 'bot') {
  const message = document.createElement('div');
  message.className = `guide-message guide-message-${type}`;
  message.textContent = text;
  container.appendChild(message);
  container.scrollTop = container.scrollHeight;
}

function createGuideBot() {
  if (document.querySelector('.guide-widget')) return;
  const widget = document.createElement('div');
  widget.className = 'guide-widget';
  widget.innerHTML = `
    <button class="guide-launcher" type="button" aria-label="Open StarnyX guide" aria-expanded="false"><span class="guide-launcher-icon">✦</span><span>Ask StarnyX</span><i class="guide-online-dot"></i></button>
    <section class="guide-panel" aria-label="StarnyX website guide" hidden>
      <div class="guide-panel-head"><div class="guide-avatar">S<span>✦</span></div><div><strong>StarnyX Guide</strong><small><i></i> Quick website assistant</small></div><button type="button" class="guide-close" aria-label="Close guide">×</button></div>
      <div class="guide-messages" aria-live="polite" aria-relevant="additions" role="log"><div class="guide-message guide-message-bot">Hi there! 👋 Welcome to StarnyX Technologies. I’m the website guide. You can ask me about our services, pricing, projects, offers or how to contact us. How can I help?</div></div>
      <div class="guide-quick-actions"><button type="button" data-guide-query="Hello">Hello</button><button type="button" data-guide-query="What services do you offer?">Our services</button><button type="button" data-guide-query="Tell me about pricing">Pricing</button><button type="button" data-guide-query="How can I contact you?">WhatsApp</button></div>
      <form class="guide-form"><label class="sr-only" for="guide-input">Ask a question</label><input id="guide-input" name="question" maxlength="300" autocomplete="off" placeholder="Ask about a service…" required><button type="submit" aria-label="Send message">↑</button></form>
      <div class="guide-disclaimer">Rule-based guide · No AI · No account data</div>
    </section>`;
  document.body.appendChild(widget);

  const launcher = widget.querySelector('.guide-launcher');
  const panel = widget.querySelector('.guide-panel');
  const close = widget.querySelector('.guide-close');
  const messages = widget.querySelector('.guide-messages');
  const form = widget.querySelector('.guide-form');
  const input = widget.querySelector('#guide-input');
  const toggle = (open) => {
    panel.hidden = !open;
    launcher.setAttribute('aria-expanded', String(open));
    if (open) input.focus();
  };
  launcher.addEventListener('click', () => toggle(panel.hidden));
  close.addEventListener('click', () => toggle(false));

  const answer = (question) => {
    const normalized = question.toLowerCase().trim().replace(/[.!?,]+$/g, '').replace(/\s+/g, ' ');
    const exact = (patterns) => patterns.some((pattern) => pattern.test(normalized));

    // Friendly everyday conversation, handled locally without an AI service.
    if (exact([/^(hi+|hii+|hello+|hey+|heyy+|namaste|hola)(\s+(there|bro|team|starnyx))?$/, /^(good morning|good afternoon|good evening|good night)(\s+(bro|team))?$/])) {
      addBotMessage(messages, 'Hello! 👋 Great to meet you. I can guide you through StarnyX services, pricing, project enquiries and the next steps. What would you like to explore?');
      return;
    }
    if (exact([/^(how are you|how r you|how are u|how are things)$/])) {
      addBotMessage(messages, 'I’m doing great and ready to help! 😊 Tell me what you are planning to build, or ask me about any StarnyX service.');
      return;
    }
    if (exact([/^(thanks|thank you|thankyou|thx|many thanks|okay thanks|ok thanks)(\s+(bro|a lot))?$/])) {
      addBotMessage(messages, 'You’re very welcome! 💙 Whenever you’re ready, share your project idea. I can help you find the right service or connect you with the StarnyX team on WhatsApp.');
      return;
    }
    if (exact([/^(bye|goodbye|see you|see ya|tata)(\s+(bro|team))?$/])) {
      addBotMessage(messages, 'Goodbye! 👋 Thanks for visiting StarnyX Technologies. Have a great day — we’ll be here when you’re ready to build something.');
      return;
    }
    if (exact([/^(help|what can you do|what can i ask|menu|help me)$/])) {
      addBotMessage(messages, 'I can help with website development, web applications, mobile apps, UI/UX design, cloud and deployment, automation, pricing, the current offer and WhatsApp enquiries. Try asking “What services do you offer?”');
      return;
    }
    if (exact([/^(who are you|what is your name|your name)$/])) {
      addBotMessage(messages, 'I’m the StarnyX Guide — a simple website assistant for StarnyX Technologies. I can answer basic questions about our public services and guide you to the right page.');
      return;
    }
    if (exact([/^(what is starnyx|tell me about starnyx|about starnyx|what do you do)$/])) {
      addBotMessage(messages, 'StarnyX Technologies is focused on digital solutions such as websites, web applications, mobile experiences, UI/UX design and technology integrations. Explore our About and Services pages to learn more.');
      const link = document.createElement('a');
      link.className = 'guide-result-link';
      link.href = 'about.html';
      link.textContent = 'About StarnyX ↗';
      messages.appendChild(link);
      return;
    }
    if (exact([/^(is the app ready|where is the app|main app status|website application status|is your platform ready)$/])) {
      addBotMessage(messages, 'You are visiting our secondary public information platform. The main StarnyX business application is currently under construction. For current service and project enquiries, please contact our team on WhatsApp.');
      return;
    }

    if (exact([/^(services|service|what services|what services do you offer|which services do you offer|service list)$/])) {
      addBotMessage(messages, 'We can discuss website development, web applications and SaaS, mobile app development, UI/UX design, cloud and DevOps, and automation or API integrations. Tell me what you want to build and I can guide you to the right service.');
      const link = document.createElement('a');
      link.className = 'guide-result-link';
      link.href = 'services.html';
      link.textContent = 'Explore all services ↗';
      messages.appendChild(link);
      return;
    }
    if (exact([/^(ok|okay|ok bro|nice|great|cool|understood)$/])) {
      addBotMessage(messages, 'Glad I could help! 😊 You can ask another question or start a project conversation with us on WhatsApp.');
      return;
    }

    const match = botKnowledge.find((entry) => entry.keys.some((key) => normalized.includes(key)));
    if (!match) {
      addBotMessage(messages, 'I can help with websites, web apps, mobile apps, UI/UX, cloud deployment, automation, pricing and the Diwali offer. Choose a topic above or contact our team on WhatsApp for a specific requirement.');
      return;
    }
    addBotMessage(messages, match.text);
    if (match.link) {
      const link = document.createElement('a');
      link.className = 'guide-result-link';
      link.href = match.link;
      link.textContent = `Explore ${match.title} ↗`;
      messages.appendChild(link);
    }
    if (match.action === 'whatsapp') {
      const link = document.createElement('a');
      link.className = 'guide-result-link';
      link.href = buildWhatsAppUrl(`Hello StarnyX Technologies, I would like to discuss a project. My question: ${question}`);
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'Open WhatsApp chat ↗';
      messages.appendChild(link);
    }
    messages.scrollTop = messages.scrollHeight;
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) return;
    addBotMessage(messages, question, 'user');
    input.value = '';
    answer(question);
  });
  widget.querySelectorAll('[data-guide-query]').forEach((button) => {
    button.addEventListener('click', () => {
      const question = button.dataset.guideQuery;
      addBotMessage(messages, question, 'user');
      answer(question);
    });
  });
}
createGuideBot();

// Diwali offer-code helper.
document.querySelectorAll('[data-copy-code]').forEach((button) => {
  button.addEventListener('click', async () => {
    const code = button.getAttribute('data-copy-code') || STARNYX_CONFIG.offerCode;
    try {
      await navigator.clipboard.writeText(code);
      button.textContent = 'Copied ✓';
    } catch {
      button.textContent = code;
    }
  });
});
