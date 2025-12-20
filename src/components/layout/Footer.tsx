
import Link from "next/link"
import { siteConfig, socialLinks } from "@/data/site"

export function Footer() {
    return (
        <footer className="w-full border-t border-border/40 py-6 md:px-8 md:py-0">
            <div className="container max-w-2xl mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                    © 2025 All rights reserved. Made with <span className="text-red-500">🤍</span> by <Link href={siteConfig.url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">emirhan</Link>
                </p>
                <div className="flex items-center gap-4">
                    {socialLinks.map((link) => (
                        <Link key={link.name} href={link.href} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                            <link.icon className="h-5 w-5" />
                            <span className="sr-only">{link.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    )
}
