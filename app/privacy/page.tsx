import type { Metadata } from "next";

import { PageIntro } from "@/app/components/page-intro";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy notes for Julian Cebulla’s personal website and Lab.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="pageShell">
      <PageIntro eyebrow="PRIVACY" title="Privacy" description="Last updated: July 27, 2026." />
      <article className="prose legalProse">
        {/* TODO: Confirm Cloudflare log retention and final production deployment details. */}
        {/* TODO: Confirm whether an Impressum is required for this site. */}
        <h2>Who is responsible</h2>
        <p>
          This is the personal website of Julian Cebulla. For privacy requests, email{" "}
          <a href="mailto:privacy@cebulla.dev">privacy@cebulla.dev</a>.
        </p>
        <h2>Hosting and delivery of the website</h2>
        <p>
          The repository is configured for deployment to Cloudflare Workers through OpenNext for
          Cloudflare and Wrangler. When the site is served, Cloudflare or another configured
          infrastructure provider may process technical request data needed to deliver, cache,
          secure, and diagnose the website.
        </p>
        <h2>Technical request and log data</h2>
        <p>
          This technical data may include the IP address, request time, requested URL or resource,
          browser or user-agent information, referrer information, and security or diagnostic log
          data. The site does not intentionally build visitor profiles from this data.
        </p>
        <h2>Cookies, local storage, and analytics</h2>
        <p>
          The current site has no user accounts, comments, contact form, first-party analytics, or
          advertising trackers. The site code does not currently set cookies or use browser local
          storage.
        </p>
        <h2>External links</h2>
        <p>
          This site links to external websites and services. If you follow those links, those
          services have their own privacy practices.
        </p>
        <h2>Visitor rights</h2>
        <p>
          Depending on your location, you may have rights to access, correct, delete, restrict, or
          object to the processing of personal data, and to complain to a supervisory authority.
        </p>
        <h2>Contact</h2>
        <p>
          Privacy contact: <a href="mailto:privacy@cebulla.dev">privacy@cebulla.dev</a>. Personal
          data submitted by email is processed only to respond to the request and retained only as
          long as necessary for that purpose and any applicable legal obligations.
        </p>
        <h2>Last updated</h2>
        <p>July 27, 2026.</p>
      </article>
    </div>
  );
}
