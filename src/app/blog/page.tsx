import { getAllPosts, getAllTags } from "@/lib/blog"
import { FadeIn } from "@/components/ui/fade-in"
import { BlogList } from "@/components/BlogList"

export default function BlogPage() {
    const posts = getAllPosts()
    const allTags = getAllTags()

    return (
        <div className="w-full max-w-2xl mx-auto pb-24 px-6">

            <FadeIn className="py-12 border-b border-border/40 space-y-3">
                <h1 className="text-6xl font-black tracking-tighter leading-none">Blog</h1>
                <p className="text-muted-foreground text-sm">
                    {posts.length > 0
                        ? `${posts.length} post${posts.length > 1 ? "s" : ""} - thoughts, tutorials, and insights.`
                        : "Thoughts, tutorials, and insights on development and design."}
                </p>
            </FadeIn>

            <BlogList posts={posts} allTags={allTags} />
        </div>
    )
}
