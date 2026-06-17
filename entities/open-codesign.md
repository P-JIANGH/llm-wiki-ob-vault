---
title: Open CoDesign
created: 2026-04-30
updated: 2026-04-30
type: entity
tags: [agent, tool, design, desktop-app]
sources: [raw/articles/open-codesign-2026.md]
---

# Open CoDesign

## Overview

第一个开源的 Claude Design 替代品。MIT license，桌面 Electron 应用，把 AI agent 变成设计引擎。

**GitHub:** https://github.com/OpenCoworkAI/open-codesign
**Version:** v0.1.4
**License:** MIT

## Core Features

- **Multi-model BYOK**: Claude、GPT-4o/4、Gemini、DeepSeek、Kimi、GLM、Ollama、任意 OpenAI-compatible endpoint
- **本地优先**: 完全离线可用，本地 SQLite 快照版本历史
- **桌面原生**: Electron（非纯 Web）
- **导出格式**: HTML、PDF、PPTX、ZIP、Markdown
- **Comment Mode**: 点击任意元素，插入针，重写该区域
- **AI Tuned Sliders**: 模型暴露可调参数（颜色、间距、字体）
- **Designs Hub**: 每次迭代本地保存，版本切换
- **Agent Panel**: 实时 todos、流式 tool calls、可中断生成

## Architecture

Electron 桌面应用，pi-ai 做 agent 运行时。

## Roadmap (v0.2.0)

agentic design workflow: ask/scaffold/skill/preview/gen_image/tweaks/todos/done/DESIGN.md

## Related

- [[open-design]] — 上游引用了 open-codesign
- [[opencode]] — OpenCode agent
- [[oh-my-opencode]] — OpenCode 增强包
