# StarnyX Technologies — Public Website (Phase 1)

A multi-page static public company website built with HTML, CSS and vanilla JavaScript. It can be uploaded directly to a GitHub repository and deployed on Vercel without a build step.

## Pages included

- Home (`index.html`)
- About (`about.html`)
- Services (`services.html`)
- Our Work (`projects.html`)
- Pricing approach (`pricing.html`)
- FAQ (`faq.html`)
- Contact (`contact.html`)
- Get a Quote (`quote.html`)
- Careers (`careers.html`)
- Privacy, Terms, Refund, Cookie, Disclaimer and Service Agreement pages
- Custom 404 page (`404.html`)

## Before publishing

1. Confirm the service descriptions and company wording are accurate.
2. Open `script.js` and set `STARNYX_CONFIG.whatsappNumber` to the official business number in international digits-only format (India: `91` followed by the 10-digit number). Leave it empty until confirmed.
3. The enquiry forms open the visitor's email application with the enquiry prepared. The static website does not save or submit form data to a server.
4. Legal pages are initial drafts and visibly include a review note. Have the actual business practices and legal wording reviewed before relying on them as formal policies. Keep unapproved legal pages unpublished or remove them before launch.
5. Confirm that the illustrative concept cards on Our Work are clearly understood as concepts, not completed customer projects.

## GitHub

Create a private repository such as `starnyx-public-website` and upload the contents of this folder to the repository root.

## Vercel

Import the repository into Vercel. Use:

- Framework Preset: `Other`
- Build Command: leave empty
- Output Directory: `.`
- Install Command: leave empty

After the preview is checked, add `starnyxtechnologies.in` and `www.starnyxtechnologies.in` in Vercel → Project Settings → Domains. Copy the exact DNS records shown by Vercel into the domain DNS provider; do not guess DNS values.

## Scope

This is Phase 1: public website only. It intentionally excludes authentication, Explorer/Client/Admin portals, Firebase business workflows and online payments. These can be developed later as a separate application, for example at `app.starnyxtechnologies.in`.
