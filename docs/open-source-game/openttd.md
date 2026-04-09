---
title: OpenTTD
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, rts, simulation, city-building, transport-tycoon]
sources: [https://github.com/OpenTTD/OpenTTD]
---

# OpenTTD

> Transport Tycoon Deluxe 开源复刻：经典运输模拟经营游戏，跨平台支持，自带脚本扩展系统

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/OpenTTD/OpenTTD |
| 语言 | C++ (556 .cpp + 626 .h) |
| 构建系统 | CMake + vcpkg (Windows) |
| 渲染/引擎 | SDL2 (Linux/macOS/Win) + OpenGL |
| 许可 | GPLv2 |
| 平台 | Linux, macOS, Windows |
| 多人 | TCP/IP 网络多人模式 |

## 核心技术点

### 确定性锁步网络同步
OpenTTD 使用与 Hypersomnia 相似的确定性锁步网络模型（lockstep），所有客户端运行相同逻辑帧，通过网络同步随机种子和玩家指令，保证不同平台的结果一致性。

### NewGRF 扩展系统
NewGRF (New Graphics Files) 是一个强大的 mod 扩展系统，允许替换所有游戏内置图形（车辆、建筑、货物类型等）而无需修改源码。定义了完整的 GRF 格式规范和 SpriteGroup 脚本系统，支持条件逻辑和参数化配置。

### AI Script API
内置 AI 和 Game Script 双脚本引擎：
- **AI**：控制公司运营（建设路线、购买车辆、定价）
- **Game Script**：控制游戏世界事件（生成城镇、触发故事任务）
- API 完整抽象了游戏对象（Order, Vehicle, Station, Town 等）
- 脚本以压缩包形式分发，运行时加载

### 路径规划子系统 (pathfinder)
- 道路/铁路路径规划（A* 和自定义算法）
- 支持多重量纲（速度、成本、容量）权衡
- linkgraph 子系统计算货运链接和优先级

### 存档/场景加载 (saveload)
- 支持向后兼容所有历史版本存档
- 版本化 saveload 协议，API 驱动序列化
- 支持 heightmap（高度图）地形生成

### 国际化 (lang)
- 完整的 lang/ 目录多语言资源（40+ 语言）
- 运行时字体渲染（freetype + harfbuzz + icu）支持复杂文字

### 构建依赖管理
- Windows: vcpkg 自动下载依赖（breakpad, zlib, liblzma, libpng, curl, icu 等）
- Linux: CMake 自动检测系统库
- 可构建 dedicated server（无需图形/音频库）

## 玩法特点

- **运输帝国经营**：建造公路/铁路/船舶/航空运输网络，连接城镇和工厂获取利润
- **城镇发展**：运输需求影响城镇 growth，支持机场/车站等设施升级
- **经济模拟**：通货膨胀、贷款利率、公司破产机制
- **Scenario Editor**：内置地图编辑器，支持随机地形生成
- **多人合作/对战**：最多 255 人服务器，支持观战和密码房间
- **FreeAddonContent**：OpenGFX（图形）/OpenSFX（音效）/OpenMSX（音乐）完全开源替代包

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 确定性网络 | 锁步模型+随机种子同步是多客户端一致性的成熟方案 |
| 脚本扩展 | AI Script 双引擎设计（AI vs Game Script）值得借鉴：玩家 AI 和游戏主持人 AI 职责分离 |
| mod 系统 | NewGRF 独立于游戏逻辑的扩展层设计，源码不变即可扩展所有内容 |
| 存档兼容 | 版本化 saveload API + 向后兼容承诺是长生命周期产品的必要投入 |
| 依赖管理 | vcpkg.json 声明式依赖 + CMake 自动检测=跨平台构建最佳实践 |
| 国际化 | harfbuzz+icu+freetype 组合处理复杂文字渲染是成熟方案 |

## 相关页面

- [open-source-games-list](#/entities/open-source-games-list) — 开源游戏列表总览
- [open-source-game/openrct2](#/open-source-game/openrct2) — RollerCoaster Tycoon 2 开源复刻（同作者风格对比）
- [open-source-game/openloco](#/open-source-game/openloco) — Locomotion 开源复刻（同类运输游戏）
- [open-source-game/corsixth](#/open-source-game/corsixth) — Theme Hospital 开源克隆（同类模拟经营）
