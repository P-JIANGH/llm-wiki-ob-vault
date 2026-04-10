---
title: re3
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, reverse-engineering, gta, action-adventure]
sources: [raw/articles/open-source-games-list-2026.md]
---

# re3

> GTA III 完全逆向工程重实现 — 通过"Theseus之船"渐进式替换策略，保留原版游戏数据实现可运行游戏

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/VideogameSources/gta3-decomp-alt |
| 语言 | C / C++ |
| 构建系统 | CMake 3.8+（Linux/macOS）+ premake5（Windows Visual Studio） |
| 渲染/引擎 | librw — 纯自研 RenderWare 替代渲染引擎，支持 D3D9 / OpenGL 3.3 / GLFW |
| 许可 | 源码开源（需持有原版 GTA III 游戏数据） |
| 平台 | Windows (Direct3D9 / OpenGL 3.3)、Linux、FreeBSD |
| 关键依赖 | librw（vendor 子模块），OpenAL 音频 |

## 核心技术点

### Theseus之船逆向策略
项目采用独特的"渐进式替换"而非一次性重写：通过逐文件逐类替换原版游戏代码，确保任何时候都拥有可运行的完整游戏。每替换一个组件，原有部分仍能正常工作。这种方法降低了风险，保留了原有架构的完整性。

### librw 自研渲染引擎
完全从零实现 RenderWare 图形子系统的替代品：
- **跨平台渲染抽象**：D3D9 / OpenGL 3.3 双后端自动切换
- **文件格式支持**：支持多平台（PC/PS2/Xbox/Android）的 GTA III 资源格式
- **raster/texture 处理**：TXD 文件解析（仍在完善，特别是 PS2 格式）
- 作为 git submodule 独立维护，可通过 `LIBRW` 环境变量指定外部路径

### 20 子系统模块化架构

| 子系统 | 功能 |
|--------|------|
| `animation/` | 骨骼动画系统 |
| `audio/` | 音频逻辑（AudioLogic.cpp 8670 行最大文件） |
| `collision/` | 碰撞检测 |
| `control/Script.cpp` | 脚本控制（CM Cleo 风格?） |
| `core/` | 核心：Streaming/Camera/World/Pools/Config |
| `entities/` | 游戏实体基类 |
| `fakerw/` | RenderWare 替代层 |
| `math/` | 数学库 |
| `modelinfo/` | 模型信息管理 |
| `objects/` | 静态物体 |
| `peds/` | Ped AI + Ped 实体（PedAI.cpp 5412 行） |
| `render/` | HUD / 粒子 / 光照 / 阴影 / 水面渲染 |
| `rw/` | librw 核心实现 |
| `save/` | 存档系统 |
| `skel/` | 骨骼系统 |
| `text/` | 文本/本地化 |
| `vehicles/` | 载具物理与处理（Automobile.cpp 4718 行） |
| `weapons/` | 武器系统 |

### 代码规模
- **src/ cpp 文件**：228 个
- **src/ h 文件**：239 个
- **最大源文件**：AudioLogic.cpp (8670行)、Ped.cpp (8510行)、Frontend.cpp (6230行)、PedAI.cpp (5412行)
- **src/ 总计**：约 188K 行

### 平台特定处理
- `CdStreamPosix.cpp` — Linux/BSD 文件流抽象
- `Frontend_PS2.cpp` — PS2 特有前端代码（移动版遗留代码）
- 移动端残留：NameGrid / PedDebug / HandlingMgr / CVehicle::ProcessBikeWheel / CAutomobile::DebugCode 等类仅有 PS2/移动端代码
- FIX_BUGS 编译选项：修复原版 bug

### 音频子系统
- Windows：NULL / OpenAL / MSS 三选一
- Linux：NULL / OpenAL
- 通过 CMake `RE3_AUDIO` 缓存变量切换

## 玩法特点

GTA III (2001) 经典体验：
- 第三人称俯视角自由世界动作
- 城市开放世界（Liberty City）
- 驾车/步行/枪战/任务系统
- **需要原版游戏数据**：需持有 Steam GTA III 才能运行

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 渐进式重写策略 | "Theseus之船"而非大爆炸重写——任何时候都可运行、可测试，适合大规模遗留代码现代化 |
| RenderWare 替代渲染 | 自研引擎层抽象化多后端（D3D/OGL），可作为游戏引擎渲染层多平台移植参考 |
| 多平台条件编译 | `#ifdef` 处理 PC/PS2/Xbox/Android 差异——多平台游戏引擎的条件编译管理范式 |
| 子模块独立维护 | librw 作为独立子模块 + 环境变量覆盖策略——游戏引擎模块化依赖管理 |
| 配置驱动常量 | config.h 集中管理池大小(NUMPEDS/NUMVEHICLES等)、多平台差异——数据驱动配置模板 |
| 存档兼容性 | 需原版游戏数据的设计——资产与引擎分离，延长游戏寿命 |
