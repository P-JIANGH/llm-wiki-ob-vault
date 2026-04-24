---
title: "AI GDD Prompt Engineering: OpenGame's Constraint-Driven Design"
created: 2026-04-24
updated: 2026-04-24
type: concept
tags: [concept, ai, llm, game-dev, prompt-engineering, agent, workflow]
sources: [raw/articles/opengame-2026.md]
---

# AI GDD Prompt Engineering: OpenGame's Constraint-Driven Design

OpenGame's `generate-gdd` tool demonstrates a mature **constraint-driven prompt engineering** pattern for LLM code generation. Instead of asking the model to "design a game," the system imposes a rigid scaffolding that prevents hallucinated APIs and non-compiling code.

## Three-Layer System Prompt

The GDD generator assembles its system prompt dynamically from three document layers:

```
System Prompt:
├── Layer 1: Core GDD Rules (docs/gdd/core.md)
├── Layer 2: Archetype Design Rules (docs/modules/{arch}/design_rules.md)
└── Layer 3: Template API (docs/modules/{arch}/template_api.md)
```

If any file is missing, the tool falls back to **built-in rules** hardcoded in `generate-gdd.ts` (≈1200 lines of prompt templates). This ensures the tool never crashes from missing documentation.

## Core Constraints (The "Four Rules")

The system prompt opens with non-negotiable rules:

1. **User-Faithful**: Fulfill stated requirements. Do not invent unasked features.
2. **Config-First**: Numeric values go in `gameConfig.json` using `{ "value": X }` wrapper.
3. **Zero Custom Code**: Use existing behaviors/hooks from `template_api.md` only.
4. **Hook Integrity**: Every hook name MUST exist in `template_api.md`. Non-existent hooks cause compilation failure.

**Rule #4 (Hook Integrity)** is the most critical. LLMs frequently hallucinate API methods that don't exist. By binding the model to an explicit API whitelist, OpenGame eliminates an entire class of compilation errors.

## Dynamic Section Guidance

The user prompt includes **archetype-specific guidance** for each GDD section, dynamically selected from built-in templates:

```
Section 1 — Asset Registry:     getAssetGuidance(archetype)
Section 3 — Entity Architecture: getSection3Guidance(archetype)
Section 4 — Level Design:        getSection4Guidance(archetype)
```

This means a platformer GDD and a tower-defense GDD receive completely different instructions for the same section number.

## Asset Type Strictness

Different asset types have **parameter whitelists** enforced in the prompt:

| Asset Type | Allowed Parameters | Forbidden |
|------------|-------------------|-----------|
| `image` | `type`, `key`, `description` | `size`, `resolution`, `frameCount` |
| `animation` | `type`, `key`, `description`, `frameCount`, directions | `size`, `resolution` |
| `background` | `type`, `key`, `description`, `resolution` | `size`, `frameCount` |
| `tileset` | `type`, `key`, `description`, `tileset_size` | `frameCount` |

**Why?** The backend asset generation service only accepts specific fields. Extra parameters are silently ignored or cause failures. The prompt explicitly warns:

> `type: "image"` params must ALWAYS be empty. One character per image.

## ASCII Map Template Enforcement

For platformer and top-down tilemap modes, the prompt **forbids** LLMs from designing maps from scratch:

> CRITICAL: You MUST copy a predefined template (A, B, C, or D) VERBATIM. Do NOT invent new ASCII map layouts — the AI cannot reliably design valid tilemaps from scratch.

**Templates**:
| Template | Size | Best For |
|----------|------|----------|
| A: "Tutorial Flatlands" | 30x20 | First level |
| B: "The Climb" | 35x22 | Vertical jumping |
| C: "The Fortress" | 40x22 | Combat-focused |
| D: "Boss Chamber" | 40x22 | Boss fight |

Allowed modifications: add/remove coins (C), platforms (=), enemies (E, max 4). Never change dimensions, bottom rows, or spawn sides.

## Action Steering

After the GDD is generated, the tool injects a **structured system reminder** that forces the LLM agent to continue executing:

```markdown
<system-reminder>
GDD GENERATED for archetype: **platformer**

## NOW: Save GDD
Save content between <gdd-content> tags to `GAME_DESIGN.md`

## Next Steps (follow GDD sections):
### Phase 3: Assets (use GDD Section 1)
### Phase 4: Config (use GDD Section 2)
### Phase 5: Code Implementation (use GDD Sections 0, 3, 5)
### Phase 6: Verify

DO NOT STOP. CONTINUE TO PHASE 3 NOW.
</system-reminder>
```

Without this steering, LLM agents often pause and ask for confirmation. The explicit instruction keeps the pipeline running autonomously.

## Temperature Design

| Tool | Temperature | Reasoning |
|------|-------------|-----------|
| `classify-game-type` | 0.3 | Physics classification is deterministic — creativity hurts accuracy |
| `generate-gdd` | 0.5–0.7 | Needs creativity for game design, but constraints keep it bounded |

## Game Type Classifier Physics-First

The classifier uses **physics-based questions** rather than genre names:

| Archetype | Key Question |
|-----------|-------------|
| **platformer** | "Does the character FALL if there's no ground beneath them?" |
| **top_down** | "Can the character move UP without jumping?" |
| **grid_logic** | "Does movement happen in discrete grid steps?" |
| **tower_defense** | "Do enemies follow a fixed path while player places defenses?" |
| **ui_heavy** | "Is the game primarily UI panels and state changes?" |

The prompt also includes **common mistakes** to correct LLM biases:

> - Terraria is NOT top_down (it has gravity, it's platformer)
> - Angry Birds is NOT puzzle (it has gravity physics, it's platformer)
> - SimCity/Factorio are grid_logic, not top_down

## Built-In Fallback Rules

If documentation files are missing, `generate-gdd.ts` carries complete fallback rules for all 5 archetypes:

- **Platformer**: Physics params, 9 Ultimate Skills, config schema
- **Top-Down**: Sub-mode detection (tilemap vs arena), dual tileset rules
- **Grid Logic**: 5 sub-types (puzzle/tactics/match/arcade/roguelike), three-phase pipeline
- **Tower Defense**: Grid types, tower design, enemy design, wave design, economy
- **UI Heavy**: Scene flow, hook integrity rules, exported types

This makes the tool **self-contained** — it works even without the docs directory.

## Key Patterns Summary

| Pattern | Purpose |
|---------|---------|
| **Hook Integrity** | Prevent hallucinated API calls |
| **Zero Custom Code** | Force template reuse |
| **Config-First** | Centralize tunable values |
| **Template Enforcement** | Guarantee valid ASCII maps |
| **Asset Parameter Whitelist** | Prevent backend API failures |
| **Action Steering** | Keep agent pipeline running |
| **Built-In Fallbacks** | Ensure tool works without docs |
| **Physics-First Classification** | Avoid genre-name ambiguity |

## Related Pages

- [[opengame]] — OpenGame AI game generation framework
- [[game-design-document]] — General GDD templates
- [[agent-loop-architecture]] — AI Agent execution loop patterns
- [[claude-code-game-studio-architecture]] — 49-Agent game studio architecture
