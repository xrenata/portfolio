---
title: "Rate Limiting on the Edge with Upstash Redis"
date: "2026-07-17"
description: "A sliding-window rate limiter that runs in edge functions, survives deploys, and takes about ten lines to wire up. Here's how and why."
tags: ["Backend", "Edge", "Redis"]
---

The moment you expose a public API route — a contact form, a search endpoint, a login — you need rate limiting. In-memory counters don't survive a serverless cold start or work across regions, so the state has to live somewhere shared. Redis is the classic answer, and Upstash makes it work at the edge over HTTP.

## Why Not In-Memory?

A `Map` of IP → count feels tempting and is completely broken in serverless:

- Every cold start wipes it
- Each region/instance has its own copy
- Ten instances means an attacker gets 10x your limit

You need a single source of truth that any instance can reach. That's the whole reason to use Redis here.

## The Setup

Upstash exposes Redis over a REST API, which means it works in edge runtimes where you can't hold a TCP socket open. The `@upstash/ratelimit` package wraps it into a clean primitive.

```ts
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
})
```

That's a sliding window of 10 requests per 10 seconds. The sliding window avoids the burst problem you get with fixed windows, where a client can fire double the limit across a window boundary.

## Using It in a Route

```ts
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous"
  const { success, limit, remaining, reset } = await ratelimit.limit(ip)

  if (!success) {
    return new Response("Too many requests", {
      status: 429,
      headers: {
        "X-RateLimit-Limit": String(limit),
        "X-RateLimit-Remaining": String(remaining),
        "X-RateLimit-Reset": String(reset),
      },
    })
  }

  // ...handle the request
}
```

Returning the standard `X-RateLimit-*` headers is a small courtesy that lets well-behaved clients back off on their own.

## Choosing the Key

IP is the default, but it's blunt — shared networks and mobile carriers put many users behind one address. Where I have a session, I rate limit by user ID and fall back to IP for anonymous traffic. For login endpoints specifically, I limit by *both* IP and the submitted username, so one attacker can't lock out a real user by hammering their account.

## Watch the Latency

Every `limit()` call is a network round trip to Redis. Upstash's global replication keeps it low, but put your Redis in the same region as your functions and don't rate-limit static assets — only the routes that actually need protecting.

---

Ten lines of setup buys you protection that survives deploys, scales across regions, and doesn't fall over under the exact traffic spike you added it to handle. It's one of the highest-leverage things you can add to a public API.
