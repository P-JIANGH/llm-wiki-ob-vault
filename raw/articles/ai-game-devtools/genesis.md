# Genesis — Source Material

**Source:** https://github.com/Genesis-Embodied-AI/Genesis
**Cloned:** 2026-04-16
**License:** Apache 2.0

## Overview

Genesis is a universal physics platform for Robotics/Embodied AI/Physical AI applications. It is simultaneously:
1. A universal physics engine rebuilt from scratch
2. A lightweight, ultra-fast, Pythonic robotics simulation platform
3. A powerful and fast photo-realistic rendering system
4. A generative data engine (natural language → multi-modal data)

## Key Facts

- **Version:** 0.4.6 (PyPI)
- **Python:** >=3.10, <3.14
- **Speed:** 43M+ FPS with single RTX 4090 (430,000x real-time for Franka arm)
- **Cross-platform:** Linux, macOS, Windows; CPU / NVIDIA GPU / AMD GPU / Apple Metal
- **Package:** `genesis-world` on PyPI

## Architecture

```
genesis/
├── genesis/              # Main source
│   ├── __init__.py       # Entry: gs.init(), global state
│   ├── engine/
│   │   ├── scene.py      # Scene class — main API
│   │   ├── simulator.py  # Manages all solvers
│   │   ├── entities/     # RigidEntity, MPMEntity, SPHEntity, FEMEntity, PBD*, DroneEntity, ToolEntity
│   │   ├── solvers/      # rigid/, mpm_solver.py, sph_solver.py, fem_solver.py, pbd_solver.py, sf_solver.py
│   │   ├── materials/    # Per-solver material definitions
│   │   └── couplers/     # Inter-solver coupling
│   ├── options/          # Pydantic config: morphs.py, solvers.py, surfaces.py
│   ├── vis/              # Visualizer, Camera, Viewer
│   └── sensors/          # camera, IMU, etc.
├── tests/
├── examples/
└── genesis/assets/        # Built-in meshes, URDFs, textures
```

## Physics Solvers

| Solver | Purpose | Options Class |
|--------|---------|--------------|
| Rigid | Articulated rigid body dynamics | `gs.options.RigidOptions` |
| MPM | Material Point Method — continuum mechanics, deformable solids | `gs.options.MPMOptions` |
| SPH | Smoothed Particle Hydrodynamics — fluids | `gs.options.SPHOptions` |
| FEM | Finite Element Method — deformable bodies | `gs.options.FEMOptions` |
| PBD | Position Based Dynamics — cloth, soft bodies | `gs.options.PBDOptions` |
| SF | Stable Fluid — Eulerian smoke/fluids | `gs.options.SFOptions` |

## Material Models

Supports simulation and coupling of: rigid bodies, liquids, gases, deformable objects, thin-shell objects, granular materials.

Materials: `gs.materials.Rigid()`, `gs.materials.MPM.Elastic()`, `gs.materials.SPH.Liquid()`, `gs.materials.PBD.Cloth()`, etc.

## Morphs (Geometry)

Primitives: `Box`, `Sphere`, `Plane`
Robot descriptions: `URDF`, `MJCF`
Mesh formats: `.obj`, `.glb`, `.ply`, `.stl`

## Key Dependencies

- **Physics:** MuJoCo (rigid dynamics), Taichi (compute backend), libccd (collision)
- **Rendering:** LuisaRender (ray-tracing DSL), Pyrender (rasterization), Madrona (batch renderer)
- **ML/Utils:** PyTorch, NumPy, Pydantic, Trimesh, OpenCV, scikit-image

## Installation

```bash
pip install genesis-world  # Requires PyTorch first
# or
git clone https://github.com/Genesis-Embodied-AI/Genesis.git
cd Genesis && pip install -e ".[dev]"
# or with uv
uv sync && uv pip install torch --index-url https://download.pytorch.org/whl/cu126
```

## Notable Papers Referenced

- FluidLab (MPM solver)
- Roboninja (cutting policy)
- RoboGen (generative simulation)
- Diffusebot (soft robot diffusion)
- Gen2sim (scaling robot learning in simulation)
- DiffTactile (differentiable tactile simulator)
- LuisaRender (ray-tracing framework)
