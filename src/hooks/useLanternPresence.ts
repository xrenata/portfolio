"use client"

import { useEffect, useState, useRef } from "react"

export type DiscordStatus = "online" | "idle" | "dnd" | "offline"

export interface LanternActivity {
    type: number
    name: string
    details?: string
    state?: string
    application_id?: string
    sync_id?: string
    assets?: {
        large_image?: string | { image_url?: string; text?: string; hash?: string }
        large_text?: string
        small_image?: string | { image_url?: string; text?: string; hash?: string }
        small_text?: string
    }
    timestamps?: { 
        start?: number
        end?: number
        start_time?: { unix?: number; raw?: string }
        end_time?: { unix?: number; raw?: string }
    }
}

export interface LanternSpotify {
    track_id: string
    song: string
    artist: string
    album: string
    album_art_url: string
}

interface LanternRawSpotify {
    track_id?: string
    song?: string
    artist?: string | string[]
    album?: string
    album_cover?: string
    album_art_url?: string
}

export interface LanternDiscordUser {
    id: string
    username: string
    global_name?: string
    avatar?: string
    discriminator?: string
}

interface LanternRawPayload {
    metadata?: LanternDiscordUser & { global_name?: string; display_avatar_url?: string; avatar_url?: string }
    discord_user?: LanternDiscordUser
    status?: DiscordStatus
    discord_status?: DiscordStatus
    activities?: LanternActivity[]
    listening_to_spotify?: boolean
    spotify?: LanternRawSpotify | null
    active_on_discord_web?: boolean
    active_on_discord_desktop?: boolean
    active_on_discord_mobile?: boolean
    active_platforms?: {
        desktop?: string
        mobile?: string
        web?: string
    }
}

export interface LanternPresence {
    discord_user?: LanternDiscordUser
    discord_status?: DiscordStatus
    activities?: LanternActivity[]
    listening_to_spotify?: boolean
    spotify?: LanternSpotify | null
    active_on: {
        web: boolean
        desktop: boolean
        mobile: boolean
    }
}

function normalizeSpotify(raw: LanternRawSpotify | null | undefined): LanternSpotify | null {
    if (!raw || !raw.song) return null
    const artist = Array.isArray(raw.artist) ? raw.artist.join(", ") : (raw.artist ?? "")
    return {
        track_id: raw.track_id ?? "",
        song: raw.song,
        artist,
        album: raw.album ?? "",
        album_art_url: raw.album_cover ?? raw.album_art_url ?? "",
    }
}

function normalize(raw: LanternRawPayload | undefined | null): LanternPresence | null {
    if (!raw) return null
    const user = raw.discord_user ?? raw.metadata
    const activities = raw.activities ?? []
    const spotify = normalizeSpotify(raw.spotify)
    return {
        discord_user: user,
        discord_status: raw.discord_status ?? raw.status,
        activities,
        listening_to_spotify: raw.listening_to_spotify ?? !!spotify,
        spotify,
        active_on: {
            web: !!raw.active_on_discord_web || raw.active_platforms?.web === "online" || raw.active_platforms?.web === "idle" || raw.active_platforms?.web === "dnd",
            desktop: !!raw.active_on_discord_desktop || raw.active_platforms?.desktop === "online" || raw.active_platforms?.desktop === "idle" || raw.active_platforms?.desktop === "dnd",
            mobile: !!raw.active_on_discord_mobile || raw.active_platforms?.mobile === "online" || raw.active_platforms?.mobile === "idle" || raw.active_platforms?.mobile === "dnd",
        }
    }
}

const SOCKET_URL = "wss://lantern.rest/socket"

const OP = {
    HELLO: 1,
    INIT: 2,
    INIT_ACK: 3,
    HEARTBEAT: 4,
    PRESENCE_UPDATE: 6,
    USER_LEFT: 7,
} as const

export function useLanternPresence(userId: string): {
    presence: LanternPresence | null
    connected: boolean
} {
    const [presence, setPresence] = useState<LanternPresence | null>(null)
    const [connected, setConnected] = useState(false)

    const wsRef = useRef<WebSocket | null>(null)
    const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const reconnectAttemptsRef = useRef(0)
    const closedByUserRef = useRef(false)

    useEffect(() => {
        if (!userId) return
        closedByUserRef.current = false

        const clearHeartbeat = () => {
            if (heartbeatRef.current) {
                clearInterval(heartbeatRef.current)
                heartbeatRef.current = null
            }
        }

        const connect = () => {
            const ws = new WebSocket(SOCKET_URL)
            wsRef.current = ws

            ws.onopen = () => {
                reconnectAttemptsRef.current = 0
            }

            ws.onmessage = (event) => {
                let msg: { op: number; t?: string; d?: unknown }
                try {
                    msg = JSON.parse(event.data)
                } catch {
                    return
                }

                if (msg.op === OP.HELLO) {
                    const interval =
                        (msg.d as { heartbeat_interval?: number } | undefined)?.heartbeat_interval ?? 30000
                    clearHeartbeat()
                    heartbeatRef.current = setInterval(() => {
                        if (ws.readyState === WebSocket.OPEN) {
                            ws.send(JSON.stringify({ op: OP.HEARTBEAT }))
                        }
                    }, interval)
                    ws.send(JSON.stringify({ op: OP.INIT, d: { user_id: userId } }))
                    return
                }

                if (msg.op === OP.INIT_ACK) {
                    setConnected(true)
                    const data = msg.d as LanternRawPayload | LanternRawPayload[] | undefined
                    if (Array.isArray(data)) {
                        setPresence(normalize(data[0]))
                    } else if (data) {
                        setPresence(normalize(data))
                    }
                    return
                }

                if (msg.op === OP.PRESENCE_UPDATE) {
                    const data = msg.d as LanternRawPayload | LanternRawPayload[] | undefined
                    if (Array.isArray(data)) {
                        const match =
                            data.find((p) => (p.discord_user?.id ?? p.metadata?.id) === userId) ?? data[0]
                        if (match) setPresence(normalize(match))
                    } else if (data) {
                        setPresence(normalize(data))
                    }
                    return
                }

                if (msg.op === OP.USER_LEFT) {
                    setPresence((prev) =>
                        prev ? { ...prev, discord_status: "offline", activities: [], listening_to_spotify: false, spotify: null } : prev,
                    )
                    return
                }
            }

            ws.onclose = () => {
                setConnected(false)
                clearHeartbeat()
                if (closedByUserRef.current) return

                const attempt = reconnectAttemptsRef.current++
                const delay = Math.min(30000, 1000 * Math.pow(2, attempt))
                reconnectTimerRef.current = setTimeout(connect, delay)
            }

            ws.onerror = () => {
                ws.close()
            }
        }

        connect()

        return () => {
            closedByUserRef.current = true
            clearHeartbeat()
            if (reconnectTimerRef.current) {
                clearTimeout(reconnectTimerRef.current)
                reconnectTimerRef.current = null
            }
            wsRef.current?.close()
            wsRef.current = null
        }
    }, [userId])

    return { presence, connected }
}
