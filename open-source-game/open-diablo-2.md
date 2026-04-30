---
title: OpenDiablo2
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, arpg, go]
sources: [https://github.com/OpenDiablo2/OpenDiablo2]
---

# OpenDiablo2

> Go 语言实现的 Diablo 2 开源引擎复刻，使用 Ebiten 2D 游戏框架

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/OpenDiablo2/OpenDiablo2 |
| 语言 | Go 1.16 |
| 构建系统 | Go build / build.sh |
| 渲染引擎 | Ebiten v2 (2D 游戏框架) |
| 许可 | GPLv3 |
| 状态 | **已拆分**：引擎→Abyss Engine，游戏→OpenDiablo2 |

## 核心架构

### 模块划分

```
d2app/        — 应用外壳、主循环
d2common/     — 通用工具（数据加载/数学/几何/文件格式）
d2core/      — 核心子系统（渲染/音频/UI/资产/配置/输入）
d2game/       — 游戏逻辑（d2gamescreen/d2player）
d2networking/ — 网络（P2P 客户端/服务器）
d2script/     — JavaScript 脚本引擎（otto）
d2thread/     — 主线程管理
```

### 关键设计

1. **Go + Ebiten**：纯 Go 实现，使用 Ebiten v2 处理 2D 渲染，无需原生图形库
2. **MPQ 资源分离**：不包含 Diablo 2 原始资产，需用户自行提供 MPQ 文件（游戏数据）
3. **多平台支持**：Go 天生跨平台，支持 Windows/Linux/MacOS
4. **帧同步网络**：d2networking/ 实现 P2P 帧同步多人
5. **脚本扩展**：集成 otto JavaScript 引擎用于游戏逻辑脚本化

### 状态（截至 2021-03）

- 游戏可启动，可选角色，在 Act 1 城镇行走
- 可打开所有游戏面板（背包/技能/角色等）
- 尚未完整通关，内容仍在开发中

## 项目演进

**重要**：此项目正在拆分为两个仓库：
- **Abyss Engine**（新仓库 https://github.com/AbyssEngine/）— 通用游戏引擎
- **OpenDiablo2** — 将成为 MPQ 数据包项目（OpenDiablo2.mpq）

项目精神：
- 游戏逻辑 → 翻译为 JavaScript
- 引擎能力（实体组合/地图渲染）→ Abyss Engine 实现

## 与公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| Go 游戏开发 | Go 语言用于游戏引擎的可行性，Ebiten 框架的轻量优势 |
| 数据与代码分离 | MPQ 资产包 + 游戏引擎的分离设计模式 |
| 2D ARPG 架构 | 面板系统/UI 管理/库存系统的模块化设计 |
| 脚本扩展 | JavaScript 嵌入作为游戏逻辑扩展方案 |
| 开源演进策略 | 从单一项目拆分为"引擎 + 内容"双仓库的规划思路 |

