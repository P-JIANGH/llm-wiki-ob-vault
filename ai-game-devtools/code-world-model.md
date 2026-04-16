---
title: Code World Model (CWM)
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [llm, code-generation, reasoning, reinforcement-learning, tool, python, open-source]
sources: [raw/articles/ai-game-devtools/code-world-model.md]
---

# Code World Model (CWM)

## Overview

Code World Model (CWM) is a 32B dense decoder-only autoregressive LLM by **Meta FAIR CodeGen Team**, trained to represent and reason about how code and commands affect the state of a program or system. Mid-trained on Python execution traces and agentic interaction trajectories, then post-trained with multi-task RL.

## Key Facts

| | |
|---|---|
| **Developer** | Meta FAIR CodeGen Team |
| **Parameters** | 32B (dense) |
| **Architecture** | 64 transformer blocks, alternating local/global attention (3:1 ratio), GQA |
| **Context** | 131K tokens (global window 131,072; local window 8,192) |
| **Vocabulary** | 128K tokens |
| **License** | Code: BSD-3; Weights: Custom non-commercial research license |
| **GPU** | 80GB VRAM single GPU (quantized); 160GB (2× H100) for evals |

## Architecture

- **Dense** decoder-only transformer (not MoE)
- **Alternating attention**: 3 local (8,192 window) + 1 global (131,072 window) blocks
- **Grouped-Query Attention (GQA)**
- **Tokenizer**: 128K vocabulary

## Training Pipeline (4 stages)

1. **Pre-training**: 8T tokens @ 8,192 ctx — code + English web + STEM
2. **Mid-training**: 5T tokens @ 131,072 ctx — code world modeling (200M+ Python memory traces, 30K+ Docker repos, 3M agentic trajectories)
3. **SFT**: Reasoning + instruction following
4. **RL**: Multi-task multi-turn verifiable RL (coding, math, software engineering)

## Benchmark Performance

| Benchmark | CWM | Qwen3-32B | gpt-oss-20B |
|---|---|---|---|
| LiveCodeBench v5 | 68.6 | 65.7 | 66.9 |
| LiveCodeBench v6 | 63.5 | 61.9 | 62.0 |
| Math-500 | 96.6 | 97.2 | -- |
| AIME 2024 | 76.0 | 81.4 | 80.0 |
| AIME 2025 | 68.2 | 72.9 | 72.1 |

| Benchmark | CWM | CWM + tts | Qwen3-Coder-32B |
|---|---|---|---|
| SWE-bench Verified | 53.9 | 65.8 | 51.6 |

CWM + test-time scaling (tts) achieves **65.8 on SWE-bench Verified**, leading 32B-class models.

## Usage

- **HuggingFace**: `facebook/cwm` (instruction-tuned), `facebook/cwm-sft`, `facebook/cwm-pretrain`
- **Inference**: vLLM or Fastgen server
- **System prompt**: Required — uses <think>/</think> reasoning format
- **Agentic mode**: Append tool specifications to system prompt

## Key Source Modules

- `cwm/exec/` — Docker-based code execution sandbox
- `cwm/rl/swerl/` — SWE-RL tools, backends, evaluation
- `cwm/rl/envs/` — RL environments with rewards and code utils
- `cwm/fastgen/` — Fastgen high-throughput inference server
- `cwm/model/` — Model architecture
- `serve/` — Model serving implementation
- `evals/` — Benchmark evaluation scripts
- `demos/` — Neural debugger demos

## Differences from Peers

- vs [[ai-game-devtools/codegeex4]]: CWM focuses on code *world modeling* (reasoning about code execution state), while CodeGeeX 4 is a code completion/generation model without execution-aware training. CWM uses dense 32B vs CodeGeeX 4's 9B GLM-4 base.
- vs [[ai-game-devtools/deepseek-r1]]: Both use RL for reasoning capabilities, but CWM's RL is multi-task (coding + math + software engineering) with execution-trace grounding, while DeepSeek-R1 focuses on pure RL reasoning emergence in general domains.
- vs [[ai-game-devtools/gpt-oss]]: Both are Meta/OpenAI open-weights code models with tool use, but CWM is dense 32B while gpt-oss is MoE (20B/120B). CWM's unique value is its execution-trace mid-training on 200M+ Python memory traces.

## Links

- **GitHub**: https://github.com/facebookresearch/cwm
- **HuggingFace**: https://huggingface.co/facebook/cwm
- **Tech Report**: https://ai.meta.com/research/publications/cwm/
- **Model Card**: MODEL_CARD.md in repo
