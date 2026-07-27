import { labContent, notebookContent } from "./content.generated";
import {
  labMetadataSchema,
  notebookMetadataSchema,
  type ContentMetadata,
  type LabMetadata,
  type NotebookMetadata,
} from "@/lib/content-schemas";
import { z } from "zod";

export type ContentStatus = ContentMetadata["status"];
export type ProjectStage = LabMetadata["project"]["stage"];

export type NotebookEntryMetadata = NotebookMetadata;
export type { ContentMetadata, LabMetadata, NotebookMetadata };

export type NotebookEntry = NotebookMetadata & {
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
  sourcePath: string;
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

function formatValidationIssues(error: z.ZodError) {
  return error.issues
    .map((issue) => `metadata.${issue.path.join(".") || "root"}: ${issue.message}`)
    .join("\n");
}

function parseEntryMetadata<TMetadata>(
  schema: z.ZodType<TMetadata>,
  rawMetadata: unknown,
  sourcePath: string,
) {
  const parsed = schema.safeParse(rawMetadata);

  if (!parsed.success) {
    throw new Error(`Invalid metadata in ${sourcePath}:\n${formatValidationIssues(parsed.error)}`);
  }

  return parsed.data;
}

function byPublishedDate<T extends { publishedAt: string }>(a: T, b: T) {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

export async function getNotebookEntry(slug: string) {
  const entry = getEntry(notebookContent, slug);

  if (!entry) {
    return null;
  }

  const mod = entry.module;
  const metadata = parseEntryMetadata(notebookMetadataSchema, mod.metadata, entry.sourcePath);

  if (!isVisible(metadata.status)) {
    return null;
  }

  return {
    ...metadata,
    slug,
    href: `/notebook/${slug}`,
    readingTime: getReadingTime(entry.source),
    Component: mod.default,
  };
}

export async function getPublishedNotebookEntries() {
  const posts = await Promise.all(notebookContent.map((entry) => getNotebookEntry(entry.slug)));

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
  const metadata = parseEntryMetadata(labMetadataSchema, mod.metadata, entry.sourcePath);

  if (!isVisible(metadata.status)) {
    return null;
  }

  return {
    ...metadata,
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
  const metadata = parseEntryMetadata(labMetadataSchema, mod.metadata, entry.sourcePath);

  return {
    ...metadata,
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

export async function getNotebookSlugs() {
  const posts = await getPublishedNotebookEntries();

  return posts.map((post) => post.slug);
}

export async function getLabSlugs() {
  const entries = await getPublishedLabEntries();

  return entries.map((entry) => entry.slug);
}
