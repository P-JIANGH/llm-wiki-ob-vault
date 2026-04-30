# Learn Claude Code - Source

> https://github.com/shareai-lab/learn-claude-code
> Fetched: 2026-04-28

## Summary

Learn Claude Code — Bash is all you need. A nano claude code-like "agent harness", built from 0 to 1. 12 progressive sessions teaching agent harness engineering.

## Core Philosophy

**Core Thesis**: *"Agency comes from the model. An Agent Product = Model + Harness."*

The code doesn't make an agent smart — the model does. The harness just provides tools, knowledge, observation, action interfaces, and permissions.

## Key Facts

- **GitHub**: shareAI-lab/learn-claude-code
- **Stars**: ~54.7k
- **License**: MIT
- **Language**: Python
- **Structure**: 12 progressive sessions, each adds one mechanism

## The Agent Pattern

```
User --> messages[] --> LLM --> response
        |
        stop_reason == "tool_use"?
       / \
     yes  no
      |    |
   execute  return text
   tools
      |
   append results
      |
   loop back --> messages[]
```

**The MODEL decides when to call tools and when to stop.**
**The CODE just executes what the model asks for.**

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

| Session | Topic | Motto | Files |
|---------|-------|-------|-------|
| s01 | The Agent Loop | "One loop & Bash is all you need" | 1 |
| s02 | Tool Use | "Adding a tool means adding one handler" | 4 |
| s03 | TodoWrite | "An agent without a plan drifts" | 5 |
| s04 | Subagents | "Break big tasks down; each subtask gets a clean context" | 5 |
| s05 | Skills | "Load knowledge when you need it, not upfront" | 5 |
| s06 | Context Compact | "Context will fill up; you need a way to make room" | 5 |
| s07 | Tasks | "Break big goals into small tasks, order them, persist to disk" | 8 |
| s08 | Background Tasks | "Run slow operations in background; the agent keeps thinking" | 6 |
| s09 | Agent Teams | "When task is too big for one, delegate to teammates" | 9 |
| s10 | Team Protocols | "Teammates need shared communication rules" | 12 |
| s11 | Autonomous Agents | "Teammates scan the board and claim tasks themselves" | 14 |
| s12 | Worktree + Task Isolation | "Each works in its own directory, no interference" | 16 |

### Phase 1: THE LOOP
- s01 The Agent Loop [1] — while + stop_reason
- s02 Tool Use [4] — dispatch map: name->handler

### Phase 2: PLANNING & KNOWLEDGE
- s03 TodoWrite [5] — TodoManager + nag reminder
- s04 Subagents [5] — fresh messages[] per child
- s05 Skills [5] — SKILL.md via tool_result
- s06 Context Compact [5] — 3-layer compression

### Phase 3: PERSISTENCE
- s07 Tasks [8] — file-based CRUD + deps graph
- s08 Background Tasks [6] — daemon threads + notify queue

### Phase 4: TEAMS
- s09 Agent Teams [9] — teammates + JSONL mailboxes
- s10 Team Protocols [12] — shutdown + plan approval FSM
- s11 Autonomous Agents [14] — idle cycle + auto-claim
- s12 Worktree Isolation [16] — task coordination + isolated execution lanes

## Claude Code Architecture (Teaching Subject)

Claude Code is "the most elegant and fully-realized agent harness":
```
Claude Code = one agent loop
+ tools (bash, read, write, edit, glob, grep, browser...)
+ on-demand skill loading
+ context compression
+ subagent spawning
+ task system with dependency graph
+ team coordination with async mailboxes
+ worktree isolation for parallel execution
+ permission governance
```

## Repository Structure

```
learn-claude-code/
├── README.md
├── agents/           # Implementation code
├── docs/
│   ├── en/         # English docs (s01-s12)
│   ├── zh/         # Chinese docs
│   └── ja/         # Japanese docs
├── skills/         # Skill examples
├── tests/          # Tests
├── web/            # Web components
├── .env.example
└── requirements.txt
```

## Learning Tips

- learn-claude-code teaches single-task agent (making one task great)
- Sister project claw0 teaches 7x24h production-grade agent gateway
