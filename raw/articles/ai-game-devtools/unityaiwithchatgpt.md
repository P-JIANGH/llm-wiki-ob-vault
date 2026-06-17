# UnityAIWithChatGPT

Source: https://github.com/haili1234/UnityAIWithChatGPT
Cloned: 2026-04-22

## README

基于Unity，实现ChatGPT+UnityChan语音交互展示。

## Project Structure

- Unity project with ChatGPT integration
- Uses OpenAI ChatGPT API (gpt-3.5-turbo)
- RTVoice plugin for text-to-speech
- LipSync plugin for facial animation
- UnityChan 3D model for character display

## Key Scripts

### ChatGpt.cs
Core ChatGPT API client for Unity:
- `ChatStream()` — streaming chat with callback
- `SingleAskStream()` — single question with streaming response
- `SingleAsk()` — single question non-streaming
- `Chat()` — full chat conversation
- Uses `UnityWebRequest` for HTTP POST to `api.openai.com/v1/chat/completions`
- Supports retry on 429 Too Many Requests
- JSON serialization via `JsonUtility`

### ChatGptDemo.cs
Demo MonoBehaviour connecting UI to ChatGPT:
- InputField for user input
- DialogBox for displaying responses
- SpeechText (RTVoice) for TTS playback
- AudioSource for voice output
- Auto-hides dialog after response

### DialogBox.cs
Simple dialog UI controller:
- ShowDialog(string text) — activates dialog box
- HideDialog() — deactivates dialog box

## Third-Party Plugins

- **RTVoice** (crosstales) — Text-to-speech engine
- **LipSync** — Real-time lip synchronization
- **UnityChan** — 3D character model

## Dependencies (manifest.json)

Standard Unity 2020/2021 packages including:
- UGUI, TextMeshPro, Timeline
- Unity Web Request modules
- Recorder for video capture

## License

Not specified (default GitHub license applies)
