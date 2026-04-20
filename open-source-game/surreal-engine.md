---
title: Surreal Engine
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game-engine, unreal-engine, reverse-engineering]
sources: [raw/articles/open-source-games-list-2026.md]
---

# Surreal Engine

> Unreal Engine 1 (UE1) 清洁室重实现，支持 Unreal / Unreal Tournament (UT99)

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/dpjudas/SurrealEngine |
| 语言 | C++20（~99K LOC，261 .h + 225 .cpp） |
| 构建系统 | CMake 3.15+ |
| 渲染 | D3D11 + Vulkan 双渲染器（**无 OpenGL**） |
| 许可 | BSD（或项目自有许可） |
| 平台 | Windows 10+、Linux |
| 状态 | 活跃开发，Nightly builds 发布 |

## 核心技术点

### 清洁室重实现架构
- 完全从头重写，不使用原始 Epic 源码
- SHA1 数据库识别游戏版本（`UE1GameDatabase`），通过检测 System 目录可执行文件 SHA1 匹配已知游戏版本
- 支持 10+ 款 UE1 游戏检测，但仅有 UT436 和 Unreal Gold v226 达到可玩状态

### 双渲染器架构
- **D3D11** (`RenderDevice/D3D11/`) — Direct3D 11 渲染器
- **Vulkan** (`RenderDevice/Vulkan/`) — 现代 Vulkan 实现
- 注意：与 UZDoom/ZDoom 不同，**没有 OpenGL 渲染器**（Status.md 明确标注 "There is no OpenGL renderer"）
- Vulkan 后端使用完整的 DescriptorSet/CommandBuffer/Framebuffer/Sampler 管理层

### 多窗口系统 (SurrealWidgets)
- `SurrealWidgets/` — 跨平台 UI 组件框架
- 支持 SDL2 后端和 Wayland 原生后端
- 三套应用入口：`SurrealEngine`（游戏）、`SurrealEditor`（编辑器）、`SurrealDebugger`（调试器）

### Unrealscript VM（部分实现）
- `VM/` — 字节码解释器 (`Bytecode.cpp`)、表达式求值 (`ExpressionEvaluator.cpp`)
- `NativeFunc.cpp` — 原生函数桩（尚未完整实现）
- **缺失功能**：数组支持、网络条件执行、大量 native 函数桩 → Bot AI 和脚本 Pawn 无法正常工作

### 模块化子系统
| 目录 | 职责 |
|------|------|
| `Audio/` | 音频系统 |
| `Collision/` | 碰撞检测 |
| `Commandlet/` | 命令行工具（CompilerCommandlet、ExportCommandlet 等） |
| `Compiler/` | Unrealscript 编译器相关 |
| `GC/` | 垃圾回收 |
| `Math/` | 数学库 |
| `Package/` | UE1 .u/.ukx/.umod 包文件加载 |
| `Render/` | BSP 渲染管线（BspClipper/Lightmap/RenderCanvas 等） |
| `UObject/` | UE1 对象系统（UActor/UClass/UClient 等） |
| `Video/` | 视频播放 |

### 第三方依赖
- **ZVulkan** — Vulkan 头文件/绑定封装（子模块）
- **openmpt** — MOD/IT/XM  tracker 音乐播放
- **openal-soft** — Windows 专用音频后端（Linux 无此依赖）
- **SurrealWidgets** — 自包含 UI 组件框架

### 构建流程
```bash
mkdir build && cd build
cmake -DCMAKE_BUILD_TYPE=Release ..
make -j 16
# 产出: SurrealEngine, SurrealEditor, SurrealDebugger
```

## 当前状态与已知限制

### 可玩游戏
- ✅ Unreal Tournament v436 — **相对可玩**
- ✅ Unreal Gold v226 — **相对可玩**
- ⚠️ 其他版本可能崩溃

### 重大缺失（Status.md 标注）
- **无 OpenGL 渲染器**
- **无网络支持**（完全缺失）
- Unrealscript VM 未完成（数组/网络条件执行）
- Mover 物理行为不准确
- 无动态光照
- Bot AI 不完整（只有受攻击反击和拾取物品）
- 反射/Portal 渲染有 bug
- 存档功能不完整
- **原生 mod 完全不支持**（by design）

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 清洁室逆向 | 不碰原始代码，通过检测游戏版本 + 文档化行为实现重实现，法律风险低 |
| 多游戏识别 | SHA1Database 模式识别多版本游戏 → 可借鉴用于其他重实现项目的版本检测 |
| Vulkan 现代渲染 | Vulkan 完整管线设计（DescriptorSet/CommandBuffer 分离）→ 可参考 Vulkan 渲染器架构 |
| 三应用入口 | Engine/Editor/Debugger 分离 → 游戏运行时/编辑器/调试器分离架构参考 |
| 无网络栈 | 当前完全无网络，可作为纯单人游戏重实现起点 |
