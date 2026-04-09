---
title: AssaultCube
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, fps, multiplayer, cube-engine, shooter]
sources: [https://github.com/assaultcube/AC]
---

# AssaultCube

> 免费多人 FPS，基于 CUBE 引擎，低延迟网络，可协作地图编辑

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/assaultcube/AC |
| 语言 | C++ |
| 构建系统 | Makefile (clang++/g++) |
| 渲染/引擎 | OpenGL + SDL2，基于 CUBE Engine |
| 许可 | ZLIB (极宽松，可商用、可再许可) |
| 平台 | Windows, Linux, macOS |
| 包大小 | ~50MB |

## 核心技术点

### CUBE Engine 派生架构
- 源于 Wouter van Oortmerssen 的 CUBE Engine (2003, ZLIB License)
- 继承 CUBE 的轻量级设计理念：高效带宽利用、低延迟网络
- 源码结构：`source/src/` 为主代码目录，`source/enet/` 为网络库

### 低延迟网络系统
- 使用 **ENet** 库进行可靠 UDP 网络传输
- 设计目标：56 Kbps 仍可流畅游戏
- `server.cpp` (57471 bytes 最大文件) 处理服务器逻辑
- `clients2c.cpp` 处理客户端-服务器通信协议
- 支持 master server 发现机制 (`master.cpp`)

### 协作地图编辑 (Cooperative Editmode)
- 核心特性：多人实时协作编辑地图
- `editing.cpp` 实现所有编辑命令
- `worldio.cpp` 处理地图加载/保存
- 支持 `editmode` 切换，可随时进入/退出编辑状态
- 内置编辑菜单 (`menus_edit.cfg`)

### Bot AI 系统
- 完整 Bot AI 实现：`source/src/bot/` 目录
- `ac_bot.cpp/h` — AssaultCube 专用 Bot
- `bot.cpp/h` — 通用 Bot 框架
- `bot_waypoint.cpp/h` — 路点导航系统
- `bot_ai.cpp/h` — AI 决策逻辑
- `botmanager.cpp` — Bot 管理器

### 武器与游戏逻辑
- `weapon.cpp` — 武器系统（枪械、近战等）
- `clientgame.cpp` — 客户端游戏逻辑
- `game/` 子目录包含游戏模式逻辑

### 音频系统
- `audiomanager.cpp` — OpenAL 音频管理
- `oggstream.cpp` — OGG 流媒体支持
- 低带宽音频设计

### 渲染架构
- `rendergl.cpp` — OpenGL 渲染器
- `renderhud.cpp` — HUD 渲染
- `texture.cpp` — 纹理管理
- MD2/MD3 模型支持 (`md2.h`, `md3.h`)

## 游戏特点

### 游戏模式
- Deathmatch (团队/个人)
- Survivor
- Capture the Flag (CTF)
- Hunt the Flag
- Keep the Flag
- Pistol Frenzy
- Last Swiss Standing
- One-Shot One-Kill

### 内置功能
- **地图编辑器**：实时协作编辑，支持 2D/3D 编辑模式
- **Bot 系统**：单人训练，支持 Bot AI 路径学习和行为决策
- **Demo 录制**：回放系统录制游戏过程
- **自动下载**：服务器间地图/资源自动同步 (`autodownload.cpp`)
- **服务器浏览器**：发现和连接服务器 (`serverbrowser.cpp`)

### 配置系统
- 配置文件：`config/` 目录，`.cfg` 文件格式
- 命令系统：`command.cpp` 实现命令解析和别名
- 控制台：`console.cpp` 实现游戏内控制台

## 架构图

```
source/
├── src/                 # 主源码
│   ├── main.cpp         # 入口、初始化、主循环
│   ├── server.cpp       # 服务器逻辑 (最大文件)
│   ├── client.cpp       # 客户端网络
│   ├── clients2c.cpp    # 客户端-服务器协议
│   ├── bot/             # Bot AI 系统
│   │   ├── ac_bot.cpp   # AC 专用 Bot
│   │   ├── bot.cpp      # 通用 Bot
│   │   ├── bot_ai.cpp   # AI 决策
│   │   └── bot_waypoint.cpp  # 路点导航
│   ├── editing.cpp      # 地图编辑器
│   ├── worldio.cpp      # 地图 I/O
│   ├── weapon.cpp       # 武器系统
│   ├── rendergl.cpp     # OpenGL 渲染
│   ├── renderhud.cpp    # HUD 渲染
│   ├── texture.cpp      # 纹理管理
│   ├── audiomanager.cpp # OpenAL 音频
│   └── crypto.cpp       # 加密工具
├── enet/                # ENet 网络库
├── include/             # 公共头文件
└── lib/                 # 预编译库
```

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **网络同步** | ENet + 可靠 UDP 的低延迟设计适合实时竞技游戏 |
| **协作编辑** | 多人实时协作编辑模式可作为 AI 辅助关卡设计的参考架构 |
| **Bot AI 架构** | 路点系统 + AI 决策分离设计可用于游戏中 AI 对手 |
| **轻量引擎** | CUBE 引擎简洁设计（50MB 包体积）适合快速原型验证 |
| **确定性感** | CUBE 系列引擎的确定性设计是多人竞技平衡性的基础 |
| **游戏 MOD** | ZLIB 许可允许商业使用，可作为技术研究基础 |

## 衍生项目

- **Cube 2: Sauerbraten** — CUBE Engine 的后继者，3D 渲染增强
- **Red Eclipse** — 同样基于 CUBE Engine 的竞技场射击游戏
- AssaultCube 可视为 Cube 的"射击游戏特化"分支
