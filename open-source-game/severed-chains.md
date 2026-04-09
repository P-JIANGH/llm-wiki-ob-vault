---
title: Severed Chains
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, reverse-engineering, playstation, rpg]
sources: [raw/articles/open-source-games-list-2026.md]
---

# Severed Chains

> Legend of Dragoon 完全逆向工程重实现 — Java 复刻 PS1 经典 RPG

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/Legend-of-Dragoon-Modding/Severed-Chains |
| 语言 | Java 21（Gradle 构建，Java 25 源码兼容性） |
| 构建系统 | Gradle (build.gradle + Gradle Wrapper) |
| 渲染/引擎 | LWJGL 3 (OpenGL) + 自定义 PS1 GTE/GPU/SPU 仿真 |
| 许可 | 源码开源，游戏数据需用户提供原版 ISO |
| 开发者 | Legend of Dragoon Modding Team |
| 状态 | 游戏主体功能完整，可完整通关，仅少量非负面影响的 bug |

## 核心技术点

### 架构概述
- **非模拟器，而是逆向重写**：将 PS1 MIPS 汇编代码反汇编并用 Java 完全重写，不是emu
- 904 个 Java 源文件，分布在 `legend.core`（引擎）、`legend.game`（游戏逻辑）、`legend.lodmod`（模组API）三大包
- Java 21 required，强烈建议开启 assertions 运行
- 资产（音乐/模型/纹理）从用户提供的原版 LoD ISO 中运行时提取，不含任何原始代码或资产

### PS1 硬件仿真层

| 模块 | 路径 | 职责 |
|------|------|------|
| GTE | `legend.core.gte/` | Game Teacher Engine 仿射变换/旋转矩阵数学运算 |
| GPU | `legend.core.gpu/` | PS1 GPU 命令解析（TMD 模型/Polygon/Copy/Fill） |
| SPU | `legend.core.spu/` | Sound Processing Unit (ADPCM/XA 音频) |
| Memory | `legend.core.memory/` | PS1 内存映射仿真 |

### 游戏逻辑分段重实现
- `Scus94491BpeSegment*.java`（共 5 个文件，~1023 行）：PS1 可执行文件分段的 Java 映射
  - `Scus94491BpeSegment.java`（699 行）：主引擎核心
  - `Scus94491BpeSegment_8004.java`（180 行）：战斗系统
  - `Scus94491BpeSegment_8005.java`（18 行）
  - `Scus94491BpeSegment_8006.java`（9 行）
  - `Scus94491BpeSegment_800b.java`（117 行）
- `legend.game.combat/`：战斗系统完整重实现（Battle.java + bent/ + effects/ + ui/）
- `legend.game.characters/`：角色属性系统
- `legend.game.sound/`：音频系统

### 平台抽象层
- `legend.core.platform/`：SDL2 跨平台输入/窗口抽象
  - `SdlPlatformManager.java` — 窗口管理
  - `SdlInput.java` — 输入处理
  - 支持 1800+ 游戏手柄开箱即用（GameControllerDB）

### 模组 API（LodMod）
- `legend.lodmod/` 提供完整的事件驱动模组系统：
  - `LodMod.java` — 主模组入口
  - `LodBattleActions.java` — 战斗动作注册
  - `LodEncounters.java` — 遭遇战配置
  - `LodEquipment.java` / `LodItems.java` — 装备/物品系统
  - `LodShops.java` — 商店系统
  - `LodDeffs.java` — DEFF 资源包管理
- Event-based 注册：`RegisterEngineStateTypesEvent`、`BattleEntityTypeRegistryEvent`、`AdditionRegistryEvent` 等

### 核心引擎
- `legend.core.GameEngine.java` — 主游戏引擎循环
- `legend.core.RenderEngine.java` — 渲染批处理（RenderBatch/QueuedModel 系列）
- `legend.core.Updater.java` — 帧更新逻辑
- Discord RPC 集成（`discord/` 包）

## 玩法特点
- 完整《龙骑士传说》(Legend of Dragoon, 1999) PS1 经典 RPG 重制版
- 支持游戏手柄和键盘
- 内置 F11 暂停、F12 调试工具（含 VRAM 查看器）
- GPU 多显卡自动选择（Windows/Linux/Steam Deck）
- 预计支持 Mod 加载

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 逆向工程架构 | PS1 硬件仿真（GTE/GPU/SPU）的 Java 映射方法 |
| 模组 API 设计 | Event-based 注册系统（RegistryEvent）实现可扩展游戏逻辑 |
| 平台抽象 | SDL2 统一输入/窗口抽象层设计 |
| 资产提取 | ISO 运行时解析，不含原始数据的合法开源模式 |
| 确定性重放 | PS1 游戏帧级精度的可能路径 |

## 相关资料

- [[open-source-games-list]] — 开源游戏列表总览
- [[open-source-game-engines-comparison]] — 开源游戏引擎对比
- [[open-goal]] — Jak & Daxter 反向工程移植（同为 PS1 反向工程项目）
