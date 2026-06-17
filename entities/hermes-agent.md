---
title: hermes-agent
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [framework, agent, python, nous-research, tool-calling, rl]
sources: [raw/articles/hermes-agent-source-2026.md]
---

# hermes-agent

[[ Nous Research ]] 出品的生产级 AI Agent 框架（Python），定位类似 OpenAI 的 Answers API，但完全自托管且高度可定制。

## Overview

支持特性：
- **多 Provider**：OpenAI / Claude / DeepSeek / MiniMax / Qwen / 任何 OpenAI 兼容端点
- **多消息平台**：Telegram / Discord / 飞书 / Slack / WhatsApp / Signal / Matrix / Mattermost / DingTalk / WeCom / SMS / Email / BlueBubbles / HomeAssistant / Webhook
- **多终端执行**：本地 / SSH / Docker / Modal / Daytona / 静态分析（无 shell）
- **工具系统**：自注册 ToolRegistry，支持 check_fn 环境门控，MCP 动态发现，Plugin 扩展
- **上下文压缩**：四阶段压缩（Prune / Protect Head+Tail / Summarize Middle），迭代摘要
- **记忆系统**：MemoryStore / TodoStore / SessionSearch 工具
- **Cron 调度**：文件锁防重，origin 回投递，deliver 路由
- **RL 训练**：内置 RL Benchmark 环境（RLTensorPipe）
- **ACP**：子 Agent 编排协议（Agent Communication Protocol）

## Architecture

```
gateway/         ← 13+ 平台适配器（Telegram/Discord/飞书/...）
     run.py      ← GatewayRunner，主循环
     session.py  ← Session 管理 + PII 哈希
cron/           ← Cron 调度器（scheduler.py + jobs.py）
acp_adapter/   ← ACP 子 Agent 编排协议
hermes_cli/     ← CLI 命令（setup/auth/gateway/tools/...）
agent/          ← Agent 核心（从 run_agent.py 拆分）
 environments/  ← Agent 执行环境（HermesAgentLoop + benchmarks）
tools/          ← 工具集（每个文件 = 自注册工具）
model_tools.py  ← 工具系统入口（发现 + 分发 + async 桥接）
run_agent.py    ← AIAgent 主类（~9800 行）
```

## 核心模块

### HermesAgentLoop（environments/agent_loop.py）

纯 Python asyncio 的多轮 Agent 引擎，可用作为 run_agent.py 的替代引擎。

- ThreadPoolExecutor(128) 并行执行工具
- 支持 OpenAI tool-calling 协议
- fallback 解析器（content 内嵌 `<tool_call>` 时提取）
- 工具结果持久化预算控制

### AIAgent（run_agent.py）

主体 Agent 类，~9800 行，包含完整会话管理。核心组件：

- **IterationBudget**：线程安全迭代计数器，execute_code 迭代可退还
- **并行工具执行**：路径重叠检测 + 工具安全列表
- **Provider 路由**：按任务类型路由到不同模型，fallback 链
- **Qwen Portal 代理**：生成 DashScope 头实现 qwen.ai 兼容

### ToolRegistry（tools/registry.py）

中心注册表，所有工具自注册。

- check_fn 环境门控（注册时检查 vs 调用时检查）
- ToolEntry.__slots__ 减少内存
- 工具名字冲突 warning（不覆盖）
- tool_error / tool_result 辅助函数

### ContextCompressor（agent/context_compressor.py）

四阶段压缩：
1. **Prune**：旧 tool result → `[Old tool output cleared]`
2. **Protect Head**：前 N 条消息（系统提示）
3. **Protect Tail**：最近 X tokens（token 预算，非固定条数）
4. **Summarize Middle**：辅助 LLM 生成结构化摘要

迭代摘要：多次压缩时增量更新（保留旧信息）。

### PromptBuilder（agent/prompt_builder.py）

系统 Prompt 构成：
```
Identity + MemoryGuidance + SkillsGuidance + PlatformHints
+ SkillsSystemPrompt（平台过滤快照缓存）
+ ContextFilesPrompt（AGENTS.md / SOUL.md 注入检测）
+ EphemeralPrompt + NousSubscriptionPrompt
```

模型特定指导：
- GPT/Codex：`<tool_persistence>` / `<mandatory_tool_use>` XML 标签
- Gemini/Gemma：绝对路径 / 并行工具调用
- GPT-5/Codex：`developer` role（API 层交换）

### Gateway（gateway/run.py）

- SSL 自动检测（certifi → 常见发行版路径）
- 13+ 平台初始化
- Cron 调度集成
- 配置文件 → 环境变量桥接（terminal / auxiliary）

## 关键设计决策

| 决策 | 理由 |
|------|------|
| 持久 Event Loop | `asyncio.run()` 销毁循环 → 缓存的 httpx/AsyncOpenAI 在 GC 时报 "Event loop is closed" |
| check_fn 门控 | 环境差异（API key 有无）导致同一工具可用/不可用，运行时检查比注册时检查更灵活 |
| 工具自注册 | 新增工具无需修改注册中心代码；循环导入安全（工具→registry，model_tools→registry） |
| ThreadPoolExecutor(128) | asyncio.run() 内部调用 async 工具（Modal/Docker）时避免死锁 |
| 四阶段压缩而非两阶段 | Prune 先于 Summarize，减少 LLM 摘要内容；Tail 按 token 预算而非固定条数 |
| PII 哈希化 | Session 持久化到磁盘时 sender/chat ID 用 SHA256[:12] 匿名化 |
| Snapshot 缓存 Skills | 技能索引构建昂贵（读所有 SKILL.md），mtime/size manifest 避免重复解析 |

## Related

[[context-compression]] [[tool-registry-pattern]] [[openai-tool-calling]] [[agent-loop-architecture]] `nous-research`
