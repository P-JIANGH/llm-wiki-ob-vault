---
title: MoneyPrinterTurbo — AI 全自动短视频生成工具
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [tool, ai, video, llm, open-source, automation, python]
sources: [raw/articles/ai-game-devtools/money-printer-turbo.md]
---

# MoneyPrinterTurbo

## 概述

[harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) — 全自动短视频生成工具，只需提供视频主题或关键词，即可自动生成文案、素材、字幕、背景音乐，最终合成高清短视频（支持竖屏 9:16 和横屏 16:9）。

## 关键事实

- **作者**: harry0703
- **许可证**: MIT
- **架构**: MVC 分层，FastAPI + Streamlit WebUI
- **语言**: Python 3.11+
- **部署方式**: Docker / uv sync / Windows 一键启动包 / Google Colab
- **GPU 要求**: 非必需（云端 LLM/TTS 场景），本地 Whisper 模式需要 GPU
- **最低配置**: 4 CPU / 4GB RAM

## 技术特点

### 核心 7 步流水线

1. **文案生成** → 多 LLM 提供商适配（15+ 种）
2. **搜索词提取** → LLM 从脚本提取素材关键词
3. **语音合成** → Azure Edge TTS（免费）/ Azure / Gemini / SiliconFlow
4. **字幕生成** → Edge 快速模式 或 Whisper 精确模式
5. **素材获取** → Pexels API 下载 / 本地素材
6. **视频拼接** → MoviePy 处理 + FFmpeg concat
7. **最终合成** → 字幕叠加 + BGM + 编码输出

### LLM 适配层

统一 `_generate_response()` 接口，支持 OpenAI 兼容 API（OpenAI/Moonshot/Ollama/DeepSeek/MiniMax/ModelScope/Azure）、专属 SDK（Qwen DashScope、Gemini、百度文心）、直接 HTTP（Cloudflare AI、Pollinations）和 gpt4free 代理。

### 视频处理

- MoviePy 负责裁剪/缩放/转场（淡入/淡出/滑入/滑出/随机）
- FFmpeg concat 一次串联编码，避免 MoviePy 反复重编码
- `close_clip()` 逐段释放资源，防止 OOM
- 素材不足时自动循环补帧

## 与其他工具的差异

| 对比维度 | MoneyPrinterTurbo | [[ai-game-devtools/diffsynth-studio]] | [[ai-game-devtools/comfyui]] |
|---------|-------------------|-------------------------------------|---------------------------|
| 定位 | 端到端短视频生成 | 扩散模型推理/训练引擎 | 模块化视觉 AI 引擎 |
| 输入 | 文本主题/关键词 | 提示词+控制图 | 节点图 |
| 视频素材来源 | Pexels API / 本地 | 模型生成 | 模型生成 |
| TTS | ✅ 内置多种 | ❌ | ❌ |
| 字幕 | ✅ Edge/Whisper | ❌ | 需插件 |
| 部署复杂度 | 低（一键包/Docker） | 中 | 中 |

## 相关项目

- [[ai-game-devtools/dify]] — 同类 LLM 应用开发平台，但偏通用 Agent 而非视频生成
- [[ai-game-devtools/text-generation-webui]] — 提供 LLM 推理后端，MoneyPrinterTurbo 可对接
- [[ai-game-devtools/diffsynth-studio]] — ModelScope 扩散模型引擎，支持视频生成

## 许可证

MIT License

## 来源

- GitHub: https://github.com/harry0703/MoneyPrinterTurbo
- 原始分析: raw/articles/ai-game-devtools/money-printer-turbo.md
