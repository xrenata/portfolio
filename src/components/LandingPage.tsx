"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/blog"
import { TopTracksSection } from "@/components/TopTracksSection"
import { FavoritesSection } from "@/components/FavoritesSection"
import { Particles } from "@/components/ui/particles"
import { useTheme } from "next-themes"
import { LanternHeroCards } from "@/components/LanternCards"
import { AvatarWithStatus } from "@/components/AvatarWithStatus"
import { SpotifyCard } from "@/components/SpotifyCard"
import { WakatimeCard } from "@/components/WakatimeCard"
import { GithubContributions } from "@/components/GithubContributions"
import { RotatingRole } from "@/components/RotatingRole"
import { FeaturedProjects } from "@/components/FeaturedProjects"
import { ExperienceTimeline } from "@/components/ExperienceTimeline"
import { ContactCTA } from "@/components/ContactCTA"
import { useLanternPresence } from "@/hooks/useLanternPresence"
import { siteConfig } from "@/data/site"
import { projects } from "@/data/projects"

const storyPhrases = [
    { text: "I build things." },
    { text: "clean code,\ngreat design." },
    { text: "let's work\ntogether." },
]

const stats = [
    { value: `${projects.length}+`, label: "Projects" },
    { value: "9+", label: "Years coding" },
    { value: "∞", label: "Cups of coffee" },
]

const sectionMotion = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
}

function SectionHeading({ num, title, action }: { num: string; title: string; action?: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="flex items-end gap-3">
                <span className="text-xs font-mono text-muted-foreground/40 mb-1">{num}</span>
                <h2 className="text-4xl font-black tracking-tighter">{title}</h2>
            </div>
            {action}
        </div>
    )
}

export function LandingPage({ latestPosts }: { latestPosts: BlogPost[] }) {
    const { presence } = useLanternPresence(siteConfig.lanternUserId)
    const isLoaded = presence !== null

    const { resolvedTheme } = useTheme()
    const particleColor = resolvedTheme === "light" ? "#111111" : "#ffffff"

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
            <section className="relative -mt-20 min-h-svh flex flex-col items-center justify-center overflow-hidden px-5 sm:px-6 pt-24 pb-28 sm:pt-28 sm:pb-24">
                <Particles
                    color={particleColor}
                    particleCount={14000}
                    particleSize={6}
                    animate={false}
                    className="z-0"
                />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_50%_45%,var(--background)_35%,transparent_80%)] pointer-events-none z-[1]" />
                <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />

                <div className="relative z-10 w-full max-w-xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-5 sm:mb-6"
                    >
                        <AvatarWithStatus
                            imageClassName="h-16 w-16 sm:h-20 sm:w-20"
                            statusClassName="bottom-0 right-0.5 h-3.5 w-3.5 sm:right-1 sm:h-4 sm:w-4"
                        />
                    </motion.div>

                    <motion.h1
                        className="text-[clamp(1.75rem,8.2vw,3rem)] font-bold tracking-tight leading-[1.1]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                        transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Hey, I&apos;m Emirhan.
                        <br />
                        <RotatingRole />
                    </motion.h1>

                    <motion.p
                        className="mt-4 sm:mt-5 text-sm sm:text-base text-muted-foreground leading-relaxed text-pretty"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                        transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        A web and mobile developer building things end to end. I love crafting
                        polished interfaces, designing robust backends, and exploring new tools
                        that make the web feel a little more alive.
                    </motion.p>

                    <motion.div
                        className="mt-6 sm:mt-7 flex flex-wrap items-center gap-2.5 sm:gap-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                        transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Button asChild size="lg" className="rounded-full flex-1 sm:flex-none min-w-[9.5rem]">
                            <Link href="/projects">
                                View my work
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="rounded-full flex-1 sm:flex-none min-w-[9.5rem]">
                            <a href={siteConfig.links.email}>Get in touch</a>
                        </Button>
                    </motion.div>

                    <motion.div
                        className="mt-7 sm:mt-8 flex items-center justify-between gap-4 sm:justify-start sm:gap-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                        transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {stats.map((s) => (
                            <div key={s.label} className="min-w-0">
                                <div className="text-xl sm:text-2xl font-black tracking-tighter">{s.value}</div>
                                <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wide sm:tracking-wider text-muted-foreground/50 whitespace-nowrap">
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        className="mt-7 sm:mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                        transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <LanternHeroCards />
                    </motion.div>
                </div>

                <motion.div
                    className="absolute bottom-6 sm:bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoaded ? 1 : 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                >
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/40">
                        Scroll
                    </span>
                    <div className="flex h-8 w-5 justify-center rounded-full border border-muted-foreground/30 pt-1.5">
                        <motion.div
                            className="h-1.5 w-1 rounded-full bg-muted-foreground/60"
                            animate={{ y: [0, 8, 0], opacity: [1, 0.2, 1] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
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
                <motion.div className="space-y-6" {...sectionMotion}>
                    <SectionHeading
                        num="01"
                        title="Selected Work"
                        action={
                            <Link
                                href="/projects"
                                className="group flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                All projects
                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        }
                    />
                    <FeaturedProjects />
                </motion.div>

                <motion.div className="space-y-6" {...sectionMotion}>
                    <SectionHeading
                        num="02"
                        title="Experience"
                        action={
                            <Link
                                href="/about"
                                className="group flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                More about me
                                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </Link>
                        }
                    />
                    <ExperienceTimeline />
                </motion.div>

                <motion.div className="space-y-6" {...sectionMotion}>
                    <SectionHeading num="03" title="Live Activity" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <SpotifyCard />
                        <WakatimeCard />
                    </div>
                    <GithubContributions />
                </motion.div>

                <motion.div className="space-y-6" {...sectionMotion}>
                    <SectionHeading num="04" title="Top Tracks" />
                    <TopTracksSection />
                </motion.div>

                <motion.div className="space-y-6" {...sectionMotion}>
                    <SectionHeading num="05" title="Favorites" />
                    <FavoritesSection />
                </motion.div>

                {latestPosts.length > 0 && (
                    <motion.div className="space-y-6" {...sectionMotion}>
                        <SectionHeading
                            num="06"
                            title="Writing"
                            action={
                                <Link
                                    href="/blog"
                                    className="group flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    All posts
                                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                                </Link>
                            }
                        />

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

            <ContactCTA />
        </div>
    )
}
