# Mini-Omni — Raw Source

> Extracted: 2026-04-21
> Source: https://github.com/gpt-omni/mini-omni
> Archive status: Clone failed (GitHub timeout, gitcode 403, gitee unavailable)

---

## Project Overview

Mini-Omni is an open-source multimodal large language model designed to **hear, talk while thinking**. It delivers real-time, end-to-end speech input with streaming audio output for seamless conversational AI.

## Core Features

- **Real-time speech-to-speech**: Eliminates the need for external ASR or TTS models.
- **Talking while thinking**: Generates text and audio simultaneously.
- **Streaming audio output**: Enables low-latency, continuous conversational responses.
- **Batch inference**: Supports "Audio-to-Text" and "Audio-to-Audio" pipelines.

## Architecture & Tech Stack

| Component | Technology Used |
|:---|:---|
| **LLM Backbone** | [Qwen2](https://github.com/QwenLM/Qwen2/) |
| **Training/Inference** | [litGPT](https://github.com/Lightning-AI/litgpt/) |
| **Audio Encoding** | [Whisper](https://github.com/openai/whisper/) |
| **Audio Decoding** | [SNAC](https://github.com/hubertsiuzdak/snac/) |
| **Synthetic Speech** | [CosyVoice](https://github.com/FunAudioLLM/CosyVoice) |
| **Alignment Data** | [OpenOrca](https://huggingface.co/datasets/Open-Orca/OpenOrca) & [MOSS](https://github.com/OpenMOSS/MOSS/tree/main) |

## Quick Start

### Server
```bash
python server.py --host '0.0.0.0' --port 60808
```

### Streamlit Demo
```bash
pip install PyAudio==0.2.14
API_URL=http://0.0.0.0:60808/chat streamlit run webui/omni_streamlit.py
```

### Gradio Demo
```bash
API_URL=http://0.0.0.0:60808/chat python3 webui/omni_gradio.py
```

## Critical Notes

- **Language Support**: Trained exclusively on English. Can comprehend other languages (via Whisper encoder) but outputs only in English.
- **post_adapter / TTS Adapter**: The `post_adapter` in the codebase refers to `tts-adapter`, but the open-source release does NOT support it.
- **Module Import Errors**: If encountering `ModuleNotFoundError: No module named 'utils.xxxx'`, run `export PYTHONPATH=./`. Do NOT run `pip install utils`.
- **Remote Streamlit Limitation**: Cannot run remotely; requires local execution with PyAudio.

## Recent Updates

- **2024.10**: Released Mini-Omni2 (adds vision + audio capabilities).
- **2024.09**: Official interactive Gradio demo launched by the Hugging Face team.
- **2024.09**: VoiceAssistant-400K training dataset published.

## Project Metadata

- **License**: MIT
- **Language**: Python (100%)
- **GitHub Stats**: 3.5k Stars, 308 Forks, 79 Watchers
- **Key Links**:
  - Hugging Face Model: https://huggingface.co/gpt-omni/mini-omni
  - Technical Report (arXiv): https://arxiv.org/abs/2408.16725
  - Training Dataset: https://huggingface.co/datasets/gpt-omni/VoiceAssistant-400K
  - Mini-Omni2: https://github.com/gpt-omni/mini-omni2
