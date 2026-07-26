import styles from "./content-meta.module.css";
import type { LabMetadata } from "@/lib/content-schemas";

type ProjectStage = LabMetadata["project"]["stage"];

export const labStateLabels = {
  exploring: "Following a hunch",
  active: "In the making",
  paused: "Set aside",
  stable: "Useful for now",
  stopped: "Let go",
} satisfies Record<ProjectStage, string>;

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(date));
}

function formatLabel(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function MetadataRow({
  publishedAt,
  updatedAt,
  readingTime,
  series,
}: {
  publishedAt: string;
  updatedAt?: string;
  readingTime?: string;
  series?: { title: string; order: number };
}) {
  const showUpdated = updatedAt !== undefined && updatedAt !== publishedAt;

  return (
    <div className={styles.row}>
      <span>
        Published <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
      </span>
      {showUpdated ? (
        <span>
          Updated <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
        </span>
      ) : null}
      {readingTime ? <span>{readingTime}</span> : null}
      {series ? (
        <span>
          Series: {series.title} #{series.order}
        </span>
      ) : null}
    </div>
  );
}

export function StatusLabel({ status }: { status: string }) {
  return <span className={styles.status}>Status: {formatLabel(status)}</span>;
}

export function LabStateLabel({ state }: { state: ProjectStage }) {
  return (
    <span className={styles.labState} aria-label={`Project state: ${formatLabel(state)}`}>
      {labStateLabels[state]}
    </span>
  );
}

export function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className={styles.tags} aria-label="Tags">
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  );
}

export { formatDate, formatLabel };
