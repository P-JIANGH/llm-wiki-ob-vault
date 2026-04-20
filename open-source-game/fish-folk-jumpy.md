---
title: "Fish Folk: Jumpy"
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, bevy, rust, shooter, tactical, multiplayer, 2d]
sources: [https://github.com/fishfolk/jumpy]
---

# Fish Folk: Jumpy

> 战术 2D 射击游戏，2-4 名玩家本地或联机对战，Fish Folk 社区主导的 Bevy/Rust 项目

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/fishfolk/jumpy |
| 语言 | Rust |
| 构建系统 | Cargo |
| 渲染/引擎 | Bevy + bones_framework（fishfolk 自研游戏框架）+ bones_bevy_renderer |
| 物理 | rapier2d（v0.19.0，enhanced-determinism 确定性物理） |
| 许可 | MIT OR Apache-2.0 |
| 版本 | v0.12.2 |
| 平台 | Windows/Linux/macOS + Web (WASM) |

## 核心技术点

### bones_framework 游戏框架

Fish Folk 团队自研的 Bevy 上层游戏框架（独立仓库 `fishfolk/bones`），为多人游戏提供：
- **bones_framework**：核心框架，含网络调试（net-debug）、帧数据回放等
- **bones_bevy_renderer**：Bevy 渲染集成

### 确定性物理

- `rapier2d` 启用 `enhanced-determinism` 特性，确保多人联机时物理一致
- `turborand` 原子随机数生成器，保证跨平台随机一致

### 模块化源码结构

```
src/
  main.rs          # 入口
  core.rs / core/  # 核心游戏逻辑（bullet、item、elements、globals）
  audio / audio.rs # 音频子系统
  input.rs         # 输入处理
  ui/              # UI 子系统（main_menu、map_select、network_game、settings、pause_menu）
  sessions.rs      # 游戏会话管理
  settings.rs      # 配置持久化
  debug.rs         # 调试工具（puffin 帧分析）
  profiler.rs      # 性能分析集成
```

### 网络多人（设计中）

Cargo.toml 中注释显示曾规划 GGRS（Game Input+Rollback Netcode）+ Quinn QUIC 传输层，
但当前代码中未激活。Web Demo 通过 WASM 直接运行。

### 数据驱动设计

- `serde_yaml` 配置数据驱动
- `peg` 解析器生成器用于关卡/脚本语法
- `postcard` 紧凑二进制序列化

### 开发体验

- `cargo clippy -- -W clippy::correctness -D warnings` 严格检查
- `cargo fmt` 格式化
- `dev-optimized` profile 兼顾开发编译速度与运行时性能
- `shadow-rs` 构建时生成版本信息

## 玩法特点

- **瞄准方向固定**：只能左右瞄准，策略体现在走位和时机
- **2-4 玩家**：支持本地分屏和在线对战
- **角色定制**：帽子等装饰，跨平台存档
- **关卡编辑器**：内置地图创建工具
- **扩展系统**：武器/关卡/音频模块化扩展
- **电竞功能**：内置锦标赛和匹配系统

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 确定性多人网络 | rapier2d enhanced-determinism 是实现多人回合制/动作一致性的可靠方案 |
| bones_framework 框架设计 | 自研上层框架封装 Bevy，隔离游戏逻辑与引擎适配，便于多项目复用 |
| 数据驱动架构 | serde_yaml + peg 解析器组合适合 AI 游戏中的规则/任务/对话数据配置 |
| WASM Web 部署 | 游戏内置 Web Demo 对 AI 游戏降低用户门槛有参考价值 |
| 模块化扩展 | 关卡/武器/角色分离的 pack 机制适合 AI 游戏的内容生成与热插拔 |
