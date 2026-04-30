---
title: Fish Folk Punchy
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, beat-em-up, 2.5d, bevy, rust, wasm]
sources: []
---

# Fish Folk Punchy

> 2.5D 横版清版动作游戏（Beat-em-up），基于 Bevy 引擎开发，支持 Web/WASM 原生运行

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/fishfolk/punchy |
| 语言 | Rust（主语言）+ JavaScript（脚本） |
| 引擎/框架 | Bevy 0.9 + Rapier2D 物理 + WASM/Web |
| 构建系统 | Cargo workspace（`punchy` + `macros` 子 crate） |
| 许可 | MIT OR Apache-2.0 |
| 代码量 | ~7046 LOC（主 crate 29 个 .rs 文件） |
| Web 演示 | https://fishfolk.github.io/punchy/player/latest/ |

## 核心技术点

### Bevy ECS 架构
- 完全基于 Bevy 0.9 ECS 框架，所有游戏系统均为 Bevy Plugin
- `FighterPlugin`（格斗者）、`AttackPlugin`（攻击）、`MovementPlugin`（移动）、`ItemPlugin`（物品）、`AnimationPlugin`（动画）、`PlatformPlugin`（平台）、`UIPlugin`（界面）等多个插件体系
- `FighterStatePlugin` 管理格斗者状态机，核心 `fighter_state.rs` 达 2228 行

### 物理系统
- `bevy_rapier2d` v0.20 刚体物理（2D 碰撞/重力）
- 调试渲染可选（`bevy-inspector-egui-rapier`）

### 输入系统
- `leafwing-input-manager` v0.7 输入管理器（PlayerAction/MenuAction 双 ActionMap）
- `structopt` + `directories` 支持 CLI 参数配置和游戏数据目录查找

### 脚本系统
- `bevy_mod_js_scripting`（第三方 Git 依赖）嵌入 JavaScript 脚本
- `fluent` + `bevy_fluent` 国际化本地化支持（`locales/` 目录）
- `serde_yaml` 数据驱动配置（`assets/default.game.yaml`）

### 视效与音频
- `bevy_parallax` 视差背景（2D 场景深度感）
- `bevy_kira_audio` 音频系统（MP3 支持）
- `bevy_egui` + `egui_extras` 调试 UI

### WASM/Web 支持
- `web-sys` 条件编译支持（`wasm32` target）
- 游戏资产通过 `AssetPlugin` + 自定义 loaders 异步加载
- Web 演示页实时更新（latest release 自动部署）

### 工作空间结构
```
Cargo.toml workspace
├── punchy（主 crate）
│   ├── src/ — 29 个 .rs 模块（main.rs + 28 个功能模块）
│   ├── macros/ — proc-macro crate（punchy_macros）
│   ├── assets/ — fighter definitions, levels, locales, scripts
│   └── wasm_resources/ — WASM 平台资源
```

## 核心模块（src/）

| 文件 | 行数 | 职责 |
|------|------|------|
| fighter_state.rs | 2228 | 格斗者状态机（最大模块） |
| assets.rs | 513 | 资源加载器注册 |
| loading.rs | 520 | 关卡/资源配置加载 |
| item.rs | 443 | 物品系统 |
| platform.rs | 445 | 平台/地形系统 |
| ui.rs | 314 | UI 界面插件 |
| metadata.rs | 306 | 游戏元数据 |
| attack.rs | 273 | 攻击/伤害判定 |
| enemy_ai.rs | 253 | 敌人 AI |
| fighter.rs | 244 | 格斗者基础 |
| movement.rs | 238 | 移动系统 |

## 玩法特点

- **2.5D Beat-em-up**：横版视角 + 深度层次感（Parallax）
- 灵感来源：Little Fighter 2、River City Ransom
- 支持 2-4 名玩家本地/联机（继承自 [[fish-folk-jumpy]] 框架）
- 内置关卡编辑器（通过 WASM 前端）
- 完整本地化支持（多语言 `locales/`）

## 与 Fish Folk Jumpy 的关系

Punchy 与 [[fish-folk-jumpy]] 同属 **Fish Folk 组织**（Spicy Lobster 社区）：
- Jumpy：2D 战术射击（Bevy + rapier2d + bones_framework）
- Punchy：2.5D 清版动作（共享 Bevy 技术栈，但独立代码库）
- 两者共享部分设计理念（确定性物理、多人合作）

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| Bevy 游戏架构 | Plugin 化系统设计（15+ 插件）适合模块化 AI 游戏 |
| 格斗状态机 | fighter_state.rs 2228 行状态机可作为 AI 决策树参考 |
| WASM 跨平台 | Web 原生运行能力对公司 HTML5 游戏有参考价值 |
| 数据驱动 | YAML 配置 + 资源分离，方便 AI 生成内容接入 |
| 本地化框架 | fluent 系统适合多语言 AI 对话游戏 |
