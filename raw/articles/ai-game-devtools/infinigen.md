# Infinigen — Infinite Photorealistic Worlds Using Procedural Generation

**Source:** https://github.com/princeton-vl/infinigen
**Captured:** 2026-04-18

## Project Overview

Infinigen is an open-source procedural generation system by Princeton Vision & Learning Lab (Jia Deng's group) that creates infinite photorealistic 3D worlds. Built on Blender's Python API (bpy), it generates synthetic data for computer vision training and research.

Published in three CVPR papers (2023, 2024, 2025):
1. **Infinigen** (CVPR 2023): Core procedural generation of photorealistic nature scenes
2. **Infinigen Indoors** (CVPR 2024): Photorealistic indoor scene generation
3. **Infinigen-Articulated** (2025): Procedural generation of articulated simulation-ready assets

## Key Architecture

### Core Modules (infinigen/)

| Module | Description |
|--------|-------------|
| `core/` | Core utilities: world generation, camera config, annotation system |
| `assets/` | Procedural asset generators: terrain, creatures, plants, rocks, clouds, fluids |
| `datagen/` | Data generation pipeline: job management, ground truth annotations |
| `terrain/` | Terrain generation with SoilMachine (C++ compiled components) |
| `tools/` | Utility tools for managing jobs, assets, and configs |
| `OcMesher/` | Occlusion-based meshing utilities |
| `infinigen_gpl/` | GPL-licensed code (separated from BSD-3 core) |

### Examples (infinigen_examples/)

- `generate_nature.py` — Generate outdoor/nature scenes
- `generate_indoors.py` — Generate indoor room scenes
- `generate_asset_demo.py` — Generate individual assets
- `configs_nature/` — Configuration files for nature generation
- `configs_indoor/` — Configuration files for indoor generation

### Technical Details

- **Language:** Python 3.11 (strictly pinned)
- **Backend:** Blender 4.2.0 (bpy) — runs inside Blender's Python environment
- **Build System:** setuptools with Cython/NumPy for terrain compilation
- **Config System:** gin-config for declarative configuration
- **Job Management:** submitit (supports SLURM cluster execution)
- **Dependencies:** numpy, opencv, scipy, scikit-image, trimesh, shapely, pandas

### Generation Capabilities

1. **Infinigen-Nature:** Landscapes, vegetation, rocks, water, clouds, creatures
2. **Infinigen-Indoors:** Room layouts, furniture, materials, lighting
3. **Infinigen-Articulated:** Jointed/animated simulation assets (doors, drawers, etc.)

### Output Formats

- Photorealistic renders (PNG, EXR)
- Depth maps, surface normals, optical flow
- Instance/semantic segmentation masks
- 3D meshes (OBJ, OpenUSD)
- Physics simulation exports (MuJoCo, USD)

### Installation

Requires Blender 4.2.0 + Python 3.11. Uses `make` for setup and terrain compilation. Supports Docker via provided Dockerfile.

## License

BSD-3-Clause
