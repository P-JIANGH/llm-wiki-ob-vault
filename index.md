# Wiki Index

> Content catalog. Every wiki page listed under its type with one-line summary.
> Read this first to find relevant pages for any query.
> Last updated: 2026-04-17 | Total pages: 492 | Note: Open Source Games section is partial (65/153 games indexed; all 153 games exist in open-source-game/ directory)

## AI / LLM / Agent

| [[llm-integration]] — 9 个 LLM Provider 统一接入（OpenAI/Claude/Gemini/DeepSeek 等） |
| [[mempalace]] — AI 长期记忆系统，ChromaDB verbatim 存储 + 4 层记忆栈，LongMemEval 96.6%（无需 API） |
| [[voxcpm-local-deployment]] — VoxCPM 2 本地部署配置：Python/CUDA/GPU 显存要求及快速运行示例 |
| [[multi-agent-ai-simulation]] — 多智能体 AI 通用概念：记忆/任务/感知/决策 |
| [[multi-agent-ai-game-impl]] — Microverse 实现：感知→决策→记忆→任务→对话完整链路 |
| [[persistent-memory-system]] — AI 角色长期记忆持久化（ChatHistory + 时间戳） |
| [[stanford-generative-agents]] — Stanford Generative Agents（AI Town）Memory/Reflection/Planning |
| [[agentgpt]] — reworkd 开源浏览器端自主 AI Agent 平台：Next.js / Docker 部署，1.5k+ commits，12 releases，支持中/英/匈牙利语 |
| [[babyagi]] — yoheinakajima 实验性自构建 Agent 框架：functionz 图结构函数注册表（依赖/触发器/密钥管理），SQLAlchemy + Flask Dashboard，MIT，已存档 |
| [[llocal-search]] — nilsherzig 本地 AI 搜索 Agent：Ollama + langchaingo + SearXNG + ChromaDB，完全本地运行无需 API Key，MIT |
|| [[ai-game-devtools/01-project]] — OpenInterpreter 开源语音接口设备：Open Interpreter 驱动自然语言控制电脑，LiveKit 实时语音 + Deepgram STT + ElevenLabs TTS，支持 ESP32/桌面/移动端，AGPL |
| [[open-deep-research]] — dzhng/Duet 深度研究 Agent：Firecrawl 搜索爬取 + o3-mini/R1 模型，递归深度搜索 + 并发处理，<500 LoC 极简实现，MIT |
|| [[ai-game-devtools/logic-games-solver]] — fabridigua AI 解数独/Stars/Skyscrapers 逻辑游戏：OpenCV 透视变换 + Keras CNN（MNIST）识别 + CSP 回溯求解，Python/TensorFlow |
| [[aios]] — agiresearch AI Agent 操作系统：LLM 内核抽象层（调度/记忆/存储/工具），COLM 2025 论文，支持 OpenAGI/AutoGen/MetaGPT，Remote Kernel 模式支持边缘设备 |
| [[chatdev]] — OpenBMB 零代码多智能体平台：YAML 配置驱动工作流（游戏开发/3D生成/数据分析/深度研究），Python SDK + Vue3 前端，NeurIPS 2025，Puppeteer-style RL 编排 |
| [[chatgpt-api-unity]] — mochi-neko Unity ChatGPT API 客户端：IChatMemory 多策略 session 管理 / UniTask 异步 / Relent resilient HTTP / Function Calling / Streaming，MIT |
| [[chatgptforunity]] — sunsvip Unity UPM 包：编辑器内 ChatGPT 对话窗口 / 代码块提取保存 / 聊天历史持久化 / gpt-3.5-turbo，MIT |
| [[ai-game-devtools/unity-chatgpt]] — dilmerv Unity ChatGPT 实验项目：自然语言提示让 AI 动态生成 Unity C# 代码创建立方体、操控角色行为，Unity 2021.3+，MIT |
| [[autoresearch]] — Karpathy 自主 LLM 研究框架：agent 修改 train.py → 5分钟实验 → val_bpb 评估 → keep/discard 循环，MIT，70.3k stars |
| [[chatrwkv]] — BlinkDL RWKV-7 100% RNN LLM：Time Mixing + Channel Mixing，O(n) 推理复杂度，3GB VRAM 跑 14B 模型，HuggingFace 权重，MIT |
|| [[stanford-alpaca]] — Stanford 指令微调 LLaMA 模型（7B/13B），52K Self-Instruct 数据训练，< $500 数据生成成本，CC BY-NC 4.0，2023 年开源 LLM 里程碑 |
|| [[chinese-llama-alpaca-3]] — ymcui 中文 Llama-3 第三期：8B 基座+Instruct-v3（Elo 1627），原版 128K 词表复用，GQA+LoRA，HuggingFace/ModelScope |
|| [[openmaic]] — THU-MAIC 开源多智能体互动教室平台：两阶段课程生成（Outline→Scene）、LangGraph Director Graph 编排、AI Provider 抽象层（1300+行支持 9+ 提供商）、PBL Agentic Loop + MCP Tools、PPTX/HTML 导出、MinerU PDF 解析，v0.1.0，AGPL-3.0 |
|| [[coze-studio]] — Coze/字节跳动一站式 AI Agent 开发平台：可视化 Agent/Workflow 构建，微服务+DDD，Eino 运行时，FlowGram 编辑器，Apache-2.0，20.3k stars |
| [[claude-code-game-studio-architecture]] — 49 Agent 层级结构、Model Tier 分配（Haiku/Sonnet/Opus）、五大协调规则、Subagents vs Agent Teams |
| [[claude-code-game-studio-collaboration-protocol]] — Question → Options → Decision → Draft → Approval 工作流、文件写入协议、决策 UI 模式 |
|| [[hermes-agent]] — 生产级 AI Agent 框架：工具注册中心 / 持久 Async Loop / 并行执行 / Context Compression / 13+ 消息平台网关 |
|| [[gstack]] — Garry Tan 的 AI 软件工厂：23 个 Skills 把 Claude Code 变虚拟工程团队（CEO/设计师/QA/发布工程师），60天 600K+ LOC，71.3K stars |
|| [[ai-game-devtools/qwen-agent]] — 阿里 Qwen 团队 LLM Agent 框架：Qwen Chat 后端、工具调用/RAG/代码解释器/MCP/多智能体群聊、Docker 沙箱、1M+ token 超长文档 QA，Apache 2.0 |
|| [[ai-game-devtools/swe-agent]] — Princeton+Stanford 开源 Agent Computer Interface：LLM 自主修复 GitHub issue、EnIGMA 网络安全模式、YAML 配置驱动、SWE-bench SoTA，NeurIPS 2024，MIT |
|| [[ai-game-devtools/taskgen]] — 基于任务的 Agent 框架：StrictJSON 结构化输出、自动任务分解、分层 Agent、函数 RAG、Shared Variables 多模态共享，MIT |

## Concepts

||| [[registry-pattern-tool-discovery]] — 中心注册表模式：ToolRegistry 单例集中注册 + check_fn 环境检查，hermes-agent 核心架构 |
|| [[context-compression]] — hermes-agent 结构化摘要压缩：Prune+Protect Head+Protect Tail+Summarize Middle 四阶段，节省 context |
| [[tool-registry-pattern]] — 中心注册表工具自注册模式：check_fn 环境门控、循环导入安全、工具集分组 |
| [[agent-loop-architecture]] — AI Agent 循环架构：持久 Async Loop、并行工具执行、迭代预算控制 |
| [[openai-tool-calling]] — OpenAI Tool Calling 协议解析：参数类型强制、工具对完整性、多 Provider 格式适配 |

## Game Projects & Studios

| [[firered-openstoryline]] — FireRedTeam 开源 AI 视频创作工具，LangChain Agent + MCP + 15+ 视频节点管道，对话式视频剪辑 |
| [[ksanadock]] — 游戏开发商，时空码头 |
| [[microverse-project]] — Godot 4 多智能体 AI 社交模拟沙盒游戏 |
| [[microverse-code-structure]] — Microverse 代码结构 / 模块解析 |
| [[openbmb]] — 北京人工智能研究院 & 面壁智能，MiniCPM / VoxCPM 等模型背后的研究组织 |
|| [[langflow]] — logspace AI 可视化 LLM 工作流构建器：拖放节点图 + FastAPI + LangChain，支持 50+ LLM/向量库，MIT |
|| [[claude-code-game-studios]] — Claude Code Game Studios：49 Agent / 72 Skill 游戏开发工作流，MIT 开源 |
|| [[voxcpm]] — OpenBMB 开源语音合成系统，Tokenizer-Free 架构支持 30 语言 + 9 种中文方言 |
|| [[ai-game-devtools/biomes]] — ill-inc 开源 Web 沙盒 MMORPG：Next.js + Three.js + WebAssembly (C++ voxeloo)，React 资源系统桥接 Three.js 状态，12+ 微服务架构（sync/logic/gaia 等），ECS+Bikkie 数据层，MIT |

## Game Dev

| [[godot-4]] — Godot 4 引擎：GDScript、Jolt Physics、XR、版本历史 |
| [[gdscript-patterns]] — GDScript 10 种设计模式（单例/Signal/Lambda/寻路/物理检测） |
| [[godot-animation-system]] — AnimatedSprite2D 帧动画 + CharacterController 状态机 |
| [[microverse-character-system]] — 8 角色人格/职位/说话风格（CharacterPersonality） |
| [[microverse-dialog-system]] — DialogService/ConversationManager/BackgroundStoryManager |
| [[microverse-save-system]] — GameSaveManager JSON 存档（角色位置/任务/AI状态） |

## AI Game DevTools

