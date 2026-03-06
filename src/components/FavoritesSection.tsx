"use client"

import useSWR from "swr"
import Image from "next/image"
import { Tv } from "lucide-react"
import { favorites, type Favorite } from "@/data/favorites"

const fetcher = (url: string) => fetch(url).then(r => r.json())

function ShowCard({ fav }: { fav: Favorite }) {
    const { data, isLoading } = useSWR(
        `https://api.tvmaze.com/shows/${fav.tvmazeId}`,
        fetcher,
        { revalidateOnFocus: false }
    )

    const posterUrl: string | null = data?.image?.medium ?? data?.image?.original ?? null

    return (
        <div className="group flex flex-col gap-2">
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-muted border border-border/40 transition-all group-hover:border-border group-hover:shadow-lg group-hover:shadow-black/20">
                {isLoading && (
                    <div className="absolute inset-0 animate-pulse bg-muted" />
                )}
                {!isLoading && posterUrl ? (
                    <Image
                        src={posterUrl}
                        alt={fav.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : !isLoading && (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-2">
                        <Tv className="h-7 w-7 text-muted-foreground/20" />
                        <p className="text-[9px] text-center leading-tight font-medium text-muted-foreground/30">{fav.title}</p>
                    </div>
                )}

                <div className="absolute top-2 left-2">
                    <span className="inline-flex items-center gap-1 rounded-md bg-black/60 backdrop-blur-sm px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/80">
                        <Tv className="h-2.5 w-2.5" />
                        {fav.year}
                    </span>
                </div>
            </div>
            <p className="text-xs font-medium text-muted-foreground truncate group-hover:text-foreground transition-colors">
                {fav.title}
            </p>
        </div>
    )
}

export function FavoritesSection() {
    return (
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {favorites.map((fav) => (
                <ShowCard key={fav.tvmazeId} fav={fav} />
            ))}
        </div>
    )
}
