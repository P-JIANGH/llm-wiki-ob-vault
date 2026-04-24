---
title: OpenGame
created: 2026-04-24
updated: 2026-04-24
type: entity
tags: [project, game-engine, ai, agent, typescript, phaser, tool, cli]
sources: [raw/articles/opengame-2026.md]
---

# OpenGame

OpenGame is an **AI-driven game generation framework** that converts natural language game descriptions into playable Phaser 3 browser games through an LLM-powered tool chain.

**Repository**: [github.com/leigest519/OpenGame](https://github.com/leigest519/OpenGame)
**License**: MIT (inferred from package.json)
**Core Stack**: TypeScript, Phaser 3, Node.js, LLM APIs

## What It Does

You type a game idea in plain English (e.g., "a Mario-style platformer where you play as a cat"), and OpenGame:

1. **Classifies** the game archetype based on physics (gravity? perspective? movement type?)
2. **Generates** a Technical Game Design Document (GDD) tailored to the archetype
3. **Scaffolds** the project from pre-built templates
4. **Generates** assets (images, audio, tilemaps) via AI
5. **Implements** code using the template's Hook / Behavior system
6. **Builds and tests** the final game

## Architecture

### CLI + Core SDK
- `packages/cli` — Command-line interface (`opengame` command)
- `packages/core` — Tool chain: [[ai-gdd-prompt-engineering|GDD Generator]], game type classifier, asset generator, tilemap generator, code generator
- `packages/sdk-typescript` — TypeScript SDK for programmatic use

### Template System (`agent-test/templates/`)
Five archetype families, each with its own [[platformer-vs-topdown-basescene|BaseScene hierarchy]], entity behaviors, and design rules:

| Archetype | Physics | Perspective | Examples |
|-----------|---------|-------------|----------|
| **platformer** | Gravity ON | Side view | Mario, Terraria |
| **top_down** | Zero gravity | Top-down | Zelda, Isaac |
| **grid_logic** | Discrete steps | Top-down | Sokoban, Fire Emblem |
| **tower_defense** | Path-following | Top-down | Kingdom Rush |
| **ui_heavy** | None | N/A | Slay the Spire, Visual Novels |

### AI Tool Chain (`packages/core/src/tools/`)

| Tool | Purpose | Key File |
|------|---------|----------|
| `classify-game-type` | Physics-first archetype classification | `game-type-classifier.ts` |
| `generate-gdd` | Technical GDD generation with 6 sections | `generate-gdd.ts` |
| `generate_game_assets` | AI image/audio generation | (asset pipeline) |
| `generate_tilemap` | ASCII → tilemap JSON | (tilemap pipeline) |
| `todoWrite` | Task tracking | `todoWrite.ts` |

## Key Design Philosophy

> **"Constraints Over Generation"**
>
> The LLM does NOT write code from scratch. It fills templates under strict constraints. The Template API is the boundary of capabilities; Prompt Engineering guards the boundary.

This prevents LLM hallucinations from producing non-compiling code — a common failure mode in AI code generation.

## Workflow

```
User Description
    ↓
[Phase 1] classify-game-type → archetype
    ↓
[Phase 2] generate-gdd → GAME_DESIGN.md (6 sections)
    ↓
[Phase 3] generate_game_assets + generate_tilemap → assets
    ↓
[Phase 4] Merge config → gameConfig.json
    ↓
[Phase 5] Code implementation → TypeScript files
    ↓
[Phase 6] Build + Test + Verify
```

## Related Pages

- [[platformer-vs-topdown-basescene]] — Deep dive into BaseScene architecture differences
- [[ai-gdd-prompt-engineering]] — GDD generation prompt engineering patterns
- [[game-design-document]] — General GDD templates and guidelines
- [[phaser-vue-integration]] — Phaser 3 + Vue 3 integration patterns
