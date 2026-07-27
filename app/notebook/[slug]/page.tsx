import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MetadataRow, TagList } from "@/app/components/content-meta";
import { PageIntro } from "@/app/components/page-intro";
import { RelatedContent } from "@/app/components/related-content";
import { getNotebookEntry, getNotebookSlugs } from "@/app/lib/content";
import { absoluteUrl } from "@/app/lib/site";
import { getContentReferencesByIds } from "@/lib/content-metadata";

export async function generateStaticParams() {
  const slugs = await getNotebookSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNotebookEntry(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: post.href,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      url: absoluteUrl(post.href),
    },
  };
}

export default async function NotebookEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getNotebookEntry(slug);

  if (!post) {
    notFound();
  }

  const { Component } = post;
  const relatedItems = getContentReferencesByIds([...post.related.notebook, ...post.related.lab]);

  return (
    <article className="pageShell">
      <PageIntro
        eyebrow="NOTEBOOK"
        title={post.title}
        description={post.description}
        meta={
          <>
            <MetadataRow
              publishedAt={post.publishedAt}
              updatedAt={post.updatedAt}
              readingTime={post.readingTime}
              series={post.series}
            />
            <TagList tags={post.tags} />
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
