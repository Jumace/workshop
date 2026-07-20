function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Julian Cebulla",
  handle: "@Jumace",
  description: "Personal writing, technical notes, and experiments by Julian Cebulla.",
  url: getSiteUrl(),
  author: {
    name: "Julian Cebulla",
    handle: "Jumace",
    avatar: "https://avatars.githubusercontent.com/u/14107152?v=4",
    github: "https://github.com/Jumace",
    linkedin: "https://www.linkedin.com/in/julian-cebulla",
  },
  externalProjects: {
    deven: "https://github.com/deven-org",
  },
} as const;

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}
