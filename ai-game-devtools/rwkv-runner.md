---
title: RWKV-Runner
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, llm, tool, python, desktop-app, open-source]
sources: ["general knowledge"]
---

# RWKV-Runner

RWKV 模型的本地运行 GUI/CLI 工具，提供可视化界面和 API 服务，支持一键下载模型、对话交互和 OpenAI 兼容接口。

## 概述

RWKV-Runner 是由 josStorer 开发的 RWKV 模型运行工具，旨在降低 RWKV 架构模型的使用门槛。它将 RWKV 的 Python 推理后端封装为易用的桌面应用和 Web API，支持模型自动下载、参数配置、对话界面和 OpenAI 兼容的 REST API。

RWKV 是一种将 Transformer 的并行训练和 RNN 的 O(n) 推理优势结合的架构，适合资源受限的本地部署场景。[[chatrwkv]] 是 RWKV 作者 BlinkDL 对 RWKV-7 架构的技术介绍。

## Key Facts

| 属性 | 详情 |
|------|------|
| 开发者 | josStorer |
| 许可证 | Apache 2.0 |
| 语言 | Python + Gradio Web UI |
| 支持模型 | RWKV-4/5/6/7 全系列（0.1B~14B） |
| 后端 | PyTorch / CUDA / CPU |
| GitHub | https://github.com/josStorer/RWKV-Runner |

## 核心功能

### 一键部署
- 自动从 HuggingFace 下载 RWKV 权重（支持 .pth 和 .bin 格式）
- 根据 GPU 显存自动推荐量化精度（FP16/INT8/INT4）
- 内置模型管理：多模型切换、下载进度追踪

### 对话界面
- 基于 Gradio 的 Web UI，支持流式输出
- 多轮对话上下文管理
- 系统提示词/温度/top_p/最大 token 等参数可调
- 支持角色扮演模式和小说续写模式

### OpenAI 兼容 API
- 提供与 OpenAI Chat Completions API 同协议的本地端点
- 可直接对接 ChatGPT 前端、LangChain、AutoGPT 等生态工具
- 支持 function calling 模拟

### CLI 模式
- 无头（headless）运行，适合服务器部署
- 脚本化批量推理

## 与同类工具对比

RWKV-Runner vs. [[text-generation-webui]]：text-generation-webui 是通用 LLM WebUI（支持 5+ 后端、多模态、LoRA 训练），功能更全面但配置复杂；RWKV-Runner 专为 RWKV 架构优化，开箱即用，适合只想快速运行 RWKV 模型的用户。

RWKV-Runner vs. [[llama2-webui]]：llama2-webui 面向 LLaMA 生态（llama.cpp/GPTQ 后端）；RWKV-Runner 专注 RWKV 系列。两者都是轻量级本地推理工具。

## 与 RWKV 架构的关系

RWKV 的核心优势在于 **RNN 式 O(n) 推理**：推理复杂度随序列长度线性增长（而非 Transformer 的 O(n²)），这意味着：
- 3GB VRAM 可运行 14B 参数的 RWKV-7 模型
- 无 KV Cache 内存爆炸问题，适合长上下文场景
- 适合游戏 NPC 实时对话等低延迟需求

[[chatrwkv]] 页面详细介绍了 RWKV-7 的 Time Mixing 和 Channel Mixing 机制。

## 在游戏开发中的应用场景

- 低显存 NPC 对话引擎：在小显存 GPU 甚至 CPU 上运行 RWKV 驱动 NPC
- 游戏内实时文本生成：O(n) 推理确保长对话不卡顿
- 本地化 AI 助手：无需 API Key，完全离线的游戏开发辅助工具
- 小说/剧情生成：利用 RWKV 的长序列能力生成游戏世界观文本

## Links

- GitHub: https://github.com/josStorer/RWKV-Runner
- RWKV 官方: https://github.com/BlinkDL/RWKV-LM
- HuggingFace: https://huggingface.co/BlinkDL
