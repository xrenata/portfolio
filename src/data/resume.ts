
export interface Experience {
    company: string
    role: string
    period: string
    description: string
    tags: string[]
}

export const ABOUT = {
    header: "About Me",
    paragraphs: [
        "Hello! I'm Emirhan, a passionate Full Stack Developer with a keen eye for design and a drive for creating seamless digital experiences. With a background in modern web technologies, I specialize in building scalable, accessible, and performant applications.",
        "I believe in the power of code to solve real-world problems. Whether it's crafting a pixel-perfect frontend or architecting a robust backend API, I approach every project with dedication and attention to detail."
    ]
}

export const WORK_EXPERIENCE: Experience[] = [
    {
        company: "Eupholias Developers",
        role: "Full Stack Developer",
        period: "2025 - Present",
        description: "Leading the frontend team in rebuilding the core product dashboard using Next.js and React Query.",
        tags: ["React", "TypeScript", "GraphQL", "Elysia", "Prisma", "PostgreSQL", "Redis", "MongoDB"]
    },
    {
        company: "Freelance",
        role: "Frontend Developer",
        period: "2025 - Present",
        description: "Building scalable, accessible, and performant applications.",
        tags: ["React","TypeScript","Next.js","Tailwind CSS"]
    },
    {
        company: "Nodesty",
        role: "Support Team",
        period: "2022 - Present",
        description: "Leading the frontend team in rebuilding the core product dashboard using Next.js and React Query.",
        tags: ["React", "TypeScript", "GraphQL"]
    },
    {
        company: "Freelance",
        role: "Backend Developer",
        period: "2017 - Present",
        description: "Building scalable, accessible, and performant applications.",
        tags: ["Node.js","Fastify","Socket.io"]
    }
]
