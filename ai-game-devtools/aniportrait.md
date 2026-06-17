---
title: AniPortrait
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [avatar, animation, open-source, diffusion, audio]
sources: [raw/articles/ai-game-devtools/aniportrait.md]
---

# AniPortrait

**AniPortrait: Audio-Driven Synthesis of Photorealistic Portrait Animations**

## Overview

Tencent Games Zhiji 开源的音频驱动肖像动画框架，支持从单张参考肖像 + 音频输入生成逼真的说话头部视频。也可通过驱动视频实现人脸重演（face reenactment）。arXiv 论文 2024 年 3 月发表，HuggingFace 提供免费 GPU 在线 Demo。

## 核心架构

### 三阶段管线

1. **参考图像编码**: 从单张肖像提取面部特征和身份表示
2. **音频/姿态条件化**:
   - 音频驱动模式: wav2vec2 编码 → audio2mesh（面部表情 3DMM 参数）+ audio2pose（头部姿态）→ 关键帧序列
   - 视频驱动模式: 从源视频提取姿态/关键点序列
3. **3D UNet 生成**: 基于 AnimateDiff 架构的 3D 去噪 UNet + Motion Module，在参考特征 + 姿态信号条件下逐帧生成
4. **帧插值加速**（可选）: FILM-Net 生成中间帧加速推理

### 关键模型组件

| 组件 | 作用 | 来源 |
|------|------|------|
| Denoising UNet (3D) | 时序视频帧生成，集成 Motion Module | AnimateDiff 改编 |
| Reference UNet | 从参考图提取外观特征，通过 mutual self-attention 注入身份 | 自研 |
| Pose Guider | 轻量网络将姿态/关键点序列编码为条件特征 | 自研 |
| Audio2Mesh | Wav2Vec2 → 面部 3DMM 顶点位移 | 基于 wav2vec2-base-960h |
| Audio2Pose | Wav2Vec2 → 头部旋转+平移参数 | 自研 |
| Motion Module | 时序注意力块，保证帧间一致性 | AnimateDiff 预训练 |

## 三种工作模式

- **Self-driven**: 参考图 + 姿态视频 → 跟随姿态的动画肖像
- **Face Reenactment**: 参考图 + 源人脸视频 → 参考人模仿源表情
- **Audio-driven**: 参考图 + 音频 → 自然口型同步 + 头部动作的说话视频

## 技术规格

- **基础模型**: Stable Diffusion V1.5 (UNet 骨架)
- **VAE**: sd-vae-ft-mse
- **图像编码器**: CLIP (sd-image-variations-diffusers)
- **音频编码器**: wav2vec2-base-960h (Facebook)
- **输出分辨率**: 512×512
- **训练数据**: VFHQ + CelebV-HQ
- **训练管线**: 两阶段（Stage1: 外观+姿态; Stage2: Motion Module + AnimateDiff 预训练权重）
- **加速**: FILM-Net 帧插值 (film_net_fp16.pt)

## 依赖栈

PyTorch 2.0.1, Diffusers 0.24.0, xformers, ControlNet-Aux, MediaPipe, Gradio 4.24.0, OpenCV, librosa, ffmpeg-python

## 许可证

Apache-2.0

## 相关链接

- [GitHub](https://github.com/Zejun-Yang/AniPortrait)
- [arXiv 2403.17694](https://arxiv.org/abs/2403.17694)
- [HuggingFace Model](https://huggingface.co/ZJYang/AniPortrait/tree/main)
- [HuggingFace Demo](https://huggingface.co/spaces/ZJYang/AniPortrait_official)

## 与同类工具差异

- 相比 [[easyphoto]]（侧重数字分身 LoRA 训练），AniPortrait 专注于零样本音频驱动动画
- 相比 [[mug-diffusion]]（音游谱面生成），AniPortrait 面向人物肖像视频生成
- 采用 AnimateDiff Motion Module 实现时序一致性，与 [[follow-your-click]] 共享相似扩散管线
