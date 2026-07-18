import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const collections = [
  {
    name: "blog",
    dir: path.join(root, "content", "blog"),
    required: ["title", "description", "publishedAt", "status", "tags"],
  },
  {
    name: "lab",
    dir: path.join(root, "content", "lab"),
    required: ["title", "description", "publishedAt", "status", "tags", "platform", "labStatus"],
  },
];

const validStatuses = new Set(["draft", "published"]);
const validLabStatuses = new Set(["planned", "active", "archived"]);
let failures = 0;

function readEntries(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({ slug: entry.name, file: path.join(dir, entry.name, "index.mdx") }))
    .filter((entry) => fs.existsSync(entry.file));
}

function extractMetadata(source, file) {
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
        return Function(`"use strict"; return (${objectSource});`)();
      }
    }
  }

  throw new Error(`${file} has an unterminated metadata object.`);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

for (const collection of collections) {
  for (const entry of readEntries(collection.dir)) {
    try {
      const source = fs.readFileSync(entry.file, "utf8");
      const metadata = extractMetadata(source, entry.file);

      for (const field of collection.required) {
        assert(metadata[field] !== undefined, `${entry.file} is missing metadata.${field}.`);
      }

      assert(validStatuses.has(metadata.status), `${entry.file} has invalid status.`);
      assert(Array.isArray(metadata.tags), `${entry.file} metadata.tags must be an array.`);
      assert(!entry.slug.includes("/"), `${entry.file} slug must be a direct folder name.`);

      if (metadata.series !== undefined) {
        assert(
          typeof metadata.series === "object",
          `${entry.file} metadata.series must be an object.`,
        );
        assert(
          typeof metadata.series.slug === "string",
          `${entry.file} metadata.series.slug is required.`,
        );
        assert(
          typeof metadata.series.title === "string",
          `${entry.file} metadata.series.title is required.`,
        );
        assert(
          typeof metadata.series.order === "number",
          `${entry.file} metadata.series.order is required.`,
        );
      }

      if (collection.name === "lab") {
        assert(validLabStatuses.has(metadata.labStatus), `${entry.file} has invalid labStatus.`);
      }
    } catch (error) {
      failures += 1;
      console.error(error.message);
    }
  }
}

if (failures > 0) {
  process.exit(1);
}

console.log("Content metadata looks good.");
