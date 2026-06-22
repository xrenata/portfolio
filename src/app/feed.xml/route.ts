import { getAllPosts } from "@/lib/blog"
import { siteConfig } from "@/data/site"

export function GET() {
    const posts = getAllPosts()

    const escapeXml = (str: string) =>
        str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")

    const items = posts.map(post => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteConfig.url}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteConfig.url}/blog/${post.slug}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.tags.map(tag => `<category>${escapeXml(tag)}</category>`).join("\n      ")}
    </item>`).join("")

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)} - Blog</title>
    <link>${siteConfig.url}/blog</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en</language>
    <lastBuildDate>${posts.length > 0 ? new Date(posts[0].date).toUTCString() : new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml"/>${items}
  </channel>
</rss>`

    return new Response(xml, {
        headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "s-maxage=3600, stale-while-revalidate",
        },
    })
}
