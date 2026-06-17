---
title: pi-coding-agent
created: 2026-04-26
updated: 2026-05-17
type: entity
tags: [agent, tool, cli, coding, open-source, typescript, terminal]
sources: [raw/articles/pi-mono-2026.md]
---

# pi-coding-agent

> @earendil-works/pi-coding-agent (npm: @earendil-works/pi-coding-agent)
> Mario Zechner ([[badlogic]]) 开发的终端编码 Agent。
> MIT license，~100K LOC，363 TypeScript 文件。
> 核心哲学：最小核心 + 强类型扩展系统。通过扩展和技能定制，而非内置功能。

## Architecture

```
pi-coding-agent/
├── cli/                    # CLI 参数解析、args、config selector
├── core/
│   ├── agent-session.ts    # 核心抽象 (~3100 行)
│   ├── sdk.ts              # CreateAgentSession 工厂
│   ├── system-prompt.ts    # System prompt 构建器 (~170 行)
│   ├── tools/              # 7 个默认工具
│   │   ├── read.ts / write.ts / edit.ts / bash.ts
│   │   ├── grep.ts / find.ts / ls.ts
│   │   └── edit-diff.ts / file-mutation-queue.ts
│   ├── compaction/         # 上下文压缩系统 (多个文件)
│   ├── extensions/         # 扩展系统 (ExtensionRunner ~1068 行)
│   ├── session-manager.ts  # 会话管理 (JSONL 树)
│   └── settings-manager.ts # 设置管理
├── modes/                  # 4 种运行模式
│   ├── interactive/        # 默认 TUI 模式
│   ├── print-mode.ts       # -p 单响应模式
│   ├── json-mode.ts        # JSONL 事件输出
│   └── rpc-mode.ts         # stdin/stdout RPC
└── utils/                  # 工具函数 (git, shell, image, fs-watch...)
```

## System Prompt

pi 的 system prompt 非常简洁（约 0.5KB，170 行构建器）：

```markdown
You are an expert coding assistant operating inside pi...
Available tools:
- read: ...
- bash: ...
- edit: ...
- write: ...

Guidelines:
- Be concise in your responses
- Show file paths clearly when working with files

[AGENTS.md/CLAUDE.md 上下文]
[Skills 列表]
```

与 [[oh-my-openagent]] 的 22KB 提示词形成鲜明对比。没有 Phase 模型、没有 Intent Gate。依赖项目自带的 AGENTS.md/CLAUDE.md 提供上下文。

## 7 个默认工具

| 工具 | 说明 | 特性 |
|------|------|------|
| read | 读文件（带行号） | `<content>` 格式输出，支持截断 |
| write | 写文件 | 文件突变队列，目录守卫 |
| edit | 编辑文件 | 基于 diff 的编辑（edit-diff.ts） |
| bash | Shell 命令 | 目录守卫（不能 cd 出项目目录） |
| grep | 搜索内容 | 尊重 .gitignore |
| find | 查找文件 | 模式匹配 |
| ls | 列出目录 | 不递归 |

## 4 种运行模式

| 模式 | 标志 | 场景 |
|------|------|------|
| Interactive | (默认) | 终端 TUI，基于 pi-tui |
| Print | `-p`, `--print` | 管道集成，单响应 |
| JSON | `--mode json` | JSONL 事件输出 |
| RPC | `--mode rpc` | stdin/stdout 进程集成 |

## AgentSession 核心类 (~3100 行)

所有运行模式的共同基础。关键职责：

**状态管理:** Agent 状态、模型/thinking level、事件订阅
**事件系统:** AgentEvent 订阅 + 自动会话持久化
**模型管理:** `setModel()`, `cycleModel()`, thinking level 控制
**会话管理:** 切换、分支、fork、clone
**上下文管理:** 手动/自动压缩（token 溢出时触发）
**Bash 执行:** 通过 BashExecutor 执行命令，带目录守卫
**Compaction:** 将旧条目折叠为摘要（JSONL 历史保留）

## 扩展系统 (ExtensionRunner ~1068 行)

强类型事件驱动系统。Extension 是 TypeScript 模块，通过声明式接口注册。

### 60+ 事件类型

```
Agent 生命周期:  BeforeAgentStart → AgentStart → AgentEnd
Provider:        BeforeProviderRequest → AfterProviderResponse
工具调用:        BashToolCall, ReadToolCall, WriteToolCall, EditToolCall...
会话:           SessionStart → SessionShutdown, SessionCompact
树导航:          NavigateTree, BeforeFork
输入:           InputEvent, UserBashEvent
```

### Extension 能力

- 自定义工具、命令、键盘快捷键
- 所有生命周期阶段的事件处理
- UI 组件和自定义弹窗
- 自定义 Provider（异步初始化）
- 资源发现（影响系统提示词）

## 会话管理

`~/.pi/agent/sessions/` 下的 JSONL 树文件。

```
SessionEntry {
  id: string
  parentId: string    // 形成树
  // 类型: message | thinking_level_change | model_change
  //       compaction | branch_summary | custom | label
  timestamp: number
  content: ...
}
```

**树结构:** leafId 指针跟踪当前位置，父链构成路径
**分支:** `/tree` 导航历史，`/fork` 从任何点创建新分支
**压缩:** 长期会话折叠为摘要，完整历史保留在 JSONL 中

## Skills 系统

符合 Agent Skills Standard。通过 `/skill:name` 调用或自动加载。

搜索路径：
- `~/.pi/agent/skills/` (全局)
- `~/.agents/skills/` (系统)
- `.pi/skills/` (项目)

## 对比：pi 与 oh-my-openagent

| 维度 | pi-coding-agent | oh-my-openagent |
|------|----------------|-----------------|
| 架构 | 最小核心 + 扩展 | 最大功能集 + Hook |
| System Prompt | ~0.5KB | ~22KB |
| 子 Agent | 无(通过扩展) | 11 内置 |
| 工具 | 7 默认 | 20-39 (配置门控) |
| 多模型路由 | pi-ai 30+ Provider | 4 步解析管道 |
| License | MIT | SUL-1.0 |
| 安装 | npm install | bunx install |

## Related

- [[pi-mono]] — 父 monorepo
- [[pi-ai]] — 底层 LLM API
- [[pi-agent-core]] — Agent 运行时
- [[pi-tui]] — 终端 UI 组件
- [[badlogic]] — 作者 Mario Zechner
- [[oh-my-openagent]] — 对比的最大功能集方案
- [[hermes-agent]] — 另一种生产级 Agent 框架
