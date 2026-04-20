---
title: DOOM64-RE
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, reverse-engineering, n64, doom, first-person-shooter]
sources: [https://github.com/Erick194/DOOM64-RE]
---

# DOOM64-RE

> Doom 64 完全逆向工程 — GEC 团队用约1.5年重建N64经典

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/Erick194/DOOM64-RE |
| 语言 | C + MIPS 汇编 |
| 构建系统 | N64 SDK Makefile (smake) |
| 平台 | Nintendo 64 (跨编译) |
| 许可 | 未声明 (逆向工程) |
| 代码规模 | ~50K LOC C |

## 背景

Doom 64 是 1997 年在 N64 平台发行的 Doom 系列作品，由 Midnight Software 开发、Activision 发行。2000年代曾有民间 mod 开发热潮，但原始代码已丢失。DOOM64-RE 是 GEC (Game Engineering Community) 对 Doom 64 的**完整逆向工程**，作者从零开始重建，耗时约1.5年（2022-2023年）。该项目并非修改现有代码，而是通过分析原始 ROM 重建可编译的 C 代码。

## 核心技术点

### N64 平台架构
- **交叉编译**: 需要 N64 SDK (可从 mega.nz 下载或 n64.dev 获取)，Windows XP 或 Linux 环境编译
- **iQue 版本**: 支持 iQue (神游) 中国版 N64，使用 iQue SDK，Red Hat Linux 9 编译
- **双版本支持**: USA 版本为主，需原始 DOOM64.WAD/WMD/WSD/WDD 资源文件

### 渲染器架构 (r_*.c)
- **软件渲染**: r_phase1.c / r_phase2.c / r_phase3.c 三阶段渲染管线
- **不同于 PC 版 Doom**: N64 版使用不同的渲染路径
- **F3DEX_GBI**: 使用 S2DEX 微码 (RSP 图形微代码)，N64 特有的 3D 渲染接口

### 游戏逻辑 (p_*.c)
- **p_enemy.c**: 敌人 AI 状态机 (36KB)
- **p_mobj.c**: 地图对象系统
- **p_user.c**: 玩家输入和控制
- **p_inter.c**: 交互/战斗逻辑
- **p_setup.c**: 关卡初始化
- **p_spec.c**: 特殊效果 (电梯、门、发光等)

### 音频系统 (wess*)
- **WESSLIB**: 从《真人快打 Trilogy》N64 移植的音频库
- **wessseq.c**: 音乐序列器
- **wesstrak.c**: 音轨系统
- **wessarc.c/wessedit.c**: 资源归档编辑
- 可选使用原始 WESSLIB.o 而非重建代码

### 地图/资产系统
- **Data/**: 原始游戏数据目录 (需从 ROM 提取)
- **Tools/Doom64Extractor.zip**: 提取工具，含源码
- **w_wad.c**: WAD 资源加载器
- **doomdata.h**: 游戏数据结构定义

### 编译输出
- **Makefile**: 使用 `make` 编译，`MAKE_ROM.bat` Windows 批处理
- **最终输出**: doom64.n64 ROM 文件

## 新增/恢复的功能

README 提到以下原本被锁定的功能：
- **SECURITY KEYS**: 解锁原版所有钥匙
- **WALL BLOCKING**: 类似 noclip 的穿墙
- **LOCK MONSTERS**: 锁定敌人移动
- **MUSIC TEST**: 播放游戏中所有音乐
- **Colors**: 颜色开关选项
- **FULL BRIGHT**: 全亮度模式
- **FILTER**: 3-point 滤镜开关

## 与公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 经典游戏复刻 | 逆向工程方法论：逐模块重建 + 逐帧 RAM 对比验证 |
| 平台移植 | 交叉编译工具链设计：如何用现代工具链复现老平台 SDK |
| 软件渲染 | N64 软件渲染器设计：RSP/微代码架构可为轻量 3D 参考 |
| 资源复用 | 原始游戏数据提取工具：如何从封闭格式提取资产 |
| 音效系统 | 嵌入式游戏音频库设计：WESS 库的序列/音轨双层结构 |
| 调试工具 | Code::Blocks 项目文件用于代码组织和验证 |

## 相关页面

- [[doom]] — id Software 原版 Doom
- `doom-3-bfg-edition` — Doom 3 BFG 版 (id Tech 4)
- `reverse-engineering-projects` — 逆向工程项目列表
