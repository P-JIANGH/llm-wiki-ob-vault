---
title: OpenGame - AI-Driven Game Generation Framework
source_url: https://github.com/leigest519/OpenGame
analyzed_date: 2026-04-24
analyzer: Claude Code
---

# OpenGame Project Analysis

## Project Overview

OpenGame is an **AI-driven game generation framework** that converts natural language game descriptions into playable Phaser 3 games through an LLM-powered tool chain.

**Repository**: https://github.com/leigest519/OpenGame
**Core Stack**: TypeScript, Phaser 3, Node.js, LLM APIs

## Architecture Components

### 1. CLI + Core SDK (`packages/cli`, `packages/core`)
- Command-line interface and tool chain
- AI Tool Chain: classifier, GDD generator, asset generator, code generator

### 2. Template System (`agent-test/templates/`)
Five game archetype templates:
- **platformer**: Side-view + gravity (Mario-style)
- **top_down**: Free 8-directional movement (Zelda-style)
- **grid_logic**: Discrete grid movement (Sokoban, Fire Emblem)
- **tower_defense**: Path-following enemies (Kingdom Rush)
- **ui_heavy**: UI-driven games (card games, visual novels)

### 3. BaseScene Hierarchy

**Platformer** (single-layer inheritance):
```
BaseLevelScene extends Phaser.Scene
```

**Top-Down** (three-layer inheritance):
```
BaseGameScene extends Phaser.Scene
    ├── BaseLevelScene extends BaseGameScene (Tilemap mode)
    └── BaseArenaScene extends BaseGameScene (Arena mode)
```

## Key Technical Findings

### Finding 1: BaseScene Implementation Differences

| Dimension | Platformer | Top-Down |
|-----------|-----------|----------|
| Physics | Gravity ON (Y-axis) | Zero gravity |
| Perspective | Side view | Top-down/Isometric |
| Movement | Left/Right + Jump | 8-directional WASD |
| World Bounds | Bottom open (fall death) | 4 sides closed |
| Camera | Follow + Y-offset (-128) | Configurable lerp + zoom |
| Depth Sorting | None | Y-Sort (pseudo-3D) |
| Knockback | 1D (horizontal + upward bounce) | 2D vector (angle-based) |

**Platformer 1D Knockback**:
```typescript
const direction = player.x < enemy.x ? -1 : 1;
player.setVelocityX(knockbackForce * direction); // 200
player.setVelocityY(-150); // Upward bounce
```

**Top-Down 2D Knockback**:
```typescript
const angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, player.x, player.y);
player.setVelocity(
  Math.cos(angle) * knockbackForce,
  Math.sin(angle) * knockbackForce
);
```

### Finding 2: GDD Generation Prompt Engineering

**Three-Layer System Prompt Architecture**:
1. **Core GDD Rules** (`docs/gdd/core.md`): Universal GDD format
2. **Archetype Design Rules** (`docs/modules/{arch}/design_rules.md`): Game design guides
3. **Template API** (`docs/modules/{arch}/template_api.md`): Code capabilities

**Key Prompt Engineering Patterns**:

1. **Hook Integrity Constraint**: "Every hook name MUST exist in template_api.md. Non-existent hooks cause compilation failure."

2. **Zero Custom Code Rule**: "Do not invent from scratch — use existing behaviors/hooks only."

3. **Config-First Values**: All numeric values use `{ "value": X }` wrapper format for gameConfig.json

4. **Template Enforcement for ASCII Maps**:
   - MUST copy predefined templates (A/B/C/D) VERBATIM
   - Do NOT invent new layouts — the AI cannot reliably design valid tilemaps
   - Only tweak: coins (C), platforms (=), enemies (E, max 4)

5. **Asset Type Strict Parameters**:
   - `type: "image"`: ONLY `key` and `description` allowed
   - `type: "animation"`: frame counts, directions specified
   - `type: "background"`: resolution required

6. **Action Steering in Output**:
   After GDD generation, system reminder injects structured next steps:
   ```
   DO NOT STOP. CONTINUE TO PHASE 3 NOW.
   ```

**Model Parameters**:
| Tool | Temperature | Reasoning |
|------|-------------|-----------|
| classify-game-type | 0.3 | Deterministic classification |
| generate-gdd | 0.5-0.7 | Creativity with constraints |

## Game Type Classifier Physics-First Logic

Classification based on physics, not genre:

1. **platformer**: "Does the character FALL if there's no ground?"
2. **top_down**: "Can the character move UP without jumping?"
3. **grid_logic**: "Does movement happen in discrete grid steps?"
4. **tower_defense**: "Do enemies follow a fixed path?"
5. **ui_heavy**: "Is the game primarily UI panels?"

## Arena Mode Unique Systems (BaseArenaScene)

Top-Down Arena mode adds systems Platformer lacks:

1. **Scrolling Background**: Two looping images (vertical/horizontal)
2. **Dynamic Spawner**: Timer-based with difficulty scaling
3. **Score System**: addScore() + onScoreChanged() hook
4. **Difficulty System**: Auto-increasing every 30s
5. **Boss System**: Kill count threshold triggers onBossSpawn()

**Difficulty Scaling**:
```typescript
getSpawnInterval(): number {
  return Math.max(500, 2000 - (this.difficultyLevel - 1) * 200);
}
```

## Y-Sort Implementation (Top-Down)

```typescript
private updateYSort(): void {
  const sortables = [player, ...enemies, ...obstacles];
  sortables.sort((a, b) => {
    const aY = a.body?.bottom ?? a.y;
    const bY = b.body?.bottom ?? b.y;
    return aY - bY; // Lower Y (higher on screen) = back
  });
  sortables.forEach((entity, i) => entity.setDepth(i + 1));
}
```

## Workflow: From Description to Game

1. **Phase 1**: `classify-game-type` → determines archetype
2. **Phase 2**: `generate-gdd` → creates Technical GDD (6 sections)
3. **Phase 3**: `generate_game_assets` + `generate_tilemap` → assets
4. **Phase 4**: Merge GDD config into gameConfig.json
5. **Phase 5**: Code implementation using templates
6. **Phase 6**: Build, test, verify

## Design Philosophy

**"Constraints Over Generation"**:
- Not letting LLM write code from scratch
- LLM fills templates under strict constraints
- Template API is the boundary of capabilities
- Prompt engineering guards the boundary
