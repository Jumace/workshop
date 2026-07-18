# Deployment

The initial production target is Vercel, but the core site is intentionally portable.

Set `NEXT_PUBLIC_SITE_URL` to the canonical production URL when you have a custom domain. Until then, the site falls back to Vercel's deployment URL in production and `http://localhost:3000` locally. RSS, sitemap, and Open Graph metadata use this value.

Optional Vercel features:

- Enable Web Analytics in the Vercel dashboard.
- Enable Speed Insights in the Vercel dashboard.
- Link the project with `vercel link` when you are ready to configure project-specific services.
- Pull local Vercel environment values with `vercel env pull` if you want to test Vercel Flags locally.

Flags lab variables:

- `LAB_FLAGS_FALLBACK` controls the local fallback accent value when Vercel Flags are not configured.
