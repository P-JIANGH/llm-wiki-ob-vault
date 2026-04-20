# EmotiVoice 😊: a Multi-Voice and Prompt-Controlled TTS Engine

## Source
- **GitHub**: https://github.com/netease-youdao/EmotiVoice
- **Organization**: Netease Youdao (网易有道)
- **License**: Apache 2.0 (code) / User Agreement (interactive page)
- **Version**: 0.2.0
- **Author**: Huaxuan Wang (wanghx04@rd.netease.com)
- **Extracted**: 2026-04-21
- **Clone source**: gitcode.com mirror (GitHub timeout)

## Overview
EmotiVoice is a powerful open-source text-to-speech engine supporting English and Chinese with over 2000 voices. Its most prominent feature is **emotional synthesis**, allowing creation of speech with a wide range of emotions (happy, excited, sad, angry, etc.).

## Key Features
- **2000+ voices**: Multi-voice support with a voice wiki listing all available speakers
- **Emotion control**: Synthesize speech with emotions via prompt-based control
- **Bilingual**: English and Chinese mixed text input supported
- **Prompt-controlled**: Uses text prompts (style/emotion/content) to control synthesis
- **Voice cloning**: Support for voice cloning with personal data (released Dec 2023)
- **OpenAI-compatible API**: REST API compatible with OpenAI TTS interface
- **Docker deployment**: Official Docker image for easy setup (syq163/emoti-voice:latest)
- **Mac desktop app**: Native macOS application (released Dec 2023)

## Architecture

### Core Model: PromptTTS-based JETS Generator
The model is based on the **PromptTTS** paper (key foundation of this project) with a **JETS** (Jointly Trained Text-to-Speech) architecture:

1. **Text Frontend** (`frontend.py`): Chinese-English G2P pipeline
   - `g2p_cn_en()` — mixed-language grapheme-to-phoneme conversion
   - `tn_chinese()` — Chinese text normalization (numbers to words)
   - `cn2an` integration for number processing
   - `g2p_en` for English phoneme generation
   - Language-aware segmentation with `engsp4`/`cn_eng_sp` markers

2. **Style Encoder** (`models/prompt_tts_modified/simbert.py`):
   - Based on **Simbert** (simbert-base-chinese)
   - Extracts style embedding from text prompts (emotion, style, content)
   - Uses BERT pooled output as style vector

3. **Acoustic Model** (`models/prompt_tts_modified/model_open_source.py`):
   - **PromptTTS**: Encoder-Decoder Transformer architecture
   - Duration Predictor (FastSpeech2-style MAS)
   - Pitch/Energy Variance Predictors
   - Alignment Module with Gaussian Upsampling + Viterbi decode

4. **Vocoder** (`models/hifigan/`):
   - **HiFi-GAN** for mel-spectrogram to waveform conversion
   - Pretrained discriminator support

5. **Joint Training** (`train_am_vocoder_joint.py`):
   - Acoustic model and vocoder trained jointly
   - Loss: mel reconstruction + pitch/energy prediction + alignment + HiFi-GAN adversarial

### Key Modules
```
models/
├── prompt_tts_modified/    # Acoustic model (PromptTTS + JETS)
│   ├── jets.py             # JETS Generator (main model)
│   ├── model_open_source.py # PromptTTS architecture
│   ├── simbert.py          # Style encoder (Simbert-based)
│   ├── style_encoder.py    # Style embedding extraction
│   ├── modules/            # Encoder, variance, alignment, init
│   └── prompt_dataset.py   # Training dataset loader
├── hifigan/                # HiFi-GAN vocoder
│   ├── models.py           # Generator architecture
│   └── get_vocoder.py      # Vocoder loader
text/                       # Text processing utilities
lexicon/                    # Pronunciation lexicons
config/joint/               # Training/inference configs
```

### Inference Pipeline
1. Input: `<speaker>|<style_prompt/emotion/content>|<phoneme>|<content>`
2. Frontend: G2P converts text to phonemes
3. Style Encoder: Simbert encodes prompt → style embedding
4. Acoustic Model: Phonemes + style → mel-spectrogram
5. HiFi-GAN Vocoder: Mel → waveform audio

### Recipes for Voice Cloning
- **DataBaker Recipe**: `data/DataBaker/` — Chinese voice cloning with DataBaker dataset
- **LJSpeech Recipe**: `data/LJspeech/` — English voice cloning with LJSpeech dataset
- MFA (Montreal Forced Aligner) alignment support

### Dependencies (from setup.py)
- **Core**: PyTorch 2.1+, torchaudio, numpy, scipy, soundfile, librosa
- **ML**: transformers 4.26.1 (Simbert), scikit-learn, numba 0.58.1
- **Text**: g2p_en, jieba, pypinyin, pypinyin_dict, cn2an
- **UI**: streamlit (web demo)
- **API**: fastapi, pydub, uvicorn (OpenAI-compatible API)
- **Training**: tensorboard, einops, pyworld, praatio, jsonlines
- **Python**: >= 3.8.0

## Training Data
- **LibriTTS** (openslr.org/60) — English speech corpus
- **HiFiTTS** (openslr.org/109) — High-fidelity TTS dataset
- **2000+ voices**: Pretrained models with diverse speakers

## Key Dates
- **2023-11-10**: v0.1 — First public release (2000+ voices, CN+EN)
- **2023-11-17**: v0.2 — Mixed CN/EN text support, bug fixes
- **2023-12-13**: v0.3 — Voice cloning, HTTP API, DataBaker/LJSpeech recipes
- **2023-12-28**: Mac desktop app released
- **2024-01-04**: Docker image updated with OpenAI-compatible API

## Roadmap (as of Q4 2023)
- [ ] Updated model with improved quality (v0.4)
- [ ] Desktop application (first version released for Mac)
- [ ] Support longer text
- [ ] Support more languages (Japanese, Korean)

## Credits
- **PromptTTS** (Speech Research): Key paper foundation
- **ESPnet**: Architecture inspiration
- **WeTTS**: WeNet text-to-speech
- **HiFi-GAN**: Vocoder backbone
- **StyleTTS**: Style control concepts
- **Simbert**: Style encoder base model
- **cn2an**: Number processing
