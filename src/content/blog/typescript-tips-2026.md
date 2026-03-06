---
title: "5 TypeScript Tricks I Use Every Day"
date: "2026-03-01"
description: "From discriminated unions to template literal types — the TypeScript patterns that genuinely changed how I write code."
tags: ["TypeScript", "DX", "Tips"]
---

TypeScript has been around long enough that most developers have moved past the basics. But there's a big gap between "I know how to type a function" and "I actually leverage the type system to catch bugs before runtime." Here are five patterns I reach for constantly.

## 1. Discriminated Unions Over Optional Fields

The temptation when modeling different states is to make fields optional. Resist it.

```typescript
// Bad — which fields exist at runtime?
type ApiState = {
  loading?: boolean
  data?: User
  error?: string
}

// Good — each variant is unambiguous
type ApiState =
  | { status: "loading" }
  | { status: "success"; data: User }
  | { status: "error"; error: string }
```

With the union, TypeScript narrows automatically inside `if (state.status === "success")` — no optional chaining needed.

## 2. `satisfies` for Type-Checked Literals

Introduced in TypeScript 4.9, `satisfies` lets you validate a value against a type without widening it.

```typescript
const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
} satisfies Record<string, string | number[]>

// TypeScript knows palette.red is number[], not string | number[]
palette.red.map(v => v * 2) // ✅
```

Without `satisfies`, you'd need to cast or lose the specific inferred type.

## 3. Template Literal Types for String APIs

When you're building config objects or event systems, template literal types make invalid strings impossible.

```typescript
type Direction = "top" | "bottom" | "left" | "right"
type Padding = `padding-${Direction}`
// "padding-top" | "padding-bottom" | "padding-left" | "padding-right"

function setSpacing(property: Padding, value: number) { ... }

setSpacing("padding-top", 16)    // ✅
setSpacing("padding-middle", 16) // ❌ compile error
```

## 4. `infer` for Extracting Generic Parts

When you need to pull a type out of another type, `infer` is your tool.

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never

type Awaited<T> = T extends Promise<infer U> ? U : T

// Extract the element type from an array
type ElementOf<T> = T extends (infer E)[] ? E : never
type Names = ElementOf<string[]> // string
```

This is how the built-in utility types like `ReturnType`, `Parameters`, and `Awaited` are implemented.

## 5. Branded Types to Prevent Mix-ups

TypeScript's structural typing means `UserId` and `ProductId` — both `string` — are interchangeable. Branding prevents that.

```typescript
type Brand<T, B> = T & { __brand: B }
type UserId = Brand<string, "UserId">
type ProductId = Brand<string, "ProductId">

function getUser(id: UserId) { ... }

const userId = "abc123" as UserId
const productId = "xyz789" as ProductId

getUser(userId)    // ✅
getUser(productId) // ❌ Type 'ProductId' is not assignable to 'UserId'
```

You only pay the casting cost once at the boundary (e.g., when reading from a database), and the rest of your codebase stays safe.

---

These five patterns cover maybe 80% of the "TypeScript-specific" bugs I would have shipped without them. Start with discriminated unions if you pick only one — it's the highest ROI change you can make to an existing codebase.
