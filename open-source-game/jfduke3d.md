---
title: JFDuke3D
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, fps, build-engine, duke-nukem-3d]
sources: []
---

# JFDuke3D

> Jonathon Fowler 的 Duke Nukem 3D 开源移植版，基于 Ken Silverman Build 引擎

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/jonof/jfduke3d |
| 语言 | C (约 45K LOC src/) |
| 构建系统 | Makefile (GNU Make) |
| 渲染 | Polymost (OpenGL 2.0/3.0/GLES2) + 软件渲染 |
| 许可 | GPLv2 |
| 平台 | Linux, BSD, macOS 10.15+, Windows Vista+ |
| 首次发布 | 2003-04-17 |
| 依赖 | SDL 2.0, libvorbis, libfluidsynth, GTK+3 (可选) |

## 核心技术点

### Build 引擎移植 (jfbuild 子模块)
- Ken Silverman Build 游戏引擎的独立移植版本
- 作为 git submodule 集成：`https://github.com/jonof/jfbuild`
- 支持 3D 加速 (OpenGL 2.0+ / GLES 2.0)

### 音频库 (jfaudiolib 子模块)
- Jim Dose 原始音频库的移植版本
- 支持 OGG/Vorbis + FluidSynth MIDI 合成
- 作为独立 git submodule

### Polymost 渲染器
- BUILD 引擎的多边形渲染器
- `USE_POLYMOST=1` 启用 3D 加速
- `USE_GL2/GL3/GLES2` 支持多种 OpenGL 配置
- `USE_ASM=1` 可选汇编优化

### 跨平台架构
- SDL2 跨平台抽象层
- Windows/macOS GTK+3 启动窗口 + 文件选择器
- Xcode 项目支持 macOS 原生构建
- 多架构支持：x86, x86_64, PowerPC, ARM

### 依赖管理
- `Makefile.deps` 声明式依赖
- `Makefile.user` 用户自定义覆盖
- 子模块初始化：`git submodule update --init`

## 玩法特点

- **经典 FPS 体验**：原汁原味的 Duke Nukem 3D 游戏体验
- **现代硬件支持**：OpenGL 渲染支持高分辨率和宽屏
- **多游戏数据支持**：需要原版 Duke Nukem 3D 游戏数据（ATOMIC EDITION 或其他版本）
- **开源可移植**：代码开源，平台广泛

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 引擎移植模式 | 子模块化分离引擎(game/build/audio)便于独立版本管理和复用 |
| 渲染器分层 | Polymost 作为独立渲染层，支持软件/硬件多模式切换 |
| 跨平台抽象 | SDL2 统一抽象层使多平台移植更简单 |
| 兼容性策略 | 需要原版游戏数据文件的商业游戏开源移植可行路径 |
| 音频子系统 | 嵌入式音频库子模块设计，音频逻辑与渲染解耦 |

## 源码结构

```
jfduke3d/
├── src/              # 主游戏源码 (~45K LOC .c/.h)
├── jfbuild/          # Build 引擎子模块
├── jfaudiolib/       # 音频库子模块
├── rsrc/             # 运行时资源
├── installer/         # 安装程序
├── xcode/            # macOS Xcode 项目
├── Makefile          # GNU Make 构建
├── Makefile.msvc     # Visual C++ 构建
└── README.md
```

## 相关链接

- Build 引擎原版：https://github.com/voidse

