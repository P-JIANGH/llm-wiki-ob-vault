---
title: Agent-CLI/TUI 学习路径
created: 2026-05-06
updated: 2026-05-06
type: concept
tags: [agent, llm, cli, tui, architecture, workflow, learning]
sources: [concepts/agent-loop.md, entities/deepseek-tui.md, entities/pi-coding-agent.md, entities/pi-mono.md, entities/aworld.md, entities/agent-laboratory.md, concepts/registry-pattern-tool-discovery.md, comparisons/nanobot-vs-opencode.md]
---

# Agent-CLI/TUI 学习路径

构建 Agent-CLI/TUI 所需的核心知识体系与入手路径。内容综合自 wiki 中已有实体页面，按优先级排序。

## 一、核心概念：Agent Loop

AI Agent 的执行循环模式：LLM 与工具之间反复交互，直到任务完成或达到迭代上限。

**通用模式：**
```
消息 → 构建上下文 → LLM推理 → [工具调用?] → [执行工具] → [继续循环?] → 响应
```

**关键组件：**
- [[agent-loop]] — 通用模式，nanobot 实现详解（ContextBuilder + AgentRunner + Hooks）
- [[registry-pattern-tool-discovery]] — 工具注册中心，零硬编码 + check_fn 环境门控

---

## 二、核心参考实现（按优先级）

### 1. pi-coding-agent（最贴近 CLI/TUI 目标）

TypeScript，npm 开源，交互式终端 coding agent。

**核心设计哲学：**
> Pi is aggressively extensible so it doesn't have to dictate your workflow.

**刻意不做：** 无 MCP（用 extension）、无 sub-agent（用 tmux）、无 plan mode、无 built-in todo。

**4种运行模式：**
| Mode | Flag | Description |
|------|------|-------------|
| Interactive | (default) | 终端界面 |
| Print | `-p` | 单次响应后退出 |
| JSON | `--mode json` | JSONL 输出所有事件 |
| RPC | `--mode rpc` | stdin/stdout 进程集成 |

**Session 存储 — 最干净的设计：**
- append-only JSONL 树，`id`/`parentId`，`leafId` 指针追踪当前位置
- 支持原地分支，保留完整历史
- 支持压缩（manual + auto-triggered）

**Extension 系统：**
- 60+ 事件类型：`BeforeAgentStartEvent`、`AgentStartEvent`、`AgentEndEvent`、`ToolCallEvent`（Bash/Read/Write/Edit/Grep/Find/Ls）、`SessionCompactEvent`、`SessionBeforeForkEvent` 等
- 放置目录：`~/.pi/agent/extensions/`、`.pi/extensions/`、已安装的 pi 包

**工具默认集：** `read`, `write`, `edit`, `bash`, `grep`, `find`, `ls`

**相关：**
- [[pi-mono]] — parent monorepo，分层架构（pi-ai provider 层 + pi-coding-agent runtime 层 + TUI/Web UI 表示层）
- [[pi-ai]] — 统一多 Provider LLM API（20+ 提供商）

### 2. aworld（Agent Harness 标杆）

Python，Agent Harness 框架，三层定位（Raw Code → Agent Frameworks → **Agent Harness**）中最右侧，开箱即用。

**核心创新：**
- **CAST**：Code AST 分析，层级导航 + 无限上下文压缩 + 精确修改
- **Self-Evolution Loop**：`Build → Evaluate → Evolve → Loop`，质量达标停止
- **Benchmark-Driven Development**：每个架构改进必须通过真实 Benchmark 验证

**内置 Sub-Agents（TeamSwarm 架构）：**
| Agent | 角色 |
|-------|------|
| 👑 AWorld Agent | 编排器，解析目标、创建计划、委派任务 |
| 🧑‍💻 Developer | CAST 工具写代码 |
| 🧐 Evaluator | Skill 驱动的质量评估 |
| 🎬 Video Diffusion | 扩散模型视频生成 |
| 🎤 Audio Generator | TTS 语音生成 |

**Benchmark 成绩：**
- GAIA: Pass@1 67.89%（Leaderboard）
- OSWorld: 58.0%（Rank 1st）
- VisualWebArena: 36.5%（Rank 1st）

**目录结构：**
```
aworld/core/           # Agent, tool, context, memory 抽象
aworld/agents/         # 预构建 Agent
aworld/tools/          # 内置工具
aworld/sandbox/        # 工具执行抽象层
aworld-cli/            # CLI 执行层
aworld-skills/         # Skills Hub（动态加载）
```

