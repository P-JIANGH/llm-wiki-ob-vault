# Kimi K2 - Raw Source

> Cloned from: https://github.com/moonshotai/Kimi-K2 (gitcode.com mirror)
> Date: 2026-04-14

## README Summary

### Model Introduction
Kimi K2 is a state-of-the-art mixture-of-experts (MoE) language model with 32 billion activated parameters and 1 trillion total parameters. Trained with the Muon optimizer, Kimi K2 achieves exceptional performance across frontier knowledge, reasoning, and coding tasks while being meticulously optimized for agentic capabilities.

### Key Features
- Large-Scale Training: Pre-trained a 1T parameter MoE model on 15.5T tokens with zero training instability.
- MuonClip Optimizer: Novel optimization techniques to resolve instabilities while scaling up.
- Agentic Intelligence: Specifically designed for tool use, reasoning, and autonomous problem-solving.

### Model Variants
- **Kimi-K2-Base**: Foundation model for fine-tuning and custom solutions.
- **Kimi-K2-Instruct**: Post-trained model for general-purpose chat and agentic experiences (reflex-grade, no long thinking).

### Architecture Summary
| | |
|:---|:---|
| **Architecture** | Mixture-of-Experts (MoE) |
| **Total Parameters** | 1T |
| **Activated Parameters** | 32B |
| **Number of Layers** | 61 |
| **Number of Dense Layers** | 1 |
| **Attention Hidden Dimension** | 7168 |
| **MoE Hidden Dimension** (per Expert) | 2048 |
| **Number of Attention Heads** | 64 |
| **Number of Experts** | 384 |
| **Selected Experts per Token** | 8 |
| **Number of Shared Experts** | 1 |
| **Vocabulary Size** | 160K |
| **Context Length** | 128K |
| **Attention Mechanism** | MLA |
| **Activation Function** | SwiGLU |

### Key Benchmark Results
- **SWE-bench Verified (Agentic Coding)**: 65.8% single attempt, 71.6% multiple attempts — SOTA among open-source models
- **LiveCodeBench v6**: 53.7% — best among all models compared
- **AIME 2024**: 69.6% avg@64 — best among all models
- **MATH-500**: 97.4% — best among all models
- **TerminalBench**: 30.0% (Inhouse) / 25.0% (Terminus) — open-source SOTA
- **Tau2 retail/airline/telecom**: SOTA across all three domains

### License
Modified MIT License

### Links
- Tech Blog: https://moonshotai.github.io/Kimi-K2/
- Full Report: https://www.arxiv.org/abs/2507.20534
- HuggingFace: https://huggingface.co/moonshotai
- Discord: https://discord.gg/TYU2fdJykW

## docs/ directory structure
(Not enumerated in this source — repo contains docs/, figures/, LICENSE, README.md, tech_report.pdf)
