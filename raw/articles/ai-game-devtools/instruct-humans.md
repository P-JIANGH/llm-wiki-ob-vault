# InstructHumans: Editing Animated 3D Human Textures with Instructions

- **Source:** https://github.com/viridityzhu/InstructHumans
- **Publication:** IEEE Transactions on Multimedia (TMM)
- **Extracted:** 2026-04-18
- **Status:** GitHub clone failed (timeout), gitcode 403, gitee unavailable — content from web_extract only

## Overview

InstructHumans edits 3D human textures with natural language instructions while maintaining avatar consistency and enabling seamless animation.

**Authors:** Jiayin Zhu (NUS), Linlin Yang (Communication University of China), Angela Yao (NUS)

**Abstract:** "InstructHumans edits 3D human textures with instructions. It maintains avatar consistency and enables easy animation."

## Links
- [IEEE Paper](https://ieeexplore.ieee.org/document/11417296)
- [arXiv](https://arxiv.org/abs/2404.04037)
- [Project Page](https://jyzhu.top/instruct-humans/)

## Environment
- PyTorch 2.0.1 | CUDA 11.7
- kaolin library required (separate installation, prebuilt wheels for older CUDA/PyTorch)
- Known issue: `from kaolin import _C ImportError` — caused by CUDA version incompatibility; fix by aligning CUDA versions or reinstalling kaolin with `--force`

## Repository Structure
| Path | Purpose |
|:---|:---|
| `assets/` | Teasers, demo GIFs, visual results |
| `data/` | Dataset files and pre-processed tracing data |
| `lib/` | Core utilities & configuration (lib/utils/config.py) |
| `test/` | Evaluation scripts & output directory |
| `tools/` | Data conversion utilities (load_motionx_smplx.py) |
| `config.yaml` | Default hyperparameters & settings |
| `edit.py` / `train.py` | Primary editing and training entry points |
| `environment.yml` / `requirements.txt` | Conda & pip dependency specifications |

## Capabilities

### Instruction-Based Editing
Transforms 3D human textures via text prompts:
- "Turn the person into a clown"
- "Lord Voldemort"
- "Put the person in a suit"
- "A bronze statue"

### Consistency & Animation
- Preserves structural avatar consistency across edits
- Supports dynamic posing/animation without texture degradation

### Pre-Processing Optimization
- Pre-samples and caches intermediate ray-tracing results into `.h5` file
- Eliminates redundant computations, drastically accelerates editing pipeline
- ~30 mins per subject for ray-tracing cache

### Animation Pipeline
- Convert MotionX SMPL-X JSON to .obj
- Re-pose edited avatar, render frames/video
- Outputs: per-frame images + .mp4 video to test/outputs/

## Workflow
1. Create conda env, install kaolin separately
2. Download checkpoints & smplx models; use ID 32 data for quick start
3. Run edit.py with `--instruction` and config flags
4. Convert external motion data (MotionX) to .obj, re-pose and render

## Key Dependencies (from README)
- editable-humans (github.com/custom-humans/editable-humans)
- instruct-nerf2nerf (github.com/ayaanzhaque/instruct-nerf2nerf)
- kaolin (NVIDIA 3D deep learning library)
- SMPL-X body model
- MotionX for motion data

## Note
No LICENSE file found in the extracted content. Academic citation requested.
