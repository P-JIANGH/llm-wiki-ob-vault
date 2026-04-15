---
title: Biomes
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [tool, game-engine]
sources: [raw/articles/ai-game-devtools/biomes.md]
---

# Biomes

Open source sandbox MMORPG built for the web by [ill-inc](https://github.com/ill-inc), using Next.js, TypeScript, WebAssembly, React, and Three.js.

## Overview

Biomes is a web-based multiplayer sandbox game combining Minecraft-style voxel building with reactive UI paradigms. It demonstrates a full-stack web architecture capable of supporting real-time multiplayer, procedural world simulation, and in-browser 3D rendering at scale.

## Technical Architecture

### Client Stack
- **Next.js** — React framework for the web app shell and admin interface
- **Three.js** — 3D voxel rendering
- **WebAssembly** — C++ `voxeloo` library compiled via Bazel for performance-critical voxel operations
- **TypeScript** — Primary language across client and shared code

### Resource System (React ↔ Three.js Bridge)
Biomes solves the classic problem of persisting Three.js scene state across React re-renders via a custom **Resource System**:

- `BiomesResourcesBuilder` — define resources
- `TypedResourceDeps` — dependency injection between resources
- `TypedResources` / `ReactResources` — access from code / React components
- `ResourcePaths` — typed lookup keys with path-based argument passing

This pattern keeps Three.js game state persistent while React handles UI state reactively.

### Server Microservices
Distributed Go-free architecture with 12+ server types:

| Server | Function |
|--------|----------|
| `sync` | WebSocket termination; maintains world replica per client |
| `logic` | Player event handling (terrain editing, crafting) |
| `asset` | Player mesh generation |
| `chat` | Single-instance distributed lock, pub-sub messaging |
| `trigger` | Time-based quest/recipe/expiry processing |
| `newton` | Dropped item physics |
| `anima` | Sharded NPC AI |
| `gaia` | Natural simulation (plant growth, farming, lighting, muck/creep) |
| `task` | Long-lived async tasks (Firestore, crypto) |
| `map` | Periodic top-down world rendering |

Players connect via WebSocket to `sync` server, which fans out to relevant ECS updates. Redis holds world data; etcd maintains distributed locks.

### Data Layer

- **ECS** (Entity Component System) — dynamic game data (inventory, position, NPC state)
  - Schemas in Python → code-genned to TypeScript
  - Update with `./b gen:ecs`

- **Bikkie** — static content definition ("Biscuits" = item/block/quest/behavior definitions)
  - Admin UI at `/admin` for live editing
  - Schemas in `src/shared/bikkie/schema/`

### WASM / C++ Core (`voxeloo`)
- C++ voxel processing library compiled to WebAssembly via **Bazel**
- Build: `scripts/build_wasm.sh -t all`
- Python extension: `pip install ./voxeloo`

## Comparison to Similar Projects

Biomes is similar to [[ai-town|a16z AI Town]] in being a web-based social simulation, but Biomes is a full sandbox MMORPG with voxel building, physics, and a distributed microservices backend — whereas AI Town is a lightweight Convex/PixiJS virtual town demo.

Compared to [[behaviac]] (Tencent game AI behavior framework), Biomes' server-side uses ECS + Bikkie rather than behavior trees/FSM for game logic, and is designed for horizontal scaling via microservices.

The WASM voxel engine (`voxeloo`) + React Resource System pattern is architecturally distinct from Unity/Unreal-based web game approaches.

## Related Links

- [GitHub](https://github.com/ill-inc/biomes-game)
- [Website](https://www.biomes.gg)
- [Discord](https://discord.gg/biomes)
- [Documentation](https://ill-inc.github.io/biomes-game/)

## Related Wiki Pages

- [[ai-town]] — a16z virtual town simulation
- [[behaviac]] — Tencent game AI behavior framework
