---
title: Zerolang
created: 2026-06-18
updated: 2026-06-18
type: entity
tags: [programming-language, agent, agent-first, graph-native, framework, open-source, agent-framework, agent-loop, tool-calling, typescript, rust, c, architecture, design-pattern, agent-design]
sources: [raw/articles/zerolang-2026.md]
confidence: medium
---

# Zerolang

> **The programming language for agents.** Graph-native, by [[entities/vercel-labs]].
> `zero.graph` is the program. `.0` files are projections of it. Edit
> through `zero patch`. — `vercel-labs/zerolang`

- **Repo:** `vercel-labs/zerolang`
- **Version (this clone):** v0.3.4 (workspace `package.json`)
- **License:** Apache-2.0
- **Status:** experimental, pre-1.0 — "expect breaking changes, rough edges,
  and security issues. Run it in isolated workspaces, not against
  production systems or sensitive data" (README)
- **Web:** https://zerolang.ai
- **Install:** `curl -fsSL https://zerolang.ai/install.sh | bash`
- **Agent bootstrap:** `npx skills add vercel-labs/zerolang`

## What It Is

Zerolang is a graph-native programming language **explicitly designed for
agents**. The semantic graph (`zero.graph`) is the program database; the
agent's normal authoring surface is a set of graph operations
(`zero query`, `zero patch`, `zero check`, `zero test`, `zero run`).
`.0` files exist as human-readable projections — reviewable, bidirectionally
syncable, but **not** the normal agent write surface.

It is, in a precise sense, an attempt to redesign the programming
language itself around the agent's edit surface. The agent no longer
writes text and hopes the compiler accepts it — the agent queries the
graph and submits a *checked* semantic patch, which the compiler
accepts or rejects before the store is written.

## Architecture (one-paragraph)

A graph-first package contains `zero.toml` (manifest), `zero.graph`
(checked binary store, content-hashed), and `src/main.0` (readable
projection). The normal package compile path is:

```
zero.graph → repository graph tables
  → semantic validation → type checking
  → MIR + backend facts → direct codegen → artifact
```

`zero.graph` is loaded directly — no parse-first stage on the normal
path. This is the same shape as a parse-first pipeline (lexer → AST →
name resolution → type check → IR → codegen) with fewer stages and a
graph input instead of text.

The 8 native build targets are `darwin-arm64`, `darwin-x64`,
`linux-arm64`, `linux-musl-arm64`, `linux-musl-x64`, `linux-x64`,
`win32-arm64.exe`, `win32-x64.exe`. The C-implemented compiler lives
at `native/zero-c/`; a `bin/zero` wrapper execs the local native
compiler at `.zero/bin/zero`.

## Key Concepts (each has a wiki page)

- **[[concepts/graph-native-programming]]** — the core thesis:
  semantic graph is the program database, not text.
- **[[concepts/program-graph-store]]** — `zero.graph` as a binary,
  content-hashed, shape-validated store with explicit
  projection/sync boundary.
- **[[concepts/semantic-patch-editing]]** — checked graph patches
  (`--expect-graph-hash`, `--expect`, typed ops, `replaceFunctionBody`,
  `replaceBlockBody`) vs text diffs.
- **[[concepts/projection-source-view]]** — `.0` files as the
  reviewable, bidirectionally-syncable human surface; export /
  import / verify-projection / status, content-hash drift detection.

## CLI Surface (graph-first agent work)

Core commands (defaults to current directory):

```
zero init [--template cli|package]
zero query [--fn <name>] [--find <substr>] [--refs <name>] [--calls <name>]
zero view --fn <name>
zero patch --op '<op>' | --check-only | --dry-run
zero check
zero test
zero run -- <args>
zero build --emit exe|obj|llvm-ir --target <target> --out <path>
zero diff
zero inspect --json          # node IDs, graph hashes, interfaceFingerprints,
                             # targetToolchains, usedStdlibHelpers,
                             # memoryBudgets, releaseTargetContract
zero size --json
zero mem --json
zero targets --json
zero doctor --json
zero skills [get <name>]     # version-matched bundled skills
zero explain <diagnostic-code>
zero fix --plan
```

