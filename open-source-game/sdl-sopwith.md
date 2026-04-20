---
title: SDL Sopwith
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, arcade, sdl2, retro, multiplayer]
sources: [https://github.com/fragglet/sdl-sopwith]
---

# SDL Sopwith

> 经典一战双翼机射击游戏 Sopwith 的现代 SDL2 移植版，支持自定义关卡、TCP/IP 多人、PC Speaker 音效模拟

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/fragglet/sdl-sopwith |
| 最新版本 | 2.10.0 (开发中) |
| 语言 | C (ANSI C / C99) |
| 构建系统 | Autotools (autoconf/automake) |
| 依赖 | SDL2 >= 2.0.7 |
| 许可 | GNU GPL v2 |
| 原作者 | BMB Compuscience Canada (David L. Clark) |
| 当前维护 | Simon Howard (fragglet) |

## 核心技术点

### 平台抽象架构
- **核心游戏逻辑 (src/)**: 纯 C 编写，与平台无关
  - `sw.h` — 主头文件，定义核心数据结构
  - `swauto.c` — AI 自动驾驶系统
  - `swcollsn.c` — 碰撞检测
  - `swconf.c` — 配置管理
  - `swasynio.c` — 异步 I/O（网络？）
  - `swgames.c` — 游戏对象/实体系统
  - `swend.c` — 游戏结束逻辑
  - `hiscore.c` — 排行榜系统

- **SDL 平台层 (src/sdl/)**: 平台相关代码隔离在 sdl/ 子目录
  - `main.c` — SDL 主入口
  - `video.c` — 渲染/视频输出
  - `pcsound.c` — PC Speaker 音效模拟（复古音色）
  - `timer.c` — 计时器
  - `controller.c` — SDL Game Controller API 游戏手柄支持

### 核心架构设计
- **平台抽象分离**: src/ 核心逻辑与 src/sdl/ 平台层完全分离，理论上可移植到其他平台（已支持 Linux/Windows/macOS/Emscripten/Web）
- **Autotools 构建**: configure.ac 多平台条件编译（cygwin/mingw/solaris/qnx/haiku），自动检测网络库（socket libs）
- **Emscripten 移植**: 有 embuild.sh 支持编译为 WebAssembly/PWA，支持触摸控制

### 复古特性模拟
- **PC Speaker 音效**: 纯软件模拟复古 PC Speaker 音色，无需真实硬件
- **多调色板**: 模拟多种老式显示器（CGA/EGA/Atari 等），可切换不同调色板
- **多点阵字体**: 像素字体渲染

### 多人与网络
- **TCP/IP 网络**: 原版 Sopwith 可能只有串口/调制解调器，SDL 版本支持现代 TCP/IP 网络对战
- **多人旗帜系统**: 多个飞机可属于同一阵营（faction）

### 自定义关卡
- `.sop` 格式关卡文件：文本格式，可编辑
- 关卡文件可替换标题画面、添加 power-up 物品（弹药/燃油/炸弹补给）
- 新目标类型：water towers、radio towers、observation balloons
- 支持联网多人游戏加载自定义关卡

### 版本历史亮点
- v2.8.0 (2025-03): 新增 Gamepad 手柄支持（SDL Game Controller API）
- v2.9.0 (2025-12): 修复多人模式下物体销毁崩溃，修复动物计分 bug，新增系统级高分榜
- v2.10.0 (开发中): 修复 Emscripten 高分文件未关闭 bug，支持 URL 加载关卡，新增 original title screen + music 示例文件

## 玩法特点

- **单双翼机对战**: 控制双翼机摧毁敌方目标（坦克、建筑等）
- **一战背景**: WWI 航空主题
- **资源管理**: 弹药、燃油、炸弹有限，需返回基地补给
- **关卡目标**: 摧毁所有敌方目标，存活并返航
- **简单AI**: 自动驾驶导航、队形飞行（AI 飞机可成梯队飞行长途移动）

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 平台抽象 | src/核心+sdl/平台层分离是轻量级游戏移植的标准模式；Taisei/Darkplaces 等均用类似架构 |
| 网络同步 | TCP/IP 多人同步；确定性设计便于网络同步多人 |
| 复古音效 | PC Speaker 软件模拟方案；调色板模拟复古显示器 |
| 关卡格式 | 自定义 .sop 纯文本关卡格式；power-up 物品设计可借鉴 |
| 手柄支持 | SDL Game Controller API 一行代码支持多种手柄 |
| Emscripten | Web 移植 + PWA 安装 + 触摸控制的三位一体 Web 方案 |
| 轻量级 | ~873 commits，代码量极小（<30 C 文件），是理解完整游戏架构的好样本 |

## 相关链接

- 官网: http://www.sopwith.org/
- 在线版本: https://fragglet.github.io/sdl-sopwith
- Wikipedia: https://en.wikipedia.org/wiki/Sopwith_(video_game)
