# MoneyPrinterTurbo - AI 自动短视频生成工具

> Source: https://github.com/harry0703/MoneyPrinterTurbo
> Analyzed: 2026-04-20

## 项目概述

MoneyPrinterTurbo 是一个全自动短视频生成工具，只需提供一个视频主题或关键词，即可自动生成视频文案、素材、字幕、背景音乐，最终合成高清短视频。支持竖屏 9:16 (1080x1920) 和横屏 16:9 (1920x1080) 两种尺寸。

## 核心功能

- **AI 文案生成**: 支持 15+ LLM 提供商（OpenAI、Moonshot、Azure、gpt4free、通义千问、Google Gemini、Ollama、DeepSeek、MiniMax、文心一言、Pollinations、ModelScope 等）
- **视频素材获取**: 从 Pexels API 获取高清无版权素材，也支持本地素材
- **语音合成 (TTS)**: Azure Edge TTS（免费）、Azure Neural TTS、SiliconFlow CosyVoice2、Gemini TTS
- **字幕生成**: Edge 模式（快速）和 Whisper 模式（精确），支持字体/颜色/大小/描边自定义
- **视频合成**: MoviePy + FFmpeg，支持淡入淡出/滑动等转场效果
- **批量生成**: 一次生成多个视频，选择最满意的结果
- **社交媒体发布**: 可选自动发布到 TikTok/Instagram

## 技术架构

### MVC 分层架构

```
app/
├── asgi.py              # FastAPI 应用入口
├── router.py            # 路由注册
├── config/              # 配置管理 (TOML)
├── models/              # 数据模型与常量
│   ├── schema.py        # Pydantic 请求/响应 Schema
│   ├── const.py         # 任务状态常量
│   └── exception.py     # 自定义异常
├── controllers/         # API 控制器
│   ├── v1/              # API v1 端点
│   │   ├── llm.py       # 文案/术语生成 API
│   │   └── video.py     # 视频任务管理 API
│   └── manager/         # 任务队列管理
│       ├── memory_manager.py  # 内存队列
│       └── redis_manager.py   # Redis 队列
├── services/            # 核心业务服务
│   ├── task.py          # 任务编排（7 步流水线）
│   ├── llm.py           # 多 LLM 提供商适配层
│   ├── material.py      # 视频素材获取（Pexels/本地）
│   ├── video.py         # 视频合成与渲染
│   ├── voice.py         # TTS 语音合成
│   ├── subtitle.py      # 字幕生成（Edge/Whisper）
│   ├── state.py         # 任务状态管理
│   └── upload_post.py   # 社交媒体自动发布
├── utils/               # 工具函数
└── webui/               # Streamlit Web 界面
    └── Main.py          # WebUI 入口
```

### 核心流水线 (task.py start())

1. **生成文案** → LLM 根据主题生成视频脚本
2. **生成搜索词** → LLM 根据脚本提取 5 个素材搜索关键词
3. **生成音频** → TTS 将文案转为语音（Azure Edge/Azure/Gemini/SiliconFlow）
4. **生成字幕** → Edge 快速模式 或 Whisper 精确模式
5. **获取素材** → Pexels API 下载视频素材 或 使用本地素材
6. **拼接视频** → MoviePy 裁剪/缩放/转场 + FFmpeg concat 串联
7. **最终合成** → 叠加字幕 + 背景音乐 + 编码输出

### 视频处理细节

- **自动裁剪**: 长视频按 max_clip_duration 分段
- **智能缩放**: 保持宽高比 + 黑边填充
- **转场效果**: 淡入/淡出/滑入/滑出/随机
- **循环补帧**: 素材时长不足时自动循环
- **内存管理**: close_clip() 逐段释放 MoviePy 资源，避免 OOM
- **图片修复**: 自动清理损坏 EXIF 元数据的图片

### LLM 适配层 (llm.py)

支持 15+ 提供商，统一 `_generate_response()` 接口：
- OpenAI 兼容 API: OpenAI、Moonshot、Ollama、DeepSeek、MiniMax、ModelScope、Azure
- 专属 SDK: Qwen (DashScope)、Gemini (google-generativeai)、Ernie (百度)
- 直接 HTTP: Cloudflare AI、Pollinations
- 开源代理: gpt4free

所有提供商共享 `_normalize_text_response()` 和 `_extract_chat_completion_text()` 进行输出归一化。

### TTS 支持

- **Azure Edge TTS**: 免费，400+ 语言/方言声音，无需 API Key
- **Azure Neural TTS**: 需要 API Key，更自然
- **SiliconFlow CosyVoice2**: 8 种声音，需要 API Key
- **Gemini TTS**: 15 种声音，需要 API Key
- **自定义音频**: 支持直接传入本地音频文件

## 关键依赖

| 依赖 | 用途 |
|------|------|
| FastAPI + Uvicorn | API 服务 |
| Streamlit | Web UI |
| MoviePy | 视频剪辑/合成/字幕渲染 |
| FFmpeg | 视频串联编码 |
| edge-tts | 免费 TTS |
| OpenAI SDK | LLM 调用 |
| PIL (Pillow) | 字体/图片处理 |
| ImageMagick | 字幕渲染后端 |
| dashscope | 通义千问 SDK |
| google-generativeai | Gemini SDK |

## 许可证

MIT License

## 相关链接

- GitHub: https://github.com/harry0703/MoneyPrinterTurbo
- Google Colab Demo: https://colab.research.google.com/github/harry0703/MoneyPrinterTurbo/blob/main/docs/MoneyPrinterTurbo.ipynb
- 在线服务 (录咖): https://reccloud.cn / https://reccloud.com
- 赞助商: 佐糖 https://picwish.cn
