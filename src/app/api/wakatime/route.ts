import { NextResponse } from "next/server"

export const runtime = "edge"

const WAKATIME_ENDPOINT = "https://wakatime.com/api/v1/users/current/all_time_since_today"

function encodeBasicAuth(value: string) {
    return btoa(value)
}

export async function GET() {
    const wakatimeApiKey = process.env.WAKATIME_API_KEY

    if (!wakatimeApiKey) {
        return NextResponse.json({ error: "Wakatime API key not configured" }, { status: 500 })
    }

    try {
        const response = await fetch(WAKATIME_ENDPOINT, {
            headers: {
                Authorization: `Basic ${encodeBasicAuth(wakatimeApiKey)}`,
            },
        })

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to fetch Wakatime data" },
                { status: response.status }
            )
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
