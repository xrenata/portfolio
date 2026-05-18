"use client"

import * as React from "react"
import Image from "next/image"
import { useLanternPresence, type DiscordStatus } from "@/hooks/useLanternPresence"
import { siteConfig } from "@/data/site"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Monitor, Smartphone, Globe } from "lucide-react"

const STATUS_COLORS: Record<DiscordStatus, string> = {
    online: "bg-green-500",
    idle: "bg-yellow-500",
    dnd: "bg-red-500",
    offline: "bg-zinc-500",
}

const STATUS_LABELS: Record<DiscordStatus, string> = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline",
}

interface AvatarWithStatusProps {
    className?: string
    imageClassName?: string
    statusClassName?: string
    showStatus?: boolean
}

export function AvatarWithStatus({
    className,
    imageClassName,
    statusClassName,
    showStatus = true,
}: AvatarWithStatusProps) {
    const { presence } = useLanternPresence(siteConfig.lanternUserId)

    if (!presence) {
        return (
            <div className={cn("relative inline-block", className)}>
                <div className={cn("relative overflow-hidden rounded-full ring-1 ring-border/60 bg-muted/50 animate-pulse", imageClassName)}>
                    <div className="w-full h-full bg-zinc-800/30" />
                </div>
            </div>
        )
    }

    const status: DiscordStatus = presence?.discord_status ?? "offline"
    const { web, desktop, mobile } = presence?.active_on ?? { web: false, desktop: false, mobile: false }

    const user = presence?.discord_user
    const discordAvatarUrl = user?.id && user?.avatar
        ? `/api/discord-image?url=${encodeURIComponent(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`)}`
        : "/avatar.jpeg"

    const activeClientIcon = mobile
        ? <Smartphone className="w-3 h-3 mr-1" />
        : desktop
            ? <Monitor className="w-3 h-3 mr-1" />
            : web
                ? <Globe className="w-3 h-3 mr-1" />
                : null

    const activeClientText = mobile ? "Mobile" : desktop ? "Desktop" : web ? "Web" : null

    return (
        <div className={cn("relative inline-block", className)}>
            <div className={cn("relative overflow-hidden rounded-full ring-1 ring-border/60 bg-muted", imageClassName)}>
                <Image
                    src={discordAvatarUrl}
                    alt="Emirhan"
                    fill
                    className="object-cover"
                    priority
                    sizes="256px"
                    unoptimized={true}
                />
            </div>

            {showStatus && (
                <TooltipProvider>
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                            <span
                                className={cn(
                                    "absolute rounded-full ring-2 ring-background z-10 cursor-default",
                                    STATUS_COLORS[status],
                                    statusClassName
                                )}
                            />
                        </TooltipTrigger>
                        <TooltipContent side="bottom" sideOffset={6} className="flex flex-col gap-1 p-2">
                            <div className="font-semibold text-xs">
                                {STATUS_LABELS[status]}
                            </div>
                            {status !== "offline" && activeClientText && (
                                <div className="text-[10px] flex items-center opacity-80">
                                    {activeClientIcon} {activeClientText}
                                </div>
                            )}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
        </div>
    )
}
