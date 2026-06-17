# VibeVoice: Open-Source Frontier Voice AI

**Source:** https://github.com/microsoft/VibeVoice
**Extracted:** 2026-04-21

## Overview
VibeVoice is a Microsoft open-source research framework for frontier voice AI, encompassing both Text-to-Speech (TTS) and Automatic Speech Recognition (ASR) models.

**Core Innovation:** Uses continuous speech tokenizers (Acoustic & Semantic) operating at an ultra-low frame rate of 7.5 Hz. These tokenizers preserve audio fidelity while drastically boosting computational efficiency for long sequences. The architecture employs a next-token diffusion framework (arxiv.org/abs/2412.08635), combining an LLM for textual context/dialogue flow with a diffusion head for high-fidelity acoustic generation.

## Model Suite

| Model | Size | Key Capabilities |
|:---|:---|:---|
| VibeVoice-ASR-7B | 7B | 60-min single-pass processing (64K token context), Structured output: Who/When/What, 50+ languages, custom hotword support, Joint ASR + diarization + timestamping |
| VibeVoice-TTS-1.5B | 1.5B | 90-min long-form generation in a single pass, Up to 4 distinct speakers with natural turn-taking, Multi-lingual (EN, ZH, etc.) & expressive/emotional speech. NOTE: Code removed from repo (see timeline) |
| VibeVoice-Realtime-0.5B | 0.5B | Streaming text input with ~300ms first-audio latency, Robust ~10-min long-form generation, Deployment-friendly lightweight architecture, Experimental multilingual & style voices |

## Release Timeline
- 2026-03-06: VibeVoice-ASR integrated into Hugging Face Transformers library
- 2026-01-21: Open-sourced VibeVoice-ASR, released finetuning code, added vLLM inference support, published Technique Report (arxiv.org/pdf/2601.18184)
- 2025-12-16: Added experimental speakers to Realtime-0.5B (9 multilingual + 11 English style voices)
- 2025-12-03: Open-sourced VibeVoice-Realtime-0.5B for streaming TTS
- 2025-09-05: VibeVoice-TTS code removed from repository due to usage inconsistent with Microsoft's responsible AI principles. Weights and research remain accessible.
- 2025-08-25: Open-sourced VibeVoice-TTS (accepted as Oral presentation at ICLR 2026)

## Repository Metadata
- **License:** MIT
- **Language:** Python 100%
- **Stars:** 40k | **Forks:** 4.6k
- **Contributing:** Guidelines in CONTRIBUTING.md

## Key Resources
- Project Page: https://microsoft.github.io/VibeVoice
- Hugging Face Collection: https://huggingface.co/collections/microsoft/vibevoice-68a2ef24a875c44be47b034f
- TTS Paper: https://openreview.net/pdf?id=FihSkzyxdv
- ASR Paper: https://arxiv.org/pdf/2601.18184

## Responsible AI
High-quality synthetic speech can be misused for impersonation, fraud, or spreading false information. Recommended for research & development purposes only. Not recommended for commercial/production deployment without extensive testing and safety mitigations.