| [[ai-game-devtools-catalog]] — Yuan-ManX 维护的 AI 游戏开发工具目录：840+ 项目覆盖16大类 |
| [[ai-game-devtools/dify]] — LangGenius 开源 LLM 应用开发平台：可视化 Workflow + RAG Pipeline + Agent(Function Calling/ReAct) + 100+ 模型接入 + LLMOps，Docker 一键部署，Dify Open Source License |
|| [[ai-game-devtools/langchain]] — langchain-ai LLM 应用开发框架：Chain/Agent/Memory/Tool/Prompt 抽象 + LangGraph 编排，monorepo 结构（core/v1/partners），MIT |
|| [[ai-game-devtools/langgraph-studio]] — LangChain Agent IDE：可视化图结构调试 + Thread 状态编辑 + Interrupt 断点控制 + 热重载，Desktop/Web 双模式，需 LangSmith 认证 |
|| [[ai-game-devtools/llama-index]] — run-llama LLM 数据框架：300+集成/RAG管道/LlamaParse文档处理/多向量存储/图RAG，5行代码入门，MIT |
|| [[ai-game-devtools/llama2-webui]] — Llama 2 本地 Web UI + PyPI 封装包，支持 llama.cpp/transformers/GPTQ 多后端，MIT |
| [[ai-game-devtools/text-generation-webui]] — oobabooga Gradio LLM Web UI：5后端(llama.cpp/ExLlamaV3/TensorRT-LLM)、多模态/Tool Calling/LoRA训练/图像生成，OpenAI兼容API，MIT |
| [[ai-game-devtools/ai-writer]] — BlinkDL AI小说续写工具：RWKV 模型（12层/768维）+ 8849字词表，ctx_len=512，网文专精，已过时推荐 [[RWKV-Runner]]，Apache 2.0 |
| [[ai-game-devtools/notebook-ai]] — indentlabs 写作/跑团世界观构建平台：32+内容类型（角色/地点/物品/魔法等）+关系图谱+隐私控制，Ruby on Rails 6.1 + React |
| [[ai-game-devtools/novel]] — steven-tey Notion风格 WYSIWYG 编辑器 + OpenAI 自动补全，Tiptap 2 + Vercel AI SDK，多框架支持（Svelte/Vue/VSCode），Apache-2.0 |
| [[ai-game-devtools/jaaz]] — 11cafe 开源多模态画布创意 Agent：无限画布 + AI Agent 生成图片/视频（GPT-4o/Midjourney/Flux/ComfyUI），LangGraph 编排 + tldraw 画布，隐私优先支持本地部署，AGPL |
|| [[ai-game-devtools/ragas]] — VibrantLabs LLM 应用评估框架：RAG/LLM 客观指标 + 测试数据自动生成 + LangChain/LlamaIndex 集成 + 生产反馈循环，Apache-2.0 |
|| [[ai-game-devtools/rpbench-auto]] — boson-ai LLM 角色扮演自动化评测流水线：ArenaHard 范式 pairwise 对比 + 裁判 LLM 打分 + Elo 排名（MLE/Online/WHR），覆盖 17+ 模型，Apache 2.0 |
| [[ai-game-devtools/unreal-engine-5-llama-lora]] — bublint 用 UE 5.1 文档微调 Llama-7b LoRA：8bit 加载 + text-generation-webui 训练，8小时 3090Ti 完成，构建本地 UE5 问答助手，MIT |
|| [[ai-game-devtools/unrealgpt]] — TREE Industries UE5.6 AI Agent 插件：编辑器内 Chat 界面 + GPT Responses API + Python 脚本执行 + 场景查询 + Replicate 内容生成，Apache 2.0 |
|| [[ai-game-devtools/xagent]] — OpenBMB 开源 LLM 自主 Agent：Dispatcher+Planner+Actor 三层架构 + Docker 沙箱安全隔离，50+ 真实任务评测超越 AutoGPT，Apache 2.0 |
| [[ai-game-devtools/agent-group-chat]] — MikeGu721/复旦 多智能体群聊模拟：竞争→合作→反射四阶段循环，LLM驱动角色对话，n-gram熵评估涌现行为，arXiv 2403.13433 |
|| [[ai-game-devtools/agentbench]] — THUDM LLM Agent 评测基准：8种环境（OS/DB/KG/游戏/推理等），评估 LLM 作为自主 Agent 的规划与工具使用能力，arXiv 2308.03688，MIT |
|| [[ai-game-devtools/ioa]] — OpenBMB 多智能体协作框架：AutoGPT/Open Interpreter异构 Agent 自主组队 + WebSocket 实时通信 + Milvus 向量注册，Apache 2.0 |
|| [[ai-game-devtools/kwaiagents]] — 快手 KwaiKEG LLM Agent 系统：KAgentSys-Lite + KAgentLMs(Meta-agent tuning 微调 Qwen/Baichuan) + KAgentInstruct(200K指令) + KAgentBench(3K评测)，KAgentBench 5维度评测（规划/工具使用/反思/总结/画像），Apache 2.0 |
|| [[ai-game-devtools/agent-laboratory]] — SamuelSchmidgall/Johns Hopkins LLM 自主研究 Agent：4阶段流水线（文献综述→实验→报告）+ AgentRxiv 知识累积框架，o1/o3-mini/GPT-4o/DeepSeek-V3，MIT |
| [[ai-game-devtools/agentsims]] — PTA Studio 模拟城镇 LLM Agent 评测沙盒：QA评估+Github Actions CI、多智能体+建筑+NPC经济系统，ArXiv 2308.04026 |
| [[ai-game-devtools/generative-agents]] — Stanford 交互式人类行为模拟（UIST 2023）：LLM驱动的25个AI角色在Smallville小镇生活，Memory Stream记忆架构+Reflection反思机制启发了 [[ai-town]] 和 [[cat-town]]，arXiv 2304.03442 |
| [[ai-game-devtools/ai-town]] — a16z-infra 虚拟小镇模拟：Convex + PixiJS + Ollama/OpenAI，AI 角色自主聊天社交，灵感来自 Stanford Generative Agents 论文，JS/TS 入门套件 |
|| [[ai-game-devtools/cat-town]] — ykhli 猫咪主题模拟游戏：基于 AI-town fork，像素猫咪角色 + Cat Town Live Demo (Fly.io)，MIT |
|| [[ai-game-devtools/character-glm-6b]] — 聆心智能&清华大学 CoAI 角色扮演对话大模型：基于 ChatGLM2-6B 微调，7维属性+行为建模，一致性/拟人化/吸引力三维评估，角色扮演场景超越 GPT-3.5，不可商用 |
| [[ai-game-devtools/anime-gf]] — cyan/moecorp 桌面 LLM 聊天前端：Electron + React + tRPC + SQLite，支持 OpenAI/Anthropic/Mistral/Together AI 及任意 OpenAI兼容端点，角色卡系统，AGPL |
| [[ai-game-devtools/agentscope]] — 阿里巴巴通义实验室 Agent 框架（Apache 2.0）：ReAct/Voice/多Agent 工作流 + MCP/A2A 协议 + Trinity-RFT RL 微调 + K8s/OTel 生产部署，支持狼人杀等游戏示例 |
|| [[ai-game-devtools/behaviac]] — 腾讯游戏AI行为框架：行为树/FSM/HTN三种范式，编辑器仅Windows+运行时C++/C#全平台，支持热重载，BSD 3-Clause |
| [[ai-game-devtools/infinity]] — FoundationVision 按位自回归图像生成框架：无限词表 Tokenizer + IVC（8.8T→0.13M 参数）+ BSC 自校正，CVPR 2025 Oral，1024×1024 图像 0.8s 生成，超越 SD3/SDXL |
||| [[ai-game-devtools/byzer-agent]] — allwefantasy 分布式 Agent 框架：Ray + AutoGen 内核，支持本地/远程 Agent 通信，@byzerllm 装饰器定义 Prompt/Reply，Apache 2.0 |
||| [[ai-game-devtools/comorag]] — EternityJune25 认知启发的记忆组织 RAG 系统：Reason→Probe→Retrieve→Consolidate→Resolve 迭代推理循环，三层记忆（Veridical/Semantic/Episodic），200K+ token 长叙事问答优于基线 11%，arXiv 2508.10419，MIT |
||| [[ai-game-devtools/buffer-of-thoughts]] — 北京大学&UC Berkeley&Stanford 思维增强推理框架（NeurIPS 2024 Spotlight）：Meta Buffer 存储可复用思维模板+LightRAG检索，Llama3-8B+BoT可超越Llama3-70B，成本仅ToT的12%，MIT ||
||| [[ai-game-devtools/crewai]] — joaomdmoura 独立多Agent框架（无LangChain依赖）：Crew（自主Agent协作）+Flow（事件驱动生产工作流）+Sequential/Hierarchical双进程，5.76x快于LangGraph，MIT ||
||| [[ai-game-devtools/datarus-jupyter-agent]] — DatarusAI 数据科学 Jupyter Agent：基于 Datarus-R1-14B（Qwen 2.5 微调）驱动多步推理，Docker+Jupyter 隔离执行环境，ReAct/CoT 双模式，自动纠错，生成分析 Notebook，Apache 2.0 |
| [[ai-game-devtools/everything-ai]] — AstraBert Docker 多任务 AI 助手：18 种任务模式（RAG/文本/图像/音频/视频/蛋白质折叠），Qdrant + llama.cpp + HuggingFace，支持本地 GGUF 和云端 API，MIT |
|| [[ai-game-devtools/easyphoto]] — 阿里巴巴 PAI AI 人像生成 WebUI 插件：5-20 张人脸照训练数字分身 LoRA + 两阶段扩散生成 + ControlNet 条件控制 + LCM 加速/视频生成/虚拟试衣，Apache 2.0 |
| [[ai-game-devtools/fabric]] — Daniel Miessler 开源 AI 增强框架（Go）：Pattern 模式管理 20+ AI 提供商，CLI + REST API + Docker，prompts 即单元解决问题，MIT |
| [[ai-game-devtools/fastgpt]] — labring AI Agent 构建平台：可视化 Flow 工作流编排 + 知识库 RAG + 双向 MCP + OpenAI 兼容 API + Docker 一键部署，FastGPT Open Source License |
| [[ai-game-devtools/fastrag]] — IntelLabs 高效 RAG 框架：基于 [[Haystack]] v2 构建，ColBERT+PLAID 高效检索 + REPLUG/FiD 多文档生成器 + Gaudi/ONNX/OpenVINO 多后端，已存档 |
|||| [[ai-game-devtools/gameaisdk]] — 腾讯开源游戏AI工具包：基于游戏画面采集→图像识别(DQN/IM/RainBOW强化学习)→手机端动作执行，支持跑酷/吃鸡/射击/MOBA类游戏自动化测试，GPL v3 |
||| [[ai-game-devtools/gamegen-o]] — 腾讯光子×港科大×中科大 首个开放世界游戏视频生成Transformer模型，支持文本/操作信号/视频提示多模态控制，OGameData 15K 视频数据集，业内称"游戏工作室ChatGPT时刻" |
|||- [[ai-game-devtools/hunyuan-dit]] — 腾讯混元开源 DiT 文本到图像生成模型（1.5B 参数）：中英双语 CLIP+T5 双编码器 + DialogGen 多轮对话 + LoRA/ControlNet/IP-Adapter 全支持，ComfyUI/Diffusers 集成，6GB VRAM 可运行
||||- [[ai-game-devtools/hunyuanimage-2-1]] — 腾讯混元 17B 两阶段扩散图像生成模型：Base(50步)+Refiner 管道，MLLM+byT5 双文本编码器，2K 原生分辨率，Arena 开源文生图 Top 1，最低 24GB VRAM
||||||- [[ai-game-devtools/hunyuanimage-3-0]] — 腾讯混元原生多模态 MoE 图像模型（80B 总参/13B 激活）：自回归架构（非 DiT）、Prompt Self-Rewrite、CoT 思维链、图文到图像编辑、多图融合，3×80GB 可运行 Base 版
||||||- [[ai-game-devtools/nextstep-1]] — StepFun 14B 自回归图像生成模型：连续 Token（非 VQ 离散化）+ Qwen2.5-14B 骨干 + 157M Flow Matching Head 双头架构，统一 next-token 预测框架，ICLR 2026 Oral
||||| [[ai-game-devtools/hunyuan-gamecraft]] — 腾讯混元游戏视频生成：参考图+文本+键鼠动作→生成连贯游戏录像，混合历史条件+模型蒸馏(8步)，1M+ AAA游戏训练，HuggingFace开源 |
|||| [[ai-game-devtools/hunyuanworld-1.0]] — 腾讯混元 3D 世界生成模型：文本/图像→360°全景图→分层3D mesh（背景+2层前景+天空），可导出Draco压缩mesh用于游戏引擎，BRISQUE/NIQE/CLIP 全面SOTA，Apache 2.0 |
||||| [[ai-game-devtools/hunyuanworld-voyager]] — 腾讯混元 Voyager 可探索3D世界视频生成：单图→世界一致RGB-D视频+相机路径控制，WorldScore Benchmark综合第1（77.62），支持点云导出，Apache 2.0 |
|||||- [[ai-game-devtools/instantid]] — InstantX Team/小红书 零样本身份保留图像生成：单图即可保持面部特征+文本可控，无需微调，IdentityNet(ControlNet)+IP-Adapter架构，LCM加速兼容，Kolors适配，Apache 2.0
|||||| [[ai-game-devtools/omnigen]] — VectorSpaceLab 统一图像生成模型：Phi-3+DiT 架构，无需额外插件(ControlNet/IP-Adapter)直接多模态 prompt 生成，支持文本到图像/主体驱动/身份保留/图像编辑，MIT
||||| [[ai-game-devtools/omnigen2]] — VectorSpaceLab/BAAI 下一代多模态图像生成：双解码通路(文本/图像独立参数)+解耦Tokenizer，新增视觉理解能力，TeaCache/TaylorSeer加速推理，最低17GB VRAM，MIT
|||||| [[ai-game-devtools/omost]] — lllyasviel LLM 图像组合工具：LLM 生成 Python Canvas 代码描述空间布局（9×9×9=729 种边界框）+ 注意力分数操纵渲染，自然语言空间编码（非像素坐标），子提示<75 tokens 避免 CLIP 截断，Llama-3/Phi-3 基座 8GB VRAM
||||||- [[ai-game-devtools/irg]] — Osilly ICLR 2026 首个交错推理图像生成模型：Prompt→文本推理→初始图像→自我反思→精炼图像，GenEval 0.85 SoTA，基于 [[ai-game-devtools/bagel]] 架构，SFT+RL统一训练，Apache 2.0
|||||| [[ai-game-devtools/kolors]]
|||||| [[ai-game-devtools/hy-world-1.5]] — 腾讯混元 WorldPlay 实时交互世界模型
||| [[ai-game-devtools/genagent]] — xxyQwQ/港科大 CVPR 2025 LLM Agent：在ComfyUI中自动生成Stable Diffusion工作流
|| [[ai-game-devtools/genesis]] — Genesis-Embodied-AI 通用物理引擎平台：6种求解器统一框架（Rigid/MPM/SPH/FEM/PBD/SF），43M FPS @ RTX 4090，光线追踪渲染+生成式数据引擎，Apache 2.0 |
| [[ai-game-devtools/gigax]] — GigaxGames 开源游戏运行时 LLM NPC 框架：Outlines 结构化生成保证输出格式，<1s GPU 推理，NPC-LLM-7B/3_8B 开源权重，MIT |
| [[ai-game-devtools/interactive-llm-powered-npcs]] — AkshitIreddy 游戏 NPC 实时对话系统：DeepFace 面部识别+Cohere LLM+LangChain+ChromaDB 生成对话，SadTalker 唇形动画+Edge-TTS 语音，Pixel 替换叠加层适配任意游戏无需源码修改，MIT |
|| [[ai-game-devtools/matrix-game]] — Skywork AI 开源交互式游戏世界模型系列：Wan2.2 DiT 架构+键鼠动作条件化+长程记忆+流式生成，3.0 支持 INT8 量化/异步 VAE/FSDP，MIT |
| [[ai-game-devtools/hipporag]] — OSU-NLP-Group 神经生物学启发 LLM 长期记忆框架（NeurIPS '24 / ICML '25）：知识图谱 + OpenIE + 非参数持续学习，多跳关联检索 SOTA，低索引成本 |
||| [[ai-game-devtools/mindsearch]] — InternLM 开源 AI 深度搜索框架：动态图分解子问题 + 并行 SearcherAgent（ThreadPoolExecutor/asyncio）+ 5 种搜索引擎 + SSE 流式可视化，arXiv 2407.20183，Apache 2.0 ||
|| [[ai-game-devtools/mixture-of-agents]] — Together AI 多 LLM 分层聚合架构：并行调用多个开源模型 → 迭代精炼 → 聚合器综合，AlpacaEval 2.0 65.1% 超越 GPT-4 Omni（57.5%），纯推理时增强无需训练，Apache 2.0
|| [[ai-game-devtools/mmrole]] — YanqiDai ICLR 2025 多模态角色扮演 Agent 框架：85角色/11K图像/14K对话数据集 + Qwen-VL-Chat 微调 Agent + 8维3面评估，奖励模型评分，MIT
| [[ai-game-devtools/mug-diffusion]] — Keytoyze AI 音游谱面自动生成工具：基于 Stable Diffusion 改造+音频波形条件化，支持 4K VSRG，osu!/Etterna 难度控制+风格控制，Gradio WebUI，CC0 1.0
|| [[ai-game-devtools/anytext]] — Alibaba ICLR 2024 Spotlight 多语言视觉文本生成扩散模型：SD1.5+ControlNet 架构+OCR 感知损失，中英双语文字无缝融入图像，FP16 ~7.5GB VRAM，LoRA 支持，AnyText2 已发布
|| [[ai-game-devtools/atomic-agents]]
||| [[ai-game-devtools/autoagents]] — LinkSoul/IJCAI 2024 自动多 Agent 生成框架：LLM 驱动动态生成专家角色+执行计划，Observer 三层反射检查（Agents/Plan/Action），MIT |
||| [[ai-game-devtools/bagel]] — ByteDance-Seed 开源统一多模态模型（7B 激活/14B 总参）：MoT 架构融合视觉理解+文生图+图像编辑+世界建模，MMBench 85.0 超 Qwen2.5-VL，GenEval 0.82 匹敌 FLUX-1.dev，Apache 2.0 |
|| [[ai-game-devtools/blender-controlnet]] — coolzilj Blender + A1111 WebUI API 桥接脚本：F12 渲染→Compositor 条件图(canny/depth/openpose/seg)→POST /txt2img→AI 生成图加载回 Image Editor，支持 4 种 ControlNet 单位并行，MIT |
|| [[ai-game-devtools/brivl]] — BAAI WuDao 中文图文多模态预训练模型（1B 参数）：EfficientNet-B5 + Chinese RoBERTa 双编码器 + MoCo 对比学习，图文检索超 CLIP/UNITER，可独立部署
|| [[ai-game-devtools/autogen]] — Microsoft Research 多 Agent 协作框架（维护模式）：Core/AgentChat/Extensions 三层架构，MCP/A2A 支持，后继者 Microsoft Agent Framework，MIT |
|| [[ai-game-devtools/autostudio]] — donahowe/AutoStudio CVPRW 2026 多轮交互式图像生成框架：四智能体（Subject Manager/LayoutGenerator/Supervisor/Drawer）+ Parallel-UNet + 免训练，保持多主题一致性，FID +13.65% |
||| [[ai-game-devtools/catvton]] — ICLR 2025 虚拟试穿扩散模型：899M 参数/仅 49.57M 可训练，SD1.5 Inpainting 基础+拼接融合，1024×768 <8GB 显存，支持 VITON-HD/DressCode，CC BY-NC-SA 4.0 |
||| [[ai-game-devtools/clipasso]] — SIGGRAPH 2022 语义感知图像转草图工具：CLIP 感知损失 + diffvg 可微栅格化，贝塞尔曲线优化输出 SVG，笔画数控制抽象程度，CC BY-NC-SA 4.0 |
||| [[ai-game-devtools/comfyui]] — comfyanonymous 最强模块化视觉 AI 引擎：节点/图/流程图界面设计 SD 管线，18.7万行代码，578 Py文件，SD/Flux/视频/音频全支持，图执行引擎+增量缓存+智能显存管理，GPL v3 |
|||| [[ai-game-devtools/conceptlab]] — Tel Aviv University VLM引导创意概念生成：Kandinsky 2.1 扩散先验 + BLIP VLM 自适应负约束，生成从未存在的新概念/进化混合/风格创造，MIT |
||| [[ai-game-devtools/controlnet]] — ICCV 2023：零卷积架构(SD encoder locked+trainable copy)控制扩散模型，9种条件图(canny/depth/pose/seg/normal等)，可组合多ControlNet并行，支持Guess Mode无提示生成 |
| [[ai-game-devtools/aworld]] — inclusionAI 多智能体 Agent Harness 框架：CAST 代码分析 + Benchmark-Driven Development + Self-Evolution Loop，GAIA/OSWorld/XBench 多项 Leaderboard 1st，MIT |
| [[ai-game-devtools/cradle]] — BAAI 游戏/软件 Agent 框架： screenshot→LLM推理→键鼠动作，RDR2/Stardew/CitiesSkylines/Dealer'sLife2 + Chrome/Outlook/Capcut，Skill Registry + Planner + Memory + SAM/GroundingDINO 视觉，MIT |
| [[ai-game-devtools/agent-group-chat]] —
|| [[ai-game-devtools/longcat-flash]] — 美团 560B MoE LLM（激活 27B），ScMoE 架构 >100 TPS，128K context，Agent 任务 SOTA（τ²-Bench 73.68），MIT |
| [[ai-game-devtools/longwriter]] — THUDM 超长文本生成 LLM（10K+ 词），基于 GLM-4-9B/Llama-3.1-8B 微调，AgentWrite 流水线，vLLM 推理 1 万词/分钟，Apache 2.0 |
|| [[ai-game-devtools/larp]] — MiAO 认知架构语言角色 Agent：4模块记忆处理（语义/情景/程序记忆）+ Wickelgren 遗忘定律 + 个性化 LoRA 适配 + 可学习动作空间，arXiv:2312.17653
|| [[ai-game-devtools/large-world-model-lwm]] — UC Berkeley/Scale AI 百万 token 上下文多模态模型（视频+语言+图像），RingAttention + Blockwise Transformer，7B 参数 1M context，Apache 2.0 |
| [[ai-game-devtools/lumina-t2x]] — OpenGVLab 多模态 DiT 生成框架（图像/视频/3D点云/音频/音乐），Flag-DiT 5B / Next-DiT 2B，Flow Matching + RoPE，MIT |
| [[ai-game-devtools/llama-3]] — Meta Llama 3 LLM 系列（8B/70B），128K 词表 + GQA + 15T tokens 预训练，ChatFmt 对话格式，MMLU 82.0（70B），已废弃 ||
||| [[ai-game-devtools/llama-3-1]] — Meta Llama 3.1 系列（8B/70B/405B），128K context + GQA 全系列，15T+ tokens，TikToken，Llama 3.1 系列统一仓库 ||
||| [[ai-game-devtools/llm-answer-engine]] — Developers Digest Perplexity 风格答案引擎：Groq Mixtral/Llama3 + Brave Search + Langchain.JS RAG，支持 function calling/流式响应/多模态结果，MIT ||
|||| [[ai-game-devtools/corenet]] — Apple 深度神经网络训练库：支持 LLM/CLIP/ViT 等 foundation models 的训练，含 FSDP 分布式训练 |
| [[ai-game-devtools/cosmos]] — NVIDIA 物理 AI 世界基础模型平台：Predict/Transfer/Reason 三类模型，服务自动驾驶与机器人仿真 |
| [[ai-game-devtools/dbrx]] — Databricks 132B MoE LLM：16 experts 选4，36B 激活参数，12T tokens 预训练，32K context，Databricks Open Model License |
|| [[ai-game-devtools/deepfloyd-if]] — DeepFloyd Lab/StabilityAI 级联像素扩散文本到图像模型：T5+三级UNet（64→256→1024px），FID 6.66 SOTA，支持 Dream/风格迁移/超分辨率/修复四种模式，Modified MIT |
|| [[ai-game-devtools/dclm]] — MLFoundations LLM 训练框架：300T+ tokens 数据集构建流程，Ray 分布式处理 + Rust deduplication，支持 400M-7B 规模模型训练评估 |
|| [[ai-game-devtools/depth-anything-v2]] — HKU+TikTok 单目深度估计 V2：DINOv2 ViT 骨干(4档:24.8M~1.3B)+DPT 解码头，中间层特征提取，Apple Core ML/TensorRT/ComfyUI/Transformers 集成，V2-Small Apache-2.0 可商用 |
|| [[ai-game-devtools/sd-webui-depth-lib]] — jexom A1111 WebUI 深度图管理插件：预置手部/形状深度图库 + Fabric.js 画布组合编辑 + 一键发送到 [[ai-game-devtools/controlnet]]，开源无 LICENSE |
|| [[ai-game-devtools/interactml-unity]]
|| [[ai-game-devtools/iml-ue4]] — Interactml Unreal Engine 4/5 C++ 插件：与 Unity 版共享 RapidLib 后端，kNN/MLP/DTW，原生 Blueprint 节点配置，Win64，MIT |
|| [[ai-game-devtools/index-1.9b]] |
||||| [[ai-game-devtools/internlm]] — 上海 AI Lab 大模型系列（1.8B-20B），InternLM3-8B 仅 4T tokens 训练成本降低 75%，Deep Thinking Mode 支持长思维链推理，支持 LMDeploy/vLLM/SGLang 多推理后端 |
||||||| [[ai-game-devtools/internlm-xcomposer]] — 上海 AI Lab 多模态 LVLM 系列（1.0→2.5），7B 参数达 GPT-4V 水平，支持 4K 图像/96K 上下文/视频理解，独有网页生成能力（指令→HTML/CSS/JS）|
||||||| [[ai-game-devtools/motionllm]] — IDEA/清华/CUHK-SZ 视频+动作联合理解 LLM：Vicuna 1.5-7B + LoRA + SMPL 动作编码，MoVid 数据集，行为描述/时空理解/推理，arXiv 2405.20340 |
||| [[ai-game-devtools/design2code]] — Stanford SALT Lab screenshot-to-code benchmark：484网页截图生成HTML代码，Design2Code-18B (CogAgent微调) + GPT-4V/Gemini/Claude 3.5 多模型评测，arXiv 2024 |
|||| [[ai-game-devtools/demogpt]] — DemoGPT 自动生成 AI 应用框架：自然语言 → Streamlit App 流水线（Plan/Task/Code/Final），内置 AgentHub 支持工具调用 + RAG |
||||| [[ai-game-devtools/devika]] — Devika AI 软件工程师：Devin 开源替代方案，多 Agent 架构（Planner/Researcher/Coder 等），支持 Claude/GPT/Ollama，MIT |
|||||| [[ai-game-devtools/metagpt]] — MetaGPT 多 Agent 软件公司框架：PM/Architect/Engineer 角色协作，Code=SOP(Team) 核心理念，ICLR 2024，支持游戏代码生成，MIT |
|||||| [[ai-game-devtools/olmo]] — AI2 OLMo 开源 LLM 系列（1B/7B/13B/32B），两阶段训练 + 模型 soup 平均，HuggingFace 格式，Apache 2.0 |
||||| [[ai-game-devtools/mlc-llm]] — mlc-ai 通用 LLM 部署引擎：TVM ML 编译优化，跨平台支持（Linux/Win/macOS/iOS/Android/Web/WASM），MLCEngine 统一推理接口，Apache 2.0 |
|||||| [[ai-game-devtools/mobillama]] — MBZUAI 轻量级 SLM（0.5B/0.8B/1B），参数共享策略降低训练和部署成本，HellaSwag 52.52（0.5B）超越 Pythia-410m，ICLR'25 SLLM Spotlight，Apache 2.0 |
|||||| [[ai-game-devtools/next-gpt]] — NExT++/NUS any-to-any 多模态 LLM（文字/图像/视频/音频任意组合），ImageBind 编码 + Vicuna-7B + LoRA 微调，ICML 2024 Oral，BSD 3-Clause |
|||||| [[ai-game-devtools/moshi]] — Kyutai 全双工语音对话基础模型，Mimi 流式神经编解码器（1.1kbps/80ms），7B Temporal+Depth Transformer，160ms 理论延迟，CC-BY 4.0 |
|||| [[ai-game-devtools/minimax-01]] — MiniMax 456B MoE LLM（激活 45.9B）+ VL 双模型，Lightning Attention + MoE，4M token 推理上下文，RULER 1M 0.910（最佳），MIT |
|| [[ai-game-devtools/flowise]] — FlowiseAI 可视化拖拽 LLM 应用构建平台
| [[ai-game-devtools/gptscript]] — Acorn Labs LLM 工具调用框架：.gpt 脚本语言连接 OpenAPI/CLI/文件系统，Go 实现，Apache 2.0 |
| [[ai-game-devtools/deepseek-v3]]
| [[ai-game-devtools/devon]] — entropy-research 开源 AI 结对编程助手：支持 Claude/GPT-4o/Groq/Ollama 多模型，Electron+TUI 双界面，专注代码库编辑/探索/测试生成，AGPL |
|| [[ai-game-devtools/chrome-gpt]] — AutoGPT agent 控制 Chrome 浏览器：Selenium + LangChain，支持 Auto-GPT/BabyAGI/Zero-shot 多种 agent 类型 |
||| [[ai-game-devtools/glm-4]] — THUDM/ZhipuAI 32B LLM 系列（GLM-4/Z1/Z1-Rumination），Agent 优化，128K context，BFCL 69.6%，函数调用优于 GPT-4o |
||| [[ai-game-devtools/glm-4.5]] — THUDM/ZhipuAI GLM-4.5/4.6/4.7 系列，MoE 架构（355B-A32B），混合推理+工具调用，MIT 许可 |
||| [[ai-game-devtools/gpt4all]] — Nomic 本地 LLM 运行平台：桌面 GUI + Python/TS 绑定 + llama.cpp 后端，支持 Vulkan/CUDA GPU 加速，MIT |
|||| [[ai-game-devtools/gpt-oss]] — OpenAI 开放权重推理模型（120B/20B MoE），Apache 2.0，MXFP4 量化，单卡 80GB 可运行，含 Browser/Python/ApplyPatch 工具 |
||| [[ai-game-devtools/orion-14b]] — OrionStarAI 14B 多语言 LLM（中文/英文/日文/韩文），2.5T tokens 预训练，C-Eval 72.9/CMMLU 70.6/MMLU 69.9 全面超越同尺寸竞品，LongChat 支持 320k token，Apache 2.0 |
||| [[ai-game-devtools/pandallm]] — DandelionsLLM 中文开源大模型：PandaLLM（LLaMA1/2 中文预训练）+ PandaLLMOps（全流程训练推理部署工具）+ PandaCommunity 社区，Apache 2.0 |
||||| [[ai-game-devtools/stable-lm]] — Stability AI 开源 LLM 系列（3B/7B/13B），StableLM-3B-4E1T 多 epoch 训练 4T tokens SOTA，CC BY-SA-4.0 |
|||||| [[ai-game-devtools/webgpt]] — 0hq 纯浏览器端 GPT 推理：WebGPU + WGSL 自定义着色器，117M~1.5B 模型免构建直接开 HTML 运行，适合教育目的，MIT |
||||||| [[ai-game-devtools/wordgpt]] — filippofinke Microsoft Word Office 插件：OpenAI text-davinci-003 集成，Prompt 输入→生成→插入文档，React + Fluent UI，MIT |
|| [[ai-game-devtools/nvidia-nemo-agent-toolkit]] — NVIDIA 开源多智能体编排框架（Apache 2.0）：框架无关的 Agent 连接层，插件支持 LangChain/CrewAI/LlamaIndex 等 7+ 框架，企业级可观测性+评估+安全测试，CLI 工作流驱动，Python 3.11-3.13，无需 GPU |
|| [[ai-game-devtools/om-agent]] — OmAI Lab 多模态语言智能体框架：Conductor 工作流引擎 + YAML 配置驱动、8 种推理算子(ReAct/CoT/SC-CoT/PoT 等)、VLM/视频理解/STT 多模态、Redis/Milvus 双记忆、Lite 模式无需中间件
|| [[ai-game-devtools/openagents]] — XLang NLP Lab 开源语言 Agent 平台：Data/Plugins/Web 三大 Agent + Next.js Chat UI + Flask 后端 + MongoDB/Redis 存储 + Chrome 扩展自动浏览，基于 LangChain，3000+ 用户，Apache 2.0
||| [[ai-game-devtools/open-oasis]] — Decart×Etched 交互式世界模型：DiT 架构 + ViT VAE，键盘动作→自回归游戏画面帧生成，500M 参数开源版，HuggingFace 权重
||| [[ai-game-devtools/pipecat]] — pipecat-ai 实时语音/多模态 AI Agent 框架：Frame-based 管道架构、60+ AI 服务集成（STT/LLM/TTS/Vision）、Daily/LiveKit WebRTC 传输、多平台 SDK（JS/React/Swift/Kotlin/C++）、BSD-2-Clause
||| [[ai-game-devtools/sotana]] — DeepSoftwareAnalytics 软件工程指令微调模型：LLaMA + LoRA（7B/13B/30B），覆盖 Stack Overflow 问答/代码生成/代码摘要三类任务，PEFT 高效微调 |
||| [[ai-game-devtools/ten-agent]] — TEN-framework 开源实时多模态对话 AI 框架：低延迟语音/视频 Agent，多语言架构(Python/C/C++/TS/Rust/Go)、VAD/Turn Detection/唇形同步/ESP32 硬件支持、RTC/WebSocket 双传输，Apache 2.0
||| [[ai-game-devtools/translation-agent]] — Andrew Ng 反射式 Agent 翻译工作流：翻译→反思→改进三步循环，支持区域语言变体/术语表定制，Gradio WebUI 多 LLM 端点，MIT
||| [[ai-game-devtools/video2game]] — 视频转 3D 游戏场景管线：NeRF→网格提取→纹理烘焙→碰撞体生成→Three.js/Unreal 集成，Omnidata 先验+V-HACD 凸分解，单视频生成可交互 3D 环境
||| [[ai-game-devtools/webdesignagent]] — 阿里达摩院自主网站生成 Agent：多模态输入(文本/模板/图片)→结构规划→Tailwind CSS 网页生成，GUI+CLI 双模式，人机反馈循环，Apache 2.0
|||| [[ai-game-devtools/wordware-twitter]] — Wordware AI Twitter 人格分析 Agent：Next.js + TypeScript + Neon DB + Drizzle ORM，三通道 Twitter 数据抓取降级（API/Apify/SocialData），模块化 Prompt 系统（ROAST/FULL/PAIR），Stripe + PostHog + Loops 完整 SaaS 架构
|| [[ai-game-devtools/csgo]] — InstantX 内容-风格解耦图像生成框架：SDXL 基座 + IP-Adapter，4 内容 Token + 16/32 风格 Token，支持文本/图像/编辑驱动风格化合成，DeepSpeed Zero2 训练，HuggingFace 权重 |

