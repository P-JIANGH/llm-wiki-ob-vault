# Linly-Talker — Digital Human Intelligent Dialogue System

**Source**: https://github.com/Kedreamix/Linly-Talker
**Extracted**: 2026-04-19
**License**: MIT

## Project Overview

Linly-Talker is an innovative digital human conversation system that integrates:
- **LLM** (Large Language Models): Linly, Qwen, Gemini-Pro, ChatGPT, ChatGLM, GPT4Free
- **ASR** (Automatic Speech Recognition): Whisper, FunASR (Alibaba), OmniSenseVoice
- **TTS** (Text-to-Speech): Edge TTS, PaddleTTS, Microsoft TTS
- **Voice Cloning**: GPT-SoVITS, XTTS, CosyVoice
- **THG/Avatar** (Talking Head Generation): SadTalker, Wav2Lip, Wav2Lipv2, ER-NeRF, MuseTalk
- **Gradio WebUI**: Unified interface for multi-model, multi-option workflows
- **Linly-Talker-Stream** (2026.02): WebRTC-based real-time streaming interactive architecture with full-duplex conversation and barge-in support

## Key Features

1. **Multi-Model Integration**: Combines LLM + ASR + TTS + Avatar models for complete digital human dialogue pipeline
2. **Multi-Turn Conversational Ability**: GPT-powered context-aware dialogue maintaining coherent conversations
3. **Voice Cloning**: Upload 1-minute voice sample for fine-tuning, clone voice for digital human
4. **Real-Time Interaction**: Supports real-time speech recognition and video captioning
5. **Visual Enhancement**: Realistic digital human avatars from uploaded images
6. **Image-based Dialogue**: Upload any image for the digital person to converse

## Architecture

```
User Input (Text/Voice/Image)
  → ASR (Whisper/FunASR) [speech→text]
  → LLM (Linly/Qwen/Gemini/ChatGPT/ChatGLM) [text→response]
  → TTS (Edge/Paddle/Microsoft/CosyVoice/GPT-SoVITS) [text→audio]
  → Avatar (SadTalker/Wav2Lip/MuseTalk/ER-NeRF) [audio→video]
  → Output: Digital human response video with subtitles
```

## Key Files

| File | Purpose |
|------|---------|
| `webui.py` (55KB) | Main Gradio WebUI with multimodal module selector |
| `app.py` | Basic dialogue app |
| `app_img.py` | Image-based conversation app |
| `app_multi.py` | Multi-turn dialogue app |
| `app_musetalk.py` | MuseTalk real-time conversation app |
| `app_talk.py` | Free voice/image generation without dialogue scenario |
| `app_vits.py` | GPT-SoVITS voice cloning app |
| `configs.py` | Configuration (ports, model paths, SSL certs) |
| `src/` | Core source modules (12 subdirectories) |
| `ASR/` | Speech recognition modules (Whisper, FunASR) |
| `TTS/` | Text-to-speech modules (Edge, Paddle) |
| `TFG/` | Talking face generation (SadTalker, Wav2Lip, MuseTalk, ER-NeRF) |
| `VITS/` | GPT-SoVITS voice cloning |
| `LLM/` | LLM integration |
| `CosyVoice/` | CosyVoice TTS and voice cloning |
| `Musetalk/` | MuseTalk real-time avatar |
| `NeRF/` | NeRF-based avatar generation |
| `api/` | FastAPI endpoints |
| `ChatTTS/` | ChatTTS integration |

## Dependencies

- Python 3.10, PyTorch 2.4.1 (CUDA 11.8/12.1/12.4)
- Gradio 4.x, FFmpeg 4.2.2
- OpenMIM (mmengine, mmcv, mmdet, mmpose) for MuseTalk
- PyTorch3D for NeRF-based models
- Docker deployment supported (AutoDL/codewithgpu images available)

## License

MIT License

## Notable Updates Timeline

- 2023.12: Image upload support
- 2024.01: GeminiPro + Qwen integration, multi-turn GPT dialogue
- 2024.02: Gradio 4.16, FunASR, Wav2Lip, GPT-SoVITS, WebUI
- 2024.04: Offline Paddle TTS, ER-NeRF
- 2024.05: AutoDL deployment, WebUI multi-module support
- 2024.06: MuseTalk integration, WebUI optimization (3 main functions)
- 2024.08: CosyVoice integration, Wav2Lipv2
- 2024.09: API documentation
- 2024.12: Edge-TTS bug fix, MuseTalk fixes
- 2025.02: OmniSenseVoice for faster ASR
- 2026.02: **Linly-Talker-Stream** — WebRTC real-time streaming, full-duplex, barge-in support
