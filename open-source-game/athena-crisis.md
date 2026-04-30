---
title: Athena Crisis
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, javascript, typescript, game-engine]
sources: [raw/articles/athena-crisis-source.md]
---

# Athena Crisis

> 现代复古回合战术策略游戏，100K+ LOC 开源引擎，pnpm monorepo 架构

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/nkzw-tech/athena-crisis |
| 网站 | https://athenacrisis.com |
| 公司 | Nakazawa Tech (Open Core) |
| 语言 | TypeScript/JavaScript |
| 包管理 | pnpm workspace monorepo |
| 构建 | Vite |
| 许可 | MIT（代码）/ 专有（美术/音乐/内容） |
| Steam | [app/2456430](https://store.steampowered.com/app/2456430/Athena_Crisis/) |

## 核心技术架构

### Monorepo 包结构（pnpm workspace）

Athena Crisis 将代码拆分为多个 npm 包，通过 `pnpm-workspace.yaml` 统一管理：

**核心包：**
- `athena` — 地图状态的数据结构和算法（client/server 共享）
- `apollo` — 游戏状态的数据结构和算法（client/server 共享）
- `hera` — 游戏引擎和渲染（client）
- `ui` — 设计系统（client）
- `docs` — 文档和 Playground（client）

**领域包：**
- `dionysus` — AI 代码（client/server）
- `hermes` — 战役相关数据结构（client/server）
- `art` — 资源处理（client/build）
- `codegen` — Action/ActionResponse 代码生成（build）
- `i18n` — 国际化（client/build）
- `offline` — 离线启动画面（client）

**空壳包（内部 monorepo 共享依赖用）：**
- `ares`、`artemis` — placeholder

### 数据层：athena + apollo 双层状态

**athena 包** — 地图级别状态：
- `Map.tsx` — 地图网格数据
- `Tile*.tsx` — 地形/装饰物渲染
- `Unit.tsx` — 单位定义
- `Building.tsx` — 建筑定义
- `Vision.tsx` / `Fog.tsx` — 视野/战争迷雾
- `MapData.tsx` — 地图元数据
- `Radius.tsx` — 攻击/移动范围计算
- `MapAnimations.tsx` — 地图动画
- `invasions/` — 入侵波次系统
- `Objectives.tsx` — 目标系统
- `action-mutators/` — 行动变更器
- `lib/` — A* 寻路等核心算法

**apollo 包** — 游戏级别状态：
- `GameState.tsx` — 完整游戏状态（包含 athena map + 单位/建筑状态）
- `Action.tsx` — 行动定义（攻击/移动/建造等）
- `ActionResponse.tsx` — 行动响应
- `Effects.tsx` — 效果系统
- `Conditions.tsx` — 条件系统
- `CharacterMessage.tsx` — 角色消息
- `replay/` — 回放系统
- `routes/` — 路由（关卡序列）
- `socket/` — 实时观战

### 渲染层：hera

- `render/` — 主渲染模块
  - `Images.tsx` — 资源图片加载
  - `Tiles.tsx` — 地形瓦片渲染
  - `Drawer.tsx` — 绘制器
- `GameMap.tsx` — 游戏地图组件
- `editor/` — 内置地图编辑器
- `behavior/` — 单位行为系统
- `animations/` — 动画系统
- `audio/` — 音频系统
- `workers/` — Web Workers 渲染优化

### AI 系统：dionysus

独立的 AI 包，包含回合策略 AI 实现。

### 代码生成：codegen

运行 `pnpm codegen` 为 `Action` 和 `ActionResponse` 生成：
- 编码后的 action 数据
- 格式化器（用于调试/UI）

### 测试：vitest + e2e

- `vitest.config.ts` — Vitest 配置
- `tests/` — 端到端测试
- ESLint 规则通过 `eslint-plugin` 包强制执行

## 关键设计决策

### 1. Open Core 商业模式
- 100K+ LOC 代码开源（MIT）
- 单人战役/多人/美术/音乐/内容闭源（需购买）
- Steam + 直接销售双渠道
- 内部 monorepo 与开源 repo 自动同步

### 2. Client/Server 状态分离
- `athena` + `apollo` 为 client/server 共享
- `hera` + `ui` 专属于 client
- `dionysus` AI 同时运行于 client（单人）和 server（观战）

### 3. 数据驱动设计
- 大量使用 TypeScript 类型约束（`Types.tsx`、`@types/`）
- JSON 数据配置规则（Conditions、Effects）
- 地图编辑器内置于 `hera/editor/`

### 4. 现代前端工程
- TypeScript strict mode
- Vitest 单元/集成测试
- ESLint + oxlint 代码质量
- Vite 构建
- pnpm workspace monorepo
- Git hooks (`git-hooks/`)

## 玩法特点

- **现代复古回合战术策略** — 致敬经典军事策略游戏
- 回合制单位控制（步兵、车辆、飞机等）
- 地图编辑器内置
- 单人战役 + 多人对战
- 实时观战系统（socket）
- 回放系统

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| Monorepo 包拆分 | 用 pnpm workspace 将 engine/client/server/AI 分离成独立包 |
| 双层状态机 | athena(map) + apollo(game) 分离地图状态和游戏逻辑 |
| AI 模块化 | dionysus 独立包允许 client-side 和 server-side AI 共用 |
| Open Core 模式 | 核心引擎开源，精品内容闭源变现 |
| 代码生成管线 | codegen 自动生成 Action 编码/格式化，类型安全 |
| 数据驱动 AI | JSON Conditions/Effects 描述游戏规则，AI 可配置化 |

