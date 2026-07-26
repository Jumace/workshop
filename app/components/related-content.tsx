import Link from "next/link";

import type { ContentReference } from "@/lib/content-metadata";
import styles from "./related-content.module.css";

export function RelatedContent({ items }: { items: ContentReference[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className={styles.related} aria-label="Related content">
      {items.map((item) => (
        <Link key={item.metadata.id} className={styles.card} href={item.href}>
          <span className={styles.eyebrow}>
            {item.metadata.type === "lab" ? "From the Lab" : "From the Notebook"}
          </span>
          <div className={styles.titleLine}>
            <h2>{item.metadata.title}</h2>
            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
          </div>
          <p>{item.metadata.description}</p>
        </Link>
      ))}
    </section>
  );
}
