---
title: Raze
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, fps, build-engine, source-port, godot-zdoom]
sources: []
---

# Raze

> Build engine 多游戏合一引擎，GZDoom 技术栈，支持 Duke Nukem 3D / Blood / Redneck Rampage / Shadow Warrior / Exhumed

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/ZDoom/Raze |
| 语言 | C++17 (~578K LOC) |
| 构建系统 | CMake + vcpkg |
| 渲染/引擎 | GL / GLES / Vulkan 三后端渲染器（源自 GZDoom） |
| 平台 | Windows, Linux, macOS |
| 许可 | GPL v2 |
| commits | 21,452 |

## 核心技术点

### Triple Renderer 架构
Raze 的渲染层来自 GZDoom，实现了三套渲染后端，全部位于 `source/common/rendering/`：
- **GL** (`gl/`) — 传统 OpenGL 渲染路径
- **GLES** (`gles/`) — OpenGL ES，移动/嵌入式支持，含 glad-egl EGL 加载器
- **Vulkan** (`vulkan/`) — 完整 Vulkan 路径（system/renderer/textures/shaders/postprocess 分层）

三套渲染器共享统一的 `hwrenderer/` 抽象层（`hw_aabbtree.cpp` 加速结构、`hw_dynlightdata` 动态光源、`hw_skydome` 天穹、`hw_shadowmap` 阴影图）。

### 多游戏统一架构
Raze 的核心创新是把原本独立的多个 Build 引擎端口统一到单一代码库：

| 游戏 | 源码模块 | 来源 |
|------|---------|------|
| Duke Nukem 3D | `source/games/duke/` | JFDuke + EDuke32 + DukeGDX World Tour |
| Blood | `source/games/blood/` | NBlood (Nuke.YKT) |
| Redneck Rampage | `source/games/duke/` | Nuke.YKT's Rednukem |
| Shadow Warrior | `source/games/sw/` | SWP + VoidSW |
| Exhumed/Powerslave | `source/games/exhumed/` | PCExhumed + PowerslaveGDX |

每个 `games/<name>/` 下含 `all.cpp` 整合游戏特定逻辑。`source/core/` 包含共享 Actor 系统、游戏控制、网络同步（`d_net.cpp`）、存档序列化（`serializer_raze.cpp`）。

### GZDoom 继承
- **ZScript/ACS 脚本系统**：通过 `zcc_compile_raze.cpp` / `zcompile.cpp` 编译游戏脚本
- **Actor 类系统**：`source/core/actorinfo.cpp` + `thingdef_data.cpp` 数据驱动实体定义
- **控制台系统**：`source/common/console/`
- **菜单系统**：`source/common/menu/`
- **Model 渲染**：`source/common/models/modelrenderer.h`

### 平台抽象层
- **POSIX** (`platform/posix/`) — SDL2 窗口 + Cocoa (macOS)
- **Win32** (`platform/win32/`) — 原生窗口 + OpenGL/WGL

### 依赖管理
通过 vcpkg manifest (`vcpkg.json`)，关键依赖：
- `libvpx` — 视频解码（非 Windows 静态链接）
- `openal-soft` — 音频（Windows 静态链接）
- `gtk3` / `glib` — Linux 平台 UI
- `bzip2` — 数据压缩

### 构建产物
- `wadsrc/` — ZDoom 脚本源码包（PK3 打包）
- `soundfont/` — 音频音色库
- `package/common/` — 游戏资源包结构
- `zipdir` 工具 — 将 `wadsrc/` 目录实时打包为 PK3 文件供 IDE 显示

## 玩法特点

Raze 本身是引擎而非游戏，需要配合原版游戏资源文件（WAD）运行：
- **多游戏合一**：单一可执行文件支持所有支持的游戏的 WAD 文件自动识别
- **现代渲染**：高分辨率、宽屏、后期处理（HDR、Bloom、DynLights）
- **网络多人**：继承 GZDoom 网络协议（需要原始游戏 WAD）
- **内置启动器**：`source/launcher/` Qt/SDL 启动器界面，支持游戏选择和设置

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 多游戏引擎统一 | games/ 子目录隔离 + core/ 共享，可以做品类扩展引擎框架 |
| 三渲染器架构 | GL/GLES/Vulkan 分层设计满足跨平台性能需求（EDuke32 的多渲染器参考） |
| 脚本虚拟机 | ZScript/ACS 类系统是数据驱动扩展的典范，可作为 AI 行为脚本系统参考 |
| Actor/Entity 系统 | GZDoom 的数据驱动实体系统（DEF 文件 + Actor 类）是游戏对象管理优秀实践 |
| 源码级多游戏整合 | NBlood/JFDuke/PCExhumed 等上游项目作为 submodule 不是 fork，而是直接整合进单一构建 |
| 确定性重现 | 继承自 Build 引擎的帧锁定逻辑，可作为多人同步基础 |

## 相关页面

- [open-source-game-engines-comparison](#/comparisons/open-source-game-engines-comparison) — 开源游戏引擎对比
- [open-source-games-list](#/entities/open-source-games-list) — 开源游戏列表总览
- [raze-vs-eduke32](#/) — Raze vs EDuke32 技术对比（TODO）
