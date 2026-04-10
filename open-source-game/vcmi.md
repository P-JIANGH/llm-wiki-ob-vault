---
title: VCMI
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, engine-reimplementation, turn-based-strategy, heroes-iii]
sources: []
---

# VCMI

> Heroes of Might and Magic III 完全开源引擎重实现

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/vcmi/vcmi |
| 语言 | C++20 (核心) + Qt6 (UI/编辑器) + Lua (脚本) |
| 构建系统 | CMake 3.16+ + Conan (Windows) / 系统包管理 (Linux/macOS) |
| 渲染 | SDL2 (游戏客户端) + Qt (编辑器/启动器) |
| 许可 | GPLv2 |
| 最新版本 | 1.7.3 |

## 核心技术点

### 客户端-服务器架构

VCMI 采用标准 C/S 分离架构：
- **serverapp** — 独立可执行文件，处理游戏状态和所有逻辑
- **clientapp** — 客户端入口，负责渲染和玩家输入收集
- **lib/** — 共享库（VCMI_lib），client 和 server 都链接此库

通信通过 `lib/networkPacks/` 定义的可序列化网络包完成，所有游戏状态变更必须经过 server。这是确定性游戏逻辑的基础。

### Bonus 系统（DAG 传播）

VCMI 最重要的核心系统之一。每个属性加成（攻击力、抗性、魔法免疫等）存储在一个 DAG 节点系统中，通过传播器（Propagators）自动向后代节点传播，通过限制器（Limiters）约束范围。

关键文件：
- `lib/bonuses/Bonus.h` — Bonus 数据结构
- `lib/bonuses/CBonusSystemNode.h` — DAG 节点
- `lib/bonuses/IBonusBearer.h` — 接收 Bonus 的接口

### 回调接口系统

lib 通过回调接口暴露游戏状态，而非直接访问：

- `CGameInfoCallback` — 只读游戏信息
- `CPlayerSpecificInfoCallback` — 玩家特定可见状态
- `CBattleCallback` — 战斗特定状态
- `CCallback` — 客户端向服务器的请求回调

AI 和玩家接口都通过这些回调工作，实现了游戏逻辑与 UI/AI 的解耦。

### 多 AI 系统

| AI 模块 | 用途 |
|---------|------|
| BattleAI | 战斗 AI（默认） |
| Nullkiller / Nullkiller2 | 现代冒险地图 AI（推荐） |
| MMAI | 机器学习实验性 AI |
| StupidAI | 中立/被动玩家最小 AI |
| EmptyAI | 测试用 stub |

冒险地图 AI 使用 TBB 任务并行化。

### 双脚本系统

- **ERM (Event-Related Magic)** — 遗留脚本语言，支持原有 HoMM3 战役
- **Lua** — 现代脚本支持

两者都在 `scripting/` 模块中运行。

### JSON Schema 配置系统

`config/schemas/` 目录包含 JSON Schema 用于：
- Mod 内容验证（生物/魔法/ artifact 等）
- 存档格式验证
- 数据驱动内容加载

### 跨平台支持

覆盖 8+ 平台：Windows (Win32)、Linux、macOS、iOS、Android、BSD 等。移动平台通过命名空间封装（`VCMI_LIB_NAMESPACE_BEGIN/END` 宏）解决符号冲突问题。

## 玩法特点

- 完整重现 HoMM3 所有内容：7 个种族、8 个战役、198 张地图
- 网络多人游戏（通过服务器中转）
- 内置地图编辑器（Qt-based mapeditor）
- Mod 支持（通过 JSON schema 验证）
- 存档与原版高度兼容

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| C/S 架构 | client 只负责渲染和输入，server 统一管理状态 — 适合需要强同步的多人 AI 游戏 |
| Bonus DAG | 属性系统通过 DAG 传播，支持复杂加成链 — 可用于 AI 角色的多维度属性计算 |
| 回调接口模式 | `CGameInfoCallback` 分离游戏状态读取与写入 — AI 模块完全不接触内部状态，只通过接口查询 |
| 多 AI 共存 | BattleAI/Nullkiller/MMAI 多套 AI 并行 — 不同难度/用途的 AI 可独立迭代 |
| JSON Schema 驱动 | 内容（mod/配置）完全数据驱动，通过 schema 验证 — 配置即游戏逻辑，无需重新编译 |
| TBB 并行 AI | Nullkiller 冒险 AI 使用 Intel TBB 任务并行 — 大型地图 AI 计算不阻塞渲染 |

## 目录结构

```
lib/          共享库：battle/bonuses/callback/gameState/mapObjects/network/spells/rmg/
client/       游戏客户端：adventureMap/battle/gui/widgets/windows/
server/       游戏服务器逻辑：battles/queries/processors/
serverapp/    服务器可执行文件入口
clientapp/    客户端可执行文件入口
launcher/     Qt 启动器
mapeditor/    Qt 地图编辑器
scripting/    脚本模块：erm/ lua/
AI/           AI 模块：BattleAI/ Nullkiller/ MMAI/ StupidAI/ EmptyAI
config/       配置和 JSON Schema
test/         单元测试
```

## 相关页面

- [[open-source-game/fheroes2]] — HoMM II 引擎重实现
- [[open-source-game/openra]] — Westwood RTS 引擎复刻（C&C/红警）
- [[open-source-game/openmw]] — Morrowind 引擎重实现
