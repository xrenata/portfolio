"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"

import { routes } from "@/data/site"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useState } from "react"
import { socialLinks } from "@/data/site"

export function Navbar() {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40 supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center justify-between px-6 max-w-2xl mx-auto w-full">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-primary/20">
                        <Image
                            src="/avatar.jpeg"
                            alt="Emirhan"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <span className="font-bold tracking-tight hidden sm:block">emirhan</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {routes.map((route) => {
                        const isActive = pathname === route.href
                        return (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-foreground",
                                    isActive
                                        ? "text-foreground font-semibold underline decoration-2 decoration-primary/50 underline-offset-4"
                                        : "text-muted-foreground"
                                )}
                            >
                                {route.label}
                            </Link>
                        )
                    })}
                </nav>

                {/* Mobile Nav */}
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <button className="md:hidden p-2 -mr-2 text-foreground/80 hover:text-foreground transition-colors">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Open menu</span>
                        </button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col">
                        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                        <SheetDescription className="sr-only">Main site navigation</SheetDescription>

                        <div className="flex items-center gap-4 px-2 py-6 border-b border-border/50">
                            <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-primary/20">
                                <Image
                                    src="/avatar.jpeg"
                                    alt="Emirhan"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-lg leading-none">emirhan</span>
                                <span className="text-xs text-muted-foreground">Full-stack Developer</span>
                            </div>
                        </div>

                        <nav className="flex flex-col gap-2 mt-6 px-2">
                            {routes.map((route) => {
                                const isActive = pathname === route.href
                                return (
                                    <Link
                                        key={route.href}
                                        href={route.href}
                                        onClick={() => setOpen(false)}
                                        className={cn(
                                            "text-lg font-medium transition-all px-4 py-3 rounded-md hover:bg-muted/50",
                                            isActive
                                                ? "text-foreground bg-muted/50"
                                                : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        {route.label}
                                    </Link>
                                )
                            })}
                        </nav>

                        <div className="mt-auto px-4 pb-8 space-y-4">
                            <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Socials</p>
                            <div className="flex items-center gap-4">
                                {socialLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="h-10 w-10 flex items-center justify-center rounded-full bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                                    >
                                        <link.icon className="h-5 w-5" />
                                        <span className="sr-only">{link.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}
