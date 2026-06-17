---
title: ClawTeam
created: 2026-04-10
updated: 2026-04-10
type: entity
tags: [project, agent, swarm, multi-agent, llm]
sources: [raw/articles/clawteam-readme-2026.md]
---

# ClawTeam

Agent Swarm Intelligence 框架，由 [[hkuds]] 开发。GitHub: https://github.com/HKUDS/ClawTeam | v0.3 | MIT License

## 概述

让 AI Agent 组成 Swarm（蜂群）协作的框架，核心理念：**人类设定目标，Agent 团队自主完成其余工作**。

- **Python**: >= 3.10 | **依赖**: tmux + 任意 CLI agent
- **安装**: `pip install clawteam` 或 `pip install -e .`
- **v0.2**: 2026-03-23 公开发布 | **v0.3**: Transport 抽象 + Web UI + 多用户 + 团队模板

## 核心价值主张

| | ClawTeam | 其他多 Agent 框架 |
|--|----------|------------------|
| 谁使用 | **AI Agent 本身**（自主协作） | 人类写编排代码 |
| 复杂度 | `pip install` + 一句 prompt | Docker/API/YAML |
| 基础设施 | 文件系统 + tmux | Redis/消息队列/数据库 |
| Agent 支持 | 任意 CLI agent（无锁定） | 框架锁定 |
| 隔离方式 | Git worktree（真实分支） | 容器/虚拟环境 |
| 智能 | Swarm 通过 CLI 自组织 | 硬编码编排逻辑 |

## 核心架构

```
~/.clawteam/              # 所有数据
├── teams/   (who)        # 团队配置 config.json
├── tasks/   (what)      # 任务 JSON
├── inboxes/ (talk)      # 消息队列（每成员一个目录）
└── workspaces/          # git worktree 隔离工作目录

clawteam/
├── spawn/              # Agent 启动
│   ├── adapters.py     # Agent 特异性适配（claude/codex/nanobot/openclaw/kimi...）
│   ├── tmux_backend.py # tmux 后端（默认，交互式）
│   ├── subprocess_backend.py  # 子进程后端
│   ├── wsh_backend.py  # WebSocket shell 后端
│   ├── profiles.py     # 运行时配置（provider/model）
│   ├── presets.py      # Provider 模板（moonshot/minimax-cn...）
│   └── registry.py    # Backend 注册表
├── team/              # 团队管理
│   ├── manager.py    # 团队生命周期
│   ├── models.py     # Pydantic 数据模型
│   ├── tasks.py      # TaskStore 兼容层（→ store/）
│   ├── mailbox.py    # 消息收发
│   ├── lifecycle.py  # 优雅关闭协议
│   └── plan.py       # 计划审批
├── store/            # 存储抽象
│   ├── base.py      # BaseTaskStore 抽象基类
│   └── file.py      # FileTaskStore 实现
├── transport/       # 消息传输层（v0.3+）
│   ├── base.py      # Transport 抽象基类
│   ├── file.py      # FileTransport（默认）
│   └── p2p.py       # ZeroMQ P2P（低延迟，自动降级）
└── mcp/             # MCP Server
    ├── server.py
    └── tools/       # team/task/mailbox/board/workspace/plan/cost
```

## Agent 适配器（adapters.py）

每个 CLI agent 有不同 flag 约定，NativeCliAdapter 统一处理：

| Agent | Workspace Flag | Prompt Flag | Skip Permissions |
|-------|---------------|-------------|-----------------|
| Claude Code | — | — | `--dangerously-skip-permissions` |
| Codex | — | — | `--dangerously-bypass-approvals-and-sandbox` |
| Kimi | `-w <cwd>` | `--print -p <prompt>` | `--yolo` |
| nanobot | `-w <cwd>` | `-m <prompt>` | `--yolo` |
| OpenClaw | — | `--message <prompt>` | — |
| Gemini/Qwen/Opencode | — | — | `--yolo` |

## 协调协议（自动注入）

当 agent 通过 `oh spawn` 启动时，自动注入协调 prompt，无需人工干预：

```
## Coordination Protocol (auto-injected)
- 📋 Check tasks:  oh task list <team> --owner <your-name>
- ▶️ Start task:   oh task update <team> <id> --status in_progress
- ✅ Finish task: oh task update <team> <id> --status completed
- 💬 Message:     oh inbox send <team> <to> "message"
- 📨 Check inbox: oh inbox receive <team>
- 😴 Report idle: oh lifecycle idle <team>
```

## 团队模板（TOML）

`oh launch <template>` 从 TOML 模板启动完整团队，内置 AI Hedge Fund（7 agent）：

```toml
[leader]
agent = "claude"
role = "Portfolio Manager"

[analysts]
count = 5
agents = ["buffett", "growth", "technical", "fundamentals", "sentiment"]
```

变量替换：`{goal}`, `{team_name}`, `{agent_name}`

## Transport 可插拔架构

v0.3 引入 Transport 接口，渐进式支持分布式：

| Transport | 实现 | 适用场景 |
|-----------|------|---------|
| **file**（默认） | JSON 文件 I/O | 单机、共享文件系统 |
| **p2p** | ZeroMQ P2P + 文件降级 | 低延迟、跨机器 |
| **redis**（v0.4） | Redis LPUSH/RPOP | 生产级跨机器 |

## 演示成果

**Autoresearch**: 8 agent × 8 H100 GPU × 2430+ 实验 = val_bpb 1.044 → 0.977（6.4% 提升，~30 GPU hours）

## 版本路线图

| Phase | Version | What | Status |
|-------|---------|------|--------|
| 当前 | v0.3 | File + P2P transport, Web UI, 多用户, 团队模板 | ✅ Shipped |
| Phase 1 | v0.4 | Redis Transport（跨机器消息） | 🔜 Planned |
| Phase 2 | v0.5 | 共享状态层（团队配置/任务跨机器） | 🔜 Planned |
| Phase 3 | v0.6 | Agent 市场 + 自适应调度 | 💡 Exploring |
| Phase 4 | v1.0 | 生产级：认证/权限/审计 | 💡 Exploring |

## 相关概念

- [[nanobot]] — ClawTeam 支持的 Agent 之一，HKUDS 姐妹项目
- [[openclaw]] — ClawTeam 设计灵感来源之一
- [[agent-swarm]] — Agent 组成 Swarm 协作的设计模式
- [[provider-registry]] — nanobot/ClawTeam 共用的可插拔 Provider 架构
- [[hkuds]] — 开发者
