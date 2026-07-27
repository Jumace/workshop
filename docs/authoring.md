# Authoring

Notebook entries live in `content/notebook/<slug>/index.mdx`. The folder name is the public URL slug, so `content/notebook/welcome/index.mdx` renders at `/notebook/welcome`.

Each entry exports metadata:

```mdx
export const metadata = {
  id: "stable-content-id",
  type: "notebook",
  title: "Entry title",
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

Use `status: 'draft'` while writing and `status: 'published'` when the entry should be visible in production. Drafts can be committed safely.

Tags stay as a single flat metadata list. Use concise reusable terms that are lowercase where practical, lowercase kebab-case when a compound term is clearer, or an established uppercase acronym such as `LLM`. Do not add spaces, duplicate spelling variants, dashboard-style categories, or one-off labels unless the entry genuinely needs them. Run `pnpm validate:content` to catch invalid tag formats and print tag-review notes.

The `series` field is optional. Use it when a Notebook entry or Lab entry belongs to a larger thread. For now, series metadata is recorded but not rendered into navigation.

Lab entries live in `content/lab/<slug>/index.mdx` and add a `project` block with stage and activity dates.

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

Use `ContentLinkCard` for internal Notebook/Lab links so the title and description come from the linked article's metadata:

```mdx
<ContentLinkCard type="lab" slug="content-architecture" label="Related lab entry" />
```

Run `pnpm validate:content` and `pnpm spelling:check` before publishing content.
