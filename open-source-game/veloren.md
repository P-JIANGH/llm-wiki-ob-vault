---
title: Veloren
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, voxel, rpg, rust, multiplayer, action-adventure]
sources: []
---

# Veloren

> 开放世界体素多人 RPG，灵感来自 Dwarf Fortress + Cube World + Zelda BotW + Minecraft，Rust 实现，GPLv3

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub（镜像） | https://github.com/veloren/veloren |
| 主仓库 | https://gitlab.com/veloren/veloren |
| 语言 | Rust（~400K LOC） |
| 构建系统 | Cargo workspace |
| 版本 | 0.18.0 |
| 许可 | GPL-3.0-or-later |
| 架构 | ECS (specs crate) |
| 引擎 | 自研（无第三方游戏引擎） |

## 核心技术点

### 1. Rust Workspace 架构（24 个 crates）
```
client/          — 客户端入口（与 server 共享部分逻辑）
client/i18n/     — 国际化
common/          — 共享核心（ECS/comp/state/systems/net/...）
common/assets/   — 资源加载
common/base/     — 基础类型
common/dynlib/   — 动态库加载（hot-reloading 支持）
common/ecs/      — ECS 基础设施（system/dispatch/job）
common/frontend/ — 前端接口
common/i18n/     — 国际化框架
common/net/      — 网络消息定义
common/query_server/ — 查询服务器
common/state/    — 游戏状态
common/systems/  — ECS 系统
network/         — QUIC/TCP/UDP 多协议网络层
network/protocol/ — 网络协议定义
rtsim/           — 实时模拟（AI/经济/农业）
server/          — 游戏服务器
server/agent/    — AI Agent 系统
server-cli/      — 专用服务器 CLI
voxygen/         — 客户端渲染器/UI（主二进制入口）
voxygen/anim/    — 骨骼动画系统
voxygen/egui/    — Egui UI 框架
world/           — 体素世界生成/地形
```

### 2. ECS 架构（specs crate）
- 基于 `specs` crate（amethyst/specs 分支）
- `common/ecs/` 定义 `System`, `Job`, `CpuTimeline`, `Phase`, `dispatch` 等调度原语
- `common/systems/` 含所有游戏系统（combat/character/figure generation 等）
- 支持并行 job 调度和 timeline profiling
- 系统指标收集：`PhysicsMetrics`, `SysMetrics`

### 3. 网络层（QUIC 为主）
- `veloren-network` 支持多种协议：QUIC/TCP/UDP/MPSC
- 核心抽象：`Network` → `Participant` → `Stream`
- `Promises` 优先级机制
- 支持 `compression` 和 `metrics` 特性
- 使用 `quinn` QUIC 实现
- 消息序列化：`bincode` + `serde`

### 4. 体素世界系统
- `world/` crate：block/column/site/civ 分层管理
- 程序化地形生成（noise 库）
- `civ/` 文明 simulation
- `sim/` 实时模拟
- `site/` 地点生成（建筑/洞穴等）
- 持久化存储（`chunk_serialize.rs`）

### 5. 渲染引擎（voxygen）
- 自研渲染器，无外部游戏引擎依赖
- 渲染模块：`render/bound.rs`（边界）/`render/buffer.rs`/`render/instances.rs`/`render/mesh.rs`/`render/model.rs`/`render/texture.rs`
- 骨架动画：`voxygen/anim/`
- Egui UI：`voxygen/egui/`
- Discord RPC 集成
- LOD（Level of Detail）：`server/lod.rs`
- 支持 `hot-anim` / `hot-egui` / `hot-reloading` 特性

### 6. 实时模拟（rtsim）
- `rtsim/` AI/经济/农业实时模拟
- 支持 NPC AI 决策、路径规划
- `rtsim/ai/` — AI 行为树
- `rtsim/data/` — 模拟数据

### 7. 依赖关键库
| 库 | 用途 |
|----|------|
| `vek` | SIMD 数学库（`vek/platform_intrinsics`）|
| `specs` | ECS（patched amethyst fork）|
| `tokio` | async runtime |
| `quinn` | QUIC 协议 |
| `rusqlite` | SQLite（存档/查询服务器）|
| `rayon` | 数据并行 |
| `wgpu` | GPU 渲染 |
| `noise` | 程序化噪声 |
| `chrono` | 时间/日历系统 |

### 8. 构建与发布
- Cargo workspace 多 profile：`dev`/`release`/`no_overflow`/`releasedebuginfo`/`bench`
- `no_overflow` profile：禁 overflow-check 用于 worldgen 等数学密集任务
- `release` profile：LTO + panic=abort
- Nix flake 支持 Cachix 缓存
- 官方 launcher：[Airshipper](https://book.veloren.net/players/airshipper.html)

## 玩法特点

- **开放世界**：程序化生成的大规模体素世界
- **多人 RPG**：MMO 风格，支持玩家交互
- **战斗系统**：`common/src/combat.rs` 2491 行，复杂战斗逻辑
- **建造系统**：农业/工作台/制作
- **RT-sim NPC**：实时模拟 NPC 行为和经济
- **Discord 集成**：游戏内 Discord Rich Presence
- **跨平台**：Windows/macOS/Linux (x86_64 + ARM64)

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| Rust ECS 架构 | 400K LOC 大型 Rust 项目 ECS 实践，specs crate 深度定制 |
| 多协议网络 | QUIC/TCP/UDP 多路复用，单一仓库多游戏模式网络架构 |
| 体素引擎 | Rust 体素渲染管线（世界生成+可见性裁剪+LOD）|
| 实时模拟 | 大规模 NPC AI + 经济系统 + 农业模拟 |
| 热更新 | 动态库加载（`dynlib`）支持插件/Agent 热重载 |
| 构建优化 | 多 profile（dev/release/no_overflow）差异化编译策略 |
| 国际化 | 完整 i18n 框架（20+ 语言 Weblate）|

## 注释

- GitHub 是只读镜像；主开发在 GitLab
- v0.18.0 使用 Rust 2024 edition
- 世界生成性能关键路径使用 `no_overflow` profile（禁 overflow-check 提升性能）
- `server-agent` 独立 crate 支持 AI Agent 热更新
- 约 16K commits，社区活跃（Discord/Zulip/Reddit）
