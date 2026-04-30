---
title: BrogueCE
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, roguelike, minimal, community-edition]
sources: [raw/articles/brogue-ce.md]
---

# BrogueCE

> 极简主义随机地下城探索 roguelike，经典 Brogue 的社区维护版本

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/tmewett/BrogueCE |
| 语言 | 纯 C (C99 标准) |
| 构建系统 | Make + config.mk |
| 渲染选项 | SDL2 图形模式（默认）/ ncurses 终端模式 |
| 许可 | MIT |
| Stars | 1.3k |
| Commits | 934+ |

## 核心技术点

### 架构设计
- **纯 C 代码库**：无游戏引擎依赖，22 个 .c 源文件分布在 src/brogue/ 核心目录
- **平台抽象层**：src/platform/ 包含多后端（sdl2-platform.c / curses-platform.c / term.c / web-platform.c）
- **变种系统**：src/variants/ 支持游戏变体扩展
- **模块化 Makefile**：config.mk 通过编译选项开关（GRAPHICS=YES/NO、TERMINAL=YES/NO、DEBUG=YES/NO）

### 核心源文件 (src/brogue/)

| 文件 | 功能 |
|------|------|
| Rogue.h | 主头文件，定义核心数据结构 |
| RogueMain.c | 游戏入口和主循环 |
| Architect.c | 地牢程序化生成架构 |
| Dijkstra.c | Dijkstra 最短路径算法（怪物寻路） |
| SeedCatalog.c | 物品/怪物种子目录（确定性随机） |
| Recordings.c | 游戏回放系统（turn-by-turn 录制） |
| Combat.c | 战斗系统 |
| Monsters.c | 怪物 AI 逻辑 |
| Items.c | 物品系统（武器/药水/卷轴/戒指等） |
| Movement.c | 移动与碰撞检测 |
| Light.c | 光照系统 |
| Grid.c | 网格/地图数据结构 |
| IO.c | 显示输出 |
| Globals.c / GlobalsBase.c | 全局状态管理 |
| Time.c | 回合/时间系统 |
| Wizard.c | 调试/作弊模式 |
| PowerTables.c | 能力/效果查找表 |

### 技术特性
- **确定性回放**：Recordings.c 实现完整游戏录制，可逐帧回放（常用于 bug 重现）
- **Dijkstra 寻路**：Monsters.c 使用 Dijkstra 算法实现怪物智能追踪
- **Seed 驱动生成**：SeedCatalog.c 支持种子码，可复现相同地牢布局
- **双渲染模式**：默认 SDL2 图形（含 tile 素材），终端模式下 ncurses 渲染 ASCII
- **调试工具**：Wizard.c 提供作弊模式和调试功能

## 玩法特点

- **目标**：从 26 层地牢深处取回 Amulet of Yendor
- **核心机制**：回合制 roguelike，随机生成地牢/怪物/物品
- **极简设计**：界面简洁，策略深度高，死亡即重来
- **社区版增强**：修复 bug、QoL 改进、跨平台支持（Win/Mac/Linux/Web）
- **内置录制**：可记录完整游戏过程并回放

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **确定性系统** | Recordings.c 的录制/回放架构可用于 AI 对战训练数据采集 |
| **寻路算法** | Dijkstra.c 简洁实现，可作为 AI 导航模块参考 |
| **Seed 系统** | 确定性随机在 AI 对局中保证环境一致性 |
| **极简 UI** | Brogue 的信息密度设计适合 AI 状态展示 |
| **回合制设计** | Roguelike 回合制天然适合 AI 决策（vs 实时动作） |

## 相关页面

- [[dungeon-crawl-stone-soup]] — 另一个经典 Roguelike，.des Vault 关卡系统
- [[nethack]] — 经典 Roguelike，3.7 开发中
- [[cataclysm-dark-days-ahead]] — 后世界末日生存 roguelike