### 3. deepseek-tui（Rust TUI 最佳实践）

Rust，单二进制，ratatui 驱动，深度集成 LSP 诊断。

**架构：Dispatcher → TUI → Engine → Tools**
```
User Interface
  TUI (ratatui) | One-shot Mode | Config/CLI
         ↓
Core Engine
  Agent Loop (core/engine.rs)
  Session | Turn Mgmt | Tool Orchestration
         ↓
Tool & Extension Layer
  Tools (shell/file/git/web/sub-agents/MCP) | Skills | Hooks | MCP Servers
         ↓
Runtime API + Task Management
  HTTP/SSE Runtime API | Persistent Task Manager
         ↓
LLM Layer
  LLM Client Abstraction → DeepSeek Client (OpenAI-compatible)
```

**核心 Crates：**
- `crates/core` — agent loop, session, turn management
- `crates/tui-core` — 事件驱动 TUI 状态机脚手架
- `crates/tui` — ratatui TUI + LSP 子系统 + RLM sandbox

**独特能力：**
- **RLM**：Python REPL sandbox，`llm_query()` 批量调用（无竞品）
- **Turn revert**：side-git 快照，无需动 repo 的 .git
- **HTTP/SSE Runtime API**：`deepseek serve --http` 支持 headless agent 工作流
- **Automations**：RRULE 风格的周期性调度任务
- **Durable tasks**：restart-aware 持久任务对象（gate runs、PR attempts）

### 4. nanobot loop.py（最干净的 Agent Loop 教学代码）

Python，约 750 行，最适合理解核心循环。

**核心流程：**
1. 接收入站消息（`MessageBus` 的 `InboundMessage`）
2. 构建上下文（`ContextBuilder`：bootstrap + 记忆 + 技能 + 运行时）
3. LLM 推理（`AgentRunner`）
4. 工具调用解析 + 执行
5. 通过 `MessageBus` 发送响应

**AgentRunner 关键机制：**
- 重试：空响应最多 2 次，长度恢复最多 3 次
- 截断：`max_tool_result_chars`，按 `_COMPACTABLE_TOOLS` 决定是否压缩
- 错误处理：工具失败自动追加 `[Analyze the error above and try a different approach.]`

**Hook 系统：**
- `wants_streaming()` — 是否启用流式
- `on_stream()` — 增量 delta 输出（剥离 `<think>` 标签）
- `before_execute_tools()` — 工具执行前回调
- `after_iteration()` — 迭代结束回调（token 统计）
- `finalize_content()` — 最终内容后处理

### 5. hermes-agent（Python 工具注册中心）

Python，持久 Async Loop + 工具注册中心模式。

**ToolRegistry 中心注册表：**
- 所有工具模块级调用 `registry.register()`，无硬编码列表
- `check_fn` 环境检查：API key 缺失时自动隐藏工具
- 支持 MCP 动态工具热插拔（`notifications/tools/list_changed` 时注销重注册）

### 6. agent-laboratory（流水线式 Agent）

Python，4阶段顺序流水线，最适合理解端到端自动化研究。

**4阶段：**
1. **Literature Review** — arXiv 搜索 + 检索 + 分析
2. **Plan Formulation** — 基于文献的协作研究规划
3. **Experimentation** — 数据准备 + 实验执行
4. **Report Writing** — LaTeX 报告生成（可选 PDF 编译）

**关键特性：** checkpoint/resume、co-pilot mode（人机协作）、多语言支持。

---

## 三、架构组件分解

### 分层架构图

```
┌─────────────────────────────────────────┐
│           CLI / TUI Interface           │  ← ratatui(Rust) / Bubble Tea(Go) / Ink(JS)
├─────────────────────────────────────────┤
│              Agent Harness               │  ← Session 管理、状态机、权限控制、模式切换
├─────────────────────────────────────────┤
│             Agent Loop Core              │  ← 消息→上下文→LLM推理→工具调用→循环
├──────────┬──────────────┬───────────────┤
│ Tool Reg │ Memory/Context│ Model/Provider│
│ Registry │  Compression  │ Abstraction   │
├──────────┴──────────────┴───────────────┤
│           Tool Executor                  │  ← shell / filesystem / web / MCP / sub-agent
└─────────────────────────────────────────┘
```

### 核心组件详解

#### 工具注册中心

参考 [[registry-pattern-tool-discovery]]：
- 所有工具模块级注册到 `ToolRegistry` 单例
- `check_fn` 做环境门控（API key 缺失自动隐藏）
- 支持 MCP 动态工具热插拔

