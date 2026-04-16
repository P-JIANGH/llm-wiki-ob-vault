---
title: Gigax
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [llm, agent, game, tool, open-source]
sources: [raw/articles/ai-game-devtools/gigax.md]
---

# Gigax

**Runtime LLM-powered NPCs for games.** 提供可以在游戏运行时通过 LLM 驱动 NPC 执行 `<speak>`、`<jump>`、`<attack>` 等任意定义动作的 Python 框架，基于 Outlines 结构化生成保证输出格式严格遵守。

## Overview

Gigax 是一个游戏运行时 NPC 推理框架，核心是 `NPCStepper` 类，通过 `get_action()` 方法接收当前场景上下文（地点、NPC、物品、事件历史、主角记忆/任务/技能），返回结构化的 `CharacterAction`。支持本地模式（LlamaCpp/Transformers + Outlines）和 API 模式。

## Key Facts

| | |
|---|---|
| **License** | MIT |
| **Language** | Python ≥3.10 |
| **Dependencies** | outlines, pydantic, openai, transformers, llama-cpp-python, jinja2 |
| **Models** | NPC-LLM-7B (Mistral), NPC-LLM-3_8B (Phi-3), NPC-LLM-3_8B-128k |
| **Inference** | <1s GPU 大多数显卡；也支持 GGUF CPU 推理 |
| **HuggingFace** | https://huggingface.co/Gigax |

## Architecture

### 模块设计

- **`step.py`** — `NPCStepper`：主导类，`get_action()` 是核心入口，同时支持 `generate_local()`（Outlines regex guided generation）和 `generate_api()`（Gigax API 调用）
- **`prompt.py`** — `NPCPrompt`：Jinja2 模板，组合世界知识、地点、NPC、物品、事件历史、主角属性、技能列表构造 prompt
- **`parse.py`** — `CharacterAction` + `get_guided_regex()`：用正则解析 LLM 原始输出为结构化动作对象
- **`scene.py`** — Pydantic 模型：定义了 `Location`、`Item`、`Character`、`ProtagonistCharacter`、`Skill`、`ParameterType`（character/location/item/amount/content 五种参数类型）

### 关键技术选型

- **Outlines 结构化生成**：用 `regex()` guided generation 保证 LLM 输出严格匹配 `Skill` 定义的格式
- **Pydantic 验证**：所有场景对象（角色、地点、物品）均有类型校验
- **双推理模式**：本地（LlamaCpp/Transformers）和远程 API（AsyncOpenAI）兼容

## 与同类工具的差异

Gigax 专注于**游戏运行时 NPC 动作决策**，而非通用 Agent 框架。与 [[ai-game-devtools/ai-town]] 的对话式 AI 角色不同，Gigax 通过预定义 `Skill`（如 attack、move、say）约束 NPC 的动作空间，输出是结构化的可执行动作而非纯文本。相较于 [[ai-game-devtools/cradle]] 的 screenshot→键鼠动作范式，Gigax 走的是结构化 LLM 生成路线，更接近 [[ai-game-devtools/generative-agents]] 的 Memory Stream 记忆架构但专注于动作输出。Outlines guided generation 是其区别于大多数游戏 NPC LLM 方案的独特技术选型。

## Links

- GitHub: https://github.com/GigaxGames/gigax
- HuggingFace: https://huggingface.co/Gigax
- Discord: https://discord.gg/rRBSueTKXg
