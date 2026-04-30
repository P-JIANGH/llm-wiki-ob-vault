---
title: Citybound
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, city-builder, simulation, rust]
sources: [https://github.com/citybound/citybound]
---

# Citybound

> 微观模型城市建造模拟，强调真实性、协作规划与细节仿真。Rust + 浏览器 UI 混合架构。

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/citybound/citybound |
| 语言 | Rust (core) + TypeScript (UI) |
| 构建系统 | Cargo workspace (Rust) + npm (TypeScript UI) |
| 渲染/引擎 | WebGL 浏览器 UI + Rust 服务端 |
| 许可 | AGPL-3.0 |
| 版本 | 0.3.0 |

## 核心架构

### Cargo Workspace 多 crate 结构

```
citybound (root)
├── cb_simulation    # 核心模拟引擎（Rust）
├── cb_planning     # 协作规划系统
├── cb_util          # 工具库（日志等）
├── cb_time         # 时间系统
├── cb_browser_ui   # 浏览器 UI（TypeScript/WebGL，排除在 workspace 外）
└── cb_server       # 主服务器入口
```

### Actor 模型

核心模拟使用 **kay crate** 实现 Actor 模型：
- `kay::ActorSystem` 管理所有 Actor
- 模块化 setup 函数：`transport::setup`、`economy::setup`、`land_use::setup`、`environment::setup`
- 每个子系统通过 Actor 消息传递交互

Actor 架构让城市各系统（交通、经济、土地利用、环境）解耦，可独立扩展。

### 模拟子系统

| 子系统 | 功能 |
|--------|------|
| `cb_simulation/transport` | 交通网络仿真（道路、公交） |
| `cb_simulation/land_use` | 土地利用（区域划分、建筑选址） |
| `cb_simulation/economy` | 经济系统（资金流、资源分配） |
| `cb_simulation/environment` | 环境仿真（植被等） |
| `cb_simulation/planning` | 协作规划（规划提案系统） |
| `cb_simulation/dimensions` | 尺寸/几何计算 |

### 浏览器 UI 架构

- **TypeScript** 前端 + WebGL 渲染
- `cb_browser_ui/` 独立 npm 包，排除在 Rust workspace 外
- `npm run watch-browser`：持续构建浏览器 UI
- `npm start`：构建并运行服务器
- 双终端模式：UI 构建 + 服务器同时运行

## 关键技术点

### 协作规划理念

Citybound 的核心理念不是"建造"，而是**协作规划**：
- 玩家不仅建造城市，还参与规划提案的协作决策
- 规划系统（cb_planning）是独立模块，支持多玩家协作

### 确定性仿真

基于 Rust 的强类型 + Actor 模型保证了仿真确定性：
- 每个 Agent 的行为可预测、重放
- 避免浮点不确定性（`ordered_float` crate）

### 依赖管理

核心依赖（来自 Cargo.toml）：
- `rouille` — Rust HTTP 服务器
- `noise` — 程序化噪声（地形生成）
- `compact` / `compact_macros` — 紧凑数据结构
- `descartes` — 几何处理
- `kay` — Actor 框架
- `michelangelo` — 渲染相关

## 玩法特点

- **微观视角**：不只显示宏观城市状态，还仿真每个居民的微观行为
- **协作规划**：多个玩家共同参与城市规划决策
- **实时仿真**：交通流、经济活动实时计算
- **跨平台**：通过浏览器访问（Live Builds 支持 Windows/Mac/Linux）

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| AI Agent 架构 | kay Actor 模型是现成的多 Agent 仿真框架，可直接用于 AI 角色管理 |
| 城市模拟 | 交通/经济/土地利用解耦设计适合复杂 AI 决策场景 |
| 浏览器客户端 | WebGL UI 架构适合轻量跨平台部署，降低玩家门槛 |
| 协作规划 | AI 与人类玩家协作规划的游戏机制设计参考 |
| 确定性仿真 | Rust 类型系统 + Actor 模型保证 AI 决策可复现性 |

## 相关页面

- [[cytopia]] — 像素城市建造，SDL2 等距渲染
- [[egregoria]] — Rust 城市建造，确定性锁步网络
- [[julius]] — Caesar III 清洁室重实现
- [[unknown-horizons]] — Godot 4 城市建造
- [[open-source-game-engines-comparison]] — 开源游戏引擎对比

