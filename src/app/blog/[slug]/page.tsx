import { getPostBySlug, getAllPosts } from "@/lib/blog"
import ReactMarkdown from "react-markdown"
import { notFound } from "next/navigation"
import { MarkdownComponents } from "@/components/markdown/markdown-components"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ViewCounter } from "@/components/ViewCounter"

interface BlogPostPageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    const posts = getAllPosts()
    return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params
    const post = getPostBySlug(slug)
    const allPosts = getAllPosts()

    if (!post) notFound()

    const otherPosts = allPosts.filter((p) => p.slug !== post.slug)
    const relatedPosts = (() => {
        const scored = otherPosts
            .map((p) => ({
                post: p,
                shared: p.tags.filter((t) => post.tags.includes(t)).length,
            }))
            .filter((s) => s.shared > 0)
            .sort((a, b) => b.shared - a.shared || (a.post.date < b.post.date ? 1 : -1))
            .map((s) => s.post)
        return (scored.length > 0 ? scored : otherPosts).slice(0, 3)
    })()

    const toc = post.content.match(/^#{2,3}\s+(.*)$/gm)?.map(heading => {
        const level = heading.startsWith("###") ? 3 : 2
        const text = heading.replace(/^#{2,3}\s+/, "")
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-")
        return { level, text, id }
    }) || []

    return (
        <div className="w-full max-w-7xl mx-auto pb-24 px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                <aside className="hidden lg:block lg:col-span-3">
                    <div className="sticky top-24 space-y-6">
                        <Link
                            href="/blog"
                            className="group inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
                            All posts
                        </Link>

                        {toc.length > 0 && (
                            <div className="space-y-3">
                                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                                    On this page
                                </p>
                                <nav className="flex flex-col gap-1.5 border-l border-border/40 pl-3">
                                    {toc.map((item, i) => (
                                        <a
                                            key={i}
                                            href={`#${item.id}`}
                                            className={`text-xs text-muted-foreground hover:text-foreground transition-colors leading-snug ${item.level === 3 ? "pl-3" : ""}`}
                                        >
                                            {item.text}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        )}
                    </div>
                </aside>

                <main className="lg:col-span-6 min-w-0">
                    <div className="lg:hidden mb-8">
                        <Link
                            href="/blog"
                            className="group inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
                            All posts
                        </Link>
                    </div>

                    <div className="space-y-5 pb-10 border-b border-border/40">
                        <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground/60">
                            <time dateTime={post.date}>
                                {post.date}
                            </time>
                            <span>·</span>
                            <span>{post.readingTime} min read</span>
                            <span>·</span>
                            <ViewCounter slug={post.slug} />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter leading-tight lg:text-5xl">
                            {post.title}
                        </h1>
                        <p className="text-muted-foreground leading-relaxed">
                            {post.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                            {post.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="rounded-sm font-normal text-[11px] px-1.5 h-5">
                                    #{tag}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="prose dark:prose-invert prose-neutral max-w-none pt-10">
                        <ReactMarkdown components={MarkdownComponents}>
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </main>

                <aside className="hidden lg:block lg:col-span-3">
                    <div className="sticky top-24 space-y-8">
                        {relatedPosts.length > 0 && (
                            <div className="space-y-4">
                                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                                    Related posts
                                </p>
                                <div className="flex flex-col gap-4">
                                    {relatedPosts.map(p => (
                                        <Link key={p.slug} href={`/blog/${p.slug}`} className="group space-y-1 block">
                                            <h5 className="text-sm font-medium leading-snug line-clamp-2 group-hover:underline underline-offset-4 decoration-border transition-colors">
                                                {p.title}
                                            </h5>
                                            <p className="font-mono text-[10px] text-muted-foreground/50">{p.date}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </aside>
            </div>
        </div>
    )
}
