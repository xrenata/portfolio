
export interface Project {
    id: string
    title: string
    description: string
    tags: string[]
    demoUrl: string
    repoUrl: string
    image: string
    version: string
}

export const projects: Project[] = [
    {
        id: "portfolio",
        title: "Portfolio",
        description: "A portfolio website built with Next.js 16, Tailwind CSS.",
        tags: ["Next.js", "TypeScript", "Tailwind CSS"],
        demoUrl: "https://emirhan.cv",
        repoUrl: "https://github.com/xrenata/portfolio",
        image: "/projects/portfolio.png",
        version: "v1.0.0"
    }
]
