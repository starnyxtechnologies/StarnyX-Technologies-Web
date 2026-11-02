# Discord webhook setup for the StarnyX public website

## Important
Do not paste a Discord webhook URL into GitHub source files, HTML, JavaScript, README, or a public repository. Anyone who can see a public repository can copy a committed webhook and send messages to your Discord channel.

The website's `api/discord.js` is a Vercel serverless function. It reads `process.env.DISCORD_WEBHOOK_URL` at runtime. GitHub repository secrets are only available to GitHub Actions jobs; they are not automatically passed to the running Vercel Function.

## Configure
1. Create a private Discord channel for website enquiries.
2. In Discord, open the channel settings → Integrations → Webhooks → New Webhook.
3. Copy the webhook URL.
4. In Vercel, open the StarnyX project → Settings → Environment Variables.
5. Add `DISCORD_WEBHOOK_URL` with the copied URL as its value for Production.
6. Add `ALLOWED_ORIGIN` with `https://starnyxtechnologies.in` (add `https://www.starnyxtechnologies.in` too if visitors use it).
7. Redeploy the project so the new values are available to the function.
8. Submit a test enquiry and confirm the private Discord channel receives it.

Environment variables themselves are a standard Vercel project setting; if the dashboard is prompting for a paid plan, check whether it is asking you to upgrade the team/plan for commercial use or another Pro-only feature. Do not expose the webhook as a workaround.
