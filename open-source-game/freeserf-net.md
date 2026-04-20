---
title: Freeserf.net
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, rts, city-building, csharp]
sources: [https://github.com/Pyrdacor/freeserf.net]
---

# Freeserf.net

> The Settlers I 清洁室 C# 重实现，跨平台复刻

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/Pyrdacor/freeserf.net |
| 语言 | C# (~200 文件, ~35K LOC) |
| 构建系统 | .NET (Visual Studio Solution, .csproj) |
| 渲染/引擎 | Silk.NET (OpenGL/Vulkan 跨平台) |
| 许可 | MIT |
| 最新版本 | v2.2.3 (2026-01-28) |
| 平台 | Windows / Linux |

## 核心技术点

### C++ → C# 移植架构
- 全部代码从 C++ freeserf 移植或重实现，Phase 1 (Porting) 100% 完成
- Phase 2 (Optimizing) 100% 完成：bug 修复 + C# 特定优化 + 跨平台
- Phase 3 (Extending) 15% 进行中：新增功能、mod 支持、工具
- 当前主攻方向：**多人网络支持**

### 模块化 .NET Standard 2.1 DLL 架构
| 模块 | 职责 |
|------|------|
| `Freeserf.Core` | 游戏核心逻辑 (~35K LOC)，AI/建筑/地图/经济系统 |
| `Freeserf.Renderer` | Silk.NET 渲染管线 (Shader/Texture/RenderLayer) |
| `Freeserf.Audio` | BASS 音频引擎 (MIDI/MOD/WAV) |
| `Freeserf.Network` | 多人网络 (Client/Server) |
| `FreeserfNet` | 主程序入口 + FreeserfGame 游戏视图 |

### 渲染架构 (Freeserf.Renderer)
- `ShaderProgram` → `Shader.cs` (Color/Masked/MaskedTriangle/TextureShader)
- `RenderLayer.cs` → 分层渲染 (Map/Building/Flag/Serf/Road)
- `TextureAtlas.cs` + `MutableTexture.cs` 纹理管理
- `VertexArrayObject.cs` + `BufferObject.cs` OpenGL VAO/VBO 封装

### AI 系统 (Freeserf.Core)
- `AI.cs` 主体 + `AIStates/` 目录多种 AI 状态机
- 数据驱动配置 (`user.cfg` / `Game.cs` ConfigFile)
- 经济链：Serf (工人) 在 Flag (旗帜) 间行走运输 Resource

### 网络架构 (Freeserf.Network)
- `Client.cs` + `Server.cs` 完整网络层
- `ConnectionObserver.cs` 连接状态观察
- `Multiplayer.md` 多人模式文档
- 正在进行多人开发

## 玩法特点

- **经典复刻**：完整还原 The Settlers I (DOS/Amiga) 玩法
- **数据文件兼容**：支持 DOS (SPAx.PA) 和 Amiga (ADF/disk files) 两种游戏数据
- **混合数据**：可混用 DOS 图形 + Amiga 音乐
- **跨平台**：Windows + Linux
- **可配置**：详细 user.cfg 配置 (graphic/sound/video/logging)
- **内置 AI**：添加了原作没有的 AI 逻辑

## 与原版 freeserf (C++) 的关系

- Freeserf.net 是 freeserf 的 C# 移植分支（而非 fork）
- C++ 源码在移植过程中完全重写为 C#
- Freeserf.Core 作为 .NET Standard 2.1 DLL，可被任何 .NET 项目引用

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 引擎移植 | C++ → C# 移植策略（保持 API 兼容同时用 .NET 特性重写）|
| 多平台渲染 | Silk.NET 跨 OpenGL/Vulkan 抽象方案 |
| 模块化架构 | Core/Renderer/Audio/Network 四模块分离，各自独立 .NET Standard |
| 多人网络 | Client/Server 分离架构 + 连接状态观察者模式 |
| AI 状态机 | SerfState/AIStates 目录化管理复杂 AI 行为 |
| 数据驱动 | ConfigFile 类统一管理 user.cfg 配置 |
| 阶段性开发 | 三阶段 Roadmap：Porting→Optimizing→Extending |
