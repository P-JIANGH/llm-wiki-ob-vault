---
title: Qwen2
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, open-source, agent, tool, multilingual, game-engine]
sources: [raw/articles/ai-game-devtools/qwen2.md, raw/articles/ai-game-devtools/qwen1.5.md]
---

# Qwen2

Alibaba Cloud（通义千问）第二代大语言模型系列。参数范围 0.5B–72B，支持 [[vLLM]] / [[SGLang]] / [[llama.cpp]] 等推理框架，Apache 2.0 开源。

## Overview

Qwen2 是 Qwen 系列模型的第二代，发布于 2024 年。相比 Qwen2.5，参数规模更小（0.5B–72B），定位为轻量级高性能 LLM。

## Key Facts

| 属性 | 值 |
|------|-----|
| 开发方 | Alibaba Cloud（通义千问）|
| 发布时间 | 2024 |
| 参数量 | 0.5B, 1.5B, 7B, 72B |
| 预训练语料 | - |
| 最大 Context | 128K |
| 支持语言 | 100+ |
| 许可证 | Apache 2.0 |

## 技术特点

- **多语言支持**：覆盖 100+ 语言，中英双语能力强
- **工具调用**：支持 function calling 和 [[MCP]]（Model Context Protocol）
- **Agent 集成**：通过 [[Qwen-Agent]] 实现复杂 Agent 工作流
- **推理框架**：兼容 [[vLLM]]、[[SGLang]]、llama.cpp、Ollama、TensorRT-LLM、MNN、ExecuTorch、MLX LM、OpenVINO
- **游戏开发集成**：已有 Unity 集成方案（[[ChatGPTForUnity]] 类工具可对标）

## 与同类工具差异

- Qwen2 vs [[Qwen1.5]]：Qwen2 是 Qwen1.5 的后继，训练更高效，工具调用能力更强
- Qwen2 vs [[Llama-3]]：两者性能相近，Qwen2 在中文和工具调用场景有优势
- Qwen2 vs [[GLM-4]]：同属国产旗舰 LLM，Qwen2 生态更开放（更多推理框架支持）

## 应用场景

- 游戏 NPC 对话生成（结合 Agent 框架）
- 游戏内工具调用（物品查询、任务生成）
- 跨语言游戏本地化
- Unity / Unreal Engine 集成（通过 HTTP API 调用）

## Related Links

- GitHub: https://github.com/QwenLM/Qwen2
- HuggingFace: https://huggingface.co/Qwen/Qwen2
- Qwen-Agent: https://github.com/QwenLM/Qwen-Agent
- [[vLLM]]: 推理部署
- [[SGLang]]: 高性能推理服务
- [[Qwen1.5]]: 前代版本
