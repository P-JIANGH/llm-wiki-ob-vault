---
title: Speed Dreams
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, racing-sim, game, fork-of-torcs]
sources: [https://forge.a-lec.org/xavi/speed-dreams-code]
---

# Speed Dreams

> 开源赛车模拟器，TORCS 的成熟分支，支持多版本物理引擎与双渲染器

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub/Gitea | https://forge.a-lec.org/xavi/speed-dreams-code |
| 数据仓库 | https://forge.a-lec.org/speed-dreams/speed-dreams-data/ |
| 语言 | C/C++ (491 cpp + 492 h) |
| 代码规模 | ~286K LOC |
| 构建系统 | CMake 3.5+ |
| 版本 | 2.4.0 |
| 许可 | GPLv2-or-later |
| 起源 | TORCS fork |

## 核心技术点

### 多版本物理引擎架构
Speed Dreams 保留并演进 TORCS 的多版本物理引擎设计，核心迭代路径：

- **simuv2 / simuv2.1** — 早期基础物理
- **simuv3** — 中期改进版本
- **simuv4 / simuv4.1** — 当前主要版本
- **simuv5** — 最新版本（v2.4.0），引入按 AI 水平分级的仿真选项

simuv5 支持 tyre degradation、engine temperature 等高真实度特性，可按驾驶水平（arcade/semi-rookie/rookie/amateur/semi-pro/pro）动态调整仿真精度。

### 双渲染器架构
```
src/modules/graphic/
├── osggraph/   — OpenSceneGraph 渲染器（现代 3D 管线）
└── ssggraph/   — PLIB SSG 渲染器（兼容性备用）
```

两个渲染器并行维护，osggraph 使用 OpenSceneGraph 的现代 3D 渲染管线，ssggraph 提供传统 PLIB SSG 备选。

### 插件化机器人/AI 驱动
```cpp
src/drivers/
├── simplix/    — 主力 AI 驾驶机器人（管理 tyre degradation）
├── shadow/     — Shadow AI，支持雨战
├── usr/        — USR 机器人
├── human/      — 人类玩家接口
├── replay/     — 回放录制
└── networkhuman/ — 网络多人人类
```

机器人通过统一的 `robot.h` 接口（`IRobot`）接入，物理引擎通过 `simu.cpp` 中的 `IRaceEngine` 接口调度。

### 模块化子系统
```
src/modules/
├── simu/       — 物理仿真（多版本引擎）
├── graphic/    — 渲染器
├── racing/     — 赛事管理
├── networking/  — 网络多人（TCP/IP）
├── sound/      — 音频引擎
├── track/      — 赛道加载器
├── userinterface/ — 菜单/UI
├── telemetry/  — 遥测数据
└── csnetworking/ — 客户端-服务端网络
```

### 基础设施库
```
src/libs/
├── tgf/        — 基础工具库（Torcs General Foundamentals）
├── tgfclient/  — 客户端 GUI 框架
├── tgfdata/    — 共享数据结构
├── portability/ — 跨平台抽象层
├── robottools/ — 机器人工具
├── math/       — 数学库
├── ephemeris/  — 星历/天文计算
└── learning/   — 机器学习模块
```

## 玩法特点

- **多车种**: 数十辆高质量赛车
- **多赛道**: 丰富赛道选择（源自 TORCS 的资产）
- **赛事模式**: 单人/多人，支持锦标赛
- **可配置难度**: 通过 simuv5 的分级仿真实现
- **损伤系统**: 碰撞损伤管理（TODO: 改进中）
- **雨战**: 部分 AI 机器人支持雨天比赛

## 与 TORCS 的关系

Speed Dreams 是 TORCS 的活跃分支，保留了 TORCS 的核心架构（多物理引擎、双渲染器、插件式 AI），同时进行了大量独立开发：

| 对比维度 | TORCS | Speed Dreams |
|----------|-------|--------------|
| 维护状态 | 低活跃 | 活跃 (v2.4.0) |
| 物理引擎 | simuv2-v4 | simuv2-v5 |
| 渲染器 | SSG 为主 | OSG + SSG 双渲染器 |
| AI 机器人 | 基础 | 高级（tyre degradation、雨战） |
| 目标用户 | 开发者/研究者 | 终端玩家 |

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **物理引擎分级策略** | simuv5 按 AI 水平动态调整仿真精度——可应用于公司 AI 游戏的难度分级 |
| **多渲染器降级** | OSG/SSG 双渲染器可并行维护——参考 Raze/NakedAVP 的渲染器降级模式 |
| **插件式 AI 接口** | 统一的 `IRobot` 接口允许第三方机器人——可用于公司 AI 游戏的 bot 扩展 |
| **多版本物理引擎共存** | simuv2-v5 同时保留——体现向后兼容与渐进式重构的平衡 |
| **资产与代码分离** | 代码与数据仓库独立，CMake 依赖外部 assets——模块化架构参考 |
| **确定性仿真** | 赛车仿真天然需要确定性——对帧同步/锁步网络有参考价值 |
