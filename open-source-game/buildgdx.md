---
title: BuildGDX
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [project, architecture, framework, learning]
sources: []
---

# BuildGDX

> Ken Silverman's Build Engine 的 Java/LibGDX 跨平台移植，支持 Duke Nukem 3D / Shadow Warrior 等 Build 游戏

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/vogonsorg/BuildGDX |
| 语言 | Java（~74K LOC，375 个 Java 文件） |
| 构建系统 | Eclipse 项目文件（.project/.classpath），无 Maven/Gradle |
| 渲染引擎 | LWJGL2 / LWJGL3（OpenGL）+ 软件渲染 + Android Canvas |
| 许可 | GPLv3（核心）+ Apache 2.0（部分组件）；Ken Silverman BUILD LICENSE |
| 维护者 | Alexander Makarov-[M210] (m210-2007@mail.ru) |
| 最新提交 | 活跃维护（vogonsorg 组织） |

## 核心技术点

### 多后端渲染架构

BuildGDX 实现了 Build Engine 的三重渲染后端：

- **Polymost**（OpenGL 渲染）：现代显卡渲染，支持 GLSL Shader，HD 纹理
- **软件渲染**：基于 Java 的纯软件渲染，用于低配置环境
- **GdxRender**（LibGDX 封装）：通过 libGDX 框架抽象渲染

```java
// core/src/ru/m210projects/Build/Render/
Render/             # 渲染器基类与接口
├── Polymost/       # Polymost2D.java, Polygon.java, Surface.java
├── Software/       # Software.java, SoftwareOrpho.java (Java 软件渲染)
├── GdxRender/      # GdxOrphoRen.java, GdxRenderer.java, GdxBatch.java
└── Types/          # Tile2model.java, Spriteext.java, Palette.java
```

### 模块化平台抽象

```
core/          # 核心游戏逻辑（与平台无关）
├── src/ru/m210projects/Build/
│   ├── Engine.java          # Build Engine 核心（C 移植到 Java）
│   ├── Architecture/         # BuildGdx.java, BuildFrame.java, BuildInput.java
│   ├── Pattern/             # BuildGame.java, BuildFont.java, MenuItems/
│   ├── Audio/               # Sound.java, Music.java, HMIMIDIP.java
│   ├── Render/              # 三套渲染器
│   ├── FileHandle/          # 资源加载（GRP/RFF/WAD）
│   ├── Net/                 # UDP 多人大厅
│   └── Script/              # DefScript.java, Maphack.java
│
lwjgl2/        # LWJGL2 桌面后端（deprecated）
lwjgl3/        # LWJGL3 + GLFW 桌面后端
│   └── src/ru/m210projects/Build/desktop/
│       ├── GLFW/             # Lwjgl3GL10.java, Lwjgl3Input.java
│       ├── audio/            # OpenAL 后端（ALAudio.java, MIDI sequencer）
│       └── AWT/              # AWTMouse.java, AWTGraphics.java
│
android/       # Android 后端
```

### 资源加载与数据驱动

BuildGDX 保持了对经典 WAD/GRP 格式的完整支持：

```java
FileHandle/           # 资源系统
├── GrpGroup.java     # GRP 包读取（Duke Nukem 3D 资源格式）
├── RffGroup.java     # RFF 包读取（Shadow Warrior 资源格式）
├── Resource.java     # 通用资源加载器
└── DataResource.java # 纹理/模型/音频统一资源抽象
```

模型加载支持 MD2、MD3、KVX（体素）三种格式。

### 多人网络

```java
Net/
├── Mmulti.java       # 多人游戏主逻辑
├── UDPSocket.java   # UDP 传输层
├── UDPServer.java   # 大厅服务器
└── WaifUPnp/        # UPnP 端口映射
```

使用 UDP Socket 实现 P2P 风格多人，与 [[eduke32]] 的网络架构相似。

### LibGDX 集成

BuildGDX 使用 [libGDX](https://libgdx.com/)（Apache 2.0）作为底层框架，提供了：
- 跨平台窗口管理（LWJGL2/LWJGL3/Android）
- OpenGL 上下文管理
- 输入设备抽象（键盘/鼠标/手柄）
- 文件系统抽象

这是与 [[eduke32]]（C++/原生）最大的架构差异——BuildGDX 通过 LibGDX 获得跨平台能力，而 EDuke32 通过 SDL2 手动抽象。

## 支持的游戏

BuildGDX 支持所有 Ken Silverman Build Engine 游戏：

| 游戏 | 数据格式 | 状态 |
|------|---------|------|
| Duke Nukem 3D | GRP | 完整支持 |
| Shadow Warrior | RFF / GRP | 完整支持 |
| Blood | 需原版数据 | 支持 |
| Redneck Rampage | 需原版数据 | 支持 |
| Exhumed/Powerslave | 需原版数据 | 支持 |
| Ion Fury | 需原版数据 | 支持 |
| Corridor 7 | 需原版数据 | 支持 |

需要原版游戏数据文件（不包含在源码中）。

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **跨平台渲染抽象** | LibGDX 作为跨平台框架的成熟实践——对于需要同时支持 Desktop/Android/Web 的游戏项目，可借鉴此模式 |
| **引擎多后端设计** | Polymost（现代 GL）+ Software（复古）双渲染路线的架构决策，适合需要同时支持低配/高配硬件的游戏 |
| **数据驱动资源系统** | GRP/RFF 包加载器的实现模式，可借鉴用于公司游戏的资源打包系统 |
| **确定性游戏逻辑** | Build Engine 的游戏逻辑完全数据驱动（sprite/tag/sector），与 [[quake]] 的模块化 game/cgame/server 分离思路一致 |
| **Java 游戏性能** | ~74K LOC Java 代码的实际性能表现——对于选择 Java/Kotlin 而非 C++ 的游戏项目，BuildGDX 证明了可行路径 |
| **复古游戏现代化** | BuildGDX 为经典游戏添加了现代功能（宽屏、HDR、mod 支持），是"复古游戏增强移植"的优秀案例 |

## 相关页面

- [[eduke32]] — 同为 Build Engine 端口，C++/SDL2 实现
- [[nblood]] — Blood 游戏端口，基于 EDuke32
- [[raze]] — GZDoom 技术的 Build 多游戏合一引擎
- [[duke-nukem-3d]] — Duke Nukem 3D 原始源码
- [[shadow-warrior]] — Shadow Warrior 原始源码
- [[open-source-game-engines-comparison]] — 开源游戏引擎对比
