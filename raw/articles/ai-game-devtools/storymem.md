# StoryMem: Multi-shot Long Video Storytelling with Memory

**Source:** https://github.com/Kevin-thu/StoryMem | **arXiv:** 2512.19539 | **HuggingFace:** https://huggingface.co/Kevin-thu/StoryMem | **Project Page:** https://kevin-thu.github.io/StoryMem/

## Project Overview

- **Authors:** Kaiwen Zhang, Liming Jiang (Project Lead), Angtian Wang, Jacob Zhiyuan Fang, Tiancheng Zhi, Qing Yan, Hao Kang, Xin Lu, Xingang Pan (Corresponding Author)
- **Core Capability:** Generates **minute-long, multi-shot narrative videos** from per-shot text descriptions
- **Key Innovation:** Shot-by-shot generation using a **memory-conditioned single-shot video diffusion model** that maintains narrative continuity across scenes

## Architecture & Workflow

### Generation Pipeline
1. **Initial Memory:** T2V model generates the first shot to establish baseline memory
2. **Sequential Generation:** M2V (Memory-to-Video) model generates remaining shots one-by-one
3. **Memory Update:** Automatically extracts keyframes and updates the memory buffer after each shot to preserve character/scene consistency

### Model Components (Built on Wan2.2)

| Component | Type | Source |
|:---|:---|:---|
| Wan2.2 T2V-A14B | Text-to-Video MoE | Wan-AI/HF |
| Wan2.2 I2V-A14B | Image-to-Video MoE | Wan-AI/HF |
| StoryMem M2V-A14B | Memory-to-Video Fine-tuned LoRA | Kevin-thu/HF |

**LoRA Variants:**
- `StoryMem/Wan2.2-MI2V-A14B` (Memory + Image-to-Video)
- `StoryMem/Wan2.2-MM2V-A14B` (Memory + Multi-modal-to-Video)

## Key Parameters

| Argument | Default / Description |
|:---|:---|
| `story_script_path` | Input JSON story script path |
| `output_dir` | `./results` |
| `seed` | `0` |
| `size` | `832*480` |
| `max_memory_size` | `10` |
| `mi2v` / `mm2v` | Scene cut flags (default: False) |

## ST-Bench Evaluation Dataset

- **Scale:** 30 long story scripts × 8–12 shots each = **300 detailed video prompts**
- **Content:** Diverse styles, story overviews, shot-level prompts, scene-cut indicators, character/scene descriptions, dynamics, shot types, camera movements
- **Generated via:** GPT-5 for structured, consistent outputs

## Usage

```bash
bash run_example.sh
```

Input format: JSON story script with per-shot text descriptions. Best practice: include explicit character descriptions in each shot prompt to improve memory matching.

## License & Availability

- Code: Open source (Apache 2.0 implied)
- Models: Available on HuggingFace (Wan-AI and Kevin-thu repos)
