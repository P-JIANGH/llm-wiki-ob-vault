---
title: Kandria
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, action-rpg]
sources: [codeberg:shirakumo/kandria]
---

# Kandria

> Common Lisp 动作 RPG，基于 Shirakumo TRIAL 游戏引擎的 2D 横版冒险

## 基本信息

| 项目 | 内容 |
|------|------|
| Codeberg | `https://codeberg.org/shirakumo/kandria` |
| 语言 | Common Lisp (~19K LOC) |
| 构建系统 | SBCL (Steel Bank Common Lisp) |
| 渲染/引擎 | TRIAL 引擎 + alloy (OpenGL) |
| 许可 | 专有 + 贡献条款 |
| 平台 | AMD64/ARM64 (SBCL, 2GB+ heap) |
| 依赖引擎 | `open-source-game/trial` (Shirakumo TRIAL) |

## 核心技术点

### Common Lisp 整项目架构
整个游戏由 75 个 `.lisp` 文件构成，零传统 `src/` 目录布局：
- `package.lisp` — 包定义 + 平台检查 (SBCL 2.2+ required)
- 核心文件按功能划分：player.lisp(1548)、inventory(907)、npc(866)、move-to(872)
- ~19K 行 Lisp 代码，完全数据驱动

### TRIAL 游戏引擎
Shirakumo 的组件式游戏引擎，TRIAL 提供：
- 实体-组件-系统 (ECS) 架构 (`trial:define-shader-entity`)
- OpenGL 渲染管线 via alloy 框架
- 场景图管理 + 着色器支持
- 物理：BVH2 (Bounding Volume Hierarchy) 碰撞 (`bvh2.lisp`, 697 LOC)

### 内置关卡编辑器
`editor/` 子目录（20+ `.lisp` 文件）实现完整游戏内编辑器：
- 动画、笔刷、自动平铺、碰撞体、光照等工具
- 实体创建器 (`creator.lisp`)、拖拽操作 (`drag.lisp`)、历史记录 (`history.lisp`)
- Alloy UI 框架驱动的工具栏和浏览器

### 游戏系统
- **AI** — `ai.lisp`, `enemy.lisp`(718 LOC), `trigger.lisp`(481 LOC)
- **物理** — BVH 碰撞 (`bvh2.lisp`)、自动填充 (`auto-fill.lisp`, 500 LOC)
- **角色** — `player.lisp`(1548 LOC) 主角控制器、npc(866)、物品/库存(inventory 907)
- **环境** — 背景(`background.lisp`)、环境(`environment.lisp`)、chunk 地形(`chunk.lisp`, 698 LOC)
- **特效** — `effect.lisp`(559 LOC)、`effects.lisp`、位移系统(`displacement.lisp`)
- **钓鱼系统** — `fishing.lisp` 完整小游戏
- **成就系统** — `achievements.lisp`

### 贡献模式
- 核心仓库只接受 bug fix、翻译、优化；新内容走 mod
- 贡献者需签署 CLA，授予 Shirakumo Games 完整修改权
- 文档使用 Markless 格式

## 玩法特点

2D 横版动作 RPG，包含：
- 完整剧情战役（单局 20+ 关卡）
- NPC 对话系统（集成 speechless 对话引擎）
- 支线任务系统（quest 子系统）
- 钓鱼小游戏
- 内置关卡编辑器，支持玩家自制关卡

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| Lisp 游戏架构 | 用 Lisp 实现游戏逻辑，数据/代码边界模糊，hot reload 天然支持 |
| ECS 模式 | TRIAL 的组件式设计适合 AI agent 修改特定系统 |
| 关卡编辑器 | [[open-source-game/egregoria]] 的协作规划理念类似，编辑器内嵌降低门槛 |
| AI 系统 | 敌人/NPC AI 分层设计（enemy.lisp + trigger.lisp + ai.lisp）可被 agent 理解和扩展 |
| 确定性物理 | BVH2 碰撞可作为 [[open-source-game/fish-folk-jumpy]] rapier2d 物理之外的替代方案 |

## 相关页面

- `open-source-game/trial` — TRIAL 游戏引擎（Kandria 的底层）
- [[open-source-game/frogatto]] — 同样使用模块化引擎架构的游戏
- [[open-source-game/openmw]] — 另一个大型开源 RPG 引擎复刻项目
