---
title: Program Graph Store
created: 2026-06-18
updated: 2026-06-18
type: concept
tags: [architecture, design-pattern, state-management, agent, agent-first, agent-design, content-addressable, hash]
sources: [raw/articles/zerolang-2026.md]
confidence: medium
---

# Program Graph Store

> **A binary, content-hashed, shape-validated store of the program's
> semantic facts.** The normal package compile input. Text is not.

A **program graph store** is the file (or set of files) that holds the
compiler's primary input in a [[concepts/graph-native-programming]]
language. In [[entities/zerolang]] this file is `zero.graph`; in other
systems it would have another name, but the shape is the same.

## What the store contains

- declarations (functions, types, enums, constants, imports, tests, modules)
- types (parameter types, return types, fallibility, `raises [...]`)
- call edges (`f → g`, `g → h`)
- block structure (`if { then-block else-block }`, `while`, `match`)
- capabilities (`world: World`, `net: Net`, `fs: Fs`)
- source-map facts (line, column, projection span)
- repository metadata (manifest hash, projection hash, target facts)

The graph is **shape-validated**: required edges, ordered child groups,
node kinds, type facts, and repository metadata are checked when
patches are applied. A patch that would leave a sparse argument list,
a missing expression, a stale graph hash, or an invalid store fails
**before** the package becomes the new compiler input.

## Why content-hashed

Every store write records a **hash of the source projection** inside
the graph. This is the trick that lets `zero status` decide which side
moved by *content*, not by file timestamps:

| Situation | File timestamps say | Content hash says | Result |
|---|---|---|---|
| Graph edited, projection not exported | graph is newer | graph is newer | `zero check` uses the graph, reports refresh on stderr |
| Projection hand-edited, graph not imported | projection is newer | projection is newer | `zero check` refreshes store from source, reports refresh on stderr |
| Both edited independently | ambiguous | ambiguous | `RGP006` — fails with explicit `zero import` / `zero export` repair suggestions |

A freshly staged, cloned, or extracted workspace classifies the same
way everywhere regardless of file timestamps. Set `ZERO_STALE=fail` to
escalate the auto-refresh into an `RGP008` failure.

## Binary vs text representation

The store is **binary** (not text). That is the whole point — text
round-trips are slow, lossy, and ambiguous, and the graph doesn't need
them. The projection (`.0` text file) is the only text surface; it
is generated from the store on `zero export`.

This is the same trade-off that makes `git` use a binary object store
underneath a text-ish surface (working tree) — the store is the
authoritative state, the working tree is a projection.

## Drift detection

`zero status` reports five states:
- `clean` — store and projection match
- `missing` — projection has been deleted
- `stale` — projection is older than the store
- `conflicting` — both sides have been edited independently
- `unavailable` — store cannot be read

`zero verify-projection` is the no-write drift check, intended for
review and CI gates. It does not modify state.

## Why the store is the *agent's* database

The graph is the agent's primary database in the same way that text
is the human's primary database: it is what the agent reads, queries,
and (via patches) writes. The agent can ask the compiler for:
- symbols (`zero query --fn main`)
- references (`zero query --refs handle`)
- call edges (`zero query --calls write`)
- node IDs and graph hashes
- type facts
- capabilities
- imports
- target facts

And the agent can write via typed operations with explicit
preconditions — see [[concepts/semantic-patch-editing]].

## Inspection

`zero inspect --json` exposes the machine-readable facts:
- node IDs
- graph hashes
- `interfaceFingerprints`
- `targetToolchains`
- `usedStdlibHelpers`
- `memoryBudgets`
- `releaseTargetContract`

Use plain text by default; `--json` only for automation, exact spans,
contracts, or machine-readable diagnostics.

## Cross-references

- [[concepts/graph-native-programming]] — the broader thesis
- [[concepts/semantic-patch-editing]] — the edit primitive against
  this store
- [[concepts/projection-source-view]] — the text surface *of* this
  store
- [[entities/zerolang]] — the implementation
- [[entities/langgraph]] — also uses a graph as the primary data
  structure, but for the agent's state machine instead of the
  program being authored
