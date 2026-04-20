---
title: AnimateDiff
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [diffusion, video, animation, tool, open-source]
sources: [raw/articles/ai-game-devtools/animatediff.md]
---

# AnimateDiff

**AnimateDiff** 是一个即插即用的运动模块（Motion Module），可将大多数社区 Stable Diffusion 模型转换为文本到视频（T2V）动画生成器，无需额外训练。

ICLR 2024 Spotlight 论文，由上海人工智能实验室（Shanghai AI Lab）团队开发。

## 核心特性

- **即插即用**：Motion Module 可直接插入任何社区 SD 模型（如 ToonYou、RealisticVision），无需微调
- **多版本支持**：v1/v2/v3 适配 SD 1.5；SDXL-Beta 适配 SDXL
- **MotionLoRA**（v2 起）：支持 8 种基础摄像机运动控制（Zoom In/Out、Pan Left/Right、Tilt Up/Down、Rolling）
- **SparseCtrl**（v3 起）：支持从稀疏条件输入（RGB 图像 / 草图）控制视频生成
- **Domain Adapter LoRA**（v3 起）：在推理时可调整 LoRA 权重来改变视觉属性（如去除水印）

## 技术架构

### 核心组件

| 组件 | 说明 |
|------|------|
| `UNet3DConditionModel` | 在 SD 2D UNet 基础上扩展时序注意力层 |
| `VanillaTemporalModule` | 核心运动模块，含 Temporal Self-Attention，使用零初始化策略 |
| `SparseControlNetModel` | 稀疏条件控制编码器（RGB/草图） |
| `AnimationPipeline` | 自定义 diffusers 管线，继承 DiffusionPipeline |

### 设计模式

- Motion Module 参数**零初始化**——从"无运动"状态开始，训练过程中逐步学习运动模式
- 插入到 UNet 的时序层中，与空间注意力解耦
- 使用 **xformers** 实现内存高效的注意力计算
- 基于 Tune-a-Video 代码库构建

### 技术栈

- Python 3.10 / PyTorch 1.13.1 / CUDA 11.7
- diffusers 0.11.1 / transformers 4.25.1 / xformers 0.0.16
- einops、omegaconf、safetensors
- Gradio Web 演示界面

## 版本矩阵

| 版本 | 日期 | 基础模型 | Motion Module 大小 | 特性 |
|------|------|----------|-------------------|------|
| v1 | 2023.07 | SD 1.5 | 1.6 GB (417M) | 基础动画生成 |
| v2 | 2023.09 | SD 1.5 | 1.7 GB (453M) | 更高分辨率/批量训练 + MotionLoRA |
| v3 | 2023.12 | SD 1.5 | 1.56 GB (453M) | Domain Adapter LoRA + SparseCtrl |
| SDXL-Beta | 2023.11 | SDXL | 950 MB | 支持 1024x1024x16 帧 |

## 社区集成

- **A1111 Extension**: sd-webui-animatediff
- **ComfyUI Extension**: ComfyUI-AnimateDiff-Evolved
- **Google Colab**: 在线演示可用

## 已知限制

1. 存在轻微闪烁（flickering），未来版本计划改进
2. 为兼容社区模型，未针对通用 T2V 做专门优化，通用场景下视觉质量有限
3. 图像动画/插值时，建议使用同一社区模型生成的图片以保持风格一致

## 相关链接

- GitHub: https://github.com/guoyww/animatediff/
- arXiv (AnimateDiff): https://arxiv.org/abs/2307.04725
- arXiv (SparseCtrl): https://arxiv.org/abs/2311.16933
- 项目页面: https://animatediff.github.io/
- Hugging Face: https://huggingface.co/spaces/guoyww/AnimateDiff

## 参见

- [[stable-diffusion]] — 底层图像生成模型
- [[stable-diffusion-webui]] — 社区 Web UI，支持 AnimateDiff 插件
- [[sd-webui-controlnet]] — 相关条件控制技术
- [[controlnet]] — 条件控制基础
