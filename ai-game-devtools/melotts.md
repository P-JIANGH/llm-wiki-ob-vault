---
title: MeloTTS
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [tool, open-source, speech, multimodal]
sources: [raw/articles/ai-game-devtools/melotts.md]
---

# MeloTTS

## Overview

MeloTTS is a high-quality multi-lingual text-to-speech library developed by MIT and MyShell.ai. It supports 11 language/accent variants including American/British/Indian/Australian English, Spanish, French, Chinese (mixed EN), Japanese, and Korean. Key differentiator: fast enough for **CPU real-time inference**, making it suitable for on-device game NPC voice generation.

## Key Facts

- **Authors:** Wenliang Zhao (Tsinghua), Xumin Yu (Tsinghua), Zengyi Qin (MIT/MyShell)
- **License:** MIT — free for commercial and non-commercial use
- **Version:** 0.1.2
- **GitHub Stars:** Trending (#8133 on Trendshift)

## Architecture

Built on the **VITS2** (Variational Inference for TTS) architecture with several enhancements:

- **TextEncoder:** Phoneme + tone + language embeddings + BERT feature injection (1024-dim EN, 768-dim JA)
- **StochasticDurationPredictor:** Normalizing flow-based duration modeling (VITS2 improvement over deterministic VITS)
- **DurationDiscriminator:** Adversarial training for duration prediction
- **ResidualCouplingBlock:** Flow-based acoustic prior
- **HiFi-GAN Generator:** Multi-receptive field vocoder
- **Auto language detection** via langid

## Technical Stack

- **Framework:** PyTorch + torchaudio
- **BERT features:** transformers 4.27.4
- **Audio:** librosa, soundfile, pydub
- **Chinese NLP:** jieba, pypinyin, cn2an
- **Japanese NLP:** mecab-python3, pykakasi, fugashi, unidic
- **Korean NLP:** jamo, g2pkk
- **European NLP:** gruut (DE/ES/FR)
- **English NLP:** g2p_en, eng_to_ipa
- **Web UI:** Gradio (`melo-ui` command)

## CLI Usage

```bash
pip install melotts
melo "Hello world" --output output.wav
melo-ui  # launches Gradio interface
```

## Relevance to AI Game Dev

MeloTTS is particularly valuable for game development because:
1. **CPU real-time inference** — no GPU needed for runtime NPC dialogue
2. **MIT license** — safe for commercial games
3. **Multi-lingual** — supports localized game audio for global releases
4. **Mixed Chinese-English** — useful for bilingual game content
5. **Lightweight** — can be bundled with game builds

## Related Projects

- [[ai-game-devtools/bert-vits2]] — MeloTTS is based on Bert-VITS2 architecture; Bert-VITS2 offers more speaker customization but requires more training
- [[ai-game-devtools/gpt-sovits]] — GPT-SoVITS focuses on voice cloning with few-shot reference audio, while MeloTTS provides ready-to-use multi-lingual TTS
- [[ai-game-devtools/chat-tts]] — ChatTTS is optimized for conversational/speech-like TTS with natural pauses and fillers, whereas MeloTTS prioritizes multi-lingual coverage
- [[ai-game-devtools/cosyvoice]] — CosyVoice (FunAudioLLM) is another multi-lingual TTS with voice cloning capability
