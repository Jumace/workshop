import { contentReferences } from "./content-metadata.generated";

export type ContentKind = "blog" | "lab";

export type ContentMetadata = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  status: "draft" | "published";
  tags: string[];
  platform?: string;
  labStatus?: string;
  series?: {
    slug: string;
    title: string;
    order: number;
  };
};

export type ContentReference = {
  type: ContentKind;
  slug: string;
  href: string;
  sourcePath: string;
  metadata: ContentMetadata;
};

export function extractMetadata(source: string, file: string): ContentMetadata {
  const marker = "export const metadata =";
  const start = source.indexOf(marker);

  if (start === -1) {
    throw new Error(`${file} is missing exported metadata.`);
  }

  const objectStart = source.indexOf("{", start);
  let depth = 0;

  for (let index = objectStart; index < source.length; index += 1) {
    const character = source[index];

    if (character === "{") {
      depth += 1;
    }

    if (character === "}") {
      depth -= 1;

      if (depth === 0) {
        const objectSource = source.slice(objectStart, index + 1);

        return Function(`"use strict"; return (${objectSource});`)() as ContentMetadata;
      }
    }
  }

  throw new Error(`${file} has an unterminated metadata object.`);
}

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

export function listContentSlugs(type: ContentKind) {
  return contentReferences
    .filter((reference) => reference.type === type)
    .map((reference) => reference.slug)
    .sort();
}
