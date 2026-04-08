---
title: OpenRCT2
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, rct, simulation, tycoon, cpp20, cross-platform]
sources: []
---

# OpenRCT2

> RollerCoaster Tycoon 2 开源重实现，游乐园建造管理模拟

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/OpenRCT2/OpenRCT2 |
| 语言 | C++20 |
| 构建系统 | CMake 3.24+（跨平台）|
| 渲染/引擎 | SDL2 + OpenGL（平台抽象层）|
| 许可 | GPL-3.0 |
| 平台 | Windows, macOS, Linux, FreeBSD, Android |
| 依赖管理 | vcpkg + CMake fetch |

## 核心技术点

### 模块化架构
项目分为多个独立子模块（位于 `src/` 下）：
- **openrct2** — 核心引擎（游戏逻辑、地图、轨道、客人 AI）
- **openrct2-ui** — UI 系统（窗口、工具栏、菜单）
- **openrct2-cli** — 无头服务器模式
- **openrct2-data** — 资源数据包（独立下载）
- **openrct2-deps** — 第三方预编译依赖
- **openrct2-android** — Android 移植

核心子系统（`src/openrct2/`）：
```
actions/      # 游戏动作（建造、拆除、价格调整等）
audio/        # 音频系统（SDL2 Mixer）
entity/       # 实体系统（客人NPC、员工）
peep/         # 客人AI、路径finding
ride/         # 游乐设施（过山车、旋转木马等）
world/        # 世界、地图、天气
park/         # 公园财务、声誉
network/      # TCP/IP多人游戏（7675行）
scripting/    # JavaScript插件引擎（2582行Duktape）
paint/        # 3D渲染/绘制系统
rct1/rct12/   # RCT1/RCT2数据文件解析兼容层
```

### JavaScript 插件系统
OpenRCT2 内嵌 [Duktape](https://duktape.org) JS 引擎，支持运行时插件扩展：
- `registerPlugin()` 注册插件入口
- 支持 ECMA 5 JS，通过 Babel/TypeScript 转译支持现代语法
- 热重载（`config.ini` 中 `enable_hot_reloading=true`）
- API 版本管理（`targetApiVersion`），向后兼容
- 插件可创建自定义 UI 窗口、监听 Hook 事件（游戏启动、客人行为等）
- 插件目录：用户配置目录下的 `plugin/` 文件夹

### 网络多人系统（TCP/IP）
- `NetworkBase` 核心类管理 Server/Client 两种模式
- `Socket.cpp` 底层网络通信（面向连接流式）
- `NetworkPacket` 序列化游戏状态同步
- 支持服务器广播（`NetworkServerAdvertiser`）
- 支持密码保护、玩家权限组（`NetworkGroup`）
- Tick-based 同步模型

### 数据兼容层
- `rct2/` 解析 RCT2 原始 .sat / .park 文件格式
- `rct12/` 提供 RCT1/RCT2 资产兼容桥接
- 独立资源包（`.park` 数据文件），需原始 RCT2 游戏文件

### 资源下载系统
`CMakeLists.txt` 通过 `assets.json` 配置远程资源：
- title-sequences.tar.gz（开场动画）
- objects（游戏物体数据）
- OpenSFX 音效包
- 下载后验证 SHA-256

## 玩法特点

- **沙盒/剧情双模式**：剧情模式有时间和目标限制，沙盒模式无限制建造
- **游乐设施建造**：过山车（含物理轨道）、旋转木马、鬼屋等，支持轨道编辑器
- **公园管理**：门票定价、员工雇佣、设施维护、财务管理
- **客人AI**：路径寻路、需求模拟、情绪系统
- **多人合作**：TCP/IP 房间，异步/同步建造
- **开放插件生态**：插件目录（openrct2plugins.org）

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **游戏引擎模块化** | 将渲染/逻辑/网络/UI 拆分为独立库（openrct2-ui vs openrct2-cli），便于复用和测试 |
| **脚本扩展系统** | Duktape 嵌入式 JS——轻量、安全（沙箱）、热重载，适合开放给玩家/运营写逻辑 |
| **数据驱动资源** | 资源包与核心二进制分离下载，CMake fetch + SHA 校验，适合大文件 DLC/UGC 场景 |
| **网络同步Tick** | 服务器广播 + 客户端预测的经典 MMO Tick 模型，值得参考 |
| **复古游戏复刻架构** | 解析原始二进制格式（rct2/）+ 纯重实现引擎的分离，适合做游戏怀旧版 |
| **插件市场生态** | 插件目录 + API 版本管理 + 授权许可声明，是建立 UGC 平台的基础设计 |
