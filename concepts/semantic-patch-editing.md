---
title: Semantic Patch Editing
created: 2026-06-18
updated: 2026-06-18
type: concept
tags: [tool-calling, design-pattern, agent, agent-first, agent-loop, agent-design, error-handling]
sources: [raw/articles/zerolang-2026.md]
confidence: medium
---

# Semantic Patch Editing

> **Write checked semantic edits, not hopeful text diffs.**

Semantic patch editing is the agent-facing edit pattern in a
[[concepts/graph-native-programming]] language: instead of mutating a
text span, the agent submits a *typed operation* against a *named
semantic node*, with explicit preconditions. The compiler accepts or
rejects the patch **before** the store is written.

Concretely, a graph patch in [[entities/zerolang]] can include:

| Guardrail | What it does | Example |
|---|---|---|
| **graph hash expectation** | Block the patch if the graph changed under you | `--expect-graph-hash graph:a7f7e6899a73f3b4` |
| **node hash expectation** | Lock a specific node from changing | `--expect-node-hash node:#expr_653eeb6e ...` |
| **field expectation** | Read the current value before replacing | `--op 'set node="#expr_653eeb6e" field="value" expect="hello from zero\n" value="hello graph\n"'` |
| **typed operation name** | Pick from a closed set of valid operations | `addFunction`, `addParam`, `addReturnBinary`, `replaceFunctionBody`, `replaceBlockBody`, `set` |
| **dry-run / check-only** | Validate without writing | `--check-only`, `--dry-run` |

## Why preconditions matter

A naive agent edit — "rewrite line 17 to say 'hello graph'" — silently
fails when:
- another edit changed the file between `read` and `write` (stale content)
- the agent miscounted lines after a previous edit
- the agent's chosen text span was ambiguous (multiple matches, similar
  identifiers, formatting normalized between reads)
- the agent fixed the *line* but the *semantic node* is now broken
  (lost import, wrong overload, missing argument)

Preconditions shift these failures from "build broke, debug" to
"patch rejected, re-query the graph, patch the current node instead".
The failure becomes useful.

## Operation taxonomy (in [[entities/zerolang]])

Surgical in-function text edits (`Edit` semantics):
```text
--replace-in-fn <fn> --old <text> --new <text>
```

Field-level updates (the most common agent edit):
```text
set node="<id>" field="<f>" [expect="<old>"] value="<new>"
```

Block-level body replacement:
```text
replaceFunctionBody <fn>
  <rows>
end

replaceBlockBody <block_id>
  <rows>
end
```

Bulk helper creation:
```text
upsertFunction name="<n>" ret="<t>"
  <rows>
end
```

Declarations and shape changes:
```text
addFunction name="add" ret="i32"
addParam fn="add" name="x" type="i32"
addReturnBinary fn="add" name="+" left="x" right="y" type="i32"
addMain
addCheckWrite fn="main" text="hello from zero\n"
```

## Relationship to text-edit failure modes

The text-edit failure modes listed in `semantic-vs-text.md` of the
Zerolang docs are the same ones that motivate structured output,
prompt caching, and explicit context-engineering in the wider agent
ecosystem. Semantic patch editing attacks them at the lowest possible
layer — the *edit primitive itself* — rather than at higher layers
(better prompts, better format instructions, retry loops).

## Cross-references

- [[concepts/graph-native-programming]] — the broader thesis that
  semantic patches enable
- [[concepts/program-graph-store]] — the store that holds the
  semantic nodes the patch targets
- [[concepts/agent-loop-architecture]] — `zero query` → `zero patch` →
  `zero check/run` is a narrow agent loop for code authoring
- [[concepts/context-engineering]] — `zero query` is the pre-fetch
  side; `zero patch` is the typed-write side
- [[entities/12-factor-agents]] — Factor 5 (own your context window)
  and Factor 13 (pre-fetch vs ask) are the policy-level cousins
- [[entities/pi-coding-agent]] — analogous split (7 tools, 4 modes):
  most tools are *read-only* queries; only a small set of write tools
  exists, and each one is typed
- [[concepts/agent-design-principles]] — regular patterns over
  syntactic convenience; deterministic inspection and repair
