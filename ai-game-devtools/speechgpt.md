---
title: SpeechGPT
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [speech, llm, multimodal, tool, open-source, speech-synthesis, speech-recognition]
sources: [raw/articles/ai-game-devtools/speechgpt.md]
---

# SpeechGPT — Speech Large Language Models

**Organization**: Fudan University (NLP Group / fnlp)
**GitHub**: https://github.com/0nutation/SpeechGPT
**Paper**: [arXiv 2305.11000](https://arxiv.org/abs/2305.11000) (SpeechGPT), [arXiv 2401.13527](https://arxiv.org/abs/2401.13527) (SpeechGPT-Gen)
**Demo**: [SpeechGPT](https://0nutation.github.io/SpeechGPT.github.io/) | [SpeechGPT-Gen](https://0nutation.github.io/SpeechGPT-Gen.github.io/)

## Overview

SpeechGPT is the first multimodal LLM capable of perceiving and generating multimodal content (speech + text) following human instructions. Developed by Fudan University, it uses discrete speech representations (via mHuBERT tokenization) to enable cross-modal dialogue. The project includes two major contributions: the original SpeechGPT (2023) and SpeechGPT-Gen (2024).

## Architecture

### SpeechGPT — Three-Stage Training Pipeline

1. **Modality-adaptation pre-training (Stage 1)**: LLaMA-7B initialized → pre-trained on LibriLight discrete speech units → **SpeechGPT-7B-ma**
2. **Cross-modal instruction fine-tuning (Stage 2)**: Fine-tuned on SpeechInstruct cross-modal instruction set (~9M pairs) → **SpeechGPT-7B-cm** (foundational model for speech-text alignment)
3. **Chain-of-modality LoRA fine-tuning (Stage 3)**: Four input-output format training (speech-speech, speech-text, text-speech, text-text) → **SpeechGPT-7B-com** (adapter for spoken dialogue)

### SpeechGPT-Gen — Chain-of-Information Generation (CoIG)

An 8B parameter Speech LLM that decouples semantic and perceptual information:
- **Semantic modeling**: Autoregressive LLM based on LLM architecture
- **Perceptual modeling**: Non-autoregressive model using flow matching
- **Key innovation**: Infusing semantic information into the prior distribution to enhance flow matching efficiency

## Capabilities

- **Cross-modal instruction following**: Speech-in/speech-out, speech-in/text-out, text-in/speech-out, text-in/text-out
- **Spoken dialogue**: Natural conversational ability with speech I/O
- **ASR (Automatic Speech Recognition)**: Speech-to-text
- **TTS (Text-to-Speech)**: Text-to-speech synthesis
- **Zero-shot voice conversion** (SpeechGPT-Gen)
- **Speech-to-speech dialogue** (SpeechGPT-Gen)

## Key Technical Stack

| Component | Technology |
|-----------|-----------|
| Base LLM | LLaMA-7B |
| Speech Tokenizer | mHuBERT (multilingual Hubert) |
| Vocoder | HiFi-GAN (fairseq) |
| Dataset | SpeechInstruct (HuggingFace: fnlp/SpeechInstruct) |
| Fine-tuning | LoRA |
| Inference UI | CLI + Gradio Web UI |
| Training | Distributed (multi-node) |

## Checkpoints

- **SpeechGPT-7B-ma**: [HuggingFace](https://huggingface.co/fnlp/SpeechGPT-7B-ma) — Stage 1 modality-adapted model
- **SpeechGPT-7B-cm**: [HuggingFace](https://huggingface.co/fnlp/SpeechGPT-7B-cm) — Stage 2 cross-modal aligned model
- **SpeechGPT-7B-com**: [HuggingFace](https://huggingface.co/fnlp/SpeechGPT-7B-com) — Stage 3 spoken dialogue adapter

## Game Dev Relevance

SpeechGPT is highly relevant for AI game development, particularly for:
- **NPC voice interaction**: Natural speech-based NPC dialogue in games
- **Voice-controlled games**: Speech input for game commands and interactions
- **Accessibility**: Speech-to-speech interfaces for players
- **Procedural dialogue**: LLM-driven speech conversations in virtual worlds

Related projects in this wiki: [[moss]] (same Fudan lab, SFT data source), [[llama]] (base model), [[cosyvoice]] (speech synthesis alternative), [[moshi]] (speech LLM comparison), [[onellm]] (multimodal alignment comparison).

## Limitations

The authors note that the open-source model performance is suboptimal due to limited training data and resources. It is primarily a research exploration — the team did not scale up pretraining/SFT data or training steps. The model serves as a foundational model to encourage research in speech language models.

## Related Projects

- **AnyGPT** (2024/02): Unified Multimodal LLM with Discrete Sequence Modeling (github.com/OpenMOSS/AnyGPT)
- **SpeechAgents** (2024/01): Multi-Modal Multi-Agent Systems for human communication simulation
- **SpeechTokenizer** (2023/09): Unified Speech Tokenizer for Speech Language Models