#### Session 持久化

参考 [[pi-coding-agent]] 的 append-only JSONL 树：
- `id`/`parentId` 形成树结构
- `leafId` 指针追踪当前位置
- 支持原地分支（不丢失历史）
- 压缩系统处理长会话（保留原始 JSONL，可 `/tree` 回溯）

#### 上下文压缩

参考 nanobot 的 `_COMPACTABLE_TOOLS`：
- `read_file`/`exec`/`grep`/`glob`/`web_search` 可被压缩
- 只保留最近 10 条，最小 500 字符
- 超过 `max_tool_result_chars` 时截断

#### 扩展机制

参考 pi-coding-agent 的 60+ 事件类型：
- Agent 生命周期：`BeforeAgentStart` / `AgentStart` / `AgentEnd`
- Provider：`BeforeProviderRequest` / `AfterProviderResponse`
- 工具调用：每种工具类型独立事件
- Session：`SessionStart` / `SessionShutdown` / `SessionCompact` / `SessionBeforeFork`

---

## 四、学习顺序建议

### Week 1：理解核心架构
1. [[agent-loop]] — 概念 + nanobot loop.py 精读
2. [[pi-coding-agent]] — 架构概览（wiki 页面）
3. [[deepseek-tui]] — 架构文档（`crates/core/engine.rs`）

### Week 2：掌握工具系统
4. [[registry-pattern-tool-discovery]] — 工具注册表
5. [[aworld]] CAST — 代码结构化理解
6. hermes-agent tool calling 实现

### Week 3：理解 Harness 层
7. [[aworld]] Self-Evolution Loop + BDD
8. [[agent-laboratory]] — 4阶段流水线
9. [[deepseek-tui]] — TUI + LSP 集成

### Week 4：工程落地
10. pi-coding-agent 源码（npm 包）
11. deepseek-tui crates 源码
12. 选定语言开始实现

---

## 五、技术选型建议

### 语言选型

| 语言 | TUI 框架 | 优势 | 劣势 |
|------|----------|------|------|
| **Rust** | ratatui | 性能最优，DeepSeek-TUI 验证 | 编译慢，生态系统较新 |
| **Go** | Bubble Tea (charm) | 并发原生，Bubble Tea 生态丰富 | 泛型弱，错误处理冗长 |
| **TypeScript** | ink (React 风格) | pi-coding-agent 已用，前端友好 | Node 运行时，bundle 大 |
| **Python** | Textual | 快速原型，Rich 生态 | 性能一般，GIL 限制 |

**推荐：**
- 追求性能 + 极限控制：Rust + ratatui
- 追求开发速度 + 社区生态：Go + Bubble Tea
- 已有前端积累：TypeScript + ink

### Agent Loop

参考 nanobot 的 `ContextBuilder → AgentRunner → Hooks` 三件套

### 工具系统

用 registry pattern，所有工具模块级注册，`check_fn` 做环境门控

### Session 存储

pi 的 append-only JSONL 树是目前最干净的设计

### Harness 能力

aworld 的 Self-Evolution Loop + BDD——做 benchmark 不做单元测试

---

## 六、刻意不做清单

pi-coding-agent 提供了重要的反面教训：

| 不做 | 原因 | 替代方案 |
|------|------|----------|
| 内置 MCP | 锁定生态 | 用 extension 做 MCP client |
| 内置 sub-agent | 复杂且不通用 | 用 tmux 或 extension |
| 内置 plan mode | 约束 workflow | 让模型写文件 |
| 内置 todo | 非通用 | 用 TODO.md |
| Permission popup | 体验断裂 | 用容器隔离 |

---

## 相关 Wiki 条目

- [[agent-loop]] — 核心执行循环模式
- [[registry-pattern-tool-discovery]] — 工具注册表架构
- [[deepseek-tui]] — Rust TUI 完整架构
- [[pi-coding-agent]] — TypeScript 交互模式
- [[pi-mono]] — monorepo 分层设计
- [[aworld]] — Harness + Benchmark 驱动开发
- [[agent-laboratory]] — 流水线式 Agent
- [[hermes-agent]] — Python 持久 Async Loop
- [[autoresearch]] — Karpathy 自主研究循环
- [[open-deep-research]] — 深度研究 Agent
- [[devika]] — 开源 AI 软件工程师
- [[comparisons/nanobot-vs-opencode]] — Go TUI vs Python 对比
