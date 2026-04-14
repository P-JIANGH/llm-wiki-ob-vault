---
title: Unity ChatGPT
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [tool, game-engine, unity, llm, open-source]
sources: [raw/articles/ai-game-devtools/unity-chatgpt.md]
---

# Unity ChatGPT

Unity 游戏引擎的 ChatGPT（OpenAI API）集成插件。通过自然语言提示让 AI 动态生成并执行 Unity C# 代码，实现游戏对象的创建、角色行为的控制等。

## 功能概述

- **动态代码生成**：用自然语言描述需求，ChatGPT 生成可执行的 Unity C# 脚本
- **两个演示场景**：
  - `ChatGPTLogger.unity` — 演示让 AI 生成创建立方体的代码
  - `ChatGPTPlayerClones` — 演示加载玩家骨架、克隆、动态操控移动/跳跃
- **ScriptableObject 配置**：提示词模板通过 `ChatGPTQuestion` ScriptableObject 管理，支持参数替换

## 技术特点

**架构**：纯 Unity 原生实现，无第三方 AI 框架依赖

- `ChatGPTClient` — 使用 `UnityWebRequest` POST 到 OpenAI API，携带 Bearer Token 认证
- `ChatGTPSettings` — ScriptableObject 集中管理 API Key、URL、模型名称
- `ChatGPTQuestion` — ScriptableObject 存储提示词模板，支持多组替换变量
- 响应清理（`ChatGPTExtensions`）处理代码块中的 Markdown 格式

**依赖**：
- Unity 2021.3.8+
- Newtonsoft.Json（JSON 序列化）
- Roslyn C# Runtime DLLs（用于动态编译生成的 C# 代码）

## 与同类工具的差异

相比 [[UnityGen AI]]（代码生成）和 [[ChatGPT-API-unity]]（通用 ChatGPT API 封装），本项目专注于**在编辑器运行时通过自然语言动态生成并执行 Unity 代码**，而非预定义的任务模板。

## 相关链接

- GitHub: https://github.com/dilmerv/UnityChatGPT
- YouTube 视频系列: https://www.youtube.com/playlist

## 关联

[[ChatGPT-API-unity]] — 类似的 Unity + ChatGPT 集成方案
[[ChatGPTForUnity]] — 另一个 Unity ChatGPT 集成项目
