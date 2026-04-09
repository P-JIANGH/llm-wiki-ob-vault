---
title: Zelda3
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, reverse-engineering, snes-emulator, action-adventure]
sources: [raw/articles/open-source-games-list-2026.md]
---

# Zelda3

> Zelda 3: A Link to the Past 的完全重实现，70-80kLOC 纯 C 代码，可玩通关

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/snesrev/zelda3 |
| 语言 | C（~79kLOC） |
| 构建系统 | Makefile / Visual Studio |
| 渲染 | OpenGL + GLSL Shader |
| 依赖 | SDL2 |
| 许可 | MIT |
| 平台 | Windows / Linux / macOS / Nintendo Switch |

## 核心技术点

### SNES 硬件仿真层
项目包含完整的 SNES 模拟器核心（`snes/` 目录）：
- **CPU**: 65c816 处理器仿真
- **PPU**: 图像处理单元（来自 [LakeSnes](https://github.com/elzo-d/LakeSnes)）
- **DSP**: 声音数字信号处理器
- **APU**: 音频处理单元
- **DMA**: 直接内存访问
- **Input**: 手柄输入处理

### 验证架构（独特亮点）
```c
// 可选模式：与原始 ROM 逐帧对比 RAM 状态
./zelda3 zelda3.sfc  // 传入 ROM 文件路径启动验证模式
```
- 同时运行原始机器码和 C 重实现
- 每帧结束后对比两者 RAM 状态
- 确保 C 代码行为与原始游戏完全一致

### 资源提取系统
```
zelda3.sfc (原始 ROM) → Python 脚本提取 → zelda3_assets.dat
```
- 使用 `assets/restool.py` 从原始 ROM 提取所有资源
- 提取后 ROM 不再需要
- 资源包括：关卡数据、精灵图表、声音数据等

### 现代增强功能
- 像素着色器支持（自定义 shader 渲染）
- 宽屏支持（16:9 / 16:10）
- 高清世界地图
- MSU-Audio 音轨支持
- 副物品槽（X 键按住选择）
- L/R 键快速切换当前物品

### 快照/回放系统
```c
F1-F10     // 加载快照
Shift+F1-F10  // 保存快照
Ctrl+F1-F10   // 回放快照
Tab        // Turbo 模式
```
- Joypad 输入历史被记录在快照中
- 可在 Turbo 模式下回放验证行为正确性
- 用于开发调试和 bug 复现

## 项目结构

```
zelda3/
├── src/                    # 游戏逻辑重实现 (~79kLOC C)
│   ├── main.c             # 入口点
│   ├── player.c           # 林克角色逻辑 (211KB)
│   ├── overworld.c        # 世界地图 (135KB)
│   ├── dungeon.c          # 地下城 (295KB)
│   ├── sprite_main.c      # 精灵主逻辑 (807KB)
│   ├── glsl_shader.c      # Shader 渲染
│   ├── hud.c              # 抬头显示
│   └── ...
├── snes/                   # SNES 硬件仿真
│   ├── cpu.c, cpu.h       # 65c816 CPU
│   ├── ppu.c, ppu.h       # PPU 图形
│   ├── apu.c, apu.h       # 音频
│   ├── dsp.c, dsp.h       # DSP
│   └── ...
├── platform/              # 平台特定代码
│   ├── win32/             # Windows
│   └── switch/            # Nintendo Switch
├── third_party/           # 第三方库
│   ├── gl_core/           # OpenGL 核心
│   └── opus-1.3.1/        # Opus 音频解码
└── Makefile
```

## 玩法特点

- 完全可玩：从开头到结局通关
- 经典《 Zelda: A Link to the Past》体验
- 支持现代宽屏显示
- 可配置键盘/手柄

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **逆向工程方法论** | 逐帧 RAM 对比验证是确保重实现准确性的金标准 |
| **仿真器架构** | 模块化分离：CPU/PPU/APU/DSP 独立仿真，通过总线互联 |
| **数据驱动** | 资源与代码分离，Python 工具链提取 ROM 数据 |
| **快照系统** | 记录输入历史实现确定性回放，对 AI 游戏测试很有价值 |
| **平台移植** | SDL2 抽象层 + 条件编译支持多平台 |

## 相关链接

- Discord: https://discord.gg/AJJbJAzNNJ
- Wiki: https://github.com/snesrev/zelda3/wiki
- LakeSnes (PPU/DSP 基础): https://github.com/elzo-d/LakeSnes
