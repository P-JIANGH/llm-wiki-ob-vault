---
title: NVIDIA NeMo Agent Toolkit
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [ai, agent, tool, python, framework]
sources: [raw/articles/ai-game-devtools/nvidia-nemo-agent-toolkit.md]
---

# NVIDIA NeMo Agent Toolkit (NAT)

## Overview

NVIDIA NeMo Agent Toolkit 是 NVIDIA 开源的多智能体编排框架，专注于高效连接和优化 AI Agent 团队。通过企业级工具链（可观测性、持续学习、性能优化）增强任何框架下 Agent 的速度、准确性和自主决策能力。

- **PyPI 包名:** `nvidia-nat`
- **许可证:** Apache 2.0
- **最新版本:** v1.5.0
- **GitHub:** [NVIDIA/NeMo-Agent-Toolkit](https://github.com/NVIDIA/NeMo-Agent-Toolkit)
- **核心特性:** 框架无关、插件化架构、企业级可观测性

## 技术架构

### 安装方式

```bash
# 核心安装（无需 GPU）
pip install nvidia-nat

# 带 LangChain/LangGraph 插件
pip install nvidia-nat[langchain]
```

**支持平台:** Linux (x86_64/aarch64)、macOS (Apple Silicon)、Windows (x86_64 未测试)
**Python 版本:** 3.11, 3.12, 3.13
**GPU 要求:** 默认不需要 GPU

### 插件生态系统

NAT 采用可选插件架构，按需安装避免依赖膨胀：

| 类别 | 插件 |
|---|---|
| Agent 框架 | langchain, llama-index, adk, crewai, semantic-kernel, strands, agno |
| 记忆与存储 | mem0ai, memmachine, mysql, redis, s3, zep-cloud |
| 评估与分析 | eval, profiler, weave, phoenix, ragaai |
| 安全与遥测 | security, opentelemetry, pii-defense |
| 服务部署 | async_endpoints, gunicorn |

### CLI 工作流

核心命令:
- `nat run --config workflow.yml` — 执行工作流
- `nat eval` — 评估（需 eval 插件）
- `nat optimize` — 配置优化
- `nat serve` — 服务模式
- `nat red-team` — 安全测试

用户通过 `workflow.yml` 定义 Agent、工具和执行逻辑。

## 同类工具对比

与 [[langchain]] 和 [[crewai]] 等框架不同，NAT 本身不是 Agent 框架，而是**跨框架的编排层**——它可以连接和优化任何 Agent 架构。与 [[flowise]] 的可视化编排相比，NAT 采用配置文件驱动的方式。

NAT 的插件系统支持 [[langchain]]、[[llama-index]]、[[crewai]] 等主流框架，使其可以作为统一的多框架管理层。

## 游戏开发相关价值

在游戏 AI 开发中，NAT 可用于：
- 多 NPC Agent 的协同编排
- Agent 行为观测与持续优化
- 跨框架（如结合 LLM + 游戏引擎）的统一管理
- 无需 GPU 即可运行，适合本地开发

## 关键链接

- [GitHub](https://github.com/NVIDIA/NeMo-Agent-Toolkit)
- [PyPI](https://pypi.org/project/nvidia-nat/)
- [Google Colab 快速入门](https://colab.research.google.com/github/NVIDIA/NeMo-Agent-Toolkit/)
- [DeepWiki AI 文档](https://deepwiki.com/NVIDIA/NeMo-Agent-Toolkit)
