---
title: EDuke32
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, fps, build-engine, ion-fury, duke-nukem-3d, shadow-warrior, blood]
sources: []
---

# EDuke32

> 先进 Build Engine 端口，支持 Duke Nukem 3D / Shadow Warrior / Blood / Ion Fury

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | `voidpoint.io/terminx/eduke32` (官方 GitLab，非 GitHub) |
| 语言 | C/C++ (~116K LOC duke3d/src) |
| 构建系统 | GNU Make + CMake |
| 渲染/引擎 | Build Engine (Ken Silverman) + OpenGL/Software |
| 许可 | GPLv2 |
| 平台 | Windows/Linux/macOS/Android |

## 核心技术点

### 多游戏支持架构
- **duke3d/** — Duke Nukem 3D 游戏逻辑
- **sw/** — Shadow Warrior 游戏逻辑
- **kenbuild/** — Ken Silverman 原始 Build 引擎代码
- **build/** — 现代 Build 引擎扩展

### Ion Fury 原生支持
- `FURY=1` 构建配置将 APPNAME 设为 Ion Fury
- 完整 Ion Fury 游戏逻辑内嵌（而非第三方mod）

### 嵌入式依赖库
- **mimalloc** — 高性能内存分配器
- **libxmp-lite** — MOD/XM tracker 音乐播放
- **PhysicsFS** — 虚拟文件系统
- **imgui** — 调试/编辑器 UI

### 共享 FTEQW 基础设施
- 与 `[[fteqw]]` 同仓库 (monorepo)
- **engine/** 目录为 FTEQW 引擎代码
- audiolib、glad、voidwrap 等共享库

## 玩法特点

- 经典 FPS 游戏运行容器
- 高度可定制的 Build 引擎渲染器
- 支持大量原版游戏内容 (Duke3D GRP, SW GRP, Blood)
- Ion Fury 作为首选开发目标

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 多游戏架构 | 子目录分离游戏逻辑，复用共享引擎基础设施 |
| 构建系统 | GNUmakefile 多配置(FURY/NAPALM/NAM)实现游戏变体 |
| 性能优化 | mimalloc 嵌入式使用，避免外部依赖 |
| imgui 集成 | 调试 UI 内嵌，支持游戏内开发者工具 |

## 备注

- 清单 URL `github.com/voidpoint-io/eduke32` 不存在，实际为 `voidpoint.io/terminx/eduke32` (GitLab)
- 此仓库为 FTEQW + EDuke32 monorepo，wiki note 仅覆盖 EDuke32 部分

