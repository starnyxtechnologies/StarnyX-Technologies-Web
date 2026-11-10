# StarnyX Technologies — Company Website

A fresh, responsive static website for StarnyX Technologies. Built with semantic HTML, CSS and vanilla JavaScript. No framework, build command, external UI library or analytics script is required.

## Publish to GitHub
1. Download and extract this ZIP on your computer.
2. Open the extracted folder. You should immediately see `index.html`, `assets/`, `vercel.json`, `robots.txt` and `sitemap.xml`.
3. Select **everything in that folder** and upload it into the root of your empty GitHub repository.
4. Upload them into the **root** of your empty GitHub repository. Do not upload only the ZIP file or an extra containing folder.
5. Commit the upload.

## Deploy on Vercel
1. Import the GitHub repository in Vercel.
2. Framework Preset: **Other**. Build Command: **empty / disabled**. Output Directory: **`.`** (repository root). Install Command: leave empty.
3. Deploy. No environment variables are required for the static website, WhatsApp enquiry links or Tejas assistant. The enquiry forms prepare a WhatsApp message; they do not collect email addresses or submit data to a website server.
4. In Vercel → Project → Settings → Domains, add both `starnyxtechnologies.in` and `www.starnyxtechnologies.in`. Set **starnyxtechnologies.in** as the primary domain and configure the www domain to redirect to the apex domain using Vercel's domain setting. Do not add an opposite www↔apex redirect in another dashboard or in `vercel.json`. This project intentionally contains no hostname redirects to avoid redirect loops.

## Main features
- Star-led StarnyX brand identity and original SVG artwork
- Responsive pages for company, services, work, demos, pricing, contact, quote and insights
- Tejas: rule-based browser assistant (not an AI chatbot; no chat messages are stored)
- WhatsApp enquiry links and forms (forms open a prefilled WhatsApp draft; the visitor presses Send)
- Lightweight CSS Diwali skyshot animations on every page; respects reduced-motion preferences
- SEO titles, descriptions, canonical URLs, social preview image, Organization schema, FAQ schema, sitemap and robots.txt
- No demo source is bundled. Hotel demo links to its independent deployment; Lodge is marked coming soon.

## Contact
WhatsApp: +91 73855 85398
Website: https://starnyxtechnologies.in/

See `SEO-START-HERE.md` for search setup.
