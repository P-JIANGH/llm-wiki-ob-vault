---
title: Ling (灵)
created: 2026-06-18
updated: 2026-06-18
type: entity
tags: [programming-language, agent, agent-first, rust, llvm, open-source, framework, architecture, design-pattern, agent-design, mcp, lsp, effect-system, bilingual, chinese]
sources: [raw/articles/ling-lang-2026.md]
confidence: high
---

# Ling (灵) — AI-First Bilingual Programming Language

> **AI 优先、人类其次。** Ling is an AI-first, Chinese-English
> bilingual programming language. The codemap (LCN — Ling Canonical
> Notation) is the canonical IR; source code is a projection of it.
> Built by the wiki maintainer (`jiangh_hnr` on gitcode).

- **Repo:** `git@gitcode.com:jiangh_hnr/ling-lang.git`
- **Version (this clone):** v0.0.6 (Cargo.toml; effect-system milestone)
- **License:** MIT
- **Status:** experimental, pre-1.0 — design phase complete (27 ADRs
  locked), implementation in progress (v0.0.6 = effect-system baseline)
- **Web:** https://ling-lang.dev
- **Implementation:** Rust 2021, targeting LLVM 20
- **Install (AI-first):** `curl -sSL https://ling-lang.dev/install | sh`
  — daemon runs in background, MCP auto-registered
- **Install (Rust dev):** `git clone ... && cargo install ling`

## What It Is

Ling is a programming language designed so that **AI agents are the
primary authors and readers of source code**; humans are reviewers.
Three commitments follow from this:

1. **AI-first, human-second.** Not a "human-first with AI support" or
   "dual first-class" — single-customer choice, with all the design
   implications that follow.
2. **Codemap is the canonical IR.** Source code is a projection of
   codemap, not the other way around. Codemap is bidirectional
   (code → codemap, codemap → code), regenerable, schema-enforced,
   and gitignored (derived, like `target/`).
3. **AI consumes codemap via MCP/LSP tools**, not by direct file I/O.
   The `.lcn` files are a serialization target, not the primary AI
   interface (ADR 0027).

The most distinctive feature compared to other AI-first languages
(see [[entities/zerolang]]): Ling's canonical IR is **document-shaped**
(LCN, S-expression, with structured + narrative fields), whereas
Zerolang's is **graph-shaped** (zero.graph). The choice cascades
through everything: edit surface, MCP/LSP design, human review style.

## L1-L4 Architecture

```
L1 Strategic  Naming / version path / AI-first       0001–0003
L2 Language    Type system / memory / effects / form  0004, 0005, 0012–0015
L2.5 Codemap   LCN format / schema / sync / AI access        0006–0011, 0024–0027
L3 Compiler    Frontend / MIR / error recovery / incremental  0016–0020
L4 Backend     LLVM / Cranelift / wasm / signing              0023
L4 Quality     Test strategy / perf budget / CI gates         0021, 0022
```

The 27 ADRs are **immutable** — to reverse, write a new ADR that
supersedes. The `.harness/docs/ai-first-checklist.md` is a hard-rule
gate on every PR.

## The Compiler Pipeline (κᵧ)

```
Source (.ling) → Scanner (bilingual, indentation-aware)
              → Tokens (per-line tokenize_line)
              → Parser (indent → S-exp, type/symbol resolution)
              → AST (parse-time, discarded)
              → Codemap extractor
              → Codemap (CANONICAL IR; in-memory + .ling/codemap/;
                         daemon-owned, regenerable, gitignored)
              → MIR derivation (per backend: LLVM, Cranelift, wasm)
              → Backend → artifact (.ll / .o / .wasm / binary)
```

This is the **strongest possible form of "codemap is the design
surface"** — the AI consumes exactly what the compiler uses. The
trade-off: codemap schema is the highest-stakes contract in the
project, and implementation effort is higher than traditional
pipelines initially.

## LCN — Ling Config Notation (S-Expression Format)

