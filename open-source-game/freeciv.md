---
title: Freeciv
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, empire-building, rts]
sources: [https://github.com/freeciv/freeciv]
---

# Freeciv

> Civilization 风格帝国建设回合策略游戏，1996 年启动的开源项目

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/freeciv/freeciv |
| 语言 | C（核心）+ C++（部分工具/Qt 客户端） |
| 构建系统 | Meson（主）+ Autotools + 实验性 CMake |
| 渲染/引擎 | 多客户端：Qt / SDL2 / SDL3 / Gtk3.0 / Lima / Wayland |
| 许可 | GPL v2 |
| 版本 | 3.4-dev (3.3.90-dev)，活跃开发 29+ 年 |

## 核心技术点

### 模块化架构
- `server/` — 游戏逻辑服务器，支持多人 TCP/UDP 帧同步
- `client/` — 多前端客户端（Qt/SDL/Gtk），共享业务逻辑在 `client/` 顶层
- `common/` — 协议、网络能力字符串(capstr)、游戏数据、地图生成
- `ai/` — AI 子系统：aitraits / classic / default / difficulty / stub / tex
- `aicore/` — AI 核心算法库（路径规划、决策树）
- `data/` — tileset 视觉资源（amplio2/civ2/alien 等 15+ 风格）+ modpack 扩展系统

### 网络同步机制
- 确定性锁步回合同步（Turn-synchronous）
- Capability string 机制（`+Freeciv.Devel-V.V-YYYY.MMM.DD`）版本兼容性协议
- 每个 release 分支 mandatory capabilities 不可增加，确保跨版本网络互通

### 渲染架构
- 多后端 SDL2/SDL3/Qt/Gtk3 分离：audio_sdl.c / audio_sdl.h / audio_none.h
- tilespec 系统支持 3D 渲染（3d.tilespec）和 2D 像素风格多套皮肤切换
- Modpack 扩展包（.modpack）热加载

### 内容系统
- data/ 目录含 buildings/ 等子目录，ruleset 可扩展
- Tilespec 视觉定义与游戏规则完全解耦
- 79+ 子目录/文件在 data/ 下，支持多文明/科技树/单位集

### 版本与发布策略
- MAJOR.MINOR.PATCH + EMERGENCY_VERSION + LABEL(dev/rc) 五段版本号
- NETWORK_CAPSTRING 标注网络协议版本，分支稳定后freeze管理
- 29 年持续迭代，S3_4 稳定分支进行中

## 玩法特点

- 从公元前 4000 年开始，建造城市、研究科技、发展外交、训练军队
- 可选单人或通过 TCP/UDP 多人网络对战
- 支持 AI 对抗（多难度等级 classic/default/stub/tex）
- Mod 系统允许替换 tileset、ruleset、modpack

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 多客户端架构 | server/client 分离使同一游戏逻辑支持不同渲染后端，[[OpenRA]] 类似设计 |
| 帧同步网络 | 确定性回合同步是 RTS/策略游戏多人基础 [[OpenRA]]/[[Zero-K]] 相通 |
| Capability 协议 | 优雅处理版本兼容升级，网络协议设计范本 |
| Tilespec 系统 | 视觉资产与游戏逻辑完全分离，内容团队可独立迭代 [[Widelands]]/[[OpenRA]] |
| AI 分层 | AI 核心(aicore)与具体实现(classic/default/stub)分离 `BrogueCE`/`Cataclysm-DDA` |
| Mod 生态 | modpack 扩展包格式支撑用户创作社区，[[OpenTTD]] NewGRF 类似 |

## 相关页面

- [[open-source-games-list]] — 开源游戏总览
- [[open-source-game-engines-comparison]] — 引擎对比
