---
title: Mini-Omni
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [ai-model, tool, llm, multimodal, speech, audio, open-source, python]
sources: [raw/articles/ai-game-devtools/mini-omni.md]
---

# Mini-Omni

## 概述

Mini-Omni 是一个开源多模态大语言模型，能够**听、说、同时思考**。具备实时端到端语音输入和流式音频输出对话能力。

## 核心功能

- **实时语音到语音（Speech-to-Speech）**：无需外部 ASR（语音识别）或 TTS（语音合成）模型
- **边想边说（Talking while thinking）**：文本和音频同时生成
- **流式音频输出**：低延迟、连续对话响应
- **批量推理**：支持 "Audio-to-Text" 和 "Audio-to-Audio" 管线

## 技术架构

| 组件 | 技术 |
|:---|:---|
| **LLM 基座** | [[qwen2]]（Qwen2） |
| **训练/推理框架** | [litGPT](https://github.com/Lightning-AI/litgpt/) |
| **音频编码** | [Whisper](https://github.com/openai/whisper/)（OpenAI） |
| **音频解码** | [SNAC](https://github.com/hubertsiuzdak/snac/) |
| **合成语音数据** | [[cosyvoice]]（CosyVoice） |
| **对齐数据** | OpenOrca + MOSS |

## 快速使用

- **服务端**：`python server.py --host '0.0.0.0' --port 60808`
- **Streamlit UI**：`streamlit run webui/omni_streamlit.py`（需本地安装 PyAudio）
- **Gradio UI**：`python3 webui/omni_gradio.py`

## 已知限制

- 仅在**英语**上训练，虽能通过 Whisper 编码器理解其他语言，但**输出仅支持英语**
- `post_adapter`（TTS Adapter）在代码中存在但开源版本**不支持**
- `ModuleNotFoundError: No module named 'utils.xxxx'` 时需设置 `export PYTHONPATH=./`，切勿 `pip install utils`
- Streamlit 无法远程运行，需本地执行

## 重要事件

| 日期 | 事件 |
|:---|:---|
| 2024.09 | Hugging Face 官方 Gradio 互动 Demo 上线 |
| 2024.09 | VoiceAssistant-400K 训练数据集发布 |
| 2024.10 | [[ai-game-devtools/mini-omni2]]（Mini-Omni2）发布，新增视觉+音频能力 |

## 项目信息

- **许可证**：MIT
- **语言**：Python
- **GitHub Stars**：3.5k
- **相关页面**：[[llasm]]（语音-文本多模态对话模型）、[[qwen2-audio]]（Qwen 音频模型）
- **论文**：[arXiv:2408.16725](https://arxiv.org/abs/2408.16725)
- **HuggingFace**：[gpt-omni/mini-omni](https://huggingface.co/gpt-omni/mini-omni)
