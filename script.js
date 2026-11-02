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
  notice.className = 'platform-notice diwali-platform-notice';
  notice.setAttribute('aria-label', 'Diwali celebration and platform update');
  notice.innerHTML = `
    <div class="platform-notice-inner container">
      <span class="platform-notice-label"><i aria-hidden="true"></i> HAPPY DIWALI · STARNYX</span>
      <p>Make your Diwali brighter with digital solutions. Our main StarnyX business application is currently under construction.</p>
      <a href="offers.html">Explore offer <span aria-hidden="true">✦</span></a>
    </div>`;
  header.insertAdjacentElement('afterend', notice);
}
createPlatformNotice();

// Diwali night-sky animation: lightweight canvas fireworks behind each page hero.
// It uses no external images or APIs and respects reduced-motion preferences.
function initDiwaliNightSky() {
  document.body.classList.add('diwali-festival-mode');
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const skySections = document.querySelectorAll('.hero, .page-hero, .error-page');

  skySections.forEach((section) => {
    if (section.querySelector('.diwali-fireworks')) return;
    section.classList.add('diwali-sky-section');

    const canvas = document.createElement('canvas');
    canvas.className = 'diwali-fireworks';
    canvas.setAttribute('aria-hidden', 'true');
    section.insertBefore(canvas, section.firstChild);

    const lights = document.createElement('div');
    lights.className = 'diwali-sky-lights';
    lights.setAttribute('aria-hidden', 'true');
    section.appendChild(lights);

    const diyaRow = document.createElement('div');
    diyaRow.className = 'diwali-diya-row';
    diyaRow.setAttribute('aria-hidden', 'true');
    diyaRow.innerHTML = '<span class="diwali-diya"><i></i></span><span class="diwali-diya"><i></i></span><span class="diwali-diya"><i></i></span><span class="diwali-diya"><i></i></span><span class="diwali-diya"><i></i></span><span class="diwali-diya"><i></i></span>';
    section.appendChild(diyaRow);

    if (reduceMotion) {
      section.classList.add('diwali-static-sky');
      return;
    }

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    let width = 0, height = 0, dpr = 1, raf = 0, lastLaunch = 0;
    let rockets = [];
    let particles = [];
    let active = true;
    const palette = ['#ffd166', '#ff9f43', '#ff6b6b', '#7de7f5', '#fff2bd', '#ff83b8', '#b9a1ff', '#ffcf83'];
    const rand = (min, max) => Math.random() * (max - min) + min;

    const resize = () => {
      const rect = section.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const burst = (x, y, color) => {
      const count = Math.round(rand(58, 78));
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + rand(-0.06, 0.06);
        const speed = rand(1.6, 4.4);
        particles.push({ x, y, px: x, py: y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: rand(42, 78), max: 78, size: rand(1.5, 3.1), color: Math.random() > .82 ? palette[Math.floor(rand(0, palette.length))] : color });
      }
    };

    const launch = () => {
      const x = rand(width * 0.12, width * 0.88);
      const targetY = rand(height * 0.10, height * 0.48);
      const color = palette[Math.floor(rand(0, palette.length))];
      rockets.push({ x, y: height + 4, px: x, py: height + 4, targetY, vy: rand(-6.2, -8.1), color });
    };

    const draw = (time) => {
      if (!active) return;
      ctx.clearRect(0, 0, width, height);
      if (time - lastLaunch > rand(720, 1250) && rockets.length < 4) {
        launch();
        lastLaunch = time;
      }

      rockets = rockets.filter((rocket) => {
        rocket.px = rocket.x; rocket.py = rocket.y;
        rocket.y += rocket.vy;
        rocket.vy += 0.045;
        ctx.globalAlpha = 0.8;
        ctx.strokeStyle = rocket.color;
        ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(rocket.px, rocket.py); ctx.lineTo(rocket.x, rocket.y); ctx.stroke();
        if (rocket.y <= rocket.targetY || rocket.vy >= -1) {
          burst(rocket.x, rocket.y, rocket.color);
          return false;
        }
        return true;
      });

      particles = particles.filter((particle) => {
        particle.px = particle.x; particle.py = particle.y;
        particle.x += particle.vx; particle.y += particle.vy;
        particle.vx *= 0.986; particle.vy = particle.vy * 0.986 + 0.035;
        particle.life -= 1;
        const alpha = Math.max(0, particle.life / particle.max);
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = particle.size;
        ctx.beginPath(); ctx.moveTo(particle.px, particle.py); ctx.lineTo(particle.x, particle.y); ctx.stroke();
        return particle.life > 0;
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver((entries) => {
      active = entries[0]?.isIntersecting ?? true;
      if (active && !raf) raf = requestAnimationFrame(draw);
      if (!active && raf) { cancelAnimationFrame(raf); raf = 0; }
    }, { threshold: 0.02 });
    observer.observe(section);
    resize();
    window.addEventListener('resize', resize, { passive: true });
    if (active) raf = requestAnimationFrame(draw);
  });
}
initDiwaliNightSky();


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

// Tejas is a friendly, local JavaScript guide. It uses intent matching and curated replies only — no AI API and no private data.
const botKnowledge = [
  { keys: ['website', 'web development', 'landing page', 'business website', 'company website'], title: 'Website Development', text: 'Absolutely! ✨ StarnyX can help with a professional business website, landing page, service catalogue or portfolio. A website project can include page planning, custom UI design, responsive development, enquiry buttons, SEO foundations and deployment guidance.', link: 'services.html' },
  { keys: ['web app', 'web application', 'saas', 'dashboard', 'portal', 'admin panel', 'business application'], title: 'Web Applications & SaaS', text: 'A web application can bring your business workflow online. We can discuss customer portals, admin dashboards, booking systems, user accounts, database-backed tools and API integrations. We first understand the workflow, then propose a practical scope.', link: 'services.html#service-details' },
  { keys: ['mobile', 'android', 'ios', 'app development', 'mobile app', 'phone app'], title: 'Mobile App Development', text: 'Planning a mobile app? 📱 We can discuss Android and iOS experiences, onboarding, app screens, API connections, notifications and release preparation. Tell us the idea and who will use the app.', link: 'services.html#service-details' },
  { keys: ['ui ux', 'ui/ux', 'design', 'prototype', 'wireframe', 'interface'], title: 'UI/UX Design', text: 'Good design makes a product feel simple. Our UI/UX scope can include user flows, wireframes, high-fidelity screens, prototypes, responsive layouts, reusable design systems and developer handoff.', link: 'services.html#service-details' },
  { keys: ['cloud', 'devops', 'hosting', 'deployment', 'domain', 'vercel', 'dns', 'ssl'], title: 'Cloud & DevOps', text: 'We can help plan hosting and deployment, Vercel setup, domain and DNS configuration, SSL, environment configuration, release workflows and monitoring foundations. Provider charges are separate unless included in a written quote.', link: 'services.html#service-details' },
  { keys: ['automation', 'integration', 'api', 'webhook', 'discord', 'workflow'], title: 'Automation & Integrations', text: 'We can discuss API integrations, webhook alerts, Discord notifications, data synchronisation and automation of repetitive business workflows. We will first map the tools and events that need to connect.', link: 'services.html#service-details' },
  { keys: ['price', 'pricing', 'cost', 'budget', 'quote', 'quotation', 'how much'], title: 'Pricing & Quotations', text: 'Every project has a different scope, so we do not show made-up fixed prices. Share your requirements and approximate budget. The StarnyX team can review them and discuss a written quotation before any work starts.', link: 'pricing.html' },
  { keys: ['diwali', 'offer', 'discount', 'diwali25', '25%', 'festive'], title: 'Diwali Special — DIWALI25', text: '🪔 Happy Diwali! Our festive offer is up to 25% off selected StarnyX service fees. The final discount depends on the service, approved scope and eligibility. Hosting, licences and third-party charges are excluded unless your written quotation says otherwise. Offer code: DIWALI25.', link: 'offers.html' },
  { keys: ['process', 'how does it work', 'steps', 'start a project', 'begin'], title: 'How a project starts', text: 'Here is the simple journey: 1) Tell us your idea on WhatsApp. 2) We clarify goals and requirements. 3) We prepare a written scope and quotation. 4) We agree milestones. 5) Design, development, review and launch follow the agreed plan.', link: 'about.html' },
  { keys: ['contact', 'whatsapp', 'talk', 'human', 'person', 'call', 'team'], title: 'Talk to StarnyX', text: 'You can speak with the StarnyX team on WhatsApp at +91 73855 85398. Share the service you are interested in and a short project brief. I can prepare the WhatsApp message for you.', action: 'whatsapp' }
];

function addBotMessage(container, text, type = 'bot') {
  const message = document.createElement('div');
  message.className = `guide-message guide-message-${type}`;
  message.textContent = text;
  container.appendChild(message);
  container.scrollTop = container.scrollHeight;
}

function addBotLink(container, href, label) {
  const link = document.createElement('a');
  link.className = 'guide-result-link';
  link.href = href;
  link.textContent = label;
  if (/^https?:/i.test(href)) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
  container.appendChild(link);
  container.scrollTop = container.scrollHeight;
}

function createGuideBot() {
  if (document.querySelector('.guide-widget')) return;
  const personIcon = `<svg viewBox="0 0 48 48" role="img" aria-label="Tejas assistant"><defs><linearGradient id="tejasKurta" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff1bf"/><stop offset="1" stop-color="#d9873c"/></linearGradient></defs><path d="M7 47c1-10 7-15 17-15s16 5 17 15" fill="url(#tejasKurta)"/><path d="M13 17c0-10 5-14 12-14s12 5 12 14v6c0 8-5 13-12 13s-12-5-12-13z" fill="#9b5638"/><path d="M12 17c0-10 6-14 13-14 6 0 11 4 12 11-4-2-8-4-13-4-4 0-8 2-12 7z" fill="#24172a"/><path d="M14 21c2-3 5-4 10-4s9 2 11 5v5c-1 7-6 11-12 11-6 0-10-5-10-12z" fill="#d9976f"/><path d="M18 24h3m7 0h3" stroke="#50302b" stroke-width="1.8" stroke-linecap="round"/><path d="M21 31q3 2 6 0" stroke="#8d4537" stroke-width="1.5" fill="none" stroke-linecap="round"/><path class="tejas-tilak" d="M24 19l2 5h-4z"/><path d="M10 47l4-12 10 5 10-5 4 12" fill="url(#tejasKurta)" stroke="#ffe7a5" stroke-width="1"/></svg>`;
  const widget = document.createElement('div');
  widget.className = 'guide-widget';
  widget.innerHTML = `
    <button class="guide-launcher" type="button" aria-label="Chat with Tejas, StarnyX assistant" aria-expanded="false"><span class="guide-launcher-icon">${personIcon}</span><span>Chat with Tejas</span><i class="guide-online-dot"></i></button>
    <section class="guide-panel" aria-label="Tejas, StarnyX digital guide" hidden>
      <div class="guide-panel-head"><div class="tejas-avatar">${personIcon}</div><div><strong>Tejas</strong><small><i></i> StarnyX Digital Guide · Festive Edition</small></div><button type="button" class="guide-close" aria-label="Close chat">×</button></div>
      <div class="guide-messages" aria-live="polite" aria-relevant="additions" role="log"><div class="guide-message guide-message-bot">Namaskar! 🙏 I’m Tejas from StarnyX Technologies. Happy Diwali! 🪔✨ May your home be filled with light and your ideas with new possibilities. I can guide you through our services, pricing, festive offer and project enquiries. What would you like to explore?</div></div>
      <div class="guide-quick-actions"><button type="button" data-guide-query="Good morning Tejas">Good morning ☀️</button><button type="button" data-guide-query="What services do you offer?">Our services</button><button type="button" data-guide-query="Tell me about the Diwali offer">Diwali offer 🪔</button><button type="button" data-guide-query="Talk to your team on WhatsApp">Talk to team</button></div>
      <form class="guide-form"><label class="sr-only" for="guide-input">Message Tejas</label><input id="guide-input" name="question" maxlength="300" autocomplete="off" placeholder="Message Tejas…" required><button type="submit" aria-label="Send message">➤</button></form>
      <div class="guide-disclaimer">Tejas is a JavaScript guide · No external AI API</div>
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
    const normalized = question.toLowerCase().trim().replace(/[.!?,;:]+/g, '').replace(/\s+/g, ' ');
    const exact = (patterns) => patterns.some((pattern) => pattern.test(normalized));
    const contains = (...words) => words.some((word) => normalized.includes(word));
    const marathi = /[\u0900-\u097f]/.test(question) || /\b(kasa|kashi|kay|ahe|aahe|tu|tumhi|mala|majha|maza|sanga|sang|karaycha|pahije|kuthe|kiti|ho|nahi|namaskar|dhanyavad)\b/.test(normalized);

    if (exact([/^(happy diwali|shubh deepawali|shubh diwali|diwali wishes|happy deepavali|शुभ दीपावली|शुभ दिवाळी|दिवाळीच्या शुभेच्छा)(\s+(bro|team|starnyx|tejas))?$/])) {
      addBotMessage(messages, 'Happy Diwali! 🪔✨ तुम्हाला आणि तुमच्या कुटुंबाला आनंद, आरोग्य आणि भरभराटीच्या खूप शुभेच्छा! May this festival bring bright ideas and beautiful new beginnings. तुमचा पुढचा digital project सुरू करायचा आहे का?');
      addBotLink(messages, 'offers.html', 'Explore the Diwali offer · DIWALI25 ↗');
      return;
    }
    if (exact([/^(hi+|hii+|hello+|hey+|heyy+|namaste|namaskar|नमस्कार|हाय|हॅलो|राम राम)(\s+(there|bro|team|starnyx|tejas))?$/, /^(good morning|good afternoon|good evening|good night)(\s+(bro|team|tejas))?$/]) || /^(hi+|hello+|hey+|namaste|namaskar)\s+(tejas|bro|there)\b/.test(normalized)) {
      const isMorning = normalized.includes('morning') || normalized.includes('सकाळ');
      const isEvening = normalized.includes('evening') || normalized.includes('night');
      const greeting = isMorning ? 'A very good morning! ☀️' : isEvening ? 'A warm evening to you! 🌙' : 'Hello and Happy Diwali! 🪔';
      addBotMessage(messages, `${greeting} मी Tejas, StarnyX चा digital guide. तुम्हाला website, mobile app, UI/UX, cloud setup किंवा festive offer बद्दल माहिती हवी आहे का? I’m happy to help!`);
      return;
    }
    if (exact([/^(how are you|how r you|how are u|how are things|kasa ahes|kasa aahes|कसा आहेस|कसे आहात)(\s+tejas)?$/])) {
      addBotMessage(messages, 'I’m doing wonderful, thank you for asking! 😊 आजचा दिवस छान जावो! मी तयार आहे—तुमच्या digital idea बद्दल सांगा, आपण योग्य service शोधूया.');
      return;
    }
    if (exact([/^(what is your name|who are you|your name|tu kon ahes|तू कोण आहेस|तुझं नाव काय|तुमचे नाव काय)(\s+tejas)?$/])) {
      addBotMessage(messages, 'माझं नाव Tejas! 🙋 मी StarnyX Technologies चा JavaScript-based website assistant आहे. मी services, pricing, Diwali offer आणि project enquiry बद्दल मार्गदर्शन करतो.');
      return;
    }
    if (exact([/^(thanks|thank you|thankyou|thx|many thanks|okay thanks|ok thanks|धन्यवाद|आभार|थँक यू)(\s+tejas)?$/])) {
      addBotMessage(messages, 'You’re most welcome! 😊 तुमच्याशी बोलून आनंद झाला. पुन्हा काही मदत हवी असेल तर मला विचारा. तुमची दिवाळी आनंदाची आणि प्रकाशमय जावो! 🪔');
      return;
    }
    if (exact([/^(bye|goodbye|see you|see ya|tata|बाय|पुन्हा भेटू|निघतो|निघते)(\s+tejas)?$/])) {
      addBotMessage(messages, 'Goodbye! 🙏 भेट दिल्याबद्दल धन्यवाद. तुमचा दिवस सुंदर जावो आणि दिवाळी मंगलमय होवो! StarnyX ला project discuss करायचा असल्यास कधीही WhatsApp करा.');
      addBotLink(messages, buildWhatsAppUrl('Hello StarnyX Technologies, I would like to discuss a digital project.'), 'WhatsApp StarnyX ↗');
      return;
    }
    if (exact([/^(help|what can you do|what can i ask|menu|help me|मदत|काय विचारू शकतो|कशी मदत करशील)$/])) {
      addBotMessage(messages, 'नक्की! मी तुम्हाला या गोष्टींबद्दल guide करू शकतो: 🌐 Websites · 📱 Mobile apps · 🎨 UI/UX · ☁️ Cloud & DevOps · ⚙️ Automation · 💰 Pricing · 🪔 Diwali offer · 💬 WhatsApp enquiry. खालील quick buttons वापरा किंवा तुमचा प्रश्न लिहा.');
      return;
    }
    if (exact([/^(how are you|how r u|how are u)$/])) {
      addBotMessage(messages, 'I’m great and ready to help! 😊 What are you planning to build?');
      return;
    }
    if (contains('main app', 'business application', 'platform status', 'is the app ready', 'where is the app', 'application ready', 'अॅप तयार', 'ॲप तयार')) {
      addBotMessage(messages, 'You are visiting our secondary public website. Our main StarnyX business application is currently under construction. We will share an update when the full Explorer, Client and Admin platform is ready. सध्या services आणि project enquiries साठी ही website वापरू शकता.');
      return;
    }
    if (contains('offer', 'discount', 'diwali25', '25%', 'दिवाळी ऑफर', 'सूट')) {
      addBotMessage(messages, '🪔 Happy Diwali! StarnyX च्या निवडक digital services वर up to 25% off उपलब्ध आहे. Offer code: DIWALI25. Final discount service scope, eligibility आणि written quotation नुसार confirm होईल. Hosting, licences आणि third-party charges वगळलेले आहेत, जोपर्यंत quotation मध्ये स्पष्ट दिलेले नाहीत.');
      addBotLink(messages, 'offers.html', 'View Diwali Offer ↗');
      return;
    }
    if (contains('service', 'services', 'what do you do', 'काय काम', 'कोणत्या सेवा', 'कोणते services')) {
      addBotMessage(messages, 'StarnyX मध्ये आम्ही digital product services वर लक्ष देतो: 🌐 Website Development, 💻 Web Applications & SaaS, 📱 Mobile App Development, 🎨 UI/UX Design, ☁️ Cloud & DevOps, ⚙️ Automation & API Integrations. तुमची गरज कोणती आहे?');
      addBotLink(messages, 'services.html', 'Explore all services ↗');
      return;
    }
    if (contains('project', 'quote', 'quotation', 'enquiry', 'inquiry', 'काम सुरू', 'प्रोजेक्ट', 'कोटेशन')) {
      addBotMessage(messages, 'छान! तुमच्या project बद्दल 2–3 ओळी सांगा—काय बनवायचं आहे, कोण वापरणार आहे आणि कोणती मुख्य features हवी आहेत. त्यानंतर StarnyX team WhatsApp वर scope आणि quotation बद्दल चर्चा करू शकते.');
      addBotLink(messages, 'quote.html', 'Open project enquiry form ↗');
      addBotLink(messages, buildWhatsAppUrl('Hello StarnyX Technologies, I would like to discuss a project and request a quotation.'), 'Continue on WhatsApp ↗');
      return;
    }
    if (contains('price', 'pricing', 'cost', 'budget', 'किंमत', 'खर्च', 'बजेट')) {
      addBotMessage(messages, 'Pricing project च्या scope, features, integrations आणि timeline वर ठरते. आम्ही अंदाजे/खोटे fixed prices दाखवत नाही. तुमची गरज पाठवा; team योग्य scope आणि written quotation share करेल.');
      addBotLink(messages, 'pricing.html', 'View pricing approach ↗');
      return;
    }
    if (contains('payment', 'pay online', 'checkout', 'पैसे भर', 'पेमेंट')) {
      addBotMessage(messages, 'सध्या ही secondary public website आहे आणि इथे online payment checkout उपलब्ध नाही. Main StarnyX business application under construction आहे. Service किंवा project enquiry साठी WhatsApp वर संपर्क करा.');
      return;
    }
    if (contains('contact', 'whatsapp', 'talk to team', 'human', 'person', 'फोन', 'संपर्क', 'माणसाशी')) {
      addBotMessage(messages, 'नक्की! StarnyX team शी WhatsApp वर संपर्क करण्यासाठी खालील button वापरा. तुमचा service type आणि project idea message मध्ये लिहा.');
      addBotLink(messages, buildWhatsAppUrl('Hello StarnyX Technologies, I would like to discuss a digital project.'), 'Open WhatsApp · +91 73855 85398 ↗');
      return;
    }
    if (contains('location', 'address', 'office', 'पत्ता', 'ऑफिस कुठे')) {
      addBotMessage(messages, 'StarnyX चा verified office address या website वर प्रकाशित केलेला नाही. चुकीची माहिती देण्याऐवजी, कृपया WhatsApp वर team शी संपर्क करा.');
      return;
    }
    if (contains('process', 'how does it work', 'steps', 'start', 'कशी सुरुवात', 'कसे सुरू')) {
      addBotMessage(messages, 'Project ची सुरुवात सोपी आहे: 1) WhatsApp वर idea share करा. 2) Requirements आणि goals समजून घेऊ. 3) Written scope व quotation share होईल. 4) Milestones agree करून design आणि development सुरू होईल. 5) Review आणि launch.');
      addBotLink(messages, 'about.html', 'Learn about StarnyX ↗');
      return;
    }
    if (contains('website', 'web development', 'landing page')) {
      const match = botKnowledge.find((entry) => entry.title === 'Website Development');
      addBotMessage(messages, match.text); addBotLink(messages, match.link, 'Explore website services ↗'); return;
    }
    if (contains('mobile', 'android', 'ios', 'app development')) {
      const match = botKnowledge.find((entry) => entry.title === 'Mobile App Development');
      addBotMessage(messages, match.text); addBotLink(messages, match.link, 'Explore mobile services ↗'); return;
    }
    if (contains('ui', 'ux', 'design', 'prototype')) {
      const match = botKnowledge.find((entry) => entry.title === 'UI/UX Design');
      addBotMessage(messages, match.text); addBotLink(messages, match.link, 'Explore design services ↗'); return;
    }
    if (contains('cloud', 'devops', 'hosting', 'deployment', 'vercel', 'domain')) {
      const match = botKnowledge.find((entry) => entry.title === 'Cloud & DevOps');
      addBotMessage(messages, match.text); addBotLink(messages, match.link, 'Explore cloud services ↗'); return;
    }
    if (contains('automation', 'integration', 'api', 'webhook', 'discord')) {
      const match = botKnowledge.find((entry) => entry.title === 'Automation & Integrations');
      addBotMessage(messages, match.text); addBotLink(messages, match.link, 'Explore integrations ↗'); return;
    }
    if (exact([/^(ok|okay|ok bro|nice|great|cool|understood|बरं|ठीक आहे|हो)$/])) {
      addBotMessage(messages, 'छान! 😊 अजून काही विचारायचं असल्यास मी इथेच आहे. तुम्हाला services, offer किंवा project enquiry बद्दल मदत करू शकतो.');
      return;
    }

    if (marathi) {
      addBotMessage(messages, 'तुमचा प्रश्न समजून घेण्याचा मी प्रयत्न करतोय. 😊 कृपया थोडं अधिक सांगाल का? तुम्हाला website, mobile app, UI/UX, cloud, pricing किंवा Diwali offer यापैकी कशाबद्दल माहिती हवी आहे? Team शी थेट बोलण्यासाठी WhatsApp वापरू शकता.');
    } else {
      addBotMessage(messages, 'That sounds interesting! I may need a little more detail to guide you correctly. Are you asking about a website, web application, mobile app, UI/UX, cloud setup, pricing or the Diwali offer? You can also reach our team on WhatsApp.');
    }
    addBotLink(messages, buildWhatsAppUrl(`Hello StarnyX Technologies, I have a question: ${question}`), 'Ask the StarnyX team on WhatsApp ↗');
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
