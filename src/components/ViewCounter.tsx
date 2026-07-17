"use client"

import * as React from "react"
import { Eye } from "lucide-react"

export function ViewCounter({ slug }: { slug: string }) {
    const [views, setViews] = React.useState<number | null>(null)
    const counted = React.useRef(false)

    React.useEffect(() => {
        if (counted.current) return
        counted.current = true

        fetch(`/api/views/${slug}`, { method: "POST" })
            .then((res) => res.json())
            .then((data) => {
                if (typeof data.views === "number") setViews(data.views)
            })
            .catch(() => {})
    }, [slug])

    if (views === null) {
        return (
            <span className="inline-flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5" />
                <span className="inline-block h-3 w-6 animate-pulse rounded bg-muted-foreground/20" />
            </span>
        )
    }

    return (
        <span className="inline-flex items-center gap-1.5">
            <Eye className="h-3.5 w-3.5" />
            {views.toLocaleString()} views
        </span>
    )
}
