# Discord webhook setup

1. In Discord, create an incoming webhook in the private channel where website enquiries should appear.
2. Copy the webhook URL. Keep it private.
3. Open Vercel → your StarnyX website project → Settings → Environment Variables.
4. Add `DISCORD_WEBHOOK_URL` and paste the copied URL as its value.
5. Add `ALLOWED_ORIGIN` with `https://starnyxtechnologies.in,https://www.starnyxtechnologies.in`.
6. Select Production (and Preview only if desired), save, and redeploy.
7. Submit a test enquiry from the deployed Contact or Get a Quote page and check the private Discord channel.

Do not paste the webhook URL into `script.js`, HTML, CSS, `.env.example`, GitHub source, screenshots or public chat. GitHub repository secrets are not automatically injected into Vercel Functions.

Expected API statuses include `DISPATCHED`, `NOT_CONFIGURED`, `ORIGIN_NOT_ALLOWED`, `RATE_LIMITED` and `DELIVERY_FAILED`.
