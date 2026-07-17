---
title: "How I Actually Use AI Coding Agents (Without Losing the Plot)"
date: "2026-07-17"
description: "Agents like Cline are great at some tasks and terrible at others. My workflow for getting real leverage without shipping code I don't understand."
tags: ["AI", "Workflow", "DX"]
---

I've been running AI coding agents in my editor for a while now. They're genuinely useful, but the productivity story is more nuanced than the demos suggest. Here's the workflow that works for me — and the guardrails that keep it from going sideways.

## What Agents Are Genuinely Good At

The sweet spot is **mechanical, well-specified, boring work**:

- Writing tests for a function whose behavior I can describe
- Migrating a file from one pattern to another (class component to hooks, etc.)
- Scaffolding boilerplate — a new API route matching the shape of five existing ones
- Explaining an unfamiliar codebase before I touch it

For these, an agent saves real time because the *specification* is clear and the *verification* is easy.

## Where They Fall Apart

The failure mode is always the same: **fuzzy requirements plus hard-to-verify output.** Ask an agent to "improve performance" and you'll get changes that look plausible and may do nothing — or quietly break an edge case. The more architectural the decision, the less I delegate it.

## My Actual Loop

I treat the agent like a fast junior who needs a tight spec and a code review.

1. **Write the spec myself.** Two or three sentences of what "done" looks like, plus the constraints. Vague prompts get vague code.
2. **Let it work in small chunks.** One file, one feature. A giant multi-file change is impossible to review honestly.
3. **Read every line.** This is non-negotiable. If I don't understand a diff, it doesn't get committed. "The AI wrote it" is not an answer during an incident at 2am.
4. **Verify by running it.** Not "does it look right" — does the actual behavior change the way I expected? Tests, or driving the real flow.

## The Rule That Keeps Me Sane

> If I can't explain what a change does and why, I don't ship it.

Agents make it dangerously easy to accumulate code you don't understand. That's fine for a throwaway prototype and a disaster in something you have to maintain. The discipline of reading and verifying is what separates leverage from tech debt.

## The Underrated Use Case

Honestly, the thing I get the most value from isn't code generation — it's **exploration**. Dropping into an unfamiliar repo and asking "where does auth get validated?" or "trace what happens when this webhook fires" gets me oriented in minutes instead of an hour of grepping.

---

Agents didn't replace the thinking. They removed the typing around the thinking, on the tasks where the thinking was already done. Keep the spec tight, review like it's a coworker's PR, and they're a real multiplier. Skip either and you're just generating liabilities faster.
