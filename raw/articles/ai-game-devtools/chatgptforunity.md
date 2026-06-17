# ChatGPTForUnity

> Source: https://github.com/sunsvip/ChatGPTForUnity

## README

```
# ChatGPTForUnity
Blog：https://blog.csdn.net/final5788
ChatGPT for unity
1. Open Unity PackageManager.
2. Add package from git URL: https://github.com/sunsvip/ChatGPTForUnity.git
```

## package.json

```json
{
  "name": "com.sunsvip.chatgpt",
  "displayName": "ChatGPT for Unity",
  "version": "1.0.1",
  "description": "A ChatGPT plugin for unity.",
  "unity": "2021.3",
  "dependencies": {
    "com.unity.nuget.newtonsoft-json": "3.0.2",
    "com.unity.textmeshpro": "3.0.6"
  },
  "keywords": ["Editor", "OpenAI", "ChatGPT"],
  "author": {
    "name": "Eddie",
    "email": "sunmmvip@gmail.com"
  },
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/sunsvip/ChatGPTForUnity.git"
  }
}
```

## 核心源码文件

### Editor/ChatGPT/ChatGPT.cs

核心 API 调用类 `ChatGPT`:

- `ChatGPT(apiKey, userId, model, temperature)` — 构造函数，默认模型 `gpt-3.5-turbo`
- `Send(message, onComplete, onProgressUpdate)` — 协程方式发送请求
- `SendAsync(message)` — async/await 异步方式
- `SetAPIKey(apiKey)` — 设置 API Key
- `SaveChatHistory() / RestoreChatHistory()` — 持久化聊天历史到 EditorPrefs
- `NewChat()` — 新建聊天（清除历史）
- `GetCodeBlocksByIdx(msgIdx)` — 从回复中提取代码块
- 支持语言: python, csharp, json, cpp, java, javascript, html, css, xml, markdown, typescript

API 端点: `https://api.openai.com/v1/chat/completions`

关键实现细节:
- 通过正则 ` ```(?<language>\\n)?\\n(?<code>.*?)\\n``` ` 解析 Markdown 代码块
- 聊天历史以 JSON 形式存 `EditorPrefs`（键: `ChatGPT.Settings.ChatHistory`）
- `UnityWebRequest` + `CertificateHandler` 自定义跳过证书验证

### Editor/ChatGPT/ChatGPTWindow.cs

编辑器窗口类 `ChatGPTWindow`:

- 菜单入口: `Window > ChatGPT > ChatGPT Window`
- 双栏聊天 UI（自己 vs AI），支持滚动
- 右上角设置面板: API Key、Temperature (0-2)、WebRequest Timeout (30-120s)
- AI 回复中的代码块自动渲染为 "Save {ext} File(N)" 按钮，可直接保存到磁盘
- `OnDisable` 时自动保存聊天历史和设置

## 项目结构

```
ChatGPTForUnity/
├── package.json
├── Preview.gif
├── README.md
└── Editor/
    ├── ChatGPTForUnity.Editor.asmdef
    └── ChatGPT/
        ├── ChatGPT.cs       # 核心 API 调用逻辑
        └── ChatGPTWindow.cs # Unity Editor 窗口 UI
```
