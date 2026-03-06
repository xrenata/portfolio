---
title: "React Patterns I Stopped Using (And What Replaced Them)"
date: "2026-03-03"
description: "Some patterns that were once considered best practice have better alternatives today. Here's what I removed from my codebase and why."
tags: ["React", "Patterns", "Frontend"]
---

React's API has stabilized, but "best practice" is still a moving target. Looking back at code I wrote two years ago, a few patterns stand out as things I'd do differently today — not because they're broken, but because better alternatives exist.

## `useEffect` for Data Fetching

This one is well-documented but still everywhere in codebases:

```tsx
// What I used to write
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(r => r.json())
      .then(data => {
        setUser(data)
        setLoading(false)
      })
  }, [userId])

  if (loading) return <Spinner />
  return <div>{user?.name}</div>
}
```

The problems: no error handling, no cleanup, no deduplication, re-fetches on every render cycle change.

What I use now is SWR or React Query, or in Next.js App Router, just making the component async:

```tsx
// App Router — no hooks needed
async function UserProfile({ userId }: { userId: string }) {
  const user = await fetchUser(userId)
  return <div>{user.name}</div>
}
```

## Prop Drilling Solved by Context (When It Shouldn't Be)

Context is for truly global state — theme, auth, locale. I used to reach for it whenever prop drilling got annoying. The problem is that every context consumer re-renders when the value changes, which creates subtle performance bugs.

The better solution for most cases is **component composition**:

```tsx
// Instead of threading `onClose` through 4 layers
function Modal({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <div className="modal">
      <CloseButton onClose={onClose} /> {/* pass directly where needed */}
      {children}
    </div>
  )
}
```

Lift the component itself up, not the data.

## Boolean Props for Variants

```tsx
// What I wrote before
<Button primary large disabled />

// The problem: primary + secondary + outline are mutually exclusive
// TypeScript can't catch <Button primary secondary />
```

Explicit variant props are cleaner:

```tsx
<Button variant="primary" size="lg" disabled />
```

This is exactly what `class-variance-authority` enforces — and why shadcn/ui uses it.

## `React.FC` Type Annotation

```tsx
// Old
const MyComponent: React.FC<Props> = ({ name }) => { ... }

// Now
function MyComponent({ name }: Props) { ... }
```

`React.FC` implicitly includes `children` in older React versions (it no longer does in React 18+), and the function declaration form handles generics better, reads more clearly in stack traces, and lets you use `export default function` without a separate declaration.

---

None of these are sins — they're patterns that made sense at the time. The point isn't to rewrite working code, but to recognize when the new approach is strictly better for fresh code.
