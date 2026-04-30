---
title: LLaSM — Speech-Language Multimodal LLM
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [tool, multimodal, open-source, speech, llm]
sources: [raw/articles/ai-game-devtools/llasm.md]
---

# LLaSM — Speech-Language Multimodal LLM

## Overview

**LLaSM** (Large Language and Speech Model) 是首个**支持中英文语音-文本多模态对话的开源可商用**对话模型。由 LinkSoul-AI 开发，Apache-2.0 许可。

两个模型变体：
- **LLaSM-Chinese-Llama-2-7B**：基于 [[chinese-llama-alpaca-3]] Chinese-Llama-2-7b
- **LLaSM-Baichuan-7B**：基于 Baichuan-7B

## Architecture

```
Audio (16kHz WAV)
  → Whisper-large-v2 (frozen audio encoder, 1280-dim features)
  → 64 audio tokens
  → mm_projector (Linear 1280→hidden_size)
  → LLM (Chinese-Llama-2-7B or Baichuan-7B)
  → Text response
```

核心创新：
- **Audio Tower**：使用 Whisper-large-v2 提取音频特征，冻结参数，torch.float16
- **Special Tokens**：`<au_patch>` / `<au_start>` / `<au_end>` 标记音频片段
- **多模态融合**：mm_projector 将 1280 维 Whisper 特征映射到 LLM 词嵌入空间
- 支持同时训练语言和音频数据（通过 dummy audio feature 处理纯文本样本）

## Key Files

| File | Purpose |
|------|---------|
| `llasm.py` | 模型定义：`LlaaaConfig`（LlamaConfig 子类）、`LlaaaLlamaModel`（音频处理逻辑）、`LlaaaLlamaForCausalLM` |
| `infer.py` | 推理脚本：librosa 加载音频 → WhisperProcessor 提取特征 → `model.generate(audios=audio_feat)` |
| `infer_tokenize.py` | 对话格式 tokenizer |
| `pyproject.toml` | 依赖：transformers==4.31.0, torch, librosa, accelerate |

## Inference

```bash
export LLASM_DEVICE="cuda:0"
python infer.py \
    --input_audio_file /path/to/audio.mp3 \
    --llasm_model LinkSoul/LLaSM-Cllama2 \
    --llasm_audio_tower openai/whisper-large-v2 \
    --llm_type "Chinese_llama2"
```

## Differences from Similar Tools

相比其他语音-语言模型（如 [[voxcpm]]），LLaSM 的特点：
- **首个开源可商用**中英双语语音助手（Apache-2.0）
- 基于 Whisper 音频编码器 + Chinese-Llama-2-7B 的组合架构
- 提供配套 SFT 数据集 `LLaSM-Audio-Instructions`
- 仅需 7B 参数规模即可实现语音对话

## Related

- [[chinese-llama-alpaca-3]] — LLaSM 使用的基座模型
- [[voxcpm]] — OpenBMB 开源语音合成系统（不同方向：TTS 而非 ASR）
- [[imagebind]] — Meta 多模态模型（音频+图像+文本统一嵌入）
- [Whisper](https://github.com/openai/whisper) — LLaSM 使用的音频编码器
- [HuggingFace Demo](https://huggingface.co/spaces/LinkSoul/LLaSM)
- [arXiv Paper](https://arxiv.org/abs/2308.15930)
