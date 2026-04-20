---
title: OpenPanzer
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, html5]
sources: [raw/articles/openpanzer-2026.md]
---

# OpenPanzer

> HTML5 回合制坦克策略游戏，致敬 Panzer General 2

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/nicupavel/openpanzer |
| 语言 | JavaScript (ES5) + HTML5 + CSS3 |
| 构建系统 | 无构建系统，纯浏览器运行 |
| 渲染/引擎 | Canvas 2D |
| 许可 | GPLv2 |

## 核心技术点

- **零依赖前端**: 无任何第三方 JS 库（无 jQuery、node 等），保持轻量
- **Canvas 渲染管线**: `render.js` 负责地图和单位绘制，`style.js` 定义绘制风格
- **六角格地图系统**: `map.js` 实现六角格地图对象和玩家管理
- **XML 关卡加载**: `maploader.js` / `scenarioloader.js` 从 XML 文件加载剧本和地图
- **AI 引擎**: `ai.js` 实现简单 AI 对手逻辑
- **HTML5 本地存储**: `gamestate.js` 通过浏览器 localStorage 保存/加载游戏状态
- **战役转换工具**: `tools/campaign/` 和 `tools/map/` 下的 Python 脚本将 PG2 原版 .cam/.scn 格式转换为 OpenPanzer XML 格式
- **装备数据驱动**: `resources/equipment/` 目录存放单位装备属性 JSON，转换自 PG2Suite 导出的数据

## 架构模块

| 文件 | 职责 |
|------|------|
| `js/game.js` | 游戏主管理器 |
| `js/map.js` | 六角格地图和玩家对象 |
| `js/unit.js` | 单位和运输载具对象 |
| `js/gamerules.js` | 攻击、移动、补给、增援、距离规则 |
| `js/render.js` | Canvas 渲染函数 |
| `js/ui.js` | 鼠标交互 + UI 窗口构建/更新（1326行，最大文件） |
| `js/uibuilder.js` | DOM UI 元素构建器（477行） |
| `js/ai.js` | AI 引擎 |
| `js/campaign.js` | 战役管理 |
| `js/scenario.js` | 单场景管理 |
| `js/scenarioloader.js` | SCN/XML 剧本加载器 |
| `js/animation.js` | Sprite 序列帧动画 |
| `js/sound.js` | 单位音效 |
| `js/prototypes.js` | 泛型定义扩展 |

## 玩法特点

- 回合制战术战斗，致敬 Panzer General 2 (PG2)
- 六角格战场的单位移动、攻击、补给、增援机制
- 支持战役模式和单剧本模式
- 战役数据从 PG2 原版 .cam 格式转换而来
- 跨平台运行：Chrome、Firefox、Safari、Opera，Android 2.2+、iOS 5.0+

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 零依赖架构 | 纯原生 JS 无框架对于小型 AI 游戏实验项目的启发 |
| 数据驱动设计 | 装备/剧本均以 JSON/XML 数据文件分离，逻辑与内容解耦 |
| HTML5 Canvas 回合制 | 简单回合制 AI 对战游戏的快速原型思路 |
| 工具链转换 | 自研工具链将专有格式转为开放格式的工程价值（PG2→OpenPanzer） |

## 相关链接

- 官网: http://panzermarshal.com
- 镜像: http://www.linuxconsulting.ro/openpanzer/
- 原始规范: http://luis-guzman.com/links/PG2_FilesSpec.html
