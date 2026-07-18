import Link from "next/link";
import type { ReactNode } from "react";

import { getContentReference, type ContentKind } from "@/lib/content-metadata";
import styles from "./mdx-components.module.css";

export function Callout({
  title,
  children,
  tone = "note",
}: {
  title?: string;
  children: ReactNode;
  tone?: "note" | "warning" | "success";
}) {
  return (
    <aside className={styles.callout} data-tone={tone}>
      {title ? <p className={styles.calloutTitle}>{title}</p> : null}
      <div>{children}</div>
    </aside>
  );
}

export function LinkCard({
  href,
  label = "Related",
  title,
  description,
}: {
  href: string;
  label?: string;
  title: string;
  description: string;
}) {
  const isExternal = href.startsWith("http");
  const content = (
    <>
      <span className={styles.linkCardLabel}>{label}</span>
      <span>{title}</span>
      <small>{description}</small>
    </>
  );

  if (isExternal) {
    return (
      <a className={styles.linkCard} href={href}>
        {content}
      </a>
    );
  }

  return (
    <Link className={styles.linkCard} href={href}>
      {content}
    </Link>
  );
}

export function ContentLinkCard({
  type,
  slug,
  label = "Related",
}: {
  type: ContentKind;
  slug: string;
  label?: string;
}) {
  const reference = getContentReference(type, slug);

  if (reference.metadata.status !== "published") {
    throw new Error(`ContentLinkCard cannot link to unpublished content: ${reference.sourcePath}`);
  }

  return (
    <LinkCard
      href={reference.href}
      label={label}
      title={reference.metadata.title}
      description={reference.metadata.description}
    />
  );
}

export function DemoFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={styles.demoFrame}>
      <div className={styles.demoHeader}>
        <span>{title}</span>
        <small>Demo</small>
      </div>
      <div className={styles.demoBody}>{children}</div>
    </section>
  );
}
