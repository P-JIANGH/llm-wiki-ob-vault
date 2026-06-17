# Character-LLM: A Trainable Agent for Role-Playing

> Source: https://github.com/choosewhatulike/trainable-agents
> Captured: 2026-04-13
> Paper: https://arxiv.org/abs/2310.10158 (EMNLP 2023)

## README Summary

Character-LLM is a trainable agent for role-playing that learns from actual experiences,
characteristics, and emotions. Unlike prompt-based agents, Character-LLMs are specifically
trained to embody specific historical/fictional characters (Beethoven, Cleopatra, Caesar, etc.)
without needing additional prompts or reference documents at inference time.

## Key Innovation: Experience Reconstruction

The core technique is **Experience Reconstruction** — a data generation pipeline:
1. **Profile Construction**: Collect character profile (e.g., Wikipedia article)
2. **Scene Extraction**: Use GPT-3.5-turbo to generate diverse scenes from the profile
3. **Experience Completion**: LLM generates dialogues for each scene
4. **Protective Scenes**: Anti-hallucination data to prevent wrong character knowledge
5. **Training**: Fine-tune LLaMA-7B via SFT using FastChat framework

## Characters Supported (9 total)
- Cleopatra VII, Lord Voldemort, Spartacus, Hermione Granger, Isaac Newton
- Julius Caesar, Ludwig van Beethoven, Socrates, Martin Luther King

## Technical Stack
- **Base Model**: LLaMA-7B (v1), extendable to LLaMA2-7B
- **Training Framework**: FastChat (with minor bug fixes)
- **Training Hardware**: 8x A100 GPUs, ~30-45 min per character
- **Training Config**: 10 epochs, bf16, FSDP, gradient checkpointing, cosine LR scheduler
- **Inference**: FastChat OpenAI-compatible API server

## Dataset Statistics
- ~1.4K–2.2K scenes per character
- ~599K–1,038K words per character
- ~12–15.5 turns per scene
- Available on HuggingFace: `fnlp/character-llm-data`

## Model Weights
Released as weight differences (wdiff) due to LLaMA-1 license constraints.
9 models on HuggingFace under `fnlp/` namespace.
Recovery requires `fastchat.model.apply_delta`.

## Licenses
- Code: Apache 2.0
- Data: CC By NC 4.0 (non-commercial only)
- Models: LLaMA 1 license (academic research only)

## Authors
Yunfan Shao, Linyang Li, Junqi Dai, Xipeng Qiu (EMNLP 2023)
Institution: Fudan University (fnlp = Fudan NLP)
