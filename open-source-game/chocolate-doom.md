---
title: Chocolate Doom
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, fps, retro, doom-engine, source-port]
sources: [raw/articles/open-source-games-list-2026.md]
---

# Chocolate Doom

> 精准还原原版 DOS Doom（含 bug）的开源源码端口，支持 Heretic/Hexen/Strife，GPL 许可。

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/chocolate-doom/chocolate-doom |
| 语言 | C（~80K LOC 估算） |
| 构建系统 | CMake + Autotools（configure/make） |
| 渲染技术 | SDL2 软件渲染（原生分辨率） |
| 许可 | GNU General Public License 2.0 |
| 支持游戏 | Doom, Heretic, Hexen, Strife |
| 特色 | 100% 还原原版 DOS 行为，含故意保留的 bug |

## 核心技术点

### 精准还原哲学（Bug-Compatible）
- **核心目标**：不是改进，而是逐位还原 DOS 版 Doom 运行效果
- **bug 保留**：原版 DOS 的 bug 也会被保留在 Chocolate Doom 中
- **文件兼容性**：直接读取原版 DOS 的 `default.cfg` 配置文件和存档
- **demo 兼容**：支持 DOS 版录制的 demo 文件播放
- `-merge` 参数：支持 Total Conversion WAD 合并（解决 Vanilla Doom 无法加载 sprite 的问题）

### 多游戏引擎架构

```
src/
├── doom/      # Doom 主引擎（am_*, d_*, g_game.c, p_*, r_*, s_*, hu_*）
├── heretic/   # Heretic 引擎
├── hexen/     # Hexen 引擎
├── strife/    # Strife 引擎
├── setup/     # 跨平台安装向导工具
├── common/    # i_main.c, i_system.c（平台抽象入口）
└── CMakeLists.txt  # 统一构建配置
```

### 通用模块（所有游戏共享）

| 前缀 | 职责 |
|------|------|
| `i_*` | 平台抽象（i_video/i_sound/i_input/i_timer/i_system）|
| `m_*` | 工具函数（m_argv/m_misc/m_config/m_controls）|
| `d_*` | 核心驱动（d_main/d_event/d_loop/d_iwad）|
| `net_*` | 网络同步（client/server/dedicated/loopback/SDL_net）|
| `w_*` | WAD 资源读写（w_main/w_wad/w_merge）|
| `v_*` | 视频渲染（v_video/v_diskicon）|
| `deh_*` | Dehacked 补丁支持（deh_main/deh_io/deh_mapping）|
| `sha1.c` | IWAD 完整性校验 |

### 多种音频后端

| 后端 | 说明 |
|------|------|
| `i_oplmusic.c` | OPL FM 合成（DOS gusemu 风格）|
| `i_sdlsound.c` | SDL2 音频输出 |
| `i_sdlmusic.c` | SDL2_mixer 音乐 |
| `i_cdmus.c` | CD 音频（如果有）|
| `gusconf.c` | Gravis Ultrasound 配置 |
| `midifallback.c` | MIDI 回退机制 |

### 网络架构

- `chocolate-server`：独立专用服务器程序
- `net_sdl.c`：SDL_net 网络后端
- `net_loop.c`：本地回环测试
- `net_dedicated.c`：专用服务器模式
- 支持 TCP/IP 多人游戏

## 玩法特点

- **精准复古体验**：与现代端口不同，Chocolate Doom 追求"原汁原味"
- **配置即开即用**：原版 DOS `default.cfg` 直接使用
- **多人网络**：SDL_net TCP/IP 多人游戏
- **跨平台**：Linux/macOS/Windows/FreeBSD 等
- **开发者工具**：`chocolate-setup` 图形配置工具，`chocolate-doom` 游戏主程序

## 与原版 id Software Doom 的区别

| 维度 | id Software DOOM (1997) | Chocolate Doom |
|------|------------------------|----------------|
| 许可 | GPL（不含游戏数据）| GPL（不含游戏数据）|
| 代码基础 | 原始 DOS C+汇编 | 从头重写但逐位兼容 |
| Bug 策略 | 原版 bug 存在于源码 | **故意保留**原版 bug |
| 构建系统 | Borland C++ Makefile | CMake + Autotools |
| 平台 | DOS | SDL2 跨平台 |
| 配置格式 | DOS default.cfg | 兼容 + chocolate-doom.cfg |
| demo 兼容性 | DOS demo | 100% 兼容 |

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 还原优先于改进 | 当目标是复刻而非创新时，如何取舍新功能 |
| 平台抽象层 | i_* 模块化平台抽象，便于移植到新平台 |
| 音频多后端 | OPL/GUS/MIDI/SDL_mixer 多层抽象保证兼容性 |
| 配置兼容性 | 逐版本兼容配置文件的设计思路 |
| 存档/demos 二进制兼容 | 不改格式保证与原版 100% 互换 |
| 源码文档化 | PHILOSOPHY/NOT-BUGS 文件解释设计决策 |

## 关键源码文件

```
chocolate-doom/
├── src/
│   ├── doom/
│   │   ├── d_main.c      # 入口，WAD 加载，战役初始化
│   │   ├── g_game.c      # 主循环，TIC 命令
│   │   ├── p_enemy.c     # 敌人 AI 状态机
│   │   ├── p_map.c       # 碰撞/视线检测
│   │   ├── p_setup.c     # 关卡解析
│   │   ├── r_main.c      # 渲染器
│   │   ├── am_map.c      # 自动地图
│   │   └── hu_*          # HUD 组件
│   ├── heretic/          # Heretic 游戏逻辑
│   ├── hexen/             # Hexen 游戏逻辑
│   ├── strife/           # Strife 游戏逻辑
│   ├── setup/             # 安装向导
│   ├── i_main.c           # 主入口
│   ├── i_system.c         # 系统抽象
│   ├── i_video.c          # 视频抽象
│   ├── i_sound.c          # 声音抽象
│   ├── net_client.c       # 网络客户端
│   ├── net_server.c       # 网络服务器
│   ├── deh_main.c         # Dehacked 补丁引擎
│   └── CMakeLists.txt     # 主构建配置
├── chocolate-doom.cfg     # 扩展配置
├── default.cfg            # 原版 DOS 兼容配置
└── COPYING                # GPL v2
```

## 历史与设计哲学

Chocolate Doom 的哲学文件（PHILOSOPHY）写道：

> "Chocolate Doom aims to accurately reproduce the original DOS versions of the games, including bugs."

这不是一个"更好的 Doom"，而是一个**时间胶囊**——让 1993 年的游戏在 2026 年的电脑上以完全相同的方式运行。这种"保存级还原"理念与 [[open-source-game/doom|DOOM 原始源码]] 形成互补：DOOM 源码让你理解引擎原理，Chocolate Doom 让你体验原始行为。

该项目也被 Debian 等发行版收录为官方包。
