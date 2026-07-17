"use client"

import * as React from "react"
import Link from "next/link"
import { routes, socialLinks, siteConfig } from "@/data/site"
import { ArrowUp, ArrowUpRight } from "lucide-react"

function useLocalTime() {
    const [time, setTime] = React.useState<string | null>(null)
    React.useEffect(() => {
        const update = () =>
            setTime(
                new Intl.DateTimeFormat("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "Europe/Istanbul",
                }).format(new Date())
            )
        update()
        const id = setInterval(update, 1000 * 30)
        return () => clearInterval(id)
    }, [])
    return time
}

export function Footer() {
    const time = useLocalTime()

    return (
        <footer className="relative border-t border-border/40 overflow-hidden">
            <p
                aria-hidden
                className="pointer-events-none select-none absolute inset-x-0 bottom-0 translate-y-[22%] bg-gradient-to-b from-foreground/[0.09] via-foreground/[0.04] to-transparent bg-clip-text text-center font-black leading-none tracking-tighter text-transparent"
                style={{ fontSize: "clamp(5rem, 22vw, 16rem)" }}
            >
                emirhan
            </p>

            <div className="relative z-10 max-w-2xl mx-auto px-6 pt-14 pb-10">
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                    <div className="col-span-2 sm:col-span-2 space-y-3">
                        <Link href="/" className="text-lg font-black tracking-tighter">
                            emirhan
                        </Link>
                        <p className="max-w-[16rem] text-sm text-muted-foreground leading-relaxed">
                            Full-stack developer &amp; designer building things end to end.
                        </p>
                        <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500/70" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                            </span>
                            Available for work
                        </span>
                    </div>

                    <div className="space-y-3">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                            Sitemap
                        </p>
                        <ul className="space-y-2">
                            {routes.map((route) => (
                                <li key={route.href}>
                                    <Link
                                        href={route.href}
                                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        {route.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                            Connect
                        </p>
                        <ul className="space-y-2">
                            {socialLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        {link.name}
                                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-10 flex flex-col-reverse items-center gap-4 border-t border-border/40 pt-6 sm:flex-row sm:justify-between">
                    <p className="font-mono text-[11px] text-muted-foreground/50">
                        © {new Date().getFullYear()} {siteConfig.name} · Built with Next.js &amp; Tailwind
                    </p>

                    <div className="flex items-center gap-4">
                        <span className="font-mono text-[11px] text-muted-foreground/50">
                            {time ? `${time} — Istanbul` : "— Istanbul"}
                        </span>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            className="group flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground/50 transition-colors hover:text-foreground"
                        >
                            Back to top
                            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border/60 transition-colors group-hover:border-foreground/40 group-hover:bg-muted/40">
                                <ArrowUp className="h-3 w-3" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    )
}
