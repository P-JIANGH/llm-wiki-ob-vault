# OpenVoice — Instant Voice Cloning

**Source:** https://github.com/myshell-ai/OpenVoice
**Captured:** 2026-04-21

## README Summary

OpenVoice is an instant voice cloning framework by MyShell AI. It provides:

1. **Accurate Tone Color Cloning** — clone reference tone color and generate speech in multiple languages and accents
2. **Flexible Voice Style Control** — granular control over emotion, accent, rhythm, pauses, intonation
3. **Zero-shot Cross-lingual Voice Cloning** — neither generated speech language nor reference language needs to be in training dataset

**V2 (April 2024):** Better audio quality, native multi-lingual support (English, Spanish, French, Chinese, Japanese, Korean), MIT License (free commercial use).

Powering myshell.ai instant voice cloning since May 2023, used tens of millions of times by Nov 2023.

## Architecture & Key Modules

**Package:** `MyShell-OpenVoice` (Python >= 3.9)

### Core API (`openvoice/api.py`)
- `OpenVoiceBaseClass` — base class for all voice models
- `BaseSpeakerTTS` — text-to-speech with built-in speaker voices (English/Chinese)
- `ToneColorConverter` — voice style transfer module
  - `extract_se()` — extracts speaker embedding from reference audio
  - `convert()` — converts audio source voice to target voice with watermark support
  - `add_watermark()` / `detect_watermark()` — built-in watermark for provenance

### Speaker Extractor (`openvoice/se_extractor.py`)
- `split_audio_whisper()` — uses Whisper to split audio into segments by word timestamps
- `split_audio_vad()` — uses VAD (Voice Activity Detection) to split audio
- `get_se()` — main entry point: takes audio → splits → extracts speaker embedding (se.pth)

### Model Architecture (`openvoice/models.py`)
- `SynthesizerTrn` — VITS-based synthesizer with reference encoder (ref_enc)
- Uses attention mechanisms, flow matching, and neural vocoding

### Dependencies
- librosa, faster-whisper, pydub, wavmark (watermarking)
- numpy, pypinyin, cn2an, jieba (Chinese text processing)
- gradio (web UI), langid (language detection)
- whisper-timestamped (aligned transcription)

## License
MIT (V1 and V2) — free for commercial and research use.

## Key Files
- `openvoice/api.py` — Main API classes (BaseSpeakerTTS, ToneColorConverter)
- `openvoice/models.py` — SynthesizerTrn model definition
- `openvoice/se_extractor.py` — Speaker embedding extraction pipeline
- `openvoice/modules.py` — Neural network modules
- `openvoice/attentions.py` — Attention mechanisms
- `docs/USAGE.md` — Detailed usage instructions
- `demo_part1.ipynb` — Basic voice cloning demo
- `demo_part2.ipynb` — Advanced usage demo
- `demo_part3.ipynb` — Cross-lingual voice cloning demo

## Main Contributors
- Zengyi Qin (MIT), Wenliang Zhao (Tsinghua), Xumin Yu (Tsinghua), Ethan Sun (MyShell)

## Paper
"OpenVoice: Versatile Instant Voice Cloning" (arXiv:2312.01479)
