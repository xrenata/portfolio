"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus, atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Button } from "@/components/ui/button"

interface CodeBlockProps {
    language: string
    value: string
    filename?: string
}

export function CodeBlock({ language, value, filename }: CodeBlockProps) {
    const [isCopied, setIsCopied] = React.useState(false)

    const lang = language || "text"

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
        <div className="relative my-6 overflow-hidden rounded-xl border border-border bg-[#1e1e1e] shadow-md group [&_code]:before:content-none [&_code]:after:content-none">
            {/* Window Controls / Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#1e1e1e] px-4 py-3">
                <div className="flex items-center gap-3">
                    {/* Traffic Lights */}
                    <div className="flex gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
                        <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                        <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                        <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                    </div>

                    {/* Filename or Language Label */}
                    <div className="ml-2 flex items-center gap-2 text-xs font-medium text-zinc-400">
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
                    className="h-6 w-6 text-zinc-500 hover:text-zinc-200 hover:bg-white/10 transition-all"
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
                    style={vscDarkPlus}
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
