---
title: UnityGen AI
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [llm, code-generation, tool, game-engine, open-source]
sources: [raw/articles/ai-game-devtools/unitygen-ai.md]
---

# UnityGen AI

AI 驱动的 Unity 编辑器代码生成插件（alpha 阶段），由 himanshuskyrockets 开发。通过 OpenAI Codex 和文本模型，在 Unity 编辑器内直接生成和修改代码，简化开发工作流。

## 概述

UnityGen AI 是一个 Unity Editor 插件，允许开发者在编辑器内通过自然语言提示（prompt）让 AI 生成 C# 代码。项目使用 OpenAI Completions API（text-davinci-002 用于文本生成，text-davinci-003 用于代码生成），提供两个独立的编辑器窗口：Text AI 和 Code AI。

## 关键事实

- **开发状态**: Alpha，未正式发布；作者因 OpenAI API 额度耗尽已停止开发，寻求社区贡献者
- **使用模型**: text-davinci-002（文本）、text-davinci-003（代码）— 均已被 OpenAI 弃用
- **Unity 版本**: 2021.3.12f1
- **许可证**: 未明确指定
- **依赖**: 无第三方依赖，仅使用 Unity 内置 API
- **API 集成**: OpenAI Completions API v1 (`/v1/completions`)

## 技术架构

### 核心模块

| 模块 | 类型 | 职责 |
|------|------|------|
| `AITool.cs` | EditorWindow | 主界面：prompt 输入、参数配置、请求发送、脚本保存 |
| `CoderAI.cs` | API Client | 代码生成请求，调用 text-davinci-003 |
| `SmartAI.cs` | API Client | 文本生成请求，调用 text-davinci-002 |
| `CodeTool.cs` | EditorWindow | 展示代码生成结果 |
| `TextTool.cs` | EditorWindow | 展示文本生成结果 |

### 配置方式

通过 Unity ScriptableObject (`AIConfig`) 存储 API Key：
1. 在 Project 窗口右键 → Create → AIconfig
2. 命名 ScriptableObject 为 "AIConfig"
3. 填入 OpenAI API Key

### 工作流

1. 用户在 EditorWindow 中输入 prompt、设置 maxTokens 和 temperature
2. 插件通过 `UnityWebRequest` POST 请求发送至 OpenAI API
3. 请求间有 2 秒冷却时间（rate limiting）
4. 响应通过手动字符串解析（IndexOf/Substring）提取
5. 生成的代码自动包装为 `MonoBehaviour` 类
6. 可保存为 .cs 文件到项目目录

## 已知问题

- **同步阻塞**: 使用 `while (!request.isDone)` 阻塞等待 API 响应，会冻结编辑器
- **响应解析脆弱**: 手动字符串操作（非 JSON 解析），对 API 格式变化敏感
- **模型已弃用**: text-davinci-002/003 已被 OpenAI 关闭，需要迁移到 chat completions API
- **重复代码**: CoderAI 和 SmartAI 几乎完全相同，仅模型名不同，可重构
- **缺少错误处理**: 对 API 错误的处理较为基础

## 与同类工具差异

相较于 [[chatgpt-api-unity]]（异步 ChatGPT API 客户端）和 [[llm-unity]]（基于 llama.cpp 的本地推理），UnityGen AI 是少数提供完整编辑器 UI 的 AI 代码生成方案。但相比 [[starcoder]] 等现代代码模型工具，其使用的 text-davinci 系列已落后，且缺乏本地推理能力。与 [[codegeex4]] 等代码专用模型相比，UnityGen AI 深度集成 Unity 编辑器，但模型能力较弱。

## 相关链接

- GitHub: https://github.com/himanshuskyrockets/UnityGen-AI
- 作者 Twitter: @superman_space
- 演示视频: https://www.youtube.com/watch?v=2nc4Hkyl9Q0
