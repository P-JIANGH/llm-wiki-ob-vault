# MiniCPM-V 4.0 / MiniCPM-o

> Source: https://github.com/OpenBMB/MiniCPM-o
> Stars: 24.4k | Forks: 1.9k | License: Apache-2.0
> Organization: THUNLP & ModelBest

## Overview

MiniCPM-o 是 MiniCPM-V 系列的最新升级版，主打端侧多模态 LLM。模型接受图像、视频、文本、音频输入，并端到端输出高质量文本和语音。专为手机和边缘设备的高性能高效部署而设计。

## Key Models

### MiniCPM-V 4.0

- **参数**: 4.1B
- **视觉编码器**: SigLIP2-400M
- **语言基座**: MiniCPM4-3B
- **性能**: OpenCompass 69.0（超越 GPT-4.1-mini-20250414、MiniCPM-V 2.6）
- **延迟**: iPhone 16 Pro Max 上首 token < 2s
- **速度**: > 17 token/s 解码（不发烫）
- **能力**: 单图/多图和视频理解

### MiniCPM-o 4.5（最新最强大）

- **总参数**: 9B
- **构建**: SigLip2 + Whisper-medium + CosyVoice2 + Qwen3-8B
- **视觉**: OpenCompass 77.6（接近 Gemini 2.5 Flash）
- **语音**: 中英双语实时对话、语音克隆、更自然/表达力/稳定性
- **全双工**: 同时看、听、说；主动交互（提醒、评论）
- **OCR**: OmniDocBench 最先进英文文档解析
- **效率**: 高分辨率图像（1.8M 像素）、高帧率视频（10fps）、30+ 语言

## Architecture Highlights

- **端到端全模态架构**: 密集 hidden state 连接
- **全双工流式**: 时分复用（TDM）机制
- **主动交互**: 1Hz 决策频率
- **可配置语音建模**: 音频系统提示

## Evaluation Results

### Image Understanding

| Model | OpenCompass | MMBench EN | MMBench CN | MathVista | MMVet | OCRBench |
|-------|-------------|------------|------------|-----------|-------|----------|
| MiniCPM-o 4.5 | 77.6 | 87.6 | 87.2 | 80.1 | 74.4 | 876 |
| Gemini 2.5 Flash | 78.5 | 86.6 | 86.0 | 75.3 | 81.4 | 864 |
| GPT-4o | 75.4 | 86.0 | 86.0 | 71.6 | 76.9 | 822 |

### Speech Generation

| Model | seedtts zh CER↓ | seedtts zh SIM-o↑ | seedtts en WER↓ | seedtts en SIM-o↑ |
|-------|-----------------|------------------|-----------------|-------------------|
| MiniCPM-o 4.5 | 0.86% | 74.5 | 2.38% | 64.9 |
| CosyVoice2 | 1.45% | 74.8 | 2.57% | 65.2 |

### Inference Efficiency

| Model | Format | Speed (tokens/s) | TTFT (s)↓ | GPU Memory (GB)↓ |
|-------|--------|-----------------|-----------|-----------------|
| Qwen3-Omni-30B | int4 | 147.8 | 1.0 | 20.3 |
| MiniCPM-o 4.5 | bf16 | 154.3 | 0.6 | 19.0 |
| MiniCPM-o 4.5 | int4 | 212.3 | 0.6 | 11.0 |

## Model Zoo

| Model | Device | Memory | Download |
|-------|--------|--------|----------|
| MiniCPM-o 4.5 | GPU | 19 GB | HuggingFace |
| MiniCPM-o 4.5 GGUF | GPU | 10 GB | HuggingFace |
| MiniCPM-o 4.5 AWQ | GPU | 11 GB | HuggingFace |
| MiniCPM-V 4.0 | GPU | 9 GB | HuggingFace |
| MiniCPM-V 4.0 GGUF | CPU | 4 GB | HuggingFace |
| MiniCPM-V 4.0 int4 | GPU | 5 GB | HuggingFace |
| MiniCPM-V 4.0 AWQ | GPU | 5 GB | HuggingFace |

## Quick Start

```python
import torch
from transformers import AutoModel

model = AutoModel.from_pretrained(
    "openbmb/MiniCPM-o-4_5",
    trust_remote_code=True,
    attn_implementation="sdpa",
    torch_dtype=torch.bfloat16,
    init_vision=True,
    init_audio=True,
    init_tts=True,
)
model.eval().cuda()
model.init_tts()
```
