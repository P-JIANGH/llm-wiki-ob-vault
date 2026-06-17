---
title: ChatGPTForUnity
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [tool, game-engine, unity, llm]
sources: [raw/articles/ai-game-devtools/chatgptforunity.md]
---

# ChatGPTForUnity

Unity 编辑器内直接调用 ChatGPT 的 UPM 包插件。

## Overview

ChatGPTForUnity 是一个 Unity UPM 包，允许开发者在 Unity 编辑器中直接与 ChatGPT 对话、生成代码并保存为文件。无需切换到浏览器，在编辑器窗口内即可完成 AI 辅助编码工作流。

## Key Facts

- **作者**: Eddie (sunmmvip@gmail.com)
- **版本**: 1.0.1
- **Unity 版本**: 2021.3+
- **许可证**: MIT
- **仓库**: https://github.com/sunsvip/ChatGPTForUnity
- **依赖**: `com.unity.nuget.newtonsoft-json: 3.0.2`, `com.unity.textmeshpro: 3.0.6`

## Technical Details

### 架构

- **入口**: Unity 菜单 `Window > ChatGPT > ChatGPT Window`
- **API 调用**: `ChatGPT.cs` — 封装 `UnityWebRequest` POST 到 `https://api.openai.com/v1/chat/completions`
- **默认模型**: `gpt-3.5-turbo`，Temperature 默认 0
- **认证**: Bearer Token (API Key) 存于 `EditorPrefs`
- **聊天历史**: JSON 序列化后存 `EditorPrefs`（键 `ChatGPT.Settings.ChatHistory`）

### 核心功能

1. **编辑器内对话窗口** — 双栏 UI 显示用户消息与 AI 回复
2. **代码块提取与保存** — AI 回复中的 Markdown 代码块自动解析，支持 12 种语言（python, csharp, json, cpp, java, js, html, css, xml, md, ts）
3. **一键保存文件** — 每个代码块旁有 "Save {ext} File(N)" 按钮，直接写入磁盘
4. **聊天历史持久化** — 关闭窗口后自动保存，下次打开恢复上下文
5. **参数可调** — Temperature (0-2)、WebRequest Timeout (30-120s)

### 主要类

| 类 | 职责 |
|---|---|
| `ChatGPT` | API 调用、消息历史管理、代码块解析 |
| `ChatGPTWindow` | Editor UI（聊天窗口、设置面板、文件保存） |
| `ChatGPTMessage` | 消息数据结构 {role, content} |
| `ChatGPTCodeBlock` | 代码块 {Tag, Content, FileExtension} |

## 与同类工具对比

- [[unity-chatgpt]] — 同一作者，类似功能集
- [[ChatGPT-API-unity]] — mochi-neko 的 Unity ChatGPT 集成方案
- [[LLMUnity]] — 更通用的 LLM Unity 集成，支持本地模型

相比 [[unity-chatgpt]]，ChatGPTForUnity 更侧重编辑器工具窗口体验和代码文件直接导出；[[LLMUnity]] 则支持本地 LLM 推理，不依赖云端 API。

## Links

- GitHub: https://github.com/sunsvip/ChatGPTForUnity
- Blog: https://blog.csdn.net/final5788
