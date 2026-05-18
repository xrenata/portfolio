"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { FadeIn } from "@/components/ui/fade-in"

interface Track {
    id: string
    title: string
    artist: string
    album: string
    albumImageUrl: string | null
    songUrl: string
}

export function SpotifyGrid({ tracks }: { tracks: Track[] }) {
    const validTracks = tracks.filter(t => t.albumImageUrl)

    if (!validTracks.length) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <p className="text-muted-foreground">No tracks found.</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen w-full pb-24">
            <div className="w-full max-w-2xl mx-auto px-6 mb-12">
                <FadeIn className="py-12 border-b border-border/40 space-y-3">
                    <h1 className="text-6xl font-black tracking-tighter leading-none">Music</h1>
                    <p className="text-muted-foreground text-sm">
                        {validTracks.length} tracks - my most played songs.
                    </p>
                </FadeIn>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-dense gap-4 auto-rows-[150px] sm:auto-rows-[200px] md:auto-rows-[250px]">
                {validTracks.map((track, i) => {
                    // Create a masonry effect by varying sizes pseudo-randomly based on index
                    const isLarge = i % 8 === 0;
                    const isTall = i % 5 === 0 && !isLarge;
                    const isWide = i % 7 === 0 && !isLarge && !isTall;

                    return (
                        <motion.a 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            key={`${track.id}-${i}`}
                            href={track.songUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                "group relative rounded-2xl overflow-hidden border border-border/50 bg-card pointer-events-auto transition-all hover:scale-[1.02] hover:z-30 hover:shadow-2xl duration-300",
                                isLarge ? "col-span-2 row-span-2" : isTall ? "row-span-2" : isWide ? "col-span-2" : "col-span-1 row-span-1"
                            )}
                        >
                            {track.albumImageUrl && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={track.albumImageUrl}
                                    alt={track.title}
                                    className="object-cover w-full h-full"
                                    loading="lazy"
                                />
                            )}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                                <span className="text-white font-bold truncate w-full text-lg sm:text-xl">{track.title}</span>
                                <span className="text-white/70 text-sm sm:text-base truncate w-full">{track.artist}</span>
                                <ExternalLink className="w-5 h-5 text-white mt-3" />
                            </div>
                        </motion.a>
                    )
                })}
            </div>
        </div>
    )
}
