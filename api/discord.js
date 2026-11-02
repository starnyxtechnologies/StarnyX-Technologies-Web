// Vercel Serverless Function — StarnyX public website enquiry notifications.
// Configure DISCORD_WEBHOOK_URL in Vercel Project Settings > Environment Variables.
// Never place the webhook URL in browser JavaScript or commit it to GitHub.

const ALLOWED_ORIGINS = new Set([
  'https://starnyxtechnologies.in',
  'https://www.starnyxtechnologies.in',
  'https://starnyx-technologies-web.vercel.app',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
]);

// Best-effort per-instance rate limit. For high-volume production traffic,
// replace this with a shared persistent rate limiter.
const rateBuckets = globalThis.__starnyxEnquiryRateBuckets || (globalThis.__starnyxEnquiryRateBuckets = new Map());
function isRateLimited(ip, now = Date.now()) {
  const windowMs = 10 * 60 * 1000;
  const maxRequests = 5;
  const current = (rateBuckets.get(ip) || []).filter((stamp) => now - stamp < windowMs);
  if (current.length >= maxRequests) {
    rateBuckets.set(ip, current);
    return true;
  }
  current.push(now);
  rateBuckets.set(ip, current);
  if (rateBuckets.size > 5000) {
    for (const [key, stamps] of rateBuckets) {
      if (!stamps.length || now - stamps[stamps.length - 1] >= windowMs) rateBuckets.delete(key);
    }
  }
  return false;
}

function clean(value, max = 1000) {
  return String(value ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);
}

function safeDiscordText(value, max = 900) {
  // Prevent user-submitted text from triggering @everyone/@here or user mentions.
  return clean(value, max).replace(/@/g, '@\u200b');
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, code: 'METHOD_NOT_ALLOWED' });
  }

  const forwardedFor = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  const ip = forwardedFor || String(req.headers['x-real-ip'] || 'unknown');
  if (isRateLimited(ip)) {
    res.setHeader('Retry-After', '600');
    return res.status(429).json({ ok: false, code: 'RATE_LIMITED' });
  }

  const origin = req.headers.origin;
  const previewOrigin = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null;
  const configuredOrigins = String(process.env.ALLOWED_ORIGIN || '')
    .split(',').map((value) => value.trim()).filter(Boolean);
  if (!origin || (!ALLOWED_ORIGINS.has(origin) && origin !== previewOrigin && !configuredOrigins.includes(origin))) {
    return res.status(403).json({ ok: false, code: 'ORIGIN_NOT_ALLOWED' });
  }

  const contentType = String(req.headers['content-type'] || '').toLowerCase();
  if (!contentType.includes('application/json')) {
    return res.status(415).json({ ok: false, code: 'UNSUPPORTED_MEDIA_TYPE' });
  }

  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) {
    return res.status(503).json({ ok: false, code: 'NOT_CONFIGURED' });
  }

  let webhookUrl;
  try {
    webhookUrl = new URL(webhook);
    const validHost = webhookUrl.hostname === 'discord.com' || webhookUrl.hostname === 'discordapp.com';
    if (webhookUrl.protocol !== 'https:' || !validHost || !webhookUrl.pathname.startsWith('/api/webhooks/')) {
      return res.status(500).json({ ok: false, code: 'INVALID_WEBHOOK_CONFIGURATION' });
    }
  } catch {
    return res.status(500).json({ ok: false, code: 'INVALID_WEBHOOK_CONFIGURATION' });
  }

  let body = req.body && typeof req.body === 'object' ? req.body : {};
  if (typeof req.body === 'string') {
    try { body = JSON.parse(req.body); } catch { body = {}; }
  }
  // Honeypot: respond quietly to simple bot submissions without forwarding them.
  if (clean(body.company_website, 160)) {
    return res.status(200).json({ ok: true, code: 'RECEIVED' });
  }

  const name = safeDiscordText(body.name, 80);
  const phone = safeDiscordText(body.phone, 40) || 'Not provided';
  const service = safeDiscordText(body.service, 100) || 'Not selected';
  const budget = safeDiscordText(body.budget, 80) || 'Not specified';
  const message = safeDiscordText(body.message, 900);
  const source = safeDiscordText(body.source, 60) || 'Public website';

  if (!name || !message || message.length < 8) {
    return res.status(400).json({ ok: false, code: 'INVALID_ENQUIRY' });
  }

  const content = [
    '**New StarnyX website enquiry**',
    `**Name:** ${name}`,
    `**WhatsApp:** ${phone}`,
    `**Service:** ${service}`,
    `**Budget:** ${budget}`,
    `**Source:** ${source}`,
    '**Project details:**',
    message
  ].join('\n');

  try {
    const response = await fetch(webhookUrl.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, allowed_mentions: { parse: [] } }),
      signal: AbortSignal.timeout(8000)
    });
    if (!response.ok) {
      console.error('Discord webhook returned non-success status:', response.status);
      return res.status(502).json({ ok: false, code: 'DELIVERY_FAILED' });
    }
    return res.status(200).json({ ok: true, code: 'DISPATCHED' });
  } catch (error) {
    console.error('Discord webhook delivery failed:', error?.name || 'UnknownError');
    return res.status(502).json({ ok: false, code: 'DELIVERY_FAILED' });
  }
};
