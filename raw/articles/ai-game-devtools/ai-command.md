# AICommand — Raw Source Analysis

> 来源：https://github.com/keijiro/AICommand
> 分析日期：2026-04-13
> 仓库：keijiro/AICommand（已通过 gitcode.com 镜像克隆）

---

## README 摘要

AICommand 是 Unity Editor 的 ChatGPT 集成 PoC（概念验证），用自然语言指令控制 Unity Editor。

**核心功能：** 用户在 EditorWindow 输入自然语言描述 → AI 生成 Unity C# 脚本 → 自动执行为 MenuItem → 删除临时文件

**技术限制：** 作者明确表示"不实用"——ChatGPT 生成的代码经常不正确，需要多次重试。

---

## 核心文件分析

### 1. OpenAI.cs — API 数据结构

```csharp
namespace AICommand.OpenAI
{
    public static class Api
    {
        public const string Url = "https://api.openai.com/v1/chat/completions";
    }

    [System.Serializable]
    public struct ResponseMessage { public string role; public string content; }
    [System.Serializable]
    public struct ResponseChoice { public int index; public ResponseMessage message; }
    [System.Serializable]
    public struct Response { public string id; public ResponseChoice[] choices; }

    [System.Serializable]
    public struct RequestMessage { public string role; public string content; }
    [System.Serializable]
    public struct Request { public string model; public RequestMessage[] messages; }
}
```

纯数据类，使用 Unity 的 `JsonUtility` 序列化。硬编码 `gpt-3.5-turbo` 模型。

### 2. OpenAIUtil.cs — HTTP 调用逻辑

```csharp
static class OpenAIUtil
{
    public static string InvokeChat(string prompt)
    {
        // POST to api.openai.com/v1/chat/completions
        // Authorization: Bearer <apiKey>
        // Content-Type: application/json
        // 使用 UnityWebRequest.Post，timeout 来自 settings
        // 假进度条（fake progress bar）：Thread.Sleep 轮询 isDone
        // 返回 data.choices[0].message.content
    }
}
```

关键点：使用 Unity 内置 `UnityWebRequest`（而非 `HttpClient`），通过 Unity 的协程机制异步请求，假进度条用 `Thread.Sleep` 实现（作者自评"Don't try this at home"）。

### 3. AICommandWindow.cs — EditorWindow UI + 脚本生命周期

核心逻辑（3个区域）：

**脚本生成：**
```csharp
static string WrapPrompt(string input)
  => "Write a Unity Editor script.\n" +
     " - It provides its functionality as a menu item placed \"Edit\" > \"Do Task\".\n" +
     " - It doesn't provide any editor window.\n" +
     " - Don't use GameObject.FindGameObjectsWithTag.\n" +
     " - Find game objects manually.\n" +
     " - I only need the script body.\n" +
     "The task is described as follows:\n" + input;

void RunGenerator()
{
    var code = OpenAIUtil.InvokeChat(WrapPrompt(_prompt));
    CreateScriptAsset(code); // 写入 Assets/AICommandTemp.cs
}
```

**脚本执行生命周期：**
```csharp
void OnEnable()
  => AssemblyReloadEvents.afterAssemblyReload += OnAfterAssemblyReload;

void OnAfterAssemblyReload()
{
    if (!TempFileExists) return;
    EditorApplication.ExecuteMenuItem("Edit/Do Task"); // 触发 MenuItem
    AssetDatabase.DeleteAsset(TempFilePath);            // 删除临时文件
}
```

**Reflection 黑科技：** 使用 Unity 非公开方法创建脚本：
```csharp
var flags = BindingFlags.Static | BindingFlags.NonPublic;
var method = typeof(ProjectWindowUtil).GetMethod("CreateScriptAssetWithContent", flags);
method.Invoke(null, new object[]{TempFilePath, code});
```

### 4. AICommandSettings.cs — 配置管理

```csharp
[FilePath("UserSettings/AICommandSettings.asset", FilePathAttribute.Location.ProjectFolder)]
public sealed class AICommandSettings : ScriptableSingleton<AICommandSettings>
{
    public string apiKey = null;
    public int timeout = 0;
}
```

通过 SettingsProvider 在 `Edit > Project Settings > AI Command` 中暴露配置。API Key 存储在 `UserSettings/AICommandSettings.asset`，作者警告：共享项目时需排除此目录。

---

## 架构总结

| 组件 | 职责 | 技术 |
|------|------|------|
| OpenAI.cs | Request/Response 数据结构 | JsonUtility 序列化 |
| OpenAIUtil.cs | HTTP POST 调用 ChatGPT API | UnityWebRequest |
| AICommandWindow.cs | UI + 脚本生成/执行/清理 | Reflection + AssemblyReloadEvents |
| AICommandSettings.cs | API Key + Timeout 配置 | ScriptableSingleton + SettingsProvider |

**执行流程：**
1. 用户输入自然语言 prompt（例如 "Create 100 cubes at random points"）
2. WrapPrompt 添加结构化指令约束
3. 调用 ChatGPT gpt-3.5-turbo 生成 C# 代码
4. Reflection 调用内部 API 创建 `Assets/AICommandTemp.cs`
5. 触发 Assembly Reload（自动）
6. `afterAssemblyReload` 事件触发，执行 `Edit/Do Task` MenuItem
7. 临时文件被删除

**局限性（作者自述）：**
- gpt-3.5-turbo 对 Unity API 理解有限，生成代码经常出错
- 无重试机制，只能手动多次按 Run
- 单次对话，无上下文记忆

---

## 技术栈

- Unity 2022.2+
- ChatGPT API (gpt-3.5-turbo)
- 纯 C#，单 `Assets/Editor/` 目录，无第三方依赖
- MIT License（或类似开源许可）

---

## 相关项目（同作者 keijiro）

- **AIShader** — AI 生成 GLSL Shader（同一系列）
- **Kloud** — Unity 插件包管理器
- **Jsub** — Unity Jobs System 辅助库
