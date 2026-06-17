# Hugging Face API Unity Integration — Source

**Repository:** https://github.com/huggingface/unity-api
**Cloned:** 2026-04-13
**Source:** README.md + package.json + Runtime/Implementations/*.cs + Runtime/Implementations/Tasks/*.cs + Editor/*.cs

---

## Overview

Unity package (`com.huggingface.api` v0.8.0) providing easy-to-use integration for the Hugging Face Inference API. Allows developers to access and use 9000+ Hugging Face AI models within Unity projects. Supports Unity 2020.3+.

---

## Architecture

```
Runtime/
├── Implementations/
│   ├── HuggingFaceAPI.cs        # Static facade, 214 lines — all public API methods
│   ├── APIClient.cs            # HTTP request execution
│   ├── APIConfig.cs            # ScriptableObject config asset
│   ├── Tasks/                   # 10 task implementations
│   │   ├── TaskBase.cs         # Generic base class (3 generic params: TInput, TResponse, TContext)
│   │   ├── ConversationTask.cs
│   │   ├── TextGenerationTask.cs
│   │   ├── TextToImageTask.cs
│   │   ├── TextClassificationTask.cs
│   │   ├── ZeroShotTextClassificationTask.cs
│   │   ├── QuestionAnsweringTask.cs
│   │   ├── TranslationTask.cs
│   │   ├── SummarizationTask.cs
│   │   ├── SentenceSimilarityTask.cs
│   │   └── AutomaticSpeechRecognitionTask.cs
│   ├── Interfaces/              # IAPIClient, IAPIConfig, IPayload, ITask
│   └── Utilities/              # Conversation.cs, Extensions.cs, Classification.cs, etc.
Editor/
├── HuggingFaceAPIWizard.cs     # Unity Editor wizard window
└── APIConfigUpdater.cs         # Config asset updater
```

**Key design patterns:**
- **Static facade** (`HuggingFaceAPI` class): Single entry point for all tasks
- **Reflection-based task discovery** (`Assembly.GetTypes()`): Auto-registers all `ITask` implementations at static init
- **3-level generic TaskBase hierarchy**: `TaskBase` → `TaskBase<TInput, TResponse>` → `TaskBase<TInput, TResponse, TContext>`
- **Coroutine-based async**: All HTTP calls use Unity coroutines (`.RunCoroutine()`)
- **Strategy payload**: `IPayload` interface (`JObjectPayload`, `ByteArrayPayload`) for different HTTP body formats
- **Fallback endpoints**: Backup endpoints per task, toggleable via config

---

## Dependencies

- `com.unity.textmeshpro`: 3.0.6 (UI text rendering)
- `com.unity.nuget.newtonsoft-json`: 3.0.1 (JSON serialization)

---

## Supported Tasks (10)

| Task | Status | Response Type |
|------|--------|---------------|
| Conversation | ✅ | `string` |
| Text Generation | ✅ | `string` |
| Text to Image | ✅ | `Texture2D` |
| Text Classification | ✅ | `TextClassificationResponse` |
| Zero Shot Text Classification | ✅ | `ZeroShotTextClassificationResponse` |
| Question Answering | ✅ | `QuestionAnsweringResponse` |
| Translation | ✅ | `string` |
| Summarization | ✅ | `string` |
| Sentence Similarity | ✅ | `float[]` |
| Speech Recognition | ✅ | `string` |

---

## Installation

Via Git URL in Unity Package Manager: `https://github.com/huggingface/unity-api.git`

Post-install: "Hugging Face API Wizard" opens automatically (Window > Hugging Face API Wizard), guides user through API key setup and optional example scene installation.

---

## Usage Example

```csharp
using HuggingFace.API;

HuggingFaceAPI.TextToImage("a cat in a hat", result => {
    // result is a Texture2D
}, error => {
    Debug.LogError(error);
});
```

---

## Configuration

`APIConfig` ScriptableObject (saved as `Resources/HuggingFaceAPIConfig.asset`):
- `apiKey`: Hugging Face API token
- `useBackupEndpoints`: bool — use task's secondary endpoints
- `waitForModel`: bool — wait for model to warm up
- `maxTimeout`: int — seconds to wait for response

---

## License

Apache 2.0 (LICENSE file present, 11357 bytes)

---

## Author

Dylan Ebert — `dylan@huggingface.co`
