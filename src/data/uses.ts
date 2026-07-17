export interface UsesItem {
    name: string
    description: string
    href?: string
}

export interface UsesCategory {
    title: string
    items: UsesItem[]
}

export const usesCategories: UsesCategory[] = [
    {
        title: "Editors & IDEs",
        items: [
            { name: "VS Code", description: "Daily driver — Vitesse dark, Geist Mono, minimal extensions.", href: "https://code.visualstudio.com" },
            { name: "Cline", description: "Autonomous AI coding agent living inside my editor.", href: "https://cline.bot" },
            { name: "Neovim", description: "Quick edits over SSH and terminal-only sessions.", href: "https://neovim.io" },
            { name: "Android Studio", description: "For Kotlin / Flutter mobile builds and emulators.", href: "https://developer.android.com/studio" },
            { name: "Zed", description: "When I want something ridiculously fast and native.", href: "https://zed.dev" },
        ],
    },
    {
        title: "CLI & Terminal",
        items: [
            { name: "Windows Terminal", description: "PowerShell 7 + Oh My Posh, tuned to the bone." },
            { name: "Warp", description: "AI-assisted terminal on the machines that run it.", href: "https://warp.dev" },
            { name: "lazygit", description: "Git without leaving the terminal — can't go back.", href: "https://github.com/jesseduffield/lazygit" },
            { name: "gh", description: "GitHub CLI for PRs, issues and gists in one line.", href: "https://cli.github.com" },
            { name: "ripgrep", description: "Instant code search across giant repos.", href: "https://github.com/BurntSushi/ripgrep" },
            { name: "fzf", description: "Fuzzy finder wired into everything.", href: "https://github.com/junegunn/fzf" },
            { name: "zoxide", description: "Smarter cd — jumps to any dir from memory.", href: "https://github.com/ajeetdsouza/zoxide" },
            { name: "bat", description: "cat with syntax highlighting and git blame.", href: "https://github.com/sharkdp/bat" },
        ],
    },
    {
        title: "Languages & Runtimes",
        items: [
            { name: "TypeScript", description: "The language I reach for by default, everywhere.", href: "https://typescriptlang.org" },
            { name: "Bun", description: "Runtime + bundler + package manager for new projects.", href: "https://bun.sh" },
            { name: "Node.js", description: "Still the workhorse for most backends.", href: "https://nodejs.org" },
            { name: "Deno", description: "Secure-by-default runtime for quick scripts.", href: "https://deno.com" },
            { name: "Python", description: "Scripting, automation and the odd ML experiment.", href: "https://python.org" },
            { name: "Go", description: "When I need fast, boring, single-binary services.", href: "https://go.dev" },
            { name: "Rust", description: "Learning it for the performance-critical bits.", href: "https://rust-lang.org" },
            { name: "pnpm", description: "Fast, disk-efficient installs on everything else.", href: "https://pnpm.io" },
        ],
    },
    {
        title: "Dev Tools & Services",
        items: [
            { name: "Docker", description: "Local services and reproducible environments.", href: "https://docker.com" },
            { name: "Bruno", description: "Git-friendly API client, offline and open source.", href: "https://usebruno.com" },
            { name: "TablePlus", description: "Poking at Postgres, MySQL and Redis visually.", href: "https://tableplus.com" },
            { name: "Prisma Studio", description: "Quick GUI for the database during development.", href: "https://prisma.io/studio" },
            { name: "ngrok", description: "Tunneling localhost for webhooks and demos.", href: "https://ngrok.com" },
            { name: "Vercel", description: "Deploys for basically every side project.", href: "https://vercel.com" },
            { name: "Cloudflare", description: "DNS, tunnels, R2 and the occasional Worker.", href: "https://cloudflare.com" },
            { name: "Supabase", description: "Managed Postgres, auth and storage in a pinch.", href: "https://supabase.com" },
            { name: "Upstash", description: "Serverless Redis and queues for edge apps.", href: "https://upstash.com" },
            { name: "Sentry", description: "Error tracking so I hear about bugs before users do.", href: "https://sentry.io" },
            { name: "GitHub Actions", description: "CI/CD pipelines for lint, tests and deploys.", href: "https://github.com/features/actions" },
        ],
    },
    {
        title: "Design & Productivity",
        items: [
            { name: "Figma", description: "UI design, prototyping and quick mockups.", href: "https://figma.com" },
            { name: "Raycast", description: "Launcher, clipboard history, snippets and scripts.", href: "https://raycast.com" },
            { name: "Obsidian", description: "Markdown notes and a slowly growing second brain.", href: "https://obsidian.md" },
            { name: "Notion", description: "Planning, docs and tracking side projects.", href: "https://notion.so" },
            { name: "Chrome", description: "Daily driver browser — DevTools basically always open.", href: "https://google.com/chrome" },
        ],
    },
]
