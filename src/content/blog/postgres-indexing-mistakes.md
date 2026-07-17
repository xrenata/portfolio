---
title: "Four Postgres Indexing Mistakes I Kept Repeating"
date: "2026-07-17"
description: "Slow queries are rarely a Postgres problem — they're usually an index problem. The four mistakes I made over and over until EXPLAIN ANALYZE became a habit."
tags: ["PostgreSQL", "Backend", "Performance"]
---

Every "Postgres is slow" ticket I've ever investigated turned out to be a missing or misused index. Here are the four mistakes I made repeatedly before I learned to read a query plan.

## 1. Indexing Columns, Not Queries

I used to add an index to every column that "seemed important." That's backwards. You index for the **query patterns** your app actually runs.

```sql
-- App always filters by user_id AND status together
SELECT * FROM orders WHERE user_id = $1 AND status = 'pending';

-- A single-column index on user_id helps, but this is better:
CREATE INDEX idx_orders_user_status ON orders (user_id, status);
```

A composite index on `(user_id, status)` serves this query in one lookup. Two separate single-column indexes force Postgres to bitmap-and them, which is slower.

## 2. Getting Composite Column Order Wrong

Order matters in composite indexes. The rule: **equality columns first, range columns last.**

```sql
-- Query: WHERE user_id = $1 AND created_at > $2
CREATE INDEX idx_good ON orders (user_id, created_at);  -- ✅
CREATE INDEX idx_bad  ON orders (created_at, user_id);  -- ✅ but worse here
```

With `(user_id, created_at)`, Postgres seeks straight to the user's rows then range-scans by date. Reverse it and you scan a date range across all users first.

## 3. Killing Indexes With Functions

Wrapping an indexed column in a function makes the index useless:

```sql
-- Index on email won't be used here
SELECT * FROM users WHERE lower(email) = 'me@example.com';
```

Either normalize on write, or create an expression index that matches the query:

```sql
CREATE INDEX idx_users_lower_email ON users (lower(email));
```

Now the planner can use it. `EXPLAIN` is the only way to be sure it does.

## 4. Trusting My Gut Instead of EXPLAIN ANALYZE

This is the meta-mistake. I'd *assume* an index was being used. `EXPLAIN ANALYZE` tells you the truth:

```sql
EXPLAIN ANALYZE
SELECT * FROM orders WHERE user_id = 42 AND status = 'pending';
```

Look for `Index Scan` (good) versus `Seq Scan` (a full table read). If you see a sequential scan on a big table in a hot query, that's your bug. The `actual time` numbers also tell you where the real cost is — sometimes it's not where you think.

---

None of this is advanced. The whole skill is: write the query first, run `EXPLAIN ANALYZE`, and add the index the plan is begging for. Do that a few times and index design stops being guesswork.
