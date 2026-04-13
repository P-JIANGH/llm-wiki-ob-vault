---
title: ChatYuan
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [llm, t5, dialogue, chinese-llm, open-source, game-dev]
sources: [raw/articles/ai-game-devtools/chatyuan.md]
---

# ChatYuan

## Overview

ChatYuan-large-v2 是由 **ClueAI（元语智能）** 开发的中英双语对话大语言模型，发布于 2023 年 3 月 23 日。基于 **T5** 架构，是 ChatGPT 风格的功能型对话模型。

## Key Facts

| Fact | Detail |
|---|---|
| 开发方 | ClueAI（元语智能） |
| 发布日期 | 2023-03-23 |
| 架构 | T5 (Text-to-Text Transfer Transformer) |
| 预训练语料 | 1000 亿 token 中文语料，累计 1.5 万亿中文 token |
| 最大长度 | 4096 token |
| 推理显存 | INT4 最低 400M 显存 |
| 许可证 | 自定义非商业研究许可证 |

## Capabilities

- **中英双语对话** — 同时支持中文和英文
- **拒答能力** — 对危险/有害问题学会拒答处理
- **代码生成** — 基础代码生成
- **表格生成** — 生成格式规范的 markdown 表格
- **数学运算** — 基础数学运算能力增强
- **情景模拟** — 增强的模拟情景能力
- **创意写作** — 上下文问答和创意性写作

## Architecture

- 基于 Google **T5** (Text-to-Text Transfer Transformer) 架构
- 使用 Hugging Face `transformers` 库：`T5Tokenizer` + `T5ForConditionalGeneration`
- 支持 `AutoModel.from_pretrained(..., trust_remote_code=True)` 加载
- 分布式训练使用 **Horovod**（`distributed-training/train.py`）

## Comparison with Similar Models

ChatYuan 属于轻量级中文对话 LLM，与同类工具的主要区别：

| Model | Architecture | Max Length | Special Feature |
|---|---|---|---|
| ChatYuan-large-v2 | T5 | 4096 | 轻量（INT4 400M），中英双语 |
| [[ChatRWKV]] | RWKV (RNN) | 无限 | 100% RNN，O(n) 推理 |
| [[baichuan-13b]] | LLaMA | 4096 | 13B 参数，支持中英 |
| [[baichuan-7b]] | LLaMA | 4096 | 7B 参数，百川大模型 |

## Online Demos & Resources

- HuggingFace: https://huggingface.co/ClueAI/ChatYuan-large-v2
- ModelScope: https://modelscope.cn/studios/ClueAI/ChatYuan-large-v2
- Colab: https://colab.research.google.com/drive/1ZcLIJuemiojigrfjbsDMBWrX7JqXZX6I

## Related

- [[ChatRWKV]] — 另一个开源中文对话 LLM（RWKV 架构）
- [[baichuan-13b]] — 百川 13B 对话模型
- [[chatgpt-api-unity]] — Unity ChatGPT API 客户端
