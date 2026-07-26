import type { ReactNode } from "react";

import styles from "./page-intro.module.css";

export function PageIntro({
  eyebrow,
  title,
  description,
  meta,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <header className={styles.intro}>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {description ? <p className={styles.description}>{description}</p> : null}
      {meta ? <div className={styles.meta}>{meta}</div> : null}
    </header>
  );
}
