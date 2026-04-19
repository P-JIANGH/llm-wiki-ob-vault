     1|# Wiki Index
     2|
     3|> Content catalog. Every wiki page listed under its type with one-line summary.
     4|> Read this first to find relevant pages for any query.
     5|> Last updated: 2026-04-20 | Total pages: 634 | Note: Open Source Games section is partial (65/153 games indexed; all 153 games exist in open-source-game/ directory)
     6|
     7|## AI / LLM / Agent
     8|
     9|| [[llm-integration]] — 9 个 LLM Provider 统一接入（OpenAI/Claude/Gemini/DeepSeek 等） |
    10|| [[mempalace]] — AI 长期记忆系统，ChromaDB verbatim 存储 + 4 层记忆栈，LongMemEval 96.6%（无需 API） |
    11|| [[voxcpm-local-deployment]] — VoxCPM 2 本地部署配置：Python/CUDA/GPU 显存要求及快速运行示例 |
    12|| [[multi-agent-ai-simulation]] — 多智能体 AI 通用概念：记忆/任务/感知/决策 |
    13|| [[multi-agent-ai-game-impl]] — Microverse 实现：感知→决策→记忆→任务→对话完整链路 |
    14|| [[persistent-memory-system]] — AI 角色长期记忆持久化（ChatHistory + 时间戳） |
    15|| [[stanford-generative-agents]] — Stanford Generative Agents（AI Town）Memory/Reflection/Planning |
    16|| [[agentgpt]] — reworkd 开源浏览器端自主 AI Agent 平台：Next.js / Docker 部署，1.5k+ commits，12 releases，支持中/英/匈牙利语 |
    17|| [[babyagi]] — yoheinakajima 实验性自构建 Agent 框架：functionz 图结构函数注册表（依赖/触发器/密钥管理），SQLAlchemy + Flask Dashboard，MIT，已存档 |
    18|| [[llocal-search]] — nilsherzig 本地 AI 搜索 Agent：Ollama + langchaingo + SearXNG + ChromaDB，完全本地运行无需 API Key，MIT |
    19||| [[ai-game-devtools/01-project]] — OpenInterpreter 开源语音接口设备：Open Interpreter 驱动自然语言控制电脑，LiveKit 实时语音 + Deepgram STT + ElevenLabs TTS，支持 ESP32/桌面/移动端，AGPL |
    20|| [[open-deep-research]] — dzhng/Duet 深度研究 Agent：Firecrawl 搜索爬取 + o3-mini/R1 模型，递归深度搜索 + 并发处理，<500 LoC 极简实现，MIT |
    21||| [[ai-game-devtools/logic-games-solver]] — fabridigua AI 解数独/Stars/Skyscrapers 逻辑游戏：OpenCV 透视变换 + Keras CNN（MNIST）识别 + CSP 回溯求解，Python/TensorFlow |
    22|| [[aios]] — agiresearch AI Agent 操作系统：LLM 内核抽象层（调度/记忆/存储/工具），COLM 2025 论文，支持 OpenAGI/AutoGen/MetaGPT，Remote Kernel 模式支持边缘设备 |
    23|| [[chatdev]] — OpenBMB 零代码多智能体平台：YAML 配置驱动工作流（游戏开发/3D生成/数据分析/深度研究），Python SDK + Vue3 前端，NeurIPS 2025，Puppeteer-style RL 编排 |
    24|| [[chatgpt-api-unity]] — mochi-neko Unity ChatGPT API 客户端：IChatMemory 多策略 session 管理 / UniTask 异步 / Relent resilient HTTP / Function Calling / Streaming，MIT |
    25|| [[chatgptforunity]] — sunsvip Unity UPM 包：编辑器内 ChatGPT 对话窗口 / 代码块提取保存 / 聊天历史持久化 / gpt-3.5-turbo，MIT |
    26|| [[ai-game-devtools/unity-chatgpt]] — dilmerv Unity ChatGPT 实验项目：自然语言提示让 AI 动态生成 Unity C# 代码创建立方体、操控角色行为，Unity 2021.3+，MIT |
    27|| [[autoresearch]] — Karpathy 自主 LLM 研究框架：agent 修改 train.py → 5分钟实验 → val_bpb 评估 → keep/discard 循环，MIT，70.3k stars |
    28|| [[chatrwkv]] — BlinkDL RWKV-7 100% RNN LLM：Time Mixing + Channel Mixing，O(n) 推理复杂度，3GB VRAM 跑 14B 模型，HuggingFace 权重，MIT |
    29||| [[stanford-alpaca]] — Stanford 指令微调 LLaMA 模型（7B/13B），52K Self-Instruct 数据训练，< $500 数据生成成本，CC BY-NC 4.0，2023 年开源 LLM 里程碑 |
    30||| [[chinese-llama-alpaca-3]] — ymcui 中文 Llama-3 第三期：8B 基座+Instruct-v3（Elo 1627），原版 128K 词表复用，GQA+LoRA，HuggingFace/ModelScope |
    31||| [[openmaic]] — THU-MAIC 开源多智能体互动教室平台：两阶段课程生成（Outline→Scene）、LangGraph Director Graph 编排、AI Provider 抽象层（1300+行支持 9+ 提供商）、PBL Agentic Loop + MCP Tools、PPTX/HTML 导出、MinerU PDF 解析，v0.1.0，AGPL-3.0 |
    32||| [[coze-studio]] — Coze/字节跳动一站式 AI Agent 开发平台：可视化 Agent/Workflow 构建，微服务+DDD，Eino 运行时，FlowGram 编辑器，Apache-2.0，20.3k stars |
    33|| [[claude-code-game-studio-architecture]] — 49 Agent 层级结构、Model Tier 分配（Haiku/Sonnet/Opus）、五大协调规则、Subagents vs Agent Teams |
    34|| [[claude-code-game-studio-collaboration-protocol]] — Question → Options → Decision → Draft → Approval 工作流、文件写入协议、决策 UI 模式 |
    35||| [[hermes-agent]] — 生产级 AI Agent 框架：工具注册中心 / 持久 Async Loop / 并行执行 / Context Compression / 13+ 消息平台网关 |
    36||| [[gstack]] — Garry Tan 的 AI 软件工厂：23 个 Skills 把 Claude Code 变虚拟工程团队（CEO/设计师/QA/发布工程师），60天 600K+ LOC，71.3K stars |
    37||| [[ai-game-devtools/qwen-agent]] — 阿里 Qwen 团队 LLM Agent 框架：Qwen Chat 后端、工具调用/RAG/代码解释器/MCP/多智能体群聊、Docker 沙箱、1M+ token 超长文档 QA，Apache 2.0 |
    38||| [[ai-game-devtools/swe-agent]] — Princeton+Stanford 开源 Agent Computer Interface：LLM 自主修复 GitHub issue、EnIGMA 网络安全模式、YAML 配置驱动、SWE-bench SoTA，NeurIPS 2024，MIT |
    39||| [[ai-game-devtools/taskgen]] — 基于任务的 Agent 框架：StrictJSON 结构化输出、自动任务分解、分层 Agent、函数 RAG、Shared Variables 多模态共享，MIT |
    40|
    41|## Concepts
    42|
    43|||| [[registry-pattern-tool-discovery]] — 中心注册表模式：ToolRegistry 单例集中注册 + check_fn 环境检查，hermes-agent 核心架构 |
    44||| [[context-compression]] — hermes-agent 结构化摘要压缩：Prune+Protect Head+Protect Tail+Summarize Middle 四阶段，节省 context |
    45|| [[tool-registry-pattern]] — 中心注册表工具自注册模式：check_fn 环境门控、循环导入安全、工具集分组 |
    46|| [[agent-loop-architecture]] — AI Agent 循环架构：持久 Async Loop、并行工具执行、迭代预算控制 |
    47|| [[openai-tool-calling]] — OpenAI Tool Calling 协议解析：参数类型强制、工具对完整性、多 Provider 格式适配 |
    48|
    49|## Game Projects & Studios
    50|
    51|| [[firered-openstoryline]] — FireRedTeam 开源 AI 视频创作工具，LangChain Agent + MCP + 15+ 视频节点管道，对话式视频剪辑 |
    52|| [[ksanadock]] — 游戏开发商，时空码头 |
    53|| [[microverse-project]] — Godot 4 多智能体 AI 社交模拟沙盒游戏 |
    54|| [[microverse-code-structure]] — Microverse 代码结构 / 模块解析 |
    55|| [[openbmb]] — 北京人工智能研究院 & 面壁智能，MiniCPM / VoxCPM 等模型背后的研究组织 |
    56||| [[langflow]] — logspace AI 可视化 LLM 工作流构建器：拖放节点图 + FastAPI + LangChain，支持 50+ LLM/向量库，MIT |
    57||| [[claude-code-game-studios]] — Claude Code Game Studios：49 Agent / 72 Skill 游戏开发工作流，MIT 开源 |
    58||| [[voxcpm]] — OpenBMB 开源语音合成系统，Tokenizer-Free 架构支持 30 语言 + 9 种中文方言 |
    59||| [[ai-game-devtools/biomes]] — ill-inc 开源 Web 沙盒 MMORPG：Next.js + Three.js + WebAssembly (C++ voxeloo)，React 资源系统桥接 Three.js 状态，12+ 微服务架构（sync/logic/gaia 等），ECS+Bikkie 数据层，MIT |
    60|
    61|## Game Dev
    62|
    63|| [[godot-4]] — Godot 4 引擎：GDScript、Jolt Physics、XR、版本历史 |
    64|| [[gdscript-patterns]] — GDScript 10 种设计模式（单例/Signal/Lambda/寻路/物理检测） |
    65|| [[godot-animation-system]] — AnimatedSprite2D 帧动画 + CharacterController 状态机 |
    66|| [[microverse-character-system]] — 8 角色人格/职位/说话风格（CharacterPersonality） |
    67|| [[microverse-dialog-system]] — DialogService/ConversationManager/BackgroundStoryManager |
    68|| [[microverse-save-system]] — GameSaveManager JSON 存档（角色位置/任务/AI状态） |
    69|
    70|## AI Game DevTools
    71|
    72|| [[ai-game-devtools-catalog]] — Yuan-ManX 维护的 AI 游戏开发工具目录：840+ 项目覆盖16大类 |
    73|| [[ai-game-devtools/dify]] — LangGenius 开源 LLM 应用开发平台：可视化 Workflow + RAG Pipeline + Agent(Function Calling/ReAct) + 100+ 模型接入 + LLMOps，Docker 一键部署，Dify Open Source License |
    74||| [[ai-game-devtools/langchain]] — langchain-ai LLM 应用开发框架：Chain/Agent/Memory/Tool/Prompt 抽象 + LangGraph 编排，monorepo 结构（core/v1/partners），MIT |
    75||| [[ai-game-devtools/langgraph-studio]] — LangChain Agent IDE：可视化图结构调试 + Thread 状态编辑 + Interrupt 断点控制 + 热重载，Desktop/Web 双模式，需 LangSmith 认证 |
    76||| [[ai-game-devtools/llama-index]] — run-llama LLM 数据框架：300+集成/RAG管道/LlamaParse文档处理/多向量存储/图RAG，5行代码入门，MIT |
    77||| [[ai-game-devtools/llama2-webui]] — Llama 2 本地 Web UI + PyPI 封装包，支持 llama.cpp/transformers/GPTQ 多后端，MIT |
    78|| [[ai-game-devtools/text-generation-webui]] — oobabooga Gradio LLM Web UI：5后端(llama.cpp/ExLlamaV3/TensorRT-LLM)、多模态/Tool Calling/LoRA训练/图像生成，OpenAI兼容API，MIT |
    79||| [[ai-game-devtools/ai-writer]] — BlinkDL AI小说续写工具：RWKV 模型（12层/768维）+ 8849字词表，ctx_len=512，网文专精，已过时推荐 [[RWKV-Runner]]，Apache 2.0 |
    80||| [[ai-game-devtools/ai-shader]] — keijiro ChatGPT GLSL Shader 生成器：自然语言→Shader 代码，Unity Editor 集成，OpenAI API Key 配置，PoC（10 commits）|
    81|| [[ai-game-devtools/notebook-ai]] — indentlabs 写作/跑团世界观构建平台：32+内容类型（角色/地点/物品/魔法等）+关系图谱+隐私控制，Ruby on Rails 6.1 + React |
    82|| [[ai-game-devtools/novel]] — steven-tey Notion风格 WYSIWYG 编辑器 + OpenAI 自动补全，Tiptap 2 + Vercel AI SDK，多框架支持（Svelte/Vue/VSCode），Apache-2.0 |
    83|| [[ai-game-devtools/jaaz]] — 11cafe 开源多模态画布创意 Agent：无限画布 + AI Agent 生成图片/视频（GPT-4o/Midjourney/Flux/ComfyUI），LangGraph 编排 + tldraw 画布，隐私优先支持本地部署，AGPL |
    84||| [[ai-game-devtools/ragas]] — VibrantLabs LLM 应用评估框架：RAG/LLM 客观指标 + 测试数据自动生成 + LangChain/LlamaIndex 集成 + 生产反馈循环，Apache-2.0 |
    85||| [[ai-game-devtools/rpbench-auto]] — boson-ai LLM 角色扮演自动化评测流水线：ArenaHard 范式 pairwise 对比 + 裁判 LLM 打分 + Elo 排名（MLE/Online/WHR），覆盖 17+ 模型，Apache 2.0 |
    86|| [[ai-game-devtools/unreal-engine-5-llama-lora]] — bublint 用 UE 5.1 文档微调 Llama-7b LoRA：8bit 加载 + text-generation-webui 训练，8小时 3090Ti 完成，构建本地 UE5 问答助手，MIT |
    87||| [[ai-game-devtools/unrealgpt]] — TREE Industries UE5.6 AI Agent 插件：编辑器内 Chat 界面 + GPT Responses API + Python 脚本执行 + 场景查询 + Replicate 内容生成，Apache 2.0 |
    88||| [[ai-game-devtools/xagent]] — OpenBMB 开源 LLM 自主 Agent：Dispatcher+Planner+Actor 三层架构 + Docker 沙箱安全隔离，50+ 真实任务评测超越 AutoGPT，Apache 2.0 |
    89|| [[ai-game-devtools/agent-group-chat]] — MikeGu721/复旦 多智能体群聊模拟：竞争→合作→反射四阶段循环，LLM驱动角色对话，n-gram熵评估涌现行为，arXiv 2403.13433 |
    90||| [[ai-game-devtools/agentbench]] — THUDM LLM Agent 评测基准：8种环境（OS/DB/KG/游戏/推理等），评估 LLM 作为自主 Agent 的规划与工具使用能力，arXiv 2308.03688，MIT |
    91||| [[ai-game-devtools/ioa]] — OpenBMB 多智能体协作框架：AutoGPT/Open Interpreter异构 Agent 自主组队 + WebSocket 实时通信 + Milvus 向量注册，Apache 2.0 |
    92||| [[ai-game-devtools/kwaiagents]] — 快手 KwaiKEG LLM Agent 系统：KAgentSys-Lite + KAgentLMs(Meta-agent tuning 微调 Qwen/Baichuan) + KAgentInstruct(200K指令) + KAgentBench(3K评测)，KAgentBench 5维度评测（规划/工具使用/反思/总结/画像），Apache 2.0 |
    93||| [[ai-game-devtools/agent-laboratory]] — SamuelSchmidgall/Johns Hopkins LLM 自主研究 Agent：4阶段流水线（文献综述→实验→报告）+ AgentRxiv 知识累积框架，o1/o3-mini/GPT-4o/DeepSeek-V3，MIT |
    94|| [[ai-game-devtools/agentsims]] — PTA Studio 模拟城镇 LLM Agent 评测沙盒：QA评估+Github Actions CI、多智能体+建筑+NPC经济系统，ArXiv 2308.04026 |
    95|| [[ai-game-devtools/generative-agents]] — Stanford 交互式人类行为模拟（UIST 2023）：LLM驱动的25个AI角色在Smallville小镇生活，Memory Stream记忆架构+Reflection反思机制启发了 [[ai-town]] 和 [[cat-town]]，arXiv 2304.03442 |
    96|| [[ai-game-devtools/ai-town]] — a16z-infra 虚拟小镇模拟：Convex + PixiJS + Ollama/OpenAI，AI 角色自主聊天社交，灵感来自 Stanford Generative Agents 论文，JS/TS 入门套件 |
   97||| [[ai-game-devtools/cat-town]] — ykhli 猫咪主题模拟游戏：基于 AI-town fork，像素猫咪角色 + Cat Town Live Demo (Fly.io)，MIT |
   98|||| [[ai-game-devtools/codef]] — 内容变形场视频处理（CVPR 2024 Highlight）：Canonical content field + temporal deformation field 联合优化，零训练将图像算法提升到视频，10GB VRAM |
    99|||| [[ai-game-devtools/cogvideox]] — THUDM/ZhipuAI 开源视频生成模型家族：CogVideoX1.5-5B(1360×768/16fps)+2B/5B，T2V/I2V 双模，3D Causal VAE，diffusers 最低 3.6GB(INT8)，Apache 2.0 |
    99|| [[ai-game-devtools/cogvlm]] — THUDM/ZhipuAI 开源 VLM 双模型：CogVLM-17B(10B视觉+7B语言,490×490)+CogAgent-18B(11B视觉+7B语言,1120×1120+GUI Agent)，MM-VET 52.8 SOTA，CVPR 2024 Highlight，INT4 仅需 11GB，Apache-2.0 |
    99||| [[ai-game-devtools/character-glm-6b]] — 聆心智能&清华大学 CoAI 角色扮演对话大模型：基于 ChatGLM2-6B 微调，7维属性+行为建模，一致性/拟人化/吸引力三维评估，角色扮演场景超越 GPT-3.5，不可商用 |
    99||| [[ai-game-devtools/chatgpt-maya]] — LouisRossouw Maya ChatGPT 代码生成工具：自然语言提示→GPT-3生成Maya Python代码→exec()直接执行，简单自动化可用、复杂请求不佳，需mayapy安装openai包 |
   100||| [[ai-game-devtools/anime-gf]] — cyan/moecorp 桌面 LLM 聊天前端：Electron + React + tRPC + SQLite，支持 OpenAI/Anthropic/Mistral/Together AI 及任意 OpenAI兼容端点，角色卡系统，AGPL |
   101|| [[ai-game-devtools/anything-3d]] — Anything-of-anything 单视图3D重建框架：SAM分割+3DFuse/Zero-1-to-3/NeRF/HRN四路管线，单图→3D物体/新视角/面部重建，PyTorch3D+VoxNeRF，arXiv 2304.10261 |
   102|| [[ai-game-devtools/agentscope]] — 阿里巴巴通义实验室 Agent 框架（Apache 2.0）：ReAct/Voice/多Agent 工作流 + MCP/A2A 协议 + Trinity-RFT RL 微调 + K8s/OTel 生产部署，支持狼人杀等游戏示例 |
   103||| [[ai-game-devtools/behaviac]] — 腾讯游戏AI行为框架：行为树/FSM/HTN三种范式，编辑器仅Windows+运行时C++/C#全平台，支持热重载，BSD 3-Clause |
   104|| [[ai-game-devtools/infinity]] — FoundationVision 按位自回归图像生成框架：无限词表 Tokenizer + IVC（8.8T→0.13M 参数）+ BSC 自校正，CVPR 2025 Oral，1024×1024 图像 0.8s 生成，超越 SD3/SDXL |
   105|||| [[ai-game-devtools/byzer-agent]] — allwefantasy 分布式 Agent 框架：Ray + AutoGen 内核，支持本地/远程 Agent 通信，@byzerllm 装饰器定义 Prompt/Reply，Apache 2.0 |
   106|||| [[ai-game-devtools/comorag]] — EternityJune25 认知启发的记忆组织 RAG 系统：Reason→Probe→Retrieve→Consolidate→Resolve 迭代推理循环，三层记忆（Veridical/Semantic/Episodic），200K+ token 长叙事问答优于基线 11%，arXiv 2508.10419，MIT |
   107|||| [[ai-game-devtools/buffer-of-thoughts]] — 北京大学&UC Berkeley&Stanford 思维增强推理框架（NeurIPS 2024 Spotlight）：Meta Buffer 存储可复用思维模板+LightRAG检索，Llama3-8B+BoT可超越Llama3-70B，成本仅ToT的12%，MIT ||
   108|||| [[ai-game-devtools/crewai]] — joaomdmoura 独立多Agent框架（无LangChain依赖）：Crew（自主Agent协作）+Flow（事件驱动生产工作流）+Sequential/Hierarchical双进程，5.76x快于LangGraph，MIT ||
   109|||| [[ai-game-devtools/datarus-jupyter-agent]] — DatarusAI 数据科学 Jupyter Agent：基于 Datarus-R1-14B（Qwen 2.5 微调）驱动多步推理，Docker+Jupyter 隔离执行环境，ReAct/CoT 双模式，自动纠错，生成分析 Notebook，Apache 2.0 |
   110|| [[ai-game-devtools/everything-ai]] — AstraBert Docker 多任务 AI 助手：18 种任务模式（RAG/文本/图像/音频/视频/蛋白质折叠），Qdrant + llama.cpp + HuggingFace，支持本地 GGUF 和云端 API，MIT |
   111||| [[ai-game-devtools/easyphoto]] — 阿里巴巴 PAI AI 人像生成 WebUI 插件：5-20 张人脸照训练数字分身 LoRA + 两阶段扩散生成 + ControlNet 条件控制 + LCM 加速/视频生成/虚拟试衣，Apache 2.0 |
   112|| [[ai-game-devtools/fabric]] — Daniel Miessler 开源 AI 增强框架（Go）：Pattern 模式管理 20+ AI 提供商，CLI + REST API + Docker，prompts 即单元解决问题，MIT |
   113|| [[ai-game-devtools/fastgpt]] — labring AI Agent 构建平台：可视化 Flow 工作流编排 + 知识库 RAG + 双向 MCP + OpenAI 兼容 API + Docker 一键部署，FastGPT Open Source License |
   114|| [[ai-game-devtools/fastrag]] — IntelLabs 高效 RAG 框架：基于 [[Haystack]] v2 构建，ColBERT+PLAID 高效检索 + REPLUG/FiD 多文档生成器 + Gaudi/ONNX/OpenVINO 多后端，已存档 |
   115||||| [[ai-game-devtools/gameaisdk]] — 腾讯开源游戏AI工具包：基于游戏画面采集→图像识别(DQN/IM/RainBOW强化学习)→手机端动作执行，支持跑酷/吃鸡/射击/MOBA类游戏自动化测试，GPL v3 |
   116|||| [[ai-game-devtools/gamegen-o]] — 腾讯光子×港科大×中科大 首个开放世界游戏视频生成Transformer模型，支持文本/操作信号/视频提示多模态控制，OGameData 15K 视频数据集，业内称"游戏工作室ChatGPT时刻" |
   117||||- [[ai-game-devtools/hunyuan-dit]] — 腾讯混元开源 DiT 文本到图像生成模型（1.5B 参数）：中英双语 CLIP+T5 双编码器 + DialogGen 多轮对话 + LoRA/ControlNet/IP-Adapter 全支持，ComfyUI/Diffusers 集成，6GB VRAM 可运行
   118|||||- [[ai-game-devtools/hunyuanimage-2-1]] — 腾讯混元 17B 两阶段扩散图像生成模型：Base(50步)+Refiner 管道，MLLM+byT5 双文本编码器，2K 原生分辨率，Arena 开源文生图 Top 1，最低 24GB VRAM
   119|||||||- [[ai-game-devtools/hunyuanimage-3-0]] — 腾讯混元原生多模态 MoE 图像模型（80B 总参/13B 激活）：自回归架构（非 DiT）、Prompt Self-Rewrite、CoT 思维链、图文到图像编辑、多图融合，3×80GB 可运行 Base 版
   120|||||||- [[ai-game-devtools/nextstep-1]] — StepFun 14B 自回归图像生成模型：连续 Token（非 VQ 离散化）+ Qwen2.5-14B 骨干 + 157M Flow Matching Head 双头架构，统一 next-token 预测框架，ICLR 2026 Oral
   121|||||| [[ai-game-devtools/hunyuan-gamecraft]] — 腾讯混元游戏视频生成：参考图+文本+键鼠动作→生成连贯游戏录像，混合历史条件+模型蒸馏(8步)，1M+ AAA游戏训练，HuggingFace开源 |
