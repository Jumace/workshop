import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const config = defineCloudflareConfig();

// Keep package.json's build script Cloudflare-friendly while avoiding recursive OpenNext builds.
config.buildCommand = "pnpm build:next";

export default config;
