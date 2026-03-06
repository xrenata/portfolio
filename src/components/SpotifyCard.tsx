"use client"

import useSWR from "swr"
import { Music } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function SpotifyCard() {
    const { data } = useSWR("/api/spotify", fetcher, {
        refreshInterval: (latestData) => latestData?.isPlaying ? 10000 : 30000,
    })

    const hasTrack = data?.isPlaying || data?.lastPlayed

    return (
        <div className="w-full rounded-2xl border border-border bg-card p-5 transition-all hover:border-border/60 hover:shadow-lg hover:shadow-black/20">
            <div className="flex items-center gap-4">
                {/* Album art */}
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                    {hasTrack && data?.albumImageUrl ? (
                        <Image
                            src={data.albumImageUrl}
                            alt={data.album ?? "Album"}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                            <Music className="h-8 w-8" />
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-1">
                    {hasTrack ? (
                        <>
                            <a
                                href={data.songUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="block font-semibold text-sm leading-tight truncate hover:underline hover:text-green-500 transition-colors"
                                title={data.title}
                            >
                                {data.title}
                            </a>
                            <p className="text-xs text-muted-foreground truncate" title={data.artist}>
                                {data.artist}
                            </p>

                            <div className="flex items-center gap-2 pt-0.5">
                                {data?.isPlaying ? (
                                    <>
                                        <div className="flex items-end gap-[2.5px] h-3.5">
                                            {[0, 0.15, 0.075, 0.225].map((delay, i) => (
                                                <motion.span
                                                    key={i}
                                                    className="w-[3px] rounded-[1px] bg-green-500"
                                                    animate={{ height: ["4px", "14px", "4px"] }}
                                                    transition={{
                                                        duration: 0.75,
                                                        repeat: Infinity,
                                                        delay,
                                                        ease: "easeInOut",
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-semibold text-green-500 uppercase tracking-wide">
                                            Now Playing
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                                        Last Played
                                    </span>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="font-semibold text-sm text-foreground">Not Playing</p>
                            <p className="text-xs text-muted-foreground">Spotify</p>
                        </>
                    )}
                </div>

                {/* Spotify logo */}
                <Link
                    href="https://open.spotify.com"
                    target="_blank"
                    className="shrink-0 text-[#1DB954] opacity-70 hover:opacity-100 transition-opacity p-0.5"
                >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                </Link>
            </div>
        </div>
    )
}
