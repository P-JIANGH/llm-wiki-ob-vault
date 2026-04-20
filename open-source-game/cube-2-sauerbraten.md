---
title: "Cube 2: Sauerbraten"
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, fps, voxel, engine]
sources: []
---

# Cube 2: Sauerbraten

> 跨平台多人 FPS，使用 Cube Engine（体素/立方体地图几何），支持实时游戏内地图编辑，ZLIB 许可开源

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/piernov/sauerbraten (SVN mirror, 5317 commits) |
| 官方/其他 | SourceForge: https://sourceforge.net/projects/sauerbraten |
| 语言 | C++ (约 65K LOC) |
| 构建系统 | Makefile (非 CMake) |
| 渲染/引擎 | OpenGL + SDL2 + ENet UDP 网络 |
| 许可 | ZLIB（极宽松，商业可用） |
| 平台 | Windows / Linux / macOS |

## 核心技术点

### Cube Engine 架构
- **体素几何系统**：游戏世界由立方体（cube）组成，地图是稀疏八叉树（Sparse Octree）结构，优于 BSP 树 for dynamic editing
- **`src/engine/`**：~48K LOC，核心渲染引擎 — 光照贴图（lightmap）、BIH 加速、纹理管理、模型加载（IQM）、水面特效
- **`src/fpsgame/`**：~13K LOC，FPS 游戏逻辑 — 武器系统、AI、实体管理、分数榜、路径点
- **`src/shared/`**：共享工具库 — ZIP 压缩存档、流式 I/O
- **`src/enet/`**：ENet UDP 网络库，可靠数据包封装

### 实时地图编辑
核心卖点：游戏内实时编辑地图几何，无需退出游戏或重启关卡。编辑器的设计哲学影响了 [[open-source-game/assault-cube|AssaultCube]] 等同类 FPS。

### 网络架构
- 客户端/服务器模式，ENet UDP 封装
- 支持 SP（单人）和 MP（多人）模式
- 房间大厅系统：玩家进入大厅选择地图和模式后开始游戏

### 构建配置
```
CXXFLAGS= -O3 -fomit-frame-pointer -ffast-math -Wall -fsigned-char -fno-exceptions -fno-rtti
依赖：SDL2, SDL2_image, SDL2_mixer, OpenGL, ENet, zlib, X11 (Linux)
```

## 玩法特点

- **多人竞技 FPS**：Deathmatch、Capture The Flag、Capture、Collect 等模式
- **内置地图编辑器**：实时编辑地图几何、纹理、实体，无需关卡重新加载
- **资源包系统**：`packages/` 目录管理游戏资源（地图、模型、纹理），支持 mod
- **轻量体素设计**：对比 Doom/Wolfenstein 的 BSP 树，Cube 体素系统更适合动态修改场景

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 实时编辑架构 | 游戏内编辑器可作为 AI 生成内容的预览/调试界面 ([[godot-4]] 编辑器模式参考) |
| 网络同步 | ENet可靠UDP模式适合低延迟多人游戏，参考其数据包压缩和状态同步 |
| 体素场景系统 | 稀疏八叉树体素表示可用于 AI 路径规划和场景理解 |
| ZLIB 许可 | 极宽松许可允许闭源商业使用，降低法律风险 ([[open-source-game-engines-comparison]]) |
| AssaultCube 关系 | 同一 CUBE Engine 衍生，Cube Engine 对比评估已有记录 ([[open-source-game/assault-cube]]) |
