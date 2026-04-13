---
title: llama2-webui
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, tool, game-engine, open-source]
sources: [raw/articles/ai-game-devtools/llama2-webui.md]
---

# llama2-webui

## 概述

Llama 2 本地运行 Web UI + Python 封装包（`llama2-wrapper`），支持 GPU/CPU 多后端推理。面向希望在游戏/应用中集成本地 LLM 的开发者。

- **GitHub**: https://github.com/liltom-eth/llama2-webui
- **License**: MIT
- **PyPI 包**: llama2-wrapper (v0.1.14)

## 核心能力

| 维度 | 支持内容 |
|------|---------|
| **模型** | Llama-2-7b/13b/70b、GPTQ、GGML、GGUF、CodeLlama |
| **后端** | llama.cpp（默认）、transformers、bitsandbytes（8-bit）、AutoGPTQ（4-bit）|
| **界面** | Gradio 聊天 UI、Code Llama 代码补全 UI |
| **API** | FastAPI OpenAI 兼容端点（/v1/chat/completions）|

## 技术架构

```
app.py                    # Gradio Web UI 入口
code_completion.py        # Code Llama 代码补全 UI
benchmark.py              # 性能基准测试
llama2_wrapper/
  model.py               # LLAMA2_WRAPPER 核心类（多后端自动切换）
  server/                 # FastAPI OpenAI 兼容 API 服务
pyproject.toml           # Poetry 项目配置
```

### llama2_wrapper 多后端设计

```python
from llama2_wrapper import LLAMA2_WRAPPER

# llama.cpp 后端（默认，自动下载 GGUF）
wrapper = LLAMA2_WRAPPER()

# GPTQ 4-bit 后端（Nvidia GPU）
wrapper = LLAMA2_WRAPPER(backend_type="gptq", model_path="./models/...")

# transformers + bitsandbytes 8-bit
wrapper = LLAMA2_WRAPPER(
    backend_type="transformers",
    load_in_8bit=True
)
```

## 与同类工具对比

- **对比 [[ai-game-devtools/text-generation-webui]]**：text-generation-webui 功能更全面（多模型支持、LoRA 管理）；llama2-webui 聚焦 Llama 2 单一系列，更轻量
- **对比 [[ai-game-devtools/gpt4all]]**：gpt4all 侧重无代码本地 GUI；llama2-webui 配套 PyPI 包更适合应用集成

## 在游戏开发中的用途

- NPC 对话生成（本地运行，无需云端 API）
- 游戏内代码助手（Code Llama 代码补全）
- 游戏叙事生成（配合 [[ai-game-devtools/text-generation-webui]] 等工具）

## 链接

- PyPI: https://pypi.org/project/llama2-wrapper/
- Colab 示例: ./colab/Llama_2_7b_Chat_GPTQ.ipynb
