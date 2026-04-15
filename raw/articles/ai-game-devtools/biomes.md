# Biomes

> Source: https://github.com/ill-inc/biomes-game (cloned 2026-04-15)

## Overview

Biomes is an open source sandbox MMORPG built for the web using web technologies (Next.js, TypeScript, WebAssembly). It uses React and reactive paradigms for gameplay. Built and maintained by ill-inc.

Website: https://www.biomes.gg

## Tech Stack

- **Frontend**: Next.js, TypeScript, React, Three.js
- **WASM**: C++ core library (`voxeloo`) compiled to WebAssembly via Bazel
- **Python**: ECS schema definitions and code generation
- **Infrastructure**: Redis, etcd, Firestore

## Architecture

### Client
- Next.js app with Three.js renderer
- Custom **Resource System** bridging React state ↔ Three.js scene persistence
- WebAssembly for performance-critical voxel operations

### Server (Microservices)
Distributed architecture with multiple server types:

| Server | Role |
|--------|------|
| `web` | NextJS API server, splash page, admin site |
| `logic` | High-level player events (terrain editing, etc.) |
| `asset` | Player mesh generation |
| `sync` | WebSocket endpoint, maintains world replica for clients |
| `chat` | Single-instance distributed lock, pub-sub chat |
| `task` | Long-lived async tasks (Firestore, crypto) |
| `trigger` | Time-based processor for quests, recipes, expiry |
| `newton` | Dropped item physics |
| `anima` | NPC AI (sharded) |
| `map` | Periodic top-down world rendering |
| `replica` | World subscription tier to reduce fan-out |
| `gaia` | Natural simulation: lighting, plant growth, farming, muck/creep |
| `oob` | Out-of-band entity loading for distant data |

Locally, specify subset: `./b web trigger`

### Core Data Systems

1. **ECS** (Entity Component System) — dynamic game data
   - Schemas defined in Python (`src/ecs/defs.py`)
   - Code-genned to TypeScript (`src/shared/ecs/gen`)
   - Entities (Player, NPC) composed of reusable components (Inventory, Position)
   - Update: `./b gen:ecs`

2. **Bikkie** — static content definition system
   - Content items called "Biscuits" with unique ID and attributes
   - Admin UI at `/admin` for editing biscuits
   - Schemas in `src/shared/bikkie/schema/`
   - Example: block drop rates, item prices, farming behavior

3. **Resource System** — solves React ↔ Three.js state synchronization
   - `BiomesResourcesBuilder`: define resources
   - `TypedResourceDeps`: dependency injection between resources
   - `TypedResources`: programmatic resource access
   - `ReactResources`: React component access
   - `ResourcePaths`: typed lookup keys

### WASM Core (`voxeloo`)
- C++ voxel processing library compiled to WebAssembly via Bazel
- Install Python extension: `pip install ./voxeloo`
- Build WASM: `scripts/build_wasm.sh -t all`

## License
MIT (per GitHub license badge)

## Repository Structure
```
biomes/
├── src/
│   ├── client/          # Client-only source
│   ├── server/          # Server microservices
│   │   ├── web/         # NextJS API server
│   │   ├── logic/       # Player event handling
│   │   ├── asset/       # Mesh generation
│   │   ├── sync/        # WebSocket / world replica
│   │   ├── chat/        # Chat server
│   │   ├── task/        # Async task processor
│   │   ├── trigger/     # Time-based triggers
│   │   ├── newton/      # Drop physics
│   │   ├── anima/       # NPC AI
│   │   └── ...
│   ├── shared/          # Shared libs (ECS, Bikkie, Resources)
│   ├── galois/          # Core WASM modules
│   └── voxeloo/         # C++ WASM voxel library
├── ecs/defs.py          # ECS schema definitions (Python)
├── docs/                # Docusaurus documentation site
└── package.json         # TS/JS workspace root
```
