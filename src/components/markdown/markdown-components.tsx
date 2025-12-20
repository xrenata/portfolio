import * as React from "react"
import { cn } from "@/lib/utils"
import { CodeBlock } from "@/components/ui/code-block"

const extractText = (node: React.ReactNode): string => {
    if (typeof node === "string") return node
    if (Array.isArray(node)) return node.map(extractText).join("")
    if (typeof node === "object" && node !== null && "props" in node) {
        return extractText((node as { props: { children: React.ReactNode } }).props.children)
    }
    return ""
}

const generateId = (children: React.ReactNode) => {
    const text = extractText(children)
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-")
}

export const MarkdownComponents = {
    h1: ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1
            id={generateId(children)}
            className={cn(
                "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
                className
            )}
            {...props}
        >
            {children}
        </h1>
    ),
    h2: ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2
            id={generateId(children)}
            className={cn(
                "mt-10 scroll-m-20 border-b border-border pb-1 text-3xl font-semibold tracking-tight first:mt-0",
                className
            )}
            {...props}
        >
            {children}
        </h2>
    ),
    h3: ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3
            id={generateId(children)}
            className={cn(
                "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
                className
            )}
            {...props}
        >
            {children}
        </h3>
    ),
    h4: ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h4
            id={generateId(children)}
            className={cn(
                "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
                className
            )}
            {...props}
        >
            {children}
        </h4>
    ),
    p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p
            className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
            {...props}
        />
    ),
    ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)} {...props} />
    ),
    ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className={cn("my-6 ml-6 list-decimal [&>li]:mt-2", className)} {...props} />
    ),
    li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
        <li className={cn("mt-2", className)} {...props} />
    ),
    blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
        <blockquote
            className={cn(
                "mt-6 border-l-2 border-primary pl-6 italic text-muted-foreground",
                className
            )}
            {...props}
        />
    ),
    img: ({
        className,
        alt,
        ...props
    }: React.ImgHTMLAttributes<HTMLImageElement>) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            className={cn("rounded-md border border-border my-8", className)}
            alt={alt}
            {...props}
        />
    ),
    hr: ({ ...props }) => <hr className="my-4 md:my-8 border-border" {...props} />,
    table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
        <div className="my-6 w-full overflow-y-auto">
            <table className={cn("w-full", className)} {...props} />
        </div>
    ),
    tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
        <tr
            className={cn("m-0 border-t p-0 even:bg-muted", className)}
            {...props}
        />
    ),
    th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
        <th
            className={cn(
                "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
                className
            )}
            {...props}
        />
    ),
    td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
        <td
            className={cn(
                "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
                className
            )}
            {...props}
        />
    ),
    pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
        if (!children) return null

        const childArray = React.Children.toArray(children)
        const firstChild = childArray[0] as React.ReactElement

        if (!firstChild || typeof firstChild !== "object" || !("props" in firstChild)) {
            return <pre {...props}>{children}</pre>
        }

        const { className, children: codeContent } = firstChild.props as React.HTMLAttributes<HTMLElement>
        const match = /language-(\w+)/.exec(className || "")
        const language = match ? match[1] : "text"

        let value = String(codeContent).replace(/\n$/, "")

        value = value.replace(/^`+/, '').replace(/`+$/, '')

        return <CodeBlock language={language} value={value} />
    },
    code: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
        
        return (
            <code
                className={cn(
                    "relative rounded bg-muted/50 px-[0.4rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground border border-border/50",
                    className
                )}
                {...props}
            >
                {children}
            </code>
        )
    },
}
