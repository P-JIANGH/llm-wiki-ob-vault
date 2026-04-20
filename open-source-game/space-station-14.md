---
title: Space Station 14
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, ss13, ss14, multiplayer]
sources: [https://github.com/space-wizards/space-station-14]
---

# Space Station 14

> 太空站密室乱斗多人游戏，Space Station 13 的现代 C# 重制版，基于自研 Robust Toolbox 引擎

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/space-wizards/space-station-14 |
| Stars | 3,577 |
| Forks | 5,201 |
| 语言 | C# |
| 引擎 | Robust Toolbox（自研 C# 引擎） |
| 许可 | MIT（代码）+ CC-BY-SA 3.0（大部分资产）|
| 创建时间 | 2017-05-22 |
| 最新推送 | 2026-04-09 |
| 规模 | ~893 MB 仓库，7591 个 C# 文件，2573 个 YAML 文件，32100+ 纹理资源 |

## 核心技术点

### 引擎架构：Robust Toolbox

Robust Toolbox 是 SS14 自研的 C# 多人游戏引擎，与 SS13 的 BYOND（DM 脚本）完全不同路线：

| 模块 | 文件数 | 说明 |
|------|--------|------|
| Robust.Client | 749 | 客户端渲染、输入、UI（Avalonia/XAML）|
| Robust.Server | 173 | 服务器端游戏逻辑、网络广播 |
| Robust.Shared | 300 | 共享代码（实体系统、序列化、网络消息）|
| Robust.Shared.Maths | 37 | SIMD 数学库（vek crate Rust SIMD 风格）|
| Lidgren.Network | submodule | UDP 网络层（可靠 UDP）|
| OpenToolkit.GraphicsLibraryFramework | submodule | OpenGL 跨平台封装 |
| NetSerializer | submodule | 自研高性能网络序列化器 |
| Robust.Analyzers | 30 | Roslyn 代码分析器（编译期检查）|
| Robust.Serialization.Generator | 10 | 代码生成器（序列化+原型系统）|

关键设计：**内容与引擎分离** — Robust Toolbox 作为 submodule，内容仓库（Content.*）加载引擎而非 fork 引擎，防止 fork 分散。

### 游戏内容架构（Content.*）

```
Content.Client/        (2377 files) — 客户端
  Entry/EntryPoint.cs       客户端入口
  UserInterface/            UI 系统（XAML/Avalonia）
  Administration/           管理员功能
  Atmos/                    大气系统客户端
  Power/                    电力系统客户端
  Shuttles/                 穿梭机 UI
  Chemistry/                化学 UI
  ...

Content.Server/        (1861 files) — 服务器端
  Entry/EntryPoint.cs       服务器入口
  NPC/                      NPC AI 系统（183 文件，最大子系统）
  Atmos/                    大气仿真（气体混合/扩散/温度）
  Administration/           管理员命令系统
  GameTicking/              游戏 tick 循环
  Power/                    电力网络仿真
  Construction/             建筑系统
  Shuttles/                 穿梭机航行系统
  StationEvents/            随机事件系统
  Objectives/               叛变/任务目标系统
  Xenoarchaeology/          考古系统
  Chat/                     聊天系统
  ...

Content.IntegrationTests/  集成测试
Content.Benchmarks/        性能基准测试
Content.MapRenderer/       地图渲染工具
Content.Replay/            回放录制系统
Content.Server.Database/   PostgreSQL 存档
Content.Packaging/         Steam/Android 打包
Content.PatreonParser/     Patreon 解析
```

### 数据驱动原型系统（YAML）

游戏内容高度 YAML 数据驱动，无需编译 C# 即可修改游戏内容：

| 目录 | 数量 | 说明 |
|------|------|------|
| Resources/Prototypes/ | 2369 | 实体/道具原型定义 |
| Resources/Locale/ | 1580 | 多语言本地化字符串 |
| Resources/Maps/ | 226 | 地图文件 |
| Resources/Audio/ | 1456 | 音效/音乐 |
| Resources/Textures/ | 32100+ | 精灵图/纹理 |

**实体原型系统**（~985 个 YAML 文件）：
- `Resources/Prototypes/Entities/` — 游戏内所有实体（玩家角色、NPC、物品、建筑）
- 每个实体以 YAML 定义组件组合（类似 Unity Prefab / Godot Scene Composition）
- 组件系统：PhysicsComponent、AppearanceComponent、艾尔斯级联灯丝…

**原型示例**：
```
Resources/Prototypes/Entities/Clothing/Back/backpacks.yml
Resources/Prototypes/Access/cargo.yml         # 权限系统
Resources/Prototypes/Accents/                # 语音口音替换
```

### 网络同步架构

基于 **Lidgren.Network**（可靠 UDP）+ **NetSerializer**（自定义二进制序列化）：

- **Client-Server 架构**：所有逻辑在服务器端运行，客户端仅负责渲染和输入
- **确定性锁步**：服务器广播游戏状态，客户端预测性渲染
- **Entity-Component 系统**：实体通过网络同步，组件在客户端/服务器独立运行
- **GameState 消息**：每 tick 广播完整实体状态快照 + 增量差异

### 构建系统

```bash
# 1. 克隆仓库
git clone https://github.com/space-wizards/space-station-14.git
# 2. 初始化 submodules + 下载 Robust Toolbox
python RUN_THIS.py
# 3. 编译
dotnet build
```

- `.run/` — Rider/CLion 运行配置
- `MSBuild/` — 自定义 MSBuild 任务（原型代码生成）
- `Robust.Analyzers/` — 编译期静态分析（检测缺失 Serialization 特性等）

## 玩法特点

### SS13 核心体验延续

- **部门分工**：船长/工程师/安保/科学家/服务员/叛徒等多职业
- **空间站破坏**：大气泄漏、停电、火灾、爆炸
- **角色扮演**：玩家行为驱动剧情，无固定目标
- ** emergent gameplay**：无脚本的突发状况（气体泄漏→火灾→疏散）

### SS14 vs SS13 技术差异

| 维度 | SS13 (BYOND) | SS14 (Robust Toolbox) |
|------|-------------|----------------------|
| 引擎 | BYOND（闭源专有）| 自研 C# 开源引擎 |
| 脚本 | DM 字节码解释执行 | C# 原生编译 |
| 网络 | BYOND 内部同步 | Lidgren UDP + NetSerializer |
| 渲染 | BYOND 2D 位图 | OpenGL 3D 渲染 |
| 内容定义 | DM 代码 | YAML 原型系统 |
| 性能 | 受限解释执行 | 原生性能 |

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **多人同步架构** | Lidgren UDP + 确定性快照广播模式，适用于中规模多人游戏（50 人） |
| **Entity-Component 系统** | 组件化设计使新内容无需修改核心代码，AI 角色可同样架构 |
| **YAML 数据驱动** | 原型系统使非程序员也能创建实体/道具，降低内容创作门槛 |
| **网络状态序列化** | NetSerializer 二进制序列化，自研格式跳过 JSON 开销，适合实时游戏 |
| **内容/引擎分离** | 防止 fork 分散，同一引擎支持多款游戏（SS14 + 其他 Robust Toolbox 游戏）|
| **自研工具链** | Robust.Analyzers + MSBuild + 代码生成器，专业工程化实践 |
| **测试基础设施** | IntegrationTests + Benchmarks + Replay 系统，保证版本稳定性 |

## 相关页面

- [[open-source-game/openmw]] — Morrowind 引擎重实现（C++ + 组件系统对比）
- [[open-source-game/veloren]] — Rust ECS 多人体素 RPG（不同技术栈对比）
- [[godot-4]] — Godot 4 引擎（GDScript vs C# 自研引擎对比）
- [[multi-agent-ai-simulation]] — 多智能体 AI 模拟