|| [[ai-game-devtools/disco-diffusion]] — alembics AI艺术/动画生成Colab工具箱：Katherine Crowson 512×512扩散模型+CLIP引导，5种动画模式(2D/3D/Turbo/Warp/VR)，MiDaS+AdaBins双深度估计，OpenCLIP/风格化模型支持，MIT |
||| [[ai-game-devtools/grounded-segment-anything]] — IDEA Research 开源视觉检测+分割流水线：Grounding DINO 零样本检测 + SAM 像素级分割 + Stable Diffusion 重绘，6种交互模式Gradio App，ICCV 2023 Demo，Apache 2.0 |
|| [[ai-game-devtools/hivision-id-photos]] — SwanLab 团队轻量级证件照制作工具：MODNet/hivision_modnet/rmbg-1.4/birefnet-v1-lite 多模型抠图 + MTCNN/RetinaFace/Face++ 人脸检测，Gradio Demo + FastAPI + Docker 多部署方式，支持美颜/换底/排版/水印/模板照，Apache 2.0 |
|| [[ai-game-devtools/draggan]] — MPI Informatik SIGGRAPH 2023 交互式图像操控工具：基于 StyleGAN3 潜在空间点拖拽变形，实时优化保持逼真度，支持 ImGui 桌面 GUI + Gradio Web/Docker/Colab，PTI 反转编辑真实图像，CC-BY-NC 4.0 |
||| [[ai-game-devtools/dwpose]] — IDEA-Research ICCV 2023 全身姿态估计：两阶段知识蒸馏(RTMPose+YOLOX)，替换 ControlNet 中 OpenPose，Whole AP 0.665(384×288)，ONNX 推理，Apache 2.0 |
||| [[ai-game-devtools/llamagen]] — FoundationVision 自回归图像生成模型：VQ-VAE tokenizer + GPT next-token prediction，111M-3B 参数规模，FID 2.18（ImageNet），超越 diffusion 方法，MIT，vLLM 300-400% 加速 |
||||| [[ai-game-devtools/lumina-image-2-0]] — Alpha-VLLM 统一高效图像生成 DiT 框架（ICCV 2025）：Gemma-2-2B 文本编码+FLUX-VAE-16CH，2.6B 参数/1024 分辨率，Flash Attention+RMSNorm+多求解器(Midpoint/Euler/DPM)，Diffusers/ComfyUI 集成，LoRA 微调，Apache 2.0 |
|| [[ai-game-devtools/lumina-mgpt]] — Alpha-VLLM 多模态自回归模型家族：Chameleon 架构扩展+VQ-VAE 图像 token 化，7B/34B 参数，支持文本生成图像/图像理解/Omni 多任务（深度/分割/姿态），FSDP 训练+Gradio 演示，Apache 2.0 |
|| [[ai-game-devtools/makeanything]] — NUS Show Lab FLUX.1 多域程序序列生成：Asymmetric LoRA 21域共享 + Recraft 图生序列(4/9帧)，1024/1056分辨率，覆盖乐高/绘画/雕塑等21创意域，HuggingFace权重+数据集 |

