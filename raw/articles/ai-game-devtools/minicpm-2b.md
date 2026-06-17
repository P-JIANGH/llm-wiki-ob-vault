# MiniCPM-2B — AI Game DevTools Source

**Source:** https://github.com/OpenBMB/MiniCPM
**Ingested:** 2026-04-14
**License:** Uses Llama2 license terms for base model; BMAB and Yorko licenses for derivatives

---

## Overview

MiniCPM-2B is an efficient large language model (2B parameters) developed by [[openbmb]] (Beijing Academy of Artificial Intelligence & ModelBest). It was released in February 2024 and achieves performance comparable to Mistral-7B on public benchmarks, with better Chinese, math, and code abilities. It outperforms Llama2-13B, MPT-30B, and Falcon-40B.

The MiniCPM family has evolved significantly:
- **MiniCPM-2B** (Feb 2024) — original 2B dense model
- **MiniCPM-3-4B** (Sep 2024) — outperforms Phi-3.5-mini-instruct and GPT-3.5-Turbo
- **MiniCPM-S-1B** (Jul 2024) — 87.89% sparsity in FFN, 84% FLOPs reduction
- **MiniCPM4-8B/0.5B** (Jun 2025) — 5x generation acceleration on edge chips
- **MiniCPM4.1-8B** (Sep 2025) — hybrid reasoning model with trainable sparse attention
- **MiniCPM-SALA** (Feb 2026) — hybrid sparse+linear attention for 1M-token context

---

## Architecture & Key Technical Components

### Model Architecture
- **Dense Transformer** (MiniCPM-2B) — vanilla attention, 2B params
- **MiniCPM4** — trainable sparse attention via InfLLM-V2 mechanism; each token computes relevance with <5% of tokens in 128K long-text processing
- **MiniCPM-SALA** — 25% InfLLM-V2 (sparse) + 75% Lightning Attention (linear), enabling 1M token context on RTX 5090

### Inference Frameworks
- **HuggingFace Transformers** — standard dense and sparse inference
- **vLLM** — with speculative decoding (EAGLE3-compatible MiniCPM4.1)
- **SGLang** — with speculative decoding support
- **CPM.cu** — custom CUDA inference framework integrating sparse attention + quantization + speculative sampling
- **llama.cpp / Ollama** — CPU/edge inference

### Quantization
- **BitCPM4** — ternary quantization (1-bit/2-bit weights), 90% bit-width reduction
- **GGUF, GPTQ, AWQ, Marlin, MLX** formats supported

### Training Innovations
- **Model Wind Tunnel 2.0** — efficient predictable scaling for downstream tasks
- **UltraClean / UltraFinweb** — high-quality pre-training data filtering
- **UltraChat v2** — large-scale SFT datasets
- **FP8 low-precision training** + Multi-token Prediction

---

## Sub-projects

| Directory | Purpose |
|-----------|---------|
| `demo/` | Inference demos |
| `docs/` | Documentation |
| `finetune/` | Fine-tuning scripts |
| `minicpm_sala/` | MiniCPM-SALA model code |
| `quantize/` | Quantization tools |

---

## Game Development Relevance

MiniCPM's small footprint (2B) and efficient inference make it suitable for:
- **NPC dialogue systems** — run locally on edge devices
- **Game AI scripting** — natural language to game logic
- **Procedural content generation** — text-based PCG with LLMs
- **Unity integration** — via [[LLMUnity]] or direct HuggingFace transformers

The 2026 MiniCPM-SALA model (9B params, 1M context) could enable games with full-codebase context awareness or ultra-long narrative memory.

---

## Related Tools in Wiki

- [[metagpt]] — multi-agent framework (same org OpenBMB)
- [[llmunity]] — Unity integration for LLMs
- [[gemma]] — Google's small efficient model
- [[qwen2]] — Alibaba's capable model family
- [[internlm]] — another large Chinese LLM

---

## Links

- GitHub: https://github.com/OpenBMB/MiniCPM
- HuggingFace: https://huggingface.co/openbmb/MiniCPM-2B-sft-bf16
- ModelScope: https://modelscope.cn/models/OpenBMB/miniCPM-bf16
- Paper: https://arxiv.org/pdf/2506.07900
- MiniCPM-V (VLM): https://github.com/OpenBMB/MiniCPM-V
