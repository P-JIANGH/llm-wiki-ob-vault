---
title: AudioGPT
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, tool, open-source, audio, multimodal, llm, agent]
sources: [raw/articles/ai-game-devtools/audiogpt.md]
---

# AudioGPT: Understanding and Generating Speech, Music, Sound, and Talking Head

**GitHub**: https://github.com/AIGC-Audio/AudioGPT
**Paper**: https://arxiv.org/abs/2304.12995
**HuggingFace Demo**: https://huggingface.co/spaces/AIGC-Audio/AudioGPT

## Overview
AudioGPT 是首个通过 ChatGPT/LLM 统一接口来理解和生成语音、音乐、音效和数字人视频的 AI 系统。借鉴 Visual ChatGPT 的设计模式，将 LLM 作为控制器，通过 [[langchain]] Agent 框架调度多个音频基础模型，实现自然语言驱动的多模态音频交互。

## 核心架构

- **主程序**: `audio-chatgpt.py` (1442 行)
- **Agent 框架**: LangChain `initialize_agent` + `ConversationBufferMemory`
- **LLM 后端**: OpenAI API (GPT-3.5-turbo)
- **UI**: Gradio Web 界面
- **工具调度**: 每个音频任务封装为 LangChain Tool，LLM 自动规划调用序列

## 支持的任务与基础模型

### Speech (语音)
| 任务 | 基础模型 | 状态 |
|------|---------|------|
| Text-to-Speech | FastSpeech2, SyntaSpeech, VITS | WIP |
| Style Transfer | GenerSpeech | ✅ |
| Speech Recognition | Whisper, Conformer | ✅ |
| Speech Enhancement | ConvTasNet | WIP |
| Speech Separation | TF-GridNet | WIP |
| Mono-to-Binaural | NeuralWarp | ✅ |

### Sing (歌唱)
| 任务 | 基础模型 | 状态 |
|------|---------|------|
| Text-to-Sing | DiffSinger, VISinger | WIP |

### Audio (音效)
| 任务 | 基础模型 | 状态 |
|------|---------|------|
| Text-to-Audio | Make-An-Audio | ✅ |
| Audio Inpainting | Make-An-Audio | ✅ |
| Image-to-Audio | Make-An-Audio | ✅ |
| Sound Detection | HTS-Audio-Transformer | ✅ |
| Target Sound Detection | TSDNet | ✅ |
| Sound Extraction | LASSNet | ✅ |

### Talking Head (数字人)
| 任务 | 基础模型 | 状态 |
|------|---------|------|
| Talking Head Synthesis | [[geneface]] | WIP |

## 技术特点

1. **LangChain Agent 编排**: 多工具序列调度，LLM 自主决定工具调用顺序
2. **对话记忆**: 维护历史上下文，支持多轮音频交互
3. **扩散模型音频生成**: Make-An-Audio 基于 Stable Diffusion 的音频扩散架构
4. **NeuralSeq 合成管线**: 基于 NATSpeech 的非自回归语音/歌唱合成
5. **多模态转换**: 文本↔音频、图像→音频、音频→文本双向能力
6. **Gradio Web UI**: 浏览器端音频对话交互

## 目录结构

```
audio-chatgpt.py          # 主程序：LangChain Agent + Gradio UI
NeuralSeq/                # 语音/歌唱合成 (NATSpeech fork)
audio_detection/          # 音频检测 (PVT + TSDNet)
audio_to_text/            # 音频描述生成 (对比学习 CNN+Transformer)
mono2binaural/            # 单声道→双耳音频
sound_extraction/         # 声音分离 (LASSNet)
text_to_audio/Make_An_Audio/  # 扩散模型音频生成
download.sh               # HuggingFace 模型权重下载脚本
```

## 依赖
Python 3.8, PyTorch 1.12.1, CUDA 11.3, LangChain 0.0.101, ESPNet, diffusers, transformers 4.26.1, OpenAI API

## 许可证
未明确声明 (LICENSE 文件为空)。

## 与同类工具的差异

- 相比 [[amphion]]（统一音频工具包）：AudioGPT 侧重 LLM 驱动的自然语言交互，而非 API 级工具调用
- 相比 [[musicgen]]（Meta 音乐生成）：AudioGPT 覆盖语音/音效/数字人等多模态，不仅限于音乐
- 作为 Audio 类最早的 ChatGPT 集成项目之一，启发了后续 [[audio-diffusion-pytorch]] 等专用工具

## 对游戏开发的价值
- **游戏 NPC 语音生成**: TTS + 风格迁移可动态生成角色语音
- **环境音效生成**: Text-to-Audio 按需生成游戏环境音效
- **数字人直播**: Talking Head 合成用于虚拟主播
- **游戏音乐生成**: Text-to-Sing 支持游戏内音乐创作
- **无障碍功能**: Speech Recognition 实现语音控制游戏界面
