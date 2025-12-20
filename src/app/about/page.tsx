
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

import { ABOUT, WORK_EXPERIENCE } from "@/data/resume"
import { FadeIn } from "@/components/ui/fade-in"

export default function AboutPage() {
    return (
        <div className="container max-w-2xl mx-auto py-24 space-y-12">
            {/* Bio Section */}
            <FadeIn>
                <section className="space-y-6 max-w-3xl mx-auto text-center md:text-left">
                    <h1 className="text-4xl font-bold tracking-tight">{ABOUT.header}</h1>
                    {ABOUT.paragraphs.map((paragraph, index) => (
                        <p key={index} className="text-lg text-muted-foreground leading-relaxed">
                            {paragraph}
                        </p>
                    ))}
                </section>
            </FadeIn>

            <Separator />

            <FadeIn>
                <section className="max-w-4xl mx-auto space-y-8">
                    <h2 className="text-3xl font-bold tracking-tight">Experience</h2>

                    <div className="relative border-l border-border ml-3 space-y-12">
                        {WORK_EXPERIENCE.map((job, index) => (
                            <div key={index} className="ml-6 relative">
                                <span className={`absolute -left-[31px] top-1.5 h-3 w-3 rounded-full ring-4 ring-background ${index === 0 ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
                                <h3 className="text-xl font-semibold">{job.role}</h3>
                                <p className="text-muted-foreground">{job.company} • {job.period}</p>
                                <p className="mt-2 text-muted-foreground">{job.description}</p>
                                <div className="flex gap-2 mt-3">
                                    {job.tags.map(tag => (
                                        <Badge key={tag} variant="outline">{tag}</Badge>
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
                    <a href="mailto:emirhan@example.com" className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                        Contact Me
                    </a>
                </section>
            </FadeIn>
        </div>
    )
}
