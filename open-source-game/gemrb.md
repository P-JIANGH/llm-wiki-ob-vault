---
title: GemRB
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, rpg]
sources: [https://github.com/gemrb/gemrb]
---

# GemRB

> 开源 Infinity Engine 引擎重实现（Baldur's Gate / Icewind Dale / Planescape: Torment）

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/gemrb/gemrb |
| 语言 | C++ (C++14) + Python3 (脚本) |
| 构建系统 | CMake (>= 3.25) |
| 渲染后端 | SDL2 (主), SDL1, OpenGL, GLES |
| 音频后端 | OpenAL, SDLAudio |
| 许可 | GPL-2.0-or-later |
| 平台 | Linux, FreeBSD, Windows, macOS, Android, iOS 等 |

## 核心技术点

### 插件化架构 (40+ 插件)
GemRB 的核心设计哲学是插件化。核心引擎通过 `PluginHolder<T>` 模板管理所有子系统的可插拔实现：

| 类别 | 插件 |
|------|------|
| 视频 | SDLVideo, OpenGL |
| 音频 | SDLAudio, OpenALAudio, NullSound |
| 资源导入 | BAMImporter, BIFImporter, KEYImporter, TISImporter, WEDImporter, CREImporter, GAMImporter, ITMImporter, SPLImporter 等 |
| 视频播放 | BIKPlayer, MVEPlayer, VLCPlayer |
| GUI 脚本 | GUIScript (Python3) |

**资源文件格式支持**：完整解析 Infinity Engine 原始格式（BIF/KEY/TIS/WED/ARE/GAM/CRE/ITM/SPL 等），通过 IESDP 文档逆向工程实现。

### Python 脚本系统
游戏逻辑通过 Python3 脚本实现，位于 `GUIScripts/python3/`：
- 完整替换原版 GemRB 的 Python 2 脚本
- GUI 控件、对话、物品、系统全部由 Python 驱动
- 支持热重载（开发时）

### 核心子系统 (46K LOC core/)

| 文件 | 规模 | 职责 |
|------|------|------|
| Interface.cpp | 4266 行 | 引擎主控制循环、配置加载 |
| Map.cpp | 4029 行 | 地图/场景管理（Area 系统） |
| CharAnimations.cpp | 3035 行 | 角色动画系统 |
| Game.cpp | 2618 行 | 游戏状态全局管理 |
| EffectQueue.cpp | 2571 行 | 效果/状态系统（类似 AD&D 2E） |
| Inventory.cpp | 2221 行 | 物品/背包系统 |
| Projectile.cpp | 2254 行 | 弹道/法术投射物系统 |
| Spellbook.cpp | 1169 行 | 法师/牧师法术书 |
| GameData.cpp | 1055 行 | 资源配置管理 |

### 渲染架构
- **SDLVideo**: 主渲染器，SDL2 软渲染
- **OpenGL 后端**: 可选硬件加速
- **Sprite2D**: 核心精灵/纹理抽象
- **TileMap**: 等距瓦片地图渲染（Baldur's Gate 使用等距视角）

### 网络同步
- 原版 Infinity Engine 的多人游戏通过网络同步实现
- GemRB 重实现了帧同步多人逻辑

## 玩法特点

- **兼容游戏**: Baldur's Gate 1, Icewind Dale 1, Planescape: Torment
- **无需原版引擎**: 纯开源实现，保留原版游戏数据即可运行
- **跨平台**: 从 PC 到手机到游戏机均有移植
- **内置 Demo**: 提供 minimal demo game 无需原版数据即可体验引擎能力
- **数据提取**: 支持 WINE + Unshield 从原版 CD 提取资源

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 插件化引擎架构 | `PluginHolder<T>` 模板实现子系统的可替换，适合模块化 AI 游戏引擎 |
| Python 脚本驱动游戏逻辑 | Python 脚本层分离游戏内容与引擎，AI 游戏可用 LLM 生成 Python 脚本 |
| Infinity Engine 文件格式 | IE 格式（BIF/KEY/TIS/WED）是经典 CRPG 数据驱动设计的优秀参考 |
| 等距视角渲染 | TileMap + CharAnimations 的等距 RPG 渲染管线可参考用于 AI 驱动的战术游戏 |
| 效果系统 | EffectQueue 的 O(1) 效果链表设计适合高频效果处理（AI agent 频繁触发效果） |
| 资源打包方案 | BIF/KEY 打包格式将资源索引与实际数据分离，AI 游戏可用类似方案管理资产 |

## 相关页面

- [[open-source-game/exult]] — Ultima VII 重实现，另一个经典 RPG 引擎重实现
- [[open-source-game/daggerfall-unity]] — Daggerfall Unity，另一款经典 RPG 引擎重实现
- [[open-source-game/openmw]] — Morrowind 引擎重实现，成熟度最高的开源 RPG 引擎之一
- [[open-source-game/veloren]] — Rust 体素 RPG，ECS 架构参考
