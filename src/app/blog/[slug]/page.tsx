
import { getPostBySlug, getAllPosts } from "@/lib/blog"
import ReactMarkdown from "react-markdown"
import { notFound } from "next/navigation"
import { MarkdownComponents } from "@/components/markdown/markdown-components"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { FadeIn } from "@/components/ui/fade-in"
import { ChevronLeft } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BlogPostPageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateStaticParams() {
    const posts = getAllPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params

    const post = getPostBySlug(slug)
    const allPosts = getAllPosts()

    if (!post) {
        notFound()
    }

    const toc = post.content.match(/^#{2,3}\s+(.*)$/gm)?.map(heading => {
        const level = heading.startsWith('###') ? 3 : 2
        const text = heading.replace(/^#{2,3}\s+/, '')
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        return { level, text, id }
    }) || []

    return (
        <div className="w-full max-w-7xl mx-auto py-12 md:py-24 px-6 md:px-8">
            <FadeIn>
                {/* 3-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left: Sticky TOC (Hidden on mobile) */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-28 space-y-4">
                            <h4 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">On this page</h4>
                            <nav className="flex flex-col space-y-2 text-sm">
                                {toc.map((item, index) => (
                                    <a
                                        key={index}
                                        href={`#${item.text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                                        className={`block transition-colors hover:text-foreground text-muted-foreground ${item.level === 3 ? 'pl-4' : ''}`}
                                    >
                                        {item.text}
                                    </a>
                                ))}
                                {toc.length === 0 && <p className="text-muted-foreground">No subsections</p>}
                            </nav>
                        </div>
                    </aside>

                    {/* Center: Main Content */}
                    <main className="lg:col-span-6 min-w-0">
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                                <Link
                                    href="/blog"
                                    className={cn(
                                        buttonVariants({ variant: "ghost", size: "sm" }),
                                        "-ml-3 text-muted-foreground hover:text-foreground transition-colors"
                                    )}
                                >
                                    <ChevronLeft className="mr-2 h-4 w-4" />
                                    Back to Blog
                                </Link>
                                <span className="text-border">|</span>
                                <time dateTime={post.date} className="font-mono text-xs">{post.date}</time>
                            </div>
                            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{post.title}</h1>
                            <p className="text-xl text-muted-foreground">{post.description}</p>
                        </div>

                        <Separator className="my-8" />

                        <div className="prose prose-invert prose-neutral max-w-none">
                            <ReactMarkdown
                                components={MarkdownComponents}
                                rehypePlugins={[]}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </div>
                    </main>

                    {/* Right: Sidebar / Related (Hidden on mobile) */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-28 space-y-8">
                            <div>
                                <h4 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-4">Latest Posts</h4>
                                <div className="flex flex-col space-y-4">
                                    {allPosts.slice(0, 3).map(p => (
                                        <Link key={p.slug} href={`/blog/${p.slug}`} className="group block space-y-1">
                                            <h5 className="font-medium group-hover:text-primary transition-colors line-clamp-2 leading-snug">{p.title}</h5>
                                            <p className="text-xs text-muted-foreground">{p.date}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-4">Tags</h4>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map(tag => (
                                        <div key={tag} className="text-xs border border-border px-2 py-1 rounded-sm text-muted-foreground">
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </FadeIn>
        </div>
    )
}
