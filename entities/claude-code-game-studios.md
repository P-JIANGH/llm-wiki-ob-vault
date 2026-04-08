---
title: Claude Code Game Studios
created: 2026-04-08
updated: 2026-04-08
type: entity
tags: [project, workflow, agent, multi-agent, claude-code]
sources: [raw/articles/claude-code-game-studios-2026.md]
---

# Claude Code Game Studios

## Overview

An open-source game development workflow system built on Claude Code. Turns a single Claude Code session into a full indie game studio via **49 coordinated agents, 72 skills, and a structured hierarchy** mirroring real studio organization.

Repository: https://github.com/Donchitos/Claude-Code-Game-Studios
License: MIT

## Key Facts

- **49 agents** — each owns a specific domain (programming, art, design, audio, etc.)
- **72 skills** — reusable workflows (sprint planning, code review, brainstorm, architecture-decision, etc.)
- **12 hooks** — event-driven automation
- **11 rules** — enforced constraints per layer
- **Built for**: Claude Code (Anthropic's CLI agent)
- **Configurable engines**: Godot 4 / Unity / Unreal Engine 5

## Architecture Pattern

User-driven collaboration, NOT autonomous AI generation. Every task follows:

> **Question → Options → Decision → Draft → Approval**

Agents must ask "May I write this to [filepath]?" before writing files. Multi-file changes require explicit approval for the full changeset.

See [[claude-code-game-studio-collaboration-protocol]] for full protocol and examples.

## Directory Structure

```
/                    # Root
├── CLAUDE.md        # Master configuration
├── .claude/         # Agent definitions, skills, hooks, rules, docs
├── src/             # Game source code (core, gameplay, ai, networking, ui, tools)
├── assets/          # Game assets (art, audio, vfx, shaders, data)
├── design/          # Game design documents (gdd, narrative, levels, balance)
├── docs/            # Technical documentation
│   └── engine-reference/  # Version-pinned engine API snapshots
├── tests/           # Test suites (unit, integration, performance, playtest)
├── tools/           # Build and pipeline tools
├── prototypes/      # Throwaway prototypes (isolated from src/)
└── production/      # Sprint/milestone/release management
    ├── session-state/     # Ephemeral session state (gitignored)
    └── session-logs/      # Session audit trail (gitignored)
```

See [[claude-code-game-studio-directory-structure]] for details.

## Agent Hierarchy

### Leadership Tier (Opus model)
- **[[creative-director]]** — Creative authority: vision, pillars, aesthetic direction, scope arbitration
- **[[technical-director]]** — Technical authority: architecture, engine choices, code quality gates
- **[[producer]]** — Production: sprint planning, milestone tracking, risk, cross-department coordination

### Department Heads (Opus/Sonnet)
- **Art Director** — Visual execution of creative direction
- **Audio Director** — Sonic execution of creative direction
- **Narrative Director** — Story execution of creative direction
- **QA Lead** — Testing strategy and quality gates
- **Community Manager** — Player community, social media, communications

### Leads (Sonnet model)
- **[[game-designer]]** — Core loops, systems, progression, combat mechanics
- **[[lead-programmer]]** — Code architecture, coding standards, code review
- **Level Designer**, **Systems Designer**, **Economy Designer**, **Live Ops Designer**, **Localization Lead**

### Specialists ( Sonnet/Haiku)
- Engine specialists: `godot-specialist`, `godot-gdscript-specialist`, `godot-csharp-specialist`, `godot-gdextension-specialist`, `godot-shader-specialist`
- Engine specialists: `unity-specialist`, `unity-ui-specialist`, `unity-shader-specialist`, `unity-dots-specialist`, `unity-addressables-specialist`
- Engine specialists: `unreal-specialist`, `ue-blueprint-specialist`, `ue-gas-specialist`, `ue-replication-specialist`, `ue-umg-specialist`
- Domain specialists: `engine-programmer`, `gameplay-programmer`, `ai-programmer`, `network-programmer`, `ui-programmer`, `tools-programmer`
- `security-engineer`, `devops-engineer`, `performance-analyst`, `analytics-engineer`, `technical-artist`
- `prototyper`, `ux-designer`, `accessibility-specialist`, `qa-tester`, `release-manager`, `sound-designer`, `writer`, `world-builder`

## Model Tier Assignment

| Tier | Model | When to use |
|------|-------|------------|
| Haiku | `claude-haiku-4-5` | Read-only status checks, formatting, simple lookups |
| Sonnet | `claude-sonnet-4-6` | Implementation, design authoring, analysis — **default** |
| Opus | `claude-opus-4-6` | Multi-document synthesis, high-stakes phase gates, cross-system review |

Haiku skills: `/help`, `/sprint-status`, `/story-readiness`, `/scope-check`, `/changelog`
Opus skills: `/review-all-gdds`, `/architecture-review`, `/gate-check`

## Coordination Rules

1. **Vertical Delegation**: Leadership → Department Heads → Specialists. Never skip a tier for complex decisions.
2. **Horizontal Consultation**: Same-tier agents may consult but cannot make binding decisions outside their domain.
3. **Conflict Resolution**: Escalate to shared parent. If no shared parent, escalate to `creative-director` (design) or `technical-director` (technical).
4. **Change Propagation**: Design changes affecting multiple domains → `producer` coordinates.
5. **No Unilateral Cross-Domain Changes**: Agents cannot modify files outside their designated directories.

See [[claude-code-game-studio-architecture]] for full coordination details.

## Coding Standards

- All game code must include doc comments on public APIs
- Every system must have an ADR in `docs/architecture/`
- Gameplay values must be data-driven (external config), never hardcoded
- All public methods must be unit-testable (dependency injection over singletons)
- Commits must reference the relevant design document or task ID
- **Verification-driven development**: Write tests first when adding gameplay systems

## Design Document Standard (GDD)

Every mechanic document must contain 8 required sections:
1. **Overview** — one-paragraph summary
2. **Player Fantasy** — intended feeling and experience
3. **Detailed Rules** — unambiguous mechanics
4. **Formulas** — all math defined with variables
5. **Edge Cases** — unusual situations handled
6. **Dependencies** — other systems listed
7. **Tuning Knobs** — configurable values identified
8. **Acceptance Criteria** — testable success conditions

## Subagents vs Agent Teams

- **Subagents** (current, always active): Spawned via `Task` within a single Claude Code session. Share session permission context. Default pattern.
- **Agent Teams** (experimental, opt-in): Multiple independent Claude Code sessions coordinated via shared task list. Requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`.

Use agent teams when: work spans multiple subsystems that won't touch the same files, each workstream would take >30 minutes and benefits from true parallelism, a senior agent needs to coordinate 3+ specialist sessions on different epics.

## Related Concepts

- [[claude-code-game-studio-architecture]] — Agent hierarchy, model tiers, coordination rules, parallel task protocol
- [[claude-code-game-studio-collaboration-protocol]] — Question → Options → Decision → Draft → Approval pattern, file writing protocol
- [[claude-code-game-studio-directory-structure]] — Full directory structure reference
- [[multi-agent-ai-simulation]] — General multi-agent AI concepts (relevant to agent coordination)
- [[godot-4]] — Godot 4 engine (target engine in this workflow)
