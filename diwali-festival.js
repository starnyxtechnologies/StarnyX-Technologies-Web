/* StarnyX Diwali skyshots — CSS-driven launches and colourful particle bursts.
   No canvas, timers, requestAnimationFrame, image sprites or external libraries. */
(() => {
  'use strict';

  const heroLayout = document.querySelector('.hero .hero-layout');
  if (!heroLayout || heroLayout.querySelector('.diwali-fireworks')) return;

  const motionPreference = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  if (motionPreference?.matches) return;

  const smallScreen = window.matchMedia?.('(max-width: 620px)').matches ?? false;
  const layer = document.createElement('div');
  layer.className = 'diwali-fireworks';
  layer.setAttribute('aria-hidden', 'true');

  const palette = [
    '#ffcf58', '#ff765f', '#ff4f91', '#bf83ff',
    '#66a8ff', '#42d6c3', '#fff18a', '#ff9c54'
  ];

  // Each shell travels up, bursts, and fades. Staggering keeps the home hero festive.
  const desktopShells = [
    { x: 32, y: 27, delay: '0s', lift: 142 },
    { x: 51, y: 17, delay: '2s', lift: 174 },
    { x: 72, y: 30, delay: '4s', lift: 148 },
    { x: 90, y: 18, delay: '6s', lift: 166 },
    { x: 61, y: 47, delay: '8s', lift: 130 }
  ];
  const mobileShells = [
    { x: 22, y: 24, delay: '0s', lift: 116 },
    { x: 76, y: 20, delay: '2.1s', lift: 132 },
    { x: 48, y: 43, delay: '4.2s', lift: 110 },
    { x: 91, y: 36, delay: '6.3s', lift: 120 }
  ];

  const shells = smallScreen ? mobileShells : desktopShells;
  const sparkCount = smallScreen ? 12 : 16;

  shells.forEach((shell, shellIndex) => {
    const burst = document.createElement('div');
    burst.className = 'skyshot';
    burst.style.setProperty('--shell-x', `${shell.x}%`);
    burst.style.setProperty('--shell-y', `${shell.y}%`);
    burst.style.setProperty('--shell-delay', shell.delay);
    burst.style.setProperty('--shell-lift', `${shell.lift}px`);
    burst.style.setProperty('--shell-color', palette[(shellIndex * 2) % palette.length]);

    const rocket = document.createElement('i');
    rocket.className = 'skyshot-rocket';
    burst.appendChild(rocket);

    const flash = document.createElement('i');
    flash.className = 'skyshot-flash';
    burst.appendChild(flash);

    // Evenly spaced radial sparks; alternating radii make the burst feel less mechanical.
    for (let i = 0; i < sparkCount; i += 1) {
      const spark = document.createElement('i');
      spark.className = 'skyshot-spark';
      const angle = (Math.PI * 2 * i) / sparkCount + (shellIndex * 0.21);
      const radius = (smallScreen ? 34 : 42) + ((i * 13 + shellIndex * 7) % (smallScreen ? 22 : 32));
      const dx = Math.cos(angle) * radius;
      const dy = Math.sin(angle) * radius * 0.82;

      spark.style.setProperty('--spark-x', `${dx.toFixed(1)}px`);
      spark.style.setProperty('--spark-y', `${dy.toFixed(1)}px`);
      spark.style.setProperty('--spark-color', palette[(i + shellIndex * 3) % palette.length]);
      spark.style.setProperty('--spark-size', `${i % 4 === 0 ? 4 : 3}px`);
      burst.appendChild(spark);
    }

    layer.appendChild(burst);
  });

  heroLayout.prepend(layer);
})();
