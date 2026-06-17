---
title: Guizang PPT Skill
created: 2026-04-30
updated: 2026-04-30
type: entity
tags: [agent, tool, design, frontend]
sources: [raw/articles/guizang-ppt-skill-2026.md]
---

# Guizang PPT Skill

## Overview

Magazine Web PPT Skill — 用于生成单文件 HTML 水平滑动演示的 Claude Code/Agent Skill。视觉风格是 "e-magazine × e-ink"，灵感来自 Monocle 杂志美学 + 代码级精确感。

**GitHub:** https://github.com/op7418/guizang-ppt-skill
**License:** MIT | **Author:** 歸藏 (op7418) | **Stars:** 60

## Key Features

- **字体**：Serif 标题 + sans-serif 正文 + monospace 元数据（三层系统）
- **背景**：WebGL 流体/弥散效果（仅 hero 页）
- **导航**：← → 键、滚轮、触摸滑动、底部圆点、ESC 索引
- **主题预设**：5 套精选配色（不允许自定义 hex）
- **页面布局**：10 个预制模板
- **输出**：单 HTML 文件——无需构建步骤，无需服务器

## 5 Theme Presets

- 🖋 墨水经典（Ink Classic）— 通用默认，商务发布
- 🌊 靛蓝瓷（Indigo Porcelain）— 科技/研究/AI/技术发布
- 🌿 森林墨（Forest Ink）— 自然/可持续/文化/非虚构
- 🍂 牛皮纸（Kraft Paper）— 复古/人文学/文学/独立杂志
- 🌙 沙丘（Dune）— 艺术/设计/创意/画廊

## Installation

```bash
git clone https://github.com/op7418/guizang-ppt-skill.git ~/.claude/skills/magazine-web-ppt
```

## Related

- [[open-design]] — 默认打包了 guizang-ppt skill
- [[huashu-design]] — 另一个设计 skill
