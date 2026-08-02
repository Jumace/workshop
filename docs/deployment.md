# Deployment

The production target is Cloudflare Workers via OpenNext.

The canonical site URL defaults to `https://cebulla.dev` in code. RSS, sitemap, canonical links, and Open Graph metadata use this value.

Use `SITE_URL` only when an environment needs to override that default. For local development, put `SITE_URL=http://localhost:3000` in `.env.development.local`, not `.env`, so local production builds and deploys still use the production default. Preview deployments can use the production URL as their canonical URL.

`NEXT_PUBLIC_SITE_URL` is still accepted as a fallback for existing environments, but `SITE_URL` is preferred because the value is only used by server-rendered routes and metadata.

Cloudflare deployment:

- Configure Cloudflare's Git deploy command as `pnpm deploy`.
- If Cloudflare uses separate commands, set the build command to `pnpm build` and the deploy command to `pnpm opennextjs-cloudflare deploy`.
- Do not run `opennextjs-cloudflare deploy` without first running `pnpm build` in the same Cloudflare job. A fresh Cloudflare build container will otherwise fail because the compiled OpenNext config is missing.
- `pnpm preview` builds the Cloudflare Worker and previews it locally with Wrangler.
- `pnpm build:next` remains available for a plain Next.js production build.

Flags lab variables:

- `LAB_FLAGS_FALLBACK` controls the accent value for the flags lab demo.
