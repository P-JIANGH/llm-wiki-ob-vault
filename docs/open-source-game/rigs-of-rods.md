---
title: Rigs of Rods
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, physics-sandbox, soft-body, vehicle-simulation]
sources: [https://github.com/RigsOfRods/rigs-of-rods]
---

# Rigs of Rods

> 开源软体物理沙盒，支持车辆/飞机/船舶的实时形变仿真

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/RigsOfRods/rigs-of-rods |
| 语言 | C++11 |
| 构建系统 | CMake ≥ 3.16 |
| 渲染引擎 | OGRE 1.11.6.1（经典版，非 OGRE 3） |
| 音频 | OpenAL ≥ 1.18 |
| UI 框架 | MyGUI 3.4.0 |
| 脚本 | AngelScript 2.35.1 |
| 许可 | GPLv2 or later |
| 最新版本 | 2026.01 |
| 开始时间 | 2005 年，2009 年开源 |
| 贡献者 | Petr Ohlidal 等 |

## 核心技术点

### 软体物理系统（Core Innovation）

Rigs of Rods 的核心差异化在于**实时软体物理仿真**，车辆（尤其是卡车/工程车辆）能够模拟车架、悬挂、轮胎的柔性形变：

- `Actor.cpp`（5088 行）— 核心物理 Actor 实现，处理刚体节点网络
- `ActorSpawner.cpp`（7529 行）— 车辆生成与节点/梁/弹簧配置解析
- `ActorForcesEuler.cpp`（1853 行）— 欧拉积分力学求解器
- `SlideNode.cpp`（255 行）— 滑动节点仿真（关节/悬挂系统）
- 物理数据文件格式（.terrn, .truck）定义节点坐标+梁属性+弹簧刚度+阻尼

### 模块化子系统架构

```
source/main/
├── physics/        # 物理仿真核心（Actor/Manager/Spawner/Forces）
├── gameplay/       # 游戏逻辑（Engine/TorqueCurve/Differentials/VehicleAI）
├── terrain/        # 地形系统（地形加载、植被、天气）
├── gfx/            # 渲染（OGRE 集成）
├── audio/          # OpenAL 音频
├── network/        # SocketW 多人大厅
├── scripting/      # AngelScript VM
├── gui/            # MyGUI UI 层
└── system/         # 系统工具
```

### 车辆动力学实现

- `Differentials.cpp/h` — 差速器物理（齿轮组扭矩分配）
- `Engine.cpp` — 引擎扭矩曲线（`TorqueCurve.cpp` 解析 .eng 文件）
- `TyrePressure.cpp` — 轮胎压力仿真
- `CmdKeyInertia.cpp` — 操控输入惯性平滑
- `VehicleAI.cpp` — 自动驾驶 AI（寻路+反应）

### 数据驱动设计

车辆和地形全部由数据文件定义，游戏逻辑与渲染/物理完全解耦：
- `.truck/.vehicle` — 车辆描述（节点+梁+悬挂参数）
- `.terrn` — 地形描述（高度图+对象放置）
- `.eng` — 引擎扭矩曲线
- 大量 mod 社区资源，2022.04 后支持游戏内下载

## 玩法特点

- **物理沙盒**：进入/退出车辆、生成多辆车、步行探索
- **支持载具**：汽车、卡车、火车、船舶、飞机、直升机、工程机械
- **操控方式**：键盘（街机风格）→ 手柄 → 方向盘 + 踏板（全真实设备）
- **多人**：专用服务器 + 游戏内服务器浏览器
- **脚本**：AngelScript 实现 AI、竞赛、服务器 mod

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 软体物理 | 车辆形变实时仿真的节点-弹簧系统是独特竞争力，可考虑用于特殊载具表现 |
| 数据驱动架构 | .truck 格式完全解耦物理与渲染，新增车辆无需改代码——这对 AI 生成车辆适配有参考价值 |
| 确定性物理 | 物理仿真结果跨客户端同步（多人模式），其帧同步机制可用于 AI 驾驶仿真 |
| OGRE 1.11 | 项目选型偏保守（未迁移 OGRE 3），这对评估引擎升级风险有参考 |
| AngelScript 脚本 | 相比 Lua，AngelScript 语法更接近 C++，适合游戏逻辑脚本化 |
| 社区生态 | 软体物理 + 开放 mod 资产是留住用户的核心，商业化路径可参考 |
