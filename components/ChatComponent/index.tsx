import styles from "./chat-component.module.css";
import type { Message } from "./types/Message";

interface ChatComponentProps {
  messages: Message[];
  title?: string;
  description?: string;
}

/**
 * A reusable, accessible chat transcript component for showcasing AI conversations.
 * @param messages - Array of message objects detailing the conversation flow.
 */
export function ChatComponent({ messages, title, description }: ChatComponentProps) {
  function MessageBubble({ message }: { message: Message }) {
    const speaker = message.role === "user" ? "Me" : message.role === "ai" ? "AI" : "Note";
    const roleClass =
      message.role === "user" ? styles.user : message.role === "ai" ? styles.ai : styles.system;

    return (
      <li className={`${styles.message} ${roleClass}`}>
        <p className={styles.speaker}>{speaker}</p>
        <article className={styles.bubble} aria-label={`${speaker} message`}>
          <p className={styles.content}>{message.content}</p>
        </article>
      </li>
    );
  }

  return (
    <section className={styles.chat} aria-label={title ? `Chat excerpt: ${title}` : "Chat excerpt"}>
      <div className={styles.header}>
        <p className={styles.title} role="heading" aria-level={2}>
          Chat excerpt
        </p>
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
      <ol className={styles.messages} aria-label="Messages">
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
      </ol>
    </section>
  );
}
