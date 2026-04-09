---
title: Descent 3
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, fps, 6dof, space-shooter, retro, engine]
sources: [raw/articles/open-source-games-list-2026.md]
---

# Descent 3

> 经典 6DOF（六自由度）太空射击游戏引擎开源重实现

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/DescentDevelopers/Descent3 |
| 语言 | C / C++ |
| 构建系统 | CMake + Ninja / Visual Studio 2022 |
| 渲染 | OpenGL（含 SDL3 跨平台抽象层） |
| 许可 | GPL-3.0 |
| 版本 | 1.6.0 |
| 依赖管理 | vcpkg（Windows 内置，macOS/Linux 需手动配置） |
| 平台 | Windows / macOS / Linux |

## 项目定位

这是 **Descent 3** 的开源引擎实现，由 Descent 社区在原 GPL-3.0 代码基础上维护，包含 1.5 patch（由 Kevin Bentley 和 Jeff Slutter 编写）。需要注意的是：**必须自行提供原始游戏数据文件**，引擎本身不含游戏内容。

## 核心技术点

### 6DOF 空间移动
Descent 系列最核心的特性——六自由度移动，区别于传统 FPS 的平面移动，玩家可在 3D 空间中任意翻滚、倒转、侧飞。这是通过数学上的欧拉角+四元数结合实现的，是其独特游戏性所在。

### 模块化子系统架构
```
Descent3/        # 主游戏逻辑（133 cpp + 141 h）
├── ai*          # AI 行为系统
├── renderer/    # 渲染管线（OpenGL）
├── networking/  # 网络通信
├── physics/     # 物理引擎
├── scripts/     # 脚本系统
├── ui/          # UI/Cockpit 仪表盘
├── netgames/   # 多人游戏模式
├── model/       # 3D 模型加载
├── bitmap/      # 纹理/Bitmap 处理
├── ddion/       # I/O 系统
├── mem/         # 内存管理
└── ...
```

### 扁平子目录（库模块）
| 目录 | 职责 |
|------|------|
| `2dlib/` | 2D 图形库 |
| `bitmap/` | Bitmap/纹理处理 |
| `cfile/` | 文件 I/O 打包系统 |
| `ddio/` | 跨平台 I/O 抽象层 |
| `grtext/` | 文字渲染 |
| `libmve/` | MVE 视频解码（游戏过场动画） |
| `model/` | 3D 模型格式 |
| `physics/` | 物理/碰撞检测 |
| `rtperformance/` | 性能统计 |
| `unzip/` | ZIP/HOG 资源包解压 |
| `AudioEncode/` | 音频编码 |
| `sndlib/` | 音频库 |
| `stream_audio/` | 流式音频 |
| `netcon/` | 网络控制台 |

### 构建系统
- CMake 3.20+ + Ninja（或 Visual Studio 2022）
- vcpkg 统一依赖：SDL3（视音频输入）、cpp-httplib（HTTP 下载关卡）、glm（数学库）、plog（日志）、zlib（压缩）
- 支持 CMake Presets：`win` / `linux` / `macos`
- 编译产物默认放 `builds/<platform>/build/Debug|Release/`

### 协作与分发
- Discord: Descent Developer Network
- cpp-httplib 集成：游戏运行时可通过 HTTP 下载额外关卡
- Level 文件格式：.hog / .txt 打包系统

## 玩法特点

- **6DOF 飞行射击**：在密闭 3D 隧道/空间中自由翻滚飞行，配合导弹/激光/离子炮
- **多人网络**：经典 IPX 网络协议继承，现代端口支持 TCP/IP
- **关卡编辑器**：内嵌地图编辑器，支持自制关卡
- **AI 敌人**：多类型机器人敌人，各有不同攻击模式

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 6DOF 移动物理 | 3D 空间任意方向运动的自定义物理实现（非 CharacterController 平面限制） |
| 引擎/数据分离 | 必须提供游戏数据的设计——AI 演示环境可复用此模式，引擎开源+内容闭源 |
| CMake+vcpkg 现代构建 | C++ 项目依赖声明式管理参考 |
| SDL3 跨平台抽象 | 统一视音频输入抽象层，无需直接调用平台 API |
| 多人网络同步 | 继承自原版 IPX 的 P2P 网络模型对实时同步有参考价值 |

## 相关页面

- [[open-source-games-list]] — 开源游戏列表总览
- [[open-source-game-engines-comparison]] — 开源游戏引擎对比
