# ZMM-TTS: Zero-shot Multilingual and Multispeaker Speech Synthesis

**Source:** https://github.com/nii-yamagishilab/ZMM-TTS  
**License:** BSD-3-Clause (main code), MIT (txt2vec/vec2mel/vec2wav), GPL (sv56scripts)  
**Paper:** arXiv:2312.14398 (submitted to IEEE TASLP)

## Overview

ZMM-TTS is a multilingual and multispeaker text-to-speech (TTS) framework utilizing quantized latent speech representations from large-scale, pre-trained, self-supervised models. It is the first work to incorporate representations from both text-based and speech-based self-supervised learning models into multilingual speech synthesis tasks.

## Architecture

The system uses a three-stage pipeline:

1. **txt2vec** — Text to discrete speech representation (using XPhoneBERT/Characters/IPA)
2. **vec2mel** — Discrete representation to mel spectrogram
3. **vec2wav** + **HifiGAN Vocoder** — Mel spectrogram to waveform

### Key Components

| Component | Description |
|-----------|-------------|
| txt2vec | Transformer-based TTS encoder (built on Comprehensive-Transformer-TTS) |
| vec2mel | Converts discrete codes to mel spectrograms |
| vec2wav | Neural vocoder stage (built on MSMC-TTS) |
| HifiGAN | Final waveform generation |

### Pre-trained Models Used

| Model | Modality | Languages | Training Data |
|-------|----------|-----------|---------------|
| XLSR-53 | Audio | 53 | 56K hours |
| ECAPA-TDNN | Audio | >5 | 2794 hours |
| XPhoneBERT | Text | 94 | 330M sentences |

## Training Data (MM6)

A multilingual dataset designed by the authors combining MLS and NHT Swedish databases:

| Language | Gender | Speakers | Sentences | Duration |
|----------|--------|----------|-----------|----------|
| English | F/M | 20/20 | 4000/4000 | 13.9h/13.9h |
| French | F/M | 20/20 | 4000/4000 | 13.9h/13.9h |
| German | F/M | 20/20 | 4000/4000 | 13.9h/13.9h |
| Portuguese | F/M | 16/20 | 3741/4175 | 13.0h/14.5h |
| Spanish | F/M | 20/20 | 3519/3786 | 12.2h/13.1h |
| Swedish | M | 20 | 4000 | 13.9h |

Total: ~83 hours across 6 languages.

## Technical Details

- **Framework:** PyTorch 1.12.1, Python ≥3.8
- **Key Dependencies:** transformers, speechbrain, librosa, torchaudio, tensorboard
- **Training:** 1x Tesla A100, ~3 days per stage (txt2vec/vec2mel/vec2wav/HifiGAN)
- **Batch Size:** 16
- **Steps:** 1.2M (txt2vec/vec2mel), 1M (vec2wav/HifiGAN)

## Key Features

- **Zero-shot speaker adaptation** — synthesize speech for unseen speakers using only a reference audio clip
- **Multilingual synthesis** — supports 6 high-resource languages (EN/FR/DE/PT/ES/SV)
- **Low-resource language generalization** — tested on hypothetical low-resource languages with promising results
- **Multiple text representations** — supports XPhoneBERT, character-level, and IPA input

## File Structure

```
ZMM-TTS/
├── txt2vec/          # Text-to-discrete-code model
│   ├── model/        # CompTransTTS transformer architecture
│   ├── train.py
│   └── synthesize.py
├── vec2mel/          # Discrete-code-to-mel model
├── vec2wav/          # Mel-to-waveform model (MSMC-TTS based)
├── Vocoder_HifiGAN_Model/  # HifiGAN vocoder
├── prepare_data/     # Data preprocessing scripts
├── scripts/          # Training/extraction bash scripts
├── Config/           # YAML/JSON configuration files
└── Dataset/          # Data directory
```

## Authors

Cheng Gong, Xin Wang, Erica Cooper, Dan Wells, Longbiao Wang, Jianwu Dang, Korin Richmond, Junichi Yamagishi (NII Yamagishi Lab)
