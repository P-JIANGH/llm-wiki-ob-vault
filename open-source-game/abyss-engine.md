---
title: Abyss Engine
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, diablo, arpg, clean-room, engine]
sources: [https://github.com/AbyssEngine/AbyssEngine]
---

# Abyss Engine

> Diablo 2 清洁室重实现引擎，纯 C 编写，SDL2 跨平台渲染

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/AbyssEngine/AbyssEngine |
| 语言 | C (C99) |
| 构建系统 | CMake 3.20+ |
| 依赖 | SDL2, ZLIB, LibArchive, FFmpeg (AVCODEC/AVFORMAT/AVUTIL/SWSCALE/SWRESAMPLE) |
| 许可 | MIT |
| 平台 | Windows 10+ (x64/Arm64), macOS (Arm64), Linux (x64/Arm64) |
| 关键人物 | Timothy Sarbin |

## 核心技术点

### 清洁室设计原则
**不是逆向工程项目**，完全从零重写，不使用原版游戏任何代码。明确声明不兼容原版存档和多人系统——这是一个全新实现而非兼容层。[[open-source-game/open-diablo-2|OpenDiablo2]] 项目拆分后，引擎部分成为独立项目继续开发。

### 依赖库选型
| 库 | 用途 |
|----|------|
| SDL2 | 窗口、渲染、输入跨平台抽象 |
| FFmpeg | 视频解码（过场动画） |
| ZLIB | 数据包解压 |
| LibArchive | MPQ 容器读取 |

### 模块化源码架构 (~72 文件, ~4859 LOC C)

```
src/
├── AbyssEngine.c              # main() 入口，SDL 主循环
├── audio/
│   └── AudioStream.c/h        # 音频流管理
├── common/
│   ├── AbyssConfiguration.c/h # INI 配置读写
│   ├── FileManager.c/h        # 文件系统抽象
│   ├── Globals.c/h            # 全局 SDL 句柄
│   ├── Logging.c/h            # 日志系统
│   ├── MemoryStream.c/h       # 内存流封装
│   ├── MpqStream.c/h          # MPQ 包读取流
│   └── RingBuffer.c/h         # 环形缓冲区
├── drawing/
│   ├── Cursor.c/h             # 光标渲染
│   ├── Label.c/h              # 文本标签
│   └── Sprite.c/h             # 精灵图渲染
├── managers/
│   ├── AudioManager.c/h       # 音频管理器（单例）
│   ├── InputManager.c/h       # 输入管理器（单例）
│   └── VideoManager.c/h       # 视频/过场管理器（单例）
├── scenes/
│   ├── Scene.c/h              # 场景管理器
│   ├── SceneIntroVideos.c/h   # 过场动画场景
│   └── SceneMainMenu.c/h      # 主菜单场景
├── types/
│   ├── DC6.c/h                # Diablo 2 动画帧格式
│   ├── DC6Frame.c/h
│   ├── Font.c/h                # 字体渲染
│   ├── MPQ*.c/h                # MPQ 容器格式（Header/Hash/Block）
│   └── Palette.c/h            # 调色板
└── util/
    ├── BitReader.c            # 位流读取
    ├── Crypto.c/h              # 加密初始化
    ├── Huffman.c               # Huffman 解压
    ├── Implode.c               # PKZIP implode 解压
    ├── Mutex.c/h               # 互斥锁
    └── WavDecompress.c         # WAV 解压缩
```

### 主循环架构
标准 SDL 事件循环 + 固定逻辑更新：
1. `SDL_PollEvent` → `InputManager_ProcessSdlEvent` 处理输入
2. 根据是否在播放视频选择 `VideoManager_Update` 或 `Scene_UpdateCurrentScene`
3. `AudioManager_Update` 更新音频
4. `SDL_RenderClear` → `Scene_RenderCurrentScene` 或 `VideoManager_Render` → `SDL_RenderPresent`

### 资产依赖
需要原版 **Diablo 2 + Lord of Destruction MPQ 文件**（需自行购买），不包含在仓库内。配置通过 `~/.config/abyss/abyss.ini`（Linux）或对应平台路径加载。

## 玩法特点

Diablo 2 核心体验重做：俯视角 ARPG 战斗、装备系统、技能树、地下城探索、4 个角色职业。引擎层仅负责渲染/音频/输入/场景框架，游戏内容（敌人AI、物品系统、剧情）尚未完全实现——当前只有主菜单和过场动画场景可运行。

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **清洁室重实现范式** | 完全自主实现而非逆向源码，可规避法律风险同时保持架构自由 |
| **Diablo 品类联机架构** | [[open-source-game/devilutionx|EvilutionX]] 的帧同步 P2P 网络可参考 |
| **SDL2 跨平台渲染** | 简洁的 `SDL_CreateRenderer` + `SDL_RenderPresent` 模式适合 2D ARPG |
| **MPQ 资产打包读取** | LibArchive 直接读取 MPQ 容器，原版数据复用是快速启动项目的好方法 |
| **模块化 Manager 单例** | `AudioManager`/`VideoManager`/`InputManager` 三件套是游戏引擎标准模式 |

## 关联页面

- [[open-source-game/devilutionx]] — Diablo + Hellfire 清洁室逆向开源端口（对比：逆向 vs 清洁室）
- [[open-source-game/freeablo]] — Diablo 1 清洁室重实现，双线程架构（对比：并行项目）
- [[open-source-game/open-diablo-2]] — 本项目的"前身"，OpenDiablo2 的游戏逻辑层
- [[open-source-game/opennox]] — 同样是 Westwood 类游戏的清洁室重实现（参考设计哲学）
