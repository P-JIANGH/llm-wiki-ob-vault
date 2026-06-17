# NVIDIA Instant Neural Graphics Primitives (instant-ngp)

**Source:** https://github.com/NVlabs/instant-ngp
**Cloned from:** gitcode.com/NVlabs/instant-ngp (GitHub timeout)
**Date:** 2026-04-18

## README Summary

Instant Neural Graphics Primitives with a Multiresolution Hash Encoding.
ACM Transactions on Graphics (SIGGRAPH), July 2022.
Authors: Thomas Müller, Alex Evans, Christoph Schied, Alexander Keller (NVIDIA)

### Four Neural Graphics Primitives
1. **Neural Radiance Fields (NeRF)** — novel view synthesis from photos, trains in seconds
2. **Signed Distance Functions (SDFs)** — mesh reconstruction from OBJ files
3. **Neural Images** — high-resolution image representation (gigapixel)
4. **Neural Volumes** — volumetric rendering (e.g., Disney cloud data)

### Key Architecture
- MLP with **multiresolution hash input encoding**
- Powered by **tiny-cuda-nn** framework (NVIDIA's fast CUDA neural network library)
- GPU-accelerated training and rendering
- NeRF fox demo: trains in under 5 seconds on RTX 3090

### Interactive GUI Features
- Comprehensive controls for neural graphics primitives exploration
- **VR mode** (OpenXR-compatible: OculusVR, SteamVR)
- Snapshot save/load for sharing
- Camera path editor for video creation
- NeRF→Mesh and SDF→Mesh conversion
- Camera pose and lens optimization
- DLSS support (Vulkan-based)

### Build System
- CMake 3.18+, C++14, CUDA
- Languages: C, C++, CUDA
- Options: executable, GUI (GLFW+GLEW), OptiX, Python bindings, Vulkan (DLSS)
- Pre-built binaries for RTX 1000-5000 series (Pascal through Blackwell)

### Python Bindings
- Full feature access via `pyngp` module
- `scripts/run.py` — headless execution, superset of CLI args
- `load_snapshot` / `save_snapshot` for model persistence
- Can use tiny-cuda-nn's PyTorch extension for custom experiments

### Project Structure
- `src/` — Core CUDA implementations (main.cu, testbed.cu, testbed_nerf.cu, testbed_sdf.cu, testbed_volume.cu, etc.)
- `configs/` — Configuration files (image/, nerf/, sdf/, volume/)
- `dependencies/` — Submodules (tiny-cuda-nn, imgui, pybind11, GLFW, OptiX, OpenXR-SDK, etc.)
- `docs/` — Documentation including NeRF dataset tips
- `notebooks/` — Google Colab compatible notebook
- `scripts/` — Python scripts (run.py, convert_image.py, etc.)
- `data/` — Sample datasets (nerf/fox, sdf/armadillo, image/albert)

### License
NVIDIA Source Code License-NC (non-commercial)

### Key Dependencies
- tiny-cuda-nn (fast CUDA neural networks + hash encoding)
- Dear ImGui (GUI)
- pybind11 (Python interop)
- Eigen (linear algebra)
- stb_image (PNG/JPEG)
- tinyexr (EXR format)
- tinyobjloader (OBJ format)
- OptiX (hardware ray tracing, optional)
- Vulkan (DLSS support, optional)
