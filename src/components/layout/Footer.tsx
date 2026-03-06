"use client"

import Link from "next/link"
import { socialLinks } from "@/data/site"
import { ArrowUp } from "lucide-react"

export function Footer() {
    return (
        <footer className="relative border-t border-border/30 overflow-hidden">
            <p
                aria-hidden
                className="pointer-events-none select-none absolute inset-x-0 bottom-0 text-center font-black tracking-tighter leading-none text-foreground/[0.04] translate-y-[20%]"
                style={{ fontSize: "clamp(5rem, 22vw, 16rem)" }}
            >
                emirhan
            </p>

            <div className="relative z-10 max-w-2xl mx-auto px-6 py-14 flex flex-col items-center gap-8">
                <div className="flex items-center gap-3">
                    {socialLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-border hover:bg-muted/30 transition-all"
                        >
                            <link.icon className="h-4 w-4" />
                            <span className="sr-only">{link.name}</span>
                        </Link>
                    ))}
                </div>

                <div className="w-px h-6 bg-border/40" />

                <div className="flex items-center justify-between w-full">
                    <p className="text-xs text-muted-foreground/50">
                        © {new Date().getFullYear()} emirhan
                    </p>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors group"
                    >
                        back to top
                        <ArrowUp className="h-3 w-3 transition-transform group-hover:-translate-y-0.5" />
                    </button>
                </div>
            </div>
        </footer>
    )
}
