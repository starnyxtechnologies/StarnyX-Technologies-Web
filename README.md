# StarnyX Technologies — complete public website

A complete static website project for `https://starnyxtechnologies.in/`. This is the **public company/marketing website only**; it is not the future Explorer / Client / Admin web application. Hotel and Lodge demo websites are separate projects and their source is not bundled here.

## Project structure

```text
/
├── index.html and the other top-level website pages
├── insights/                 # three original SEO guides
├── assets/
│   ├── css/styles.css        # responsive site design system
│   ├── js/site.js            # menu, enquiry and page interactions
│   ├── images/               # product illustration and social preview
│   │   └── decor/            # original Diwali diya/rangoli SVG artwork
│   └── icons/                # brand mark, favicon and app icons
├── api/enquiry.js            # optional private Discord notification endpoint
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── vercel.json
├── SEO-PLAYBOOK.md
└── DISCORD-SETUP.md
```

## Pages

Home, Studio, Services, Demos, Our Developments, Insights, Offers, Pricing, FAQ, Contact, Get a Quote, Careers, Privacy Policy, Terms, Refund Policy, Cookie Policy, Disclaimer, Service Agreement and 404, plus three original guides inside `insights/`.

## Design and experience

- Original StarnyX identity: deep navy, warm ivory, muted brass/gold and saffron accents.
- Professional Diwali detail through original diya/rangoli line art and restrained festive highlights. There is no large Diwali hero banner or stock Diwali photo.
- Custom product-system illustration, responsive layouts, mobile navigation, accessible focus styles and reduced-motion support.
- Lightweight CSS-only festive spark accents; no Canvas or continuous JavaScript animation loops.
- No stock photo hotlinks or third-party runtime image dependencies. Google Fonts are a progressive enhancement with local system fallbacks.

## Functional behaviour

- WhatsApp number: `+91 73855 85398`. Enquiry forms prepare a message; the visitor reviews it and presses Send in WhatsApp.
- Optional Discord notifications use `/api/enquiry.js`. Configure `DISCORD_WEBHOOK_URL` and `ALLOWED_ORIGIN` in Vercel Project Settings → Environment Variables. Never place the webhook URL in browser JavaScript or public GitHub source.
- No email contact flow, user login, payment checkout, CMS or database is included.
- Pricing is requirement-based; no fixed price or automatic discount is promised.

## Local preview

Run `python -m http.server 8080` from the project root and open `http://localhost:8080`. The site has no build step or package install requirement.

## Deploy to GitHub + Vercel

1. Extract the ZIP.
2. Upload **all contents inside** the extracted folder to the root of the public website repository, preserving folders.
3. Remove obsolete files from the previous deployment that are no longer part of this project. In particular, do not retain old `styles.css`, `site.js`, old `/assets` files or an old `demos/` source folder. Individual demos stay in separate repositories.
4. Commit to the production branch.
5. In Vercel, use Framework Preset `Other`, no build command, and output directory `.`. Root directory should be the repository root.
6. Attach `starnyxtechnologies.in` and `www.starnyxtechnologies.in` to this Vercel project and confirm HTTPS. The config redirects `www` to the non-www canonical host.
7. Add the Discord variables only if private notifications are required, then redeploy.
8. Follow `SEO-PLAYBOOK.md` to verify Search Console and submit `sitemap.xml`.

## Important

Review the legal and commercial wording before treating it as legal advice or a signed agreement. Use only accurate company details and genuine project claims. Do not publish a physical address, client logos, ratings, reviews or credentials unless they are real and authorised.
