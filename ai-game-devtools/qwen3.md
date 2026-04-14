---
title: Qwen3
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, model, moe, multimodal, open-source, agent, chinese]
sources: [raw/articles/ai-game-devtools/qwen3.md]
---

# Qwen3

阿里巴巴通义千问第三代大语言模型，由 Qwen 团队开发。Qwen3 首次引入 MoE 架构和多模态能力，支持 thinking/non-thinking 双模式灵活切换。

## 核心特性

| 特性 | 说明 |
|------|------|
| **架构** | Dense + MoE (0.6B~235B) |
| **上下文** | 256K token，扩展至 1M |
| **多语言** | 100+ 语言和方言 |
| **协议** | Apache 2.0 |

## 模型系列

### Qwen3-2507 (最新)
- **Qwen3-Instruct-2507**: 通用对话（非 thinking 模式）
- **Qwen3-Thinking-2507**: 复杂推理（thinking 模式）
- 规模: 235B-A22B / 30B-A3B / 4B

### Qwen3-2504 (原版)
- Dense: 0.6B, 1.7B, 4B, 8B, 14B, 32B
- MoE: 30B-A3B, 235B-A22B

## Thinking 模式

Qwen3 支持 thinking/non-thinking 模式切换：
- `enable_thinking=False` 参数禁用 thinking
- `/think` / `/no_think` 指令实时切换
- thinking 模式适用于数学、代码、逻辑推理等复杂任务

## 推理框架

Transformers、SGLang、vLLM、llama.cpp、Ollama、TensorRT-LLM、LMStudio、MLX、OpenVINO、ExecuTorch、MNN

## 工具集成

- [[qwen-agent]]：Agent 封装，支持工具调用和 MCP
- 微调：Axolotl、UnSloth、SWIFT、LLaMA-Factory

## 相关模型

- [[chinese-llama-alpaca-3]]：另一个中文 LLM 系列
- [[chatrwkv]]：100% RNN 架构的 LLM，对比 Qwen3 的 Transformer 架构
- [[aios]]：AI Agent 操作系统，与 Qwen3 的 Agent 能力相关

## 链接

- [GitHub](https://github.com/QwenLM/Qwen3) | [Hugging Face](https://huggingface.co/Qwen) | [ModelScope](https://modelscope.cn/organization/qwen) | [论文](https://arxiv.org/abs/2505.09388)
