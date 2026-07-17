"use client"

import useSWR from "swr"
import Link from "next/link"
import { Github } from "lucide-react"
import { siteConfig } from "@/data/site"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface Contribution {
    date: string
    count: number
    level: 0 | 1 | 2 | 3 | 4
}

const levelClass: Record<number, string> = {
    0: "bg-muted-foreground/10",
    1: "bg-green-500/30",
    2: "bg-green-500/50",
    3: "bg-green-500/70",
    4: "bg-green-500",
}

function toWeeks(contributions: Contribution[]): Contribution[][] {
    const weeks: Contribution[][] = []
    for (let i = 0; i < contributions.length; i += 7) {
        weeks.push(contributions.slice(i, i + 7))
    }
    return weeks
}

export function GithubContributions() {
    const { data, isLoading } = useSWR<{ contributions: Contribution[]; total: number }>(
        "/api/github",
        fetcher,
        { revalidateOnFocus: false }
    )

    const contributions = data?.contributions ?? []
    const weeks = toWeeks(contributions)

    return (
        <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="group block rounded-2xl border border-border bg-card p-5 transition-colors hover:border-border/60"
        >
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Github className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">GitHub Contributions</span>
                </div>
                {data?.total != null && (
                    <span className="font-mono text-xs text-muted-foreground/60">
                        {data.total.toLocaleString()} in the last year
                    </span>
                )}
            </div>

            {isLoading || weeks.length === 0 ? (
                <div className="flex gap-[3px] overflow-hidden">
                    {Array.from({ length: 26 }).map((_, w) => (
                        <div key={w} className="flex flex-col gap-[3px]">
                            {Array.from({ length: 7 }).map((_, d) => (
                                <div key={d} className="h-[11px] w-[11px] rounded-[2px] bg-muted-foreground/10 animate-pulse" />
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex gap-[3px] overflow-x-auto no-scrollbar">
                    {weeks.map((week, w) => (
                        <div key={w} className="flex shrink-0 flex-col gap-[3px]">
                            {week.map((day) => (
                                <div
                                    key={day.date}
                                    title={`${day.count} contributions on ${day.date}`}
                                    className={`h-[11px] w-[11px] rounded-[2px] ${levelClass[day.level]}`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </Link>
    )
}