## Texture (3D Asset Generation)
||| [[ai-game-devtools/crm]] — 清华大学单图→3D 有纹理网格生成模型：两阶段扩散（多视角像素图+CCM几何纹理图）+ FlexiCubes + nvdiffrast 渲染，10 秒生成带 UV 纹理 OBJ，arXiv 2024 |

## Code Tools

| [[ai-game-devtools/bloop]] — BloopAI AI代码搜索工具：Rust后端+Tauri桌面+React前端，Tantivy全文搜索+Qdrant语义搜索+Tree-sitter AST解析，ONNX端侧embedding，Apache 2.0 |
| [[ai-game-devtools/chapyter]] — Shannon Shen JupyterLab 扩展：%%chat magic 命令将自然语言转为 Python 代码并自动执行，guidance prompt 模板 + OpenAI/Azure API，JupyterLab≥4.0，BSD 3-Clause |
|| [[ai-game-devtools/codegeex]] — THUDM 13B 多语言代码生成模型（Python/C++/Java/JS/Go），850B tokens 预训练，HumanEval-X 评测，VS Code/JetBrains 插件，跨平台 Ascend/NVIDIA，KDD 2023，Apache 2.0 |
||| [[ai-game-devtools/codegeex2]] — THUDM CodeGeeX 第二代：6B 参数+ChatGLM2架构+600B代码预训练，HumanEval Pass@1 35.9%超越Starcoder-15B，INT4量化仅5.5GB显存，94 tok/s，Apache 2.0 |
||| [[ai-game-devtools/codegeex4]] — THUDM CodeGeeX 第四代：9B参数+GLM-4基座，128K上下文，HumanEval 82.3%，唯一支持Function Call的代码模型，Ollama/vLLM/Candle多部署方式，Apache 2.0 |
| [[ai-game-devtools/aixcoder-7b]] — aiXcoder 7B 代码大模型：1.2T Tokens 训练，结构化 AST-FIM 训练任务（70%），7B 参数 RoPE/SwiGLU/GQA，nl2code 超越 CodeLlama 34B，跨文件代码理解，int8/int4 量化，Apache-2.0 |
| [[ai-game-devtools/codegen]] — Salesforce 开源代码生成模型家族（CodeGen1/2/2.5），7B-16B 参数，ICLR 2023，7B 超 16B 性能，StarCoderData 预训练，Apache 2.0 |
|| [[ai-game-devtools/codegen2]] — Salesforce CodeGen 第二代（1B/3.7B/7B/16B）：原生代码 infilling 支持，19 种编程语言，The Stack v1.1 去重数据，ICLR 2023，研究用途 |
||| [[ai-game-devtools/code-llama]] — Meta AI 基于 Llama 2 的代码大模型（7B/13B/34B/70B）：Base/Python/Instruct 三变体，16K训练/100K推理上下文，代码填充(infilling)能力，Llama 2 Community License |
|| [[ai-game-devtools/deepseek-coder]] — DeepSeekAI 代码语言模型系列（1B-33B）：2T tokens 预训练，86 种语言，16K FIM 代码补全，HumanEval 超越 CodeLlama-34B，MIT |
|| [[ai-game-devtools/starcoder]] — BigCode (HuggingFace+ServiceNow) 开源代码模型：80+ 语言，The Stack 数据集训练，OpenRAIL-M 许可，支持 PEFT 微调+8-bit量化(<20GB)，StarChat 编码助手变体 |
||| [[ai-game-devtools/starcoder-2]] — StarCoder 第二代：3B/7B/15B 三档模型，600+ 语言，16K context，GQA+Sliding Window，The Stack v2 训练（3T-4T tokens），bitsandbytes 量化支持，Apache 2.0 |
||| [[ai-game-devtools/codetf]] — Salesforce Code LLM 工具库：推理/微调/评估/数据集/代码工具一站式 Python 库，15+ 语言 tree-sitter AST 解析，PEFT 微调，pass@k/CodeBLEU 评测，~14 行代码完成微调，Apache 2.0
||| [[ai-game-devtools/code-world-model]] — Meta FAIR 32B 代码世界模型：Dense decoder-only，交替局部/全局注意力(3:1)，131K context，Python执行轨迹+3M Agent交互轨迹中训练+多任务RL，SWE-bench Verified 65.8(+tts)
||| [[ai-game-devtools/codet5]] — Salesforce 代码理解与生成模型家族：CodeT5 (EMNLP 2021, T5 encoder-decoder, 8 语言, CodeXGLUE SOTA) + CodeT5+ (2023, 220M-16B, 灵活模式, HumanEval 36.1% Pass@1), 初始化自 CodeGen, BSD-3 |
||| [[ai-game-devtools/ai-code-translator]] — mckaywrigley 代码翻译 Web UI：Next.js + CodeMirror + OpenAI API，几百行代码，支持 JS/Python/Go/Rust/C++/Java/Ruby 多语言互译，MIT ||
||| [[ai-game-devtools/pandas-ai]] — Sinaptik AI 自然语言数据分析工具：LiteLLM 驱动 + DuckDB SQL 引擎 + 代码生成→执行→解析流水线 + Docker 沙箱安全执行，支持 DataFrame 对话问答/图表生成/多表关联查询，MIT |
|| [[ai-game-devtools/unitygen-ai]] — himanshuskyrockets Unity Editor AI 代码生成插件：OpenAI Codex(text-davinci) 驱动代码生成，EditorWindow UI + ScriptableObject 配置 API Key，alpha 阶段作者已弃用，MIT ||
|| [[ai-game-devtools/void]] — voideditor 开源 Cursor 替代 IDE：VSCode 1.99.3 fork，Electron 双进程架构，OpenAI/Anthropic/Gemini/Ollama/Groq/Mistral 多 Provider 接入，Fast/Slow Apply 代码修改系统，MCP 支持，MIT，开发已暂停 |

## Open Source Games

