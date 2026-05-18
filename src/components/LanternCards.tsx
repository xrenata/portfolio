"use client"

import { useState, useEffect } from "react"
import { siteConfig } from "@/data/site"
import { useLanternPresence, type LanternPresence, type DiscordStatus } from "@/hooks/useLanternPresence"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

// ─── Icons ───────────────────────────────────────────────────────────────────

function SpotifyIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
    )
}

function DiscordIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
    )
}

function TelegramIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
        </svg>
    )
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<DiscordStatus, string> = {
    online: "bg-green-500",
    idle: "bg-yellow-500",
    dnd: "bg-red-500",
    offline: "bg-zinc-500",
}

/** Resolve a Discord activity asset to a usable image URL and text */
function resolveActivityAsset(v: unknown, fallbackText: string | undefined, appId: string | undefined): { url: string | null; text: string | null } {
    if (v == null) return { url: null, text: fallbackText ?? null }

    let url: string | null = null
    let text: string | null = fallbackText ?? null

    let raw: string | null = null

    // If it's an object, extract image_url/hash/id and text
    if (typeof v === "object") {
        const obj = v as Record<string, unknown>
        if (typeof obj.text === "string") text = obj.text

        const inner = obj.image_url ?? obj.url ?? obj.id ?? obj.image ?? obj.hash
        if (typeof inner === "string" || typeof inner === "number") {
            raw = String(inner)
        }
    } else if (typeof v === "string" || typeof v === "number") {
        raw = String(v)
    }

    if (!raw) return { url: null, text }

    // Already a full URL (Lantern sends these sometimes)
    if (raw.startsWith("http://") || raw.startsWith("https://")) {
        url = raw
    } else if (raw.startsWith("mp:external/")) {
        // Discord media proxy format
        url = `https://media.discordapp.net/external/${raw.slice("mp:external/".length)}`
    } else if (appId) {
        // Plain hash → app asset CDN
        url = `https://cdn.discordapp.com/app-assets/${appId}/${raw}.png`
    }

    return { url, text }
}

