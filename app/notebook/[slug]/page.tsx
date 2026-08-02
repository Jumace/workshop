import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleReadingMap } from "@/app/components/article-reading-map";
import { MetadataRow, TagList } from "@/app/components/content-meta";
import { PageIntro } from "@/app/components/page-intro";
import { RelatedContent } from "@/app/components/related-content";
import { getNotebookEntry, getNotebookSlugs } from "@/app/lib/content";
import { absoluteUrl } from "@/app/lib/site";
import { getContentReferencesByIds } from "@/lib/content-metadata";
import styles from "./page.module.css";

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
      images: [
        {
          url: absoluteUrl(`${post.href}/opengraph-image`),
          width: 1200,
          height: 630,
          alt: `${post.title} — cebulla.dev Notebook`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [absoluteUrl(`${post.href}/opengraph-image`)],
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
  const showReadingMap = post.sections.length >= 2;

  return (
    <article
      className={styles.entryShell}
      data-has-reading-map={showReadingMap ? "true" : undefined}
    >
      <div className={styles.introArea}>
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
      </div>
      {showReadingMap ? (
        <aside className={styles.readingMap}>
          <ArticleReadingMap sections={post.sections} />
        </aside>
      ) : null}
      <div className={`prose ${styles.proseArea}`}>
        <Component />
      </div>
      <div className={styles.relatedArea}>
        <RelatedContent items={relatedItems} />
      </div>
    </article>
  );
}
