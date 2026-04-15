---
title: VideoLLaMA 3
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [vlm, video-llm, multimodal, open-source, llm, ai-model]
sources: [raw/articles/ai-game-devtools/video-llama-3.md]
---

# VideoLLaMA 3

DAMO-NLP-SG 开发的前沿多模态基础模型，专注于图像和视频理解。ArXiv: 2501.13106，Apache 2.0 许可。

## 概述

VideoLLaMA 3 是该系列的第三代产品，在 LVBench 和 VideoMME 基准上成为 7B 尺寸模型的领先者。基于 [[Qwen2.5]] LLM 和 [[SigLIP]] 视觉编码器构建，支持视频和图像的统一理解。

## 核心架构

| 组件 | 技术选型 |
|------|---------|
| LLM 基座 | Qwen2.5-7B / Qwen2.5-1.5B |
| 视觉编码器 | SigLIP-SO400M-patch14-384 (NaViT 变长patch) |
| 推理加速 | Flash Attention 2 |
| 训练框架 | DeepSpeed ZeRO-2/3, accelerate |
| 框架版本 | transformers >= 4.46.3 |

两阶段训练流程：Stage 1 训练 2B 模型，Stage 2 扩展至 7B。引入 Inf-CL (Contrastive Loss) tile-based 实现，显著降低长上下文训练的显存占用。

## 模型变体

- **VideoLLaMA3-7B** — 完整视频+图像理解，Qwen2.5-7B 基座
- **VideoLLaMA3-2B** — 轻量版本，Qwen2.5-1.5B 基座
- **VideoLLaMA3-7B/2B-Image** — 纯图像理解版本
- **VL3-SigLIP-NaViT** — 可复用视觉编码器，开放独立使用

## 技术特点

**多模态理解：** 支持视频帧序列输入（max 180帧 @ fps=1），单图/多图理解，视觉指代定位（referring & grounding）。

**长视频处理：** 内置长视频理解能力，配合 128K context 的 Qwen2.5 基座，可处理较长视频片段。

**推理便捷：** 使用 HuggingFace `transformers` 库，`AutoModelForCausalLM` + `AutoProcessor` 标准接口，[[text-generation-webui]] 等主流推理框架可无缝集成。

**训练支持：** 提供完整训练代码和脚本，支持自定义数据集微调。

## 游戏开发应用

VideoLLaMA 3 可用于游戏 AI 场景：
- **NPC 视频理解** — 实时分析玩家上传的游戏视频截图/片段
- **游戏内视觉问答** — 结合 [[ChatDev]] 等 Agent 框架构建游戏 QA 系统
- **游戏内容生成辅助** — 视频理解辅助 [[HunyuanVideo]] 等生成模型的质量评估

与同系列 [[videollama2]] 相比，VideoLLaMA 3 采用 NaViT 变长 patch 编码、VL3-Syn7M 高质量数据集重新训练，在视频理解 benchmark 上有显著提升。

## 相关链接

- GitHub: https://github.com/DAMO-NLP-SG/VideoLLaMA3
- HF Demo: https://huggingface.co/spaces/lixin4ever/VideoLLaMA3
- HF Checkpoints: https://huggingface.co/collections/DAMO-NLP-SG/videollama3-678cdda9281a0e32fe79af15
- Paper: https://arxiv.org/abs/2501.13106