function useElapsed(startTs: number | undefined): string {
    const [elapsed, setElapsed] = useState("0:00")
    useEffect(() => {
        if (!startTs) { setElapsed("0:00"); return }
        const update = () => {
            const diff = Math.floor((Date.now() - startTs) / 1000)
            const h = Math.floor(diff / 3600)
            const m = Math.floor((diff % 3600) / 60)
            const s = diff % 60
            setElapsed(h > 0
                ? `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
                : `${m}:${s.toString().padStart(2, "0")}`)
        }
        update()
        const id = setInterval(update, 1000)
        return () => clearInterval(id)
    }, [startTs])
    return elapsed
}

// (CardShell removed as it's no longer needed)

// ─── Export ──────────────────────────────────────────────────────────────────

export function LanternHeroCards() {
    const { presence } = useLanternPresence(siteConfig.lanternUserId)

    if (!presence) {
        return (
            <div className="w-full space-y-2 animate-pulse">
                <div className="grid grid-cols-2 gap-2">
                    <div className="h-14 rounded-2xl border border-border bg-card/40" />
                    <div className="h-14 rounded-2xl border border-border bg-card/40" />
                </div>
                <div className="h-[104px] rounded-2xl border border-border bg-card/40" />
            </div>
        )
    }

    return (
        <div className="w-full space-y-2">
            <div className="grid grid-cols-2 gap-2">
                <DiscordLanternCard presence={presence} />
                <TelegramLanternCard />
            </div>
            <ActivityCard presence={presence} />
        </div>
    )
}

function DiscordLanternCard({ presence }: { presence: LanternPresence | null }) {
    const user = presence?.discord_user
    const username = user?.username ?? "xrenata"
    const discordProfileUrl = user?.id ? `https://discord.com/users/${user.id}` : "https://discord.com/users/937316083533230110"

    return (
        <a
            href={discordProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 items-center gap-3 rounded-2xl border border-border bg-card/60 px-4 backdrop-blur-sm transition-colors hover:border-border/80 group"
        >
            <div className="relative shrink-0">
                <DiscordIcon className="h-5 w-5 text-[#5865F2]" />
            </div>
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground transition-colors group-hover:text-[#5865F2]" title={`@${username}`}>
                @{username}
            </span>
        </a>
    )
}

function TelegramLanternCard() {
    return (
        <a
            href="https://t.me/xrenatam"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 items-center gap-3 rounded-2xl border border-border bg-card/60 px-4 backdrop-blur-sm transition-colors hover:border-border/80 group"
        >
            <div className="relative shrink-0">
                <TelegramIcon className="h-5 w-5 text-[#2AABEE]" />
            </div>
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground transition-colors group-hover:text-[#2AABEE]" title="@xrenatam">
                @xrenatam
            </span>
        </a>
    )
}

function ActivityCard({ presence }: { presence: LanternPresence | null }) {

    const activity = presence?.activities?.find(
        a => a.type !== 2 && a.type !== 4
    )
    const startTs = activity?.timestamps?.start_time?.unix
        ? activity.timestamps.start_time.unix * 1000
        : activity?.timestamps?.start

    const elapsed = useElapsed(startTs)

    if (!activity) {
        return null
    }

    const largeAsset = resolveActivityAsset(activity.assets?.large_image, activity.assets?.large_text, activity.application_id)
    const smallAsset = resolveActivityAsset(activity.assets?.small_image, activity.assets?.small_text, activity.application_id)

    const label = activity.type === 1 ? "Streaming" : activity.type === 3 ? "Watching" : "Playing"

    return (
        <div className="rounded-2xl bg-card/60 backdrop-blur-sm p-4 font-sans border border-border transition-colors hover:border-border/80">
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground">
                    {label}
                </span>
                <div className="flex gap-[3px]">
                    <div className="h-[3px] w-[3px] rounded-full bg-muted-foreground/40" />
                    <div className="h-[3px] w-[3px] rounded-full bg-muted-foreground/40" />
                    <div className="h-[3px] w-[3px] rounded-full bg-muted-foreground/40" />
                </div>
            </div>

            <TooltipProvider>
                <div className="flex gap-3 items-start">
                    <div className="relative h-[60px] w-[60px] shrink-0 rounded-lg overflow-visible">
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                                <div className="h-full w-full rounded-lg overflow-hidden bg-muted cursor-default">
                                    {largeAsset.url && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={largeAsset.url}
                                            alt={largeAsset.text ?? activity.name}
                                            className="h-full w-full object-cover"
                                            onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none" }}
                                        />
                                    )}
                                </div>
                            </TooltipTrigger>
                            {largeAsset.text && (
                                <TooltipContent side="top" className="font-semibold px-3 py-1.5 z-50">
                                    {largeAsset.text}
                                </TooltipContent>
                            )}
                        </Tooltip>

                        {smallAsset.url && (
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-card p-[3px] cursor-default">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={smallAsset.url}
                                            alt={smallAsset.text ?? ""}
                                            className="h-full w-full rounded-full object-cover"
                                            onError={e => { (e.currentTarget as HTMLImageElement).parentElement!.style.display = "none" }}
                                        />
                                    </div>
                                </TooltipTrigger>
                                {smallAsset.text && (
                                    <TooltipContent side="top" className="font-semibold px-3 py-1.5 z-50">
                                        {smallAsset.text}
                                    </TooltipContent>
                                )}
                            </Tooltip>
                        )}
                    </div>

                    <div className="flex flex-col min-w-0 gap-[2px] pt-0.5">
                        <span className="text-sm font-semibold leading-tight truncate text-foreground">
                            {activity.name}
                        </span>
                        {activity.details && (
                            <span className="text-xs text-muted-foreground truncate leading-tight">
                                {activity.details}
                            </span>
                        )}
                        {activity.state && (
                            <span className="text-xs text-muted-foreground/80 truncate leading-tight">
                                {activity.state}
                            </span>
                        )}
                        {(activity.timestamps?.start || activity.timestamps?.start_time) && (
                            <span className="text-[11px] text-muted-foreground/60 leading-tight mt-0.5">
                                {elapsed} elapsed
                            </span>
                        )}
                    </div>
                </div>
            </TooltipProvider>
        </div>
    )
}
