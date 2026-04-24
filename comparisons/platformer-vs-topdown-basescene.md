---
title: "Platformer vs Top-Down BaseScene: Implementation Differences"
created: 2026-04-24
updated: 2026-04-24
type: comparison
tags: [comparison, game-dev, phaser, architecture, frontend]
sources: [raw/articles/opengame-2026.md]
---

# Platformer vs Top-Down BaseScene: Implementation Differences

This page compares the Phaser 3 scene base classes from the [[opengame|OpenGame]] framework — specifically how the `platformer` and `top_down` archetypes diverge in their core scene architecture.

## Inheritance Hierarchy

**Platformer** uses a flat, single-layer design:
```
BaseLevelScene ──extends──> Phaser.Scene
```

**Top-Down** uses a layered three-tier design:
```
BaseGameScene ──extends──> Phaser.Scene     (shared utilities)
    ├── BaseLevelScene ──extends──> BaseGameScene   (Tilemap mode)
    └── BaseArenaScene ──extends──> BaseGameScene   (Arena mode)
```

The Top-Down split separates **world construction** (tilemap vs scrolling background) from **shared game logic** (groups, collisions, input, hooks).

## Core Differences Table

| Dimension | Platformer BaseLevelScene | Top-Down BaseGameScene |
|-----------|---------------------------|----------------------|
| **Physics** | Gravity ON (Y-axis) | Zero gravity (`gravity.y = 0`) |
| **Perspective** | Side view | Top-down / isometric |
| **Movement** | Left/Right + Jump (WASD) | 8-directional WASD + mouse aim |
| **World Bounds** | Bottom open → fall death | All 4 sides closed |
| **Camera** | Follow player + Y-offset (-128px) | Configurable lerp + zoom |
| **Depth Sorting** | None (side view) | Y-Sort (pseudo-3D depth) |
| **Input** | WASD + Space + Shift + E + Q | Same + right-click (context menu disabled) |

## Knockback Mechanics

The most revealing implementation difference is how knockback is calculated.

### Platformer: 1D Knockback
Platformer uses a simple horizontal bounce + upward velocity — gravity handles the arc:

```typescript
// Horizontal direction only
const direction = player.x < enemy.x ? -1 : 1;
player.setVelocityX(knockbackForce * direction);  // 200
player.setVelocityY(-150);  // Fixed upward bounce
```

### Top-Down: 2D Vector Knockback
Top-Down uses `Phaser.Math.Angle.Between` to compute a precise 2D vector:

```typescript
const angle = Phaser.Math.Angle.Between(
  enemy.x, enemy.y, player.x, player.y
);
player.setVelocity(
  Math.cos(angle) * knockbackForce,   // 200
  Math.sin(angle) * knockbackForce
);
```

The same 2D vector logic is reused for bullet knockback (along bullet velocity) and melee attacks (from attacker toward target).

## Create Flow Comparison

### Platformer (6 phases)
```
1. Environment (mapSize, background, tileMap)
2. Group Initialization
3. Entity Creation (decorations, player, enemies)
4. System Setup (camera, worldBounds, inputs)
5. Collision Setup (base + custom)
6. UI Launch
```

### Top-Down BaseLevelScene (7 phases)
```
1. Map Setup (setupMapSize)
2. Group Initialization (BEFORE environment)
3. Environment (createEnvironment — dual tilesets)
4. Entity Creation
4.5. Crosshair (HOOK)
5. System Setup (camera, worldBounds, inputs, configurePhysics)
6. Collision Setup (core + wall + custom)
7. UI Launch
```

The extra phases are:
- **Crosshair**: Top-down aiming reticle (not needed in side view)
- **configurePhysics**: Explicitly disables gravity (`gravity.y = 0`)
- **Wall collisions**: Tilemap wall layer colliders

### Top-Down BaseArenaScene (Arena-specific)
Replaces tilemap phases with:
- **Scrolling background**: Two looping images
- **Dynamic spawning**: No pre-placed enemies
- **Static camera**: No follow — player moves within screen

## Y-Sort Depth Rendering

Top-Down's `BaseGameScene` implements Y-Sort each frame — entities lower on screen (higher Y) appear in front:

```typescript
private updateYSort(): void {
  const sortables = [player, ...enemies, ...obstacles, ...ySortGroup];
  sortables.sort((a, b) => {
    const aY = a.body?.bottom ?? a.y;
    const bY = b.body?.bottom ?? b.y;
    return aY - bY;  // Sort by foot position
  });
  sortables.forEach((entity, i) => entity.setDepth(i + 1));
}
```

Platformer has no equivalent — side-view sprites are already ordered by design.

## Arena-Only Systems

`BaseArenaScene` adds systems Platformer completely lacks:

| System | Purpose |
|--------|---------|
| **Scrolling Background** | `setupScrollingBg()` + `updateBackground()` loops two images |
| **Dynamic Spawner** | Timer-based enemy spawn with difficulty scaling |
| **Score System** | `addScore()` + `onScoreChanged()` hook |
| **Difficulty Ramp** | Level auto-increases every 30s |
| **Boss Trigger** | Kill count threshold → `onBossSpawn()` |

```typescript
// Spawn interval shrinks as difficulty rises
getSpawnInterval(): number {
  return Math.max(500, 2000 - (this.difficultyLevel - 1) * 200);
}
```

## Design Philosophy Takeaway

| Platformer | Top-Down |
|-----------|----------|
| Single-layer inheritance, self-contained | Three-layer inheritance, responsibility separation |
| Pre-placed enemies per level | Two modes: pre-placed (Tilemap) + dynamic (Arena) |
| Gravity-driven platforming | Zero-gravity free movement |
| 1D horizontal world | 2D complete world |
| No depth sorting | Y-Sort pseudo-3D |

Both use the same **Template Method Pattern** (`createBaseElements()` + `baseUpdate()`) and **Hook Pattern** (`onPreCreate`, `onPostUpdate`, etc.) — the OpenGame framework enforces architectural consistency across archetypes.

## Related Pages

- [[opengame]] — OpenGame AI game generation framework
- [[phaser-vue-integration]] — Phaser 3 + Vue 3 integration
- [[game-design-document]] — GDD templates and guidelines
- [[godot-vs-unity-unreal]] — Engine comparison for context
