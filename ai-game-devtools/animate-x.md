---
title: Animate-X
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [animation, avatar, diffusion, ai, open-source, tool]
sources: [raw/articles/ai-game-devtools/animate-x.md]
---

# Animate-X

**ICLR 2025 论文：通用角色图像动画框架，基于潜在扩散模型（LDM），适用于多种角色类型（包括拟人化角色）**

作者：Shuai Tan, Biao Gong†, Xiang Wang, Shiwei Zhang, Dandan Zheng, Ruobing Zheng, Kecheng Zheng, Jingdong Chen, Ming Yang

机构：Ant Group | Tongyi Lab

## 概述

Animate-X 是一个基于 LDM 的通用角色动画框架，可将静态角色图像 + 目标姿态序列 → 高质量角色动画视频。突破性地扩展了对拟人化角色（anthropomorphic characters）的支持，涵盖游戏、动画、海报等中常见的各类角色，而非仅限真人。

## 核心创新

### Pose Indicator（姿态指示器）

通过隐式和显式两种途径从驱动视频中捕获完整运动模式：

| 方式 | 机制 | 作用 |
|------|------|------|
| **隐式** | 驱动视频帧的 CLIP 视觉特征 | 提取整体运动模式和运动间的时间关系 |
| **显式** | 模拟推理时可能的输入 | 增强 LDM 对未见姿态分布的泛化能力 |

解决了现有方法（仅限真人）无法理解驱动视频运动模式、只能机械地将姿态序列叠加到目标角色上的问题。

### A²Bench（Animated Anthropomorphic Benchmark）

新提出的拟人化动画基准测试集，用于评估 Animate-X 在通用和广泛应用场景下的动画能力。

## 技术架构

- **基础模型：** Latent Diffusion Model (LDM)
- **姿态引导：** DWPose（姿态估计工具）
- **运动编码：** Pose Indicator（隐式 CLIP 特征 + 显式输入模拟）
- **框架：** PyTorch
- **官方推理代码：** https://github.com/antgroup/animate-x

## 关键资源

| 资源 | 链接 |
|------|------|
| 论文 | [arXiv 2410.10306](https://arxiv.org/abs/2410.10306) |
| 官方代码 | [antgroup/animate-x](https://github.com/antgroup/animate-x) |
| 模型权重 | [HuggingFace](https://huggingface.co/Shuaishuai0219/Animate-X) |
| 项目主页 | [Showcase](https://lucaria-academy.github.io/Animate-X/) |

## 与同类工具对比

| 工具 | 角色支持范围 | 核心技术 | 发表 |
|------|-------------|---------|------|
| [[animate-anyone]] | 人类为主 | ReferenceNet + Pose Guider + Denoising UNet | ECCV |
| [[animatediff]] | 通用（T2V） | Motion Module 插入 SD | ICLR 2024 |
| [[liveportrait]] | 人脸/头像 | 隐式关键点 + 3D 运动表征 | ECCV 2024 |
| **Animate-X** | **人类+拟人化角色** | **Pose Indicator（隐式+显式）+ LDM** | **ICLR 2025** |

## 游戏开发应用

- 游戏角色动画：从静态角色设计图直接生成动画序列
- NPC 行为演示：为拟人化 NPC 角色创建动作展示
- 跨角色动作迁移：将真人动作用于卡通/游戏角色
