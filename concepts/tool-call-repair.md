---
title: Tool-Call Repair Pipeline
created: 2026-05-25
updated: 2026-05-25
type: concept
tags: [agent, tool-calling, function-calling, robustness, error-handling, deepseek, inference]
sources: [raw/articles/deepseek-reasonix-2026.md]
---

# Tool-Call Repair Pipeline

> A multi-pass recovery system for malformed or missing tool calls in LLM agent loops, designed around DeepSeek-specific failure modes.

## Problem

Empirical failure modes when LLMs emit tool calls:

1. **Thought-leakage** — Tool-call JSON emitted inside `<think>` tags, missing from the final `tool_calls` array
2. **Argument dropout** — Arguments dropped when schema has >10 params or deeply nested objects
3. **Call-storm** — Same tool called repeatedly with identical args within a short window
4. **Truncation** — JSON cut off mid-structure due to `max_tokens` limit

These failures are especially common with reasoning models (DeepSeek-R1) where the chain-of-thought channel (`reasoning_content`) is separate from the response channel (`content`).

## Four-Pass Pipeline

### Pass 1: Flatten

**Problem:** Deep models struggle with deeply nested or wide schemas.

**Solution:** Auto-detect schemas with >10 leaf parameters or depth >2 on `ToolRegistry.register()`. Present them to the model in dot-notation form (e.g., `config.timeout` instead of nested `config: { timeout }`). The `dispatch()` function re-nests the flat arguments before calling the user's `fn`.

**Example:**
```json
// Original (depth 3, 15 leaves)
{ "config": { "retry": { "maxAttempts": 3, "backoff": "exponential" } } }

// Flattened (presented to model)
{ "config.retry.maxAttempts": 3, "config.retry.backoff": "exponential" }
```

### Pass 2: Scavenge

**Problem:** Model emits tool calls in `reasoning_content` (inside `<think>`) but forgets to include them in the formal `tool_calls` array.

**Solution:** Regex + JSON parser sweeps both `reasoning_content` and `content` channels for tool-call-shaped JSON. Discovered calls are merged with formally declared calls, deduplicated by `(tool_name, args)` signature.

**Key detail:** Scans both channels because DeepSeek sometimes emits DSML markup in regular turns, not just reasoning turns.

### Pass 3: Truncation Repair

**Problem:** JSON truncated due to `max_tokens` hit mid-structure.

**Solution:** Detect unbalanced braces/quotes. Two strategies:
1. **Close braces** — Append missing closing braces and attempt parse
2. **Continuation** — Request a continuation completion from the model with the partial JSON as prefix

### Pass 4: Storm Breaker

**Problem:** Identical `(tool, args)` tuple called repeatedly within a sliding window — usually indicates the model is stuck in a loop.

**Solution:** `StormBreaker` maintains a window of recent calls. When an identical tuple appears more than a threshold (default: 3 within window of 6), the call is suppressed and a reflection turn is injected: "You just called X with Y — what are you trying to achieve?"

**Exceptions:**
- Mutating calls clear the storm window (post-edit verify-read isn't a repeat)
- Storm-exempt tools (cheap state-inspection calls) never trip suppression

## Integration

In Reasonix, the pipeline is orchestrated by `ToolCallRepair` class:

```typescript
const repair = new ToolCallRepair({
  allowedToolNames: new Set(["read_file", "edit_file", ...]),
  stormWindow: 6,
  stormThreshold: 3,
  isMutating: (name) => ["edit_file", "write_file"].includes(name),
  isStormExempt: (name) => ["get_file_info", "list_directory"].includes(name),
});

const { calls, report } = repair.process(
  declaredCalls,
  reasoningContent,
  content
);
```

**Report fields:**
- `scavenged` — number of calls recovered from reasoning/content channels
- `truncationsFixed` — number of truncated JSONs repaired
- `stormsBroken` — number of repeat-call loops broken
- `notes` — human-readable descriptions of each repair action

## Design Principles

1. **Fail-safe, not fail-fast** — Attempt repair before surfacing errors to the user
2. **Transparent** — Every repair is logged in the report and surfaced in the TUI
3. **Conservative** — Scavenge only adds calls with novel signatures; storm only suppresses exact duplicates
4. **Model-agnostic shape, DeepSeek-tuned heuristics** — The pipeline structure works for any model; thresholds tuned for DeepSeek's specific failure distributions

## Related

- [[entities/deepseek-reasonix]] — The project implementing this pipeline
- [[concepts/agent-loop-architecture]] — General agent loop design
- [[concepts/openai-tool-calling]] — Tool calling protocol fundamentals

## References

- Reasonix repair implementation: `src/repair/`
- Architecture doc: `docs/ARCHITECTURE.md#pillar-2--tool-call-repair`
