---
title: VideoElevator
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [video, diffusion, image-generation, open-source]
sources: [raw/articles/ai-game-devtools/video-elevator.md]
---

# VideoElevator

> AAAI 2025 — Training-free 视频质量提升框架，将 T2V 时序一致性与 T2I 空间细节注入相结合

## 概述

VideoElevator 是一个**无需训练**的插件式框架，通过交替执行两个专门化阶段来提升 AI 生成视频的质量：

1. **时序运动精炼（Temporal Motion Refining）**：利用 T2V 模型增强帧间一致性和运动平滑度
2. **空间质量提升（Spatial Quality Elevating）**：注入 T2I 模型增强高保真空间细节（纹理、服装、复杂背景）

核心发现：仅在少量关键时间步应用 T2V 处理即可保持时序一致性，大幅节省计算成本。

## 技术特点

| 维度 | 详情 |
|------|------|
| 架构 | T2V + T2I 交替扩散管线 |
| 训练 | 无需训练/微调，即插即用 |
| 兼容性 | 支持多种 T2V/T2I 扩散模型后端 |
| 硬件需求 | < 11 GB VRAM（RTX 2080 Ti 可运行） |
| 许可证 | 未明确声明（学术项目） |
| 论文 | arXiv 2403.05438，AAAI 2025 |

## 关键实现

- 基于 `example_scripts/sd_animatelcm.py` 示例脚本
- 底层依赖：Diffusers、LaVie、AnimateLCM、FreeInit
- 自定义超参数可调，消融实验见项目网站

## 与同类工具差异

- 相比纯 T2V 模型（如 [[ai-game-devtools/animatediff]]），通过 T2I 注入提升空间细节
- 相比 [[ai-game-devtools/animatelcm]] 仅追求速度，VideoElevator 专注质量提升
- 训练-free 设计区别于需要微调的定制视频生成方法

## 相关链接

- GitHub: https://github.com/YBYBZhang/VideoElevator
- arXiv: https://arxiv.org/abs/2403.05438
- 项目网站: https://videoelevator.github.io/
