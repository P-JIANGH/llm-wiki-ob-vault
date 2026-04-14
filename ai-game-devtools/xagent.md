---
title: XAgent
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [agent, llm, tool, open-source]
sources: [raw/articles/ai-game-devtools/xagent.md]
---

# XAgent

## Overview

XAgent 是 [[OpenBMB]] 开源实验性 LLM 驱动自主 Agent，能自动解决各种任务。采用 Dispatcher（调度器）+ Planner（规划器）+ Actor（执行器）三层架构，通过 Docker 沙箱保证安全性，支持 CLI 和 Web GUI 两种交互方式。

🏆 目标：打造能解决任何给定任务的超级智能 Agent。

## Architecture

### Core: 三组件架构

- **Dispatcher（调度器）**：动态实例化任务并分发给不同 Agent，支持新增 Agent 类型
- **Planner（规划器）**：生成和修正任务计划，将任务分解为子任务并设定里程碑
- **Actor（执行器）**：使用工具执行动作达成目标，支持与人类协作

### ToolServer（Docker 容器）

ToolServer 是 XAgent 的安全执行环境，提供以下工具：

| 工具 | 功能 |
|------|------|
| File Editor | 文本文件的读写修改 |
| Python Notebook | 交互式 Python 代码执行 |
| Web Browser | 网页搜索和访问 |
| Shell | 任意 bash 命令执行 |
| Rapid API | 从 Rapid API / [[ToolBench]] 获取并调用 API |

### 项目结构

```
XAgent/              # 核心 Agent 逻辑（agent/, workflow/, ai_functions/）
XAgentServer/        # Web 服务器（nginx + Python 后端 + 前端 App）
XAgentGen/           # Agent 生成框架
ToolServer/          # Docker 工具执行环境
local_workspace/      # Agent 工作目录
running_records/      # 执行历史记录
```

## 配置要求

- Python >= 3.10
- Docker + docker-compose（ToolServer 必需）
- OpenAI API Key（`assets/config.yml` 配置）
  - 主模型：`gpt-4-32k`（推荐）
  - 备选：`gpt-4`
  - 最低备选：`gpt-3.5-turbo-16k`（不推荐用 `gpt-3.5-turbo` 因 context 太短）

## Evaluation

- 50+ 真实复杂任务，5 大类别：Search & Report、Coding & Developing、Data Analysis、Math、Life Assistant
- 人类偏好评估：XAgent vs [[AutoGPT]] — XAgent 显著优胜
- 评测基准：多种 LLM Agent 基准测试数据集

## 许可证

Apache 2.0

## 相关链接

- GitHub: https://github.com/OpenBMB/XAgent
- 官网: https://www.x-agent.net/
- 文档: https://xagent-doc.readthedocs.io/
- Demo: https://www.youtube.com/watch?v=QGkpd-tsFPA

## 与同类工具对比

XAgent vs [[AutoGPT]]：
- XAgent 有 Planner 主动规划修正，AutoGPT 依赖一次性 prompt
- XAgent 有 Dispatcher 支持多 Agent 协作，AutoGPT 单 Agent
- XAgent 有 Docker 沙箱安全隔离，AutoGPT 直接本地执行
- XAgent 支持 Human-in-the-loop（AskForHumanHelp 工具），AutoGPT 不支持

XAgent vs [[MetaGPT]]：
- MetaGPT 模拟软件公司 SOP 角色协作，XAgent 是三层通用 Agent 架构
- MetaGPT 侧重代码生成，XAgent 是通用任务解决

XAgent vs [[Devika]]：
- Devika 也是 Devin 开源替代，架构相似（Planner/Researcher/Coder 等多 Agent）
- XAgent 有 ToolServer Docker 沙箱安全隔离，Devika 无类似安全层
