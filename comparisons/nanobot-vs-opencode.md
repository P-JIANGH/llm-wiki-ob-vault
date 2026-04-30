---
title: nanobot vs OpenCode 对比
created: 2026-04-29
updated: 2026-04-29
type: comparison
tags: [comparison, agent, coding, llm, framework]
sources: [entities/nanobot.md, entities/opencode.md, entities/oh-my-opencode.md]
---

# nanobot vs OpenCode 对比

## 基本定位

| 维度 | [[nanobot]] | [[OpenCode]] |
|------|-------------|-------------|
| **定位** | 个人 AI Agent 框架（消息网关） | 终端 AI 编程 Agent |
| **核心场景** | 多平台消息→AI 对话（IM 集成） | 终端内代码编写/修改 |
| **GitHub** | HKUDS/nanobot | anomalyco/opencode (140K ⭐) |
| **Stars** | ~数千 | **140K** |
| **技术栈** | Python (>=3.11) | Go (Bubble Tea TUI) |
| **目标用户** | 想把 AI 接入 Telegram/Discord 等 IM 的用户 | 需要 Terminal 内 AI 编程辅助的开发者 |

---

## 功能维度对比

### 1. 核心能力

| 能力 | nanobot | OpenCode | +Oh My OpenCode |
|------|---------|----------|----------------|
| 代码编辑/查看 | 弱（工具层面） | **强**（LSP/grep/edit/patch） | **极强**（10 Agent 协作） |
| 多渠道消息接入 | **13+ 渠道**（Telegram/Discord/Feishu/QQ等） | 无 | 无 |
| 多模型支持 | 22+ Provider | 75+ Provider | 75+ Provider + Category 调度 |
| 多 Agent 协作 | 基础（subagent spawn） | 单 Agent | **10 专业 Agent 团队** |
| 记忆系统 | **Dream 两阶段记忆**（摘要+整合） | Session 持久化（SQLite） | 同 OpenCode |
| 定时任务 | 内置 Cron | 无 | 无 |
| MCP 扩展 | 支持 | 支持 | **内置 Exa/Context7/Grep.app** |
| TUI/交互 | 基础 CLI | **Bubble Tea 精美 TUI** | 同 OpenCode |
| LSP 集成 | 无 | **原生支持** | 增强 |

### 2. 架构设计

| 维度 | nanobot | OpenCode |
|------|---------|----------|
| **代码规模** | ~2258 行核心 Python | Go 实现（成熟开源） |
| **扩展方式** | Channel Bus（插件化消息渠道） | Provider/MCP（插件化 AI/工具） |
| **记忆持久化** | Dream → SOUL/USER/MEMORY 文件 | SQLite session |
| **工具注册** | Tool Registry（动态注册） | 内置工具集（glob/grep/edit/patch/bash） |

---

## nanobot 优势

1. **多渠道消息网关** — 唯一真正的多平台 IM 集成框架，其他工具没有这个能力
2. **Dream 记忆系统** — 两阶段（Consolidator+Dream）持久化记忆，比纯 Session 更深
3. **Python 原生** — 易于定制国内 API（已内置 minimax/腾讯/火山等 Provider）
4. **Cron 内置** — 定时任务无需外部调度器
5. **sandbox 工具** — 代码执行隔离安全
6. **Subagent 机制** — 后台任务并行

## nanobot 劣势

1. **非编程工具定位** — 代码编辑能力弱，不适合做 IDE 替代
2. **社区规模小** — vs OpenCode 140K stars，生态差距巨大
3. **中文文档稀缺** — 社区驱动弱

---

## OpenCode 优势

1. **140K GitHub stars** — 经过大量开发者验证，稳定可靠
2. **精美 TUI** — Bubble Tea 构建，用户体验好
3. **LSP 深度集成** — 代码补全/诊断/重构
4. **多模型灵活性** — 75+ Provider，支持 Copilot 账号直连
5. **多会话** — 同一项目并行多 Agent
6. **隐私优先** — 不存储代码上下文
7. **多形态** — Terminal + Desktop App + IDE Extension

## OpenCode 劣势

1. **纯编程工具** — 无法像 nanobot 那样接入 IM 消息渠道
2. **单 Agent** — 原生没有多 Agent 协作机制
3. **无记忆持久化** — Session 基于 SQLite，但无 nanobot 式两阶段记忆
4. **无 Cron** — 定时任务需要外部驱动

---

## Oh My OpenCode 加持后的变化

在 OpenCode 基础上叠加了一层多 Agent 编排：

| 增强点 | 说明 |
|--------|------|
| **10 专业 Agent 团队** | Sisyphus(协调)+Prometheus(规划)+Metis(预分析)+Momus(审核)+oracle/librarian/explore/multimodal-looker |
| **Todo Enforcer** | Agent 自动持续工作直到任务完成，无需人工盯着 |
| **规划/执行分离** | Prometheus 纯规划不写代码，Sisyphus 纯执行不停止 |
| **Category 调度** | visual-engineering/ultrabrain/artistry/quick/writing 按场景选模型 |
| **31 Hook 兼容** | 完整 Claude Code 兼容层 |
| **内置 MCP** | Exa 网页搜索 + Context7 文档 + Grep.app |

### +Oh My OpenCode 的新劣势

1. **额外配置复杂度** — 两层配置（OpenCode + oh-my-opencode.json）
2. **Token 消耗高** — 10 个 Agent 协作，单次任务 Token 成本显著
3. **安装门槛** — 需要 bunx，Windows 支持相对新
4. **规划模式适合复杂任务** — 简单任务用 Ultrawork 反而比直接用 OpenCode 慢

---

## 总结：如何选

| 场景 | 推荐 |
|------|------|
| 想把 AI 接到 Telegram/Discord/飞书等 IM | **nanobot**（唯一选择） |
| 纯 Terminal 代码编程，成熟稳定 | **OpenCode**（140K stars 验证） |
| 复杂多文件架构任务，需要规划+执行分离 | **OpenCode + Oh My OpenCode** |
| 国内 API（腾讯/火山/minimax）优先 | **nanobot**（内置 Provider） |
| 需要 LSP 感知、代码补全/重构 | **OpenCode**（LSP 原生） |
| 想要"甩手掌柜"式 Agent（自动直到完成） | **OpenCode + Oh My OpenCode** |

> 两者定位其实不重叠：nanobot 是消息网关+个人助手，OpenCode 是编程工具。如果要同时具备，可以考虑 nanobot 提供 IM 入口，内部调用 OpenCode 做代码任务。
