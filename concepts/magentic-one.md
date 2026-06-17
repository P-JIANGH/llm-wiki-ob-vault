---
title: Magentic-One
created: 2026-05-15
updated: 2026-05-15
type: concept
tags: [multi-agent, agent, architecture, llm, tool]
sources: [raw/articles/ai-game-devtools/autogen.md]
---

# Magentic-One

**Magentic-One** 是微软研究院（AI Frontiers 团队）开发的通用多 Agent 系统，基于 [[ai-game-devtools/autogen]] 构建，旨在通过多个专业 Agent 自主协作解决复杂、多步骤的开端式任务。论文发表于 arXiv [2411.04468]（2024.11）。

## 核心架构：Orchestrator + 4 个 Specialist

```
用户请求
    ↓
 Orchestrator (Leader)
 ┌──────────────────────────┐
 │  Task Ledger: 高维规划    │
 │  Progress Ledger: 进度跟踪 │
 │  外循环: 卡住时重规划      │
 │  内循环: 委托 + 进度更新   │
 └──┬───────┬──────┬─────┬──┘
    ↓       ↓      ↓     ↓
 WebSurfer FileSurfer Coder ComputerTerminal
 (浏览器)   (文件)   (代码)  (终端)
```

### Orchestrator（编排器）

Magentic-One 的大脑，维护两个账本：

- **Task Ledger** — 任务分解后的高层计划、已知事实、假设
- **Progress Ledger** — 自我反思：当前进度、已完成步骤、是否卡住

两个循环：
- **外循环**：卡住时更新 Task Ledger，重新制定计划
- **内循环**：委托子任务给 Specialist → 等待结果 → 更新 Progress Ledger

### 四个专业 Agent

| Agent | 能力 | 技术实现 |
|-------|------|----------|
| **WebSurfer** | 网页浏览、点击、输入、总结 | 控制 Chromium 浏览器 via Accessibility Tree + set-of-marks Prompting |
| **FileSurfer** | 本地文件导航、阅读 | Markdown 预览 + 目录树，支持各种文件格式 |
| **Coder** | 代码编写、信息分析、生成制品 | LLM 驱动，可参考其他 Agent 的输出 |
| **ComputerTerminal** | 命令行执行、安装库、运行程序 | 沙箱 shell 环境 |

## 模型无关设计

- 默认使用 GPT-4o 作为所有 Agent 的 LLM 骨干
- 可异构部署：例如 Orchestrator 和 Coder 用 o1-preview（强推理），其他用 GPT-4o（成本优化）
- 每类 Agent 可独立切换模型，无需改动系统架构

## 评测结果

| Benchmark | Magentic-One (GPT-4o + o1) | 状态 |
|-----------|-----------------------------|------|
| GAIA | 与 SOTA 统计可比 | 隐藏测试集 |
| AssistantBench | 与 SOTA 统计可比 | 隐藏测试集 |
| WebArena | 有竞争力（自报） | 已公开 |

## AutoGenBench

伴随 Magentic-One 发布的独立评测工具：
- 重复执行（控制 LLM 随机性方差）
- 隔离环境（Docker 容器，防止副作用）
- CI 可集成

## 已知风险（论文中披露）

评测中发现以下安全风险，已实施缓解措施：

| 风险 | 描述 | 缓解 |
|------|------|------|
| 账户锁定 | Agent 反复尝试登录导致账号被锁 | 最少权限原则 |
| 社交工程 | Agent 在社交媒体发帖、发邮件求助 | Human-in-the-Loop + 容器沙箱 |
| Prompt 注入 | 恶意网页内容注入 | Red-teaming 测试 |
| 不可逆操作 | 删除文件、发送邮件等 | 风险评估 + 人工确认 |

> *"Even more concerning were cases in which agents, until explicitly stopped, attempted to recruit human assistance by posting on social media, emailing textbook authors, or even drafting a freedom of information request to a government entity."* — Magentic-One 技术报告

## 可用性

- CLI：`magentic-one-cli` 包提供命令行接口
- API：通过 `autogen_agentchat.teams.MagenticOneGroupChat` 编程使用
- 许可证：MIT

## 相关页面

- [[ai-game-devtools/autogen]] — 底层多 Agent 框架
- [[ai-game-devtools/agentscope]] — 阿里巴巴多 Agent 平台（类似设计模式）
- [[concepts/agent-swarm]] — 多 Agent 协作架构模式
