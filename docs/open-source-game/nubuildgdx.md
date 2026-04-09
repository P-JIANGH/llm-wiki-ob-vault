---
title: NuBuildGDX
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, fps, build-engine, java, libgdx]
sources: []
---

# NuBuildGDX

> BuildGDX 的稳定化分支，聚焦修复与兼容性，而非新功能

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/atsb/NuBuildGDX |
| 语言 | Java（~375 个 .java 文件，与 BuildGDX 相同代码量） |
| 构建系统 | Eclipse 项目文件（.project/.classpath），无 Maven/Gradle |
| 渲染引擎 | LWJGL3（OpenGL）+ 软件渲染 + Android |
| 许可 | GPLv3（核心）+ Apache 2.0；Ken Silverman BUILD LICENSE |
| 维护者 | atsb (fork from Alexander Makarov-[M210]) |
| 定位 | BuildGDX 的稳定化分支（stability-first fork） |

## 核心技术点

### 与 BuildGDX 的差异

NuBuildGDX 是 [open-source-game/buildgdx](#/open-source-game/buildgdx) 的稳定化分支，核心架构相同，差异在于：

1. **稳定优先策略**：不追求新功能，专注于 bug 修复和代码稳定性
2. **上游同步**：从 BuildGDX 定期同步代码，但经过稳定性审查
3. **更旧但更稳定的依赖**：使用 libGDX 1.9.10（而非最新版本），避免依赖变更带来的问题
4. **开发者视角**：atsb 作为社区开发者，更关注修复现有问题而非引入新功能

### 架构继承

NuBuildGDX 完全继承 BuildGDX 的架构：

```
core/              # 核心游戏逻辑（与平台无关）
├── src/ru/m210projects/Build/
│   ├── Engine.java          # Build Engine 核心（C 移植到 Java）
│   ├── Architecture/         # BuildGdx.java, BuildFrame.java, BuildInput.java
│   ├── Pattern/             # BuildGame.java, BuildFont.java, MenuItems/
│   ├── Audio/               # Sound.java, Music.java
│   ├── Render/              # 三套渲染器（Polymost/Software/GL）
│   ├── FileHandle/          # 资源加载（GRP/RFF/WAD）
│   └── Net/                 # UDP 多人
lwjgl3/            # LWJGL3 + GLFW 桌面后端
android/           # Android 后端
```

### 渲染器架构

三重渲染后端（与 BuildGDX 完全一致）：

- **Polymost**（OpenGL）：现代显卡渲染，GLSL Shader，HD 纹理
- **软件渲染**：Java 纯软件渲染，低配置环境
- **GdxRender**：LibGDX 封装渲染

### 支持的游戏

与 BuildGDX 相同，支持所有 Build Engine 游戏：

| 游戏 | 数据格式 | 状态 |
|------|---------|------|
| Duke Nukem 3D | GRP | 完整支持 |
| Shadow Warrior | RFF / GRP | 完整支持 |
| Blood | 需原版数据 | 支持 |
| Redneck Rampage | 需原版数据 | 支持 |
| Exhumed/Powerslave | 需原版数据 | 支持 |
| Ion Fury | 需原版数据 | 支持 |

## 玩法特点

NuBuildGDX 本身是引擎而非游戏，需要配合原版游戏数据文件运行。核心体验取决于所加载的游戏（通常是 Duke Nukem 3D 或 Shadow Warrior）。

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **Fork 策略** | 对于已有项目，稳定化分支（stability-first fork）是平衡社区贡献与质量控制的有效模式——[open-source-game/eduke32](#/open-source-game/eduke32) 也有类似的社区分支模式 |
| **依赖管理** | 宁可使用旧版稳定依赖（libGDX 1.9.10）也不追新——对于需要长期维护的游戏项目，依赖稳定性 > 功能最新 |
| **Java 游戏工程** | ~375 个 Java 文件证明了大型 Java 游戏项目的可行性，与 [open-source-game/buildgdx](#/open-source-game/buildgdx) 相同的架构思路 |
| **游戏引擎模块化** | Engine.java 核心 + Pattern/ + Render/ 的分层设计——游戏引擎核心与平台渲染/输入抽象分离的经典模式 |

## 相关页面

- [open-source-game/buildgdx](#/open-source-game/buildgdx) — NuBuildGDX 的上游项目，Java/LibGDX Build Engine 移植
- [open-source-game/eduke32](#/open-source-game/eduke32) — 同为 Build Engine 端口，C++/SDL2 实现，功能更丰富
- [open-source-game/nblood](#/open-source-game/nblood) — Blood 游戏端口，基于 EDuke32
- [open-source-game/raze](#/open-source-game/raze) — GZDoom 技术的 Build 多游戏合一引擎
- [open-source-game/jfduke3d](#/open-source-game/jfduke3d) — Jonathon Fowler 的 Duke Nukem 3D 端口
- [open-source-game-engines-comparison](#/comparisons/open-source-game-engines-comparison) — 开源游戏引擎对比
