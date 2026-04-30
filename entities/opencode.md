---
title: OpenCode
created: 2026-04-30
updated: 2026-04-30
type: entity
tags: [agent, tool, cli, open-source]
sources: [raw/articles/opencode-ai-2026.md]
---

# OpenCode

## Overview

开源 AI coding agent，终端/IDE/桌面可用。150K GitHub stars。

**GitHub:** https://github.com/opencode-ai/opencode (archived Sep 2025 → moved to Crush by charmbracelet)
**License:** MIT
**Stars:** 150K | **Contributors:** 850 | **Monthly Devs:** 6.5M

## Features

- **LSP enabled** — 自动加载正确的 LSP
- **Multi-session** — 同一项目并行多 agent
- **Share links** — 分享 session 链接
- **Any model** — 75+ LLM providers through Models.dev
- **Any editor** — terminal / desktop app / IDE extension
- **Privacy** — 不存储代码和上下文数据

## Stack

Go-based CLI with Bubble Tea TUI.

## Installation

```bash
curl -fsSL https://opencode.ai/install | bash
# or
brew install opencode-ai/tap/opencode
go install github.com/opencode-ai/opencode@latest
```

## AI Models Supported

| Provider | Models |
|----------|--------|
| OpenAI | GPT-4.1, 4.5, O1, O3, O4 Mini |
| Anthropic | Claude 4 Sonnet/Opus, Claude 3.5/3.7 Sonnet, Haiku |
| GitHub Copilot | GPT-4o, Claude 3.5/3.7 Sonnet, O1, O3 Mini |
| Google | Gemini 2.5, 2.0 Flash |
| AWS Bedrock | Claude 3.7 Sonnet |
| Groq | Llama 4, QWQ-32b, Deepseek R1 |

## Related

- [[oh-my-opencode]] — OpenCode 增强包
- [[nanobot]] — 另一个开源 agent
- [[open-design]] — Open Design 生态引用 OpenCode
