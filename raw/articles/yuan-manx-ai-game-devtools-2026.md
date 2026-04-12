# AI Game DevTools (AI-GDT)

> Repository: https://github.com/Yuan-ManX/ai-game-devtools
> 源文件本地路径: /home/jianghao/ai-game-devtools/README.md
> 获取日期: 2026-04-13

## 基本信息

- **全称**: AI Game DevTools (AI-GDT)
- **主导**: Yuan-ManX（独立开发者，GitHub）
- **定位**: AI 游戏开发工具全栈追踪目录
- **许可**: 未在 README 中注明（需查看仓库 LICENSE）
- **stars**: 未标注

## 概述

AI Game DevTools 是一个追踪 AI 游戏开发全流程最新工具的开源知识库，涵盖从大语言模型、视觉模型、世界模型/Agent、代码生成、图像/纹理/着色器、3D模型、Avatar、动画、视频、音频/语音/音乐到数据分析的 16 个大类，总计约 840+ 项目。

README 描述原文：
> "Here we will keep track of the latest AI Game Development Tools, including LLM, World Model, Agent, Code, Image, Texture, Shader, 3D Model, Animation, Video, Audio, Music, Singing Voice and Analytics."

## 分类结构（共 16 个大类）

### 1. LLM (LLM & Tool) — 约 140 项
代表性项目：
- Agent 框架: AutoGPT, BabyAGI, ChatDev, MetaGPT, XAgent, OpenDevin, SWE-agent
- LLM 模型: Llama 3, Qwen3, DeepSeek-R1, DeepSeek-V3, GLM-4, Gemma, Mistral 7B, Mixtral 8x7B, Kimi K2, MiniMax-01, Janus, s1, SkyThought, Seed-OSS, Orion-14B, DBRX
- Unity 集成: AICommand, ChatGPTForUnity, LLMUnity, UnityChatGPT, SimpleOllamaUnity
- Unreal 集成: UnrealGPT, UE5 Llama LoRA
- 其他工具: AgentGPT, AIOS, LangChain, LlamaIndex, Flowise, Dify, Jan, GPTScript, Cosmos, Claude Code, Codex

### 2. VLM (Visual) — 约 35 项
代表性项目：
- 多模态 LLM: CogVLM2, LLaVA++, LLaVA-OneVision, Qwen-VL, MiniCPM-Llama3-V 2.5, MiniCPM-V 4.0, Cambrian-1, VILA, GLM-V, OneLLM, Lumina-DiMOO
- 视频理解: LongVA, VideoLLaMA 3, Video-MME, VideoAgent
- 视觉生成: Vitron, CogVLM

### 3. Game (World Model & Agent) — 约 85 项
代表性项目：
- 世界模型: GameGen-O, GameNGen, Oasis, Genie 3, HunyuanWorld 1.0, Matrix-Game 2.0, Genesis, Unbounded
- Agent 框架: AutoGen, crewAI, LangGraph, Dify, LlamaIndex, AgentScope, SWE-agent, OpenAgents, OmAgent, XAgent, Co-design Agent
- 社交模拟: AI Town, Cat Town, Generative Agents, LARP, Unbounded, Digital Life Project
- 游戏 SDK: GameAISDK (Tencent), behaviour (Tencent), Moonlander.ai
- Agent 评估: AgentBench, AgentSims
- NPC: Interactive LLM Powered NPCs, gigax

### 4. Code — 约 25 项
代表性项目：
- 代码 LLM: CodeGeeX4, DeepSeek Coder, StarCoder 2, Code Llama, CodeGen, Qwen2.5-Coder, Stable Code 3B, aiXcoder-7B, SoTaNa
- 代码工具: Cursor, Void (开源 Cursor 替代), PandasAI, Bloop
- Unity 代码生成: UnityGen AI, RobloxScripterAI

### 5. Image — 约 110 项
代表性项目：
- 文生图: Stable Diffusion XL, DALL-E 2, Imagen, Midjourney, Flux, SD 3.5, Kolors (快手可图), HunyuanImage-3.0, Qwen-Image, OmniGen2
- 控制网络: ControlNet, SDXL-Lightning, SDXS
- 细分能力: InstantID (身份保持), PuLID, PhotoMaker, IC-Light (光照控制), LayerDiffusion (透明图层), MimicBrush (参考仿制)
- 开源 UI: ComfyUI, Fooocus, Stable Diffusion WebUI, Stable Diffusion WebUI Chinese

### 6. Texture — 约 15 项
代表性项目：CRM, DreamMat, DreamTextures (Blender), InteX, MaterialSeg3D, Paint-it, TexFusion, Text2Tex, X-Mesh, MeshAnything

### 7. Shader — 约 1 项
- AI Shader (keijiro, Unity)

