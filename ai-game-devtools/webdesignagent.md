---
title: WebDesignAgent
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [ai, llm, tool, open-source, agent]
sources: [raw/articles/ai-game-devtools/webdesignagent.md]
---

# WebDesignAgent

**Developer:** Alibaba DAMO Academy (DAMO-NLP-SG)
**License:** Apache 2.0
**GitHub:** https://github.com/DAMO-NLP-SG/WebDesignAgent

## Overview

WebDesignAgent 是阿里巴巴达摩院开发的自主 AI Agent，用于自动化网站创建。它支持多模态输入（文本描述、现有模板、图像+文本），通过规划-生成-反馈循环生成完整网页，提供 GUI 和 CLI 双模式。

## 核心功能

- **多模态输入**：从文本描述、模板文件或图像+文本组合生成网站
- **自主规划**：在渲染代码之前自动生成结构规划（Plan 步骤可人工审查）
- **人机反馈循环**：初始生成后可通过 feedback 字段迭代优化
- **双界面模式**：GUI（推荐，支持可视化审查）+ CLI/终端模式
- **现代技术栈**：优化使用 gpt-4o + Tailwind CSS

## 技术架构

| 模块 | 文件 | 职责 |
|---|---|---|
| LLM 集成 | `LLM.py`, `base_agent.py` | 核心 Agent 与 LLM 交互逻辑 |
| GUI | `gui.py` | 图形用户界面实现 |
| 网站生成 | `webdesign.py`, `webserver.py` | 页面生成与本地服务 |
| 提示模板 | `prompts/` | 系统提示与任务提示 |
| 配置 | `config.yaml` | OpenAI API 密钥及模型参数 |

## 工作流

```
输入(文本/模板/图片) → Load → Plan(结构规划) → [人工审查/Feedback] → Auto Generate → 输出HTML
```

## 示例项目

- **DAMO 官网**：基于模板生成
- **购物网站**：基于纯文本描述生成
- **游戏网站**：基于图像+文本描述生成

## 同类工具差异

- 与 [[ai-game-devtools/design2code]] 相比：Design2Code 是 screenshot-to-code 评测基准（学术方向），WebDesignAgent 是端到端的实用网站生成 Agent
- 与 [[ai-game-devtools/demogpt]] 相比：DemoGPT 生成 Streamlit 应用框架，WebDesignAgent 生成完整的 Tailwind CSS 前端页面，支持模板参考和人机交互迭代
- 与 [[ai-game-devtools/dify]] 相比：Dify 是 LLM 应用开发平台，WebDesignAgent 专注网页代码生成，是更垂直的工具

## 许可与社区

- Apache 2.0 开源许可
- 提供中文文档（`assets/README_CN.md`）
- 官方微信群支持
