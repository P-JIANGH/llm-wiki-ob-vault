---
title: Agent Design Principles
created: 2026-05-22
updated: 2026-05-22
type: concept
tags: [architecture, design-pattern, agent, workflow]
sources: [raw/articles/12-factor-agents-2026.md]
---

# Agent Design Principles

> A collection of engineering principles for building reliable LLM-powered agents.
> The most comprehensive codification is the [[entities/12-factor-agents]] project by Dex (HumanLayer).

## Overview

Building production-grade AI agents requires a different mindset than prototyping. The following principles emerge from studying successful agent deployments and analyzing common failure patterns across dozens of production agent systems.

## Core Principles

### 1. Agent = Prompt + Switch + Context + Loop
Dex Horthy's formula distills an agent to four components, all built by the developer:

```
agent = prompt                    # Own your prompts
      + switch_statement           # Own your control flow
      + accumulated_context        # Own your context window
      + for_loop                   # Control flow + pause/resume
```

There is no framework magic. Every component is explicit, testable, and debuggable.

### 2. Separating Decision from Execution
The LLM makes decisions (outputs structured JSON). Deterministic code executes them (a switch statement routes tool calls). These should never be mixed:
- LLM: "What should happen next?" → structured JSON
- Code: "The JSON says X, so I execute X" → deterministic handler

This separation enables: logging, tracing, retry policies, human-in-the-loop, and independent testing of both paths.

### 3. Small, Focused Agents Over Monoliths
Don't build one agent that does everything. Build small agents for 3-10 step workflows within a narrow domain. Benefits:
- Context stays manageable (avoids context window degradation)
- Debugging is straightforward (fewer possible paths)
- Testing is comprehensive (all paths can be enumerated)
- LLM upgrades only affect one small area

Agents are building blocks in a larger deterministic system, not the entire system themselves.

### 4. Humans Are First-Class Tools
Human interaction should be a tool call, not a side channel:
```
type NextStep = CreateIssue | SearchIssues | RequestHumanApproval | DoneForNow
```
This enables:
- **Outer loop agents** — triggered by cron/webhook, working independently, then contacting a human for decisions
- **High-risk tool access** — the agent can have destructive tools because it always reaches a human for approval
- **Auditability** — every human interaction is logged with the same format as every other tool call

### 5. Own Your Control Flow (Don't Let Frameworks Hide It)
Frameworks abstract away the agent loop — which is exactly where the hardest problems live:
- Pause between tool selection and execution (for human review)
- Retry logic with exponential backoff
- LLM-as-judge validation of tool outputs before continuing
- Context window compression at strategic points
- Persistent pause/waiting for external events

By owning the loop, you get: logging, tracing, metrics, client-side rate limiting, and persistent state management.

### 6. Context Engineering Is the Differentiator
The difference between a mediocre and great agent is usually not the model or the tools — it's how the context is engineered. See [[concepts/context-engineering]] for details.

### 7. Unified State Model
Execution state (current step, retries) and business state (conversation history, tool results) should be unified in a single representation — typically the context window itself. This makes:
- Serialization trivial
- Debugging straightforward (everything is in one place)
- Recovery natural (replay the history)
- Forking possible (branch from any point)

### 8. Self-Healing Through Context
Errors should be fed back into the context window for the LLM to handle. This is the "self-healing" pattern:
```
agent_loop:
  1. LLM chooses next step
  2. Code executes the tool
  3. If error → append formatted error to context → go to 1
  4. If success → append result → go to 1
  5. Max 3 consecutive errors → escalate or abort
```

## Relationship to Other Concepts

- [[entities/12-factor-agents]] — The most complete codification of these principles (12 factors + appendix)
- [[concepts/agent-loop-architecture]] — The technical architecture for the agent loop; these principles guide how to build it well
- [[concepts/context-engineering]] — The practice of optimizing LLM inputs, derived from Factor 3
- [[concepts/mcp]] — MCP provides standardized tool interfaces; these principles guide how to use those tools in a reliable loop
- [[entities/langgraph]] — A framework that implements graph-based agent architecture; these principles guide whether and how to use such frameworks
- [[entities/baml]] — A prompt compiler that enforces Factor 2 (Own Your Prompts) with typed function signatures

## Pitfalls

- **Over-automating too early:** Build deterministic code first, add LLM steps where needed. Don't start with full autonomy.
- **Framework lock-in:** The cost of a framework is not just migration — it's the loss of control over your agent loop. Evaluate carefully.
- **Agent scope creep:** Resist the urge to make agents handle more. If an agent needs 20+ steps, split it.
- **Hiding humans:** Every human interaction should be explicit and traceable. Don't let the agent act on behalf of users without visibility.
