import type { Metadata } from "next";

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

  return (
    <div className="pageShell overviewPageShell">
      <PageIntro
        title="Notebook"
        description="Writing the parts that code does not explain. Notes, explanations, and reflections for working through ideas, following questions, and making sense of what I learn along the way."
        variant="overview"
      />
      {posts.length > 0 ? (
        <section className={styles.section} aria-labelledby="notebook-collection">
          <div className="sectionHeader">
            <h2 id="notebook-collection">Recent notes</h2>
          </div>
          <PostList posts={posts} />
        </section>
      ) : null}
    </div>
  );
}
