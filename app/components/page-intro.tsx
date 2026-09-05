import type { ReactNode } from "react";

import styles from "./page-intro.module.css";

export function PageIntro({
  eyebrow,
  title,
  description,
  meta,
  variant = "default",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  variant?: "default" | "overview";
}) {
  return (
    <header
      className={variant === "overview" ? `${styles.intro} ${styles.overview}` : styles.intro}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1 className={variant === "overview" ? "tapeSubheading" : undefined}>{title}</h1>
      {description ? <p className={styles.description}>{description}</p> : null}
      {meta ? <div className={styles.meta}>{meta}</div> : null}
    </header>
  );
}
