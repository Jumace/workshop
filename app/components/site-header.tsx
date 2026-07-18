import Link from "next/link";

import styles from "./site-header.module.css";

const navItems = [
  { href: "/blog", label: "Blog" },
  { href: "/lab", label: "Lab" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Primary navigation">
        <Link className={styles.brand} href="/" aria-label="Julian Cebulla home">
          <span>Julian Cebulla</span>
          <small>workshop</small>
        </Link>
        <div className={styles.links}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
