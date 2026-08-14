---
title: LCN S-Expression Format
created: 2026-06-18
updated: 2026-06-18
type: concept
tags: [architecture, design-pattern, s-expression, format, serialization, programming-language, agent, agent-first]
sources: [raw/articles/ling-lang-2026.md]
confidence: high
---

# LCN — Ling Config Notation (S-Expression Format)

> **One parser family, three views.** LCN is the S-expression
> serialization of the codemap; `.ling` source is also S-expression;
> the AST is also S-expression.

LCN (Ling Config Notation) is the serialization format for the
codemap canonical IR in [[entities/ling-lang]], formalized in
**ADR 0007**. The same syntax family is used for the `.ling` source
code itself (per ADR 0015 "language form integrated ι"), so a single
parser handles both.

## Why S-expressions, not JSON

ADR 0007 records the format choice. The author challenged the default
JSON assumption:

> "我觉得你的设计可以。但为什么非得是 JSON？"

Three reasons LCN won:

1. **Internal consistency with `.ling` source** (per ADR 0015 ι).
   The source language is also S-expression-based; using the same
   syntax for the codemap means one parser family, one mental model.
2. **Compactness.** S-expressions are denser than JSON for structured
   data; smaller files, faster parsing.
3. **Codemap as canonical IR works whether consumed by humans, AI
   tools, or compilers.** S-expressions are unambiguous and easy to
   round-trip.

(LCN files use `.lcn` extension. Direct file readability is a
secondary benefit per ADR 0027, not the primary design driver.)

## Example

```lcn
(模块 ling_std.core
  (函数 swap
    (参数 [(a Int) (b Int)])
    (返回 Unit)
    (效应 [])
    (意图 "原地交换两个整数。\n\n**为什么不做泛型**: `swap<T>` 在 v0.0.x 被砍掉,理由是 codemap 暴露了所有 call site,AI 看到 monomorphic 版本足够。")
    (调用方 [sort sort_desc test_swap_basic])
    (示例 [(输入 "a=1, b=2" 输出 "a=2, b=1")])
  )
)
```

This single example shows the **structured + narrative** split:

- **Structured fields** (schema-enforced):
  - `参数` — typed parameter list
  - `返回` — return type
  - `效应` — effect set (empty `[]` here means pure)
  - `调用方` — reverse call graph (who calls this function)
- **Narrative fields** (CommonMark + extensions, freeform):
  - `意图` — design intent, including rationale ("why no generics")
  - `示例` — example inputs/outputs

The narrative fields are the key differentiator from a pure
graph-based IR (like [[entities/zerolang]]'s `zero.graph`). They let
designers embed *why* alongside *what* in a way the schema validates
structurally while the narrative is freeform.

## Bilingual keywords (extension to standard S-exp)

Ling's S-expression-based syntax family adds a bilingual layer:
Chinese and English keywords are the **same** `TokenKind` variant.

```
让, let        → KwLet
函数, fn       → KwFn
模块, module   → KwModule
返回, return   → KwReturn
如果, if       → KwIf
另则, else     → KwElse
模式           → KwMatchArm
...
```

Parser output uses Chinese for user-facing text (LCN). One tokenizer
handles both.

## Comparison to other S-expression-based formats

| Format | Origin | Notes |
|---|---|---|
| **Lisp/Scheme S-exp** | 1958, McCarthy | the canonical S-exp; pair of parens with atoms |
| **Clojure EDN** | 2007 | extensible; adds tagged literals, sets, symbols |
| **Racket `#lang` S-exp** | 2006 | language-oriented; each `#lang` defines its own S-exp semantics |
| **Fennel / Janet** | modern Lisp-dialects | Lua-host and C-host respectively |
| **Wasm text format (WAT)** | 2017 | S-exp-based; designed for binary WebAssembly |
| **LCN** | 2026, jiangh_hnr | bilingual Chinese-English; integrates with `.ling` source; codemap-specific fields |

LCN is the only one in this list that combines bilingual keywords +
codemap-specific narrative fields + a paired source format.

## Trade-offs

| Pro | Con |
|---|---|
| One parser family for source + codemap | S-expressions have less tooling than JSON (no built-in pretty-printer libraries) |
| Compact, unambiguous | Less readable to humans unfamiliar with parens |
| Easy to round-trip and diff | Narrative fields can hide complexity ("write design in markdown inside the data") |
| Bilingual keywords | Tooling support is custom (no off-the-shelf JSON/YAML editors help) |
| Internal consistency | Lacks a schema-validator ecosystem as mature as JSON Schema |

The trade-off is acceptable for Ling because (a) the audience is
agents (not humans) and agents prefer structure, (b) the codemap
schema is enforced by the daemon, not by a separate validator, and
(c) the design phase explicitly favors "internal consistency with
source" over "AI direct file readability" (ADR 0027).

## How LCN is consumed

- **Compiler:** reads `.lcn` files via `FileBackend` when daemon is
  unavailable, or queries the daemon's in-memory codemap via
  `DaemonBackend` (per ADR 0024).
- **MCP server:** exposes tools like `ling_query_types`,
  `ling_query_effects`, `ling_query_callers`, `ling_review_diff`. Each
  tool is a thin wrapper over a codemap query.
- **LSP server:** receives requests like "go to definition" →
  delegates to `ling query definition` → returns codemap-derived
  result → protocol-shaped response.
- **AI agents (the primary consumer per ADR 0027):** never read
  `.lcn` directly; always go through MCP/LSP tools. Direct file I/O
  is reserved for the design proposal phase.
- **Humans (rare):** can read `.lcn` files to understand structure,
  but the recommended path is also `ling_query_*` and `ling_review`.

## Cross-references

- [[entities/ling-lang]] — the implementation
- [[concepts/codemap-as-design-surface]] — LCN is the codemap's
  serialization format
- [[concepts/effect-system-pure-first]] — effects are LCN-structured
  fields
- [[concepts/graph-native-programming]] — Zerolang's graph IR is the
  alternative choice (no human-readable equivalent of LCN)
- [[concepts/program-graph-store]] — Zerolang's binary store
- [[concepts/projection-source-view]] — Zerolang's `.0` text
  projection has narrower scope than Ling's LCN
- [[entities/mcp]] — LCN is consumed via MCP tools, not direct
  file I/O
- [[comparisons/ai-first-programming-languages]] — full comparison
