"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SparkIcon } from "./spark-icon";
import styles from "./site-header.module.css";

const navItems = [
  { href: "/notebook", label: "Notebook" },
  { href: "/lab", label: "Lab" },
  { href: "/about", label: "About" },
];

function NavUnderline() {
  return (
    <svg className={styles.navUnderline} viewBox="0 0 120 14" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5 C22 7.5 43 7 63 6.5 C83 6 99 6.8 117 8" strokeWidth="3" />
        <path d="M10 11 C32 9.2 51 8.7 70 8 C88 7.4 103 8 114 9" strokeWidth="1.3" opacity=".5" />
      </g>
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Primary navigation">
        <Link
          className={styles.brand}
          href="/"
          aria-label="cebulla.dev home"
          aria-current={pathname === "/" ? "page" : undefined}
        >
          <SparkIcon className={styles.spark} />
          <span>cebulla.dev</span>
        </Link>
        <div className={styles.links}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link key={item.href} href={item.href} aria-current={isActive ? "page" : undefined}>
                <span>{item.label}</span>
                <NavUnderline />
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
