# AudioGPT: Understanding and Generating Speech, Music, Sound, and Talking Head

Source: https://github.com/AIGC-Audio/AudioGPT
Paper: https://arxiv.org/abs/2304.12995

## Overview
AudioGPT 是一个通过 ChatGPT/LLM 统一接口来理解和生成语音、音乐、音效和数字人视频的 AI 系统。它基于 Visual ChatGPT 的设计模式，将 LLM 作为控制器，通过 LangChain Agent 框架调度多个音频基础模型完成各种音频任务。

## 核心架构
- **主入口**: audio-chatgpt.py (1442 行)
- **Agent 框架**: LangChain initialize_agent + ConversationBufferMemory
- **UI**: Gradio Web 界面
- **LLM 后端**: OpenAI API (GPT-3.5-turbo)
- **工具注册**: Tool 列表，按任务分类注册

## 支持的音频任务及基础模型

### Speech (语音)
| 任务 | 基础模型 | 状态 |
|------|---------|------|
| Text-to-Speech | FastSpeech2, SyntaSpeech, VITS | WIP |
| Style Transfer | GenerSpeech | 已完成 |
| Speech Recognition | Whisper, Conformer | 已完成 |
| Speech Enhancement | ConvTasNet | WIP |
| Speech Separation | TF-GridNet | WIP |
| Speech Translation | Multi-decoder | WIP |
| Mono-to-Binaural | NeuralWarp | 已完成 |

### Sing (歌唱)
| 任务 | 基础模型 | 状态 |
|------|---------|------|
| Text-to-Sing | DiffSinger, VISinger | WIP |

### Audio (音效)
| 任务 | 基础模型 | 状态 |
|------|---------|------|
| Text-to-Audio | Make-An-Audio | 已完成 |
| Audio Inpainting | Make-An-Audio | 已完成 |
| Image-to-Audio | Make-An-Audio | 已完成 |
| Sound Detection | HTS-Audio-Transformer | 已完成 |
| Target Sound Detection | TSDNet | 已完成 |
| Sound Extraction | LASSNet | 已完成 |

### Talking Head (数字人)
| 任务 | 基础模型 | 状态 |
|------|---------|------|
| Talking Head Synthesis | GeneFace | WIP |

## 关键目录结构
```
audio-chatgpt.py          # 主程序：LangChain Agent + Gradio UI (1442行)
NeuralSeq/                # 语音/歌唱合成核心模块 (NATSpeech fork)
audio_detection/          # 音频检测 (PVT 模型 + TSDNet)
audio_to_text/            # 音频到文本 (对比学习 CNN+Transformer)
mono2binaural/            # 单声道转双耳音频
sound_extraction/         # 声音提取 (LASSNet)
text_to_audio/            # 文本到音频 (Make-An-Audio)
  Make_An_Audio/          # 扩散模型音频生成
download.sh               # 模型权重下载脚本 (HuggingFace)
requirements.txt          # 依赖：PyTorch 1.12.1, LangChain 0.0.101, ESPNet, diffusers 等
```

## 技术特点
1. **LangChain Agent 编排**: 使用 initialize_agent 将多个音频工具注册为 Tool，LLM 自动规划工具调用序列
2. **对话记忆**: ConversationBufferMemory 维护对话历史，支持多轮交互
3. **扩散模型音频生成**: Make-An-Audio 基于 Stable Diffusion 架构的音频扩散模型
4. **NeuralSeq 语音合成**: 基于 NATSpeech 框架的非自回归语音/歌唱合成
5. **Gradio UI**: 提供 Web 界面进行音频对话交互
6. **多模态融合**: 支持图像→音频、文本→音频、音频→文本等多模态转换

## 许可证
LICENSE 文件为空 — 未明确声明许可证。

## 依赖
Python 3.8, PyTorch 1.12.1, CUDA 11.3, LangChain 0.0.101, ESPNet, diffusers, OpenAI API
