---
title: DDNet (DDraceNetwork)
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, platformer, cooperative, teeworlds-mod, racing, multiplayer]
sources: [https://github.com/ddnet/ddnet]
---

# DDNet (DDraceNetwork)

> Teeworlds 模组 DDRace 的社区延续版 — 合作 2D 在线平台跳跃游戏。

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/ddnet/ddnet |
| 语言 | C++ (核心) + Rust (ddnet-libs/engine 接口) |
| 构建系统 | CMake + Ninja |
| 渲染/引擎 | SDL2 + 自定义 OpenGL/GLSL Shader |
| 许可 | ISC（客户端）+ 混合许可（服务端地图数据） |
| 版本 | 19.9 |
| 目标平台 | Windows / Linux / macOS / Android / Web (Emscripten) |

## 核心技术点

### C++ / Rust 混合架构

项目采用独特的 C++/Rust 分层架构：

- **`ddnet-libs/`**：外部 C 库（curl, freetype, glew, opus, sdl2, sqlite 等）封装 + **Rust engine 接口**
- **`src/engine/`**：纯 C++ 游戏无关代码（图形渲染、网络协议底层、地图格式底层）+ Rust FFI 绑定
- **`src/game/`**：游戏逻辑层（碰撞检测、角色物理、地图物品）
- **`ddnet-libs/rust-bridge/`**：Rust 实现的 engine 接口层（`lib.rs`, `console.rs`）

### 三层模块架构

```
ddnet-libs/      ← C库 + Rust engine接口
     ├── rust-bridge/src/engine/   (Rust: console等接口)
     ├── base/        (共享基础)
     ├── game/        (游戏逻辑)
     └── engine/      (渲染/网络/存储接口，Rust FFI)
src/
     ├── engine/       (C++: SDL2窗口/OpenGL图形/网络/SQLite存储)
     └── game/         (C++: 碰撞/物理/地图/Race逻辑)
```

### 网络同步与协议

- **多人合作而非竞争**：玩家共享重生点、互相帮助完成困难关卡
- **服务器类型**：支持 Race（计时竞速）、Solo（独立通关）等多种游戏模式
- **持久化**：SQLite 数据库记录排行榜、玩家成绩
- **UPnP / WebSocket**：可选穿透支持（构建选项 `-DUPNP=ON` / `-DWEBSOCKETS=ON`）

### 地图数据系统

- **`.map` 格式**：Teeworlds 派生格式，支持 Teleport、Speedup、Switch 等 DDRace 专用 Tile
- **`datasrc/`**：Python 数据编译管线（`compile.py`），将数据源编译为游戏内二进制格式
- **碰撞系统**：`CCollision` 类处理 Tile 碰撞检测，支持 8 方向移动限制

### 自动更新与构建

- **Autoupdater**：Windows/Linux 默认启用，Steam 版本自动下载更新（`-DAUTOUPDATE=ON/OFF`）
- **CMake 模块化**：`cmake/` 目录包含各平台检测、库查找、交叉编译脚本
- **Android 移植**：`ddnet-libs/android/` 支持 Android 平台编译

### 内容创作支持

- **内置编辑器**：完整的游戏内地图编辑器（`src/game/editor/`）
- **地图包**：`data/` 目录包含默认 DDRace 地图集

## 玩法特点

- **合作 DDRace**：多名玩家同时在地图中，互相放梯子（Freeze/teeh婉模式）帮助队友通关
- **Race 计时**：个人或团队计时竞速，支持 ghost 重播
- **大量社区自制地图**：官方存档库 ddnet.org/downloads 提供数千张地图
- **角色物理**：8 方向移动、空中冲刺（Jetpack）、传送门（Teleport）、开关门（Switch）等丰富机制

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| Rust/C++ FFI 架构 | 在性能关键 C++ 项目中用 Rust 封装 engine 接口，安全且高效 |
| 合作游戏网络同步 | 多玩家合作场景下的重生点共享/状态同步机制 |
| 数据驱动地图编译 | Python 数据处理管线 → 二进制格式的完整工具链 |
| 持久化排行榜 | SQLite + 网络请求的分数记录系统设计 |
| CMake 现代实践 | `-DPREFER_BUNDLED_LIBS=ON/OFF` 灵活切换系统/捆绑库 |
| 跨平台支持 | Windows/Linux/macOS/Android/Web 五平台统一代码库 |
| 自动化构建 | GitHub Actions CI + Autoupdater 分发机制 |

## 相关页面

- [open-source-games-list](#/entities/open-source-games-list) — 开源游戏列表总览
- [open-source-game/vvvvvv](#/open-source-game/vvvvvv) — 另一个复古像素平台游戏
