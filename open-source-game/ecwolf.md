---
title: ECWolf
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, fps, source-port, wolfenstein, raycasting, sdl]
sources: []
---

# ECWolf

> 基于 Wolf4SDL 的 Wolfenstein 3D 引擎增强端口，融合 ZDoom 用体验与原版 Raycasting 渲染

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | `https://bitbucket.org/ecwolf/ecwolf` |
| 语言 | C++ (~67K LOC) |
| 构建系统 | CMake 3.6+ |
| 渲染技术 | 8-bit 软件 Raycasting（默认）+ 可选替代渲染器 |
| 依赖 | SDL2, SDL_mixer, SDL_net, zlib, jpeg-6b, lzma, bzip2, gdtoa, textscreen |
| 许可 | GPL（社区驱动） |
| 平台 | Windows, macOS, Linux, Android |

## 核心技术点

### Raycasting 渲染架构
- **默认 8-bit 调色板软件渲染**，遵循 vanilla Wolfenstein 3D 的 Raycasting 算法
- 支持高分辨率宽屏模式（16:9），带宽高比校正
- 可选替代渲染器作为 opt-in 功能
- PHILOSOPHY.md 明确规定：8-bit 渲染永远是默认选项

### 多游戏支持
ECWolf 支持所有基于 Wolfenstein 3D 引擎的 DOS/Mac 游戏：
- Wolfenstein 3D（含 Spear of Destiny）
- Blake Stone（规划中 ECWolf 3.0）
- Corridor 7
- Operation Body Count
- Rise of the Triad (ROTT)
- Super 3D Noah's Ark
- Macintosh Wolfenstein 3D（规划中 ECWolf 2.0）

单一二进制文件运行所有支持的游戏（类似 ZDoom 的多游戏 IWAD 策略）。

### ZDoom 兼容性
- 使用与 ZDoom 相似的脚本格式和数据格式
- 现有的 Doom 编辑工具可以用于 ECWolf（关卡除外）
- 目的是复用 GZDoom 已有的大量文档、教程和编辑工具

### Mod 创作
- **无需修改源码即可制作 Mod**
- 支持任意高分辨率纹理、flat 和 sprite
- **无限制的同时移动推墙数量**（vanilla 有限制）
- 无限制的 things 数量
- 不受限制的地图尺寸（GAMEMAPS 格式技术上限制在 181x181）
- Mod 支持跨平台（Windows/macOS/Linux）

### 确定性设计哲学
- 不追求与 vanilla 的 demo 兼容，但追求相同的高层行为
- 与 Chocolate Doom 的 Bug-Compatible 不同：允许为开发便利而改变底层实现
- 参考 Fabien Sanglard 的《Wolfenstein 3D Game Engine Black Book》作为高层架构指南

## 玩法特点

- **经典 FPS 体验**：原版 Wolfenstein 3D 游戏感
- **现代化操控**：WASD + 鼠标控制
- **自动地图（Automap）**：支持 Mac Wolf / S3DNA / ROTT 风格
- **无限存档槽**
- **高分辨率宽屏支持**

## 与 Wolf4SDL 的区别

| 维度 | Wolf4SDL | ECWolf |
|------|----------|--------|
| 多游戏支持 | 仅 Wolfenstein 3D | 全部 Wolfenstein 派生游戏 |
| Mod 格式 | 传统 WAD | 类似 ZDoom 的扩展格式 |
| 推墙限制 | 有限制 | 无限制 |
| 分辨率 | 固定 | 高分辨率+宽屏支持 |
| 跨平台 | 基础 | 完整（Windows/macOS/Linux/Android）|

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 多游戏引擎 | 单一二进制如何优雅支持多个游戏变体（IWAD 策略） |
| Mod 生态 | 数据驱动 Mod 系统，无需修改源码，降低用户门槛 |
| 复古渲染 | 软件 Raycasting 在现代硬件上的优化思路 |
| 宽高比处理 | 如何在保持复古感的同时支持现代显示器 |
| 兼容性策略 | Bug-Compatible vs 行为兼容的权衡取舍 |

## 源码结构

```
src/
├── wl_main.cpp     (~1346行) — 主循环、游戏初始化
├── wl_agent.cpp    (~1355行) — 玩家/AI 代理逻辑
├── wl_state.cpp    (~1191行) — 游戏状态管理
├── wl_play.cpp     (~1139行) — 核心游戏逻辑
├── wl_draw.cpp     (~1321行) — 渲染绘制
├── wl_menu.cpp     (~1272行) — 菜单系统
├── am_map.cpp      (~640行)  — 自动地图
├── v_draw.cpp      (~1598行) — 可视化绘制
├── v_font.cpp      (~3024行) — 字体渲染（最大文件）
├── g_mapinfo.cpp   (~1591行) — 地图信息解析
├── farchive.cpp    (~1618行) — 存档序列化
├── filesys.cpp     (~540行)  — 文件系统抽象
├── actor.cpp/h     — 实体/actor 系统
└── dobject.cpp/h   — 数据驱动对象系统
```

## 相关页面

- [[open-source-game/wolfenstein-3d]] — 原始 id Software Wolfenstein 3D 源码
- [[open-source-game/chocolate-doom]] — Doom Bug-Compatible 端口参考
- [[open-source-game/uzdoom]] — ZDoom 延续（ECWolf 兼容其 API 设计）
