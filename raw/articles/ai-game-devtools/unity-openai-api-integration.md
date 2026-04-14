# Unity OpenAI-API Integration

> Source: https://github.com/himanshuskyrockets/Unity_OpenAI

## README Summary

Integrates OpenAI GPT-3 / ChatGPT API into a Unity project for natural language processing in games.

**Installation:**
1. Obtain OpenAI API key from https://beta.openai.com/account/api-keys
2. Choose OpenAI model (ChatGPT or GPT-3)
3. Copy scripts and modify per needs
4. Display generated text via Unity UI

**Features:**
- Create NPC for games
- AI-powered chatbot
- Customizable tools

**Notice:** Author states API key credits expired; project is looking for contributors.

---

## Key Source Files

### Assets/OpenAI_Scripts/OpenAI_Vission.cs
- `AIVision` MonoBehaviour class
- Sends image URLs to GPT-4 Vision API (`/v1/chat/completions`)
- Uses `UnityWebRequest` for HTTP POST with Bearer token auth
- Supports loading image URLs from local file
- Model: `gpt-4-vision-preview`, max_tokens: 300

### Assets/OpenAI_Scripts/Text-to-Speech-OpenAI.cs
- `TextToSpeech` MonoBehaviour class
- Sends text to OpenAI TTS API (`/v1/audio/speech`)
- Uses `tts-1` model, `alloy` voice
- Saves response as `speech.mp3`
- Also uses `UnityWebRequest` with Bearer token auth

### Packages/manifest.json
- Unity 2022.2.x project
- TextMeshPro included
- Standard Unity packages (ugui, timeline, visualscripting, etc.)

---

## Architecture

Simple direct API integration:
- No abstraction layer or SDK
- Each script is self-contained MonoBehaviour
- API key stored as serialized field (`YOUR_API_KEY` placeholder)
- All API communication via `UnityWebRequest`

---

## License
No explicit license found in repository.

---

## Related Projects (same author on checklist)
- `UnityGen-AI` - Unity AI code generation
- `SimpleOllamaUnity` - Ollama integration for Unity
