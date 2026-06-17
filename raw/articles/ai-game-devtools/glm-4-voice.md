# GLM-4-Voice — Raw Source

**Source:** https://github.com/THUDM/GLM-4-Voice
**Extraction Method:** web_extract (GitHub/gitcode/gitee clone all failed due to network timeout)
**Date:** 2026-04-21

---

## Project Overview

**GLM-4-Voice** is an end-to-end voice model developed by Zhipu AI (智谱AI / THUDM). It enables direct understanding and generation of Chinese and English speech, supports real-time voice conversations, and allows users to dynamically modify speech attributes (emotion, intonation, speech rate, dialect) via natural language instructions.

## Architecture

The system is composed of three specialized, interoperable components:

### 1. GLM-4-Voice-Tokenizer (Speech Tokenizer)
- Built on the Whisper encoder with added vector quantization
- Converts continuous audio into discrete tokens at a fixed rate of **12.5 tokens per second**
- HuggingFace: `THUDM/glm-4-voice-tokenizer`

### 2. GLM-4-Voice-9B (Chat Model)
- Pre-trained and aligned on speech modalities based on GLM-4-9B
- Handles understanding and generation of discretized speech tokens
- Supports both Chinese and English
- HuggingFace: `THUDM/glm-4-voice-9b`

### 3. GLM-4-Voice-Decoder (Speech Decoder)
- Streaming speech decoder retrained from CosyVoice (Flow Matching)
- Converts discrete tokens back to continuous audio
- **Low-latency feature**: Generation begins with as few as **10 audio tokens** (20 tokens for text-referenced synthesis)
- **Important**: Does NOT support `transformers` initialization — checkpoints must be downloaded manually
- HuggingFace: `THUDM/glm-4-voice-decoder`

## Training Strategy

The Speech2Speech task is decoupled into two sub-tasks:
1. "根据用户音频做出文本回复" — Generate text response from user audio
2. "根据文本回复和用户语音合成回复语音" — Synthesize response speech from text + user audio

**Base Model:** GLM-4-9B
**Training Data:** Millions of hours of audio + hundreds of billions of tokens of interleaved speech-text data
**Pre-training:** Uses synthetic interleaved speech-text data to adapt the base LLM for audio understanding and modeling

## Streaming Thinking Architecture

- Alternates text & speech output in a streaming fashion
- Speech generation references text output to maintain high linguistic quality
- Ultra-low latency: Voice synthesis can begin after generating just **20 tokens**

## Capabilities

### Instruction-Driven Voice Modulation
- 🎭 **Emotion Control**: "Use a gentle voice to guide me to relax", "Tell a ghost story with a mournful voice"
- 🗣️ **Dialect Generation**: Northeastern dialect, Chongqing dialect, Beijing accent
- ⚡ **Speech Rate Adjustment**: "Increase the speech rate", "Even faster"
- 🎙️ **Roleplay/Commentary**: "Use an excited voice to commentate a football match"

### Input/Output
- Accepts voice or text input
- Returns synchronized voice + text responses
- Includes preset cases for emotion control, speed adjustment, and dialect generation

## Usage

### Docker
```bash
zhipuai/glm-4-voice:0.1
```

### Model Server
```bash
# Standard (bfloat16)
python model_server.py --host localhost --model-path THUDM/glm-4-voice-9b --port 10000 --dtype bfloat16 --device cuda:0

# Low-memory (Int4 precision)
python model_server.py --host localhost --model-path THUDM/glm-4-voice-9b --port 10000 --dtype int4 --device cuda:0
```

### Web Demo
```bash
python web_demo.py --tokenizer-path THUDM/glm-4-voice-tokenizer --model-path THUDM/glm-4-voice-9b --flow-path ./glm-4-voice-decoder
```
- Access at: `http://127.0.0.1:8888`
- Auto-downloads tokenizer & 9B model. Decoder must be downloaded manually.

### Known Issues
- Gradio streaming instability: real-time audio playback in web UI may be unstable
- Workaround: Click the generated audio file in the dialogue box after generation completes for higher quality

## License

| Component | License |
|---|---|
| Repository Code | Apache 2.0 |
| Model Weights | Custom GLM-4 Model License Agreement |

## Academic Citations

```bibtex
@misc{zeng2024glm4,
  title={GLM-4-Voice: Towards Intelligent and Human-Like End-to-End Spoken Chatbot},
  author={Aohan Zeng and Zhengxiao Du and Mingdao Liu and Kedong Wang and Shengmin Jiang and Lei Zhao and Yuxiao Dong and Jie Tang},
  year={2024},
  eprint={2412.02612},
  archivePrefix={arXiv},
  primaryClass={cs.CL}
}
@misc{zeng2024scaling,
  title={Scaling Speech-Text Pre-training with Synthetic Interleaved Data},
  author={Aohan Zeng and Zhengxiao Du and Mingdao Liu and Lei Zhang and Shengmin Jiang and Yuxiao Dong and Jie Tang},
  year={2024},
  eprint={2411.17607},
  archivePrefix={arXiv},
  primaryClass={cs.CL}
}
```

## Key Resources
- Technical Report: https://arxiv.org/abs/2412.02612
- HuggingFace: https://huggingface.co/THUDM/glm-4-voice-9b
- ModelScope Demo: https://modelscope.cn/studios/ZhipuAI/GLM-4-Voice-Demo
- Twitter: https://twitter.com/thukeg
