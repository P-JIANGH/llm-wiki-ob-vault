---
title: Effect System Pure-First
created: 2026-06-18
updated: 2026-06-18
type: concept
tags: [type-system, effect, effect-system, design-pattern, programming-language, agent, agent-first, agent-design, safety]
sources: [raw/articles/ling-lang-2026.md]
confidence: high
---

# Effect System — Pure-First, Short-Tag (组合 1)

> **Default = pure. IO must be tagged. Purity is proven, not assumed.**

The "pure-first, short-tag" effect system (formalized in **ADR 0013
组合 1** of [[entities/ling-lang]]) is one of the most pragmatic
effect-system designs known to the wiki. It satisfies the L1
"safe delegation" requirement (humans reviewing AI code can see, at
the signature level, which functions have which side effects) without
the verbosity of fully-explicit effect sets or the implementation
risk of full effect inference.

## Why an effect system at all

Per ADR 0002 (L1 strategic layer), the "safe delegation" hard
indicator #5 is **explicit side effects**, mandatory at v0.1. This
means: when an AI writes a function, the human reviewer must be able
to see, at the signature, which functions are pure and which touch
state. A function that "looks pure" but secretly reads the network
is a safety violation.

## The four design candidates considered

| Candidate | Description | Verdict |
|---|---|---|
| **γₐ** | Koka-style fully explicit effect sets in every signature | Rejected: too verbose for the 70-80% pure case |
| **γᵦ** | Short tags (`!FS`, `!Net`) in source, full set in codemap | Rejected: must reverse-check anyway; why not make purity the default? |
| **γᵧ** | Implicit, compiler infers effect set | Rejected: implementation risk is research-level (multi-month) |
| **组合 1** | Pure-first, short-tag fallback: default is pure, IO must be tagged, compiler reverse-checks purity | **Selected** |
| 组合 2 | Every function must explicitly tag including `!pure` | Rejected: adds noise to the most common case |
| 组合 3 | Compiler infers, AI/human can override with explicit tag | Rejected: inference is the same risk as γᵧ |

## Core rules

1. **Default = pure.** A function with no effect annotation is treated
   as pure. Purity is *proven*, not assumed.
2. **Purity is reverse-checked.** For any function without an effect
   tag, the compiler scans the function body for any IO-tagged call.
   If found, the function must be tagged with that effect.
3. **IO functions must declare a short tag** drawn from the standard
   effect vocabulary.
4. **Codemap stores the full effect set** for every function
   (inferred, declared, or proven).
5. **Effect subtyping:** for v0.0.x, effects are equal-or-disjoint
   (no automatic subtyping). Subtyping rules can be added in v0.1+.

## Standard short-tag vocabulary

| Tag | Meaning | Examples |
|---|---|---|
| `!FS` | File system | file_read, file_write, stat, mkdir |
| `!Net` | Network | http_get, socket_*, dns |
| `!Clock` | System clock / time | now, sleep |
| `!Rand` | Randomness | random_int, uuid |
| `!Panic` | Can panic | assert, divide-by-zero |
| `!IO` | Catch-all (discouraged) | only when truly needed |
| `!pure` | Optional explicit purity (same as no tag) | style choice |

Multiple tags: `!FS,!Clock` (comma-separated). For v0.0.x, max 3-4
tags; complex effect combinations get explicit sets in v0.1+.

## Concrete examples

```ling
;; Pure: no tag, no IO inside
(函数 square [x: Int] -> Int = {
  (返回 (* x x))
})

;; IO: tag required
(函数 read_file [path: String] -> String !FS = {
  (返回 (io_read path))
})

;; ERROR: tagged !FS but calls network operation
(函数 sneaky [url: String] -> String !FS = {
  (返回 (http_get url))
})
;; compiler error:
;;   error: function `sneaky` declared `!FS` but calls `http_get` (effect: Net)
;;   note: declare as `!FS,!Net` or remove the call

;; Multiple effects
(函数 load_config [path: String] -> Config !FS,!Clock = {
  (让 stats (file_stat path))    ;; !FS
  (返回 (Config (file_read path) (now)))  ;; !FS, !Clock
})
```

