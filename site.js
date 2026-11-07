(() => {
  'use strict';
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open menu');
    }));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        nav.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  // Prefill a selected service when a visitor follows a service-specific quote link.
  const serviceFromUrl = new URLSearchParams(window.location.search).get('service');
  if (serviceFromUrl) {
    const select = document.querySelector('select[name="service"]');
    const map = {
      website: 'Website development', 'web-app': 'Web application / SaaS',
      'mobile-app': 'Mobile application', 'ui-ux': 'UI/UX design',
      'cloud-devops': 'Cloud & DevOps', automation: 'Automation & integrations'
    };
    if (select && map[serviceFromUrl]) select.value = map[serviceFromUrl];
  }

  const encode = (value) => String(value || '').trim();
  document.querySelectorAll('[data-enquiry-form]').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const payload = {
        name: encode(data.get('name')),
        phone: encode(data.get('phone')),
        service: encode(data.get('service')) || 'General enquiry',
        budget: encode(data.get('budget')) || 'Not specified',
        message: encode(data.get('message')),
        source: form.dataset.source || 'Public website',
        company_website: encode(data.get('company_website'))
      };
      // Quietly discard bot submissions that populate the hidden honeypot field.
      if (payload.company_website) {
        const status = form.querySelector('.form-status');
        if (status) status.textContent = 'Thank you. Your enquiry has been received.';
        form.reset();
        return;
      }
      const message = [
        'Hello StarnyX Technologies, I would like to discuss a project.',
        '', `Name: ${payload.name}`,
        `WhatsApp: ${payload.phone || 'Not provided'}`,
        `Service: ${payload.service}`,
        `Budget: ${payload.budget}`,
        `Source: ${payload.source}`,
        '', 'Project details:', payload.message
      ].join('\n');
      const whatsappUrl = `https://wa.me/917385585398?text=${encodeURIComponent(message)}`;
      const status = form.querySelector('.form-status');
      const submit = form.querySelector('button[type="submit"]');
      if (submit) { submit.disabled = true; submit.dataset.original = submit.innerHTML; submit.innerHTML = 'Preparing message…'; }
      // Open WhatsApp synchronously in the user gesture so popup blockers do not suppress it.
      const waLink = document.createElement('a');
      waLink.href = whatsappUrl;
      waLink.target = '_blank';
      waLink.rel = 'noopener noreferrer';
      waLink.style.display = 'none';
      document.body.appendChild(waLink);
      waLink.click();
      waLink.remove();
      if (status) status.textContent = 'Your WhatsApp message is ready. Review the details and press Send in WhatsApp.';
      try {
        const response = await fetch('/api/enquiry', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload), credentials: 'same-origin'
        });
        const result = await response.json().catch(() => ({}));
        if (status && response.ok && result.code === 'DISPATCHED') {
          status.textContent = 'WhatsApp is ready. Your private enquiry notification was also delivered.';
        } else if (status && result.code === 'NOT_CONFIGURED') {
          status.textContent = 'WhatsApp is ready. The private notification channel is not configured yet.';
        } else if (status && result.code === 'DELIVERY_FAILED') {
          status.textContent = 'WhatsApp is ready. The private notification could not be delivered; please send the WhatsApp message.';
        }
      } catch (_) {
        if (status) status.textContent = 'WhatsApp is ready. Please review the message and press Send there.';
      } finally {
        if (submit) { submit.disabled = false; submit.innerHTML = submit.dataset.original || 'Send enquiry'; }
      }
    });
  });
})();
