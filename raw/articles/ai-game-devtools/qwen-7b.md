# Qwen (通义千问) GitHub Repository Summary

> **Source:** `https://github.com/QwenLM/Qwen-7B`  
> **Paper:** [Qwen Technical Report](https://arxiv.org/abs/2309.16609)

---

## ⚠️ Critical Notice

> **Qwen2 is here!** You are welcome to follow **[QwenLM/Qwen2](https://github.com/QwenLM/Qwen2)** and share your experience there.
>
> **This repo (`QwenLM/Qwen`) is no longer actively maintained**, due to substantial codebase differences.

---

## Model Overview

Alibaba Cloud's official repo for the **Qwen** series of chat and pretrained large language models.

| Variant | 1.8B | 7B | 14B | 72B |
|---------|------|----|-----|-----|
| **Base** | [🤗](https://huggingface.co/Qwen/Qwen-1_8B) [🤖](https://modelscope.cn/models/qwen/Qwen-1_8B/summary) | [🤗](https://huggingface.co/Qwen/Qwen-7B) [🤖](https://modelscope.cn/models/qwen/Qwen-7B/summary) | [🤗](https://huggingface.co/Qwen/Qwen-14B) [🤖](https://modelscope.cn/models/qwen/Qwen-14B/summary) | [🤗](https://huggingface.co/Qwen/Qwen-72B) [🤖](https://modelscope.cn/models/qwen/Qwen-72B/summary) |
| **Chat** | [🤗](https://huggingface.co/Qwen/Qwen-1_8B-Chat) [🤖](https://modelscope.cn/models/qwen/Qwen-1_8B-Chat/summary) | [🤗](https://huggingface.co/Qwen/Qwen-7B-Chat) [🤖](https://modelscope.cn/models/qwen/Qwen-7B-Chat/summary) | [🤗](https://huggingface.co/Qwen/Qwen-14B-Chat) [🤖](https://modelscope.cn/models/qwen/Qwen-14B-Chat/summary) | [🤗](https://huggingface.co/Qwen/Qwen-72B-Chat) [🤖](https://modelscope.cn/models/qwen/Qwen-72B-Chat/summary) |
| **Chat (Int4)** | [🤗](https://huggingface.co/Qwen/Qwen-1_8B-Chat-Int4) [🤖](https://modelscope.cn/models/qwen/Qwen-1_8B-Chat-Int4/summary) | [🤗](https://huggingface.co/Qwen/Qwen-7B-Chat-Int4) [🤖](https://modelscope.cn/models/qwen/Qwen-7B-Chat-Int4/summary) | [🤗](https://huggingface.co/Qwen/Qwen-14B-Chat-Int4) [🤖](https://modelscope.cn/models/qwen/Qwen-14B-Chat-Int4/summary) | [🤗](https://huggingface.co/Qwen/Qwen-72B-Chat-Int4) [🤖](https://modelscope.cn/models/qwen/Qwen-72B-Chat-Int4/summary) |
| **Chat (Int8)** | [🤗](https://huggingface.co/Qwen/Qwen-1_8B-Chat-Int8) [🤖](https://modelscope.cn/models/qwen/Qwen-1_8B-Chat-Int8/summary) | [🤗](https://huggingface.co/Qwen/Qwen-7B-Chat-Int8) [🤖](https://modelscope.cn/models/qwen/Qwen-7B-Chat-Int8/summary) | [🤗](https://huggingface.co/Qwen/Qwen-14B-Chat-Int8) [🤖](https://modelscope.cn/models/qwen/Qwen-14B-Chat-Int8/summary) | [🤗](https://huggingface.co/Qwen/Qwen-72B-Chat-Int8) [🤖](https://modelscope.cn/models/qwen/Qwen-72B-Chat-Int8/summary) |

### Key Specifications

| Model | Release | Max Length | Sys Prompt Enh. | Pretrained Tokens | Min GPU Finetune (Q-LoRA) | Min GPU Gen 2048 (Int4) | Tool Use |
|-------|---------|------------|-----------------|-------------------|---------------------------|-------------------------|----------|
| **Qwen-1.8B** | 23.11.30 | 32K | ✅ | 2.2T | 5.8GB | 2.9GB | ✅ |
| **Qwen-7B** | 23.08.03 | 32K | ❎ | 2.4T | 11.5GB | 8.2GB | ✅ |
| **Qwen-14B** | 23.09.25 | 8K | ❎ | 3.0T | 18.7GB | 13.0GB | ✅ |
| **Qwen-72B** | 23.11.30 | 32K | ✅ | 3.0T | 61.4GB | 48.9GB | ✅ |

---

## Performance Benchmarks

Qwen models are pretrained on up to **3 trillion tokens** of multilingual data. Qwen-72B achieves better performance than LLaMA2-70B on all tasks and outperforms GPT-3.5 on 7 out of 10 tasks.

| Model | MMLU (5-shot) | C-Eval (5-shot) | GSM8K (8-shot) | MATH (4-shot) | HumanEval (0-shot) | MBPP (3-shot) | BBH (3-shot) | CMMLU (5-shot) |
|-------|---------------|-----------------|----------------|---------------|--------------------|---------------|--------------|----------------|
| LLaMA2-7B | 46.8 | 32.5 | 16.7 | 3.3 | 12.8 | 20.8 | 38.2 | 31.8 |
| LLaMA2-13B | 55.0 | 41.4 | 29.6 | 5.0 | 18.9 | 30.3 | 45.6 | 38.4 |
| **Qwen-7B** | **58.2** | **63.5** | **51.7** | **11.6** | **29.9** | **31.6** | **45.0** | **62.2** |
| **Qwen-14B** | **66.3** | **72.1** | **61.3** | **24.8** | **32.3** | **40.8** | **53.4** | **71.0** |
| **Qwen-72B** | **77.4** | **83.3** | **78.9** | **35.2** | **35.4** | **52.2** | **67.7** | **83.6** |

---

## Quickstart

### Environment
- Install requirements: `requirements.txt`
- **Recommended:** Install [flash-attention](https://github.com/Dao-AILab/flash-attention) (supports Flash Attention 2) for higher efficiency and lower memory. *Optional — the project runs without it.*

### Transformers
> **Please make sure that you are using the latest code.**

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen-7B-Chat", trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen-7B-Chat", device_map="auto", trust_remote_code=True)
```

### Inference Options
- **Batch Inference:** Supported. With flash attention enabled, batch inference brings a **~40% speedup**.
- **CPU:** Strongly advise using **[qwen.cpp](https://github.com/QwenLM/qwen.cpp)** (pure C++ implementation). Direct CPU inference is possible but extremely slow.
- **Multi-GPU:** Default Transformers loading.

---

## Features

- **Multilingual:** Trained on a large amount of multilingual data (primarily Chinese and English), exhibiting strong performance in both languages.
- **Long Context:** Supports context lengths up to 32K tokens (1.8B, 7B, 72B).
- **Tool Use:** Supports tool use, ReAct, and agent capabilities.
- **Quantization:** Supports Int4 and Int8 quantization for efficient deployment.
- **Fine-tuning:** Supports full-parameter fine-tuning, LoRA, and Q-LoRA.

---

## License

Qwen is licensed under the Tongyi Qianwen License Agreement.

---

*Extracted from GitHub on 2026-04-22 via web_extract (GitHub/gitcode/gitee clone all failed)*
