import Link from "next/link";

import { siteConfig } from "@/app/lib/site";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p>Where the thinking and the making stay connected.</p>
        <div className={styles.links}>
          <a href={siteConfig.author.github}>GitHub</a>
          <a href={siteConfig.author.linkedin}>LinkedIn</a>
          <Link href="/privacy">Privacy</Link>
          <Link href="/rss.xml">RSS</Link>
        </div>
      </div>
    </footer>
  );
}
