---
title: Codemap as Design Surface
created: 2026-06-18
updated: 2026-06-18
type: concept
tags: [architecture, design-pattern, agent, agent-first, programming-language, agent-design, mcp, lsp]
sources: [raw/articles/ling-lang-2026.md]
confidence: high
_width: wide
---

# Codemap as Design Surface

> **Codemap is the canonical IR. Source code is a projection of codemap.**
> Three things flip from the parse-first mainstream.

The "codemap as design surface" idea, formalized in **ADR 0006** of
[[entities/ling-lang]], is the most distinctive commitment in any
AI-first programming language known to the wiki. The original
paradigm shift framing:

| Old paradigm | New paradigm |
|---|---|
| Source code is the source of truth | **Codemap is the source of truth** |
| Compiler is the primary interface | **Codemap is the primary interface; compiler is the verifier** |
| Self-describing index is a build artifact | **Codemap is the design surface, persisted and live-synced** |

The author's framing of why:

> "AI Agent 工作流永远都是文档驱动的,所以设计优先显得尤为重要。
> Codemap 除了派生、亦可以作为比 Markdown 还好用的 AI 文档。AI 既
> 可以通过 Codemap 设计代码、可以根据代码派生 Codemap。"

## Why "design surface", not just "data structure"

The codemap is a **design surface**, not just a data structure,
because:

- It is **the interface AI uses to reason about the program.** A
  query like "what functions touch the filesystem?" returns from
  codemap, not from the parser + analyzer pipeline.
- It carries both **structured** (types, signatures, effects, call
  graph edges, schema-enforced) **and narrative** (`intent_markdown`,
  `design_notes`, `examples`, CommonMark + extensions) fields.
  Narrative is first-class, not a comment.
- It is **bidirectional** in the design sense: code → codemap and
  codemap → code are both first-class. You can author by editing
  source and re-extracting, *or* by editing codemap and regenerating
  source.

## Bidirectional sync (ADR 0006, 0025)

- **code → codemap:** Continuous extraction (codemap is synced as
  source edits happen; v0.0.4+ adds a daemon that keeps codemap
  in-memory)
- **codemap → code:** AI or human edits codemap; source is
  regenerated
- Both directions are first-class

Sync granularity is **statement + function** level (ADR 0025) —
invisible to the AI; AI just sees consistent codemap.

## The "structured + narrative" split

```
(function_entry
  ; structured (schema-enforced)
  (name "swap")
  (params [(a Int) (b Int)])
  (return Unit)
  (effects [])

  ; narrative (CommonMark + extensions)
  (意图 "原地交换两个整数。\n\n**为什么不做泛型**: `swap<T>` 在 v0.0.x 被砍掉,理由是 codemap 暴露了所有 call site,AI 看到 monomorphic 版本足够。")
  (示例 [(输入 "a=1, b=2" 输出 "a=2, b=1")])
)
```

This is the key differentiator from a pure graph-based IR like
[[concepts/program-graph-store]] (Zerolang's `zero.graph`). The
narrative fields let designers embed *why* alongside *what* — in a
way that the codemap schema validates structurally while the
narrative is freeform. The example above is from ADR 0007.

## AI access pattern (ADR 0027) — MCP/LSP, not direct file I/O

A later clarification (ADR 0027) re-framed how AI agents interact
with codemap. The original framing in ADR 0006 was "AI reads
codemap." The clarification:

> "AI Agent 对 Codemap 写法并不一定非要学习,因为我们定义了工具链
> MCP/LSP,可以通过 tools 直接给 AI 查询/编辑。AI 仅在设计阶段
> 可通过 Codemap 写设计。"

**The primary AI access pattern is via MCP/LSP tools**, not by
direct `.lcn` file I/O. Concretely:

| Phase | How AI reads codemap | How AI writes codemap |
|---|---|---|
| Design proposal | direct file I/O on `.lcn` (proposals graduate to ADRs) | direct file I/O (rare) |
| Normal coding | `ling_query_types`, `ling_query_effects`, `ling_query_callers`, `ling_review_diff` | goes through source → codemap extraction pipeline |
| Review | `ling_review` renders codemap diff + design explanation | (read-only) |

The implication: **build great MCP tools, not pretty `.lcn` readers.**
This is why MCP ([[entities/mcp]]) is a critical-path implementation
for Ling, not a nice-to-have.

## Relationship to [[concepts/graph-native-programming]]

Both Ling and [[entities/zerolang]] agree on the "canonical IR" idea;
they disagree on the shape of that IR and on the edit surface.

| Dimension | [[entities/zerolang]] (graph-native) | Ling (codemap) |
|---|---|---|
| Canonical IR | `zero.graph` (binary, graph) | codemap (LCN, S-expression, document-shaped) |
| Edit surface | `zero patch` (typed ops + preconditions) | MCP/LSP tools (`ling_query_*`, `ling_review_diff`) |
| Source projection | `.0` file (text, export on demand) | `.ling` file (always present, bidirectional) |
| IR persistence | binary, content-hashed, in-store | LCN text files, gitignored, daemon-owned |
| Human review style | text projection diff | codemap diff with design rationale (ADR 0010) |
| Narrative fields | none (no `intent_markdown` analogue) | first-class |
| Bilingual keywords | no (English only) | yes (Chinese ↔ English, same `TokenKind`) |

The shape choice cascades through everything. Graph IR is good for
**structural queries** ("what calls `write`?"); document IR is good
for **structural + narrative queries** ("what does `swap` *mean* and
why was generics deferred?").

## What this enables (Ling-side)

- **MCP/LSP become thin shells over codemap queries** (ADR 0016) —
  no separate query engine, no two-truths problem
- **AI tool results match compiler-internal results byte-for-byte** —
  single source of truth
- **Repository stays source-dominated** (codemap gitignored) — like
  `target/` in Rust
- **Codemap review = compiler-internal review** — humans and AI see
  the same data
- **Reproducible builds** (ADR 0023) — any agent with source can
  derive identical codemap

## What this costs

- **Codemap schema becomes the highest-stakes contract in the
  project.** If codemap has a bug, every downstream stage is
  affected. Mitigation: codemap is regenerable from source; `ling
  codemap rebuild` recovers.
- **Implementation effort higher than traditional pipelines
  initially.** One-time investment; long-term benefit (shared data
  structure).
- **All "compiler internals" thinking is now "codemap thinking"** —
  requires team upskilling.

## Cross-references

- [[entities/ling-lang]] — the implementation
- [[concepts/lcn-s-expression-format]] — the serialization format
- [[concepts/effect-system-pure-first]] — effects are first-class
  codemap fields
- [[concepts/graph-native-programming]] — the alternative thesis
  (Zerolang)
- [[concepts/program-graph-store]] — Zerolang's binary store
- [[concepts/projection-source-view]] — Zerolang's projection model
- [[concepts/agent-loop-architecture]] — `ling query *` and MCP tools
  implement a narrow agent loop
- [[concepts/context-engineering]] — codemap is context-engineering
  at the program level
- [[entities/mcp]] — the *primary* AI access pattern to codemap
- [[entities/12-factor-agents]] — Factor 5 (own your context window)
  is the policy-level cousin
- [[comparisons/ai-first-programming-languages]] — full comparison
