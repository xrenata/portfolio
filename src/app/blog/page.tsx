import Link from "next/link"
import { getAllPosts } from "@/lib/blog"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from "lucide-react"
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/fade-in"

export default function BlogPage() {
    const posts = getAllPosts()

    return (
        <div className="w-full max-w-2xl mx-auto pb-24 px-6">

            {/* Header */}
            <FadeIn className="py-12 border-b border-border/40 space-y-3">
                <h1 className="text-6xl font-black tracking-tighter leading-none">Blog</h1>
                <p className="text-muted-foreground text-sm">
                    {posts.length > 0
                        ? `${posts.length} post${posts.length > 1 ? "s" : ""} — thoughts, tutorials, and insights.`
                        : "Thoughts, tutorials, and insights on development and design."}
                </p>
            </FadeIn>

            {/* Posts */}
            <FadeInStagger>
                {posts.length === 0 && (
                    <p className="text-muted-foreground italic py-12">No posts yet.</p>
                )}
                {posts.map((post) => (
                    <FadeInItem key={post.slug}>
                        <Link href={`/blog/${post.slug}`} className="group block border-b border-border/40 py-8 transition-colors hover:border-border">
                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-3 min-w-0">
                                    <time
                                        dateTime={post.date}
                                        className="block font-mono text-xs text-muted-foreground/60"
                                    >
                                        {post.date}
                                    </time>
                                    <h2 className="text-2xl font-black tracking-tight leading-tight group-hover:underline underline-offset-4 decoration-border">
                                        {post.title}
                                    </h2>
                                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                                        {post.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                        {post.tags.map(tag => (
                                            <Badge key={tag} variant="secondary" className="rounded-sm font-normal text-[11px] px-1.5 h-5">
                                                #{tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <ArrowUpRight className="h-4 w-4 shrink-0 mt-1 text-muted-foreground/30 transition-all group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </div>
                        </Link>
                    </FadeInItem>
                ))}
            </FadeInStagger>
        </div>
    )
}
