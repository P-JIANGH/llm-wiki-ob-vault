# PosterCraft — Raw Source (web_extract fallback)

> Source: https://github.com/Ephemeral182/PosterCraft
> Extracted: 2026-04-17
> Note: GitHub/gitcode/gitee clone all failed; content extracted via web_extract

## Overview

**PosterCraft** is a unified framework for **high-quality aesthetic poster generation** (ICLR'26), engineered to excel in:
- Precise text rendering
- Seamless integration of abstract art
- Striking layouts & stylistic harmony

## Authors & Affiliations

Equal Contribution: Sixiang Chen*, Jianyu Lai*, Jialin Gao*, Tian Ye, Haoyu Chen, Hengyu Shi, Shitong Shao, Yunlong Lin, Song Fei, Zhaohu Xing, Yeying Jin, Junfeng Luo, Xiaoming Wei, Lei Zhu†
Institutions: HKUST-GZ, Meituan, Xiamen University, National University of Singapore, HKUST

## Architecture: Four-Stage Training Pipeline

1. **Stage 1: Text Rendering Optimization** — Precise text generation over high-quality backgrounds. Establishes foundational fidelity and faithful background representation.
2. **Stage 2: High-quality Poster Fine-tuning** — Region-aware Calibration to harmonize text and background. Preserves text accuracy while elevating artistic integrity.
3. **Stage 3: Aesthetic-Text RL** — Aesthetic-Text Preference Optimization to capture higher-order aesthetic trade-offs. Prioritizes holistic visual appeal and mitigates font rendering defects.
4. **Stage 4: Vision-Language Feedback** — Joint Vision-Language Conditioning. Iteratively combines visual data with targeted text suggestions for multi-modal corrections and progressive refinement.

## Performance Benchmarks (Text Rendering)

| Method | Type | Text Recall | Text F-score | Text Accuracy |
|:---|:---|:---|:---|:---|
| PosterCraft (Ours) | Open | 0.787 | 0.774 | 0.735 |
| Gemini2.0-Flash-Gen | Closed | 0.798 | 0.786 | 0.746 |
| Flux1.dev | Open | 0.723 | 0.707 | 0.667 |
| Ideogram-v2 | Closed | 0.711 | 0.685 | 0.680 |
| SD3.5 | Open | 0.565 | 0.542 | 0.497 |
| BAGEL | Open | 0.543 | 0.536 | 0.463 |

## Model Zoo

- `PosterCraft-v1_RL` (Stage 3) — Optimized via Aesthetic-Text Preference Optimization
- `PosterCraft-v1_Reflect` (Stage 4) — Iteratively refined via vision-language feedback

## Datasets

- `Text-Render-2M` — 2M samples, multi-instance text rendering
- `HQ-Poster-100K` — 100K curated high-quality posters
- `Poster-Preference-100K` — 100K preference pairs for RL alignment
- `Poster-Reflect-120K` — 120K vision-language feedback pairs

## Resources

- Paper: arXiv:2506.10741
- Models & Datasets: HuggingFace Hub (PosterCraft org)
- Project Website: ephemeral182.github.io/PosterCraft/
- Live Demo: HuggingFace Space
- Video Demo: YouTube

## Usage

- Standard Generation: BF16 precision
- Low VRAM Support: `inference_offload.py` for CPU offloading
- Interactive UI: `demo_gradio.py` Gradio web interface
