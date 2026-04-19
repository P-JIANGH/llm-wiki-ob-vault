# TaleCrafter: Interactive Story Visualization with Multiple Characters

**Source:** https://github.com/VideoCrafter/TaleCrafter
**Extracted:** 2026-04-19
**Note:** GitHub clone failed (network timeout + gitcode 403 + gitee unavailable); content from web_extract of README.

---

## Basic Info
- **Conference:** SIGGRAPH Asia 2023
- **ArXiv:** https://arxiv.org/abs/2305.18247
- **Project Page:** https://AILab-CVC.github.io/TaleCrafter
- **Authors:** Yuan Gong, Youxin Pang, Xiaodong Cun, Menghan Xia, Yingqing He, Haoxin Chen, Longyue Wang, Yong Zhang\*, Xintao Wang\*, Ying Shan, Yujiu Yang\*
- **Commits:** 36

## Core Objective
Interactive story visualization tool that supports multiple characters. Generates consistent, multi-character story visualizations by leveraging prior knowledge from large language models (LLMs) and text-to-image (T2I) models trained on massive corpora.

## System Architecture (4 Interconnected Components)

### 1. S2P (Story-to-Prompt Generation)
Converts concise story inputs into detailed, structured prompts for downstream modules.

### 2. T2L (Text-to-Layout Generation)
Generates diverse, spatially reasonable layouts from prompts. Supports user-driven adjustment and refinement.

### 3. C-T2I (Controllable Text-to-Image Generation) — Core Module
Synthesizes images guided by layouts, sketches, and actor-specific identifiers to maintain identity consistency and fine-grained detail across frames.

### 4. I2V (Image-to-Video Animation)
Animates generated static images to produce dynamic story visualizations.

## Key Innovations
- Uses generic pre-trained priors to adapt to unseen characters/scenes/styles without dataset-specific overfitting
- Interactive pipeline allowing users to adjust layouts, sketches, and character placement
- Actor-specific identifiers for maintaining character identity across frames
- Extensive experiments and user study validate effectiveness

## Limitations Addressed
- Prior T2I models fine-tuned on fixed datasets (e.g., FlintstonesSV) struggle with novel characters
- Prior work lacks flexibility for layout revision and local structure editing

## Successor Project
- [OMG](https://github.com/kongzhecn/OMG) — improved open-sourced work supporting both LoRAs and InstantID for multiple concept personalization
