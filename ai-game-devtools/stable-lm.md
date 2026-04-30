---
title: StableLM
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, model, open-source, stability-ai]
sources: [raw/articles/ai-game-devtools/stable-lm.md]
---

# StableLM

Stability AI's open-source decoder-only transformer language model series. Covers base models (3B/7B), instruction-tuned variants (StableLM-Alpha, StableLM-Tuned-Alpha), and StableVicuna (RLHF fine-tune of Vicuna-13B). All models are available on HuggingFace.

## Models

### StableLM-3B-4E1T
Released September 2023. 2.8B parameters trained on 4T tokens (1T unique × 4 epochs via multi-epoch regime). Achieved SOTA at 3B parameter scale, competitive with 7B models. Architecture: 32 layers, 32 heads, hidden size 2560, RoPE (25%), LayerNorm with bias, SwiGLU, GPT-NeoX tokenizer. License: CC BY-SA-4.0.

### StableLM-Alpha v2
Released August 2023. 3B and 7B variants trained on 1.1T tokens with SwiGLU + higher quality RefinedWeb/C4 data. Multi-stage context extension: 2K → 4K tokens via curriculum learning. 4096 context length.

### StableLM-Alpha
Original release April 2023. 3B (3.6B params) and 7B (7.9B params) trained on 800B tokens from The Pile (1.5T token dataset). Tuned variants via Stanford Alpaca procedure. License: CC BY-SA-4.0 (base), CC BY-NC-SA-4.0 (tuned).

### StableVicuna-13B
RLHF fine-tune of Vicuna-13B v0 (itself from LLaMA-13B). CarperAI team. Delta weights under CC BY-NC-SA-4.0 due to LLaMA non-commercial license.

## Architecture

Decoder-only transformer following LLaMA design with modifications:
- **RoPE** position embeddings applied to first 25% of head embedding dimensions (improved throughput)
- **LayerNorm** with learned bias terms (not RMSNorm)
- **SwiGLU** activation (StableLM-Alpha v2)
- **No weight tying** between input/output embeddings
- **GPT-NeoX** tokenizer

## Training Details

- StableLM-3B-4E1T: lr=3.2e-4, min_lr=1.28e-5, Adam optimizer, bs=4M, ~955K iters
- Multi-stage training for v2: 1T tokens at 2K context → 100B tokens at 4K context
- Sequence length warmup helped stabilize first ~80B tokens (later dropped due to throughput penalty)

## Evaluation

StableLM-3B-4E1T (66.93 average) outperforms its 7B predecessor StableLM-Base-Alpha-v2 (66.89) and is competitive with LLaMA-2-7B (68.75). Code available via lm-evaluation-harness.

## License

- Base checkpoints: **CC BY-SA-4.0**
- Tuned checkpoints: **CC BY-NC-SA-4.0**
- All code: **Apache 2.0**

## Related

- [[llama-3]] — Meta's Llama 3 LLM series (8B/70B)
- [[olmo]] — AI2's open LLM series (1B-32B), also fully open weights
- [[dbrx]] — Databricks MoE LLM (132B/36B active)
- [[gpt4all]] — Nomic's local LLM platform with llama.cpp backend
- [[corenet]] — Apple's neural network training library for foundation models
