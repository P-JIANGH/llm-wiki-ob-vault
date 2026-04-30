---
title: OpenNox
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, action-rpg, reverse-engineering, westwood, multiplayer]
sources: [https://github.com/noxworld-dev/opennox]
---

# OpenNox

> Westwood Studios Nox (2000) 引擎开源复刻 — 清洁室逆向工程 + SDL2 跨平台移植

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/noxworld-dev/opennox |
| 语言 | C/C++ |
| 构建系统 | CMake 3.11+ |
| 渲染/引擎 | SDL2 + OpenGL + OpenAL |
| 许可 | MIT |
| 平台 | Windows / macOS / Linux / WebAssembly (Emscripten) |
| 源码规模 | 41 源文件 (20 .c/.cpp)，13MB 仓库 |

## 核心技术点

### 清洁室逆向工程
- 纯 C/C++ 从零重写 Nox 游戏引擎（2000 Westwood Studios）
- 不复用原版源码，通过二进制逆向 + 运行时分析重建逻辑
- compat 层处理平台差异（Windows/macOS/Linux）

### SDL2 跨平台抽象
- `win.c` — Windows API 抽象层
- `compat.c` — POSIX/Linux 兼容层
- `compat_mss.c` — Miles Sound System 音频库兼容层
- 所有平台共用同一套渲染/音频/输入代码

### 32位 + WebAssembly 支持
- 编译标志 `-m32`（32位内存模型，兼容原版数据布局）
- Emscripten 支持：`#ifdef __EMSCRIPTEN__` 条件编译
- WebAssembly 构建可直接在浏览器运行原版 Nox

### VQA 视频解码器
- 自研 VQA (Westwood's Video Quality Assurance) 格式解码器
- `vqa/` 子目录：C++ 实现 vqa_decode.cpp / vqa_file.cpp / aud_decode.cpp
- 游戏过场动画纯自研解码，不依赖原版 DLL

### 数据文件驱动
- `GAME_data.c` — 原版游戏数据提取/加载
- `cdrom.c` — CD-ROM 数据流读取（怀旧兼容）
- 需要持有原版 Nox 游戏数据文件

## 玩法特点

- **动作 RPG**：即时动作 + 技能系统，支持单人战役 + 多人对战
- **原版 Nox 剧情**：延续 Westwood 的 Nox 世界观（Conquest of the Underworld）
- **跨平台多人**：局域网/互联网对战，支持原版协议

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 清洁室逆向 | 对于已停止维护的游戏，清洁室重实现是延续生命力的有效方式 |
| SDL2 跨平台 | 经典游戏跨平台移植的标准范式：抽象层 + 条件编译 |
| Emscripten 移植 | 浏览器化是延长老游戏生命力的可行路径（无需 Unity/Unreal） |
| 音视频解码 | 自研解码器 vs 第三方库（VQA 自研 vs MSS 兼容层对比） |

## 架构图

```
src/
├── main.cpp              # 程序入口，Emscripten/Win/Linux/macOS 统一入口
├── GAME[1-5].c          # 游戏逻辑主模块（地图/战斗/AI/网络）
├── draw.c               # 渲染管线
├── input.c              # 输入处理
├── imm.c                # IMM (Input Method Manager) 输入法支持
├── movie.c              # 视频播放
├── sm.c                 # 状态机?
├── win.c                # Windows API 抽象层
├── cdrom.c              # CD-ROM 数据流
├── compat.c             # POSIX/Linux 兼容层
├── compat_mss.c         # MSS 音频库兼容层
├── GameEx.c/h           # Game Extension 扩展
├── vqa/                 # VQA 视频解码器子模块
│   ├── vqa_decode.cpp
│   ├── vqa_file.cpp
│   ├── aud_decode.cpp
│   └── ddpf_conversion.cpp
└── ConvertUTF.c         # Unicode 编码转换
```

## 相关页面

- [[openenroth]] — Might and Magic VI-VIII 引擎重实现（同为 C++ 逆向工程）
- [[openmw]] — Morrowind 引擎清洁室重实现
- [[eduke32]] — Build Engine 多游戏端口（跨平台 SDL 模式参考）
