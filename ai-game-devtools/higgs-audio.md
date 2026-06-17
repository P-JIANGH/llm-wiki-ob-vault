---
title: Higgs Audio — Boson AI 高表现力音频生成模型
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [ai-model, audio, speech, open-source, tool]
sources:
  - raw/articles/ai-game-devtools/higgs-audio.md
---

# Higgs Audio

## Overview
Boson AI 开源的音频基础模型，基于 1000 万+ 小时音频数据预训练，在情感 TTS、多说话人对话、语音克隆等任务上表现突出。V2 基于 Llama-3.2-3B + DualFFN 架构，V2.5 压缩至 1B 参数，通过 GRPO 对齐策略超越前代性能。

在 EmergentTTS-Eval 上，情感类别对 gpt-4o-mini-tts 胜率 **75.7%**，问题类别 **55.7%**，超越 CosyVoice2、ElevenLabs、Qwen2.5-Omni 等竞品。

## Key Facts
- **组织：** Boson AI（boson.ai）
- **基座模型：** Llama-3.2-3B（V2）→ 1B（V2.5）
- **参数规模：** 3.6B LLM + 2.2B 音频适配器（V2）/ 1B（V2.5）
- **许可证：** Apache 2.0
- **GitHub：** https://github.com/boson-ai/higgs-audio
- **HuggingFace：** bosonai/higgs-audio-v2-generation-3B-base
- **版本：** V2（开源）→ V2.5（生产优化）
- **硬件要求：** GPU ≥ 24GB（V2），V2.5 消费级可运行

## Architecture

### V2 核心设计
- **Llama-3.2-3B 基座**：保留 91% 原始训练速度
- **DualFFN 音频适配器**：音频专用 FFN 专家模块，以极小计算开销增强 LLM 的音频 token 建模能力
- **RVQ + Delay Pattern**：残差向量量化 + 延迟模式，支持多 codebook 并行生成和流式推理
- **ChatML 接口**：system/user/assistant 消息格式，支持指令+音频/文本混合输入

### 音频 Tokenizer
- **帧率 25 fps**：仅为多数基线的一半，同时保持或提升音质
- **24kHz 统一训练**：首个在语音/音乐/音效上统一训练的 tokenizer
- **非扩散编码/解码**：快速批量推理，无扩散步延迟
- **2k bitrate**：高效压缩，STFT 距离、语义保真度、美学评估全面领先

### V2.5 升级
- 模型压缩至 1B 参数，超越 3B 模型的速度和精度
- GRPO（Group Relative Policy Optimization）对齐策略
- 改进语音克隆和更细粒度风格控制

## Key Capabilities

| 能力 | 说明 |
|------|------|
| Zero-Shot 语音克隆 | 单段参考音频即可克隆声音 |
| 多说话人对话 | 生成多说话人/多语言对话音频 |
| Smart Voice | 不指定参考声音时自动选择合适声音 |
| 多语言 | 支持中英文等多语言和实时翻译 |
| 涌现能力 | 自动韵律适应、克隆声音哼唱、语音+背景音乐同时生成 |

## Benchmarks

| Benchmark | Higgs V2 | CosyVoice2 | ElevenLabs | Qwen2.5-Omni |
|-----------|----------|------------|------------|--------------|
| SeedTTS WER ↓ | 2.44 | 2.28 | 1.43 | 2.33 |
| SeedTTS SIM ↑ | **67.70** | 65.49 | 50.00 | 64.10 |
| ESD WER ↓ | 1.78 | 2.71 | 1.66 | - |
| ESD SIM ↑ | **86.13** | 80.48 | 65.87 | - |
| EmergentTTS Emotions ↑ | **75.7%** | - | 30.35% | 41.60% |

## Module Structure
- `boson_multimodal/serve/` — HiggsAudioServeEngine 推理服务
- `boson_multimodal/model/higgs_audio/` — 模型定义（configuration/modeling/audio_head/custom_modules）
- `boson_multimodal/audio_processing/` — 音频 tokenizer + RVQ 量化 + 语义模块
- `boson_multimodal/data_types.py` — ChatMLSample/Message/AudioContent 数据结构
- `examples/` — 生成/语音克隆/多说话人/vLLM 示例

## Deployment
- **Python API**：HiggsAudioServeEngine 直接调用
- **vLLM**：OpenAI 兼容 API 服务器，高吞吐量
- **Docker**：NVIDIA Deep Learning Container 推荐
- **多种环境**：pip/venv/conda/uv 安装方式

## Differences from Similar Tools
- 与 [[cosyvoice]] 相比：Higgs Audio 在语音相似度上显著领先（67.70 vs 65.49），情感表现更突出
- 与 [[musicgen]] 相比：Higgs 侧重语音/TTS，MusicGen 侧重音乐生成
- 与 [[amphion]] 相比：Amphion 是统一音频/音乐/语音处理框架，Higgs 是端到端生成模型
- 独特优势：多说话人对话、涌现能力（哼唱/音乐+语音同时生成）、GRPO 对齐

## Related
- [[cosyvoice]] — 阿里 FunAudioLLM 语音合成模型
- [[musicgen]] — Meta AI 音乐生成模型
- [[amphion]] — OpenMMLab 音频/音乐/语音统一框架
- [[rpbench-auto]] — Boson AI 另一开源项目，LLM 角色扮演评测
