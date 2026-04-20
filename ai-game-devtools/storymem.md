---
title: StoryMem
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai-model, video, diffusion, open-source, llm]
sources: [raw/articles/ai-game-devtools/storymem.md]
---

# StoryMem

**StoryMem: Multi-shot Long Video Storytelling with Memory**

- **GitHub:** https://github.com/Kevin-thu/StoryMem
- **arXiv:** 2512.19539
- **HuggingFace:** https://huggingface.co/Kevin-thu/StoryMem
- **Project Page:** https://kevin-thu.github.io/StoryMem/
- **License:** Apache 2.0 (code); Model weights on HF

## Overview

StoryMem 是一个**多镜头长视频叙事生成系统**，能够从分镜头文本描述生成长达数分钟的多镜头叙事视频。其核心创新在于使用**记忆条件的单镜头视频扩散模型**，逐个镜头生成，同时保持角色和场景的跨镜头一致性。

## Architecture

### 三阶段生成管线

1. **初始记忆建立：** T2V（Wan2.2 T2V-A14B）模型生成第一个镜头，建立基线记忆
2. **逐镜头生成：** M2V（Memory-to-Video）模型逐个生成后续镜头
3. **记忆更新：** 自动提取关键帧并更新记忆缓冲区，确保角色/场景一致性

### 模型组件

| 组件 | 类型 | 说明 |
|:---|:---|:---|
| Wan2.2 T2V-A14B | 文生视频 MoE | 基座模型，生成首镜头 |
| Wan2.2 I2V-A14B | 图生视频 MoE | 基座模型，辅助条件注入 |
| StoryMem M2V-A14B LoRA | 记忆到视频微调 LoRA | 核心创新，维护叙事记忆 |

**LoRA 变体：** `Wan2.2-MI2V-A14B`（记忆+图生视频）、`Wan2.2-MM2V-A14B`（记忆+多模态到视频）

## ST-Bench 评测数据集

- **规模：** 30 个长故事脚本 × 8–12 镜头 = **300 个详细视频提示**
- **内容：** 多风格、故事概览、镜头级提示、场景切换标记、角色/场景描述、动态、镜头类型、摄像机运动
- **生成方式：** GPT-5 结构化提示生成

## Key Parameters

| 参数 | 默认值/说明 |
|:---|:---|
| `size` | 832×480 |
| `max_memory_size` | 10（记忆缓冲区大小）|
| `mi2v` / `mm2v` | 场景切换标志 |

## Related

- 与 [[ai-game-devtools/storymaker]] 相比：StoryMaker 专注于**图像序列**中的角色一致性（SDXL 微调），StoryMem 扩展到**视频叙事**（Wan2.2 + 记忆机制），实现动态多镜头连贯性
- 与 [[ai-game-devtools/longlive]] 相比：LongLive 侧重**单镜头长视频**实时交互生成（Wan2.1 + Self-Forcing），StoryMem 侧重**多镜头叙事**连贯性（记忆缓冲区 + 逐镜头生成）
- 与 [[ai-game-devtools/animate-a-story]] 相比：Animate-A-Story 利用现有视频片段进行外观定制来构建叙事视频，StoryMem 从零生成每个镜头并使用记忆保持一致性

## Timeline

- **2025-12:** arXiv 论文发布（2512.19539）
- **2025-12:** 代码和模型权重在 HuggingFace 发布
