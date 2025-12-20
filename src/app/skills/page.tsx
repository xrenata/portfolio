
import { Badge } from "@/components/ui/badge"
import { FadeInStagger, FadeInItem } from "@/components/ui/fade-in"

import { skillCategories } from "@/data/skills"

export default function SkillsPage() {
    return (
        <div className="container max-w-2xl mx-auto py-24 space-y-24">
            <FadeInStagger>
                <FadeInItem className="space-y-2 border-b border-border pb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Skills & Expertise</h1>
                    <p className="text-muted-foreground">
                        My technical toolbelt for bringing ideas to life.
                    </p>
                </FadeInItem>

                <div className="space-y-20 pt-8">
                    {skillCategories.map((category, index) => (
                        <FadeInItem key={category.title} className="flex gap-8 items-start relative group">
                            {/* Side Number */}
                            <div
                                className="text-6xl font-bold text-foreground/20 select-none font-mono -mt-2 transition-colors group-hover:text-foreground/30 shrink-0"
                                aria-hidden="true"
                            >
                                0{index + 1}
                            </div>

                            <div className="space-y-4 pt-1">
                                <div>
                                    <h2 className="text-xl font-semibold tracking-tight">{category.title}</h2>
                                    <p className="text-sm text-muted-foreground">{category.description}</p>
                                </div>

                                <div className="flex flex-wrap gap-3 pt-2">
                                    {category.skills.map((skill) => (
                                        <div key={skill.name} className="group/icon relative">
                                            <img
                                                src={`https://skillicons.dev/icons?i=${skill.icon}&theme=dark`}
                                                alt={skill.name}
                                                className="h-10 w-10 hover:scale-110 transition-transform cursor-pointer"
                                            />
                                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-border">
                                                {skill.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeInItem>
                    ))}
                </div>
            </FadeInStagger>
        </div>
    )
}

