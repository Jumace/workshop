import type { Metadata } from "next";

import { LabList } from "@/app/components/lab-list";
import { getDraftLabEntries, getPublishedLabEntries } from "@/app/lib/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Lab",
  description: "Experiments, prototypes, and technology notes by Julian Cebulla.",
};

export default async function LabPage() {
  const [entries, upcomingEntries] = await Promise.all([
    getPublishedLabEntries(),
    getDraftLabEntries(),
  ]);

  return (
    <div className="pageShell">
      <header className="pageIntro">
        <p className="eyebrow">Lab</p>
        <h1>Experiments with honest boundaries.</h1>
        <p>
          The lab is for small experiments that may be general, Vercel-specific, AI-related, or
          simply useful to understand how this site works.
        </p>
      </header>
      <LabList entries={entries} />
      {upcomingEntries.length > 0 ? (
        <section className={styles.upcoming} aria-labelledby="coming-next">
          <div className="sectionHeader">
            <p className="eyebrow">Coming next</p>
            <h2 id="coming-next">Possible experiments I might explore next.</h2>
          </div>
          <div className={styles.upcomingGrid}>
            {upcomingEntries.map((entry) => (
              <article key={entry.slug} className={styles.upcomingCard}>
                <div className={styles.upcomingMeta}>
                  <span>{entry.platform}</span>
                  <span>{entry.labStatus}</span>
                </div>
                <h3>{entry.title}</h3>
                <p>{entry.description}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
