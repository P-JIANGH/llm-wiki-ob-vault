# Index-AniSora — Bilibili Open-Source Anime Video Generation Model

**Source:** GitHub README extract (web_extract; GitHub/gitcode/gitee clone all failed)
**Date:** 2026-04-19
**URL:** https://github.com/bilibili/Index-anisora

## Project Overview
- **Developer:** Bilibili (Index Team)
- **Status:** Active (127 commits)
- **License:** Included in repo
- **Paper:** Accepted at IJCAI'25
- **ArXiv:** 2412.10255, 2504.10045
- **Hugging Face:** https://huggingface.co/IndexTeam/Index-anisora
- **ModelScope:** https://www.modelscope.cn/organization/bilibili-index

## What It Is
Index-AniSora is Bilibili's open-source, state-of-the-art animated video generation model. Enables one-click creation of diverse anime styles: series episodes, Chinese original animations, manga adaptations, VTuber content, anime PVs, and mad-style parodies (鬼畜动画).

## Repository Architecture
| Directory | Version/Component | Details |
|:---|:---|:---|
| `anisoraV1_infer` / `anisoraV1_train_npu` | V1.0 | CogVideoX-5B base, full training & inference code |
| `anisoraV2_gpu` / `anisoraV2_npu` | V2.0 | Enhanced Wan2.1-14B base, superior stability & consistency |
| `anisoraV3` | V3.0 | 360° character rotation from single front-facing image |
| `anisora_rl` | RLHF Framework | First RLHF pipeline for anime video generation |
| `data_pipeline` | Ecosystem Tool | End-to-end dataset pipeline (>10M high-quality clips) |
| `reward` | Benchmark System | Anime-optimized eval models, 948 labeled animation clips |

## Core Technical Features
- **Spatiotemporal Mask Module:** Unified framework for I2V, frame interpolation, localized image-guided animation
- **Multi-Guidance Control:** Pose, depth, line art, audio inputs for precise motion control
- **Video Style Transfer:** Line-art-based generation transforms videos into target styles
- **Resolution Upscaling:** 90p → 720p/1080p upscaling with richer detail
- **AniMe Integration:** Long-form animation demos (fiction-to-video, 2D/3D cartoon adaptation)

## Benchmark Results
### VBench (SOTA Metrics)
- Motion Smoothness: 99.34 (highest)
- I2V Subject Consistency: 97.52
- Subject Consistency: 96.99 (outperforms Vidu, MiniMax, CogVideoX)

### AniSora-Benchmark
- V1: Leads in Human Evaluation (70.13) and Character Consistency (94.88)
- V2: Dominates Visual Smoothness (86.98), Visual Appeal (85.91), Text-Video Consistency (90.98), Image-Video Consistency (91.96)

## Key Challenge Addressed
"Despite the success of advanced video generation models like Sora, Kling, and CogVideoX in generating natural videos, they lack the same effectiveness in handling animation videos. Evaluating animation video generation is also a great challenge due to its unique artist styles, violating the laws of physics and exaggerated motions."

## Data Pipeline
> "Supported by the data processing pipeline with over 10M high-quality data, the generation model incorporates spatiotemporal mask module and multi-guidance control..."

## Citation
```bibtex
@article{jiang2024anisora,
  title={AniSora: Exploring the Frontiers of Animation Video Generation in the Sora Era},
  author={Yudong Jiang, Baohan Xu, Siqian Yang, Mingyu Yin, Jing Liu, Chao Xu, Siqi Wang, Yidi Wu, Bingwen Zhu, Xinwen Zhang, Xingyu Zheng, Jixuan Xu, Yue Zhang, Jinlong Hou and Huyang Sun},
  journal={arXiv preprint arXiv:2412.10255},
  year={2024}
}
```