Patch operations cover surgical in-function edits
(`--replace-in-fn <fn> --old <text> --new <text>`, Edit semantics) up to
bulk helper creation (`upsertFunction ... end`) and whole function bodies
(`--replace-fn <fn> --body-file -` with a heredoc).

## The Agent Loop (per day)

For most package work:

```sh
zero query                   # ask the graph for facts
zero patch --op help         # discover available operations
zero patch --op 'addMain'    # checked semantic edit
zero check
zero test
zero run -- <args>
```

When a human wants to review projection text:

```sh
zero export
zero verify-projection
```

When a human intentionally edited a projection:

```sh
zero import
zero check
```

## Language Surface (highlights)

- **Functions:** `fn add(x: i32, y: i32) -> i32 { return x + y }`
- **Fallible functions:** use `raises` and `check` — no hidden exceptions
  ```zero
  fn requirePositive(value: i32) -> i32 raises [Invalid] {
      if value > 0 { return value }
      raise Invalid
  }
  ```
- **Explicit capabilities:** programs receive capabilities explicitly
  (e.g. `world: World`) — no ambient global runtime access. The
  33-module stdlib documents effects and target support per helper.
- **Blocks as graph nodes:** `while`, `match`, `if/else` all lower to
  explicit graph control-flow nodes. Agents can patch a whole function
  body or a specific block body
  (`replaceBlockBody #block_then_1234 ...`).
- **Compile-time facts:** a small metadata surface for target and type
  facts (integer/Bool/enum static values, `compileTime`,
  `target.pointerWidth`, `fieldType`, `hasEnumCase`).
- **Modules:** `src/foo.0` defines module `foo`; `src/foo/mod.0`
  defines directory module `foo`. Import cycles and duplicate
  public exports are diagnosed before build output.

The 33 stdlib modules are: `args`, `ascii`, `cli`, `codec`, `collections`,
`crypto`, `csv`, `diag`, `env`, `fmt`, `fs`, `http`, `inet`, `io`, `json`,
`log`, `math`, `mem`, `net`, `parse`, `path`, `proc`, `rand`, `regex`,
`search`, `sort`, `str`, `testing`, `text`, `time`, `toml`, `unicode`,
`url`. The `stdlib` skill is ~39 KB of full signature reference,
including ready-made validators (`std.time` covers RFC 3339 incl. leap
seconds, `std.inet` covers IPv4/IPv6/hostname, `std.regex` is ECMA
subset, `std.unicode` is strict UTF-8).

## Runtime Goals (non-negotiable)

The graph-first model should reduce agent guessing **without** relaxing:
- token-efficient inspection
- low memory usage
- fast startup and builds
- low runtime latency
- explicit capabilities
- small, dependency-free artifacts

These are inspectable per-graph-input via `zero size --json`,
`zero mem --json`, and the benchmark docs.

## Version-Matched Skills (key agent-facing pattern)

The thin external `vercel-labs/zerolang` skill is a discovery stub only.
The compiler bundles version-matched skills — fetch each topic at most
once per session (content is fixed for a given binary):

```sh
zero skills
zero skills get agent       # ~4 KB
zero skills get language    # ~6 KB
zero skills get graph       # ~9 KB
zero skills get diagnostics # ~4 KB
zero skills get packages    # ~5 KB
zero skills get builds      # ~5 KB
zero skills get testing     # ~3 KB
zero skills get stdlib      # ~39 KB
zero skills get stdlib --topic std.time   # one section only
```

If multiple Zero binaries exist, use the one that will run the project.

## Things Intentionally Not Hidden

- hidden method registries
- vtables
- reflection
- ambient heap allocation
- process-global cleanup lists

When a program uses owned resources, allocator state, hosted I/O, network
capability, or C interop, those facts should be visible through graph
inspection and diagnostics.

## Boundaries

