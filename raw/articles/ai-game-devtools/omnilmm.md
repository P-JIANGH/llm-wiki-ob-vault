# OmniLMM (OpenBMB MiniCPM-V & MiniCPM-o)

> Source: https://github.com/OpenBMB/OmniLMM
> Cloned: ~/tmp/ai-game-devtools/omnilmm/
> Date: 2026-04-14

## Overview

OmniLMM is the unified repository for **MiniCPM-V** (vision-language models) and **MiniCPM-o** (omni-modal models supporting vision + speech). Developed by [OpenBMB](https://github.com/OpenBMB) / Beijing Academy of Artificial Intelligence.

## Key Models

### MiniCPM-o 4.5 (latest, 2026-02-03)
- **9B total parameters**, end-to-end multimodal
- Built on SigLip2 + Whisper-medium + CosyVoice2 + Qwen3-8B
- **Full-duplex multimodal live streaming**: concurrent video+audio input ↔ text+speech output, no blocking
- **Proactive interaction** at 1Hz decision frequency
- **Bilingual real-time speech conversation** (English/Chinese), voice cloning
- Visual: 77.6 OpenCompass avg, surpasses GPT-4o, approaches Gemini 2.5 Flash
- OCR: State-of-the-art on OmniDocBench, outperforms Gemini-3 Flash and GPT-5
- Supports 30+ languages
- WebRTC demo, llama.cpp-omni inference, int4/GGUF quantization, vLLM, SGLang, Ollama

### MiniCPM-V 4.0 (2025-08-02)
- **4B parameters**, outperforms GPT-4.1-mini in image understanding
- Designed for on-device phone deployment

### MiniCPM-V 4.5 (2025-08-26)
- Outperforms GPT-4o-latest, Gemini-2.0 Pro, Qwen2.5-VL 72B
- Supported by llama.cpp, vLLM, LLaMA-Factory (official)

### MiniCPM-o 2.6 (2025-01-13)
- Matches GPT-4o-202405 on vision, speech, and multimodal live streaming
- Supported by Align-Anything (DPO + SFT fine-tuning)

## Architecture

- **End-to-end omni-modal**: Modality encoders/decoders densely connected to LLM via hidden states
- **Full-Duplex Streaming**: Offline encoders converted to online, full-duplex; TDM (time-division multiplexing) synchronizes all streams in ms
- **Proactive Interaction**: LLM monitors video+audio at 1Hz, decides to speak or not
- **Configurable Speech Modeling**: Audio system prompt for voice cloning and role-play

## Supported Frameworks
- FlagOS, vLLM, SGLang, llama.cpp, Ollama, LLaMA-Factory, SWIFT

## Evaluation Results (MiniCPM-o 4.5)
- OpenCompass: 77.6 (Instruct mode)
- MMBench EN v1.1: 87.6
- MMBench CN v1.1: 87.2
- MathVista: 80.1
- OCRBench: 876
- MMHal-Score: 4.7

## Repository Structure
```
finetune/          # Fine-tuning code (trainer.py, dataset.py, finetune.py)
eval_mm/           # Evaluation suite (vlmevalkit)
web_demos/         # Web demo applications (Gradio/Streamlit)
docs/              # Model-specific documentation
assets/            # Images and diagrams
```

## License
Not explicitly stated in README; check individual model HuggingFace pages.

## Related Links
- HuggingFace: https://huggingface.co/openbmb/MiniCPM-o-4_5
- Demo: https://openbmb.github.io/MiniCPM-o-Demo/
- Cookbook: https://github.com/OpenSQZ/MiniCPM-V-CookBook
