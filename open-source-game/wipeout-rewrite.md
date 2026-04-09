---
title: wipEout Rewrite
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, racing, psx-demake, retro-reimplementation]
sources: [https://github.com/phoboslab/wipeout-rewrite]
---

# wipEout Rewrite

> wipEout (1995 PSX) 清洁室重实现，纯 C 语言跨平台复刻

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/phoboslab/wipeout-rewrite |
| 作者 | phoboslab (Dominic Szmania) |
| 语言 | 纯 C (~4000 LOC) |
| 构建系统 | CMake + Makefile |
| 渲染 | OpenGL 3.3 / GLES2 / Software |
| 平台 | SDL2 / Sokol (macOS/Linux/Win/Web) |
| 许可 | 无正式许可（fair use 声明） |
| 在线试玩 | https://phoboslab.org/wipegame/ |

## 核心技术点

### 双后端平台架构
- **SDL2 后端**: 支持游戏手柄，OpenGL 2.x
- **Sokol 后端**: 不支持手柄，OpenGL 3.3，仅支持 macOS/Linux/Win/Emscripten
- 平台抽象层 `platform_*.c` 隔离输入、音频、窗口管理
- 新平台移植：从 dummy 实现开始 `-DPLATFORM=NULL -DRENDERER=NULL`

### 三渲染器架构
- **GL**: OpenGL 3.3（现代 GPU）
- **GLES2**: OpenGL ES 2（移动端/嵌入式）
- **SOFTWARE**: 纯软件渲染（无 GPU 要求）
- `render_*.c` 各自独立实现，共享 `render.h` 接口

### 资产分离设计
- 代码仓库**不包含**游戏资产（纹理、3D 模型）
- 需自行提供 PSX NTSC 数据 + PC 版菜单模型
- 音乐需转换为 [QOA 格式](https://github.com/phoboslab/qoa)（phoboslab 自创）
- 目录结构固定：`./wipegame` + `./wipeout/textures/` + `./wipeout/music/`

### QOA 音频格式
- phoboslab 自创的轻量音频格式，专为游戏设计
- 比 MP3/OGG 更适合嵌入式/即时播放
- 同仓库的 `qoa` 项目提供格式规范和工具

### CMake 构建配置

| Flag | 说明 | 选项 |
|------|------|------|
| PLATFORM | 目标平台 | SDL2, SOKOL, NULL |
| RENDERER | 渲染器 | GL, GLES2, SOFTWARE, NULL |
| USE_GLVND | NVIDIA 供应商无关调度 | ON/OFF |
| MINIMAL_BUNDLE | Web 构建不包含音乐/开场视频 | ON/OFF |
| DEV_BUILD | 开发模式（资产路径指向源码目录） | ON/OFF |

## 源码结构

```
src/
├── platform_sdl.c      # SDL2 平台实现
├── platform_sokol.c   # Sokol 平台实现  
├── platform_null.c    # Dummy 空实现
├── render_gl.c        # OpenGL 3.3 渲染器 (~28K)
├── render_software.c  # 软件渲染器 (~18K)
├── render_null.c      # Dummy 渲染器
├── input.c            # 手柄/键盘输入处理
├── mem.c              # 内存管理
├── system.c           # 系统初始化
├── types.c            # 类型定义
├── utils.c            # 工具函数
└── wipeout/           # 游戏逻辑
    ├── game.c         # 核心游戏循环 (~23K)
    ├── object.c       # 游戏对象系统 (~22K)
    ├── main_menu.c    # 主菜单 (~24K)
    ├── ingame_menus.c # 游戏中菜单 (~14K)
    ├── hud.c          # HUD 显示
    ├── race.c         # 竞速逻辑
    ├── scene.c        # 场景管理
    ├── camera.c       # 摄像机系统
    ├── droid.c        # AI 敌人
    ├── sfx.c          # 音效
    ├── image.c        # 图像加载
    ├── particle.c     # 粒子效果
    └── intro.c        # 开场动画
```

## 玩法特点

- 经典 anti-gravity 赛车（浮空赛车）
- 8 支球队，12 条赛道
- 武器系统（导弹、机枪、护盾等）
- 音轨播放（QOA 格式）

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 平台抽象 | SDL2/Sokol 双后端设计为跨平台移植提供清晰模板 |
| 渲染器解耦 | 三渲染器架构（GL/GLES/Software）便于适配不同硬件 |
| 资产与代码分离 | 运行时加载外部资产，无需修改代码即可换肤 |
| CMake 参数化构建 | 通过 flag 灵活切换平台/渲染器，无需维护多套 CMakeLists |
| QOA 音频格式 | 自创格式解决版权+性能问题，适合游戏专项优化 |
| Web 移植 | Emscripten + Sokol 后端支持浏览器原生运行 |

## 相关链接

- 博客介绍: https://phoboslab.org/log/2023/08/rewriting-wipeout
- 在线试玩: https://phoboslab.org/wipegame/
- QOA 格式: https://github.com/phoboslab/qoa
