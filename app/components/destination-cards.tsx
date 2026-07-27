import Link from "next/link";

import styles from "./destination-cards.module.css";

const destinations = [
  {
    href: "/notebook",
    heading: "Notebook",
    description:
      "Thoughts, reflections, and questions that may—or may not—turn into something buildable.",
    cta: "Browse the Notebook →",
  },
  {
    href: "/lab",
    heading: "Lab",
    description: "Experiments, prototypes, and projects at different stages of development.",
    cta: "See what’s brewing in the Lab →",
  },
];

export function DestinationCards() {
  return (
    <section className={styles.grid} aria-label="Explore Notebook and Lab">
      {destinations.map((item) => (
        <Link key={item.href} className={styles.card} href={item.href}>
          <h2>{item.heading}</h2>
          <p>{item.description}</p>
          <span className={styles.cta}>{item.cta}</span>
        </Link>
      ))}
    </section>
  );
}
