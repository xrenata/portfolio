import { NextResponse } from "next/server"
import { siteConfig } from "@/data/site"

export const revalidate = 3600

interface RawContribution {
    date: string
    count: number
    level: 0 | 1 | 2 | 3 | 4
}

export async function GET() {
    const user = siteConfig.githubUsername

    try {
        const res = await fetch(
            `https://github-contributions-api.jogruber.de/v4/${user}?y=last`,
            { next: { revalidate: 3600 } }
        )

        if (!res.ok) {
            return NextResponse.json({ error: "Failed to fetch contributions" }, { status: res.status })
        }

        const data = (await res.json()) as {
            total?: Record<string, number>
            contributions?: RawContribution[]
        }

        const contributions = data.contributions ?? []
        const days = 7 * 26
        const trimmed = contributions.slice(-days)

        const total = Object.values(data.total ?? {}).reduce((a, b) => a + b, 0)

        return NextResponse.json({ contributions: trimmed, total })
    } catch {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
