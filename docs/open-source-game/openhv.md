---
title: OpenHV
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, rts, openra, mod, miniyaml]
sources: [https://github.com/OpenHV/OpenHV]
---

# OpenHV

> 基于 OpenRA 引擎的开放内容科幻RTS游戏，改编自 Daniel Cook 的 Hard Vacuum 设计

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/OpenHV/OpenHV |
| 类型 | OpenRA Mod（开放内容 RTS） |
| 语言 | C#（.NET SDK）|
| 构建系统 | Make / make.ps1 / make.cmd |
| 引擎 | OpenRA 引擎（子模块或自动下载）|
| 许可 | 源码 GPLv3，内容 CC BY 3.0/4.0/CC0 混用 |
| 平台 | Windows / Linux / macOS |

## 核心技术点

### OpenRA 引擎架构
OpenHV 不是独立引擎，而是 **OpenRA 引擎的 Mod**。引擎作为 git submodule 或通过 `fetch-engine.sh` 自动下载（`ENGINE_VERSION=ef5541cce492084f375f7c87ed5657f580f3dd7b`）。

OpenRA.Mods.HV.dll 是游戏本体 MOD，引用 OpenRA.Game + OpenRA.Mods.Common 作为依赖。

### MiniYAML 数据驱动
游戏规则完全由 MiniYAML 文本文件定义，位于 `mods/hv/rules/`。这是 OpenRA 的核心创新——用 YAML 而非代码定义游戏逻辑，提供 IDE VS Code 插件支持（ora-ide-vscode + vscode-openra-lua）。

### C# Traits 系统
`OpenRA.Mods.HV/Traits/` 目录包含大量自定义 Trait 类（继承 OpenRA 的 `TraitInfo`/`ActorInitializer` 模式）：

- **资源系统**：`Miner.cs`、`ResourceCollector.cs`、`ResourceTransporter.cs`、`ResourceYieldMultiplier.cs`、`Scrap.cs`、`ScrapValue.cs` — 完整资源采集链
- **传送网络**：`TeleportNetwork.cs`、`TeleportNetworkTransportable.cs`、`TeleportNetworkPrimaryExit.cs` — 单位传送系统
- **空中单位**：`CarrierChild.cs`、`CarrierParent.cs`、`BaseSpawnerChild.cs`、`BaseSpawnerParent.cs`、`MissileSpawnerChild.cs`、`MissileSpawnerParent.cs` — 舰载机/导弹发射架
- **地图改造**：`LaysTerrain.cs`、`Floods.cs`、`CustomTerraformer.cs` — 地形改造能力
- ** Bot AI**：`BotModules/` — `BotRepairOrSellCaptures.cs` 等模块化 Bot 行为
- **黑客系统**：`Hacker.cs`、`Hackable.cs` — 入侵电子单位

### Lua 任务脚本
`mods/hv/scripts/` 中的 Lua 脚本驱动任务逻辑。OpenRA 提供 Lua API 用于任务设计。

### IRC/Matrix 集成
`InternetRelayChat.cs` — 游戏内聊天支持 FreeGameDev 的 IRC/Matrix 网络，用于多人匹配。

### 渲染系统
基于 OpenRA 的内置渲染（2D sprite 渲染），自定义渲染 Trait 在 `OpenRA.Mods.HV/Render/` 中。

## 玩法特点

- **Hard Vacuum 设计**：单位采集散落的 Scrap 资源，建造基地和生产单位
- **三派系**：游戏中存在多个派系（具体派系见 `mods/hv/rules/` YAML 文件）
- **传送网络**：单位可以通过传送门网络进行快速移动
- **地形改造**：单位可以永久性改造地图地形（洪水、造地）
- **多人支持**：LAN + 互联网对战，内置 IRC/Matrix 机器人发现
- **回放系统**：OpenRA 原生支持录像回放
- **观战模式**：允许旁观者加入

## OpenRA Mod 生态参考

OpenHV 是 **开放内容**（而非开源）的典型——代码 GPLv3 开源，但美术/音效资源使用各种 CC 许可证。这意味着：
- 引擎代码可自由修改
- 内容需要单独获取（原始 Hard Vacuum 商业版权）

对公司的参考价值在于：**Mod 开发模式**可以作为内容创作的过渡阶段，先用开源引擎做玩法验证，再考虑自研或换引擎。

## 目录结构

```
OpenHV/
├── OpenRA.Mods.HV/          # C# MOD 源码
│   ├── Traits/              # 游戏特性（Actor 行为）
│   │   ├── BotModules/      # Bot AI 模块
│   │   ├── Conditions/      # 状态条件系统
│   │   ├── Render/          # 自定义渲染
│   │   ├── SupportPowers/   # 支持技能
│   │   └── ...
│   ├── Effects/             # 特效
│   ├── Projectiles/         # 抛射物
│   ├── Scripting/           # Lua 脚本绑定
│   └── OpenRA.Mods.HV.csproj
├── mods/hv/                 # MOD 内容包
│   ├── rules/               # MiniYAML 规则文件
│   ├── scripts/             # Lua 任务脚本
│   ├── sprites/             # 精灵图
│   └── audio/               # 音效
├── mods/common/             # OpenRA 通用 MOD
├── OpenHV.sln              # Visual Studio / dotnet 解决方案
├── Makefile                # Linux/macOS 构建
├── make.cmd                # Windows 构建
├── make.ps1                # PowerShell 构建
├── fetch-engine.sh         # 引擎自动下载脚本
└── mod.config              # MOD 配置（引擎版本等）
```
