"use client";

import { useEffect, useState } from "react";
import type { MouseEvent } from "react";

import type { ArticleSection } from "@/app/lib/content";
import styles from "./article-reading-map.module.css";

export function ArticleReadingMap({
  sections,
  label = "In this note",
}: {
  sections: ArticleSection[];
  label?: string;
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    if (sections.length === 0) {
      return;
    }

    function updateActiveSection() {
      let nextActiveId = sections[0].id;
      const activationPoint = window.innerHeight * 0.5;
      const scrollBottom = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      for (const section of sections) {
        const element = document.getElementById(section.id);

        if (!element) {
          continue;
        }

        if (element.getBoundingClientRect().top <= activationPoint) {
          nextActiveId = section.id;
        } else {
          break;
        }
      }

      if (documentHeight - scrollBottom < 8) {
        nextActiveId = sections[sections.length - 1].id;
      }

      setActiveId(nextActiveId);
    }

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sections]);

  function handleSectionClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    const element = document.getElementById(id);

    if (!element) {
      return;
    }

    event.preventDefault();
    setActiveId(id);
    history.pushState(null, "", `#${id}`);
    element.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  }

  if (sections.length < 2) {
    return null;
  }

  return (
    <nav className={styles.map} aria-label={label}>
      <p className={styles.label}>{label}</p>
      <ol className={styles.list}>
        {sections.map((section) => {
          const isActive = section.id === activeId;

          return (
            <li key={section.id}>
              <a
                className={styles.link}
                href={`#${section.id}`}
                aria-current={isActive ? "location" : undefined}
                data-active={isActive ? "true" : undefined}
                onClick={(event) => handleSectionClick(event, section.id)}
              >
                {section.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
