---
title: StoryDiffusion
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [image-generation, video, diffusion, open-source, tool]
sources: [raw/articles/ai-game-devtools/story-diffusion.md]
---

# StoryDiffusion

## Overview

StoryDiffusion 是南开大学 HVision 团队提出的长程图像和视频一致性生成框架（NeurIPS 2024），核心创新为 **Consistent Self-Attention（一致性自注意力）** 机制，可在多张图片序列中保持角色/物体的一致性。同时包含运动预测模块，支持从条件图像序列生成连贯长视频。

项目地址: `https://github.com/HVision-NKU/StoryDiffusion`
论文: arXiv 2405.01434
项目主页: https://storydiffusion.github.io/

## 核心功能

1. **一致性自注意力（Consistent Self-Attention）** — 热插拔模块，兼容所有 SD1.5 和 SDXL 系列扩散模型，在长序列图像生成中保持角色外观一致性。需至少 3 个文本提示（推荐 5-6 个）进行布局编排。

2. **运动预测器（Motion Predictor）** — 在压缩的图像语义空间中预测条件图像之间的运动，实现更大范围的长视频生成。

3. **漫画生成** — 输入角色参考图 + 多个分镜提示词，自动生成角色一致的连环漫画。

4. **两阶段长视频生成** — 先生成一致性关键帧图像，再通过运动预测器在图像间插值生成连贯视频。

## 技术架构

| 维度 | 详情 |
|------|------|
| 基础模型 | SDXL (Stable Diffusion XL) / SD1.5 |
| 核心机制 | Consistent Self-Attention + PhotoMaker ID Encoder |
| 身份注入 | LoRA 适配器 + 触发词 Token 扩展 |
| 推理框架 | PyTorch + diffusers 0.25.0 |
| 调度器 | DDIMScheduler |
| UI 框架 | Gradio 4.22.0 |
| 显存需求 | ≥20GB（低 VRAM 版本在 24GB A10 上测试通过） |

### 关键代码模块

- **`PhotoMakerStableDiffusionXLPipeline`** — 继承 `StableDiffusionXLPipeline`，集成 PhotoMaker ID 编码器和 LoRA 适配器
- **`SpatialAttnProcessor2_0`** — 自定义注意力处理器，实现跨面板的一致性自注意力
- **触发词机制** — 在 tokenizer 中添加特殊标记，定位类别词位置用于身份注入
- **批处理提示编码** — 单次前向处理多个故事面板提示词，拼接所有嵌入向量

### 支持的基座模型

通过 `config/models.yaml` 配置：
- Juggernaut-XL-v9（写实风格）
- RealVisXL_V4.0
- Stable Diffusion XL base 1.0
- sdxl-unstable-diffusers-y

## 与同类工具差异

| 对比维度 | StoryDiffusion | [[ai-game-devtools/stable-video-diffusion]] | [[ai-game-devtools/animatediff]] |
|---------|---------------|---------------------------|-----------------------------|
| 主要目标 | 角色一致性漫画 + 长视频 | 图像→短视频 | 文本→短动画 |
| 一致性方法 | Consistent Self-Attention | SVD 预训练权重 | Motion Module |
| 视频长度 | 两阶段长视频（分钟级） | 14-25 帧 | 16 帧 |
| 基座模型 | SD1.5/SDXL 通用 | 专用 SVD 模型 | SD 1.5 |
| 角色一致性 | ✅ 多角色跨帧保持 | ❌ 不保证 | ❌ 不保证 |

## 许可证

README 未明确声明许可证（仓库中无 LICENSE 文件内容）。

## 相关链接

- GitHub: https://github.com/HVision-NKU/StoryDiffusion
- 论文: https://arxiv.org/abs/2405.01434
- HuggingFace Demo: https://huggingface.co/spaces/YupengZhou/StoryDiffusion
- Colab: Comic_Generation.ipynb

## 待完成

- [ ] 视频生成模型源代码（未开源）
- [ ] 视频生成模型预训练权重（未开源）
