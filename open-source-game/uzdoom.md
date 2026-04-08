---
title: UZDoom
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, source-port, doom, rendering, scripting]
sources: [https://github.com/UZDoom/UZDoom]
---

# UZDoom

> 现代功能增强型 DOOM 源码端口，ZDoom/GZDoom 的直接延续，支持 OpenGL/Vulkan 硬件渲染和 ZScript 脚本系统

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/UZDoom/UZDoom |
| 语言 | C++ (约 592K LOC / 1178 文件) |
| 构建系统 | CMake + vcpkg |
| 渲染器 | 双渲染器：hwrenderer (OpenGL/Vulkan) + swrenderer (软件渲染) |
| 许可 | GPLv3+ |
| 前身 | ZDoom → GZDoom → UZDoom |
| 平台 | Windows / Linux / macOS |

## 核心技术点

### 双渲染器架构

```
src/rendering/
├── hwrenderer/      # 硬件渲染器 (OpenGL/Vulkan)
│   ├── scene/       # 3D 场景渲染
│   ├── hw_models.cpp # 模型渲染
│   └── doom_aabbtree.cpp # 加速结构
├── swrenderer/      # 软件渲染器 (传统 DOOM 风格)
│   ├── drawers/      # 软件绘制程序
│   ├── scene/        # 软件场景
│   ├── textures/     # 纹理采样
│   └── things/       # sprite 渲染
└── r_sky.cpp        # 天空渲染
```

关键设计：**双渲染器并存**，允许用户在高分辨率硬件渲染和传统软件渲染之间切换。hwrenderer 使用现代 GPU 特性（动态光照、3D 模型），swrenderer 则保持 1993 年原版像素风格。

### ZScript 虚拟机

```
src/scripting/
├── backend/         # ZScript 字节码后端
├── decorate/        # DECORATE actor 定义解析
├── zscript/         # ZCC 编译器核心
│   └── zcc_compile_doom.cpp
├── thingdef_*.cpp   # Actor/属性/状态机定义
└── vmthunks_*.cpp   # VM C++ 交互边界
```

ZScript 是 GZDoom/UZDoom 的核心创新——一个 C风格但图灵完备的脚本语言，编译为自定义虚拟机字节码：
- **Actor 类系统**：所有游戏实体（武器、怪物、道具）都是继承自 `AActor` 的类
- **状态机**：原生支持状态标签 (`Spawn`, `See`, `MeleeAttack`, `Death`, 等)
- **属性/方法**：通过 `Property` 和 `Action` 宏注册
- **确定性**：VM 保证跨平台一致性

### Actor/Playsim 系统

```
src/playsim/         # 游戏逻辑模拟 (~71 文件)
├── actor.h          # AActor 基类
├── a_action.cpp     # A_ 开头的动作函数
├── a_pickups.cpp    # 拾取物逻辑
├── a_dynlight.cpp   # 动态光照
├── bots/            # BOT AI 系统
└── fragglescript/   # FraggleScript (另一脚本语言)
```

`AActor` 是所有游戏实体的基类，约 128K+ 行状态机数据驱动（类似 Doom 的 info.c），但通过 DECORATE/ZScript 完全数据化而非硬编码。

### 模块化游戏数据

```
src/gamedata/        # 游戏数据解析 (~32 文件)
├── info.cpp/h       # 经典 Doom info.c 的 C++ 重实现
├── d_dehacked.cpp   # DEHACKED 补丁支持
├── g_mapinfo.cpp    # MAPINFO 配置解析
├── textures/        # 纹理/贴图定义
└── decallib.cpp     # 弹痕/装饰物库
```

**与原始 Doom 的最大区别**：游戏逻辑完全数据驱动，WAD 文件中的 DEHACKED/ZScript/DECORATE 可以完全重写任何 actor 行为，无需修改引擎代码。

### 数据驱动 IWAD/游戏支持

```
wadsrc/              # 内部 WAD 源码（构建时编译为内部资源）
```

通过 `vcpkg.json` 管理依赖：`SDL2`, `libvpx`, `openal-soft`, `gtk3`, `glib` 等。

### 关键架构决策

1. **命名系统** (`namedef.h`)：全局名称表（NamePool），所有符号（类名、属性名、函数名）统一注册，支持运行时反射
2. **序列化框架**：支持存档/读档，通过 `Serialize()` 方法遍历所有游戏状态
3. **平台抽象层**：`posix/`, `win32/` 子目录处理平台差异，SDL2 跨平台音频/窗口
4. **确定性承诺**：同一存档、同一seed → 跨平台完全一致的结果

## 玩法特点

- **高分辨率渲染**：突破原版 320×200 限制，支持任意分辨率
- **动态光照**：场景级动态光、点光源、actor 发光
- **3D Floor/Midtex**：解决原版 DOOM 无法处理垂直重叠空间的限制
- **丰富 mod 支持**：ZScript/DECORATE/ACS 三大脚本系统，mod 社区极其活跃
- **多游戏支持**：兼容 Doom / Doom II / Heretic / Hexen / Strife 等多种 IWAD
- **多人网络**：原版 IPX 协议之外，支持 TCP/IP 现代网络

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **多渲染器切换** | 单一代码库支持多种画质级别（高配硬件渲染 vs 低配软件渲染），适合适配不同设备 |
| **数据驱动实体系统** | Actor 类系统 + ZScript 脚本完全分离代码和内容，设计师可直接改游戏行为而不动 C++ |
| **脚本语言设计** | ZScript VM 的图灵完备性 + 限制性设计（安全沙箱）是 AI Agent 执行游戏逻辑的好参考 |
| **确定性网络同步** | Playsim 的帧一致设计对多人游戏 AI 的状态同步有参考价值 |
| **大规模代码库管理** | 1178 文件 / 592K LOC 的模块化组织（src/rendering, playsim, gamedata, scripting 分离）是大型游戏引擎范本 |
| **跨平台抽象** | posix/win32 分离 + SDL2 是跨平台游戏引擎的标准模式 |
