# ClawTeam README — Agent Swarm Intelligence

> Source: GitHub HKUDS/ClawTeam README.md + ROADMAP.md (v0.3, 2026-03-23 public launch)
> Original: https://github.com/HKUDS/ClawTeam

## 概述

**ClawTeam** 是一个让 AI Agent 组成 Swarm（蜂群）协作的框架，核心理念：人类设定目标，Agent 团队自主完成其余工作。

- **版本**: v0.2 (2026-03-23) → v0.3 (current)
- **License**: MIT
- **Python**: >= 3.10
- **安装**: `pip install clawteam` 或 `pip install -e .`
- **依赖**: tmux, 一个 CLI agent (claude/codex/nanobot/openclaw/kimi 等)

## 核心价值主张

| | ClawTeam | 其他多 Agent 框架 |
|--|----------|------------------|
| 谁使用 | **AI Agent 本身**（自主协作） | 人类写编排代码 |
| 复杂度 | `pip install` + 一句 prompt | Docker、API、YAML 配置 |
| 基础设施 | 只需文件系统和 tmux | Redis、消息队列、数据库 |
| Agent 支持 | 任意 CLI agent | 框架锁定 |
| 隔离方式 | Git worktree（真实分支、真实 diff） | 容器或虚拟环境 |
| 智能 | Swarm 通过 CLI 命令自组织 | 硬编码编排逻辑 |

## 核心架构

```
~/.clawteam/                    # 所有数据
├── teams/    (who)             # 团队配置 config.json
├── tasks/    (what)             # 任务 JSON 文件
├── inboxes/  (talk)             # 消息队列（每个成员一个目录）
└── workspaces/                 # git worktree 隔离的工作目录

核心模块：
clawteam/
├── spawn/          # Agent 启动
│   ├── adapters.py     # Agent 特异性适配（claude/codex/nanobot/openclaw/kimi...）
│   ├── tmux_backend.py # tmux 后端（默认，交互式 UI）
│   ├── subprocess_backend.py  # 子进程后端（非交互式）
│   ├── wsh_backend.py  # WebSocket shell 后端
│   ├── profiles.py     # 运行时配置（provider/model）
│   ├── presets.py      # Provider 模板（moonshot/minimax-cn...）
│   └── registry.py    # Backend 注册表
├── team/            # 团队管理
│   ├── manager.py    # 团队生命周期
│   ├── models.py     # Pydantic 数据模型
│   ├── tasks.py      # TaskStore 兼容层
│   ├── mailbox.py    # 消息收发
│   ├── lifecycle.py  # 优雅关闭协议
│   └── plan.py       # 计划审批
├── store/           # 存储抽象
│   ├── base.py      # BaseTaskStore 抽象基类
│   └── file.py      # FileTaskStore 实现
├── transport/      # 消息传输层（Phase 1 v0.3+）
│   ├── base.py      # Transport 抽象基类
│   ├── file.py      # FileTransport（默认，文件 I/O）
│   └── p2p.py       # ZeroMQ P2P（低延迟，自动降级到文件）
├── mcp/             # MCP Server（Model Context Protocol）
│   ├── server.py     # MCP 服务端
│   └── tools/       # MCP 工具
│       ├── team.py, task.py, mailbox.py
│       ├── board.py, workspace.py
│       ├── plan.py, cost.py
└── cli/commands.py  # Typer CLI 命令
```

## Agent 适配器（adapters.py）

每个 CLI agent 有不同的 flag 约定，NativeCliAdapter 统一处理：

| Agent | Workspace Flag | Prompt Flag | Skip Permissions |
|-------|---------------|-------------|-----------------|
| Claude Code | — | — | `--dangerously-skip-permissions` |
| Codex | — | — | `--dangerously-bypass-approvals-and-sandbox` |
| Kimi | `-w <cwd>` | `--print -p <prompt>` | `--yolo` |
| nanobot | `-w <cwd>` | `-m <prompt>` | `--yolo` |
| OpenClaw | — | `--message <prompt>` | — |
| Gemini/Kimi/Qwen/Opencode | — | — | `--yolo` |

## 协调协议（自动注入）

当 agent 通过 `oh spawn` 启动时，自动注入协调 prompt：
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

`oh launch <template>` 从 TOML 模板启动完整团队，内置 AI Hedge Fund 模板（7 个 agent）：

```toml
[leader]
agent = "claude"
role = "Portfolio Manager"

[analysts]
count = 5
agents = ["buffett", "growth", "technical", "fundamentals", "sentiment"]
```

## 版本路线图

- **v0.2** — 单机文件系统，零依赖
- **v0.3** — Transport 抽象层 + File/P2P transport + Web UI + 多用户 + 团队模板
- **v0.4** — Redis Transport（跨机器消息）
- **v0.5** — 共享状态层（跨机器团队配置/任务）
- **v0.6** — Agent 市场 + 自适应调度
- **v1.0** — 生产级：认证、权限、审计日志

## 关键设计决策

1. **纯文件 I/O**：所有数据在 `~/.clawteam/`，JSON 文件，原子 `tmp + rename` 写
2. **Transport 可插拔**：v0.3 引入 Transport 接口，File → P2P → Redis 渐进演进
3. **TaskStore 抽象**：BaseTaskStore → FileTaskStore/RedisTaskStore，兼容层 `clawteam.team.tasks`
4. **零框架锁定**：任何能运行 shell 命令的 CLI agent 都能加入团队
5. **MCP 工具**：通过 MCP 协议暴露 team/task/mailbox/board/workspace/plan/cost 工具

## 演示成果

- **Autoresearch**：8 agent × 8 H100 GPU，2430+ 实验，val_bpb 1.044 → 0.977（6.4% 提升），约 30 GPU hours

## 相关链接

- GitHub: https://github.com/HKUDS/ClawTeam
- 姐妹项目: nanobot, CLI-Anything
