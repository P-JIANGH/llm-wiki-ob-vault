---
title: Chocolate Quake
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, fps, source-port, quake, dos, software-rendering]
sources: [https://github.com/Henrique194/chocolate-quake]
---

# Chocolate Quake

> 精准还原 Quake v1.09 DOS/WinQuake 体验的极简源码端口，Bug 兼容优先，无现代增强

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/Henrique194/chocolate-quake |
| 语言 | C99 |
| 构建系统 | CMake 3.21+ |
| 渲染 | 纯软件渲染（无硬件加速） |
| 依赖 | SDL2 >= 2.26.5, SDL2_net, libvorbis, libflac, libmad |
| 许可 | GNU General Public License v3 |
| 平台 | Windows, Linux, macOS |

## 核心技术点

### Bug-Compatible 设计哲学
与 Chocolate Doom 一脉相承：**精准还原而非改进**。重现 Quake v1.09 及更早 DOS 版本的行为，包括原始 bug 和 quirks。输入处理、渲染和计时机制力求与原版一致。

### 无硬件加速
- 无 OpenGL/Vulkan 加速
- 纯软件渲染，保持 DOS/WinQuake 原生体验
- 无现代视觉效果（如阴影、bloom 等）

### 模块化源码结构
```
src/
├── camera/      # 摄像机系统
├── client/      # 客户端逻辑
├── cmd/         # 命令解析
├── common/      # 公共定义
├── console/     # 控制台
├── crc/         # CRC 校验
├── end_screen/  # 结束画面
├── host/        # 主机初始化+主循环
├── input/       # 输入处理
├── mathlib/     # 数学库
├── memory/      # 内存管理
├── menu/        # 菜单系统
├── model/       # 模型加载
├── net/         # 网络通信
├── progs/       # QuakeC 程序虚拟机
├── renderer/    # 软件渲染器
├── screen/      # 屏幕管理
├── server/      # 服务器逻辑
├── sound/       # 音频子系统
├── status_bar/  # 状态栏
├── sys/         # 系统抽象
├── video/       # 视频输出
└── wad/         # WAD 资源读取
```

### 音频后端
支持多种音频格式：MP3 (libmad)、OGG (libvorbis)、FLAC，以及外部音乐播放（track02.ogg ~ track11.ogg）。

### 构建系统
- **Windows/macOS**：使用 vcpkg 子模块管理依赖
- **Linux**：使用系统库（apt/pacman 等）
- CMake Presets：`release`、`debug`、`release-vcpkg`、`debug-vcpkg`

## 与标准 Quake 的区别

| 维度 | Chocolate Quake | 官方 Quake/id Tech |
|------|----------------|-------------------|
| 渲染 | 纯软件渲染 | 软件+GLQuake 可选 |
| Bug 兼容性 | 保留原版 bug | 修复 |
| 现代化增强 | 无 | 多 |
| 目标用户 | 怀旧/历史研究 | 现代游戏体验 |

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 复古体验还原 | Bug-compatible 模式适合需要还原历史版本的项目 |
| 软件渲染架构 | 轻量级渲染器设计参考，无 GPU 依赖的嵌入式方案 |
| 模块化结构 | 按子系统拆分（host/client/server/renderer）便于维护 |
| 平台抽象层 | sys/ 将平台差异（Win/Linux/Mac）统一抽象 |
| 音频子系统 | 多种格式支持+外部音乐目录设计 |

## 相关页面

- [[open-source-game/quake]] — 原始 Quake 源码
- [[open-source-game/chocolate-doom]] — Chocolate Doom（同一设计哲学的 Doom 端口）
- [[open-source-game/quake-2]] — Quake II 源码
- [[open-source-game/quake-iii-arena]] — Quake III Arena 源码
