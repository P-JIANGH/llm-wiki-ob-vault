---
title: Egregoria
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, city-builder, simulation, rust]
sources: [raw/articles/egregoria-repo-2026.md]
---

# Egregoria

> Cities: Skylines 风格的独立城市建造游戏，聚焦社会经济与物流，每个居民有独立思维模型。

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/Uriopass/Egregoria |
| 语言 | Rust（workspace 13 个 crate） |
| 构建系统 | Cargo |
| 渲染/引擎 | wgpu 自定义 PBR 前向渲染器（SSAO + 级联阴影贴图） |
| 许可 | MIT |
| 平台 | Windows/macOS/Linux |
| 网络 | 确定性锁步（Deterministic Lockstep） |

## 核心技术点

### 架构：模拟与渲染分离
Egregoria 核心是固定时间 tick 更新，整个模拟是纯确定性的。
渲染状态**不**与模拟实体共存——不在 `Road` 结构体中存 `mesh` 字段，而是在渲染侧维护 `HashMap<RoadID, RoadMesh>` 缓存。渲染层完全解耦。

### 确定性锁步网络
与 OpenTTD/Hypersomnia 相同的网络同步模式：
- `WorldCommand` enum 编码所有可能的游戏状态变更
- 纯客户端发送输入，服务端按固定 tick 重放
- 网络模块独立（`networking` crate），与模拟/渲染完全解耦

### 多 crate Workspace 结构
```
simulation/   # 核心模拟逻辑：地图、道路、建筑、经济、居民 AI、运输
engine/       # wgpu 渲染管线：PBR 前向渲染、SSAO、级联阴影
native_app/   # 桌面入口，整合 UI + 渲染 + 音频 + 模拟
headless/     # 无头服务器，只有模拟无 UI
networking/    # 独立网络模块（客户端+服务端）
geom/         # 自定义几何库（向量、矩阵、图元）
common/       # 跨 crate 共享工具
```

### 经济模型
混合 Factorio + 自由市场：
- 内部经济：本地工厂间物资流动不涉及金钱（直接转移）
- 外部市场：政府资金调节（贸易顺差赚钱，短缺花钱）
- 居民思维模型（`simulation/souls`）：每家公司/居民独立决策（就业、购物等）
- 路径规划、停车、行程系统（`simulation/map_dynamic`）

### PBR 渲染管线
- 不透明物体深度预通道（Opaque depth prepass）
- SSAO（屏幕空间环境光遮蔽）+ 深度重建
- 太阳级联阴影贴图（Cascaded Shadow Maps）
- 主前向/颜色通道（世界空间光源，非屏幕空间聚类）
- GLTF 格式加载网格

### Git LFS 资产
- 游戏资产（模型、纹理）使用 Git LFS 存储
- 构建时需要 `git lfs pull` 获取资产文件
- 资产目录：`assets/`、`assets_gui/`

## 玩法特点

- 城市规划 + 道路网络设计
- 居民独立思维：每个人的行为都有意义并影响环境
- 社会经济 + 物流元素
- 多人网络支持（确定性锁步）

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 模拟-渲染分离 | 确定性 tick + 缓存渲染层，完全解耦模拟与表现层，避免游戏逻辑与渲染耦合 |
| 确定性锁步网络 | 纯输入重放模式，适合强一致性要求的实时游戏；与 OpenTTD 架构对比验证 |
| 经济系统设计 | 混合本地/外部市场模型，可作为公司游戏内经济系统的参考原型 |
| 多 crate Rust 架构 | 大型 Rust 项目模块化组织方式，各子系统边界清晰 |
| 居民 AI 模型 | 独立思维 + 行为影响环境的设计思路，可迁移至 AI NPC 行为系统 |

## 相关页面

- [[cytopia]] — 另一款开源城市建造，SDL2 等距渲染
- [[openrct2]] — 确定性锁步网络（与 Egregoria 相同模式）
- [[hypersomnia]] — 确定性锁步网络（游戏端案例对比）

