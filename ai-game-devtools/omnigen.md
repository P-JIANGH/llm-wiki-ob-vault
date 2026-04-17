---
title: OmniGen
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai-model, image-generation, open-source, tool]
sources: [raw/articles/ai-game-devtools/omnigen.md]
---

# OmniGen

## Overview

OmniGen（VectorSpaceLab）是统一的图像生成模型，支持从多模态提示直接生成各类图像。其核心理念是：**未来图像生成应像 GPT 生成文本一样简单灵活**——无需额外插件（ControlNet/IP-Adapter/Reference-Net 等），无需预处理（人脸检测/姿态估计/裁剪等），仅通过文本+参考图像的自然组合即可完成。

## 技术架构

| 组件 | 技术选型 |
|------|---------|
| 骨干网络 | Phi-3 风格 Transformer + DiT 架构 |
| VAE | StabilityAI SDXL VAE（自动下载） |
| 调度器 | OmniGenScheduler（迭代去噪） |
| 微调 | LoRA（peft）+ accelerate 分布式训练 |
| 依赖 | torch<2.5, transformers>=4.45.2, diffusers>=0.30.3, timm |

### 核心模块
- **OmniGenPipeline** — 统一推理入口，`from_pretrained()` 加载模型，`__call__()` 执行生成
- **OmniGenProcessor** — 文本+图像 tokenization，支持 `<img><|image_i|></img>` 占位符语法
- **OmniGen model** — DiT 风格 Transformer（TimestepEmbedder + FinalLayer + Phi3Transformer）
- **LoRA 支持** — `pipe.merge_lora(lora_path)` 合并微调权重

## 功能

1. **文本到图像** — 标准 prompt → 1024×1024 图像
2. **多模态到图像** — 文本 + 参考图像（主体驱动生成、身份保留）
3. **图像编辑** — 通过文本指令修改现有图像
4. **图像条件生成** — 深度/姿态/特征控制
5. **指代表达生成** — 多张参考图 + 自然语言指代 → 新合成图像

## 与同类工具差异

与 [[ai-game-devtools/controlnet]] 和 [[ai-game-devtools/instantid]] 等需要额外条件网络的方式不同，OmniGen 在单一模型中自动识别输入图像特征（物体、姿态、深度等），根据文本提示决定如何利用参考信息。这简化了工作流，但模型参数量较大，内存占用较高。

与 [[ai-game-devtools/comfyui]] 的节点式管线相比，OmniGen 提供极简 API（几行代码即可完成多种任务），但灵活性不如可视化节点编排。

## 版本演进

- **OmniGen v1**（2024-10）：初始版本，权重 Shitao/OmniGen-v1，已集成 HuggingFace Diffusers
- **OmniGen2**（2025-06）：下一代版本，发布在 https://github.com/VectorSpaceLab/OmniGen2

## 许可证

MIT License

## 相关链接

- [GitHub](https://github.com/VectorSpaceLab/OmniGen)
- [arXiv](https://arxiv.org/abs/2409.11340)
- [HuggingFace Model](https://huggingface.co/Shitao/OmniGen-v1)
- [HuggingFace Demo](https://huggingface.co/spaces/Shitao/OmniGen)
- [X2I Dataset](https://huggingface.co/collections/yzwang/x2i-dataset-674c66d1d700f7f816a9590d)
