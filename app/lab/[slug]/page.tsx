import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LabStateLabel, MetadataRow, TagList } from "@/app/components/content-meta";
import { PageIntro } from "@/app/components/page-intro";
import { RelatedContent } from "@/app/components/related-content";
import { getLabEntry, getLabSlugs } from "@/app/lib/content";
import { absoluteUrl } from "@/app/lib/site";
import { getContentReferencesByIds } from "@/lib/content-metadata";

export async function generateStaticParams() {
  const slugs = await getLabSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getLabEntry(slug);

  if (!entry) {
    return {};
  }

  return {
    title: entry.title,
    description: entry.description,
    alternates: {
      canonical: entry.href,
    },
    openGraph: {
      title: entry.title,
      description: entry.description,
      url: absoluteUrl(entry.href),
    },
  };
}

export default async function LabEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getLabEntry(slug);

  if (!entry) {
    notFound();
  }

  const { Component } = entry;
  const relatedItems = getContentReferencesByIds([...entry.related.notebook, ...entry.related.lab]);

  return (
    <article className="pageShell">
      <PageIntro
        eyebrow="LAB"
        title={entry.title}
        description={entry.description}
        meta={
          <>
            <div>
              <LabStateLabel state={entry.project.stage} />
            </div>
            <MetadataRow publishedAt={entry.publishedAt} updatedAt={entry.updatedAt} />
            <TagList tags={entry.tags} />
          </>
        }
      />
      <div className="prose">
        <Component />
      </div>
      <RelatedContent items={relatedItems} />
    </article>
  );
}
