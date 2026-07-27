import { EditorialContentRow } from "@/app/components/content-row";
import { LabStateLabel, MetadataRow, TagList } from "@/app/components/content-meta";
import type { LabEntry } from "@/app/lib/content";
import styles from "./lab-list.module.css";

export function LabList({ entries }: { entries: LabEntry[] }) {
  if (entries.length === 0) {
    return null;
  }

  return (
    <div className={styles.list}>
      {entries.map((entry) => (
        <EditorialContentRow
          key={entry.slug}
          href={entry.href}
          title={entry.title}
          description={entry.description}
          variant="lab"
          meta={
            <>
              <LabStateLabel state={entry.project.stage} />
              <MetadataRow publishedAt={entry.publishedAt} updatedAt={entry.updatedAt} />
            </>
          }
          note={
            entry.project.currentQuestion ? <>Question: {entry.project.currentQuestion}</> : null
          }
          footer={<TagList tags={entry.tags} />}
        />
      ))}
    </div>
  );
}
