"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { WORK_EXPERIENCE } from "@/data/resume"

export function ExperienceTimeline() {
    return (
        <div className="relative pl-6">
            <div className="absolute left-[3px] top-2 bottom-2 w-px bg-border" aria-hidden />

            <div className="space-y-8">
                {WORK_EXPERIENCE.map((exp, i) => {
                    const isCurrent = exp.period.toLowerCase().includes("present")

                    const inner = (
                        <>
                            <div className="flex items-baseline justify-between gap-3">
                                <div className="flex items-center gap-1.5">
                                    <h3 className="font-bold tracking-tight group-hover:underline underline-offset-4 decoration-border">
                                        {exp.company}
                                    </h3>
                                    {exp.link && (
                                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                                    )}
                                </div>
                                <span className="shrink-0 font-mono text-[11px] text-muted-foreground/60">
                                    {exp.period}
                                </span>
                            </div>
                            <p className="mt-0.5 text-sm text-muted-foreground">{exp.role}</p>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                                {exp.tags.slice(0, 4).map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant="secondary"
                                        className="h-5 rounded-sm px-1.5 text-[10px] font-normal"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </>
                    )

                    return (
                        <motion.div
                            key={`${exp.company}-${i}`}
                            className="relative"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: Math.min(i, 4) * 0.06 }}
                        >
                            <span
                                className={`absolute -left-[27px] top-1.5 h-[9px] w-[9px] rounded-full border-2 border-background ${isCurrent ? "bg-green-500" : "bg-muted-foreground/40"}`}
                                aria-hidden
                            />

                            {exp.link ? (
                                <Link href={exp.link} target="_blank" rel="noreferrer" className="group block">
                                    {inner}
                                </Link>
                            ) : (
                                <div className="group block">{inner}</div>
                            )}
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
