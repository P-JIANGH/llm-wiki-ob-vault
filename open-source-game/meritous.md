---
title: Meritous
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, action-adventure, dungeon-crawler, roguelike]
sources: [raw/articles/open-source-games-list-2026.md]
---

# Meritous

> PSI-powered action dungeon crawler — 纯 C + SDL 地牢探索

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/Patashu/Meritous |
| 语言 | C (gcc) |
| 构建系统 | GNU Make + sdl-config |
| 渲染/引擎 | SDL 2D Tile |
| 许可 | GPLv3 |
| 开发者 | Lancer-X / ASCEAI |
| 版本 | v1.2 |

## 核心技术点

### 架构概述
- 纯 C 语言实现，约 **10,360 LOC**（无外部游戏引擎依赖）
- SDL（SDL_image + SDL_mixer）跨平台 2D 渲染
- 模块化 .c/.h 配对：levelblit / mapgen / demon / gamemap / tiles / save / help / audio / boss / ending

### 核心模块

| 文件 | 行数 | 职责 |
|------|------|------|
| `demon.c` | 2613 | 敌人 AI 系统（最大文件） |
| `levelblit.c` | 2646 | Tile 渲染管线（次大） |
| `boss.c` | 1829 | Boss 战逻辑 |
| `mapgen.c` | 972 | 程序化地牢生成 |
| `gamemap.c` | 342 | 游戏地图逻辑 |
| `tiles.c` | 104 | Tile 数据定义 |
| `save.c` | 169 | 存档系统 |
| `audio.c` | 240 | SDL_mixer 音频 |
| `help.c` | 239 | 帮助系统 |
| `ending.c` | 699 | 结局序列 |

### 程序化地牢生成
- `mapgen.c/h` 972 行，负责地牢房间/走廊/触发器生成
- 属于经典 Roguelike 程序化生成技术

### PSI 战斗系统
- Space 键充能 PSI 回路进行攻击
- 区别于传统武器系统

## 玩法特点

- **类银河恶魔城探索**：Orcus Dome 地底秘密探索
- **程序化地牢**：每次游戏地牢布局不同
- **Boss Rush**：多个 Boss 战（boss.c 占比最大）
- **Wuss Mode**：简单模式（更轻松体验）
- **关卡地图**：`Tab` 查看全局地图

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 纯 C 无引擎架构 | 最小依赖 2D 游戏可行性验证 |
| 程序化地牢生成 | 有限空间内无限内容设计参考 |
| 模块化文件划分 | 大型单体 C 项目组织方式 |
| SDL 2D 渲染 | 轻量跨平台游戏引擎思路 |

## 相关资料

- [[open-source-games-list]] — 开源游戏列表总览
- [[open-source-game-engines-comparison]] — 开源游戏引擎对比
