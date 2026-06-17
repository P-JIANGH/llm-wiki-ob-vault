# Open CoDesign — GitHub Source

**URL:** https://github.com/OpenCoworkAI/open-codesign
**Fetched:** 2026-04-29
**License:** MIT
**Version:** v0.1.4

## Overview

Open CoDesign 是第一个开源的 Claude Design 替代品。MIT license，桌面 Electron 应用，把 AI agent（Claude/GPT/Gemini/DeepSeek/Kimi/GLM/Ollama 等）变成设计引擎。

核心特点：
- **Multi-model BYOK**：Claude、GPT-4o/4、Gemini、DeepSeek、Kimi、GLM、Ollama、任意 OpenAI-compatible endpoint
- **本地优先**：完全离线可用，本地 SQLite 快照版本历史
- **桌面原生**：Electron（非纯 Web）
- **导出格式**：HTML、PDF、PPTX、ZIP、Markdown
- **Comment Mode**：点击任意元素，插入针，重写该区域
- **AI Tuned Sliders**：模型暴露可调参数（颜色、间距、字体）
- **Designs Hub**：每次迭代本地保存，版本切换
- **Agent Panel**：实时 todos、流式 tool calls、可中断生成

v0.2.0 roadmap：agentic design（ask/scaffold/skill/preview/gen_image/tweaks/todos/done/DESIGN.md）

对比：vs Claude Design（闭源）、v0 by Vercel（闭源）、Lovable（受限多）

架构：Electron 桌面，pi-ai 做 agent 运行时（打包进来）
