# StarnyX Technologies — GitHub Pages Ready Website

This package is intentionally **flat**: every HTML page, stylesheet, JavaScript file, logo, favicon and SVG illustration sits directly in the repository root. No `assets/` folder is required. This prevents the missing-folder issue seen when using GitHub's web uploader.

## Upload to your `hg` repository

1. Extract this ZIP on your computer.
2. Open the extracted folder. You should immediately see `index.html`, `site.css`, `site.js`, `starnyx-star.svg`, `hero-studio.svg`, `tejas-avatar.svg`, and the other files.
3. Open `https://github.com/starnyxtechnologies/hg` and choose **Add file → Upload files**.
4. Drag **all files from inside the extracted folder** into GitHub. Do not upload the ZIP itself and do not upload an extra parent folder.
5. Commit to the `main` branch.
6. In Settings → Pages, choose **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
7. Open `https://starnyxtechnologies.github.io/hg/`.

## Why this version fixes the broken layout

The previous repository had the HTML pages but did not contain the `assets/` directory. The pages therefore could not find their CSS, JavaScript or images. This package uses root-level relative references such as `site.css` and `hero-studio.svg`. They resolve correctly on both a project URL like `/hg/` and a custom-domain root URL.

## Website features

- Star-led StarnyX identity and custom SVG artwork
- Responsive company, service, demo, project, pricing, contact and legal pages
- Tejas: rule-based browser assistant (not an AI service; no chat messages are stored)
- WhatsApp enquiry forms which open a prepared message for the visitor to review and send
- Lightweight CSS Diwali skyshot animations; reduced-motion preferences are respected
- SEO titles, descriptions, canonical tags, social preview, structured data, `robots.txt` and `sitemap.xml`

## Important

- No Hotel or Lodge demo source is bundled. The Hotel card links to its separate live demo; Lodge remains marked as coming soon.
- The `robots.txt` and sitemap use `https://starnyxtechnologies.in` as the intended canonical domain. For Google indexing on that domain, configure it as the GitHub Pages custom domain and verify it in Google Search Console.
- No ranking position can be guaranteed. Add genuine project examples, original case studies and real customer feedback as the business earns them.
- `vercel.json` is retained for an optional Vercel deployment; GitHub Pages ignores it.
