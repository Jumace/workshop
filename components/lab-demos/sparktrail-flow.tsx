import styles from "./sparktrail-flow.module.css";

const steps = [
  {
    label: "Record",
    title: "Audio file or folder",
    description:
      "Existing recordings from a phone or another recorder. SparkTrail reads them as input, but does not keep a copy.",
    artifact: "audio file(s)",
  },
  {
    label: "Transcribe",
    title: "Local transcription",
    description: "The speech-to-text step turns audio into plain transcript text on the machine.",
    artifact: "<basename>.transcript.md",
  },
  {
    label: "Clean up",
    title: "Local cleanup",
    description:
      "The cleanup step groups the spoken material into a note without turning it into an article.",
    artifact: "<basename>.note.md",
  },
];

export function SparkTrailFlow() {
  return (
    <div className={styles.flow} aria-label="SparkTrail MVP pipeline flow">
      {steps.map((step, index) => (
        <div className={styles.stage} key={step.label}>
          <div className={styles.node} aria-hidden="true">
            {index + 1}
          </div>
          <div className={styles.card}>
            <span className={styles.label}>{step.label}</span>
            <span className={styles.title}>{step.title}</span>
            <p>{step.description}</p>
          </div>
          <div className={styles.artifact}>
            <span>{index === 0 ? "accepted input" : "writes"}</span>
            <code>{step.artifact}</code>
          </div>
        </div>
      ))}
    </div>
  );
}
