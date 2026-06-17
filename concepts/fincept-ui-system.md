---
title: Fincept UI System
created: 2026-04-20
updated: 2026-04-20
type: concept
tags: [ui, qt6, cpp, architecture]
sources: [raw/articles/fincept-terminal-v4-source-study.md]
---

# Fincept UI System (Obsidian-Style Qt6 Components)

## Overview

Fincept Terminal 的 UI 层采用 Obsidian 风格的暗色主题设计，55 个源文件实现完整的组件库。基于 Qt6 Widgets，无 Web/Electron 依赖。

## Theme System

### Components
- `Theme` — 主题数据结构 (颜色、字体、间距)
- `StyleSheets` — Qt 样式表生成器
- `ThemeManager` — 主题切换/持久化

### Design Language
- Obsidian 风格暗色主题
- 圆角卡片
- 层级化色彩系统
- 统一的组件间距

## Component Library (`ui/widgets/`)

| Component | Purpose |
|-----------|---------|
| `Card` | 圆角容器卡片 |
| `SearchBar` | 搜索栏 |
| `StatusBadge` | 状态指示器 |
| `LoadingWidget` | 加载动画 |
| `EmptyStateWidget` | 空状态提示 |
| `DataTable` | 数据表格 |
| `ChartFactory` | 图表创建器 (Qt6 Charts) |
| `MarkdownRenderer` | Markdown 渲染 (md4c) |

## Navigation (`ui/navigation/`)

| Component | Purpose |
|-----------|---------|
| `NavigationBar` | 主导航栏 |
| `FKeyBar` | F1-F12 快捷键栏 |
| `StatusBar` | 底部状态栏 |
| `DockToolBar` | Dock 工具栏 |
| `DockStatusBar` | Dock 状态栏 |
| `TabBar` | 标签栏 |

## Docking System

基于 **Qt Advanced Docking System (ADS)**:
- `CDockManager` — 管理 Dock 窗口
- `DockScreenRouter` — Dock 屏幕导航
- 可拖拽/停靠/浮动
- 布局持久化 (通过 [[fincept-storage-system]])

## MainWindow Architecture

```
MainWindow
├── auth_stack_ (QStackedWidget)
│   ├── LoginScreen
│   ├── RegisterScreen
│   ├── ForgotPasswordScreen
│   └── PricingScreen
├── stack_ (QStackedWidget) — 主应用屏幕
├── info_stack_ (QStackedWidget) — 信息屏幕 (Contact/Terms/Privacy)
├── dock_manager_ (ADS) — Dock 系统
├── dock_router_ — Dock 屏幕路由
├── tab_bar_ — 标签栏
├── chat_bubble_ — 浮动聊天泡泡
├── chat_mode_screen_ — 全屏聊天模式
└── lock_screen_ — PIN 锁屏
```

## Key Patterns

1. **Screen/Service separation**: Screens 只做渲染，Service 做数据获取
2. **Lazy screen creation**: ScreenRouter 的 factory 模式 (首次导航时创建)
3. **Focus mode**: 隐藏 UI chrome，最大化内容区域
4. **Chat mode**: 全屏沉浸式聊天
5. **Always-on-top**: 窗口置顶
6. **Multi-window**: 支持主窗口 + 辅助窗口 (window_id)

## Charts & Visualization

- **Qt6 Charts**: 金融图表 (K线、折线、柱状)
- **QGeoView**: 地图可视化 (OSM tiles, FetchContent 依赖)
- **MarkdownRenderer**: 基于 md4c 的 Markdown 渲染

## Responsive Design

- `resizeEvent` 处理窗口大小变化
- `focus_mode_` 切换 UI 密度
- 不同平台的 DPI 适配

## Related
- [[fincept-terminal-architecture]]
- [[fincept-workflow-engine]]
