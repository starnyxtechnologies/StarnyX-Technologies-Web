# StarnyX Technologies — SEO & Google Search launch playbook

This is an action guide, not a promise of a Google position. No code or agency can guarantee the first result for every query. Google says useful, original, people-first content is one of the strongest foundations, and indexing/ranking is not guaranteed.

## 1. Technical SEO already included in this project

- One preferred hostname: `https://starnyxtechnologies.in/` (the Vercel config redirects `www` to the apex host if both domains are attached).
- `/index.html` permanently redirects to `/`, avoiding a second homepage URL.
- Page-specific titles, descriptions, canonical URLs, Open Graph/Twitter share metadata and a raster social preview image.
- `robots.txt`, an XML sitemap with canonical public pages, and `lastmod` dates.
- Organization + WebSite JSON-LD on the home page, and Article JSON-LD on each original guide. No fake street address, reviews, ratings, client logos or LocalBusiness details are included.
- Mobile-responsive layouts, reduced-motion support, image assets kept local, and semantic headings/links.
- Original guides that link into relevant services and enquiry pages.

## 2. Set up Google Search Console after deployment

1. Sign in to Google Search Console using the Google account that will own the property.
2. Add a **Domain property** for `starnyxtechnologies.in`.
3. Google will provide a DNS TXT verification value. Add that exact value at the DNS provider for the domain. The value is unique to your account and is intentionally not fabricated or included in this ZIP.
4. Complete verification, open **Sitemaps**, and submit `sitemap.xml`.
5. Open **URL Inspection** and inspect the home page, `/services.html`, `/demos.html`, `/projects.html` and `/insights.html`. After the live pages return successfully, use **Request indexing** for the most important pages.
6. Check **Page indexing** and **Core Web Vitals** over time. Fix any real errors shown there; do not repeatedly request indexing for the same URL.

Google may take days or weeks to crawl updates. A sitemap or indexing request helps discovery; it does not guarantee indexing or an immediate ranking.

## 3. Search topics to build around

Use these as starting topics, then review actual Search Console queries before making changes:

- Brand: `StarnyX Technologies`, `StarnyX`.
- Core service pages: `website development company India`, `business website development India`, `web application development India`, `UI UX design services`, `mobile app development`.
- Decision support: `business website planning checklist`, `website vs web application`, `website project brief`.

Do not repeat phrases unnaturally. Keep each page focused on the questions it genuinely answers. The homepage introduces the studio; the Services page describes delivery capabilities; the Demos and Work pages show real independently hosted examples; each guide answers one practical question.

## 4. Build trust and useful signals

- Add real project write-ups as work is completed. Include the problem, your role, approach, actual screenshots and what was delivered. Publish measurable results only when you can substantiate them and have permission.
- Ask real customers for honest reviews on platforms they actually use. Never buy reviews or fabricate testimonials.
- Publish genuinely useful guides based on work and questions you can answer. Update them when services, tools or recommendations change.
- Earn relevant links through genuine partners, associations, client credits (with permission), local business networks and useful resources. Avoid paid link schemes, mass directory spam and automated backlinks.
- Keep business name, phone and website details consistent wherever you list the business.

## 5. Google Business Profile — only if eligible

A Business Profile is for businesses that make in-person contact with customers during stated hours. An online-only company or virtual office is not eligible. Create one only if StarnyX has a real staffed location that meets Google's guidelines or genuinely serves customers in person as a service-area business. Do not invent or rent a virtual address for ranking.

## 6. Monthly review routine

- In Search Console, compare clicks, impressions, average position and click-through rate over the previous 28 days.
- Identify relevant queries with impressions but weak click-through; improve titles/descriptions so they accurately describe the page.
- Identify pages getting impressions for the wrong intent; improve the content or internal links rather than stuffing more keywords.
- Check new indexing issues, broken links, mobile layout and real enquiry completion.
- Add one genuinely useful guide or project story when there is something original to say—not just to hit a publishing quota.

## 7. Before going live checklist

- Attach both `starnyxtechnologies.in` and `www.starnyxtechnologies.in` to the same Vercel project and confirm HTTPS is active.
- Deploy the ZIP contents with `index.html`, `assets/`, `api/`, `insights/`, `robots.txt`, `sitemap.xml`, `vercel.json` and `site.webmanifest` at the repository root.
- Open the home page, services, contact, quote, one insight article, the sitemap and robots file in a private browser window.
- Submit a test enquiry. WhatsApp should open with a draft; the visitor presses Send. For Discord notifications, set `DISCORD_WEBHOOK_URL` and `ALLOWED_ORIGIN` as Vercel server-side Environment Variables and redeploy.
- Verify Google Search Console after deployment and submit the sitemap.

## Official Google references

- SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Page indexing report: https://support.google.com/webmasters/answer/7440203
- Request a recrawl: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- Business Profile eligibility: https://support.google.com/business/answer/13763036
