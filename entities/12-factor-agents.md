---
title: 12-Factor Agents
created: 2026-05-22
updated: 2026-05-22
type: entity
tags: [agent, architecture, design-pattern, protocol, open-source]
sources: [raw/articles/12-factor-agents-2026.md]
---

# 12-Factor Agents

> A design philosophy for building reliable LLM-powered software — 12 actionable principles inspired by the classic [[12 Factor Apps]] pattern.
> Created by Dex (Dexter Horthy) / [[entities/humanlayer]], presented at AI Engineer World's Fair.
> GitHub: 20,500+ stars, content CC BY-SA 4.0, code Apache 2.0.

## What It Is

**12-Factor Agents is NOT a framework** — there is no SDK, no library, no `pip install`. It is a set of **engineering principles** for building LLM-powered software that is reliable enough for production customers. The document is comparable in spirit to Heroku's 12 Factor Apps, but for the emerging domain of AI agents.

The core insight: most "AI agents" in production are **mostly deterministic code with LLM steps sprinkled in at strategic points**. The good ones don't follow the "here's your prompt, here's a bag of tools, loop until goal" pattern that frameworks encourage.

## Motivation

Dex (author) interviewed 100+ technical founders building AI products. The typical journey:

1. Pick a popular framework → reach 70-80% quality quickly
2. Realize 80% isn't good enough for customers
3. Discover getting past 80% requires reverse-engineering the framework
4. Start over from scratch

The 12 factors codify what these teams end up building on their own: **small, focused agents with explicit control flow, owned prompts, engineered context windows, and deterministic code**.

## The 12 Factors

| # | Factor | Core Idea |
|---|--------|-----------|
| 1 | Natural Language → Tool Calls | LLM outputs structured JSON; deterministic code executes it. The fundamental building block. |
| 2 | Own Your Prompts | Treat prompts as first-class code. Don't hide them in framework black boxes. |
| 3 | Own Your Context Window | Engineer the LLM's input for max information density. Custom formats, not standard message roles. |
| 4 | Tools Are Structured Outputs | A tool call is just a union type output by the LLM. Nothing special about "function calling". |
| 5 | Unify Execution & Business State | One truth source: the context window. No separate tracking of "execution metadata". |
| 6 | Launch/Pause/Resume | Agents are programs. Standard start/stop/resume APIs. Pause between tool selection and execution. |
| 7 | Contact Humans with Tools | Human interaction is a first-class tool (`request_human_input`). Enables "outer loop agents". |
| 8 | Own Your Control Flow | Build your own loop. Not all tool calls are equal — some sync, some break for human review. |
| 9 | Compact Errors into Context | Append errors to context, let LLM self-heal. Limit retries (~3), then escalate. |
| 10 | Small, Focused Agents | 3-10 step workflows. Agents are building blocks in a larger deterministic system. |
| 11 | Trigger from Anywhere | Slack, email, SMS, webhook, cron. The agent goes where users are. |
| 12 | Agent as Stateless Reducer | `agent(thread, event) -> updated_thread`. Functional programming mental model. |
| 13 (Appendix) | Pre-fetch Context | Call deterministic tools before the loop starts. Save a round-trip. |

## Key Insight: Agent = Prompt + Switch + Context + Loop

Dex's formula distills an agent to four components, all built by the developer:

```
agent = prompt                    # Factor 2: Own Your Prompts
      + switch_statement          # Factor 8: Own Your Control Flow
      + accumulated_context       # Factor 3: Own Your Context Window
      + for_loop                  # Factor 8 + 6: Control Flow + Pause/Resume
```

No framework magic. Everything is explicit and debuggable.

## Ecosystem

The 12-Factor Agents project has spawned a small ecosystem:

- **[[entities/humanlayer]]** — The company behind it. YC F24, human-in-the-loop API + CodeLayer (post-IDE IDE for coding agents)
- **[[entities/agentcontrolplane]]** — Kubernetes-native agent orchestrator (CRDs + async persistence + MCP), previously called KubeChain
- **[[entities/got-agents-agents]]** — Reference implementations (deploybot-ts, linear-assistant-ts) following 12-Factor principles
- **create-12-factor-agent** — Scaffolding tool (`npx`/`uvx`) generating a TypeScript + BAML + HumanLayer project
- **walkthroughgen** — YAML-driven documentation generator for the 12-factor workshops
- **promptx** — Agent persona system (`.promptx/` directory with role definitions for Claude Code)

## Relationship to Other Concepts

- Influenced by classic [[12 Factor Apps]] from Heroku
- Related to [[entities/anthropic]]'s "Building Effective Agents" (2024) — more concrete/engineering-focused vs Anthropic's philosophical approach
- The term **[[concepts/context-engineering]]** was popularized through this project
- Contrasts with [[entities/langchain]]/[[entities/langgraph]] approach (de-emphasizes frameworks, emphasizes raw control)
- [[entities/baml]] (BoundaryML) is the recommended prompt compiler in the reference implementation
- Aligns closely with [[concepts/agent-loop-architecture]] but adds specific engineering guidance

## Impact

- 20,500+ GitHub stars (as of 2026-05)
- Presented at AI Engineer World's Fair (17-min talk)
- Coined/popularized "Context Engineering" as a discipline
- Spawned derivative works ("12-Factor Blueprint for GenAI Agents")
- Widely cited in agent engineering discussions (HN, DZone, Dev.to, Medium)
- Reference implementation (got-agents/agents) shows concrete code following the principles

## License
Content: CC BY-SA 4.0 | Code examples: Apache 2.0
