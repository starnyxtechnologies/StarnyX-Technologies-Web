# StarnyX Technologies — Public Website

A lightweight static public homepage built with HTML, CSS and vanilla JavaScript. It is designed for direct GitHub upload and Vercel deployment. No Firebase, payment gateway or build step is required for this first public-only release.

## Files

- `index.html` — homepage markup and page sections
- `styles.css` — responsive premium navy / electric-blue design system
- `script.js` — mobile navigation, current year, enquiry mailto, optional WhatsApp link
- `favicon.svg` — StarnyX browser icon
- `robots.txt` and `sitemap.xml` — basic crawl configuration

## Before publishing

1. Confirm the official company WhatsApp number.
2. Open `script.js` and set `STARNYX_CONFIG.whatsappNumber` to the full international number, digits only. For India, use `91` followed by the 10-digit number. Do not include `+`, spaces or hyphens.
3. Confirm the service descriptions and company wording are accurate.
4. The enquiry form currently opens the visitor's email application. It does not save enquiries to a database or send them silently. A real backend enquiry system can be added later.

## GitHub

Create a new **private** repository, for example `starnyx-public-website`, and upload all files and folders from this directory to the repository root.

## Vercel

Import the repository into Vercel.

- Framework Preset: `Other`
- Build Command: leave empty
- Output Directory: `.`
- Install Command: leave empty

Deploy, inspect the Vercel preview, then add `starnyxtechnologies.in` and `www.starnyxtechnologies.in` in Project Settings → Domains. Copy the exact DNS records shown by Vercel into the domain DNS provider; do not guess the DNS values.

## Scope

This is Phase 1: public website only. Explorer, Client and Admin portals, Firebase business workflows and Razorpay payments are intentionally not included in this static release.
