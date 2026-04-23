---
title: Matrix-Game — Skywork AI 交互式游戏世界模型
created: 2026-04-16
updated: 2026-04-24
type: entity
tags: [tool, open-source, game-engine, multimodal]
sources: [raw/articles/ai-game-devtools/matrix-game.md]
---

# Matrix-Game

Skywork AI 开源的交互式游戏世界模型系列，支持实时流式交互视频生成。当前最新版本为 Matrix-Game 3.0（2026年3月发布）。

## 概述

Matrix-Game 是昆仑万维 Skywork AI 团队发布的开源世界模型系列，目标是从单张输入图像 + 文本提示 + 键鼠操作信号，实时生成连贯的游戏风格视频序列。本质上是"游戏世界模拟器"——输入一张场景图，然后通过键盘/鼠标控制视角和移动，模型逐步生成对应的新帧。

## 版本历史

| 版本 | 发布日期 | 关键特性 |
|------|---------|---------|
| Matrix-Game 1.0 | 2025-05-12 | 系列首个开源世界模型 |
| Matrix-Game 2.0 | 2025-08-12 | 交互式世界基础模型，支持实时长视频生成 |
| Matrix-Game 3.0 | 2026-03-27 | 流式交互世界模型，带长程记忆 |

## 技术架构 (3.0)

### 核心模型

- **基础架构**: 基于 Wan2.2 视频生成框架的 DiT（Diffusion Transformer）
- **模型规模**: 40 层 transformer，5120 维度，40 注意力头，FFN 13824 维度
- **Patch 大小**: (1, 2, 2)，VAE 压缩比 (4, 16, 16)
- **文本编码器**: UMT5-XXL（bf16，最大文本长度 512）
- **扩散方式**: Flow matching + UniPC scheduler，50 步推理
- **量化支持**: INT8 量化（Triton 自定义 kernel），支持多卡同步

### 动作条件化

模型接受两种输入信号统一为相机姿态控制：
- **键盘**: W/S/A/D/Q（前进/后退/左移/右移/不动）→ 6 维 one-hot
- **鼠标/相机**: I/K/J/L/U（上/下/左/右/不动）→ 2 维连续值
- 通过 `compute_all_poses_from_actions()` 将操作序列转换为相机外参（位置 + pitch/yaw）
- 使用 Plucker 射线表示法作为空间条件输入

### 交互式流水线

- **流式生成**: 首段 57 帧，后续每段 40 帧，迭代扩展
- **实时键盘输入**: `get_current_action()` 从 stdin 读取 WASD + IJKL 操作
- **长程记忆**: `select_memory_idx_fov()` 基于视野相似度从历史帧中选 5 个参考帧
- **滑动上下文**: 维护 16 帧历史窗口，总上下文 56 帧
- **异步 VAE**: 支持独立 GPU 进程进行异步解码加速

### 分布式支持

- T5 和 DiT 的 FSDP 分片
- Ulysses 序列并行
- NCCL 分布式后端
- 多卡 INT8 权重同步

## 许可证

MIT License

## 相关链接

- **GitHub**: [SkyworkAI/Matrix-Game](https://github.com/SkyworkAI/Matrix-Game)
- **Matrix-Game 3.0**: [代码](https://github.com/SkyworkAI/Matrix-Game/tree/main/Matrix-Game-3)
- **Matrix-Game 2.0**: [代码](https://github.com/SkyworkAI/Matrix-Game/tree/main/Matrix-Game-2)
- **Matrix-Game 1.0**: [代码](https://github.com/SkyworkAI/Matrix-Game/tree/main/Matrix-Game-1)

## 与同类工具对比

- **[[hunyuan-gamecraft]]**（腾讯）: 同为键鼠控制的交互式游戏视频生成模型。Matrix-Game 3.0 基于 Wan2.2 架构，具有长程记忆机制和 INT8 量化支持；Hunyuan-GameCraft 使用自有架构
- **[[hy-world-1.5]]**（腾讯 WorldPlay）: 同为世界模型，WorldPlay 强调实时性；Matrix-Game 3.0 强调长程记忆和流式交互
- **[[cosmos]]**（NVIDIA）: 更广泛的世界模型平台，涵盖物理模拟；Matrix-Game 专注于游戏视角的交互式视频生成