- [[open-source-game/athena-crisis]] — 现代复古回合战术策略，100K+ LOC 开源引擎，pnpm monorepo（athena/apollo/hera/ui/dionysus 包分离），TypeScript + Vite，MIT（代码）/ 专有（内容），Steam 商业化
- [[open-source-game/the-battle-for-wesnoth]] — 高奇幻回合策略，WML+Lua 内容脚本系统，86K commits，C++17 + SDL2
- [[open-source-game/vcmi]] — Heroes of Might and Magic III 完全开源引擎重实现，C++20 C/S 架构，Bonus DAG 传播系统，Callback 接口三层分离，多 AI 并存，ERM+Lua 双脚本
- [[open-source-game/unciv]] — Civilization V 开源复刻 for Android & Desktop，LibGDX 跨平台，JSON 数据驱动规则集，Ktor 多人网络，Mod 系统，141K LOC Kotlin，Apache 2.0
- [[open-source-game/0-ad]] —
- [[open-source-game/freeorion]] — 4X 太空帝国回合策略，致敬 Master of Orion，C++20 + GiGi GUI + FOCS Python 脚本驱动，约 183K LOC C++
- [[open-source-game/freecol]] — Colonization 开源复刻，Java 11 + Ant 构建，826 源文件，XML 数据驱动规则，模块化 client/server 架构，GPLv2
- [[open-source-game/freeciv]] — Civilization 风格帝国建设回合策略，C 语言 + Meson 构建，server/client/common 三层模块化架构，191K LOC，约 29 年活跃开发，能力字符串版本协议支持多客户端网络互通，GPLv2
- [[open-source-game/openxcom]] — X-COM: UFO Enemy Unknown / Terror From the Deep 开源复刻，C++/SDL，646 C++源文件，Geoscape/Battlescape/Basescape 三层模块架构，YAML Mod 规则集系统，2.1k stars，GPLv2
- [[open-source-game/mindustry]] — 自动化塔防 RTS，Arc Engine + 代码生成 ECS + 帧同步多人
- [[open-source-game/openage]] — Age of Empires 引擎复刻，C++20+Python3 双语言架构，Cython 绑定，nyan 配置格式，GPLv3
- [[open-source-game/openhv]] — OpenRA 引擎科幻 RTS Mod，改编自 Hard Vacuum，MiniYAML 数据驱动，C# Traits 系统，源码 GPLv3 + 内容 CC BY
- [[open-source-game/openenroth]] — Might and Magic VI-VIII 引擎清洁室重实现，C++23 + CMake，子系统模块化架构（Engine/GUI/Media/Scripting），LuaJIT + sol2 脚本，22 第三方子模块，~136K LOC，仅 MM7 可玩，GPLv2
- [[open-source-game/opennox]] — Nox (Westwood 2000) 引擎清洁室重实现，SDL2+OpenGL+OpenAL 跨平台抽象，compat 层分离，Emscripten WebAssembly 支持，自研 VQA 视频解码器，MIT
- [[open-source-game/openpanzer]] — 纯 HTML5/JS/Canvas 回合制坦克战，致敬 Panzer General 2，无第三方依赖，XML 剧本+Python 工具链转换，localStorage 存档，GPLv2
- [[open-source-game/re3]] — GTA III 逆向工程重实现，Theseus之船渐进式替换策略，librw 自研 RenderWare 替代渲染引擎，D3D9/OGL3.3 双后端，约 188K LOC C/C++，需原版游戏数据
- [[open-source-game/reone]] — KotOR/KotOR 2 引擎清洁室重实现，SDL2+OpenGL 3.3 自研引擎，NWScript 虚拟机，GFF/2DA 资源解析，~438 源文件，C++17，GPLv3
- [[open-source-game/severed-chains]] — Legend of Dragoon PS1 逆向工程 Java 重实现，904 Java 文件，PS1 硬件仿真层(GTE/GPU/SPU)，Event-based 模组 API
- [[open-source-game/permafrost-engine]] — OpenGL 3.3 RTS 游戏引擎，纯 C + Python 2.7 脚本，GPU 骨骼动画+分层流场寻路+Fiber 协作多任务，旗舰游戏 EVERGLORY
- [[open-source-game/freeserf-net]] — The Settlers I 清洁室 C# 重实现，Silk.NET 跨平台渲染，BASS 音频，多人网络开发中，MIT
- [[open-source-game/pooltool]] — Python 台球物理沙盒，Panda3D 渲染 + numba JIT 物理，事件驱动碰撞解析，多碰撞模型可插拔（Stronge/Mathavan/Han），JOSS 论文发表，Apache 2.0
- [[open-source-game/open-golf]] — 跨平台迷你高尔夫游戏，纯 C 自研物理引擎（BVH 碰撞），Sokol 跨平台 3D 渲染，ImGui 内置关卡编辑器，光照贴图烘焙（xatlas+lightmapper），支持 Windows/Linux/macOS/Android/iOS/Web
- [[open-source-game/standard-of-iron]] — 布匿战争历史 RTS，C++20/Qt6/OpenGL 3.3，ECS 架构，骨骼动画+布料物理，MIT
- [[open-source-game/cnc-tiberian-dawn]] — EA 官方 C&C 原版（1995）源码，Watcom C++ + x86 汇编，OOP 类层次架构 (Foot/Unit/Building/AircraftClass)，IPX/Modem 多人大战雾系统，GPLv3
- [[open-source-game/cataclysm-dark-days-ahead]] — 后世界末日生存 roguelike，480K LOC C++ JSON数据驱动 (~130K行JSON内容)，双渲染器 SDL2/Tiles+Ncurses，CC BY-SA 3.0，16.2k stars
- [[open-source-game/daggerfall-unity]] — Unity 引擎重制《上古卷轴 II：匕首雨》，DaggerfallConnect 原生资产读取，QuestMachine 任务系统，FullSerializer 存档，ModManager 模组支持，MIT
- [[open-source-game/devilutionx]] — Diablo + Hellfire 开源端口，清洁室逆向工程，259 C++/163 H ~54K LOC，CMake 多平台（17+平台），帧同步多人 dvlnet/，Lua 脚本扩展，MIT
- [[open-source-game/freeablo]] — Diablo 1 引擎清洁室重实现，双线程架构（渲染/逻辑分离），确定性锁步网络，Nuklear GUI，~38K LOC C++17，**已归档**，MIT
- [[open-source-game/fheroes2]] — Heroes of Might and Magic II 清洁室重实现，~210K LOC C++，纯 SDL2 无游戏引擎，engine/ + fheroes2/ 模块分离，多平台 Win/Mac/Linux/Android/iOS/Switch/Vita，engine/ 自研图像/音频/渲染系统，GPLv2
- [[open-source-game/open-diablo-2]] — Go + Ebiten 2D 引擎实现的 Diablo 2 开源复刻，模块化架构（d2app/d2core/d2game/d2networking），帧同步 P2P 多人，otto JS 脚本引擎，**项目已拆分**：引擎→Abyss Engine，游戏→OpenDiablo2
- [[open-source-game/abyss-engine]] — Diablo 2 纯 C 清洁室重实现引擎，SDL2+FFmpeg+LibArchive 依赖栈，~72 文件 ~4859 LOC C99，OpenDiablo2 拆分后的独立引擎层，MIT
- [[open-source-game/veloren]] — Rust 体素多人 RPG，400K LOC，24 crates workspace，ECS (specs) + QUIC 网络 + 自研体素渲染器，GPLv3，~16K commits
- [[open-source-game/space-station-14]] — Space Station 13 现代 C# 重制版，Robust Toolbox 自研引擎，Entity-Component 架构，YAML 原型数据驱动，MIT+CC-BY-SA
- [[open-source-game/exult]] — Ultima VII 游戏引擎清洁室重实现，SDL 跨平台，完整支持《黑门》+《毒岛》，GPL v2，~48K LOC C++
- [[open-source-game/u7-revisited]] — Ultima VII: The Black Gate 3D 重制引擎，Ghost（raylib 3D渲染）+ Geist（Lua脚本）双引擎架构，~49.5K LOC C++
- [[open-source-game/gemrb]] — Infinity Engine 重实现（Baldur's Gate / Icewind Dale / Planescape: Torment），C++14 + Python3 脚本，40+ 插件化架构，46K LOC 核心引擎，GPLv2

