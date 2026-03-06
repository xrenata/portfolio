"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useTheme } from "next-themes"
import { routes, socialLinks } from "@/data/site"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Menu, Moon, Sun } from "lucide-react"
import { useState } from "react"

export function Navbar() {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => { setMounted(true) }, [])

    const currentTheme = mounted ? resolvedTheme : "dark"

    return (
        <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
            <div className="flex h-13 items-center gap-0.5 rounded-full border border-border bg-background/90 backdrop-blur-xl px-3 shadow-lg shadow-black/10">

                <Link href="/" className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted/60 transition-colors mr-0.5">
                    <div className="relative h-6 w-6 overflow-hidden rounded-full ring-1 ring-border/60">
                        <Image src="/avatar.jpeg" alt="Emirhan" fill className="object-cover" priority />
                    </div>
                </Link>

                <div className="h-4 w-px bg-border/50 mx-1" />

                <nav className="hidden md:flex items-center gap-0.5">
                    {routes.map((route) => {
                        const isActive = pathname === route.href
                        return (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                                    isActive
                                        ? "bg-muted text-foreground"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                )}
                            >
                                {route.label}
                            </Link>
                        )
                    })}
                </nav>

                <div className="hidden md:block h-4 w-px bg-border/50 mx-1" />

                <button
                    onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                    aria-label="Toggle theme"
                >
                    {currentTheme === "dark"
                        ? <Sun className="h-3.5 w-3.5" />
                        : <Moon className="h-3.5 w-3.5" />
                    }
                </button>

                <div className="md:hidden">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <button className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors">
                                <Menu className="h-3.5 w-3.5" />
                                <span className="sr-only">Open menu</span>
                            </button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[280px] flex flex-col border-border/50 bg-background/95 backdrop-blur-xl">
                            <SheetTitle className="sr-only">Navigation</SheetTitle>
                            <SheetDescription className="sr-only">Main site navigation</SheetDescription>

                            <div className="flex items-center gap-3 px-2 pt-8 pb-6 border-b border-border/40">
                                <div className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-border/60">
                                    <Image src="/avatar.jpeg" alt="Emirhan" fill className="object-cover" />
                                </div>
                                <div>
                                    <p className="font-bold leading-none">emirhan</p>
                                    <p className="text-xs text-muted-foreground mt-1">Full-Stack Developer</p>
                                </div>
                            </div>

                            <nav className="flex flex-col gap-1 mt-4 px-2">
                                {routes.map((route) => {
                                    const isActive = pathname === route.href
                                    return (
                                        <Link
                                            key={route.href}
                                            href={route.href}
                                            onClick={() => setOpen(false)}
                                            className={cn(
                                                "px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                                                isActive
                                                    ? "bg-muted text-foreground"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                            )}
                                        >
                                            {route.label}
                                        </Link>
                                    )
                                })}
                            </nav>

                            <div className="mt-auto px-4 pb-8">
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mb-3">Socials</p>
                                <div className="flex items-center gap-2">
                                    {socialLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex h-9 w-9 items-center justify-center rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-all"
                                        >
                                            <link.icon className="h-4 w-4" />
                                            <span className="sr-only">{link.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
