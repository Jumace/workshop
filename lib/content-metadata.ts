import fs from "node:fs";
import path from "node:path";

export type ContentKind = "blog" | "lab";

export type ContentMetadata = {
  title: string;
  description: string;
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

const contentRoot = path.join(process.cwd(), "content");

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
  const sourcePath = getContentSourcePath(type, slug);
  const filePath = path.join(process.cwd(), sourcePath);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing content file: ${sourcePath}`);
  }

  const metadata = extractMetadata(fs.readFileSync(filePath, "utf8"), sourcePath);

  return {
    type,
    slug,
    href: `/${type}/${slug}`,
    sourcePath,
    metadata,
  };
}

export function listContentSlugs(type: ContentKind) {
  const collectionRoot = path.join(contentRoot, type);

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
