---
title: OpenGOAL (jak-project)
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, reverse-engineering, decompiler, lisp, ps2-port]
sources: []
---

# OpenGOAL (jak-project)

> Jak & Daxter 系列 PC 移植项目，通过逆向工程重建 GOAL 编译器 + 反编译游戏代码实现

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/open-goal/jak-project |
| 语言 | Common Lisp (GOAL/GOOS) + C++ (runtime/compiler) |
| 构建系统 | CMake + Taskfile.yml |
| 渲染/引擎 | OpenGL (PC port), PS2 原生渲染代码保留 |
| 许可 | MIT (编译器) + 需原版游戏资产 |
| Stars | 3316 |
| 规模 | 2.3M LOC GOAL + 634K LOC C++ |

## 核心技术点

### 四组件架构

1. **goalc** — GOAL 编译器 (~49K LOC C++)
   - 自研 GOAL→x86-64 编译器，支持 REPL、在线调试、代码热重载
   - 性能目标：与未优化 C 相当
   - 包含 `compilation/`, `emitter/`, `regalloc/`, `debugger/` 子模块

2. **decompiler** — GOAL 字节码反编译器 (~344K LOC C++)
   - 专为目标 PS2 GOAL 字节码设计，反编译输出可直接被 goalc 编译
   - `IR2/`, `Function/`, `Disasm/`, `VuDisasm/` 子模块
   - 需要原版 PS2 游戏 ISO 数据作为输入

3. **goal_src/** — 反编译游戏源码 (~2.3M LOC GOAL/GOOS)
   - 包含 jak1/jak2/jak3/jakx 四个游戏目录
   - jak1/game.gp 是入口文件
   - engine/, kernel/, levels/, pc/ 子目录

4. **game/** — C++ 运行时 (~241K LOC C++)
   - **C Kernel** (`kernel/`): GOAL 链接器、内存分配、Symbol 表、类型系统
   - **SCE Library** (`sce/`): Sony 标准库 PS2→PC 移植
   - **Overlord IOP** (`overlord/`): PS2 DVD 流媒体驱动（IODriveDMA）
   - **Sound** (`sound/`): 989SND 第三方音频库接口
   - **Graphics** (`graphics/`): OpenGL PC 渲染器，复刻 PS2 效果
   - **mips2c** (`mips2c/`): MIPS→C 翻译工具（翻译 PS2 GTE 等特殊硬件代码）

### GOAL 语言

GOAL 是 Naughty Dog 自研的 Lisp 方言（GAWS?），98% 游戏逻辑用 GOAL 编写：
- 动态链接目标文件格式（.go 文件）
- 支持运行时代码热替换（类似 Slime/Swank REPL）
- `goal_src/` 中的 `.gc`/`.gs` 文件是 GOOS/GOAL 源码

### 反编译方法论

- 反编译器输出 `.gc` 文件，可直接被 goalc 编译
- 通过 `iso_data/` 文件夹提供原版 PS2 游戏数据
- 反编译结果放入 `goal_src/`，手动清理注释和格式
- 单元测试验证反编译→重编译 循环的正确性

### Jak 游戏状态

| 游戏 | 状态 | 说明 |
|------|------|------|
| Jak 1 | Polished/Complete | 完全可玩，PC 移植成熟 |
| Jak 2 | Beta | 主要功能完成，少量已知问题 |
| Jak 3 | In Progress | 大量工作待完成 |
| Jak X | Planned | 计划中 |

## 玩法特点

- 原版 Jak & Daxter 三部曲完整移植（需原版 PS2 资产）
- 支持 PC 宽屏/高分辨率/现代显卡
- 键盘鼠标操控（可选）
- 在线多人（部分版本）

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 反编译器架构 | 自研字节码反编译器设计模式，输出→输入可逆闭环 |
| REPL 驱动开发 | goalc REPL 连接运行时热重载代码，对 AI Agent 迭代开发有参考价值 |
| 多游戏代码共享 | jak1/jak2/jak3 代码共享结构（shared kernel/engine），模组化架构 |
| 资产提取管线 | iso_data→assets 提取流程，游戏资源与代码完全分离 |
| Lisp 方言实现 | GOAL 作为领域特定 Lisp 的设计决策，game logic 完全用 DSL 表达 |
| PS2 硬件仿真 | mips2c/Overlord/IOP 架构展示如何用 C++ 仿真游戏主机硬件 |

## 相关页面

- [[open-source-game/vvvvvv]] — 另一个纯重实现游戏（无引擎）
- [[open-source-game/zelda-3]] — SNES 反编译项目，同类逆向工程方法论
- [[open-source-games-list]] — 开源游戏完整列表
