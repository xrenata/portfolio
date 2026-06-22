
import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "src/content/blog")

export type BlogPost = {
    slug: string
    title: string
    date: string
    description: string
    tags: string[]
    content: string
    readingTime: number
}

function calculateReadingTime(content: string): number {
    const words = content.trim().split(/\s+/).length
    return Math.max(1, Math.round(words / 200))
}

export function getAllPosts(): BlogPost[] {
    if (!fs.existsSync(postsDirectory)) {
        return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, "")
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data, content } = matter(fileContents)

        return {
            slug,
            title: data.title,
            date: data.date,
            description: data.description,
            tags: data.tags || [],
            content,
            readingTime: calculateReadingTime(content),
        }
    })

    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

export function getAllTags(): string[] {
    const posts = getAllPosts()
    const tagSet = new Set<string>()
    posts.forEach(post => post.tags.forEach(tag => tagSet.add(tag)))
    return Array.from(tagSet).sort()
}

export function getPostBySlug(slug: string): BlogPost | null {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.md`)
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data, content } = matter(fileContents)

        return {
            slug,
            title: data.title,
            date: data.date,
            description: data.description,
            tags: data.tags || [],
            content,
            readingTime: calculateReadingTime(content),
        }
    } catch (error) {
        return null
    }
}
