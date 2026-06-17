---
title: LongCat-Flash
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, model, moe, agent, open-source]
sources: [raw/articles/ai-game-devtools/longcat-flash.md]
---

# LongCat-Flash

**Organization:** Meituan LongCat Team  
**License:** MIT  
**URL:** https://github.com/meituan-longcat/LongCat-Flash-Chat

## Overview
LongCat-Flash is a 560B parameter `Mixture-of-Experts (MoE)` language model with dynamic computation — activating 18.6B~31.3B parameters per token (averaging ~27B) based on context. The released **LongCat-Flash-Chat** is a non-thinking foundation model optimized for agentic tasks, supporting 128K context length and achieving competitive performance against DeepSeek V3.1 and Kimi K2.

## Architecture

- **Type:** MoE with Shortcut-connected MoE (ScMoE)
- **Total Parameters:** 560B
- **Activated Parameters:** 18.6B~31.3B (avg ~27B)
- **Context:** 128K tokens
- **Framework:** Hugging Face Transformers

Key innovations:
- **Zero-computation experts** — allocates computation budget based on token importance
- **ScMoE** — expands computation-communication overlap window for >100 TPS throughput
- **PID-controller expert bias** — maintains consistent per-token activation
- **Hyperparameter transfer** — predicts optimal configs from smaller proxy models
- **Deterministic computation** — exact reproducibility + SDC detection

## Performance

LongCat-Flash achieves strong results across benchmarks:

| Benchmark | Score | Notes |
|-----------|-------|-------|
| IFEval | **89.65** | Instruction following, highest among peers |
| τ²-Bench telecom | **73.68** | Agentic tool use — significantly ahead |
| ArenaHard-V2 | **86.50** | General reasoning |
| COLLIE | **57.10** | Instruction following |
| Safety (Criminal) | **91.24** | Safety benchmark |

Key differentiator: **Agentic task performance** — τ²-Bench telecom 73.68 (vs 38.50 DeepSeek, 67.50 Kimi K2).

## Chat Template

Multi-turn format:
```
[Round 0] USER:{query} ASSISTANT:
```

Tool calls wrapped in `<longcat_tool_call>` XML tags.

## Deployment

Adapted for SGLang and vLLM inference backends.

## Relationships

- Competitor to [[DeepSeek-V3]] (MoE architecture, 671B total)
- Related to `Kimi K2` (MoE, 1T total params, agentic focus)
- Similar agent optimization approach as [[ChatDev]] multi-agent framework
- MoE technique compared to [[DBRX]] (Databricks MoE)

## See Also

- [[cosmos]] — NVIDIA world model platform
- `ai-game-devtools/deepseek-r3` — DeepSeek reasoning model