||||| [[ai-game-devtools/hy-motion-1-0]] — 腾讯混元十亿参数文本到3D动作生成模型：DiT+Flow Matching架构，1.0B标准版/0.46B轻量版，>3000小时预训练+RLHF，SMPL骨骼输出，需24-26GB VRAM |
   122||||| [[ai-game-devtools/hunyuanworld-1.0]] — 腾讯混元 3D 世界生成模型：文本/图像→360°全景图→分层3D mesh（背景+2层前景+天空），可导出Draco压缩mesh用于游戏引擎，BRISQUE/NIQE/CLIP 全面SOTA，Apache 2.0 |
   123|||||| [[ai-game-devtools/hunyuanworld-voyager]] — 腾讯混元 Voyager 可探索3D世界视频生成：单图→世界一致RGB-D视频+相机路径控制，WorldScore Benchmark综合第1（77.62），支持点云导出，Apache 2.0 |
   124|||||||- [[ai-game-devtools/instantid]] — InstantX Team/小红书 零样本身份保留图像生成：单图即可保持面部特征+文本可控，无需微调，IdentityNet(ControlNet)+IP-Adapter架构，LCM加速兼容，Kolors适配，Apache 2.0
   125||||||| [[ai-game-devtools/pulid]] — ByteDance NeurIPS 2024 零样本身份保留图像生成：对比对齐+注意力注入，单图即生成，支持 SDXL/FLUX，12GB VRAM 可运行，ID 保真度 +5pp(v0.9.1)
   126||||||| [[ai-game-devtools/omnigen]] — VectorSpaceLab 统一图像生成模型：Phi-3+DiT 架构，无需额外插件(ControlNet/IP-Adapter)直接多模态 prompt 生成，支持文本到图像/主体驱动/身份保留/图像编辑，MIT
   127|||||| [[ai-game-devtools/omnigen2]] — VectorSpaceLab/BAAI 下一代多模态图像生成：双解码通路(文本/图像独立参数)+解耦Tokenizer，新增视觉理解能力，TeaCache/TaylorSeer加速推理，最低17GB VRAM，MIT
   128|||||||| [[ai-game-devtools/omost]] — lllyasviel LLM 图像组合工具：LLM 生成 Python Canvas 代码描述空间布局（9×9×9=729 种边界框）+ 注意力分数操纵渲染，自然语言空间编码（非像素坐标），子提示<75 tokens 避免 CLIP 截断，Llama-3/Phi-3 基座 8GB VRAM
   129||||||||| [[ai-game-devtools/openpose-editor]] — Fkunn1326 A1111 WebUI 人体姿态编辑插件：Fabric.js Canvas 手动编辑骨骼关键点 + PyTorch OpenPose 自动检测，一键发送到 ControlNet，MIT
   130|||||||||- [[ai-game-devtools/irg]] — Osilly ICLR 2026 首个交错推理图像生成模型：Prompt→文本推理→初始图像→自我反思→精炼图像，GenEval 0.85 SoTA，基于 [[ai-game-devtools/bagel]] 架构，SFT+RL统一训练，Apache 2.0
   131|||||||| [[ai-game-devtools/rpg-diffusionmaster]] — ICML 2024 区域扩散范式：MLLM(GPT-4/DeepSeek-R1)自动拆解复杂提示为区域子提示+比例分配，SDXL/SD1.5/SD2.1/IterComp 多后端，零训练即插即用，支持 ControlNet 集成，Apache 2.0
   132||||||||| [[ai-game-devtools/qwen-image]] — Alibaba Qwen 团队 20B MMDiT 图像基础模型：复杂文字渲染（中文最强）+ 精确图像编辑，多版本（T2I/Edit/Layered/2.0），Apache 2.0 开源，AI Arena 开源第一
   133|||||||| [[ai-game-devtools/rich-text-to-image]] — UMD/Adobe/CMU ICCV 2023 富文本控制图像生成：字体颜色→精确色彩、字体大小→Token权重、字体样式→局部艺术风格、脚注→补充描述，Quill编辑器→JSON→区域扩散，SD1.5/SDXL/Animagine-XL后端，MIT
   134|||||||| [[ai-game-devtools/kolors]]
   135||||||| [[ai-game-devtools/hy-world-1.5]] — 腾讯混元 WorldPlay 实时交互世界模型
   136|||| [[ai-game-devtools/genagent]] — xxyQwQ/港科大 CVPR 2025 LLM Agent：在ComfyUI中自动生成Stable Diffusion工作流
   137||| [[ai-game-devtools/genesis]] — Genesis-Embodied-AI 通用物理引擎平台：6种求解器统一框架（Rigid/MPM/SPH/FEM/PBD/SF），43M FPS @ RTX 4090，光线追踪渲染+生成式数据引擎，Apache 2.0 |
   138|| [[ai-game-devtools/gigax]] — GigaxGames 开源游戏运行时 LLM NPC 框架：Outlines 结构化生成保证输出格式，<1s GPU 推理，NPC-LLM-7B/3_8B 开源权重，MIT |
   139|| [[ai-game-devtools/interactive-llm-powered-npcs]] — AkshitIreddy 游戏 NPC 实时对话系统：DeepFace 面部识别+Cohere LLM+LangChain+ChromaDB 生成对话，SadTalker 唇形动画+Edge-TTS 语音，Pixel 替换叠加层适配任意游戏无需源码修改，MIT |
   140||| [[ai-game-devtools/matrix-game]] — Skywork AI 开源交互式游戏世界模型系列：Wan2.2 DiT 架构+键鼠动作条件化+长程记忆+流式生成，3.0 支持 INT8 量化/异步 VAE/FSDP，MIT |
   141|| [[ai-game-devtools/hipporag]] — OSU-NLP-Group 神经生物学启发 LLM 长期记忆框架（NeurIPS '24 / ICML '25）：知识图谱 + OpenIE + 非参数持续学习，多跳关联检索 SOTA，低索引成本 |
   142|||| [[ai-game-devtools/mindsearch]] — InternLM 开源 AI 深度搜索框架：动态图分解子问题 + 并行 SearcherAgent（ThreadPoolExecutor/asyncio）+ 5 种搜索引擎 + SSE 流式可视化，arXiv 2407.20183，Apache 2.0 ||
   143||| [[ai-game-devtools/mixture-of-agents]] — Together AI 多 LLM 分层聚合架构：并行调用多个开源模型 → 迭代精炼 → 聚合器综合，AlpacaEval 2.0 65.1% 超越 GPT-4 Omni（57.5%），纯推理时增强无需训练，Apache 2.0
   144||| [[ai-game-devtools/mmrole]] — YanqiDai ICLR 2025 多模态角色扮演 Agent 框架：85角色/11K图像/14K对话数据集 + Qwen-VL-Chat 微调 Agent + 8维3面评估，奖励模型评分，MIT
   145||| [[ai-game-devtools/mug-diffusion]] — Keytoyze AI 音游谱面自动生成工具：基于 Stable Diffusion 改造+音频波形条件化，支持 4K VSRG，osu!/Etterna 难度控制+风格控制，Gradio WebUI，CC0 1.0
   146||| [[ai-game-devtools/mvdream]] — ByteDance 多视角扩散模型：SD UNet + 相机位姿条件（16维），文本→4视角一致图像(4×256×256)，SDS 3D生成前置，OpenRAIL权重
   147||| [[ai-game-devtools/anytext]] — Alibaba ICLR 2024 Spotlight 多语言视觉文本生成扩散模型：SD1.5+ControlNet 架构+OCR 感知损失，中英双语文字无缝融入图像，FP16 ~7.5GB VRAM，LoRA 支持，AnyText2 已发布
   148||| [[ai-game-devtools/atomic-agents]]
   149|||| [[ai-game-devtools/autoagents]] — LinkSoul/IJCAI 2024 自动多 Agent 生成框架：LLM 驱动动态生成专家角色+执行计划，Observer 三层反射检查（Agents/Plan/Action），MIT |
   150|||| [[ai-game-devtools/bagel]] — ByteDance-Seed 开源统一多模态模型（7B 激活/14B 总参）：MoT 架构融合视觉理解+文生图+图像编辑+世界建模，MMBench 85.0 超 Qwen2.5-VL，GenEval 0.82 匹敌 FLUX-1.dev，Apache 2.0 |
   151|||| [[ai-game-devtools/blender-controlnet]] — coolzilj Blender + A1111 WebUI API 桥接脚本：F12 渲染→Compositor 条件图(canny/depth/openpose/seg)→POST /txt2img→AI 生成图加载回 Image Editor，支持 4 种 ControlNet 单位并行，MIT |
   152|||| [[ai-game-devtools/blender-gpt]] — gd3kr Blender GPT-4 插件：自然语言→Blender Python 代码生成+自动执行，侧边栏聊天界面+代码查看器，OpenAI API 集成，MIT |
   153|||| [[ai-game-devtools/blender-mcp]] — ahujasid Blender MCP 服务器：通过 Model Context Protocol 连接 Claude AI 与 Blender，JSON/TCP 双向通信，支持 Poly Haven/Sketchfab 资产集成+Hyper3D 3D 生成，MIT |
   154||| [[ai-game-devtools/brivl]] — BAAI WuDao 中文图文多模态预训练模型（1B 参数）：EfficientNet-B5 + Chinese RoBERTa 双编码器 + MoCo 对比学习，图文检索超 CLIP/UNITER，可独立部署
   155||| [[ai-game-devtools/autogen]] — Microsoft Research 多 Agent 协作框架（维护模式）：Core/AgentChat/Extensions 三层架构，MCP/A2A 支持，后继者 Microsoft Agent Framework，MIT |
   156||| [[ai-game-devtools/autostudio]] — donahowe/AutoStudio CVPRW 2026 多轮交互式图像生成框架：四智能体（Subject Manager/LayoutGenerator/Supervisor/Drawer）+ Parallel-UNet + 免训练，保持多主题一致性，FID +13.65% |
   157|||| [[ai-game-devtools/catvton]] — ICLR 2025 虚拟试穿扩散模型：899M 参数/仅 49.57M 可训练，SD1.5 Inpainting 基础+拼接融合，1024×768 <8GB 显存，支持 VITON-HD/DressCode，CC BY-NC-SA 4.0 |
   158|||| [[ai-game-devtools/clipasso]] — SIGGRAPH 2022 语义感知图像转草图工具：CLIP 感知损失 + diffvg 可微栅格化，贝塞尔曲线优化输出 SVG，笔画数控制抽象程度，CC BY-NC-SA 4.0 |
   159|||| [[ai-game-devtools/comfyui]] — comfyanonymous 最强模块化视觉 AI 引擎：节点/图/流程图界面设计 SD 管线，18.7万行代码，578 Py文件，SD/Flux/视频/音频全支持，图执行引擎+增量缓存+智能显存管理，GPL v3 |
   160||||| [[ai-game-devtools/conceptlab]] — Tel Aviv University VLM引导创意概念生成：Kandinsky 2.1 扩散先验 + BLIP VLM 自适应负约束，生成从未存在的新概念/进化混合/风格创造，MIT |
   161|||| [[ai-game-devtools/controlnet]] — ICCV 2023：零卷积架构(SD encoder locked+trainable copy)控制扩散模型，9种条件图(canny/depth/pose/seg/normal等)，可组合多ControlNet并行，支持Guess Mode无提示生成 |
   162|| [[ai-game-devtools/aworld]] — inclusionAI 多智能体 Agent Harness 框架：CAST 代码分析 + Benchmark-Driven Development + Self-Evolution Loop，GAIA/OSWorld/XBench 多项 Leaderboard 1st，MIT |
