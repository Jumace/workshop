import type { Metadata } from "next";

import { PostList } from "@/app/components/post-list";
import { getPublishedBlogPosts } from "@/app/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical writing and notes by Julian Cebulla.",
};

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <div className="pageShell">
      <header className="pageIntro">
        <p className="eyebrow">Blog</p>
        <h1>Writing the parts that code does not explain.</h1>
        <p>
          Notes, explanations, and technical essays. Posts are repo-owned MDX files so they stay
          easy to revise.
        </p>
      </header>
      <PostList posts={posts} />
    </div>
  );
}
