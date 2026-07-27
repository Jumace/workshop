import { notFound } from "next/navigation";

import { createOgImage, ogImageSize } from "@/app/lib/og-image";
import { getLabEntry, getLabSlugs } from "@/app/lib/content";

export const size = ogImageSize;
export const contentType = "image/png";

export async function generateStaticParams() {
  const slugs = await getLabSlugs();

  return slugs.map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getLabEntry(slug);

  if (!entry) {
    notFound();
  }

  return createOgImage({
    eyebrow: "LAB",
    title: entry.title,
    description: entry.description,
  });
}
