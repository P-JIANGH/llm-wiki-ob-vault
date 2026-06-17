---
title: DeepSeek-R1
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [llm, reasoning, reinforcement-learning, moe, distillation, open-source]
sources: [raw/articles/ai-game-devtools/deepseek-r1.md]
---

# DeepSeek-R1

## Overview

DeepSeek-R1 是 DeepSeekAI 发布的第一代推理模型系列，包括 DeepSeek-R1-Zero（纯 RL 无 SFT）和 DeepSeek-R1（冷启动 + RL）。基于 DeepSeek-V3-Base 的 MoE 架构（671B 总参，37B 激活），在数学、代码和推理任务上性能与 OpenAI-o1 持平。

同时开源了 6 个基于 Qwen/Llama 蒸馏的小模型，其中 **DeepSeek-R1-Distill-Qwen-32B 在 AIME 2024 上达到 72.6，超越 OpenAI-o1-mini（63.6）**。

## Key Facts

| | |
|---|---|
| **发布** | 2025年1月 |
| **架构** | MoE (671B total / 37B activated) |
| **Context** | 128K |
| **License** | MIT (商业可用，支持蒸馏) |
| **基座** | DeepSeek-V3-Base |
| **论文** | arXiv:2501.12948 |

## Core Innovation: Pure RL without SFT

DeepSeek-R1-Zero 首次验证了推理能力可以通过**纯 RL 激励**产生，无需 SFT 作为前置步骤。模型自然涌现出 self-verification、reflection、long CoT 等能力。但存在无限重复和语言混合问题。

DeepSeek-R1 在 RL 前引入冷启动数据，采用 2 RL + 2 SFT 的 pipeline 解决上述问题。

## Benchmark Performance

DeepSeek-R1 在多个任务上超越 OpenAI o1-mini：

| Task | o1-mini | DeepSeek R1 |
|------|---------|-------------|
| AIME 2024 | 63.6 | **79.8** |
| MATH-500 | 90.0 | **97.3** |
| LiveCodeBench | 53.8 | **65.9** |
| C-Eval | 68.9 | **91.8** |
| ArenaHard | 92.0 | **92.3** |

## Distilled Models

DeepSeek-R1-Distill 系列（1.5B~70B）可用 vLLM/SGLang 部署，与普通 Qwen/Llama 使用方式相同：

```bash
vllm serve deepseek-ai/DeepSeek-R1-Distill-Qwen-32B --tensor-parallel-size 2 --max-model-len 32768
```

## Related Links

- [[llm-integration]] — DeepSeek 作为 LLM Provider 的接入方式（deepseek-chat）
- [[autoresearch]] — Karpathy 的 LLM 研究框架，同为推理能力研究方向
- [[aios]] — AI Agent 操作系统，内置 DeepSeek 支持
- [HuggingFace](https://huggingface.co/deepseek-ai) | [Chat](https://chat.deepseek.com) | [API](https://platform.deepseek.com/)
