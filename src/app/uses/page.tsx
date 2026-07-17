"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { usesCategories } from "@/data/uses"

export default function UsesPage() {
    return (
        <div className="w-full max-w-2xl mx-auto pb-24 px-6">
            <motion.div
                className="py-12 border-b border-border/40 space-y-3"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                <h1 className="text-6xl font-black tracking-tighter leading-none">Uses</h1>
                <p className="text-muted-foreground text-sm">
                    The tools, apps and gear I use to build things every day.
                </p>
            </motion.div>

            <div>
                {usesCategories.map((category, index) => (
                    <motion.div
                        key={category.title}
                        className="border-b border-border/40 py-10 group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
                    >
                        <div className="flex gap-6 items-start">
                            <span
                                aria-hidden
                                className="font-mono text-[4.5rem] font-black leading-none text-foreground/[0.06] select-none shrink-0 -mt-2 transition-colors group-hover:text-foreground/[0.1]"
                            >
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            <div className="flex-1 space-y-5 pt-1">
                                <h2 className="text-xl font-bold tracking-tight">{category.title}</h2>

                                <div className="space-y-4">
                                    {category.items.map((item) => {
                                        const content = (
                                            <>
                                                <div className="flex items-center gap-1.5">
                                                    <h3 className="font-medium tracking-tight group-hover/item:underline underline-offset-4 decoration-border">
                                                        {item.name}
                                                    </h3>
                                                    {item.href && (
                                                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/40 transition-all group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5 group-hover/item:text-foreground" />
                                                    )}
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>
                                            </>
                                        )

                                        return item.href ? (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="group/item block"
                                            >
                                                {content}
                                            </Link>
                                        ) : (
                                            <div key={item.name} className="group/item">
                                                {content}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
