import type { MetadataRoute } from "next";

import { getPublishedBlogPosts, getPublishedLabEntries } from "@/app/lib/content";
import { absoluteUrl } from "@/app/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, labs] = await Promise.all([getPublishedBlogPosts(), getPublishedLabEntries()]);
  const staticRoutes = ["/", "/blog", "/lab", "/about", "/privacy"];

  return [
    ...staticRoutes.map((route) => ({ url: absoluteUrl(route) })),
    ...posts.map((post) => ({
      url: absoluteUrl(post.href),
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
    })),
    ...labs.map((entry) => ({
      url: absoluteUrl(entry.href),
      lastModified: new Date(entry.updatedAt ?? entry.publishedAt),
    })),
  ];
}
