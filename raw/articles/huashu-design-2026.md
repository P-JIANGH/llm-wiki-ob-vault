# Huashu Design - Source

> https://github.com/alchaincyf/huashu-design
> Fetched: 2026-04-28

## Summary

Huashu Design (花叔Design) — HTML-native design skill for Claude Code. 用 HTML 做高保真原型、交互Demo、幻灯片、动画、设计变体探索 + 设计方向顾问 + 专家评审的一体化设计能力。

## Key Facts

- **Author**: 花叔 (alchaincyf / @AlchainHust)
- **GitHub**: ~6.3k stars (2026-04-26)
- **License**: Personal free; enterprise requires authorization
- **Agent Support**: Claude Code, Cursor, Codex, OpenClaw, Hermes (Agent-agnostic)
- **Install**: `npx skills add alchaincyf/huashu-design` or `curl -O https://raw.githubusercontent.com/alchaincyf/huashu-design/main/SKILL.md`

## Core Capabilities

| Capability | Deliverable | Time |
|------------|-------------|------|
| 交互原型（App/Web）| 单文件 HTML · 真 iPhone bezel · 可点击 | 10-15 min |
| 演讲幻灯片 | HTML deck + 可编辑 PPTX | 15-25 min |
| 时间轴动画 | MP4（25/60fps）+ GIF + BGM | 8-12 min |
| 设计变体 | 3+ 并排对比 · Tweaks 实时调参 | 10 min |
| 信息图/可视化 | 印刷级排版 · PDF/PNG/SVG | 10 min |
| 设计方向顾问 | 5流派×20设计哲学 · 推荐3方向 | 5 min |
| 5维度专家评审 | 雷达图 + Keep/Fix/Quick Wins | 3 min |

## Key Mechanisms

### Brand Asset Protocol (5-Step Hard Process)
When specific brand is involved, enforces 5 steps:
1. Ask user if they have brand guidelines
2. Scrape official brand pages (brand.com/brand, brand.com/press)
3. Download assets (SVG → official HTML → product screenshots)
4. grep extract color values (never guess from memory)
5. Solidify spec as `brand-spec.md` + CSS variables

### Anti-AI-Slop Rules
Avoid visual greatest common divisor (purple gradients, emoji icons, rounded corners + left border accent, SVG faces, Inter for display). Use: `text-wrap: pretty`, CSS Grid, carefully chosen serif display and oklch colors.

### Motion Design Engine
Stage + Sprite time-segment model:
```javascript
useTime()    // Timeline management
useSprite()  // Sprite animation
interpolate() // Interpolation
Easing       // Easing functions
```

### HTML → Editable PPTX
`html2pptx.js` reads DOM computedStyle, translates each element to PowerPoint object. Exports real text boxes that can be double-clicked and edited.

## Comparison with Claude Design

| | Claude Design | huashu-design |
|---|---|---|
| Form | Web product | skill (inside Agent) |
| Quota | Subscription quota | API consumption, unlimited for parallel agents |
| Deliverables | In-canvas + exportable to Figma | HTML/MP4/GIF/PPTX/PDF |
| Operation | GUI (click, drag, edit) | Conversation (speak, wait for agent) |
| Animation | Limited | Stage + Sprite, 60fps export |
| Cross-agent | Exclusive to Claude.ai | Any agent compatible |

## Repository Structure

```
huashu-design/
├── SKILL.md              # Main doc (for agent)
├── README.md             # User-facing
├── assets/
│   ├── animations.jsx    # Stage + Sprite + Easing
│   ├── ios_frame.jsx     # iPhone 15 Pro bezel
│   ├── deck_stage.js     # HTML slide engine
│   ├── showcases/        # 24 pre-made examples (8 scenes × 3 styles)
│   └── bgm-*.mp3         # 6 scenario background music tracks
├── references/
│   ├── design-styles.md  # 20 design philosophies
│   ├── animation-pitfalls.md
│   ├── editable-pptx.md
│   └── ...
├── scripts/
│   ├── render-video.js   # HTML → MP4
│   ├── html2pptx.js      # Editable PPTX export
│   └── ...
└── demos/                # 9 capability demos
```

## About Author

花叔 (Huasheng) — AI Native Coder / Independent Developer / AI Content Creator

- 小猫补光灯 (AppStore paid chart Top 1)
- 《一本书玩转 DeepSeek》
- 女娲 .skill (GitHub 12000+ stars)
- 30万+ followers across platforms

Platforms: X/Twitter @AlchainHust, 公众号「花叔」, B站, YouTube @Alchain, huasheng.ai
