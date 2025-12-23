"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

interface CodeBlockProps {
    language: string
    value: string
    filename?: string
}

export function CodeBlock({ language, value, filename }: CodeBlockProps) {
    const [isCopied, setIsCopied] = React.useState(false)
    const { theme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const lang = language || "text"
    const isDark = mounted ? theme === "dark" : true

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(value)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        } catch (error) {
            console.error("Failed to copy:", error)
        }
    }

    return (
        <div className={`relative my-6 overflow-hidden rounded-xl border shadow-md group [&_code]:before:content-none [&_code]:after:content-none ${
            isDark 
                ? 'border-border bg-[#1e1e1e]' 
                : 'border-gray-200 bg-gray-50'
        }`}>
            {/* Window Controls / Header */}
            <div className={`flex items-center justify-between border-b px-4 py-3 ${
                isDark 
                    ? 'border-white/10 bg-[#1e1e1e]' 
                    : 'border-gray-200 bg-white'
            }`}>
                <div className="flex items-center gap-3">
                    {/* Traffic Lights */}
                    <div className="flex gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
                        <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                        <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                        <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                    </div>

                    {/* Filename or Language Label */}
                    <div className={`ml-2 flex items-center gap-2 text-xs font-medium ${
                        isDark ? 'text-zinc-400' : 'text-gray-600'
                    }`}>
                        {filename ? (
                            <span>{filename}</span>
                        ) : (
                            lang !== "text" && <span className="uppercase">{lang}</span>
                        )}
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    className={`h-6 w-6 transition-all ${
                        isDark 
                            ? 'text-zinc-500 hover:text-zinc-200 hover:bg-white/10' 
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={copyToClipboard}
                    aria-label="Copy code"
                >
                    {isCopied ? (
                        <Check className="h-3.5 w-3.5 text-green-500" />
                    ) : (
                        <Copy className="h-3.5 w-3.5" />
                    )}
                </Button>
            </div>

            {/* Code Content */}
            <div className="relative">
                <SyntaxHighlighter
                    language={lang}
                    style={isDark ? vscDarkPlus : vs}
                    customStyle={{
                        margin: 0,
                        padding: '1.25rem',
                        background: 'transparent',
                        fontSize: '0.9rem',
                        lineHeight: '1.5',
                        border: 'none',
                        overflowX: 'auto',
                        paddingRight: '1rem',
                    }}
                    codeTagProps={{
                        style: {
                            fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                            fontSize: "14px",
                        }
                    }}
                    PreTag="div"
                    className="no-scrollbar"
                >
                    {value}
                </SyntaxHighlighter>
            </div>
        </div>
    )
}
