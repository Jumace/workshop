"use client";

import { useState } from "react";

import styles from "./content-inventory.module.css";

export type InventoryItem = {
  type: "blog" | "lab";
  title: string;
  status: "draft" | "published";
  sourcePath: string;
  route: string;
  appearsIn: string[];
  series?: string;
};

type Filter = "all" | "published" | "draft" | "blog" | "lab";

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
  { label: "Blog", value: "blog" },
  { label: "Lab", value: "lab" },
];

export function ContentInventoryView({ items }: { items: InventoryItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const filteredItems = items.filter((item) => {
    if (filter === "all") {
      return true;
    }

    if (filter === "blog" || filter === "lab") {
      return item.type === filter;
    }

    return item.status === filter;
  });

  return (
    <div className={styles.inventory}>
      <div className={styles.controls} aria-label="Content inventory filters">
        {filters.map((item) => (
          <button
            key={item.value}
            type="button"
            data-active={filter === item.value}
            onClick={() => setFilter(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className={styles.list}>
        {filteredItems.map((item) => (
          <article key={`${item.type}-${item.sourcePath}`} className={styles.card}>
            <div className={styles.meta}>
              <span>{item.type}</span>
              <span>{item.status}</span>
              {item.series ? <span>{item.series}</span> : null}
            </div>
            <h3>{item.title}</h3>
            <dl>
              <div>
                <dt>Source</dt>
                <dd>{item.sourcePath}</dd>
              </div>
              <div>
                <dt>Route</dt>
                <dd>{item.route}</dd>
              </div>
              <div>
                <dt>Appears in</dt>
                <dd>{item.appearsIn.join(", ") || "Hidden"}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}
