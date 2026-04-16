# LangGraph Studio Desktop (Beta) — Raw Source

**Source:** https://github.com/langchain-ai/langgraph-studio (original repo removed/forked)
**Fork analyzed:** https://github.com/anygrab-kick/langchain-ai-langgraph-studio
**Date:** 2026-04-16

## Overview

LangGraph Studio 是 LangChain 推出的**专用 Agent IDE**，用于可视化开发、交互和调试复杂的 LLM Agent 应用。

- 提供可视化图结构展示 Agent 工作流
- 支持编辑线程状态和分支执行路径
- 集成 LangSmith 用于团队协作调试
- macOS Desktop App (.dmg) + 本地 Web 版本

## Key Features

### 1. 可视化图结构
- 自动渲染 LangGraph 定义的状态图
- 节点 = LLM 调用/工具/代码逻辑
- 边 = 控制流（条件路由、循环、并行分支）

### 2. 交互式调试
- **Invoke Graph**: 选择图、编辑输入/配置、提交运行
- **Thread 管理**: 创建/切换/编辑线程状态
- **State Editing**: 悬停节点 → 铅笔图标编辑 → Fork 创建替代执行路径
- **Interrupts**: 在所有节点或指定节点设置断点，逐步执行

### 3. Human-in-the-Loop
- 支持 `interrupt()` 暂停图执行等待用户输入
- 替换命令行 `input()` 模式
- 通过 `Command` 对象控制流程跳转

### 4. 热重载
- 修改 `.py` 文件后自动重新加载
- "Open in VS Code" 直接编辑项目代码
- 支持重放已运行节点（修改代码后重新执行）

### 5. 项目配置管理
- 交互式编辑 `langgraph.json` 配置文件
- Save and Restart 重新加载 API 服务器

## Technical Architecture

- **依赖**: Docker Compose 2.22.0+ (Docker Desktop 或 Orbstack)
- **运行时**: 本地 LangGraph Server + Redis + Postgres (通过 Docker Compose)
- **平台**: macOS Desktop App (.dmg) + 跨平台 Web 版本
- **配置**: `langgraph.json` 定义图入口点和依赖

## Setup Flow

1. 创建 LangGraph 项目 (含 `langgraph.json`)
2. 设置 `.env` 文件 (API keys: OpenAI/Anthropic/Tavily)
3. 打开 LangGraph Studio → 登录 LangSmith
4. 选择项目目录 → 自动启动 API 服务器
5. 可视化图渲染 + 交互调试

## Relationship with LangGraph Platform

- 官方推荐使用**本地 LangGraph Server + Web Studio** 替代 Desktop App
- 本地版本无需 Docker，启动更快，支持代码热重载
- 跨平台支持（不仅限 macOS）

## Notes

- 原 GitHub 仓库 `langchain-ai/langgraph-studio` 已移除（404）
- Desktop App 为闭源产品，Beta 期间免费
- 需要 LangSmith 账号认证
- Fork 仓库仅包含 README 和截图，无源代码
