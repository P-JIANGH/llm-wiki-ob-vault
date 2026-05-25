---
title: Cache-First Agent Loop
created: 2026-05-25
updated: 2026-05-25
type: concept
tags: [agent, agent-loop, architecture, optimization, deepseek, inference, cost-control, context-management]
sources: [raw/articles/deepseek-reasonix-2026.md]
---

# Cache-First Agent Loop

> A context-management strategy for LLM agent loops that maximizes prefix-cache hit rates by structuring the prompt into immutable, append-only, and volatile regions.

## Problem

DeepSeek bills cached input tokens at ~10% of uncached input. Automatic prefix caching activates only when the *exact* byte prefix of the previous request matches. Most agent frameworks achieve <20% cache hit rates in practice because they:

- Reorder or rewrite history each turn
- Inject fresh timestamps or session IDs into the system prompt
- Inline full tool results into the conversation, shifting byte offsets
- Rewrite the entire context on compaction

A coding agent that burns $200/month on background projects is one nobody uses. The cache-first approach makes the agent "cheap enough to leave on."

## Three-Region Partition

```
┌─────────────────────────────────────────┐
│ IMMUTABLE PREFIX                        │ ← fixed for session
│   system + tool_specs + few_shots       │   cache hit candidate
├─────────────────────────────────────────┤
│ APPEND-ONLY LOG                         │ ← grows monotonically
│   [assistant₁][tool₁][assistant₂]...    │   preserves prefix of prior turns
├─────────────────────────────────────────┤
│ VOLATILE SCRATCH                        │ ← reset each turn
│   R1 thought, transient plan state      │   never sent upstream
└─────────────────────────────────────────┘
```

### Immutable Prefix

- Computed once per session, hashed, and pinned
- Contains: system prompt, tool specifications, few-shot examples
- Any change (add/remove tool, edit system prompt) invalidates the fingerprint and accepts a cache miss
- In Reasonix: `ImmutablePrefix` class with SHA-1 fingerprint verification

### Append-Only Log

- Grows monotonically; entries serialized in strict order
- No rewrites, no reordering, no in-place edits
- Each new turn appends assistant message + tool results to the log
- The log's prefix is always a superset of the previous turn's prefix → cache hit

### Volatile Scratch

- Chain-of-thought, reasoning content, transient plan state
- Reset each turn; never folded into the upstream request unless explicitly distilled
- Prevents per-turn reasoning from poisoning the cacheable prefix

## Four Mechanisms

| Mechanism | What it does | Cache impact |
|---|---|---|
| **ImmutablePrefix** | Freezes system + tools + few-shots at session start | Eliminates prefix churn from spec changes |
| **AppendOnlyLog** | Strict append-only history | Ensures each turn's prefix is a superset of the last |
| **VolatileScratch** | Isolates per-turn reasoning | Prevents reasoning bytes from entering the cached prefix |
| **Auto-compact** | Folds old turns into summary *appended* to prefix | Survives context-window pressure without rewriting prefix |

## Real-World Results

**Reasonix benchmark (2026-05-01):**
- 435M input tokens, 99.82% cache hit
- Cost: ~$12 (with cache) vs ~$61 (without cache) on v4-flash
- Savings: 97.7%

**Comparison with other clients:**
- DeepSeek web chat: 60-80% within conversation, 0% on new session
- Generic OpenAI-shape SDKs: 30-60% — history reordered, tool specs re-serialized
- XML-tool-call clients (Cline/Continue): lower still — tool results inline into conversation

## Implementation Notes

### Parallel Tool Dispatch

Tools declare `parallelSafe?: boolean`. Consecutive parallel-safe calls are grouped and raced via `Promise.allSettled`. The first non-parallel-safe call ends the chunk (serial barrier). Tool-result yields still land in declared order regardless of settlement order, so the model sees the same shape as fully serial dispatch.

### Turn-End Auto-Compaction

Every tool result exceeding a token cap (e.g., 3000) is shrunk to that cap when the turn ends. The model had the full text for the turn that read it; subsequent turns see a compact summary. A proactive threshold (e.g., 40% context ratio) runs pre-emptively before the emergency threshold (e.g., 80%) fires.

### Fingerprint Verification

The immutable prefix maintains a cached fingerprint (SHA-1 hash of its canonical serialization). Any mutation path that bypasses `addTool()`/`removeTool()`/`replaceSystem()` causes fingerprint drift — detected in dev/test mode via `verifyFingerprint()`, which throws to catch cache-invalidating mutations.

## Trade-offs

| Pros | Cons |
|---|---|
| Dramatic cost reduction (10-50× cheaper) | Coupled to a specific provider's cache mechanic |
| Simpler reasoning about context stability | Cannot reorder history for relevance |
| Append-only log is easy to debug/replay | Tool spec changes are expensive (cache miss) |
| | Volatile scratch requires explicit distillation |

## Related

- [[entities/deepseek-reasonix]] — The project that pioneered this approach
- [[concepts/agent-loop-architecture]] — General agent loop patterns
- [[concepts/context-compression]] — Context window management techniques
- [[entities/deepseek]] — DeepSeek API and pricing

## References

- Reasonix Architecture: `docs/ARCHITECTURE.md`
- Real-world cache benchmark: `benchmarks/real-world-cache/README.md`
- DeepSeek API pricing: https://platform.deepseek.com/api-docs/pricing
