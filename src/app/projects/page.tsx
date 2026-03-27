"use client"

import Link from "next/link"
import { Github, Globe, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { projects } from "@/data/projects"

export default function ProjectsPage() {
    return (
        <div className="w-full max-w-2xl mx-auto pb-24 px-6">

            <motion.div
                className="py-12 border-b border-border/40 space-y-3"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                <h1 className="text-6xl font-black tracking-tighter leading-none">Projects</h1>
                <p className="text-muted-foreground text-sm">
                    {projects.length} projects - open source, freelance & experimental.
                </p>
            </motion.div>

            <div>
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index < 3 ? index * 0.08 : 0 }}
                    >
                        <div className="group border-b border-border/40 py-8 transition-colors hover:border-border">
                            <div className="flex items-start gap-6">
                                <span className="font-mono text-xs text-muted-foreground/40 mt-1.5 shrink-0 w-6 text-right">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <div className="flex-1 min-w-0 space-y-3">
                                    <div className="flex items-start justify-between gap-4">
                                        <h2 className="text-2xl font-black tracking-tight leading-tight group-hover:underline underline-offset-4 decoration-border">
                                            {project.title}
                                        </h2>
                                        <ArrowUpRight className="h-4 w-4 shrink-0 mt-1.5 text-muted-foreground/30 transition-all group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </div>

                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="secondary"
                                                className="rounded-sm font-normal text-[11px] px-1.5 h-5"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-4 pt-1">
                                        {project.demoUrl && project.demoUrl !== "#" && (
                                            <Link
                                                href={project.demoUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                <Globe className="h-3 w-3" />
                                                Demo
                                            </Link>
                                        )}
                                        {project.repoUrl && project.repoUrl !== "#" && (
                                            <Link
                                                href={project.repoUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                <Github className="h-3 w-3" />
                                                Source
                                            </Link>
                                        )}
                                        <span className="ml-auto font-mono text-[10px] text-muted-foreground/30">
                                            {project.version}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
