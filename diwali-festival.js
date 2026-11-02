/* StarnyX Diwali atmosphere — tasteful fireworks, fairy lights, diyas and floating festive particles. */
(() => {
  'use strict';
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const heroSelectors = '.hero, .page-hero, .error-page, .diwali-home-promo, .closing-cta';

  const diyaSvg = () => `
    <svg viewBox="0 0 64 48" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="diyaBowl" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#f6d28a"/><stop offset=".5" stop-color="#c98237"/><stop offset="1" stop-color="#8f4d2b"/></linearGradient>
        <radialGradient id="diyaFlame"><stop stop-color="#fffde5"/><stop offset=".45" stop-color="#ffd45d"/><stop offset="1" stop-color="#f07832"/></radialGradient>
      </defs>
      <path d="M30 22 C22 12 32 5 33 0 C43 11 43 18 34 24 Z" fill="url(#diyaFlame)"/>
      <ellipse cx="32" cy="28" rx="7" ry="3" fill="#fff0bd" opacity=".85"/>
      <path d="M5 27 Q32 40 59 27 Q53 45 32 45 Q11 45 5 27Z" fill="url(#diyaBowl)" stroke="#a96932" stroke-width="1.2"/>
      <path d="M8 28 Q32 37 56 28" fill="none" stroke="#ffdfa0" stroke-width="2" opacity=".86"/>
      <ellipse cx="32" cy="28" rx="27" ry="4" fill="#ffe7b6" opacity=".28"/>
    </svg>`;

  function addDecorations() {
    document.querySelectorAll(heroSelectors).forEach((section, index) => {
      if (section.querySelector('.diwali-fireworks-canvas')) return;
      section.style.position = 'relative';
      section.style.isolation = 'isolate';
      const lights = document.createElement('div');
      lights.className = 'diwali-fairy-lights';
      lights.setAttribute('aria-hidden', 'true');
      section.prepend(lights);

      if (!reducedMotion) {
        const canvas = document.createElement('canvas');
        canvas.className = 'diwali-fireworks-canvas';
        canvas.setAttribute('aria-hidden', 'true');
        section.insertBefore(canvas, section.children[1] || null);
        runFireworks(canvas, index);
      }

      // Small festive diya divider at the base of each feature section; no cartoon lantern or star artwork.
      const diyaRow = document.createElement('div');
      diyaRow.className = 'diwali-diya-divider';
      diyaRow.setAttribute('aria-hidden', 'true');
      diyaRow.innerHTML = Array.from({ length: 5 }, () => diyaSvg()).join('');
      section.appendChild(diyaRow);

      // A few subtle light particles near the outer edges, never over the main copy.
      if (!reducedMotion) {
        for (let i = 0; i < 13; i++) {
          const particle = document.createElement('span');
          particle.className = 'diwali-particle';
          particle.setAttribute('aria-hidden', 'true');
          particle.style.left = `${4 + ((i * 37) % 91)}%`;
          particle.style.top = `${12 + ((i * 29) % 74)}%`;
          particle.style.animationDelay = `${-(i % 7)}s`;
          particle.style.animationDuration = `${5 + (i % 5)}s`;
          section.appendChild(particle);
        }
      }
    });

    // Add a small diya divider above the footer on pages where the hero is short.
    const footer = document.querySelector('.site-footer');
    if (footer && !footer.previousElementSibling?.classList.contains('diwali-footer-divider')) {
      const divider = document.createElement('div');
      divider.className = 'diwali-diya-divider diwali-footer-divider';
      divider.setAttribute('aria-hidden', 'true');
      divider.innerHTML = Array.from({ length: 7 }, () => diyaSvg()).join('');
      footer.parentNode.insertBefore(divider, footer);
    }
  }

  function runFireworks(canvas, seedIndex) {
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    let width = 0, height = 0, dpr = 1, lastLaunch = 0, frame = 0;
    const particles = [];
    const colours = ['#d88a2e', '#e56d4c', '#9b6bb0', '#329a9a', '#e3b94e', '#d65b72'];

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = Math.max(1, rect.width); height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function burst(x, y, power = 1) {
      const count = Math.round(34 * power);
      const colour = colours[Math.floor(Math.random() * colours.length)];
      for (let i = 0; i < count; i++) {
        const angle = Math.PI * 2 * i / count + Math.random() * .08;
        const speed = (1.0 + Math.random() * 2.3) * power;
        particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
          life: 54 + Math.random() * 35, max: 89, size: .8 + Math.random() * 1.65,
          colour: Math.random() > .24 ? colour : '#fff1c7', gravity: .018 + Math.random() * .022 });
      }
    }
    function launch() {
      // Keep fireworks around the upper/right sides, away from important text.
      const x = width * (.53 + Math.random() * .39);
      const y = height * (.12 + Math.random() * .50);
      burst(x, y, .8 + Math.random() * .45);
      if (Math.random() > .55) burst(x + (Math.random() - .5) * 90, y + (Math.random() - .5) * 65, .48);
    }
    function draw() {
      frame++;
      ctx.clearRect(0, 0, width, height);
      // Fine floating sparks across the background.
      for (let i = 0; i < 8; i++) {
        const px = (i * 137 + frame * .18) % width;
        const py = (i * 73 + Math.sin(frame * .012 + i) * 13 + height * .18) % height;
        ctx.beginPath(); ctx.fillStyle = 'rgba(218, 157, 69, .22)'; ctx.arc(px, py, 1.1, 0, Math.PI * 2); ctx.fill();
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy; p.vy += p.gravity; p.vx *= .989; p.vy *= .989; p.life--;
        const alpha = Math.max(0, p.life / p.max);
        ctx.globalAlpha = alpha * .84;
        ctx.fillStyle = p.colour;
        ctx.shadowBlur = 8; ctx.shadowColor = p.colour;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1; ctx.shadowBlur = 0;
        if (p.life <= 0) particles.splice(i, 1);
      }
      if (document.visibilityState === 'visible') requestAnimationFrame(draw);
    }
    resize();
    // Stagger initial sky-shots so the page has a festive feel immediately.
    setTimeout(() => burst(width * .76, height * .25, .95), 350 + seedIndex * 170);
    setTimeout(() => burst(width * .91, height * .46, .72), 1100 + seedIndex * 120);
    const timer = window.setInterval(() => { if (document.visibilityState === 'visible') launch(); }, 2800 + seedIndex * 120);
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') requestAnimationFrame(draw); }, { passive: true });
    requestAnimationFrame(draw);
    // Expose cleanup for page-level hot reload/dev sessions.
    canvas.dataset.fireworksReady = 'true';
    canvas.dataset.fireworksTimer = String(timer);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addDecorations, { once: true });
  else addDecorations();
})();
