# Website Launch TODO

## 1. Production Identity

- [ ] Choose the final production domain. _(deferred until late launch prep)_
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the canonical production URL. _(only needed once a custom domain exists)_
- [x] Review the site title, description, and metadata copy.
- [x] Confirm the default Open Graph image works for sharing.

## 2. Core Content

- [x] Rewrite the About page with the real personal essay.
- [x] Rewrite the welcome post into a proper launch post.
- [x] Decide whether the current lab entries should stay published or move back to draft.
- [x] Review the Privacy page text.

## 3. Design Review

- [x] Review the homepage on desktop.
- [x] Review the homepage on mobile.
- [x] Review the blog index and post layout.
- [x] Review the Lab index and lab detail pages.
- [x] Review short pages to confirm the footer sits at the bottom of the viewport.
- [x] Finalize the avatar treatment.

## 4. Cloudflare Deployment

- [x] Add OpenNext Cloudflare and Wrangler configuration.
- [ ] Add production environment variables in Cloudflare.
- [ ] Deploy and review a Cloudflare Workers preview URL.

## 5. Lab Features

- [ ] Decide whether the flags lab needs a Cloudflare-backed flag provider.
- [ ] Shape the sharing/discovery lab around previews, SEO, feeds, Markdown, and AI-readable content.

## 6. Quality Gates

- [x] Confirm Lefthook runs locally before commits.
- [x] Confirm GitHub Actions pass on push or pull request.
- [x] Run `pnpm format`.
- [x] Run `pnpm lint`.
- [x] Run `pnpm typecheck`.
- [x] Run `pnpm validate:content`.
- [x] Run `pnpm check:spelling`.
- [x] Run `pnpm build`.

## 7. Launch

- [ ] Connect the production domain.
- [x] Verify RSS at `/rss.xml`.
- [x] Verify sitemap at `/sitemap.xml`.
- [x] Verify the Open Graph image route.
- [x] Publish the first real post.
- [x] Confirm drafts are hidden in production.
- [ ] Announce/share the site.