||
||| [[open-source-game/commander-keen-in-keen-dreams]]
| [[open-source-game/doom-3-bfg]] — id Tech 4 引擎源码，含 Portal 渲染、Lua 脚本、BFG Edition 收录 Doom Classic，GPL |
| [[open-source-game/doom-64-re]] — Doom 64 完全逆向工程，C+MIPS 汇编，N64 SDK 交叉编译，~50K LOC C |
||| [[open-source-game/doom]] — id Software 经典 FPS，1997年 Carmack 开源，BSP 树渲染，GPLv2，约 54K LOC C |
| [[open-source-game/quake]] — 1996 年 3D FPS 里程碑，WinQuake+GLQuake+QuakeWorld，GPLv2，约 87K LOC C |
| [[open-source-game/quake-2]] — 1997 年 3D FPS，双渲染器架构（OpenGL + Software），143K LOC C，GPLv2 |
| [[open-source-game/quake-iii-arena]] — id Software 竞技场射击，QVM 虚拟机架构，纯多人竞技，GPL |
| [[open-source-game/chocolate-doom]] — 精准还原 DOS Doom（含 bug）的开源端口，SDL2 跨平台，GPL |
| [[open-source-game/chocolate-quake]] — 精准还原 Quake v1.09 DOS 体验，Bug 兼容优先，纯软件渲染，C99+CMake |
| [[open-source-game/fteqw]] — 先进可移植 Quake 引擎，多后端渲染(OpenGL/Vulkan/Software/D3D)，GPL-2.0 |
| [[open-source-game/uzdoom]] — GZDoom/ZDoom 延续，双渲染器架构(OpenGL/Vulkan+软件)，ZScript 虚拟机，~592K LOC C++ |
| [[open-source-game/assault-cube]] — CUBE Engine 派生 FPS，ZLIB 极宽松许可，低延迟 ENet 网络，协作地图编辑 |
| [[open-source-game/cube-2-sauerbraten]] — CUBE Engine 2 代体素 FPS，实时游戏内地图编辑，ENet UDP，~65K LOC C++ |
| [[open-source-game/red-eclipse]] — 竞技场射击，Tesseract（Cube 2 派生）引擎，跑酷射击融合，内置协作地图编辑器，GPLv3 |
| [[open-source-game/xonotic]] — Darkplaces 引擎（Quake 分支），精湛移动机械（Bunny Hop/Strafe Jump），.pk3dir 数据包格式，GPLv3 |
| [[open-source-game/liblast]] — Godot 4 多人 FPS，Freeman Character System + Godot Jolt 物理，⚠️ 主仓库已弃用迁移至 liblast-framework |
| [[open-source-game/supertuxkart]] — 开源卡丁车派对游戏，Bullet Physics 趣味物理，ENet UDP + 事件回滚网络同步，约 274K LOC C++ |
| [[open-source-game/kkrieger]] — Farbrausch 96KB demo 工具链，Werkkzeug3 引擎分支，Portal 渲染/6-Pass 光照/V2 合成器，约 122K LOC C++ |
| [[open-source-game/descent-3]] — 经典 6DOF 太空射击，SDL3+OpenGL 跨平台，GPL-3.0，需原版游戏数据 |
| [[open-source-game/avp-forever]] — Aliens versus Predator (1999) 源码维护，多分支 rebasing 策略叠加各分支源码 |
| [[open-source-game/beyond-all-reason]] — Spring/Recoil 引擎 RTS 游戏，约4.3GB仓库（含资源），Lua数据驱动，GL4着色器，BARb AI JSON配置分层设计 |
- [[open-source-game/nakedavp]] — Aliens vs Predator Classic (2000) SDL3 现代化端口，双渲染器自动降级（OpenGL/GLES2）
- [[open-source-game/naev]] — 2D 太空贸易战斗 RPG，灵感来自 Escape Velocity 系列，C+Rust 混合 + Meson 构建，SDL3+OpenGL 3.3+，GPLv3，插件系统支持
- [[open-source-game/ambermoon-net]] — Ambermoon 经典 RPG 的完整 C# 重写，多平台（Win/Linux/Mac），.NET 6，模块化架构（Core/Data/Renderer/Frontend 分层），MIT
- [[open-source-game/oolite]] — Elite (1984) 风格太空开放世界贸易战斗，Objective-C + C 双后端架构(Cocoa+SDL)，GPLv2，OXP 插件扩展系统，无原版游戏数据依赖
- [[open-source-game/omnispeak]] — Commander Keen 4/5/6 开源重实现，多后端渲染架构（SDL2/GL/Vulkan/SDL3），Nuked OPL3 FM 合成器，约 51.8K LOC C
| [[open-source-game/the-dark-mod]] — Doom 3/id Tech 4 引擎潜行 FPS，AAS 区域感知+AI 通信子系统，170+ 社区任务 |
| [[open-source-game/duke-nukem-3d]] — 3D Realms 经典 FPS，Build Engine 驱动，Ken Silverman Sector/Portal 渲染，GPLv2 |
| [[open-source-game/eduke32]] — 先进 Build Engine 端口，多游戏支持(Duke3D/SW/Blood/Ion Fury)，~116K LOC C++，GPLv2 |
| [[open-source-game/raze]] — Build engine 多游戏合一引擎，GZDoom 技术栈，三渲染器架构(GL/GLES/Vulkan)，~578K LOC C++ |
| [[open-source-game/jfduke3d]] — Jonathon Fowler 的 Duke Nukem 3D 开源移植版，SDL2 跨平台，Polymost OpenGL 渲染，GPLv2 |
| [[open-source-game/jfshadowwarrior]] — Jonathon Fowler 的 Shadow Warrior 现代端口，Polymost OpenGL/GLES2，多平台，GPLv2 |
| [[open-source-game/buildgdx]] — Build Engine 的 Java/LibGDX 跨平台移植，三渲染器，支持 Duke3D/Shadow Warrior/Blood，~74K LOC Java |
| [[open-source-game/nubuildgdx]] — BuildGDX 稳定化分支（stability-first fork），atsb 维护，libGDX 1.9.10 旧依赖 |
| [[open-source-game/nblood]] — Blood / Exhumed / Redneck Rampage 逆向工程端口，基于 EDuke32，GNU Make 跨平台构建 |
| [[open-source-game/rigel-engine]] — Duke Nukem II 清洁室逆向重实现，C++17/SDL2+OpenGL 双渲染器，~45K LOC，GPLv2 |
| [[open-source-game/ecwolf]] — Wolfenstein 3D 增强源码端口，ZDoom 体验+原版 Raycasting，~67K LOC C++，CMake+SDL2 |
| [[open-source-game/wolf4sdl]] — Wolfenstein 3D SDL 移植版，OPL2 双模拟器（GPL/MAME），version.h 多版本条件编译 |
| [[open-source-game/shadow-warrior]] — 3D Realms 经典 FPS，Build 引擎，118K LOC C，GPL+商业数据双许可 |
| [[open-source-game/wolfenstein-3d]] — id Software 1992 经典 FPS，Raycasting 渲染，Borland C++ 3.0 + 80x86 汇编 |
| [[open-source-game/scummvm]] — 经典图形冒险引擎复刻，支持141+游戏引擎（SCUMM/Myst/Blade Runner等），GPLv3+ |
| [[open-source-game/super-mario-64]] — N64 经典 3D 平台跳跃完整反编译源码，2746 C 文件，多版本构建，GPLv2 |
| [[open-source-game/portal64]] — Valve Portal N64 demake，移除 libultra 私有库，Skeletool64 骨骼动画+显示列表生成，17 室可玩，EPA/GJK 碰撞，约 41K LOC C |
| [[open-source-game/vvvvvv]] — 重力翻转像素平台游戏，SDL2 极简依赖全部静态链接，Entity 159K+Game 229K+Editor 141K LOC，完整内置关卡编辑器 |
| [[open-source-game/surreal-engine]] — Unreal Engine 1 清洁室重实现，C++20/D3D11+Vulkan 双渲染器，~99K LOC |
| [[open-source-game/micropolisjs]] — SimCity 经典城市模拟 JavaScript 移植版，TypeScript+JS 混合，BlockMap 多维度追踪，GPLv3 |
| [[open-source-game/openttd]] — Transport Tycoon Deluxe 开源复刻，C++/CMake/vcpkg，SDL2+OpenGL，多人锁步网络，NewGRF 图形扩展 |
| [[open-source-game/open-goal]] — Jak & Daxter PC 移植，2.3M LOC GOAL 反编译+自研 GOAL 编译器+decompiler，Jak1 Complete/Jak2 Beta |
||| [[open-source-game/openrct2]] — RollerCoaster Tycoon 2 开源重实现，C++20/CMake/Duktape JS插件引擎，TCP/IP多人合作 |
- [[open-source-game/openrw]] — GTA III 清洁室重实现开源引擎，rwcore/rwengine/rwgame 模块化架构，OpenGL + Bullet Physics + SDL2，GPLv3，需原版游戏数据
- [[open-source-game/openlara]] — 古墓丽影经典引擎开源重实现，多后端渲染架构（OpenGL/D3D8/D3D9/D3D11/Vulkan/Software），32 平台支持，固定点数学引擎，BSD 2-Clause
- [[open-source-game/croftengine]] — Tomb Raider 1 引擎重制，v2.5.0，LGPLv3，支持幽灵竞速/合作/Glidos 纹理包，FFmpeg 视频解码，双渲染器架构(OpenGL+软件)，Boost+spdlog+FFmpeg 依赖栈
- [[open-source-game/tomb-engine]] — Tomb Raider 1-5 引擎清洁室重实现，~180K LOC C++，sol2 Lua 绑定三层 ScriptInterface(Game/Level/State)，SMAA+SSAO+高帧率现代渲染管线，支持无缝关卡转换+无限制地图大小，MIT 修改版
- [[open-source-game/lugaru]] — 跨平台 3D 动作游戏，兔人 Turner 武斗狼族阴谋，C++/SDL2/OpenGL ~38K LOC，双层骨骼动画插值（animCurrent+frameTarget），9种AI行为状态机（passive/guard/attack等），GPLv2+源码/CC BY-SA 3.0 资产双许可
- [[open-source-game/overgrowth]] — Lugaru 续作，3D 动作冒险游戏，~227K LOC C++ 自研引擎（SDL2+OpenGL），AngelScript 脚本+Bullet Physics+Recast 导航，Apache 2.0 极宽松许可，需商业版游戏数据
||||| [[open-source-game/openra]] — C# RTS 引擎
|| [[open-source-game/openbw]] — StarCraft: Brood War 核心引擎清洁室重实现，header-only C++ 架构（bwgame.h 22K行），确定性锁步网络 sync.h，BWAPI 兼容层 mini-openbwapi |
|| [[open-source-game/openkore]] — Ragnarok Online 自动化助手，Perl + C XS 扩展，Task 链式 AI 架构，三模式连接（XKore/XKore2/XKoreProxy），txt 数据驱动配置，GPLv2 |
- [[open-source-game/minosoft]] — Minecraft 客户端完全从零重写（Kotlin/Java ~27K LOC），三模块架构（Core/Eros/Rendering），支持 1.7-1.20.4 多版本协议，Netty 网络层，事件驱动渲染，zstd 资产压缩，GPLv3
- [[open-source-game/openko]] — Knight Online (1298/9) 清洁室逆向开源复刻，双端分离架构（Client DirectX9 + Server 跨平台 CMake），~265K LOC C++，多进程服务器(AIServer/Ebenezer/Aujard/ItemManager)，自定义二进制网络协议(LZF压缩+JvCryption加密)，学术目的，早期开发
| [[open-source-game/openloco]] — Chris Sawyer's Locomotion 清洁室逆向重实现，C++/SDL3，运输帝国经营模拟 |
| [[open-source-game/corsixth]] — Theme Hospital 开源克隆，C++/Lua 混合架构，SDL 渲染，数据驱动游戏逻辑 |
| [[open-source-game/keeper-fx]] — Dungeon Keeper 开源增强版，A* 寻路(ariadne)+Lua 脚本 API+ENet 多人，~235K LOC C/C++，GPLv2 |
| [[open-source-game/julius]] — Caesar III 清洁室重实现，SDL2 跨平台，100% 存档兼容，约93K LOC C |
| [[open-source-game/akhenaten]] — Pharaoh 法老城市建造游戏开源重实现，Julius/Augustus 分支，SDL2 跨平台，GNU AGPL |
| [[open-source-game/citybound]] — 微观模型城市建造，Rust Actor模型(kay)，协作规划理念，浏览器WebGL UI |
| [[open-source-game/unknown-horizons]] — 2D 实时策略城市建造模拟，FIFE→Godot 4 移植项目，GDScript |
| [[open-source-game/egregoria]] — Cities: Skylines 风格 Rust 城市建造，确定性锁步网络，PBR wgpu 渲染器 |
| [[open-source-game/pioneer]] — 31世纪银河太空冒险RPG，程序化星系/经济/派系系统，开放世界探索+贸易+战斗 |
| [[open-source-game/zelda3]] — Zelda A Link to the Past 完全重实现，70-80kLOC C，SNES 仿真层+逐帧 RAM 验证 |
| [[open-source-game/the-legend-of-zelda-twilight-princess]] — Zelda TP 反向工程，字节级匹配反编译，多版本条件编译架构 |
|| [[open-source-game/dead-ascend]] — Qt/QML 手绘点击冒险游戏，僵尸塔楼密室解谜，Tiled TMX 地图格式，跨平台 |
|- [[open-source-game/hnefatafl]] — 北欧棋（Hnefatafl）Copenhagen 风格完整解决方案：引擎(GTP风格协议)+客户端(Iced)+服务器+AI，约 9017 LOC Rust，AGPLv3 |
|||| [[open-source-game/dune-ii-the-maker]] — C++23 重制 Dune II，SDL2 全家桶，三速 tick 游戏循环(thinkFast/Normal/Slow)，cGameState 状态机，cPlayerBrain Mission 队列 AI，INI 配置驱动数据，superweapon 系统(DeathHand/Fremen/Saboteur) |
||| [[open-source-game/command-conquer-remastered-collection]] — EA 官方开源 C&C 泰伯利亚黎明+红色警戒源码，C + 内联汇编 + C# 地图编辑器，GPL v3，需持有原版游戏 |
||| [[open-source-game/cn-c-red-alert]] — EA 官方红色警戒(1996)源码，Westwood DOS 游戏，C++17.9MB/Assembly 5.1MB 多层架构(CODE/WIN32LIB/VQA/IPX)，Watcom+TASM 编译，GPL v3 |
||| [[open-source-game/torcs]] — 开源 3D 赛车模拟器，plib OpenGL 渲染，模块化物理仿真(simu)，标准化 Robot AI 接口，广泛用于学术研究 |
| [[open-source-game/rigs-of-rods]] — 软体物理沙盒，节点-弹簧车辆形变实时仿真，OGRE 1.11 + AngelScript，2005 年项目，GPLv2 |
| [[open-source-game/ddnet]] — Teeworlds DDRace 模组社区延续版，合作 2D 平台跳跃，C++/Rust 混合架构，CMake+Ninja 构建 |
| [[open-source-game/sonic-robo-blast-2]] — 3D 索尼克同人作，基于 Doom Legacy 双渲染器（OpenGL+SDL2），Lua 脚本+DEHACKED 扩展，252K LOC C |
| [[open-source-game/frogatto]] — Anura 引擎动作冒险平台跳跃游戏，引擎/模块分离架构，FFC 数据驱动脚本，16 语言本地化 |
| [[open-source-game/fish-folk-jumpy]] — Fish Folk 战术 2D 射击游戏，Bevy/Rust + rapier2d 确定性物理，2-4 人本地/联机，bones_framework 游戏框架 |
| [[open-source-game/fish-folk-punchy]] — Fish Folk 2.5D 清版动作游戏，Bevy 0.9 + Rapier2D 物理，figher_state.rs 2228 行状态机，支持 WASM/Web 原生运行 |
| [[open-source-game/commander-genius]] — Commander Keen 1-6 + Dreams 开源解释器，C++ 完全重写（仅存 0.02% CloneKeen 代码），SDL2+OpenGL，LUA Mod，多人 4 人支持 |
| [[open-source-game/whatajong]] — 麻将消消乐 Roguelite，Solid.js + TypeScript + Electron，Vanilla Extract CSS，rand-seed 确定性随机，Howler.js 音频，MIT |
| [[open-source-game/blockout-ii]] — 3D 俄罗斯方块，C++/OpenGL/SDL，评估函数 Bot AI + 回放系统 + 在线排行榜，GPLv2，~12K LOC |
| [[open-source-game/stunt-rally-3]] — 3D 科幻赛车+Ogre-Next 渲染+VDrift 仿真，内置赛道编辑器，232 条赛道，33 辆载具，GPLv3 |
| [[open-source-game/rvgl]] — Re-Volt 现代跨平台复刻，SDL2+OpenGL/Vulkan，核心私有+工具链/资产开源，Pack 内容管理系统，支持 16 人多人 |
| [[open-source-game/yorg]] — TrackMania 风格开源赛车，Panda3D 引擎驱动，Python 3.x，多人 XMPP 同步，GPLv3 |
- [[open-source-game/fallout-community-edition]] — Fallout 1 引擎清洁室重实现，SDL2 跨平台，135K LOC C++，保留原版 gameplay + bugfix + QoL 改进，MIT
- [[open-source-game/fallout2-ce]] — Fallout 2 清洁室重实现，C++17/SDL2 多平台支持(GitHub API 分析：4.5MB+ C++，378 源码文件)，Sfall 兼容性层，保留原版 gameplay+bugfix+QoL，需原版游戏数据
- [[open-source-game/dungeon-crawl-stone-soup]] — 经典 Roguelike，~412K LOC C++，双模式渲染(ASCII+SDL Tiles)，.des Vault 手绘关卡，17+ 神祇契约，数据驱动配置，GPLv2+，20年迭代
|| [[open-source-game/opennefia]] — Elona 日本 roguelike RPG 的模块化开源引擎复刻，.NET 8.0 + Love2dCS，Harmony 运行时补丁 + NuGet Mod 加载器，2058 C# + 436 Lua 文件
|| [[open-source-game/openmw]] — Morrowind 引擎清洁室重实现，C++20 + OpenSceneGraph + Bullet Physics，双脚本系统(遗留MWScript+现代Lua)，完整工具链(opencs/bsatool/esmtool/navmeshtool)，GPLv3，v0.51.0
|| [[open-source-game/nethack]] — 经典 Roguelike 地下城探索，Rogue/Hack 直系后裔，3.7 开发中；纯 C 无引擎架构
|| [[open-source-game/brogue-ce]] — 极简主义 Roguelike，Pure C 代码库，22个.c模块+Dijkstra寻路+确定性游戏回放系统
- [[open-source-game/shattered-pixel-dungeon]] — 传统 Roguelike 地牢爬行器，libGDX 跨平台架构（Desktop/Android/iOS），Java/JDK 21，程序化关卡生成，5 大区域+天赋系统，6k stars，GPLv3
- [[open-source-games-list]] — GitHub 开源游戏精选列表：18+ 品类（FPS/RPG/RTS/Roguelike/城市建造等），含源码链接 |

