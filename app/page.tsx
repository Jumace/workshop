import Link from "next/link";
import Image from "next/image";

import { getPublishedLabEntries, getPublishedNotebookEntries } from "@/app/lib/content";
import styles from "./page.module.css";

function SparkIcon({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M58 58 C57 43 56 27 53 10" strokeWidth="3.6" />
        <path d="M60 58 C67 46 76 31 88 18" strokeWidth="3.4" />
        <path d="M62 60 C76 58 90 55 104 51" strokeWidth="3.5" />
        <path d="M61 62 C67 76 71 90 74 108" strokeWidth="3.7" />
        <path d="M58 62 C48 75 38 87 26 100" strokeWidth="3.5" />
        <path d="M57 60 C44 61 33 62 20 63" strokeWidth="2.8" />
        <path d="M57 58 C46 50 36 42 25 32" strokeWidth="2.9" />
        <path d="M61 61 C73 67 84 72 95 79" strokeWidth="2.7" />
        <path d="M59 57 C62 45 65 35 69 24" strokeWidth="2.4" />
        <path d="M61 58 C71 49 80 41 91 34" strokeWidth="2.3" />
        <path d="M62 59 C72 60 82 61 92 64" strokeWidth="2.3" />
        <path d="M61 62 C68 71 75 80 81 89" strokeWidth="2.2" />
        <path d="M59 62 C56 72 53 82 49 92" strokeWidth="2.2" />
        <path d="M57 61 C49 69 41 76 32 84" strokeWidth="2.2" />
        <path d="M57 59 C47 56 39 53 31 48" strokeWidth="2.1" />
        <path d="M58 57 C51 48 45 39 40 28" strokeWidth="2.1" />
        <path d="M59 58 C52 44 47 33 43 20" strokeWidth="1.5" opacity=".72" />
        <path d="M60 60 C75 71 87 82 96 94" strokeWidth="1.4" opacity=".72" />
        <path d="M58 61 C45 73 34 84 20 91" strokeWidth="1.4" opacity=".68" />
        <path d="M62 58 C76 51 88 44 99 39" strokeWidth="1.3" opacity=".65" />
        <path d="M53.8 11.6 C56.3 28 57.2 43.5 58.5 57.6" strokeWidth="1" opacity=".45" />
        <path d="M103 50.5 C90.2 55 76.8 58 62.2 60" strokeWidth="1" opacity=".4" />
        <path d="M73 107 C70.5 89.5 66.5 76 60.7 62.4" strokeWidth="1" opacity=".42" />
        <path d="M26.8 99 C37.6 88.2 47.7 75.9 57.6 62.5" strokeWidth="1" opacity=".42" />
        <path
          d="M53 60 C56 55 63 55 67 58 C66 64 60 67 55 65 C52 64 51 62 53 60Z"
          strokeWidth="2.2"
        />
        <path d="M54 56 C58 59 62 63 67 64" strokeWidth="1.8" />
        <path d="M54 64 C58 62 62 59 66 56" strokeWidth="1.8" />
        <path d="M56 54 C58 59 60 63 62 67" strokeWidth="1.4" />
        <path d="M52.5 60 C57 60.5 62 60.5 67.5 60" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

function SparkUnderline() {
  return (
    <svg className={styles.sparkUnderline} viewBox="0 0 320 32" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 25 C42 20 79 15.5 119 13 C175 9.5 235 10.5 316 14" strokeWidth="3.4" />
        <path
          d="M30 27 C78 22 116 17.5 158 15 C209 12 257 12.8 307 16"
          strokeWidth="1.8"
          opacity=".55"
        />
      </g>
    </svg>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(
    new Date(date),
  );
}

export default async function Page() {
  const [posts, labs] = await Promise.all([
    getPublishedNotebookEntries(),
    getPublishedLabEntries(),
  ]);
  const latestItems = [
    ...posts.map((post) => ({
      type: "Notebook",
      title: post.title,
      description: post.description,
      href: post.href,
      date: post.updatedAt ?? post.publishedAt,
    })),
    ...labs.map((lab) => ({
      type: "Lab",
      title: lab.title,
      description: lab.description,
      href: lab.href,
      date: lab.updatedAt ?? lab.publishedAt,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const latestUpdate = latestItems[0];

  return (
    <div className={styles.home}>
      <section className={styles.hero} aria-labelledby="home-heading">
        <div className={styles.heroMain}>
          <h1 id="home-heading">
            Following curiosity past the first{" "}
            <span className={styles.sparkPhrase}>
              <em>
                spark
                <SparkUnderline />
              </em>
              <SparkIcon className={styles.sparkDoodle} />
            </span>
          </h1>
        </div>
        <figure className={styles.quoteBlock}>
          <div className={styles.makerSketch} aria-hidden="true">
            <Image src="/avatar.png" alt="" width={1024} height={1024} priority />
          </div>
          <blockquote>
            <span aria-hidden="true">“</span>
            <p>I write, build, and test ideas in public.</p>
            <p>Some stay small. Some go nowhere.</p>
            <p>Either way, I learn as I go.</p>
          </blockquote>
        </figure>
      </section>

      <section className={styles.workshopMap} aria-labelledby="workshop-map-heading">
        <h2 id="workshop-map-heading" className={styles.visuallyHidden}>
          How Notebook and Lab relate
        </h2>
        <article className={styles.modeCard}>
          <span className={styles.tapeLabel}>Notebook</span>
          <div className={styles.modeContent}>
            <h3>Thinking out loud.</h3>
            <p>Notes, reflections, half-formed ideas, patterns, and questions.</p>
            <ul>
              <li>Capture what catches my attention</li>
              <li>Develop thoughts through writing</li>
              <li>Keep ideas that may never become projects</li>
            </ul>
          </div>
        </article>

        <div className={styles.relationship} aria-label="Notebook and Lab can feed each other">
          <svg viewBox="0 0 260 310" role="img" aria-labelledby="relationship-title">
            <title id="relationship-title">
              Sometimes a note becomes an experiment, and an experiment can return as a new thought.
            </title>
            <filter id="relationship-chalk" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence baseFrequency="0.75" numOctaves="2" seed="9" type="fractalNoise" />
              <feDisplacementMap in="SourceGraphic" scale="1.6" />
            </filter>
            <g filter="url(#relationship-chalk)">
              <path className={styles.arrowMain} d="M30 108 C82 73 158 72 221 101" />
              <path className={styles.arrowGhost} d="M34 113 C87 81 155 78 216 105" />
              <path className={styles.arrowMain} d="M203 84 C215 91 224 99 232 110" />
              <path className={styles.arrowMain} d="M231 110 C217 111 206 113 194 117" />

              <path className={styles.arrowMain} d="M229 210 C174 252 91 251 30 218" />
              <path className={styles.arrowGhost} d="M223 203 C169 242 95 242 36 214" />
              <path className={styles.arrowMain} d="M50 238 C38 231 29 222 21 211" />
              <path className={styles.arrowMain} d="M21 211 C35 210 48 207 60 202" />
            </g>
          </svg>
          <p>Sometimes a note becomes an experiment.</p>
          <p>An experiment can return as a new thought.</p>
        </div>

        <article className={styles.modeCard}>
          <span className={styles.tapeLabel}>Lab</span>
          <div className={styles.modeContent}>
            <h3>Building in public.</h3>
            <p>Experiments, prototypes, and tools at different stages of development.</p>
            <ul>
              <li>Test ideas in practice</li>
              <li>Learn through building</li>
              <li>Keep what is useful, including failed attempts</li>
            </ul>
          </div>
        </article>
      </section>

      {latestUpdate ? (
        <Link
          className={styles.latestUpdate}
          href={latestUpdate.href}
          aria-labelledby="latest-update-heading"
        >
          <SparkIcon className={styles.updateSpark} />
          <div className={styles.updateCopy}>
            <p className={styles.updateMeta}>
              <span id="latest-update-heading">Latest update</span>
              <span aria-hidden="true">·</span>
              <time dateTime={latestUpdate.date}>
                {formatDate(latestUpdate.date).toUpperCase()}
              </time>
              <span aria-hidden="true">·</span>
              <span>{latestUpdate.type}</span>
            </p>
            <h2>{latestUpdate.title}</h2>
            <p>{latestUpdate.description}</p>
          </div>
          <span className={styles.updateArrow} aria-hidden="true">
            →
          </span>
        </Link>
      ) : null}

      <section className={styles.destinationBlocks} aria-label="Explore Notebook and Lab">
        <Link className={styles.destinationCard} href="/notebook">
          <span className={styles.destinationEyebrow}>Notebook</span>
          <h2>More from the Notebook</h2>
          <p>
            Thoughts, reflections, and questions that may—or may not—turn into something buildable.
          </p>
          <span className={styles.destinationCta}>
            Browse the Notebook <span aria-hidden="true">→</span>
          </span>
        </Link>

        <Link className={styles.destinationCard} href="/lab">
          <span className={styles.destinationEyebrow}>Lab</span>
          <h2>Explore the Lab</h2>
          <p>Experiments, prototypes, and projects at different stages of development.</p>
          <span className={styles.destinationCta}>
            See what’s brewing in the Lab <span aria-hidden="true">→</span>
          </span>
        </Link>
      </section>
    </div>
  );
}
