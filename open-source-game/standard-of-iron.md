---
title: Standard of Iron
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, rts, historical, c++, qt6, opengl, ecs]
sources: []
---

# Standard of Iron

> 布匿战争时期历史 RTS 引擎，罗马 vs 迦太基，Qt6 + OpenGL 3.3 + ECS 架构

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/djeada/Standard-of-Iron |
| 语言 | C++20 |
| 构建系统 | CMake 3.21+ |
| 渲染/引擎 | Qt 6 (UI) + OpenGL 3.3 Core Profile (渲染) |
| 许可 | MIT |
| 依赖 | miniaudio (音频), Google Test (测试) |

## 核心技术点

### ECS 架构
- 64-bit Entity ID，纯数据组件（Transform/Unit/Movement/AttackTarget/Patrol/Production/Building）
- System 执行顺序固定：Arrow → Movement → Patrol → Combat → AI → Production → Selection
- 组件连续存储保证 Cache Efficiency，多态被避免

### 自研 OpenGL 3.3 渲染管线
- 6 阶段 Pass：Scene Setup → Terrain → Entity → VFX → UI Overlay → Debug Viz
- 骨骼动画 + 程序化布料物理（Wind + Leg Collision）
- 着色器批处理减少 GPU 状态切换，Frustum Culling 跳过视锥外实体
- Depth Pre-pass 减少 Overdraw，Instanced Rendering 处理粒子特效

### 数据驱动设计
- 地图 JSON 配置：地形尺寸、刷怪点、胜利条件（elimination/survive_time）
- 兵种基础数值在 `assets/data/troops/base.json`，国家 JSON 做 Stat Modifiers Override
- Nation TroopVariant 支持每阵营独立 stat/form/formation/visual
- 无需改代码即可调整平衡和新增文明

### 战术系统
- 网格寻路（Grid-based Pathfinding）支持阵型间距
- 巡逻 Waypoint Loop + Aggro Range 敌人检测
- 占领系统：3× 兵力优势持续 5 秒获取控制权
- 建筑师兵牌系统、聚合点（Rally Point）支持

## 玩法特点

- **Punic Wars 主题**：罗马 vs 迦太基，每个派系有独立兵种 roster 和视觉风格
- **多种胜利模式**：Elimination（摧毁所有关键建筑）/ Survival（防守计时）
- **完整战役存档系统**：Save/Load 持久化领土控制、单位数量、聚合点
- **AI Director**：脚本化建设顺序、威胁评估、攻击阈值判定（无作弊资源）
- **布料模拟**：步兵披风实时风力物理，增加战场动感
- **战术网格覆盖层**：可选地形网格辅助距离判断

## 目录结构

```
app/controllers/   输入处理、VFX 触发
app/core/          引擎循环、关卡编排、状态转换
game/core/         ECS 原语、组件定义、世界状态
game/systems/      每帧逻辑（Movement/Combat/AI/Production）
game/map/          关卡加载、胜利条件解析
game/units/        兵种类型工厂、属性定义
render/gl/         OpenGL 封装（Shader/Buffer/VAO）
render/entity/     单位/建筑/特效渲染器类
render/ground/     地形网格、战术网格覆盖
render/humanoid/   骨骼动画 + 布料物理
ui/qml/            Qt Quick 组件（HUD/Menu/Dialog）
tests/             GTest 单元和集成测试
assets/data/       JSON 配置（兵种/国家/规则）
assets/shaders/    GLSL 源码
```

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **ECS 架构** | 数据与逻辑分离，组件连续存储保证缓存命中，公司休闲游戏可参考 ECS 简化 AI/渲染耦合 |
| **布料物理** | 程序化 Wind + Leg Collision 布料模拟，可用于 ARPG 角色披风/裙摆 |
| **数据驱动兵种/国家系统** | JSON Override 机制使游戏平衡调整无需重编，适合公司快速迭代的休闲游戏 |
| **战术网格覆盖层** | RTS/棋牌类游戏可选网格辅助判断，Unity UI Overlay 可实现 |
| **AI Director 无作弊设计** | AI 仅通过威胁评估 + 阈值判定决策，不给额外资源，维护公平性同时保证挑战性 |
| **Save/Load 架构** | 序列化完整世界状态，可用于公司游戏存档系统设计参考 |
| **多 Pass 渲染管线** | 地形→实体→特效分层渲染，便于针对不同类型内容做 Draw Call Batching 优化 |
| **Qt6 + OpenGL 分离** | Qt 处理 UI，OpenGL 处理 3D，适合桌面休闲 RTS/策略游戏技术选型 |
