---
title: LaVague
created: 2026-04-22
updated: 2026-04-22
type: entity
tags: [ai, agent, tool, automation, open-source, llm]
sources: [raw/articles/ai-game-devtools/lavague.md]
---

# LaVague

> Open-source Large Action Model (LAM) framework for developing AI Web Agents that automate browser-based processes from natural language objectives. Apache 2.0.

## Overview

LaVague 是一个开源的大型动作模型（LAM）框架，用于开发能够根据自然语言目标自动执行浏览器操作的 AI Web Agent。它将多模态 LLM 与浏览器自动化驱动（Selenium/Playwright/Chrome 扩展）结合，实现"自然语言 → 网页自动化"的端到端工作流。

## Architecture

- **World Model**: 多模态 LLM（默认 GPT-4V），接收目标 + 当前网页状态（截图），输出下一步操作指令
- **Action Engine**: 将指令"编译"为可执行动作代码（Selenium/Playwright/Chrome Extension）并执行
- **Three Engines**:
  - Navigation Engine: 复杂 HTML 交互（点击、填表等）
  - Python Engine: 无需导航的计算任务
  - Navigation Controls: 简单动作（WAIT、BACK、SCAN、MAXIMIZE_WINDOW、SWITCH_TAB）

## Package Structure (Monorepo)

| Package | Purpose |
|---------|---------|
| `lavague-core` | 核心框架：WorldModel、ActionEngine、NavigationEngine、PythonEngine、retrievers、extractors |
| `lavague-drivers-selenium` | Selenium WebDriver 集成 |
| `lavague-drivers-playwright` | Playwright WebDriver 集成 |
| `lavague-contexts-openai` | OpenAI 上下文（LLM + embedding） |
| `lavague-contexts-anthropic` | Anthropic 上下文 |
| `lavague-contexts-gemini` | Google Gemini 上下文 |
| `lavague-contexts-fireworks` | Fireworks AI 上下文 |
| `lavague-gradio` | Gradio 演示 UI |
| `lavague-qa` | QA 测试工具：Gherkin 规格 → 自动化测试 |
| `lavague-server` | 用于远程驱动的 WebSocket 服务器 |
| `lavague-retrievers-cohere` | Cohere retriever 集成 |
| `lavague-tests` | 测试运行器和基准测试 |

## Key Dependencies

- llama-index（LLM/embedding 抽象、PromptTemplate）
- selenium / playwright（浏览器自动化）
- Pillow（截图处理）
- PyYAML（状态序列化）
- gradio（可选 UI）

## Features

- 自然语言 → 网页自动化
- 内置多 LLM Provider 上下文/配置
- Agent 性能基准测试运行器
- Token 计数器用于成本估算
- 日志和调试工具
- Chrome Extension 驱动
- 遥测收集（可通过 `LAVAGUE_TELEMETRY=NONE` 禁用）
- Gherkin 规格转测试的 QA 工具

## Drivers Support

| Feature | Selenium | Playwright | Chrome Extension |
|---------|----------|------------|------------------|
| Headless | ✅ | ⏳ | N/A |
| Handle iframes | ✅ | ✅ | ❌ |
| Open several tabs | ✅ | ⏳ | ✅ |
| Highlight elements | ✅ | ✅ | ✅ |

## Usage Example

```python
from lavague.core import WorldModel, ActionEngine
from lavague.core.agents import WebAgent
from lavague.drivers.selenium import SeleniumDriver

selenium_driver = SeleniumDriver(headless=False)
world_model = WorldModel()
action_engine = ActionEngine(selenium_driver)
agent = WebAgent(world_model, action_engine)
agent.get("https://huggingface.co/docs")
agent.run("Go on the quicktour of PEFT")
```

## Related

- 与 [[langchain]] 不同：LaVague 专注于浏览器自动化，而 LangChain 是通用 LLM 应用框架
- 底层使用 [[llama-index]] 进行 LLM/embedding 抽象
- 与 [[la-vague]] 是同一项目（笔记页面）
- 对比 [[agentgpt]]：AgentGPT 是自主任务执行 Agent，LaVague 是浏览器专用自动化 Agent

## Links

- GitHub: https://github.com/lavague-ai/LaVague
- License: Apache 2.0
