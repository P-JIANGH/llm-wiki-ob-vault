---
title: Cytopia
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, city-builder, pixel-art, sdl2, isometric]
sources: [https://github.com/CytopiaTeam/Cytopia]
---

# Cytopia

> 复古像素艺术城市建造游戏，专注于模组支持，自定义 SDL2 等距渲染引擎，纯 C++ 实现。

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/CytopiaTeam/Cytopia |
| 语言 | C++ |
| 构建系统 | CMake 3.16+ + Conan |
| 渲染/引擎 | 自定义 SDL2 等距渲染引擎（非游戏引擎） |
| 许可 | GPL/MIT |
| 平台 | Linux, Windows, Mac |
| 版本 | 0.4 |

## 核心技术点

### SDL2 自定义等距渲染引擎
Cytopia 最核心的技术特点是**完全不使用游戏引擎**，自行基于 SDL2 实现等距（isometric）渲染引擎。`src/engine/` 目录下包含：
- `Map.cxx/hxx` — 等距地图渲染系统
- `Sprite.cxx/hxx` — 精灵/贴图管理
- `TileManager.cxx/hxx` — 瓦片管理器
- `UIManager.cxx/hxx` — 自定义 UI 系统
- `EventManager.cxx/hxx` — 事件处理
- `WindowManager.cxx/hxx` — 窗口管理

这种架构与 [OpenTTD](#/open-source-game/openttd)（自定义 2D 渲染）和 [CorsixTH](#/open-source-game/corsixth)（SDL 渲染原版资源）属于同一类别——**无引擎游戏开发**。与它们的区别是 Cytopia 使用等距视角而非俯视角。

### 数据驱动的 JSON 瓦片系统
游戏内容和逻辑通过 `data/` 目录下的 TileData JSON 文件定义，**完全不需要代码改动即可添加新建筑/地形**。这是与 CorsixTH 的 Lua 数据驱动相同的模式，但使用 JSON：
- 每个瓦片有类型（地形/建筑）、动画帧、成本、维护费用等属性
- `tools/tile-tagger.py` 用于批量编辑瓦片标签
- `tools/` 下还有 Qt 编写的可视化瓦片编辑器（`data/` 目录）

### 程序化地形生成
使用 **libnoise**（Conan 依赖）实现程序化地形生成（`Procedural Terrain Generation`）。与 [Pioneer](#/open-source-game/pioneer) 的程序化银河生成使用噪声函数类似， Cytopia 使用噪声函数生成起伏地形供城市建造。

### 依赖管理：Conan + CMake
```python
# conanfile.py 关键依赖
angelscript/2.37.0      # 脚本语言（计划用于 mod）
libnoise/1.0.0          # 程序化地形生成
sdl/2.32.2               # 渲染基础
sdl_image/2.8.2         # 图像加载
sdl_ttf/2.24.0           # 字体渲染
openal/1.22.2            # 音频
vorbis/1.3.7             # 音频解码
libpng/1.6.47            # PNG 支持
```

### 模块化源码结构

| 目录 | 职责 |
|------|------|
| `src/engine/` | 渲染引擎核心（地图、精灵、瓦片、UI、事件、窗口） |
| `src/game/` | 游戏逻辑（GamePlay、PowerGrid、PowerManager、ZoneArea、ZoneManager） |
| `src/services/` | 服务层（AudioMixer、GameClock、Randomizer、ResourceManager） |
| `src/windows/` | 菜单/界面窗口 |
| `src/scripting/` | 脚本系统（AngelScript，计划支持 mod） |
| `data/` | 游戏数据（TileData JSON、图片资源、音频） |
| `tools/` | 开发工具（Qt 瓦片编辑器、l10n、代码格式化） |

## 玩法特点

- **等距像素艺术城市建造**：类似 SimCity 的城市建造玩法，等距视角
- **三大区域类型**：住宅区（residential）、商业区（commercial）、工业区（industrial）
- **基础设施**：电力网格系统（PowerGrid/PowerManager）
- **程序化地图**：每次游戏可生成不同的地形
- **强大的模组支持**：TileData JSON 完全开放，模组制作者可添加新建筑
- **原创像素艺术**：由 Kingtut 101 领导的美术团队创作的像素图形
- **原创音乐**：MB22 制作的原创配乐和环境音效

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **无引擎开发** | Cytopia 证明纯 SDL2 + C++ 可以构建完整的等距游戏，降低依赖复杂度 |
| **数据驱动架构** | JSON TileData 系统使游戏内容与代码解耦，mod 友好——适合 AI 生成关卡/建筑 |
| **程序化内容** | libnoise 地形生成可与 AI 关卡生成结合，自动创建多样化的地图 |
| **等距渲染器自研** | 自定义等距渲染引擎是可行的，值得作为 AI 游戏的技术基座 |
| **Conan 依赖管理** | Conan + CMake 声明式依赖管理比 vcpkg 更适合 Windows/macOS 多平台项目 |
| **模组生态** | JSON 驱动的 mod 系统使社区可以扩展内容，AI 可生成 valid 的新 JSON 瓦片数据 |

## 类似项目

- [CorsixTH](#/open-source-game/corsixth) — 同样使用 SDL，无引擎，lua 数据驱动
- [OpenRCT2](#/open-source-game/openrct2) — SDL 俯视角城市建造游戏
- [OpenTTD](#/open-source-game/openttd) — 自定义 2D 渲染的经典城市/交通模拟
- [Endless Sky](#/open-source-game/endless-sky) — 自定义 SDL 渲染的太空游戏
