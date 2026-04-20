---
title: StreamingT2V
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [tool, open-source]
sources: [raw/articles/ai-game-devtools/streamingt2v.md]
---

# StreamingT2V

Picsart AI Research 的自回归长视频生成框架（CVPR 2025）。将 Stability AI 的 SVD 改造成高质量长视频生成器，通过自回归机制确保时间一致性、丰富运动动态和高帧级质量。

## 核心能力

- **长视频生成：** 默认 200 帧（约 8 秒），可轻松扩展至更长
- **时间一致性：** 跨帧保持连贯运动和视觉对齐
- **Prompt/图像保真：** 紧密遵循输入文本或图像条件
- **基座模型无关：** 架构可应用于其他扩散/视频模型以提升长视频能力

## 技术架构

**流水线：** Image-to-Video → Video Enhancement（可选随机混合） → Frame Interpolation

旗舰实现 **StreamingSVD** 基于 Stability AI 的 SVD 模型，通过自回归方式逐段生成并拼接，解决传统扩散模型在长视频中的内容停滞问题。

### 随机混合（Randomized Blending）

启用后可显著降低 VRAM 需求（60GB → 24GB），代价是生成速度降低约 50%。推荐参数：`chunk_size=38`, `overlap_size=12`。

### 内存优化模式

`--use_memopt` 标志激活 24GB VRAM 优化模式，适用于消费级 GPU。

## 系统要求

| 项目 | 规格 |
|------|------|
| VRAM（默认） | 60 GB（200 帧） |
| VRAM（优化） | 24 GB（速度慢 50%） |
| OS | Linux |
| Python | 3.9 |
| CUDA | >= 11.8 |

## 扩展模型

- **StreamingModelscope：** 同架构应用于 [[ai-game-devtools/diffsynth-studio]] Modelscope T2V 模型，可生成最长 2 分钟视频，高运动无停滞
- **MAWE（Motion Aware Warp Error）：** 作者提出的新评估指标，量化视频生成的运动连贯性

## 许可证

- 代码/模型：MIT
- 使用限制：依赖 SVD、EMA-VFI、I2VGen-XL，仅限非商业/研究用途

## 相关链接

- 项目主页：https://streamingt2v.github.io/
- 论文：https://arxiv.org/abs/2403.14773
- GitHub：https://github.com/Picsart-AI-Research/StreamingT2V
- YouTube Demo：https://youtu.be/md4lp42vOGU

## 与同类工具差异

相比 [[ai-game-devtools/mochi-1]]（单片段 10B 参数需 60GB VRAM）和 [[ai-game-devtools/stable-video-diffusion]]（SVD 原生仅支持 14-25 帧），StreamingT2V 的核心创新在于**自 autoregressive 分段生成策略**，将短视频模型扩展为长视频生成器，且无需重新训练基座模型。
