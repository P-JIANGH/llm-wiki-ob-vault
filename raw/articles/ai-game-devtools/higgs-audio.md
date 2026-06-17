# Higgs Audio — Raw Source

## Basic Info
- **Name:** Higgs Audio
- **Organization:** Boson AI
- **URL:** https://github.com/boson-ai/higgs-audio
- **License:** Apache 2.0
- **Latest Version:** V2.5
- **Stars:** (from GitHub)
- **Category:** Audio / Speech / TTS

## Description
Higgs Audio 是 Boson AI 开源的音频基础模型，基于超过 1000 万小时音频数据和文本数据预训练。
在 EmergentTTS-Eval 上，相对于 gpt-4o-mini-tts 的情感类别胜率达 75.7%，问题类别 55.7%。

## Architecture

### Higgs Audio V2
- 基于 Llama-3.2-3B 构建
- **DualFFN 架构**：音频专用专家模块，增强 LLM 处理音频 token 的能力，仅保留原始 LLM 91% 的训练速度
- **RVQ + Delay Pattern**：采用残差向量量化 + 延迟模式，支持多 codebook 并行生成和流式推理
- **音频 Tokenizer**：自研统一音频 tokenizer，25 fps 帧率，24kHz 覆盖语音/音乐/音效，2k bitrate
- **ChatML 接口**：支持 system/user/assistant 消息格式，可直接文本生成音频

### Higgs Audio V2.5
- 模型压缩至 1B 参数，超越 3B 模型的速度和精度
- 新增 GRPO（Group Relative Policy Optimization）对齐策略
- 改进语音克隆和更细粒度的风格控制

## Key Capabilities
1. **Zero-Shot Voice Cloning**：单段参考音频即可克隆声音
2. **Multi-Speaker Dialog**：生成多说话人对话音频
3. **Smart Voice**：不指定参考声音时，模型自动根据文本选择合适的声音
4. **Multilingual**：支持多语言生成和实时翻译
5. **Emergent Capabilities**：自然多说话人对话、自动韵律适应、克隆声音哼唱、语音+背景音乐同时生成

## Technical Innovations
1. **AudioVerse**：1000 万小时清洗和标注音频数据集
2. **Unified Audio Tokenizer**：语义+声学特征统一 tokenization
3. **DualFFN**：以极小计算开销增强 LLM 音频建模能力

## Module Structure
```
boson_multimodal/
├── serve/                  # 推理服务引擎
│   ├── serve_engine.py     # HiggsAudioServeEngine 核心推理类
│   └── utils.py
├── model/higgs_audio/      # 模型定义
│   ├── configuration_higgs_audio.py
│   ├── modeling_higgs_audio.py
│   ├── audio_head.py
│   ├── custom_modules.py
│   ├── cuda_graph_runner.py
│   └── utils.py
├── audio_processing/       # 音频处理
│   ├── higgs_audio_tokenizer.py  # 核心音频 tokenizer
│   ├── quantization/       # 量化模块 (RVQ, VQ, etc.)
│   └── semantic_module.py  # 语义模块
├── data_types.py           # ChatMLSample, Message, AudioContent 等数据结构
├── data_collator/          # 数据整理
└── constants.py
```

## Installation Methods
- Docker (NVIDIA Deep Learning Container)
- pip install -r requirements.txt + pip install -e .
- venv, conda, uv 多种方式
- vLLM 高级用法（OpenAI 兼容 API 服务器）

## Hardware Requirements
- GPU 至少 24GB 内存（推荐）

## Benchmarks
- Seed-TTS Eval: WER 2.44, SIM 67.70
- ESD: WER 1.78, SIM 86.13
- EmergentTTS Emotions: 75.71% win rate vs gpt-4o-mini-tts
- EmergentTTS Questions: 55.71% win rate
- Multi-speaker Eval: 两说话人对话 WER 18.88, SIM/Dis-sim 51.95

## Related Models
- Higgs Audio V1 (理解模型，AudioVerse 标注管线基础)
- 竞品: CosyVoice2, ElevenLabs, Qwen2.5-Omni, GPT-4o Audio

## Source
- Ingested from GitHub README + tech blogs + source code analysis
- Date: 2026-04-21
