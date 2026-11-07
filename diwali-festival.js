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
    '#D7A64E', '#E17A58', '#C96D85', '#9C88B5',
    '#6FAAA0', '#E6BD72', '#B87950', '#E59A70'
  ];

  // Each shell travels up, bursts, and fades. Staggering keeps the home hero festive.
  const desktopShells = [
    { x: 34, y: 25, delay: '0s', lift: 132 },
    { x: 54, y: 16, delay: '2.5s', lift: 152 },
    { x: 75, y: 28, delay: '5s', lift: 138 },
    { x: 91, y: 18, delay: '7.5s', lift: 146 }
  ];
  const mobileShells = [
    { x: 24, y: 23, delay: '0s', lift: 106 },
    { x: 76, y: 19, delay: '3s', lift: 118 },
    { x: 51, y: 38, delay: '6s', lift: 108 }
  ];

  const shells = smallScreen ? mobileShells : desktopShells;
  const sparkCount = smallScreen ? 10 : 14;

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
      const radius = (smallScreen ? 28 : 34) + ((i * 11 + shellIndex * 7) % (smallScreen ? 18 : 24));
      const dx = Math.cos(angle) * radius;
      const dy = Math.sin(angle) * radius * 0.82;

      spark.style.setProperty('--spark-x', `${dx.toFixed(1)}px`);
      spark.style.setProperty('--spark-y', `${dy.toFixed(1)}px`);
      spark.style.setProperty('--spark-color', palette[(i + shellIndex * 3) % palette.length]);
      spark.style.setProperty('--spark-size', `${i % 4 === 0 ? 3.5 : 2.5}px`);
      burst.appendChild(spark);
    }

    layer.appendChild(burst);
  });

  heroLayout.prepend(layer);
})();
