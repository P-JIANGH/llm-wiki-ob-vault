---
title: Minosoft
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, minecraft-client, kotlin, java, protocol-implementation]
sources: []
---

# Minosoft

> Minecraft 客户端完全从零重写（Kotlin/Java），支持 1.7-1.20.4 多版本协议兼容。

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/bixilon/minosoft |
| 语言 | Kotlin (~27K LOC) + Java (~257 LOC) |
| 构建系统 | Gradle (Kotlin DSL), Kotlin 2.3.0 |
| 渲染 | 自研 OpenGL 3.3+ 渲染器 |
| 许可 | GPLv3 |
| 仓库 | GitLab (镜像) |

## 核心技术点

### 三模块架构

Minosoft 由三个核心模块组成：

1. **Core（核心）** — 不依赖其他模块，包含网络（Netty）、账号管理、实体逻辑、物理引擎等核心功能。
2. **Eros（GUI）** — MVC 设计模式的主界面，用于启动器和服务器列表。
3. **Rendering（渲染）** — 完全独立于 Eros，仅依赖 Core。事件驱动抽象设计，负责所有可视化内容（方块、实体、HUD、粒子、光照等）。

### 网络层（Networking）

- 基于 **Netty** 构建
- 每个数据包独立类，所有数据手动从 Buffer 读取（保证多版本兼容）
- 版本兼容范围：Minecraft 1.7 ~ 1.20.4
- 每个数据包需包含版本检查（`if(versionId >= V_1_19)`），有根本性变化的版本有独立 Legacy Packet
- Handle 函数触发事件系统，支持 MOD 或其他模块监听

### 版本数据与资源

- 方块/物品等属性硬编码在客户端中
- 数据缺失时，通过 **PixLyzer**（配套工具）按需下载并加载
- 资产（Minecraft JAR）从 Mojang 直接下载，zstd 压缩存储
- 纹理和模型从原版 JAR 提取，原版代码**从不执行**
- 支持资源包（Resource Packs）加载

### 渲染架构

- OpenGL 3.3+ 驱动的自研渲染器
- 事件/watcher 驱动，非常动态化
- 支持特性：方块/实体/方块实体（HUD/GUI/物品栏/告示牌等）/粒子/方块光照+天空光照/世界交互（放置/破坏/挖掘）
- 文档：`doc/rendering/ReadMe.md`

### 其他特性

- Headless 模式（无 GUI 纯核心运行）
- 多账号管理
- 单进程多服务器连接
- 多线程 + 异步加载
- LAN 服务器
- 协议层调试（Debugging on protocol layer）
- 独立 Modding 体系
- 自研 flat world 单机测试用

## 玩法特点

- 作为 Minecraft **客户端替代品**运行，可连接任何 Minecraft 服务器（1.7-1.20.4）
- 可用于速通（speedrun），完整原版替代
- 教育版：`education` 分支有最小化教育版

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 多版本协议兼容 | 手动 Buffer 读取 + 版本分支 IF 判断模式，可复用于其他协议层重实现 |
| 三层模块解耦 | Core/Eros/Rendering 分离架构，渲染不依赖 GUI，可复用于编辑器+运行时分离 |
| 事件驱动渲染 | watcher/event-driven 渲染架构，UI 和逻辑完全解耦 |
| 资产管线 | zstd 压缩 + hash 去重 + 按需下载，AI 游戏资源管线可参考 |
| Netty 网络 | 高性能网络框架选型，AI 游戏多人同步可参考其数据包类设计 |
| Headless 模式 | 无头运行能力，AI Agent 控制游戏时不需要渲染界面 |

## 关键文件

- `doc/Architecture.md` — 架构文档
- `doc/Physics.md` — 物理引擎说明
- `doc/rendering/ReadMe.md` — 渲染系统详细说明
- `doc/Assets.md` — 资源管理说明
- `doc/Headless.md` — 无头模式说明
- `doc/Performance.md` — 性能优化说明
- `build.gradle.kts` — Gradle Kotlin DSL 构建配置
- `src/main/java/de/bixilon/minosoft/` — 核心源码目录（protocol/physics/rendering/entities/gui/等）

## 相关页面

- [[open-source-game/minecraft-client-comparison]] — Minecraft 客户端开源复刻对比
- [[open-source-game/openmw]] — OpenMW（ Morrowind 引擎重实现，同为清洁室重实现参考）
