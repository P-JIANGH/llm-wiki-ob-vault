# OpenPanzer — Source

> Cloned from https://github.com/nicupavel/openpanzer on 2026-04-10

## README Summary

HTML5 回合制坦克策略游戏，致敬 Panzer General 2。

## Source Structure

```
css/          — UI 样式表（fonts/combat-info/equipment/message/startmenu/unit-info/ui）
js/           — 核心 JavaScript
  ai.js               — AI 引擎
  animation.js         — Sprite 序列帧动画
  campaign.js          — 战役管理
  dom.js               — DOM 操作
  equipment.js         — 装备管理
  eventhandler.js      — 事件驱动（未使用）
  game.js              — 游戏主管理器
  gamerules.js         — 攻击/移动/补给/增援/距离规则
  gamestate.js         — HTML5 localStorage 存档
  map.js               — 六角格地图和玩家对象
  prototypes.js         — 泛型定义
  render.js             — Canvas 渲染
  scenario.js           — 单剧本管理
  scenarioloader.js    — XML 剧本加载器
  sound.js              — 单位音效
  style.js              — Canvas 绘制风格
  uibuilder.js         — DOM UI 构建器（477行）
  ui.js                 — 鼠标+UI 窗口（1326行，最大文件）
  unit.js               — 单位和运输载具（345行）
resources/
  animations/   — Sprite 序列帧图片
  campaigns/     — 战役数据（XML）
  equipment/     — 单位装备属性 JSON
  fonts/         — 字体
  maps/          — 地图背景大图
  scenarios/     — 单剧本 XML
  sounds/        — 音效
  ui/            — 按钮/光标/对话框/旗帜等 UI 图片
  units/         — 单位朝向 Sprite
tools/
  campaign/      — .cam → XML Python 转换器
  equipment/     — PG2Suite → JS 转换器
  icons/         — BMP → PNG 转换器
  map/           — .scn/.map/.txt → OpenPanzer XML 转换器
index.html      — 入口 HTML
```

## Key Technical Details

- **零依赖**: 无 jQuery、node 等第三方库，ES5 纯原生 JS
- **跨平台**: Chrome/Firefox/Safari/Opera + Android 2.2+ / iOS 5.0+
- **GPLv2**: 代码完全开源
- **PG2 兼容性**: 通过工具链转换 PG2 原版 .cam/.scn 格式资产
- **localStorage**: 浏览器本地存储存档
