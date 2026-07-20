import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getBlogPost, getBlogSlugs } from "@/app/lib/content";
import { absoluteUrl } from "@/app/lib/site";
import styles from "./page.module.css";

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

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

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const { Component } = post;

  return (
    <article className="pageShell">
      <header className={styles.header}>
        <p className="eyebrow">Blog</p>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <div className={styles.meta}>
          <time dateTime={post.publishedAt}>
            {new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(
              new Date(post.publishedAt),
            )}
          </time>
          <span>{post.readingTime}</span>
        </div>
      </header>
      <div className="prose">
        <Component />
      </div>
    </article>
  );
}
