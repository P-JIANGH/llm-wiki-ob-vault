---
title: VoxCPM
created: 2026-04-08
updated: 2026-04-08
type: entity
tags: [ai, ml, open-source]
sources: [raw/articles/voxcpm-openbmb-2025.md]
---

# VoxCPM

VoxCPM 是 OpenBMB 团队开源的**无离散音频分词器（Tokenizer-Free）语音合成系统**，通过端到端扩散自回归架构直接生成连续语音表征，绕过传统 TTS 的离散编码步骤，输出高度自然且富有表现力的语音。

## 关键参数

| 指标 | 值 |
|------|-----|
| 最新版本 | VoxCPM2 |
| 基座模型 | MiniCPM-4 |
| 参数量 | 20亿（2B） |
| 训练数据 | 200万+ 小时多语种音频 |
| 输出采样率 | 原生 48kHz |
| 支持语言 | 30种全球语言 + 9种中文方言 |
| 中文方言 | 四川话、粤语、吴语、东北话、河南话、陕西话、山东话、天津话、闽南话 |

## 核心创新：Tokenizer-Free

传统 TTS 系统（如 F5-TTS、MegaTTS）依赖离散分词器（Tokenizer）将音频信号转换为离散符号，这两步过程会引入信息损失，导致合成音质下降和"机械感"。

VoxCPM 彻底放弃离散编码器，直接在**连续语音表征空间**中建模。核心优势：

1. **更高自然度** — 避免离散化导致的 robotic 感
2. **更强情感表达** — 保留语音中细微情感变化和语调特征
3. **更精准上下文理解** — 能识别长文本语义关联和情感转折

## 主要功能

### 文本转语音（TTS）
输入文本，输出自然语音，支持 30 种语言。

### 音色设计（Voice Design）
用自然语言描述创建全新音色，无需参考音频。格式：在 `text` 开头用括号写入音色描述。

### 高保真声音克隆（Voice Cloning）
基于短参考音频（少量秒数）即可克隆真实音色，保留原说话人的韵律和音质特征。

## 性能表现

在 Seed-TTS-eval 基准测试中，VoxCPM2 在**自然度**和**相似度**指标上超越了 MegaTTS3、F5-TTS 等主流模型。

## 技术架构

- **基座**：MiniCPM-4（[MiniCPM](#/) 系列）
- **范式**：Diffusion + Autoregression，直接生成连续语音表征
- **音频输出**：48kHz HiFi 级别质量
- **环境**：Python ≥ 3.10，PyTorch ≥ 2.5.0，CUDA ≥ 12.0

## 资源

- GitHub: https://github.com/OpenBMB/VoxCPM
- HuggingFace: https://huggingface.co/openbmb/VoxCPM2
- ModelScope: https://modelscope.cn/models/OpenBMB/VoxCPM2
- 文档: https://voxcpm.readthedocs.io/zh-cn/latest/
- 在线 Demo: https://huggingface.co/spaces/OpenBMB/VoxCPM-Demo

## 关联

- [openbmb](#/entities/openbmb) — 开发组织
- [MiniCPM](#/) — 基座模型
- [llm-integration](#/concepts/llm-integration) — LLM 集成相关概念
