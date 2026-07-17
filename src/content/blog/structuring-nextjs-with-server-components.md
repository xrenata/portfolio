---
title: "How Server Components Rewired My Next.js Mental Model"
date: "2026-07-17"
description: "After a year of React Server Components in production, here's the folder structure and the client/server boundary rules that finally clicked for me."
tags: ["Next.js", "React", "Architecture"]
---

When Server Components first shipped, I did what most people did: sprinkled `"use client"` wherever the compiler yelled at me and moved on. It worked, but my apps were a mess of client boundaries that didn't need to exist. A year later, here's the model that actually made things simpler.

## Server by Default, Client at the Leaves

The single rule that fixed most of my confusion: **push `"use client"` as far down the tree as possible.** A page should be a Server Component. So should most of its layout. The only things that need to be client are the pieces that actually use state, effects, or browser APIs.

```tsx
// page.tsx — Server Component, no directive needed
import { getPosts } from "@/lib/posts"
import { LikeButton } from "./like-button" // client leaf

export default async function Page() {
  const posts = await getPosts() // runs on the server, no API route
  return (
    <ul>
      {posts.map((p) => (
        <li key={p.id}>
          {p.title}
          <LikeButton postId={p.id} />
        </li>
      ))}
    </ul>
  )
}
```

The data fetching happens on the server with zero client JavaScript. Only `LikeButton` ships to the browser.

## Passing Server Data Into Client Components

You don't need a data-fetching hook anymore for the initial render. Fetch on the server, pass as props:

```tsx
// Server Component
const user = await getUser()
return <Profile user={user} />
```

The catch: props crossing the boundary must be serializable. No functions, no class instances, no `Date` objects that you rely on identity for. I keep a thin mapping layer that converts DB rows into plain objects before they cross.

## The "Provider Sandwich" Pattern

Context providers are client components, but their children don't have to be. You can wrap Server Component children inside a client provider:

```tsx
// layout.tsx (Server Component)
<ThemeProvider>        {/* client */}
  {children}           {/* still Server Components */}
</ThemeProvider>
```

This surprised me for a while — the provider is a client boundary, but `children` is passed as an already-rendered payload, so it stays on the server. That's why you can have a client `ThemeProvider` at the root without turning your whole app into client code.

## Where I Still Use Client Fetching

Server Components handle the initial load. For anything that updates after the fact — live presence, polling, optimistic UI — I still reach for SWR on the client. The two compose nicely: server render for the first paint, client hydration for the live bits.

---

The mental shift that took longest: stop thinking "component that fetches data" and start thinking "server boundary that produces HTML, client boundary that adds interactivity." Once that clicked, half my `useEffect` fetches disappeared.
