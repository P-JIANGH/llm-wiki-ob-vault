---
title: VideoLLaMA 2
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [ai, llm, multimodal, video, audio, open-source]
sources: [raw/articles/ai-game-devtools/videollama2.md]
---

# VideoLLaMA 2

> DAMO-NLP-SG (Alibaba DAMO Academy / NTU Singapore) 开发的高级视频-语言多模态模型，支持视频问答、视频描述、音频理解和音视频联合推理。

## Overview

VideoLLaMA 2 是 VideoLLaMA 系列的第二代，2024 年 6 月发布。基于 LLaVA 1.5 + FastChat 代码库构建，在多个视频-LLM 基准上达到 SOTA（MLVU Top-1、VideoMME Top-1 ~7B 类模型）。

## Architecture

| Component | Implementation |
|-----------|--------------|
| Visual Encoder | CLIP ViT-L/14-336 (VideoLLaMA2 系列) / SigLIP-SO400M-384 (VideoLLaMA2.1 系列) |
| Language Decoder | Mistral-7B / Mixtral-8x7B / Qwen2-7B / Qwen2-72B |
| Connector | MLP Projector |
| 训练帧数 | 8帧（基础版）/ 16帧（16F 变体） |
| 音频编码器 | Fine-tuned BEATs_iter3+（AV 模型专用） |

核心架构文件：`videollama2/model/videollama2_arch.py`

## Model Zoo

### Vision-only
- `VideoLLaMA2-7B/7B-16F` — CLIP + Mistral-7B（7B / 16帧）
- `VideoLLaMA2-8x7B` — CLIP + Mixtral-8x7B MoE
- `VideoLLaMA2-72B` — CLIP + Qwen2-72B
- `VideoLLaMA2.1-7B-16F` — SigLIP + Qwen2-7B（更新架构）

### Audio-Visual
- `VideoLLaMA2.1-7B-AV` — BEATs 音频编码器 + VideoLLaMA2.1-7B-16F

所有模型托管于 [HuggingFace](https://huggingface.co/collections/DAMO-NLP-SG/videollama-2-6669b6b6f0493188305c87ed)。

## Benchmark Performance

| Benchmark | Result |
|-----------|--------|
| MLVU (7B) | **Top-1** (2024年6月) |
| VideoMME (7B) | **Top-1** (2024年6月) |
| EgoSchema | Zero-shot SOTA |
| MVBench | 多选视频QA SOTA |
| Video-MME | Zero-shot视频理解 SOTA |

支持任务：多选视频问答、开放式视频问答、视频描述生成、音频问答、音视频联合问答。

## Key Code Modules

```
videollama2/
├── model/
│   ├── encoder.py           # CLIP/SigLIP 视觉编码器
│   ├── projector.py         # MLP 投影层
│   ├── videollama2_arch.py # 主架构
│   ├── videollama2_mistral.py
│   ├── videollama2_mixtral.py
│   └── videollama2_qwen2.py
├── serve/
│   ├── cli.py              # 命令行推理
│   ├── controller.py       # 多模型控制器
│   ├── model_worker.py     # 分布式推理 worker
│   └── gradio_web_server*.py
└── train.py / videollama2_trainer.py
```

## 游戏开发应用

VideoLLaMA 2 可用于游戏 AI 中的：
- **NPC 行为理解**：分析游戏视频中的动作和场景上下文
- **游戏资产描述**：自动生成游戏视频/图像内容的文字描述
- **音视频对话**：游戏角色通过视觉+听觉感知进行对话
- **关卡通过分析**：理解玩家游戏过程视频用于 AI 训练数据生成

## 许可证

Apache 2.0（代码）；模型受 LLaMA/Mistral/Qwen 许可证约束；非商业用途。

## 相关链接

- GitHub: https://github.com/DAMO-NLP-SG/VideoLLaMA2
- ArXiv: [2406.07476](https://arxiv.org/abs/2406.07476)
- Demo: [HuggingFace Space](https://huggingface.co/spaces/lixin4ever/VideoLLaMA2)
- 后续版本: `ai-game-devtools/videollama3`
- 相关项目: [[ai-game-devtools/llava-onevision]], [[ai-game-devtools/qwen-vl]]
