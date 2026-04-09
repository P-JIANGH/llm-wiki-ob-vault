---
title: War1gus
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, rts, warcraft, stratagus-engine, re-implementation, classic-rts]
sources: [https://github.com/Wargus/war1gus]
---

# War1gus

> Warcraft: Orcs & Humans 重实现，基于 Stratagus 引擎

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/Wargus/war1gus |
| 语言 | C++17 + Lua |
| 构建系统 | CMake 3.10+ |
| 引擎 | Stratagus（外部依赖） |
| 许可 | GPLv2 |
| 主文件 | war1tool.cpp (4059 LOC) + Lua 脚本 |

## 核心技术点

### Stratagus 引擎架构
- War1gus **不是独立引擎**，而是 Stratagus（RTS 通用引擎）的游戏实例配置
- Stratagus 是纯 C++ RTS 引擎，支持 Lua 脚本驱动游戏数据
- 游戏逻辑完全由 `scripts/*.lua` 驱动（Chips/Units/Buildings/Actions 等）

### war1tool — 数据提取与转换工具
- **war1tool.cpp (4059 LOC)**：核心工具，负责从原版 Warcraft CD 提取游戏数据并转换格式
- 支持战役脚本 `.sms` 格式解析
- xmi2mid.cpp (414 LOC)：MIDI 音乐格式转换（XMI → MIDI）
- scale2x.cpp (291 LOC)：像素图形 2x/3x/4x 无损放大算法（用于高清渲染）

### Lua 脚本层
- `scripts/buildings.lua` — 建筑属性定义
- `scripts/ai.lua` — AI 对手行为
- `scripts/commands.lua` — 单位命令定义
- `scripts/balancing.lua` — 平衡性参数
- `scripts/keystrokes.lua` — 键盘快捷键
- `scripts/editor.lua` — 内置地图编辑器

### 数据驱动设计
- 全部游戏内容（Warcraft 原有数据）存储在 `campaigns/`（.sms 战役脚本 + .lua 配置）和 `maps/` 目录
- 战役支持 Human（人类）和 Orc（兽人）两个种族，每个种族独立战役数据
- 需要原版 Warcraft 游戏数据文件才能运行（不包含版权素材）

## 玩法特点

- 忠实还原 Warcraft: Orcs & Humans（RTS 开山之作，1994）
- 在 Stratagus 引擎加持下获得现代功能：编队命名、大规模选中、地图编辑器、多人模式扩展阵营
- 战役模式：各 12 关人类/兽人两条线

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 数据与引擎分离 | war1tool 提取工具 + Stratagus 引擎 + Lua 配置三层分离，资产可复用 |
| 经典游戏重实现 | Stratagus 引擎证明通用 RTS 引擎可承载多款经典游戏复刻，降低重实现成本 |
| Lua 配置驱动 | Lua 脚本层完全解耦游戏数据与引擎代码，mod 友好，与 [[openra]] 的 YAML 规则配置异曲同工 |
| 战役系统 | 双阵营独立 lua 脚本配置，可作为 AI 对手行为研究的干净起点 |

## 相关页面

- [[open-source-game/openra]] — C&C / 红警重实现，同为 Stratagus 生态
- [[open-source-game/openbw]] — StarCraft 重实现，另一种经典 RTS 复刻路径
- [[open-source-game/warzone-2100]] — 原创剧情 3D RTS，与 Warcraft 同年代 RTS 探索
