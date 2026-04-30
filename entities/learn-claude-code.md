---
title: Learn Claude Code
created: 2026-04-30
updated: 2026-04-30
type: entity
tags: [agent, learning, llm]
sources: [raw/articles/learn-claude-code-2026.md]
---

# Learn Claude Code

## Overview

12 节渐进式课程，从零构建类 Claude Code 的 agent harness。GitHub 54.7k stars，MIT license。

**GitHub:** https://github.com/shareAI-lab/learn-claude-code
**License:** MIT | **Stars:** ~54.7k | **Language:** Python

## Core Philosophy

**"Agency comes from the model. Agent Product = Model + Harness."**

The code doesn't make an agent smart — the model does. The harness just provides tools, knowledge, observation, action interfaces, and permissions.

## What an Agent is NOT

Prompt plumbing "agents" are NOT real agents:
- Drag-and-drop workflow builders
- No-code "AI agent" platforms
- Prompt-chain orchestration libraries
- If-else branches with LLM API calls

**These are Rube Goldberg machines** — over-engineered, brittle pipelines with an LLM wedged in as a "glorified text-completion node."

## Harness Components

```
Harness = Tools + Knowledge + Observation + Action Interfaces + Permissions

Tools:        file I/O, shell, network, database, browser
Knowledge:    product docs, domain references, API specs, style guides
Observation:  git diff, error logs, browser state, sensor data
Action:       CLI commands, API calls, UI interactions
Permissions:  sandboxing, approval workflows, trust boundaries
```

## 12 Progressive Sessions

| Session | Topic | Motto |
|---------|-------|-------|
| s01 | The Agent Loop | "One loop & Bash is all you need" |
| s02 | Tool Use | "Adding a tool means adding one handler" |
| s03 | TodoWrite | "An agent without a plan drifts" |
| s04 | Subagents | "Break big tasks down; each subtask gets a clean context" |
| s05 | Skills | "Load knowledge when you need it, not upfront" |
| s06 | Context Compact | "Context will fill up; you need a way to make room" |
| s07 | Tasks | "Break big goals into small tasks, order them, persist to disk" |
| s08 | Background Tasks | "Run slow operations in background; the agent keeps thinking" |
| s09 | Agent Teams | "When task is too big for one, delegate to teammates" |
| s10 | Team Protocols | "Teammates need shared communication rules" |
| s11 | Autonomous Agents | "Teammates scan the board and claim tasks themselves" |
| s12 | Worktree + Task Isolation | "Each works in its own directory, no interference" |

## Claude Code Architecture

Claude Code = one agent loop + tools + on-demand skill loading + context compression + subagent spawning + task system with dependency graph + team coordination with async mailboxes + worktree isolation + permission governance

## Related

- [[nanobot]] — 用 Python 实现 agent harness 的项目
- [[hermes-agent]] — 生产级 agent 框架
