"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowDown, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { SpotifyCard } from "@/components/SpotifyCard"
import { WakatimeCard } from "@/components/WakatimeCard"
import { socialLinks } from "@/data/site"
import type { BlogPost } from "@/lib/blog"
import { TopTracksSection } from "@/components/TopTracksSection"
import { FavoritesSection } from "@/components/FavoritesSection"

const roles = [
    "Full-Stack Developer",
    "Frontend Engineer",
    "Backend Developer",
    "Open Source Contributor",
]

function RoleCycler() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(i => (i + 1) % roles.length)
        }, 2600)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative h-8 overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    initial={{ y: 22, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -22, opacity: 0 }}
                    transition={{ duration: 0.32, ease: "easeOut" }}
                    className="absolute inset-x-0 flex justify-center items-center text-xl font-medium text-muted-foreground tracking-tight"
                >
                    {roles[index]}
                </motion.span>
            </AnimatePresence>
        </div>
    )
}

const storyPhrases = [
    { text: "I build things.", sub: "full-stack, end to end" },
    { text: "clean code,\ngreat design.", sub: "because every detail matters" },
    { text: "let's work\ntogether.", sub: "open to new opportunities" },
]

export function LandingPage({ latestPosts }: { latestPosts: BlogPost[] }) {
    const storyRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: storyRef,
        offset: ["start start", "end end"],
    })

    const p1Opacity = useTransform(scrollYProgress, [0, 0.01, 0.26, 0.34], [1, 1, 1, 0])
    const p1Y = useTransform(scrollYProgress, [0.26, 0.34], [0, -50])

    const p2Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.62, 0.7], [0, 1, 1, 0])
    const p2Y = useTransform(scrollYProgress, [0.3, 0.4, 0.62, 0.7], [50, 0, 0, -50])

    const p3Opacity = useTransform(scrollYProgress, [0.66, 0.76, 1, 1], [0, 1, 1, 1])
    const p3Y = useTransform(scrollYProgress, [0.66, 0.76], [50, 0])

    const phraseMotions = [
        { opacity: p1Opacity, y: p1Y },
        { opacity: p2Opacity, y: p2Y },
        { opacity: p3Opacity, y: p3Y },
    ]

    return (
        <div>
            {/* ─── HERO ─── */}
            <section className="relative min-h-[calc(100svh-5rem)] flex flex-col items-center justify-center px-6 text-center">
                {/* Grid — dark mode */}
                <div className="absolute inset-x-0 -top-20 bottom-0 hidden dark:block bg-[linear-gradient(to_right,#ffffff14_1px,transparent_1px),linear-gradient(to_bottom,#ffffff14_1px,transparent_1px)] bg-[size:64px_64px]" />
                {/* Grid — light mode */}
                <div className="absolute inset-x-0 -top-20 bottom-0 block dark:hidden bg-[linear-gradient(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)] bg-[size:64px_64px]" />
                {/* Radial glow */}
                <div className="absolute inset-x-0 -top-20 bottom-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_10%,oklch(0.5_0_0/0.06),transparent)]" />
                {/* Fade to background at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-background to-transparent" />

                <div className="relative z-10 space-y-8 max-w-5xl w-full">
                    {/* Available badge */}
                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                            </span>
                            Available for work
                        </div>
                    </motion.div>

                    {/* Name */}
                    <motion.h1
                        className="text-[clamp(4.5rem,16vw,13rem)] font-black tracking-tighter leading-none"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    >
                        emirhan
                    </motion.h1>

                    {/* Role cycler */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                    >
                        <RoleCycler />
                    </motion.div>

                    {/* Social links */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1, duration: 0.6 }}
                    >
                        {socialLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 rounded-lg border border-border bg-muted/20 px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted/50 hover:text-foreground"
                            >
                                <link.icon className="h-4 w-4" />
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.7, duration: 0.6 }}
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ArrowDown className="h-5 w-5 text-muted-foreground/40" />
                    </motion.div>
                </motion.div>
            </section>

            {/* ─── STORY ─── */}
            <section ref={storyRef} className="relative" style={{ height: "260vh" }}>
                <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden px-8">
                    <div className="relative w-full max-w-4xl text-center" style={{ height: "14rem" }}>
                        {storyPhrases.map((phrase, i) => (
                            <motion.div
                                key={i}
                                style={{
                                    opacity: phraseMotions[i].opacity,
                                    y: phraseMotions[i].y,
                                }}
                                className="absolute inset-0 flex flex-col items-center justify-center"
                            >
                                <p className="text-[clamp(2.8rem,7.5vw,6.5rem)] font-black tracking-tighter leading-[1.04] whitespace-pre-line">
                                    {phrase.text}
                                </p>
                                <p className="mt-5 text-base md:text-lg text-muted-foreground font-medium tracking-wide">
                                    — {phrase.sub}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CONTENT ─── */}
            <section className="w-full max-w-2xl mx-auto px-6 pb-28 space-y-24">
                {/* Live activity */}
                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="flex items-end gap-3 justify-center">
                        <span className="text-xs font-mono text-muted-foreground/40 mb-1">01</span>
                        <h2 className="text-4xl font-black tracking-tighter">Live Activity</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <SpotifyCard />
                        <WakatimeCard />
                    </div>
                </motion.div>

                {/* Top Tracks */}
                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="flex items-end gap-3 justify-center">
                        <span className="text-xs font-mono text-muted-foreground/40 mb-1">03</span>
                        <h2 className="text-4xl font-black tracking-tighter">Top Tracks</h2>
                    </div>
                    <TopTracksSection />
                </motion.div>

                {/* Favorites */}
                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="flex items-end gap-3 justify-center">
                        <span className="text-xs font-mono text-muted-foreground/40 mb-1">04</span>
                        <h2 className="text-4xl font-black tracking-tighter">Favorites</h2>
                    </div>
                    <FavoritesSection />
                </motion.div>

                {/* Latest post */}
                {latestPosts.length > 0 && (
                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex items-end gap-3">
                                <span className="text-xs font-mono text-muted-foreground/40 mb-1">05</span>
                                <h2 className="text-4xl font-black tracking-tighter">Writing</h2>
                            </div>
                            <Link
                                href="/blog"
                                className="group flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                All posts
                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        </div>

                        <div>
                            {latestPosts.map(post => (
                                <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                                    <div className="border-t border-border py-6 transition-colors group-hover:border-foreground/20">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="space-y-2 min-w-0">
                                                <h3 className="text-xl font-bold tracking-tight group-hover:underline underline-offset-4 decoration-border">
                                                    {post.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                                    {post.description}
                                                </p>
                                                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-muted-foreground font-mono">
                                                    <span>{post.date}</span>
                                                    {post.tags.map(tag => (
                                                        <Badge key={tag} variant="secondary" className="h-5 px-1.5 text-[10px] rounded-sm font-normal">
                                                            #{tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                            <ArrowRight className="h-4 w-4 shrink-0 mt-1 text-muted-foreground/40 transition-all group-hover:text-foreground group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                            <div className="border-t border-border" />
                        </div>
                    </motion.div>
                )}
            </section>
        </div>
    )
}
