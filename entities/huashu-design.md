---
title: Huashu Design
created: 2026-04-30
updated: 2026-04-30
type: entity
tags: [agent, tool, design, frontend]
sources: [raw/articles/huashu-design-2026.md]
---

# Huashu Design (花叔Design)

## Overview

HTML-native design skill for Claude Code. 用 HTML 做高保真原型、交互Demo、幻灯片、动画、设计变体探索 + 设计方向顾问 + 专家评审的一体化设计能力。

**GitHub:** https://github.com/alchaincyf/huashu-design
**License:** Personal free; enterprise requires authorization
**Stars:** ~6.3k | **Author:** 花叔 (alchaincyf)

## Key Capabilities

| Capability | Deliverable | Time |
|------------|-------------|------|
| 交互原型（App/Web）| 单文件 HTML · 真 iPhone bezel · 可点击 | 10-15 min |
| 演讲幻灯片 | HTML deck + 可编辑 PPTX | 15-25 min |
| 时间轴动画 | MP4（25/60fps）+ GIF + BGM | 8-12 min |
| 设计变体 | 3+ 并排对比 · Tweaks 实时调参 | 10 min |
| 信息图/可视化 | 印刷级排版 · PDF/PNG/SVG | 10 min |
| 设计方向顾问 | 5流派×20设计哲学 · 推荐3方向 | 5 min |
| 5维度专家评审 | 雷达图 + Keep/Fix/Quick Wins | 3 min |

## Installation

```bash
npx skills add alchaincyf/huashu-design
# or
curl -O https://raw.githubusercontent.com/alchaincyf/huashu-design/main/SKILL.md
```

## Key Mechanisms

- **Brand Asset Protocol**: 5步品牌资产协议（从不记忆色值，从官方提取）
- **Anti-AI-Slop Rules**: 避免 purple gradients, emoji icons, rounded corners 等 AI 垃圾风格
- **Motion Design Engine**: Stage + Sprite time-segment model，60fps 导出
- **HTML → Editable PPTX**: html2pptx.js 翻译 DOM 到 PowerPoint 对象

## Related

- [[open-design]] — 引用了 huashu-design 作为设计哲学 compass
- [[guizang-ppt-skill]] — 另一个 PPT skill
- [[claude-code]] — 运行的 agent
