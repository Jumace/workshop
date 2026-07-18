import Image from "next/image";
import Link from "next/link";

import { LabList } from "@/app/components/lab-list";
import { PostList } from "@/app/components/post-list";
import { getPublishedBlogPosts, getPublishedLabEntries } from "@/app/lib/content";
import { siteConfig } from "@/app/lib/site";
import styles from "./page.module.css";

export default async function Page() {
  const [posts, labs] = await Promise.all([getPublishedBlogPosts(), getPublishedLabEntries()]);

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className="eyebrow">Curiosity, code, and the notes between</p>
          <h1>Following curiosity past the first spark.</h1>
          <p className={styles.lede}>
            This is my personal workshop for following interesting ideas before they fade into
            another saved bookmark. I write to understand the questions behind the work, and I
            experiment to make the technical side visible.
          </p>
          <div className={styles.actions}>
            <Link className="buttonPrimary" href="/blog">
              Read the blog
            </Link>
            <Link className="buttonSecondary" href="/lab">
              Visit the lab
            </Link>
          </div>
        </div>
        <div className={styles.identityCard}>
          <div className={styles.avatarFrame}>
            <Image
              src={siteConfig.author.avatar}
              alt="Julian Cebulla"
              width={96}
              height={96}
              priority
              className={styles.avatar}
            />
          </div>
          <div>
            <p className={styles.name}>Julian Cebulla</p>
            <a className={styles.handle} href={siteConfig.author.github}>
              @Jumace
            </a>
          </div>
          <p className={styles.cardText}>Writing, experimenting, and learning in public.</p>
        </div>
      </section>

      <section className={styles.vision} aria-labelledby="site-vision">
        <div>
          <p className="eyebrow">The idea</p>
          <h2 id="site-vision">Two ways to record what I am learning.</h2>
          <p>
            Some ideas need reflection. Others need a small working experiment. I split this site
            into a blog and a lab because AI-assisted development makes it easier to turn curiosity
            into code, but the code is not the whole story. I also want to preserve why I built
            something, what I was trying to understand, what surprised me, and what I learned.
          </p>
        </div>
        <div className={styles.visionCards}>
          <article>
            <span>01</span>
            <h3>Blog</h3>
            <p>The thinking behind the work: motivation, tradeoffs, questions, and lessons.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Lab</h3>
            <p>
              The technical shape of the work: experiments, demos, setup notes, and rough edges.
            </p>
          </article>
        </div>
      </section>

      <section className="sectionBlock" aria-labelledby="latest-writing">
        <div className="sectionHeader">
          <p className="eyebrow">Writing</p>
          <h2 id="latest-writing">Latest from the blog</h2>
        </div>
        <PostList posts={posts.slice(0, 3)} emptyLabel="The first post is coming soon." />
      </section>

      <section className="sectionBlock" aria-labelledby="featured-lab">
        <div className="sectionHeader">
          <p className="eyebrow">Lab</p>
          <h2 id="featured-lab">Experiments with clear edges</h2>
        </div>
        <LabList entries={labs.slice(0, 3)} />
      </section>
    </div>
  );
}
