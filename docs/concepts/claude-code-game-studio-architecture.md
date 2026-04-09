---
title: Claude Code Game Studio Architecture
created: 2026-04-08
updated: 2026-04-08
type: concept
tags: [agent, architecture, workflow, coordination, multi-agent]
sources: [raw/articles/claude-code-game-studios-2026.md]
---

# Claude Code Game Studio Architecture

## Overview

A tiered agent hierarchy that mirrors a real indie game studio's organizational structure. 49 agents organized across leadership, department heads, leads, and specialists — coordinated through structured delegation, consultation, and conflict resolution rules.

## Agent Hierarchy

```
[creative-director]     ← Creative authority (Opus)
      ↑
[art-director] [audio-director] [narrative-director] [game-designer] [lead-programmer] [producer] [qa-lead] [community-manager]
      ↑                       ↑                    ↑
[technical-artist] [ux-designer] [writer] [sound-designer] [world-builder] [economy-designer] [level-designer] [systems-designer] [live-ops-designer]
      ↑
[gameplay-programmer] [engine-programmer] [ai-programmer] [network-programmer] [ui-programmer] [tools-programmer]
[specialists per engine: godot-*, unity-*, ue-* specialists]
```

## Model Tier Assignment

Skills and agents are assigned to model tiers based on task complexity:

| Tier | Model | When to use |
|------|-------|------------|
| **Haiku** | `claude-haiku-4-5-20251001` | Read-only status checks, formatting, simple lookups — no creative judgment needed |
| **Sonnet** | `claude-sonnet-4-6` | Implementation, design authoring, analysis of individual systems — **default for most work** |
| **Opus** | `claude-opus-4-6` | Multi-document synthesis, high-stakes phase gate verdicts, cross-system holistic review |

### Skills by Tier

**Haiku skills:**
- `/help`, `/sprint-status`, `/story-readiness`, `/scope-check`, `/project-stage-detect`, `/changelog`, `/patch-notes`, `/onboard`

**Opus skills:**
- `/review-all-gdds`, `/architecture-review`, `/gate-check`

All other skills default to Sonnet. When creating new skills: assign Haiku if only reads/formatting; assign Opus if synthesizing 5+ documents with high-stakes output; otherwise leave unset (Sonnet).

## Coordination Rules

### Five Core Rules

1. **Vertical Delegation**: Leadership agents delegate to department leads, who delegate to specialists. Never skip a tier for complex decisions.
2. **Horizontal Consultation**: Agents at the same tier may consult each other but must not make binding decisions outside their domain.
3. **Conflict Resolution**: When two agents disagree, escalate to shared parent. If no shared parent, escalate to `creative-director` (design) or `technical-director` (technical).
4. **Change Propagation**: When a design change affects multiple domains, the `producer` agent coordinates propagation.
5. **No Unilateral Cross-Domain Changes**: An agent must never modify files outside its designated directories without explicit delegation.

### Conflict Escalation Map

```
game-designer ↔ narrative-director → creative-director (ludonarrative alignment)
art-director ↔ audio-director → creative-director (aesthetic coherence)
any "changes identity of the game" → creative-director
technical conflicts → technical-director
scheduling conflicts → producer
resource contention → producer
```

## Subagents vs Agent Teams

### Subagents (current, always active)
Spawned via `Task` within a single Claude Code session. Used by all `team-*` skills and orchestration skills.

- Subagents share the session's permission context
- Run sequentially or in parallel within the session
- Return results to the parent agent

**When to spawn in parallel**: If two subagents' inputs are independent (neither needs the other's output to begin), spawn both Task calls simultaneously rather than waiting.

Example: `/review-all-gdds` Phase 1 (consistency) and Phase 2 (design theory) are independent → spawn both at the same time.

### Agent Teams (experimental — opt-in)
Multiple independent Claude Code *sessions* running simultaneously, coordinated via a shared task list. Each session has its own context window and token budget.

**Use agent teams when**:
- Work spans multiple subsystems that will not touch the same files
- Each workstream would take >30 minutes and benefits from true parallelism
- A senior agent (technical-director, producer) needs to coordinate 3+ specialist sessions working on different epics simultaneously

**Do not use agent teams when**:
- One session's output is required as input for another (use sequential subagents)
- The task fits in a single session's context (use subagents instead)
- Cost is a concern — each team member burns tokens independently

**Current status**: Not yet used by default. Document usage when first adopted.

## Parallel Task Protocol

When an orchestration skill spawns multiple independent agents:

1. Issue all independent Task calls before waiting for any result
2. Collect all results before proceeding to dependent phases
3. If any agent is BLOCKED, surface it immediately — do not silently skip
4. Always produce a partial report if some agents complete and others block

## Team Skills (72 total)

### Team Composition Skills
- `team-audio` — Audio design team
- `team-combat` — Combat design team
- `team-level` — Level design team
- `team-live-ops` — Live operations team
- `team-narrative` — Narrative team
- `team-polish` — Polish and feel team
- `team-qa` — QA team
- `team-release` — Release management team
- `team-ui` — UI/UX team

### Workflow Skills
- `adopt` — Adopt a skill from library
- `architecture-decision` — Create ADR through guided flow
- `architecture-review` — Validate ADRs
- `brainstorm` — Professional ideation with MDA/SDT analysis
- `bug-report`, `bug-triage` — Issue management
- `changelog` — Generate changelog
- `code-review` — Review code changes
- `consistency-check` — Cross-document consistency
- `create-architecture` — Create architecture document
- `create-epics`, `create-stories` — Story decomposition
- `design-review` — Validate design documents
- `dev-story` — Implement from story
- `estimate` — Effort estimation
- `gate-check` — Phase gate validation
- `help` — Built-in help
- `hotfix` — Hotfix workflow
- `localize` — Localization workflow
- `milestone-review` — Milestone validation
- `onboard` — Project onboarding
- `patch-notes`, `playtest-report`, `qa-plan`
- `scope-check`, `skill-improve`, `skill-test`
- `smoke-check`, `soak-test` — Stability testing
- `sprint-plan`, `sprint-status`, `story-done`, `story-readiness`
- `tech-debt` — Technical debt tracking
- `test-evidence-review`, `test-flakiness`, `test-helpers`, `test-setup`
- `ux-design`, `ux-review` — UX design and review

## Gate Verdict System

Agents emit structured verdicts at phase gates:

```
[GATE-ID]: APPROVE   ← passes gate
[GATE-ID]: CONCERNS  ← passes with concerns noted
[GATE-ID]: REJECT    ← blocks progression
[GATE-ID]: REALISTIC / UNREALISTIC (producer gates)
```

Calling skills read the first line for the verdict token.

## Related

- [claude-code-game-studios](#/entities/claude-code-game-studios) — Project overview entity page
- [claude-code-game-studio-collaboration-protocol](#/concepts/claude-code-game-studio-collaboration-protocol) — Question → Options → Decision → Draft → Approval pattern
- [claude-code-game-studio-directory-structure](#/) — Project directory structure
- [multi-agent-ai-simulation](#/concepts/multi-agent-ai-simulation) — General multi-agent AI concepts