- [[open-source-game/trigger-rally]] — 纯 C++ 拉力赛车游戏，PEngine/PSim/Trigger 三层架构，程序化地形高度图生成，GPL v2
- [[open-source-game/vdrift]] — 开源漂移赛车模拟器，Bullet 物理 + SDL3
- [[open-source-game/wipeout-rewrite]] — wipEout (1995 PSX) 清洁室重实现，纯 C 双平台后端(SDL2/Sokol) + 三渲染器架构
| [[open-source-game/kandria]] — Common Lisp 动作 RPG，TRIAL 引擎 + alloy OpenGL 渲染，~19K LOC 全 Lisp，BVH2 碰撞检测，内置关卡编辑器
- [[open-source-game/meritous]] — PSI 能量攻击动作地牢探索，纯 C + SDL 程序化地牢生成，约 10K LOC，GPLv3
- [[open-source-game/sdl-sopwith]] — 经典一战双翼机射击游戏 SDL 移植版，平台抽象架构(src/核心+sdl/平台层)，TCP/IP 多人，PC Speaker 音效模拟，自定义 .sop 关卡格式，GPLv2
- [[open-source-game/taisei]] — 东方 Project 同人弹幕射击游戏，C11 + SDL3 + OpenGL 自研渲染管线，~3.2M LOC C，多平台支持（Win/Linux/macOS/Web/Nintendo Switch）
- [[open-source-game/warzone-2100]] — 开源 3D RTS，含剧情战役+10人多人，157K LOC C++，多渲染后端(OpenGL/Vulkan/GLES)，400+科技树
- [[open-source-game/zero-k]] — Spring Engine 纯 Lua 游戏内容仓库，GadgetHandler 模块化事件驱动，物理弹道+智能单位预判，PBR 自定义 Shader，GPL v2
- [[open-source-game/war1gus]] — Warcraft: Orcs & Humans 重实现，基于 Stratagus 引擎，C++17 + Lua 脚本数据驱动，GPLv2
- [[open-source-game/stargus]] — StarCraft 1998 资产导入 Stratagus 引擎的工具，多格式转换层（GRP/CHK/CASC/SMACKER），startool MPQ 提取，约 15K LOC C++，GPLv2
- [[open-source-game/wargus]] — Warcraft II mod using the Stratagus engine，wartool 数据提取工具链（wartool.cpp 3432 LOC），GPLv2
- [[open-source-game/warsmash-mod-engine]] — Warcraft III 模拟器，LibGDX + Java17，~97K LOC，多模块 Gradle，JASS ANTLR 虚拟机，虚拟文件系统支持 MPQ/CASC，AGPL
- [[open-source-game/widelands]] — Settlers II 风格开源 RTS，~301K LOC C++，CMake/SDL2+OpenGL，Lua 脚本驱动，Flag-Route 经济链，帧同步多人
- [[open-source-game/wyrmsun]] — 融合神话/历史/虚构元素的多文明 RTS，基于 Stratagus 引擎（Wyrmgus），数据仓库架构，双仓库设计（引擎+内容），持久英雄+物品掉落，GPL 2.0

## Concepts

|| [[agent-loop]] — AI Agent 核心执行循环：LLM推理↔工具调用，nanobot loop.py 750行实现 |
|| [[provider-registry]] — 插拔式 LLM Provider 架构，添加新Provider仅需2步元组注册 |
|| [[channel-system]] — 统一 Message Bus 解耦多聊天平台，Telegram/Discord/Feishu 等13渠道 |
|| [[memory-system]] — Dream 两阶段记忆系统：Consolidator压缩 + Dream整合写入，GitStore版本化 |
|| [[nanobot]] — HKUDS 开源极轻量 AI Agent，~2258行核心代码，22+ Provider，13渠道 |
|| [[openclaw]] — nanobot 设计灵感来源，43万行压缩到4000行，极简 Agent 架构 |
|| [[hkuds]] — 香港大学数据科学实验室，nanobot + ClawTeam 开发主体 |
|| [[clawteam]] — HKUDS Agent Swarm 框架，任意CLI Agent组队协作，8×8 H100 GPU自动化实验 |
|| [[agent-swarm]] — Agent组成蜂群协作的设计模式：Leader拆解+Worker并行+inbox消息+git worktree隔离 |
|| [[deer-flow]] — ByteDance Super Agent Harness，LangGraph+LangChain，12步middleware链，Sandbox+Subagent+Memory |
|| [[deer-flow-sandbox]] — 双向路径映射+输出反向掩码，最长前缀匹配，segment boundary保护，LocalSandbox实现 |
|| [[deer-flow-subagent]] — 三线程池架构(scheduler/execution/isolated)，SSE事件流，config.yaml超时覆盖 |
|| [[deer-flow-memory]] — Fact提取+Debounce队列+XML标签注入，category分类(deer-flow vs nanobot Dream对比) |
| [[deer-flow-runtime]] — RunManager生命周期+StreamBridge生产消费解耦+Checkpointer+KVStore |
| [[langgraph]] — LangChain多Agent编排框架，图结构建模工作流，内置checkpointing和streaming |
| [[autonomous-llm-research]] — Autonomous LLM Research 范式：AI agent 自主修改代码/超参 → 运行实验 → 评估 → 迭代，val_bpb 评估指标 |
| [[muon-optimizer]] — Karpathy 实验发现的 custom optimizer：梯度空间优化 + Polar Express 正交化 + AdamW 处理非矩阵参数，MuonAdamW |
| [[Eino]] — 字节跳动自研 LLM 应用框架，CloudWeGo 生态，Model/Chain/Agent/Workflow/Memory/Tool 抽象，多模型统一接入 |
| [[FlowGram]] — 字节跳动自研可视化工作流引擎：固定/自由双布局 + 拖拽节点 + AI 集成，Coze Studio 前端编辑器 |
| [[ai-agent-development-platform]] — AI Agent 开发平台通用概念：Prompt/RAG/Plugin/Workflow 核心组件，Coze Studio/DeerFlow/nanobot 等代表平台对比 |
| [[multi-agent-interactive-classroom]] — 多Agent扮演教师/学生协作教学：Outline→Scenes两阶段 + 幻灯片/Quiz/模拟/PBL 组件 |
| [[ai-game-devtools-catalog]] — Yuan-ManX 维护的 AI 游戏开发工具目录：840+ 项目覆盖16大类，与 [[openmaic]] 完全无关 |
|||| [[baichuan-7b]] — 百川智能 7B 双语开源LLM，Transformer+RoPE+SwiGLU，中文C-Eval同尺寸SOTA，允许商业使用 |
||||| [[baichuan-13b]] — 百川智能 13B 双语开源LLM，ALiBi位置编码，int8/int4量化，1.4万亿tokens训练，中文C-Eval/MMLU同尺寸SOTA，Apache 2.0+社区许可，可商用 |
||||| [[baichuan-2]] — 百川智能新一代开源LLM，7B/13B，2.6万亿tokens训练，benchmark全面超越LLaMA2-13B，商用需邮件申请 |
||||| [[bisheng]] — DataElement 开源 LLM 应用 devops 平台，企业级工作流编排+多Agent协作+Docker部署，支持 RBAC/SSO/LDAP |
|||| [[ai-scientist]]
| [[babyagi-ui]] — miurla 浏览器端 BabyAGI UI：Next.js + LangChain.js + Pinecone，ChatGPT 风格界面运行自主 Agent，支持并行任务和 Skills 系统 |
| [[langchain]] — LLM应用开发框架，Chain/Agent/Memory/Tool/Prompt抽象，LangGraph基础 |
|| [[sandbox]] — 隔离执行环境模式：虚拟路径+容器/进程级隔离，DeerFlow/nanobot核心基础设施 |

## Comparisons

|| [[godot-vs-unity-unreal]] — Godot vs Unity vs Unreal：许可/2D/3D/选型指南 |
|| [[open-source-game-engines-comparison]] — 开源游戏引擎对比：Godot/Bevy/CUBE/Spring/OpenMW，含公司项目推荐 |

## AI Game DevTools

||| [[ai-game-devtools/deepseek-r1]] — DeepSeekAI 推理模型：纯 RL 涌现推理能力，671B MoE，蒸馏版 Qwen-32B 超越 o1-mini，MATH-500 97.3% |
||| [[ai-game-devtools/qwen1.5]] — Alibaba 通义千问 LLM 系列（Qwen1.5→Qwen3），0.6B-235B 参数含 MoE，多语言+Agent+工具调用，100+语言，256K-1M context，Apache 2.0 |
|||| [[ai-game-devtools/qwen2]] — Alibaba 通义千问第二代 LLM，0.5B-72B，支持 vLLM/SGLang/llama.cpp，Apache 2.0，Qwen1.5 后继版本 |
|||| [[ai-game-devtools/qwen3]] — Alibaba 通义千问第三代：MoE（235B-A22B/30B-A3B）+Dense（4B~32B），thinking/non-thinking 双模式，100+语言，256K-1M context，Apache 2.0 |
||||| [[ai-game-devtools/qwen2.5-coder]] — Alibaba 通义千问代码模型（Qwen2.5-Coder→Qwen3-Coder），358 语言，256K context，Agentic Coding 支持 Qwen Code/CLINE/Claude Code，Apache 2.0 |
||||||| [[ai-game-devtools/repoagent]] — OpenBMB 仓库级代码文档生成框架：Git 变更检测 + Jedi AST 分析 + LLM 生成 Markdown 文档，支持 pre-commit 钩子自动更新文档、Chat With Repo RAG 问答，Apache 2.0 |
||||||| [[ai-game-devtools/s1]] — SimpleScaling 测试时扩展 LLM：Qwen2.5-32B 微调 + Budget Forcing，仅 1K 样本达到 o1-preview 水平，MIT |
|| [[ai-game-devtools/sanity-ai-engine]] — Unity 游戏 AI 引擎：经典路径规划（A*/LPA*）+ 转向行为 + 图抽象层，MIT |
||| [[ai-game-devtools/scikit-llm]] — 将 LLM 集成到 scikit-learn：零/少样本分类、摘要、翻译、NER、向量化，支持 OpenAI/Vertex/Claude 三 Provider，sklearn Pipeline 兼容，MIT |
||| [[ai-game-devtools/seed-oss]] — ByteDance 36B 开源 LLM（Base/Instruct），512K 上下文 + Thinking Budget 控制，SWE-Bench 47% / TAU1-Retail 70.4%（开源 SOTA），Apache 2.0 |
||| [[ai-game-devtools/yi]] — 01.AI 零一万物双语 LLM 系列（6B/9B/34B），3T tokens 预训练，AlpacaEval 第二名（仅次于 GPT-4 Turbo），Yi-VL 多模态模型 MMMU 基准开源第一 |
|| [[ai-game-devtools/search-gpt]] — 早期 RAG 概念验证 CLI：Google CSE + GPT-3.5-turbo，实时网页抓取+token感知上下文注入，MIT |
|| [[ai-game-devtools/skythought]] — NovaSky AI 推理模型训练+评测框架：Sky-T1 系列（32B/7B/mini）基于 Qwen-32B 微调，全量开源数据和权重，skythought CLI 支持 15 种推理 benchmark 评测，Apache 2.0 |
|| [[ai-game-devtools/skywork]] — Kunlun Group 双语 LLM 系列（13B-Base/Chat/Math/MM），3.2T tokens 训练，65K 中文词表，GSM8K 13B 量级第一（72.33），Skypile-150B 中文语料，Skywork Community License |
||||| [[ai-game-devtools/opendevin]]
||| [[ai-game-devtools/hunyuan-mt]] — 腾讯混元 7B 翻译模型，支持 33 种语言（含 5 种中国少数民族语言），WMT25 竞赛 30/31 方向冠军，Chimera 集成翻译架构 |
||| [[ai-game-devtools/open-assistant]] — LAION 开源聊天大模型，InstructGPT 三阶段训练（SFT/RM/RLHF），已完成项目，oasst2 数据集发布于 HuggingFace |
|| [[ai-game-devtools/gemma]] — Google 轻量级开源 LLM 家族（Gemma 1/2/3），PyTorch 官方实现，支持 CPU/GPU/TPU，含 multimodal 变体 |
| [[ai-game-devtools/gemma-cpp]] — Google 纯 C++ LLM 推理引擎（Gemma 2/3/RecurrentGemma/PaliGemma 2），~2K LoC 核心，Google Highway SIMD，无外部 ML 框架，Apache 2.0 |
| [[ai-game-devtools/tinychatengine]] — MIT Han Lab 端侧 LLM/VLM 推理引擎，纯 C/C++ 无外部依赖，AWQ/SmoothQuant 4-bit 量化支持 Llama-3/CodeLLaMA/VILA，MLSys 2024 Best Paper，MIT |
|||| [[ai-game-devtools/imagebind]] — Meta AI 六模态联合嵌入模型：图像/文本/音频/深度/热成像/IMU 统一到同一向量空间，零样本跨模态检索，CVPR 2023，CC BY-NC 4.0 |
||||| [[ai-game-devtools/vitron]] — Skywork AI 统一像素级视觉 LLM（NeurIPS 2024），覆盖图像/视频理解+生成+分割+编辑四大任务，Vicuna 基座 + GLIGEN/SEEM/StableVideo 专家模块，Apache 2.0 |
||||| [[ai-game-devtools/cambrian-1]] — NYU Vision X/Yann LeCun/Saining Xie 开源 VLM（8B/13B/34B），SVA 多 encoder 视觉聚合器，576 固定视觉 tokens 超越 LLaVA-NeXT 2880 tokens 方案，CV-Bench 评测基准，Apache 2.0 |
||||| [[ai-game-devtools/vila]] — NVIDIA 开源 VLM 家族（NVILA/VILA1.5/LongVILA），视频+多图理解，A100 TinyChat 186 tok/s，MMMU/Video-MME 开源 SOTA，Apache 2.0 |
||||||||||||| [[ai-game-devtools/longva]] — S-Lab/NTU 长视觉上下文 LLM（7B），2000帧/200K+视觉 tokens，文本上下文扩展技术零样本迁移到视觉域，Video-MME 7B SOTA，S-Lab License |
|||||||||||| [[ai-game-devtools/sapiens]] — Meta 人体视觉基础模型（0.3B/0.6B/1B/2B），覆盖 2D pose/部位分割/深度/法线，原生 1024×1024，3亿图像预训练，ECCV 2024 Best Paper Candidate |
||||||||||| [[ai-game-devtools/onellm]] — CVPR 2024 统一多模态框架：8种模态（图像/视频/音频/点云/深度法线/IMU/fMRI），ImageBind 编码器 + 三阶段训练 |
||||||||||| [[ai-game-devtools/glm-v]] — ZhipuAI 开源 VLM 系列（GLM-4.6V 106B / GLM-4.1V-9B），原生多模态函数调用 + CoT 推理，128K context，10B 级最强 VLM 超越 Qwen2.5-VL-72B 在18项任务，Apache 2.0 |
||||||||||| [[ai-game-devtools/points-reader]] — Tencent 蒸馏-free 文档提取 VLM（3B），POINTS1.5 架构+Qwen2.5-3B，EMNLP 2025，OmniDocBench EN SOTA 0.133，支持 SGLang/vLLM |
| [[ai-game-devtools/qwen-vl]] — 阿里 VLM 系列（Qwen-VL/Chat/Plus/Max/Int4），448×448 高分辨率，中英双语 OCR SOTA，RefCOCO 定位 89.36%，Qwen-VL-Max 超越 GPT-4V 在 DocVQA 93.1%，支持 LoRA/Q-LoRA 微调 |
||||||||||| [[ai-game-devtools/llava-plus-plus]] — MBZUAI LLaVA 1.5 扩展：Phi-3-V（3.8B）+ LLaMA-3-V（8B），CLIP ViT-L/14 336px，LoRA/全量微调，Apache 2.0 |
||| [[ai-game-devtools/llava-onevision]] — LLaVA-VL 开源 VLM（0.5B/7B/72B），SIGLIP-SO400M + Qwen-2.0，单图+多图+视频统一理解，47 benchmark SOTA 媲美 GPT-4V，支持 SGLang 部署 |
|||||||||||| [[ai-game-devtools/dots-vlm1]]
| [[ai-game-devtools/sharegpt4v]] — USTC 上海AI Lab VLM 数据集+模型（7B/13B），GPT4V生成100K+1.2M高质量字幕，LLaVA架构+CLIP视觉编码+Vicuna基座，ECCV 2024 |
|||||||| [[ai-game-devtools/lumina-dimoo]] — Alpha-VLLM 全模态离散扩散生成+理解模型：DiMOO 架构统一 T2I/I2I/图像修复/外绘/视觉 QA，VQ 离散码 + 去噪扩散，ML-Cache 2× 加速，A800 58.2s→32.2s，UniGenBench 开源统一模型第一 |
 || [[ai-game-devtools/kangaroo]]
 | [[ai-game-devtools/kwai-keye-vl]] — 快手可灵 VLM 系列（8B/671B），SigLIP+SlowFast Video Encoding，视频理解 SOTA，128K context，Apache 2.0 |
 | [[ai-game-devtools/video-llava]] — PKU-YuanGroup 统一图像+视频 VLM
