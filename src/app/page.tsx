
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { FadeIn, FadeInStagger, FadeInItem, BlurFade } from "@/components/ui/fade-in"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

import { getAllPosts } from "@/lib/blog"
import { SpotifyCard } from "@/components/SpotifyCard"

import { WakatimeCard } from "@/components/WakatimeCard"

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 1)

  return (
    <div className="w-full max-w-2xl mx-auto pb-12 md:pb-24 px-6 space-y-12 md:space-y-20">

      {/* Intro Section - Dictionary Style */}
      <section className="space-y-6">
        <BlurFade delay={0.1} className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-4xl">emirhan</h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            A full-stack developer who crafts <span className="text-foreground italic">minimalist</span>, accessible, and performance-obsessed digital experiences. An advocate for <span className="text-foreground underline underline-offset-4">clean code</span> and <span className="text-foreground underline underline-offset-4">modern design</span> principles.
          </p>
        </BlurFade>



        <BlurFade delay={0.4} className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SpotifyCard />
          <WakatimeCard />
        </BlurFade>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="space-y-8">
        <BlurFade delay={0.4} className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Latest Post</h2>
        </BlurFade>

        <div className="space-y-6">
          {latestPosts.map((post, index) => (
            <BlurFade key={post.slug} delay={0.5 + (index * 0.1)}>
              <Link href={`/blog/${post.slug}`} className="block group">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 -mx-4 rounded-xl transition-colors hover:bg-muted/50 border border-transparent hover:border-border">

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold group-hover:underline underline-offset-4 decoration-muted">{post.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {post.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground font-mono mt-2">
                      <span className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-foreground/50"></span>
                        {post.date}
                      </span>
                      {post.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="h-5 px-1.5 text-[10px] rounded-sm font-normal">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </BlurFade>
          ))}
          {latestPosts.length === 0 && (
            <p className="text-muted-foreground italic">No posts found yet.</p>
          )}
        </div>

        <BlurFade delay={0.8} className="flex justify-center pt-8">
          <Link
            href="/blog"
            className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            See all posts
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </BlurFade>
      </section>

    </div>
  )
}
