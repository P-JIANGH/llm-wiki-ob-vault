---
title: NBlood
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, fps, build-engine, blood, duke-nukem-3d]
sources: [https://github.com/NBlood/NBlood]
---

# NBlood

> Blood / Exhumed / Redneck Rampage 游戏的逆向工程端口，基于 EDuke32 技术

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/NBlood/NBlood |
| 语言 | C/C++ |
| 构建系统 | GNU Make（Common.mak 跨平台框架） |
| 渲染/引擎 | Build Engine + EDuke32 |
| 许可 | GPL-2.0 |
| 主要贡献者 | Nuke.YKT, sirlemonhead, Hendricks266, NY00123, NoOne, tmyqlfpir |
| 版本 | BYTEVERSION 108 |

## 核心技术点

### 架构：多游戏合一端口
NBlood 仓库同时包含三个 Build Engine 游戏的逆向工程端口：
- **NBlood** — Blood (1997) 恐怖动作 FPS
- **PCExhumed** — Exhumed/PowerSlave (1996) 古埃及陵墓冒险 FPS
- **Rednukem** — Duke Nukem 3D / Redneck Rampage / NAM / NAPALM / WWII GI 等多款 Build 游戏

这与 EDuke32/Raze 的多游戏端口理念一致，但各有独立分支。

### Build Engine 复用
- 复用 Ken Silverman Build Engine 核心技术（`source/build/src/`）
- 基于 EDuke32 的 `source/blood/` / `source/exhumed/` / `source/rr` 子目录
- 使用 EDuke32 的 `common_game.h` 统一接口（BYTEVERSION 108）
- 资产数据与原版游戏文件完全兼容（需要原始 Blood 数据）

### GNU Make 跨平台构建
```
Common.mak          # 平台检测（Windows/Linux/Darwin/BSD/BeOS）
GNUmakefile         # EDuke32 Makefile 系统，模块化构建
source/
  blood/src/        # ~60+ .cpp/.h 文件，Blood 游戏逻辑
  exhumed/src/      # Exhumed 游戏逻辑
  rr/src/           # Redneck Rampage 游戏逻辑
  build/src/        # Build Engine 核心渲染/碰撞/地图
  glad/             # OpenGL 加载器
  imgui/            # ImGui 菜单系统
  audiolib/         # 音频库（OPL/GUS/MIDI/SDL多后端）
  libxmp-lite/      # MOD/XM tracker 音频播放
  mimalloc/         # 高性能内存分配器
  mact/             # Mac OS X 特定代码
```
Makefile 通过 `PACKAGE_REPOSITORY=1` 参数支持系统包管理器集成。

### 数据驱动 + 存档兼容
- 依赖原始游戏数据文件（BLOOD.INI, TILES000.ART 等）
- 支持原版存档兼容（BYTEVERSION 108）
- 可选 widescreen tiles 扩展包（nblood.pk3, dn64widescreen.pk3）
- Cryptic Passage（Blood 资料片）完整支持

## 玩法特点

- **Blood**: 1997 年 Monolith 制作的 cult 级恐怖 FPS，主角 CABAL 试图毁灭世界，玩家用各种武器（霰弹枪、火焰喷射器、Tesla 炮）对抗不死敌人
- **Exhumed/PowerSlave**: 古埃及主题陵墓探险 FPS，融合了解谜和战斗
- **Redneck Rampage**: 南方乡村风格幽默 FPS，外星人入侵背景

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 多游戏端口架构 | EDuke32/NBlood 的模块化 source/子游戏分离方式可复用 |
| GNU Make 跨平台 | Common.mak 平台检测框架适合嵌入式/游戏项目 |
| 旧游戏数据复用 | 资产与逻辑分离的设计思想有利于 mod 支持 |
| Build Engine 渲染 | Sector/Portal 渲染可研究用于 2.5D 游戏引擎 |
| GPL + 数据分离 | 引擎 GPLv2 + 游戏数据专有的双许可模式 |

