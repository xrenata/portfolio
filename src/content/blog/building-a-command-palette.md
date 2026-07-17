---
title: "Building a ⌘K Command Palette from Scratch"
date: "2026-07-17"
description: "No library, just a dialog, a filtered list and some keyboard handling. Here's how I built the command palette on this very site."
tags: ["React", "UI", "Accessibility"]
---

Every command palette I've used feels the same: hit `⌘K`, type a few letters, hit enter. It looks like magic but the whole thing is maybe 150 lines of React. I built the one on this site without a library — here's the anatomy.

## The Global Shortcut

First, a window-level listener that toggles the palette. The important part is `preventDefault` so the browser doesn't do its own thing with `⌘K`.

```tsx
React.useEffect(() => {
  const onKey = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault()
      setOpen((o) => !o)
    }
  }
  window.addEventListener("keydown", onKey)
  return () => window.removeEventListener("keydown", onKey)
}, [])
```

Supporting both `metaKey` (macOS) and `ctrlKey` (Windows/Linux) means one shortcut works everywhere.

## Commands as Data

The trick that keeps this maintainable: every action — navigate, toggle theme, open a link — is just an object with a `perform` function.

```tsx
type Command = {
  id: string
  label: string
  keywords?: string
  perform: () => void
}
```

Pages, blog posts, theme toggles, and social links all flatten into one array. Filtering is a substring match against `keywords`. No fuzzy-search dependency needed until you actually feel the lack of one.

## Keyboard Navigation

The list needs arrow-key movement and enter-to-run. I track an `activeIndex` over the *flattened, filtered* list:

```tsx
const onKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === "ArrowDown") {
    e.preventDefault()
    setActiveIndex((i) => Math.min(i + 1, flat.length - 1))
  } else if (e.key === "ArrowUp") {
    e.preventDefault()
    setActiveIndex((i) => Math.max(i - 1, 0))
  } else if (e.key === "Enter") {
    e.preventDefault()
    flat[activeIndex]?.perform()
  }
}
```

Reset `activeIndex` to 0 whenever the query changes, or the highlight ends up pointing at a filtered-out row.

## The One Bug Everyone Hits

Closing the dialog and navigating in the same tick fights the dialog's own focus management. The fix is to defer the action by a frame:

```tsx
const run = (fn: () => void) => {
  setOpen(false)
  setTimeout(fn, 0) // let the dialog close first
}
```

## Accessibility for Free

Building on a proper dialog primitive (I used Radix) hands you focus trapping, `Escape` to close, and `aria` roles without extra work. Add `scrollIntoView({ block: "nearest" })` on the active item so keyboard-only users never lose the highlight off-screen.

---

That's the whole thing. The reason palettes feel premium isn't complexity — it's that someone sweated the keyboard details. Do that, and 150 lines gets you something that feels like it shipped with the OS.
