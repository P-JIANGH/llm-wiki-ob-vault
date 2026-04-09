---
title: Daggerfall Unity
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, rpg, unity, elder-scrolls, recreation]
sources: [https://github.com/Interkarma/daggerfall-unity]
---

# Daggerfall Unity

> Unity 引擎重制的《上古卷轴 II：匕首雨》开源复刻，保留原版魅力并修复 Bug、增强画质和画质

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/Interkarma/daggerfall-unity |
| 语言 | C# (Unity) |
| 许可 | MIT License |
| 依赖 | 需要原版 DOS Daggerfall 游戏资产（Steam 免费领取） |
| 平台 | Windows / Linux / MacOS |

## 核心技术点

### Unity 引擎架构
- Unity 2021+ C# 项目，标准 Unity 组件架构
- `DaggerfallUnity` 主类管理全局子系统（WorldTime、MaterialReader、MeshReader、SoundReader）
- `GameManager` 单例聚合所有游戏系统

### 资产读取系统
- **MaterialReader**（1071 行）：读取 Daggerfall 材质数据，支持现代 Shader 增强
- **MeshReader**（875 行）：读取 3D 模型数据（BSP/RMB 格式）
- **DaggerfallConnect**（External 目录）：原生 Arena2 游戏数据文件读写库（C# 绑定）

### 音频合成系统
- `AudioSynthesis/` 子系统完整自研：
  - Midi/Event/Sequencer：MIDI 事件序列
  - Bank/Patches/Sfz/Sf2：音色库支持（SoundFont 2）
  - Wave/Riff：WAVE 文件处理
- 完全不需要原版音频文件，自研合成

### 实体与战斗系统
- `Game/Entities/`：DaggerfallEntity / EnemyEntity / CivilianEntity 类层次
- `EnemyMotor.cs`（1482 行）：敌人运动 AI
- `EnemySenses.cs`（965 行）：敌人感知（视野、听觉）
- `WeaponManager.cs`（961 行）：武器攻击判定
- `FPSWeapon.cs`（760 行）：第一人称武器渲染

### 任务系统（QuestMachine）
- `Game/Questing/QuestMachine.cs`：基于 QRC 任务脚本解析
- QuestMachine 使用 FullSerializer 序列化任务状态
- 支持任务变量持久化到 Quests-GlobalVars 表
- 任务动作系统（Actions/）：spawnenemy、playsound、addnpc 等

### 序列化与存档
- `SaveLoadManager.cs`：完整存档系统，JSON 格式（FullSerializer）
- 分离存档：SaveInfo / SaveData / FactionData / ContainerData / QuestData / DiscoveryData
- 支持快速保存/自动保存

### NPC 对话系统
- `TalkManager.cs`（3736 行）：最大子系统，NPC 对话/ rumor 系统
- `TalkManagerMCP.cs`：MCP 协议支持（AI NPC 对话）

### UI 系统
- 自研 UI 组件系统（非 uGUI）：`BaseScreenComponent` 基类
- `DaggerfallUI.cs`：Daggerfall 风格 UI 管理
- `UserInterfaceWindows/`：各种窗口（Inventory/Character/Dialog/etc）

### 大世界系统
- `ExteriorAutomap.cs`（1848 行）：室外自动地图
- `Automap.cs`（2733 行）：地下城/城市自动地图
- `PlayerEnterExit.cs`（1529 行）：场景进出判定
- `WeatherManager.cs`：天气系统

### Mod 支持
- `Assets/Game/Addons/ModSupport/ModManager.cs`：模组加载管理
- `Mod.cs`：模组生命周期管理
- `ModSettings/`：模组设置 UI
- `StreamingAssets/Mods/`：模组资产目录
- 支持资产注入替换（AssetInjection）

### 路径与世界
- `Arena2Path`：指向原版 Daggerfall 资产目录
- `WorldTime`：游戏内时间系统
- `DaggerfallBankManager`：银行系统

## 玩法特点

- 完整复刻 Daggerfall 所有内容：自由探索、大型城市、复杂任务系统、派系、行会
- 现代引擎增强：宽屏、高分辨率、改良控制、画质增强
- 复古模式：可选 320x200 / 640x400 VGA 调色板
- 活跃 Mod 社区：图形重制、任务包、新地区、新公会
- 需要原版 DOS Daggerfall 资产（Steam 免费）

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 引擎重制模式 | 用现代引擎重建经典游戏，保留游戏性的同时提升可玩性 [[open-source-game/openmw]] |
| NPC AI 对话 | TalkManager+MCP 架构可作为 NPC 对话 AI 的参考设计 [[open-source-game/openmw]] |
| Mod 系统 | ModManager 架构支持运行时资产替换，可用于 AI 生成内容的注入 [[open-source-game/openmw]] |
| 任务脚本系统 | QuestMachine 的任务解析执行架构适合 AI 生成任务流程 [[open-source-game/dungeon-crawl-stone-soup]] |
| 存档序列化 | FullSerializer JSON 存档适合 AI 状态读取 [[open-source-game/cataclysm-dark-days-ahead]] |