- **Pre-1.0, experimental.** Breaking changes are expected; the
  contributor policy (AGENTS.md) says explicitly: "Do not preserve
  legacy behavior by default. Prefer the clearer agent-facing design
  over compatibility shims, migration layers, or carrying old paths
  forward."
- **Not for production.** No security audit; isolate in disposable
  workspaces.
- **C-implemented compiler** under `native/zero-c/` — the agent-facing
  CLI is in front of a C backend, not a self-hosted VM.

## Repository Layout (this clone)

```
D:\zerolang\
├── AGENTS.md           # contributor + safety policy
├── README.md           # the thesis + the daily loop
├── package.json        # v0.3.4, pnpm workspace
├── native/zero-c/      # C-implemented compiler
├── bin/zero            # wrapper → .zero/bin/zero
├── std/                # 33 stdlib modules
├── examples/           # 165 .graph + .0 example pairs
├── docs/articles/      # human-readable reference
│   ├── concepts/{graph-architecture, projections, semantic-vs-text, compile-path}.md
│   ├── modules/        # one .md per stdlib module
│   ├── cli-reference.md
│   ├── language-reference.md
│   ├── primitives.md
│   ├── testing.md
│   ├── package-manifest.md
│   ├── standard-library.md
│   ├── c-interop.md
│   ├── cross-compilation.md
│   ├── diagnostics.md
│   ├── target-capabilities.md
│   ├── optimization.md
│   ├── examples.md
│   ├── learn-zero.md
│   └── install.md, getting-started.md, building-from-source.md, benchmarks.md
├── skills/zero/SKILL.md
├── skill-data/         # 8 version-matched bundled skills
├── extensions/vscode/
├── benchmarks/{rosetta, zero}/
├── evals/
├── conformance/        # ~50 conformance fixtures + agent-surface tests
├── tests/
└── scripts/            # pnpm scripts: agent:checks, conformance, etc.
```

## Relationships

### Related entities
- [[entities/vercel-labs]] — the organization behind it
- [[entities/12-factor-agents]] — shares the "agent-first / context-engineering"
  posture; Factor 5 (own your context window) and Factor 13 (pre-fetch vs
  ask) are explicit cultural cousins
- [[entities/pi-coding-agent]] — analogous split: 7 tools, 4 modes,
  ~3,100 LOC AgentSession. Zerolang attacks the same problem at the
  *language* layer instead of the *agent harness* layer
- [[entities/oh-my-openagent]] — agent harness with maximum-function-set
  + Hook philosophy; Zerolang is the minimum-surface-language
  counterpart (`zero patch` ops are deliberately narrow)
- [[entities/langgraph]] — graphs the *agent's* state machine. Zerolang
  graphs the *program being authored*. Different layer, same word.
- [[entities/claude-code]] — the agent harness that would most naturally
  drive a `zero patch` loop

### Related concepts
- [[concepts/graph-native-programming]] — the core thesis
- [[concepts/program-graph-store]] — `zero.graph` as a binary store
- [[concepts/semantic-patch-editing]] — checked graph patches
- [[concepts/projection-source-view]] — `.0` files as human review surface
- [[concepts/agent-loop-architecture]] — Zerolang is a *narrow* agent
  loop (`query → patch → check/run`) for a single domain (code authoring)
- [[concepts/context-engineering]] — `zero query` is exactly the
  pre-fetch-vs-ask pattern from 12-Factor Factor 13
- [[concepts/agent-design-principles]] — Zerolang embodies several
  principles: tool ergonomics, deterministic inspection/repair, regular
  patterns over syntactic convenience

## Source

- `raw/articles/zerolang-2026.md` (this clone, v0.3.4)
- `D:\zerolang\README.md`, `D:\zerolang\AGENTS.md`
- `D:\zerolang\docs\articles\concepts\{graph-architecture, projections,
  semantic-vs-text, compile-path}.md`
- `D:\zerolang\docs\articles\{cli-reference, language-reference,
  getting-started, install}.md`
- `D:\zerolang\skills\zero\SKILL.md`
