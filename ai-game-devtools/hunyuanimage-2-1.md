---
title: HunyuanImage-2.1
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai-model, tool, open-source, multimodal]
sources: [raw/articles/ai-game-devtools/hunyuanimage-2-1.md]
---

# HunyuanImage-2.1

## Overview
Tencent Hunyuan 开源的 17B 参数扩散模型，专注于高分辨率（2K）文本到图像生成。在 Arena 开源文生图模型排行榜中位列第一，语义对齐评分超越 FLUX-dev 和 Qwen-Image，接近闭源的 GPT-Image。

## 核心架构
- **两阶段扩散管道：** Base/Distilled 生成 → Refiner 细节增强
- **17B 参数** DiT（Diffusion Transformer）骨干
- **双文本编码器：** MLLM（Qwen2.5-VL-7B-Instruct 替代未发布的 HunyuanMLLM）+ byT5（Glyph-SDXL-v2）
- **原生 2K 分辨率**输出（2048×2048 / 2560×1536 等），不支持 1K 生成（会产生伪影）
- **Token Refiner** 模块用于文本条件精炼
- **FP8 量化 + CPU offloading** 支持，最低 24GB 显存即可运行

## 模型变体
| 模型 | 推理步数 | 引导系数 | Shift | 说明 |
|------|---------|---------|-------|------|
| Base | 50 | 3.5 | 5 | 未蒸馏，最佳质量 |
| Distilled | 8 | 3.25 | 4 | 速度优化版 |
| Refiner | N/A | N/A | N/A | 后处理细节增强 |

## 关键特性
- **提示词增强至关重要：** 使用 [[ai-game-devtools/prompt-enhancer]]（PromptEnhancer-32B）预处理提示词可显著提升生成质量
- 支持多种宽高比，原生适配 2K 分辨率
- MMDoubleStreamBlock + MMSingleStreamBlock 双流/单流混合架构
- LazyCall 配置系统，便于扩展和自定义

## 性能表现
- **SSAE 语义对齐：** 0.8888 平均分，开源第一，接近 GPT-Image（0.8952）
- **GSB 人类偏好：** 对比 Seedream 3.0（闭源）仅 -1.36%，领先 Qwen-Image +2.89%
- Arena 开源文生图模型排行榜 Top 1

## 与同类工具差异
- 相比 [[ai-game-devtools/flux]]：HunyuanImage-2.1 采用两阶段架构（Base+Refiner），FLUX 为单阶段 flow matching；HunyuanImage 更强调提示词增强，FLUX 对提示词依赖较低
- 相比 [[ai-game-devtools/hunyuanimage-3-0]]：2.1 是纯扩散模型（17B），3.0 升级为自回归 MoE 架构（80B/13B 激活），支持图文到图像编辑和多图融合
- 相比 [[ai-game-devtools/hunyuan-dit]]：初代 Hunyuan DiT 仅 1.5B 参数，2.1 大幅扩展到 17B 并引入 Refiner 阶段

## 技术栈
- Python + PyTorch ≥2.6.0
- diffusers ≥0.32.0 / transformers 4.56.0
- Qwen2.5-VL-7B-Instruct 作为 MLLM 文本编码器
- Qwen-VL-Utils / OmegaConf / Loguru

## 相关链接
- [GitHub](https://github.com/Tencent-Hunyuan/HunyuanImage-2.1)
- [HuggingFace](https://huggingface.co/tencent/HunyuanImage-2.1)
- [官方 Demo](https://hunyuan.tencent.com/modelSquare/home/play?modelId=286)
- [项目主页](https://hunyuan.tencent.com/image/en?tabIndex=0)

## 许可证
仓库中未包含 LICENSE 文件，具体使用条款请参考官方项目页面。
