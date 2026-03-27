export interface BookmarkItem {
    title: string
    href: string
    description: string
    tags: string[]
    note: string
}

export interface BookmarkCategory {
    id: string
    title: string
    description: string
    eyebrow: string
    items: BookmarkItem[]
}

export const bookmarkCategories: BookmarkCategory[] = [
    {
        id: "design",
        title: "Design",
        description: "Interfaces, art direction, and work with strong visual taste.",
        eyebrow: "Visual",
        items: [
            {
                title: "Mobbin",
                href: "https://mobbin.com",
                description: "A huge library of product UI references when I need sharp interaction or onboarding ideas.",
                tags: ["UI", "Product", "Reference"],
                note: "Best for flows and polished mobile/web patterns.",
            },
            {
                title: "Godly",
                href: "https://godly.website",
                description: "A curated gallery of websites with stronger-than-average visual direction.",
                tags: ["Web", "Inspiration", "Curation"],
                note: "Great when the work needs more personality than a typical SaaS layout.",
            },
            {
                title: "Typewolf",
                href: "https://www.typewolf.com",
                description: "Useful when I want to study typography pairings and editorial hierarchy.",
                tags: ["Typography", "Editorial", "Fonts"],
                note: "Typography-first inspiration.",
            },
        ],
    },
    {
        id: "frontend",
        title: "Frontend",
        description: "UI engineering references, patterns, and tools I keep returning to.",
        eyebrow: "Build",
        items: [
            {
                title: "shadcn/ui",
                href: "https://ui.shadcn.com",
                description: "Still one of the cleanest examples of practical, composable React UI architecture.",
                tags: ["React", "Components", "System"],
                note: "A strong reference for API design and UI consistency.",
            },
            {
                title: "Aceternity UI",
                href: "https://ui.aceternity.com",
                description: "Useful for motion-heavy ideas and flashy interaction explorations.",
                tags: ["Motion", "React", "Effects"],
                note: "Good when I want to push visuals a bit further.",
            },
            {
                title: "Framer Motion Docs",
                href: "https://motion.dev",
                description: "The first place I check for interaction patterns, layout animation, and orchestration ideas.",
                tags: ["Animation", "Docs", "Interaction"],
                note: "Fastest route from idea to smooth motion.",
            },
        ],
    },
    {
        id: "engineering",
        title: "Engineering",
        description: "Back-end, system design, and technical writing that influences how I build.",
        eyebrow: "Think",
        items: [
            {
                title: "The Pragmatic Engineer",
                href: "https://www.pragmaticengineer.com",
                description: "Excellent writing on engineering organizations, architecture, and real-world software work.",
                tags: ["Architecture", "Career", "Systems"],
                note: "A favorite for broad engineering perspective.",
            },
            {
                title: "System Design Primer",
                href: "https://github.com/donnemartin/system-design-primer",
                description: "A solid reference when revisiting distributed systems fundamentals or interview-style tradeoffs.",
                tags: ["System Design", "Distributed", "Reference"],
                note: "Classic resource, still useful.",
            },
            {
                title: "Martin Fowler",
                href: "https://martinfowler.com",
                description: "Patterns, refactoring, architecture, and some of the most evergreen software writing on the web.",
                tags: ["Patterns", "Refactoring", "Architecture"],
                note: "Timeless engineering reading.",
            },
        ],
    },
    {
        id: "tools",
        title: "Tools",
        description: "Small but powerful tools and resources I actually keep open while working.",
        eyebrow: "Daily",
        items: [
            {
                title: "Can I Use",
                href: "https://caniuse.com",
                description: "Still essential whenever CSS or browser APIs enter the conversation.",
                tags: ["Browser", "Compatibility", "CSS"],
                note: "The quick sanity check before shipping web platform features.",
            },
            {
                title: "Bundlephobia",
                href: "https://bundlephobia.com",
                description: "A simple way to check package cost before adding another dependency to the pile.",
                tags: ["Performance", "Packages", "Audit"],
                note: "Helpful for staying intentional about dependencies.",
            },
            {
                title: "Excalidraw",
                href: "https://excalidraw.com",
                description: "My go-to for thinking through product flows, backend edges, and architecture sketches.",
                tags: ["Sketching", "Planning", "Diagrams"],
                note: "The fastest way to make messy ideas legible.",
            },
        ],
    },
]
