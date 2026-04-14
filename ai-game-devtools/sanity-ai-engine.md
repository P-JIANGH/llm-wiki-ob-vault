---
title: Sanity AI Engine
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [tool, game, ai-model, open-source]
sources: [raw/articles/ai-game-devtools/sanity-ai-engine.md]
---

# Sanity AI Engine

## Overview

An AI engine for the [Unity Game Editor](https://unity.com/) providing classical game AI algorithms through Unity components and scripts. The engine offers pathfinding (A\*, LPA\*), steering behaviors, graph abstractions, and actor abstractions — all exposed as reusable Unity MonoBehaviour components.

**License:** MIT | **Language:** C# | **Framework:** Unity

## Architecture

The engine is organized in three layers:

```
SanityEngine/
├── Components/        # High-level Unity MonoBehaviour components
│   ├── Actors/        # Entity abstractions (Dynamic, Static, Rigidbody, CharacterController)
│   ├── DecisionMaking/ # Mouse interactors (Ray, Nearest)
│   ├── LevelRepresentation/  # Grid, PseudoGrid
│   ├── Motors/        # Motor abstractions
│   ├── Movement/       # PathFollowerComponent
│   ├── Steering/       # SteeringBehaviorAsset/Component/Manager
│   └── Utility/        # UnityGraph, UnityNode, UnityEdge adapters
├── Editor/             # Unity Editor scripts (inspectors, asset creators)
└── LowLevel/           # Core algorithm implementations
    ├── Actors/         # Actor interfaces
    ├── Search/         # PathFinder interface + A*/BestFirst/LPA* algorithms
    ├── Structure/      # Graph and Path data structures
    └── Utility/        # Containers, DistanceMetrics, Heuristics
```

## Key Components

### PathFinding (LowLevel/Search/PathFinding/)
- `PathFinder` — interface decoupling algorithm from graph representation
- `ASearch` — A\* algorithm; heuristic must be admissible (less than actual cost)
- `LPAStarSearch` — Lifelong Planning A\* for dynamic environment replanning
- `BestFirstSearch` — base framework for priority-queue-driven search

### Actors (Components/Actors/)
- `DynamicActor` — tracks velocity/angularVelocity per FixedUpdate via Transform delta
- `StaticActor` — fixed-position actor
- `RigidbodyActor` — wraps Rigidbody physics
- `CharacterControllerActor` — wraps Unity CharacterController
- `GameObjectActor` — base class wrapping GameObject Transform

### Steering (Components/Steering/)
- `SteeringBehaviorAsset` — ScriptableObject asset
- `SteeringBehaviorComponent` — MonoBehaviour wrapper
- `SteeringManagerComponent` — manages multiple steering behaviors per actor

### Level Representation (Components/LevelRepresentation/)
- `Grid.cs` — grid graph representation
- `PseudoGridGenerator.cs` — generates waypoint graph from grid

### Utility (Components/Utility/)
- `UnityGraph.cs` — wraps Unity scene objects into the Sanity graph structure
- `UnityNode` / `UnityEdge` — Unity-specific graph elements
- `GameObjectNode` / `GameObjectEdge` — GameObject-based graph elements

## Technical Notes

- **Era:** Circa 2010 (Unity 3.x/4.x era); purely classical game AI — no ML/LLM integration
- **Design pattern:** Interface-based (`PathFinder`, `Actor`) + adapter pattern (`UnityGraph`) for clean separation between algorithms and Unity's scene model
- **Use case:** NPC navigation, dynamic obstacle avoidance, interactive AI debugging in Unity Editor

## Related Tools

- [[ai-game-devtools/interactml-unity]] — Interactive ML plugin for Unity (kNN/MLP/DTW) — also Unity-based AI toolkit
- [[ai-game-devtools/chatgpt-api-unity]] — ChatGPT API integration for Unity — another Unity AI integration
- [[ai-game-devtools/llmunity]] — LLM integration for Unity — Unity AI tooling ecosystem

## Links

- [GitHub](https://github.com/tosos/SanityEngine)
- [Website](http://www.tosos.com/sanityengine/)
