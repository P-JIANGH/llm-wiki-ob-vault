# StableLM — Stability AI Language Models

**Source:** https://github.com/Stability-AI/StableLM
**Cloned:** 2026-04-14
**License:** CC BY-SA-4.0 (base) / CC BY-NC-SA-4.0 (tuned) / Apache 2.0 (code)

## Overview

Stability AI's ongoing development of the StableLM series of decoder-only transformer language models. The project includes base models, instruction-tuned models, and StableVicuna (RLHF fine-tune of Vicuna-13B).

## Models Available

### StableLM-3B-4E1T (September 2023)
- **Parameters:** 2.8B (2,795,443,200)
- **Training Tokens:** 4T (multi-epoch regime, 1T unique × 4 epochs)
- **Architecture:** Decoder-only transformer (LLaMA-like), 32 layers, 32 heads, hidden size 2560
- **Position Embeddings:** RoPE applied to first 25% of head embedding dimensions
- **Normalization:** LayerNorm with learned bias (not RMSNorm)
- **Tokenizer:** GPT-NeoX
- **Sequence Length:** 4096
- **Training Data:** Falcon RefinedWeb, RedPajama-Data, The Pile (without Books3), StarCoder
- **License:** CC BY-SA-4.0
- **SOTA at 3B scale** (September 2023), competitive with popular 7B models

### StableLM-Alpha v2 (August 2023)
- **3B:** 2,796,431,360 params, 1.1T tokens
- **7B:** 6,890,209,280 params, 1.1T tokens
- **Architecture improvements:** SwiGLU activation, higher quality data
- **Multi-stage context extension:** 2K → 4K context length via curriculum learning
- **Training Data:** RefinedWeb + C4 (replacing Pile v2 CC scrape), 71% web text sampling
- **Context:** 4096 tokens

### StableLM-Alpha (April 2023)
- **3B:** 3,638,525,952 params, 800B tokens
- **7B:** 7,869,358,080 params, 800B tokens
- **Dataset:** The Pile (1.5T tokens, ~3× original Pile size)
- **Fine-tuned versions:** StableLM-Tuned-Alpha (Stanford Alpaca procedure)
- **Context:** 4096 tokens

### StableVicuna-13B
- **Type:** RLHF fine-tune of Vicuna-13B v0 (itself fine-tuned from LLaMA-13B)
- **Training:** CarperAI team, led by Duy V. Phung
- **License:** Delta weights under CC BY-NC-SA-4.0 (due to non-commercial LLaMA license)

## Architecture Details (StableLM-3B-4E1T)

```yaml
num-layers: 32
hidden-size: 2560
num-attention-heads: 32
seq-length: 4096
pos-emb: rotary (25% RoPE)
norm: layernorm (with bias)
mlp-type: gated (SwiGLU)
activation: silu
no-weight-tying: true
```

## Evaluation Results (StableLM-3B-4E1T vs 7B models)

| Model | Average | ARC-C | BoolQ | HellaSwag | PIQA | SciQ |
|-------|---------|-------|-------|-----------|------|------|
| StableLM-3B-4E1T | 66.93 | 37.80 | 75.63 | 73.90 | 79.22 | 94.80 |
| LLaMA-2-13B | 71.77 | 48.63 | 80.52 | 79.36 | 79.05 | 94.50 |
| Llama-2-7B | 68.75 | 43.00 | 77.74 | 75.94 | 77.75 | 93.60 |

## Quickstart

```python
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer, StoppingCriteria, StoppingCriteriaList

tokenizer = AutoTokenizer.from_pretrained("stabilityai/stablelm-tuned-alpha-7b")
model = AutoModelForCausalLM.from_pretrained("stabilityai/stablelm-tuned-alpha-7b")
model.half().cuda()

class StopOnTokens(StoppingCriteria):
    def __call__(self, input_ids: torch.LongTensor, scores: torch.FloatTensor, **kwargs) -> bool:
        stop_ids = {50278, 50279, 50277, 1, 0}
        return input_ids[0][-1] in stop_ids

prompt = "<|SYSTEM|># StableLM Tuned...\n<|USER|>What's your mood today?<|ASSISTANT|>"
inputs = tokenizer(prompt, return_tensors="pt").to("cuda")
tokens = model.generate(**inputs, max_new_tokens=64, temperature=0.7, do_sample=True,
                        stopping_criteria=StoppingCriteriaList([StopOnTokens()]))
print(tokenizer.decode(tokens[0], skip_special_tokens=True))
```

## Key Files

- `configs/stablelm-3b-4e1t.yml` — training config for 3B-4E1T
- `configs/stablelm-base-alpha-3b-v2.yml` — StableLM-Alpha v2 3B config
- `configs/stablelm-base-alpha-7b-v2.yml` — StableLM-Alpha v2 7B config
- `notebooks/stablelm-alpha.ipynb` — inference notebook
- `evals/` — lm-evaluation-harness results

## Key Links

- HuggingFace: https://huggingface.co/StabilityAI
- StableLM-3B-4E1T: https://huggingface.co/stabilityai/stablelm-3b-4e1t
- StableLM-Tuned-Alpha-7B: https://huggingface.co/stabilityai/stablelm-tuned-alpha-7b
- StableVicuna: https://huggingface.co/CarperAI/stable-vicuna-13b-delta
