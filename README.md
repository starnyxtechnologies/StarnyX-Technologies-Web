# StarnyX Technologies — Public Website

Premium static public website for **StarnyX Technologies**.

- Official domain: https://starnyxtechnologies.in
- WhatsApp enquiries: +91 73855 85398
- UI: HTML, CSS and vanilla JavaScript
- Hosting: Vercel (static pages + one serverless Discord notification endpoint)
- No public payment gateway, login or business application is included in this phase.

## Pages

Home, About, Services, Our Work, Pricing, Offers, FAQ, Contact, Get a Quote, Careers, Privacy Policy, Terms, Refund Policy, Cookie Policy, Disclaimer, Service Agreement and 404.

## Run locally

Open `index.html` in a browser for a static preview. For the Discord serverless function, use the Vercel CLI: install the Vercel CLI, run `vercel dev` from this folder, and set `DISCORD_WEBHOOK_URL` in a local `.env.local` file. Never commit `.env.local`.

## Deploy to GitHub and Vercel

1. Create a private GitHub repository, for example `starnyx-public-website`.
2. Upload the contents of this folder to the repository root (not the parent folder).
3. Import the repository in Vercel.
4. Framework Preset: **Other**.
5. Build Command: leave blank.
6. Output Directory: `.` (repository root).
7. Install Command: leave blank.
8. Deploy.
9. Add `starnyxtechnologies.in` and `www.starnyxtechnologies.in` in Vercel → Project → Settings → Domains.
10. Copy the exact DNS records Vercel displays into the DNS provider for the domain. Wait until Vercel verifies the domain and provisions HTTPS.

The `api/discord.js` file is a Vercel Node.js Serverless Function. It is deployed as `/api/discord`.

## Add the Discord webhook (IMPORTANT)

The Discord webhook URL is a secret. **Do not paste it into `script.js`, any HTML file, GitHub, or a public screenshot.**

1. In Discord, create or choose a private channel for website enquiries, e.g. `#website-enquiries`.
2. Open that channel’s **Edit Channel → Integrations → Webhooks**.
3. Choose **New Webhook**, give it a name such as `StarnyX Website Enquiries`, select the correct channel, and copy the webhook URL.
4. Open **Vercel Dashboard → your website project → Settings → Environment Variables**.
5. Add a variable named exactly `DISCORD_WEBHOOK_URL`. Paste the copied webhook URL as its value. Select **Production** (and Preview too only if you want preview enquiries sent to the same channel).
6. Optionally set `ALLOWED_ORIGIN` to `https://starnyxtechnologies.in`. The function already allows the official root domain, `www` domain, local development origins and the active Vercel deployment URL. It also applies a best-effort per-function-instance rate limit; for a high-traffic launch, add a shared rate limiter or CAPTCHA/bot protection.
7. Save the variables and trigger a new deployment (Deployments → latest deployment → Redeploy). Vercel Functions read environment variables at runtime; redeploy after changing them.
8. Test the Contact or Get a Quote form. The visitor’s WhatsApp opens with a prepared message; they must tap **Send** in WhatsApp. When the webhook is configured, the website also sends a private notification to the Discord channel.

If `DISCORD_WEBHOOK_URL` is absent, the website still works and WhatsApp enquiries remain available. The form will report that the private Discord alert is not configured.

## WhatsApp number

The number is configured in `script.js` as `917385585398` (country code 91 + number). The website does not send WhatsApp messages automatically; it opens WhatsApp with a pre-filled enquiry and the visitor confirms by tapping **Send**.

## Diwali offer

The public website advertises up to 25% off selected StarnyX service fees using enquiry reference `DIWALI25`. It does not automatically calculate or deduct a discount. Confirm eligibility, final discount, exclusions and booking validity in a written quotation over WhatsApp. Third-party costs are excluded unless specifically stated.

## Important launch notes

- No email collection or `mailto:` contact flow is used.
- No online payment gateway is included in this public-only phase.
- The chatbot is a small rule-based JavaScript guide, not an AI model. It does not access private data.
- Legal pages are initial website information and should be reviewed for actual business practices before being treated as formal legal advice.
- Portfolio examples should be published only when they represent genuine work or are clearly labelled as illustrative demos.
