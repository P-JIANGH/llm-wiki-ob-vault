---
title: SWE-agent
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [ai, llm, agent, tool, open-source, python]
sources: [raw/articles/ai-game-devtools/swe-agent.md]
---

# SWE-agent

Princeton + Stanford 开源的 Agent Computer Interface (ACI)，使 LLM（GPT-4o、Claude Sonnet 4 等）能够自主使用工具修复 GitHub 仓库 issue、发现网络安全漏洞或执行自定义任务。

## Overview

SWE-agent 在 SWE-bench 上取得了开源项目中的最佳成绩（SoTA）。核心设计理念是将 LLM 的自由度最大化，通过 YAML 配置文件驱动，高度适合学术研究。论文发表于 NeurIPS 2024 (arxiv.org/abs/2405.15793)。

> ⚠️ 团队当前开发重心已转向 [Mini-SWE-Agent](https://github.com/SWE-agent/mini-swe-agent/)，用 100 行 Python 实现同等性能，推荐新项目使用 mini 版本。

## 关键里程碑

| 日期 | 成就 |
|------|------|
| 2024-05 | 论文发表于 NeurIPS 2024 |
| 2025-02 | SWE-agent 1.0 + Claude 3.7 在 SWE-bench full/verified 取得 SoTA |
| 2025-05 | SWE-agent-LM-32b 取得 open-weights SOTA |
| 2025-07 | Mini-SWE-Agent 以 100 行 Python 达到 65% SWE-bench verified |

## 架构

**核心模块：**
- `sweagent/agent/` — Agent 主循环 (agents.py)、LLM 模型抽象 (models.py)、动作采样 (action_sampler.py)、历史处理 (history_processors.py)
- `sweagent/tools/` — 工具管理 (tools.py)、命令定义 (commands.py)、解析器 (parsing.py)
- `sweagent/run/` — 执行模式：交互式 shell、批量 benchmark、单任务运行
- `config/` — YAML 配置文件定义 Agent 行为、工具集、提示词模板

**技术栈：**
- Python 3.11+
- **LLM 抽象层：** LiteLLM（支持 OpenAI/Anthropic/多提供商）
- **远程执行：** SWE-ReX（沙箱环境执行代码）
- **Web 界面：** Flask + SocketIO
- **TUI：** Textual（终端 UI）
- **GitHub 集成：** GitPython + ghapi

## EnIGMA 网络安全模式

SWE-agent 内置 EnIGMA 模式，专门用于 CTF（Capture The Flag）网络安全挑战。在多个网络安全 benchmark 上取得 SoTA 成绩。

## 与同类工具差异

- 与 [[hermes-agent]] 对比：SWE-agent 专注代码修复任务，hermes-agent 是通用 Agent 框架（13+ 消息平台、工具注册中心）
- 与 [[aios]] 对比：SWE-agent 是单一 Agent 应用，AIOS 是 Agent 操作系统级别的抽象（调度/记忆/存储/工具内核层）
- 与 [[chatdev]] 对比：SWE-agent 单 Agent 修 bug，ChatDev 多 Agent 协作开发完整软件

## 相关链接

- **GitHub:** https://github.com/princeton-nlp/SWE-agent
- **文档:** https://swe-agent.com
- **论文:** https://arxiv.org/abs/2405.15793
- **后继项目:** https://github.com/SWE-agent/mini-swe-agent/
- **许可证:** MIT
