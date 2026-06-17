---
title: nanobot
created: 2026-04-09
updated: 2026-04-10
type: entity
tags: [project, agent, open-source, llm]
sources: [raw/articles/nanobot-readme-2026.md]
aliases: ["Nanobot"]

---

# nanobot

Ultra-lightweight personal AI agent，灵感来自 [[openclaw]]，由 [[hkuds]] 开发。GitHub: https://github.com/HKUDS/nanobot | Docs: https://nanobot.wiki | v0.1.5 (2026-04-05)

## 概述

**nanobot** 是一个极轻量的个人 AI Agent 框架，核心理念是：用最少的代码实现稳定的、长期运行的 AI Agent。比 OpenClaw 代码量减少 99%，核心 runtime 仅 ~2258 行 Python。

- **License**: MIT | **Python**: >= 3.11
- **代码量**: agent/loop 750行 + agent/runner 723行 + agent/memory 675行 + tools/registry 110行
- **安装**: `pip install nanobot-ai` / `uv tool install nanobot-ai` / 源码

## 核心架构

```
nanobot/
├── agent/           # 核心逻辑
│   ├── loop.py     # Agent 循环：接收消息→构建上下文→LLM推理→执行工具→发回响应
│   ├── runner.py   # 共享执行引擎：重试/截断/工具预算管理
│   ├── context.py  # Prompt 构建：bootstrap文件+记忆+技能+运行时上下文
│   ├── memory.py   # 持久化记忆：Consolidator(摘要) + Dream(两阶段压缩写入)
│   ├── skills.py   # Skills 加载器：SKILL.md 格式，always-on / 按需加载
│   ├── subagent.py # 后台 SubAgent 管理（spawn 工具）
│   ├── hook.py     # 生命周期钩子（before/after execute_tools, stream...）
│   └── tools/      # 9类内置工具 + MCP 外部工具
├── bus/            # 统一 Message Bus，所有渠道通过它与核心解耦
├── channels/       # 聊天渠道插件（13个：Telegram/Discord/Feishu/QQ...）
├── providers/      # LLM Provider（22+），添加新 Provider 仅需 2 步
├── cron/           # 定时任务调度
├── session/        # 会话管理（SessionManager）
├── config/         # 配置管理（schema + loader）
└── cli/            # 命令行（agent/gateway/onboard/status...）
```

## Provider Registry（2步添加 Provider）

添加新 LLM Provider 只需：
1. 在 `providers/registry.py` 的 `PROVIDERS` 元组中添加 `ProviderSpec`
2. 在 `config/schema.py` 的 `ProvidersConfig` 中添加字段

每个 `ProviderSpec` 是完整元数据包：name/keywords/env_key/backend/is_gateway/detect_by_key_prefix/supports_prompt_caching 等。

内置 22+ Provider：custom, azure_openai, openrouter, aihubmix, siliconflow, volcengine, byteplus, anthropic, openai, openai_codex, github_copilot, deepseek, gemini, zhipu, dashscope, moonshot, **minimax**, mistral, stepfun, xiaomi_mimo, vllm, ollama, ovms, groq, qianfan

## Dream 两阶段记忆系统

**Stage 1 — Consolidator（压缩）**：对话满时，摘要最旧片段，追加到 `history.jsonl`（append-only，cursor-based JSONL）

**Stage 2 — Dream（整合）**：Cron 调度（默认每2小时），读取 history.jsonl 新条目 + SOUL.md + USER.md + MEMORY.md，LLM 两阶段研究后最小编辑长期记忆文件

**文件结构**：
```
workspace/
├── SOUL.md              # bot 的 voice 和沟通风格
├── USER.md              # 稳定用户知识
└── memory/
    ├── MEMORY.md        # 项目事实、决策
    ├── history.jsonl    # append-only 历史摘要
    ├── .cursor          # Consolidator 写指针
    ├── .dream_cursor    # Dream 消费指针
    └── .git/            # GitStore 版本历史
```

命令：`/dream` `/dream-log` `/dream-log <sha>` `/dream-restore`

## Tool Registry

- `register(tool)`: 动态注册
- `prepare_call()`: 参数校验+类型转换
- `execute()`: 异步执行
- 内置工具：exec(shell), filesystem(read/write/edit/list_dir/grep/glob), web(search/fetch), spawn, message, cron, mcp, sandbox

## Channel Bus

统一消息总线，所有渠道（InboundMessage/OutboundMessage）与核心逻辑解耦，支持插件化接入。

## 安装与快速开始

```bash
nanobot onboard --wizard
nanobot agent          # CLI 对话
nanobot gateway        # 启动渠道网关
```

## 相关概念

- [[agent-loop]] — nanobot 的核心执行循环
- [[provider-registry]] — Provider 架构设计
- [[channel-system]] — 渠道集成架构
- [[memory-system]] — Dream 两阶段记忆
- [[hkuds]] — 开发者
- [[openclaw]] — 设计灵感来源
