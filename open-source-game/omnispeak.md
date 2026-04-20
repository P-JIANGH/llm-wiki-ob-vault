---
title: Omnispeak
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, platformer, reverse-engineering]
sources: []
---

# Omnispeak

> Commander Keen in Goodbye Galaxy! Episodes 4/5/6 开源重实现，兼容原版存档

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/sulix/omnispeak |
| 语言 | C (C99 标准，C++ 可选 BUILDASCPP) |
| 构建系统 | CMake + src/Makefile（跨平台） |
| 渲染后端 | SDL2/SDL2+OpenGL/SDL2+Vulkan/SDL3/SDL3+GPU/DOS-EGA 多后端 |
| 许可 | GPLv2 |
| 总代码量 | ~51.8K LOC C/H（94 个源文件） |
| 目标游戏 | Keen 4 v1.4 EGA / Keen 5 v1.4 EGA / Keen 6 v1.4+1.5 EGA |

## 核心技术点

### 模块化渲染后端架构
Omnispeak 实现了一套完整的**多后端渲染抽象层**，通过 CMake 的 `RENDERER` 选项切换：
- `sdl2` — 纯 SDL2 软件渲染（Windows 默认）
- `sdl2gl` — SDL2 + OpenGL 加速（Linux/macOS 默认）
- `sdl2vk` — SDL2 + Vulkan（需 glslc 编译 SPIR-V shader）
- `sdl3` / `sdl3gpu` — SDL3 最新渲染后端
- `dos` — 原始 DOS/EGA 模式复现
- `sdl1` — SDL 1.2 兼容模式

每个后端对应独立的 `id_vl_*.c` + `id_in_*.c` + `id_sd_*.c` 平台文件，模块化可替换。

### Nuked OPL3 嵌入式 FM 合成器
音频子系统内置完整的 **Nuked OPL3**（dbopl + nuked_opl3）模拟器，复现 Yamaha YM3812 (OPL2) 芯片的 FM 合成音效——这是 Commander Keen 原作使用的音频芯片。
- 支持 ALSA / OPL2LPT 并口硬件 / liboplhw 可选后门
- 同时支持 SDL2 Audio 和 SDL3 Audio 抽象层

### id Software 引擎核心复用
沿用 id Software 的经典引擎层（id_*.c/h 系列），包含：
- `id_ca.c` — Episode 数据文件读写（CAAFL资产管理）
- `id_cfg.c` — 配置/存档管理
- `id_fs.c` — 文件系统抽象
- `id_in.c` / `id_in_sdl*.c` — 输入抽象层
- `id_rf.c` — 渲染器接口
- `id_sd.c` / `id_sd_*.c` — 声音抽象层
- `id_ti.c` — 纹理/图形资源加载
- `id_us*.c` — 用户界面/文本渲染
- `id_vh.c` / `id_vl.c` — 视频/显示层

这些文件与 [[open-source-game/commander-genius]] 共享相同的 id Software 引擎基因，但各有不同的实现路径。

### Episode 分离架构
每个 Episode（Keen 4/5/6）有独立的源文件：
```
ck4_ep.h / ck4_map.c / ck4_misc.c / ck4_obj1.c / ck4_obj2.c / ck4_obj3.c
ck5_ep.h / ck5_map.c / ck5_misc.c / ck5_obj1.c / ck5_obj2.c / ck5_obj3.c
ck6_ep.h / ck6_map.c / ck6_misc.c / ck6_obj1.c / ck6_obj2.c / ck6_obj3.c
```
共 18 个 Episode 专用文件，通过 `ck_ep.h` 统一接口头文件多态分发调用。

通用游戏逻辑（ck_*.c）处理物理（ck_phys.c）、碰撞（ck_act.c）、关卡切换（ck_map.c）、交互（ck_inter.c）、UI（ck_text.c）、游戏主循环（ck_game.c）等。

### Episode 数据打包
`data/` 目录按 Episode 组织原始游戏数据文件：
- `data/keen4/` — Keen 4 EGA 数据（ACTION/AUDIODCT/AUDIOHHD/EGADICT/EGAHEAD/EPISODE/GFXCHUNK/MAPHEAD/STRINGS/TILEINFO）
- `data/keen5/` — Keen 5 同上
- `data/keen6e14/` / `data/keen6e15/` — Keen 6 v1.4 和 v1.5 独立数据目录

需要原始游戏文件（GAMEMAPS.CK?/EGAGRAPH.CK?/AUDIO.CK?）配合才能运行，纯开源引擎不含游戏数据。

### VANILLA 兼容模式
`VANILLA=ON` 编译选项禁用 Omnispeak 独有功能，强制 bug 兼容原版 DOS 体验，类似于 [[open-source-game/chocolate-doom]] 的 Bug-Compatible 哲学。

### modding.md 文档
内置 `doc/modding.md` 文档，说明如何扩展游戏内容，包含开发者指南。

## 玩法特点

- 经典 2D 平台跳跃，Commander Keen 4/5/6 三个完整 Episode
- 像素级还原原版 DOS 体验，支持原版存档兼容性
- 现代化后端支持宽屏、高分辨率、控制器输入

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 多后端渲染架构 | CMake RENDERER 选项驱动的渲染器热切换，可作为 AI 游戏多平台适配的参考模式 |
| 嵌入式模拟器 | Nuked OPL3 完全内置，无需外部依赖，适合 AI 游戏内置复古音效模拟 |
| Episode 插件化 | ck*_ep.h 接口 + ck*_map/obj/misc 分离结构，适合模块化游戏内容扩展 |
| id Software 引擎复用 | 经典引擎代码库复用模式，[[open-source-game/scummvm]] 的插件引擎架构也有类似思路 |
| 存档兼容性 | VANILLA 模式的 bug 兼容策略，可参考用于 AI 游戏的"代际兼容"设计 |

## 相关页面

- [[open-source-game/commander-genius]] — Commander Keen 1-6 另一开源实现
- [[open-source-game/chocolate-doom]] — Bug-Compatible 重现哲学
- [[open-source-game/scummvm]] — 经典游戏引擎多插件架构
