---
title: "Ultima VII: Revisited"
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, rpg, ultimarpg, engine, clean-room, 3d]
sources: []
---

# Ultima VII: Revisited

> Ultima VII: The Black Gate 的 3D 重制引擎，完全重写，兼容原版数据文件

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/ViridianGames/U7Revisited |
| 语言 | C/C++ (raylib + 自研 Ghost/Ghost 引擎) |
| 构建系统 | CMake + Meson (跨平台) |
| 渲染引擎 | Ghost — raylib-based 自研 3D 渲染器 |
| 游戏逻辑引擎 | Geist — 状态机 + Lua 脚本系统 |
| 代码规模 | ~49.5K LOC (Source 目录，53 cpp + 56 h) |
| 许可 | 原创引擎，CC/商业（需持有原版 Ultima VII 数据） |
| 开发者 | Anthony Salter (@furroy) |
| 当前版本 | 0.1.x (Static World 阶段) |

## 核心技术点

### Ghost 3D 渲染引擎
Ghost 是基于 raylib 的自研 3D 渲染引擎，完全从头编写：
- `GhostState.cpp` 单文件 5296 行 — Ghost 主状态管理
- `GhostWindow.cpp` — 窗口管理与渲染上下文
- `SpritePickerState.cpp` — 精灵选择器调试状态
- 支持光照、3D 模型渲染、粒子系统
- raylib 作为底层图形库（subprojects/raylib.wrap）

### Geist 游戏逻辑引擎
Geist 是 Geist 的核心游戏逻辑引擎：
- `Engine.cpp/h` — 主引擎子系统，初始化/更新/销毁所有子系统
- `StateMachine.cpp/h` — 状态机驱动游戏流程
- `GuiManager.cpp/h` — GUI 元素管理
- `ScriptingSystem.cpp/h` — Lua 脚本系统集成
- `ResourceManager.cpp/h` — 资源管理
- `ParticleSystem.cpp/h` — 粒子系统
- `SoundSystem.cpp/h` — 音频系统

### 双引擎架构
项目采用 **Ghost（渲染）+ Geist（逻辑）** 的双引擎分离架构：
- Ghost 负责 3D 渲染、窗口管理、用户输入
- Geist 负责游戏逻辑、状态机、Lua 脚本执行
- 两引擎通过 `Object.h` 共享基类进行通信

### Lua 脚本系统
- 原始 Usecode 脚本已全部转换为 Lua（便于维护和扩展）
- `ScriptingSystem.cpp/h` — Lua VM 管理与脚本加载
- `U7LuaFuncs.cpp/h` — U7 专用 Lua API 绑定
- `U7ScriptUtils.cpp/h` — 脚本工具函数
- `SCRIPTING_GUIDE.md` — 详细脚本编写指南，内置 Shape Editor 工具调试

### 路径导航系统
- `PathfindingSystem.cpp/h` — A* 寻路算法实现
- `terrain_walkable.csv` — 地形可步行代价表
- `PATHFINDING.md` — NPC 路径导航详细说明
- Sandbox 模式下 F10 可视化路径代价调试

### 数据驱动设计
- 原始 Ultima VII 数据文件 (`Data/U7/`) 完全保留读取
- `ShapeData.cpp/h` — 形状/帧数据解析
- `GameSerializer.cpp/h` — 存档序列化
- `U7Object.cpp/h` — 游戏对象系统
- `U7Globals.cpp/h` — U7 全局变量管理

### Gump UI 系统
继承自原版 Ultima VII 的 Gump（窗口/对话框）系统：
- `GumpManager.cpp/h` — Gump 容器管理
- `U7Gump.cpp/h` — 基础 Gump 类
- `U7GumpBook.cpp/h` — 书籍 Gump
- `U7GumpPaperdoll.cpp/h` — 纸娃娃显示
- `U7GumpSpellbook.cpp/h` — 魔法书
- `U7GumpStats.cpp/h` — 角色状态窗口
- `NpcListWindow.cpp/h` — NPC 列表窗口

## 玩法特点

- **Sandbox 调试模式**：内置 Shape Editor（F1）、Lua 调试（F8）、路径代价可视化（F10）
- **动态 3D 视角**：WASD 移动 + Q/E 旋转 + 鼠标滚轮缩放
- **NPC 寻路 AI**：A* 寻路，NPC 自动开门、遵循日程表
- **双击交互**：双击 NPC 对话/查看物品，双击容器打开
- **时间控制**：小键盘 +/- 加速/减速时间，Enter 推进一小时
- **内置地图编辑器**：Shape Editor 可实时编辑对象脚本和位置

## 发展阶段（Roadmap）

| 版本 | 阶段 | 状态 |
|------|------|------|
| 0.1.0 | Static World — 3D 地图查看器 | ✅ 初步完成 |
| 0.2.0 | Interactive World — 全部对象可交互 | 🚧 进行中 |
| 0.3.0 | Living World — 脚本运行，NPC 日程 | 📋 规划中 |
| 0.4.0 | The Avatar Arrives — 玩家控制，战斗 | 📋 规划中 |
| 0.5.0 | Special Cases Galore — 特殊脚本处理 | 📋 规划中 |
| 0.6.0 | The Guardian Defeated — 可通关 | 📋 规划中 |
| 0.7.0 | Serpent Isle 支持 | 📋 规划中 |
| 0.8.0 | 多平台支持 | 📋 规划中 |

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **清洁室重实现** | 完整保留原版数据文件格式，引擎完全重写，法律风险低 |
| **双引擎分离架构** | Ghost（渲染）/Geist（逻辑）分离，模块边界清晰，便于独立开发测试 |
| **Lua 脚本替代原生 VM** | 将原生脚本系统转换为 Lua，大幅提升可维护性和社区贡献门槛 |
| **状态机驱动游戏流程** | StateMachine 基类 + 派生 State（Loading/Title/Main/Conversation 等），游戏流程清晰 |
| **数据驱动对象系统** | 一切皆对象（Object.h 基类），ShapeData 驱动，支持运行时编辑 |
| **内置调试工具** | Shape Editor（F1）、F7 移动静态对象、F8 Lua 调试、F9 包围盒、F10 路径代价 |
| **路径导航可视化** | CSV 配置地形代价 + F10 可视化，AI 寻路调试友好 |

## 相关页面

- [[open-source-game/exult]] — 另一个 Ultima VII 重实现（2D，复刻优先）
- [[open-source-game/openmw]] — Morrowind 引擎重实现，相似路线
- [[open-source-game/gemrb]] — Infinity Engine 重实现，RPG 引擎重实现先例
