import { z } from "zod";
import { contentReferences as rawContentReferences } from "./content-metadata.generated";
import { contentMetadataSchema, type ContentMetadata } from "./content-schemas";

export type ContentKind = "notebook" | "lab";

export type ContentReference = {
  type: ContentKind;
  slug: string;
  href: string;
  sourcePath: string;
  metadata: ContentMetadata;
};

function formatValidationIssues(error: z.ZodError) {
  return error.issues
    .map((issue) => `metadata.${issue.path.join(".") || "root"}: ${issue.message}`)
    .join("\n");
}

function parseReference(reference: Omit<ContentReference, "metadata"> & { metadata: unknown }) {
  const parsed = contentMetadataSchema.safeParse(reference.metadata);

  if (!parsed.success) {
    throw new Error(
      `Invalid metadata in ${reference.sourcePath}:\n${formatValidationIssues(parsed.error)}`,
    );
  }

  return {
    ...reference,
    metadata: parsed.data,
  } satisfies ContentReference;
}

export const contentReferences = rawContentReferences.map(parseReference);

export function getContentSourcePath(type: ContentKind, slug: string) {
  return `content/${type}/${slug}/index.mdx`;
}

export function getContentReference(type: ContentKind, slug: string): ContentReference {
  const reference = contentReferences.find((item) => item.type === type && item.slug === slug);

  if (!reference) {
    throw new Error(`Missing content file: ${getContentSourcePath(type, slug)}`);
  }

  return reference;
}

export function getContentReferenceById(id: string): ContentReference {
  const reference = contentReferences.find((item) => item.metadata.id === id);

  if (!reference) {
    throw new Error(`Missing content id: ${id}`);
  }

  return reference;
}

export function getContentReferencesByIds(ids: string[]) {
  return ids.map(getContentReferenceById);
}

export function listContentSlugs(type: ContentKind) {
  return contentReferences
    .filter((reference) => reference.type === type)
    .map((reference) => reference.slug)
    .sort();
}
