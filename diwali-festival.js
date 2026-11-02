/* StarnyX Diwali celebration particles.
   Small CSS-only floating confetti; no rockets, canvas, timers or animation loops. */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  const hero = document.querySelector('.hero') || document.querySelector('.page-hero, .error-page');
  if (!hero || hero.querySelector('.diwali-fireworks')) return;

  const layer = document.createElement('div');
  layer.className = 'diwali-fireworks';
  layer.setAttribute('aria-hidden', 'true');

  const isHome = hero.classList.contains('hero');
  const isSmall = window.matchMedia?.('(max-width: 620px)').matches;
  const colors = ['#ffc14d', '#ff795e', '#ed5f98', '#a979ec', '#6d9cff', '#42c9bd', '#ffe27a'];
  const count = isHome ? (isSmall ? 18 : 30) : (isSmall ? 9 : 15);

  for (let i = 0; i < count; i += 1) {
    const particle = document.createElement('i');
    const particleClass = i % 5 === 0 ? 'is-confetti' : (i % 4 === 0 ? 'is-twinkle' : '');
    particle.className = `diwali-particle ${particleClass}`.trim();

    // Keep homepage confetti around the artwork; inner pages keep it close to the edges.
    const left = isHome
      ? (isSmall ? 5 + ((i * 29) % 90) : 50 + ((i * 23) % 48))
      : (i % 2 === 0 ? 2 + ((i * 13) % 15) : 82 + ((i * 17) % 16));
    const top = isHome && isSmall ? 54 + ((i * 19) % 43) : 7 + ((i * 31) % 86);
    const driftX = ((i * 17) % 2 === 0 ? 1 : -1) * (8 + ((i * 11) % 24));
    const driftY = -(13 + ((i * 7) % 30));
    const duration = 4.8 + ((i * 3) % 5) * 0.55;
    const delay = -(((i * 7) % 19) * 0.31);

    particle.style.setProperty('--particle-left', `${left}%`);
    particle.style.setProperty('--particle-top', `${top}%`);
    particle.style.setProperty('--particle-size', `${2 + (i % 3)}px`);
    particle.style.setProperty('--particle-length', `${5 + (i % 4) * 2}px`);
    particle.style.setProperty('--particle-color', colors[i % colors.length]);
    particle.style.setProperty('--particle-drift-x', `${driftX}px`);
    particle.style.setProperty('--particle-drift-y', `${driftY}px`);
    particle.style.setProperty('--particle-duration', `${duration}s`);
    particle.style.setProperty('--particle-delay', `${delay}s`);
    layer.appendChild(particle);
  }

  hero.prepend(layer);
})();