|| [[ai-game-devtools/backgroundremover]] — nadermx U2Net AI 抠图工具：CLI+HTTP API+Python 库+Docker 支持，图像/视频/批量/管道模式，Alpha 精细抠边，ProRes 4444 透明视频输出，GPU 加速 5-10x，MIT |
   163|| [[ai-game-devtools/cradle]] — BAAI 游戏/软件 Agent 框架： screenshot→LLM推理→键鼠动作，RDR2/Stardew/CitiesSkylines/Dealer'sLife2 + Chrome/Outlook/Capcut，Skill Registry + Planner + Memory + SAM/GroundingDINO 视觉，MIT |
   164|| [[ai-game-devtools/agent-group-chat]] —
   165||| [[ai-game-devtools/longcat-flash]] — 美团 560B MoE LLM（激活 27B），ScMoE 架构 >100 TPS，128K context，Agent 任务 SOTA（τ²-Bench 73.68），MIT |
   166|| [[ai-game-devtools/longwriter]] — THUDM 超长文本生成 LLM（10K+ 词），基于 GLM-4-9B/Llama-3.1-8B 微调，AgentWrite 流水线，vLLM 推理 1 万词/分钟，Apache 2.0 |
   167||| [[ai-game-devtools/larp]] — MiAO 认知架构语言角色 Agent：4模块记忆处理（语义/情景/程序记忆）+ Wickelgren 遗忘定律 + 个性化 LoRA 适配 + 可学习动作空间，arXiv:2312.17653
   168||| [[ai-game-devtools/large-world-model-lwm]] — UC Berkeley/Scale AI 百万 token 上下文多模态模型（视频+语言+图像），RingAttention + Blockwise Transformer，7B 参数 1M context，Apache 2.0 |
   169|| [[ai-game-devtools/lumina-t2x]] — OpenGVLab 多模态 DiT 生成框架（图像/视频/3D点云/音频/音乐），Flag-DiT 5B / Next-DiT 2B，Flow Matching + RoPE，MIT |
   170|| [[ai-game-devtools/llama-3]] — Meta Llama 3 LLM 系列（8B/70B），128K 词表 + GQA + 15T tokens 预训练，ChatFmt 对话格式，MMLU 82.0（70B），已废弃 ||
   171|||| [[ai-game-devtools/llama-3-1]] — Meta Llama 3.1 系列（8B/70B/405B），128K context + GQA 全系列，15T+ tokens，TikToken，Llama 3.1 系列统一仓库 ||
   172|||| [[ai-game-devtools/llm-answer-engine]] — Developers Digest Perplexity 风格答案引擎：Groq Mixtral/Llama3 + Brave Search + Langchain.JS RAG，支持 function calling/流式响应/多模态结果，MIT ||
   173||||| [[ai-game-devtools/corenet]] — Apple 深度神经网络训练库：支持 LLM/CLIP/ViT 等 foundation models 的训练，含 FSDP 分布式训练 |
   174|| [[ai-game-devtools/cosmos]] — NVIDIA 物理 AI 世界基础模型平台：Predict/Transfer/Reason 三类模型，服务自动驾驶与机器人仿真 |
   175|| [[ai-game-devtools/dbrx]] — Databricks 132B MoE LLM：16 experts 选4，36B 激活参数，12T tokens 预训练，32K context，Databricks Open Model License |
   176||| [[ai-game-devtools/deepfloyd-if]] — DeepFloyd Lab/StabilityAI 级联像素扩散文本到图像模型：T5+三级UNet（64→256→1024px），FID 6.66 SOTA，支持 Dream/风格迁移/超分辨率/修复四种模式，Modified MIT |
   177||| [[ai-game-devtools/dclm]] — MLFoundations LLM 训练框架：300T+ tokens 数据集构建流程，Ray 分布式处理 + Rust deduplication，支持 400M-7B 规模模型训练评估 |
   178||| [[ai-game-devtools/depth-anything-v2]] — HKU+TikTok 单目深度估计 V2：DINOv2 ViT 骨干(4档:24.8M~1.3B)+DPT 解码头，中间层特征提取，Apple Core ML/TensorRT/ComfyUI/Transformers 集成，V2-Small Apache-2.0 可商用 |
   179||| [[ai-game-devtools/sd-webui-depth-lib]] — jexom A1111 WebUI 深度图管理插件：预置手部/形状深度图库 + Fabric.js 画布组合编辑 + 一键发送到 [[ai-game-devtools/controlnet]]，开源无 LICENSE |
   180||| [[ai-game-devtools/interactml-unity]]
   181||| [[ai-game-devtools/iml-ue4]] — Interactml Unreal Engine 4/5 C++ 插件：与 Unity 版共享 RapidLib 后端，kNN/MLP/DTW，原生 Blueprint 节点配置，Win64，MIT |
   182||| [[ai-game-devtools/index-1.9b]] |
   183|||||| [[ai-game-devtools/internlm]] — 上海 AI Lab 大模型系列（1.8B-20B），InternLM3-8B 仅 4T tokens 训练成本降低 75%，Deep Thinking Mode 支持长思维链推理，支持 LMDeploy/vLLM/SGLang 多推理后端 |
   184|||||||| [[ai-game-devtools/internlm-xcomposer]] — 上海 AI Lab 多模态 LVLM 系列（1.0→2.5），7B 参数达 GPT-4V 水平，支持 4K 图像/96K 上下文/视频理解，独有网页生成能力（指令→HTML/CSS/JS）|
   185|||||||| [[ai-game-devtools/motionllm]] — IDEA/清华/CUHK-SZ 视频+动作联合理解 LLM：Vicuna 1.5-7B + LoRA + SMPL 动作编码，MoVid 数据集，行为描述/时空理解/推理，arXiv 2405.20340 |
   186|||| [[ai-game-devtools/design2code]] — Stanford SALT Lab screenshot-to-code benchmark：484网页截图生成HTML代码，Design2Code-18B (CogAgent微调) + GPT-4V/Gemini/Claude 3.5 多模型评测，arXiv 2024 |
   187||||| [[ai-game-devtools/demogpt]] — DemoGPT 自动生成 AI 应用框架：自然语言 → Streamlit App 流水线（Plan/Task/Code/Final），内置 AgentHub 支持工具调用 + RAG |
   188|||||| [[ai-game-devtools/devika]] — Devika AI 软件工程师：Devin 开源替代方案，多 Agent 架构（Planner/Researcher/Coder 等），支持 Claude/GPT/Ollama，MIT |
   189||||||| [[ai-game-devtools/metagpt]] — MetaGPT 多 Agent 软件公司框架：PM/Architect/Engineer 角色协作，Code=SOP(Team) 核心理念，ICLR 2024，支持游戏代码生成，MIT |
   190||||||| [[ai-game-devtools/olmo]] — AI2 OLMo 开源 LLM 系列（1B/7B/13B/32B），两阶段训练 + 模型 soup 平均，HuggingFace 格式，Apache 2.0 |
   191|||||| [[ai-game-devtools/mlc-llm]] — mlc-ai 通用 LLM 部署引擎：TVM ML 编译优化，跨平台支持（Linux/Win/macOS/iOS/Android/Web/WASM），MLCEngine 统一推理接口，Apache 2.0 |
   192||||||| [[ai-game-devtools/mobillama]] — MBZUAI 轻量级 SLM（0.5B/0.8B/1B），参数共享策略降低训练和部署成本，HellaSwag 52.52（0.5B）超越 Pythia-410m，ICLR'25 SLLM Spotlight，Apache 2.0 |
   193||||||| [[ai-game-devtools/next-gpt]] — NExT++/NUS any-to-any 多模态 LLM（文字/图像/视频/音频任意组合），ImageBind 编码 + Vicuna-7B + LoRA 微调，ICML 2024 Oral，BSD 3-Clause |
   194||||||| [[ai-game-devtools/moshi]] — Kyutai 全双工语音对话基础模型，Mimi 流式神经编解码器（1.1kbps/80ms），7B Temporal+Depth Transformer，160ms 理论延迟，CC-BY 4.0 |
   195||||| [[ai-game-devtools/minimax-01]] — MiniMax 456B MoE LLM（激活 45.9B）+ VL 双模型，Lightning Attention + MoE，4M token 推理上下文，RULER 1M 0.910（最佳），MIT |
   196||| [[ai-game-devtools/flowise]] — FlowiseAI 可视化拖拽 LLM 应用构建平台
   197|| [[ai-game-devtools/gptscript]] — Acorn Labs LLM 工具调用框架：.gpt 脚本语言连接 OpenAPI/CLI/文件系统，Go 实现，Apache 2.0 |
   198|| [[ai-game-devtools/deepseek-v3]]
   199|| [[ai-game-devtools/devon]] — entropy-research 开源 AI 结对编程助手：支持 Claude/GPT-4o/Groq/Ollama 多模型，Electron+TUI 双界面，专注代码库编辑/探索/测试生成，AGPL |
   200||| [[ai-game-devtools/chrome-gpt]] — AutoGPT agent 控制 Chrome 浏览器：Selenium + LangChain，支持 Auto-GPT/BabyAGI/Zero-shot 多种 agent 类型 |
   201|||| [[ai-game-devtools/glm-4]] — THUDM/ZhipuAI 32B LLM 系列（GLM-4/Z1/Z1-Rumination），Agent 优化，128K context，BFCL 69.6%，函数调用优于 GPT-4o |
   202|||| [[ai-game-devtools/glm-4.5]] — THUDM/ZhipuAI GLM-4.5/4.6/4.7 系列，MoE 架构（355B-A32B），混合推理+工具调用，MIT 许可 |
   203|||| [[ai-game-devtools/gpt4all]] — Nomic 本地 LLM 运行平台：桌面 GUI + Python/TS 绑定 + llama.cpp 后端，支持 Vulkan/CUDA GPU 加速，MIT |
   204||||| [[ai-game-devtools/gpt-oss]] — OpenAI 开放权重推理模型（120B/20B MoE），Apache 2.0，MXFP4 量化，单卡 80GB 可运行，含 Browser/Python/ApplyPatch 工具 |
   205|||| [[ai-game-devtools/orion-14b]] — OrionStarAI 14B 多语言 LLM（中文/英文/日文/韩文），2.5T tokens 预训练，C-Eval 72.9/CMMLU 70.6/MMLU 69.9 全面超越同尺寸竞品，LongChat 支持 320k token，Apache 2.0 |
   206|||| [[ai-game-devtools/pandallm]] — DandelionsLLM 中文开源大模型：PandaLLM（LLaMA1/2 中文预训练）+ PandaLLMOps（全流程训练推理部署工具）+ PandaCommunity 社区，Apache 2.0 |
   207|||||| [[ai-game-devtools/stable-lm]] — Stability AI 开源 LLM 系列（3B/7B/13B），StableLM-3B-4E1T 多 epoch 训练 4T tokens SOTA，CC BY-SA-4.0 |
   208||||||| [[ai-game-devtools/webgpt]] — 0hq 纯浏览器端 GPT 推理：WebGPU + WGSL 自定义着色器，117M~1.5B 模型免构建直接开 HTML 运行，适合教育目的，MIT |
   209|||||||| [[ai-game-devtools/wordgpt]] — filippofinke Microsoft Word Office 插件：OpenAI text-davinci-003 集成，Prompt 输入→生成→插入文档，React + Fluent UI，MIT |
   210||| [[ai-game-devtools/nvidia-nemo-agent-toolkit]] — NVIDIA 开源多智能体编排框架（Apache 2.0）：框架无关的 Agent 连接层，插件支持 LangChain/CrewAI/LlamaIndex 等 7+ 框架，企业级可观测性+评估+安全测试，CLI 工作流驱动，Python 3.11-3.13，无需 GPU |
   211||| [[ai-game-devtools/om-agent]] — OmAI Lab 多模态语言智能体框架：Conductor 工作流引擎 + YAML 配置驱动、8 种推理算子(ReAct/CoT/SC-CoT/PoT 等)、VLM/视频理解/STT 多模态、Redis/Milvus 双记忆、Lite 模式无需中间件
   212||| [[ai-game-devtools/openagents]] — XLang NLP Lab 开源语言 Agent 平台：Data/Plugins/Web 三大 Agent + Next.js Chat UI + Flask 后端 + MongoDB/Redis 存储 + Chrome 扩展自动浏览，基于 LangChain，3000+ 用户，Apache 2.0
   213|||| [[ai-game-devtools/open-oasis]] — Decart×Etched 交互式世界模型：DiT 架构 + ViT VAE，键盘动作→自回归游戏画面帧生成，500M 参数开源版，HuggingFace 权重
   214|||| [[ai-game-devtools/pipecat]] — pipecat-ai 实时语音/多模态 AI Agent 框架：Frame-based 管道架构、60+ AI 服务集成（STT/LLM/TTS/Vision）、Daily/LiveKit WebRTC 传输、多平台 SDK（JS/React/Swift/Kotlin/C++）、BSD-2-Clause
   215|||| [[ai-game-devtools/sotana]] — DeepSoftwareAnalytics 软件工程指令微调模型：LLaMA + LoRA（7B/13B/30B），覆盖 Stack Overflow 问答/代码生成/代码摘要三类任务，PEFT 高效微调 |
   216|||| [[ai-game-devtools/ten-agent]] — TEN-framework 开源实时多模态对话 AI 框架：低延迟语音/视频 Agent，多语言架构(Python/C/C++/TS/Rust/Go)、VAD/Turn Detection/唇形同步/ESP32 硬件支持、RTC/WebSocket 双传输，Apache 2.0
   217|||| [[ai-game-devtools/translation-agent]] — Andrew Ng 反射式 Agent 翻译工作流：翻译→反思→改进三步循环，支持区域语言变体/术语表定制，Gradio WebUI 多 LLM 端点，MIT
   218|||| [[ai-game-devtools/video2game]] — 视频转 3D 游戏场景管线：NeRF→网格提取→纹理烘焙→碰撞体生成→Three.js/Unreal 集成，Omnidata 先验+V-HACD 凸分解，单视频生成可交互 3D 环境
   219|||| [[ai-game-devtools/video-of-thought]] — 首个视频 Chain-of-Thought 推理框架（ICML 2024 Oral）：MotionEpic 视频 MLLM(Vicuna-7B+CLIP ViT-L/14+STSG 图编码器) + 5 步 VoT 推理链(任务定义→对象跟踪→动作分析→排序问答→答案验证)，BSD
   220|||| [[ai-game-devtools/webdesignagent]] — 阿里达摩院自主网站生成 Agent：多模态输入(文本/模板/图片)→结构规划→Tailwind CSS 网页生成，GUI+CLI 双模式，人机反馈循环，Apache 2.0
   220||| [[ai-game-devtools/wordware-twitter]] — Wordware AI Twitter 人格分析 Agent：Next.js + TypeScript + Neon DB + Drizzle ORM，三通道 Twitter 数据抓取降级（API/Apify/SocialData），模块化 Prompt 系统（ROAST/FULL/PAIR），Stripe + PostHog + Loops 完整 SaaS 架构
   221|||| [[ai-game-devtools/csgo]] — InstantX 内容-风格解耦图像生成框架：SDXL 基座 + IP-Adapter，4 内容 Token + 16/32 风格 Token，支持文本/图像/编辑驱动风格化合成，DeepSpeed Zero2 训练，HuggingFace 权重 |
