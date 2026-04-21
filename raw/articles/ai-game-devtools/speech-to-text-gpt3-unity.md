# speech-to-text-gpt3-unity

Source: https://github.com/dr-iskandar/speech-to-text-gpt3-unity

## README
This is the repo I use Whisper and ChatGPT API from OpenAI in Unity

## Project Overview
- **Name:** speech-to-text-gpt3-unity
- **Author:** dr-iskandar (Render Developers)
- **License:** MIT
- **Description:** A minimal prototype integrating OpenAI Whisper (speech-to-text) and ChatGPT API for use with Unity games.

## Architecture
The project consists of:
1. **Flask Backend (app.py):** A simple Python Flask server that serves as a middleware:
   - `/` — Health check endpoint
   - `/testing` — Test endpoint
   - `/tts` — Text-to-speech endpoint using ElevenLabs API (hardcoded voice ID pNInz6obpgDQGcFmaJgB, Adam voice)

2. **Unity Client (implied):** The README mentions Unity integration, suggesting the Unity game sends audio to Whisper STT, gets text, sends to ChatGPT API, then uses the Flask TTS endpoint for voice output.

## Key Files
- `app.py` — Flask server with ElevenLabs TTS integration (33 lines)
- `requirements.txt` — Flask, Gunicorn
- `LICENSE` — MIT License

## Dependencies
- Flask (Python web framework)
- Gunicorn (WSGI HTTP server)
- ElevenLabs API (TTS)
- OpenAI Whisper (STT, referenced in README but not in code)
- OpenAI ChatGPT API (referenced in README but not in code)

## Technical Notes
- Very early-stage prototype (only 3 commits visible)
- The Flask app has a hardcoded ElevenLabs API key (security concern)
- The Whisper STT and GPT-3 components are referenced in the README but the actual implementation code is not present in the repo
- Designed as a bridge between Unity and OpenAI/ElevenLabs APIs
