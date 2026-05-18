import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const imageUrl = searchParams.get("url")

    if (!imageUrl) {
        return new NextResponse("Missing url parameter", { status: 400 })
    }

    try {
        const res = await fetch(imageUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
            }
        })

        if (!res.ok) {
            return new NextResponse("Failed to fetch image", { status: res.status })
        }

        const buffer = await res.arrayBuffer()
        const contentType = res.headers.get("content-type") || "image/png"

        return new NextResponse(buffer, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400"
            }
        })
    } catch (e) {
        console.error("Discord image proxy error:", e)
        return new NextResponse("Internal server error", { status: 500 })
    }
}
