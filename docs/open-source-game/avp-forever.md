---
title: AvP Forever
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, fps, stealth, source-port, classic-revival]
sources: []
---

# AvP Forever

> Aliens versus Predator (1999) 源码维护项目，提供 Linux/现代平台移植

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/dreamer/avp-forever |
| 语言 | C + C++ (混合) |
| 构建系统 | Visual Studio (.dsp) + Watcom make (.mk) |
| 渲染/引擎 | Direct3D (win95/) + 软件渲染回退 |
| 许可 | 源码与游戏数据分离许可（需原版游戏数据） |

## 核心架构

### 分支设计（多源码叠加）

项目采用 **多分支 rebasing 策略**，将不同来源的 AvP 源码 rebasing 到官方 Build 117 基础上：

| 分支 | 来源 | 特性 |
|------|------|------|
| `master` | 官方 Rebellion Build 117 | 基础源码发布 |
| `other/icculus-releases` | icculus.org 分发包 | SDL1.2/SDL2 移植，Linux/OSX 支持 |
| `other/avp-source-code-update` | Assembla SVN | Direct3D9 渲染器，Win XP-Vista/7/8 支持 |
| `other/icculus-2009` | mbait/avpmp | 完整 icculus 开发历史到 2009 |
| `other/neuromancer/avp` | neuromancer/avp | FMV playback via libav，MorphOS 改动 |
| `other/scraft/avpmp` | Scraft/avpmp | OpenGL ES 掌机支持（Pyra/Pandora） |

### 源码结构

```
3dc/
├── avp/               # 游戏逻辑层（AI、物品、碰撞、行为）
│   ├── BH_*.c         # 行为系统（alien/marine/predator 各角色行为）
│   ├── AI_Sight.c    # AI 视线/感知
│   ├── particle.c    # 粒子特效
│   └── gameflow.c    # 游戏流程状态机
├── win95/             # Windows 平台层
│   ├── D3_*.cpp       # Direct3D 渲染
│   ├── bink.c         # Bink 视频解码
│   ├── smacker.c      # Smacker 视频解码
│   ├── chnkload.cpp   # IFF/ILBM 资源加载
│   └── CD_player.c    # CD 音频
└── frustrum.c         # 视锥裁剪
```

### 第三方库（嵌入式二进制）

| 库 | 用途 |
|----|------|
| Bink (binkw32.dll) | 视频过场动画解码 |
| Smacker (SMACKW32.DLL) | 压缩视频解码 |
| Miles Sound (dialog.dll) | 音频/语音 |
| ia3d.lib | 3D 音频定位 |

这些二进制库已包含在 repo 中，是运行游戏所必需的。

### 多角色系统

AvP 1999 拥有三个可玩种族，源码中各自独立实现：

- **Alien** (`BH_ALIEN.C`) — 群体 AI、酸性腐蚀、攀爬
- **Marine** (`BH_FAR.C`) — 武器系统、装甲、照明弹
- **Predator** (`BH_GENER.C`) — 红外视觉、隐身、腕刃

每个种族有独立行为状态机、动画系统和 HUD。

## 玩法特点

- **三族鼎立**：Alien / Marine / Predator 各有独特机制
- **即时恐怖**：第一人称潜行 + 战斗混合
- **环境互动**：灯/门/电梯等可操控物体
- **关卡编辑器**：支持自制关卡（3dc/ 包含地图相关代码）

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 多角色 AI | 三族独立行为系统可作为多类型 NPC AI 设计参考 |
| 源码叠加分支 | rebase 策略保持主线兼容同时容纳多方定制 — 适合开源协作模型 |
| 嵌入式二进制依赖 | 游戏数据与引擎分离的商业游戏源码复用模式 |
| 平台抽象 | win95/ 目录作为平台层示例 — 可学习如何设计跨平台渲染抽象层 |
| 资源加载 | IFF/ILBM/Bink/Smacker 多格式资源加载管道 |
