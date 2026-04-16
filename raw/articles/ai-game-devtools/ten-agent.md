# TEN Agent — Raw Source

**Source:** https://github.com/TEN-framework/TEN-Agent (redirects to TEN-framework/ten-framework)
**Extracted:** 2026-04-16 (web extract; GitHub/gitcode/gitee clone all failed)

---

## README Summary

TEN is an open-source framework for building **real-time multimodal conversational AI agents** and voice agents. It provides a modular, extensible architecture for building low-latency, production-ready AI applications.

### Repository Stats
- Stars: 10.4k
- Forks: 1.2k
- Releases: 113 (latest v0.11.62, Mar 14 2026)
- Commits: 1,976

### Languages
Python 31.7% | C 22.6% | C++ 15.6% | TypeScript 13.1% | Rust 11.7% | Go 3.1%

### TEN Ecosystem
| Component | Purpose |
|:---|:---|
| TEN Framework | Core open-source engine for conversational AI agents |
| TEN VAD | Low-latency, lightweight streaming Voice Activity Detector |
| TEN Turn Detection | Enables full-duplex, natural dialogue flow |
| TEN Agent Examples | Ready-to-use templates & production use cases |
| TEN Portal | Official documentation, blog, and community hub |

### Featured Agent Examples
| Example | Key Features |
|:---|:---|
| Multi-Purpose Voice Assistant | Low-latency, supports RTC & WebSocket. Extensible with Memory, VAD, Turn Detection |
| Doodler | Converts spoken/typed prompts into real-time hand-drawn sketches |
| Speaker Diarization | Real-time speaker detection & labeling |
| Lip Sync Avatars | Supports Live2D (Kei w/ MotionSync), Trulience, HeyGen, Tavus |
| SIP Call | AI-powered telephony via SIP/Twilio integration |
| Transcription | Real-time audio-to-text conversion |
| ESP32-S3 Korvo V3 | Hardware integration for LLM-powered voice on Espressif dev boards |

### Quick Start
- Prerequisites: Agora (App ID + Certificate), OpenAI, Deepgram (ASR), ElevenLabs (TTS)
- Tools: Docker / Docker Compose, Node.js v18 (LTS)
- Build: `task build` inside Docker container
- Access: localhost:49483 (Agent UI/TMAN Designer), localhost:3000 (Web Server)

### Deployment
- Docker: Build release image, run on any container platform
- Split Cloud: Frontend on Vercel/Netlify + Backend on Fly.io/Render/ECS
- GitHub Codespaces: Fully supported, no local Docker required

### Licensing
- Core Framework: Apache License 2.0 with additional restrictions
- /packages Directory: Standard Apache License 2.0
- Third-Party: Documented in /third_party folder

### Maintainers
- @elliotchen200 (X/Twitter)
- @cyfyifanchen (GitHub)

### Community
- Discord, X/Twitter, LinkedIn, Hugging Face, WeChat Group
- AI-Powered Q&A: DeepWiki, ReadmeX
