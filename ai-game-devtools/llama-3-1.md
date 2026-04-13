---
title: Llama 3.1 — Meta Llama 模型集合
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [ai, llm, model, open-source]
sources: [raw/articles/ai-game-devtools/llama-3-1.md]
---

# Llama 3.1 — Meta Llama 模型集合

## Overview

Meta 于 2024 年 7 月 23 日发布的开源大语言模型系列，是 Llama 3 的扩展版本，首次将 405B 参数模型带入开源领域，并大幅扩展上下文窗口至 128K。

## Key Facts

- **Developer**: Meta
- **Launch date**: 2024-07-23
- **Sizes**: 8B / 70B / **405B** 参数
- **Context length**: **128K tokens**（Llama 3 为 8K）
- **Tokenizer**: TikToken-based
- **Training data**: 15T+ tokens 公开在线数据
- **Knowledge cutoff**: December 2023
- **Attention**: Grouped-Query Attention (GQA)，全系列支持
- **Fine-tuning**: SFT + RLHF
- **Supported languages**: English, German, French, Italian, Portuguese, Hindi, Spanish, Thai

## Architecture

auto-regressive 优化 transformer 架构。[[ai-game-devtools/llama-3]] 使用标准 GQA 仅在 70B 以上规模，而 Llama 3.1 全系列（含 8B）均启用 GQA，显著提升推理效率。

## 与同类工具对比

Llama 3.1 将开源 LLM 的上下文能力提升至 GPT-4 Turbo 级别（128K），而当时大多数开源模型仅支持 8K-32K。405B 参数规模在开源领域前所未有。

## 生态与工具

- **PyPI 包**: `pip install llama-models`（Python >= 3.10）
- **CLI**: `llama-model list / download / describe / verify-download`
- **量化**: FP8/INT4 混合精度，降低推理门槛
- **HuggingFace**: `meta-llama/Llama-3.1-*` 系列权重可直接用 transformers 加载
- **Llama Stack**: 配套工具链用于构建应用

## License

Meta Acceptable Use Policy（非传统开源许可证），商业使用需申请并遵守使用政策。

## Related

[[ai-game-devtools/llama-3]] — Llama 3 前代（8K context，8B/70B）
[[ai-game-devtools/gemma]] — Google 轻量级开源 LLM 对比
[[ai-game-devtools/gpt4all]] — 本地 LLM 运行平台，llama.cpp 后端
