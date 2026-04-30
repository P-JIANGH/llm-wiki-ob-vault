---
title: NetHack
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, roguelike, dungeon-crawler]
sources: [https://github.com/NetHack/NetHack]
---

# NetHack

> 经典 Roguelike 地下城探索游戏，Rogue/Hack 的直系后裔，3.7 为开发中版本。

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/NetHack/NetHack |
| 默认分支 | NetHack-3.7 |
| 语言 | C（纯 C，非 C++） |
| 仓库大小 | ~163 MB |
| Stars | 3,536 |
| Commits | 18,442 |
| 许可 | 定制开源许可（见 dat/license） |

## 核心技术点

### 纯 C 无引擎架构
- 完全自包含的纯 C 代码库，无第三方游戏引擎依赖
- 平台抽象层在 `sys/` 下分离：unix/、windows/、amiga/、msdos/、vms/、share/、libnh/
- 窗口系统抽象在 `win/` 下分离：Qt/、X11/、tty/、curses/、macosx/、chain/、shim/

### 目录结构

```
NetHack-3.7/
├── src/          # 核心游戏逻辑 C 源码
│   ├── allmain.c  # 主循环
│   ├── hack.c    # 移动/战斗核心
│   ├── apply.c   # 物品使用
│   ├── artifact.c # 神器系统
│   ├── attrib.c  # 属性系统
│   └── ...       # 大量 .c 文件
├── dat/          # 游戏数据（Lua + 文本）
│   ├── Arc-*.lua ~ Val-*.lua  # 14 个职业的地牢/关卡 Lua 脚本
│   ├── Mon-*.lua  # 怪物定义
│   ├── data.base # 基础数据
│   ├── dungeon.lua # 地牢配置
│   └── ...
├── include/      # 头文件（config.h, extern.h, hack.h 等）
├── sys/          # 平台相关代码
│   ├── unix/     # Unix/Linux
│   ├── windows/  # Windows
│   ├── libnh/    # 共享库抽象
│   └── share/    # 跨平台共享
├── win/           # UI 前端
│   ├── Qt/       # Qt GUI
│   ├── tty/      # 终端 TTY
│   ├── curses/   # Curses 界面
│   ├── X11/      # X11 窗口
│   └── macosx/   # macOS Cocoa
├── doc/          # 开发文档
├── util/         # 工具程序（makedefs 等）
├── test/         # 测试
└── DEVEL/        # 开发者文档
```

### Lua 数据驱动地牢生成（3.7 新特性）
- 3.7 版本将原有的 yacc/lex 级关卡编译器替换为运行时 Lua 脚本
- `dat/` 下每个职业有独立 Lua 脚本：`Arc-fila.lua`、`Mon-goal.lua` 等
- 14 个职业（Archeologist/Barbarian/Caveperson...Wizard）各有独立地牢配置
- Lua 脚本在地牢运行时加载，支持热重配置无需重新编译

### 3.7 架构改进

| 改进 | 说明 |
|------|------|
| 跨平台编译 | 支持在平台 A 编译、平台 B 运行（Cross-compiling） |
| Lua 关卡编译器 | 替代 yacc/lex build-time 编译 |
| 可移植存档 | 结构化导出打破平台/架构限制 |
| Play Again | 无需退出的游戏重开支持 |
| 变量结构化 | 全局变量收敛到 `ga`~`gz` 结构（decl.h/decl.c） |

### 窗口系统抽象
NetHack 的 `win/` 子系统实现了游戏逻辑与显示的完全分离：
- `wintype.h` 定义窗口接口 `win_procs` 结构
- 各平台 `window.c` 实现具体渲染
- 支持 TTY/curses（文字）、Qt（GUI）、X11（图形）等多种前端

## 玩法特点

- **经典 Roguelike**：回合制、随机生成、永久死亡
- **ASCII + Tiles 双模式**：终端 ASCII 字符 or 图形 tiles
- **14 个种族职业**： Archeologist~Wizard，各有独特地牢层和策略
- **深度物品系统**：武器、护甲、药水、卷轴、法杖等复杂交互
- **神祇契约系统**：部分分支（NetHack Fourk）含宗教契约机制

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 无引擎纯 C 架构 | 极简依赖、直接硬件控制，适合高性能游戏 |
| Lua 数据驱动 | 运行时加载配置实现高度 mod 友好性 |
| 多前端抽象 | win_procs 结构分离游戏逻辑与渲染，值得借鉴 |
| 跨平台编译 | sys/share/ 跨平台抽象层设计参考 |
| Roguelike AI | 怪物 AI 路径、物品识别算法、随机地牢生成 |

