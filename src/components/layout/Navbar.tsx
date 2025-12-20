"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"

import { routes } from "@/data/site"

export function Navbar() {
    const pathname = usePathname()

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/40">
            <div className="container max-w-2xl mx-auto flex h-16 items-center justify-between px-4 md:px-0">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-primary/20">
                        <Image
                            src="/avatar.jpeg"
                            alt="Emirhan"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </Link>

                <nav className="flex items-center gap-6">
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
            </div>
        </header>
    )
}
