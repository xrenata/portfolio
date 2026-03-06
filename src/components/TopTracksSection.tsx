"use client"

import useSWR from "swr"
import Image from "next/image"
import { Music } from "lucide-react"

const fetcher = (url: string) => fetch(url).then(r => r.json())

interface Track {
    id: string
    title: string
    artist: string
    albumImageUrl: string | null
    songUrl: string
}

export function TopTracksSection() {
    const { data, isLoading } = useSWR("/api/spotify/top-tracks", fetcher, {
        revalidateOnFocus: false,
    })

    const tracks: Track[] = data?.tracks ?? []

    return (
        <div>
            {isLoading && (
                <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-4 py-3 border-b border-border/40 animate-pulse">
                            <span className="w-6 h-3 bg-muted rounded" />
                            <div className="h-10 w-10 rounded-md bg-muted shrink-0" />
                            <div className="flex-1 space-y-1.5">
                                <div className="h-3 w-40 bg-muted rounded" />
                                <div className="h-2.5 w-24 bg-muted/60 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!isLoading && tracks.map((track, index) => (
                <a
                    key={track.id}
                    href={track.songUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-4 py-3.5 border-b border-border/40 hover:border-border transition-colors"
                >
                    <span className="font-mono text-xs text-muted-foreground/40 w-6 text-right shrink-0">
                        {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-muted">
                        {track.albumImageUrl ? (
                            <Image
                                src={track.albumImageUrl}
                                alt={track.title}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center">
                                <Music className="h-4 w-4 text-muted-foreground" />
                            </div>
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate group-hover:text-green-500 transition-colors">
                            {track.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                    </div>

                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0 text-[#1DB954] opacity-40 group-hover:opacity-100 transition-opacity">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                </a>
            ))}

            {!isLoading && tracks.length === 0 && (
                <p className="text-sm text-muted-foreground italic py-4">No data available.</p>
            )}
        </div>
    )
}
