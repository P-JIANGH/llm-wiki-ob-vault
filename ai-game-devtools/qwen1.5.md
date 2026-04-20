---
title: Qwen1.5
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, open-source, multimodal, game-dev]
sources: [raw/articles/ai-game-devtools/qwen1.5.md]
---

# Qwen1.5

## Overview

Qwen (通义千问) is Alibaba DAMO Academy's open-source LLM series spanning Qwen1.5 → Qwen2 → Qwen2.5 → Qwen3. The QwenLM/Qwen1.5 GitHub repository serves as the main hub for all numbered Qwen releases. The series covers dense and MoE (Mixture-of-Experts) models from 0.6B to 235B parameters, with strong multilingual (100+ languages), reasoning, code generation, and agent capabilities.

> [!Note]
> Despite the repo name "Qwen1.5", this repo now covers Qwen1.5, Qwen2, Qwen2.5, and Qwen3. For gaming applications, Qwen2.5 and Qwen3 are the most relevant due to improved instruction following, tool use, and agent capabilities.

## Key Facts

| Attribute | Detail |
|---|---|
| **Organization** | Alibaba DAMO Academy / QwenLM |
| **License** | Apache 2.0 (Qwen3); Qingzhen (Qwen1.5-Qwen2.5, free with registration) |
| **Sizes** | 0.6B, 1.7B, 3B, 4B, 7B, 8B, 14B, 32B, 72B, MoE variants |
| **MoE Sizes** | Qwen1.5-MoE-A2.7B, Qwen3-30B-A3B, Qwen3-235B-A22B |
| **Context Length** | 32K (Qwen1.5) → 128K (Qwen2+) → 256K-1M (Qwen3-2507) |
| **Languages** | 100+ |
| **Release** | 2024.02 (Qwen1.5), ongoing updates through Qwen3 |

## Model Series Evolution

### Qwen1.5 (2024.02)
- First numbered release
- Sizes: 0.5B, 1.8B, 7B, 14B, 32B, 72B + Chat
- RoPE position encoding, SwiGLU activation, Attention Sink
- 32K context

### Qwen2 (2024.06)
- Added 3B, 14B, 32B sizes
- GQA (Grouped Query Attention) for larger models
- Up to 128K context

### Qwen2.5 (2024.09)
- Improved instruction following and reasoning
- Stronger tool use and agent capabilities
- CodeQwen1.5 specialized code model

### Qwen3 (2025.04)
- **Thinking/non-thinking mode switch** — seamless toggle for complex reasoning vs efficient chat
- MoE models: 30B-A3B (激活 3B), 235B-A22B (激活 22B)
- 256K-1M token context
- SOTA open-weight thinking model (AIME 97.8% for 235B-A22B)
- 100+ languages

### Qwen3-2507 (2025.08)
- Ultra-long context up to **1 million tokens**
- Updated instruct and thinking variants
- Enhanced reasoning depth (Qwen3-Thinking-2507)

## Architecture Highlights

- **Dense models**: Standard Transformer with RoPE, SwiGLU
- **MoE models**: Mixture-of-Experts with sparse activation
- **Attention**: Full attention (small models) → GQA (large models)
- **Position Encoding**: RoPE (Rotary Position Embedding)
- **Training**: Next-token prediction pre-training, SFT + RLHF fine-tuning

## Game Dev Relevance

- **NPC dialogue generation** — Qwen's strong multilingual chat makes it suitable for game NPC scripts
- **Quest/story generation** — Long context (256K-1M) enables multi-chapter narrative
- **Code generation for game scripts** — CodeQwen variants for generating Lua/Python game logic
- **Agent-based game AI** — Tool use and function calling enable NPC tool usage in game scenarios
- **Local inference** — Smaller models (0.6B-4B) run locally on consumer GPUs for indie game prototyping

## Deployment for Game Integration

| Framework | Use Case | Notes |
|---|---|---|
| **[[llm-unity-integration]]** | Unity game engine | See LLMUnity, ChatGPT-API-Unity |
| **Ollama** | Local indie dev | Easiest local deployment |
| **vLLM / SGLang** | Server-side game backend | High-throughput serving |
| **llama.cpp (GGUF)** | Embedded/mobile game | CPU inference with quantization |
| **[[text-generation-webui]]** | Rapid prototyping | Web UI for prompt testing |
| **[[meta-gpt]]** | Game code generation agent | Multi-agent game dev pipeline |

## Related Models in Wiki

- [[qwen-vl]] — Qwen Vision-Language Model (multimodal with images)
- [[qwen2]] — Qwen2 series (successor)
- [[qwen3]] — Qwen3 series (latest generation)
- [[qwen2.5-coder]] — Specialized code model
- [[chatdev]] — Multi-agent dev platform compatible with Qwen
- [[metagpt]] — Software agent framework that can use Qwen

## Links

- **GitHub**: https://github.com/QwenLM/Qwen1.5
- **HuggingFace**: https://huggingface.co/Qwen
- **ModelScope**: https://modelscope.cn/organization/qwen
- **Documentation**: https://qwen.readthedocs.io/
- **Paper**: https://arxiv.org/abs/2505.09388 (Qwen3)
- **Blog**: https://qwenlm.github.io/blog/qwen3/
