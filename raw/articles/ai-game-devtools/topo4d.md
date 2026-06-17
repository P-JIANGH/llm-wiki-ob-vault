# Topo4D — Topology-Preserving Gaussian Splatting for 4D Head Capture

**Source:** https://github.com/XuanchenLi/Topo4D
**Publications:** ECCV 2024 | IEEE T-PAMI 2025 (Topo4D++)
**Extracted:** 2026-04-19

---

## Overview
Topo4D automates high-fidelity geometry and texture generation directly from calibrated multi-view time-series images of faces, eliminating manual artist processing while preserving temporal topology.

**Key insight:** Represent time-series faces as dynamic 3D Gaussians with fixed topology — Gaussian centers are explicitly bound to mesh vertices.

## Key Features
- **Topology-Preserving Representation:** Dynamic 3D Gaussians with fixed topology; Gaussian centers bound to mesh vertices
- **Alternating Optimization:** Frame-by-frame joint optimization of geometry and texture for high fidelity + temporal stability
- **Output:** Regularly wired dynamic facial meshes + 8K texture maps with pore-level detail
- **Superior quality** compared to SOTA face reconstruction methods

## Technical Architecture
- **Custom differentiable rasterizer:** `diff-gaussian-rasterization-w-depth` (with depth support)
- **3D face processing:** `face3d/` module for topology utilities
- **Camera calibration:** Reads Metashape XML format; configurable in `camera.py`
- **Loss functions:** Custom geometry + texture loss in `loss_util.py`

## Repository Structure
| Path | Purpose |
|---|---|
| `train.py` | Main training/optimization entry |
| `camera.py` | Camera calibration & projection |
| `helpers.py`, `loss_util.py` | Core helpers & loss implementations |
| `diff-gaussian-rasterization-w-depth/` | Custom rasterizer with depth |
| `face3d/` | 3D face processing & topology |
| `assets/facial_regions.pkl` | Predefined facial region partitions |

## Datasets
- **Example Test Data:** 24-view low-res images, face parsing masks, 4K keyframes (Google Drive)
- **Topo4D++ Benchmark (JHead):** 20 identities, 10 talking + 10 expression sequences (Baidu Pan)

## Testing Modes
1. Optimize geometry only
2. Optimize texture and geometry

## Citation
- ECCV 2024: Topo4D — Topology-Preserving Gaussian Splatting for High-fidelity 4D Head Capture
- IEEE T-PAMI 2025: Topo4D++ — Realistic Physically Based 4D Head Capture with Topology-Preserving Gaussian Splatting and Expression Priors
