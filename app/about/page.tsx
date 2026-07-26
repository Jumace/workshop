import type { Metadata } from "next";

import { DestinationCards } from "@/app/components/destination-cards";
import { PageIntro } from "@/app/components/page-intro";
import AboutContent from "@/content/about/index.mdx";

export const metadata: Metadata = {
  title: "About",
  description: "A personal note from Julian Cebulla about this site and Lab.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="pageShell">
      <PageIntro
        eyebrow="ABOUT"
        title="Why I build"
        description="Curiosity is a superpower if you let yourself follow it."
      />
      <article className="prose aboutProse">
        <AboutContent />
      </article>
      <DestinationCards />
    </div>
  );
}
