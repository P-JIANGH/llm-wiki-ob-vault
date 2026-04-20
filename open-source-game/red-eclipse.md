---
title: Red Eclipse
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, fps, arena-shooter, tesseract-engine]
sources: [https://github.com/redeclipse/base]
---

# Red Eclipse

> 复古竞技场射击游戏，基于 Tesseract（Cube 2）引擎，融合跑酷元素，支持协作地图编辑。

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/redeclipse/base |
| 语言 | C++（~34K LOC game/ + ~39K shared/ + engine） |
| 构建系统 | CMake + Makefile |
| 渲染/引擎 | SDL2 + OpenGL，基于 Tesseract（Cube 2 派生） |
| 许可 | GPLv3 |
| 平台 | Windows, GNU/Linux |

## 核心技术点

### Tesseract 引擎派生架构
Red Eclipse 构建于 [Tesseract](http://tesseract.gg/) 引擎之上，该引擎又是 Cube 2/Sauerbraten 的现代派生。继承关系：
- **Cube 2 (Sauerbraten)** → **Tesseract** → **Red Eclipse**
- 引擎源码在 `src/engine/`，游戏逻辑在 `src/game/`，共享库在 `src/shared/`
- 体素场景渲染（稀疏八叉树）继承自 Cube 2 架构

### 数据驱动设计
- `config/` 目录下大量 `.cfg` 文件控制游戏行为（brush.cfg, comp.cfg, engine.cfg, fx.cfg 等）
- `data/` 目录存放游戏资源（actors/, maps/, crosshairs/, fonts/, decals/）
- GLSL shader 配置在 `config/glsl/` 和 `config/glsl.cfg`
- 高度模块化的配置系统，无需 recompile 即可调整游戏参数

### 协作地图编辑
- 内置实时 WYSIWYG 编辑器，支持离线/在线协作编辑
- `scripts/` 和 `install/` 包含编辑器相关脚本
- 地图资源在 `data/maps/` 和 `data/blendbrush/`

### 游戏模式与 AI
- 多种游戏模式：Capture（夺旗）、Defend、Duels、Bomber、Mayhem 等
- AI 系统在 `src/game/ai.cpp`，支持 BOT 操控玩家和 NPC 对战
- 记分板系统 `scoreboard.cpp`，实体系统 `entities.cpp`

### 网络
- ENet（`src/engine/enet/`）提供 UDP 网络通信
- 支持多人对战和合作编辑

## 玩法特点

- **跑酷射击融合**：wall running、boosts、dashing 等机动性动作，与硬核射击结合
- **无微交易**：纯开源，一次下载畅玩全部内容
- **丰富游戏模式**：Deathmatch、Capture The Flag、Team Arena 等
- **原子化 Mutator 系统**：通过 config 变量精细调整游戏规则
- **Steam 分发**：但源码始终在 GitHub，GPLv3

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 引擎复用 | Tesseract 引擎是 Cube 2 的成熟派生，可作为轻量 FPS 引擎起点 |
| 数据驱动 | cfg 文件驱动游戏逻辑的设计模式，可用于 AI 游戏的行为配置化 |
| 协作编辑 | 内置协作编辑器是多玩家创作游戏的重要参考 |
| 跑酷射击 | 机动性系统（wall-run/boost/dash）的实现方式值得研究 |
| 网络同步 | ENet + 服务端校验模式适合快节奏多人游戏 |

## 相关页面

- `open-source-game/sauerbraten` — Cube 2 Engine 起源
- `open-source-game/assaultcube` — CUBE Engine FPS
- [[open-source-game/xonotic]] — 同类竞技场射击对比
