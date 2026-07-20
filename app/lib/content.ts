import { blogContent, labContent } from "./content.generated";

export type ContentStatus = "draft" | "published";
export type LabStatus = "planned" | "active" | "archived";
export type LabPlatform = "general" | "vercel" | "nextjs" | "ai";

export type ContentSeries = {
  slug: string;
  title: string;
  order: number;
};

export type BlogMetadata = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  status: ContentStatus;
  tags: string[];
  series?: ContentSeries;
};

export type LabMetadata = BlogMetadata & {
  platform: LabPlatform;
  labStatus: LabStatus;
};

export type BlogPost = BlogMetadata & {
  slug: string;
  href: string;
  readingTime: string;
};

export type LabEntry = LabMetadata & {
  slug: string;
  href: string;
};

export type LabPreview = LabMetadata & {
  slug: string;
};

type ContentModule<TMetadata> = {
  default: React.ComponentType;
  metadata: TMetadata;
};

type ContentEntry<TMetadata> = {
  slug: string;
  source: string;
  module: ContentModule<TMetadata>;
};

function isVisible(status: ContentStatus) {
  return status === "published" || process.env.NODE_ENV !== "production";
}

function getReadingTime(markdown: string) {
  const text = markdown
    .replace(/export const metadata[\s\S]*?};/, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_`>[\]()-]/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));

  return `${minutes} min read`;
}

function getEntry<TMetadata>(entries: readonly ContentEntry<TMetadata>[], slug: string) {
  return entries.find((entry) => entry.slug === slug) ?? null;
}

function byPublishedDate<T extends { publishedAt: string }>(a: T, b: T) {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

export async function getBlogPost(slug: string) {
  const entry = getEntry(blogContent, slug);

  if (!entry) {
    return null;
  }

  const mod = entry.module;

  if (!isVisible(mod.metadata.status)) {
    return null;
  }

  return {
    ...mod.metadata,
    slug,
    href: `/blog/${slug}`,
    readingTime: getReadingTime(entry.source),
    Component: mod.default,
  };
}

export async function getPublishedBlogPosts() {
  const posts = await Promise.all(blogContent.map((entry) => getBlogPost(entry.slug)));

  return posts
    .filter((post): post is NonNullable<typeof post> => Boolean(post))
    .filter((post) => post.status === "published")
    .sort(byPublishedDate);
}

export async function getLabEntry(slug: string) {
  const entry = getEntry(labContent, slug);

  if (!entry) {
    return null;
  }

  const mod = entry.module;

  if (!isVisible(mod.metadata.status)) {
    return null;
  }

  return {
    ...mod.metadata,
    slug,
    href: `/lab/${slug}`,
    Component: mod.default,
  };
}

async function getLabPreview(slug: string): Promise<LabPreview> {
  const entry = getEntry(labContent, slug);

  if (!entry) {
    throw new Error(`Unknown lab entry: ${slug}`);
  }

  const mod = entry.module;

  return {
    ...mod.metadata,
    slug,
  };
}

export async function getPublishedLabEntries() {
  const entries = await Promise.all(labContent.map((entry) => getLabEntry(entry.slug)));

  return entries
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
    .filter((entry) => entry.status === "published")
    .sort(byPublishedDate);
}

export async function getDraftLabEntries() {
  const entries = await Promise.all(labContent.map((entry) => getLabPreview(entry.slug)));

  return entries
    .filter((entry) => entry.status === "draft")
    .sort((a, b) => a.title.localeCompare(b.title));
}

export async function getBlogSlugs() {
  const posts = await getPublishedBlogPosts();

  return posts.map((post) => post.slug);
}

export async function getLabSlugs() {
  const entries = await getPublishedLabEntries();

  return entries.map((entry) => entry.slug);
}
