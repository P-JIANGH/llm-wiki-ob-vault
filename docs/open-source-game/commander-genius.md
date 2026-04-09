---
title: Commander Genius
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, platformer, retro, sdl2, interpreter]
sources: [https://gitlab.com/Dringgstein/Commander-Genius]
---

# Commander Genius

> Commander Keen (1-6, Dreams) 和 Cosmos Cosmic Adventure 的开源解释器/重实现引擎，支持 SDL2 + OpenGL 加速、Lua Mod、多人（4人）。

## 基本信息

| 项目 | 内容 |
|------|------|
| GitLab | https://gitlab.com/Dringgstein/Commander-Genius |
| 语言 | C++ (为主) + C (少量遗留代码) |
| 构建系统 | CMake (3.12+), 支持 iOS/Xcode/Android/Switch/Wayland/Win32/Linux |
| 渲染/引擎 | SDL2 + OpenGL 加速（可选），SDL1.2 已废弃 |
| 许可 | GPL |
| 主要依赖 | SDL2, SDL2_image, SDL2_mixer, SDL2_ttf, libcurl, zlib |
| 平台 | Linux/X11/Wayland, Windows, macOS, Android, iOS, Nintendo Switch |

## 核心技术点

### 历史渊源
- **CloneKeen** (Caitlin Shaw): 最初引擎，已废弃
- **CloneKeenPlus** (Gerstrong): 从 v0.83 fork，修复问题
- **Commander Genius**: Gerstrong 2008-2026 主导，完全重写 C++，仅保留 ~0.02% 原始 CloneKeen 代码
- 参考了 **RefKeen** 和 **Chocolate Keen** 的实现思路

### 架构设计
```
src/
├── CGenius.cpp           # 主入口
├── CGeniusEntry.cpp      # 跨平台入口封装
├── engine/
│   ├── core/             # 核心引擎（camera/map/object/event/hud/intro）
│   ├── keen/
│   │   ├── vorticon/     # Keen 1-3 (Vorticons 引擎)
│   │   ├── galaxy/        # Keen 4-6 (Galaxy 引擎)
│   │   └── dreams/        # Keen Dreams
│   ├── cosmos/            # Cosmos Cosmic Adventure 引擎（独立 submodule）
│   ├── depklite/         # 资源解包工具
│   └── refkeen/          # RefKeen 兼容层
├── fileio/               # 文件 I/O 抽象层
├── dialog/               # UI 对话系统
├── sys/                  # 系统抽象层
└── downloadgui/          # 内置游戏下载器 UI
```

### 源码规模
- 289 个 .cpp 文件 + 297 个 .h 文件
- GsKit: 共享图形/音频工具库
- vfsroot: 虚拟文件系统根目录

### Lua Mod 支持
- 使用 Lua 编写 Mod 扩展，替代机器码 patch
- 提供了更友好的 Mod 开发体验

### OpenGL 渲染管线
- 相比原版 DOS 提供更高帧率和色彩增强
- 可选 OpenGL 加速（默认开启）

### 多人支持
- 最多 4 名玩家同时游戏
- 扩展了原版 Keen 的游戏体验

### 游戏内置商店
- 内置游戏下载器 (Game Launcher → New Stuff)
- 可直接下载 Keen 1/4/Dreams 和 Cosmos 1
- 使用 libcurl 下载游戏数据

### Cosmos 引擎集成
- 作为独立 git submodule (`cosmos.git`) 集成
- `git clone https://gitlab.com/Dringgstein/cosmos.git src/engine/cosmos`
- `cmake -DBUILD_COSMOS=1` 启用
- 当前状态：实验性，帧率已优于原版但尚未完全完善

### 高质量包 (HQP)
- High Quality Packs: 增强图形/音效/音乐资源包
- 全局 HQP 和 per-game HQP 两层机制
- 通过 ck*.bmp 等文件名检测

### 平台移植
- **iOS**: 独立 cmake toolchain (`toolchains/ios.toolchain.cmake`)，FetchContent 自动下载 SDL2 依赖
- **Android**: Pelya 维护 (2010-2023)，数据路径 `/Android/data/net.sourceforge.clonekeenplus/files`
- **Switch**: Elias Oenal 维护 (2020-2023)
- **macOS**: macports 依赖管理，QtCreator IDE 支持

## 玩法特点

- **完整支持 Keen 1-6 + Dreams**: 全部主线剧情关卡可玩
- **Cosmos Cosmic Adventure**: 部分可玩（Forbidden Planet 关卡和敌人基本正常）
- **原版体验 vs 增强体验**: 目标接近原版物理但利用现代硬件提升帧率/色彩
- **存档系统**: 命名存档槽（named save slots），替代原版数字索引
- **Input灵活性**: 全按钮映射到任意输入设备，支持鼠标

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 多游戏引擎解释器 | Keen 1-3(vorticon) 和 4-6(galaxy) 共存一库，版本分支管理值得参考 |
| Lua 数据驱动 Mod | Lua 脚本替代机器码 patch，降低 Mod 开发门槛的设计决策 |
| 多人扩展 | 4人同屏的设计验证了原版单人的扩展可行性 |
| 资源下载器 | 内嵌商店 + curl 下载管线可以复用为公司游戏的资产分发 |
| git submodule 解耦 | Cosmos 引擎作为独立 submodule，按需编译的设计适合大型项目拆分 |
| 跨平台 CMake | iOS/Android/Switch 多平台 CMake toolchain 分离，是多平台游戏参考模板 |
