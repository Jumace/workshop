# Deployment

The production target is Cloudflare Workers via OpenNext.

Set `NEXT_PUBLIC_SITE_URL` to the canonical production URL when you have a custom domain. Until then, the site falls back to `http://localhost:3000`. RSS, sitemap, and Open Graph metadata use this value.

Cloudflare deployment:

- Configure Cloudflare's Git deploy command as `pnpm deploy`. This is the most reliable setup because it builds OpenNext and then deploys in the same command.
- If Cloudflare uses separate commands, set the build command to `pnpm build` and the deploy command to `pnpm opennextjs-cloudflare deploy`. `pnpm build` creates `.open-next/.build/open-next.config.edge.mjs`, which `opennextjs-cloudflare deploy` needs.
- Do not run `opennextjs-cloudflare deploy` without first running `pnpm build` in the same Cloudflare job. A fresh Cloudflare build container will otherwise fail with `Could not find compiled Open Next config, did you run the build command?`.
- `pnpm deploy` builds the Next.js app with OpenNext and deploys it with Wrangler.
- `pnpm preview` builds the Cloudflare Worker and previews it locally with Wrangler.
- `pnpm wrangler deploy` can deploy an already-built `.open-next` output, but `pnpm deploy` is preferred so the Worker is rebuilt first.

Flags lab variables:

- `LAB_FLAGS_FALLBACK` controls the accent value for the flags lab demo.
