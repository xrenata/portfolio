
export interface Skill {
    name: string
    icon: string
}

export interface SkillCategory {
    title: string
    description: string
    skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
    {
        title: "Frontend Engineering",
        description: "Building accessible, pixel-perfect user interfaces.",
        skills: [
            { name: "React", icon: "react" },
            { name: "Next.js", icon: "nextjs" },
            { name: "Kotlin", icon: "kotlin" },
            {name: "Flutter", icon: "flutter"},
            { name: "TypeScript", icon: "ts" },
            { name: "Tailwind CSS", icon: "tailwind" },
            { name: "HTML5", icon: "html" },
            { name: "CSS3", icon: "css" },
            { name: "Sass", icon: "sass" },
        ]
    },
    {
        title: "Backend & Systems",
        description: "Designing scalable APIs and database architectures.",
        skills: [
            { name: "Node.js", icon: "nodejs" },
            { name: "C#", icon: "cs" },
            { name: "Express", icon: "express" },
            { name: "Elysia", icon: "elysia" },
            { name: "PostgreSQL", icon: "postgres" },
            { name: "Prisma", icon: "prisma" },
            { name: "MongoDB", icon: "mongodb" },
            { name: "GraphQL", icon: "graphql" },
            { name: "Firebase", icon: "firebase" },
        ]
    },
    {
        title: "DevOps & Tooling",
        description: "Ensuring reliable deployments and developer experience.",
        skills: [
            { name: "Git", icon: "git" },
            { name: "GitHub", icon: "github" },
            { name: "Docker", icon: "docker" },
            { name: "AWS", icon: "aws" },
            { name: "Vercel", icon: "vercel" },
            { name: "Netlify", icon: "netlify" },
            { name: "Figma", icon: "figma" },
            { name: "Postman", icon: "postman" },
        ]
    },
]
