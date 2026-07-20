import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy notes for Julian Cebulla’s personal website and lab.",
};

export default function PrivacyPage() {
  return (
    <article className="pageShell prose">
      <p className="eyebrow">Privacy</p>
      <h1>Short privacy note</h1>
      <p>This site does not use first-party analytics or performance tracking scripts at launch.</p>
      <p>
        Lab pages may include small interactive examples, but the site does not create visitor
        accounts, collect comments, or ask for personal information.
      </p>
      <p>
        Content is stored in this repository as MDX. There is no database-backed profile tracking in
        v1.
      </p>
    </article>
  );
}
