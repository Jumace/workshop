import Link from "next/link";
import Image from "next/image";

import { SparkIcon } from "@/app/components/spark-icon";
import { getPublishedLabEntries, getPublishedNotebookEntries } from "@/app/lib/content";
import styles from "./page.module.css";

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
            <Image src="/avatar-256.png" alt="" width={256} height={256} priority />
          </div>
          <blockquote>
            <span aria-hidden="true">“</span>
            <p>
              Welcome to my workbench: notes on one side, lab work on the other, curiosity running
              through both.
            </p>
          </blockquote>
        </figure>
      </section>

      <section className={styles.workshopMap} aria-labelledby="workshop-map-heading">
        <h2 id="workshop-map-heading" className={styles.visuallyHidden}>
          How Notebook and Lab relate
        </h2>
        <Link
          className={styles.modeCard}
          href="/notebook"
          aria-labelledby="notebook-mode-label notebook-mode-heading"
        >
          <span className={styles.tapeLabel} id="notebook-mode-label">
            Notebook
          </span>
          <div className={styles.modeContent}>
            <h3 id="notebook-mode-heading">Thinking out loud.</h3>
            <p>Notes, reflections, half-formed ideas, patterns, and questions.</p>
            <ul>
              <li>Capture what catches my attention</li>
              <li>Develop thoughts through writing</li>
              <li>Keep ideas that may never become projects</li>
            </ul>
          </div>
        </Link>

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

        <Link
          className={`${styles.modeCard} ${styles.modeCardLab}`}
          href="/lab"
          aria-labelledby="lab-mode-label lab-mode-heading"
        >
          <span className={styles.tapeLabel} id="lab-mode-label">
            Lab
          </span>
          <div className={styles.modeContent}>
            <h3 id="lab-mode-heading">Building in public.</h3>
            <p>Experiments, prototypes, and tools at different stages of development.</p>
            <ul>
              <li>Test ideas in practice</li>
              <li>Learn through building</li>
              <li>Keep what is useful, including failed attempts</li>
            </ul>
          </div>
        </Link>
      </section>

      {latestUpdate ? (
        <Link
          className={styles.latestUpdate}
          href={latestUpdate.href}
          aria-labelledby="latest-update-heading"
        >
          <SparkIcon className={styles.updateSpark} variant="compact" />
          <div className={styles.updateCopy}>
            <p className={styles.updateMeta}>
              <span id="latest-update-heading">Latest from the workbench</span>
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