Same syntax family as `.ling` source. Files use `.lcn` extension. The
same parser handles both (modulo codemap-specific fields). Codemap
fields are both structured (types, signatures, effects, call graph
edges, schema-enforced) and narrative (`intent_markdown`,
`design_notes`, `examples`, CommonMark + extensions).

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

The narrative `意图` field is the key differentiator from pure
graph-based IRs (like [[entities/zerolang]]'s `zero.graph`). It lets
designers embed *why* alongside *what*, in a way that the codemap
schema can validate structurally while the narrative is freeform.

## Effect System — Pure-First, Short-Tag (组合 1)

Standard short-tag vocabulary: `!FS`, `!Net`, `!Clock`, `!Rand`,
`!Panic`, `!IO` (catch-all), `!pure` (optional explicit).

**Core rules:**
1. **Default = pure.** No tag = pure. Purity is *proven* by the
   reverse-check pass, not assumed.
2. **Purity is reverse-checked.** For any untagged function, the
   compiler scans the body for IO-tagged calls. If found, the
   function must be tagged.
3. **IO functions must declare a short tag** from the standard
   vocabulary.
4. **Codemap stores the full effect set** for every function.
5. **Effect subtyping:** v0.0.x is equal-or-disjoint; subtyping
   rules deferred to v0.1+.

The reverse-check is **finite and decidable** — implementable in
~1 week, vs multi-month research for full effect inference.

## Language Form — ι Integrated (ADR 0015)

Visual indentation + internal S-expression. The `.ling` source is
indentation-sensitive (2-space); the AST and codemap are S-expressions.
One parser family, three views.

**Bilingual keywords** are the **same** `TokenKind` variant — `让` and
`let` both map to `KwLet`. Twelve keyword pairs (模块/module, 函数/fn,
让/let, 可变/mut, 返回/return, 如果/if, 另则/else, 遍历/for, 在/in,
只要/while, 模式 (no English)). This is unique among the AI-first
languages known to the wiki.

## Daemon Model (ADR 0024) — Hybrid

```rust
trait CodemapBackend {
    fn lookup_symbol(&self, q: &SymbolQuery) -> Result<Vec<SymbolEntry>>;
    fn query_effects(&self, q: &EffectQuery) -> Result<Vec<EffectEntry>>;
    // ...
}
```

Two implementations: `DaemonBackend` (Unix socket / named pipe to
`ling daemon`, in-memory codemap) and `FileBackend` (reads
`.ling/codemap/<module>.lcn` from disk, no daemon required). Both
return identical `Result` types; the compiler is unaware of which is
in use. Used in: long-running AI sessions (daemon, fast) vs CI /
fresh dev (file, no daemon).

## Performance Budget (ADR 0022)

| Operation | v0.0.x floor | v0.1+ target |
|---|---|---|
| Incremental compile (1 line) | 200ms | 100ms |
| Codemap query | 20ms | 10ms |
| LSP/MCP round-trip | 40ms | 20ms |
| Single file analysis | 100ms | 50ms |
| Daemon startup | 1s | 500ms |
| Cold compile (10k LOC) | 20s | 10s |
| Memory (10k LOC) | 200MB | 100MB |

## AI Team Harness (6 reins)

The `.harness/` directory defines a 6-role team with an orchestrator:

- **strategist** — L1 strategic decisions
- **language-designer** — L2 language-layer ADRs
- **codemap-architect** — L2.5 codemap ADRs
- **compiler-engineer** — L3 compiler pipeline
- **backend-engineer** — L4 backend (LLVM, Cranelift, wasm)
- **quality-engineer** — L4 quality (tests, perf, CI)

`.harness/docs/ai-first-checklist.md` is a hard-rule gate on every
PR. `.harness/docs/adr-map.md` tracks per-rein ownership of ADR areas.

## Roadmap

```
v0.0.1  scanner + parser + codemap LCN renderer          ✅ done
v0.0.2  控制流 (if/else) + let 绑定 + 二元运算 + fib      ✅ done
v0.0.3  for/while/match + list types + 模块导入/导出       ⏳ next
v0.0.4  Option/ADT types + user-defined types
v0.0.5  mut bindings + region inference (区域推导 β)
v0.0.6  效应系统基础 !FS / !Net / !Clock                  ✅ done in Cargo.toml
v0.1.0  完整 type checker / MIR + LLVM 后端 + 泛型 + 可重现构建
v0.2.0  trait + Cranelift 后端
v0.3.0  完整效应 + wasm 后端 + codemap 稳定 schema
v1.0    生产可用: 全后端稳定 + 完整 stdlib + LSP + 包管理
```

Note: `Cargo.toml` is at v0.0.6 and `effect-demo.ling` references
v0.0.6 with working `!FS` tags — so the effect-system milestone is
done. README's "v0.0.3 next" status block is slightly stale.

## Hard Engineering Rules (from AGENTS.md)

- **No `unwrap()` / `expect()`** in non-test code — emit a `Diagnostic` instead.
- **ADRs are immutable.** Reverse = new ADR that supersedes.
- **Bilingual keywords** are the same `TokenKind` variant; one tokenizer.
- **Indentation-aware parsing** (2-space); `split_logical_lines()` tracks `indent` per line.
- **Per-line tokenization** — `tokenize_line()` called per logical line.
- **Parser always returns a `Module`** (never panics). Unrecoverable
  sections become `Stmt::Invalid`; errors accumulate in `DiagnosticBag`.
- **No GC, ownership-based memory** via region inference.
- **AI-first checklist gate** on every PR.

## Key Concepts (each has a wiki page)

- **[[concepts/codemap-as-design-surface]]** — the core thesis
  (codemap is canonical, source is projection)
- **[[concepts/effect-system-pure-first]]** — 组合 1 (pure-first +
  short-tag + reverse-check)
- **[[concepts/lcn-s-expression-format]]** — LCN as codemap
  serialization (S-expression, .lcn extension)

## Relationships

### Direct comparison
- [[comparisons/ai-first-programming-languages]] — the comparison
  page that pairs this with [[entities/zerolang]] and others

### Related entities
- [[entities/zerolang]] — the other known AI-first programming
  language; graph-based IR vs Ling's document-based IR
- [[entities/12-factor-agents]] — shares the "AI-first / context-engineering"
  posture; Factor 5 (own your context window) is the policy-level cousin
  of codemap-as-IR
- [[entities/mcp]] — the *primary* AI access pattern to codemap
  (ADR 0027), not just a nice-to-have
- [[entities/pi-coding-agent]] — analogous split (7 tools, 4 modes)
  at the agent-harness layer
- [[entities/oh-my-openagent]] — agent harness with maximum-function-set
  + Hook philosophy; Ling attacks the same problem at the
  *language layer* with a *minimum + codemap* design

### Related concepts
- [[concepts/codemap-as-design-surface]]
- [[concepts/effect-system-pure-first]]
- [[concepts/lcn-s-expression-format]]
- [[concepts/agent-loop-architecture]] — `ling query *` and MCP tools
  implement a narrow agent loop for code authoring
- [[concepts/agent-design-principles]] — Ling's 6 hard indicators of
  safe delegation are first-class design principles
- [[concepts/context-engineering]] — codemap is context-engineering
  at the program level: structured + narrative fields
- [[concepts/graph-native-programming]] — Zerolang's cousin thesis
- [[concepts/semantic-patch-editing]] — Zerolang's edit primitive;
  Ling uses MCP tools instead of patch operations
- [[concepts/program-graph-store]] — Zerolang's program database;
  Ling's codemap is document-shaped, not graph-shaped
- [[concepts/projection-source-view]] — Zerolang's projection model;
  Ling's `.ling` source is also a projection of codemap but the
  design is bidirectional (codemap → code is first-class)

## Source

- `raw/articles/ling-lang-2026.md` (this clone, v0.0.6)
- `F:\ling-lang\README.md`, `F:\ling-lang\AGENTS.md`
- `F:\ling-lang\Cargo.toml` (v0.0.6)
- `F:\ling-lang\examples\*.ling` (10 example programs)
- 6 pivotal ADRs: 0002, 0006, 0007, 0013, 0016, 0024, 0027
- `.harness\` 6 reins + docs
