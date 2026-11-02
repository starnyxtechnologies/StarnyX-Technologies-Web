/* Lightweight StarnyX Diwali sky-shots.
   CSS transforms/opacity only: no canvas, particle physics, timers or animation loops. */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  // One fireworks layer per page: homepage hero, otherwise the first inner-page hero.
  const hero = document.querySelector('.hero') || document.querySelector('.page-hero, .error-page');
  if (!hero || hero.querySelector('.diwali-fireworks')) return;

  const layer = document.createElement('div');
  layer.className = 'diwali-fireworks';
  layer.setAttribute('aria-hidden', 'true');

  const shots = hero.classList.contains('hero')
    ? [
        ['gold', 'shot-one'],
        ['rose', 'shot-two'],
        ['cyan', 'shot-three']
      ]
    : [
        ['gold', 'shot-one'],
        ['rose', 'shot-two']
      ];

  for (const [colour, position] of shots) {
    const shot = document.createElement('span');
    shot.className = `diwali-skyshot ${position} ${colour}`;
    layer.appendChild(shot);

    const rocket = document.createElement('span');
    rocket.className = `diwali-rocket ${position}-rocket ${colour}`;
    layer.appendChild(rocket);
  }

  hero.prepend(layer);
})();
