---
title: OpenKO
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, mmorpg, game-server, reverse-engineering]
sources: [https://github.com/Open-KO/KnightOnline]
---

# OpenKO

> Knight Online (1298/9 版本) 清洁室逆向开源复刻，学术目的，双端分离架构，跨平台 CMake 构建

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/Open-KO/KnightOnline |
| 语言 | C++20（核心）+ C（少量汇编遗留） |
| 构建系统 | CMake 3.28+ / MSBuild (Windows) / clang/gcc (Linux/macOS) |
| 渲染/引擎 | DirectX 9 (Client), 自研网络引擎 (Server) |
| 许可 | 学术/学习目的，无明确许可证声明 |
| 状态 | 早期开发，不可用于生产服务器 |
| 目标版本 | Knight Online 1298/9 |

## 核心技术点

### 双端分离架构
项目严格分为 Client（客户端）和 Server（服务器）两大独立构建目标：
- **客户端 (WarFare)**：DirectX 9 渲染，游戏逻辑，目前仅 Windows/MSVC 支持
- **服务器 (AIServer/Aujard/Ebenezer/ItemManager/VersionManager)**：跨平台 CMake 构建，支持 Linux/macOS
- **客户端工具 (KscViewer/Launcher/Option 等)**：资源查看、启动器、配置工具

### 多进程服务器架构
```
AIServer     — AI 怪物/NPC 行为服务器
Aujard       — 账户/角色数据库管理 (登录/创建/删除角色)
Ebenezer     — 主游戏服务器 (地图/战斗/移动/物品/技能)
ItemManager  — 物品数据服务器
VersionManager — 版本校验服务器
```

### 网络协议
- 基于 TCP/IP 的自定义二进制协议
- `src/shared/packets.h` 定义了 100+ 个 `e_GameOpcode` 枚举（0x01~0x5F 范围）
- 覆盖登录/移动/战斗/聊天/物品/公会/技能/仓库等所有游戏功能
- LZF 数据压缩 (`src/shared/lzf.*`)、JvCryption 自定义加密
- 自定义 ByteBuffer/CircularBuffer 网络缓冲实现

### 依赖管理
- **17 个 Git Submodules**：dx9sdk, boost, asio, nanodbc, spdlog, openal-soft, libjpeg, mpg123, db-models, argparse, googletest 等
- **db-models** (`deps/db-models`)：SQL Server 数据库 schema（保留 1298/9 版本结构）
- **assets/Client**：客户端美术资源 submodule（独立仓库 `ko-client-assets`，branch: openko-1298）

### 代码规模
- ~961 个 .cpp/.h 源文件
- ~265K LOC（包含头文件）
- 4 大服务器模块（Ebenezer/Aujard/AIServer/ItemManager）
- 客户端 6 大模块（WarFare/JpegFile/KscViewer/Launcher/Option/ZipArchive）

### 构建系统
- CMake 3.28.3 最低版本要求
- `OPENKO_BUILD_CLIENT/CLIENT_TOOLS/TOOLS/SERVERS/TESTS` 独立开关
- Windows 平台全量构建，Linux/macOS 仅服务器端
- GitHub Actions CI：Windows (VS2022/VS2026)、Ubuntu 24.04 (clang 18/gcc 13)、macOS 15 (Clang 15)

### 共享库
- `src/shared/`：ByteBuffer、CircularBuffer、LZF 压缩、CRC32、JvCryption、INI 解析、线程、定时器等跨端复用模块
- `src/db-library/`：数据库抽象层

## 玩法特点

Knight Online 是一款 2003 年的韩国 MMORPG，采用 nation-vs-nation（国家对抗）玩法：
- 两阵营（El Morad vs Karus）对战
- 混合职业系统（Warrior/Rogue/Mage/Priest/Ramses）
- 即时战斗 + 技能系统
- 攻城战、公会系统、交易市场

本项目目标版本 1298/9 是玩家认为最经典的版本，保留了核心国家对抗玩法。

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| MMORPG 服务器架构 | 多进程分离设计（AI/Game/DB/Asset）是处理复杂游戏逻辑的有效方式 |
| 网络同步 | 自定义二进制协议 + 压缩加密设计可作为现代轻量 MMO 网络层参考 |
| 数据驱动 | packets.h 枚举定义 + db-models schema 分离是协议迭代管理的良好实践 |
| 跨平台构建 | CMake option 开关控制平台差异，避免 ifdef 乱飞 |
| 依赖管理 | FetchContent + submodules 双轨依赖管理（第三方库 vs 游戏资源） |
| AI NPC 系统 | AIServer 独立进程架构将 AI 计算与主游戏逻辑解耦，适合大规模 NPC 场景 |
| 反向工程规范 | "清洁室"设计原则：不反编译源码，基于公开格式文档重写，保留学术伦理边界 |
