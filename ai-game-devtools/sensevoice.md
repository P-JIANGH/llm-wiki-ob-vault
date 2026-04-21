---
title: SenseVoice
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [tool, ai-model, open-source, speech, audio, multimodal]
sources: [raw/articles/ai-game-devtools/sensevoice.md]
---

# SenseVoice

阿里巴巴通义实验室 FunAudioLLM 团队开源的语音基础模型，具备多语言语音识别、情感识别和音频事件检测能力。

## 概述
SenseVoice 是一个多任务语音理解模型，在单一模型中集成了自动语音识别（ASR）、语言识别（LID）、情感识别（SER）和音频事件检测（AED）。使用超过 40 万小时数据训练，支持 50+ 语言。

## 核心功能
- **多语言 ASR**：中文/粤语/英文/日文/韩文等 50+ 语言，性能超越 Whisper
- **情感识别**：HAPPY/SAD/ANGRY/NEUTRAL/FEARFUL/DISGUSTED/SURPRISED
- **事件检测**：BGM/掌声/笑声/哭声/喷嚏/呼吸/咳嗽
- **高效推理**：70ms 处理 10 秒音频，比 Whisper-Large 快 15 倍
- **时间戳输出**：基于 CTC 对齐的词级时间戳

## 技术架构
- **SenseVoice-Small**：非自回归端到端框架，极低推理延迟
- **FunASR 集成**：基于阿里巴巴开源的 FunASR 语音识别工具包
- **VAD 集成**：可选 FSMN-VAD 长音频分段
- **多格式导出**：支持 ONNX、LibTorch、GGML（SenseVoice.cpp）
- **部署方案**：FastAPI 服务、Docker、Triton+TensorRT GPU 加速（526x）

## 依赖
```
torch, torchaudio, funasr>=1.1.3, modelscope, gradio, fastapi
```

## 许可证
Apache 2.0

## 与同类工具对比
- 对比 Whisper（OpenAI）：SenseVoice 在中文/粤语识别上更强，推理速度更快（15x），但多语言覆盖范围略窄
- 与 [[cosyvoice]] 同属 FunAudioLLM 系列：SenseVoice 负责语音理解，CosyVoice 负责语音生成
- 与 [[gpt-sovits]] 形成互补：GPT-SoVITS 专注于声音克隆和 TTS，SenseVoice 专注于语音理解和情感识别

## 游戏开发应用
- NPC 情感驱动的语音交互：自动识别玩家语音情感，调整 NPC 反应
- 游戏内音频事件检测：识别背景音乐、掌声等触发游戏逻辑
- 多语言游戏本地化：自动识别并翻译多语言语音输入
- 无障碍功能：为视障玩家提供语音指令识别

## 相关链接
- GitHub: https://github.com/FunAudioLLM/SenseVoice
- ModelScope: https://www.modelscope.cn/models/iic/SenseVoiceSmall
- HuggingFace: https://huggingface.co/FunAudioLLM/SenseVoiceSmall
- 主页: https://funaudiollm.github.io/
