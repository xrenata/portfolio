import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/blog"
import { siteConfig } from "@/data/site"

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts()

    const blogEntries = posts.map(post => ({
        url: `${siteConfig.url}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }))

    const staticPages = [
        { url: siteConfig.url, changeFrequency: "weekly" as const, priority: 1 },
        { url: `${siteConfig.url}/projects`, changeFrequency: "monthly" as const, priority: 0.8 },
        { url: `${siteConfig.url}/skills`, changeFrequency: "monthly" as const, priority: 0.7 },
        { url: `${siteConfig.url}/spotify`, changeFrequency: "weekly" as const, priority: 0.5 },
        { url: `${siteConfig.url}/bookmarks`, changeFrequency: "monthly" as const, priority: 0.6 },
        { url: `${siteConfig.url}/blog`, changeFrequency: "weekly" as const, priority: 0.8 },
        { url: `${siteConfig.url}/about`, changeFrequency: "monthly" as const, priority: 0.7 },
    ]

    return [...staticPages, ...blogEntries]
}
