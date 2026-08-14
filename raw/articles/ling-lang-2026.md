---
source_url: git@gitcode.com:jiangh_hnr/ling-lang.git (and https://ling-lang.dev)
ingested: 2026-06-18
sha256: 9b8a0e6bcda566eb407bd6ebc22ea17f441e78a33646b6cff93f3c763751dbe2
_width: wide
---

# 灵 (Ling) — AI-First Bilingual Programming Language (v0.0.6)

> Curated extract of `F:\ling-lang` (the user's own repository, v0.0.6,
> MIT license, Rust 2021, targeting LLVM 20). Source-of-truth files
> consulted: `README.md`, `AGENTS.md`, `Cargo.toml`, `examples/*.ling`,
> and 6 pivotal ADRs from `docs/superpowers/decisions/`:
> **0001** (rename yao→ling), **0002** (L1 strategic layer — AI-first,
> safe delegation), **0006** (codemap as design surface, paradigm shift),
> **0007** (codemap format LCN — S-expression), **0013** (effect system
> pure-first, short-tag), **0016** (L3-1 compiler pipeline κᵧ —
> codemap-as-IR), **0022** (performance budget), **0024** (codemap
> daemon model, hybrid), **0027** (AI codemap access via MCP/LSP tools).

## 1. The Thesis (ADR 0002)

> "Let AI write a language that AI finds ergonomic — surely that's
> better than humans designing for humans." — author of ADR 0002

The L1 strategic layer chose **A — AI-first** over two alternatives:
- **B (human-first, AI also friendly)** — rejected because it
  compromises the AI-first thesis
- **C (dual first-class)** — rejected because "trying to be equally
  good for both is a compromise that serves neither"

The thesis: **AI Agent is the primary user; humans are reviewers**.
This is a deliberate single-customer choice. From it, 6 "hard
indicators of safe delegation" follow:

| Indicator | When | Implementation |
|---|---|---|
| Auditability (humans can review AI output) | v0.0.1 | explicit syntax, AST ≈ source |
| Predictable performance (no GC, no lazy) | v0.0.1 | ownership-based, no GC |
| Explicit over implicit (no hidden behavior) | v0.0.1 | AST ≈ syntax |
| Reproducible builds | **v0.1 (mandatory)** | ADR 0023 |
| Explicit side effects | **v0.1 (mandatory)** | ADR 0013 |
| Static assertions (`@assert no_io`) | v0.2+ | pending |

The 1.0 is a long journey, not a small accumulation. v0.1 is a serious
milestone (alpha → beta → stable phasing expected).

## 2. The Codemap Paradigm (ADR 0006, 0016, 0027)

The single most distinctive idea. Three things flip from the
parse-first mainstream:

| Old paradigm | New paradigm |
|---|---|
| Source code is the source of truth | **Codemap is the source of truth** |
| Compiler is the primary interface | **Codemap is the primary interface; compiler is the verifier** |
| Self-describing index is a build artifact | **Codemap is the design surface, persisted and live-synced** |

**Codemap is bidirectional:**
- code → codemap: continuous extraction (synced as source edits happen)
- codemap → code: AI or human edits codemap; source is regenerated
- Both directions are first-class

**Codemap combines structured + narrative fields:**
- **Structured fields** (types, signatures, effects, call graph edges):
  machine-queryable, schema-enforced
- **Narrative fields** (`intent_markdown`, `design_notes`, `examples`):
  human-readable, embedded CommonMark + extensions
- AI uses structured fields for queries; reaches for narrative when
  intent matters

**Codemap is the AI's working memory.** Per ADR 0027 (clarification):
> "AI Agent 对 Codemap 写法并不一定非要学习,因为我们定义了工具链
> MCP/LSP,可以通过 tools 直接给 AI 查询/编辑。"

The primary AI consumption pattern is **via MCP/LSP tools**, not by
direct `.lcn` file I/O. Direct file I/O is reserved for the design
proposal phase. The implication: build great MCP tools, not pretty
`.lcn` readers.

## 3. L1-L4 Architecture

```
L1 Strategic  Naming / version path / AI-first       0001–0003
L2 Language    Type system / memory model / effects / form  0004, 0005, 0012–0015
L2.5 Codemap   LCN format / schema / sync / AI access        0006–0011, 0024–0027
L3 Compiler    Frontend / MIR / error recovery / incremental  0016–0020
L4 Backend     LLVM / Cranelift / wasm / signing              0023
L4 Quality     Test strategy / perf budget / CI gates         0021, 0022
```

## 4. The Compiler Pipeline (κᵧ, ADR 0016)

```
Source (.ling) → Scanner (bilingual, indentation-aware)
              → Tokens (per-line tokenize_line, not flat stream)
              → Parser (indent → S-exp, type/symbol resolution)
              → AST (parse-time, discarded after extraction)
              → Codemap extractor
              → Codemap (CANONICAL IR, in-memory + .ling/codemap/,
                         daemon-owned, regenerable, gitignored)
              → MIR derivation (per backend: LLVM, Cranelift, wasm)
              → Backend → artifact (.ll / .o / .wasm / binary)
```

**What lives where (and version control):**

| Stage | Lives in | Lifetime | Version-controlled? |
|---|---|---|---|
| Source code | `.ling` files | Permanent | **Yes (git)** |
| AST | Memory | Per-parse (discarded) | No |
| **Codemap** | Memory + `.ling/codemap/` | Persistent | **No** (regenerable) |
| MIR | Memory | Per-codegen | No |
| Backend artifacts | `target/` | Build-time | No |
| Optional slim codemap | dist | Optional, opt-in | Bundled in dist |

Codemap is gitignored — like `target/` in Rust or `node_modules/` in
JS. The repository stays source-dominated. Full codemap is **never
shipped**; slim codemap is opt-in for AI agents in sandboxes.

## 5. LCN — Ling Config Notation (ADR 0007)

S-expression-based format. Same syntax family as `.ling` source. Files
use `.lcn` extension. The same parser can be used for both (modulo
codemap-specific fields).

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

Codemap fields include: types, signatures, effects, call graph edges,
`intent_markdown`, `design_notes`, `examples`. Structured fields are
schema-enforced; narrative fields are CommonMark + extensions.

## 6. Effect System — Pure-First, Short-Tag (ADR 0013, 组合 1)

Standard short-tag vocabulary:

| Tag | Meaning | Examples |
|---|---|---|
| `!FS` | File system | file_read, file_write, stat, mkdir |
| `!Net` | Network | http_get, socket_*, dns |
| `!Clock` | System clock / time | now, sleep |
| `!Rand` | Randomness | random_int, uuid |
| `!Panic` | Can panic | assert, divide-by-zero |
| `!IO` | Catch-all (discouraged) | only when truly needed |
| `!pure` | Optional explicit purity (same as no tag) | style choice |

**Core rules:**
1. **Default = pure.** No tag = pure. Purity is *proven*, not assumed.
2. **Purity is reverse-checked.** For any function without an effect
   tag, the compiler scans the body for any IO-tagged call. If found,
   the function must be tagged with that effect.
3. **IO functions must declare a short tag** from the standard vocabulary.
4. **Codemap stores the full effect set** for every function.
5. **Effect subtyping:** for v0.0.x, effects are equal-or-disjoint.
   Subtyping rules deferred to v0.1+.

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
```

The reverse-check algorithm is **finite and decidable** — the function
body is finite, the codemap is finite, no inference involved. This
makes it implementable in ~1 week vs the multi-month research of full
effect inference.

## 7. Language Form — ι Integrated (ADR 0015)

Visual indentation + internal S-expression. The `.ling` source is
indentation-sensitive (2-space indent); the AST and codemap are
S-expressions; the LCN serialization is also S-expressions. One parser
family, three views.

```ling
模块 斐波那契 =
  函数 斐波那契数 [n] -> Int =
    如果 小于 n 2 =
      返回 n
    另则 =
      让 n1 = 减 n 1
      让 n2 = 减 n 2
      让 a = 斐波那契数 n1
      让 b = 斐波那契数 n2
      返回 加 a b

  函数 主函数 [] -> Int =
    返回 斐波那契数 10
```

**Bilingual keywords** are **the same** `TokenKind` variant. `让` and
`let` both map to `KwLet`. Parser output uses Chinese for user-facing
text (LCN). 12+ keyword pairs:

| 中文 | English | 用途 |
|------|---------|------|
| 模块 / module | module | 模块定义 |
| 函数 / fn | fn | 函数定义 |
| 让 / let | let | 变量绑定 |
| 可变 / mut | mut | 可变修饰 |
| 返回 / return | return | 返回语句 |
| 如果 / if | if | 条件分支 |
| 另则 / else | else | 否则分支 |
| 遍历 / for | for | 循环遍历 |
| 在 / in | in | 范围迭代 |
| 只要 / while | while | 条件循环 |
| 模式 | (no English) | match arm |

## 8. Type System & Region Inference (ADR 0004, 0012)

- **Hybrid type system** (ADR 0004): explicit declarations preferred
  for public surfaces; inference for local bindings.
- **Generics deferred to v0.0.4+** (ADR 0005): the codemap exposes all
  call sites, so AI sees monomorphic versions, which is enough.
- **Region inference β** (ADR 0012): no GC, ownership-based memory
  management. Codemap is arena-allocated using region lifetimes.
  Per-module lazy loading keeps memory bounded (~3-5 MB for 10k LOC
  program).

## 9. Daemon Model (ADR 0024) — Hybrid

```
trait CodemapBackend {
    fn lookup_symbol(&self, q: &SymbolQuery) -> Result<Vec<SymbolEntry>>;
    fn query_effects(&self, q: &EffectQuery) -> Result<Vec<EffectEntry>>;
    // ...
}
```

Two implementations:
- **`DaemonBackend`** — connects to `ling daemon` via Unix socket /
  named pipe (in-memory codemap, fast)
- **`FileBackend`** — reads `.ling/codemap/<module>.lcn` from disk
  (no daemon required, used in CI / fresh dev environments)

Both return identical `Result` types. The compiler is unaware of which
is in use.

## 10. Performance Budget (ADR 0022)

| Operation | v0.0.x 地板 | v0.1+ 真指标 |
|---|---|---|
| 增量编译 (change one line) | 200ms | 100ms |
| Codemap 查询 | 20ms | 10ms |
| LSP/MCP round-trip | 40ms | 20ms |
| 单文件分析 | 100ms | 50ms |
| Daemon 启动 | 1s | 500ms |
| 冷编译 (10k LOC) | 20s | 10s |
| Memory (10k LOC) | 200MB | 100MB |

CI gates lock the v0.0.x floor; v0.1+ contracts are real.

## 11. AI Team Harness (6 reins)

The `.harness/` directory defines a 6-role team with an orchestrator.
Per-rein ownership of ADR areas is tracked in `.harness/docs/adr-map.md`:

- **strategist** — L1 strategic decisions
- **language-designer** — L2 language-layer ADRs (type, region, effect, form)
- **codemap-architect** — L2.5 codemap ADRs (LCN, schema, sync, daemon)
- **compiler-engineer** — L3 compiler pipeline
- **backend-engineer** — L4 backend (LLVM, Cranelift, wasm)
- **quality-engineer** — L4 quality (tests, perf, CI)

`.harness/docs/ai-first-checklist.md` is a hard-rule gate: every PR
must pass the AI-first checklist (or explicitly justify why not). The
ADRs are **immutable** — to reverse a decision, write a new ADR that
supersedes it.

## 12. ADRs (the 27, summarized)

L1 Strategic (3): 0001 rename-yao-to-ling · 0002 AI-first safe-delegation ·
0003 versioning-path (v0.0.1 first, v1.0 long journey)
L2 Language (6): 0004 hybrid-type-system · 0005 generics-deferred · 0012
region-inference-β · 0013 effect-system-pure-first · 0014 codemap-schema-
evolution-σᵨ · 0015 language-form-integrated-ι
L2.5 Codemap (10): 0006 codemap-as-design-surface (paradigm shift) · 0007
codemap-format-LCN · 0008 codemap-narrative-extended-markdown · 0009
codemap-physical-layout · 0010 ai-review-surface · 0011 proposals-
directory · 0024 codemap-daemon-model-hybrid · 0025 codemap-sync-
granularity · 0026 metadata-schema-enforcement · 0027 ai-codemap-access-
clarification
L3 Compiler (5): 0016 compiler-frontend-codemap-as-IR-κᵧ · 0017
MIR-annotated-hybrid · 0018 error-recovery-and-diagnostics · 0019
incremental-compilation-codemap-hash · 0020 diagnostic-architecture-
streaming-codes
L4 Backend+Distribution (1): 0023 build-release-distribution
L4 Quality (2): 0021 test-strategy · 0022 performance-budget

## 13. Roadmap (from README/AGENTS.md)

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

Note: `Cargo.toml` version is `0.0.6` and `effect-demo.ling` references
`v0.0.6` with working `!FS` tags — so the project has reached the
effect-system milestone ahead of the documented v0.0.3-next framing.
The README's status block is slightly out of date.

## 14. Hard Engineering Rules (from AGENTS.md)

- **No `unwrap()` / `expect()`** in non-test code — emit a `Diagnostic` instead.
- **ADRs are immutable.** To reverse, write a new ADR that supersedes.
- **Bilingual keywords** are the same `TokenKind` variant; one tokenizer.
- **Indentation-aware parsing** (2-space); `split_logical_lines()` tracks `indent` per line.
- **Per-line tokenization** — `tokenize_line()` called per logical line,
  not a flat global token stream.
- **Parser always returns a `Module`** (never panics). Unrecoverable
  sections become `Stmt::Invalid` AST nodes; errors accumulate in
  `DiagnosticBag`.
- **No GC, ownership-based memory** via region inference.
- **AI-first checklist gate** on every PR.

## 15. Repository Layout (this clone)

```
F:\ling-lang\
├── Cargo.toml              # name=ling, version=0.0.6
├── README.md               # the thesis + L1-L4 table
├── AGENTS.md               # contributor + engineering rules
├── src/                    # 13 modules: main, lib, scanner, token, parser,
│                           #   ast, codemap, types, codegen, effect, mir,
│                           #   region, exhaustive, error
├── tests/                  # 10 integration test files
├── examples/               # 10 .ling examples (hello, fib, gcd, fizzbuzz,
│                           #   match, list, effect, ...)
├── docs/superpowers/
│   ├── decisions/          # 27 immutable ADRs (0001-0027)
│   ├── specs/              # language design spec
│   └── plans/              # implementation plan
├── .harness/
│   ├── reins/              # 6 reins (strategist, language-designer,
│   │                       #   codemap-architect, compiler-engineer,
│   │                       #   backend-engineer, quality-engineer)
│   ├── docs/               # adr-map, ai-first-checklist, code-standards
│   └── memory/             # shared team memory
├── .ling/                  # runtime data: codemap/, proposals/ (gitignored)
├── output/                 # build output
├── output.ll               # sample LLVM IR
└── target/                 # cargo build artifacts
```

## 16. Why This Matters for the Wiki

The wiki's domain is **Agentic System Design**. Ling is the **second**
known public language that explicitly redesigns the programming
language itself around the agent's edit surface (the first being
[[entities/zerolang]]). The contrast is the interesting part:

- **Zerolang:** `zero.graph` (binary, content-hashed graph store) is
  the program database; `.0` files are projections; agent edits via
  `zero patch` (typed ops + preconditions). **English only** so far.
  Agent *writes* the graph via tools.
- **Ling:** Codemap (LCN — S-expression format, regenerable) is the
  canonical IR; `.ling` source is a projection of codemap; agent
  interacts **via MCP/LSP tools**, not direct file I/O. **Bilingual
  Chinese-English keywords** at the source level. Codemap is the
  AI's working memory.

The pair answers the same question ("how should a language treat its
own agent-facing IR?") with three different choices:
- IR type: **graph** vs **document**
- Edit surface: **direct file I/O with patch** vs **MCP/LSP tools**
- Human review: **text projection (one-way export)** vs **codemap
  diff with design rationale (per ADR 0010)**

This is the perfect setup for `comparisons/ai-first-programming-languages.md`.

### Cross-references to existing wiki pages
- [[concepts/agent-loop-architecture]] — `ling query *` and MCP tools
  implement a narrow agent loop for code authoring
- [[concepts/agent-design-principles]] — Ling's 6 hard indicators of
  safe delegation are first-class design principles
- [[concepts/context-engineering]] — Codemap is context-engineering at
  the program level: structured + narrative fields, schema-enforced
- [[entities/12-factor-agents]] — Factor 5 (own your context window) is
  the policy-level cousin of codemap-as-IR
- [[entities/mcp]] — MCP is the *primary* AI access pattern to codemap
  (ADR 0027), not just a nice-to-have
- [[entities/zerolang]] — direct comparison (see Comparisons)
- [[concepts/graph-native-programming]] — Zerolang's thesis
- [[concepts/semantic-patch-editing]] — Zerolang's edit primitive
- [[concepts/program-graph-store]] — Zerolang's program database
- [[concepts/projection-source-view]] — Zerolang's projection model
