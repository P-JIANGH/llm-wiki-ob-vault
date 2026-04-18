---
title: Hallo — 音频驱动肖像动画
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [avatar, tool, open-source, audio, animation, diffusion]
sources: [raw/articles/ai-game-devtools/hallo.md]
---

# Hallo: Hierarchical Audio-Driven Visual Synthesis for Portrait Image Animation

## 概述

Hallo 是复旦大学 Generative Vision Lab 开发的**音频驱动肖像动画**框架，输入单张人像照片 + 一段英文语音，自动生成逼真的说话人像视频。2024 年 6 月开源。

## 核心架构

- **基础模型**: Stable Diffusion 1.5 UNet + AnimateDiff motion module (mm_sd_v15_v2) 提供时序动画能力
- **音频编码**: Wav2Vec2-base-960h → audio_proj 多层感知机投影到扩散条件空间
- **面部编码**: InsightFace 2D/3D 人脸分析 + MediaPipe Face Landmarker → face_locator 空间条件
- **UNet 3D**: 在 SD UNet 基础上加入 temporal attention 层，由 motion module 驱动帧间一致性
- **Mutual Self-Attention**: 图像与音频特征在注意力层进行跨模态融合
- **两阶段训练**: Stage1 学习静态图像/音频条件 → Stage2 加入运动模块学习动态

## 技术特点

| 维度 | 细节 |
|------|------|
| 输入 | 方形人像照片 + WAV 格式英文语音 |
| 输出 | MP4 视频（.cache/output.mp4） |
| 推理入口 | `scripts/inference.py` |
| 训练方式 | DeepSpeed ZeRO Stage 2 + FP16，8 GPU 分布式 |
| 可控参数 | pose_weight / face_weight / lip_weight / face_expand_ratio |
| 前置模型 | 7 个预训练模型（SD 1.5/VAE/Wav2Vec/InsightFace/Motion Module/audio_separator） |
| 依赖栈 | PyTorch 2.2.2, diffusers 0.27.2, transformers 4.39.2 |

## 数据要求

- 图片：正方形裁剪，人脸占 50%-70%，正面朝向（旋转 <30°）
- 音频：WAV 格式，仅支持英语（训练数据限制），人声清晰即可（允许背景音乐）

## 社区生态

- [[ai-game-devtools/comfyui]] — ComfyUI-Hallo 节点集成
- hallo-webui（Gradio Web 界面）
- hallo-docker / RunPod 部署模板
- JoyHallo — 中文语音扩展版本
- TTS x Hallo HuggingFace Space（文本→语音→人像一站式）

## 与同类工具差异

- 对比 [[ai-game-devtools/echomimic]]：Hallo 使用 SD 1.5 + AnimateDiff 基础架构，EchoMimic 同样基于 SD v1.5 但采用 Whisper-Tiny 音频编码 + 轻量地标 CNN，在 HDTF 基准上 FID/FVD 优于 Hallo
- 对比 [[ai-game-devtools/aniportrait]]：Hallo 引入层级式音频-视觉合成架构（face locator + image/audio proj 分离），AniPortrait 采用 wav2vec2 → audio2mesh/audio2pose → 3DMM + AnimateDiff Motion Module 路线
- 仅支持英语输入是主要局限；社区 JoyHallo 项目尝试解决中文支持

## 相关链接

- GitHub: https://github.com/fudan-generative-vision/hallo
- 论文: https://arxiv.org/pdf/2406.08801
- HuggingFace 模型: https://huggingface.co/fudan-generative-ai/hallo
- 项目主页: https://fudan-generative-vision.github.io/hallo/
