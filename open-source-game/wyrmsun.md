---
title: Wyrmsun
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, rts, mythology, fantasy]
sources: [https://github.com/Andrettin/Wyrmsun]
---

# Wyrmsun

> 融合神话/历史/虚构元素的多文明 RTS 游戏，基于 Stratagus 引擎，数据与引擎代码完全分离

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/Andrettin/Wyrmsun |
| 数据仓库大小 | ~923MB（不含引擎源码） |
| 引擎源码 | https://github.com/Andrettin/Wyrmgus（独立仓库） |
| 游戏引擎 | Stratagus（Wyrmgus 修改版） |
| 许可 | GPL 2.0（代码+故事）|
| 资产许可 | 各资源独立（graphics/sounds/music 下查看 credits.txt） |
| 版本 | 5.4.0 |

## 核心架构：数据与引擎分离

Wyrmsun 是**游戏内容仓库**，而非独立游戏。与 [[war1gus]] 同构：

```
Wyrmgus 引擎（二进制）
    ↓ 依赖
Wyrmsun 数据仓库（内容层）
    ↓ 复用
Battle for Wesnoth / 0 A.D. / Freeciv / Dungeon Crawl Stone Soup 模块
```

### 仓库目录结构
| 目录 | 内容 |
|------|------|
| `data/` | 游戏数据库（civilizations/units/buildings/technologies/deities/campaigns 等）|
| `modules/` | 跨游戏集成模块（battle_for_wesnoth/0_ad/freeciv/dungeon_crawl_stone_soup）|
| `maps/` | 游戏地图（含 .wmp 格式地图文件）|
| `graphics/` | 像素美术资源（interface/icons/animations）|
| `sounds/` | 音效资源 |
| `music/` | 音乐资源 |
| `translations/` | 多语言本地化 |
| `scripts/` | 游戏逻辑脚本 |
| `documents/` | 百科全书、内购mod指南 |

### 数据驱动设计
- `data/defines.txt` — 全局游戏常量定义
- `data/civilizations/` — 文明定义（人类/矮人/精灵等）
- `data/characters/` — 角色/单位定义（personal names 命名系统）
- `data/ages/` — 时代系统（石器/青铜/铁器等）
- `data/deities/` — 神祇系统
- `data/campaigns/` — 战役脚本

## 玩法特点

- **3 个可玩文明**：人类（Earth）、矮人（Nidavellir）、精灵（Alfheim）
- **程序化命名系统**：每个单位有专属人名（Personal Names）
- **持久英雄系统**：英雄可携带等级/技能/道具贯穿多个场景
- **自定义持久英雄**：玩家可创建自定义持久英雄
- **物品掉落**：普通/魔法/独特物品随机掉落
- **经验升级系统**：单位可获得经验并升级为新单位类型或习得技能
- **内置 Mod 编辑器**：支持 Steam Workshop
- **游戏内百科**：内置百科系统，介绍单位/建筑/历史和神话背景

## 跨游戏模块集成

`modules/` 目录使 Wyrmsun 与其他开源游戏互通：
- **battle_for_wesnoth** — 深度集成 Battle for Wesnoth 单位/阵营
- **0_ad** — 借用 0 A.D. 的地图资源（Gallic Fields/Gallic Highlands）
- **freeciv** — 文明系列集成
- **dungeon_crawl_stone_soup** — Roguelike 集成

## 核心技术点

### 双仓库架构
- **Wyrmgus 引擎仓库**：C++ 引擎代码（https://github.com/Andrettin/Wyrmgus）
- **Wyrmsun 数据仓库**：游戏内容（美术/音效/地图/脚本），GPL 2.0
- 数据/引擎分离使 mod 社区可以独立更新内容

### 文明树系统
- Faction tree 预定义文明进化链（如 Knalga 矮人文明可演变为多个派系）
- 地理政治系统（Polities）：日耳曼部落（Alamanni/Chatti/Hermunduri 等）作为政治实体

### 场景与地图系统
- `.wmp` 地图格式（v5.4.0 新格式，替代旧 .smp）
- 大型地球场景地图（512×512，版本 5.4.0 从 384×384 升级）
- 随机事件系统（gnoll 入侵等）
- 预设领土系统（Alexandria/Carthage/Cyrene 等古城）

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 数据/引擎分离 | 双仓库架构（Wyrmgus/Wyrmsun）使游戏内容与引擎独立演进，[[openra]] 的 Mod 机制同构 |
| 命名系统 | 程序化人名 + 性格 trait 系统可用于 AI NPC 个性化生成 |
| 持久英雄跨场景 | 长期状态保持机制（等级/技能/道具）对 AI 游戏存档设计有参考价值 |
| 物品掉落随机性 | Normal/Magic/Unique 三层物品稀有度设计，`open-source-game/cataclysm-dda` 的物品系统可做对比 |
| 模块化内容集成 | modules/ 跨游戏集成模式可作为 AI 游戏"知识图谱扩展"的内容来源 |
| 内置百科 | 游戏内 encyclopedia 可用于 AI 游戏世界观知识管理 |

## 相关页面

- [[war1gus]] — Warcraft I 重实现，同为 Stratagus 生态
- [[wargus]] — Warcraft II 重实现，Stratagus + wartool 数据提取
- `open-source-game/battle-for-wesnoth` — 高奇幻回合策略，Wyrmsun 模块化集成来源
- [[0-ad]] — 历史古代战争 RTS，提供地图资源
- [[dungeon-crawl-stone-soup]] — 经典 Roguelike，提供内容集成
