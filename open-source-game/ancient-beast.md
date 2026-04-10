---
title: Ancient Beast
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, turn-based-strategy, phaser, typescript]
sources: [raw/articles/open-source-games-list-2026.md]
---

# Ancient Beast

> 回合制策略游戏，7派系单位收集+1v1/2v2对战，Phaser CE 引擎驱动

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/FreezingMoon/AncientBeast |
| 语言 | TypeScript + JavaScript |
| 引擎 | Phaser CE 2.16.0 |
| 构建系统 | Webpack 5 |
| 渲染 | HTML5 Canvas (Phaser) |
| 许可 | AGPL-3.0 + CC-BY-SA-4.0 双许可 |
| 仓库规模 | ~8K LOC TypeScript |
| 状态 | pre-alpha v0.5.0 "Chimera" |

## 核心技术点

- **Phaser CE 2D 游戏引擎**：成熟 HTML5 2D 引擎，支持 WebGL/Canvas 渲染
- **TypeScript 类型安全**：`src/*.ts` 核心模块，Phaser 3.x 风格 API
- **Abilities 系统**：`src/abilities/*.ts` 每个单位约 300-500 LOC，21 个能力文件约 7965 LOC
- **派系系统**：7 大派系（七宗罪主题），每派系多单位
- **WebSocket 多人**：Nakama JS 客户端（heroiclabs/nakama-js）实现多人匹配
- **Webpack 部署管线**：TypeScript → Babel → Webpack → 静态资源部署
- **Asset 流水线**：`assets/` 目录分离原画/音效，CC-BY-SA 4.0 内容许可

### 目录结构

```
src/
├── abilities/      # 21 个单位能力文件（TypeScript）
├── bots/           # Bot AI 逻辑
├── data/           # 游戏数据
├── multiplayer/    # Nakama WebSocket 多人客户端
├── ui/             # 游戏 UI 组件
├── ability.ts      # 能力基类
├── creature.ts     # 单位/生物实体
├── creature_queue.ts  # 回合队列管理
├── damage.ts       # 伤害计算
├── effect.ts       # 效果系统
├── game.ts         # 游戏主循环（1665 LOC）
├── player.ts       # 玩家状态管理
└── script.ts       # 脚本/流程控制
```

## 玩法特点

- **回合制策略**：控制单位在网格战场上移动和攻击
- **单位收集与搭配**：21+ 可操控单位，各有独特技能和属性
- **7 派系系统**：Avarice/Envy/Gluttony/Lust/Pride/Sloth/Wrath 七宗罪派系
- **1v1/2v2 战斗模式**：支持 PvP 多人或 Bot 对战
- **双许可模式**：代码 AGPL-3.0 / 美术 CC-BY-SA-4.0 可分离

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 回合制策略架构 | creature.ts + abilities 分离设计适合复杂单位行为系统 |
| 多人游戏框架 | Nakama JS 提供 WebSocket 多人基础设施参考 |
| 派系/能力数据驱动 | abilities 目录模块化，每单位独立能力文件便于扩展 |
| Web 游戏部署 | Webpack + Phaser 组合成熟稳定，适合 HTML5 游戏快速原型 |
| 美术资产许可 | 双许可模式（代码/美术分离）保护创作者权益同时保持开源 |

## 相关页面

- [[open-source-game-engines-comparison]] — 开源游戏引擎横向对比
- [[phaser-based-games]] — Phaser 引擎游戏合集
- [[turn-based-strategy-games]] — 回合制策略游戏开源项目
