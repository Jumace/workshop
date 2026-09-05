import Link from "next/link";
import type { ReactNode } from "react";

import { SparkIcon } from "@/app/components/spark-icon";
import type { ContentReference } from "@/lib/content-metadata";
import styles from "./content-row.module.css";

export function EditorialContentRow({
  href,
  meta,
  title,
  description,
  footer,
  note,
  variant = "notebook",
  emphasis = "standard",
  index,
  related = [],
}: {
  href: string;
  meta: ReactNode;
  title: string;
  description: string;
  footer?: ReactNode;
  note?: ReactNode;
  variant?: "notebook" | "lab";
  emphasis?: "standard" | "featured" | "quiet";
  index?: number;
  related?: ContentReference[];
}) {
  const className = [styles.row, styles[variant], emphasis !== "standard" ? styles[emphasis] : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.rowGroup}>
      <Link className={className} href={href}>
        {index !== undefined ? (
          <span className={styles.index} aria-hidden="true">
            {String(index).padStart(2, "0")}
          </span>
        ) : null}
        <div className={styles.content}>
          <div className={styles.meta}>{meta}</div>
          <div className={styles.headingLine}>
            <h3>{title}</h3>
            <SparkIcon className={styles.spark} variant="compact" />
          </div>
          <p>{description}</p>
          {note ? <div className={styles.note}>{note}</div> : null}
          {footer ? <div className={styles.footer}>{footer}</div> : null}
        </div>
      </Link>
      {related.length > 0 ? (
        <div className={styles.relationship}>
          <span className={styles.connector} aria-hidden="true" />
          <span>{variant === "notebook" ? "Sparked" : "Ignited by"}</span>
          {related.map((item) => (
            <Link key={`${item.type}-${item.slug}`} href={item.href}>
              {item.metadata.title}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
