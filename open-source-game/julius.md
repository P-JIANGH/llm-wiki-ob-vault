---
title: Julius
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, city-builder, caesar3, sdl2, clean-room]
sources: [https://github.com/bvschaik/julius]
---

# Julius

> Caesar III 清洁室重实现，100% 存档兼容，SDL2 跨平台复刻

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/bvschaik/julius |
| 语言 | C（~93K LOC）|
| 构建系统 | CMake |
| 渲染/引擎 | SDL2 + SDL2_mixer（自研软件渲染，复用原始游戏资源） |
| 许可 | zlib-style |
| Fork | [Augustus](https://github.com/Keriew/augustus)（加玩法改动） |

## 核心技术点

### 清洁室逆向工程
- 完全重写游戏逻辑，复用原始 Caesar 3 资源文件（图片/音效/数据）
- 目标：**100% 存档兼容** — 与原版 Caesar 3 存档可互换
- 复现原版游戏的所有 bug 以保持兼容性（所谓"bug as features"）
- 不需要原始代码，纯逆向二进制实现逻辑

### SDL2 跨平台架构
- 平台抽象层在 `src/platform/` 下，支持：Windows / Linux / macOS / Android / PS Vita / Nintendo Switch / Emscripten（浏览器）
- `platform/screen.c`：SDL_Window + SDL_Renderer + 软件渲染纹理
- `platform/file_manager.c`：跨平台文件路径管理，检测原始游戏资源目录
- `platform/sound_device.c`：SDL_mixer 音频，支持 MP3 高质量音轨
- 触控支持（Android/Vita/Switch）和手柄映射

### 模块化源码结构

```
src/
├── core/          # 核心工具：编码转换、配置、文件IO、日志、随机数
├── city/          # 城市管理：税率、预算、城市评级
├── building/      # 建筑系统：建造/拆除/仓库/ dock / industry / house
├── figure/        # 市民AI：走路/士兵/商人/工程师等
├── figuretype/    # 市民类型行为
├── game/          # 游戏主循环、时间、设置
├── graphics/      # 2D 渲染、颜色、字体、视口裁剪
├── map/           # 地图网格、路径
├── scenario/       # 剧本/地图文件加载
├── sound/         # 音频子系统
├── translation/   # 多语言文本
├── widget/        # UI 组件（小地图/按钮/进度条）
├── window/        # 窗口系统（建筑菜单/贸易/城市信息等）
└── platform/     # 平台抽象层
```

### 资源加载与兼容
- `core/file.c`：原生 .C3 文件格式读写（Caesar 3 存档格式）
- `core/encoding.c`：多语言编码（Latin、日、韩、简繁中文）
- `gen/` 目录：生成文件（字体、图像组索引）
- 原版游戏文件从 GOG/Steam 购买，或用原版 CD 安装后打补丁至 1.0.1.0

### 画质增强（相对原版）
- 宽屏分辨率支持（原生 800x600）
- 窗口模式运行
- 帧率显示
- 高质量 MP3 音轨支持

## 玩法特点

- 经典城市经营：供水、住房、税收、娱乐、军事
- 50+ 建筑类型，完整城市生命周期
- 完整战役：12 个MISSION
- 地图编辑器（内置）
- 原版存档 v.s. Julius 存档完全互换

## Julius vs Augustus

| 特性 | Julius | Augustus |
|------|--------|----------|
| 玩法改动 | 无（纯净复刻）| 有（道路封锁等新功能）|
| 存档兼容 | 与原版双向 | 只能读 Julius/原版存档 |
| 定位 | 视觉增强 | 玩法扩展 |

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 清洁室重实现 | 二进制逆向+重写逻辑的工程方法 |
| 存档兼容性设计 | 数据格式向后兼容的架构决策 |
| SDL2 抽象 | 跨平台渲染/输入/文件系统的干净抽象模式 |
| 平台子目录 | 单一代码库支持 7+ 平台的代码组织方式 |
| 模块化子系统 | widget/window/building/figure 分层独立设计 |
| 资源复用 | 原版资产 + 自研引擎的组合策略 |

