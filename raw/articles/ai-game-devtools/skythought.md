# SkyThought

> Source: https://github.com/NovaSky-AI/SkyThought
> Cloned: 2026-04-14
> License: Apache-2.0
> Organization: NovaSky AI (Berkeley Sky Computing Lab)

## Project Overview

SkyThought is a reasoning model training and evaluation framework from NovaSky AI (Berkeley Sky Computing Lab). It includes:

- **Sky-T1 series**: Trainable O1-preview models (Sky-T1-32B-Preview, Sky-T1-7B, Sky-T1-mini, Sky-T1-32B-Flash)
- **S\\* (S-Star)**: Test-time scaling framework for code generation
- **skythought evals**: Data generation and evaluation library with CLI (`skythought evaluate`)

## Key Models

| Model | Size | Notes |
|-------|------|-------|
| Sky-T1-32B-Preview | 32B | Full data + code + weights open |
| Sky-T1-32B-Flash | 32B | Tackles overthinking, shorter reasoning |
| Sky-T1-7B | 7B | Lightweight variant |
| Sky-T1-mini | mini | Lightweight variant |

## Architecture

- **Base model**: Qwen-2.5-32B-Instruct fine-tuned with RL
- **Training**: Uses [LLaMA-Factory](https://github.com/hiyouga/LLaMA-Factory) for SFT
- **RL training**: Custom `skythought-rl` module for Sky-T1-7B and Sky-T1-mini
- **Evaluation backend**: vLLM for inference, Ray for distributed multi-node evaluation
- **Key subdirectories**:
  - `skythought/evals/` — Task handlers, model configs, CLI for evaluation
  - `skythought/train/` — Training scripts
  - `skythought/skythought-rl/` — RL training code
  - `skythought/test-time-scaling/` — S\\* test-time scaling framework
  - `recipes/` — Data curation steps and training strategies

## Evaluation Capabilities

CLI: `skythought evaluate --model <model> --task <benchmark>`

Supported benchmarks: AIME'24, MATH500, GPQADiamond, MMLU, ARC-Challenge, OlympiadBench, AMC'23, TACO, APPS, LiveCodeBench, MMLU Pro, MinervaMath, GSM8K, AIME'25

Distributed evaluation via Ray backend with configurable tensor parallelism and replica count.

## Notable Results (Sky-T1-32B-Preview)

| Benchmark | Sky-T1-32B-Preview | Qwen-2.5-32B | QwQ | o1-preview |
|-----------|-------------------|-------------|-----|------------|
| Math500 | 86.4 | 81.4 | 92.2 | 81.4 |
| AIME2024 | 43.3 | 16.7 | 50.0 | 40.0 |
| LiveCodeBench-Medium | 56.8 | 40.8 | 56.3 | 54.9 |
| GPQA-Diamond | 56.8 | 45.5 | 52.5 | 75.2 |

## Openness

Fully open: data + code + model weights released. Comparison with STILL-2, Journey, QwQ, o1 shows Sky-T1-32B-Preview is the only one that open-sources all three (data, code, weights).

## Dependencies

- vllm==0.7.0, pydantic, typer, datasets<4.0.0, latex2sympy2, scipy, word2number, hf_transfer
- Python >=3.9, <3.13
- Backend: vLLM, Ray (for distributed), OpenAI API (optional)
