---
title: Rigel Engine
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, reimplementation, reverse-engineering, duke-nukem, platformer]
sources: [https://github.com/lethal-guitar/RigelEngine]
---

# Rigel Engine

> Duke Nukem II 清洁室重实现 — 现代 C++ 重写，逆向工程驱动，零原始源码依赖。

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/lethal-guitar/RigelEngine |
| 语言 | C++17 |
| 构建系统 | CMake 3.13+ |
| 渲染 | SDL2 + OpenGL 3.0 / OpenGL ES 2.0（编译选项切换） |
| 音频 | SDL_mixer |
| UI | ImGui |
| 许可 | GPLv2 |
| 平台 | Windows / Linux / macOS / Steam Deck / Raspberry Pi / PS Vita |
| Web | Emscripten 编译为 WASM，提供[网页版](https://rigelengine.nikolai-wuttke.de/) |
| 版本 | v0.9.1 |
| 规模 | ~45K LOC |

## 核心技术点

### 清洁室逆向工程
原始游戏从未发布源码，项目基于反汇编（disassembly）二进制重建。见 [Duke2Reconstructed](https://github.com/lethal-guitar/Duke2Reconstructed) 的完整代码重建。RigelEngine 是独立重实现，读原始游戏数据文件（NUKEM2.CMP）作为 drop-in 替代品。

### 模块化架构
```
src/
├── engine/          # 核心引擎系统（渲染/物理/粒子/精灵）
├── game_logic/      # 游戏逻辑（敌人AI/玩家/关卡）
│   ├── enemies/     # 各类敌人行为
│   ├── player/      # 玩家控制
│   ├── hazards/     # 危险物（陷阱等）
│   └── interactive/ # 可交互物体
├── game_logic_classic/  # 经典模式游戏逻辑
├── game_logic_common/   # 通用游戏逻辑
├── frontend/        # 前端UI（开始菜单等）
├── renderer/       # 渲染器
├── ui/             # UI组件（选项菜单/文字输入/电影播放）
├── sdl_utils/      # SDL封装
└── assets/         # 资产处理
```

### 组件化实体系统
- `base_components.hpp`：基础组件
- `physical_components.hpp`：物理组件（刚体/速度/碰撞体）
- `visual_components.hpp`：视觉组件（精灵/特效）
- `life_time_components.hpp`：生命周期组件
- `damage_components.hpp`：伤害系统组件
- `entity_factory.cpp` + `entity_configuration.ipp`：实体配置与创建

### ECS 风格的系统分离
- `physics_system.cpp`：物理系统
- `entity_activation_system.cpp`：实体激活系统
- `behavior_controller_system.cpp`：AI行为控制
- `effects_system.cpp`：特效系统
- `damage_infliction_system.cpp`：伤害判定系统

### 渲染架构
- 双渲染路径：`USE_GL_ES=ON` 切换 OpenGL 3.0 ↔ OpenGL ES 2.0
- `sprite_rendering_system.cpp`：精灵渲染
- `map_renderer.cpp`：贴图地图渲染
- `graphical_effects.cpp`：视觉特效

### 数据驱动
- 原始游戏数据文件驱动（NUKEM2.CMP + NUKEM2.F1~F5）
- 启动时自动检测/导入原版存档、高分榜、设置

### 依赖管理
- CMake FetchContent 或 ExternalProject
- 日志：loguru（单头文件库）
- 无游戏引擎依赖（裸 SDL2 + OpenGL）

## 玩法特点

Duke Nukem II 是经典 2D 平台射击游戏（1993 Apogee）：
- 四个关卡（shareware + registered）
- 多方向移动 + 武器射击
- 收集物品、解除陷阱
- 电影过场动画（NUKEM2.F1~F5）
- Mod 支持 + 扩展地图

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 复古游戏重实现 | 清洁室逆向范式——完全重写不依赖源码，但读原始数据文件，对理解"游戏克隆"合法边界有价值 |
| 组件化游戏逻辑 | ECS 风格架构（components + systems 分离），适合 AI 驱动的游戏逻辑注入 |
| 数据文件抽象 | 将原始游戏数据作为唯一资产依赖，可用于 AI 内容生成管线的验证基准 |
| 多渲染后端 | OpenGL/GLES 切换编译选项，适合移动端或 Web 端的 AI 推理可视化需求 |
| 维护模式项目 | 项目创始人已转入维护模式，适合研究成熟开源项目的长期维护策略 |

## 相关链接

- [Duke2Reconstructed](https://github.com/lethal-guitar/Duke2Reconstructed) — 完整源码重建
- [Architecture Overview Wiki](https://github.com/lethal-guitar/RigelEngine/wiki/Architecture-overview)
- [Steam Deck 安装指南](https://github.com/lethal-guitar/RigelEngine/wiki/Steam-Deck-setup)
- [第三方 Linux 构建](https://github.com/lethal-guitar/RigelEngine/wiki/Third-party-Linux-builds)
