---
title: Zero-K
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, rts, spring-engine, lua]
sources: [https://github.com/ZeroK-RTS/Zero-K]
---

# Zero-K

> RTS game with physical projectiles, smart units, and a powerful UI, running on the Spring Engine.

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/ZeroK-RTS/Zero-K |
| 语言 | Lua（全部游戏逻辑）+ C++（Spring Engine 引擎） |
| 构建系统 | Spring Engine（独立游戏引擎，非源码仓库） |
| 渲染/引擎 | Spring Engine（C++ 引擎，Lua 脚本驱动） |
| 许可 | GPL v2 |
| 仓库性质 | **仅游戏内容模块**（不含引擎源码） |

## 核心技术点

### 纯 Lua 游戏逻辑架构（2383 Lua 文件）

这是 Zero-K 最重要的特点：**整个游戏逻辑完全用 Lua 编写，无 C++ 代码**。所有内容通过 Spring Engine 的 VFS（虚拟文件系统）加载：

```
LuaRules/        — 游戏逻辑（核心 Gadget 系统）
  ├─ gadgets.lua    核心 Gadget 管理器（2797 行）
  ├─ utilities.lua   共享工具函数
  ├─ engine_compat*.lua  引擎兼容性层
  └─ Gadgets/       ~100+ 独立 Gadget 模块（总计约 80K LOC）

LuaUI/           — 用户界面（44M，包含 Widget 系统）
LuaGaia/         — 环境/地形 Gadget（GAIA 阵营 AI）
```

### GadgetHandler 系统

Spring Engine 的 Gadget 系统是一种**事件驱动的模块化架构**：

- 每个 Gadget 是一个独立的 Lua 模块
- `gadgetHandler` 统一调度 call-in（GameFrame、UnitCreated、CommandNotify 等）
- Gadget 之间通过 `GG`（shared table）共享数据
- 核心 Gadget 包括：
  - `ai_CAI.lua`（4173 行）— Commander AI，最复杂的 Gadget
  - `unit_terraform.lua`（3858 行）— 地形改造系统
  - `cus_gl4.lua`（2330 行）— 自定义 PBR Shader 支持
  - `unit_tactical_ai.lua`（1616 行）— 战术 AI
  - `unit_spawner.lua`（1392 行）— 单位生成管理

### 物理弹道系统

Zero-K 的核心特色之一是**真实的物理弹道**：

- 每个单位有独立的物理模型
- 抛射物受重力、风阻影响
- 智能单位会预判移动目标（leading shots）
- `api_teleport_helper.lua` — 传送能力实现

### PBR 自定义着色器

`api_custom_unit_shaders.lua`（1045 行）允许每个单位使用自定义 PBR Shader，突破了传统 Spring 引擎的固定渲染管线。

### PlanetWars 单机战役

`gamedata/planetwars/` 目录包含完整的单机战役系统：
- `pw_unitdefgen.lua` — 动态单位定义生成
- `pw_structuredefs.lua` — 战役专属建筑定义

## 玩法特点

- **物理弹道**：不再是简单的直线子弹，而是有抛物线的真实弹道
- **智能单位**：单位会自动规避、寻找掩体、预判目标
- **强大 UI**：Widget 系统允许高度自定义 HUD（LuaUI 层）
- **200+ 单位**：完整科技树，多阵营
- **Spring 引擎多人**：基于 Spring 的帧同步网络同步

## 与 Beyond All Reason (BAR) 的关系

Zero-K 和 [[beyond-all-reason]] 都基于 Spring Engine：
- BAR 侧重 Lua三层架构（luarules/luaui/luaai）和 GL4 着色器
- Zero-K 侧重物理弹道系统、PBR 着色器、和 Gadget 模块化设计
- BAR 是大型社区 Mod 项目（4.3GB 含资源），Zero-K 是独立原创游戏

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| Lua 数据驱动 | Zero-K 证明 Lua 可以承载完整 RTS 游戏逻辑，2383 文件模块化组织，无 C++ 依赖 |
| Gadget 热重载 | Spring Gadget 系统支持运行时加载/卸载 Gadget，对公司模块化 AI 设计有参考价值 |
| 物理弹道 AI | 弹道预判算法（leading shots）可用于公司游戏的射击 AI |
| PBR Shader API | 自定义 Shader API 允许内容创作者扩展渲染效果，适合公司美术工具化方向 |
| Widget UI 系统 | LuaUI Widget 可热插拔，类似公司 UI 组件化思路 |
