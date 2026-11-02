# StarnyX Technologies — Diwali Public Website

A complete static public website for **StarnyX Technologies** with a warm, light Diwali visual theme.

- Official website: https://starnyxtechnologies.in
- WhatsApp enquiries: +91 73855 85398
- Main StarnyX business application: under construction (announced on the public website)
- Payment gateway: not included on this public marketing website

## What is included

- 17 HTML pages: Home, About, Services, Our Work, Offers, Pricing, FAQ, Contact, Get a Quote, Careers, Privacy, Terms, Refund Policy, Cookie Policy, Disclaimer, Service Agreement and 404.
- Light ivory, warm white, marigold, saffron and gold Diwali design.
- Bundled local hero and promotional photographs. No external image URLs are required for the main visuals.
- Animated fireworks / sky shots, subtle floating light particles, fairy lights and diya dividers. Motion automatically respects `prefers-reduced-motion`.
- Existing StarnyX blue metallic favicon/logo in the header and browser tab.
- Tejas JavaScript guide assistant.
- WhatsApp enquiry and quote actions.
- Vercel serverless Discord enquiry endpoint at `/api/discord`.
- SEO metadata, sitemap and robots.txt.

## Important: upload ALL files

The two main photographs are stored in the project root:

- `diwali-hero.webp`
- `diwali-promo.webp`

**Do not upload only the HTML files.** Upload both `.webp` images, both CSS files, both JavaScript files, `favicon.svg`, `favicon.png`, the complete `api/` folder and `vercel.json` as well. If the images are omitted, the hero/promo photographs will show as missing.

The ZIP is intentionally packaged with `index.html` and all other website files at the archive root. Extract the ZIP and upload the contents of that extracted folder directly to the root of the GitHub repository.

## Local preview

No build or package installation is required.

You can open `index.html` directly, or run a local static server from this folder:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## GitHub + Vercel deployment

1. Extract the ZIP.
2. Upload **all extracted files and folders** to the root of the GitHub repository, replacing the older website files.
3. Commit the changes to the production branch.
4. Connect/import the repository in Vercel.
5. Framework preset: **Other**.
6. Build command: leave blank.
7. Output directory: `.` (project root).
8. Install command: leave blank.
9. Add `starnyxtechnologies.in` and `www.starnyxtechnologies.in` under Vercel → Project → Settings → Domains.
10. Apply the DNS records Vercel shows for the domain.

## Discord enquiry notifications

The browser never contains the Discord webhook URL.

The included function is `api/discord.js`. Configure these variables in **Vercel → Project → Settings → Environment Variables**:

- `DISCORD_WEBHOOK_URL` — the complete Discord incoming webhook URL.
- `ALLOWED_ORIGIN` — `https://starnyxtechnologies.in,https://www.starnyxtechnologies.in` (comma-separated origins; add the Vercel preview origin only when needed).

Apply to Production (and Preview only if you want preview enquiries sent to Discord), save, then redeploy. GitHub repository secrets are for GitHub Actions and are not automatically available inside a Vercel Function.

The API intentionally returns `NOT_CONFIGURED` when the webhook is absent and never reports a fake delivery success.

## WhatsApp

The configured enquiry number is `+91 73855 85398`. WhatsApp opens a pre-filled message; the visitor still presses Send in WhatsApp. This site does not send WhatsApp messages silently.

## Content and business facts

This is a public marketing site, not the future Explorer / Client / Admin application. There is no login portal, database, payment gateway, online ordering, or booking system in this website package. The larger StarnyX business application can be developed separately later.

Review pricing, offers, legal content and company details before treating them as final commercial/legal terms. The displayed `DIWALI25` is an enquiry code; the final discount and eligible scope must be confirmed by StarnyX.

## Files

- `index.html`, other `.html` pages — pages
- `styles.css` — original shared design system
- `diwali-festival.css` — final light Diwali design layer
- `script.js` — navigation, forms, WhatsApp and Tejas assistant
- `diwali-festival.js` — fairy lights, diya dividers, particles and fireworks
- `diwali-hero.webp`, `diwali-promo.webp` — locally bundled images
- `favicon.svg`, `favicon.png` — StarnyX brand assets
- `api/discord.js` — Vercel serverless Discord notification endpoint
- `vercel.json` — Vercel function configuration
