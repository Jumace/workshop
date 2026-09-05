import type { Metadata } from "next";

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

  return (
    <div className="pageShell overviewPageShell">
      <PageIntro title="Lab" description="Where ideas take shape." variant="overview" />
      {entries.length > 0 ? (
        <section className={styles.section} aria-labelledby="lab-collection">
          <h2 id="lab-collection" className={styles.visuallyHidden}>
            Lab collection
          </h2>
          <LabList entries={entries} />
        </section>
      ) : null}
    </div>
  );
}
