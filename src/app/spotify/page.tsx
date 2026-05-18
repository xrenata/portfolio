import { getTopTracksExtended } from "@/lib/spotify"
import { SpotifyGrid } from "@/components/SpotifyInfiniteGrid"

export const dynamic = "force-dynamic"
export const revalidate = 3600

export default async function SpotifyPage() {
    let tracks = []

    try {
        const response = await getTopTracksExtended()

        if (!('error' in response) && response.ok) {
            const data = await response.json()
            tracks = (data.items ?? []).map((track: any) => ({
                id: track.id,
                title: track.name,
                artist: track.artists.map((a: any) => a.name).join(', '),
                album: track.album.name,
                albumImageUrl: track.album.images[0]?.url ?? null,
                songUrl: track.external_urls.spotify,
            }))
        }
    } catch (e) {
        console.error("Failed to fetch extended top tracks", e)
    }

    return <SpotifyGrid tracks={tracks} />
}
