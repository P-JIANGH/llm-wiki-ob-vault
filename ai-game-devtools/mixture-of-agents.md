---
title: Mixture-of-Agents (MoA)
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [llm, ai-model, open-source, framework, architecture]
sources: [raw/articles/ai-game-devtools/mixture-of-agents.md]
---

# Mixture-of-Agents (MoA)

**GitHub:** https://github.com/togethercomputer/MoA
**Paper:** [arXiv:2406.04692](https://arxiv.org/abs/2406.04692)
**License:** Apache 2.0
**Authors:** Junlin Wang, Jue Wang, Ben Athiwaratkun, Ce Zhang, James Zou
**Organization:** Together AI + academic collaborators

## Overview

Mixture of Agents (MoA) is a layered multi-LLM architecture that aggregates responses from multiple open-source models to achieve state-of-the-art performance — surpassing GPT-4 Omni on AlpacaEval 2.0 (65.1% vs 57.5%) using only open-source models.

## Architecture

MoA employs a **multi-layer aggregation pipeline**:

1. **Reference Layer**: N reference LLMs independently generate responses in parallel (asyncio.gather)
2. **Refinement Layers** (optional): Each reference model re-processes, receiving prior layer responses as context for iterative improvement
3. **Aggregator Layer**: A single aggregator model synthesizes all responses into a final high-quality output

### Core Design
- **Parallel Execution**: Uses `asyncio.gather()` for concurrent LLM API calls
- **Iterative Refinement**: Each layer feeds previous responses into the system prompt
- **Critical Synthesis**: Aggregator system prompt explicitly instructs to evaluate, not just replicate

### Implementation
- **moa.py** — 50-line core implementation (2 layers, 4 reference models)
- **advanced-moa.py** — Multi-layer (3+) example with configurable depth
- **bot.py** — Interactive CLI demo (Typer + Rich + datasets), supports multi-turn conversation
- **Evaluation scripts** — Reproduce AlpacaEval 2.0, MT-Bench, and FLASK results

### Reference Models
Default configuration uses: Llama-3.3-70B, Qwen2.5-72B, Qwen2.5-Coder-32B, WizardLM-2-8x22B
Aggregator: Qwen2.5-72B-Instruct-Turbo or DeepSeek-V3

## Results

| Benchmark | MoA Score | GPT-4 Omni | Improvement |
|-----------|-----------|------------|-------------|
| AlpacaEval 2.0 | 65.1% | 57.5% | +7.6% |
| MT-Bench | Top 1 | — | — |
| FLASK | Outperforms Qwen1.5-110B-Chat on 8/8 dimensions | Outperforms on 5/10 dimensions | — |

## Key Features
- **No training required**: Pure inference-time aggregation
- **Modular**: Swap in any model available via Together API
- **Parallel**: Concurrent LLM calls for low latency
- **Configurable**: Control layers, temperature, max_tokens, reference models
- **Multi-turn**: Supports conversational context building

## Related Projects
- [[ai-game-devtools/qwen2]] — Qwen2.5 used as primary aggregator model
- [[ai-game-devtools/llama-3-1]] — Llama 3.3 used as reference model
- [[ai-game-devtools/dbrx]] — DBRX used as reference model in original demo
- [[multi-agent-ai-simulation]] — Multi-agent AI concepts (memory/task/perception/decision)
