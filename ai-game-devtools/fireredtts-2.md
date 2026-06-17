---
title: FireRedTTS-2
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [tool, open-source, audio, speech, multimodal]
sources: [raw/articles/ai-game-devtools/fireredtts-2.md]
---

# FireRedTTS-2

## Overview
FireRedTTS-2 是 FireRedTeam 开源的长文本流式语音合成（TTS）系统，专注于多说话人对话生成，具备稳定的语音质量、可靠的说话人切换和上下文感知的韵律控制。

## 核心特性
- **长对话生成**：支持 4 说话人 3 分钟对话，可通过扩展训练语料延长
- **多语言支持**：英语、中文、日语、韩语、法语、德语、俄语；支持跨语言/代码切换的零样本声音克隆
- **超低延迟**：12.5Hz 流式语音分词器 + 双 Transformer 架构，L20 GPU 首包延迟低至 140ms
- **高稳定性**：独白和对话测试中均实现高相似度和低 WER/CER
- **随机音色生成**：适用于创建 ASR/语音交互训练数据

## 技术架构
- **双 Transformer 架构**：文本-语音交错序列处理，借鉴 [[moshi]] 和 Sesame CSM 的设计
- **流式语音分词器**：12.5Hz 低频率 tokenization，支持逐 token 流式解码
- **LLM 骨干**：基于 Qwen2.5-1.5B 文本分词方案
- **音频编解码器**：基于 Vocos 的声学解码器，参考 [[audiolcm]] 相关 codec 思路
- **上下文管理**：基于 Segment 的上下文窗口，支持 [S1]-[S4] 四个说话人标签
- **bf16 推理**：显存占用从 14GB 降至 9GB，支持消费级 GPU 部署

## 项目结构
- `fireredtts2/fireredtts2.py`：主推理类（FireRedTTS2 + FireRedTTS2_Stream）
- `fireredtts2/codec/`：音频编解码模块（RVQ、decoder、whisper 编码）
- `fireredtts2/llm/`：LLM 骨干网络模块
- `fireredtts2/utils/spliter.py`：文本清洗与分割
- `gradio_demo.py`：Web UI 演示（支持语音克隆和随机音色）

## 使用模式
1. **对话生成**：多说话人对话，支持声音克隆或随机音色
2. **流式对话**：逐 token 流式输出，首包延迟 140ms
3. **独白生成**：单说话人文本转语音，可选声音克隆

## 许可证
Apache 2.0

## 相关链接
- GitHub: https://github.com/FireRedTeam/FireRedTTS2
- HuggingFace: https://huggingface.co/FireRedTeam/FireRedTTS2
- Demo: https://fireredteam.github.io/demos/firered_tts_2/
- Paper: https://arxiv.org/abs/2509.02020

## 与同类工具差异
| 特性 | FireRedTTS-2 | [[emotivoice]] | [[chat-tts]] |
|------|-------------|-------------------------------|-----------------------------|
| 对话生成 | 多说话人（4人）| 不支持 | 不支持 |
| 流式输出 | 12.5Hz, 140ms 延迟 | 不支持 | 不支持 |
| 多语言 | 7 种语言 | 多语言 | 中英双语 |
| 声音克隆 | 零样本 | 零样本情感控制 | 零样本 |
| 显存需求 | 9GB (bf16) | 较高 | 较高 |
| 架构 | 双 Transformer | VITS | AR 自回归 |
