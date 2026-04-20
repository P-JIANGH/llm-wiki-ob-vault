---
title: ToolBench
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, agent, tool, open-source]
sources: [raw/articles/ai-game-devtools/toolbench.md]
---

# ToolBench (ToolLLM)

## 概述

ToolBench（ToolLLM）是 OpenBMB 开源的大规模指令微调 SFT 数据集项目，旨在赋予开源 LLM 通用**工具使用能力**，让模型掌握数千种真实世界 REST API。核心贡献是通过 DFSDT（深度优先搜索决策树）方法自动构建高质量工具调用训练数据。

## 核心数据

| 指标 | 数值 |
|------|------|
| Tool 数量 | 3,451 |
| API 数量 | 16,464 |
| Instance 数量 | 126K |
| 真实 API 调用 | 469K |

数据来源：RapidAPI 平台真实 REST API，自动生成指令和答案轨迹。

## 技术特点

### DFSDT 决策树标注

DFSDT（Depth-First Search based Decision Tree）比 CoT 或 ReAct 效率更高，能成功标注复杂多跳指令（单工具 → 跨类多工具 → 跨集合多工具）。

### 开放域工具检索

集成 API Retriever，支持开放域工具发现。用户输入自然语言查询，系统自动检索相关 API 并调用。

### 训练基于 FastChat

ToolLLaMA 训练代码基于 [FastChat](https://github.com/lm-sys/FastChat)，支持 FSDP 分布式训练和 LoRA 高效微调。

## 发布模型

- **ToolLLaMA-2-7b-v2**: 最新版，HuggingFace: `ToolBench/ToolLLaMA-2-7b-v2`
- **ToolLLaMA-7b-v1**: 早期版本
- **ToolLLaMA-7b-LoRA-v1**: LoRA 高效微调版
- **ToolBench_IR_bert_based_uncased**: API 检索器

## 游戏开发场景

ToolBench 的工具调用能力可用于游戏 AI：
- NPC 对话系统：动态调用游戏数据库 API 查询角色/物品信息
- AI Agent 规划：让 NPC 自主调用多个 API 组合完成复杂任务
- 工具增强的游戏 AI：赋予 AI 使用外部工具（天气 API、数据库查询等）的能力

类似项目参考 [[ai-game-devtools/metagpt]]（多 Agent 软件开发框架）和 [[ai-game-devtools/autogen]]（微软多 Agent 协作框架）。

## 许可证

Apache License 2.0

## 相关链接

- GitHub: https://github.com/openbmb/toolbench
- Paper: https://arxiv.org/pdf/2307.16789.pdf
- StableToolBench: https://github.com/zhichengg/StableToolBench（本地模拟版）
