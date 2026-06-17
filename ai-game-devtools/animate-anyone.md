---
title: AnimateAnyone
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [ai, diffusion, animation, avatar, tool, open-source]
sources: [raw/articles/ai-game-devtools/animate-anyone.md]
---

# AnimateAnyone

**Alibaba 团队基于扩散模型的角色动画生成框架：单张静态图像 + 姿态序列 → 一致性角色动画视频**

## 概述
AnimateAnyone 是阿里智能计算研究院提出的 diffusion-based 图像到视频角色动画框架，解决角色动画中时间一致性和外观退化的难题。仅需单张参考图像和姿态序列，即可生成流畅的角色动画视频。

## 核心架构

| 组件 | 功能 |
|:---|:---|
| **ReferenceNet** | 从参考图像提取精细外观细节，通过空间注意力机制跨帧保持外观一致性 |
| **Pose Guider** | 高效姿态编码器，精确控制角色运动方向和连续性 |
| **Denoising UNet** | 融合编码姿态序列与多帧噪声，通过三种注意力机制整合参考特征：空间注意力（ReferenceNet）、交叉注意力（CLIP 图像编码器）、时间注意力（时间维度） |
| **Temporal Modeling** | 保证帧间平滑过渡，输出流畅视频 |
| **VAE Decoder** | 最终解码步骤，输出生成的视频片段 |

## 能力与应用
- **通用角色支持：** 人类、动漫/卡通角色、人形模型均可动画化
- **时尚视频合成：** 静态时尚照片 → 真实视频（UBC 时尚视频数据集评测）
- **舞蹈生成：** 真实舞蹈场景高保真动画（TikTok 数据集评测）
- **虚拟试衣：** 与 `ai-game-devtools/outfit-anyone` 结合实现超高质量换装
- **说话头像：** 与 VividTalk 唇同步技术集成实现对话头像生成

## 推理加速
Alibaba Cloud DeepGPU/AIACC 优化推理负载：
- A10 GPU：2.45s → 1.75s（~40% 提速）
- RTX 6000：2.80s → 2.25s（~25% 提速）
- 测试条件：32 帧 @ 832×640 分辨率，1 步

## 相关项目
- 与 [[musepose]] 同为姿态驱动角色动画方案（TME 基于 SD 1.5 + AnimateDiff）
- 与 [[echomimic]] 同属扩散模型角色动画家族（蚂蚁 AAAI 2025）
- 扩展训练数据支持训练分布外角色动画

## 来源
- 论文：[arXiv 2311.17117](https://arxiv.org/pdf/2311.17117.pdf)
- 项目页：https://humanaigc.github.io/animate-anyone/
- GitHub：[HumanAIGC/AnimateAnyone](https://github.com/HumanAIGC/AnimateAnyone)
- YouTube 演示：https://www.youtube.com/watch?v=8PCn5hLKNu4
