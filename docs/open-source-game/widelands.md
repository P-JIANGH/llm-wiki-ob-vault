---
title: Widelands
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, rts, city-building, cpp]
sources: []
---

# Widelands

> 灵感来自《Settlers II™》的开源实时策略游戏，含单人战役、多人模式和内置地图编辑器

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/widelands/widelands |
| 语言 | C++ (222K LOC .cc + 79K LOC .h ≈ 301K LOC) |
| 构建系统 | CMake 3.15+ / compile.sh 便捷脚本 |
| 渲染/引擎 | SDL2 + OpenGL (GLEW / glbinding) |
| 音频 | SDL2_mixer |
| 脚本 | Lua（场景/战役/AI） |
| 许可 | GPL v2+；部分资产 CC |
| 平台 | Linux / Windows (MSVC/MSys2) / macOS |

## 核心技术点

### 目录架构

```
src/
  ai/              — ComputerPlayer AI + defaultai
  base/            — 基础工具（随机数/日志/异常）
  chat/            — 聊天系统
  commands/        — 命令队列（cmd_queue.h，驱动回放/同步）
  economy/         — 经济系统（50+ 文件）：舰队/Flag/Ware/Route/供应队列
  editor/          — 地图编辑器逻辑
  game_io/         — 存档序列化
  graphic/         — 渲染：blit/atlas/animation/shaders/texture
  io/              — 文件系统/打包（minizip）
  logic/           — 核心：Map/Field/Player/Game/Pathfinding(A*)
  map_io/          — 地图文件格式
  network/         — 游戏网络：GameHost/GameClient/NetClient/RelayProtocol
  notifications/   — 事件通知系统
  scripting/       — Lua VM 绑定（logic/sound/ui/table）
  sound/           — 音频播放
  third_party/     — 嵌入式第三方库
  ui/              — UI 系统：basic/editor/fsmenu/game/shared/wui
  wlapplication.cc — 主应用入口（初始化/主循环）
data/
  tribes/          — 种族定义（buildings/immovables/workers/wares/ships）
  scripting/       — Lua 脚本：地图/AI/胜利条件/训练辅助
  campaigns/       — 战役数据包
  maps/            — 内置地图
  world/           — 世界/地形定义
```

### 经济系统（Economy 子系统）

Widelands 的经济是游戏核心，有完整产业链：

```
Flag（旗帜）→ Road（道路）→ Warehouse → 生产建筑 → 消耗建筑
                     ↓
              ExpeditionBootstrap（远航拓殖）
```

关键类：`economy/flag.h`、`economy/fleet.h`（渡轮舰队）、`economy/route.h`（运输路线）、`economy/input_queue.h`（原料队列）、`economy/idleworkersupply.h`（空闲工人供应）

### 网络同步（帧同步多人）

`network/gamehost.cc`（2706行）和`network/gameclient.cc`（1386行）实现核心网络：
- `GameHost`：游戏主机逻辑，维护所有玩家状态
- `GameClient`：客户端连接
- `RelayProtocol`：中继服务器协议（支持公网多人）
- `BufferedConnection`：可靠 UDP 封装
- 命令队列（`commands/cmd_queue.h`）驱动确定性回放

### A* 寻路

`logic/mapastar.h`：网格 A* 寻路，支持三角形区域（`MapTriangleRegion`）和菱形区域（`Mapfringeregion`）

### AI 系统

`ai/computer_player.h`（ComputerPlayer）：玩家 AI 控制器
- `ai/defaultai.h`：默认 AI 实现
- `ai/ai_dna_handler.h`：AI DNA（行为参数包）
- 种族特定 AI：`ai/defaultai_seafaring.cc`（航海 AI）

### 存档/回放系统

- `logic/replay.cc`：回放录制（基于命令队列）
- `logic/replay_game_controller.cc`：回放控制器
- `logic/generic_save_handler.h`：通用存档处理器
- 完整的游戏状态序列化（`game_io/`）

### 数据驱动设计

所有游戏内容（建筑/工人/船只/地图）完全数据驱动：
- `data/tribes/buildings/`：建筑定义（Lua + 数据文件）
- `data/tribes/workers/`：工人类型定义
- `data/tribes/scripting/`：种族初始化脚本
- `data/maps/`：内置地图

## 玩法特点

- **建筑驱动经济链**：从原料采集→加工→产品→消耗的完整产业链
- **多种族**：每个种族有独特建筑/工人/船只
- **海运 Expedition**：支持远距离殖民（expedition_bootstrap）
- **内置地图编辑器**：完整编辑器内置于游戏
- **单人战役 + 遭遇战 + 多人**
- **Training Wheels**：新手辅助模式（`training_wheels.cc`）

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| RTS 经济系统 | 完整产业链模型（Flag-Route-Warehouse）非常适合作为 AI 经济决策的参考架构 |
| AI 决策系统 | ComputerPlayer+DNA 设计可复用于 AI 玩家行为参数化 |
| 帧同步网络 | CommandQueue 驱动确定性回放是多人 RTS 网络同步的标准范式 |
| 数据驱动 | Lua 配置 + C++ 引擎分离，资产团队可独立迭代内容 |
| 存档兼容性 | 完整的序列化系统（game_io/）可参考用于游戏存档设计 |
