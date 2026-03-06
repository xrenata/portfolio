---
title: "CSS Things I Wish I Knew Earlier"
date: "2026-03-04"
description: "Not another flexbox tutorial. These are the CSS features that changed how I approach layout and styling problems — some new, some that have been there for years."
tags: ["CSS", "Frontend", "Design"]
---

CSS gets underestimated. A lot of JavaScript-based solutions exist purely because developers didn't know the CSS equivalent was already there. Here are the features that changed how I think about styling.

## `subgrid` — Finally

For years, nested grids couldn't align to a parent grid's tracks. You'd either flatten everything into one container (messy) or accept the misalignment (worse).

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 1rem;
}

.card {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid; /* aligns to parent's row tracks */
}
```

Now card titles, descriptions, and footers align across cards without JavaScript measurement. Browser support is solid as of 2025.

## Container Queries Over Media Queries for Components

Media queries respond to the viewport. Container queries respond to the container — which is almost always what you actually want for a reusable component.

```css
.card-wrapper {
  container-type: inline-size;
}

.card {
  display: flex;
  flex-direction: column;
}

@container (min-width: 400px) {
  .card {
    flex-direction: row;
  }
}
```

The card lays out vertically in a narrow sidebar and horizontally in a wide main area — no media query breakpoints that break when you move the component.

## `text-wrap: balance`

Typographic widows (single words on the last line) are a subtle but real quality issue. One line fixes it:

```css
h1, h2, h3 {
  text-wrap: balance;
}
```

The browser distributes text evenly across lines. `text-wrap: pretty` (for body text) does something similar but optimizes for the last few lines instead of the entire block. Both are now widely supported.

## `:has()` Is a Parent Selector

CSS has always selected children from parents. `:has()` lets you select a parent based on its children.

```css
/* Style a form label when its sibling input is invalid */
.field:has(input:invalid) label {
  color: red;
}

/* Style a card differently when it contains an image */
.card:has(img) {
  padding: 0;
}

/* Navigation item active state without JavaScript */
.nav-item:has(a[aria-current="page"]) {
  background: var(--muted);
}
```

I replaced a small amount of JavaScript state management with `:has()` selectors. The code is genuinely cleaner.

## Logical Properties for Internationalization

Instead of `margin-left` and `padding-right`, use logical properties:

```css
/* Physical */
margin-left: 1rem;
padding-right: 2rem;
border-top: 1px solid;

/* Logical */
margin-inline-start: 1rem;
padding-inline-end: 2rem;
border-block-start: 1px solid;
```

In left-to-right languages they behave identically. In right-to-left (Arabic, Hebrew), they flip automatically. Tailwind v3+ uses logical properties by default for `ml-`, `mr-` etc. in RTL mode.

---

CSS is shipping more useful features per year than any point in its history. The `@layer` rule for specificity management, `color-mix()` for theme colors, `@property` for animatable custom properties — it's worth keeping up. A lot of npm packages exist purely because developers didn't know the platform feature was already there.
