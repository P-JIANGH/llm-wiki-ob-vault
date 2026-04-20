---
title: Taisei Project
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, danmaku, bullet-hell, stg, touhou, opengl, c]
sources: [raw/articles/open-source-games-list-2026.md]
---

# Taisei Project

> 东方 Project 同人 STG（弹幕射击游戏），C11 + SDL3 + OpenGL，自研渲染引擎，多平台支持（Win/Linux/macOS/Web/Nintendo Switch）

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/taisei-project/taisei |
| 语言 | C (3.2M LOC) + Python (123K, Meson 构建) + GLSL (82K, Shader) |
| 构建系统 | Meson (setup → compile → install) |
| 渲染/引擎 | SDL3 + OpenGL（自定义渲染管线） |
| 许可 | Custom "Other"（非 GPL，与东方 Project 类似，需注意） |
| Stars | 1,515 |
| Forks | 120 |
| 创建时间 | 2010-10-11 |

## 核心技术点

### 自研 SDL3 + OpenGL 渲染管线
- 不使用游戏引擎，C11 纯手写渲染管线
- `video.c` (~30K LOC) + `video_postprocess.c` 后处理管线
- `shader/` 子系统管理 GLSL shader（~82K GLSL 代码）
- 自定义纹理 atlas 系统 (`atlas/` 目录)

### Danmaku/弹幕系统
- `laser/` — 激光/弹幕核心子系统
- `particle/` — 粒子效果系统（弹幕视觉核心）
- `boss.c` (~46K LOC) — Boss 行为和弹幕编排
- 大量 `*.glsl` shader 文件用于弹幕视觉效果
- 弹幕系统是整个项目最核心的技术挑战，与 [[open-source-game/openra]] 等 RTS 的 ECS 架构相比，是完全不同的自研渲染+物理混合设计

### Entity-Component 架构
- `entity/` — 实体系统
- `object/` — 游戏对象系统
- `taskmanager.c/.h` — 任务/协程管理器
- `coroutine/` — 协程子系统（可能是子弹时间/暂停机制基础）

### 多平台支持
- `src/backend/` — 平台后端抽象
- `src/arch_switch.c` — Nintendo Switch 平台支持
- `emscripten/` — WebAssembly/Emscripten Web 平台
- `switch/` — Nintendo Switch 平台相关文件
- `xdg/` — XDG 目录规范（Linux 数据存储路径）

### 数据驱动 + Mod 支持
- `mod/` — Mod 系统
- `scm/` — 脚本子系统（可能是 Lisp/Scheme 方言）
- `dialog/` — 对话/过场动画系统
- `cutscenes/` — 过场动画

### 其他重要子系统
- `audio/` — 音频子系统（OpenAL）
- `mp/` — 背景音乐播放（mp 可能是 music player）
- `stage/` + `stages/` — 关卡管理与数据
- `player/` — 玩家角色控制
- `enemy/` — 敌机 AI
- `game/` — 主游戏循环逻辑
- `vfs/` — 虚拟文件系统（ZIP 打包资源：`zipfile.c`）
- `rng/` — 确定性随机数（多人/回放关键）

### 仓库规模大的原因
- `resources/` 目录含大量二进制资产（图片、音频、关卡数据）
- `atlas/` 含纹理集
- `subprojects/` 含 vendored 依赖（mbedtls, zlib, opus 等）

## 玩法特点

- **垂直滚动弹幕射击**：玩家控制角色躲避密集弹幕
- **自机系统**（Fighter）：多种射击模式 + Bomb 机制
- **Boss Rush**：多个关卡，每关一个 Boss，独特弹幕 Pattern
- **剧情对话**：东方 Project 风格对话树
- **Replay 系统**：内置回放录制/播放
- **Scoring**：高分排行系统
- **Mod 支持**：社区自制关卡/角色

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **弹幕 Pattern 生成** | 82K GLSL 代码 + 46K boss.c 是弹幕视觉编排的技术核心；AI 可用于程序化生成弹幕 Pattern |
| **确定性网络同步** | rng/ + replay/ 系统暗示了帧级确定性；[[open-source-game/openttd]] 也用确定性锁步网络，可对比学习 |
| **轻量渲染管线** | 自研 SDL3+OpenGL 而不用游戏引擎，证明了 2D STG 场景下手写渲染的可行性 |
| **多平台抽象层** | backend/ 子系统跨 Win/Linux/macOS/Switch/Web 的设计模式值得借鉴 |
| **数据驱动游戏逻辑** | scm/ 脚本系统 + mod/ 提供内容扩展性；类似 [[open-source-game/opennox]] 的兼容层思路 |
