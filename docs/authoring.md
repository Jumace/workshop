# Authoring

Blog posts live in `content/blog/<slug>/index.mdx`. The folder name is the public URL slug, so `content/blog/welcome/index.mdx` renders at `/blog/welcome`.

Each post exports metadata:

```mdx
export const metadata = {
  title: "Post title",
  description: "Short summary for indexes, RSS, and metadata.",
  publishedAt: "2026-07-18",
  status: "draft",
  tags: ["nextjs", "mdx"],
  series: {
    slug: "building-the-workshop",
    title: "Building the workshop",
    order: 1,
  },
};
```

Use `status: 'draft'` while writing and `status: 'published'` when the post should be visible in production. Drafts can be committed safely.

The `series` field is optional. Use it when a blog post or lab entry belongs to a larger thread. For now, series metadata is recorded but not rendered into navigation.

Lab entries live in `content/lab/<slug>/index.mdx` and add `platform` plus `labStatus`.

Lab entries can import TSX demos from `components/lab-demos`. Keep authored content in `content/` and supporting interactive components in `components/`:

```mdx
import { ContentInventory } from "@/components/lab-demos/content-inventory";

<DemoFrame title="Content inventory">
  <ContentInventory />
</DemoFrame>
```

Available MDX components:

- `Callout`
- `ContentLinkCard`
- `LinkCard`
- `DemoFrame`

Use `ContentLinkCard` for internal blog/lab links so the title and description come from the linked article's metadata:

```mdx
<ContentLinkCard type="lab" slug="content-architecture" label="Related lab entry" />
```

Run `pnpm validate:content` and `pnpm check:spelling` before publishing content.
