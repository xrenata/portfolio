
import Link from "next/link"
import { getAllPosts } from "@/lib/blog"
import { Badge } from "@/components/ui/badge"
import { FadeInStagger, FadeInItem } from "@/components/ui/fade-in"

export default function BlogPage() {
    const posts = getAllPosts()

    return (
        <div className="w-full max-w-2xl mx-auto py-12 md:py-24 px-6 space-y-12">
            <FadeInStagger>
                <FadeInItem className="space-y-2 border-b border-border pb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
                    <p className="text-muted-foreground">
                        Thoughts, tutorials, and insights on development and design.
                    </p>
                </FadeInItem>

                <div className="space-y-10 pt-8">
                    {posts.map((post) => (
                        <FadeInItem key={post.slug} className="group relative flex flex-col space-y-3">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <time dateTime={post.date}>{post.date}</time>
                            </div>
                            <Link href={`/blog/${post.slug}`} className="block">
                                <h2 className="text-2xl font-semibold tracking-tight group-hover:underline decoration-primary/50 underline-offset-4">
                                    {post.title}
                                </h2>
                            </Link>
                            <p className="text-muted-foreground">{post.description}</p>
                            <div className="flex gap-2">
                                {post.tags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="rounded-sm font-normal text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                                        #{tag}
                                    </Badge>
                                ))}
                            </div>
                        </FadeInItem>
                    ))}
                    {posts.length === 0 && (
                        <p className="text-muted-foreground italic">No posts found yet.</p>
                    )}
                </div>
            </FadeInStagger>
        </div>
    )
}
