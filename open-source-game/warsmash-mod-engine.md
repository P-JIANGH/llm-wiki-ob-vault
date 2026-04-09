---
title: Warsmash Mod Engine
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, emulator, rts, warcraft-iii, libgdx, java]
sources: []
---

# Warsmash Mod Engine

> Warcraft III 模拟器，基于 LibGDX 游戏引擎，无需原版游戏资产即可运行

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/Retera/WarsmashModEngine |
| 语言 | Java 17（Java 8 语法），~97K LOC，2118 个 Java 文件 |
| 构建系统 | Gradle (multi-module) |
| 渲染/引擎 | LibGDX + OpenGL/WebGL |
| 许可 | AGPL |
| 依赖上游 | mdx-m3-viewer（模型渲染），HiveWE（地形渲染） |

## 核心技术点

### 多模块 Gradle 架构

```
warsmash-mod-engine/
├── core/           # 核心游戏引擎
├── desktop/        # 桌面启动器
├── server/         # 服务器组件
├── shared/         # 共享代码
├── fdfparser/      # FDF（Font Definition File）解析器
├── jassparser/     # JASS 语言解析器（ANTLR）
└── resources/      # Warsmash 自有资产
```

### JASS 脚本虚拟机

- ANTLR 4 词法/语法分析生成 `SmashJassLexer` 和 `SmashJassParser`
- 栈帧式解释器 (`JassStackFrame`/`JassThread`)
- 指令级执行：算术/分支/循环/函数调用/结构体分配
- 支持 native 函数调用扩展

### 模型与地图加载

- **MDX/M3 模型**：从 [mdx-m3-viewer](https://github.com/flowtsohg/mdx-m3-viewer) 转录
  - 光照系统支持日夜循环 + 点光源（火把等）
  - 支持 War3Patch 以来格式变化
- **W3X 地图**：从 [HiveWE](https://github.com/stijnherfst/HiveWE) 转录地形渲染系统
  - Cliff mesh 旋转 90 度以匹配 World Editor
  - 水波/阴影/建筑投影等增强

### 虚拟文件系统

INI 配置驱动的分层数据源系统：

```
[DataSources]
# 支持多种归档格式
MPQ 归档 → Patch 1.22-1.28
.w3mod 文件夹 → Patch 1.29-1.31
CASC 直接读取 → Patch 1.32+
```

**支持版本**：1.22 / 1.27 / 1.28 / 1.29 / 1.30 / 1.31 / 1.32
**不支持**：1.33+（模型格式彻底改变）

### 依赖库

| 库 | 用途 |
|----|------|
| LibGDX | 游戏引擎、渲染、音频 |
| blp-iio-plugin | BLP 纹理解析 |
| MPQ parser (DrSuperGood) | MPQ 归档解析 |
| FLAC parser (nayuki) | FLAC→WAV 转码（Patch 1.32+ 音频） |
| SLK/INI parsers | 单位数据表解析 |

## 玩法特点

- 完整 Warcraft III 运行时模拟（RTS 核心玩法）
- 支持自定义地图（W3X）和 Mod
- 虚拟文件系统允许多版本资产混用
- 支持 Reforged HD 模型切换（`_hd.w3mod` 前缀）
- 需要原版游戏资产文件（需自行购买配置）

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **游戏引擎适配** | LibGDX 作为跨平台游戏引擎的实用性 |
| **脚本虚拟机** | JASS VM 的指令级设计模式（栈帧+指令visitor） |
| **数据驱动** | INI 配置的虚拟文件系统设计，支持多版本兼容 |
| **代码复用** | 从上游项目转录代码的技术路径（注明来源） |
| **逆向工程** | 模型格式（MDX/M3）、地图格式（W3X）、归档格式（MPQ/CASC）解析 |

## 局限性

- Patch 1.33+ 不支持（新模型格式未解析）
- 音频转码有精度损失（FLAC→WAV）
- 2026-04-10 时 Lip-sync 语音未实现（Reforged）
- Light 系统存在内存泄漏（慢速机器渐近卡顿）
