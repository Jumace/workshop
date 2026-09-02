import styles from "./ai-disclosure-paths.module.css";

const paths = [
  {
    label: "Without AI",
    title: "Use the CLI",
    commands: ["npx @jumace/ai-disclosure build"],
    description:
      "Answer the questionnaire directly. No repository scan or AI assistant is involved.",
    evidence: "Maintainer answers",
  },
  {
    label: "With optional AI",
    title: "Install the skill",
    commands: ["npx @jumace/ai-disclosure skill install --[claude|opencode|both]"],
    description:
      "Choose an agent, then explicitly invoke the skill when repository evidence would help.",
    evidence: "Evidence for review",
  },
];

export function AiDisclosurePaths() {
  return (
    <div className={styles.demo} aria-label="AI Disclosure Builder paths">
      <div className={styles.header}>
        <span>AI disclosure / workbench note</span>
        <strong>two routes, one file</strong>
      </div>
      <div className={styles.paths}>
        {paths.map((path) => (
          <article className={styles.path} key={path.label}>
            <span className={styles.label}>{path.label}</span>
            <h3>{path.title}</h3>
            <div className={styles.commands}>
              {path.commands.map((command) => (
                <code className={styles.command} key={command}>
                  {command}
                </code>
              ))}
            </div>
            <p>{path.description}</p>
            <span className={styles.evidence}>{path.evidence}</span>
          </article>
        ))}
      </div>
      <div className={styles.arrow} aria-hidden="true">
        ↓
      </div>
      <div className={styles.output}>
        <span className={styles.label}>The shared destination</span>
        <strong>AI_DISCLOSURE.md</strong>
        <p>The maintainer reviews the result and decides what the project says.</p>
      </div>
    </div>
  );
}
