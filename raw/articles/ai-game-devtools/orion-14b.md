# Orion-14B

> Source: https://github.com/OrionStarAI/Orion
> Captured: 2026-04-14

## Model Overview

Orion-14B series models are open-source multilingual large language models trained from scratch by OrionStarAI. The base model is trained on 2.5T multilingual corpus, including Chinese, English, Japanese, Korean, etc.

## Model Variants

- **Orion-14B-Base**: Multilingual LLM foundational model, 14B parameters, 2.5T tokens pretraining
- **Orion-14B-Chat**: Chat model fine-tuned on high-quality corpus
- **Orion-14B-LongChat**: Long-context version, supports up to 320k tokens (200k tested)
- **Orion-14B-Chat-RAG**: Fine-tuned for retrieval augmented generation
- **Orion-14B-Chat-Plugin**: Tailored for plugin and function calling (agent scenarios)
- **Orion-14B-Base-Int4**: 4-bit quantized base model (70% size reduction, 30% speed increase, <1% performance loss)
- **Orion-14B-Chat-Int4**: 4-bit quantized chat model

## Benchmarks

### Base Model (vs competitors at similar scale)
- C-Eval: 72.9 (best vs QWEN-14B 71.7, Baichuan2-13B 59.0)
- CMMLU: 70.6 (best)
- MMLU: 69.9 (best)
- OpenCompass Average: 64.3 (best vs QWEN-14B 62.4)
- Japanese Average: 69.1 (best vs Yi-34B 67.1)
- Korean (Orion-14B-Chat): 74.5 n=0 / 79.6 n=5 (best)

### Chat Model
- MTBench Average: 7.37 (best vs Qwen-14B-Chat 6.96)
- AlignBench: 5.51 (vs Qwen 5.72)

### LongChat (LongBench)
- NarrativeQA: 19.47, MultiFieldQA-en: 48.11, DuReader: 37.02 (best vs Vicuna/LongChat)

### Plugin Model
- Intent Recognition (Full Params): 92.5 (vs GPT-4 95)
- Intent Recognition (Missing Params): 60.32 (best, vs GPT-4 52.38)
- Non-Plugin Invocation Recognition: 90 (best)

## Architecture / Tech

- Transformer-based from scratch pretraining
- Multilingual corpus: Chinese, English, Japanese, Korean
- 2.5T tokens pretraining corpus
- Quantized versions via INT4 (70% size reduction, 30% speed up)
- Supports vLLM (>=v0.3.3) and llama.cpp inference
- HuggingFace, ModelScope, OpenXLab model weights available

## Inference

```python
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from transformers.generation.utils import GenerationConfig

tokenizer = AutoTokenizer.from_pretrained("OrionStarAI/Orion-14B", use_fast=False, trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained("OrionStarAI/Orion-14B", device_map="auto",
                                             torch_dtype=torch.bfloat16, trust_remote_code=True)
model.generation_config = GenerationConfig.from_pretrained("OrionStarAI/Orion-14B")
messages = [{"role": "user", "content": "Hello, what is your name? "}]
response = model.chat(tokenizer, messages, streaming=False)
print(response)
```

## Company

**OrionStarAI** (猎户星空) — Founded September 2016. Service robot solutions company. Products include AI Robot Greeting, Lucki, Coffee Master. Core strengths: end-to-end AI (voice interaction, visual navigation). OrionOS open platform. Contact: ai@orionstar.com, 400-898-7779.

## License

- Code: Apache License 2.0
- Model: Orion-14B Series Models Community License Agreement
