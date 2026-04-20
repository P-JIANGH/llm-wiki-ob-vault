# WavJourney — Compositional Audio Creation with LLMs

Source: https://github.com/Audio-AGI/WavJourney
ArXiv: https://arxiv.org/abs/2307.14335
Demo: https://audio-agi.github.io/WavJourney_demopage/
HuggingFace: https://huggingface.co/spaces/Audio-AGI/WavJourney

## README Summary

WavJourney is an AI-assisted multimedia storytelling tool that creates compositional audio content from text prompts. Starting with a single text prompt, it generates audio with engaging storylines encompassing personalized speakers, lifelike speech in context, emotionally resonant music compositions, and impactful sound effects.

## Architecture

WavJourney uses a 4-step LLM-driven pipeline:

1. **Text → JSON Script**: GPT-4 converts input text into a structured audio script (JSON) defining foreground/background audio tracks with types (speech/music/sound_effect), timing, volume, and descriptions.

2. **JSON → Character Voice Map**: GPT-4 maps characters in the script to available voice presets (Bark HuBERT quantizer-based voice cloning).

3. **JSON + Voice Map → Python Code**: AudioCodeGenerator compiles the script into a Python program using custom APIs (TTM/TTS/TTA/MIX/CAT).

4. **Python Code → WAV**: Generated Python script is executed to produce the final compositional audio.

## Key Technical Details

### Services Layer (Flask API)
- **TTA (Text-to-Audio)**: Facebook AudioGen model for sound effects
- **TTM (Text-to-Music)**: Facebook MusicGen model for music composition
- **TTS (Text-to-Speech)**: Suno Bark model with HuBERT-based voice cloning
- **VoiceFixer**: Speech restoration for quality improvement
- **VoiceParser**: HuBERT-based voice preset extraction

### Audio Composition APIs
- `TTM`: Text-to-Music (MusicGen)
- `TTS`: Text-to-Speech (Bark + voice presets)
- `TTA`: Text-to-Audio (AudioGen)
- `MIX`: Multi-track audio mixing with offset control
- `CAT`: Sequential audio concatenation
- `COMPUTE_LEN`: Audio duration calculation

### Configuration (config.yaml)
- MusicGen model size: small (configurable: small/medium/large)
- AudioGen model size: medium
- Bark speed: 1.05x
- VoiceFixer: enabled by default
- Voice Parser: CPU device

### Hardware Requirements
- GPU VRAM > 16 GB
- Linux operating system

### Voice Preset System
- Predefined voice presets in `data/voice_presets/`
- Supports custom voice addition via HuBERT quantizer
- Voice presets stored as .npz files with metadata.json
- Includes: child_boy, news_male_speaker, elder_morgen, news_female_speaker, cnn_male_speaker

### Session Management
- Unique session IDs for each Gradio UI load
- Per-session audio output and voice preset paths
- Concurrent request handling via single-threaded Flask (avoid CUDA OOM)

### LLM Integration
- Uses GPT-4 API (requires WAVJOURNEY_OPENAI_KEY env var)
- Prompt templates in `prompts/` directory
- Automatic retry with error feedback (max 3 attempts)
- JSON5 for flexible script parsing

### File Structure
```
wavjourney/
├── pipeline.py           # Main 4-step pipeline
├── code_generator.py     # JSON → Python audio code compiler
├── services.py           # Flask API for TTS/TTM/TTA/VoiceFixer/VoiceParser
├── ui_client.py          # Gradio web UI
├── wavjourney_cli.py     # Command-line interface
├── voice_presets.py      # Voice preset management
├── APIs.py               # TTM/TTS/TTA/MIX/CAT abstractions
├── prompts/              # LLM prompt templates
├── config.yaml           # Model and service configuration
├── data/voice_presets/   # Predefined voice presets (npz + metadata)
├── VoiceParser/          # HuBERT-based voice cloning tools
└── scripts/              # Setup/start/kill scripts
```

## Authors
Xubo Liu, Zhongkai Zhu, Haohe Liu, Yi Yuan, Qiushi Huang, Jinhua Liang, Yin Cao, Qiuqiang Kong, Mark D. Plumbley, Wenwu Wang (University of Surrey et al.)

## License
Not explicitly stated in README (arXiv paper, 2023)

## Key Dependencies
- audiocraft (MusicGen + AudioGen)
- transformers (Bark)
- voicefixer
- openai (GPT-4 API)
- flask
- gradio
- HuBERT (voice parsing)
- nltk (sentence tokenization)
- torch/torchaudio
