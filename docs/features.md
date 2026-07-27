# Feature Notes

This document tracks useful ideas that are intentionally not implemented yet.

## Series

Series metadata exists on Notebook entries and Lab entries, but there are no series UI components or routes yet.

Current metadata shape:

```ts
series: {
  slug: "building-the-workshop",
  title: "Building the workshop",
  order: 1,
}
```

Deferred series features:

- Render a small series badge on Notebook and Lab detail pages.
- Add previous and next links within the same series.
- Add a mixed Notebook/Lab series timeline.
- Add `/series/[slug]` pages.
- Add a series index page if there are enough series.
- Add validation for duplicate `series.order` values within the same series.
- Add related content cards generated from series metadata instead of hand-written links.

The goal is to connect evolving work without blurring the boundary between Notebook and Lab: the Notebook explains why something mattered, and the Lab shows what was tried.
