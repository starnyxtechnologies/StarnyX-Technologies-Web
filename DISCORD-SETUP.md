# Private Discord enquiry notifications

The website opens each enquiry in WhatsApp so the visitor can review and send it. If configured, the serverless endpoint also forwards a private notification to a Discord channel.

1. Create an incoming webhook in the private Discord channel.
2. In Vercel → Project → Settings → Environment Variables, add `DISCORD_WEBHOOK_URL` with the private webhook URL.
3. Add `ALLOWED_ORIGIN` with `https://www.starnyxtechnologies.in,https://www.starnyxtechnologies.in`.
4. Apply to Production and redeploy.
5. Submit a test form and check the private channel.

Never place the webhook URL in HTML, CSS, browser JavaScript, screenshots or a public GitHub repository. GitHub Actions secrets are not automatically injected into Vercel Functions. If the notification is not configured, the WhatsApp enquiry path still works.
