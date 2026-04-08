---
title: FTEQW
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, engine, fps, quakec, idtech, modding]
sources: [https://github.com/fte-team/fteqw]
---

# FTEQW

> 先进可移植的 Quake 引擎，支持多款 idTech 游戏及自有游戏格式

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/fte-team/fteqw |
| 语言 | C（少量 C++） |
| 构建系统 | CMake + 传统 Makefile |
| 渲染后端 | OpenGL、Software、D3D、Vulkan |
| 许可 | GPL-2.0 |
| Stars | 293 |
| Forks | 85 |
| Commits | 6,698 |

## 核心技术点

### 多后端渲染架构
- **gl/** — OpenGL 渲染器（现代 GPU 加速）
- **sw/** — Software 软件渲染器（无 GPU 兼容）
- **d3d/** — Direct3D 渲染器（Windows 原生）
- **vk/** — Vulkan 渲染器（最新 GPU API）
- **droid/** — Android 渲染后端

### 插件系统（15+ 插件）
- **bullet** — Bullet/ODE 物理引擎集成
- **openxr** — OpenXR VR 标准支持
- **cef** — Chromium Embedded Framework（HTML HUD）
- **botlib** — BOT AI 寻路库
- **hl2** — Half-Life 2 格式支持
- **mpq** — MPQ 资源打包格式支持

### 自研 QuakeC 编译器 FTEQCC
- 深度集成于引擎内，可 in-game 执行
- 支持扩展语法和调试功能
- 拥有独立网站 fteqcc.org

### 平台支持
- Windows、Linux、OpenBSD、macOS、Android
- 源码托管于 GitHub，主站 fteqw.org

### 支持的游戏格式
- Quake / QuakeC mods
- Quake II（via q3asm2 工具链）
- Quake III Arena（QVM 虚拟机）
- Hexen II、FortressOne 等
- 完全自有的游戏格式（games/ 目录）

## 架构亮点

- **6,698 commits**，活跃开发中（2026-01-27 最新推送）
- **300+ 文件**的核心引擎（common/client/server 三层）
- ** Modular makeconfig.sh** — CMake 之外的传统构建路径
- **.forgejo/workflows** — CI/CD 自动化（Forgejo mirror 同步）
- **iQM** — 自有 Inter-Quake Model 格式支持
- **specs/** — 高级用户 QuakeC 和 idTech 文件格式文档

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 多后端渲染 | [[open-source-game/uzdoom-zdoom]] 类似架构，抽象渲染层支持多 API |
| 插件热插拔 | bullet/openxr/cef 插件化扩展，AI 游戏可借鉴模块化工具系统 |
| FTEQCC 嵌入式编译器 | 引擎内嵌脚本编译器，AI NPC 行为可内嵌 DSL |
| 平台抽象 | droid/ 实现 Android 移植，多平台 AI 游戏可参考分层架构 |
| 调试工具链 | 丰富 QuakeC 调试功能，AI 游戏可内嵌诊断/可视化系统 |
