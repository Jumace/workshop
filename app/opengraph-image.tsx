import { createOgImage, ogImageSize } from "@/app/lib/og-image";

export const alt = "cebulla.dev — Following the spark.";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return createOgImage({
    title: "cebulla.dev",
    description: "Writing, experiments, and software shaped by curiosity.",
  });
}
