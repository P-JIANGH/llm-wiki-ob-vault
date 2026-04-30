---
title: Shattered Pixel Dungeon
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, roguelike, libgdx, java, dungeon-crawler, pixel-art]
sources: [https://github.com/00-Evan/shattered-pixel-dungeon]
---

# Shattered Pixel Dungeon

> 开源传统 Roguelike 地牢爬行器，随机关卡和敌人，数百种可收集物品。基于 Watabou 的 Pixel Dungeon。

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/00-Evan/shattered-pixel-dungeon |
| 语言 | Java (JDK 21) |
| 构建系统 | Gradle (`./gradlew desktop:debug/release`) |
| 渲染/引擎 | libGDX + LWJGL |
| 许可 | GPLv3 |
| Stars | 6,011 |
| Forks | 1,400+ |
| 最新版本 | v3.3.8 (Build 896) |
| 原项目 | Pixel Dungeon by Watabou |

## 项目结构

```
shattered-pixel-dungeon/
├── core/              # 核心游戏逻辑 (1743 items) - 所有平台共享
│   └── src/main/java/com/shatteredpixel/shatteredpixeldungeon/
│       ├── actors/    # 角色系统 (Hero, mobs, NPCs)
│       ├── items/     # 物品系统 (武器/盔甲/魔杖/药水/卷轴)
│       ├── levels/    # 关卡生成算法
│       ├── scenes/    # 游戏场景 (TitleScene, GameScene, etc.)
│       ├── sprites/   # 角色/敌人/物品精灵图
│       ├── tiles/     # 瓦片渲染系统
│       ├── ui/        # UI 组件
│       ├── windows/   # 对话框系统
│       ├── plants/    # 植物系统
│       ├── journal/   # 游戏日志
│       ├── mazes/     # 迷宫生成算法
│       └── services/  # 新闻/更新服务
├── desktop/           # 桌面平台启动器
│   └── src/main/java/.../desktop/DesktopLauncher.java
├── android/           # Android 平台启动器
├── ios/               # iOS 平台启动器
└── docs/              # 构建文档
```

## 核心技术点

### libGDX 跨平台架构
- **共享 core/ 模块**：游戏逻辑在所有平台共享
- **平台特定启动器**：desktop/android/ios 各自独立启动器
- **LWJGL native**：桌面版使用 LWJGL (OpenGL/OpenAL) 渲染音频
- **多 native 支持**：Windows (.dll)、Linux (.so)、macOS (.dylib)、Android (ARM/x64)

### 游戏系统
- **Actors 系统**：角色基类，包含 Hero、Mob、NPC
- **Items 系统**：5 大类物品 (Weapon/Armor/Wand/Potion/Scroll)
- **Levels 系统**：程序化地牢关卡生成，5 大区域 (Sewers/Prison/Caves/City/Halls)
- **Sprite 系统**：角色动画精灵图
- **Tile 系统**：地形渲染 + 战争迷雾
- **Talents 系统**：英雄天赋树

### 国际化和资产
- **多语言支持**：actors/items/levels/journal/ui/windows 等模块各自独立 .properties 文件
- **支持语言**：英语、中文(简/繁)、日语、韩语、德语、法语、俄语等 20+ 语言
- **资产管道**：assets/ 分目录管理 effects/environment/fonts/interfaces/music/sprites

### 版本历史
- 从 original Pixel Dungeon fork
- 经过大量重写，从纯 Java 移植到 libGDX
- v3.3.8 (2024) 为当前稳定版
- deprecated libGDX 独立分支 (shattered-pixel-dungeon-gdx) 已废弃

## 玩法特点

- **传统 Roguelike**：回合制、永久死亡、随机生成
- **5 大区域**：Sewers → Prison → Caves → City → Halls，每区有独特敌人和 Boss
- **物品系统**：武器强化、盔甲附魔、魔杖充能、药水效果、卷轴使用
- **天赋系统**：Hero 升级获得天赋点，可选 3 种职业路径 (Warrior/Mage/Rogue)
- **炼金系统**：AlchemyScene 合成物品
- **排行榜**：本地游戏记录追踪 (Rankings)
- **徽章系统**：成就系统 (Badges)

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **跨平台架构** | libGDX 统一核心逻辑 + 平台特定渲染层的架构设计 |
| **程序化生成** | 关卡/迷宫生成算法是 Roguelike 核心，可用于 AI 游戏关卡生成 |
| **国际化** | 模块化 .properties 文件分离内容与代码，支持 20+ 语言 |
| **物品系统设计** | 5 大物品类别 + 强化/附魔系统，经济系统设计参考 |
| **像素美术资产** | sprites/items/environment 分目录管理，AssetBundle 打包思路 |
| **回合制战斗** | Turn-based actor 系统适合 AI 对战游戏 |
| **持久化** | GamesInProgress/Rankings 本地存档系统 |

## 构建命令

```bash
# 调试运行
./gradlew desktop:debug

# 发布版本
./gradlew desktop:release

# 输出目录: desktop/build/libs/
```

## 相关项目

- `open-source-game/pixel-dungeon` — 原始项目
- [[cataclysm-dark-days-ahead]] — 另一款知名 Roguelike
