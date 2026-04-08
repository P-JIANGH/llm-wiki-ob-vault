---
title: CorsixTH
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, business-sim, lua, cpp, sdl]
sources: [https://github.com/CorsixTH/CorsixTH]
---

# CorsixTH

> Theme Hospital 完全开源重实现，支持现代操作系统、高分辨率、自定义关卡

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/CorsixTH/CorsixTH |
| 语言 | C++ (49 .cpp) + Lua (327 .lua) |
| 构建系统 | CMake |
| 渲染/引擎 | SDL2（需要原版游戏美术资源） |
| 许可 | GPLv3 |
| 平台 | Windows, macOS, Linux, BSD, Flatpak, Snap |
| 状态 | 可完整通关战役，多人/LAN 待完成 |

## 核心技术点

### 混合 C++/Lua 架构
- **C++ 层**：SDL 封装、文件 I/O、持久化、音视频、随机数、ISO 文件系统解析
- **Lua 层**：几乎全部游戏逻辑（room/疾病/实体/AI/对话/经济系统）
- Lua 使游戏逻辑对 modder 完全开放，无需碰 C++ 代码

### SDL + 原版资源复用
- 不含任何原版美术资源，需要原版 CD/GOG/EA 下载提供 graphics/sound
- `lua_rnc.cpp/h`：RNC 压缩格式解包（原版资源打包格式）
- `iso_fs.cpp`：ISO 9660 文件系统解析，读取原版光盘镜像

### 数据驱动设计
- 关卡定义：Lua 脚本（`CorsixTH/Levels/`）
- 战役配置：Lua 脚本（`CorsixTH/Campaigns/`）
- 建筑/疾病/员工配置均 Lua 表，易于扩展

### 主要模块（Lua 层）
| 模块 | 职责 |
|------|------|
| `app.lua` | 主应用循环、状态机 |
| `entities/` | 患者/医生/护士等实体 AI |
| `diseases/` | 各种疾病诊断治疗逻辑 |
| `diagnosis/` | 诊断室设备逻辑 |
| `dialogs/` | UI 对话框 |
| `epidemic.lua` | 传染病爆发事件 |

## 玩法特点

- **经营模拟**：建造医院、雇佣员工、治疗病人、管理预算
- **疾病系统**：各种滑稽疾病（比如屁股头、仙人掌刺）需要对应科室
- **事件系统**：急诊、流行病、地震、VIP 参观
- **自定义关卡/战役**：完全开放关卡编辑器和战役格式
- **现代增强**：Full HD、缩放、自定义音乐、无限存档

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| Lua 游戏逻辑分离 | Lua 层完全开放 mod，无需修改 C++ 核心 |
| 数据驱动房间/疾病配置 | 新内容无需改代码，只需配置 Lua 表 |
| SDL 跨平台抽象 | SDL 是成熟可靠的跨平台游戏引擎选择 |
| 实体-AI 分离设计 | 患者/员工 AI 独立于渲染层 |
| 资源热插拔 | 原版资源复用架构值得参考（公司可能也需要兼容旧资产） |

## 相关页面

- [[open-source-game-engines-comparison]] — 开源游戏引擎对比
- [[open-source-games-list]] — 开源游戏列表总览
- [[dead-ascend]] — 另一款 Qt/QML 游戏（对比参考）
