---
title: "The Modern CSS I Reach for in 2026"
date: "2026-07-17"
description: "Container queries, :has(), subgrid and color-mix() are no longer 'coming soon' — they're the tools I use daily. A tour of the CSS that replaced my old hacks."
tags: ["CSS", "Frontend", "Tips"]
---

I spent years reaching for JavaScript to do things CSS couldn't. In 2026, most of those workarounds are gone. Here's the modern CSS I actually use every day and the hacks each one retired.

## Container Queries Replaced My Breakpoint Guessing

Media queries ask "how big is the viewport?" Container queries ask the better question: "how big is the space *this component* has?"

```css
.card-grid {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    grid-template-columns: 120px 1fr;
  }
}
```

The same card can be stacked in a sidebar and side-by-side in a wide main column — without knowing anything about the viewport. This killed an entire category of "component looks wrong in this context" bugs for me.

## `:has()` Is the Parent Selector We Waited a Decade For

Styling a parent based on its children used to require a JS class toggle. Not anymore.

```css
/* A form field that has an invalid input */
.field:has(input:invalid) {
  border-color: var(--destructive);
}

/* A card that contains an image gets different padding */
.card:has(img) {
  padding: 0;
}
```

I use `:has()` constantly for state that lives in the DOM structure rather than in a React state variable.

## `color-mix()` for Theme-Aware Tints

Instead of hand-picking a dozen shades, I mix them from a base color. This is perfect for hover states and translucent overlays that need to work in both themes.

```css
.button:hover {
  background: color-mix(in oklch, var(--primary) 90%, black);
}

.overlay {
  background: color-mix(in oklch, var(--background) 60%, transparent);
}
```

Mixing in `oklch` keeps the perceived lightness consistent, which sRGB mixing doesn't.

## Subgrid for Aligned Cards

The classic problem: a row of cards where titles, bodies and footers should line up even when content length differs. Subgrid lets a child participate in its parent's grid tracks.

```css
.card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3;
}
```

Now every card's title, body and footer align to the same baseline across the row. No more min-height hacks.

## Fluid Type Without Media Queries

`clamp()` gives you type that scales smoothly between a floor and a ceiling:

```css
h1 {
  font-size: clamp(2rem, 5vw + 1rem, 4.5rem);
}
```

One line replaces three or four breakpoints of font-size overrides.

---

The theme running through all of these: CSS caught up to the layout problems we used to solve in JavaScript. Every time I'm about to add a resize observer or a state class, I now stop and ask whether modern CSS already handles it. Increasingly, it does.
