---
title: AutoGen
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [ai-model, tool, multi-agent, agent, llm, open-source]
sources: [raw/articles/ai-game-devtools/autogen.md]aliases: ["AutoGen"]

---

# AutoGen

**AutoGen** 是微软研究院推出的多 Agent AI 应用框架，支持多个 AI Agent 自主协作或与人类协同完成任务。源自 Microsoft Research，现已转为社区维护模式。

## 概述

AutoGen 开创了实验性多 Agent 编排模式，为社区提供了多 Agent 协作的基础架构。当前处于维护模式（不新增特性），新项目推荐使用其企业级后继者 [Microsoft Agent Framework](https://github.com/microsoft/agent-framework)。

## 架构：三层可扩展设计

| 层级 | 包 | 职责 |
|------|-----|------|
| Core API | `autogen-core` | 消息传递、事件驱动 Agent、本地/分布式运行时，支持 .NET + Python 跨语言 |
| AgentChat API | `autogen-agentchat` | 简化的高阶 API，支持双 Agent 对话、群聊等常见多 Agent 模式 |
| Extensions | `autogen-ext` | LLM 客户端（OpenAI/AzureOpenAI）、代码执行、MCP 工具集成 |

## 生态工具

- **AutoGen Studio** — 无代码 GUI，原型化多 Agent 工作流（Streamlit，基于 `autogen-studio`）
- **AutoGen Bench** — Agent 性能基准评测套件（HumanEval、GAIA 等）
- **Magentic-One** — 基于 AgentChat + Extensions 构建的 SOTA 多 Agent 系统，`magentic-one-cli` 提供 CLI

## 核心模块

```
agbench/               # 基准评测（linter / run_cmd / tabulate）
autogen-agentchat/     # 高阶 AgentChat API
autogen-core/          # 核心消息传递、事件驱动运行时
autogen-ext/           # 扩展（OpenAI 客户端、Azure、代码执行、MCP）
autogen-magentic-one/  # Magentic-One 多 Agent 系统
autogen-studio/        # 无代码 GUI（Streamlit）
magentic-one-cli/      # Magentic-One CLI
pyautogen/             # 遗留 v0.2 兼容层
```

## 安装

```bash
pip install -U "autogen-agentchat" "autogen-ext[openai]"
pip install -U "autogenstudio"   # AutoGen Studio（无代码 GUI）
```

要求 Python 3.10+。

## 多 Agent 协作示例

```python
import asyncio
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.tools import AgentTool
from autogen_ext.models.openai import OpenAIChatCompletionClient

async def main():
    client = OpenAIChatCompletionClient(model="gpt-4.1")

    math_expert = AssistantAgent("math_expert", model_client=client,
                                 system_message="You are a math expert.")
    math_tool = AgentTool(math_expert, return_value_as_last_message=True)

    chem_expert = AssistantAgent("chemistry_expert", model_client=client,
                                  system_message="You are a chemistry expert.")
    chem_tool = AgentTool(chem_expert, return_value_as_last_message=True)

    assistant = AssistantAgent("assistant", model_client=client,
                                 tools=[math_tool, chem_tool],
                                 max_tool_iterations=10)
    result = await assistant.run(task="What is the integral of x^2?")
    print(result)
    await client.close()

asyncio.run(main())
```

## MCP 集成

支持通过 `McpWorkbench` 连接 MCP 服务器（如 Playwright）：

```python
from autogen_ext.tools.mcp import McpWorkbench, StdioServerParams

server_params = StdioServerParams(
    command="npx",
    args=["@playwright/mcp@latest", "--headless"],
)
async with McpWorkbench(server_params) as mcp:
    agent = AssistantAgent("browser", model_client=client,
                           workbench=mcp, max_tool_iterations=10)
```

## 许可证

MIT（社区管理）

## 相关链接

- GitHub: https://github.com/microsoft/autogen
- 文档: https://microsoft.github.io/autogen/
- Discord: https://aka.ms/autogen-discord
- 后继者: [Microsoft Agent Framework](https://github.com/microsoft/agent-framework)
- 迁移指南: https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen/

## 相关项目

- [[ai-game-devtools/agentscope]] — ModelScope 多 Agent 平台，强调生产级部署（K8s/OTel）和 MCP/A2A 协议集成
- [[ai-game-devtools/metagpt]] — 多 Agent 软件开发框架（OpenBMB）
- [[ai-game-devtools/langchain]] — LLM 应用开发框架，Chain/Agent/Memory/Tool/Prompt 抽象
- [[ai-game-devtools/aios]] — AI Agent 操作系统，LLM 内核抽象层，支持 AutoGen
