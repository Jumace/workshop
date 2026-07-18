import { vercelAdapter } from "@flags-sdk/vercel";
import { flag } from "flags/next";

export const labAccent = flag<string>({
  key: "lab-accent",
  description: "Controls the accent color used by the Flags lab demo.",
  adapter: vercelAdapter(),
  defaultValue: process.env.LAB_FLAGS_FALLBACK ?? "cyan",
  options: [
    { label: "Cyan", value: "cyan" },
    { label: "Violet", value: "violet" },
    { label: "Green", value: "green" },
  ],
});
