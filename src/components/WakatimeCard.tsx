
"use client"

import useSWR from "swr"
import { Code2 } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function WakatimeCard() {
    const { data } = useSWR("/api/wakatime", fetcher, {
        refreshInterval: 600000 // 10 minutes
    })

    return (
        <div className="w-full h-full rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <Code2 className="h-8 w-8" />
                </div>

                <div className="flex flex-col justify-center gap-0.5">
                    <p className="font-medium text-sm text-foreground">
                        {data?.data?.text || "Loading..."}
                    </p>
                    <p className="text-xs text-muted-foreground">This Month Coding Time</p>
                </div>
            </div>

            <Link href="https://wakatime.com" target="_blank" className="shrink-0 text-muted-foreground hover:text-foreground transition-colors p-0.5">
                <svg width="24" height="24" viewBox="0 0 340 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                    <path fillRule="evenodd" clipRule="evenodd" d="M170 20C87.156 20 20 87.156 20 170C20 252.844 87.156 320 170 320C252.844 320 320 252.844 320 170C320 87.156 252.844 20 170 20V20V20Z" stroke="currentColor" strokeWidth="40" />
                    <path d="M190.183 213.541C188.74 215.443 186.576 216.667 184.151 216.667C183.913 216.667 183.677 216.651 183.443 216.627C183.042 216.579 182.823 216.545 182.606 216.497C182.337 216.434 182.137 216.375 181.94 216.308C181.561 216.176 181.392 216.109 181.228 216.035C180.843 215.849 180.707 215.778 180.572 215.701C180.205 215.478 180.109 215.412 180.014 215.345C179.856 215.233 179.698 215.117 179.547 214.992C179.251 214.746 179.147 214.65 179.044 214.552C178.731 214.241 178.531 214.018 178.341 213.785C177.982 213.331 177.69 212.888 177.438 212.415L168.6 198.214L159.766 212.415C158.38 214.939 155.874 216.667 152.995 216.667C150.106 216.667 147.588 214.926 146.243 212.346L107.607 156.061C106.337 154.529 105.556 152.499 105.556 150.258C105.556 145.514 109.043 141.665 113.344 141.665C116.127 141.665 118.564 143.282 119.942 145.708L152.555 193.9L161.735 178.952C163.058 176.288 165.626 174.478 168.575 174.478C171.273 174.478 173.652 175.996 175.049 178.298L184.517 193.839L235.684 120.583C237.075 118.226 239.475 116.667 242.213 116.667C246.514 116.667 250 120.514 250 125.258C250 127.332 249.337 129.232 248.23 130.715L190.183 213.541V213.541Z" fill="white" stroke="white" strokeWidth="10" />
                </svg>
            </Link>
        </div>
    )
}
