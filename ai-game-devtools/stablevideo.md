---
title: StableVideo
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, video, diffusion, tool, open-source]
sources: [raw/articles/ai-game-devtools/stablevideo.md]
---

# StableVideo

## Overview

StableVideo 是 ICCV 2023 发表的文本驱动一致性视频编辑工具，基于 [[controlnet]] 扩散模型和 Text2LIVE 的神经分层图集（NLA）技术，实现对视频中特定区域的文本控制编辑，同时保持帧间时间和空间一致性。

## 核心架构

- **基础**: 在 [[stable-diffusion]] SD1.5 + ControlNet 之上扩展，添加 NLA 分解和 AGGNet 聚合网络
- **NLA 分解**: 将视频分解为前景图集（foreground atlas）和背景网格图集（background grid atlas），支持独立编辑
- **ControlNet 条件控制**: 使用 canny 边缘检测和 MiDaS 深度图作为条件，引导扩散过程
- **AGGNet**: 聚合网络，跨帧融合特征以保持编辑的一致性
- **DDIM Sampler**: 高效的隐式扩散采样器用于推理

## 技术特点

| 特性 | 详情 |
|------|------|
| 输入 | 视频 + NLA 预训练检查点 + 文本提示 |
| 输出 | 编辑后的 MP4 视频 + 关键帧 |
| 编辑模式 | Canny 边缘控制 / Depth 深度控制 |
| UI | Gradio Web 界面，支持前景图集手动编辑掩码 |
| 最低 VRAM | ~14GB (amp + cpu + xformers) |
| 语言 | Python + PyTorch |
| 许可证 | MIT |

## VRAM 需求

- float32: ~29GB
- AMP: ~23GB
- AMP + CPU: ~17GB
- AMP + CPU + xformers: ~14GB

## 与同类工具的差异

- 相比 [[controlnet]]: ControlNet 仅支持单图条件生成；StableVideo 扩展到视频，通过 NLA 分解实现时序一致编辑
- 相比 [[stable-diffusion]]: SD 是纯图像生成；StableVideo 添加视频分解管线，支持区域级视频编辑
- 相比 Text2LIVE: Text2LIVE 使用 CLIP 引导编辑（非扩散）；StableVideo 结合 NLA + ControlNet 扩散控制，质量更高

## 相关链接

- GitHub: https://github.com/rese1f/stablevideo
- arXiv: https://arxiv.org/abs/2308.09592
- HuggingFace Demo: https://huggingface.co/spaces/Reself/StableVideo
