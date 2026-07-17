"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Bookmark, Globe, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { bookmarkCategories, type BookmarkItem } from "@/data/bookmarks"

const allItems = bookmarkCategories.flatMap((c) =>
    c.items.map((item) => ({ ...item, categoryId: c.id, categoryTitle: c.title }))
)

function Favicon({ href, title }: { href: string; title: string }) {
    const [error, setError] = React.useState(false)
    let host = ""
    try {
        host = new URL(href).hostname
    } catch {
        host = ""
    }

    if (error || !host) {
        return (
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-muted/40 text-xs font-bold text-muted-foreground">
                {title.charAt(0)}
            </span>
        )
    }

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={`https://icons.duckduckgo.com/ip3/${host}.ico`}
            alt=""
            className="h-9 w-9 shrink-0 rounded-lg border border-border/60 bg-white/5 object-contain p-1.5"
            onError={() => setError(true)}
        />
    )
}

function BookmarkCard({ item }: { item: BookmarkItem }) {
    return (
        <Link
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="group relative flex flex-col gap-3 rounded-2xl border border-border bg-card/40 p-5 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-border/80 hover:bg-card"
        >
            <div className="flex items-center gap-3">
                <Favicon href={item.href} title={item.title} />
                <h3 className="min-w-0 flex-1 truncate font-semibold tracking-tight group-hover:underline underline-offset-4 decoration-border">
                    {item.title}
                </h3>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </div>
            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
            </p>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                {item.tags.map((tag) => (
                    <Badge
                        key={tag}
                        variant="secondary"
                        className="h-5 rounded-sm px-1.5 text-[10px] font-normal"
                    >
                        {tag}
                    </Badge>
                ))}
            </div>
        </Link>
    )
}

export default function BookmarksPage() {
    const [query, setQuery] = React.useState("")
    const [activeCategory, setActiveCategory] = React.useState<string>("all")

    const filtered = React.useMemo(() => {
        const q = query.trim().toLowerCase()
        return allItems.filter((item) => {
            const inCategory = activeCategory === "all" || item.categoryId === activeCategory
            if (!inCategory) return false
            if (!q) return true
            return (
                item.title.toLowerCase().includes(q) ||
                item.description.toLowerCase().includes(q) ||
                item.tags.some((t) => t.toLowerCase().includes(q)) ||
                item.categoryTitle.toLowerCase().includes(q)
            )
        })
    }, [query, activeCategory])

    const tabs = [
        { id: "all", title: "All", count: allItems.length },
        ...bookmarkCategories.map((c) => ({ id: c.id, title: c.title, count: c.items.length })),
    ]

    return (
        <div className="mx-auto w-full max-w-5xl px-6 pb-24">
            <motion.div
                className="space-y-4 py-12"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                <h1 className="text-6xl font-black leading-none tracking-tighter">Bookmarks</h1>
                <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                    A living shelf of the tools, component libraries, galleries and references I keep
                    coming back to — for design taste, frontend craft, and better engineering judgment.
                </p>
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-muted-foreground">
                    <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/25 px-3 py-1.5">
                        <Bookmark className="h-3.5 w-3.5" />
                        {allItems.length} saved references
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/25 px-3 py-1.5">
                        <Globe className="h-3.5 w-3.5" />
                        {bookmarkCategories.length} categories
                    </span>
                </div>
            </motion.div>

            <div className="sticky top-20 z-30 -mx-6 border-y border-border/40 bg-background/80 px-6 py-4 backdrop-blur-xl">
                <div className="relative">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search bookmarks, tags, tools…"
                        className="h-11 rounded-full pl-12 pr-4"
                    />
                </div>

                <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-0.5">
                    {tabs.map((tab) => {
                        const active = activeCategory === tab.id
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveCategory(tab.id)}
                                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                                    active
                                        ? "border-foreground bg-foreground text-background"
                                        : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground"
                                }`}
                            >
                                {tab.title}
                                <span className={active ? "text-background/60" : "text-muted-foreground/40"}>
                                    {tab.count}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="pt-8">
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 py-24 text-center">
                        <Search className="h-6 w-6 text-muted-foreground/40" />
                        <p className="text-sm text-muted-foreground">
                            No bookmarks match <span className="text-foreground">“{query}”</span>.
                        </p>
                    </div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                    >
                        {filtered.map((item) => (
                            <motion.div
                                key={item.href}
                                layout
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                <BookmarkCard item={item} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    )
}
