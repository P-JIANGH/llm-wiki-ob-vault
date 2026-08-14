---
title: Agent Harness Frameworks
created: 2026-08-14
updated: 2026-08-14
type: comparison
tags: [agent-framework, harness, comparison, architecture, open-source]
sources: [raw/articles/deepseek-harness-2026.md]
confidence: medium
---

# Agent Harness Frameworks（Agent Harness 框架横向对比）

## What is being compared and why

DeepSeek Harness（dsh）是 2026 年 DeepSeek AI 开源的 agent harness。本页把它与 wiki 中已有的同类框架对比，帮助定位"agent 运行时"这个设计空间的各条路线。对比维度：架构范式、可替换性、会话模型、执行后端、生态。

## Comparison Table

| 维度 | DeepSeek Harness (dsh) | LangGraph | OpenHarness | nanobot / OpenClaw | learn-claude-code |
|---|---|---|---|---|---|
| **语言/栈** | TypeScript monorepo | Python | Python | Python | 教程（TypeScript/Node） |
| **定位** | 生产级 agent harness（框架） | agent 编排图框架 | Claude Code 开源复刻 | 轻量个人 agent | 从零构建 harness 课程 |
| **架构范式** | 一切皆插件（Cordis） | graph 状态机 | 引擎 + 43+ 工具 + swarm | 轻量 agent loop | 渐进式教学 |
| **可替换能力** | Capability Seam 三角色（接口/实现/工具分包） | 节点可换，编排固定 | 工具/权限/后端可配 | 有限 | — |
| **会话模型** | 事件溯源 SessionEvent log（可重放/可压缩） | checkpoint + state | 对话历史 + auto-compaction | 会话历史 | 简单历史 |
| **上下文压缩** | surface replace（无模型重写日志） | summarization 节点 | auto-compaction | 有 | 教学 |
| **执行后端** | bash-local / bash-sandbox / pwsh / E2B 远程 | 自定 | subprocess / tmux / in-process | 本地 | 本地 |
| **模型适配** | 插件注册表（deepseek / pi-ai / replay） | 多 provider | 多 provider | 本地小型 LLM | 教学 |
| **多 agent** | subagent seam（6 provider：in-process/acp/codex/claude-code/dsk-sdk） | 图内多节点 | coordinator + swarm | 单 agent 为主 | 教学 |
| **协议** | JSON-RPC SDK / ACP server / Typert RPC | 无 | MCP 客户端 | MCP | 教学 |
| **Web UI** | 有（React client 族） | LangGraph Studio | React TUI | 无 | — |
| **License** | MIT | MIT | MIT | MIT | — |
| **成熟度** | 0.1.0-rc 开发者预览 | 稳定 | v0.1.x | 活跃 | — |

## 关键差异解读

### dsh vs LangGraph（图编排 vs 插件运行时）
- LangGraph 把 agent 工作流建模为 **graph 状态机**（节点 = 工具/LLM/子图），显式编排
- dsh 不规定图：核心是**事件溯源会话 + 可替换能力 + 插件运行时**，工作流只是可挂载的插件（workflow seam），loop 本身也是插件
- 启示：图的显式性适合可预测流程；插件运行时的灵活性适合"agent 即操作系统"的产品形态

### dsh vs OpenHarness（框架 vs 复刻）
- OpenHarness 是 Claude Code 的**行为复刻**（engine + tools + permissions + hooks + swarm），API 形状学 Claude Code
- dsh 是**通用框架**，甚至可以把 Claude Code/Codex 桥接进来（hooks-claude-code / hooks-codex）
- dsh 的 capability seam 允许一个 harness 承载不同 agent 产品；OpenHarness 目标是"像 Claude Code 的开源替代"

### dsh vs nanobot / OpenClaw（重 vs 轻）
- nanobot/OpenClaw 追求超轻量个人 agent（本地模型、简单 loop、快速上手）
- dsh 是生产级规模（~130+ 包、事件溯源、沙箱、双语文档、1372 Agent Notes）—— 学习成本高，但架构决策密度极高

## Verdict

对 **Agentic System Designer** 职业路径：
- 想快速做个人 agent → nanobot / OpenClaw 路线
- 想理解 Claude Code 产品形态 → OpenHarness / learn-claude-code
- 想学**生产级 harness 架构**（事件溯源、capability seam、插件运行时、Host/Client 双面 TS 工程）→ **DeepSeek Harness 是目前最完整的开源参考**，且是唯一国内顶级大厂开源的同类项目

## Sources

- `raw/articles/deepseek-harness-2026.md`
- wiki 已有页面：[[openharness]]、[[nanobot]]、[[openclaw]]、[[langgraph]]、[[learn-claude-code]]
