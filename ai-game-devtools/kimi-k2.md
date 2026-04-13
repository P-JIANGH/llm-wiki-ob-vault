---
title: Kimi K2
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, moe, agent, reasoning, tool-use, open-source]
sources: [raw/articles/ai-game-devtools/kimi-k2.md]
---

# Kimi K2

## Overview

Kimi K2 是 Moonshot AI（Kimikimi 月之暗面）发布的最新一代稀疏混合专家（MoE）大语言模型，总参数 1 万亿，激活参数 320 亿。专为 Agent 能力优化，在代码生成、工具调用和数学推理任务上达到开源 SOTA。

## Key Facts

| | |
|---|---|
| **发布** | 2025年7月 |
| **总参数** | 1T |
| **激活参数** | 32B |
| **专家数** | 384 |
| **每 Token 选专家数** | 8 |
| **Context Length** | 128K |
| **注意力机制** | MLA |
| **激活函数** | SwiGLU |
| **训练数据** | 15.5T tokens |
| **License** | Modified MIT |
| **技术报告** | arXiv:2507.20534 |

## Model Variants

- **Kimi-K2-Base**：基座模型，适合研究者和需要完全控制微调的用户
- **Kimi-K2-Instruct**：指令微调模型，属于 reflex-grade 模型（无长思维链），开箱即用的 Agent 场景

## Architecture

Kimi K2 采用标准 MoE 架构：
- 61 层（含 1 个 Dense Layer）
- Attention Hidden Dimension: 7168
- MoE Hidden Dimension（每专家）: 2048
- Attention Heads: 64
- 共享专家: 1
- 词表大小: 160K

核心技术亮点是 **MuonClip Optimizer**——将 Muon 优化器首次应用到超大规模（1T 参数），并开发了配套的稳定性技术解决训练不稳定问题。

## Benchmark Performance

Kimi K2 在多个任务上达到开源 SOTA：

| Benchmark | Metric | Kimi K2 | DeepSeek-V3 | Qwen3-235B |
|-----------|--------|---------|-------------|------------|
| SWE-bench (Agentic Coding) | Single Patch | **65.8%** | 38.8% | 34.4% |
| LiveCodeBench v6 | Pass@1 | **53.7%** | 46.9% | 37.0% |
| TerminalBench (Inhouse) | Acc | **30.0%** | — | — |
| Tau2 retail | Avg@4 | **70.6%** | 69.1% | 57.0 |
| AIME 2024 | Avg@64 | **69.6%** | 59.4% | 40.1% |
| MATH-500 | Acc | **97.4%** | 94.0% | 91.2% |
| GPQA-Diamond | Avg@8 | **75.1%** | 68.4% | 62.9% |

## Agentic Capability

Kimi K2 重点优化了 Agent 能力：

- **SWE-bench Agentic Coding**：单次尝试 65.8%（开源 SOTA），多次尝试 71.6%
- **SWE-bench Multilingual**：47.3% 单次尝试，开源领先
- **TerminalBench**：终端操作任务开源 SOTA
- **Tool Use**：AceBench 76.5%（仅次于 GPT-4.1 的 80.1%）

## 技术创新

1. **MuonClip Optimizer**：Muon 优化器在大规模训练中的首次成功应用，配合梯度稳定性技术
2. **零训练不稳定**：15.5T tokens 预训练全程无训练崩溃
3. **Reflex-grade Agent**：Kimi-K2-Instruct 采用 reflex 级响应（无长思考），适合低延迟 Agent 场景

## Related

- [[deepseek-r1]] — DeepSeek 推理模型，同为开源前沿 MoE LLM，R1 在纯 RL 推理有创新，K2 在 Agent 任务上领先
- [[deepseek-v3]] — DeepSeek-V3，K2 的主要对标竞品，同为 1T 参数级 MoE 模型
- [[corenet]] — Apple 神经网络训练库，K2 使用 MuonClip 等先进优化技术
- [[aios]] — AI Agent 操作系统，与 K2 的 Agentic 优化方向高度相关
- [Kimi K2 Tech Blog](https://moonshotai.github.io/Kimi-K2/) | [arXiv](https://www.arxiv.org/abs/2507.20534) | [HuggingFace](https://huggingface.co/moonshotai) | [Discord](https://discord.gg/TYU2fdJykW)
