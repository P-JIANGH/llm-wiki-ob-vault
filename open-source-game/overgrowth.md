---
title: Overgrowth
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, third-person, action, stealth]
sources: [https://github.com/WolfireGames/overgrowth]
---

# Overgrowth

> Lugaru 续作，3D 动作冒险游戏，含潜行/战斗/平台跳跃。代码开源（需商业版游戏数据才能运行）。

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/WolfireGames/overgrowth |
| 语言 | C++ (~227K LOC，995 源文件) |
| 构建系统 | CMake（多平台：Windows/macOS/Linux） |
| 渲染/引擎 | 自研引擎，SDL2 + OpenGL |
| 许可 | Apache 2.0（极宽松，可闭源商用） |
| 依赖 | Bullet Physics、AngelScript、Recast Navigation、SDL2、OpenAL、imgui |
| 前作 | Lugaru HD |

## 核心技术点

### 组件式实体系统
- `Component` 基类（`component.h`）：定义 `SetFromDescription`（XML加载）、`SaveToXML`（序列化）、`ReceiveObjectMessage`（消息总线）三件套
- `EntityDescription` XML 驱动数据加载，无需硬编码对象类型
- 对象类型包括：`movementobject`（角色）、`itemobject`（物品）、`envobject`（环境）、`hotspot`（触发器）、`navmeshregionobject`（导航区域）、`lightprobeobject`（光照探针）、`decalobject`（贴花）等

### 自研 3D 渲染引擎（Graphics/）
- `model.cpp/h` — 骨骼动画模型渲染（支持 `.retarget` 动画重定向文件）
- `skeleton.cpp/h` — 骨骼系统（ikbone.h 逆运动学）
- `textures.cpp/h`、`textureatlas.cpp/h` — 纹理管理 + Atlas 节点树合批
- `shaders.cpp/h` — GLSL Shader 管理
- `terrain.cpp/h` — 地形渲染（heightmap）
- `particles.cpp/h` — 粒子系统
- `lightprobecollection.hpp` — 光照探针采集（IBL）
- `dynamiclightcollection.hpp/.cpp` — 动态光源
- `drawbatch.cpp/h` — 绘制批次合并
- `csg.cpp/h` — CSG（构造实体几何）布尔运算
- `navmeshrenderer.cpp/h` — 导航网格可视化调试

### 物理系统（Physics/）
- Bullet Physics 集成（`bulletworld.cpp/h`、`bulletcollision.cpp/h`、`bulletobject.cpp/h`）
- Recast Navigation 导航网格（`navmesh.cpp/h`、`input_geom.cpp/h`）用于 AI 寻路
- 物理对象通过 `bulletobject.cpp` 与 ECS 对象系统桥接

### 脚本系统（Scripting/）
- AngelScript 集成（`angelscript/` 子目录），游戏逻辑完全脚本化
- `scriptfile.cpp/h` — 脚本加载管理
- `characterscript.cpp/h` — 角色行为脚本
- `attackscript.cpp/h` — 攻击动作脚本
- 脚本通过 `scriptparams.cpp` 与引擎交互

### 网络系统（Network/ + Online/）
- 双层网络架构：
  - `Network/Basic/` — 基础 Socket 连接（`net_framework.cpp/h` 帧同步框架）
  - `Network/Steam/` — Steam P2P 传输层（GameNetworkingSockets）
  - `Online/` — 大厅/匹配/文件传输（`online_client_connection_manager.cpp/h`）
- `asnetwork.cpp/h` — AngelScript 网络 API 绑定
- `time_interpolator.cpp/h` — 客户端时间插值（平滑同步）

### 数学库（Math/）
- 手写 SIMD 矩阵（`simd_mat4.cpp/h`）
- 四元数/欧拉角/矩阵全套（`quaternions.cpp/h`、`mat3.cpp/h`、`mat4.cpp/h`）
- `enginemath.cpp/h` — 引擎数学基础

### 关卡编辑器（Editors/）
- 内置关卡编辑器，数据驱动
- 关卡信息：`levelinfo.cpp/h`、关卡层 `detailobjectlayer.cpp/h`
- Prefab 预制件系统（`prefab.cpp/h`）

### 数据格式
- XML 驱动：对象描述（`EntityDescription`）、关卡配置、动画数据
- JSON 配置：`JSON/` 子系统处理游戏配置
- 自定义资源格式（`Asset/`）

### 第三方库（vendored in Libraries/）
| 库 | 用途 |
|----|------|
| Bullet | 物理模拟 |
| AngelScript | 游戏脚本 VM |
| Recast/Detour | 导航网格 |
| imgui | Editor UI |
| SDL2 | 窗口/输入 |
| OpenAL | 音频 |
| libvorbis/libogg | 音频解码 |
| protobuf | 网络序列化 |
| GameNetworkingSockets | Steam P2P |
| OpenVR | VR 支持 |
| zstd | 数据压缩 |
| stb | 通用工具库 |

## 玩法特点

- 第三人称动作冒险：潜行暗杀 + 正面战斗 + 平台跳跃
- 主角是变异鼠人（wolverine-like），擅长近战和攀爬
- 丰富的物理交互：可拾取投掷物体、环境破坏
- 程序化关卡叙事 + 预设战役
- 关卡内置编辑器支持 mod 创作
- 多人模式支持（局域网/Steam P2P）

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| ECS 架构 | Component 基类 + XML 数据驱动，实体类型与逻辑完全解耦，比 Unity Component 更轻量直接 |
| 自研渲染引擎 | SDL2 + OpenGL 绕过游戏引擎，是做定制化渲染（卡通/体素/特殊风格）的低成本路径 |
| AngelScript 脚本 | 比 Lua 更强类型，游戏逻辑完全脚本化，逻辑/渲染分离清晰 |
| 导航系统 | Recast + Bullet 物理集成，角色 AI 寻路与物理碰撞分层设计 |
| 网络同步 | 帧同步框架 + 时间插值，MMO/多人动作游戏可借鉴 |
| 工具链 | ImGui 内置编辑器 UI，工具与游戏共享渲染/数学库 |
| 许可策略 | Apache 2.0 允许闭源商用，代码可复用，学习价值极高 |
| Mod 支持 | 数据驱动 + 脚本化，mod 社区活跃度取决于工具开放程度 |

## 架构亮点

```
Source/
├── Game/          # 游戏逻辑（角色、物品、关卡、AI 行为）
├── Graphics/      # 自研 3D 渲染引擎
├── Physics/       # Bullet 物理 + Recast 导航
├── Scripting/      # AngelScript VM + 游戏逻辑绑定
├── Network/        # 帧同步网络框架（Socket/Steam P2P）
├── Online/         # Steam 大厅/匹配/文件传输
├── AI/             # 导航网格 + 寻路算法
├── Editors/        # 内置关卡编辑器
├── Sound/          # OpenAL 音频
├── Math/           # 手写 SIMD 数学库
├── Ogda/           # 数据描述语言/序列化系统
└── Wrappers/       # OpenVR/Steam SDK 薄封装
```

**总 LOC**: ~227K（C++ 178K + Headers 49K），995 个源文件，成熟度非常高。
