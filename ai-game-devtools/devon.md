---
title: Devon
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [tool, llm, code, open-source, agent]
sources: [raw/articles/ai-game-devtools/devon.md]
---

# Devon

开源 AI 结对编程助手（pair programmer），由 [entropy-research](https://github.com/entropy-research) 维护。核心理念：让 AI 编程能力向所有人开放。

## 概述

Devon 是一个 2024 年 3 月启动的社区驱动项目，定位为开源版 [[Devika]] 替代方案。提供 Electron 桌面 UI、终端 TUI 和 pipx 安装的后端 Python 包三种使用方式。支持多模型（Claude/GPT-4o/Groq/Ollama），专注于真实代码库的多文件编辑、探索、测试编写和 bug 修复。

## 技术特点

**多模型支持**（Model Tier）：
- Anthropic: claude-opus / claude-sonnet / claude-3.5-sonnet / claude-haiku
- OpenAI: gpt4-o / gpt4-turbo
- Groq: llama-3-70b
- Ollama: deepseek-coder:6.7b（本地）

**架构**：`session.py` (1298行) 为核心，处理 Agent 循环；`task_agent.py` (403行) 负责任务分解；`tool.py` 定义工具基类。

**工具集**：编辑器（editortools/edittools）、文件读写（filetools）、代码搜索（filesearchtools/codeindex）、Shell 执行（shelltool）、SWE-bench 专用工具（swebenchtools）。

**技术栈**：Python >=3.10, Poetry, FastAPI, Litellm, LlamaIndex, SQLAlchemy/aiosqlite, Node.js/Electron。

## 主要功能

- 多文件代码编辑
- 代码库探索与索引导航
- 自动编写测试用例
- Bug 修复
- 配置文件生成
- 架构分析
- 本地模型支持（Ollama）

## 许可证

AGPL（LICENSE 文件确认，原 README 误标为 Apache 2.0）。

## 与同类工具对比

| 工具 | 特点 | 许可证 |
|------|------|--------|
| Devon | 专注代码层面，Electron+TUI 双界面 | AGPL |
| [[Devika]] | 浏览器端 UI，多 Agent 架构 | MIT |
| [[Auto-GPT]] | 通用自主 Agent，浏览器/文件操作 | MIT |
| [[SWE-agent]] | 专注 SWE-bench 基准测试 | MIT |

## 相关链接

- GitHub: https://github.com/entropy-research/Devon
- Discord: https://discord.gg/p5YpZ5vjd9
- PyPI: `pipx install devon_agent`

## 备注

- 2024-05-08 曾超越 AutoCodeRover 在 SWE-Bench Lite 上的表现
- 非 Python 语言支持较弱（官方承认局限性）
- 本地模式（Ollama）仍在实验阶段
