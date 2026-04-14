# Sanity AI Engine — Raw Source

**Source:** https://github.com/tosos/SanityEngine  
**Cloned:** 2026-04-14  
**License:** MIT  
**Category:** Game (World Model & Agent)

---

## README.md

```
Sanity Engine
=============
Copyright (c) 2010 Sanity Development Team

The Sanity Engine is an AI engine for the Unity Game Editor.
The goal of the engine is to provide easy access to common AI algorithms
and techniques through Unity components and scripts.

Getting Started:
Clone the git repository into your project's Assets folder.
Once the SanityEngine folder is in your project, you can use any of the components.
```

---

## Architecture

### Directory Structure
```
SanityEngine/
├── Components/          # High-level Unity components
│   ├── Actors/          # Entity abstractions (Dynamic, Static, Rigidbody, etc.)
│   ├── DecisionMaking/  # Mouse interaction for decisions
│   ├── LevelRepresentation/  # Grid, PseudoGrid representations
│   ├── Motors/          # Motor abstractions
│   ├── Movement/        # PathFollowerComponent
│   ├── Steering/        # SteeringBehaviorAsset, SteeringManager
│   └── Utility/         # Graph adapters (UnityGraph, UnityNode, UnityEdge)
├── Editor/              # Unity Editor scripts (inspectors, asset creators)
└── LowLevel/            # Core algorithm implementations
    ├── Actors/           # Actor interfaces
    ├── DecisionMaking/
    ├── Movement/
    ├── Search/           # PathFinding algorithms
    │   ├── PathFinder.cs  # PathFinder interface
    │   └── Algorithms/
    │       ├── ASearch.cs    # A* algorithm
    │       ├── BestFirstSearch.cs
    │       └── LPAStarSearch.cs  # LPA* (Lifelong Planning A*)
    ├── Structure/
    │   ├── Graph/        # Graph data structure
    │   └── Path/         # Path data structure
    └── Utility/
        ├── Containers/
        ├── DistanceMetrics.cs
        └── Heuristics/
```

---

## Key Components

### Actors (Components/Actors/)
- `DynamicActor.cs` — Tracks velocity/angular velocity via Transform delta per FixedUpdate
- `StaticActor.cs` — Fixed-position actor
- `RigidbodyActor.cs` — Wraps Rigidbody physics
- `CharacterControllerActor.cs` — Wraps Unity CharacterController
- `GameObjectActor.cs` — Base class wrapping GameObject Transform

### PathFinding (LowLevel/Search/PathFinding/Algorithms/)
- `ASearch.cs` — A* search. Heuristic must return LESS than actual cost (admissible heuristic requirement)
- `BestFirstSearch.cs` — Base best-first search framework
- `LPAStarSearch.cs` — LPA* (Lifelong Planning A*) for dynamic replanning

### Steering (Components/Steering/)
- `SteeringBehaviorAsset.cs` — ScriptableObject asset for steering behaviors
- `SteeringBehaviorComponent.cs` — Unity MonoBehaviour wrapper
- `SteeringManagerComponent.cs` — Manages multiple steering behaviors per actor

### Level Representation (Components/LevelRepresentation/)
- `Grid.cs` — Grid graph representation
- `PseudoGridGenerator.cs` — Generates pseudo-grid (waypoint graph from grid)

### Utility (Components/Utility/)
- `UnityGraph.cs` — Wraps Unity scene objects into Sanity graph structure
- `UnityNode.cs`, `UnityEdge.cs` — Unity-specific graph node/edge implementations
- `GameObjectNode.cs`, `GameObjectEdge.cs` — GameObject-based graph elements

### Decision Making (Components/DecisionMaking/)
- `RayMouseInteractor.cs` — Raycast-based mouse interaction
- `NearestMouseInteractor.cs` — Nearest-object mouse interaction

---

## Technical Notes
- **Language:** C# (Unity)
- **Framework:** Unity (presumably Unity 3.x/4.x era based on 2010 copyright)
- **No ML/AI model integration** — purely classical game AI (pathfinding, steering, FSM)
- **Graph abstraction layer** decouples AI algorithms from Unity scene objects
- **PathFinder interface** allows swapping algorithms (A*, BestFirst, LPA*) without changing client code

---

## Related Links
- Website: http://www.tosos.com/sanityengine/
- Unity: http://www.unity3d.com/
