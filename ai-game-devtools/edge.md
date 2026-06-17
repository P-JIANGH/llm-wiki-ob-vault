---
title: EDGE (Editable Dance Generation)
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, tool, open-source, diffusion, audio, animation, video]
sources: [raw/articles/ai-game-devtools/edge.md]
---

# EDGE (Editable Dance Generation)

Stanford TML 实验室的音乐驱动可编辑舞蹈生成模型（CVPR 2023），使用 Transformer + 扩散模型从音乐输入生成逼真、物理合理的舞蹈动作。

## Overview

**EDGE** (Editable Dance GEneration) 是 Stanford 提出的音乐→舞蹈生成系统，核心创新在于将扩散模型与音乐特征提取（Jukebox）和 FiLM 条件调制相结合，不仅生成高质量舞蹈，还支持关节级编辑和帧间插补。

论文：[arXiv:2211.10658](https://arxiv.org/abs/2211.10658)
CVPR 2023

## Architecture

| Component | Detail |
|---|---|
| **Backbone** | DanceDecoder — 8 层 Transformer Decoder，latent_dim=512, 8 heads |
| **Diffusion** | GaussianDiffusion，1000 timesteps，cosine schedule，classifier-free guidance (weight=2) |
| **Music Encoder** | Jukebox (OpenAI)，输出 4800 维音乐特征 |
| **Conditioning** | DenseFiLM — 在 self-attention / cross-attention / FFN 后进行特征级线性调制 |
| **Position Encoding** | Rotary Embedding（可选替代绝对位置编码） |
| **Optimizer** | Adan |
| **Framework** | PyTorch + HuggingFace Accelerate（多 GPU 分布式训练） |
| **Motion Representation** | SMPL 24 关节，6D rotation + 3D position + 4 contact features |
| **Horizon** | 5 秒 @ 30 FPS = 150 帧 |

## Key Features

- **音乐驱动舞蹈生成**：输入 .wav 音乐文件，输出 24 关节舞蹈动作序列
- **关节级编辑**：可指定特定身体关节的运动约束
- **帧间插补 (In-betweening)**：在关键帧之间生成过渡动作
- **物理合理性评估**：提出 PFC (Physical Foot Contact) 度量指标
- **SMPL → FBX 转换**：生成结果可导出到 Blender，支持 Mixamo 重定向

## Training & Inference

```bash
# 训练（~6-24 小时，128 batch，2000 epochs）
accelerate launch train.py --batch_size 128 --epochs 2000 --feature_type jukebox --learning_rate 0.0002

# 推理（自定义音乐）
python test.py --music_dir custom_music/
```

**硬件要求**：16+ GB RAM/GPU，1-8 NVIDIA GPU（16+ GB VRAM），CUDA 11.6

## Dependencies

- `jukemirlib` — Jukebox 音乐特征提取封装
- `pytorch3d` — 3D 变换与 SMPL 骨骼
- `accelerate` — HuggingFace 多 GPU 训练
- `wandb` — 实验日志
- Adan optimizer + denoising-diffusion-pytorch (lucidrains)

## Evaluation

- 用户研究表明显著优于之前的 SOTA 方法
- 多维度评估：物理合理性、节拍对齐、多样性
- 提出 PFC 指标量化脚部接触的生理合理性

## Dataset

- **AIST++**：舞蹈动作捕捉数据 + 音频
- 数据预处理约 24 小时，~50 GB（含 Jukebox 特征预计算）

## License

研究代码，未明确标注 license。

## Links

- GitHub: https://github.com/Stanford-TML/EDGE
- Paper: https://arxiv.org/abs/2211.10658

## Related

- [[ai-shader]] — AI 驱动的 Shader 生成工具
- [[wav2lip]] — 音频驱动的唇形同步动画（与 EDGE 同属音频→视觉生成范式）
- [[animate-anyone]] — 基于参考人物的视频动作迁移（舞蹈生成相关领域）
