---
title: Fallout Community Edition
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, rpg, isometric, fallout, clean-room, sdl2]
sources: [https://github.com/alexbatalov/fallout1-ce]
---

# Fallout Community Edition

> Fallout 1 引擎清洁室重实现，SDL2 跨平台，保留原版 gameplay + bugfix + QoL 改进

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/alexbatalov/fallout1-ce |
| 语言 | C++17（227 源文件，135K LOC） |
| 构建系统 | CMake 3.13+ |
| 渲染/引擎 | SDL2 跨平台渲染（无自研 3D 引擎，纯 2D 等距视角） |
| 平台 | Windows、Linux、macOS、iOS、Android |
| 许可 | MIT |
| 依赖 | 须持有原版游戏数据（GOG/Steam） |

## 核心技术点

### 清洁室逆向架构
- 完全重写而非修改原版二进制 — 干净的实现，不依赖原始代码
- 对应项目 [Fallout 2 Community Edition](https://github.com/alexbatalov/fallout2-ce) 同步开发
- 需要原版游戏数据文件（Fallout DAT 打包资源）作为运行时依赖

### 平台抽象层 (plib/)
- `plib/gnw/` — 图形窗口底层（gnw = Game Graphics Window）
- `plib/db/` — 数据库/包管理（LZSS 压缩支持）
- `plib/color/` — 颜色处理
- `plib/assoc/` — 关联数组容器
- 与 Interplay 原始引擎 `game/` 业务逻辑完全解耦

### 核心子系统 (src/game/ — 138 文件)
- `art.cc/h` — SPR/PAL 图像格式解析（Fallout 专用）
- `combat.cc` — 回合制战斗系统
- `critter.cc` — 生物/NPC 实体系统
- `anim.cc` — 帧动画系统
- `inventry.cc` — 物品/背包系统
- `dialog.cc` — 对话树/FIXED 脚本解析
- `gmovie.cc` — 电影过场播放（Bik 格式）
- `editor.cc` — 内置关卡编辑器
- `cache.cc` — 资源缓存管理
- `combatai.cc` — 战斗 AI

### 解释器层 (src/int/)
- `intrpret.cc` — Fallout script 解释器（FIXT/INT 格式）
- `datafile.cc` — DAT/PAK 资源打包读取
- `dialog.cc` — 对话流控制
- `audiof.cc` — FM/GM 音乐格式
- `support/intextra.cc` — 国际化/文本扩展

### 跨平台 SDL2 层
- 统一的输入（键盘/鼠标/手柄）
- OpenGL ES 渲染后端（Android/iOS）
- 音频引擎统一抽象

## 玩法特点

- **经典等距 RPG** — 回合制战斗 + 开放世界探索
- **RPG 属性系统** — SPECIAL 属性、技能、Perks
- **非线性剧情** — 多个结局分支
- **Bugfix 优先** — 修复大量原版引擎 bug
- **QoL 改进** — 无需额外补丁开高分辨率/宽屏

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 清洁室逆向 | 完全重写而非修改二进制 — 规避版权的法律路径；需对原版行为有深度理解 |
| 平台抽象 | plib/ 子系统将平台差异隔离 — 不同 OS/Android/iOS 共用业务逻辑层 |
| 脚本解释器 | 独立 script VM（intrpert.cc）使游戏内容与引擎分离 — 类似 AI game 的行为脚本化 |
| 资源打包 | DAT 文件 + LZSS 压缩 — 自研游戏可用虚拟文件系统管理游戏资产 |
| 多人缺失 | 无网络代码 — 单机封闭世界 AI game 更易实现确定性模拟 |

## 关联项目

- [[open-source-game/fallout-2-community-edition]] — Fallout 2 同期重实现
- [[open-source-game/openmw]] — Morrowind 引擎重实现（同为 RPG 重实现参考）
- [[open-source-game/openra]] — Westwood RTS 重实现（C&C/红警）
