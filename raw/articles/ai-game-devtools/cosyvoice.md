# CosyVoice - README + Project Analysis

Source: https://github.com/FunAudioLLM/CosyVoice
Date: 2026-04-21

## README Content (Full)

CosyVoice is an advanced text-to-speech (TTS) system based on large language models (LLM), developed by **FunAudioLLM** (part of Alibaba/DAMO Academy).

### Versions

**Fun-CosyVoice 3.0** (Latest - 2025/12)
- Paper: https://arxiv.org/pdf/2505.17589
- Model: 0.5B parameters
- ModelScope: FunAudioLLM/Fun-CosyVoice3-0.5B-2512
- HuggingFace: FunAudioLLM/Fun-CosyVoice3-0.5B-2512

**CosyVoice 2.0** (2024/12)
- Paper: https://arxiv.org/pdf/2412.10117
- Model: 0.5B parameters
- ModelScope: iic/CosyVoice2-0.5B
- HuggingFace: FunAudioLLM/CosyVoice2-0.5B

**CosyVoice 1.0** (2024/07)
- Paper: https://funaudiollm.github.io/pdf/CosyVoice_v1.pdf
- Model: 300M parameters
- ModelScope: iic/CosyVoice-300M
- HuggingFace: FunAudioLLM/CosyVoice-300M

### Key Features (v3.0)

1. **Language Coverage**: 9 common languages (Chinese, English, Japanese, Korean, German, Spanish, French, Italian, Russian), 18+ Chinese dialects/accents (Guangdong, Minnan, Sichuan, Dongbei, Shan3xi, Shan1xi, Shanghai, Tianjin, Shandong, Ningxia, Gansu, etc.)
2. **Zero-shot voice cloning**: Multi-lingual and cross-lingual zero-shot voice cloning
3. **Content Consistency**: SOTA in content consistency, speaker similarity, and prosody naturalness
4. **Pronunciation Inpainting**: Chinese Pinyin and English CMU phonemes pronunciation control
5. **Text Normalization**: Built-in handling of numbers, special symbols, text formats (no traditional frontend needed)
6. **Bi-Streaming**: Text-in streaming + audio-out streaming, latency as low as 150ms
7. **Instruct Support**: Languages, dialects, emotions, speed, volume controls via instructions

### Evaluation Results

Fun-CosyVoice3-0.5B-2512 achieves:
- test-zh CER: 1.21% (Human: 1.26%)
- test-zh SS: 78.0% (Human: 75.5%)
- test-en WER: 2.24%
- test-en SS: 71.8%
- test-hard CER: 6.71%
- test-hard SS: 75.8%

The RL-trained variant (Fun-CosyVoice3-0.5B-2512_RL) achieves even better:
- test-zh CER: 0.81%, test-en WER: 1.68%, test-hard CER: 5.44%

### Architecture

- LLM-based TTS pipeline
- Flow matching for speech synthesis
- Speaker embedding extraction
- Audio tokenization via FunCodec
- vLLM support for accelerated inference
- TensorRT-LLM integration (4x speedup over HF transformers)
- Docker-based deployment (gRPC + FastAPI)

### Key Source Files

- `example.py` — Usage examples for all models
- `webui.py` — Gradio web demo
- `vllm_example.py` — vLLM accelerated inference
- `tools/extract_embedding.py` — Speaker embedding extraction
- `tools/extract_speech_token.py` — Speech token extraction
- `tools/make_parquet_list.py` — Data preparation
- `runtime/triton_trtllm/` — TensorRT-LLM deployment
- `runtime/python/grpc/` — gRPC server/client
- `runtime/python/fastapi/` — FastAPI server/client
- `examples/libritts/cosyvoice3/` — Training scripts for v3
- `examples/libritts/cosyvoice2/` — Training scripts for v2 (with GRPO DPO support)

### Dependencies

Python-based stack: torch 2.3.1, torchaudio 2.3.1, transformers 4.51.3, diffusers 0.29.0, lightning 2.2.4, gradio 5.4.0, deepspeed 0.15.1, conformer 0.3.2, pyworld 0.3.4, wetext 0.0.4 (text normalization).

### License

Apache 2.0

## Project Analysis

CosyVoice is one of the most capable open-source TTS systems for game development due to:
- Zero-shot voice cloning enables NPC voice creation from reference audio
- Multi-language support (9 languages) for international game releases
- Emotion/style control via instructions for character voice acting
- Streaming mode for real-time dialogue generation
- Very low latency (150ms) suitable for interactive use
- Pronunciation inpainting for precise control over proper nouns

The 0.5B model size is reasonable for local deployment on consumer GPUs. The RL-trained variant offers significant quality improvements.
