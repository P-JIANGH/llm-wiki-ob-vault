---
title: Dungeon Crawl Stone Soup
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, roguelike, turn-based, rpg]
sources: [raw/articles/open-source-games-list-2026.md]
---

# Dungeon Crawl Stone Soup

> 经典 Roguelike 地下城探索游戏，融合战术战斗与魔法，以多样性技能与神祇系统著称。

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/crawl/crawl |
| 语言 | C++（~412K LOC，310 个 .cc 文件） |
| 构建系统 | Make（Tiles: `make TILES=y`，Console: `make`） |
| 渲染/引擎 | 自研渲染器（ASCII + Tiles 双模式，SDL2 图形界面） |
| 许可 | GPLv2+ |
| 社区 | tavern.dcss.io 论坛、Discord、Reddit r/dcss、IRC #crawl |
| 起源 | Linley's Dungeon Crawl（2005 最终版 v4.1），2006 年起由 Stone Soup 团队继续开发 |

## 核心技术点

### 庞大 C++ 代码库（~412K LOC）
- 310 个 .cc 源文件，单体结构而非微服务
- 最大文件：`mon-cast.cc`（9936行）、`player.cc`（9514行）、`beam.cc`（7982行）
- 典型模块文件：`dungeon.cc`（7712行）、`god-abil.cc`（7403行）、`describe.cc`（7690行）
- `AppHdr.h` 核心游戏头文件定义所有主要数据结构

### 双模式渲染系统
- **Console/ASCII 模式**：纯文本渲染，无需外部依赖
- **Tiles 模式**：SDL2 + SDL_image + libpng 图形化界面，支持 GUI tiles 显示
- 构建选项：`TILES=y` 启用图形，Linux/Windows/macOS/Android 多平台

### 手绘关卡系统（Vaults）
- 关卡由 `.des` 文件定义（`crawl-ref/source/dat/des/`），位于 arrival/branches/portals/sprint/test/variable 等子目录
- `mapdef.cc`（6421行）处理 `.des` 语法解析与地图实例化
- 支持随机化手绘关卡组合，支持 TUTORIAL 关卡引导新玩家
- 关卡编译器（`.des` → 编译格式）位于 `source/util/Makefile`

### 数据驱动设计
- `art-data.txt`：神器数据配置
- `branch-data.h/json.h`：分支（地下城层级）数据
- `item-def.h` + `item-name.cc`：物品定义与命名
- `book-data.h`：魔法书数据
- `bane-data.h`：怪物弱点数据

### 第三方依赖（嵌入式或系统库）
| 库 | 用途 |
|----|------|
| Lua | 游戏内脚本与用户宏 |
| PCRE | 正则表达式 |
| SQLite | 数据库引擎（存档） |
| SDL/SDL_image | Tiles 图形渲染 |
| libpng | Tiles 图片加载 |

### 构建系统
- 顶层 `crawl-ref/source/Makefile`，各子模块独立 Makefile（`contrib/`、`util/`、`rltiles/`、`webserver/`）
- git submodule 管理第三方依赖（不能用 tarball，必须用 git clone）
- 支持 ccache 加速增量编译
- Android 原生支持（`android-project/`）

## 玩法特点

### 种族与职业组合
- 多种族（Human、Elf、Dwarf、Orc 等）+ 多职业（Fighter、Mage、Priest 等）
- 技能系统覆盖战斗、魔法、炼金、祷告、徒手格斗等

### 神祇系统
- 17+ 可信仰神祇（如 Gozag、Ru、Ashenzari 等），每个神提供独特能力与约束
- `god-abil.cc`（7403行）处理神祇能力授予
- `describe-god.cc` 处理神祇描述

### 地下城层级（Branches）
- Zot（最终目标）、Dungeon、Lair、Orc、Elven Halls、Shoals 等多个分支
- `branch-data.h` 定义分支结构与难度递进

### 在线多人
- 官方服务器 crawl.develz.org 提供在线游戏（WebTiles 浏览器版 + SSH 终端版）
- 玩家可旁观他人游戏

### 地图编辑器
- `.des` 文件手工制作关卡，无需重新编译游戏即可测试
- 贡献者指南详细说明 Vault 制作流程

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **数据驱动游戏内容** | C++ 逻辑与 .des/.txt 数据文件完全分离，设计师可独立创作关卡/物品/怪物而不改代码 |
| **双模式渲染** | Tiles + Console 共用同一游戏逻辑层，UI 层解耦；可作为 AI 游戏双入口参考（CLI + GUI） |
| **技能系统设计** | 多维度技能树（战斗/魔法/宗教/炼金），技能之间有协同与约束关系，可用于 AI 角色能力设计 |
| **神祇/契约系统** | 17+ 神祇提供差异化玩法路径，每个神附带能力+禁忌；可作为 AI 角色"性格/价值观"设计原型 |
| **庞大代码库管理** | 310 个 .cc 文件 412K LOC 单体结构，通过一致的命名规范与模块划分组织；适合学习大型 C++ 项目结构 |
| **关卡 Vault 系统** | 手绘随机关卡设计模式，结合手工质量与程序化组合；可作为 AI 地图生成的训练数据来源 |
| **社区驱动开发** | 20 年持续迭代，CREDITS.txt 列出大量贡献者；开源游戏长期维护模式参考 |

## 相关 Wiki 页面

- [[open-source-games-list]] — 开源游戏列表总览
- [[open-source-game-engines-comparison]] — 开源游戏引擎对比
