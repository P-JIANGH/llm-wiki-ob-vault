# HunyuanWorld-Voyager — Source

> Cloned: 2026-04-16 from https://github.com/Tencent-Hunyuan/HunyuanWorld-Voyager

## Project Overview

**HunyuanWorld-Voyager** 是腾讯混元团队（Tencent Hunyuan）开源的视频扩散框架（2025-09-02），能够从单张输入图像生成具有世界一致性的 3D 点云序列，并支持用户自定义相机路径进行沉浸式世界探索。同时生成对齐的深度和 RGB 视频，可直接用于 3D 重建。

arXiv: https://arxiv.org/abs/2506.04225
HuggingFace: https://huggingface.co/tencent/HunyuanWorld-Voyager

## Architecture

两个关键组件：

1. **World-Consistent Video Diffusion**：统一架构，基于现有世界观测联合生成对齐的 RGB 和深度视频序列，确保全局场景一致性
2. **Long-Range World Exploration**：高效世界缓存（点云剔除 + 自回归推理）+ 平滑视频采样，实现迭代式场景扩展

**Data Engine**：自动化视频重建流水线，自动估计相机位姿和度量深度，无需人工 3D 标注即可构建大规模训练数据。整合了超过 10 万个视频片段（真实世界采集 + Unreal Engine 渲染）。

## Key Capabilities

- **Camera-Controllable Video Generation**：支持 forward/backward/left/right/turn_left/turn_right 相机路径
- **Video Reconstruction**：生成视频 → 重建 3D 点云
- **Image-to-3D Generation**：单图 → 3D-consistent 场景视频
- **Video Depth Estimation**：同步输出深度图

## Performance (WorldScore Benchmark)

| Method | WorldScore Avg | Camera Control | Object Control | Content Alignment | 3D Consistency | Photometric Consistency | Style Consistency | Subjective Quality |
|--------|---------------|----------------|----------------|-------------------|----------------|------------------------|-------------------|-------------------|
| WonderJourney | 63.75 | 84.6 | 37.1 | 35.54 | 80.6 | 79.03 | 62.82 | 66.56 |
| WonderWorld | 72.69 | 92.98 | 51.76 | 71.25 | 86.87 | 85.56 | 70.57 | 49.81 |
| EasyAnimate | 52.85 | 26.72 | 54.5 | 50.76 | 67.29 | 47.35 | 73.05 | 50.31 |
| Allegro | 55.31 | 24.84 | 57.47 | 51.48 | 70.5 | 69.89 | 65.6 | 47.41 |
| Gen-3 | 60.71 | 29.47 | 62.92 | 50.49 | 68.31 | 87.09 | 62.82 | 63.85 |
| CogVideoX-I2V | 62.15 | 38.27 | 40.07 | 36.73 | 86.21 | 88.12 | 83.22 | 62.44 |
| **Voyager** | **77.62** | **85.95** | **66.92** | **68.92** | **81.56** | **85.99** | **84.89** | **71.09** |

🔴 = 1st place, 🟢 = 2nd place, 🟡 = 3rd place

Voyager 在 WorldScore 平均分（77.62）和主观质量（71.09）均为第1名。

## Requirements

| Model | Resolution | GPU Peak Memory |
|-------|-----------|----------------|
| HunyuanWorld-Voyager | 540p | 60GB (minimum) / 80GB (recommended) |

- NVIDIA GPU with CUDA support (tested on 80G GPU)
- Linux OS
- CUDA 12.4 or 11.8

## Tech Stack

- **Framework**: PyTorch 2.4.0, diffusers 0.31.0, transformers 4.39.3
- **Acceleration**: Flash Attention v2, xDiT (xfuser 0.4.2) for multi-GPU parallel inference
- **3D Tools**: MoGe (Microsoft), utils3d, Metric3D, VGGT
- **Parallel Inference**: xDiT Unified Sequence Parallelism (USP) — 8 GPUs yield 6.69x speedup (1925s → 288s for 512x768 49 frames)

## Inference

```bash
# Single GPU
python3 sample_image2video.py \
    --model HYVideo-T/2 \
    --input-path "examples/case1" \
    --prompt "An old-fashioned European village with thatched roofs on the houses." \
    --i2v-stability \
    --infer-steps 50 \
    --flow-reverse \
    --flow-shift 7.0 \
    --seed 0 \
    --embedded-cfg-scale 6.0 \
    --use-cpu-offload \
    --save-path ./results

# 8-GPU parallel inference
ALLOW_RESIZE_FOR_SP=1 torchrun --nproc_per_node=8 \
    sample_image2video.py \
    --ulysses-degree 8 --ring-degree 1 \
    ...
```

## Related Projects in HunyuanWorld Family

- HunyuanWorld 1.0 (2025-07-26): 文本/图像 → 360°全景图 → 分层3D mesh
- HunyuanWorld 1.1 (WorldMirror, 2025-10-22): 视频/多视角图像 → 3D 世界创建
- HunyuanWorld 1.5 (WorldPlay, 2025-12-18): 实时世界创建和游玩
- HY-World 2.0 (2026-04-16): SOTA 3D 世界模型
- Hunyuan3D 2.0/2.1: 3D 资产生成
- HunyuanVideo/HunyuanVideo-I2V: 视频生成

## BibTeX

```bibtex
@article{huang2025voyager,
  title={Voyager: Long-Range and World-Consistent Video Diffusion for Explorable 3D Scene Generation},
  author={Huang, Tianyu and Zheng, Wangguandong and Wang, Tengfei and Liu, Yuhao and Wang, Zhenwei and Wu, Junta and Jiang, Jie and Li, Hui and Lau, Rynson WH and Zuo, Wangmeng and Guo, Chunchao},
  journal={arXiv preprint arXiv:2506.04225},
  year={2025}
}
```
