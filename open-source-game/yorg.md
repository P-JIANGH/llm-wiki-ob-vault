---
title: Yorg
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, racing, panda3d, python, trackmania]
sources: [https://github.com/cflavio/yorg]
---

# Yorg

> TrackMania 风格开源赛车游戏，Panda3D 引擎驱动，支持多人联机和 AI 对手

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/cflavio/yorg |
| 语言 | Python 3.x |
| 构建系统 | SCons (SConstruct) |
| 渲染/引擎 | Panda3D |
| 许可 | GPLv3（代码）+ CC BY-SA（资产） |
| 平台 | Windows / OSX / Linux |
| 开发者 | Ya2 (itch.io) |

## 架构概览

Yorg 基于 **Panda3D** 游戏引擎构建，采用 **Python** 作为主要开发语言，代码结构清晰：

```
yorg/              # 主游戏逻辑
├── yorg.py         # Yorg 主类（334行），继承 yyagl.game.Game
├── logic.py        # 游戏逻辑（818行），核心 FSM/事件处理
├── fsm.py          # 状态机（275行）
├── event.py        # 事件处理（33行）
├── client.py       # 客户端逻辑（104行）
├── audio.py        # 音频管理（10行）
└── thanksnames.py  # AI 驾驶员名字生成

yracing/            # 子模块（git submodule）：赛车物理/车辆/传感器
yyagl/              # 子模块（git submodule）：Ya2 Game Library，游戏框架基础库
```

**关键设计：子模块分离**
- `yyagl`：Ya2 通用游戏库（菜单/GUI/配置/构建系统）
- `yracing`：Ya2 赛车物理引擎（车辆/轮胎物理/传感器）

## 核心技术点

### 1. 多人网络架构
- **XMPP 协议**：内置 XMPP 服务器通信（默认 `ya2tech.it:9099`）
- **帧同步**：每局最多 4 名玩家，端口 9099
- **服务器模式**：`--server` 参数指定游戏服务器
- 备用 dev 服务器：`ya2tech.it:9098`

### 2. 状态机驱动 (FSM)
- `fsm.py` 275 行实现完整状态机，管理游戏流程
- 状态转换包括：菜单 → 赛道选择 → 比赛 → 结束

### 3. 数据驱动配置
- `options.json` 持久化玩家设置（分辨率/按键/音量等）
- `phys.json` 描述每辆车的物理参数（assets/cars/{car}/phys.json）
- `track.json` 描述赛道元数据（assets/tracks/{track}/track.json）

### 4. 资产构建管线
- `python setup.py images lang models` 构建游戏资产
- `python setup.py bdist_apps` 打包发布版本
- 支持国际化（英/德/西/法/意等语言）

### 5. 双渲染路径
- PBR 渲染可选：`pbr=1` 启用
- 多线程渲染：`multithreaded_render=1`（默认开启）
- Gamma 校正：`gamma=2.2`
- OpenGL 3.2 兼容模式可选

## 玩法特点

| 特性 | 描述 |
|------|------|
| 赛道编辑 | 内置赛道系统，JSON 配置 |
| 车辆数量 | 支持 2-8 辆车同场 |
| AI 对手 | 8 名 AI 驾驶员（随机生成名字） |
| 操控 | 键盘/手柄双支持，4人本地多人 |
| 车辆损坏 | 两级视觉损坏模型（cardamage1/damage2） |
| 视角 | 顶视角（默认） |

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **多人游戏架构** | XMPP 协议简化了房间匹配和状态同步，可参考其多人帧同步模式 |
| **Panda3D + Python** | 快速原型验证首选，Python 生产力 + Panda3D 渲染能力，适合赛车游戏 MVP |
| **子模块复用** | `yyagl` 框架分离值得学习，主游戏逻辑与通用框架解耦 |
| **数据驱动** | `phys.json`/`track.json` 完全数据驱动游戏参数，便于策划快速调整 |
| **资产管线** | SCons 构建 + asset 分离，发布流程可参考 |
| **4 人本地多人** | 多手柄支持架构，可复用至派对游戏 |

## 补充说明

- 需要递归 clone（`git clone --recursive`）获取完整代码
- 推荐切换 `stable` 分支用于发行
- 原版游戏数据（车辆模型/贴图）需通过 `setup.py` 脚本构建生成
