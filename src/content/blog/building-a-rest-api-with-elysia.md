---
title: "Building a Type-Safe REST API with Elysia and Bun"
date: "2026-03-05"
description: "Elysia gives you end-to-end type safety, a great DX, and performance that beats Express by a wide margin. Here's how I structure a real API with it."
tags: ["Elysia", "Bun", "Backend", "TypeScript", "API"]
---

I've built APIs with Express, Fastify, Hono, and now Elysia. Elysia is the first framework where I feel like TypeScript is a first-class citizen rather than an afterthought bolted on. Here's how I structure a production-ready API with it.

## Why Elysia

The headline feature is end-to-end type inference. When you define a route schema, TypeScript knows the exact shape of your request body, query params, path params, and response — with no manual type declarations.

It runs on Bun, which handles the performance side. Elysia consistently beats Express by 5–10x in benchmarks, and more importantly, it beats Fastify too.

## Project Structure

```
src/
  index.ts          # Entry point, mounts plugins
  plugins/
    auth.ts         # Bearer token validation
    cors.ts         # CORS config
  routes/
    users.ts        # User CRUD
    posts.ts        # Post CRUD
  db/
    index.ts        # Prisma client singleton
  types/
    index.ts        # Shared types
```

## The Entry Point

```typescript
// src/index.ts
import { Elysia } from "elysia"
import { cors } from "@elysiajs/cors"
import { bearer } from "@elysiajs/bearer"
import { usersRoutes } from "./routes/users"
import { postsRoutes } from "./routes/posts"

const app = new Elysia()
  .use(cors({ origin: process.env.ALLOWED_ORIGIN }))
  .use(bearer())
  .use(usersRoutes)
  .use(postsRoutes)
  .listen(3000)

console.log(`API running at ${app.server?.hostname}:${app.server?.port}`)

export type App = typeof app
```

## A Route with Full Type Safety

```typescript
// src/routes/users.ts
import { Elysia, t } from "elysia"
import { db } from "../db"

export const usersRoutes = new Elysia({ prefix: "/users" })
  .get(
    "/:id",
    async ({ params, error }) => {
      const user = await db.user.findUnique({
        where: { id: params.id },
      })

      if (!user) return error(404, { message: "User not found" })
      return user
    },
    {
      params: t.Object({ id: t.String() }),
      response: {
        200: t.Object({
          id: t.String(),
          name: t.String(),
          email: t.String(),
          createdAt: t.Date(),
        }),
        404: t.Object({ message: t.String() }),
      },
    }
  )
  .post(
    "/",
    async ({ body }) => {
      const user = await db.user.create({ data: body })
      return user
    },
    {
      body: t.Object({
        name: t.String({ minLength: 2 }),
        email: t.String({ format: "email" }),
        password: t.String({ minLength: 8 }),
      }),
    }
  )
```

The `t.Object` schemas do double duty: they validate the request at runtime and generate the TypeScript types. You write one thing, get two guarantees.

## Authentication Plugin

```typescript
// src/plugins/auth.ts
import { Elysia } from "elysia"
import { db } from "../db"

export const authPlugin = new Elysia({ name: "auth" }).derive(
  { as: "scoped" },
  async ({ bearer, error }) => {
    if (!bearer) return error(401, { message: "Unauthorized" })

    const session = await db.session.findUnique({
      where: { token: bearer },
      include: { user: true },
    })

    if (!session) return error(401, { message: "Invalid token" })

    return { user: session.user }
  }
)
```

Any route that `.use(authPlugin)` gets a typed `user` in its context automatically. No manual middleware threading.

## Eden Treaty — The Frontend Client

The part I didn't expect to love: Elysia generates a fully typed client from the server's type.

```typescript
// In your frontend (Next.js, etc.)
import { treaty } from "@elysiajs/eden"
import type { App } from "../api/src/index"

const api = treaty<App>("http://localhost:3000")

// Fully typed — autocomplete on routes, params, body, response
const { data, error } = await api.users({ id: "123" }).get()
// data is typed as { id: string; name: string; email: string; createdAt: Date }
```

This is the feature that sold me. One `export type App = typeof app` in the server, one import in the frontend, and the entire API surface is typed end-to-end without a code generator or schema file to sync.

---

Elysia is my default for new backend projects. The combination of Bun's performance, Elysia's type system, and Eden's frontend integration is the best developer experience I've had building APIs. The ecosystem is smaller than Express but growing fast, and for new projects the trade-off is very much worth it.
