---
title: OpenNefia
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, roguelike, rpg]
sources: [https://github.com/OpenNefia/OpenNefia]
---

# OpenNefia

> Elona 日本 roguelike RPG 的模块化开源引擎复刻

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/OpenNefia/OpenNefia |
| 语言 | C# (.NET 8.0) |
| 构建系统 | MSBuild / .NET SDK |
| 渲染/引擎 | Love2dCS (Love2D C# binding) + 自研渲染层 |
| 许可 | MIT |
| 规模 | 2058 C# 文件 + 436 Lua 文件 |

## 核心技术点

### 架构设计
- **模块化引擎**：OpenNefia.Core (核心) + OpenNefia.Content (游戏内容) + OpenNefia.EntryPoint (入口) 分离架构
- **IoC 依赖注入**：OpenNefia.Core.IoC 命名空间实现服务定位器模式，ContentIoC.cs 统一注册游戏内容系统
- **原型系统 (Prototypes)**：YAML 数据驱动原型定义 (Prototypes/ 目录)，类型化实体注册机制
- **Harmony 运行时补丁**：Lib.Harmony 2.2.0 实现游戏运行时补丁 (类似无源码 Modding)

### 脚本与 Mod
- **NLua (1.6.0)**：Lua 5.3 脚本集成，游戏逻辑热重载支持
- **NuGet Protocol**：内置 Mod 加载器使用 NuGet.Protocol 6.8.0 实现包管理与依赖解析
- **ContentPack 系统**：模块化内容包架构，支持独立发行游戏 Mod
- **YAML 配置**：YamlDotNet 11.2.1 处理游戏数据 (原型/配置/存档)

### 核心子系统
- **Game/GameController**：游戏主循环与状态管理
- **Maps**：程序化地牢生成，Elona 风格随机地下城
- **GameObjects/Components**：实体组件系统 (ECS) 雏形
- **UI/UserInterface**：Love2D 渲染层之上的 UI 框架
- **Serialization**：游戏存档系统，Newtonsoft.Json 13.0.3
- **Audio**：Melanchall.DryWetMidi 6.0.0 处理 MIDI 音乐

### 开发工具
- **CSharpRepl**：内置 C# REPL 支持运行时调试与脚本执行
- **OpenNefia.Analyzers**：自定义 Roslyn 分析器，代码质量检查
- **XAML 注入器**：OpenNefia.XamlInjectors / XamlNameGenerator，MVVM UI 开发
- **Benchmarks**：OpenNefia.Benchmarks 性能基准测试

## 玩法特点

- **Elona 复刻**：继承 Elona 经典 roguelike 元素（随机地牢、角色养成、物品制作）
- **高自由度**：Elona 以内购拍卖、农场经营、宠物系统等沙盒玩法闻名
- **现代引擎**：相比原版 HSP 解释器，.NET 8.0 提供更好性能与跨平台支持

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **.NET 游戏架构** | Core/Content/EntryPoint 三层分离，IoC 服务注册，清晰的模块边界 |
| **运行时 Mod 系统** | Harmony 补丁 + NuGet 包管理 = 可扩展游戏框架设计 |
| **脚本热重载** | NLua 集成 Lua 脚本，游戏逻辑解耦，支持玩家创作 |
| **原型数据驱动** | YAML 原型系统 + 类型化实体注册，数据驱动的游戏内容定义 |
| **Love2D 渲染封装** | 底层 2D 引擎封装，自研 UI 层，性能与生产力平衡 |

## 相关页面

- [[dungeon-crawl-stone-soup]] — 经典 Roguelike 参考
- [[cataclysm-dark-days-ahead]] — C++ Roguelike 参考
- [[nethack]] — 经典 Roguelike 参考
- [[brogue-ce]] — 极简主义 Roguelike 参考
