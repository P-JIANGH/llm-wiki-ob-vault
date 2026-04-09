---
title: Whatajong
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, puzzle, roguelike, solid-js, typescript, electron]
sources: [https://github.com/masylum/whatajong]
---

# Whatajong

> 麻将消消乐 Roguelite 游戏，https://whatajong.com

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/masylum/whatajong |
| 语言 | TypeScript (主) + C++ (native 模块 via Electron) |
| 构建系统 | Vite + electron-vite + electron-builder |
| 渲染/引擎 | Solid.js 响应式 UI + Canvas/WebGL (via DOM) |
| 许可 | MIT |
| 官网 | https://whatajong.com |

## 核心技术点

### 前端框架：Solid.js
- 轻量级响应式 UI 框架（类 React 但编译时优化，无虚拟 DOM）
- 细粒度响应式系统：createSignal/createEffect/createMemo
- [solid-js](#/) 对比 [godot-4](#/concepts/godot-4)：前者是 Web UI 框架，后者是游戏引擎

### 状态管理
- 分散式状态模块：gameState/deckState/animationState/globalState/runState
- persistentDatabase - 持久化存档
- runState - 单局游戏状态（关卡进度/金币/奖励）

### 路由与页面流
- runIntro → runGame → runShop → runReward → runGameOver
- 典型 Roguelite 循环：开局 → 挑战 → 奖励选择 → 下一关

### 桌面打包
- electron-vite：Vite + Electron 集成
- electron-builder：跨平台打包 (Win/Mac/Linux)
- @electron-toolkit：Electron 工具集 (preload/utils)

### CSS 方案
- Vanilla Extract CSS：编译时 CSS-in-TS，零运行时开销
- [vanilla-extract](#/) 对比 [godot-animation-system](#/concepts/godot-animation-system)：前者是 Web CSS 方案，后者是游戏引擎动画

### 其他依赖
- Howler.js：音频播放
- rand-seed：确定性随机数（Roguelike 存档重放）
- Remeda：函数式编程工具库
- nanoid：ID 生成
- PostHog：产品分析

### 代码质量
- Biome：Linter + Formatter（替代 ESLint/Prettier）
- Vitest：单元测试
- Knip：未使用代码检测

## 玩法特点

- Mahjong Solitaire 基础玩法：消除匹配的麻将牌
- Roguelite 循环：每局随机生成牌局 + 奖励选择
- 无限关卡模式

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 现代化 Web 游戏架构 | Solid.js + Vite + electron-vite 成熟技术栈可用于轻量游戏 |
| Roguelite 状态机设计 | 游戏循环（intro/game/shop/reward/gameover）可复用于其他游戏 |
| 确定性重放 | rand-seed 可用于 AI 对战录像重放系统 |
| 桌面端打包 | electron-builder 成熟方案可用于游戏桌面版发布 |

## 相关页面

- [open-source-game/surreal-engine](#/open-source-game/surreal-engine) — Unreal Engine 1 重实现
- [open-source-game/fish-folk-jumpy](#/open-source-game/fish-folk-jumpy) — Bevy/Rust 游戏参考
- [godot-4](#/concepts/godot-4) — 游戏引擎对比
