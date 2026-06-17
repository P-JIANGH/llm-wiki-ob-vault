---
title: DeepSeek-TUI Coordinator Pattern
created: 2026-05-04
updated: 2026-05-04
type: concept
tags: [deepseek, tui, multi-agent, git-worktree, sprint, coordinator, delegation, agent-swarm]
sources: [~/DeepSeek-TUI/TAKEOVER_PROMPT.md, ~/DeepSeek-TUI/v0.8.8-coordinator-prompt.md]
---

# DeepSeek-TUI Coordinator Pattern

A reusable **multi-agent git-worktree sprint pattern** for coordinating large DeepSeek-TUI releases across parallel workstreams. Documented in TAKEOVER_PROMPT.md (takeover protocol) and v0.8.8-coordinator-prompt.md (sprint decomposition).

## Core Principle

**Parent is coordinator, never implementer.**

The parent session:
- Decomposes the sprint into independent workstreams
- Creates git worktrees for isolation
- Spawns sub-agents (one per workstream, or multiple for large streams)
- Monitors progress via `agent_list` / `agent_result`
- Merges worktrees in dependency order
- Runs verification gates after each merge

The parent **never** reads files one-by-one or implements issues itself. If the parent finds itself doing sequential work on a topic for 3 turns, it delegates.

## Session Survival Rules

These rules keep the parent small enough to coordinate across a sprint:

| Rule | Value | Rationale |
|------|-------|-----------|
| Max concurrent sub-agents | 5 | Model context limit |
| Max sequential turns before delegation | 3 | Prevent sequential bloat |
| Context compaction threshold | 60% | Not 80% — early is safer |
| Use RLM for batch work | Always | Avoid pasting large inputs into parent |
| Compact before claiming done | At 60% | Don't wait for pressure |

## RLM Usage

The `rlm_query` tool (sandboxed Python REPL) is the batch processor:

- **Classify** issue lists into lanes
- **Compare** implementation candidates across repos
- **Review** long test/output lists for patterns
- **Summarize** cargo/clippy output into fix clusters

Use `llm_query_batched()` (parallel, up to 16 cheap children) for independent items. Use `rlm_query()` only for recursive critique/decomposition.

## Git Worktree Isolation Pattern

Each workstream gets its own git worktree (branch) to prevent file conflicts:

```bash
git worktree add ../worktrees/stream-a -b feat/v0.8.8-tui-bugfixes
git worktree add ../worktrees/stream-b-perms -b feat/v0.8.8-opencode-permissions
# ... one per workstream
```

Sub-agents receive `cwd` pointing to their worktree. They never touch the main checkout or other worktrees.

## Workstream Decomposition (v0.8.8 Example)

7 streams derived from issue labels and dependencies:

| Stream | Scope | Size | Dependencies |
|--------|-------|------|-------------|
| A | TUI bugfixes (12 issues) | Small, single agent | None |
| B | OPENCODE shared infra (35+ issues) | Large, subdivide into 5 sub-agents | None |
| C | Agent/UX (7 issues) | Medium | B-agent-infra |
| D | App-server (8 issues) | Medium | B |
| E | Web UI (8 issues + umbrella) | Large | D |
| F | VS Code extension (9 issues + umbrella) | Large | D, optionally E |
| G | v0.8.6 carry-forward (23 issues) | Varies | Map to A–F |

## Integration Order (Critical)

Dependency order prevents merge conflicts:

1. **Stream A** — merge first (quick wins, low conflict risk)
2. **Stream B subsystems** — in order: config → permissions → LSP/hooks → agent-infra → misc
3. **Stream C** — after B-agent-infra
4. **Stream D** — after B
5. **Stream E** — after D
6. **Stream F** — after D (and E if components shared)

After each merge, run gates on the main worktree.

## Conflict Prevention Matrix

File-level collision tracking across streams:

| Area | Streams Touching | Mitigation |
|------|-----------------|------------|
| `crates/tui/src/tools/subagent/` | A, B, C | Only B-agents modifies; A/C depend on B |
| `crates/tui/src/tui/sidebar.rs` | A, C | All sidebar changes → Stream C only |
| `crates/app-server/` | D, E, F | D completes first; E/F build on stable API |
| `crates/execpolicy/` | B | All execpolicy changes → B-permissions only |
| `crates/config/` | B, D | All config changes → B-config first |

## Verification Gates

Every sub-agent must pass before reporting completion:

```bash
cargo fmt --all -- --check
cargo check --workspace --all-targets --all-features --locked
cargo clippy --workspace --all-targets --all-features --locked -- -D warnings
cargo test --workspace --all-features --locked
```

After every merge into main: same gates on main worktree.

## Takeover Protocol (TAKEOVER_PROMPT.md)

When a previous session grew too large and handed off to a fresh session:

1. Verify branch state: `git status --short --branch`, `cargo check`
2. Read `AGENTS.md`, `V086_BRIEF.md`, `docs/ARCHITECTURE.md`
3. Create checklist with workstream lanes
4. Run one batched status/issue-reading turn
5. Spawn sub-agents for each lane
6. Parent does non-overlapping coordination only

The takeover prompt explicitly forbids treating the handoff as a normal sequential session.

## PR Workflow

- Prefer **small PRs** by issue or tightly related lane
- Push and open PRs early once each slice compiles
- Include `Closes #...` only when PR actually satisfies the issue
- Let CI and AI/code-review agents inspect
- Track PR state with `gh pr view`, `gh pr checks`, `gh issue view`
- Do not manually close issues unless acceptance verified and merge didn't auto-close

## Key Insight: Sub-Agent Fan-out vs Sequential

The pattern solves the fundamental scaling problem of LLM coding agents: a single session degrades with context growth. By treating sub-agents as the default work unit (not an escape hatch), the coordinator keeps its own context small while coordinating potentially dozens of parallel workers.

See [[agent-swarm]] for broader patterns of git-worktree-based multi-agent coordination.

## Related

- [[deepseek-tui]] — main entity page
- [[agent-swarm]] — git worktree multi-agent patterns
- [[deepseek-tui-memory]] — user memory feature
- [[deepseek-tui-runtime-api]] — HTTP/SSE API
