---
title: UnityAIWithChatGPT
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [llm, unity, tool, game-engine, open-source, avatar]
sources: [raw/articles/ai-game-devtools/unity-ai-with-chatgpt.md]
---

# UnityAIWithChatGPT

基于 Unity 实现 ChatGPT + UnityChan 角色语音交互展示的开源项目，由 haili1234 开发。

## 概述

该项目将 OpenAI ChatGPT API 与 Unity 引擎结合，使用 Unity-chan! 3D 角色模型实现语音对话交互。用户通过语音或文本与 ChatGPT 对话，AI 回复通过 TTS 语音输出并由 Unity-chan 角色展示。

## 项目结构

```
UnityAIWithChatGPT/
├── Assets/
│   ├── Art/                    # Unity-chan 角色模型和美术资源
│   ├── Scripts/                # C# 脚本：ChatGPT API 调用、语音处理
│   ├── Plugins/                # 第三方 Unity 插件
│   ├── ThirdPlugins/           # 额外第三方插件
│   ├── Resources/              # 运行时加载资源
│   ├── Scenes/                 # Unity 场景文件
│   └── _generatedAudio/        # TTS 生成的语音输出
├── zsolve/                     # CMake 跨平台构建系统
│   ├── generate_android.sh     # Android 构建脚本
│   ├── generate_ios.sh         # iOS 构建脚本
│   ├── generate_osx.sh         # macOS 构建脚本
│   └── generate_win.bat        # Windows 构建脚本
├── Recordings/                 # 演示截图和视频
└── README.md
```

## 技术特点

- **ChatGPT API 集成：** Assets/Scripts/ 中的 C# 脚本负责调用 ChatGPT API，处理对话请求和响应
- **Unity-chan 角色展示：** 使用 Unity-chan! 3D 模型作为 AI 助手的可视化形象
- **TTS 语音输出：** ChatGPT 回复通过文本转语音生成，音频文件保存至 _generatedAudio/ 目录
- **跨平台构建：** zsolve/ 提供基于 CMake 的多平台构建脚本（Android/iOS/macOS/Windows）
- **第三方插件生态：** 集成多个 Unity 插件扩展功能

## 与同类工具差异

| 特性 | UnityAIWithChatGPT | [[chatgpt-api-unity]] | [[chatgptforunity]] | [[unity-chatgpt]] |
|------|-------------------|----------------------|---------------------|-------------------|
| ChatGPT API | ✅ | ✅ | ✅ | ✅ |
| 3D 角色展示 | ✅ Unity-chan | ❌ | ❌ | ❌ |
| TTS 语音 | ✅ | ❌ | ❌ | ❌ |
| Memory 管理 | 基础 | ✅ 多策略 | ❌ | ❌ |
| Streaming | ❌ | ✅ | ❌ | ❌ |
| Function Calling | ❌ | ✅ | ❌ | ❌ |
| 跨平台构建 | ✅ CMake | ❌ | ❌ | ❌ |

与 [[chatgpt-api-unity]]（纯 API 客户端库）和 [[chatgptforunity]]（编辑器内对话工具）不同，UnityAIWithChatGPT 专注于完整的语音交互展示体验，包含 3D 角色和 TTS 语音。与 [[unity-chatgpt]]（代码生成实验）不同，本项目侧重对话展示而非代码生成。

## 许可证

README 未明确声明许可证。

## 相关链接

- GitHub: https://github.com/haili1234/UnityAIWithChatGPT
- Stars: 99 | Forks: 14 | Commits: 23
