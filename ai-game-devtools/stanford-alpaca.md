---
title: Stanford Alpaca
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, ai-model, tool, fine-tuning, instruction-following, open-source]
sources: [raw/articles/ai-game-devtools/stanford-alpaca.md]
---

# Stanford Alpaca

An instruction-following LLaMA model fine-tuned on 52K synthetic instruction-following examples generated via [Self-Instruct](https://github.com/yizhongw/self-instruct) methodology with `text-davinci-003`.

## Overview

Stanford Alpaca (released March 2023 by Stanford CRFM) demonstrated that fine-tuning LLaMA on GPT-3.5-generated instruction data could produce a model competitive with `text-davinci-003` on the Self-Instruct evaluation suite. It was one of the first open instruction-following models based on LLaMA, and sparked the broader "Alpaca ecosystem" of open instruction models.

## Key Facts

| Attribute | Detail |
|-----------|--------|
| Base model | LLaMA-7B / LLaMA-13B (Meta) |
| Training data | 52K instruction-following examples |
| Data generation cost | < $500 (via `text-davinci-003` batch API) |
| Method | Standard causal LM supervised fine-tuning (SFT) |
| Max sequence length | 512 tokens |
| Training framework | Hugging Face Transformers + PyTorch FSDP |
| License | Apache 2.0 (code), CC BY-NC 4.0 (data & weights) |
| Use restriction | Research only, non-commercial |

## Architecture

**Base:** [LLaMA](https://arxiv.org/abs/2302.13971) (7B/13B) from Meta, converted to HuggingFace format.

**Fine-tuning:** Standard next-token prediction SFT on `alpaca_data.json`. Uses FSDP `full_shard` for distributed training across 4x A100 80GB GPUs. Supports DeepSpeed Stage 3 and LoRA for memory reduction.

**Data generation pipeline** (from `generate_instruction.py`):
1. Start with 252 human-written seed tasks (`seed_tasks.jsonl`)
2. Sample 3 seed tasks → format as prompt → call `text-davinci-003` with batch generation (20 instructions/batch)
3. Post-process: parse output, filter by length (3–150 words), blacklist multimedia keywords, ROUGE-L dedup (threshold 0.7)
4. Repeat until 52K unique instructions collected

**Training prompt format:**
```
### Instruction:
{instruction}

### Input:
{input}

### Response:
{output}
```

## Training Hyperparameters

| | LLaMA-7B | LLaMA-13B |
|---|---|---|
| Learning rate | 2e-5 | 1e-5 |
| Epochs | 3 | 5 |
| Effective batch size | 128 | 128 |
| Max length | 512 | 512 |
| Weight decay | 0 | 0 |
| LR schedule | cosine | cosine |

## What Was Released

| Component | Status |
|-----------|--------|
| 52K training dataset (`alpaca_data.json`) | ✅ Released (CC BY-NC 4.0) |
| Data generation code | ✅ Released (Apache 2.0) |
| Training script (`train.py`) | ✅ Released (Apache 2.0) |
| Weight diff (Alpaca-7B − LLaMA-7B) | ✅ Released on HuggingFace (CC BY-NC 4.0) |
| Full model weights | ❌ Not directly released (LLaMA terms); recovered via weight diff |

## Historical Significance

Stanford Alpaca was a pivotal project in the open LLM ecosystem:

- **First demonstration** that GPT-3.5-class instruction following could be achieved with LLaMA + SFT + synthetic data
- **Sparked derivatives**: Vicuna, Guanaco, Koala, Alpaca-LoRA, and many others built on this work
- **Inspired the LoRA craze**: The low-cost fine-tuning approach (combined with later LoRA research) made model customization accessible
- **Safety lessons**: The demo was suspended after community发现了 concerning behaviors, highlighting the gap between capability and safety alignment

## Relationship to Related Tools

Stanford Alpaca is closely related to:
- [[chinese-llama-alpaca-3]] — Chinese-focused LLaMA + Alpaca methodology
- [[llama-3]] — Meta's own instruction-tuned successor to LLaMA 2
- [[llama2-webui]] — Web UI for running various Llama-based models
- [[baichuan-7b]] — Another open Chinese LLM (similar fine-tuning approach)

The Self-Instruct data generation methodology was also adopted/adapted by many subsequent instruction-tuning projects.

## Limitations & Safety

- **Not aligned for safety** — no RLHF or safety fine-tuning was applied
- **Non-commercial license** — data and weights are CC BY-NC 4.0
- **No red team evaluation** before release — demo suspended after community feedback
- **Knowledge cutoff** — same as underlying LLaMA model

## References

- [Stanford Alpaca Blog](https://crfm.stanford.edu/2023/03/13/alpaca.html)
- [GitHub Repo](https://github.com/tatsu-lab/stanford_alpaca)
- [Alpaca-7B Weight Diff (HuggingFace)](https://huggingface.co/tatsu-lab/alpaca-7b-wdiff)
- [Self-Instruct Paper](https://arxiv.org/abs/2212.10560)
- [LLaMA Paper](https://arxiv.org/abs/2302.13971)
