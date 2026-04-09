---
title: The Dark Mod
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, stealth-fps, thief-inspired, doom3-engine]
sources: [https://github.com/stgatilov/darkmod_src]
---

# The Dark Mod

> 基于 Doom 3 引擎的免费开源潜行 FPS 游戏，灵感来自 Looking Glass《神偷》系列，170+ 社区任务

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/stgatilov/darkmod_src（官方 SVN 的 GitHub 镜像） |
| 原始 SVN | https://svn.thedarkmod.com/publicsvn/darkmod_src/trunk |
| 语言 | C++17（核心）/ C11（部分底层） |
| 构建系统 | CMake 3.14+ |
| 引擎基础 | id Tech 4（Doom 3 分支） |
| 许可 | GPL（源码）；游戏资产 CC BY-NC-SA 3.0 |
| 平台 | Windows（VS2022）/ Linux（GCC 7+）/ macOS |
| 游戏资产 | 独立仓库（darkmod 游戏目录），非 GPL |

## 项目结构

```
darkmod_src/
├── game/          # 游戏逻辑（Actor/AI/Weapon/AF 等，125K+ LOC）
├── framework/     # 引擎框架（CVar/Console/DeclManager 等）
├── renderer/      # 渲染系统（frontend/backend 子目录）
├── sound/         # 音频系统
├── idlib/         # id Tech 底层库（数据结构/容器/数学/压缩）
├── ui/            # UI 系统
├── sys/           # 平台抽象层（win32/linux/osx/posix）
├── tools/         # 编辑器工具
├── tests/         # 测试代码
├── CMakeLists.txt # CMake 主构建文件
└── TheDarkMod.sln # VS2022 解决方案
```

## 核心技术点

### 引擎架构
- **id Tech 4 派生**：继承 Doom 3 的渲染/物理/游戏架构，深度定制
- **C++17 现代标准**：整个引擎使用 C++17 编写（CMakeLists.txt 指定 `CMAKE_CXX_STANDARD 17`）
- **CMake 模块化构建**：sys/cmake/ 下包含 ucm/PrecompiledHeader/SvnVersion 等自定义模块
- **平台抽象层**：sys/ 下分 win32/linux/osx/posix，osx 和 posix 目录表明多平台支持

### 渲染系统
- **frontend/backend 分离架构**：renderer/frontend/ 和 renderer/backend/ 两个子目录
- **GLPROGS 着色器**：glprogs/ 目录存放 GLSL 着色器源码
- **tr_local.h 核心**：渲染器局部头文件定义核心数据结构
- **RenderSystem.cpp**：主渲染系统入口

### AI 系统（特色亮点）
- **AAS（Area Awareness System）**：区域感知系统，路径规划核心
- **AAS_pathing.cpp / AAS_routing.cpp**：A* 路由和路径计算
- **CommunicationSubsystem.cpp**：AI 通信子系统，支持多 AI 协作
- **Conversation/**：AI 对话系统
- **Memory.cpp**：AI 记忆系统
- **EAS/**：某种扩展感知系统

### 物理与实体系统
- **AF（AFEntity）**：Articulated Figure 系统，用于绳索、布料等物理实体
- **BinaryFrobMover**：双向开关门，Thief 风格的机关门
- **BrittleFracture**：易碎物理系统
- **BloodMarker**：血迹标记系统

### 武器系统
- **Weapon.cpp**：~3650 行（最大单个文件），武器实现核心
- **Turret.cpp**：炮塔武器

## 玩法特点

- **潜行为核心**：第一人称视角，潜入暗杀为主要手段
- **170+ 社区任务**：完全由社区创作的任务体系
- **Thief 系列致敬**：光照/阴影/声音为核心玩法维度
- **任务下载器**：内置游戏内任务下载系统
- **地图编辑器支持**：游戏发布时内置地图编辑工具

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **潜行 AI 架构** | AAS 区域感知 + 通信子系统，可作为 AI 潜行逻辑的基础参考 |
| **内存/记忆系统** | AI 的 Memory 系统设计可用于 NPC 记忆和决策 |
| **模块化 CMake** | game/framework/renderer/sound/ui 的清晰模块划分 |
| **资产/代码分离** | 源码 GPL + 资产 CC BY-NC-SA 的双许可证模式 |
| **社区任务生态** | 170+ 任务证明UGC（用户生成内容）生态的可行性 |
| **关卡构建工具链** | MayaImport 插件说明专业资产管道的存在 |

## 构建笔记

- Windows：VS2022 + MFC，输出到 `../darkmod` 目录
- Linux：`mkdir build && cd build && cmake -DCMAKE_BUILD_TYPE=Release .. && make -j`
- 第三方库：ThirdParty/ 下有预编译 artefacts（`TDM_THIRDPARTY_ARTEFACTS=ON`）
- Tracy profiling：`com_enableTracing` cvar 开启性能分析
- ASAN：`cmake -DWITH_SANITIZER=ON ...` 可选地址 sanitizer

## 相关页面

- [open-source-game/doom-3-bfg](#/open-source-game/doom-3-bfg) — 同一引擎祖先
- [open-source-game/eduke32](#/open-source-game/eduke32) — Build 引擎游戏
- [open-source-games-list](#/entities/open-source-games-list) — 开源游戏总览
