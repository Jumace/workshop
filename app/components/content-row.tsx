import Link from "next/link";
import type { ReactNode } from "react";

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
}: {
  href: string;
  meta: ReactNode;
  title: string;
  description: string;
  footer?: ReactNode;
  note?: ReactNode;
  variant?: "notebook" | "lab";
  emphasis?: "standard" | "featured" | "quiet";
}) {
  const className = [styles.row, styles[variant], emphasis !== "standard" ? styles[emphasis] : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <Link className={className} href={href}>
      <div className={styles.meta}>{meta}</div>
      <div className={styles.headingLine}>
        <h3>{title}</h3>
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      </div>
      <p>{description}</p>
      {note ? <div className={styles.note}>{note}</div> : null}
      {footer ? <div className={styles.footer}>{footer}</div> : null}
    </Link>
  );
}
