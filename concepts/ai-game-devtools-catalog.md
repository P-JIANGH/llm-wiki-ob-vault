---
title: AI Game DevTools Catalog (Yuan-ManX)
created: 2026-04-13
updated: 2026-04-13
type: concept
tags: [ai-game, tool-catalog, multimodal, llm, world-model, code-gen, image-gen, video-gen, audio-gen, avatar, animation]
sources: [raw/articles/yuan-manx-ai-game-devtools-2026.md]
---

# AI Game DevTools Catalog (Yuan-ManX)

> AI 游戏开发工具全栈追踪知识库，约 840+ 项目覆盖 16 个大类，由独立开发者 Yuan-ManX 维护。

## 概述

Yuan-ManX/ai-game-devtools 是由独立开发者维护的 AI 游戏开发工具知识库，系统性追踪从 LLM、视觉模型、世界模型/Agent、代码生成、图像/纹理/着色器、3D模型、Avatar、动画、视频、音频/语音/音乐到数据分析的 16 个分类，总计约 840+ 项目。README 原文：

> "Here we will keep track of the latest AI Game Development Tools, including LLM, World Model, Agent, Code, Image, Texture, Shader, 3D Model, Animation, Video, Audio, Music, Singing Voice and Analytics."

**规模**: ~840 个项目，953 行 README，16 个分类，仓库暂无明确 License 标注。

## 分类体系

| 类别 | 规模 | 代表项目 |
|------|------|---------|
| [[#LLM]] | ~140 项 | DeepSeek-R1, Qwen3, Llama 3, GLM-4, Cosmos |
| [[#VLM]] | ~35 项 | CogVLM2, LLaVA-OneVision, Qwen-VL, Cambrian-1 |
| [[#Game]] | ~85 项 | GameGen-O, Oasis, Genie 3, AutoGen, crewAI |
| [[#Code]] | ~25 项 | CodeGeeX4, DeepSeek Coder, StarCoder 2, Cursor |
| [[#Image]] | ~110 项 | Stable Diffusion XL, Flux, Kolors, HunyuanImage-3.0, ControlNet, ComfyUI |
| [[#Texture]] | ~15 项 | CRM, DreamMat, DreamTextures (Blender) |
| [[#Shader]] | 1 项 | AI Shader (Unity) |
| [[#3D Model]] | ~70 项 | One-2-3-45, TripoSR, Hunyuan3D-2.0, threestudio |
| [[#Avatar]] | ~40 项 | DUIX, DreamTalk, LivePortrait, Hallo2, MuseV |
| [[#Animation]] | ~30 项 | Animate Anyone, MagicAnimate, AnimateDiff, Wav2Lip |
| [[#Video]] | ~135 项 | Sora, Wan2.1, HunyuanVideo, CogVideoX, LTX-Video, Mochi 1 |
| [[#Audio]] | ~35 项 | AudioLDM 2, Make-An-Audio, FoleyCrafter |
| [[#Music]] | ~25 项 | MusicGen, YuE (类 Suno), Jukebox, AIVA |
| [[#Singing Voice]] | 4 项 | DiffSinger, so-vits-svc |
| [[#Speech]] | ~55 项 | ChatTTS, CosyVoice, Whisper, GPT-SoVITS, VALL-E |
| [[#Analytics]] | 1 项 | Ludo.ai |

## 核心洞察

### 1. 中国 AI 全面覆盖
THUDM（GLM/CogVLM/CodeGeeX）、OpenBMB（MiniCPM）、阿里（Qwen/通义）、字节（Seed-OSS/Hunyuan）、快手（Kolors）、百度（BriVL）、清华（InternLM）均大量入列。腾讯在 Game/3D/Avatar/Video/Audio 五个领域同时拥有强力开源项目，是单一机构出现频率最高者。

### 2. 视频生成最热赛道（~135 项）
竞争极为激烈：Sora、Wan2.1（字节）、HunyuanVideo（腾讯）、CogVideoX（清华）、LTX-Video（首个实时 DiT）、Mochi 1（Genmo）分庭抗礼。Index-AniSora（B站）专注文本驱动的动漫视频生成，差异化明显。

### 3. Avatar 赛道成熟度高（~40 项）
说话头技术已相对成熟（Hallo2、LivePortrait、EchoMimic）。全身 Avatar 是新兴方向（ExAvatar、IntrinsicAvatar、GeneAvatar）。腾讯 HunyuanVideo-Avatar 支持多人场景。

### 4. 游戏引擎集成严重不足
Unity/Unreal/Blender 集成项目占全库不足 3%，且多为 PoC 阶段。AI Shader 仅 1 项。与实际游戏开发需求严重不匹配。

### 5. 代码生成偏通用（~25 项）
CodeGeeX4、DeepSeek Coder、StarCoder 2 等均为通用代码模型，缺乏游戏脚本/着色器/引擎专用代码生成工具。

### 6. Shader 极度匮乏
仅 1 项（AI Shader for Unity），是整个知识库最大缺口之一。

## 与 [[openmaic]] 的关系

**完全没有关系。** 这是两个完全不同的仓库：

| | [[ai-game-devtools-catalog]] | [[openmaic]] |
|---|---|---|
| 仓库 | Yuan-ManX/ai-game-devtools | THU-MAIC/OpenMAIC |
| 性质 | AI 游戏开发工具目录（静态列表） | 多智能体互动教室平台（动态系统） |
| 功能 | 追踪 840+ 工具项目 | AI 生成课程/Quiz/讨论/PBL |
| 维护者 | 独立开发者 Yuan-ManX | 清华大学多智能体实验室 |

## 相关条目

- [[autoresearch]] — Karpathy 的自主研究框架
- [[Eino]] — 字节跳动 LLM 应用框架
- [[multi-agent-interactive-classroom]] — 多 Agent 教学场景

## 来源

- 原始 README: `/home/jianghao/ai-game-devtools/README.md`
- 原始 source: [[raw/articles/yuan-manx-ai-game-devtools-2026.md]]
