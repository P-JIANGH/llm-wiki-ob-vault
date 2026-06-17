---
title: SkyReels-A1
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [tool, video, avatar, animation, open-source, multimodal]
sources: [raw/articles/ai-game-devtools/skyreels-a1.md]
---

# SkyReels-A1

**SkyReels-A1: Expressive Portrait Animation in Video Diffusion Transformers** — Skywork AI 开源的视频扩散 Transformer (DiT) 肖像动画框架。给定参考肖像图像和驱动视频（或音频），生成高保真、表情丰富的角色动画视频，支持任意长度输出。

## 核心能力

- **视频/图像驱动**：从驱动视频中提取表情感知地标（expression-aware landmarks），将面部表情和身体动作迁移到参考肖像
- **音频驱动**：通过 DiffPoseTalk 生成 FLAME 系数管线实现音频到口型动画
- **长视频生成**：`inference_long_video.py` 支持任意时长输出
- **多帧率支持**：原生 12fps，支持 24/48/60fps 输出
- **交互式 UI**：Gradio Web 界面 (`app.py`)

## 技术架构

| 组件 | 描述 |
|---|---|
| 基座模型 | Video Diffusion Transformer (DiT)，基于 CogVideoX 架构 |
| 表情条件化 | 面部表情感知地标直接注入输入潜空间 |
| 身份一致性 | 面部图像-文本对齐，实现面部特征与视频动态深度融合 |
| 帧插值 | FILM 帧插值网络用于更平滑的时序过渡 |
| 评估指标 | SimFace / FID / L1 距离（表情和运动对齐） |

## 仓库结构

核心模块在 `skyreels_a1/` 目录，提供三种推理模式（图像/视频驱动、音频驱动、长视频）和自动化评估管线 (`eval/`)。外部依赖包括 FLAME、mediapipe、smirk 模型权重。

## 与同类工具对比

- 相比 [[hallo]]（SD 1.5 + AnimateDiff 管线），SkyReels-A1 基于 DiT 架构，支持身体动态迁移而不仅是面部
- 相比 [[liveportrait]]（快手高效肖像动画），SkyReels-A1 专注视频扩散生成，支持任意长度输出
- 相比 [[stableavatar]]（Wan2.1 骨干 DiT），SkyReels-A1 2025 年 2 月发布，专注于表情感知条件化机制

## 链接

- **GitHub**: https://github.com/SkyworkAI/SkyReels-A1
- **arXiv**: https://arxiv.org/abs/2502.10841
- **Homepage**: https://skyworkai.github.io/skyreels-a1.github.io/
- **Discord**: https://discord.gg/PwM6NYtccQ
