---
title: Unciv
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, turn-based-strategy, 4x, android, desktop, kotlin]
sources: []
---

# Unciv

> Civilization V 开源复刻 for Android & Desktop，支持 Mod，LibGDX 构建

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/yairm210/Unciv |
| 语言 | Kotlin（约 141K LOC Kotlin） |
| 构建系统 | Gradle Kotlin DSL + LibGDX 1.14.0 |
| 渲染引擎 | LibGDX（桌面/安卓统一渲染） |
| 许可 | Apache 2.0 |
| 平台 | Android / Desktop (Win/Linux/Mac) / Rasp Pi |
| 最新版本 | 多平台发布（Google Play / F-Droid / Flathub / Brew / Chocolatey / Scoop） |

## 核心技术点

### LibGDX 跨平台架构
- 单一代码库同时支持 Android + Desktop + Linux/macOS/Raspberry Pi
- Android assets 目录作为统一资源路径（`android/assets`），Desktop 模块通过 `assetsDir = file("../android/assets")` 引用
- LibGDX 1.14.0 + Kotlin 2.1.21，Java 21 target
- 无游戏引擎定制层，直接基于 LibGDX 的 ApplicationListener 生命周期

### JSON 数据驱动规则集
- `core/src/com/unciv/models/ruleset/` 包含完整 Civ V 规则集建模
- Building / Tech / Unit / Tile / Policy / Religion 等均以 JSON 为数据源
- `RulesetCache` 运行时规则集缓存，支持 Mod 热加载
- `android/assets/jsons/` 包含 Civ V Vanilla + Gods & Kings 完整内容 JSON

### 序列化与存档系统
- `GameInfo` 类实现 `IsPartOfGameInfoSerialization` 接口约束
- `BackwardCompatibility` 处理版本迁移（`@Transient` 标注不序列化字段）
- `Gzip` 压缩存档，JSON 序列化游戏状态
- `CompatibilityVersion` 版本号机制保证存档兼容性

### 多人对战（Ktor）
- `OnlineMultiplayerEvents` 基于 Ktor 的 WebSocket/长轮询
- `MultiplayerGamePreview` 游戏预览元数据
- `MultiplayerFiles` 存档文件管理
- `ServerFeatureSet` 服务器能力声明
- 内置自有服务器（`server/` 模块），支持好友列表、聊天

### Mod 系统
- `core/src/com/unciv/logic/github/` GitHub repo 到本地 Mod 文件夹转换
- `ModOptions` 支持 Mod 选项配置
- `RulesetCache` 动态加载/卸载 Mod
- 官方文档：https://yairm210.github.io/Unciv/Modders/Mods/

### 代码架构
- `logic/` — 游戏核心逻辑（battle / city / civilization / map / automation / multiplayer / trade）
- `models/` — 数据模型（ruleset / translations / skins / metadata / stats）
- `ui/` — LibGDX UI 层（screens / components / popups / audio / images）
- `utils/` — 工具类（LongPriorityQueue 优先队列 / CollectionExtensions / PlatformSpecific / DebugUtils）

## 玩法特点

- **完整 Civ V 体验**：单人或多人（同步/异步）
- **G&K 完整支持**：信仰系统、宗教单位
- **BNW 进行中**：贸易路线、世界议会（ roadmap 中）
- **极致轻量**：无需高配硬件，"potato" 级别设备可运行
- **Mod 生态**：支持自定义规则集、UI、翻译
- **翻译覆盖**：20+ 语言社区翻译（`translations/completionPercentages.properties`）
- **地图编辑器**：内置地图创建工具
- **Discord 集成**：RPC 状态同步

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 跨平台游戏架构 | LibGDX 单代码库多平台部署（Android + Desktop）节省 2-3 倍工程量 |
| 数据驱动规则系统 | JSON + Kotlin 数据类分离内容与逻辑，Mod 扩展无需改代码 |
| 存档版本兼容 | `IsPartOfGameInfoSerialization` 接口约束 + 版本号机制保证存档向前兼容 |
| 多人网络 | Ktor 长连接 + 异步事件系统可作为实时对战参考架构 |
| AI 自动化 | `logic/automation/` 模块包含 AI 自动化逻辑（city / unit / defense / wonder 等） |
| 国际化 | properties 文件 + `tr()` 翻译系统多语言扩展简单可靠 |

## 相关链接

- 开发文档：https://yairm210.github.io/Unciv/Developers/Building-Locally/
- Mod 文档：https://yairm210.github.io/Unciv/Modders/Mods/
- Discord：https://discord.gg/bjrB4Xw
