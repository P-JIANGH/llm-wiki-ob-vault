---
title: HunyuanVideo-Avatar
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [avatar, video, audio, multimodal, open-source, tool]
sources: [raw/articles/ai-game-devtools/hunyuanvideo-avatar.md]
---

# HunyuanVideo-Avatar

> Tencent Hunyuan 高保真音频驱动多人物角色动画生成模型

## Overview

HunyuanVideo-Avatar 是腾讯混元团队开发的基于多模态扩散变换器（MM-DiT）的音频驱动人体动画模型，能够同时生成动态、情感可控、多人物对话视频。论文 arXiv 2505.20156（2025 年 5 月发布）。

**核心能力：** 输入头像图片 + 音频 → 输出高动态、情感可控的角色动画视频

## 三大创新

| 创新点 | 解决的问题 | 技术方案 |
|--------|-----------|---------|
| Character Image Injection Module | 训练/推理条件不匹配 | 替换加法条件注入，确保角色一致性和动态运动 |
| Audio Emotion Module (AEM) | 情感对齐困难 | 从参考图像提取情感线索并迁移到生成视频 |
| Face-Aware Audio Adapter (FAA) | 多人物场景 | 潜在级别面部掩码隔离，独立音频注入 via cross-attention |

## 技术架构

- **基座模型：** MM-DiT（多模态扩散变换器），含 DoubleStreamBlock + SingleStreamBlock
- **VAE：** 3D 因果自编码器（causal 3D Autoencoder）
- **音频管线：** AudioProjNet2（3 层 MLP 音频特征投影）+ PerceiverAttentionCA（交叉注意力）
- **Token 精炼：** SingleTokenRefiner 用于文本条件
- **推理优化：** DeepCache 加速、FP8 量化、序列并行（NCCL）、CPU Offload
- **框架依赖：** PyTorch 2.4 + diffusers 0.33 + Flash Attention 2

## 硬件要求

- **最低：** 24GB VRAM（704×768px，129 帧，极慢）
- **推荐：** 96GB VRAM 获得最佳质量
- **优化方案：** TeaCache 降至 10GB VRAM（Wan2GP 分支）
- **多 GPU：** 8 GPU 测试通过，支持 torchrun 分布式推理

## 支持特性

- **多风格头像：** 写实、卡通、3D 渲染、拟人化角色
- **多尺度：** 肖像、半身、全身
- **多角色：** 独立音频驱动不同角色
- **情感控制：** 通过参考图像控制面部情感
- **Web UI：** Gradio 服务器支持交互式使用

## 许可证

Tencent Hunyuan Community License（不适用于欧盟、英国、韩国）

## 相关链接

- GitHub: https://github.com/Tencent-Hunyuan/HunyuanVideo-Avatar
- 论文: arXiv 2505.20156
- 项目主页: https://HunyuanVideo-Avatar.github.io/
- HuggingFace: tencent/HunyuanVideo-Avatar
- 在线 Playground: https://hunyuan.tencent.com/modelSquare/home/play?modelId=126

## 与同类工具的关系

- 属于腾讯混元多媒体生成家族，与 [[ai-game-devtools/hunyuan3d-2-1]]（3D 资产）、[[ai-game-devtools/hunyuanimage-3-0]]（图像）、[[ai-game-devtools/hunyuan-gamecraft]]（游戏视频）、[[ai-game-devtools/hunyuan-portrait]]（肖像动画）共享技术栈
- 与 [[ai-game-devtools/hallo]]、[[ai-game-devtools/echomimic]]、[[ai-game-devtools/aniportrait]] 同属音频驱动角色动画赛道，但支持多人物和情感控制为独特优势
