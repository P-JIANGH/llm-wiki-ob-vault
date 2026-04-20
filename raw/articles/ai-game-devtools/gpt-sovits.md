# GPT-SoVITS-WebUI — Raw Source Analysis

**Source:** https://github.com/RVC-Boss/GPT-SoVITS
**Cloned:** 2026-04-21
**Clone method:** GitHub direct (success)

## README Summary

GPT-SoVITS-WebUI is a powerful few-shot voice conversion and text-to-speech WebUI.

### Key Features
1. **Zero-shot TTS:** Input a 5-second vocal sample for instant text-to-speech conversion
2. **Few-shot TTS:** Fine-tune with just 1 minute of training data for improved voice similarity
3. **Cross-lingual Support:** Inference in English, Japanese, Korean, Cantonese and Chinese
4. **WebUI Tools:** Integrated voice accompaniment separation (UVR5), automatic training set segmentation, Chinese ASR, and text labeling

### Version History
- **V1:** Original release with zero/few-shot TTS
- **V2:** Added Korean and Cantonese support, optimized text frontend, 5k hour pretraining
- **V3:** Higher timbre similarity, less training data needed, GPT model more stable with fewer repetitions
- **V4:** Fixed metallic artifacts from v3, native 48k audio output (v3 was 24k)
- **V2Pro:** Slightly higher VRAM than v2, surpasses v4 performance at v2's hardware cost and speed

### Performance
- RTF: 0.028 on RTX 4060Ti, 0.014 on RTX 4090 (1400 words ≈ 4min audio, inference 3.36s), 0.526 on M4 CPU
- HuggingFace demo available

### Architecture
The system uses a two-stage pipeline:
1. **GPT Model (s1):** Auto-regressive text-to-token generation (Bert-based, 25Hz)
2. **SoVITS Model (s2):** VITS-based voice synthesis from semantic tokens

### Key Modules (from GPT_SoVITS/ directory)
- `module/models.py` — SoVITS generator/discriminator architecture (attentions, VQ, MRTE)
- `TTS_infer_pack/` — Inference pipeline with text segmentation
- `prepare_datasets/` — Dataset preparation pipeline (text extraction, Hubert features, semantic tokens)
- `text/` — Multilingual text frontend (zh_normalization, english, japanese, korean, g2pw for Chinese pinyin)
- `eres2net/` — ERes2NetV2 speaker verification model for v2Pro
- `stream_v2pro.py` — Streaming inference for v2Pro

### WebUI Ports
- Main WebUI: 9874
- UVR5 (vocal separation): 9873
- Inference TTS: 9872
- Subfix (ASR proofreading): 9871
- API: 9880

### Dependencies (from requirements.txt)
- PyTorch 2.5.1+ with CUDA 12.4/12.8
- PyTorch Lightning, Gradio <5
- FunASR (Chinese ASR), Faster Whisper (non-Chinese ASR)
- Transformers (4.43-4.50), PEFT for LoRA
- Librosa, SoundFile, FFmpeg for audio processing
- Multilingual text processing: pyopenjtalk (Japanese), g2p_en, g2pk2 (Korean), ToJyutping (Cantonese), G2PW (Chinese)
- FastAPI for REST API (api.py, api_v2.py)

### Dataset Format
`.list` file format: `vocal_path|speaker_name|language|text`
Languages: zh (Chinese), ja (Japanese), en (English), ko (Korean), yue (Cantonese)

### Installation
- Supports conda environment (Python 3.9-3.12)
- Windows integrated package available
- Docker support (CU126/CU128, Lite variants)
- Apple Silicon support (MPS/CPU)
- Pretrained models from HuggingFace

### License: MIT

### Credits/Dependencies
- ar-vits, SoundStorm, vits, TransferTTS, contentvec, hifi-gan
- Chinese Speech Pretrain (Tencent), BigVGAN (NVIDIA), eresnetv2
- paddlespeech zh_normalization, g2pW, pypinyin-g2pW
- ultimatevocalremovergui, audio-slicer, FFmpeg, gradio, faster-whisper, FunASR
