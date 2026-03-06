"use client"

import { motion } from "framer-motion"
import { skillCategories } from "@/data/skills"

export default function SkillsPage() {
    return (
        <div className="w-full max-w-2xl mx-auto pb-24 px-6">

            {/* Header */}
            <motion.div
                className="py-12 border-b border-border/40 space-y-3"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                <h1 className="text-6xl font-black tracking-tighter leading-none">Skills</h1>
                <p className="text-muted-foreground text-sm">
                    My technical toolbelt for bringing ideas to life.
                </p>
            </motion.div>

            {/* Categories */}
            <div>
                {skillCategories.map((category, index) => (
                    <motion.div
                        key={category.title}
                        className="border-b border-border/40 py-10 group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
                    >
                        <div className="flex gap-6 items-start">
                            {/* Number */}
                            <span
                                aria-hidden
                                className="font-mono text-[4.5rem] font-black leading-none text-foreground/[0.06] select-none shrink-0 -mt-2 transition-colors group-hover:text-foreground/[0.1]"
                            >
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            <div className="flex-1 space-y-6 pt-1">
                                {/* Title + description */}
                                <div>
                                    <h2 className="text-xl font-bold tracking-tight">{category.title}</h2>
                                    <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                                </div>

                                {/* Icons */}
                                <div className="flex flex-wrap gap-3">
                                    {category.skills.map((skill, i) => (
                                        <motion.div
                                            key={skill.name}
                                            className="group/icon relative"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.3, delay: i * 0.04, ease: "easeOut" }}
                                        >
                                            <img
                                                src={`https://skillicons.dev/icons?i=${skill.icon}&theme=dark`}
                                                alt={skill.name}
                                                className="h-10 w-10 transition-transform hover:scale-110 cursor-default"
                                            />
                                            {/* Tooltip */}
                                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-popover border border-border text-popover-foreground text-xs whitespace-nowrap pointer-events-none opacity-0 group-hover/icon:opacity-100 transition-opacity">
                                                {skill.name}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
