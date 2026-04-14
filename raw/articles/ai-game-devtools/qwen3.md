# Qwen3 - AI Game DevTools Source

> Extracted from: https://github.com/QwenLM/Qwen3
> Date: 2026-04-14
> Type: GitHub Repository - LLM Model

## Overview

Qwen3 是阿里巴巴通义千问系列的大语言模型第三代产品，由 Qwen 团队（阿里巴巴）开发。Qwen3 首次引入了 MoE（混合专家）架构和多模态能力，并支持 thinking/non-thinking 双模式灵活切换。

## 关键信息

- **开发组织**: 阿里巴巴 Qwen 团队
- **开源协议**: Apache 2.0
- **发布平台**: Hugging Face、ModelScope
- **论文**: arXiv:2505.09388

## 模型架构

### Qwen3-2507 (最新版本)

两个变体：
- **Qwen3-Instruct-2507**: 非 thinking 模式，适用于通用对话
- **Qwen3-Thinking-2507**: thinking 模式，适用于复杂推理任务

三种规模：
- 235B-A22B (MoE)
- 30B-A3B (MoE)
- 4B (Dense)

### Qwen3-2504 (原版)

支持 Dense 和 MoE 架构：
- 0.6B, 1.7B, 4B, 8B, 14B, 32B (Dense)
- 30B-A3B, 235B-A22B (MoE)

## 核心能力

1. **Thinking/Non-thinking 模式切换**: 通过 `enable_thinking=False` 或 `/think`/`/no_think` 指令切换
2. **Agent 能力**: 外部工具集成，支持 MCP
3. **多语言**: 100+ 语言和方言
4. **长上下文**: 256K token，扩展至 1M token
5. **推理能力**: 数学、代码、逻辑推理达到 SOTA

## 推理框架支持

- Transformers (torch)
- SGLang (>=0.4.6.post1)
- vLLM (>=0.9.0)
- llama.cpp (>=b5401)
- Ollama (>=v0.9.0)
- TensorRT-LLM
- LMStudio
- MLX LM (Apple Silicon)
- OpenVINO
- ExecuTorch
- MNN (移动端)
- ModelScope

## 工具链集成

- **Qwen-Agent**: 提供 Agent 封装，支持工具调用和 MCP
- **微调框架**: Axolotl, UnSloth, SWIFT, LLaMA-Factory

## 相关链接

- Hugging Face: https://huggingface.co/Qwen
- ModelScope: https://modelscope.cn/organization/qwen
- 论文: https://arxiv.org/abs/2505.09388
- 文档: https://qwen.readthedocs.io/
- Discord: https://discord.gg/CV4E9rpNSD