## The reverse-check algorithm

```
reverse_check(f):
  for each call site c in f's body:
    let callee = codemap.lookup(c)
    if callee.effects.is_nonempty():
      error: f is implicitly pure but calls {callee.name}
             which has effects {callee.effects}
  if no error: f.effects = {}
```

This is a **finite, decidable** check — the function body is finite,
the codemap is finite. No inference involved; just lookup. The
implementation is ~1 week of work vs the multi-month research of
full effect inference.

## Why 组合 1 wins on AI ergonomics

- **Most functions are pure; not having to tag them removes noise.**
  Pure functions are the 70-80% case; the cost of `!pure` everywhere
  is real.
- **AI doesn't need to remember to add `!pure`.** It just leaves the
  tag off.
- **Reverse-check ensures it's not laziness.** If a function is
  implicitly pure, the compiler proves it. There's no way to
  "forget" an effect tag without the compiler catching it.
- **Codemap always carries the full effect set for queries, review,
  and AI reasoning.** Structured field, schema-enforced.
- **Composability:** reverse-check + codemap gives a complete effect
  flow graph.

## The costs (with mitigations)

| Cost | Severity | Mitigation |
|---|---|---|
| Reverse-check requires codemap at compile time | Low | Already in scope (codemap-as-IR); trivial integration |
| Short-tag vocabulary is fixed (no custom effects in v0.0.x) | Medium | Custom effects (user-defined tags) deferred to v0.1+ |
| Effect subtyping is "equal-or-disjoint" in v0.0.x | Medium | `pure ⊆ {FS}` is not allowed in v0.0.x; explicit cast or full annotation. Subtyping added v0.1+. |
| AI may forget to tag a function with a new effect type it introduces | Low | Reverse-check catches it; error message suggests the fix |
| Effect tags scattered across many small functions could clutter | Low | v0.0.x will measure; if it's a problem, consider namespace-level effect grouping |

## Implementation phases

- **v0.0.6** — Effect tag parser, standard vocabulary, reverse-check
  pass, codemap records effect sets (✅ done in this clone)
- **v0.1.0** — Effect subtyping (`pure ⊆ {FS}`), custom effect tags
- **v0.2.0** — Effect polymorphism (when generics are introduced)

## Codemap integration

- Every function has an `effects` field in codemap (empty list for pure)
- AI queries: `ling query effects !FS` returns all functions touching the filesystem
- AI queries: `ling query pure` returns all pure functions
- Codemap diffs (per ADR 0010) show effect changes prominently

## Comparison to other effect systems

| System | Design | AI cost | Implementation cost |
|---|---|---|---|
| Koka | fully explicit effect sets | high (verbose) | medium |
| Eff/Cyclone (research) | row-polymorphism, full inference | low | research-level (multi-year) |
| Rust `unsafe` | blocks, not function-level | medium | done |
| Zig `comptime` | compile-time, no function-level effects | low | done |
| **Ling 组合 1** | pure-first, short-tag, reverse-check | **low** (default = pure) | **low** (~1 week) |

The Ling design is the most pragmatic of these: low AI cost, low
implementation cost, and the safety guarantee is *stronger* than
"trusted declaration" because purity is *proven*.

## Cross-references

- [[entities/ling-lang]] — the implementation
- [[concepts/codemap-as-design-surface]] — codemap is the canvas on
  which effects are first-class structured fields
- [[concepts/lcn-s-expression-format]] — effects are LCN-serialized
- [[concepts/agent-design-principles]] — "safe delegation" hard
  indicator #5 (explicit side effects) is the design driver
- [[concepts/agent-loop-architecture]] — `ling query effects` is an
  agent loop primitive
- [[entities/12-factor-agents]] — Factor 9 (compact errors) is the
  policy-level cousin: reverse-check errors are clear and
  suggest-the-fix
- [[entities/zerolang]] — uses **capabilities** (`world: World`)
  instead of effects; different paradigm, similar safety goal
