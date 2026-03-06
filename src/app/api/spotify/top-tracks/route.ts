import { getTopTracks } from '@/lib/spotify'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const response = await getTopTracks()

        if ('error' in response) {
            return NextResponse.json({ tracks: [] })
        }

        if (!response.ok) {
            return NextResponse.json({ tracks: [] })
        }

        const data = await response.json()

        const tracks = (data.items ?? []).map((track: any) => ({
            id: track.id,
            title: track.name,
            artist: track.artists.map((a: any) => a.name).join(', '),
            album: track.album.name,
            albumImageUrl: track.album.images[0]?.url ?? null,
            songUrl: track.external_urls.spotify,
        }))

        return NextResponse.json({ tracks })
    } catch {
        return NextResponse.json({ tracks: [] })
    }
}
