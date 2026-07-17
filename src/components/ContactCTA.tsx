"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { siteConfig } from "@/data/site"

const email = siteConfig.links.email.replace("mailto:", "")

export function ContactCTA() {
    return (
        <section className="relative mx-auto w-full max-w-2xl px-6 pb-32 pt-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center"
            >
                <span className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500/70" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                    </span>
                    Available for new projects
                </span>

                <h2 className="mt-8 text-5xl font-black tracking-tighter leading-[0.95] sm:text-7xl">
                    Let&apos;s work
                    <br />
                    together.
                </h2>

                <p className="mt-6 max-w-sm text-sm text-muted-foreground leading-relaxed">
                    Got something in mind? Whether it&apos;s a full product or a quick idea,
                    drop me a line and let&apos;s make it real.
                </p>

                <a
                    href={siteConfig.links.email}
                    className="group mt-10 inline-flex items-center gap-3 text-lg font-medium tracking-tight sm:text-2xl"
                >
                    <span className="bg-gradient-to-r from-foreground to-foreground bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                        {email}
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-all group-hover:border-foreground group-hover:bg-foreground group-hover:text-background sm:h-11 sm:w-11">
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:h-5 sm:w-5" />
                    </span>
                </a>
            </motion.div>
        </section>
    )
}
