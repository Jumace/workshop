import type { Metadata } from "next";

import { EditorialContentRow } from "@/app/components/content-row";
import { MetadataRow, TagList } from "@/app/components/content-meta";
import { PageIntro } from "@/app/components/page-intro";
import { PostList } from "@/app/components/post-list";
import { getPublishedNotebookEntries } from "@/app/lib/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Notebook",
  description: "Notes, reflections, and technical essays by Julian Cebulla.",
  alternates: {
    canonical: "/notebook",
  },
};

export default async function NotebookPage() {
  const posts = await getPublishedNotebookEntries();
  const [highlight, ...remainingPosts] = posts;

  return (
    <div className="pageShell">
      <PageIntro
        eyebrow="NOTEBOOK"
        title="Writing the parts that code does not explain."
        description="Notes, explanations, and reflections for working through ideas, following questions, and making sense of what I learn along the way."
      />
      {highlight ? (
        <section className={styles.section} aria-labelledby="notebook-highlight">
          <p id="notebook-highlight" className={`eyebrow ${styles.highlightLabel}`}>
            Current highlight
          </p>
          <EditorialContentRow
            href={highlight.href}
            title={highlight.title}
            description={highlight.description}
            meta={
              <MetadataRow
                publishedAt={highlight.publishedAt}
                updatedAt={highlight.updatedAt}
                readingTime={highlight.readingTime}
                series={highlight.series}
              />
            }
            footer={<TagList tags={highlight.tags} />}
            emphasis="featured"
          />
        </section>
      ) : null}
      {remainingPosts.length > 0 ? (
        <section className={styles.section} aria-labelledby="notebook-collection">
          <div className={styles.collectionHeader}>
            <h2 id="notebook-collection">Recent notes</h2>
          </div>
          <PostList posts={remainingPosts} />
        </section>
      ) : null}
    </div>
  );
}
