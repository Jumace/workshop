import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getLabEntry, getLabSlugs } from "@/app/lib/content";
import { absoluteUrl } from "@/app/lib/site";
import styles from "./page.module.css";

export const dynamicParams = false;

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

  return (
    <article className="pageShell">
      <header className={styles.header}>
        <p className="eyebrow">Lab / {entry.platform}</p>
        <h1>{entry.title}</h1>
        <p>{entry.description}</p>
        <div className={styles.meta}>
          <span>{entry.labStatus}</span>
          {entry.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </header>
      <div className="prose">
        <Component />
      </div>
    </article>
  );
}
