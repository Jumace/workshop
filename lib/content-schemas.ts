import { z } from "zod";

const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const stableIdPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const tagPattern = /^(?:[a-z0-9]+(?:-[a-z0-9]+)*|[A-Z0-9]{2,})$/;

export const dateStringSchema = z
  .string()
  .regex(datePattern, "Expected YYYY-MM-DD date format")
  .refine((value) => {
    const parsed = new Date(`${value}T00:00:00.000Z`);

    return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
  }, "Expected a valid calendar date");

export const stableContentIdSchema = z
  .string()
  .regex(stableIdPattern, "Expected lowercase kebab-case content id");
export const tagSchema = z
  .string()
  .min(1)
  .regex(
    tagPattern,
    "Expected a lowercase reusable tag, lowercase kebab-case tag, or established uppercase acronym",
  );

export const contentStatusSchema = z.enum(["draft", "review", "published", "archived"]);
export const contentTypeSchema = z.enum(["notebook", "lab"]);
export const projectStageSchema = z.enum(["exploring", "active", "paused", "stable", "stopped"]);

export const contentSeriesSchema = z
  .object({
    slug: stableContentIdSchema,
    title: z.string().min(1),
    order: z.number().int().positive(),
  })
  .strict();

export const relatedContentSchema = z
  .object({
    notebook: z.array(stableContentIdSchema),
    lab: z.array(stableContentIdSchema),
  })
  .strict();

const baseMetadataSchema = z
  .object({
    id: stableContentIdSchema,
    type: contentTypeSchema,
    title: z.string().min(1),
    description: z.string().min(1),
    publishedAt: dateStringSchema,
    updatedAt: dateStringSchema,
    status: contentStatusSchema,
    tags: z.array(tagSchema).superRefine((tags, context) => {
      const seen = new Set<string>();

      for (const [index, tag] of tags.entries()) {
        if (seen.has(tag)) {
          context.addIssue({
            code: "custom",
            path: [index],
            message: `Duplicate tag ${tag}`,
          });
        }

        seen.add(tag);
      }
    }),
    series: contentSeriesSchema.optional(),
    related: relatedContentSchema,
    featured: z.boolean(),
  })
  .strict();

export const notebookMetadataSchema = baseMetadataSchema.extend({
  type: z.literal("notebook"),
});

export const labProjectSchema = z
  .object({
    stage: projectStageSchema,
    startedAt: dateStringSchema,
    lastActivityAt: dateStringSchema,
    currentQuestion: z.string().min(1).optional(),
    nextStep: z.string().min(1).optional(),
    stoppedAt: dateStringSchema.optional(),
    stopReason: z.string().min(1).optional(),
  })
  .strict()
  .superRefine((project, context) => {
    if (project.stage !== "stopped" && project.stoppedAt !== undefined) {
      context.addIssue({
        code: "custom",
        path: ["stoppedAt"],
        message: "stoppedAt is only valid when project.stage is stopped",
      });
    }

    if (project.stage !== "stopped" && project.stopReason !== undefined) {
      context.addIssue({
        code: "custom",
        path: ["stopReason"],
        message: "stopReason is only valid when project.stage is stopped",
      });
    }
  });

export const labMetadataSchema = baseMetadataSchema.extend({
  type: z.literal("lab"),
  project: labProjectSchema,
});

export const contentMetadataSchema = z.discriminatedUnion("type", [
  notebookMetadataSchema,
  labMetadataSchema,
]);

export type NotebookMetadata = z.infer<typeof notebookMetadataSchema>;
export type LabMetadata = z.infer<typeof labMetadataSchema>;
export type ContentMetadata = z.infer<typeof contentMetadataSchema>;
