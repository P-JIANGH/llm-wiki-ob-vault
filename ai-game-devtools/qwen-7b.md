---
title: Qwen-7B
created: 2026-04-22
updated: 2026-04-22
type: entity
tags: [llm, open-source, multilingual, tool, game-dev]
sources: [raw/articles/ai-game-devtools/qwen-7b.md]
---

# Qwen-7B

Alibaba Cloud 通义千问开源大语言模型系列（Qwen-1.8B/7B/14B/72B），2023 年8 月发布，支持中英双语和工具调用。该仓库现已停止维护，后续版本请参考 [[qwen1.5]] / [[qwen2]] / [[qwen3]]。

## Overview

Qwen-7B 是阿里云通义千问团队发布的开源 LLM 系列基准模型，基于 Transformer 架构，预训练资料高达 2.4T–3T tokens。在同级别模型中中文能力突出，支持最长 32K 上下文窗口。

## Key Facts

| 属性 | 值 |
|------|-----|
| 开发方 | Alibaba Cloud / QwenLM |
| 发布时间 | 2023.08 |
| 参数量 | 1.8B / 7B / 14B / 72B |
| 预训练 tokens | 2.2T–3.0T |
| 最大 Context | 32K |
| 支持语言 | 中、英等多语言 |
| 许可证 | Tongyi Qianwen License |
| 状态 | 已停止维护（后续转至 Qwen1.5+） |

## 技术特点

- **多语言能力**：在 C-Eval、CMMLU 等中文 benchmark 上显著优于同级别 LLaMA2 模型
- **长上下文**：支持最长 32K tokens，适合游戏剧情/任务描述生成
- **工具调用**：Chat 版支持 ReAct 和工具使用，可用于游戏内 Agent 系统
- **量化部署**：提供 Int4/Int8 量化版本，7B-Chat-Int4 仅需 8.2GB VRAM
- **微调支持**：支持全参数微调、LoRA、Q-LoRA

## 游戏开发相关

- **NPC 对话生成**：强多语言聊天能力适合多语言游戏角色
- **代码生成**：可通过 [[text-generation-webui]] 或 vLLM 部署为游戏开发提供 LLM 服务
- **本地部署**：小型号（1.8B）可在消费级 GPU 上本地运行
- **Unity 集成**：可通过 HTTP API 接入 [[ChatGPT-API-unity]] 或 [[SimpleOllamaUnity]] 类方案集成到 Unity

## 与同类工具差异

- Qwen-7B vs [[Llama-2]]：中文能力显著强于 LLaMA2，但英文性能略低于同级别 LLaMA2
- Qwen-7B vs [[Baichuan-2]]：同属国产开源 LLM，Qwen 在工具调用和长上下文方面更强
- Qwen-7B vs [[qwen2]]：Qwen2 是后继版，支持更长上下文和更强的工具调用

## Related Links

- GitHub: https://github.com/QwenLM/Qwen-7B (已停止维护)
- HuggingFace: https://huggingface.co/Qwen
- 后续版本: [[qwen1.5]] → [[qwen2]] → [[qwen3]]
