
import Link from "next/link"
import { Github, Globe } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FadeInStagger, FadeInItem } from "@/components/ui/fade-in"

import { projects } from "@/data/projects"

export default function ProjectsPage() {
    return (
        <div className="container max-w-2xl mx-auto py-24 space-y-12">
            <FadeInStagger>
                <FadeInItem className="space-y-2 border-b border-border pb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                    <p className="text-muted-foreground">
                        A collection of open source libraries, experimental apps, and freelance work.
                    </p>
                </FadeInItem>

                <div className="space-y-12 pt-8">
                    {projects.map((project) => (
                        <FadeInItem key={project.id} className="group relative flex flex-col items-start gap-4 sm:flex-row sm:gap-8">

                            {/* Version/Image Placeholder */}
                            <div className="h-24 w-24 shrink-0 flex items-center justify-center rounded-lg bg-muted/20 border border-border text-xs font-mono text-muted-foreground group-hover:border-foreground/20 transition-colors">
                                {project.version}
                            </div>

                            <div className="space-y-3">
                                <h2 className="text-2xl font-semibold tracking-tight group-hover:underline decoration-primary/50 underline-offset-4">
                                    {project.title}
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="rounded-sm font-normal text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="flex items-center gap-4 pt-2 text-sm font-medium">
                                    <Link href={project.demoUrl} className="flex items-center hover:text-primary transition-colors">
                                        Demo <Globe className="ml-1 h-3 w-3" />
                                    </Link>
                                    <Link href={project.repoUrl} className="flex items-center hover:text-primary transition-colors">
                                        Source <Github className="ml-1 h-3 w-3" />
                                    </Link>
                                </div>
                            </div>
                        </FadeInItem>
                    ))}
                </div>
            </FadeInStagger>
        </div>
    )
}
