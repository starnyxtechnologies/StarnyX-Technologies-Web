/* StarnyX Technologies — public website configuration.
   Set the official WhatsApp number in international digits-only format when confirmed.
*/
const STARNYX_CONFIG = {
  whatsappNumber: "",
  contactEmail: "starnyxtechnologies@gmail.com"
};

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

const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

// Mark the current top-level page in the shared navigation.
const currentFile = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
document.querySelectorAll('.nav-links a[href]').forEach((link) => {
  const target = link.getAttribute('href').split('?')[0].split('#')[0].toLowerCase();
  if (target === currentFile) link.setAttribute('aria-current', 'page');
});

// Enable WhatsApp only after an official number is configured.
const whatsappNumber = String(STARNYX_CONFIG.whatsappNumber || '').replace(/[^0-9]/g, '');
if (whatsappNumber) {
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello StarnyX Technologies, I would like to discuss a project.')}`;
  document.querySelectorAll('.whatsapp-detail, .footer-whatsapp, .whatsapp-float').forEach((element) => { element.hidden = false; });
  document.querySelectorAll('.whatsapp-link, .footer-whatsapp, .whatsapp-float').forEach((link) => {
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
}

// Prefill quote service/engagement from internal CTA query parameters.
const params = new URLSearchParams(window.location.search);
const quoteService = document.getElementById('quote-service');
if (quoteService && params.has('service')) {
  const requested = params.get('service');
  const option = [...quoteService.options].find((item) => item.value === requested || item.text === requested);
  if (option) quoteService.value = option.value || option.text;
}

// Static Phase 1 enquiry handling: open the visitor's email app, with no server storage.
const contactForm = document.getElementById('contact-form');
const formNote = document.getElementById('form-note');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const service = String(formData.get('service') || 'Not sure yet').trim();
    const budget = String(formData.get('budget') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const subject = `Project enquiry from ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Service: ${service}`,
      budget ? `Indicative budget: ${budget}` : '',
      '',
      'Project details:',
      message
    ].filter((line, index, all) => !(line === '' && all[index - 1] === '')).join('\n');
    const mailto = `mailto:${STARNYX_CONFIG.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (formNote) formNote.textContent = 'Your email app should open with the enquiry prepared. Review the details and send the email to submit it.';
    window.location.href = mailto;
  });
}
