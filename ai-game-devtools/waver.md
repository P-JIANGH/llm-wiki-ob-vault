---
title: Waver
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [video, open-source, diffusion, flow-matching]
sources: [raw/articles/ai-game-devtools/waver.md]
---

# Waver

## Overview
**Waver 1.0** is an industry-level video foundation model by FoundationVision, built on rectified flow Transformers for unified Text-to-Video (T2V), Image-to-Video (I2V), and Text-to-Image (T2I) generation. Ranked **Top 3** on Artificial Analysis leaderboards (2025-08).

## Key Facts
| Property | Value |
|---|---|
| **Architecture** | DiT (Rectified Flow Transformer), Dual Stream + Single Stream fusion |
| **Model Size** | 12B parameters (M=16, N=40 blocks) |
| **Max Resolution** | 1080p |
| **Video Length** | 2–10 seconds |
| **Input Channels** | 16 (video) + 16 (image/first frame) + 4 (task mask) |
| **Text Encoders** | flan-t5-xxl + Qwen2.5-32B-Instruct |
| **Latent Encoder** | Wan-VAE |
| **Training Pipeline** | Progressive resolution: 192p → 480p → 720p |
| **Cascade Refiner** | 480p/720p → 1080p upscaler (40-60% faster than direct gen) |

## Technical Highlights
- **Unified T2V/I2V/T2I:** Single model handles all three generation tasks via task mask tokens and 20% probability image latent injection during joint training.
- **APG Extension:** Decomposes CFG updates into parallel/orthogonal components to prevent oversaturation in video generation.
- **Latent Normalization:** `[C, H, W]` normalization (not `[C, T, H, W]`) significantly reduces artifacts.
- **Optimal inference params:** Normalization threshold=27, guidance scale=8.
- **Timestep Sampling:** T2I uses `lognorm(0.5,1)`, T2V/I2V uses `mode(1.29)` for greater motion amplitude.
- **Prompt Engineering:** Style tags prepended, quality tags appended; negative prompts for suppressing artifacts; automatic prompt rewriting for style requests (Ghibli, Disney, etc.).

## Benchmarks
- **Waver-Bench 1.0:** 304 samples across sports, daily activities, landscapes, animals, machinery, surreal scenes, animations.
- **Hermes Motion Testset:** 96 prompts, 32 sports disciplines for large-amplitude motion stress-testing.
- Outperforms both open and closed-source models in motion quality, visual fidelity, and prompt adherence.

## License & Links
- **License:** Not specified in README
- **GitHub:** [FoundationVision/Waver](https://github.com/FoundationVision/Waver)
- **Project Page:** [waver.video](http://www.waver.video/)
- **Technical Report:** [arXiv 2508.15761](https://arxiv.org/pdf/2508.15761)
- **Community:** [Discord](http://opensource.bytedance.com/discord/invite)

## Related
- Uses [[wan2-1]]'s Wan-VAE for latent compression
- Similar rectified flow architecture to [[open-sora]] (11B MMDiT, Rectified Flow+3D-VAE)
- Competes with [[hunyuan-video]] and [[wan2-2]] in the video generation space
