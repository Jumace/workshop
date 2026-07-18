import { getContentReference, listContentSlugs, type ContentKind } from "@/lib/content-metadata";
import { ContentInventoryView, type InventoryItem } from "./content-inventory-view";

function getEntries(kind: ContentKind): InventoryItem[] {
  return listContentSlugs(kind)
    .map((slug) => {
      const reference = getContentReference(kind, slug);
      const { metadata } = reference;
      const isPublished = metadata.status === "published";
      const appearsIn = [
        isPublished ? (kind === "blog" ? "Blog index" : "Lab index") : null,
        kind === "lab" && !isPublished ? "Coming next" : null,
        kind === "blog" && isPublished ? "RSS" : null,
        isPublished ? "Sitemap" : null,
      ].filter((item): item is string => Boolean(item));

      return {
        type: kind,
        title: metadata.title,
        status: metadata.status,
        sourcePath: reference.sourcePath,
        route: isPublished ? reference.href : "Not public in production",
        appearsIn,
        series: metadata.series?.title,
      };
    })
    .sort((a, b) => a.type.localeCompare(b.type) || a.title.localeCompare(b.title));
}

export function ContentInventory() {
  const items = [...getEntries("blog"), ...getEntries("lab")];

  return <ContentInventoryView items={items} />;
}
