# IRG: Interleaving Reasoning Generation

**Source:** https://github.com/Osilly/Interleaving-Reasoning-Generation
**ICLR 2026 Accepted**
**Extracted:** 2026-04-17

---

## Project Overview

- **Conference:** Accepted at ICLR 2026 (2026/01/26)
- **Core Innovation:** First exploration introducing *interleaving reasoning* to Text-to-Image (T2I) generation
- **Author:** Osilly (osilly0616@gmail.com)
- **License:** Apache-2.0
- **Version:** 0.1.0

## Key Mechanism

IRG introduces a multi-turn reasoning workflow for image generation:

```
Prompt → Text Reasoning → Initial Image → Self-Reflection → Refined Image
```

The model:
1. Given a prompt, first produces a text-based reasoning process
2. Generates an image conditioned on that reasoning
3. Reflects on how to improve the initial image's quality
4. Produces a refined image through this reflection process

Multi-turn reasoning substantially improves complex visual properties (textures, shadow realism) and fine-grained structural details (finger articulation).

## Benchmark Performance

| Model | GenEval | WISE | TIIF-short/long | GenAI-Bench | OneIG-EN |
|:---|:---:|:---:|:---:|:---:|:---:|
| Janus-Pro-7B | 0.80 | 0.35 | 65.38/61.10 | 0.75 | 0.267 |
| FLUX.1-dev | 0.82* | 0.50 | 66.24/66.72 | 0.76 | 0.434 |
| BAGEL | 0.78 | 0.52 | 70.97/71.79 | 0.79 | 0.361 |
| BAGEL w/ self-CoT | 0.79 | 0.70 | 68.06/68.78 | 0.81 | 0.324 |
| **IRG (Ours)** | **0.85** | **0.77** | **76.00/73.77** | **0.84** | 0.415 |

*FLUX.1-dev evaluated using rewritten prompts.

IRG achieves SoTA on GenEval, WISE, TIIF, and GenAI-Bench.

## Architecture & Pipeline

- **Training Strategy:** Learns text-based reasoning and complete high-quality image generation across **six decomposed learning modes**
- **Inference Design:** Introduces a **dedicated CFG (Classifier-Free Guidance) condition** specifically optimized for IRG's iterative refinement steps
- **Built on:** [[ai-game-devtools/bagel]] (ByteDance-Seed BAGEL unified multimodal model)

## Repository Structure

| Directory | Purpose |
|:---|:---|
| `RL/` | Reinforcement Learning components |
| `SFT/` | Supervised Fine-Tuning code & configurations |
| `eval/` | Benchmark evaluation scripts |
| `figs/` | Architecture diagrams, pipeline visuals & case comparisons |
| `pyproject.toml` | Project dependencies & build configuration |

## Tech Stack

- **Framework:** PyTorch 2.6.0, vLLM 0.8.2, transformers 4.51.3
- **Training:** SFT + RL unified environment
- **Key Dependencies:** flash-attn, accelerate, peft, liger-kernel, ray
- **Dataset:** IRG-Toy-Dataset (HuggingFace)

## Timeline

- `[2026/01/26]` Accepted by ICLR 2026
- `[2025/09/15]` Released SFT Training Code & IRG-Toy-Dataset
- `[2025/09/08]` Paper published on arXiv (2509.06945)

## Links

- **GitHub:** https://github.com/Osilly/Interleaving-Reasoning-Generation
- **Paper:** https://arxiv.org/abs/2509.06945
- **Dataset:** https://huggingface.co/datasets/Osilly/IRG-Toy-Dataset
