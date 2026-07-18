import Link from "next/link";

import type { BlogPost } from "@/app/lib/content";
import styles from "./post-list.module.css";

export function PostList({
  posts,
  emptyLabel = "No posts are published yet.",
}: {
  posts: BlogPost[];
  emptyLabel?: string;
}) {
  if (posts.length === 0) {
    return <p className={styles.empty}>{emptyLabel}</p>;
  }

  return (
    <div className={styles.list}>
      {posts.map((post) => (
        <article key={post.slug} className={styles.card}>
          <div className={styles.meta}>
            <time dateTime={post.publishedAt}>
              {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(
                new Date(post.publishedAt),
              )}
            </time>
            <span>{post.readingTime}</span>
          </div>
          <h3>
            <Link href={post.href}>{post.title}</Link>
          </h3>
          <p>{post.description}</p>
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
