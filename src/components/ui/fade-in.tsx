"use client"

import { HTMLMotionProps, motion } from "framer-motion"

export function FadeIn({ children, className, delay = 0, ...props }: HTMLMotionProps<"div"> & { delay?: number }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay } }
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    )
}

export function FadeInStagger({ children, className, ...props }: HTMLMotionProps<"div">) {
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.1 } }
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    )
}

export const fadeInVariants: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

export const blurFadeVariants: any = {
    hidden: { opacity: 0, filter: "blur(8px)", y: 10 },
    show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: "easeOut" } }
}

export function FadeInItem({ children, className, ...props }: HTMLMotionProps<"div">) {
    return (
        <motion.div variants={fadeInVariants} className={className} {...props}>
            {children}
        </motion.div>
    )
}

export function BlurFade({ children, className, delay = 0, ...props }: HTMLMotionProps<"div"> & { children: React.ReactNode, delay?: number }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: { opacity: 0, filter: "blur(8px)", y: 10 },
                show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: "easeOut", delay } }
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    )
}
