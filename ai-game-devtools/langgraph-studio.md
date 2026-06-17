---
title: LangGraph Studio
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [tool, agent, workflow, docker, framework, ai]
sources: [raw/articles/ai-game-devtools/langgraph-studio.md]
---

# LangGraph Studio

LangChain 推出的**专用 Agent IDE**，用于可视化开发、交互和调试基于 [[langgraph]] 的 LLM Agent 应用。

## Overview

LangGraph Studio 提供图形化的 Agent 开发环境，支持：
- **可视化图结构**: 自动渲染 LangGraph 状态图，节点=工具/LLM/代码，边=控制流
- **交互式调试**: 编辑输入/配置、提交运行、查看逐步输出
- **Thread 管理**: 创建/切换/编辑线程状态，支持 Fork 分支执行路径
- **Human-in-the-Loop**: 通过 `interrupt()` 暂停图执行等待用户输入
- **热重载**: 修改代码后自动重新加载，支持节点重放
- **LangSmith 集成**: 团队协作调试，记录和分析 Agent 行为

## Architecture

- **Desktop App**: macOS 专用 (.dmg)，Beta 期间免费
- **Web Studio (推荐)**: 本地 LangGraph Server + Web UI，无需 Docker，跨平台，启动更快
- **运行时依赖**: Docker Compose 2.22.0+（Desktop 模式）或 uv/venv（本地 Server 模式）
- **后端组件**: LangGraph API Server + Redis + Postgres
- **配置**: `langgraph.json` 定义图入口点和依赖

## Key Features

| 功能 | 描述 |
|------|------|
| 图可视化 | 自动渲染 LangGraph StateGraph，直观展示节点和边 |
| 交互式运行 | 选择图 → 编辑输入/配置 → 提交 → 查看分步输出 |
| 状态编辑 | 悬停节点编辑状态，Fork 创建替代执行路径 |
| 断点控制 | 在所有/指定节点设置 Interrupt，逐步执行 |
| 代码热重载 | 修改 .py 文件自动重载，支持 Open in VS Code |
| 项目管理 | 交互式编辑 langgraph.json，Save and Restart |

## Relationship to LangGraph

LangGraph Studio 是 [[langgraph]] 编排框架的配套开发工具：
- LangGraph 定义图结构（StateGraph、节点、边、checkpointing）
- Studio 提供可视化调试和交互式开发体验
- 两者结合形成完整的 Agent 开发 → 调试 → 部署工作流

## License & Status

- Desktop App: 闭源产品，Beta 期间免费
- 原 GitHub 仓库已移除（404），推荐改用本地 Web Studio
- 需要 LangSmith 账号认证

## Related Tools

- [[langgraph]] — 核心编排框架
- [[langchain]] — 上层框架生态
- [[langflow]] — 同类可视化 LLM 工作流构建器
- [[dify]] — 同类 LLM 应用开发平台
