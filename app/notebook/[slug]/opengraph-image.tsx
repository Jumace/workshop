import { notFound } from "next/navigation";

import { createOgImage, ogImageSize } from "@/app/lib/og-image";
import { getNotebookEntry, getNotebookSlugs } from "@/app/lib/content";

export const size = ogImageSize;
export const contentType = "image/png";

export async function generateStaticParams() {
  const slugs = await getNotebookSlugs();

  return slugs.map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getNotebookEntry(slug);

  if (!post) {
    notFound();
  }

  return createOgImage({
    eyebrow: "NOTEBOOK",
    title: post.title,
    description: post.description,
  });
}
