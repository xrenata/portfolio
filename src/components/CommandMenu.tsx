"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { routes, socialLinks } from "@/data/site"
import {
    Search,
    ArrowRight,
    FileText,
    Moon,
    Sun,
    Home,
    CornerDownLeft,
} from "lucide-react"

export type PostMeta = { slug: string; title: string }

type CommandItem = {
    id: string
    label: string
    hint?: string
    icon: React.ReactNode
    keywords?: string
    perform: () => void
}

type CommandGroup = { heading: string; items: CommandItem[] }

export function CommandMenu({ posts = [] }: { posts?: PostMeta[] }) {
    const [open, setOpen] = React.useState(false)
    const [query, setQuery] = React.useState("")
    const [activeIndex, setActiveIndex] = React.useState(0)
    const router = useRouter()
    const { setTheme } = useTheme()
    const listRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault()
                setOpen((o) => !o)
            }
        }
        window.addEventListener("keydown", onKeyDown)
        const openHandler = () => setOpen(true)
        window.addEventListener("open-command-menu", openHandler)
        return () => {
            window.removeEventListener("keydown", onKeyDown)
            window.removeEventListener("open-command-menu", openHandler)
        }
    }, [])

    React.useEffect(() => {
        if (open) {
            setQuery("")
            setActiveIndex(0)
        }
    }, [open])

    const run = React.useCallback((fn: () => void) => {
        setOpen(false)
        setTimeout(fn, 0)
    }, [])

    const groups = React.useMemo<CommandGroup[]>(() => {
        const pages: CommandItem[] = routes.map((r) => ({
            id: `page-${r.href}`,
            label: r.label,
            hint: r.href,
            keywords: `${r.label} ${r.href}`,
            icon: r.href === "/" ? <Home className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />,
            perform: () => run(() => router.push(r.href)),
        }))

        const postItems: CommandItem[] = posts.map((p) => ({
            id: `post-${p.slug}`,
            label: p.title,
            hint: "Blog",
            keywords: `${p.title} blog post`,
            icon: <FileText className="h-4 w-4" />,
            perform: () => run(() => router.push(`/blog/${p.slug}`)),
        }))

        const themeItems: CommandItem[] = [
            {
                id: "theme-dark",
                label: "Switch to dark",
                keywords: "theme dark mode appearance",
                icon: <Moon className="h-4 w-4" />,
                perform: () => run(() => setTheme("dark")),
            },
            {
                id: "theme-light",
                label: "Switch to light",
                keywords: "theme light mode appearance",
                icon: <Sun className="h-4 w-4" />,
                perform: () => run(() => setTheme("light")),
            },
        ]

        const socials: CommandItem[] = socialLinks.map((s) => ({
            id: `social-${s.name}`,
            label: s.name,
            hint: "Open",
            keywords: s.name,
            icon: <s.icon className="h-4 w-4" />,
            perform: () => run(() => window.open(s.href, "_blank", "noopener,noreferrer")),
        }))

        return [
            { heading: "Pages", items: pages },
            { heading: "Blog", items: postItems },
            { heading: "Theme", items: themeItems },
            { heading: "Socials", items: socials },
        ]
    }, [posts, router, run, setTheme])

    const filteredGroups = React.useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return groups
        return groups
            .map((g) => ({
                heading: g.heading,
                items: g.items.filter((it) =>
                    (it.keywords ?? it.label).toLowerCase().includes(q)
                ),
            }))
            .filter((g) => g.items.length > 0)
    }, [groups, query])

    const flat = React.useMemo(
        () => filteredGroups.flatMap((g) => g.items),
        [filteredGroups]
    )

    React.useEffect(() => {
        setActiveIndex(0)
    }, [query])

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault()
            setActiveIndex((i) => Math.min(i + 1, flat.length - 1))
        } else if (e.key === "ArrowUp") {
            e.preventDefault()
            setActiveIndex((i) => Math.max(i - 1, 0))
        } else if (e.key === "Enter") {
            e.preventDefault()
            flat[activeIndex]?.perform()
        }
    }

    React.useEffect(() => {
        const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)
        el?.scrollIntoView({ block: "nearest" })
    }, [activeIndex])

    let runningIndex = -1

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                showCloseButton={false}
                className="top-[15%] translate-y-0 overflow-hidden p-0 gap-0 sm:max-w-xl"
                onKeyDown={onKeyDown}
            >
                <DialogTitle className="sr-only">Command menu</DialogTitle>
                <DialogDescription className="sr-only">
                    Search pages, blog posts and actions
                </DialogDescription>

                <div className="flex items-center gap-3 border-b border-border px-4">
                    <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <input
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search pages, posts, actions…"
                        className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
                    />
                    <kbd className="hidden shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground/60 sm:inline-block">
                        ESC
                    </kbd>
                </div>

                <div ref={listRef} className="max-h-[60vh] overflow-y-auto p-2 no-scrollbar">
                    {flat.length === 0 ? (
                        <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                            No results found.
                        </p>
                    ) : (
                        filteredGroups.map((group) => (
                            <div key={group.heading} className="mb-1">
                                <p className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                                    {group.heading}
                                </p>
                                {group.items.map((item) => {
                                    runningIndex++
                                    const index = runningIndex
                                    const active = index === activeIndex
                                    return (
                                        <button
                                            key={item.id}
                                            data-index={index}
                                            onClick={item.perform}
                                            onMouseMove={() => setActiveIndex(index)}
                                            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                                                active ? "bg-muted text-foreground" : "text-muted-foreground"
                                            }`}
                                        >
                                            <span className={active ? "text-foreground" : "text-muted-foreground/70"}>
                                                {item.icon}
                                            </span>
                                            <span className="flex-1 truncate text-foreground/90">{item.label}</span>
                                            {item.hint && (
                                                <span className="shrink-0 font-mono text-[10px] text-muted-foreground/40">
                                                    {item.hint}
                                                </span>
                                            )}
                                            {active && (
                                                <CornerDownLeft className="h-3 w-3 shrink-0 text-muted-foreground/40" />
                                            )}
                                        </button>
                                    )
                                })}
                            </div>
                        ))
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