|||| [[ai-game-devtools/index-anisora]] — Bilibili 开源动漫视频生成模型（IJCAI'25）：V1基于CogVideoX-5B/V2基于Wan2.1-14B，时空掩码模块+多引导控制（姿态/深度/线稿/音频），VBench运动平滑度99.34 SOTA，RLHF训练管线，1000万+数据支持
   222|
   223||||| [[ai-game-devtools/diffsynth-studio]] — ModelScope 开源扩散模型引擎：FLUX/Wan/Qwen-Image 等多模型推理+训练+极低显存管理(6GB)，Apache 2.0
|||| [[ai-game-devtools/dolphin]] — BUAA+NTU 视频交互平台：LangChain Agent + 17 种视频工具（理解/处理/生成/音频/图像），多 GPU 分配 + YAML 配置驱动 + Gradio UI，支持中英双语
|||| [[ai-game-devtools/dream-cinema]] — 清华大学电影迁移框架：3D AIGC 角色生成 + 相机轨迹优化 + 结构引导运动迁移，arXiv 2408.12601，MIT，代码未发布
| [[ai-game-devtools/edge]] — Stanford TML CVPR 2023 音乐驱动可编辑舞蹈生成：Transformer Decoder + Gaussian Diffusion + Jukebox 音乐特征 + FiLM 条件调制，支持关节级编辑和帧间插补，AIST++ 数据集
## Avatar
   224|
   225||| [[ai-game-devtools/animate-anyone]] — Alibaba 智能计算研究院扩散模型角色动画框架：ReferenceNet + Pose Guider + 时空注意力UNet，单图+姿态序列→一致性动画视频，DeepGPU加速 ~40%，支持虚拟试衣/说话头像集成
   226|||| [[ai-game-devtools/aniportrait]] — Tencent Games Zhiji 音频驱动肖像动画：wav2vec2 → audio2mesh/audio2pose → 3DMM参数 + AnimateDiff Motion Module 3D UNet，支持自驱动/人脸重演/音频驱动三模式，Apache 2.0 |
   227||| [[ai-game-devtools/calm]] — NVIDIA Research Isaac Gym 虚拟角色控制：CALM对抗式潜在模型 + HRL两级架构（HLC任务决策/LLC运动执行），AMP动作先预训练 + 风格约束精确训练 + 无额外推理，剑盾风格人形角色，NVIDIA License |
   228||| [[ai-game-devtools/ditto-talkinghead]] — Ant Group ACM MM 2025 实时说话头部合成：motion-space 扩散(LMDM) + HuBERT 音频编码 + LivePortrait 面部操控，TensorRT/PyTorch 双后端，实时流式推理，Apache 2.0 |
   229|||| [[ai-game-devtools/chatdollkit]] — uezo Unity 3D 虚拟助手 SDK：LLM(ChatGPT/Claude/Gemini/Dify) + STT/TTS 完整语音管线，VRM 表情/动画/口型同步驱动，支持 WebGL/iOS/VR/AR，Silero VAD + Barge-in 打断 + 多 AITuber 对话，MIT |
   230|||| [[ai-game-devtools/dreamtalk]] — 清华大学&蚂蚁 arXiv 2023 扩散模型音频驱动说话头像生成：Wav2Vec2音频编码 + 3DMM风格扩散(DDPM/DDIM) + PIRender面部渲染，多风格控制(CFG)，支持歌曲/多语言/嘈杂音频，非商用许可 |
   231||| [[ai-game-devtools/duix]] — duix.com 移动端实时 AI Avatar SDK：Android/iOS 原生部署 + NCNN/ONNX 离线推理 + PCM流式音频驱动 + 口型同步/动作控制，<120ms延迟，Community License |
   232|||| [[ai-game-devtools/echomimic]] — Ant Group AAAI 2025 音频驱动肖像动画：SD v1.5 扩散 + Whisper-Tiny 音频编码 + 轻量地标 CNN，支持纯音频/纯地标/混合三种驱动，HDTF FID 29.13/FVD 493，超越 SadTalker/AniPortrait/Hallo，学术研究许可 |
   233||||| [[ai-game-devtools/emoportraits]] — Nikita Drobyshev arXiv 2024 情绪增强单镜头头像生成：两阶段 volumetric 3D 表示(基础avatar+情绪增强)，VoxCeleb2 HQ+FEED 数据集训练，视频驱动运动迁移+极端/非对称表情保留 |
   234|||| [[ai-game-devtools/emovoca]] — WACV 2025 语音驱动情感 3D 说话头像：Spiral Autoencoder 双编码(说话+情感)共享解码器 + FLAME 3D 人脸模型 + Wav2Vec2 音频特征，11 种情绪/3 级强度可控，CC BY-NC 4.0 |
   235|||| [[ai-game-devtools/e3-gen]] — ACM MM '24 3D 人体 Avatar 生成：SMPL-X + FLAME 模型集成 + 自定义 Deformer，2×RTX 3090 训练，支持生成/迁移/编辑/新姿态动画，学术研究许可 |
   236|||| [[ai-game-devtools/exavatar]] — ECCV 2024 全身可驱动 3D 高斯 Avatar：SMPL-X+FLAME 参数化驱动 + 修改版 3DGS 外观建模，手机视频→可动画 Avatar，支持自定义/NeuMan/XHumans 数据集 |
   237|||| [[ai-game-devtools/facefusion]] — 行业领先的人脸操作平台：人脸检测/交换/增强/唇同步/表情恢复等多处理器组合，Gradio Web UI + headless/batch 模式 + 作业管理系统，OpenRAIL-AS 许可 |
   238|||| [[ai-game-devtools/geneavatar]] — CVPR 2024 单图像 3D 头部 Avatar 编辑框架：3DMM 驱动三平面修改场 + 体渲染几何变形/纹理混合 + 自动解码优化实现 2D→3D 编辑提升，支持 INSTA/NeRFBlendShape/Next3D 多种表示，代码待发布
   239|||| [[ai-game-devtools/geneface-plus-plus]] — 中科院/浙大 通用稳定实时音频驱动 3D 说话头像生成：三阶段管线(Audio2Motion VAE → PostNet CNN+LLE → RADNeRF 渲染)，3DMM(BFM2009)参数化表示，支持眨眼注入/口型幅度控制，PyTorch+CUDA 11.7，预训练权重可下载 |
   240|||| [[ai-game-devtools/geneface]] — 浙江大学&字节跳动 ICLR 2023 音频驱动 3D 说话面部合成：3D地标VAE+NeRF渲染管线，RAD-NeRF实时推理/10h训练，跨说话人/语种高泛化，MIT
   241|||| [[ai-game-devtools/hallo]] — 复旦大学音频驱动肖像动画：SD 1.5+AnimateDiff Motion Module 基础+Wav2Vec 音频编码+InsightFace 人脸分析，层级式跨模态注意力融合，两阶段训练，ComfyUI 集成
   241||||| [[ai-game-devtools/hallo2]] — 复旦大学 ICLR 2025 长时长高分辨率音频驱动肖像动画：两阶段管线(扩散动画+CodeFormer超分)，支持4K/最长1小时输出，基于SD 1.5+AnimateDiff v2+Wav2Vec+InsightFace
   242|||||| [[ai-game-devtools/hunyuan-portrait]] — 腾讯混元 CVPR 2025 视频驱动肖像动画：SVD UNet3D 主干+DINOv2 身份编码+ArcFace 特征+HeadExpression/HeadPose 运动解耦，IntensityAwareMotionRefiner 精炼，软掩码贴回原分辨率，单3090可运行
   244||||||| [[ai-game-devtools/hunyuanvideo-avatar]] — 腾讯混元 MM-DiT 架构音频驱动多人角色动画：角色图像注入模块+情感控制(AEM)+面部感知音频适配器(FAA)独立注入，支持写实/卡通/3D/拟人多风格，10GB-96GB VRAM 弹性配置
   245||||| [[ai-game-devtools/id-animator]] — 零样本身份保留人体视频生成：单张面部照片→个性化视频，Face Adapter 注入身份嵌入到 AnimateDiff UNet3D，支持身份混合/ControlNet 兼容，无需微调
   246|||||| [[ai-game-devtools/intrinsic-avatar]] — CVPR 2024 单目视频动态人体逆渲染：显式光线追踪+物理 PBR 材质分解(albedo/roughness/metallic/normal)，SMPL 参数化驱动+LBS 变形+NeRFAcc 重要性采样，支持新视角合成+HDRI 重打光
   245||||| [[ai-game-devtools/liveportrait]] — 快手高效视频驱动肖像动画：Stitching+Retargeting 控制、图像/视频双模输入、Animals mode（猫/狗）、Motion Template 隐私保护、跨平台支持、Apache 2.0
   246|||||| [[ai-game-devtools/motiongpt]] — OpenMotionLab NeurIPS 2023 统一运动-语言模型：VQ-VAE将3D运动离散化为token+T5/GPT-2联合训练，支持文本到运动/运动字幕/运动预测/运动补间四任务，MIT
   247||||| [[ai-game-devtools/linly-talker]] — Kedreamix 数字人智能对话系统：ASR(Whisper/FunASR)→LLM(Linly/Qwen/Gemini/ChatGPT)→TTS(Edge/CosyVoice)→Avatar(SadTalker/MuseTalk)完整管线，Gradio WebUI 支持图片上传对话+语音克隆(GPT-SoVITS)，MIT
   248||||| [[ai-game-devtools/musepose]] — TME Lyra Lab 姿态驱动虚拟人生成框架：SD 1.5+AnimateDiff Motion Module+DWPose姿态条件，Reference/Denoising UNet+Pose Guider+Mutual Self-Attention管线，独有Pose Align算法，MIT代码/非商用模型
   249||||| [[ai-game-devtools/musetalk]] — TME Lyra Lab 实时音频驱动唇同步模型：ft-mse-vae 潜空间单步修复 + whisper-tiny 音频编码 + SD UNet cross-attention，30fps+(V100)/多语言/bbox_shift 可调嘴部开合，MIT
