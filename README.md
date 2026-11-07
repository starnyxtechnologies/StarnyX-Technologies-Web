# StarnyX Technologies — New Public Website

A fresh, independent redesign of the StarnyX public company website. The interface, logo mark, visual system, vector artwork, page layouts and browser interactions have been created as a new implementation. This is not the StarnyX web application.

## Design direction

- Premium editorial technology-studio identity: warm paper surfaces, deep ink/navy, restrained saffron and muted gold accents.
- No large Diwali photo/banner in the hero. Seasonal character is limited to carefully drawn diya/rangoli details and two small CSS-only skyshot accents in the home hero.
- Original SVG brand mark, product-system hero visual, diya line artwork, rangoli motif and social preview artwork.
- Responsive layout for desktop, laptop, tablet and mobile. Accessible navigation, native FAQ accordions, keyboard focus styles and reduced-motion support.
- No Canvas, animation libraries, continuous JavaScript animation loops or external stock photography. Google Fonts are loaded as progressive enhancement; system sans-serif fallbacks are defined.

## Pages

18 top-level pages: Home, Studio/About, Services, Demos, Our Developments, Offers, Pricing, FAQ, Contact, Get a Quote, Careers, Privacy Policy, Terms, Refund Policy, Cookie Policy, Disclaimer, Service Agreement and 404.

## Enquiries

- Public WhatsApp contact: `+91 73855 85398`. Forms prepare a detailed WhatsApp message; the visitor must review and press Send.
- Optional private Discord notifications use the Vercel serverless function at `/api/enquiry`. Configure `DISCORD_WEBHOOK_URL` and `ALLOWED_ORIGIN` in Vercel Environment Variables. The webhook is never included in browser code.
- No email contact flow, user login, payment checkout or database is included.

## Separate demo websites

The Demos and Our Developments pages contain cards and links only. The currently published Hotel Demo opens `https://starnyxtechnologies.github.io/Hotel-demo/`. Other industry demos are labelled as in development/coming soon until their independent websites are published. No Hotel or Lodge demo source code is bundled here.

## Local preview

No package installation or build step is required. Open `index.html` directly or run:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`. The WhatsApp forms work as a handoff. Discord notifications require Vercel and server-side environment variables.

## Deploy to GitHub + Vercel

1. Extract the ZIP and upload all files/folders to the root of the StarnyX public website repository.
2. Remove any obsolete local `demos/` directory left from earlier versions. Individual demo websites remain in separate repositories.
3. Commit the changes to the production branch.
4. In Vercel use Framework Preset `Other`, with no build command and output directory `.`.
5. Keep the existing domain assignment or confirm `starnyxtechnologies.in` and `www.starnyxtechnologies.in` under Vercel → Settings → Domains.
6. Configure the Discord variables only if private enquiry notifications are needed, then redeploy.

## Scope and commercial details

This is a public marketing website, not the future Explorer / Client / Admin application. Pricing is requirement-based; no fixed price or automatic discount is promised. Project scope, delivery, fees and any offer are confirmed in a written proposal. Review the legal and commercial copy before treating it as legal advice or a signed agreement.
