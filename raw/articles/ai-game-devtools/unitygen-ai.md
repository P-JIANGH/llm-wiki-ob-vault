# UnityGen AI — Raw Source

**Source:** https://github.com/himanshuskyrockets/UnityGen-AI
**Date:** 2026-04-17
**Extracted by:** ai-game-devtools cron

## README Summary

UnityGen AI (alpha) is an AI-powered code generation plugin for Unity. It allows you to quickly generate and modify code directly within the Unity editor, using the power of AI to streamline your workflow and reduce the time you spend writing and refactoring code. UnityGen AI is using Openai Codex model and text models.

**Important notices from author:**
- Project does not have a full release; future developments may include more than just code
- Author's OpenAI API key credits have expired — project is effectively abandoned, seeking contributors
- Open source — contributions welcome via fork and PR

## Features
- AI-powered generation using OpenAI Codex/text models
- Seamless integration with Unity Editor
- Fast code generation (seconds)
- User-friendly interface
- Customizable output

## Installation
- Get OpenAI API key from platform.openai.com
- Drag and drop plugin .unitypackage to Unity project or clone repo
- Create AIConfig ScriptableObject in Unity (Right Click → Create → AIconfig)
- Add API key to AIConfig asset

## Architecture

### Core Modules

| File | Purpose |
|------|---------|
| `AITool.cs` | Main EditorWindow — handles UI, prompt input, sends requests to OpenAI API, saves scripts |
| `CoderAI.cs` | Code generation client — calls OpenAI Completions API with `text-davinci-003` model |
| `SmartAI.cs` | Text generation client — calls OpenAI Completions API with `text-davinci-002` model |
| `CodeTool.cs` | EditorWindow for displaying code generation results |
| `TextTool.cs` | EditorWindow for displaying text generation results |

### Technical Details

- **API:** OpenAI Completions API v1 (`/v1/completions`)
- **Models used:** `text-davinci-002` (text), `text-davinci-003` (code) — both now deprecated
- **Rate limiting:** 2 second cooldown between requests
- **Request handling:** Synchronous blocking (`while (!request.isDone)`) — not ideal for editor performance
- **Config:** Uses Unity ScriptableObject (`AIConfig`) to store API key
- **Unity version:** 2021.x (from ProjectVersion.txt: `2021.3.12f1`)
- **Dependencies:** Standard Unity packages (no third-party dependencies)

### Key Code Patterns

- `CoderAI` and `SmartAI` are nearly identical classes differing only in model name
- Both use `UnityWebRequest` for HTTP POST to OpenAI API
- Response parsing is manual string manipulation (IndexOf/Substring) — fragile
- AI generated code is wrapped in a `MonoBehaviour` class template in `GenerateScript()`
- Response saved to `Assets/response.txt`

## License

Not explicitly specified in README. No LICENSE file found in repository.

## Project Status

- **Alpha stage** — not production-ready
- **Effectively abandoned** — author ran out of API credits, asking for contributors
- Uses deprecated OpenAI models (text-davinci-002/003) which have been discontinued by OpenAI
