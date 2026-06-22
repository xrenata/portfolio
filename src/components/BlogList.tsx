"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Search, X } from "lucide-react"
import { FadeInStagger, FadeInItem } from "@/components/ui/fade-in"
import type { BlogPost } from "@/lib/blog"

interface BlogListProps {
    posts: BlogPost[]
    allTags: string[]
}

export function BlogList({ posts, allTags }: BlogListProps) {
    const [search, setSearch] = useState("")
    const [activeTag, setActiveTag] = useState<string | null>(null)

    const filtered = useMemo(() => {
        return posts.filter(post => {
            const matchesTag = !activeTag || post.tags.includes(activeTag)
            const query = search.toLowerCase()
            const matchesSearch = !query ||
                post.title.toLowerCase().includes(query) ||
                post.description.toLowerCase().includes(query) ||
                post.tags.some(t => t.toLowerCase().includes(query))
            return matchesTag && matchesSearch
        })
    }, [posts, search, activeTag])

    const clearFilters = () => {
        setSearch("")
        setActiveTag(null)
    }

    const hasFilters = search || activeTag

    return (
        <>
            <div className="py-6 space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50" />
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full h-9 rounded-md border border-border/40 bg-transparent pl-9 pr-9 text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-border transition-colors"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground transition-colors"
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>

                <div className="flex flex-wrap gap-1.5">
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                            className="cursor-pointer"
                        >
                            <Badge
                                variant={activeTag === tag ? "default" : "secondary"}
                                className="rounded-sm font-normal text-[11px] px-1.5 h-5 transition-colors"
                            >
                                #{tag}
                            </Badge>
                        </button>
                    ))}
                </div>
            </div>

            <FadeInStagger>
                {filtered.length === 0 && (
                    <div className="py-12 text-center space-y-2">
                        <p className="text-muted-foreground text-sm">No posts found.</p>
                        {hasFilters && (
                            <button onClick={clearFilters} className="text-xs text-muted-foreground/60 hover:text-foreground underline underline-offset-4 transition-colors">
                                Clear filters
                            </button>
                        )}
                    </div>
                )}
                {filtered.map((post) => (
                    <FadeInItem key={post.slug}>
                        <Link href={`/blog/${post.slug}`} className="group block border-b border-border/40 py-8 transition-colors hover:border-border">
                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-3 min-w-0">
                                    <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground/60">
                                        <time dateTime={post.date}>
                                            {post.date}
                                        </time>
                                        <span>·</span>
                                        <span>{post.readingTime} min read</span>
                                    </div>
                                    <h2 className="text-2xl font-black tracking-tight leading-tight group-hover:underline underline-offset-4 decoration-border">
                                        {post.title}
                                    </h2>
                                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                                        {post.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                        {post.tags.map(tag => (
                                            <Badge key={tag} variant="secondary" className="rounded-sm font-normal text-[11px] px-1.5 h-5">
                                                #{tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <ArrowUpRight className="h-4 w-4 shrink-0 mt-1 text-muted-foreground/30 transition-all group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </div>
                        </Link>
                    </FadeInItem>
                ))}
            </FadeInStagger>
        </>
    )
}
