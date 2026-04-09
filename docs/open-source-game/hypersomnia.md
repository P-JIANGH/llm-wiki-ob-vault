# Hypersomnia

## 基本信息

| 项目 | 内容 |
|------|------|
| 名称 | Hypersomnia |
| 类型 | 竞技向顶视角射击（top-down shooter） |
| 官网 | https://hypersomnia.io |
| 在线游戏 | https://play.hypersomnia.io |
| 源码 | https://github.com/TeamHypersomnia/Hypersomnia |
| 许可 | AGPL-3.0 |
| 语言 | C++（主要）, C, CMake, JavaScript, GLSL, Python, Io, Shell, PowerShell, CSS, Dockerfile |
| Stars | 1502 |
| Forks | 90 |
| 创建时间 | 2013-07-11 |
| 最后更新 | 2026-04-08 |

## 游戏简介

社区驱动的多人顶视角射击游戏，灵感来自 Counter-Strike、Hotline Miami 和经典像素 RPG。

特色：
- 24 种独特武器模（firemodes）
- 10 张社区地图
- 两种游戏模式：Bomb Defusal（炸弹拆解）和 Gun Game（阶梯射击）
- **内置地图编辑器**，无需额外工具即可在游戏中制作并分发地图
- 支持 Steam 平台和 Web 浏览器多人对战
- 支持 Discord 和 Telegram 通知

## 技术栈亮点

### 1. 纯 C++ 从零实现，无游戏引擎依赖

整个项目不使用 Unity/Godot/Unreal 等第三方游戏引擎，所有代码从头手写 C++。作者认为这是对游戏开发能力的极致考验。

### 2. 确定性锁步网络（Deterministic Lockstep Networking）

核心技术亮点。与传统 RTS 游戏（如星际争霸）类似：
- 只有玩家输入（"我移动了鼠标到这里"、"我按下了这个键"）通过网络传输
- 客户端在本地模拟所有其他实体（其他玩家位置、子弹、物理状态）
- 同一序列的输入在所有客户端产生完全一致的物理结果
- 关键优化：使用 `float` 而非 `int` 进行物理计算，需要极度严谨的浮点一致性处理

作者分享了几个浮点一致性难题的解决方案：
- 所有平台使用相同编译器 `clang`
- Windows 传递 `/fp:strict`，ARM 构建传递 `-ffp-model=strict`
- 用 STRFLOAT 库替换所有 `std::sin`、`std::sqrt` 等数学函数
- 替换所有 `std::unordered_map` 为确定性的 `std::map`
- 使用移植性良好的随机数生成器（xoroshift）

### 3. 自定义 ECS（Entity-Component-System）

项目自 2013 年起维护了一套 ECS 架构，概念上类似于 Unity 2018 年的专利方向。核心设计：
- 对象池（Memory Pool）：所有游戏对象以线性方式存储在内存中（`std::vector`）
- 对象 ID 代替指针引用：池中每个对象有唯一整数 ID
- `direction_array[id]` 指向对象在主向量中的实际位置
- 支持完美的撤消/重做（Undo/Redo）—— 对于地图编辑器至关重要

### 4. 浏览器 + 原生同服对战

通过 libdatachannel（WebRTC DataChannel）和 datachannel-wasm 实现：
- 浏览器客户端和原生客户端（Windows/Linux/macOS）可以同时连接同一服务器
- 可以从浏览器内托管服务器，原生客户端连接；反之亦可
- 内置的服务器列表（masterserver）也在同一可执行文件中

### 5. 内置自更新系统

游戏可自动下载并验证更新，签名验证使用开发者公钥 + `ssh-keygen`，防止恶意篡改。

### 6. 内存池设计

- O(1) 分配（`push_back`）和释放（`std::swap` + `pop_back`）
- 完全确定性：相同操作序列产生完全相同的对象 ID 和内存顺序
- 池状态通过网络传输后，客户端可以精确重建池的内部状态

### 7. 地图编辑器

使用 ImGui 构建，类似 IDE 的操作体验：
- 支持拖放 PNG、WAV、OGG 等自定义资源到地图目录
- 地图以简洁 JSON 格式保存
- 可"无缝"切回编辑器并继续编辑——服务器/游戏/编辑器三位一体

## 项目结构（源码）

```
src/
  3rdparty/        # 第三方库（rectpack2D, STRFLOAT, xoroshift 等）
  augs/            # 核心框架（数学、内存管理、跨平台）
  game/            # 游戏逻辑（ECS、实体、系统）
  application/     # 应用层（窗口、渲染、网络）
```

## 学习价值

- **网络同步**：学习如何在不用游戏引擎的情况下实现"帧一致"的多人射击游戏
- **ECS 架构**：理解实体-组件-系统的实际工程实现（对比 Unity/Godot 框架）
- **浮点一致性**：深入理解跨平台浮点数一致性问题的根源和解决思路
- **地图编辑器**：如何将编辑器与游戏引擎深度集成
- **像素射击手感**：借鉴其子弹物理、受击反馈、武器手感的设计思路

## 参考资料

- 游戏官网：https://hypersomnia.io
- 在线试玩：https://play.hypersomnia.io
- GitHub：https://github.com/TeamHypersomnia/Hypersomnia
- Discord：https://discord.gg/YC49E4G
- Wiki：https://wiki.hypersomnia.io
