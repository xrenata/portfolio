import { Badge } from "@/components/ui/badge"
import { ABOUT, WORK_EXPERIENCE } from "@/data/resume"
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/fade-in"
import { siteConfig } from "@/data/site"
import { ArrowUpRight } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="w-full max-w-2xl mx-auto pb-24 px-6">

            {/* Header */}
            <FadeIn className="py-12 border-b border-border/40 space-y-3">
                <h1 className="text-6xl font-black tracking-tighter leading-none">About</h1>
                <p className="text-muted-foreground text-sm">
                    Full-stack developer based somewhere with good coffee.
                </p>
            </FadeIn>

            {/* Bio */}
            <FadeIn className="py-10 border-b border-border/40 space-y-4">
                {ABOUT.paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed">
                        {paragraph}
                    </p>
                ))}
            </FadeIn>

            {/* Experience */}
            <FadeIn className="py-10 border-b border-border/40 space-y-8">
                <div className="flex items-end gap-3">
                    <span className="text-xs font-mono text-muted-foreground/40 mb-1">01</span>
                    <h2 className="text-4xl font-black tracking-tighter">Experience</h2>
                </div>

                <FadeInStagger>
                    {WORK_EXPERIENCE.map((job, index) => (
                        <FadeInItem key={index}>
                            <div className="border-b border-border/40 py-7 group transition-colors hover:border-border last:border-0">
                                <div className="flex items-start gap-6">
                                    <span className="font-mono text-xs text-muted-foreground/40 mt-1 shrink-0 w-6 text-right">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <div className="flex-1 min-w-0 space-y-3">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className="text-xl font-bold tracking-tight leading-tight">
                                                    {job.role}
                                                </h3>
                                                <p className="text-sm text-muted-foreground mt-0.5">{job.company}</p>
                                            </div>
                                            <span className="font-mono text-[10px] text-muted-foreground/50 shrink-0 mt-1">
                                                {job.period}
                                            </span>
                                        </div>

                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {job.description}
                                        </p>

                                        <div className="flex flex-wrap gap-1.5">
                                            {job.tags.map(tag => (
                                                <Badge key={tag} variant="secondary" className="rounded-sm font-normal text-[11px] px-1.5 h-5">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeInItem>
                    ))}
                </FadeInStagger>
            </FadeIn>

            {/* Contact */}
            <FadeIn className="py-10 space-y-6">
                <div className="flex items-end gap-3">
                    <span className="text-xs font-mono text-muted-foreground/40 mb-1">02</span>
                    <h2 className="text-4xl font-black tracking-tighter">Get in Touch</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    Interested in working together or just want to say hi? My inbox is always open.
                </p>
                <a
                    href={siteConfig.links.email}
                    className="group inline-flex items-center gap-2 rounded-xl border border-border bg-muted/20 px-5 py-3 text-sm font-medium text-muted-foreground transition-all hover:bg-muted/50 hover:text-foreground hover:border-border/80"
                >
                    mail@emirhan.cv
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
            </FadeIn>
        </div>
    )
}
