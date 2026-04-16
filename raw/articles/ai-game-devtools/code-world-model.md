# Code World Model (CWM) — Source Analysis

> Source: https://github.com/facebookresearch/cwm
> Fetched: 2026-04-17
> Author: Meta FAIR CodeGen Team

## README Summary

Code World Model (CWM) is a 32-billion-parameter open-weights LLM, designed to advance research on code generation with world models. Trained to better represent and reason about how code and commands affect the state of a program or system.

**Training approach**: Mid-trained on observation-action trajectories from Python execution traces and agentic interactions in containerized environments. Post-trained with multi-task RL in verifiable coding, math, and multi-turn software engineering environments.

**Release includes**: Pre-trained, SFT, and instruction-tuned model weights; technical report; model card; inference code; benchmark reproduction code (SWE-bench Verified, LiveCodeBench, AIME, MATH).

## Model Architecture

- **Type**: Dense decoder-only autoregressive LLM
- **Parameters**: 32B (dense)
- **Transformer blocks**: 64
- **Attention**: Alternating local/global attention in 3:1 ratio
  - Local sliding window: 8,192 tokens
  - Global sliding window: 131,072 tokens
- **Grouped-Query Attention (GQA)**
- **Tokenizer vocabulary**: 128K tokens
- **Context length**: 131,072 tokens (mid-training); 8,192 (pre-training)

## Training Pipeline

**4 stages**:
1. **Pre-training**: 8T tokens at 8,192 context length
2. **Mid-training**: 5T tokens at 131,072 context on code world modeling data
3. **SFT**: Supervised fine-tuning for reasoning + instruction following
4. **RL**: Multi-task multi-turn verifiable reinforcement learning

**Training data**:
- Large diverse corpora of code + English web + STEM data
- 30,000+ executable repository Docker images
- 200M+ memory traces of Python programs in Docker containers
- 3M agentic interaction trajectories (LLM ↔ computational environment)
- Code/reasoning data: SWE-RL-like PR data, compiler IRs, Triton kernels, Lean math

## Performance Benchmarks

| Model | LCBv5 | LCBv6 | Math-500 | AIME24 | AIME25 |
|---|---|---|---|---|---|
| **CWM** | 68.6 | 63.5 | 96.6 | 76.0 | 68.2 |
| Qwen3-32B | 65.7 | 61.9 | 97.2 | 81.4 | 72.9 |
| gpt-oss-20B (med) | 66.9 | 62.0 | -- | 80.0 | 72.1 |

| Model | SWE-bench Verified |
|---|---|
| **CWM + tts** | 65.8 |
| **CWM** | 53.9 |
| Qwen3-Coder-32B | 51.6 |

## Key Source Modules

- `cwm/model/` — Model architecture definition
- `cwm/exec/` — Code execution engine (Docker-based sandboxing)
- `cwm/rl/` — Reinforcement learning framework
  - `cwm/rl/swerl/` — SWE-RL based tools, backends, evaluation
  - `cwm/rl/envs/` — RL environments (rewards, code utils, dialogs)
- `cwm/data/` — Data processing pipelines
- `cwm/fastgen/` — Fastgen inference server (Carbonneaux et al.)
- `cwm/checkpoint/` — Checkpoint utilities (DCP format)
- `cwm/common/` — Shared utilities
- `serve/` — Serving implementation (Fastgen + model serving)
- `evals/` — Evaluation scripts for benchmarks
- `demos/` — Neural debugger demos

## Inference & Usage

- **Hugging Face weights**: `facebook/cwm`, `facebook/cwm-sft`, `facebook/cwm-pretrain`
- **PyTorch DCP checkpoints**: via download script (signed URL, 24h expiry)
- **Inference engines**: vLLM, Fastgen
- **System prompt required**: CWM needs a dedicated system prompt with <think>/</think> reasoning format for optimal output
- **GPU requirements**: 160GB VRAM (2× H100) for evals/demos; 80GB single GPU with quantization
- **License**: Code: BSD-3; Weights: Custom non-commercial research license

## Notable Features

- **Neural debugger demos**: Use CWM to debug code interactively
- **Reasoning mode**: Built-in <think>/</think> thinking format
- **Agentic tool use**: Supports tool specifications appended to system prompt
- **Multi-turn code reasoning**: Trained on agent-environment interaction trajectories
