# StarnyX Technologies — Professional Diwali Public Website

A complete static public website for **StarnyX Technologies**, refreshed with a restrained, professional Diwali identity. The design uses a light ivory canvas, deep navy typography, warm gold and saffron accents, real festive photography and custom line-art SVGs.

- Official website: https://starnyxtechnologies.in
- WhatsApp enquiries: +91 73855 85398
- Public email contact flow: not used; WhatsApp is the public enquiry channel.
- Payment gateway: not included on this public marketing website.

## What is included

- 18 top-level HTML pages: Home, About, Services, Website Demos, Our Developments, Offers, Pricing, FAQ, Contact, Get a Quote, Careers, Privacy, Terms, Refund Policy, Cookie Policy, Disclaimer, Service Agreement and 404.
- Professional light Diwali visual system: ivory and warm-white surfaces, deep navy type, muted gold/saffron accents, disciplined spacing, cleaner typography, flatter cards and consistent buttons/forms.
- Four custom Diwali SVG assets: diya, mandala, toran and fine divider ornament. These are original lightweight vector assets created for this site; no cartoon clip-art is used.
- Bundled local hero and promotional photographs. The main website visuals do not depend on remote image URLs.
- Homepage skyshots: small glowing launch trails rise, burst into coloured particles and fade in a staggered sequence. The effect uses CSS animation with a small fixed number of elements, transform/opacity only, and no canvas, requestAnimationFrame, timers or external animation libraries. It respects `prefers-reduced-motion`.
- Responsive refinements across desktop, laptop, tablet and mobile, including a compact navigation menu, fluid page widths, stacked FAQ/contact layouts and single-column narrow-screen forms.
- Existing StarnyX logo/favicon in the header and browser tab.
- Separate Website Demo Gallery (`demos.html`) with industry cards. Only published demos open; future demos are marked Coming Soon. The Hotel Demo opens https://starnyxtechnologies.github.io/Hotel-demo/.
- Our Developments page (`projects.html`) with transparent project and concept-demo status labels.
- Tejas JavaScript guide assistant, WhatsApp enquiry/quote actions, SEO metadata, sitemap and robots.txt.
- Vercel serverless Discord enquiry endpoint at `/api/discord`.

## Important: upload all files

The two main photographs are stored in the project root:

- `diwali-hero.webp`
- `diwali-promo.webp`

Upload the complete ZIP contents, including the `assets/` folder, all CSS and JavaScript files, both `.webp` images, `favicon.svg`, `favicon.png`, the complete `api/` folder and `vercel.json`. The archive keeps `index.html` and all website files at its root.

This package contains only the StarnyX public company website and its required assets/API/deployment documentation. The Hotel Demo, Lodge Demo and all other individual demo websites are separate projects and are **not** bundled here. The StarnyX Demos page contains cards and external links only.

## Local preview

No build or package installation is required. Open `index.html` directly, or run a static server from this folder:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## GitHub + Vercel deployment

1. Extract the ZIP.
2. Upload all extracted files and folders to the root of the StarnyX public website GitHub repository, replacing the existing website files.
3. Remove any stale local `demos/` directory from the repository if one remains from an older commit; individual demo source must stay in separate repositories.
4. Commit the changes to the production branch.
5. Connect/import the repository in Vercel.
6. Framework preset: **Other**. Build command: blank. Output directory: `.`. Install command: blank.
7. Add `starnyxtechnologies.in` and `www.starnyxtechnologies.in` under Vercel → Project → Settings → Domains and apply the DNS records Vercel shows.

## Discord enquiry notifications

The browser never contains the Discord webhook URL. The included function is `api/discord.js`. Configure these in **Vercel → Project → Settings → Environment Variables**:

- `DISCORD_WEBHOOK_URL` — the complete Discord incoming webhook URL.
- `ALLOWED_ORIGIN` — `https://starnyxtechnologies.in,https://www.starnyxtechnologies.in` (comma-separated origins; add the Vercel preview origin only when needed).

Apply to Production (and Preview only when you want preview enquiries sent to Discord), save, then redeploy. GitHub repository secrets are not automatically available inside a Vercel Function. The API returns `NOT_CONFIGURED` when the webhook is absent and does not report a fake delivery success.

## WhatsApp

The configured enquiry number is `+91 73855 85398`. WhatsApp opens a pre-filled message; the visitor still presses Send in WhatsApp. This site does not send messages silently.

## Scope and content review

This is the StarnyX public marketing website, not the future Explorer / Client / Admin business application. It has no login portal, database, payment gateway, online ordering or booking system. The larger business application remains a separate future project.

Review pricing, offers, legal content and company details before treating them as final commercial/legal terms. `DIWALI25` is an enquiry code; the final discount and eligibility must be confirmed by StarnyX in the written quotation.

## Key files

- `index.html` and the other `.html` files — public pages.
- `styles.css` — base shared design system.
- `diwali-festival.css` — light Diwali styling and CSS skyshot animations.
- `responsive-polish.css` — earlier responsive refinements.
- `professional-diwali.css` — final professional theme overrides and unified responsive layout; load this last.
- `assets/diwali-diya.svg`, `assets/diwali-mandala.svg`, `assets/diwali-toran.svg`, `assets/diwali-divider.svg` — custom Diwali vector artwork.
- `diwali-hero.webp`, `diwali-promo.webp` — bundled photographic visuals.
- `script.js` — navigation, forms, WhatsApp and Tejas assistant.
- `diwali-festival.js` — creates the small homepage skyshot elements; CSS runs the animations.
- `showcase.css`, `showcase.js` — Demos and Our Developments presentation.
- `api/discord.js` — Vercel serverless Discord notification endpoint.
- `vercel.json` — Vercel function configuration.

## Website demos and developments

- Open `demos.html` to browse separate demo cards. The Hotel Demo opens `https://starnyxtechnologies.github.io/Hotel-demo/`. This company website repository contains only its card, a lightweight CSS preview and the external link—not the Hotel Demo source, pages or images.
- Lodge, Hotel & Lodge, Supermarket, Jewellers, Salon, Spa & Salon, Fashion, Clinic and Education cards remain Coming Soon until their own independent websites are published.
- Open `projects.html` (Our Developments) to view cards linking to separately hosted projects and in-house showcase sections.
- Each business demo is built and deployed from its own repository. Add a published URL to `demos.html` only when that independent demo is ready.
