import type { Metadata } from "next";

import AboutContent from "@/content/about/index.mdx";

export const metadata: Metadata = {
  title: "About",
  description: "A personal note from Julian Cebulla about this site and lab.",
};

export default function AboutPage() {
  return (
    <article className="pageShell prose">
      <AboutContent />
    </article>
  );
}
