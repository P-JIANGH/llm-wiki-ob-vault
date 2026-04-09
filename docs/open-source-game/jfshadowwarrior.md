---
title: JFShadowWarrior
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, fps, build-engine, 3d-realms, cross-platform, sdl2, openGL]
sources: []
---

# JFShadowWarrior

> Jonathon Fowler 的 Shadow Warrior 现代端口，基于 Ken Silverman Build Engine 的 jfbuild 分支，支持 OpenGL/GLES2 渲染器和多平台

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/jonof/jfsw |
| 原始开发商 | 3D Realms (Apogee Software) |
| 端口作者 | Jonathon Fowler |
| 首次发布 | 2005-04-02 |
| 语言 | C（主体） |
| 构建系统 | GNU Make / MSVC NMAKE |
| 渲染引擎 | jfbuild (Ken Silverman's Build Engine fork) + Polymost OpenGL 渲染器 |
| 依赖 | SDL 2.0, libvorbis, libfluidsynth, GTK+ 3 (可选) |
| 许可 | GPLv2（需要原始 Shadow Warrior 游戏数据） |

## 核心技术点

### jfbuild 引擎 submodule

JFShadowWarrior 依赖 [jfbuild](https://github.com/jonof/jfbuild) 作为 Git submodule，这是一个 Ken Silverman Build Engine 的现代化分支端口。jfbuild 本身是从 [Ken Silverman's Build Engine](https://buildengine.world/) fork 而来，专为跨平台现代系统重新设计。

### Polymost 3D 渲染器

Makefile 选项 `USE_POLYMOST=1` 启用真正的 3D 渲染器，支持：
- OpenGL 2.x (`USE_OPENGL=USE_GL2`)
- OpenGL 3.x (`USE_OPENGL=USE_GL3`)
- OpenGL ES 2.0 (`USE_OPENGL=USE_GLES2`)
- 纯软件渲染 (`USE_OPENGL=0`)

### 平台支持

- **Linux/BSD**: `make` 或 `gmake`，依赖 `libsdl2-dev`
- **macOS**: Xcode 项目 (`xcode/sw.xcodeproj`)，自动下载 SDL2 framework
- **Windows**: MSVC 2015+ NMAKE (`nmake /f Makefile.msvc`)
- **跨平台音频**: libvorbis (OGG) + libfluidsynth (MIDI/GM 音色)
- **可选 UI**: GTK+ 3 用于启动窗口和文件选择器

### 编译选项

| 选项 | 说明 |
|------|------|
| `RELEASE=1` | 发布构建（优化） |
| `RELEASE=0` | 调试构建 |
| `USE_POLYMOST` | 启用/禁用 3D 渲染器 |
| `USE_OPENGL` | OpenGL/GLES2 配置 |
| `USE_ASM` | x86 汇编优化 |
| `WITHOUT_GTK=1` | 禁用 GTK+ UI |

### 与 Azarien/shadow-warrior 的区别

原版 [shadow-warrior](https://github.com/Azarien/shadow-warrior) 是 3D Realms 2005 年官方释出的原始源码。JFShadowWarrior (jfsw) 是 Jonathon Fowler 在此基础上的现代化端口，增加了 OpenGL 渲染、多平台支持、GTK+ UI 等现代特性。

## 玩法特点

Shadow Warrior 是 1997 年 3D Realms 发行的经典 FPS，主角 Lo Wang（劳王）是一个忍者+武士刀+枪械的东方风格射击游戏。相比 Duke Nukem 3D 更强调近战（武士刀）和东方文化主题。

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| Build Engine 现代化 | jfbuild 作为 Build Engine fork 的持续维护模式，清洁室逆向工程持续演进的范本 |
| 模块化 submodule 架构 | 游戏逻辑与引擎分离：jfsw 依赖独立的 jfbuild，engine 与 content 分离设计 |
| 跨平台构建 | Makefile + 平台条件编译支持多平台（Win/Mac/Linux/BSD），CMake 替代方案参考 |
| 可选特性编译 | `WITHOUT_GTK`、`USE_ASM` 等编译开关实现功能模块化裁剪 |
| 游戏数据与代码分离 | 需要原始 WAD 数据文件，代码/内容分离许可模式（GPL + 商业数据） |
