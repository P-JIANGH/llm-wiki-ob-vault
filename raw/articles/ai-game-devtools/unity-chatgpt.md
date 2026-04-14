# Unity ChatGPT Experiments

> Source: https://github.com/dilmerv/UnityChatGPT
> Cloned: 2026-04-14
> License: MIT

## Overview

Unity ChatGPT Experiments 是一个 Unity 插件，展示如何将 ChatGPT（OpenAI API）集成到 Unity 游戏中。通过自然语言提示让 AI 生成 Unity C# 代码，动态创建游戏对象、操控角色行为。

## 主要功能

1. **ChatGPTLogger** — 场景演示：让 ChatGPT 生成代码创建原始立方体
2. **ChatGPTPlayerClones** — 场景演示：加载玩家骨架、克隆玩家、让玩家移动和跳跃
3. **动态代码生成** — 通过提示词让 AI 动态生成可执行的 Unity C# 代码

## 技术架构

```
Assets/Scripts/ChatGPT/
├── Client/
│   └── ChatGPTClient.cs        # HTTP POST 调用 OpenAI ChatGPT API
├── Contracts/
│   ├── ChatGPTRequest.cs       # 请求数据模型
│   ├── ChatGPTResponse.cs      # 响应数据模型
│   ├── ChatGPTChatChoice.cs    # ChatGPT Chat Completion Choice
│   ├── ChatGPTChatMessage.cs   # ChatGPT Chat Message
│   └── ChatGPTChatUsage.cs     # Token 使用统计
├── Scriptables/
│   └── ChatGPTQuestion.cs      # ScriptableObject，存储提示词配置
├── Extensions/
│   └── ChatGPTExtensions.cs     # 响应数据清理扩展方法
└── ChatGTPSettings.cs          # ScriptableObject，存储 API Key/URL/Model
```

### 核心类：ChatGPTClient

使用 Unity UnityWebRequest 发送 POST 请求到 OpenAI API：

```csharp
public IEnumerator Ask(string prompt, Action<ChatGPTResponse> callBack)
{
    // 构造 ChatML 格式请求
    // 设置 Authorization: Bearer {apiKey}
    // 设置 OpenAI-Organization: {org}
    yield return request.SendWebRequest();
    var response = JsonConvert.DeserializeObject<ChatGPTResponse>(responseInfo);
    callBack(response);
}
```

### 配置：ChatGTPSettings (ScriptableObject)

- `apiURL` — OpenAI API 端点
- `apiKey` — OpenAI API Key
- `apiOrganization` — OpenAI Organization ID
- `apiModel` — 模型名称（如 gpt-3.5-turbo / gpt-4）
- `debug` — 调试模式开关

## 依赖

- Unity 2021.3.8f 或更高
- [Roslyn C# Runtime DLLs](https://github.com/dilmerv/UnityRoslynDemos)（用于动态编译生成的 C# 代码）
- OpenAI API Key
- Newtonsoft.Json（JSON 序列化）

## 示例提示词

1. "A unity c# class script that creates 100 cubes by Using PrimitiveType cubes and then forms a three dimensional pyramid"
2. "A unity c# class script that finds a PlayerArmature game object and get StarterAssetsInputs component and sets the move field to a vector2"
3. "Write unity c# script monoBehavior named CubePlacer provides a method called Apply() which creates 5 primitive cubes 8 meter away from the camera"

## 场景

| 场景 | 功能 |
|------|------|
| ChatGPTLogger.unity | 简单示例：让 AI 生成创建立方体的代码 |
| ChatGPTPlayerClones | 进阶示例：加载骨骼、克隆、动态操控移动/跳跃 |

## 相关文件

- `Assets/Settings/ChatGPTSettings.asset` — Unity 中的配置文件
- `Service/chatgpt_service.py` — 已废弃的 Flask Python 封装服务（旧方案，使用浏览器自动化）
