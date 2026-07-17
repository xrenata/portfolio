import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const NAMESPACE = "emirhan-cv-blog"

function sanitize(slug: string) {
    return slug.replace(/[^a-zA-Z0-9-_]/g, "").slice(0, 64)
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const key = sanitize(slug)
    try {
        const res = await fetch(`https://abacus.jasoncameron.dev/get/${NAMESPACE}/${key}`, {
            cache: "no-store",
        })
        if (!res.ok) return NextResponse.json({ views: null })
        const data = await res.json()
        return NextResponse.json({ views: data.value ?? 0 })
    } catch {
        return NextResponse.json({ views: null })
    }
}

export async function POST(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const key = sanitize(slug)
    try {
        const res = await fetch(`https://abacus.jasoncameron.dev/hit/${NAMESPACE}/${key}`, {
            cache: "no-store",
        })
        if (!res.ok) return NextResponse.json({ views: null })
        const data = await res.json()
        return NextResponse.json({ views: data.value ?? null })
    } catch {
        return NextResponse.json({ views: null })
    }
}
