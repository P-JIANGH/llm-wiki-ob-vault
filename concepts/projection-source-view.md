---
title: Projection as Source View
created: 2026-06-18
updated: 2026-06-18
type: concept
tags: [architecture, design-pattern, agent, agent-first, design, hitl, agent-design]
sources: [raw/articles/zerolang-2026.md]
confidence: medium
---

# Projection as Source View

> **`.0` files are projections of the graph. They exist for trust.
> Agents write the graph; humans review projections.**

In a [[concepts/graph-native-programming]] language, text files are
*projections* of the [[concepts/program-graph-store|graph store]] —
human-readable, bidirectionally syncable, but **not the normal agent
write surface**.

The key mental model: the store is authoritative. The text is a view.
The two can drift in either direction; the runtime detects and handles
that drift explicitly instead of hiding it.

## The sync commands

```sh
zero export              # write .0 from the graph (human review)
zero import              # read edited .0 back into the graph
zero verify-projection   # no-write drift check (review / CI)
zero status              # report clean / missing / stale / conflicting / unavailable
```

- **`zero export`** — used when a human needs the latest readable
  review text. Not an automatic agent step; export when a human asks
  to review or when CI wants a projection drift gate.
- **`zero import`** — used after a human *intentionally* edited
  projection text and wants to reconstruct the graph. Recovers the
  graph from reviewed text. Package commands then refresh the store
  from the edited source.
- **`zero verify-projection`** — the no-write check. Useful in
  review and CI; flags drift without fixing it.
- **`zero status`** — content-hash-based classification (see
  [[concepts/program-graph-store]]).

## The four-state model

| Store state | Projection state | What `zero check` does |
|---|---|---|
| newer | older | Uses store; reports refresh on stderr; `zero export` to sync |
| older | newer | Refreshes store from projection; reports refresh on stderr |
| both edited (hashes diverge) | — | Fails with `RGP006`; suggests `zero import` / `zero export` |
| either missing or unparsable | — | Fails with `RGP006` / `RGP008` |

Set `ZERO_STALE=fail` to fail with `RGP008` instead of refreshing
automatically. The rule: **never pick a side silently**.

## Why a text projection at all

Three reasons:

1. **Trust.** A human can read the program, review a change, and make
   a manual edit when needed. The text is the review surface.
2. **Diagnostics.** Source maps can point to familiar line and column
   spans in the projection, so error messages read like ordinary
   compiler errors.
3. **Escape hatch.** A project should remain reconstructable from
   text projections. If the compiler ever becomes unavailable, the
   project is still inspectable. A human can edit `src/main.0`,
   reconcile it back into the graph with `zero import`, and confirm
   the projection still matches via `zero verify-projection`.

## The ownership rule

> agents normally author through `zero query` and `zero patch`
> humans review through projections
> humans may edit projections as an escape hatch
> `zero import` reconstructs the graph from reviewed projection text
> `zero verify-projection` catches drift instead of hiding it

This is a deliberate human-in-the-loop boundary. The graph is
first-class, but humans are not locked out of a readable format.

## What this is *not*

- It is **not** a "view the database as text" feature in the way an
  ORM might offer — the projection is the canonical text surface for
  humans, but it is *not* the compiler input.
- It is **not** a two-way auto-sync. The sync is explicit and one-way
  per command; the user picks the direction.
- It is **not** a "let the agent write to .0 because it's easier".
  The contributor policy (AGENTS.md) is explicit: agents should
  normally keep using `zero query` and `zero patch`. Direct `.0` text
  edits are a last resort for changes no patch op expresses.

## Comparison to other systems

| System | Authoritative state | Human view | Agent write surface |
|---|---|---|---|
| [[entities/zerolang]] | `zero.graph` (binary) | `.0` projection | `zero patch` (typed ops) |
| [[entities/langgraph]] | in-memory state graph | optional checkpoints | `add_node` / `add_edge` API |
| TypeScript / Rust / Go | text on disk | text on disk | text edits |
| Git | object store | working tree | text edits + git plumbing |

The graph-first row is the only one where the *normal agent write
surface* is fundamentally different from the *human read surface*.

## Cross-references

- [[concepts/graph-native-programming]] — the broader thesis
- [[concepts/program-graph-store]] — the authoritative state
- [[concepts/semantic-patch-editing]] — the agent's write primitive
- [[entities/zerolang]] — the implementation
- [[entities/12-factor-agents]] — Factor 9 (compact errors) is the
  HITL-friendly cousin: errors in the projection are line/column
  errors, not graph-node IDs, so humans can act on them
- [[concepts/agent-design-principles]] — regular patterns over
  syntactic convenience