||||||||| [[ai-game-devtools/evf-sam]] — HUST/vivo AI Lab 开源指代表达分割模型：SAM + BEIT-3 视觉-语言早期融合，文本提示分割图像/视频目标，支持多任务（部位/语义/指代），gIoU 84.2，Apache 2.0 |
|||||||| [[ai-game-devtools/mplug-owl]]
|||| [[ai-game-devtools/moe-llava]] — PKU-YuanGroup MoE-VLM（2-3.6B 激活参数），Top-2 稀疏激活比肩 LLaVA-1.5-7B，Phi-2/Qwen/StableLM 多 backbone，IEEE TMM 2025，Apache 2.0 |
|||| [[ai-game-devtools/jan]] — Janhq
|||| [[ai-game-devtools/janus]] — DeepSeek 统一多模态模型（Janus/JanusFlow/Janus-Pro 1B-7B），解耦视觉编码器分离理解与生成任务，单一自回归 transformer 处理图文，arXiv 2024-2025 |
||||||| [[ai-game-devtools/minigpt-4]] — Vision-CAIR/EAIST VLM：冻结 ViT+Q-Former 连接冻结 LLM（Vicuna/LLaMA-2），两阶段对齐训练，图像描述/故事生成/游戏资产理解，BSD 3-Clause |
||| [[ai-game-devtools/pllava]] — NUS 参数自由 LLaVA 视频扩展：时序池化策略解决 dominant patch 问题，Video ChatGPT 3.48/5 SOTA（+0.31 超 GPT4V），MVBench 58.1%（+14.5% 超 GPT4V），7B/13B/34B |
||| [[ai-game-devtools/video-agent]] — ECCV 2024 记忆增强多模态 Agent：Temporal+Object 双层记忆系统 + LangChain ReAct，GPT-4o 驱动工具调用回答视频问题，Video-LLaVA/GPT-4V 双 VQA 后端 |
|| [[ai-game-devtools/video-ccam]] — 腾讯多媒体团队视频-语言大模型（4B/7B/9B/14B），Causal Cross-Attention Masks 机制提升长短视频理解，Video-MME 57.4（有字幕），开源 MLLM SOTA |
|| [[ai-game-devtools/video-llava]] — PKU-YuanGroup 统一图像+视频 VLM
| [[ai-game-devtools/videollama2]] — DAMO-NLP-SG 视频-语言多模态 LLM（7B~72B），MLVU/VideoMME 双榜单 Top-1，SigLIP/Qwen2 架构，支持音频-视觉联合推理，Apache 2.0 |
|| [[ai-game-devtools/video-llama-3]] — DAMO-NLP-SG 视频-图像多模态模型（7B/2B），基于 Qwen2.5 + SigLIP NaViT，LVBench/VideoMME 7B SOTA，Apache 2.0
|| [[ai-game-devtools/video-mamba]] — OpenGVLab Mamba SSM 视频理解模型（3M-306M），线性复杂度 O(n)，自蒸馏预训练 + CLIP 教师指导，支持 K400/SthSthV2/Breakfast/COIN/LVU 视频任务，Apache 2.0
|| [[ai-game-devtools/video-mme]] — CVPR 2025 视频理解 MLLM 评测基准：900视频/254小时/2700问答，Gemini 2.5 Pro 84.8%，GPT-4.1/GPT-5/Gemini 3 Pro 行业标准基准，CVPR 2025，研究用途
|||||||| [[ai-game-devtools/lamini]]
||||||| [[ai-game-devtools/minicpm-2b]] — OpenBMB 高效 LLM 系列（2B-9B），MiniCPM-2B 达 Mistral-7B 水平，
||||||| [[ai-game-devtools/minicpm-llama3-v-2.5]] — OpenBMB 多模态模型（3B），SigLip-400M+MiniCPM-2.4B，64 token 视觉压缩，GPT-4V 级性能，首个端侧中英双语 LMM，支持手机部署，Apache 2.0 |
|||||||| [[ai-game-devtools/minicpm-v-4.0]] — MiniCPM-V 4.0 (4.1B) 视觉 + MiniCPM-o 4.5 (9B) 全双工语音，SigLIP2+Whisper+CosyVoice2，端侧多模态，逼近 Gemini 2.5 Flash |
| [[ai-game-devtools/omnilmm]] — OpenBMB OmniLMM（MiniCPM-V/o）端侧多模态模型：4B-9B，视觉+语音+全双工实时流式对话，逼近 Gemini 2.5 Flash，支持 int4/GGUF/vLLM/Ollama |
||||||| [[ai-game-devtools/lamini-lm]] — MBZUAI 教学式蒸馏 LLM 家族：2.58M 指令对，Flan-T5/GPT-2/Cerebras-GPT 多基座，61M-1.5B 参数，Apache 2.0（代码），CC BY-NC 4.0（数据） |
|||||| [[ai-game-devtools/llasm]] — LinkSoul 首个开源可商用中英双语语音-语言助手（Whisper + Chinese-Llama-2-7B / Baichuan-7B），Apache-2.0 |
|||||| [[ai-game-devtools/lit-llama]] — Lightning-AI LLaMA 复现（7B-65B）
|||||| [[ai-game-devtools/llama-3]] — Meta Llama 3 LLM 系列（8B/70B），128K 词表 + GQA + 15T tokens 预训练，ChatFmt 对话格式，MMLU 82.0（70B），已废弃（Llama 3.1 后并入 llama-models）|
| [[ai-game-devtools/llama-agentic-system]] — Meta 官方 Llama 3.1+ Agent 应用层（现 llamastack/llama-stack-apps）：标准化 Inference/Tool/Safety/Memory API + Llama Stack Distribution，Gradio UI + Client SDK |
|||||||| [[ai-game-devtools/llmunity]] — Undream AI Unity LLM 集成插件：本地 GGUF 模型 + llama.cpp，支持 PC/Mobile/VR，内置 RAG 语义检索，Apache 2.0
|||||||| [[ai-game-devtools/llm.c]] — Karpathy 纯 C/CUDA LLM 训练：无需 PyTorch，单 GPU 比 PyTorch 快 7%，支持 GPT-2/GPT-3，MIT
|||||||| [[ai-game-devtools/lepton-ai]] — Lepton AI Pythonic AI 服务框架
||||| [[ai-game-devtools/la-vague]] — lavague-ai Large Action Model 框架：World Model + Action Engine 双组件驱动 AI Web Agent，支持 Selenium/Playwright/Chrome Extension，Apache 2.0 |
|||| [[ai-game-devtools/lemur]] — XLang Lab+Salesforce 70B LLM，NLP+Code 平衡训练，10:1 代码文本比预训练，WebArena/MINT/InterCode agent 评测，Apache |
|||| [[ai-game-devtools/kimi-k2]] — Moonshot AI 1T 参数 MoE LLM（激活 32B），MuonClip 优化器，Agent 任务开源 SOTA（SWE-bench 65.8%），128K context，MIT |
||| [[ai-game-devtools/hugging-face-api-unity-integration]] — Hugging Face 官方 Unity 包
|- [[ai-game-devtools/flux]] FLUX — Open-weight image generation model family by Black Forest Labs (flow matching transformer)
|- [[ai-game-devtools/migc]] — 浙大 ReLER Lab CVPR 2024 Highlight 多实例图像生成控制器：Fourier位置编码+SAC空间自适应，COCO-MIG基准SOTA(MIOU 0.56/成功率66%)，Adapter架构，SD1.4/1.5兼容，非商用许可
| [[ai-game-devtools/mimicbrush]] — 阿里达摩院零样本图像编辑工具：双U-Net架构（主UNet+ReferenceNet），参考图像纹理/风格迁移，深度引导结构保持，Gradio WebUI，HuggingFace+ModelScope权重
- [[ai-game-devtools/follow-your-click]] — AAAI 2025 开放域区域图像动画：点击选区+短提示词精确控制局部运动，AnimateDiff 时序扩散管线+IP-Adapter 视觉条件化，无需密集运动掩码
||- [[ai-game-devtools/fooocus]] lllyasviel SDXL 图像生成工具：离线/免费/零配置，<3 次点击出图，4GB VRAM 可用，GPT-2 提示词扩展引擎，自研 inpaint 模型 + 负 ADM 引导，GPL v3
||- [[ai-game-devtools/img2img-turbo]] CMU+Adobe 单步扩散图像翻译工具：SD-Turbo+LoRA+对抗学习，pix2pix-turbo(配对)/CycleGAN-Turbo(非配对)，512×512 仅 0.11s(A100)，支持草图→图像/边线→图像/天气迁移
|| [[ai-game-devtools/hua]] — BlinkDL AI 图像编辑器前端：Canvas 画布式 SD 操作界面（txt2img/img2img/修复/扩展），纯 Vanilla JS 168KB 单文件，通过 CORS 连接本地 AUTOMATIC1111 WebUI API，Apache 2.0
|||| [[ai-game-devtools/giffusion]] — Stable Diffusion GIF/视频生成 Web UI：关键帧动画+音频驱动+Deforum 兼容运动控制，HuggingFace Diffusers 兼容，Comet ML 集成
|||| [[ai-game-devtools/ic-light]] — lllyasviel 图像光照操控工具：基于 SD1.5 改造 UNet 输入通道(8/12通道)，文本/背景条件重打光 + 法线估计，ICLR 2025，HuggingFace Space 在线可用
||||| [[ai-game-devtools/lavi-bridge]] — ECCV 2024 语言-视觉桥接框架：LoRA/Adapter 连接 T5/Llama-2 与 SD U-Net/PixArt，冻结权重模块化组合，HuggingFace 预训练权重
||||| [[ai-game-devtools/layer-diffusion]] — lllyasviel 原生透明图像层扩散：latent transparency 编码 alpha 通道，SDXL/SD1.5 双架构支持，Forge/Diffusers CLI 双实现，8GB VRAM 可用
