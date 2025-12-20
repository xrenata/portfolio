
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
        id: "emirhan-cv",
        title: "emirhan.cv",
        description: "Made with React, TypeScript, and TailwindCSS. It includes a breakdown of my top Spotify tracks!",
        tags: ["React", "TypeScript", "TailwindCSS"],
        demoUrl: "https://emirhan.cv",
        repoUrl: "https://github.com/xrenata/portfolio",
        image: "/projects/portfolio.png",
        version: "v2.0.0"
    },
    {
        id: "stubudy",
        title: "Stubudy",
        description: "Stubudy is an AI-powered study platform designed to help students learn more efficiently.",
        tags: ["AI", "Next.js", "Platform"],
        demoUrl: "https://stubudy.com.tr",
        repoUrl: "#",
        image: "/projects/stubudy.png",
        version: "v1.0.0"
    },
    {
        id: "hospital-project",
        title: "Hospital Management",
        description: "Full-stack Hospital Management System built with Next.js (React) and Express.js.",
        tags: ["Next.js", "Express.js", "Full-stack"],
        demoUrl: "#",
        repoUrl: "https://github.com/xrenata/hospitalproject",
        image: "/projects/hospital.png",
        version: "v1.0.0"
    },
    {
        id: "discord-place",
        title: "discord.place",
        description: "All things related to Discord in one place.",
        tags: ["Discord", "Community", "Tools"],
        demoUrl: "https://discord.place",
        repoUrl: "https://github.com/xrenata/discord.place",
        image: "/projects/discord-place.png",
        version: "v1.0.0"
    },
    {
        id: "disbot",
        title: "DisBot",
        description: "Are you looking for any special bot for your Discord server? Leave that job to us.",
        tags: ["Discord Bot", "Service", "Automation"],
        demoUrl: "https://disbot.com.tr",
        repoUrl: "#",
        image: "/projects/disbot.png",
        version: "v1.0.0"
    },
    {
        id: "lantern",
        title: "Lantern",
        description: "Makes it incredibly easy to reveal your live Discord status through a RESTful API and WebSocket.",
        tags: ["API", "WebSocket", "Discord"],
        demoUrl: "https://lantern.rest",
        repoUrl: "#",
        image: "/projects/lantern.png",
        version: "v1.0.0"
    },
    {
        id: "nodesty",
        title: "Nodesty",
        description: "Launch your server within minutes. Experience excellent reliability with a 17Tbps+ network.",
        tags: ["Hosting", "Infrastructure", "Server"],
        demoUrl: "https://nodesty.com",
        repoUrl: "#",
        image: "/projects/nodesty.png",
        version: "v1.0.0"
    },
    {
        id: "turkmanga",
        title: "TurkManga",
        description: "A free platform created for manga lovers.",
        tags: ["Manga", "Reading", "Platform"],
        demoUrl: "https://turkmanga.live",
        repoUrl: "#",
        image: "/projects/turkmanga.png",
        version: "v1.0.0"
    },
    {
        id: "codare",
        title: "Codare",
        description: "You can easily learn and access codes on this site. Access all codes by browsing through the site!",
        tags: ["Education", "Coding", "Resources"],
        demoUrl: "https://codare.fun",
        repoUrl: "https://github.com/Codare-Development",
        image: "/projects/codare.png",
        version: "v1.0.0"
    }
]