|||| [[ai-game-devtools/musev]] — TME Lyra Lab 虚拟人视频生成框架：视觉条件并行去噪支持无限长度视频，Text/Image/Video2Video，SD生态兼容(LoRA/ControlNet/IPAdapter)，ReferenceNet身份保真，~12GB VRAM，MIT代码/非商用模型
|||||| [[ai-game-devtools/sadtalker]] — CVPR 2023 音频驱动肖像动画：3DMM系数管线(Audio→表情/姿态)+face-vid2vid渲染，支持参考视频/Still模式/GFPGAN增强/512px高分辨率，SD WebUI扩展+Gradio+Discord，Apache 2.0
|||||| [[ai-game-devtools/sadtalker-video-lip-sync]] — SadTalker视频唇形同步改进：视频输入+Wav2Lip唇形生成+GFPGAN/GPEN区域增强+DAIN插帧(25→50/100fps)，5阶段管线，学术研究许可
|||| [[ai-game-devtools/portrait-4d]] — Xiaobing.AI CVPR 2024 + ECCV 2024 单视频驱动 4D 头部 Avatar：GenHead(StyleGAN3 生成器) + Triplane 重建器，合成数据驱动避免 3DMM 依赖，v2 用伪多视角 + ViT 跨注意力，支持 Marching Cubes 网格提取
   252||||| [[ai-game-devtools/stableavatar]] — 复旦大学+微软亚研院 首个端到端视频 DiT 无限长度音频驱动头像生成：Wan2.1-1.3B 骨干 + 时间步感知音频适配器防止隐空间漂移 + 动态滑动窗口融合，无需后处理，支持语音/唱歌/舞蹈，1.3B/14B 双版本，LoRA 训练支持
   253||||||| [[ai-game-devtools/topo4d]] — ECCV 2024 + T-PAMI 2025 拓扑保持 4D 头部捕捉：3D 高斯中心绑定网格顶点→规则布线动态面部网格+8K毛孔级纹理，多视角时序图像输入，消除手动对齐
   254||| [[ai-game-devtools/unity-ai-with-chatgpt]] — haili1234 Unity ChatGPT+UnityChan 语音交互展示：ChatGPT API 对话 + Unity-chan 3D 角色 + TTS 语音输出 + CMake 跨平台构建(Andoird/iOS/macOS/Win)，99 stars
