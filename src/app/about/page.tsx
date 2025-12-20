
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

import { ABOUT, WORK_EXPERIENCE } from "@/data/resume"
import { FadeIn } from "@/components/ui/fade-in"

export default function AboutPage() {
    return (
        <div className="w-full max-w-2xl mx-auto pb-12 md:pb-24 px-6 space-y-12">
            {/* Bio Section */}
            <FadeIn>
                <section className="space-y-6 text-center md:text-left">
                    <h1 className="text-3xl font-bold tracking-tight">{ABOUT.header}</h1>
                    {ABOUT.paragraphs.map((paragraph, index) => (
                        <p key={index} className="text-lg text-muted-foreground leading-relaxed">
                            {paragraph}
                        </p>
                    ))}
                </section>
            </FadeIn>

            <Separator />

            <FadeIn>
                <section className="space-y-8">
                    <h2 className="text-3xl font-bold tracking-tight">Experience</h2>

                    <div className="relative border-l border-border ml-3 space-y-12">
                        {WORK_EXPERIENCE.map((job, index) => (
                            <div key={index} className="ml-8 relative">
                                <span className={`absolute -left-[39px] top-1.5 h-3 w-3 rounded-full ring-4 ring-background ${index === 0 ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                                    <h3 className="text-xl font-semibold">{job.role}</h3>
                                    <span className="text-sm text-muted-foreground font-mono whitespace-nowrap">{job.period}</span>
                                </div>
                                <p className="text-muted-foreground">{job.company}</p>
                                <p className="mt-4 text-muted-foreground leading-relaxed">{job.description}</p>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {job.tags.map(tag => (
                                        <Badge key={tag} variant="secondary" className="font-normal text-xs">{tag}</Badge>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </FadeIn>

            <Separator />

            <FadeIn>
                <section className="max-w-3xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl font-bold tracking-tight">Get in Touch</h2>
                    <p className="text-muted-foreground">
                        Interested in working together or just want to say hi? Feel free to reach out!
                    </p>
                    <a href="mailto:mail@emirhan.cv" className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                        Contact Me
                    </a>
                </section>
            </FadeIn>
        </div>
    )
}
