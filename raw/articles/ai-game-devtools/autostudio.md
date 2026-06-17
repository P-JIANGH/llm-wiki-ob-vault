# AutoStudio: Crafting Consistent Subjects in Multi-turn Interactive Image Generation

**Source:** https://github.com/donahowe/AutoStudio
**Conference:** CVPRW 2026
**Paper:** https://arxiv.org/abs/2406.01388
**Project Page:** https://howe183.github.io/AutoStudio.io/
**Previous Work:** [TheaterGen](https://github.com/donahowe/TheaterGen)
**Extracted:** 2026-04-17 (web extract; GitHub/gitcode/gitee clone all failed)

## Overview

AutoStudio is a **training-free multi-agent framework** for multi-turn interactive image generation. It combines Large Language Models (LLMs) for dialogue/context management with Stable Diffusion (SD) for high-fidelity image generation.

**Core Problem:** As Text-to-Image (T2I) models excel at single-image generation, multi-turn interactive image generation becomes challenging. Users may switch subjects frequently across turns, and current efforts struggle to maintain subject consistency while generating diverse images.

## Architecture: Four Specialized Agents

1. **Subject Manager** — Interprets multi-turn dialogues & maintains contextual memory for each subject
2. **LayoutGenerator** — Produces fine-grained bounding boxes to precisely control subject placement
3. **Supervisor** — Evaluates layouts & provides iterative refinement suggestions
4. **Drawer** — Executes the final image generation pipeline

## Technical Innovations

- **Parallel-UNet:** Replaces the standard UNet in the Drawer. Employs two parallel cross-attention modules to explicitly exploit subject-aware features.
- **Subject-Initialized Generation:** A novel initialization strategy designed to preserve small subjects that are typically lost or distorted during generation.
- **Training-Free:** No model training required; operates entirely with pre-trained models.

## Performance

Evaluated on CMIGBench benchmark + human evaluations:
- +13.65% in average Fréchet Inception Distance (FID)
- +2.83% in average character-character similarity
- Maintains robust multi-subject consistency across multiple interactive turns

## Setup & Dependencies

**Prerequisites:**
1. Download pretrained SD checkpoints (recommend `dreamlike-art/dreamlike-anime-1.0`) & IP-Adapter
2. Prepare detection weights:
   - `/DETECT_SAM/efficient_sam_s_gpu.jit`
   - `/DETECT_SAM/Grounding-DINO/groundingdino_swint_ogc.pth`

**Run:** `python run.py`

## Tech Stack

- Jupyter Notebook 78.0%
- Python 20.6%
- CUDA 1.3%
- C++ 0.1%

## Repository Stats

- ⭐ 448 stars
- 🍴 30 forks
- 👁️ 10 watchers

## Timeline

| Date | Update |
|------|--------|
| 2024.06.26 | Reached 200⭐ |
| 2024.06.22 | Bugs fixed, SDXL version released |
| 2024.06.11 | SDv1.5 code released |
| 2024.06.06 | Repository officially released |

## Authors

Junhao Cheng, Xi Lu, Hanhui Li, Khun Loun Zai, Baiqiao Yin, Yuhao Cheng, Yiqiang Yan, Xiaodan Liang

**Contact:** howe4884@outlook.com

## Citation

```bibtex
@article{cheng2024autostudio,
  title={AutoStudio: Crafting Consistent Subjects in Multi-turn Interactive Image Generation},
  author={Cheng, Junhao and Lu, Xi and Li, Hanhui and Zai, Khun Loun and Yin, Baiqiao and Cheng, Yuhao and Yan, Yiqiang and Liang, Xiaodan},
  journal={arXiv preprint arXiv:2406.01388},
  year={2024}
}
```