|| [[ai-game-devtools/conr]] — 旷视研究院 IJCAI 2023 协作神经渲染：ResNet50/18 双骨干 + CINN Shader + RGBA Decoder，动漫角色设定图(PNG透明)+UDP姿态序列→舞蹈视频，Streamlit WebUI + FFmpeg输出，无3D建模需求
|| [[ai-game-devtools/wav2lip]] — IIIT Hyderabad ACM MM 2020 音频驱动唇形同步：U-Net 编码器-解码器 + SyncNet 专家判别器作为感知损失，LRS2 训练，支持任意身份/语言/CGI 面孔，非商用许可
   255||||||| [[ai-game-devtools/disco-diffusion]]
   256|||| [[ai-game-devtools/grounded-segment-anything]] — IDEA Research 开源视觉检测+分割流水线：Grounding DINO 零样本检测 + SAM 像素级分割 + Stable Diffusion 重绘，6种交互模式Gradio App，ICCV 2023 Demo，Apache 2.0 |
   257|||| [[ai-game-devtools/segment-anything-2]] — Meta FAIR 通用图像/视频分割基础模型：Hiera backbone + streaming memory，实时视频分割，4 种尺寸（38.9M-224.4M），最高 91 FPS (A100)，SA-V 数据集，Apache 2.0 |
   258|||| [[ai-game-devtools/hivision-id-photos]]
   259||| [[ai-game-devtools/draggan]] — MPI Informatik SIGGRAPH 2023 交互式图像操控工具：基于 StyleGAN3 潜在空间点拖拽变形，实时优化保持逼真度，支持 ImGui 桌面 GUI + Gradio Web/Docker/Colab，PTI 反转编辑真实图像，CC-BY-NC 4.0 |
   260|||| [[ai-game-devtools/dwpose]] — IDEA-Research ICCV 2023 全身姿态估计：两阶段知识蒸馏(RTMPose+YOLOX)，替换 ControlNet 中 OpenPose，Whole AP 0.665(384×288)，ONNX 推理，Apache 2.0 |
   261|||| [[ai-game-devtools/llamagen]] — FoundationVision 自回归图像生成模型：VQ-VAE tokenizer + GPT next-token prediction，111M-3B 参数规模，FID 2.18（ImageNet），超越 diffusion 方法，MIT，vLLM 300-400% 加速 |
   262|||||| [[ai-game-devtools/lumina-image-2-0]] — Alpha-VLLM 统一高效图像生成 DiT 框架（ICCV 2025）：Gemma-2-2B 文本编码+FLUX-VAE-16CH，2.6B 参数/1024 分辨率，Flash Attention+RMSNorm+多求解器(Midpoint/Euler/DPM)，Diffusers/ComfyUI 集成，LoRA 微调，Apache 2.0 |
   263||| [[ai-game-devtools/lumina-mgpt]] — Alpha-VLLM 多模态自回归模型家族：Chameleon 架构扩展+VQ-VAE 图像 token 化，7B/34B 参数，支持文本生成图像/图像理解/Omni 多任务（深度/分割/姿态），FSDP 训练+Gradio 演示，Apache 2.0 |
   264|||| [[ai-game-devtools/makeanything]] — NUS Show Lab FLUX.1 多域程序序列生成：Asymmetric LoRA 21域共享 + Recraft 图生序列(4/9帧)，1024/1056分辨率，覆盖乐高/绘画/雕塑等21创意域，HuggingFace权重+数据集 |
   265|||| [[ai-game-devtools/sd-webui-controlnet]] — Mikubill A1111 WebUI ControlNet 扩展：20+预处理器(姿态/深度/边缘/法线)、多路ControlNet输入、3种控制模式、Reference-Only、IP-Adapter集成，GPL v3 |
   266|||||| [[ai-game-devtools/stable-art]] — isekaidev 开源 Photoshop 插件(v23.3.0+)：Vue 2 + Adobe UXP 将 Stable Diffusion(Automatic1111 后端)嵌入 PSD 工作流，选区即蒙版零门槛 inpaint，Lexica.art 提示词搜索集成，MIT |
   267||||| [[ai-game-devtools/stable-diffusion-3-5]] — Stability AI SD3.5 官方推理参考实现：MM-DiT 架构+三文本编码器(CLIP-L/CLIP-bigG/T5-XXL)+16 通道 VAE，支持 Large/Turbo/Medium 变体+ControlNet，官方推荐 [[ai-game-devtools/comfyui]] 作为生产推理 UI |
   268||||| [[ai-game-devtools/stable-diffusion-cpp]] — leejet 纯 C/C++ 扩散模型推理引擎（ggml 后端）：类 llama.cpp 架构、SD/FLUX/Wan 15+ 模型家族、41 种量化格式、7 种 GPU 后端、多语言绑定(Go/C#/Python/Rust/Dart)，内置 Web UI，MIT |
   269||| [[ai-game-devtools/skywork-unipic]] — Skywork multi-image editing model suite (diffusion + autoregressive, 1-6 input images)
   270||| [[ai-game-devtools/stablestudio]] — Stability AI 开源版 DreamStudio：React + TypeScript + Zustand + Tailwind，插件化后端（SD/ComfyUI/WebGPU），MIT
   271|||| [[ai-game-devtools/unity-ml-stable-diffusion]] — keijiro Unity Core ML Stable Diffusion 插件：Apple Silicon 原生推理，编辑器/运行时双模式，支持文生图/图生图/SD-Turbo(LCM)，P/Invoke+C# async 异步管线，ComputeShader 预处理
||||| [[ai-game-devtools/sdxs]] — IDKiro 实时一步潜扩散模型
||||| [[ai-game-devtools/tooncomposer]] — TencentARC ICLR 2026 卡通制作生成式后关键帧工具：基于 Wan2.1-I2V-14B，草图+颜色掩码→完整卡通动画序列(480p/608p, 61帧)，~57GB VRAM，Gradio Web UI
||||| [[ai-game-devtools/tooncrafter]] — CUHK+腾讯 SIGGRAPH Asia 2024 卡通插值扩散模型：起始帧+结束帧→16帧平滑动画(512x320)，DualRef VAE+3D UNet时间注意力，DDIM采样，~24GB VRAM，ComfyUI/Colab/Windows多平台支持
||||| [[ai-game-devtools/talecrafter]] — VideoCrafter SIGGRAPH Asia 2023 交互式故事可视化工具：S2P故事→T2L布局→C-T2I可控图像→I2V动画四模块管线，多角色一致性，学术研究许可
||||| [[ai-game-devtools/animate-a-story]] — AILab-CVC arXiv 2023 检索增强故事视频生成：Motion Structure Retrieval + 结构引导T2V两大模块，深度图运动控制 + 概念个性化跨片段角色一致性，学术研究许可

## Texture (3D Asset Generation)
   275|||| [[ai-game-devtools/cf-3dgs]] — NVIDIA Labs CVPR 2024 免 COLMAP 3D 高斯重建：渐进式训练联合优化相机位姿+3D Gaussians，双帧初始化→顺序添加→全局精化，支持 Tanks&Temples/CO3D/自定义视频，NVIDIA 专有许可 |
   276|||| [[ai-game-devtools/character-gen]] — VAST-AI SIGGRAPH'24 单图→3D角色生成：多视角姿态规范化(A-pose)+两阶段管线(2D扩散→3D重建)，基于Tune-A-Video+TripoSR，Gradio演示+Mixamo绑骨支持
   277|||||| [[ai-game-devtools/animate3d]] — CASIA+阿里 NeurIPS 2024 3D模型动画生成：多视角视频扩散(MV-VDM)+4D-SDS精炼，Mesh/Gaussian Splatting双支持，~15分钟生成动画
   278|||| [[ai-game-devtools/any2point]] — ECCV 2024 3D理解框架：3D-to-Any虚拟投影+Guided Adapter，适配CLIP/DINOv2/ImageBind到点云任务，仅0.8M参数达SOTA，支持语言/视觉/音频模态
   279|||| [[ai-game-devtools/3d-llm]] — UMass Amherst NeurIPS 2023 Spotlight 首个原生处理3D表示的LLM：基于BLIP2/salesforce-lavis，支持物体级(Objaverse)和场景级(ScanNet/HM3D)3D问答，SAM+CLIP三阶段3D特征提取管线
   280|||||| [[ai-game-devtools/crm]] — 清华大学单图→3D 有纹理网格生成模型：两阶段扩散（多视角像素图+CCM几何纹理图）+ FlexiCubes + nvdiffrast 渲染，10 秒生成带 UV 纹理 OBJ，arXiv 2024 |
   281|||||| [[ai-game-devtools/direct3d-s2]] — DreamTechAI NeurIPS 2025 大规模 3D 生成框架：Spatial Sparse Attention (SSA) 加速 DiT，8 GPU 训练 1024³ 分辨率 SDF 网格，v1.1 比 FlashAttention-2 快 12.2× 前向/19.7× 反向，单图→OBJ 网格，MIT |
   282|||||| [[ai-game-devtools/city-dreamer]] — CVPR 2024 组合式无限 3D 城生成模型：VQVAE 布局生成器 + GANcraft 风格背景/建筑实例生成器，patch-based 无限城市合成，NTU S-Lab，Gradio 演示+CLI
   283|||||| [[ai-game-devtools/dream-catalyst]] — KAIST CVML ICLR 2025 快速 3D 编辑框架：SDS 采样动力学分析 + 三参数(χ/δ/γ)控制可编辑性与身份保持，Fast Mode 仅需 1/3 迭代，NeRF+3DGS 双支持 |
   284||||||| [[ai-game-devtools/dreamgaussian4d]] — NTU S-Lab arXiv 2023 生成式 4D 高斯场景：单图→静态3D(LGM/DreamGaussian)→K-planes形变场→动态4D高斯，支持Image/Video-to-4D、viser GUI、Gradio Demo
   285|||||| [[ai-game-devtools/gaussctrl]] — Oxford+MBZUAI ECCV 2024 3DGS 文本编辑工具：NeRFStudio 扩散模型驱动，多视角一致性编辑（默认4参考视图），Lang-SAM 掩码，BSD
   286||||||| [[ai-game-devtools/gaussiancube]] — USTC+MSRA NeurIPS 2024 结构化辐射表示：Optimal Transport 将高斯重排为体素网格 + 3D U-Net 扩散模型，参数少1-2个数量级，支持文本/类别/无条件3D生成，HuggingFace预训练
   287||||||| [[ai-game-devtools/gaussiandreamer]] — HUST+华为 CVPR 2024 文本到3D高斯生成：Shap-E 3D扩散初始化 + SD 2D扩散指导，15分钟单GPU，T³Bench平均45.7超越ProlificDreamer，支持Avatar/Unity导出，Apache 2.0 |
   288|||||| [[ai-game-devtools/holo-dreamer]] — 北京大学+鹏城实验室 arXiv 2024 文本到3D全景场景生成：等距柱状全景图初始化 + 3DGS两阶段重建（预优化→Inpainting→迁移优化），圆形混合消除接缝，MIT |
   289||||||||| [[ai-game-devtools/gala3d]] — 北京大学 VDIG Lab ICML 2024 文本到3D场景生成：LLM布局先验+3D高斯溅射+组合扩散优化四阶段管线，支持文本驱动场景编辑，学术免费商用需授权
   290|||||| [[ai-game-devtools/dreammat]] — SIGGRAPH 2024 PBR 材质生成工具：几何+光照感知 ControlNet + SDS 优化生成 albedo/roughness/metallic 贴图，基于 threestudio 框架，MIT |
   291|||||| [[ai-game-devtools/hunyuan3d-2-0]] — 腾讯混元两阶段 3D 资产生成：DiT 形状生成 (0.6B~3.0B) + PBR 纹理合成，单图→高分辨率 mesh，FlashVDM 加速/ComfyUI/Blender 插件，6~16GB VRAM
   292|||||| [[ai-game-devtools/hunyuan3d-2-1]] — 腾讯混元第三代 3D 资产生成：完全开源权重+训练代码，PBR 纹理管线（金属反射/次表面散射），Shape 3.3B + Paint 2B，四项形状基准 SOTA，29GB VRAM
   293||||||| [[ai-game-devtools/hunyuan3d-1]] — 腾讯混元统一文本/图像到 3D 生成框架：两阶段管线（多视角扩散 4s + 前馈重建 7s），lite/std 双版本，Gradio Web UI，10-25 秒生成 3D mesh，Apache 2.0 + 非商用权重 |
   294||||||| [[ai-game-devtools/stable-dreamfusion]] — Jiaxiang Tang DreamFusion 开源实现：Stable Diffusion 替代 Imagen + SDS 损失 + NeRF(Instant-NGP/Vanilla/Taichi) + DMTet 网格提取 + PerP-Neg 多面缓解，SD 1.5/2.0/2.1/DeepFloyd-IF/Zero-1-to-3 后端
   295||||||| [[ai-game-devtools/threestudio]] — threestudio-project 统一 3D 内容生成框架：插件式架构+OmegaConf 配置，支持 DreamFusion/ProlificDreamer/HiFA/Magic123/Gaussian Splatting/InstructNeRF2NeRF 等 10+ 方法，Apache-2.0，~7k stars
   296|||||| [[ai-game-devtools/triposr]] — Tripo AI × Stability AI 单图→3D 前馈重建模型(LRM)，Transformer+Triplane+NeRF 管线，<0.5秒(A100)，6GB VRAM，DINOv2 图像编码+Marching Cubes 提取，MIT
   297||||||| [[ai-game-devtools/3dtopia]] — NTU/Tencent 两阶段文本到3D生成：Stage 1 扩散模型快速生成候选+Stage 2 threefiner网格精化，Triplane+EG3D渲染器，DDIM/DPM-Solver采样，arXiv 2403.02234
   298||||||| [[ai-game-devtools/3dtopia-xl]] — CVPR 2025 Highlight 3D PBR资产生成：PrimX原始体表示+3D DiT扩散架构，单图/文本→高质量mesh+PBR材质，Objaverse子集训练，HuggingFace Demo
   299||||||| [[ai-game-devtools/stable-fast-3d]] — Stability AI 单图像→3D 网格前馈重建模型（基于 TripoSR 改进），UV 自动展开 + PBR 材质预测(albedo/roughness/metallic/normal) + 光照解耦，6GB VRAM，ComfyUI 集成，非商用许可 |
   300||||||| [[ai-game-devtools/step1x-3d]] — 阶跃星辰两阶段 3D 资产生成：VAE-DiT 几何(1.3B) + SD-XL 纹理(3.5B)，2M 清洗数据集，830K UID 开源，LoRA 可迁移，Apache 2.0 |
   301|||||||| [[ai-game-devtools/infinigen]] — Princeton V&L Lab CVPR 2023/2024/2025 程序化 3D 世界生成：Blender bpy 后端，自然场景/室内房间/可关节资产三大模块，完整 Ground Truth 标注管线，SLURM 集群并行，BSD-3-Clause
   302||||||| [[ai-game-devtools/instant-ngp]] — NVIDIA SIGGRAPH 2022 即时神经图形原语：多分辨率哈希编码+tiny-cuda-nn，NeRF 训练<5秒(RTX 3090)，支持 NeRF/SDF/神经图像/体积渲染，VR+Python绑定，NVIDIA NC许可
   303|||||| [[ai-game-devtools/isotropic3d]] — PKU arXiv 2024 图像到3D生成：单张RGBA图的CLIP图像embedding作为SDS引导（无需文本prompt），基于threestudio框架+NeRF体积渲染+多视角扩散指导，A100 GPU
   304|||||| [[ai-game-devtools/interactive3d]] — CVPR 2024 交互式 3D 生成框架：用户迭代引导的生成→编辑→精炼循环，Gradio Web UI + 键盘实时控制，基于 threestudio 框架，支持渐进式 3D 资产创作
   305|||| [[ai-game-devtools/dreamspace]] — IEEE VR 2024 文本驱动全景纹理传播框架：粗到细全景纹理生成 + 双纹理对齐 + 分离式传播策略（置信区域 inpaint + 隐式模仿网络），支持 VR 头显部署 |
   306|||||| [[ai-game-devtools/dream-textures]] — Blender Stable Diffusion 纹理插件：文字生成无缝贴图/纹理投影/Inpaint-Outpaint/Cycles AI 渲染通道/4x 超分，HuggingFace Diffusers 后端，本地+云端，GPL-3.0
   307||||| [[ai-game-devtools/dust3r]] — Naver Labs CVPR 2024 免 COLMAP 3D 重建基础模型：ViT-L/B 非对称编码器直接回归 pointmaps+相机位姿+置信度，2+图片输入→全局对齐点云，HuggingFace Hub 集成，CC BY-NC-SA 4.0
   308||||||| [[ai-game-devtools/instruct-humans]]
   309||||| [[ai-game-devtools/intex]] — arXiv 2024 交互式文本到纹理合成：统一深度感知修复，多视角遍历+Stable Diffusion 生成，法线/深度/ip2p/深度修复多种控制模式，DearPyGui 实时 GUI，UV 空间自动融合，支持 LCM 加速
   310||||| [[ai-game-devtools/llama-mesh]] — NVIDIA Toronto AI Lab + 清华大学 LLM 驱动 3D 网格生成：OBJ 文本化表示 + Llama 3.1 8B 微调，对话生成 3D 模型，非商业 License
   311|||||| [[ai-game-devtools/lion]] — NVIDIA T-Labs NeurIPS 2022 3D 点云扩散生成模型：两阶段 VAE+两级扩散先验（全局形状+局部细节），PVCNN2 骨干+CLIP 文本条件化(text2shape)，HuggingFace checkpoint 可用，NVIDIA 专有许可
   312||||| [[ai-game-devtools/materialseg3d]] — ACM MM 2024 Oral 3D 材质分割管线：2D 先验知识驱动 PBR 材质标注，GET3D+Text2Tex+mmsegmentation 三模块，MIO 数据集，Gradio 交互界面
   313||| [[ai-game-devtools/make-it-3d]] — 单图到高保真 3D 内容生成（ICCV 2023）：两阶段 NeRF 优化（Coarse+Refine），SD 2.0 扩散先验引导 + DPT 深度 + SAM 分割，OBJ mesh 导出
   314||| [[ai-game-devtools/meshanything]] — 自回归 Transformer 网格生成模型（350M参数）：网格/点云输入 → 简化艺术家风格网格输出（≤800面/30秒），Michelangelo 点云编码器 + Shape-OPT + 噪声抵抗解码器，SLab 许可
   315|||| [[ai-game-devtools/neuralangelo]] — NVIDIA CVPR 2023 高保真神经表面重建：SDF-based NeRF + hashgrid 编码 + coarse-to-fine 训练，从视频重建带纹理 3D 网格，COLMAP 集成管线，NVIDIA 许可
   316||||| [[ai-game-devtools/paint-it]] — CVPR 2024 文本驱动 PBR 纹理合成：Deep Image Prior + 未修改 SDS + nvdiffrast 微分渲染，生成 diffuse/roughness/metalness/normal 四张贴图，支持 Objaverse 批量/SMPL 人体纹理，学术许可
   317||||| [[ai-game-devtools/phys-rig]] — ICCV 2025 可微分物理绑定框架：MPM 物质点法替代 LBS，骨骼嵌入软体体积模拟，端到端可训练材质参数（杨氏模量/泊松比），支持软组织/尾巴/耳朵二级运动
   318|||||| [[ai-game-devtools/x-mesh]] — ICCV 2023 文本驱动 3D 网格风格化：动态文本引导 + SDS 优化同步改造几何和纹理，MIT-30 基准评测，PyTorch+kaolin，学术许可 |
   319||| [[ai-game-devtools/unity-gaussian-splatting]] — Aras Pranckevicius Unity 3DGS 实时渲染工具包：BiRP/URP/HDRP 三管线适配，GPU 基数排序，PLY→Unity 资产转换，147 FPS(RTX 3080 Ti)，支持 VR，MIT |
   320|
   321|## Code Tools
   322|
   323|| [[ai-game-devtools/bloop]] — BloopAI AI代码搜索工具：Rust后端+Tauri桌面+React前端，Tantivy全文搜索+Qdrant语义搜索+Tree-sitter AST解析，ONNX端侧embedding，Apache 2.0 |
   324|| [[ai-game-devtools/chapyter]] — Shannon Shen JupyterLab 扩展：%%chat magic 命令将自然语言转为 Python 代码并自动执行，guidance prompt 模板 + OpenAI/Azure API，JupyterLab≥4.0，BSD 3-Clause |
   325||| [[ai-game-devtools/codegeex]] — THUDM 13B 多语言代码生成模型（Python/C++/Java/JS/Go），850B tokens 预训练，HumanEval-X 评测，VS Code/JetBrains 插件，跨平台 Ascend/NVIDIA，KDD 2023，Apache 2.0 |
   326|||| [[ai-game-devtools/codegeex2]] — THUDM CodeGeeX 第二代：6B 参数+ChatGLM2架构+600B代码预训练，HumanEval Pass@1 35.9%超越Starcoder-15B，INT4量化仅5.5GB显存，94 tok/s，Apache 2.0 |
   327|||| [[ai-game-devtools/codegeex4]] — THUDM CodeGeeX 第四代：9B参数+GLM-4基座，128K上下文，HumanEval 82.3%，唯一支持Function Call的代码模型，Ollama/vLLM/Candle多部署方式，Apache 2.0 |
   328|| [[ai-game-devtools/aixcoder-7b]] — aiXcoder 7B 代码大模型：1.2T Tokens 训练，结构化 AST-FIM 训练任务（70%），7B 参数 RoPE/SwiGLU/GQA，nl2code 超越 CodeLlama 34B，跨文件代码理解，int8/int4 量化，Apache-2.0 |
   329|| [[ai-game-devtools/codegen]] — Salesforce 开源代码生成模型家族（CodeGen1/2/2.5），7B-16B 参数，ICLR 2023，7B 超 16B 性能，StarCoderData 预训练，Apache 2.0 |
   330||| [[ai-game-devtools/codegen2]] — Salesforce CodeGen 第二代（1B/3.7B/7B/16B）：原生代码 infilling 支持，19 种编程语言，The Stack v1.1 去重数据，ICLR 2023，研究用途 |
   331|||| [[ai-game-devtools/code-llama]] — Meta AI 基于 Llama 2 的代码大模型（7B/13B/34B/70B）：Base/Python/Instruct 三变体，16K训练/100K推理上下文，代码填充(infilling)能力，Llama 2 Community License |
   332||| [[ai-game-devtools/deepseek-coder]] — DeepSeekAI 代码语言模型系列（1B-33B）：2T tokens 预训练，86 种语言，16K FIM 代码补全，HumanEval 超越 CodeLlama-34B，MIT |
   333||| [[ai-game-devtools/starcoder]] — BigCode (HuggingFace+ServiceNow) 开源代码模型：80+ 语言，The Stack 数据集训练，OpenRAIL-M 许可，支持 PEFT 微调+8-bit量化(<20GB)，StarChat 编码助手变体 |
   334|||| [[ai-game-devtools/starcoder-2]] — StarCoder 第二代：3B/7B/15B 三档模型，600+ 语言，16K context，GQA+Sliding Window，The Stack v2 训练（3T-4T tokens），bitsandbytes 量化支持，Apache 2.0 |
   335|||| [[ai-game-devtools/codetf]] — Salesforce Code LLM 工具库：推理/微调/评估/数据集/代码工具一站式 Python 库，15+ 语言 tree-sitter AST 解析，PEFT 微调，pass@k/CodeBLEU 评测，~14 行代码完成微调，Apache 2.0
   336|||| [[ai-game-devtools/code-world-model]] — Meta FAIR 32B 代码世界模型：Dense decoder-only，交替局部/全局注意力(3:1)，131K context，Python执行轨迹+3M Agent交互轨迹中训练+多任务RL，SWE-bench Verified 65.8(+tts)
   337|||| [[ai-game-devtools/codet5]] — Salesforce 代码理解与生成模型家族：CodeT5 (EMNLP 2021, T5 encoder-decoder, 8 语言, CodeXGLUE SOTA) + CodeT5+ (2023, 220M-16B, 灵活模式, HumanEval 36.1% Pass@1), 初始化自 CodeGen, BSD-3 |
   338|||| [[ai-game-devtools/ai-code-translator]] — mckaywrigley 代码翻译 Web UI：Next.js + CodeMirror + OpenAI API，几百行代码，支持 JS/Python/Go/Rust/C++/Java/Ruby 多语言互译，MIT ||
   339|||| [[ai-game-devtools/pandas-ai]] — Sinaptik AI 自然语言数据分析工具：LiteLLM 驱动 + DuckDB SQL 引擎 + 代码生成→执行→解析流水线 + Docker 沙箱安全执行，支持 DataFrame 对话问答/图表生成/多表关联查询，MIT |
   340||| [[ai-game-devtools/unitygen-ai]] — himanshuskyrockets Unity Editor AI 代码生成插件：OpenAI Codex(text-davinci) 驱动代码生成，EditorWindow UI + ScriptableObject 配置 API Key，alpha 阶段作者已弃用，MIT ||
   341||| [[ai-game-devtools/void]] — voideditor 开源 Cursor 替代 IDE：VSCode 1.99.3 fork，Electron 双进程架构，OpenAI/Anthropic/Gemini/Ollama/Groq/Mistral 多 Provider 接入，Fast/Slow Apply 代码修改系统，MCP 支持，MIT，开发已暂停 |
   342|
   343||| [[ai-game-devtools/paint3d]] — OpenTexture CVPR 2024 3D 纹理生成：粗到细两阶段管线（深度生成→UV修复→2K上采样），无光照 albedo 贴图，kaolin 可微分渲染，Apache 2.0 |
   344||| [[ai-game-devtools/panic3d-anime-reconstruction]] — CVPR 2023 动漫角色单视图3D重建：线条填充模型+EG3D体积辐射场，单张动漫肖像→风格化3D角色头部，11.2k VRoid+1k VTuber数据集+AnimeRecon基准，支持说话头部动画扩展 |
   345||| [[ai-game-devtools/point-e]] — OpenAI 3D点云扩散生成系统（2022）：从图像/文本生成点云→4x上采样→SDF网格转换，Model Zoo 40M~1B共8个模型，基于guided-diffusion+CLIP，1024步扩散，MIT |
   346|||| [[ai-game-devtools/shap-e]] — OpenAI 条件化3D隐式函数生成（2023）：文本/图像→潜在扩散(300M)→NeRF隐式场，可渲染/导出网格，transmitter/text300M/image300M三模型，MIT |
   347|||| [[ai-game-devtools/unique3d]] — Tsinghua 单图→高质量3D网格生成：四阶段管线（多视图扩散→法线预测→微分网格重建→纹理投影），~30秒生成带纹理GLB，nvdiffrast可微渲染+连续重网格化优化，Gradio/ComfyUI支持 |
   348|||| [[ai-game-devtools/vivid-1-to-3]] — UBC Vision CVPR 2024 单图→多视角视频扩散新视图合成：Zero-1-to-3 (UNet2D) + Zeroscope v2 (UNet3D) 双管线，CLIPCameraProjection相机位姿注入，25帧256×256，Apache 2.0 |
   349||||| [[ai-game-devtools/wonder3d]] — HKU CVPR 2024 Highlight 单图→3D重建：跨域扩散模型联合生成6视角法线贴图+彩色图+法线融合网格提取，2-3分钟/张，正交相机假设，Instant-NSR/NeuS双后端，MIT |
   350|
   351|## Open Source Games
   352|
   353|| [[ai-game-devtools/paints-undo]] — lllyasviel 数字绘画行为模拟模型：SD1.5修改架构+VideoCrafter多帧插值，输入成品图→输出绘画过程视频（Ctrl+Z效果），24GB VRAM，Apache 2.0 |
   354|- [[open-source-game/athena-crisis]] — 现代复古回合战术策略，100K+ LOC 开源引擎，pnpm monorepo（athena/apollo/hera/ui/dionysus 包分离），TypeScript + Vite，MIT（代码）/ 专有（内容），Steam 商业化
   355|- [[open-source-game/the-battle-for-wesnoth]] — 高奇幻回合策略，WML+Lua 内容脚本系统，86K commits，C++17 + SDL2
   356|- [[open-source-game/vcmi]] — Heroes of Might and Magic III 完全开源引擎重实现，C++20 C/S 架构，Bonus DAG 传播系统，Callback 接口三层分离，多 AI 并存，ERM+Lua 双脚本
   357|- [[open-source-game/unciv]] — Civilization V 开源复刻 for Android & Desktop，LibGDX 跨平台，JSON 数据驱动规则集，Ktor 多人网络，Mod 系统，141K LOC Kotlin，Apache 2.0
   358|- [[open-source-game/0-ad]] —
   359|- [[open-source-game/freeorion]] — 4X 太空帝国回合策略，致敬 Master of Orion，C++20 + GiGi GUI + FOCS Python 脚本驱动，约 183K LOC C++
   360|- [[open-source-game/freecol]] — Colonization 开源复刻，Java 11 + Ant 构建，826 源文件，XML 数据驱动规则，模块化 client/server 架构，GPLv2
   361|- [[open-source-game/freeciv]] — Civilization 风格帝国建设回合策略，C 语言 + Meson 构建，server/client/common 三层模块化架构，191K LOC，约 29 年活跃开发，能力字符串版本协议支持多客户端网络互通，GPLv2
   362|- [[open-source-game/openxcom]] — X-COM: UFO Enemy Unknown / Terror From the Deep 开源复刻，C++/SDL，646 C++源文件，Geoscape/Battlescape/Basescape 三层模块架构，YAML Mod 规则集系统，2.1k stars，GPLv2
   363|- [[open-source-game/mindustry]] — 自动化塔防 RTS，Arc Engine + 代码生成 ECS + 帧同步多人
   364|- [[open-source-game/openage]] — Age of Empires 引擎复刻，C++20+Python3 双语言架构，Cython 绑定，nyan 配置格式，GPLv3
   365|- [[open-source-game/openhv]] — OpenRA 引擎科幻 RTS Mod，改编自 Hard Vacuum，MiniYAML 数据驱动，C# Traits 系统，源码 GPLv3 + 内容 CC BY
   366|- [[open-source-game/openenroth]] — Might and Magic VI-VIII 引擎清洁室重实现，C++23 + CMake，子系统模块化架构（Engine/GUI/Media/Scripting），LuaJIT + sol2 脚本，22 第三方子模块，~136K LOC，仅 MM7 可玩，GPLv2
   367|- [[open-source-game/opennox]] — Nox (Westwood 2000) 引擎清洁室重实现，SDL2+OpenGL+OpenAL 跨平台抽象，compat 层分离，Emscripten WebAssembly 支持，自研 VQA 视频解码器，MIT
   368|- [[open-source-game/openpanzer]] — 纯 HTML5/JS/Canvas 回合制坦克战，致敬 Panzer General 2，无第三方依赖，XML 剧本+Python 工具链转换，localStorage 存档，GPLv2
   369|- [[open-source-game/re3]] — GTA III 逆向工程重实现，Theseus之船渐进式替换策略，librw 自研 RenderWare 替代渲染引擎，D3D9/OGL3.3 双后端，约 188K LOC C/C++，需原版游戏数据
   370|- [[open-source-game/reone]] — KotOR/KotOR 2 引擎清洁室重实现，SDL2+OpenGL 3.3 自研引擎，NWScript 虚拟机，GFF/2DA 资源解析，~438 源文件，C++17，GPLv3
   371|- [[open-source-game/severed-chains]] — Legend of Dragoon PS1 逆向工程 Java 重实现，904 Java 文件，PS1 硬件仿真层(GTE/GPU/SPU)，Event-based 模组 API
   372|- [[open-source-game/permafrost-engine]] — OpenGL 3.3 RTS 游戏引擎，纯 C + Python 2.7 脚本，GPU 骨骼动画+分层流场寻路+Fiber 协作多任务，旗舰游戏 EVERGLORY
   373|- [[open-source-game/freeserf-net]] — The Settlers I 清洁室 C# 重实现，Silk.NET 跨平台渲染，BASS 音频，多人网络开发中，MIT
   374|- [[open-source-game/pooltool]] — Python 台球物理沙盒，Panda3D 渲染 + numba JIT 物理，事件驱动碰撞解析，多碰撞模型可插拔（Stronge/Mathavan/Han），JOSS 论文发表，Apache 2.0
   375|- [[open-source-game/open-golf]] — 跨平台迷你高尔夫游戏，纯 C 自研物理引擎（BVH 碰撞），Sokol 跨平台 3D 渲染，ImGui 内置关卡编辑器，光照贴图烘焙（xatlas+lightmapper），支持 Windows/Linux/macOS/Android/iOS/Web
   376|- [[open-source-game/standard-of-iron]] — 布匿战争历史 RTS，C++20/Qt6/OpenGL 3.3，ECS 架构，骨骼动画+布料物理，MIT
   377|- [[open-source-game/cnc-tiberian-dawn]] — EA 官方 C&C 原版（1995）源码，Watcom C++ + x86 汇编，OOP 类层次架构 (Foot/Unit/Building/AircraftClass)，IPX/Modem 多人大战雾系统，GPLv3
   378|- [[open-source-game/cataclysm-dark-days-ahead]] — 后世界末日生存 roguelike，480K LOC C++ JSON数据驱动 (~130K行JSON内容)，双渲染器 SDL2/Tiles+Ncurses，CC BY-SA 3.0，16.2k stars
   379|- [[open-source-game/daggerfall-unity]] — Unity 引擎重制《上古卷轴 II：匕首雨》，DaggerfallConnect 原生资产读取，QuestMachine 任务系统，FullSerializer 存档，ModManager 模组支持，MIT
   380|- [[open-source-game/devilutionx]] — Diablo + Hellfire 开源端口，清洁室逆向工程，259 C++/163 H ~54K LOC，CMake 多平台（17+平台），帧同步多人 dvlnet/，Lua 脚本扩展，MIT
   381|- [[open-source-game/freeablo]] — Diablo 1 引擎清洁室重实现，双线程架构（渲染/逻辑分离），确定性锁步网络，Nuklear GUI，~38K LOC C++17，**已归档**，MIT
   382|- [[open-source-game/fheroes2]] — Heroes of Might and Magic II 清洁室重实现，~210K LOC C++，纯 SDL2 无游戏引擎，engine/ + fheroes2/ 模块分离，多平台 Win/Mac/Linux/Android/iOS/Switch/Vita，engine/ 自研图像/音频/渲染系统，GPLv2
   383|- [[open-source-game/open-diablo-2]] — Go + Ebiten 2D 引擎实现的 Diablo 2 开源复刻，模块化架构（d2app/d2core/d2game/d2networking），帧同步 P2P 多人，otto JS 脚本引擎，**项目已拆分**：引擎→Abyss Engine，游戏→OpenDiablo2
   384|- [[open-source-game/abyss-engine]] — Diablo 2 纯 C 清洁室重实现引擎，SDL2+FFmpeg+LibArchive 依赖栈，~72 文件 ~4859 LOC C99，OpenDiablo2 拆分后的独立引擎层，MIT
   385|- [[open-source-game/veloren]] — Rust 体素多人 RPG，400K LOC，24 crates workspace，ECS (specs) + QUIC 网络 + 自研体素渲染器，GPLv3，~16K commits
   386|- [[open-source-game/space-station-14]] — Space Station 13 现代 C# 重制版，Robust Toolbox 自研引擎，Entity-Component 架构，YAML 原型数据驱动，MIT+CC-BY-SA
   387|- [[open-source-game/exult]] — Ultima VII 游戏引擎清洁室重实现，SDL 跨平台，完整支持《黑门》+《毒岛》，GPL v2，~48K LOC C++
   388|- [[open-source-game/u7-revisited]] — Ultima VII: The Black Gate 3D 重制引擎，Ghost（raylib 3D渲染）+ Geist（Lua脚本）双引擎架构，~49.5K LOC C++
   389|- [[open-source-game/gemrb]] — Infinity Engine 重实现（Baldur's Gate / Icewind Dale / Planescape: Torment），C++14 + Python3 脚本，40+ 插件化架构，46K LOC 核心引擎，GPLv2
   390|
   391|||
   392|||| [[open-source-game/commander-keen-in-keen-dreams]]
   393|| [[open-source-game/doom-3-bfg]] — id Tech 4 引擎源码，含 Portal 渲染、Lua 脚本、BFG Edition 收录 Doom Classic，GPL |
   394|| [[open-source-game/doom-64-re]] — Doom 64 完全逆向工程，C+MIPS 汇编，N64 SDK 交叉编译，~50K LOC C |
   395|||| [[open-source-game/doom]] — id Software 经典 FPS，1997年 Carmack 开源，BSP 树渲染，GPLv2，约 54K LOC C |
   396|| [[open-source-game/quake]] — 1996 年 3D FPS 里程碑，WinQuake+GLQuake+QuakeWorld，GPLv2，约 87K LOC C |
   397|| [[open-source-game/quake-2]] — 1997 年 3D FPS，双渲染器架构（OpenGL + Software），143K LOC C，GPLv2 |
   398|| [[open-source-game/quake-iii-arena]] — id Software 竞技场射击，QVM 虚拟机架构，纯多人竞技，GPL |
   399|| [[open-source-game/chocolate-doom]] — 精准还原 DOS Doom（含 bug）的开源端口，SDL2 跨平台，GPL |
   400|| [[open-source-game/chocolate-quake]] — 精准还原 Quake v1.09 DOS 体验，Bug 兼容优先，纯软件渲染，C99+CMake |
   401|| [[open-source-game/fteqw]] — 先进可移植 Quake 引擎，多后端渲染(OpenGL/Vulkan/Software/D3D)，GPL-2.0 |
   402|| [[open-source-game/uzdoom]] — GZDoom/ZDoom 延续，双渲染器架构(OpenGL/Vulkan+软件)，ZScript 虚拟机，~592K LOC C++ |
   403|| [[open-source-game/assault-cube]] — CUBE Engine 派生 FPS，ZLIB 极宽松许可，低延迟 ENet 网络，协作地图编辑 |
   404|| [[open-source-game/cube-2-sauerbraten]] — CUBE Engine 2 代体素 FPS，实时游戏内地图编辑，ENet UDP，~65K LOC C++ |
   405|| [[open-source-game/red-eclipse]] — 竞技场射击，Tesseract（Cube 2 派生）引擎，跑酷射击融合，内置协作地图编辑器，GPLv3 |
   406|| [[open-source-game/xonotic]] — Darkplaces 引擎（Quake 分支），精湛移动机械（Bunny Hop/Strafe Jump），.pk3dir 数据包格式，GPLv3 |
   407|| [[open-source-game/liblast]] — Godot 4 多人 FPS，Freeman Character System + Godot Jolt 物理，⚠️ 主仓库已弃用迁移至 liblast-framework |
   408|| [[open-source-game/supertuxkart]] — 开源卡丁车派对游戏，Bullet Physics 趣味物理，ENet UDP + 事件回滚网络同步，约 274K LOC C++ |
   409|| [[open-source-game/kkrieger]] — Farbrausch 96KB demo 工具链，Werkkzeug3 引擎分支，Portal 渲染/6-Pass 光照/V2 合成器，约 122K LOC C++ |
   410|| [[open-source-game/descent-3]] — 经典 6DOF 太空射击，SDL3+OpenGL 跨平台，GPL-3.0，需原版游戏数据 |
   411|| [[open-source-game/avp-forever]] — Aliens versus Predator (1999) 源码维护，多分支 rebasing 策略叠加各分支源码 |
   412|| [[open-source-game/beyond-all-reason]] — Spring/Recoil 引擎 RTS 游戏，约4.3GB仓库（含资源），Lua数据驱动，GL4着色器，BARb AI JSON配置分层设计 |
   413|- [[open-source-game/nakedavp]] — Aliens vs Predator Classic (2000) SDL3 现代化端口，双渲染器自动降级（OpenGL/GLES2）
   414|- [[open-source-game/naev]] — 2D 太空贸易战斗 RPG，灵感来自 Escape Velocity 系列，C+Rust 混合 + Meson 构建，SDL3+OpenGL 3.3+，GPLv3，插件系统支持
   415|- [[open-source-game/ambermoon-net]] — Ambermoon 经典 RPG 的完整 C# 重写，多平台（Win/Linux/Mac），.NET 6，模块化架构（Core/Data/Renderer/Frontend 分层），MIT
   416|- [[open-source-game/oolite]] — Elite (1984) 风格太空开放世界贸易战斗，Objective-C + C 双后端架构(Cocoa+SDL)，GPLv2，OXP 插件扩展系统，无原版游戏数据依赖
   417|- [[open-source-game/omnispeak]] — Commander Keen 4/5/6 开源重实现，多后端渲染架构（SDL2/GL/Vulkan/SDL3），Nuked OPL3 FM 合成器，约 51.8K LOC C
   418|| [[open-source-game/the-dark-mod]] — Doom 3/id Tech 4 引擎潜行 FPS，AAS 区域感知+AI 通信子系统，170+ 社区任务 |
   419|| [[open-source-game/duke-nukem-3d]] — 3D Realms 经典 FPS，Build Engine 驱动，Ken Silverman Sector/Portal 渲染，GPLv2 |
   420|| [[open-source-game/eduke32]] — 先进 Build Engine 端口，多游戏支持(Duke3D/SW/Blood/Ion Fury)，~116K LOC C++，GPLv2 |
   421|| [[open-source-game/raze]] — Build engine 多游戏合一引擎，GZDoom 技术栈，三渲染器架构(GL/GLES/Vulkan)，~578K LOC C++ |
   422|| [[open-source-game/jfduke3d]] — Jonathon Fowler 的 Duke Nukem 3D 开源移植版，SDL2 跨平台，Polymost OpenGL 渲染，GPLv2 |
   423|| [[open-source-game/jfshadowwarrior]] — Jonathon Fowler 的 Shadow Warrior 现代端口，Polymost OpenGL/GLES2，多平台，GPLv2 |
   424|| [[open-source-game/buildgdx]] — Build Engine 的 Java/LibGDX 跨平台移植，三渲染器，支持 Duke3D/Shadow Warrior/Blood，~74K LOC Java |
   425|| [[open-source-game/nubuildgdx]] — BuildGDX 稳定化分支（stability-first fork），atsb 维护，libGDX 1.9.10 旧依赖 |
   426|| [[open-source-game/nblood]] — Blood / Exhumed / Redneck Rampage 逆向工程端口，基于 EDuke32，GNU Make 跨平台构建 |
   427|| [[open-source-game/rigel-engine]] — Duke Nukem II 清洁室逆向重实现，C++17/SDL2+OpenGL 双渲染器，~45K LOC，GPLv2 |
   428|| [[open-source-game/ecwolf]] — Wolfenstein 3D 增强源码端口，ZDoom 体验+原版 Raycasting，~67K LOC C++，CMake+SDL2 |
   429|| [[open-source-game/wolf4sdl]] — Wolfenstein 3D SDL 移植版，OPL2 双模拟器（GPL/MAME），version.h 多版本条件编译 |
   430|| [[open-source-game/shadow-warrior]] — 3D Realms 经典 FPS，Build 引擎，118K LOC C，GPL+商业数据双许可 |
   431|| [[open-source-game/wolfenstein-3d]] — id Software 1992 经典 FPS，Raycasting 渲染，Borland C++ 3.0 + 80x86 汇编 |
   432|| [[open-source-game/scummvm]] — 经典图形冒险引擎复刻，支持141+游戏引擎（SCUMM/Myst/Blade Runner等），GPLv3+ |
   433|| [[open-source-game/super-mario-64]] — N64 经典 3D 平台跳跃完整反编译源码，2746 C 文件，多版本构建，GPLv2 |
   434|| [[open-source-game/portal64]] — Valve Portal N64 demake，移除 libultra 私有库，Skeletool64 骨骼动画+显示列表生成，17 室可玩，EPA/GJK 碰撞，约 41K LOC C |
   435|| [[open-source-game/vvvvvv]] — 重力翻转像素平台游戏，SDL2 极简依赖全部静态链接，Entity 159K+Game 229K+Editor 141K LOC，完整内置关卡编辑器 |
   436|| [[open-source-game/surreal-engine]] — Unreal Engine 1 清洁室重实现，C++20/D3D11+Vulkan 双渲染器，~99K LOC |
   437|| [[open-source-game/micropolisjs]] — SimCity 经典城市模拟 JavaScript 移植版，TypeScript+JS 混合，BlockMap 多维度追踪，GPLv3 |
   438|| [[open-source-game/openttd]] — Transport Tycoon Deluxe 开源复刻，C++/CMake/vcpkg，SDL2+OpenGL，多人锁步网络，NewGRF 图形扩展 |
   439|| [[open-source-game/open-goal]] — Jak & Daxter PC 移植，2.3M LOC GOAL 反编译+自研 GOAL 编译器+decompiler，Jak1 Complete/Jak2 Beta |
   440|||| [[open-source-game/openrct2]] — RollerCoaster Tycoon 2 开源重实现，C++20/CMake/Duktape JS插件引擎，TCP/IP多人合作 |
   441|- [[open-source-game/openrw]] — GTA III 清洁室重实现开源引擎，rwcore/rwengine/rwgame 模块化架构，OpenGL + Bullet Physics + SDL2，GPLv3，需原版游戏数据
   442|- [[open-source-game/openlara]] — 古墓丽影经典引擎开源重实现，多后端渲染架构（OpenGL/D3D8/D3D9/D3D11/Vulkan/Software），32 平台支持，固定点数学引擎，BSD 2-Clause
   443|- [[open-source-game/croftengine]] — Tomb Raider 1 引擎重制，v2.5.0，LGPLv3，支持幽灵竞速/合作/Glidos 纹理包，FFmpeg 视频解码，双渲染器架构(OpenGL+软件)，Boost+spdlog+FFmpeg 依赖栈
   444|- [[open-source-game/tomb-engine]] — Tomb Raider 1-5 引擎清洁室重实现，~180K LOC C++，sol2 Lua 绑定三层 ScriptInterface(Game/Level/State)，SMAA+SSAO+高帧率现代渲染管线，支持无缝关卡转换+无限制地图大小，MIT 修改版
   445|- [[open-source-game/lugaru]] — 跨平台 3D 动作游戏，兔人 Turner 武斗狼族阴谋，C++/SDL2/OpenGL ~38K LOC，双层骨骼动画插值（animCurrent+frameTarget），9种AI行为状态机（passive/guard/attack等），GPLv2+源码/CC BY-SA 3.0 资产双许可
   446|- [[open-source-game/overgrowth]] — Lugaru 续作，3D 动作冒险游戏，~227K LOC C++ 自研引擎（SDL2+OpenGL），AngelScript 脚本+Bullet Physics+Recast 导航，Apache 2.0 极宽松许可，需商业版游戏数据
   447|||||| [[open-source-game/openra]] — C# RTS 引擎
   448||| [[open-source-game/openbw]] — StarCraft: Brood War 核心引擎清洁室重实现，header-only C++ 架构（bwgame.h 22K行），确定性锁步网络 sync.h，BWAPI 兼容层 mini-openbwapi |
   449||| [[open-source-game/openkore]] — Ragnarok Online 自动化助手，Perl + C XS 扩展，Task 链式 AI 架构，三模式连接（XKore/XKore2/XKoreProxy），txt 数据驱动配置，GPLv2 |
   450|- [[open-source-game/minosoft]] — Minecraft 客户端完全从零重写（Kotlin/Java ~27K LOC），三模块架构（Core/Eros/Rendering），支持 1.7-1.20.4 多版本协议，Netty 网络层，事件驱动渲染，zstd 资产压缩，GPLv3
   451|- [[open-source-game/openko]] — Knight Online (1298/9) 清洁室逆向开源复刻，双端分离架构（Client DirectX9 + Server 跨平台 CMake），~265K LOC C++，多进程服务器(AIServer/Ebenezer/Aujard/ItemManager)，自定义二进制网络协议(LZF压缩+JvCryption加密)，学术目的，早期开发
   452|| [[open-source-game/openloco]] — Chris Sawyer's Locomotion 清洁室逆向重实现，C++/SDL3，运输帝国经营模拟 |
   453|| [[open-source-game/corsixth]] — Theme Hospital 开源克隆，C++/Lua 混合架构，SDL 渲染，数据驱动游戏逻辑 |
   454|| [[open-source-game/keeper-fx]] — Dungeon Keeper 开源增强版，A* 寻路(ariadne)+Lua 脚本 API+ENet 多人，~235K LOC C/C++，GPLv2 |
   455|| [[open-source-game/julius]] — Caesar III 清洁室重实现，SDL2 跨平台，100% 存档兼容，约93K LOC C |
   456|| [[open-source-game/akhenaten]] — Pharaoh 法老城市建造游戏开源重实现，Julius/Augustus 分支，SDL2 跨平台，GNU AGPL |
   457|| [[open-source-game/citybound]] — 微观模型城市建造，Rust Actor模型(kay)，协作规划理念，浏览器WebGL UI |
   458|| [[open-source-game/unknown-horizons]] — 2D 实时策略城市建造模拟，FIFE→Godot 4 移植项目，GDScript |
   459|| [[open-source-game/egregoria]] — Cities: Skylines 风格 Rust 城市建造，确定性锁步网络，PBR wgpu 渲染器 |
   460|| [[open-source-game/pioneer]] — 31世纪银河太空冒险RPG，程序化星系/经济/派系系统，开放世界探索+贸易+战斗 |
   461|| [[open-source-game/zelda3]] — Zelda A Link to the Past 完全重实现，70-80kLOC C，SNES 仿真层+逐帧 RAM 验证 |
   462|| [[open-source-game/the-legend-of-zelda-twilight-princess]] — Zelda TP 反向工程，字节级匹配反编译，多版本条件编译架构 |
   463||| [[open-source-game/dead-ascend]] — Qt/QML 手绘点击冒险游戏，僵尸塔楼密室解谜，Tiled TMX 地图格式，跨平台 |
   464||- [[open-source-game/hnefatafl]] — 北欧棋（Hnefatafl）Copenhagen 风格完整解决方案：引擎(GTP风格协议)+客户端(Iced)+服务器+AI，约 9017 LOC Rust，AGPLv3 |
   465||||| [[open-source-game/dune-ii-the-maker]] — C++23 重制 Dune II，SDL2 全家桶，三速 tick 游戏循环(thinkFast/Normal/Slow)，cGameState 状态机，cPlayerBrain Mission 队列 AI，INI 配置驱动数据，superweapon 系统(DeathHand/Fremen/Saboteur) |
   466|||| [[open-source-game/command-conquer-remastered-collection]] — EA 官方开源 C&C 泰伯利亚黎明+红色警戒源码，C + 内联汇编 + C# 地图编辑器，GPL v3，需持有原版游戏 |
   467|||| [[open-source-game/cn-c-red-alert]] — EA 官方红色警戒(1996)源码，Westwood DOS 游戏，C++17.9MB/Assembly 5.1MB 多层架构(CODE/WIN32LIB/VQA/IPX)，Watcom+TASM 编译，GPL v3 |
   468|||| [[open-source-game/torcs]] — 开源 3D 赛车模拟器，plib OpenGL 渲染，模块化物理仿真(simu)，标准化 Robot AI 接口，广泛用于学术研究 |
   469|| [[open-source-game/rigs-of-rods]] — 软体物理沙盒，节点-弹簧车辆形变实时仿真，OGRE 1.11 + AngelScript，2005 年项目，GPLv2 |
   470|| [[open-source-game/ddnet]] — Teeworlds DDRace 模组社区延续版，合作 2D 平台跳跃，C++/Rust 混合架构，CMake+Ninja 构建 |
   471|| [[open-source-game/sonic-robo-blast-2]] — 3D 索尼克同人作，基于 Doom Legacy 双渲染器（OpenGL+SDL2），Lua 脚本+DEHACKED 扩展，252K LOC C |
   472|| [[open-source-game/frogatto]] — Anura 引擎动作冒险平台跳跃游戏，引擎/模块分离架构，FFC 数据驱动脚本，16 语言本地化 |
   473|| [[open-source-game/fish-folk-jumpy]] — Fish Folk 战术 2D 射击游戏，Bevy/Rust + rapier2d 确定性物理，2-4 人本地/联机，bones_framework 游戏框架 |
   474|| [[open-source-game/fish-folk-punchy]] — Fish Folk 2.5D 清版动作游戏，Bevy 0.9 + Rapier2D 物理，figher_state.rs 2228 行状态机，支持 WASM/Web 原生运行 |
   475|| [[open-source-game/commander-genius]] — Commander Keen 1-6 + Dreams 开源解释器，C++ 完全重写（仅存 0.02% CloneKeen 代码），SDL2+OpenGL，LUA Mod，多人 4 人支持 |
   476|| [[open-source-game/whatajong]] — 麻将消消乐 Roguelite，Solid.js + TypeScript + Electron，Vanilla Extract CSS，rand-seed 确定性随机，Howler.js 音频，MIT |
   477|| [[open-source-game/blockout-ii]] — 3D 俄罗斯方块，C++/OpenGL/SDL，评估函数 Bot AI + 回放系统 + 在线排行榜，GPLv2，~12K LOC |
   478|| [[open-source-game/stunt-rally-3]] — 3D 科幻赛车+Ogre-Next 渲染+VDrift 仿真，内置赛道编辑器，232 条赛道，33 辆载具，GPLv3 |
   479|| [[open-source-game/rvgl]] — Re-Volt 现代跨平台复刻，SDL2+OpenGL/Vulkan，核心私有+工具链/资产开源，Pack 内容管理系统，支持 16 人多人 |
   480|| [[open-source-game/yorg]] — TrackMania 风格开源赛车，Panda3D 引擎驱动，Python 3.x，多人 XMPP 同步，GPLv3 |
   481|- [[open-source-game/fallout-community-edition]] — Fallout 1 引擎清洁室重实现，SDL2 跨平台，135K LOC C++，保留原版 gameplay + bugfix + QoL 改进，MIT
   482|- [[open-source-game/fallout2-ce]] — Fallout 2 清洁室重实现，C++17/SDL2 多平台支持(GitHub API 分析：4.5MB+ C++，378 源码文件)，Sfall 兼容性层，保留原版 gameplay+bugfix+QoL，需原版游戏数据
   483|- [[open-source-game/dungeon-crawl-stone-soup]] — 经典 Roguelike，~412K LOC C++，双模式渲染(ASCII+SDL Tiles)，.des Vault 手绘关卡，17+ 神祇契约，数据驱动配置，GPLv2+，20年迭代
   484||| [[open-source-game/opennefia]] — Elona 日本 roguelike RPG 的模块化开源引擎复刻，.NET 8.0 + Love2dCS，Harmony 运行时补丁 + NuGet Mod 加载器，2058 C# + 436 Lua 文件
   485||| [[open-source-game/openmw]] — Morrowind 引擎清洁室重实现，C++20 + OpenSceneGraph + Bullet Physics，双脚本系统(遗留MWScript+现代Lua)，完整工具链(opencs/bsatool/esmtool/navmeshtool)，GPLv3，v0.51.0
   486||| [[open-source-game/nethack]] — 经典 Roguelike 地下城探索，Rogue/Hack 直系后裔，3.7 开发中；纯 C 无引擎架构
   487||| [[open-source-game/brogue-ce]] — 极简主义 Roguelike，Pure C 代码库，22个.c模块+Dijkstra寻路+确定性游戏回放系统
   488|- [[open-source-game/shattered-pixel-dungeon]] — 传统 Roguelike 地牢爬行器，libGDX 跨平台架构（Desktop/Android/iOS），Java/JDK 21，程序化关卡生成，5 大区域+天赋系统，6k stars，GPLv3
   489|- [[open-source-games-list]] — GitHub 开源游戏精选列表：18+ 品类（FPS/RPG/RTS/Roguelike/城市建造等），含源码链接 |
   490|
   491|- [[open-source-game/trigger-rally]] — 纯 C++ 拉力赛车游戏，PEngine/PSim/Trigger 三层架构，程序化地形高度图生成，GPL v2
   492|- [[open-source-game/vdrift]] — 开源漂移赛车模拟器，Bullet 物理 + SDL3
   493|- [[open-source-game/wipeout-rewrite]] — wipEout (1995 PSX) 清洁室重实现，纯 C 双平台后端(SDL2/Sokol) + 三渲染器架构
   494|| [[open-source-game/kandria]] — Common Lisp 动作 RPG，TRIAL 引擎 + alloy OpenGL 渲染，~19K LOC 全 Lisp，BVH2 碰撞检测，内置关卡编辑器
   495|- [[open-source-game/meritous]] — PSI 能量攻击动作地牢探索，纯 C + SDL 程序化地牢生成，约 10K LOC，GPLv3
   496|- [[open-source-game/sdl-sopwith]] — 经典一战双翼机射击游戏 SDL 移植版，平台抽象架构(src/核心+sdl/平台层)，TCP/IP 多人，PC Speaker 音效模拟，自定义 .sop 关卡格式，GPLv2
   497|- [[open-source-game/taisei]] — 东方 Project 同人弹幕射击游戏，C11 + SDL3 + OpenGL 自研渲染管线，~3.2M LOC C，多平台支持（Win/Linux/macOS/Web/Nintendo Switch）
   498|- [[open-source-game/warzone-2100]] — 开源 3D RTS，含剧情战役+10人多人，157K LOC C++，多渲染后端(OpenGL/Vulkan/GLES)，400+科技树
   499|- [[open-source-game/zero-k]] — Spring Engine 纯 Lua 游戏内容仓库，GadgetHandler 模块化事件驱动，物理弹道+智能单位预判，PBR 自定义 Shader，GPL v2
   500|- [[open-source-game/war1gus]] — Warcraft: Orcs & Humans 重实现，基于 Stratagus 引擎，C++17 + Lua 脚本数据驱动，GPLv2
   501|- [[open-source-game/stargus]] — StarCraft 1998 资产导入 Stratagus 引擎的工具，多格式转换层（GRP/CHK/CASC/SMACKER），startool MPQ 提取，约 15K LOC C++，GPLv2
   502|
| [[ai-game-devtools/drawing-spinup]] — SIGGRAPH Asia 2024: 单张 2D 角色画 → 3D rigged 动画角色 |
