---
title: agent-swarm
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [agent, llm, multi-agent, architecture]
sources: [raw/articles/clawteam-readme-2026.md, raw/articles/nanobot-readme-2026.md]
---

# Agent Swarm（Agent 蜂群）

一种多 Agent 协作架构模式：多个专用 Agent 在一个 Leader 协调下组成团队，共享任务、消息和工作空间，自主完成复杂目标。

## 核心理念

**Solo Agent → Agent Swarm**

| Solo Agent | Agent Swarm |
|-----------|-------------|
| 一个人干所有事 | 专业化分工 |
| 上下文窗口是瓶颈 | 多个 Agent 分担上下文 |
| 遇到复杂任务卡住 | Leader 拆解 + 多个 Worker 并行 |
| 人工协调多个 Agent | Agent 自主协调（通过 CLI/inbox） |

## ClawTeam 的实现

```
Human: "优化这个 LLM"
         │
         ▼
  ┌──────────────┐     oh spawn     ┌──────────────┐
  │ 🦞 Leader    │ ──────────────────► │ 🤖 Worker 1  │
  │ (Claude Code)│ ───┐               │ git worktree │
  │              │    │               └──────────────┘
  │ Uses:       │    │ oh spawn
  │ • spawn      │    ▼               ┌──────────────┐
  │ • task create│ ──────────────────► │ 🤖 Worker 2  │
  │ • inbox send │    │               │ (Codex)      │
  │ • board show │    │               └──────────────┘
  │ • task wait  │    │ oh spawn
  └──────────────┘    ▼               ┌──────────────┐
                    ┌──────────────┐  │ 🤖 Worker 3  │
                    │ 🤖 Worker N   │◄─┘              │
                    └──────────────┘
```

## 关键设计

### 任务依赖链

```bash
T1: "Design API"           → architect
T2: "JWT auth"    --blocked-by T1 → backend1
T3: "DB models"  --blocked-by T1 → backend2
T4: "React UI"               → frontend
T5: "Integration" --blocked-by T2,T3,T4 → tester
```

完成时 `oh task update T1 completed` → 自动解除 T2、T3 的 blocked 状态。

### 消息收件箱

- 每个 Agent 有自己的 inbox 目录
- `oh inbox send <team> <to> "message"` → 点对点消息
- `oh inbox broadcast <team> "message"` → 广播
- `oh inbox receive <team>` → 消费消息

### 工作空间隔离

每个 Worker 有独立的 **git worktree**（独立分支），避免并行冲突：
- 分支命名：`oh/{team}/{agent}`
- `oh workspace checkpoint` → auto-commit
- `oh workspace merge` → 合并回 main
- `oh workspace cleanup` → 清理 worktree

## 相关框架

| 框架 | 定位 | Agent 支持 | 通信方式 |
|------|------|-----------|---------|
| [[nanobot]] | 单人 Agent 框架 | nanobot | CLI |
| **[[clawteam]]** | Agent Swarm 编排 | 任意 CLI agent | CLI + inbox + task |
| [[openclaw]] | 单人 Agent 框架 | openclaw | CLI |

## 相关概念

- [[clawteam]] — agent-swarm 的具体实现框架
- [[channel-system]] — nanobot 的渠道解耦，与 swarm 消息模式不同但思想相似
- [[provider-registry]] — 可插拔架构，同一思想在不同层次的体现
