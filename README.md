# StarnyX Technologies — complete, drop-in public website

This ZIP is the **complete public marketing website** for https://www.starnyxtechnologies.in/. It is not the future Explorer / Client / Admin web application. Hotel and Lodge demo websites remain separate projects and are not bundled here.

## IMPORTANT — upload this ZIP correctly

1. Extract this ZIP to a folder on your computer.
2. Open the extracted folder. You should immediately see `index.html`, `styles.css`, `site.js`, `vercel.json`, `robots.txt`, `sitemap.xml`, `assets/`, `api/` and `insights/`.
3. Select **everything inside that folder** (not the ZIP file and not the enclosing folder) and upload/replace it in the **root of the StarnyX website GitHub repository**.
4. Delete old website files/folders that are no longer part of this release. Do not keep an old `index.html`, old styles or an old `demos/` source folder.
5. Commit the change. Vercel will deploy from the repository root.

The essential stylesheet, JavaScript, logo and SVG artwork are provided twice: in the organized `assets/` folders and as root-level fallbacks. Every HTML page also contains a full inline CSS/JS/SVG fallback, so it still renders correctly if an uploader misses a nested folder. The organized copies remain the editable source of truth for future updates.

## Structure

```text
/
├── index.html and all other main HTML pages
├── styles.css, site.js, starnyx-mark.svg, studio-system.svg, diya-line.svg,
│   rangoli-motif.svg, favicon files and og-cover.png (root-level fallbacks)
├── assets/
│   ├── css/styles.css
│   ├── js/site.js
│   ├── icons/ (editable logo + favicon source files)
│   └── images/ (original SVG artwork + social preview image)
├── insights/ (three original practical guides)
├── api/enquiry.js (optional Vercel private Discord notification)
├── robots.txt, sitemap.xml, site.webmanifest, vercel.json, .nojekyll
├── SEO-PLAYBOOK.md, DEPLOY-CHECKLIST.txt, DISCORD-SETUP.md
```

## Pages

Home, Studio, Services, Demos, Our Developments, Insights hub, Offers, Pricing, FAQ, Contact, Quote, Careers, Privacy, Terms, Refunds, Cookies, Disclaimer, Service Agreement and 404; plus three practical articles under `insights/`.

## Vercel setup

`vercel.json` pins the framework to **Other**, disables build/install commands and sets output directory to `.` (the repository root). This prevents a stale `public` or `dist` output-directory setting from excluding the HTML/CSS/assets. Vercel documents that `outputDirectory` in `vercel.json` overrides the dashboard setting: https://vercel.com/docs/project-configuration/vercel-json

No npm install, framework build or build command is required for this static site. The optional serverless handler is in `/api/enquiry.js`.

## Enquiries

The website uses WhatsApp `+91 73855 85398`. The visitor reviews their prefilled enquiry and presses Send. If private Discord alerts are wanted, follow `DISCORD-SETUP.md` and add `DISCORD_WEBHOOK_URL` and `ALLOWED_ORIGIN` in Vercel Environment Variables. Never put a webhook URL in HTML, CSS, JavaScript or public GitHub. If Discord is not configured or the hosting platform does not support the API route, the WhatsApp enquiry flow still works.

No email contact flow, login, payment checkout, database or CMS is included.

## Preview

Open a terminal in the extracted folder and run `python -m http.server 8080`; then visit `http://localhost:8080`.

## Before publishing

Review policy and commercial wording; confirm contact details; test WhatsApp and navigation on phone and desktop. Do not add invented customer logos, ratings, testimonials, registrations, addresses or project outcomes.
