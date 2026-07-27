import fs from "node:fs";
import path from "node:path";
import { z } from "zod";

import {
  labMetadataSchema,
  notebookMetadataSchema,
  type ContentMetadata,
} from "../lib/content-schemas";

const root = process.cwd();
const collections = [
  {
    name: "notebook",
    dir: path.join(root, "content", "notebook"),
    schema: notebookMetadataSchema,
    metadataType: "notebook",
  },
  {
    name: "lab",
    dir: path.join(root, "content", "lab"),
    schema: labMetadataSchema,
    metadataType: "lab",
  },
] as const;

type Collection = (typeof collections)[number];
type ContentEntry = {
  collection: Collection["name"];
  file: string;
  metadata: ContentMetadata;
};

const failures: string[] = [];
const warnings: string[] = [];

function readEntries(dir: string) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({ slug: entry.name, file: path.join(dir, entry.name, "index.mdx") }))
    .filter((entry) => fs.existsSync(entry.file));
}

function extractMetadata(source: string, file: string) {
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
        return Function(`"use strict"; return (${objectSource});`)() as unknown;
      }
    }
  }

  throw new Error(`${file} has an unterminated metadata object.`);
}

function formatValidationIssues(error: z.ZodError) {
  return error.issues.map((issue) => {
    const field = issue.path.length > 0 ? `metadata.${issue.path.join(".")}` : "metadata";

    return `${field}: ${issue.message}`;
  });
}

function addFailure(file: string, field: string, message: string) {
  failures.push(`${file} ${field}: ${message}`);
}

function addWarning(message: string) {
  warnings.push(message);
}

function normalizeTagForComparison(tag: string) {
  return tag.toLowerCase().replace(/[-_\s]+/g, "");
}

function singularize(tag: string) {
  return tag.endsWith("s") && tag.length > 3 ? tag.slice(0, -1) : tag;
}

function validateEntry(collection: Collection, entry: { slug: string; file: string }) {
  const source = fs.readFileSync(entry.file, "utf8");
  const rawMetadata = extractMetadata(source, entry.file);
  const parsed = collection.schema.safeParse(rawMetadata);

  if (!parsed.success) {
    for (const issue of formatValidationIssues(parsed.error)) {
      failures.push(`${entry.file} ${issue}`);
    }

    return null;
  }

  if (parsed.data.type !== collection.metadataType) {
    addFailure(
      entry.file,
      "metadata.type",
      `expected ${collection.metadataType} for ${collection.name} collection`,
    );
  }

  if (entry.slug.includes("/")) {
    addFailure(entry.file, "slug", "must be a direct folder name");
  }

  return {
    collection: collection.name,
    file: entry.file,
    metadata: parsed.data,
  } satisfies ContentEntry;
}

const entries: ContentEntry[] = [];

for (const collection of collections) {
  for (const entry of readEntries(collection.dir)) {
    try {
      const validated = validateEntry(collection, entry);

      if (validated) {
        entries.push(validated);
      }
    } catch (error) {
      failures.push(error instanceof Error ? error.message : String(error));
    }
  }
}

const byId = new Map<string, ContentEntry>();
const seriesTitles = new Map<string, { title: string; file: string }>();
const seriesOrders = new Map<string, Map<number, string>>();

for (const entry of entries) {
  const existing = byId.get(entry.metadata.id);

  if (existing) {
    addFailure(
      entry.file,
      "metadata.id",
      `duplicates ${entry.metadata.id}; first used in ${existing.file}`,
    );
  } else {
    byId.set(entry.metadata.id, entry);
  }

  const { series } = entry.metadata;

  if (series) {
    const existingSeries = seriesTitles.get(series.slug);

    if (existingSeries && existingSeries.title !== series.title) {
      addFailure(
        entry.file,
        "metadata.series.title",
        `series slug ${series.slug} uses title ${JSON.stringify(
          series.title,
        )}, but ${existingSeries.file} uses ${JSON.stringify(existingSeries.title)}`,
      );
    } else if (!existingSeries) {
      seriesTitles.set(series.slug, { title: series.title, file: entry.file });
    }

    const orders = seriesOrders.get(series.slug) ?? new Map<number, string>();
    const existingOrderFile = orders.get(series.order);

    if (existingOrderFile) {
      addFailure(
        entry.file,
        "metadata.series.order",
        `series slug ${series.slug} already uses order ${series.order} in ${existingOrderFile}`,
      );
    } else {
      orders.set(series.order, entry.file);
      seriesOrders.set(series.slug, orders);
    }
  }
}

