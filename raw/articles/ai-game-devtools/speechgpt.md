# SpeechGPT: Speech Large Language Models

**Source**: https://github.com/0nutation/SpeechGPT
**Cloned from**: gitcode.com mirror (GitHub timeout)
**Date**: 2026-04-21

## Overview

SpeechGPT is a research project from Fudan University (NLP group) that empowers Large Language Models with intrinsic cross-modal conversational abilities. It is the first multimodal LLM capable of perceiving and generating multimodal content following human instructions, using discrete speech representations.

## Two Sub-projects

### SpeechGPT (2023/05)
- Paper: arXiv 2305.11000
- Demo: https://0nutation.github.io/SpeechGPT.github.io/
- Dataset: SpeechInstruct (~9M unit-text pairs from large-scale English ASR datasets)
- Three-stage training:
  1. **Modality-adaptation pre-training**: LLaMA-7B initialized, further pre-trained on LibriLight speech units → SpeechGPT-7B-ma
  2. **Cross-modal instruction fine-tuning**: Fine-tuned on SpeechInstruct cross-modal instruction set → SpeechGPT-7B-cm
  3. **Chain-of-modality instruction LoRA fine-tuning**: For spoken dialogue → SpeechGPT-7B-com (adapter model)

### SpeechGPT-Gen (2024/01)
- Paper: arXiv 2401.13527
- Demo: https://0nutation.github.io/SpeechGPT-Gen.github.io/
- Chain-of-Information Generation (CoIG): Decouples semantic and perceptual information in large-scale speech generation
- 8B parameter SLLM:
  - Autoregressive LLM for semantic information modeling
  - Non-autoregressive flow matching model for perceptual information modeling
  - Semantic information infused into prior distribution for flow matching efficiency
- Capabilities: zero-shot TTS, zero-shot voice conversion, speech-to-speech dialogue

## Key Technical Details

- **Base Model**: LLaMA-7B (HuggingFace)
- **Speech Tokenizer**: mHuBERT (multilingual Hubert) for discretizing speech into units
- **Vocoder**: HiFi-GAN (fairseq speech-to-speech vocoder)
- **Dataset**: SpeechInstruct on HuggingFace (fnlp/SpeechInstruct)
- **Training scripts**: ma_pretrain.sh, cm_sft.sh, com_sft.sh (distributed training)
- **Inference**: CLI + Gradio Web UI
- **Dependencies**: fairseq, transformers, torch

## Model Checkpoints (HuggingFace)

- SpeechGPT-7B-ma: https://huggingface.co/fnlp/SpeechGPT-7B-ma
- SpeechGPT-7B-cm: https://huggingface.co/fnlp/SpeechGPT-7B-cm
- SpeechGPT-7B-com: https://huggingface.co/fnlp/SpeechGPT-7B-com

## Acknowledgements

- MOSS (moss-sft-002-data) from OpenLMLab, Fudan University
- stanford_alpaca codebase

## Related Projects (from the README news section)

- AnyGPT (2024/02): Unified Multimodal LLM with Discrete Sequence Modeling (github.com/OpenMOSS/AnyGPT)
- SpeechAgents (2024/01): Human-Communication Simulation with Multi-Modal Multi-Agent Systems
- SpeechTokenizer (2023/09): Unified Speech Tokenizer for Speech Language Models

## License

Not explicitly stated in the main README. Check individual sub-projects for licensing details.
