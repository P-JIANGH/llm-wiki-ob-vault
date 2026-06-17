# gstack - Garry Tan's Claude Code Setup

> "I don't think I've typed like a line of code probably since December, basically, which is an extremely large change." — Andrej Karpathy

**Repository:** [garrytan/gstack](https://github.com/garrytan/gstack)
**License:** MIT
**Stars:** 71.3K
**Forks:** 10K

---

## Overview

gstack is Garry Tan's (President & CEO of Y Combinator) open-source software factory that turns Claude Code into a virtual engineering team. It provides 23 specialized skills that serve as CEO, Designer, Eng Manager, Release Manager, Doc Engineer, and QA.

### Claims

- **600,000+ lines** of production code in 60 days (35% tests)
- **10,000-20,000 lines per day** shipping rate
- **140,751 lines added, 362 commits, ~115K net LOC** in one week across 3 projects
- 1,237 contributions in 2026

---

## Quick Start

### Installation (30 seconds)

**Requirements:** Claude Code, Git, Bun v1.0+, Node.js (Windows only)

Open Claude Code and paste:

```bash
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack && cd ~/.claude/skills/gstack && ./setup
```

Then add a "gstack" section to `CLAUDE.md` with available skills listed.

### 5-Command Workflow

1. `/office-hours` — describe what you're building
2. `/plan-ceo-review` — review any feature idea
3. `/review` — review any branch with changes
4. `/qa` — test your staging URL
5. `/ship` — deploy

---

## The Sprint Process

**Think → Plan → Build → Review → Test → Ship → Reflect**

Each skill feeds into the next. `/office-hours` writes a design doc that `/plan-ceo-review` reads. `/plan-eng-review` writes a test plan that `/qa` picks up.

### Core Skills

| Skill | Role | Function |
|-------|------|----------|
| `/office-hours` | YC Office Hours | Six forcing questions that reframe your product before coding |
| `/plan-ceo-review` | CEO/Founder | Rethink the problem. Four modes: Expansion, Selective Expansion, Hold Scope, Reduction |
| `/plan-eng-review` | Eng Manager | Lock architecture, data flow, diagrams, edge cases, tests |
| `/plan-design-review` | Senior Designer | Rates design dimensions 0-10, AI Slop detection |
| `/plan-devex-review` | DX Lead | Interactive DX review with 20-45 forcing questions |
| `/review` | Staff Engineer | Find production bugs, auto-fix obvious ones |
| `/investigate` | Debugger | Systematic root-cause debugging |
| `/qa` | QA Lead | Test app, find bugs, fix with atomic commits, generate regression tests |
| `/cso` | Chief Security Officer | OWASP Top 10 + STRIDE threat model |
| `/ship` | Release Engineer | Sync main, run tests, audit coverage, push, open PR |
| `/land-and-deploy` | Release Engineer | Merge PR, wait for CI, verify production health |
| `/retro` | Eng Manager | Per-person breakdowns, shipping streaks, test health trends |

### Design Pipeline

| Skill | Function |
|-------|----------|
| `/design-consultation` | Build complete design system from scratch |
| `/design-shotgun` | Generate 4-6 AI mockup variants, comparison board in browser |
| `/design-html` | Turn mockup into production-quality HTML/CSS using Pretext |

### Power Tools

| Skill | Function |
|-------|----------|
| `/careful` | Safety guardrails — warns before destructive commands |
| `/freeze` | Lock edits to one directory |
| `/guard` | `/careful` + `/freeze` combined |
| `/codex` | Second opinion from OpenAI Codex CLI |
| `/autoplan` | CEO → design → eng review pipeline |
| `/learn` | Memory across sessions |
| `/browse` | Real Chromium browser, ~100ms per command |
| `/open-gstack-browser` | GStack Browser with sidebar, anti-bot stealth, auto model routing |
| `/pair-agent` | Cross-agent coordination through shared browser |

---

## Key Features

### Parallel Sprints

Use [Conductor](https://conductor.build) to run multiple Claude Code sessions in parallel:
- 10-15 parallel sprints supported
- Each session in isolated workspace
- Sprint structure prevents chaos

### GStack Browser

- AI-controlled Chromium with anti-bot stealth
- Sidebar agent for natural language commands
- Auto model routing (Sonnet for actions, Opus for analysis)
- Cookie import from Chrome, Arc, Brave, Edge
- `$B handoff` for manual browser takeover when stuck

### Multi-Agent Coordination

`/pair-agent` enables coordination between different AI agents (OpenClaw, Hermes, Codex, Cursor) through a shared browser with:
- Scoped tokens
- Tab isolation
- Rate limiting
- Activity attribution

---

## Supported AI Agents

| Agent | Flag |
|-------|------|
| Claude Code | (default) |
| OpenAI Codex CLI | `--host codex` |
| OpenCode | `--host opencode` |
| Cursor | `--host cursor` |
| Factory Droid | `--host factory` |
| Slate | `--host slate` |
| Kiro | `--host kiro` |

Adding new agents requires only one TypeScript config file (see `docs/ADDING_A_HOST.md`).

---

## Architecture Notes

- Agent-agnostic: designed to work with multiple AI coding agents beyond Claude Code
- Skill-based: each skill is a self-contained prompt/behavior module
- Sprint-first: opinionated workflow from idea to deployment
- The 23 skills map to real engineering org roles (CEO, EM, QA, Security, etc.)
