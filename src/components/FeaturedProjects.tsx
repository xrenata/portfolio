"use client"

import { useRef, type MouseEvent } from "react"
import Link from "next/link"
import { ArrowUpRight, Globe, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { projects, type Project } from "@/data/projects"

const featured = projects.slice(0, 4)

function SpotlightCard({ project }: { project: Project }) {
    const ref = useRef<HTMLDivElement>(null)

    function handleMove(e: MouseEvent<HTMLDivElement>) {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        el.style.setProperty("--x", `${e.clientX - rect.left}px`)
        el.style.setProperty("--y", `${e.clientY - rect.top}px`)
    }

    const hasDemo = project.demoUrl && project.demoUrl !== "#"
    const hasRepo = project.repoUrl && project.repoUrl !== "#"

    return (
        <div
            ref={ref}
            onMouseMove={handleMove}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card/40 p-5 backdrop-blur-sm transition-colors hover:border-border/80"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background:
                        "radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), oklch(0.985 0 0 / 0.06), transparent 70%)",
                }}
            />

            <div className="relative space-y-3">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-black tracking-tight">{project.title}</h3>
                    <span className="font-mono text-[10px] text-muted-foreground/40">
                        {project.version}
                    </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                        <Badge
                            key={tag}
                            variant="secondary"
                            className="h-5 rounded-sm px-1.5 text-[10px] font-normal"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>

            <div className="relative mt-5 flex items-center gap-4">
                {hasDemo && (
                    <Link
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <Globe className="h-3 w-3" />
                        Demo
                    </Link>
                )}
                {hasRepo && (
                    <Link
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <Github className="h-3 w-3" />
                        Source
                    </Link>
                )}
                <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </div>
        </div>
    )
}

export function FeaturedProjects() {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {featured.map((project) => (
                <SpotlightCard key={project.id} project={project} />
            ))}
        </div>
    )
}
