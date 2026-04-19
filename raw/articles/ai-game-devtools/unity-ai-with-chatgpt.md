# UnityAIWithChatGPT - Raw Source

**Source:** https://github.com/haili1234/UnityAIWithChatGPT
**Extracted:** 2026-04-19
**Method:** web_extract (GitHub clone timeout, gitcode 403, gitee unavailable)

## Project Overview

基于Unity，实现ChatGPT+UnityChan语音交互展示。

(Based on Unity, implementing ChatGPT + UnityChan voice interaction display.)

## Repository Structure

```
UnityAIWithChatGPT/
├── Assets/
│   ├── Art/                    # 3D models, textures, UnityChan character assets
│   ├── Editor Default Resources/
│   ├── Plugins/                # Third-party Unity plugins
│   ├── Resources/              # Unity Resources folder (runtime-loaded assets)
│   ├── Scenes/                 # Unity scene files
│   ├── Scripts/                # C# scripts (ChatGPT API integration, voice handling)
│   ├── ThirdPlugins/           # Additional third-party plugins
│   └── _generatedAudio/        # TTS-generated audio output files
├── Packages/                   # Unity Package Manager config
├── ProjectSettings/            # Unity project settings
├── Recordings/                 # Demo screenshots and video recordings
│   ├── show.png               # Screenshot of the running demo
│   └── movie_002.mp4          # Demo video
├── zsolve/                     # CMake-based cross-platform build system
│   ├── cmake/
│   ├── gsl/
│   ├── CMakeLists.txt
│   ├── generate_android.sh
│   ├── generate_ios.sh
│   ├── generate_osx.sh
│   └── generate_win.bat
└── README.md
```

## Key Details

- **Unity Project:** Standard Unity project structure with Assets, Packages, ProjectSettings
- **ChatGPT Integration:** C# scripts in Assets/Scripts/ handle ChatGPT API communication
- **UnityChan Character:** Uses the Unity-chan! 3D character model (from Assets/Art/)
- **Voice Interaction:** TTS (Text-to-Speech) output saved to Assets/_generatedAudio/
- **Cross-Platform Build:** zsolve/ contains CMake build scripts for Android, iOS, macOS, Windows
- **Third-Party Plugins:** Uses multiple plugins (Plugins/ and ThirdPlugins/) for extended functionality

## Stats

- **Stars:** 99
- **Forks:** 14
- **Commits:** 23
- **Language:** C# (Unity)

## License

Not explicitly stated in README.