const tagFiles = new Map<string, string[]>();
const normalizedTags = new Map<string, Set<string>>();
const singularTags = new Map<string, Set<string>>();

for (const entry of entries) {
  for (const tag of entry.metadata.tags) {
    tagFiles.set(tag, [...(tagFiles.get(tag) ?? []), entry.file]);

    const normalized = normalizeTagForComparison(tag);
    const normalizedSet = normalizedTags.get(normalized) ?? new Set<string>();
    normalizedSet.add(tag);
    normalizedTags.set(normalized, normalizedSet);

    const singular = singularize(tag.toLowerCase());
    const singularSet = singularTags.get(singular) ?? new Set<string>();
    singularSet.add(tag);
    singularTags.set(singular, singularSet);
  }
}

const exactDuplicateTags = [...tagFiles.entries()]
  .filter(([, files]) => files.length > 1)
  .map(([tag, files]) => `${tag} (${files.length} entries)`);

if (exactDuplicateTags.length > 0) {
  addWarning(`Reusable tags: ${exactDuplicateTags.join(", ")}`);
}

const capitalizationInconsistencies = [...normalizedTags.values()]
  .map((tags) => [...tags].sort())
  .filter((tags) => tags.length > 1);

for (const tags of capitalizationInconsistencies) {
  addWarning(`Capitalization or spelling variants: ${tags.join(", ")}`);
}

const singularPluralVariants = [...singularTags.values()]
  .map((tags) => [...tags].sort())
  .filter((tags) => tags.length > 1);

for (const tags of singularPluralVariants) {
  addWarning(`Singular/plural variants: ${tags.join(", ")}`);
}

const allTags = [...tagFiles.keys()].sort();
const nearSynonyms: string[] = [];

for (const tag of allTags) {
  for (const otherTag of allTags) {
    if (tag >= otherTag) {
      continue;
    }

    const normalized = normalizeTagForComparison(tag);
    const otherNormalized = normalizeTagForComparison(otherTag);

    if (
      normalized !== otherNormalized &&
      (normalized.includes(otherNormalized) || otherNormalized.includes(normalized))
    ) {
      nearSynonyms.push(`${tag} / ${otherTag}`);
    }
  }
}

if (nearSynonyms.length > 0) {
  addWarning(`Possible near-synonyms: ${nearSynonyms.join(", ")}`);
}

const singleUseTags = [...tagFiles.entries()]
  .filter(([, files]) => files.length === 1)
  .map(([tag]) => tag)
  .sort();

if (singleUseTags.length > 0) {
  addWarning(`Tags used only once: ${singleUseTags.join(", ")}`);
}

for (const entry of entries) {
  for (const notebookId of entry.metadata.related.notebook) {
    const target = byId.get(notebookId);

    if (!target) {
      addFailure(entry.file, "metadata.related.notebook", `unknown content id ${notebookId}`);
    } else if (target.metadata.type !== "notebook") {
      addFailure(
        entry.file,
        "metadata.related.notebook",
        `${notebookId} points to ${target.metadata.type}, expected notebook`,
      );
    }
  }

  for (const labId of entry.metadata.related.lab) {
    const target = byId.get(labId);

    if (!target) {
      addFailure(entry.file, "metadata.related.lab", `unknown content id ${labId}`);
    } else if (target.metadata.type !== "lab") {
      addFailure(
        entry.file,
        "metadata.related.lab",
        `${labId} points to ${target.metadata.type}, expected lab`,
      );
    }
  }
}

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(failure);
  }

  process.exit(1);
}

console.log("Content metadata looks good.");

if (warnings.length > 0) {
  console.log("\nTag review notes:");

  for (const warning of warnings) {
    console.log(`- ${warning}`);
  }
}
