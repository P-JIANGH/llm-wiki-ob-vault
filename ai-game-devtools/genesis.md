---
title: Genesis
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [ai, tool, agent, project]
sources: [raw/articles/ai-game-devtools/genesis.md]
---

# Genesis

## Overview

Genesis is a **universal physics engine** and **robotics simulation platform** built from the ground up for Embodied AI and Physical AI applications. It combines six physics solvers (rigid body, MPM, SPH, FEM, PBD, stable fluid) in a unified framework with photo-realistic ray-tracing rendering and a generative data engine for automated robotics data synthesis.

## Key Facts

| Property | Value |
|----------|-------|
| **Type** | Physics simulation platform |
| **License** | Apache 2.0 |
| **Language** | Python (>=3.10, <3.14) |
| **Version** | 0.4.6 (PyPI: `genesis-world`) |
| **Speed** | 43M+ FPS on RTX 4090 (430,000x real-time) |
| **Platforms** | Linux, macOS, Windows; CPU / NVIDIA GPU / AMD GPU / Apple Metal |
| **GitHub** | https://github.com/Genesis-Embodied-AI/Genesis |

## Technical Architecture

### Physics Solvers

Genesis integrates **six physics solvers** under a unified `Simulator` abstraction:

- **Rigid:** Articulated rigid body dynamics (via MuJoCo)
- **MPM (Material Point Method):** Continuum mechanics, deformable solids, granular materials
- **SPH (Smoothed Particle Hydrodynamics):** Fluid simulation
- **FEM (Finite Element Method):** Deformable body mechanics
- **PBD (Position Based Dynamics):** Fast cloth and soft body simulation
- **SF (Stable Fluid):** Eulerian smoke and gas simulation

### Entity Types

Each solver handles specific entity types: `RigidEntity` (robots), `MPMEntity` (deformable solids), `SPHEntity` (liquids), `FEMEntity` (finite element), `PBD*Entity` (cloth/soft), `DroneEntity` (quadcopters), `ToolEntity` (cutting tools).

### Rendering

Dual renderer system: **LuisaRender** (DLSL-based ray-tracing) for photo-realistic output, and **Pyrender** (OpenGL rasterization) for fast visualization. A batch renderer (Madrona) enables GPU-accelerated scene rendering.

## Differentiation from Related Tools

Unlike game engines like [[ai-game-devtools/biomes]] (voxel web game) or agent frameworks like [[agentscope]] (multi-agent orchestration), Genesis is a **low-level physics engine** purpose-built for robotics simulation. Compared to MuJoCo (itself used internally), Genesis provides a unified Pythonic API across multiple physics domains plus generative data capabilities. Unlike [[GameGen-O]] (game video generation), Genesis simulates **real physics** interactively rather than generating video frames.

## Related Concepts

Genesis's MPM solver draws from [[ai-game-devtools/fluidlab|FluidLab]] concepts; its rendering builds on [[LuisaRender]]. It competes with NVIDIA [[OmniGibson]] for embodied AI simulation and pairs with data generation workflows from [[ai-game-devtools/agent-laboratory|Agent Laboratory]].
