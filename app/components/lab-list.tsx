import Link from "next/link";

import type { LabEntry } from "@/app/lib/content";
import styles from "./lab-list.module.css";

export function LabList({ entries }: { entries: LabEntry[] }) {
  if (entries.length === 0) {
    return (
      <div className={styles.empty}>
        <p className="eyebrow">No public experiments yet</p>
        <h3>The lab is intentionally empty until an experiment has clear edges.</h3>
        <p>
          Planned work includes feature flags, sharing and discovery, and future content-system
          experiments.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {entries.map((entry) => (
        <article key={entry.slug} className={styles.card}>
          <div className={styles.kicker}>
            <span>{entry.platform}</span>
            <span>{entry.labStatus}</span>
          </div>
          <h3>
            <Link href={entry.href}>{entry.title}</Link>
          </h3>
          <p>{entry.description}</p>
          <div className={styles.tags}>
            {entry.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
