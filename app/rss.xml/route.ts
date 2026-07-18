import { getPublishedBlogPosts } from "@/app/lib/content";
import { absoluteUrl, siteConfig } from "@/app/lib/site";

export async function GET() {
  const posts = await getPublishedBlogPosts();
  const items = posts
    .map(
      (post) => `<item>
  <title><![CDATA[${post.title}]]></title>
  <description><![CDATA[${post.description}]]></description>
  <link>${absoluteUrl(post.href)}</link>
  <guid>${absoluteUrl(post.href)}</guid>
  <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
  ${post.tags.map((tag) => `<category><![CDATA[${tag}]]></category>`).join("\n  ")}
</item>`,
    )
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${siteConfig.name}</title>
  <description>${siteConfig.description}</description>
  <link>${siteConfig.url}</link>
  <language>en</language>
  ${items}
</channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
    },
  });
}
