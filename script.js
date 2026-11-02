/* StarnyX public website configuration.
   Add the WhatsApp number in international format without +, spaces or dashes.
   Example format: 91XXXXXXXXXX. Keep empty until the official business number is confirmed.
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

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
    });
  });
}

const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

// Show WhatsApp links only after a real business number has been configured.
const whatsappNumber = String(STARNYX_CONFIG.whatsappNumber || '').replace(/[^0-9]/g, '');
if (whatsappNumber) {
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello StarnyX Technologies, I would like to discuss a project.')}`;
  document.querySelectorAll('.whatsapp-detail, .footer-whatsapp').forEach((element) => {
    element.hidden = false;
  });
  document.querySelectorAll('.whatsapp-link, .footer-whatsapp').forEach((link) => {
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
}

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
    const message = String(formData.get('message') || '').trim();

    const subject = `Project enquiry from ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Service: ${service}`,
      '',
      'Project details:',
      message
    ].join('\n');

    const mailto = `mailto:${STARNYX_CONFIG.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (formNote) formNote.textContent = 'Your email app should open with the enquiry prepared. Please review and send the email to submit it.';
    window.location.href = mailto;
  });
}
