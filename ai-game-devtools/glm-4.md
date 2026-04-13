---
title: GLM-4
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [llm, model, reasoning, agent, open-source, chinese-llm]
sources: [raw/articles/ai-game-devtools/glm-4.md]
---

# GLM-4

## Overview

THUDM (Tsinghua University & Zhipu AI) open-source LLM family. Latest GLM-4-0414 series (April 2025) introduced 32B reasoning models competitive with GPT-4o and DeepSeek-V3. [[GLM-4-32B-0414]] achieves top scores on IFEval (87.6), BFCL (69.6), and SimpleQA (88.1) among open-source models.

## Key Models

### GLM-4-0414 Series (2025-04)

| Model | Params | Type | Context | Strength |
|-------|--------|------|---------|----------|
| GLM-4-9B-0414 | 9B | Chat | 32K→128K | Lightweight batch (translation) |
| GLM-Z1-9B-0414 | 9B | Reasoning | 32K→128K | Top open-source 9B reasoning |
| GLM-4-32B-Base-0414 | 32B | Base | 32K→128K | 15T tokens pre-trained |
| GLM-4-32B-0414 | 32B | Chat | 32K→128K | Agent-optimized, function calling |
| GLM-Z1-32B-0414 | 32B | Reasoning | 32K→128K | Deep thinking, math/code/推理 |
| GLM-Z1-Rumination-32B-0414 | 32B | Research | 128K | OpenAI Deep Research competitor, search-augmented RL |

### GLM-4-9B Series (2024-06, legacy)

[[GLM-4-9B]] base and chat variants including 1M context model (GLM-4-9B-Chat-1M) and vision model (GLM-4V-9B).

## Architecture & Training

- **Pre-training**: 15T high-quality tokens including reasoning-type synthetic data (32B base)
- **Post-training**: Human preference alignment → rejection sampling → RL (code/instruction/function calling)
- **YaRN**: Long context extrapolation beyond native 32K for 128K capability
- **Function Calling**: BFCL-v3 69.6 (tied with GPT-4o), TAU-Bench Retail 68.7 (exceeds GPT-4o 62.8)
- **SWE-bench Verified**: 33.8% (Moatless), competitive with GPT-4o-class on software engineering tasks

## Framework Support

| Framework | Status |
|-----------|--------|
| vLLM | Official merged (2025) |
| HuggingFace Transformers | Official merged |
| llama.cpp | GGML format (Apr 2025) |
| DeepSpeed | Fine-tuning support |
| Axolt | Community inference |

## Game Dev Relevance

- **Code Generation**: SWE-bench Verified 33.8% — directly applicable to game script/AI behavior generation
- **Function Calling**: [[BFCL-v3]] 69.6% — enables structured API calls for game engine integration
- **Reasoning Models**: GLM-Z1 series for NPC dialogue, procedural content generation, game AI decision trees
- **Long Context**: 128K supports game design document analysis and multi-file code generation

## Related

- [[baichuan-7b]] — Another Chinese LLM family
- [[qwen2]] — Another open-source Chinese LLM competitor
- [[deepseek-r1]] — DeepSeek reasoning model (MoE, 671B)
- [[gemma]] — Google's open LLM family
