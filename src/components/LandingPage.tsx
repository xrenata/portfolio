"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowDown, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { BlogPost } from "@/lib/blog"
import { TopTracksSection } from "@/components/TopTracksSection"
import { FavoritesSection } from "@/components/FavoritesSection"
import { GravityStarsBackground } from '@/components/animate-ui/components/backgrounds/gravity-stars'
import { LanternHeroCards } from "@/components/LanternCards"
import { AvatarWithStatus } from "@/components/AvatarWithStatus"
import { SpotifyCard } from "@/components/SpotifyCard"
import { WakatimeCard } from "@/components/WakatimeCard"
import { useLanternPresence } from "@/hooks/useLanternPresence"
import { siteConfig } from "@/data/site"

const storyPhrases = [
    { text: "I build things." },
    { text: "clean code,\ngreat design." },
    { text: "let's work\ntogether." },
]

export function LandingPage({ latestPosts }: { latestPosts: BlogPost[] }) {
    const { presence } = useLanternPresence(siteConfig.lanternUserId)
    const isLoaded = presence !== null

    const storyRef = useRef<HTMLDivElement>(null)
    const [activePhrase, setActivePhrase] = useState(0)

    const { scrollYProgress } = useScroll({
        target: storyRef,
        offset: ["start start", "end end"],
    })

    useMotionValueEvent(scrollYProgress, "change", (progress) => {
        if (progress < 0.34) setActivePhrase(0)
        else if (progress < 0.67) setActivePhrase(1)
        else setActivePhrase(2)
    })

    return (
        <div>
            <section className="relative min-h-[calc(100svh-5rem)] flex flex-col items-center justify-center px-6">
                <GravityStarsBackground className="absolute inset-0" />
                <div className="absolute inset-x-0 -top-20 bottom-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_10%,oklch(0.5_0_0/0.06),transparent)] pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />

                <div className="relative z-10 w-full max-w-xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-6"
                    >
                        <AvatarWithStatus 
                            imageClassName="h-20 w-20"
                            statusClassName="bottom-0 right-1 h-4 w-4"
                        />
                    </motion.div>

                    <motion.h1
                        className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                        transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Hey, I&apos;m Emirhan.
                        <br />
                        Full-Stack Developer & Designer
                    </motion.h1>

                    <motion.p
                        className="mt-5 text-base text-muted-foreground leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                        transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        A web and mobile developer building things end to end. I love crafting
                        polished interfaces, designing robust backends, and exploring new tools
                        that make the web feel a little more alive.
                    </motion.p>

                    <motion.div
                        className="mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                        transition={{ delay: 0.45, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <LanternHeroCards />
                    </motion.div>
                </div>

                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoaded ? 1 : 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ArrowDown className="h-5 w-5 text-muted-foreground/40" />
                    </motion.div>
                </motion.div>
            </section>


            <section ref={storyRef} className="relative" style={{ height: "260vh" }}>
                <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden px-8">
                    <div className="relative z-20 w-full max-w-5xl text-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activePhrase}
                                initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -60, filter: "blur(12px)" }}
                                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                                className="flex flex-col items-center justify-center"
                            >
                                <p className="text-[clamp(3rem,8.5vw,7.5rem)] font-black tracking-tighter leading-[1.02] whitespace-pre-line text-foreground">
                                    {storyPhrases[activePhrase].text}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>


            <section className="w-full max-w-2xl mx-auto px-6 pb-28 space-y-24">
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

                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="flex items-end gap-3 justify-center">
                        <span className="text-xs font-mono text-muted-foreground/40 mb-1">02</span>
                        <h2 className="text-4xl font-black tracking-tighter">Top Tracks</h2>
                    </div>
                    <TopTracksSection />
                </motion.div>

                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="flex items-end gap-3 justify-center">
                        <span className="text-xs font-mono text-muted-foreground/40 mb-1">03</span>
                        <h2 className="text-4xl font-black tracking-tighter">Favorites</h2>
                    </div>
                    <FavoritesSection />
                </motion.div>

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
                                <span className="text-xs font-mono text-muted-foreground/40 mb-1">04</span>
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
