
import { getNowPlaying, getRecentlyPlayed } from '@/lib/spotify'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const response = await getNowPlaying()

        if ('error' in response) {
            return NextResponse.json({ isPlaying: false, message: response.error })
        }

        if (response.status === 204 || response.status > 400) {
            const recentResponse = await getRecentlyPlayed()

            if ('error' in recentResponse) {
                return NextResponse.json({ isPlaying: false })
            }

            const recentSong = await recentResponse.json()

            if (!recentSong.items || recentSong.items.length === 0) {
                return NextResponse.json({ isPlaying: false })
            }

            const track = recentSong.items[0].track
            return NextResponse.json({
                isPlaying: false,
                title: track.name,
                artist: track.artists.map((_artist: any) => _artist.name).join(', '),
                album: track.album.name,
                albumImageUrl: track.album.images[0].url,
                songUrl: track.external_urls.spotify,
                lastPlayed: true
            })
        }

        const song = await response.json()

        if (song.item === null) {
            const recentResponse = await getRecentlyPlayed()
            if ('error' in recentResponse) return NextResponse.json({ isPlaying: false })
            const recentSong = await recentResponse.json()
            if (!recentSong.items || recentSong.items.length === 0) return NextResponse.json({ isPlaying: false })

            const track = recentSong.items[0].track
            return NextResponse.json({
                isPlaying: false,
                title: track.name,
                artist: track.artists.map((_artist: any) => _artist.name).join(', '),
                album: track.album.name,
                albumImageUrl: track.album.images[0].url,
                songUrl: track.external_urls.spotify,
                lastPlayed: true
            })
        }

        const isPlaying = song.is_playing
        const title = song.item.name
        const artist = song.item.artists.map((_artist: any) => _artist.name).join(', ')
        const album = song.item.album.name
        const albumImageUrl = song.item.album.images[0].url
        const songUrl = song.item.external_urls.spotify

        return NextResponse.json({
            isPlaying,
            title,
            artist,
            album,
            albumImageUrl,
            songUrl,
        })
    } catch (error) {
        console.error("Spotify API Error:", error)
        return NextResponse.json({ isPlaying: false })
    }
}