### 8. 3D Model — 约 70 项
代表性项目：
- 图像→3D: One-2-3-45, Zero-1-to-3, Wonder3D, Make-It-3D, SV3D, TripoSR, Unique3D, Direct3D-S2
- 3D GS: DreamGaussian4D, GaussianCube, GALA3D, GaussCtrl
- 腾讯系: Hunyuan3D 1.0/2.0/2.1, HunyuanWorld-Voyager
- 其他: threestudio (统一框架), Infinigen (程序化无限世界), Spline AI, Meshy, Luma AI, Shape-E, Point-E, Edify 3D, Step1X-3D
- Blender 集成: BlenderGPT, BlenderMCP

### 9. Avatar — 约 40 项
代表性项目：
- 数字人: DUIX (硅基数字人 SDK), Ready Player Me, ChatdollKit (Unity)
- 说话头: DreamTalk, GeneFace++, SadTalker, Hallo2, LivePortrait, EchoMimic, MuseV, VLOGGER
- 全身 Avatar: ExAvatar, IntrinsicAvatar, GeneAvatar, Portrait4D, Wild2Avatar
- 腾讯: HunyuanPortrait, HunyuanVideo-Avatar

### 10. Animation — 约 30 项
代表性项目：
- 图生视频（角色动画）: Animate Anyone, MagicAnimate, AnimateDiff, DreaMoving, PIA, Animate-X
- 卡通: ToonCrafter, ToonComposer (腾讯)
- Lip Sync: Wav2Lip, SadTalker-Video-Lip-Sync, MuseTalk
- 动画生成: AnimateLCM, FreeInit, ID-Animator
- 动漫: Index-AniSora (B站出品，支持多种动漫风格)

### 11. Video — 约 135 项
代表性项目：
- 视频生成: Sora, Gen-2, HunyuanVideo, Wan2.1/Wan2.2, CogVideoX, Open-Sora, Mochi 1, Pika Labs, Runway Gen-3, Lumiere, Make-A-Video, Imagen Video
- DiT 架构: LTX-Video (首个实时 DiT 视频生成), Tora, TATS
- 视频编辑: Text2Video-Zero, StableVideo, VideoComposer
- 中国团队: Step-Video-T2V (阶跃), SkyReels-V1, CogVideoX (THUDM), Wan (字节)
- 开源替代: Zeroscope, Morph Studio

### 12. Audio — 约 35 项
代表性项目：
- 音频生成: AudioLDM 2, Make-An-Audio, Audiobox, Amphion, SoundStorm, Stable Audio
- Foley 音效: FoleyCrafter, HunyuanVideo-Foley, SyncFusion, MMAudio
- 音频理解: MiDashengLM, SEE-2-SOUND, ThinkSound

### 13. Music — 约 25 项
代表性项目：
- 音乐生成: MusicLM (Google), MusicGen (Meta), Jukebox (OpenAI), AIVA, Mubert, Boomy, YuE (类 Suno 开源版), FluxMusic, Diff-BGM
- 辅助: Magenta, Riffusion App, GPTAbleton

### 14. Singing Voice — 约 4 项
- DiffSinger, so-vits-svc, Retrieval-based-Voice-Conversion-WebUI, VI-SVS

### 15. Speech — 约 55 项
代表性项目：
- TTS: ChatTTS, CosyVoice (阿里), GPT-SoVITS, VALL-E, XTTS, StyleTTS 2, MeloTTS, EmotiVoice, GLM-4-Voice
- 语音识别: Whisper, SenseVoice (阿里)
- 语音对话: Mini-Omni, Step-Audio, Step-Audio 2
- 语音克隆: OpenVoice, One-Shot-Voice-Cloning, VALL-E X
- Unity 集成: UnityNeuroSpeech, speech-to-text-gpt3-unity

### 16. Analytics — 约 1 项
- Ludo.ai（游戏研究与设计助手）

## 关键洞察

1. **腾讯占主导地位**: 在 Game/3D/Avatar/Video/Audio 多个领域均有强力开源项目（Hunyuan 系列），是本仓库中单一机构出现频率最高者。

2. **中国 AI 力量全面崛起**: THUDM (GLM/CogVLM/CodeGeeX)、OpenBMB (MiniCPM)、阿里 (Qwen/通义)、字节 (Seed-OSS)、快手 (Kolors/可图)、百度（BriVL）、清华（InternLM）均有大量项目入列。

3. **游戏引擎集成仍薄弱**: Unity/Unreal 集成项目占全库不足 3%，且多为概念验证阶段，是明显缺口。

4. **Avatar 和 Video 是当前最热赛道**: 各约 40+ 和 135+ 项目，竞争激烈，HunyuanVideo/Avatar 系列、Wan2.1、Hallo2 为当前领先开源方案。

5. **Code 和 Shader 类别严重不足**: Code 仅 25 项（多为通用代码模型，游戏专用极少）；Shader 仅 1 项，与游戏开发需求严重不匹配。

6. **开源协议多为宽松许可**: MIT/Apache 2.0 为主，商业友好。

## 仓库元数据

- 仓库名: ai-game-devtools
- 组织: Yuan-ManX（独立开发者）
- README 行数: 953 行（含所有分类表格）
- README 估算总条目: ~840 个项目（16 个大类）
