---
title: "Why I Switched from Node.js to Bun (And What I Miss)"
date: "2026-03-02"
description: "Six months in with Bun as my primary runtime. The good, the rough edges, and whether I'd recommend it for a production project today."
tags: ["Bun", "Node.js", "Backend", "Performance"]
---

Six months ago I migrated my main side project from Node.js + pnpm to Bun. Not for hype reasons — the startup time on my API server was genuinely bothering me and I wanted to see if Bun lived up to the benchmarks. Here's what I found.

## What Actually Got Faster

The benchmarks are real. Cold start on my Elysia API went from ~320ms to ~40ms. That's not a micro-benchmark cherry-pick — that's wall-clock time from `bun run start` to first request served.

Package installation is the other big one. A `bun install` on a project with ~180 dependencies takes about 1.2 seconds on my machine. The equivalent `pnpm install` takes 18 seconds. I don't fully understand how they pull this off (aggressive caching, the binary lockfile) but it makes CI feel snappy in a way I'd gotten used to not expecting.

## The Built-In Test Runner

I was skeptical about replacing Vitest, but `bun test` is genuinely good. It supports `describe`, `it`, `expect`, `beforeEach` — the Jest API basically. The watch mode is fast. I haven't hit a case where I needed Vitest features that `bun test` couldn't handle.

```bash
bun test --watch src/
# Runs in ~80ms, re-runs affected tests on save
```

## Native TypeScript — No Build Step for Scripts

This is the quiet quality-of-life feature. Any `.ts` file is just executable:

```bash
bun run scripts/seed-database.ts
```

No `ts-node`, no `tsx`, no config. For small scripts and tooling, this removes a whole category of friction.

## What I Actually Miss

### The Ecosystem Assumption

Most npm packages assume Node.js. The majority work fine in Bun, but occasionally you hit something that uses a Node internal in a way Bun hasn't implemented yet. `node:crypto` is solid; some stream APIs have edge cases.

### The Error Messages

Node's error messages have had years of polish. Bun's are improving but sometimes you get a cryptic native-level error where Node would give you a useful stack trace.

### Mature Tooling Integration

Some tools — older Jest configs, certain webpack plugins, some Prisma edge cases — still need `node` explicitly. I keep Node installed for these situations.

## Would I Use It in Production Today?

For a greenfield backend with Elysia or Hono, yes without hesitation. The performance difference is real and the ecosystem gaps are small for modern code.

For a large existing Node.js project? I'd wait. The migration cost is low but the surprise-edge-case cost can be high depending on your dependencies.

The runtime is maturing fast. The Bun 2.0 release addressed most of my compatibility concerns. I'm staying on it.
