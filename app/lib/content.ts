import fs from "node:fs";
import path from "node:path";

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

const contentRoot = path.join(process.cwd(), "content");

function isVisible(status: ContentStatus) {
  return status === "published" || process.env.NODE_ENV !== "production";
}

function getSlugs(collection: "blog" | "lab") {
  const collectionRoot = path.join(contentRoot, collection);

  if (!fs.existsSync(collectionRoot)) {
    return [];
  }

  return fs
    .readdirSync(collectionRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => fs.existsSync(path.join(collectionRoot, entry.name, "index.mdx")))
    .map((entry) => entry.name)
    .sort();
}

function getMdxSource(collection: "blog" | "lab", slug: string) {
  return fs.readFileSync(path.join(contentRoot, collection, slug, "index.mdx"), "utf8");
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

function byPublishedDate<T extends { publishedAt: string }>(a: T, b: T) {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

export async function getBlogPost(slug: string) {
  const mod = (await import(`@/content/blog/${slug}/index.mdx`)) as ContentModule<BlogMetadata>;

  if (!isVisible(mod.metadata.status)) {
    return null;
  }

  return {
    ...mod.metadata,
    slug,
    href: `/blog/${slug}`,
    readingTime: getReadingTime(getMdxSource("blog", slug)),
    Component: mod.default,
  };
}

export async function getPublishedBlogPosts() {
  const posts = await Promise.all(getSlugs("blog").map((slug) => getBlogPost(slug)));

  return posts
    .filter((post): post is NonNullable<typeof post> => Boolean(post))
    .filter((post) => post.status === "published")
    .sort(byPublishedDate);
}

export async function getLabEntry(slug: string) {
  const mod = (await import(`@/content/lab/${slug}/index.mdx`)) as ContentModule<LabMetadata>;

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
  const mod = (await import(`@/content/lab/${slug}/index.mdx`)) as ContentModule<LabMetadata>;

  return {
    ...mod.metadata,
    slug,
  };
}

export async function getPublishedLabEntries() {
  const entries = await Promise.all(getSlugs("lab").map((slug) => getLabEntry(slug)));

  return entries
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
    .filter((entry) => entry.status === "published")
    .sort(byPublishedDate);
}

export async function getDraftLabEntries() {
  const entries = await Promise.all(getSlugs("lab").map((slug) => getLabPreview(slug)));

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
