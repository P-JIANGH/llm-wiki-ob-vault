---
title: MoE-LLaVA
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [ai-model, vlm, llm, open-source, mixture-of-experts, pku-yuangroup]
sources: [raw/articles/ai-game-devtools/moe-llava.md]
---

# MoE-LLaVA

**MoE-LLaVA** (Mixture of Experts for Large Vision-Language Models) 是北京大学 & PKU-YuanGroup 提出的基于 MoE 架构的高效多模态大模型，通过稀疏激活参数显著降低计算成本。

## Overview

MoE-LLaVA 将 Mixture-of-Experts 机制引入大型视觉-语言模型，在仅 **3B 稀疏激活参数** 下达到与 LLaVA-1.5-7B 相当的性能。核心思路：先做标准 VLM 预训练，再加一个轻量 MoE tuning stage，8×A100 可在 1 天内完成训练。

2024 年 1 月发布，2025 年 7 月被 IEEE TMM 接收。

## Architecture

| Component | Detail |
|-----------|--------|
| **Base** | LLaVA 架构，视觉编码器为 CLIP |
| **LLM Backbone** | Phi-2 (2.7B), Qwen-1.8B, StableLM-1.6B |
| **MoE Config** | 每层 ×4 experts，Top-2 稀疏激活 |
| **训练策略** | 标准 VLM 预训练 → MoE Tuning Stage |

关键代码位于 `moellava/model/language_model/` 下的各 `*_moe.py` 文件。

## Model Variants

| Model | 激活参数量 | Avg | VQAv2 | GQA | MME |
|-------|-----------|-----|-------|-----|-----|
| MoE-LLaVA-StableLM-1.6B×4 | 2.0B | 57.3 | 76.7 | 60.3 | 1318 |
| MoE-LLaVA-Qwen-1.8B×4 | 2.2B | 56.7 | 76.2 | 61.5 | 1292 |
| MoE-LLaVA-Phi2-2.7B×4 | 3.6B | 61.1 | 77.6 | 61.4 | 1423 |
| **MoE-LLaVA-Phi2-2.7B×4-384** | **3.6B** | **62.9** | 79.9 | 62.6 | 1431 |
| LLaVA-1.5-7B (对比) | 7B | 62.0 | 78.5 | 62.0 | 1511 |

最佳变体 MoE-LLaVA-Phi2-2.7B×4-384 平均分 62.9，接近 LLaVA-1.5-7B 的 62.0，但只用了 3.6B 激活参数（vs 7B）。

## 技术要点

- **稀疏激活**：4 个 expert 只激活 2 个，大幅减少实际计算量
- **两阶段训练**：先做 LLaVA 标准预训练，再加 MoE tuning stage，避免直接对 LLM 做 MoE 改造的复杂性问题
- **多 backbone 支持**：Phi-2 / Qwen / StableLM，通过 `conv_templates["phi"|"qwen"|"stablelm"]` 切换
- **已知问题**：flash-attention2 会导致性能下降

## 快速使用

```bash
# CLI 推理
deepspeed --include localhost:0 moellava/serve/cli.py \
  --model-path "LanguageBind/MoE-LLaVA-Phi2-2.7B-4e" \
  --image-file "image.jpg"

# Gradio Web UI
deepspeed --include localhost:0 moellava/serve/gradio_web_server.py \
  --model-path "LanguageBind/MoE-LLaVA-Phi2-2.7B-4e"
```

## Related

- [[minigpt-4]] — 高效 VLM 架构，另一条稀疏化路线
- [[video-llava]] — 同团队 Video-LLaVA，视频多模态扩展
- [[languagebind]] — 同团队 LanguageBind，多模态对齐框架
- [[llama-3]] — LLaVA 的 LLM 基座来源
- [[imagebind]] — Meta 多模态绑定研究

## Links

- GitHub: https://github.com/PKU-YuanGroup/MoE-LLaVA
- Paper: https://arxiv.org/abs/2401.15947
- HuggingFace: https://huggingface.co/spaces/LanguageBind/MoE-LLaVA
- ModelScope: https://modelscope.cn/models/PKU-YuanLab/MoE-LLaVA-Phi2-2.7B-4e
