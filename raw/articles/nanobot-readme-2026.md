# nanobot README — Ultra-Lightweight Personal AI Agent

> Source: GitHub HKUDS/nanobot README.md, v0.1.5 (2026-04-05)
> Original: https://github.com/HKUDS/nanobot

## 概述

nanobot 是由香港大学数据科学实验室（HKUDS）开发的极轻量级个人 AI Agent 框架，灵感来自 OpenClaw。核心理念：用最少的代码（约 4000 行）实现稳定的、长期运行的 AI Agent，比 OpenClaw 代码量减少 99%。

## 版本历史（2026）

- v0.1.5 (2026-04-05): sturdier long-running tasks, Dream two-stage memory, production-ready sandboxing, Programming Agent SDK
- v0.1.4.post6 (2026-03-27): architecture decoupling, litellm removal, end-to-end streaming, WeChat channel, security fix
- v0.1.4 (2026-02-17): MCP support, progress streaming, new providers, channel improvements
- v0.1.3.post4 (2026-02-04): multi-provider & Docker support
- v0.1.3 (2026-02-02): 正式发布

## 核心架构

```
nanobot/
├── agent/          # 核心 Agent 逻辑
│   ├── loop.py     # Agent 循环（LLM ↔ tool 执行）
│   ├── runner.py   # 共享执行引擎
│   ├── context.py  # Prompt 构建
│   ├── memory.py   # 持久化记忆（Consolidator + Dream）
│   ├── skills.py   # Skills 加载器
│   ├── subagent.py # 后台任务执行
│   ├── hook.py     # 生命周期钩子
│   └── tools/      # 内置工具
├── bus/            # 统一消息路由
├── channels/       # 聊天渠道插件（Telegram/Discord/Feishu/QQ...）
├── providers/      # LLM Provider（22+）
├── cron/           # 定时任务
├── session/        # 会话管理
├── config/         # 配置管理
├── cli/            # 命令行
└── skills/         # 捆绑 Skills
```

## 核心数字

- 核心 runtime：~2258 行 Python（不含 providers/channels/skills）
  - agent/loop: 750 行
  - agent/runner: 723 行
  - agent/memory: 675 行
  - agent/tools/registry: 110 行

## 主要特性

| 特性 | 说明 |
|------|------|
| 多渠道 | Telegram/Discord/WhatsApp/Feishu/QQ/DingTalk/Slack/Matrix/Email/WeChat/Wecom/Mochat |
| 多 Provider | OpenRouter/Anthropic/OpenAI/DeepSeek/Groq/MiniMax/Gemini/Ollama/vLLM/MCP...共 22+ |
| 工具系统 | 内置 9 类工具 + MCP 外部工具 + 可扩展 Skill 系统 |
| 记忆系统 | 分层记忆 + Dream 两阶段整合 + GitStore 版本化 |
| 安全沙箱 | bwrap 沙箱 + restrictToWorkspace + SSRF 白名单 |
| 部署方式 | PyPI / Docker / systemd / 多实例 |

## Provider Registry 设计

添加新 LLM Provider 只需 2 步：
1. 在 `providers/registry.py` 的 `PROVIDERS` 元组中添加一个 `ProviderSpec`
2. 在 `config/schema.py` 的 `ProvidersConfig` 中添加一个字段

每个 `ProviderSpec` 包含：
- `name`: 配置字段名
- `keywords`: 模型名匹配关键字
- `env_key`: API key 环境变量
- `backend`: 实现后端（openai_compat/anthropic/azure_openai/openai_codex/github_copilot）
- `is_gateway`: 是否为网关（如 OpenRouter）
- `detect_by_key_prefix` / `detect_by_base_keyword`: 自动检测
- `supports_prompt_caching`: 是否支持 Anthropic prompt caching

内置 22+ Provider：custom, azure_openai, openrouter, aihubmix, siliconflow, volcengine, byteplus, anthropic, openai, openai_codex, github_copilot, deepseek, gemini, zhipu, dashscope, moonshot, minimax, mistral, stepfun, xiaomi_mimo, vllm, ollama, ovms, groq, qianfan

## Tool Registry 设计

`agent/tools/registry.py` 中的 `ToolRegistry`：
- `register(tool)`: 动态注册工具
- `prepare_call()`: 参数校验和类型转换
- `execute()`: 异步执行工具
- 内置工具：shell/exec, filesystem(read_file/write_file/edit/list_dir), web(web_search/web_fetch), spawn, message, cron, mcp, sandbox

## Memory System — Dream 两阶段压缩

**Stage 1: Consolidator**
- 当对话增长到压力上下文窗口时
- 总结最旧的对话片段，追加到 `memory/history.jsonl`
- 每行是 JSON：`{"cursor": 42, "timestamp": "2026-04-03 00:02", "content": "..."}`
- append-only，cursor-based

**Stage 2: Dream**
- Cron 调度运行（默认 `intervalH: 2`）
- 读取：history.jsonl 新条目 + SOUL.md + USER.md + MEMORY.md
- 两阶段：①研究新旧内容 ②最小编辑修改长期记忆文件
- 可用命令：`/dream`（立即运行）/ `/dream-log` / `/dream-restore`

**文件结构：**
```
workspace/
├── SOUL.md              # bot 的长期 voice 和沟通风格
├── USER.md              # 稳定用户知识
└── memory/
    ├── MEMORY.md        # 项目事实、决策、持久上下文
    ├── history.jsonl    # append-only 历史摘要
    ├── .cursor          # Consolidator 写指针
    ├── .dream_cursor    # Dream 消费指针
    └── .git/            # GitStore 版本历史
```

## Agent Loop（核心执行循环）

位于 `agent/loop.py`，核心逻辑：
1. 从 MessageBus 接收入站消息
2. ContextBuilder 构建提示上下文（历史+记忆+技能）
3. 调用 LLM 推理
4. 解析并执行工具调用
5. 通过 MessageBus 发送响应

Hook 系统支持 `before_execute_tools`/`after_iteration` 等生命周期钩子。

## Skills 系统

Skills 是 markdown 文件（SKILL.md），教 agent 如何使用特定工具或执行任务。
- 内置 skills 目录：`nanobot/skills/`
- 工作区 skills：`workspace/skills/`
- 支持 always-on skills 和按需加载

## Channel Bus 架构

所有聊天渠道通过统一 Message Bus 通信，与核心逻辑解耦。
- InboundMessage: channel/sender_id/chat_id/content/media/metadata
- OutboundMessage: channel/chat_id/content/reply_to/media/metadata
- 支持插件化渠道接入

## 安装方式

```bash
# 源码安装
git clone https://github.com/HKUDS/nanobot.git && cd nanobot && pip install -e .

# uv
uv tool install nanobot-ai

# PyPI
pip install nanobot-ai
```

## 快速开始

```bash
nanobot onboard
# 配置 ~/.nanobot/config.json
nanobot agent  # 开始对话
nanobot gateway  # 启动渠道网关
```

## 相关链接

- GitHub: https://github.com/HKUDS/nanobot
- Docs: https://nanobot.wiki
- PyPI: https://pypi.org/project/nanobot-ai/
