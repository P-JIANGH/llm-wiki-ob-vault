# Code World Model (CWM)

> Source: https://github.com/facebookresearch/cwm
> Cloned: 2026-04-23
> License: BSD-3 (code) / Custom CWM License (weights)

## Overview

Code World Model (CWM) is a 32-billion-parameter open-weights LLM developed by Meta FAIR CodeGen Team to advance research on code generation with world models.

## Key Features

- **32B dense decoder-only autoregressive LLM** with 64 transformer blocks
- **World model training**: mid-trained on observation-action trajectories from Python execution traces and agentic interactions in containerized environments
- **Multi-task RL post-training**: extensive reinforcement learning in verifiable coding, math, and multi-turn software engineering environments
- **Three model variants**: `cwm` (instruction-tuned), `cwm-sft`, `cwm-pretrain`
- **128k token vocabulary** with grouped-query attention (GQA)
- **Alternating attention pattern**: 3:1 ratio of local (8,192) to global (131,072) attention blocks
- **Hardware requirements**: 160GB combined GPU VRAM (two H100 GPUs) for default evals; single 80GB GPU with quantization for inference

## Architecture Details

- Pre-trained on 8,192 context length for 8T tokens
- Mid-trained at 131,072 context length for additional 5T tokens on code world modeling data
- Post-trained with SFT for reasoning and instruction following
- Final stage: multi-task multi-turn verifiable reinforcement learning

## Training Data

- Large diverse corpora of code, English web, and STEM data
- Over 30,000 executable repository Docker images
- Over 200 million memory traces of Python programs in Docker containers
- 3 million trajectories of simulated agentic interactions between LLM and computational environment
- GitHub pull request data (similar to SWE-RL), compiler IR, Triton PyTorch kernels, Lean math

## Benchmarks

| Model | LCBv5 | LCBv6 | Math-500 | AIME24 | AIME25 |
|-------|-------|-------|----------|--------|--------|
| **CWM** | 68.6 | 63.5 | 96.6 | 76.0 | 68.2 |
| Qwen3-32B | 65.7 | 61.9 | 97.2 | 81.4 | 72.9 |
| gpt-oss-20B (med) | 66.9 | 62.0 | -- | 80.0 | 72.1 |

| Model | SweBench Verified |
|-------|-------------------|
| **CWM + tts** | 65.8 |
| **CWM** | 53.9 |
| Devstral-1.1-2507-24B | 53.6 |
| Qwen3-Coder-32B | 51.6 |

## Repository Structure

- `cwm/` - Core model and RL training code (includes SWE-RL tools)
- `demos/` - Neural debugger demos
- `evals/` - Evaluation logic for agentic and reasoning benchmarks
- `serve/` - Fastgen inference server implementation
- `download_pytorch.sh` - PyTorch DCP checkpoint download script
- `environment.yaml` - Micromamba environment (CUDA 12.4.1, Python 3.11)

## Inference

Two supported approaches:
1. **Hugging Face + vLLM**: `vllm serve facebook/cwm --tensor-parallel-size=2`
2. **CWM repository + Fastgen**: PyTorch DCP weights with lightweight high-throughput inference library

System prompt requires reasoning format:
```
You are a helpful AI assistant. You always reason before responding, using the following format:
<think>
your internal reasoning
</think>
your external response
```

## License

- Code: BSD-3-Clause
- Model weights: Custom CWM License (non-commercial research only)
- Not intended for commercial use or as a general-purpose chat bot

## Citation

```
@misc{cwm2025,
  author = {FAIR CodeGen Team, Meta},
  title = {CWM: An Open-Weights LLM for Research on Code Generation with World Models},
  year = {2025},
  url = {https://ai.meta.com/research/publications/cwm/}
}
```
