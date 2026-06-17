# FireRedTTS-2 Raw Source

## GitHub
https://github.com/FireRedTeam/FireRedTTS2

## Paper
https://arxiv.org/abs/2509.02020

## Demo
https://fireredteam.github.io/demos/firered_tts_2/

## Hugging Face
https://huggingface.co/FireRedTeam/FireRedTTS2

## License
Apache 2.0

## Overview
FireRedTTS‑2 is a long-form streaming TTS system for multi-speaker dialogue generation, delivering stable, natural speech with reliable speaker switching and context-aware prosody.

## Key Features
- **Long Conversational Speech Generation**: Supports 3-minute dialogues with 4 speakers, scalable to longer conversations
- **Multilingual Support**: English, Chinese, Japanese, Korean, French, German, Russian; zero-shot voice cloning for cross-lingual/code-switching
- **Ultra-Low Latency**: 12.5Hz streaming speech tokenizer + dual-transformer architecture, first-packet latency as low as 140ms on L20 GPU
- **Strong Stability**: High similarity and low WER/CER in monologue and dialogue tests
- **Random Timbre Generation**: Useful for creating ASR/speech interaction data

## Architecture
- **Dual-Transformer Architecture**: Text-speech interleaved sequence processing (inspired by Moshi and Sesame CSM)
- **12.5Hz Streaming Speech Tokenizer**: Novel low-frequency tokenization
- **LLM Backbone**: Based on Qwen2.5-1.5B text tokenizer solution
- **Audio Codec**: Vocos-based acoustic decoder (referenced from Xcodec2)
- **Context Management**: Segment-based context window with speaker tags [S1]-[S4]
- **bf16 Support**: VRAM reduced from 14GB to 9GB for consumer-grade GPU deployment

## Project Structure
```
fireredtts2/
├── __init__.py
├── fireredtts2.py        # Main inference class (FireRedTTS2 + FireRedTTS2_Stream)
├── codec/                # Audio codec modules
│   ├── audio.py
│   ├── decoder.py
│   ├── model.py
│   ├── rvq.py
│   ├── utils.py
│   └── whisper.py
├── llm/                  # LLM backbone modules
│   ├── __init__.py
│   ├── llm.py
│   ├── modules.py
│   └── utils.py
└── utils/
    └── spliter.py        # Text cleaning and splitting
```

## Key Classes
- `FireRedTTS2`: Main inference class supporting monologue and dialogue generation
- `FireRedTTS2_Stream`: Streaming variant with generator-based token-by-token output
- `RedCodecInfer`: Audio codec for encoding/decoding
- `Segment`: Data structure for text+speaker+audio segments

## Dependencies
- PyTorch 2.7.1 + CUDA 12.6
- torchtune, torchao, transformers, einops
- gradio (Web UI), librosa, optuna, accelerate, tensorboard

## Usage Modes
1. **Dialogue Generation**: Multi-speaker conversation with voice cloning or random voices
2. **Dialogue Streaming**: Token-by-token streaming with 140ms first-packet latency
3. **Monologue Generation**: Single-speaker text-to-speech with optional voice cloning

## Pretrained Models
- `llm_pretrain.pt`: Monologue model
- `llm_posttrain.pt`: Dialogue model
- `codec.pt`: Audio codec weights
- `Qwen2.5-1.5B/`: Text tokenizer

## Notes
- Acknowledges Moshi (kyutai-labs) and Sesame CSM for dual-transformer approach
- Fine-tuning code released (2025/10/26) based on LJSpeech dataset
- Zero-shot voice cloning intended for academic research only
