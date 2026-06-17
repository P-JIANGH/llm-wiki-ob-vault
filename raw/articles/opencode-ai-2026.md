---
url: https://opencode.ai/
title: OpenCode | The open source AI coding agent
extracted: 2026-04-29
---

# OpenCode | The open source AI coding agent

GitHub: anomalyco/opencode (150K stars)
Docs: https://opencode.ai/docs

## Install
curl -fsSL https://opencode.ai/install | bash

## What is OpenCode?
OpenCode is an open source agent that helps you write code in your terminal, IDE, or desktop.

- **LSP enabled** — Automatically loads the right LSPs for the LLM
- **Multi-session** — Start multiple agents in parallel on the same project
- **Share links** — Share a link to any session for reference or to debug
- **GitHub Copilot** — Log in with GitHub to use your Copilot account
- **ChatGPT Plus/Pro** — Log in with OpenAI to use your ChatGPT Plus or Pro account
- **Any model** — 75+ LLM providers through Models.dev, including local models
- **Any editor** — Available as a terminal interface, desktop app, and IDE extension

## Stats
- 140K GitHub Stars
- 850 Contributors
- 6.5M Monthly Devs

## Privacy
OpenCode does not store any of your code or context data, so that it can operate in privacy sensitive environments.

## Zen
Zen gives you access to a handpicked set of AI models that OpenCode has tested and benchmarked specifically for coding agents.

---
url: https://github.com/opencode-ai/opencode
title: GitHub - opencode-ai/opencode
note: ARCHIVED Sep 18 2025 — moved to Crush by charmbracelet team
extracted: 2026-04-29
---

# GitHub - opencode-ai/opencode

⚠️ Important Notice: This repository has been archived (Sep 18 2025). The project has moved to Crush by the Charm team.

## Overview
OpenCode is a Go-based CLI application providing AI coding assistance directly in the terminal with a TUI (Terminal User Interface).

Stats: 12.2k ⭐ Stars | 1.3k Forks | 27 Contributors | 50 Releases

Stack: Go 99.2% | Shell 0.8%

## Features
- **Interactive TUI** — Built with Bubble Tea
- **Multiple AI Providers** — OpenAI, Anthropic Claude, Google Gemini, AWS Bedrock, Groq, Azure OpenAI, OpenRouter, GitHub Copilot
- **Session Management** — Save and manage conversation sessions (SQLite)
- **Tool Integration** — AI executes commands, searches files, modifies code
- **Vim-like Editor** — Integrated text editing
- **LSP Integration** — Language Server Protocol support
- **Auto Compact** — Auto-summarizes conversations at 95% context window
- **Custom Commands** — User-defined commands with named placeholders
- **MCP Support** — Model Context Protocol for external tools

## Installation
```bash
curl -fsSL https://raw.githubusercontent.com/opencode-ai/opencode/refs/heads/main/install | bash
brew install opencode-ai/tap/opencode
go install github.com/opencode-ai/opencode@latest
```

## Supported AI Models

| Provider | Models |
|----------|--------|
| **OpenAI** | GPT-4.1, GPT-4.1-mini, GPT-4.1-nano, GPT-4.5, GPT-4o, GPT-4o-mini, O1, O1-pro, O1-mini, O3, O3-mini, O4 Mini |
| **Anthropic** | Claude 4 Sonnet, Claude 4 Opus, Claude 3.7 Sonnet, Claude 3.5 Sonnet, Claude 3.5 Haiku, Claude 3 Haiku, Claude 3 Opus |
| **GitHub Copilot** | GPT-4o, GPT-4o Mini, Claude 3.5/3.7 Sonnet, O1, O3 Mini, O4 Mini, Gemini 2.0 Flash, Gemini 2.5 Pro |
| **Google** | Gemini 2.5, 2.5 Flash, 2.0 Flash, 2.0 Flash Lite |
| **AWS Bedrock** | Claude 3.7 Sonnet |
| **Groq** | Llama 4 Maverick/Scout, QWQ-32b, Deepseek R1, Llama 3.3 70b |
| **Azure OpenAI** | Same as OpenAI |

## Keyboard Shortcuts

### Global
| Shortcut | Action |
|----------|--------|
| Ctrl+C | Quit |
| Ctrl+? / ? | Toggle help |
| Ctrl+L | View logs |
| Ctrl+A | Switch session |
| Ctrl+K | Command dialog |
| Ctrl+O | Model selection |
| Esc | Close dialog |

### Chat
| Shortcut | Action |
|----------|--------|
| Ctrl+N | New session |
| Ctrl+X | Cancel generation |
| i | Focus editor |

### Editor
| Shortcut | Action |
|----------|--------|
| Ctrl+S | Send message |
| Ctrl+E | Open external editor |

## AI Tools

### File & Code Tools
| Tool | Description |
|------|-------------|
| glob | Find files by pattern |
| grep | Search file contents |
| ls | List directory contents |
| view | View file contents |
| write | Write to files |
| edit | Edit files |
| patch | Apply patches |
| diagnostics | Get linting info |

### Git Tools
| Tool | Description |
|------|-------------|
| git status | Check repo status |
| git diff | View changes |
| git log | View commit history |
| git commit | Commit changes |

### Terminal Tools
| Tool | Description |
|------|-------------|
| bash | Run shell commands |
| web | Search the web |
| search | Search context |
| ask | Ask about code |
