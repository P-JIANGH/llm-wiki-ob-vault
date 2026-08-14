---
title: Graph-Native Programming
created: 2026-06-18
updated: 2026-06-18
type: concept
tags: [architecture, design-pattern, agent, agent-first, programming-language, agent-design]
sources: [raw/articles/zerolang-2026.md]
confidence: medium
---

# Graph-Native Programming

> **The semantic graph is the program database. Text is a projection.**

In a graph-native language, the compiler's primary input is a **graph
of semantic nodes** — declarations, types, calls, blocks, imports,
capabilities, source-map facts — stored in a binary, content-hashed
store (e.g. `zero.graph`). Text files exist as **projections** of that
graph, regenerated on demand, used by humans for review and (rarely) for
escape-hatch edits.

The opposite model — **parse-first** — is what every mainstream language
uses: the compiler's primary input is text, and the parse stage
reconstructs a graph/AST from it on every compile.

## Why it matters for agents

Most agent coding loops are parse-first. The agent writes text, runs
`check`, runs `format`, runs `build`, then inspects the failures and
writes more text. The parse-then-fail-after-the-fact cycle is a poor
interface for an LLM that has to keep syntax, indentation, imports,
symbol names, surrounding control flow, stale file contents, and the
compiler's current capabilities in its context at once.

In a graph-native language, the agent's primary operations are:
1. `zero query <symbol>` — ask the compiler for graph facts (call
   edges, references, node IDs, type facts, capabilities)
2. `zero patch --op '<op>'` — submit a *checked* semantic edit
3. `zero check / test / run` — run only the task validation the task
   actually needs

The edit is already expressed in compiler terms. Failures happen at
patch time, not after the next build.

## Graph-first compile path

```
parse-first:
  source → lexer → AST → name resolution → type check → IR
         → optimization → codegen → artifact

graph-first (Zero):
  zero.graph → repository graph tables
             → semantic validation → type checking
             → MIR + backend facts → direct codegen → artifact
```

The graph is loaded directly; there is no reparse stage on the normal
package compile path. This is *also* how the runtime goals
(token-efficient inspection, low memory, fast startup, small
artifacts, explicit capabilities, pay-as-used stdlib) are achieved —
the graph-first argument is not only an agent-ergonomics argument.

## Where the graph adds value

A graph patch can target *semantic structure* — "the literal argument
to this write call", "the body of this block", "function `main`" —
instead of asking an agent to locate and rewrite a span of text. This
removes the most common agent failure modes:

- editing the wrong overload or similarly named function
- losing an import or closing brace
- creating syntax that looks plausible but is not accepted
- formatting code that later changes the span the agent intended to patch
- using stale file contents after another edit
- changing source while the graph store remains the actual compiler input

## The semantic-edits vs text-diffs debate

Graph-native does not *eliminate* errors. It moves the primary edit
operation closer to the compiler's semantic model so more errors are
caught at patch time. A patch that would leave a sparse argument list,
a missing expression, a stale graph hash, or an invalid store fails
**before** the package becomes the new compiler input.

The agent-facing contract: write checked semantic edits, not hopeful
text diffs.

## Example: changing one literal vs editing a whole function

```sh
# graph patch: target the literal argument directly
zero patch --expect-graph-hash graph:a7f7e6899a73f3b4 \
  --op 'set node="#expr_653eeb6e" field="value" \
       expect="hello from zero\n" value="hello graph\n"'

# patch file: replace whole function body
zero patch /tmp/replace-body.patch
#   replaceFunctionBody main
#     check world.out.write "hello\n"
#   end
```

Both fail loudly if the precondition is violated (stale graph hash,
unexpected field value, invalid shape).

## Adoption status (as of 2026-06)

[[entities/zerolang]] is the only public graph-native language for
agents known to the wiki. It is **experimental / pre-1.0** ("expect
breaking changes"). The wider programming-language ecosystem remains
parse-first; the graph-native argument has been made before in
language-design circles (Lisp's S-expressions, JetBrains MPS, Racket's
syntax-parse) but the *agent-first* framing is recent.

## Cross-references

- [[concepts/program-graph-store]] — the binary, content-hashed store
  that backs a graph-native language
- [[concepts/semantic-patch-editing]] — how checked graph patches work
- [[concepts/projection-source-view]] — the text surface in a graph-native language
- [[entities/zerolang]] — the implementation that popularized the term
- [[entities/12-factor-agents]] — Factor 5 (own your context window)
  and Factor 13 (pre-fetch vs ask) are the *agent-loop* cousins of
  graph-native programming
- [[entities/pi-coding-agent]] — analogous split (7 tools, 4 modes) at
  the agent-harness layer
- [[entities/langgraph]] — graphs the agent's state machine; Zerolang
  graphs the program being authored. Different layer, same word.
- [[concepts/agent-loop-architecture]] — Zerolang implements a *narrow*
  agent loop for a single domain (code authoring)
