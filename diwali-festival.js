/* StarnyX Diwali atmosphere: visible multi-colour sky-shots, launch trails, fairy lights and diyas. */
(() => {
  'use strict';
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const heroSelectors = '.hero, .page-hero, .error-page, .diwali-home-promo, .closing-cta, .showcase-cta';

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
        runFireworks(canvas, index, section.classList.contains('hero'));
      }

      const diyaRow = document.createElement('div');
      diyaRow.className = 'diwali-diya-divider';
      diyaRow.setAttribute('aria-hidden', 'true');
      diyaRow.innerHTML = Array.from({ length: 5 }, () => diyaSvg()).join('');
      section.appendChild(diyaRow);

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

    const footer = document.querySelector('.site-footer');
    if (footer && !footer.previousElementSibling?.classList.contains('diwali-footer-divider')) {
      const divider = document.createElement('div');
      divider.className = 'diwali-diya-divider diwali-footer-divider';
      divider.setAttribute('aria-hidden', 'true');
      divider.innerHTML = Array.from({ length: 7 }, () => diyaSvg()).join('');
      footer.parentNode.insertBefore(divider, footer);
    }
  }

  function runFireworks(canvas, seedIndex, isMainHero) {
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    let width = 0, height = 0, frame = 0, lastTime = 0;
    const particles = [];
    const rockets = [];
    const flashes = [];
    const colours = ['#ffb52e', '#ff713f', '#e94f86', '#a66de0', '#36a9df', '#58b99b', '#fff0b3'];

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function burst(x, y, power = 1, colourOverride) {
      const colour = colourOverride || colours[Math.floor(Math.random() * colours.length)];
      const count = Math.round((isMainHero ? 88 : 64) * power);
      flashes.push({ x, y, radius: 2, life: 18, max: 18, colour });
      for (let i = 0; i < count; i++) {
        const angle = Math.PI * 2 * i / count + (Math.random() - .5) * .08;
        const speed = (1.45 + Math.random() * 3.1) * power;
        particles.push({
          x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
          life: 62 + Math.random() * 38, max: 100,
          size: .9 + Math.random() * 2.1,
          colour: Math.random() > .15 ? colour : '#fff9df',
          gravity: .018 + Math.random() * .028,
          drag: .986 + Math.random() * .009
        });
      }
      // A secondary glitter ring gives each sky-shot a fuller, more visible finish.
      const ringCount = Math.round(24 * power);
      for (let i = 0; i < ringCount; i++) {
        const angle = Math.PI * 2 * i / ringCount;
        const speed = (2.0 + Math.random() * .35) * power;
        particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
          life: 42 + Math.random() * 18, max: 60, size: 1.1 + Math.random() * 1.2,
          colour: '#fff1bf', gravity: .008, drag: .991 });
      }
    }

    function launch() {
      let startX, targetX;
      if (isMainHero) {
        // Keep the largest fireworks around the photo/right side of the main hero.
        targetX = width * (.57 + Math.random() * .37);
        startX = targetX + (Math.random() - .5) * width * .17;
      } else {
        // Inner-page hero copy stays readable; fireworks bloom at both outer edges.
        const rightSide = Math.random() > .42;
        targetX = width * (rightSide ? (.78 + Math.random() * .17) : (.06 + Math.random() * .16));
        startX = targetX + (Math.random() - .5) * width * .12;
      }
      const targetY = height * (.13 + Math.random() * .31);
      const startY = height * (.94 + Math.random() * .05);
      const duration = 52 + Math.random() * 20;
      rockets.push({ x: startX, y: startY, sx: startX, sy: startY,
        tx: targetX, ty: targetY, vx: (targetX - startX) / duration,
        vy: (targetY - startY) / duration, trail: [], colour: colours[Math.floor(Math.random() * colours.length)],
        age: 0, duration });
    }

    function drawRocket(rocket) {
      const trail = rocket.trail;
      if (trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);
        for (let i = 1; i < trail.length; i++) ctx.lineTo(trail[i].x, trail[i].y);
        ctx.strokeStyle = rocket.colour;
        ctx.lineWidth = 2.5;
        ctx.shadowBlur = 13;
        ctx.shadowColor = rocket.colour;
        ctx.globalAlpha = .9;
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }
      ctx.beginPath();
      ctx.fillStyle = '#fffbe8';
      ctx.shadowBlur = 16;
      ctx.shadowColor = rocket.colour;
      ctx.arc(rocket.x, rocket.y, 2.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    function draw() {
      frame++;
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      // Rockets travel visibly upward before bursting into large multi-colour sky-shots.
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.age++;
        r.x += r.vx;
        r.y += r.vy;
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 13) r.trail.shift();
        drawRocket(r);
        if (r.age >= r.duration || r.y <= r.ty) {
          burst(r.x, r.y, isMainHero ? 1 : .84, r.colour);
          if (Math.random() > .52) {
            burst(r.x + (Math.random() - .5) * 70, r.y + (Math.random() - .5) * 48, .48);
          }
          rockets.splice(i, 1);
        }
      }

      // Expanding flash rings make the explosion visible even against a light background.
      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i];
        f.radius += 2.7;
        f.life--;
        ctx.beginPath();
        ctx.strokeStyle = f.colour;
        ctx.lineWidth = 2.2;
        ctx.shadowBlur = 14;
        ctx.shadowColor = f.colour;
        ctx.globalAlpha = Math.max(0, f.life / f.max) * .8;
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.stroke();
        if (f.life <= 0) flashes.splice(i, 1);
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const oldX = p.x, oldY = p.y;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.life--;
        const alpha = Math.max(0, p.life / p.max);
        ctx.globalAlpha = alpha * .96;
        ctx.strokeStyle = p.colour;
        ctx.lineWidth = Math.max(.7, p.size * .9);
        ctx.shadowBlur = 9;
        ctx.shadowColor = p.colour;
        ctx.beginPath();
        ctx.moveTo(oldX, oldY);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        ctx.fillStyle = p.colour;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * .72, 0, Math.PI * 2);
        ctx.fill();
        if (p.life <= 0) particles.splice(i, 1);
      }

      // Small ambient glints fill the sky without covering text or controls.
      ctx.globalAlpha = .42;
      for (let i = 0; i < 9; i++) {
        const px = (i * 137 + frame * .22) % width;
        const py = (i * 73 + Math.sin(frame * .012 + i) * 13 + height * .16) % Math.max(1, height * .7);
        ctx.fillStyle = i % 2 ? '#e6a64a' : '#d77a62';
        ctx.beginPath();
        ctx.arc(px, py, 1.35, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      if (document.visibilityState === 'visible') requestAnimationFrame(draw);
    }

    resize();
    // Start with several staggered launches so visitors see the fireworks immediately.
    const firstShots = isMainHero ? [350, 850, 1450, 2050] : [450 + (seedIndex % 3) * 180, 1250 + (seedIndex % 2) * 200];
    firstShots.forEach((delay) => window.setTimeout(launch, delay));
    const interval = isMainHero ? 1750 : 2350;
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        launch();
        if (isMainHero && Math.random() > .42) window.setTimeout(launch, 380);
      }
    }, interval);
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') requestAnimationFrame(draw);
    }, { passive: true });
    requestAnimationFrame(draw);
    canvas.dataset.fireworksReady = 'true';
    canvas.dataset.fireworksTimer = String(timer);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addDecorations, { once: true });
  else addDecorations();
})();
