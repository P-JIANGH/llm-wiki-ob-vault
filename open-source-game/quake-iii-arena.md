---
title: Quake III Arena
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, fps, id-software, arena-shooter]
sources: [raw/articles/id-software-quake-iii-arena-gpl.md]
---

# Quake III Arena

> id Software 竞技场射击游戏，QVM 虚拟机架构驱动游戏逻辑，BOT AI 系统，纯网络多人

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/id-Software/Quake-III-Arena |
| 语言 | C（核心）、部分汇编 |
| 构建系统 | cons (Perl) / Makefile（unix） |
| 渲染 | ref_gl（OpenGL） + ref_soft（软件渲染） |
| 许可 | GPL（部分代码例外：unzip/MD4/JPEG/ADPCM） |
| 源码行数 | ~43K game/ + ~32K botlib/ |

## 核心技术点

### QVM（Virtual Machine）架构
Quake III 最核心的创新：**游戏逻辑运行在 QVM 虚拟机上**

- `lcc/` — 可重定目标 C 编译器，将 C 代码编译成 QVM 字节码
- `q3asm/` — 汇编到 QVM 字节码编译器
- 三个独立 VM 模块：
  - `code/cgame/` — 客户端游戏表现（CGAME）
  - `code/game/` — 服务器游戏逻辑（GAME）— 43K LOC C
  - `code/q3_ui/` + `ui/` — UI 模块
- **安全沙箱**：VM 架构隔离游戏逻辑，支持 QVM bytecode 验证
- **对比 Quake 2**：Q2 用 DLL 加载游戏逻辑，Q3 用自研 VM 更安全跨平台

### Bot AI 系统
最复杂的 BOT AI 实现（区别于 Quake 2）：

- `code/botlib/` — 32K LOC Bot 库，bot 路由编译系统
- `code/bspc/` — BSP 编译器，生成分割导航数据
- `ai_dmq3.c` — 3:3 团队 Deathmatch AI
- `ai_dmnet.c` — 1:N Deathmatch AI
- `ai_team.c` — 团队协作 AI
- `ai_chat.c` / `ai_cmd.c` — Bot 对话和命令系统
- **完全数据驱动**：Bot 行为从外部数据编译，非硬编码

### 渲染架构
- `code/renderer/` — OpenGL 渲染器（ref_gl）
- ref_soft 软渲染并行维护
- 支持 Shader 着色器（对比 Quake 2 的固定管线）
- **模型格式**：MD3（区别于 Q2 的 MD2）

### 网络同步
- 客户端-服务器纯主从架构
- `cl_main.c` / `sv_main.c` 分离
- 帧同步模型（server  tick → client prediction）
- 支持 TV 观战模式

## 玩法特点

- **纯多人竞技**：无单人战役（区别于 Quake 2）
- **Arena 风格**：中小地图，密集战斗，武器平衡
- **Bot 系统**：可离线训练，支持 16+ Bot
- **Mod 支持**：QVM 可被第三方替换
- **Map 编辑**：内置 q3radiant，完整地图编辑器
- **游戏模式**：DM/TDM/CTF/ Tournament

## 工具链

| 工具 | 用途 |
|------|------|
| q3map | .map → .bsp 地图编译 |
| q3radiant | 地图编辑器（GTK-based） |
| q3asm | QVM 字节码汇编器 |
| lcc | C → QVM 编译器 |
| bspc | Bot 路由编译 |

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| VM 沙箱架构 | 游戏逻辑用 VM 隔离，安全且跨平台，支持 Mod 热重载 — 可用于 AI 行为脚本执行环境 |
| Bot AI 系统 | Botlib + 路由编译 + 多层 AI（行动/战术/团队）分离 — 复杂 AI 决策系统参考 |
| 数据驱动设计 | Bot 行为和地图数据编译分离 — AI 训练数据生成管线参考 |
| 网络帧同步 | 纯 tick-based 帧同步，适合强交互竞技 — 实时 AI 对战同步参考 |
| 模块化渲染 | ref_*/ 渲染器抽象 — 多后端渲染支持 |

## 相关页面

- [[open-source-game/quake]] — Quake 1（BSP 架构起源）
- [[open-source-game/quake-2]] — Quake 2（DLL 架构对比）
- [[open-source-game/doom]] — id Software FPS 经典
- [[open-source-game/chocolate-doom]] — Doom 还原端口
