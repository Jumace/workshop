// components/ChatComponent/types/Message.ts

export type Role = "user" | "ai" | "system";

/**
 * Defines a single message in the chat transcript.
 * @param role - The speaker ('user', 'ai', or 'system').
 * @param content - The raw markdown content of the message.
 */
export interface Message {
  role: Role;
  content: string;
}
