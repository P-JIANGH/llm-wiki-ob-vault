---
title: Ambermoon.net
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, rpg, csharp]
sources: [https://github.com/Pyrdacor/Ambermoon.net]
---

# Ambermoon.net

> Ambermoon 经典 RPG 的完整 C# 重写，支持 Windows/Linux/Mac

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/Pyrdacor/Ambermoon.net |
| 语言 | C# (.NET 6) |
| 构建系统 | .NET SDK (dotnet build) |
| 渲染/引擎 | Ambermoon.Renderer.OpenGL (OpenGL) |
| 许可 | MIT |
| 最新版本 | 1.12.0 (2025-11-24) |
| 主仓库 | Ambermoon.net (主程序) |

## 核心技术点

### 模块化多项目架构

整个项目是一个大型 .NET Solution，按职责分为：

| 项目 | 职责 |
|------|------|
| `Ambermoon.Core` | 核心游戏逻辑（Game.cs、Battle.cs、Player.cs、Map 渲染接口） |
| `Ambermoon.Data.Common` | 数据层公共接口（Character、Item、CombatGraphicInfo 等数据模型） |
| `Ambermoon.Data.Legacy` | 原始游戏数据读取器 |
| `Ambermoon.Data.Pyrdacor` | Pyrdacor 格式数据扩展（Advanced 版本支持） |
| `Ambermoon.Data.FileSystems` | 虚拟文件系统抽象 |
| `Ambermoon.Data.GameDataRepository` | 数据仓库统一接口 |
| `Ambermoon.Renderer.OpenGL` | OpenGL 渲染器（2D/3D 地图渲染） |
| `Ambermoon.Frontend` | 前端交互层 |
| `Ambermoon.Audio.OpenAL` | OpenAL 音频后端 |
| `Ambermoon.Audio.Android` | Android 音频后端 |
| `Ambermoon.net` | 主程序入口（游戏窗口、主菜单、配置等） |
| `AmbermoonAndroid` | Android 移植（WIP） |
| `AmbermoonPatcher` | 存档/游戏数据补丁工具 |
| `AmbermoonAdditionalDataLoader` | 扩展数据加载器 |
| `GraphicCreator` / `Ambermoon.PrepareIcons` | 美术资源处理工具 |
| `AutoCloneGenerator` | 自动代码生成工具 |
| `RepoTests` | 仓库完整性测试 |

### 数据驱动设计

- `Ambermoon.Data.Legacy` vs `Ambermoon.Data.Pyrdacor` 双数据后端：Legacy 支持原版 Ambermoon 数据，Pyrdacor 支持高级扩展格式
- `Ambermoon.Data.FileSystems` 提供虚拟文件系统，支持从不同来源（原生文件系统、ADF 镜像等）加载游戏数据
- 游戏数据外部化：需要从 [Ambermoon 仓库](https://github.com/Pyrdacor/Ambermoon) 单独下载原版游戏文件（ADF 或 Extract 格式）

### 渲染架构

- `Ambermoon.Renderer.OpenGL`：纯 OpenGL 渲染器
- 渲染层接口（`IRenderView`、`IRenderText`、`ISprite` 等）定义在 `Ambermoon.Core/Render/` 中
- 2D 地图和 3D 地图共用同一渲染管线，通过 `ICamera3D` 抽象 3D 视角

### 多平台支持

- Windows（主要）、Linux、macOS 均有官方构建
- macOS 分 Intel 和 ARM（M1/M2）两种版本
- Android 移植进行中（`AmbermoonAndroid` 项目，`dotnet workload install android`）
- 构建脚本：`build-win64.cmd`、`build-linux.sh`、`build-macos.sh`、`build-arm64.sh`

## 玩法特点

- 1992 年德国经典 RPG Ambermoon 的完整重制版
- 支持原版 1.20 和 Ambermoon Advanced 1.33 两个版本
- 回合制战斗系统、角色创建/升级、物品系统
- 自动地图（Automap）、迷雾战争（Fog of War）、商人/炼金/对话等 NPC 交互
- 自定义音乐支持（可替换游戏音乐）

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 模块化多项目架构 | Core/Data/Renderer/Frontend 分层隔离，数据层抽象支持多种数据格式（Legacy/Pyrdacor），可复用于游戏引擎多版本兼容 |
| 虚拟文件系统 | `Ambermoon.Data.FileSystems` 抽象文件加载，支持 ADF 镜像和原生文件，对应游戏资产打包/加载层设计 |
| 多平台构建 | .NET 6 跨平台 + 分平台音频后端（OpenAL/Android），多平台构建脚本，对游戏引擎跨平台适配有参考价值 |
| 数据驱动游戏内容 | 双数据后端设计（Legacy 原版数据 + Pyrdacor 扩展格式），外部资产依赖而非内置，便于扩展内容和模组化 |
| 工具链生态 | GraphicCreator、AmbermoonPatcher、AutoCloneGenerator 等周边工具，展示了重制版游戏完整的工具链生态 |
