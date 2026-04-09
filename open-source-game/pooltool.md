---
title: Pooltool
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, simulation, python, physics, billiards, panda3d]
sources: [https://github.com/ekiefl/pooltool]
---

# Pooltool

> A Python billiards sandbox simulator emphasizing realistic physics, published in JOSS.

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/ekiefl/pooltool |
| 语言 | Python (>=3.10, <3.14) |
| 渲染引擎 | Panda3D (GLTF + SimplePBR) |
| 许可 | Apache 2.0 |
|  stars | 358 |
| 版本 | 0.6.0 (2026-03-15) |
| 发表 | JOSS (Journal of Open Source Software) |
| 构建系统 | uv (Poetry → uv 迁移于 2026) |

## 核心技术点

### 物理引擎架构

Pooltool 的物理引擎采用**事件驱动**架构，将碰撞解析与轨迹演化分离：

```
PhysicsEngine
├── resolver: Resolver        # 碰撞事件解析（可插拔）
├── (evolve: 硬编码轨迹演化)   # 滑动/滚动/旋转轨迹
```

**核心碰撞模型** (`pooltool/physics/resolve/models.py`)：

| 球-球碰撞模型 | 说明 |
|--------------|------|
| `FRICTIONLESS_ELASTIC` | 理想弹性无摩擦，最简模型 |
| `FRICTIONAL_INELASTIC` | 含摩擦与恢复系数的球-球碰撞，基于 Dr. David Alciatore 技术证明 |
| `FRICTIONAL_MATHAVAN` | Mathavan 2014 模型，计及旋转与表面粗糙度，有实验验证 |

| 球-岸碰撞模型 | 说明 |
|--------------|------|
| `HAN_2005` | Han 2005 模型 |
| `IMPULSE_FRICTIONAL_INELASTIC` | 冲量驱动，含切向摩擦与法向恢复系数 |
| `MATHAVAN_2010` | Mathavan 2010 数值求解碰撞微分方程 |
| `STRONGE_COMPLIANT` | **默认模型**，含切向柔顺性，v0.6.0 替换 Mathavan 2010 |

**关键解析模块** (`pooltool/physics/resolve/`)：
- `ball_ball/` — 球-球碰撞解析
- `ball_cushion/` — 球-岸碰撞解析
- `ball_pocket/` — 球-袋口碰撞
- `stick_ball/` — 球杆-球碰撞（v0.6.0 升级为一级事件）
- `sphere_half_space_collision.py` — 球-半空间碰撞底层算法
- `stronge_compliant.py` — Stronge -compliant 模型实现
- `transition/` — 状态转换（滑动→滚动→纯滚动）

### 四次方程求解器
v0.6.0 引入 **Algorithm 1010** (Orellana & De Michele, 2020) 四次方程解析求解器，碰撞时间逐对实时计算，替代预计算。

### 事件系统
- `pooltool/events/` — 事件抽象层 (datatypes, factory, filter, utils)
- 事件优先级系统处理**同时碰撞**（如 Newton's Cradle 连续接触）
- 支持 `simulate_with_snapshots()` 捕获每一步模拟内部状态

### 数学库
- `pooltool/ptmath/` — 四元数与旋转数学工具
- `pooltool/ai/aim/` — 瞄准算法
- `pooltool/ai/pot/` — 进球路径计算

## 支持的游戏类型

| 类型 | 说明 |
|------|------|
| Eight Ball | 美式8球 |
| Nine Ball | 9球 |
| Three Cushion | 三颗星（台球经典技巧） |
| Snooker | 斯诺克 |
| Sum to Three | 凑三 |

## 架构模块

```
pooltool/
├── physics/       # 物理引擎（resolve/evolve/）
├── objects/      # 游戏对象（ball/ball/cue/table/）
├── game/         # 游戏状态与规则
├── ruleset/      # 规则实现（eight_ball/nine_ball/snooker/...）
├── system/       # 渲染系统
├── events/      # 事件驱动框架
├── serialize/   # 存档序列化（msgpack/h5）
├── ai/           # AI 瞄准与进球
├── ani/          # 动画
├── evolution/    # 演化相关
├── config/       # 配置
├── utils/        # 工具
├── main.py       # 入口
└── interact.py   # 交互接口
```

**sandbox/** 目录包含大量示例：
- `break.py` — 开球
- `break_forever.py` — 无限开球
- `newtons_cradle.py` — 牛顿摆
- `custom_table.py` — 自定义球台
- `parallel_playback.py` — 并行回放

## 依赖栈

| 依赖 | 用途 |
|------|------|
| Panda3D 1.11.0 | 3D 渲染引擎 |
| numba 0.59+ | JIT 加速物理计算 |
| numpy / scipy | 科学计算 |
| h5py | 大规模模拟存档 |
| msgpack | 序列化 |
| cattrs / attrs | 序列化/数据类 |
| click | CLI |
| rich | 终端输出 |
| Pillow | 图像处理 |

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 确定性物理 | numba JIT 加速 + 事件驱动 = 高性能物理模拟；台球/弹珠类游戏可复用此架构 |
| 碰撞模型可插拔 | 多套碰撞模型共存（STRONGE/MATHAVAN/HAN...）支持差异化物理体验 |
| 碰撞事件优先队列 | 同时碰撞时按优先级解析，避免状态不确定性 |
| AI 瞄准系统 | aim/pot 模块提供瞄准线与进球路径计算，可用于教学/辅助系统 |
| 保存/重放 | msgpack + h5 序列化支持完整模拟回放（snapshots） |
| 科学出版 | JOSS 论文 + 详细博客（ekiefl.github.io）增加项目可信度 |

## 技术亮点

- **v0.6.0 最新变更**（2026-03）：Stronge Compliant 替代 Mathavan 2010 成为默认；Poetry → uv 构建系统迁移；快照系统；四次方程解析求解
- **发布于 JOSS**：`@article{Kiefl2024, doi = {10.21105/joss.07301}}`
- **科学支撑**：物理模型引用 Billiards.colostate.edu (Dr. Alciatore) 技术证明与 peer-reviewed 论文
- **多平台**：sys_platform 分支处理 macOS (Panda3D 1.10.x) vs 其他平台 (Panda3D 1.11.x dev)
