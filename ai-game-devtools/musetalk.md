---
title: MuseTalk
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [avatar, video, audio, open-source, tool, ai]
sources: [raw/articles/ai-game-devtools/musetalk.md]
---

# MuseTalk

TME Lyra Lab 开源的实时高保真音频驱动唇同步模型，支持 30fps+ 推理（NVIDIA V100），可处理中英日多语言音频。

## 概述

MuseTalk 在 `ft-mse-vae` 的潜在空间中进行训练，通过冻结的 whisper-tiny 编码音频、冻结的 VAE 编码图像，使用类 Stable Diffusion UNet 架构（cross-attention 融合音频嵌入）进行单步潜空间修复生成唇部动画。**不是扩散模型**，而是单步 inpainting。

## 核心特性

- **实时推理：** NVIDIA V100 上 30fps+，支持流式推理管线
- **多语言支持：** 中文、英语、日语
- **可调参数：** `bbox_shift` 控制嘴部开合程度（正值增大开口，负值减小）
- **双版本：** 1.0（L1 loss）和 1.5（GAN + perceptual + sync loss 联合训练）
- **Gradio Web UI：** HuggingFace Spaces 在线演示

## 技术架构

| 组件 | 来源 | 作用 |
|------|------|------|
| ft-mse-vae | StabilityAI | 图像编解码 |
| whisper-tiny | OpenAI | 音频特征提取 |
| UNet (SD 1.4 架构) | 自研 | 唇部图像生成 |
| BiSeNet 人脸解析 | 自研 | 面部区域分割与混合 |
| DWPose | IDEA Research | 姿态估计 |
| SyncNet | ByteDance | 唇同步评估损失 |

## 训练管线

- **Stage 1：** 感知损失 + GAN 损失训练，batch size 32，~74GB 显存
- **Stage 2：** Sync loss 微调（时序一致性），batch size 2，n_sample_frames=16，~85GB 显存
- 数据集：HDTF + 私有数据集
- 在 8×H20 GPU 上验证

## MuseTalk 1.5 改进

相比 1.0 版本：显著提升清晰度、身份一致性和唇音同步精度。引入感知损失、GAN 损失和同步损失联合训练，采用两阶段训练策略和时空数据采样。

## 虚拟人完整管线

MuseTalk 与 [[musev]] 配合使用，形成从文本/图像到视频的完整虚拟人生成管线：MuseV 先生成角色视频 → MuseTalk 添加唇同步。

## 限制

- 分辨率受限于 256×256 面部区域输入（可用 GFPGAN 等超分模型弥补）
- 部分面部细节保留不佳（胡须、唇形色）
- 单帧生成存在时序抖动
- 需 FFmpeg 进行视频处理

## 许可

- 代码：MIT（学术和商业均可使用）
- 模型权重：可用於任何目的（包括商业）
- 第三方组件：遵循各自许可

## 相关链接

- GitHub: https://github.com/TMElyralab/MuseTalk
- HuggingFace: https://huggingface.co/TMElyralab/MuseTalk
- 技术报告: https://arxiv.org/abs/2410.10122
- Gradio Demo: https://huggingface.co/spaces/TMElyralab/MuseTalk
