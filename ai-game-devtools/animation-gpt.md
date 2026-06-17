---
title: AnimationGPT
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [ai, multimodal, animation, open-source, tool]
sources: [raw/articles/ai-game-devtools/animation-gpt.md]
---

# AnimationGPT

**GitHub:** https://github.com/fyyakaxyy/AnimationGPT
**License:** MIT
**Authors:** Yihao Liao, Yiyu Fu, Ziming Cheng, Jiangfeiyang Wang
**Year:** 2024

## Overview

AnimationGPT is a text-to-combat-animation generation tool for game character animation. Built on top of [[motiongpt]], it introduces the first combat-style motion dataset with detailed textual annotations — **CombatMotion** — enabling AI-driven generation of fighting game animations from natural language descriptions.

## CombatMotion Dataset

The project's core contribution is a game-asset-derived motion dataset with two variants:

| Dataset | Motions | Texts per Motion | Annotation Style |
|---------|---------|------------------|-----------------|
| **CMP** (Processed) | 8,700 | 3 (concise / concise+sensory / detailed) | GPT-4 generated natural sentences |
| **CMR** (Raw) | 14,883 | 1 (keyword concatenation) | Simple word list concatenation |

### Annotation Pipeline
1. **FBX → SMPL** retargeting from game assets
2. **7-category manual tagging**: action type, weapon type, attack type, locative words, power, speed, fuzzy descriptors
3. **GPT-4 sentence generation** combining tags into natural language
4. **HumanML3D format** conversion for model training

### Key Difference from Existing Datasets
Compared to HumanML3D (14,616 daily-life motions) and KIT-ML (3,911 daily-life motions), CombatMotion is the only dataset focused on **combat/fighting game animations** with concentrated action styles and game-asset origin.

## Technical Architecture

- **Base Model:** [[motiongpt]] — treats human motion as a foreign language
- **Training:** AdamW (lr=1e-4), batch=16, 50 epochs, RTX 4090 / CUDA 11.8
- **Architecture:** VQ-VAE motion encoding + language model conditioning (text→motion)
- **Loss:** feature reconstruction + velocity + commit + classification
- **Evaluation:** R-Precision, FID, Diversity, MultiModality metrics

### Best Results on CMP Dataset
- **MMM**: R-Precision top3 = 0.667, FID = 0.151
- **T2M-GPT**: R-Precision top3 = 0.663, FID = 0.177
- **MotionGPT**: R-Precision top3 = 0.605, FID = 0.267

## Key Tools

| Tool | Purpose |
|------|---------|
| `tools/animation.py` | npy → mp4 conversion (3D skeletal visualization) |
| `tools/npy2bvh/` | npy → bvh conversion (SMPL skeleton, BVH output) |
| `tools/vid2gif.py` | Video → GIF conversion |
| `tools/datasetProcess/` | POS tagging, NaN validation for dataset |

## Usage

Requires [[motiongpt]] as base. Clone MotionGPT → set up environment → download CMP dataset → copy AnimationGPT's `tools/` and `config_AGPT.yaml` → download AGPT weights → run `demo.py` with text prompts.

Output format: `.npy` (joint coordinates) → convert to `.mp4` or `.bvh` for game engine import.

## Game Dev Applications

- **Combat animation generation**: Natural language → fighting game character animations
- **Asset pipeline**: FBX game assets → SMPL → text annotations → retrainable models
- **Mixed training**: Combine CMP with HumanML3D/KIT-ML for broader motion coverage
- **Pre-training**: Use Motion-X → HumanML3D conversion for pre-training, fine-tune on CMP

## Relationships

- Built on [[motiongpt]] (base algorithm)
- Dataset format compatible with HumanML3D
- Trained models also available for MLD and MDM architectures
- Output BVH files usable in game engines (Unity, Unreal)
- Related to [[animate3d]] (3D model animation generation) in the animation tooling space

## Caveats

- Online server expired — local environment setup required
- Mixed dataset training improves metrics but may degrade visual quality
- Text annotations must be English-only, no special characters
- Frame count in annotations does NOT teach duration control
