---
title: Behaviac
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [game-engine, tool, ai, agent]
sources: [raw/articles/ai-game-devtools/behaviac.md]
---

# Behaviac

腾讯开源的游戏AI开发框架（BSD 3-Clause），支持行为树（BT）、状态机（FSM）、HTN三种范式。编辑器仅限Windows，运行时C++/C#支持全平台（Windows/Linux/Android/iOS/Unity）。

## 核心定位

游戏AI的**可视化编辑 + 运行时执行**框架。设计师在编辑器中编辑行为，导出后在游戏中运行。核心价值在于快速迭代——行为变更无需重新编译代码。

## 技术架构

| 模块 | 作用 |
|------|------|
| `agent/` | AI实体基类，定义智能体的属性和方法 |
| `behaviortree/` | 行为树节点实现（Selector、Sequence、Parallel等） |
| `fsm/` | 有限状态机实现 |
| `htn/` | 层次任务网络（HTN） Planner |
| `network/` | 多人游戏AI状态同步 |
| `property/` | AI属性/状态变量系统 |

### 运行时语言

- **C++**: 适用于游戏客户端和服务端（高性能）
- **C#**: 适用于Unity集成

## 关键特性

- **热重载**: 行为文件（meta file）变更无需重启游戏
- **代码生成**: 从编辑器导出C++/C#代码框架
- **可视化调试**: 编辑器内置实时/离线调试功能
- **多平台**: 全平台覆盖，客户端服务器通用

## 与同类工具对比

Behaviac 专注**游戏AI行为编辑**，区别于通用LLM Agent框架如 [[autogen]] 或 [[agentscope]]——后者面向通用多Agent协作，而 Behaviac 是为游戏NPC/怪物AI设计的专用工具，类似Unity的 [[sanity-ai-engine]] 但支持更丰富的行为树范式。

## 版本信息

- 当前版本: **3.6.39**（2017-09-11）
- 腾讯维护周期: 2015–2017年
- 许可证: BSD 3-Clause

## 参考

- 官网: http://www.behaviac.com/
- GitHub: https://github.com/Tencent/behaviac
- 腾讯相关项目: `ai-game-devtools/hunyuan-world-1.0`（腾讯游戏AI相关）
