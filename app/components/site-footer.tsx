import Link from "next/link";

import { siteConfig } from "@/app/lib/site";
import { SparkIcon } from "./spark-icon";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p>Following what the spark started.</p>
        <SparkIcon className={styles.spark} />
        <div className={styles.links}>
          <a href={siteConfig.author.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={siteConfig.author.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <Link href="/privacy">Privacy</Link>
          <Link href="/rss.xml">RSS</Link>
        </div>
      </div>
    </footer>
  );
}
