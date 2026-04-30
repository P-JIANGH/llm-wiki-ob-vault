---
title: Cambrian-1
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [vlm, multimodal, model, open-source, vision-centric]
sources: [raw/articles/ai-game-devtools/cambrian-1.md]
---

# Cambrian-1

> A Fully Open, Vision-Centric Exploration of Multimodal LLMs

## Overview

**Cambrian-1** 是由 NYU Vision X（Yann LeCun、Saining Xie 参与）开发的开源多模态大语言模型（MLLM），主打视觉中心能力。发布于 2024-06-24，提供 8B / 13B / 34B 三种参数规模，在多项 benchmark 上与 GPT-4V、Gemini-Pro、Grok-1.4V 竞争，且仅用 576 个视觉 tokens（远少于 LLaVA-NeXT/Mini-Gemini 的 2880 个）。

## Key Facts

| Property | Value |
|----------|-------|
| **Release** | 2024-06-24 |
| **Authors** | Shengbang Tong, Ellis Brown, Penghao Wu et al. (NYU, Meta) |
| **License** | Apache 2.0 |
| **Paper** | arXiv:2406.16860 |
| **Website** | https://cambrian-mllm.github.io/ |
| **HF Models** | [cambrian-8b](https://huggingface.co/nyu-visionx/cambrian-8b), [cambrian-13b](https://huggingface.co/nyu-visionx/cambrian-13b), [cambrian-34b](https://huggingface.co/nyu-visionx/cambrian-34b) |

## Performance

| Model | Base LLM | Visual Tokens | MMB | SQA-I | MathVista | ChartQA | MMVP |
|-------|----------|---------------|-----|-------|-----------|---------|------|
| Cambrian-1-8B | LLaMA3-8B | 576 | 75.9 | 80.4 | 49.0 | 73.3 | 51.3 |
| Cambrian-1-13B | Vicuna-1.5-13B | 576 | 75.7 | 79.3 | 48.0 | 73.8 | 41.3 |
| Cambrian-1-34B | Hermes2-Yi-34B | 576 | 81.4 | 85.6 | 53.2 | 75.6 | 52.7 |

> 对比：LLaVA-NeXT-8B (2880 tokens) MMB=72.1；Mini-Gemini-HD-8B (2880 tokens) MMB=72.7。Cambrian-1 以更少 tokens 实现更高性能。

## Architecture

- **Vision Encoder:** 多 encoder 组合 — SigLIP / CLIP-ViT / DINOv2 / ConvNeXt-XXL
- **Projector:** Spatial Vision Aggregator (SVA) — 新型视觉连接器，冻结 vision encoder 和 LLM，仅训练 SVA
- **两阶段训练:**
  1. **Visual Connector Training** — 2.5M alignment data 训练 SVA，max length 2048
  2. **Instruction Tuning** — Cambrian-7M 指令数据训练 SVA + LLM

### SVA 核心参数

| 参数 | 含义 |
|------|------|
| `--num_query_group` (G) | Query 分组数 |
| `--query_num_list` | 每组 query 数量，如 `[576]` |
| `--connector_depth` (D) | SVA 深度 |
| `--vision_hidden_size` | SVA 隐层维度 |
| `--connector_only` | true=仅在 LLM 前插入；false=插入 LLM 中间层 |

## Training

- **硬件:** TPU-V4-512（也支持 TPU-V4-64）
- **框架:** TorchXLA（GPU inference 通过 `pip install ".[gpu]"`）
- **Dependencies:** torch==2.2.0, transformers==4.37.0, timm==0.9.16, open_clip_torch, diffusers

## Data: Cambrian-10M

| Dataset | Size | Description |
|---------|------|-------------|
| Cambrian-10M | 10M | 原始数据集 |
| Cambrian-7M | 7M | 精选高质量子集（最佳数据比例） |
| Data Engine 161K | 161K | GPT-4o 收集的科学 VQA 数据（+400%） |
| GPT-4v 77K | 77K | GPT-4v 重写 extended responses |
| GPT-4o 60K | 60K | GPT-4o 生成创意对话数据 |

**最优数据比例:** Language 21% / General 34.52% / OCR 27.22% / Counting 8.71% / Math 7.20% / Code 0.87% / Science 0.88%

## Key Innovations

1. **SVA (Spatial Vision Aggregator):** Query-based aggregator，无需大量视觉 tokens 即可高效融合多 encoder 特征
2. **Fixed 576 tokens:** 远低于竞品的 2880 tokens，却取得更好性能
3. **Internet Data Engine:** 自动化大规模网络数据采集，专门补足科学领域 VQA 数据不足
4. **CV-Bench:** HuggingFace 上发布的专用计算机视觉 benchmark

## Related Projects

- [[minigpt-4]] — 类似冻结 ViT + Q-Former 连接方案，但使用不同架构
- [[internlm-xcomposer]] — 上海 AI Lab 的 LVLM 系列
- [[imagebind]] — Meta 多模态嵌入（6 模态）
- [[janus]] — DeepSeek 统一多模态模型（解耦视觉编码）

## License Note

Apache 2.0，但使用需遵循基础模型许可证（LLaMA3 license / Vicuna license 等）。
