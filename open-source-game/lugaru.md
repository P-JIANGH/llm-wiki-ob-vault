---
title: Lugaru HD
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, third-person-action, fighting]
sources: [raw/articles/lugaru-wolfire-2026.md]
---

# Lugaru HD

> 跨平台 3D 动作游戏，主角 Turner 是一只精通战斗的兔人，踏上对抗狼族阴谋的旅程。

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/WolfireGames/lugaru |
| 语言 | C++ (84 源文件, ~38K LOC) |
| 构建系统 | CMake 3.5+ |
| 渲染/引擎 | OpenGL + SDL2 |
| 许可 | GPLv2+ (源码) / CC BY-SA 3.0 & 4.0 (资产) |
| 版本 | 1.3.0-dev |
| Stars | 41 |
| 主开发地 | GitLab (osslugaru) |

## 核心技术点

### 模块化子系统架构

源码按功能模块化分层，`Source/` 下包含：

| 模块 | 职责 |
|------|------|
| `Animation/` | 骨骼动画系统（Skeleton/Joint/Muscle/Animation） |
| `Audio/` | OpenAL 音频封装 + Sounds |
| `Devtools/` | 控制台命令系统（ConsoleCmds） |
| `Environment/` | 地形（Terrain）、天空盒（Skybox）、光照（Lights） |
| `Graphic/` | OpenGL 渲染：模型/纹理/文字/精灵/立体声/贴花 |
| `Level/` | 战役（Campaign）、对话（Dialog）、奖励（Awards）、热点（Hotspot） |
| `Math/` | 视锥体裁剪（Frustum）、3D 向量（XYZ）、随机数 |
| `Menu/` | 主菜单 UI |
| `Objects/` | 游戏对象基类 + Person（角色）+ PersonType（AI类型）+ Weapons |
| `Platform/` | 跨平台抽象层（Unix/Windows） |
| `Thirdparty/` | optionparser (命令行参数解析) |
| `User/` | 账户系统（Account）、设置（Settings） |
| `Utils/` | 文件夹/图像IO/输入/数据包（pack/unpack） |

### 骨骼动画系统

- `Skeleton.hpp/cpp` — 骨骼结构管理
- `Joint.hpp/cpp` — 关节节点
- `Muscle.hpp/cpp` — 肌肉/权重系统
- `Animation.hpp/cpp` — 动画状态机（animCurrent/animTarget 插值 + frameCurrent/frameTarget 帧插值）

角色动画通过 **双层插值** 实现平滑过渡：
1. **动画间插值**：animCurrent ↔ animTarget 按速度混合
2. **帧间插值**：frameCurrent ↔ frameTarget 插值

### 角色 AI 有限状态机

`Person.hpp` 定义了 9 种 AI 状态类型：
```
passivetype / guardtype / searchtype / attacktype / attacktypecutoff
playercontrolled / gethelptype / getweapontype / pathfindtype
```

`Person` 继承自 `enable_shared_from_this<Person>`，支持 `std::shared_ptr` 循环引用管理。

### 武器系统

`Weapons.hpp/cpp` — 独立武器系统，支持多种冷兵器。

### 物理系统

- 地形系统 `Terrain`：程序化地形高度图
- 碰撞检测：`Person` 的 `bloodloss`、`damage`、`dead` 状态机（0=存活，1=昏迷，2=死亡）
- `XYZ` 3D 向量数学库

### 跨平台

`Platform/Platform.hpp` — 统一抽象层，`PlatformUnix.cpp` / `PlatformWindows.cpp` 实现分离。

## 玩法特点

- **第三人称动作格斗**：兔人 Turner 对抗狼族阴谋
- **战役模式**：`Data/Campaigns/` 数据驱动战役
- **对话系统**：`Data/Dialogues/` 驱动剧情
- **地图系统**：`Data/Maps/` 包含地图数据和关卡
- **实时阴影/天空盒**：OpenGL 渲染管线

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 骨骼动画插值 | 双层插值（动画间+帧间）可用于角色动画平滑过渡，AI 行为状态切换同样可复用此插值模式 |
| AI 状态机 | 9 种行为类型的状态机，适合作为 AI NPC 行为决策的参考架构 |
| 共享指针循环引用 | `enable_shared_from_this` 管理 Person 对象生命周期，可参考用于 AI Agent 对象池 |
| 物理/碰撞 | `XYZ` 向量库 + 简单的碰撞状态系统，适合轻量级物理验证 |
| 数据驱动设计 | Data/ 下 Animations/Maps/Campaigns/Dialogues 完全数据分离，运行时加载 |
| 跨平台抽象 | Platform 层分离 Unix/Windows 实现，适合多后端 AI 环境适配 |

## 相关 Wiki 页面

- [[openrw]] — GTA III 重实现，同为 3D 动作游戏
- [[openlara]] — 古墓丽影引擎重实现，3D 动作参考
- `open-source-game/croft-engine` — Tomb Raider 1 引擎，3D 引擎架构参考

