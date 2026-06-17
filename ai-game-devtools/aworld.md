---
title: AWorld
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [agent, framework, llm, multi-agent, tool, benchmark, open-source]
sources: [raw/articles/ai-game-devtools/aworld.md]
---

# AWorld — Agent Harness 框架

## Overview

**AWorld** 是 inclusionAI 开发的多智能体框架（Multi-Agent Framework）和 **Agent Harness**（驾驭层）。其核心定位区别于 LangChain/LangGraph 等框架层——Harness 层预配置了 Agent 编排、工具集成、记忆/上下文、执行控制和 Skills 系统，用户只需配置 API Key 即可运行。定位于"Raw Code → Agent Frameworks → Agent Harness"三层模型的最右侧。

License: **MIT**

## Architecture

### Swarm Topologies
- **Workflow**：确定性顺序/并行执行
- **Handoff**：AI 驱动的动态 Agent 委派
- **Team**：Leader-Follower 模式（根节点协调执行器）
- **Hybrid**：嵌套拓扑

### Built-in Sub-Agents（TeamSwarm 架构）

| Agent | 角色 | 核心功能 |
|-------|------|---------|
| 👑 AWorld Agent | 编排器 | 解析用户目标、创建计划、委派任务 |
| 🧑‍💻 Developer | 开发者 | CAST 工具写代码（Code AST 分析）|
| 🧐 Evaluator | 评估器 | Skill 驱动的质量评估 |
| 🎬 Video Diffusion | 视频生成 | 扩散模型（Kling-V3 等） |
| 🎤 Audio Generator | 语音生成 | TTS 模型文字转语音 |

### Self-Evolution Loop
```
Build (Developer) → Evaluate (Evaluator) → Evolve (refine) → Loop
```
目标：UI 质量分数达到阈值（如 > 0.9）时停止循环。

### CAST（Code Abstract Syntax Tree）
解决 Agent 处理大代码库时的上下文窗口限制：
- **Hierarchical Navigation**：代码结构层级导航
- **Nearly Infinite Context**：智能压缩，只给 Agent 相关信息
- **Surgical Code Modification**：精确修改，完整依赖感知

### Benchmark-Driven Development (BDD)
每个架构改进必须通过真实 Benchmark 验证，而非单元测试。

## Benchmark 成绩

| 类别 | 成绩 | 性能 | 日期 |
|------|------|------|------|
| 🤖 GAIA Benchmark | Leaderboard | Pass@1: 67.89%, Pass@3: 83.49%（109 tasks）| 2025/08/06 |
| 🧠 IMO 2025 | 5/6 problems solved | 6小时内 | 2025/07/25 |
| 🖼️ OSWorld | Rank 1st | 58.0% Success Rate | 2025/09/18 |
| 🖼️ VisualWebArena | September Rank 1st | 36.5% Success Rate | 2025/09/25 |
| 🔍 Xbench | Excellence | Pass@1: 51% | 2025/10/23 |

## 目录结构

```
aworld/                    # 框架 + 运行时核心
├── core/                  # Agent, tool, context, memory 抽象
│   ├── agent/            # 多智能体编排（MAS 核心）
│   ├── tool/             # 工具抽象和工厂
│   ├── context/          # 上下文管理（Amni 引擎）
│   └── memory.py         # 记忆系统
├── agents/               # 预构建 Agent
├── tools/                # 内置工具
├── sandbox/              # 工具执行抽象层
└── checkpoint/           # 状态快照（实验性）

aworld-cli/               # CLI 执行层（用户入口）
aworld-skills/            # Skills Hub（动态加载）
examples/                 # GAIA, XBench, 快速入门
```

## 安装

```bash
git clone https://github.com/inclusionAI/AWorld && cd AWorld
conda create -n aworld_env python=3.11 -y && conda activate aworld_env
pip install -e . && cd aworld-cli && pip install -e .
aworld-cli --config
```

环境变量（.env）：
```bash
LLM_MODEL_NAME="claude-sonnet-4"
LLM_PROVIDER="openai"
LLM_API_KEY="your_api_key"
LLM_BASE_URL="your_base_url"
```

## 关键差异

与 [[ai-game-devtools/autogen|AutoGen]] 和 [[ai-game-devtools/metagpt|MetaGPT]] 的区别：

| 维度 | AWorld | AutoGen | MetaGPT |
|------|--------|---------|---------|
| 分层定位 | **Harness**（开箱即用） | Framework（模块化） | Framework（模块化） |
| 核心创新 | CAST + BDD + Self-Evolution | 双Agent对话/群聊 | SOP 角色协作 |
| 评估驱动 | 内置 GAIA/XBench/IMO 基准 | 无内置 Benchmark | 无内置 Benchmark |
| Benchmark 成绩 | 多项 Leaderboard 1st | 无公开 Benchmark 成绩 | 无公开 Benchmark 成绩 |
| Skills 系统 | 动态加载社区贡献的 Skills | 无 | 无 |

## 发布论文

- **AWorld: Orchestrating the Training Recipe for Agentic AI** — arXiv 2025, [model](https://huggingface.co/inclusionAI/Qwen3-32B-AWorld)
- **FunReason: Enhancing LLMs' Function Calling via Self-Refinement** — arXiv 2025
- **Profile-Aware Maneuvering for GAIA** — arXiv 2025
- **Recon-Act: Multi-Agent Browser-Use System** — arXiv 2025

## 相关链接

- GitHub: https://github.com/inclusionAI/AWorld
- DeepWiki: https://deepwiki.com
- GAIA Playground: https://playground.aworldagents.com/
