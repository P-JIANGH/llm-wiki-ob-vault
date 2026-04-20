---
title: MusePose
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [avatar, animation, diffusion, open-source, video, tool]
sources: [raw/articles/ai-game-devtools/musepose.md]
---

# MusePose

**MusePose: a Pose-Driven Image-to-Video Framework for Virtual Human Generation**

## Overview

腾讯音乐 TME Lyra Lab 开源的姿态驱动虚拟人生成框架，从参考图像 + 姿态序列生成人体舞蹈视频。是 Muse 开源系列（MuseV + MuseTalk + MusePose）的最后一块拼图，目标是实现端到端的全身动作+交互虚拟人生成。基于 AnimateAnyone 论文，优化自 Moore-AnimateAnyone 代码库。

**发布日期:** 2024-05-27 | **训练代码发布:** 2025-03-04

## 核心架构

### 扩散管线（两阶段推理）

1. **Reference UNet**: 从参考图像提取外观特征和身份表示
2. **Pose Guider**: InflatedConv3d 轻量网络（通道 16→32→64→128），将 DWPose 关键点序列编码为条件特征
3. **Denoising UNet (3D)**: 基于 SD 1.5 的时序去噪 UNet，集成 Motion Module 保证帧间一致性
4. **Mutual Self-Attention**: 跨模态注意力机制，将 Reference UNet 的身份特征注入生成管线

### Pose Align 算法

MusePose 独有的姿态对齐算法（`pose_align.py`），可将任意舞蹈视频对齐到任意参考图像，显著提升了推理性能和模型可用性。这是相比 Moore-AnimateAnyone 的关键改进。

## 技术规格

| 维度 | 规格 |
|------|------|
| 基础模型 | Stable Diffusion 1.5 (UNet 骨架) |
| 姿态检测 | DWPose (with YOLOX detector) |
| VAE | sd-vae-ft-mse |
| 图像编码 | CLIP (sd-image-variations-diffusers) |
| 运动模块 | AnimateDiff mm_sd_v15_v2.ckpt |
| ControlNet | control_v11p_sd15_openpose（仅训练） |
| 训练 | DeepSpeed Zero2（8×80GB GPU） |
| VRAM（推理） | 16GB @ 512×512×48 / 28GB @ 768×768×48 |
| ComfyUI | Comfyui-MusePose（2024-05-31 支持） |

## 依赖栈

PyTorch, Diffusers, OpenMMLab (mmcv>=2.0.1, mmdet>=3.1.0, mmpose>=1.1.0), DWPose, OpenCV, Accelerate, DeepSpeed

## 许可证

- **代码:** MIT License（学术和商业均可）
- **模型权重:** 仅限非商业研究用途

## 相关链接

- [GitHub](https://github.com/TMElyralab/MusePose)
- [HuggingFace Model](https://huggingface.co/TMElyralab/MusePose)
- [ComfyUI 集成](https://github.com/TMElyralab/Comfyui-MusePose)

## 与同类工具差异

- 相比 [[ai-game-devtools/aniportrait]]（音频驱动肖像动画），MusePose 专注于姿态驱动的全身动作生成，而非口型同步
- 相比 [[ai-game-devtools/liveportrait]]（视频驱动高效肖像动画），MusePose 支持从单张参考图像生成完整舞蹈视频
- 相比 [[ai-game-devtools/dwpose]]（纯姿态检测工具），MusePose 使用 DWPose 作为条件输入，实现了完整的图像到视频生成管线
- MusePose 与 MuseV、MuseTalk 共同构成 TME 的 Muse 开源系列，覆盖从图像生成到视频驱动到口型同步的完整虚拟人生成链路
