---
title: AI Agent
created: 2026-04-27
updated: 2026-04-27
type: concept
tags: [ai, agent, llm, autonomy]
sources: []
---

# AI Agent

[[autonomous-agents]] | [[agent-loop]]

## Overview

An AI agent is a system that uses an LLM to plan and execute actions in the real world or digital environments. Agents typically combine a language model with tools, memory, and a loop that observes, plans, and acts.

## Key Components

- **Planning**: Task decomposition, subgoal generation
- **Tool use**: Code execution, web search, file operations
- **Memory**: Short-term (context window) and long-term (vector DB)
- **Loop architecture**: [[agent-loop]] handles the observe→plan→act cycle

## Relationship to Other Projects

- [[AutoGPT]] and [[babyagi]] are early reference implementations
- [[claude-code]] and [[agent-code]] are modern coding-specialized agents
- [[MetaGPT]] extends agents with multi-role collaboration

## References

- See [[agent-loop-architecture]] for detailed loop patterns
- See [[agent-swarm]] for multi-agent coordination
