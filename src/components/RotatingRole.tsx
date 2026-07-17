"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const roles = [
    "Full-Stack Developer",
    "UI/UX Designer",
    "Mobile Developer",
    "Open Sourcerer",
]

export function RotatingRole() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const id = setInterval(() => {
            setIndex((i) => (i + 1) % roles.length)
        }, 2600)
        return () => clearInterval(id)
    }, [])

    return (
        <span className="relative inline-flex h-[1.3em] items-center overflow-hidden align-bottom -mb-[0.15em] leading-none">
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-110%", opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="block whitespace-nowrap leading-[1.3em]"
                >
                    {roles[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    )
}
