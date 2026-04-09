---
title: Shadow Warrior
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, fps, build-engine, 3d-realms, action]
sources: []
---

# Shadow Warrior

> 3D Realms 经典 FPS，使用 Build 引擎，1997 年发行，2005 年开源释出

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/Azarien/shadow-warrior |
| 原始开发商 | 3D Realms (Apogee Software) |
| 发行年份 | 1997（PC DOS/Windows） |
| 开源年份 | 2005年4月（Charlie Wiederhold 释出） |
| 主语言 | C（Watcom C 编译） |
| 引擎 | Ken Silverman's Build Engine |
| 代码规模 | ~118K LOC（75 个 .c 文件，81 个 .h 文件） |
| 许可 | GPL（游戏引擎代码）；游戏数据仍归 3D Realms 所有 |
| 原型 | Duke Nukem 3D 同引擎作品 |

## 核心技术点

### Build Engine 架构
Shadow Warrior 与 [open-source-game/duke-nukem-3d](#/open-source-game/duke-nukem-3d) 共用 Ken Silverman 的 Build Engine，采用 **Sector/Portal 渲染** 架构：
- 地图由 `SECTOR`（扇区）和 `WALL`（墙体）构成，支持复杂室内外混合空间
- `MAXSECTORS`、`MAXWALLS`、`MAXSPRITES` 定义资源上限
- BSP 树用于渲染排序（先墙后地后 sprite）
- 预编译 `.OBJ` 引擎二进制 + 游戏源码分离（可复用 Build 引擎驱动其他游戏）

### KenBuild 目录
`kenbuild/` 目录包含 Build Engine 的核心组件：
- `boards.map` — 测试地图
- `game.exe` — 预编译引擎可执行文件
- `kensig.map`、`setup.exe` — 构建工具

### 音频系统
`audiolib/` 目录封装了 **Jim Dose** 的音频库代码：
- `audio.mak` / `audio2.mak` — 编译脚本
- `gus/` — Gravis Ultrasound 硬件支持
- `lib/` — 编译后库文件（`audio_wf.lib` 等）
- 支持 AdLib/OPL、Sound Blaster、GUS 等多种音效硬件

### 游戏逻辑模块（source/）
核心 `.c` 文件按功能模块划分（与 Duke Nukem 3D 结构相似）：

| 文件 | 功能 |
|------|------|
| `actor.c` | 实体/Actor 行为系统 |
| `ai.c` | AI 状态机与行为逻辑 |
| `anim.c` | 动画系统 |
| `weapon.c` (~22K LOC) | 武器系统（最大模块） |
| `border.c` | 边界/碰撞 |
| `break.c` | 可破坏物体 |
| `bunny.c` | 兔子敌人 AI |
| `cache.c` | 资源缓存 |
| `warp.c` | 传送门系统 |
| `zilla.c` / `zombie.c` | 敌人类型实现 |

### 网络多人
与 Duke Nukem 3D 相同架构：
- 原始 IPX 包交换网络
- 后来被 JonoF 端口增强支持 TCP/IP

## 玩法特点

- **主角 Lo Wang**：中国忍者，受雇取回被盗神剑
- **冷兵器为主**：武士刀（katana）近战，可投掷手里剑
- **枪械辅助**：手枪、乌兹冲锋枪、霰弹枪等
- **关卡设计**：16 个主线关卡 + 4 个多人地图
- **Boss 战**：每章节结尾有大型 Boss（Zilla 博士等）

## 与公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 引擎/游戏代码分离 | [open-source-game/duke-nukem-3d](#/open-source-game/duke-nukem-3d) 的 Build 引擎预编译 + 游戏源码分离模式，可实现引擎跨游戏复用 |
| 模块化敌人 AI | `ai.c` + `actor.c` 分层设计（状态机 + 执行器），适合 [multi-agent-ai-game-impl](#/concepts/multi-agent-ai-game-impl) 中的 AI 决策链路 |
| 资源缓存架构 | `cache.c` 的 LRU 缓存模式可用于游戏资产（纹理/声音）的按需加载 |
| 数据驱动设计 | `.def` 文件定义 Actor/Weapon 参数，无需改代码即可调整游戏平衡 |
| 开源合规策略 | 引擎代码 GPL + 游戏数据闭源的 双许可证模式，是商业 IP 开源的参考路径 |

## 关联页面

- [open-source-game/duke-nukem-3d](#/open-source-game/duke-nukem-3d) — 同引擎 FPS，对比研究 Build 引擎差异
- [open-source-game/ecwolf](#/open-source-game/ecwolf) — Wolfenstein 3D 端口，与 Shadow Warrior 同期 3D Realms 产品
- [open-source-game/uzdoom](#/open-source-game/uzdoom) — DOOM 系端口，参考现代源码端口的维护模式
