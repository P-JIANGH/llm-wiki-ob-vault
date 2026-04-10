---
title: FreeCol
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, turn-based-strategy, colonization, java]
sources: []
---

# FreeCol

> Colonization 开源复刻 — 回合制策略游戏，目标是建立独立国家

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/FreeCol/freecol |
| 语言 | Java 11 |
| 构建系统 | Ant (build.xml) |
| 渲染/引擎 | Swing (MigLayout) + 自研 2D |
| 许可 | GPL v2 |
| 源码规模 | 826 Java 源文件 (src/) |

## 核心技术点

### 模块化架构
```
src/net/sf/freecol/
├── FreeCol.java           # 主入口
├── client/                # 客户端 (GUI)
├── common/                # 共享模型 (i18n/model/util/option/...)
├── server/                # 服务端 (ai/control/networking/)
├── tools/                 # 工具
└── metaserver/            # 多人匹配服务器
```

### 数据驱动规则系统
- `data/rules/freecol/specification.xml` — 游戏规则 XML 定义
- `data/rules/freecol/FreeColMessages.properties` — 国际化字符串
- `data/mods/` — 模组系统支持
- 规则与代码完全分离，mod 友好

### 网络同步
- `server/networking/` — TCP Socket 网络层
- Metaserver 元服务器 — 公开大厅匹配

### 国际化
- `common/i18n/` — Java i18n 资源束
- 多语言支持

## 玩法特点

- 殖民时代背景（15-18世纪）
- 4 X (eXplore, eXpand, eXploit, eXterminate) 玩法
- 从无到有建立独立国家
- 原作 Colonization 完整复刻
- 等距地图视图 + 现代 GUI

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 数据驱动规则 | XML/YAML 规格文档完全定义游戏机制，代码与规则解耦 |
| 回合制 AI | server/ai/ 分层 AI 架构可参考 |
| Mod 系统 | data/mods/ 目录热插拔模组 |
| 国际化 | Java ResourceBundle i18n 模式 |
| 网络帧同步 | TCP Socket 回合同步多人架构 |
| 金融/经济系统 | 贸易/生产/税收经济链建模参考 |
