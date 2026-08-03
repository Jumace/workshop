import type { Metadata } from "next";

import { EditorialContentRow } from "@/app/components/content-row";
import { LabStateLabel, MetadataRow, TagList } from "@/app/components/content-meta";
import { LabList } from "@/app/components/lab-list";
import { PageIntro } from "@/app/components/page-intro";
import { getPublishedLabEntries } from "@/app/lib/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Lab",
  description: "Experiments, prototypes, and technology notes by Julian Cebulla.",
  alternates: {
    canonical: "/lab",
  },
};

export default async function LabPage() {
  const entries = await getPublishedLabEntries();
  const [highlight, ...remainingEntries] = entries;

  return (
    <div className="pageShell overviewPageShell">
      <PageIntro
        title="Lab"
        description="Experiments with honest boundaries. Small experiments, prototypes, and tools—shared with clear boundaries around what works, what does not, and what I am still learning."
        variant="overview"
      />
      {highlight ? (
        <section className={styles.section} aria-labelledby="lab-highlight">
          <div className="sectionHeader">
            <h2 id="lab-highlight">Current project</h2>
          </div>
          <EditorialContentRow
            href={highlight.href}
            title={highlight.title}
            description={highlight.description}
            variant="lab"
            meta={
              <>
                <LabStateLabel state={highlight.project.stage} />
                <MetadataRow publishedAt={highlight.publishedAt} updatedAt={highlight.updatedAt} />
              </>
            }
            note={
              highlight.project.currentQuestion ? (
                <>Question: {highlight.project.currentQuestion}</>
              ) : null
            }
            footer={<TagList tags={highlight.tags} />}
          />
        </section>
      ) : null}
      {remainingEntries.length > 0 ? (
        <section className={styles.section} aria-labelledby="lab-collection">
          <div className="sectionHeader">
            <h2 id="lab-collection">More Lab work</h2>
          </div>
          <LabList entries={remainingEntries} />
        </section>
      ) : null}
    </div>
  );
}
