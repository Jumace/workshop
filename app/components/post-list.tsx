import { EditorialContentRow } from "@/app/components/content-row";
import { MetadataRow, TagList } from "@/app/components/content-meta";
import type { NotebookEntry } from "@/app/lib/content";
import styles from "./post-list.module.css";

export function PostList({
  posts,
  emptyLabel = "No Notebook entries are published yet.",
}: {
  posts: NotebookEntry[];
  emptyLabel?: string;
}) {
  if (posts.length === 0) {
    return <p className={styles.empty}>{emptyLabel}</p>;
  }

  return (
    <div className={styles.list}>
      {posts.map((post) => (
        <EditorialContentRow
          key={post.slug}
          href={post.href}
          title={post.title}
          description={post.description}
          meta={
            <MetadataRow
              publishedAt={post.publishedAt}
              updatedAt={post.updatedAt}
              readingTime={post.readingTime}
              series={post.series}
            />
          }
          footer={<TagList tags={post.tags} />}
        />
      ))}
    </div>
  );
}
