"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Bookmark, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { bookmarkCategories } from "@/data/bookmarks"

const totalBookmarks = bookmarkCategories.reduce((total, category) => total + category.items.length, 0)

export default function BookmarksPage() {
    return (
        <div className="w-full pb-24">
            <div className="mx-auto w-full max-w-2xl px-6">
                <motion.div
                    className="py-12 border-b border-border/40 space-y-4"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h1 className="text-6xl font-black tracking-tighter leading-none">Bookmarks</h1>
                    <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                        A personal shelf of websites, tools, articles, and references I keep coming back to for design taste,
                        frontend craft, and better engineering judgment.
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-muted-foreground">
                        <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/25 px-3 py-1.5">
                            <Bookmark className="h-3.5 w-3.5" />
                            Curated collection
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/25 px-3 py-1.5">
                            <Sparkles className="h-3.5 w-3.5" />
                            {totalBookmarks} saved references
                        </span>
                    </div>
                </motion.div>
            </div>

            <div className="mx-auto w-full max-w-2xl px-6 space-y-8 pt-10">
                {bookmarkCategories.map((category, categoryIndex) => (
                    <motion.section
                        key={category.id}
                        className="relative"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: categoryIndex * 0.05 }}
                    >
                        <div className="space-y-6">
                            <div className="flex gap-5 items-start border-b border-border/40 pb-6">
                                <span
                                    aria-hidden
                                    className="font-mono text-[4rem] md:text-[4.5rem] font-black leading-none text-foreground/[0.06] select-none shrink-0 -mt-1"
                                >
                                    {String(categoryIndex + 1).padStart(2, "0")}
                                </span>

                                <div className="space-y-3 pt-1">
                                    <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground/55">
                                        {category.eyebrow}
                                    </p>
                                    <div className="space-y-2">
                                        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                                            {category.title}
                                        </h2>
                                        <p className="text-sm leading-7 text-muted-foreground">
                                            {category.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative overflow-hidden rounded-[2rem] border border-border/50 bg-card/60 p-5 md:p-7">
                                <div className="grid gap-4">
                                    {category.items.map((item, itemIndex) => (
                                        <motion.div
                                            key={item.href}
                                            initial={{ opacity: 0, y: 16 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.45, delay: itemIndex * 0.05, ease: "easeOut" }}
                                        >
                                            <Link
                                                href={item.href}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="group block rounded-[1.75rem] border border-border/60 bg-background/70 p-6 transition-all hover:-translate-y-0.5 hover:border-border hover:bg-background md:p-7"
                                            >
                                                <div className="flex items-start gap-5">
                                                    <div className="pt-0.5 md:pt-1">
                                                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/60 text-xs font-mono text-muted-foreground md:h-12 md:w-12">
                                                            {String(itemIndex + 1).padStart(2, "0")}
                                                        </span>
                                                    </div>

                                                    <div className="min-w-0 flex-1 space-y-4">
                                                        <div className="flex items-start justify-between gap-4">
                                                            <div className="space-y-1">
                                                                <h3 className="text-xl font-bold tracking-tight leading-tight group-hover:underline underline-offset-4 md:text-2xl">
                                                                    {item.title}
                                                                </h3>
                                                                <p className="text-sm leading-7 text-muted-foreground md:text-[15px]">
                                                                    {item.description}
                                                                </p>
                                                            </div>
                                                            <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground/35 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                                                        </div>

                                                        <div className="flex flex-wrap gap-1.5">
                                                            {item.tags.map((tag) => (
                                                                <Badge
                                                                    key={tag}
                                                                    variant="secondary"
                                                                    className="rounded-sm px-1.5 h-5 text-[11px] font-normal"
                                                                >
                                                                    {tag}
                                                                </Badge>
                                                            ))}
                                                        </div>

                                                        <p className="text-xs text-muted-foreground/75 leading-6">
                                                            {item.note}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.section>
                ))}
            </div>
        </div>
    )
}
