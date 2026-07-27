"use client";

import { useState } from "react";

import styles from "./content-inventory.module.css";

export type InventoryItem = {
  type: "notebook" | "lab";
  title: string;
  status: "draft" | "review" | "published" | "archived";
  sourcePath: string;
  route: string;
  appearsIn: string[];
  series?: string;
};

type Filter = "all" | InventoryItem["status"] | "notebook" | "lab";

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
  { label: "Review", value: "review" },
  { label: "Archived", value: "archived" },
  { label: "Notebook", value: "notebook" },
  { label: "Lab", value: "lab" },
];

const typeLabels: Record<InventoryItem["type"], string> = {
  notebook: "Notebook",
  lab: "Lab",
};

export function ContentInventoryView({ items }: { items: InventoryItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const filteredItems = items.filter((item) => {
    if (filter === "all") {
      return true;
    }

    if (filter === "notebook" || filter === "lab") {
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
          <article key={`${item.type}-${item.sourcePath}`} className={styles.row}>
            <div className={styles.meta}>
              <span>{typeLabels[item.type]}</span>
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
