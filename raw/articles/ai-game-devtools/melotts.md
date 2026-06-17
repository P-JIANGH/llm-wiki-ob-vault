# MeloTTS — Raw Source

**Source:** https://github.com/myshell-ai/MeloTTS
**Captured:** 2026-04-21

## README Summary

MeloTTS is a high-quality multi-lingual text-to-speech library by MIT and MyShell.ai.

### Supported Languages
- English (American, British, Indian, Australian, Default)
- Spanish
- French
- Chinese (mixed EN)
- Japanese
- Korean

### Key Features
- Chinese speaker supports mixed Chinese and English
- Fast enough for CPU real-time inference

### Usage
- Use without Installation (docs/quick_use.md)
- Install and Use Locally (docs/install.md)
- Training on Custom Dataset (docs/training.md)
- Python API available
- Model cards on HuggingFace

### Authors
- Wenliang Zhao (Tsinghua University)
- Xumin Yu (Tsinghua University)
- Zengyi Qin (project lead, MIT and MyShell)

### License
MIT License — free for commercial and non-commercial use.

### Architecture (from source code)

**Core Module:** `melo/`

| File | Purpose |
|------|---------|
| `api.py` | Main TTS class — text-to-speech inference pipeline, sentence splitting, audio output |
| `models.py` | SynthesizerTrn model — VITS2-based architecture with TextEncoder, Generator, DurationPredictor, StochasticDurationPredictor, ResidualCouplingBlock, PosteriorEncoder, TransformerCouplingBlock, DurationDiscriminator |
| `modules.py` | Neural building blocks — FFT, Attention, ConvFlow, ResidualCouplingLayer, ResBlock, DDSConv, WN, LayerNorm |
| `attentions.py` | Transformer encoder/decoder, multi-head self-attention, relative positional encoding |
| `train.py` | Training loop, loss computation, optimizer setup |
| `main.py` | CLI entry point (`melotts` / `melo` commands) |
| `app.py` | Gradio Web UI entry point (`melo-ui` command) |
| `mel_processing.py` | Mel spectrogram computation (Hann window, librosa-based) |
| `utils.py` | TTS inference text processing — BERT embeddings, phone/tones extraction |
| `download_utils.py` | HuggingFace model/config auto-download |
| `split_utils.py` | Multi-language sentence splitting |
| `commons.py` | Utility functions — sequence masking, padding, init weights, rand slice |
| `text/` | Language-specific text processing (g2p, phonemizer for each language) |
| `monotonic_align/` | Monotonic alignment search (CTC-style alignment for duration prediction) |

### Model Architecture (VITS2-based)
- **TextEncoder**: Embeds phonemes + tones + language IDs + BERT features (1024-dim for EN, 768-dim for JA)
- **StochasticDurationPredictor**: Normalizing flow-based duration prediction (VITS2 enhancement)
- **DurationDiscriminator**: Adversarial duration training (VITS2)
- **PosteriorEncoder**: Encodes mel spectrograms to latent space
- **ResidualCouplingBlock**: Flow-based prior for acoustic modeling
- **Generator**: HiFi-GAN style vocoder (upsample + multi-receptive field fusion)

### Dependencies
- PyTorch, torchaudio
- transformers (4.27.4) for BERT features
- librosa, soundfile, pydub for audio processing
- Language-specific: jieba, pypinyin, cn2an (Chinese); mecab, pykakasi, fugashi (Japanese); jamo, g2pkk (Korean); gruut (German/Spanish/French); g2p_en, eng_to_ipa (English)
- Gradio for Web UI
- langid for automatic language detection

### CLI Commands
- `melotts` / `melo` — command-line TTS
- `melo-ui` — Gradio web interface
