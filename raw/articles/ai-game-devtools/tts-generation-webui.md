# TTS Generation WebUI - Source Analysis

**Source:** https://github.com/rsxdalv/tts-generation-webui
**Analyzed:** 2026-04-21

## README Summary

TTS WebUI is an all-in-one text-to-speech web interface that unifies 20+ TTS models and audio tools under a single Gradio + React UI. It serves as a central hub for AI audio generation, supporting both local deployment and Docker.

### Supported Models (Built-in)
- **Bark** (suno-ai/bark) - Neural TTS with speaker emulation
- **Tortoise** (neonbjb/tortoise-tts) - High-quality, slow TTS
- **Maha TTS** (dubverse-ai/MahaTTS) - Multilingual TTS
- **MMS** (facebookresearch/fairseq) - Massive Multilingual Speech
- **Vall-E X** (Plachtaa/VALL-E-X) - Zero-shot TTS
- **StyleTTS2** (sidharthrajaram/StyleTTS2) - Style-controllable TTS
- **SeamlessM4T** (facebookresearch/seamless_communication) - Multilingual translation+speech
- **XTTSv2** (coqui-ai/TTS) - Cross-lingual TTS (extension)
- **MARS5** (camb-ai/mars5-tts) - Expressive TTS (extension)
- **F5-TTS** (SWivid/F5-TTS) - Fast TTS (extension)
- **Parler TTS** (huggingface/parler-tts) - Descriptive TTS (extension)
- **OpenVoice/OpenVoice V2** (myshell-ai/OpenVoice) - Voice cloning (extension)
- **Kokoro TTS** (hexgrad/kokoro) - Lightweight TTS (extension)
- **DIA** (nari-labs/dia) - Dialogue TTS (extension)
- **CosyVoice** (FunAudioLLM/CosyVoice) - Alibaba TTS (extension)
- **GPT-SoVITS** (X-T-E-R/GPT-SoVITS-Inference) - Chinese TTS (extension)
- **Piper TTS** (rhasspy/piper) - Fast local TTS (extension)
- **Kimi Audio 7B Instruct** (Dao-AILab/Kimi-Audio) - Audio instruction model (extension)
- **Chatterbox** (rsxdalv/chatterbox) - Conversational TTS (extension)

### Audio/Music Generation
- **MusicGen** (facebookresearch/audiocraft) - Music generation
- **MAGNeT** (facebookresearch/audiocraft) - Non-autoregressive audio generation
- **Stable Audio** (Stability-AI/stable-audio-tools) - Audio generation

### Audio Conversion/Tools
- **RVC** (RVC-Project) - Voice conversion
- **Demucs** (facebookresearch/demucs) - Source separation
- **Vocos** (gemelo-ai/vocos) - Improved decoder
- **Whisper** (openai/whisper) - Speech recognition
- **AP BWE** (yxlu-0102/AP-BWE) - Bandwidth extension
- **Resemble Enhance** (resemble-ai/resemble-enhance) - Audio enhancement
- **Audio Separator** (nomadkaraoke/python-audio-separator) - Stem separation

### Architecture
- **Backend:** Python/Flask/FastAPI server (server.py)
- **Frontend:** Gradio UI (port 7770) + React UI (port 3000, Next.js 16.2.1)
- **Extension system:** Python packages installed via pip, managed through UI marketplace
- **Database:** SQLite for audio file metadata management
- **Docker:** GPU support via NVIDIA Container Toolkit
- **Installation:** ~10.7 GB base + 2-8 GB per model

### Key Technical Details
- PyTorch 2.11.0 with CUDA 128, xformers 0.0.35
- Python 3.10/3.11 required (3.12 not supported)
- FFmpeg with vorbis support required
- Conda + venv hybrid environment management
- Extension marketplace with iframe-based UI
- OpenAI-compatible TTS API (port 7778)
- Integrations: Silly Tavern, Text Generation WebUI (oobabooga), OpenWebUI

### License
- Codebase: MIT
- Model weights: Various (Bark=MIT, MusicGen=CC BY-NC 4.0, etc.)
- Known non-permissive dependencies: encodec (CC BY-NC 4.0), lameenc (GPL), unidecode (GPL)

### Version
- 1.0.1 (pyproject.toml)

### Notable Features
- Extension marketplace with external catalog
- External extension installer via JSON
- Environment variable manager (dotenv)
- Log viewer extension
- Database API for audio file management
- Comprehensive pytest test suite
- Google Colab support
