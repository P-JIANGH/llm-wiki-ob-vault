# RealtimeTTS - Source Analysis

**Source:** https://github.com/KoljaB/RealtimeTTS
**Date:** 2026-04-21
**Version:** 0.6.1

## Project Overview

RealtimeTTS is a state-of-the-art text-to-speech (TTS) library designed for real-time applications. It converts text streams into high-quality auditory output with minimal latency. Almost instantaneous text-to-speech conversion, compatible with LLM outputs.

## Key Features

- **Low Latency**: almost instantaneous text-to-speech conversion, compatible with LLM outputs
- **High-Quality Audio**: generates clear and natural-sounding speech
- **Multiple TTS Engine Support**: supports 20+ engines including OpenAI, Elevenlabs, Azure, Coqui, Piper, Kokoro, StyleTTS2, Edge TTS, gTTS, Parler, CAMB AI, MiniMax, and system TTS
- **Multilingual**: supports multiple languages with various tokenizers
- **Robust and Reliable**: fallback mechanism switches to alternative engines in case of disruptions

## Architecture

### Core Components

- **TextToAudioStream**: Main class for streaming text to audio, handles sentence splitting, buffering, and playback
- **BaseEngine**: Abstract base class for all TTS engine implementations
- **StreamPlayer**: Handles audio playback via PyAudio

### Supported Engines (20+)

| Engine | Type | Local/Cloud | Description |
|--------|------|-------------|-------------|
| OpenAIEngine | API | Cloud | OpenAI's TTS with 6 premium voices |
| CoquiEngine | Neural | Local | High-quality neural TTS with voice cloning |
| AzureEngine | API | Cloud | Microsoft's TTS with 500k free chars/month |
| ElevenlabsEngine | API | Cloud | Premium voice quality |
| GTTSEngine | API | Cloud | Free Google Translate TTS |
| EdgeEngine | API | Cloud | Microsoft Edge TTS |
| ParlerEngine | Neural | Local | Local neural TTS for high-end GPUs |
| SystemEngine | System | Local | Built-in system TTS (pyttsx3) |
| PiperEngine | Neural | Local | Very fast, runs on Raspberry Pi |
| StyleTTS2Engine | Neural | Local | Expressive, natural speech |
| OrpheusEngine | LLM | Local | Llama-powered TTS with emotion tags |
| KokoroEngine | Neural | Local | Fast local TTS |
| CambEngine | API | Cloud | CAMB AI MARS models, 140+ languages |
| MiniMaxEngine | API | Cloud | MiniMax Cloud TTS, 12 voice presets |
| ZipVoiceEngine | Neural | Local | 123M zero-shot model |
| PocketTTSEngine | Neural | Local | Kyutai Labs 100M model, CPU-optimized |
| NeuTTSEngine | Neural | Local | Voice cloning with 3s reference audio |
| CartesiaEngine | API | Cloud | Fast API-based high-quality synthesis |
| FasterQwenEngine | Neural | Local | Local fast voice cloning |
| OmnivoiceEngine | Neural | Local | Hundreds of languages, high-quality voice cloning |

### Sentence Boundary Detection

- **NLTK Sentence Tokenizer**: For straightforward English text
- **Stanza Sentence Tokenizer**: For multilingual text with higher accuracy

### Key Classes

- `TextToAudioStream`: Main streaming class with configurable parameters (buffer threshold, fragment processing, language, tokenizer)
- `TextStreamer`, `CharStreamer`: Thread-safe generators for character and text streaming

## Tech Stack

- **Python**: >= 3.9, < 3.15
- **Core Dependencies**: stream2sentence, pydub, pyaudio, resampy
- **Engine-specific**: pyttsx3, azure-cognitiveservices-speech, elevenlabs, openai, gtts, coqui_tts, edge-tts, kokoro, camb-sdk, faster-qwen3-tts, omnivoice, typecast-python

## License

MIT License (library), but engine providers may restrict commercial use in their free plans.

## Key Files

- `main.py`: Main entry point
- `RealtimeTTS/text_to_stream.py`: Core TextToAudioStream class
- `RealtimeTTS/stream_player.py`: Audio playback handling
- `RealtimeTTS/engines/base_engine.py`: Abstract base engine
- `RealtimeTTS/engines/coqui_engine.py`: Coqui TTS engine implementation
- `RealtimeTTS/engines/openai_engine.py`: OpenAI TTS engine
- `RealtimeTTS/engines/azure_engine.py`: Azure Speech Services engine
- `RealtimeTTS/engines/elevenlabs_engine.py`: ElevenLabs engine
- `RealtimeTTS/engines/piper_engine.py`: Piper engine
- `setup.py`: Package configuration with extras for selective installation

## API Highlights

### Basic Usage
```python
from RealtimeTTS import TextToAudioStream, SystemEngine
engine = SystemEngine()
stream = TextToAudioStream(engine)
stream.feed("Hello world!")
stream.play_async()
```

### LLM Streaming Integration
```python
stream.feed(text_stream)  # Generator from LLM
stream.play_async()       # Plays as text is generated
```

### Configuration Options
- `fast_sentence_fragment`: Speed optimization for sentence processing
- `buffer_threshold_seconds`: Buffering control for smooth playback
- `on_text_stream_start/stop`, `on_audio_stream_start/stop`: Callback hooks
- `muted`: Disable playback for file-only synthesis
- `output_wavfile`: Save audio to WAV file
