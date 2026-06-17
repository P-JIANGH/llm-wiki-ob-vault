# X-E-Speech: Joint Training Framework of Non-Autoregressive Cross-lingual Emotional Text-to-Speech and Voice Conversion

> Source: https://github.com/X-E-Speech/X-E-Speech-code  
> License: MIT  
> Ingested: 2026-04-21

## Overview

X-E-Speech is a cross-lingual emotional speech generation model that achieves disentanglement of speaker style and cross-lingual content features by jointly training non-autoregressive (NAR) voice conversion (VC) and text-to-speech (TTS) models. Published as an anonymous preprint on OpenReview.

## Key Capabilities

- **Cross-lingual TTS**: Synthesize speech in one language using a speaker from another language without accent
- **Cross-lingual Emotional TTS**: Generate emotional speech across languages using the ESD dataset
- **Cross-lingual Emotional VC**: Convert voice while preserving emotion and enabling cross-lingual transfer
- **Joint Training**: Single framework trained on both TTS and VC objectives simultaneously

## Architecture

### Core Model: `models_whisper_hier_multi_pure.py`
- `SynthesizerTrn` / `SynthesizerTrn_3`: Main model classes (difference is `n_langs` parameter)
- `StochasticDurationPredictor`: Flow-based duration prediction with normalizing flows
- Uses **Whisper-large-v2 encoder** for content feature extraction (frozen)
- Based on **VITS** architecture with hierarchical multi-pure modifications
- VITS-based vocoder with resblocks and upsampling

### Key Components
- **Whisper Encoder**: Pre-trained Whisper-large-v2 provides content representations
- **Text Encoder**: Converts phoneme sequences to hidden representations
- **Flow-based Duration Predictor**: Stochastic duration modeling with monotonic alignment search
- **Decoder / Vocoder**: HiFi-GAN style vocoder with residual blocks
- **Speaker Conditioning**: Global style token (GST) style speaker embedding (256-dim)
- **Language Conditioning**: Language ID embedding for cross-lingual control

### Training Strategy
1. Train whole model on cross-lingual datasets (TTS + VC joint objective)
2. Freeze speaker-related components, fine-tune content-related structures on mono-lingual data
3. This enables cross-lingual emotional synthesis without accent

## Technical Specifications

| Parameter | Value |
|-----------|-------|
| Inter channels | 192 |
| Hidden channels | 192 |
| Filter channels | 768 |
| Attention heads | 2 |
| Layers | 6 |
| Kernel size | 3 |
| Resblock | "1" |
| Upsample rates | [10, 8, 2, 2] |
| Upsample initial channel | 512 |
| Segment size | 8000 |
| Sampling rate | 16000 Hz |
| Mel channels | 80 |
| Hop length | 320 |
| Window length | 1024 |
| Speaker embedding dim | 256 |

## Dependencies

- Python 3.7
- PyTorch 1.13.0
- transformers 4.25.1
- librosa 0.9.2
- Cython 0.29.21
- phonemizer 2.2.1
- scipy, numpy, matplotlib, tensorboard, tqdm, soundfile, webrtcvad

Additional system dependencies:
- espeak (English phonemization)
- pypinyin + jieba (Chinese phonemization)
- pyopenjtalk (Japanese phonemization)

## Datasets

- **VCTK**: English multi-speaker corpus
- **Aishell3**: Chinese multi-speaker corpus
- **JVS**: Japanese multi-speaker corpus
- **ESD**: Emotional Speech Dataset (for emotional TTS/VC training)

## Inference Scripts

| Script | Purpose |
|--------|---------|
| `inference-cross-lingual-TTS-cn.py` | Chinese cross-lingual TTS |
| `inference-cross-lingual-TTS-en.py` | English cross-lingual TTS |
| `inference-cross-lingual-emotional-TTS-en.py` | Emotional English TTS |
| `inference-cross-lingual-emotional-VC.py` | Emotional voice conversion |

## Training Pipeline

1. **Preprocess-resample**: Downsample to 16KHz
2. **Preprocess-whisper**: Generate Whisper encoder outputs (`preprocess_weo.py`)
3. **Preprocess-g2p**: Grapheme-to-phoneme conversion (English/Japanese/Chinese)
4. **Train**: Joint TTS+VC training with JSON config
5. **Freeze-finetune**: Freeze speaker parts, fine-tune content parts

## Config Files

- `configs/cross-lingual.json`: Base cross-lingual TTS+VC config
- `configs/cross-lingual-emotional.json`: Emotional variant
- `configs/cross-lingual-freezefinetune-en.json`: Freeze-finetune for English
- `configs/cross-lingual-emotional-freezefinetune-en.json`: Emotional freeze-finetune

## Key Files Summary

| File | Description |
|------|-------------|
| `models_whisper_hier_multi_pure.py` | Main model definition (~987 lines, 36KB) |
| `train_whisper_hier_multi_pure_3.py` | Training script for cross-lingual TTS+VC |
| `train_whisper_hier_multi_pure_3_freeze.py` | Freeze-finetune training script |
| `train_whisper_hier_multi_pure_esd.py` | Emotional training script |
| `preprocess_weo.py` | Whisper encoder feature extraction |
| `attentions.py` | Attention mechanisms |
| `modules.py` | Neural network modules |
| `transforms.py` | Audio transforms |
| `monotonic_align/` | Cython-based monotonic alignment search |
| `text_cn/` | Chinese text processing (pinyin, symbols, cleaners) |

## References

- VITS: https://github.com/jaywalnut310/vits
- LoRA-SVC: https://github.com/PlayVoice/lora-svc
- ConsistencyVC: https://github.com/ConsistencyVC/ConsistencyVC-voive-conversion
- FreeVC: https://github.com/OlaWod/FreeVC
- VITS-jvs: https://github.com/zassou65535/VITS

## Pretrained Models

Available on Google Drive and HuggingFace: https://huggingface.co/x-e-speech/x-e-speech
