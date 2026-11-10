/* StarnyX website interactions. No third-party JS or tracking. */
(() => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];

  // Accessible mobile navigation
  const menuButton = $('.menu-toggle');
  const nav = $('.nav-links');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('menu-open', open);
    });
    $$('a', nav).forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        nav.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      }
    });
  }

  // Footer year
  const year = $('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  // Reveal content without a continuous animation loop
  const revealNodes = $$('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.08});
    revealNodes.forEach(node => observer.observe(node));
  } else revealNodes.forEach(node => node.classList.add('is-visible'));

  // FAQ accordions
  $$('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const answer = button.parentElement.querySelector('.faq-answer');
      const isOpen = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isOpen));
      answer.hidden = isOpen;
      const sign = button.querySelector('[data-sign]');
      if (sign) sign.textContent = isOpen ? '+' : '−';
    });
  });

  // Enquiry forms open a prepared WhatsApp message; nothing is silently submitted.
  $$('[data-whatsapp-form]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const lines = [
        'Hello StarnyX Technologies,',
        '',
        'I would like to discuss a project.',
        ...[...data.entries()].map(([key, value]) => `${key.replaceAll('_',' ')}: ${String(value).trim()}`).filter(line => !line.endsWith(': ')),
        '',
        'Please let me know the next steps.'
      ];
      const url = `https://wa.me/917385585398?text=${encodeURIComponent(lines.join('\n'))}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      const status = $('[data-form-status]', form);
      if (status) status.textContent = 'WhatsApp opened with your project brief. Review the message and press Send in WhatsApp.';
      form.reset();
    });
  });

  // Tejas: simple, rule-based website assistant. No external AI API.
  const launcher = $('.tejas-launcher');
  const panel = $('.tejas-panel');
  const close = $('.tejas-close');
  const form = $('.tejas-form');
  const input = $('.tejas-input');
  const messages = $('.tejas-messages');
  const quick = $$('.tejas-quick button');
  const addMessage = (text, type='bot') => {
    if (!messages) return;
    const bubble = document.createElement('div');
    bubble.className = `tejas-message ${type === 'user' ? 'user' : ''}`;
    bubble.textContent = text;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
  };
  const answer = (raw) => {
    const q = raw.toLowerCase();
    if (/\b(hi|hello|hey|namaste|good morning|good evening)\b/.test(q)) return 'Hello! Welcome to StarnyX. I am Tejas, the website assistant. Tell me what you would like to build.';
    if (/price|cost|budget|quote|rate|charge/.test(q)) return 'Every project is scoped around its features, design and delivery needs. We do not use one fixed price for every build. Please use the Get a Quote page to share your brief.';
    if (/website|web site|landing page/.test(q)) return 'We plan and build responsive business websites, service websites, landing pages and e-commerce experiences. Our focus is clarity, speed, accessibility and easy content journeys.';
    if (/web app|application|dashboard|portal|saas/.test(q)) return 'We design and develop web applications such as customer portals, dashboards, booking flows and workflow tools. The right scope starts with your users and business process.';
    if (/mobile|android|ios|app/.test(q)) return 'We can help plan mobile app experiences for Android and iOS, including UX flows, interface design and development planning. Share your app idea and target users.';
    if (/design|ui|ux|brand|interface/.test(q)) return 'Our UI/UX work includes discovery, user journeys, wireframes, interface systems, responsive layouts and handoff-ready design.';
    if (/automation|cloud|integrat|api/.test(q)) return 'We help connect tools and streamline repeatable workflows with practical automation, API integration and cloud-aware engineering.';
    if (/demo|hotel|lodge|showcase/.test(q)) return 'You can view our live Hotel website demo on the Demos page. Other industry demos are being prepared separately.';
    if (/time|timeline|how long|delivery/.test(q)) return 'Timelines depend on scope, content readiness, integrations and review cycles. We confirm a practical delivery plan after understanding your requirements.';
    if (/contact|talk|human|whatsapp|team/.test(q)) return 'You can talk to the StarnyX team on WhatsApp using the green button, or open the Contact page. A person will confirm the details with you.';
    if (/thank/.test(q)) return 'You are welcome! Happy to help. Share your idea whenever you are ready.';
    return 'Thanks for sharing. I can help with websites, web applications, mobile apps, UI/UX and automation. Try asking about a service, pricing, timeline or demos—or send your brief through Get a Quote.';
  };
  const setPanel = open => {
    if (!panel || !launcher) return;
    panel.classList.toggle('is-open', open);
    panel.setAttribute('aria-hidden', String(!open));
    launcher.setAttribute('aria-expanded', String(open));
    if (open && input) input.focus();
  };
  launcher?.addEventListener('click', () => setPanel(!panel.classList.contains('is-open')));
  close?.addEventListener('click', () => setPanel(false));
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const value = input?.value.trim();
    if (!value) return;
    addMessage(value, 'user');
    addMessage(answer(value));
    input.value = '';
  });
  quick.forEach(button => button.addEventListener('click', () => {
    const value = button.textContent.trim();
    addMessage(value, 'user');
    addMessage(answer(value));
  }));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setPanel(false); });

  // Back to top
  const topButton = $('.back-top');
  if (topButton) {
    window.addEventListener('scroll', () => topButton.classList.toggle('visible', window.scrollY > 500), {passive:true});
    topButton.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
  }
})();
