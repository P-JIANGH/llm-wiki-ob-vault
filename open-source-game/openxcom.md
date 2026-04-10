---
title: OpenXcom
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, turn-based-strategy, xcom, tactical-combat, sdl]
sources: [raw/articles/open-source-games-list-2026.md]
---

# OpenXcom

> 开源复刻《X-COM: UFO Enemy Unknown》和《X-COM: Terror From the Deep》，C++/SDL2，2011年启动，2.1k stars。

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/OpenXcom/OpenXcom |
| 语言 | C++ (C++11) |
| 构建系统 | CMake + Makefile.simple + MSVC2010+ |
| 渲染/引擎 | SDL 2 (SDL2_gfx/SDL2_mixer/SDL2_image)，自研 Scaler 上采样 (hq2x/hq3x/hq4x) |
| 许可 | GPL |
| 依赖 | SDL 1.2 (历史版) / SDL 2 (现代版)，yaml-cpp ≥0.5.3 |
| Stars | 2,149 |
| 源码规模 | 646 C++ 源文件，~3MB 仓库（不含原版游戏数据）|

## 核心技术点

### 模块化游戏架构

```
src/
├── Geoscape/     (71 files)  — 战略地图（大地球仪、战斗机拦截、基地列表）
├── Battlescape/  (99 files)  — 战术战斗（回合制网格战场）
├── Basescape/    (80 files)  — 基地管理（设施建设、士兵装备、研发）
├── Engine/       (69 files)  — 渲染引擎 + Scaler 上采样算法
├── Mod/          (86 files)  — Mod 加载与 YAML 规则集系统
├── Savegame/     (70 files)  — 存档序列化
├── Interface/    (34 files)  — UI 组件（Button/TextButton/Frame/Surface）
├── Menu/         (68 files)  — 主菜单/保存/读取/选项
└── Ufopaedia/    (42 files)  — 游戏百科系统
```

**设计亮点：严格按游戏阶段/视图分离模块**，Geoscape/Battlescape/Basescape 三层各自独立，模块边界清晰。

### YAML 数据驱动 Mod 系统

- Mod 通过 YAML 规则集文件定义（`ruleset` 格式）
- `Mod/Mod.cpp` 105KB，核心 Mod 加载器
- 支持在运行时覆盖任何游戏规则（单位属性、科技树、武器、地图）
- mod.io 社区有数百个 Mod

### 存档系统

- `Savegame/` 模块处理完整游戏状态序列化
- `SavedGame.cpp` 管理全局存档（含资源/资金/科技进度）
- `SavedBattleGame.cpp` 管理战斗存档（含战场网格状态）

### 自研 Scaler 上采样

- `Engine/Scalers/` 含 hq2x/hq3x/hq4x 像素艺术上采样实现
- `lodepng.cpp` 216KB，自包含 PNG 编解码（无外部 libpng 依赖）
- 解决原版 320×200 低分辨率在现代屏幕的显示问题

### 平台抽象层

- 三目录结构：`user/` (Mod/存档/截图)、`config/` (配置)、`data/` (游戏数据)
- 跨平台路径自动选择（Windows/Mac/Linux各有一套默认路径）
- CMake 3.5+ 构建，支持 MSVC/GCC/Clang

## 玩法特点

- **经典 X-COM 体验**：大地图战略决策 + 回合制战术战斗
- **完整双游戏支持**：UFO Enemy Unknown + Terror From the Deep
- **丰富 Mod 生态**：mod.io 数百 Mod，海底种族/新武器/新地图等
- **数据文件复用**：需要原版 X-COM 游戏数据文件（Steam 购买后自动检测）

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 模块化游戏视图架构 | Geoscape/Battlescape/Basescape 三层分离，便于独立迭代和测试 |
| YAML 规则集 Mod 系统 | 数据驱动设计使非程序员可扩展游戏规则，类似 [[open-source-game/fheroes2]] 的 ICN/SHK 格式兼容层 |
| 确定性战斗模拟 | 回合制网格战场天然适合 AI 决策树/MCTS，可参考 Battlescape/AIModule.cpp 60KB 的 AI 实现 |
| SDL 跨平台渲染 | SDL 2 是游戏引擎跨平台事实标准，参考 Engine/Surface 抽象 |
| 存档兼容策略 | SavedGame 完整状态序列化设计，参考 [[open-source-game/openmw]] 的 .ess 格式兼容 |

## 架构关系图

```text
┌─────────────────────────────────────────────────┐
│                     Menu/                        │  ← 主菜单、设置
├─────────────┬──────────────┬────────────────────┤
│  Geoscape/ │  Basescape/  │    Ufopaedia/      │  ← 战略层
│   (地球)    │   (基地)     │    (百科)          │
├─────────────┴──────────────┴────────────────────┤
│                  Battlescape/                    │  ← 战术层（回合制战斗）
│  TileEngine.cpp(100KB) / AIModule.cpp(60KB)      │
├─────────────────────────────────────────────────┤
│   Mod/          Savegame/      Engine/          │  ← 引擎层
│  (86 files)    (70 files)     (69 files)       │
│  YAML规则集     序列化          SDL渲染         │
└─────────────────────────────────────────────────┘
```
