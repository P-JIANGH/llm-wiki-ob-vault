---
title: Hugging Face API Unity Integration
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [tool, unity, llm, game-engine, open-source]
sources: [raw/articles/ai-game-devtools/hugging-face-api-unity-integration.md]
---

# Hugging Face API Unity Integration

## Overview

Official Hugging Face Unity package (`com.huggingface.api` v0.8.0, Unity 2020.3+) providing a clean C# facade over the Hugging Face Inference API. Grants Unity projects access to 9000+ models via a reflection-based task registry and coroutine-driven async HTTP calls.

Authored by Dylan Ebert (`dylan@huggingface.co`), Apache 2.0 licensed.

## Technical Architecture

**Entry point:** Static `HuggingFaceAPI` facade class — all public methods (`TextToImage`, `Conversation`, `TextGeneration`, etc.) delegate to a generic `Query()` dispatcher.

**Task system:** Reflection-based auto-discovery. At static init, `LoadTasks()` scans the assembly for all types implementing `ITask`, creating instances via `Activator.CreateInstance`. Adding a new task means writing one class — no registration.

**Three-level generic hierarchy:**
```
TaskBase → TaskBase<TInput,TResponse> → TaskBase<TInput,TResponse,TContext>
```
Most tasks use `TaskBase` (single string input). Contextual tasks (`QuestionAnswering`, `Conversation`, `SentenceSimilarity`) extend the 3-param version.

**Payload abstraction:** `IPayload` interface with two strategies — `JObjectPayload` (JSON body for most tasks) and `ByteArrayPayload` (for audio/image binary).

**Async model:** All HTTP uses Unity coroutines with `.RunCoroutine()`. No `async/await` — callbacks feed into `Action<TResponse>` / `Action<string>onError`.

**Configuration:** `APIConfig` ScriptableObject (`Resources/HuggingFaceAPIConfig.asset`) holds API key, backup endpoint toggle, model warm-up flag, and timeout.

## Supported Tasks

| Task | Response |
|------|----------|
| Conversation | `string` |
| Text Generation | `string` |
| Text to Image | `Texture2D` |
| Text Classification | `TextClassificationResponse` |
| Zero Shot Classification | `ZeroShotTextClassificationResponse` |
| Question Answering | `QuestionAnsweringResponse` |
| Translation | `string` |
| Summarization | `string` |
| Sentence Similarity | `float[]` |
| Speech Recognition | `string` |

## Unity Game Dev Use Cases

- **NPC dialogue:** `Conversation()` + `TextGeneration()` for procedural quest dialogue
- **Procedural textures:** `TextToImage()` for dynamic in-game textures (skins, graffiti, signs)
- **Sentiment filtering:** `TextClassification()` to moderate user-generated content
- **Audio transcription:** `AutomaticSpeechRecognition()` for voice-command NPCs
- **Content filtering:** `ZeroShotTextClassification()` with custom labels for UGC moderation
- **Quest summarization:** `Summarization()` to generate quest log entries from longer lore text

## Relationship to Other Tools

- Related to [[chatgpt-api-unity]] (mochi-neko) and [[chatgptforunity]] (sunsvip) — all three provide LLM API access in Unity, but this is Hugging Face's official package supporting 9000+ open-source models vs those targeting OpenAI's API
- Part of the broader [[ai-game-devtools-catalog]] ecosystem tracked by `ai-game-devtools`

## Key Files

| File | Role |
|------|------|
| `Runtime/Implementations/HuggingFaceAPI.cs` | Static facade, 214 lines, all public task methods |
| `Runtime/Implementations/Tasks/TaskBase.cs` | 3-level generic base class |
| `Runtime/Implementations/APIClient.cs` | HTTP execution |
| `Runtime/Implementations/APIConfig.cs` | ScriptableObject config |
| `Editor/HuggingFaceAPIWizard.cs` | Editor window for API key setup |
