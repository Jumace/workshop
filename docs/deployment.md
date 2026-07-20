# Deployment

The production target is Cloudflare Workers via OpenNext.

Set `NEXT_PUBLIC_SITE_URL` to the canonical production URL when you have a custom domain. Until then, the site falls back to `http://localhost:3000`. RSS, sitemap, and Open Graph metadata use this value.

Cloudflare deployment:

- Configure Cloudflare's Git deploy command as `pnpm deploy`.
- If Cloudflare uses separate commands, set the build command to `pnpm build` and the deploy command to `pnpm opennextjs-cloudflare deploy`.
- Do not run `opennextjs-cloudflare deploy` without first running `pnpm build` in the same Cloudflare job. A fresh Cloudflare build container will otherwise fail because the compiled OpenNext config is missing.
- `pnpm preview` builds the Cloudflare Worker and previews it locally with Wrangler.
- `pnpm build:next` remains available for a plain Next.js production build.

Flags lab variables:

- `LAB_FLAGS_FALLBACK` controls the accent value for the flags lab demo.
