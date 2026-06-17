---
title: Dora — AI 网站生成工具
created: 2026-04-26
updated: 2026-04-26
type: entity
tags: [tool, ai, website-generation, generative-ai, game-dev]
sources: [raw/articles/ai-game-devtools/dora.md]
---

# Dora — AI 网站生成工具

**官网:** https://www.dora.run/ai
**许可:** 专有（SaaS）

## 概述

Dora AI 是 [Dora](https://dora.run/) 推出的生成式 AI 网站构建工具，通过自然语言提示词（prompt）即可生成完整网站。标语为 *"Sites beyond imagination, one prompt away"*。曾获 ProductHunt Golden Kitty 奖。

## 核心功能

- **文本生成网站**：用户用自然语言描述网站概念，Dora AI 自动生成完整响应式网站
- **AI Pipeline**：三步工作流
  1. **分析提示词** — 确定网站主题和风格
  2. **设计方案** — 在响应式布局中生成原创图片和文案
  3. **迭代发布** — 用户调整、迭代并最终发布
- **品牌感知**：支持特定品牌风格构建（如 Nike、Tesla、Chanel、Lego、McDonald's、Netflix 等示例）
- **100% 提示词驱动**：不使用模板或库存图片，所有内容根据提示词生成
- **多风格支持**：可生成任意主题和风格的网站

## 技术特点

- **非开源**：无公开 GitHub 仓库，为专有 SaaS 平台
- **无技术文档**：架构和模型细节未公开
- **无 API**：纯 Web 应用，无编程接口

## 游戏开发关联

- 快速原型化游戏落地页（landing page）和游戏展示网站
- 生成游戏营销页面和互动演示站点
- **非代码生成工具**，不直接生成游戏代码或引擎集成

## 与同类工具对比

| 维度 | Dora | [[Stable Diffusion web UI]] | [[ComfyUI]] | [[Dify]] |
|------|------|------|------|------|
| 输出 | 网站页面 | 2D 图片 | 2D 图片 | LLM 应用 |
| 生成方式 | 自然语言→UI | 提示词→图片 | 节点图→图片 | 可视化 Workflow |
| 开源 | 否 | 是 | 是 | 是 |
| 游戏开发 | 建站 | 游戏素材 | 复杂资产 | NPC 对话 |

## 相关链接

- 主站：https://www.dora.run/
- 注册：https://www.dora.run/signup/ai
