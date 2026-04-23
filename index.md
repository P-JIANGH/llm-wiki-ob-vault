     1|     1|     1|# Wiki Index
     2|     2|     2|
     3|     3|     3|> Content catalog. Every wiki page listed under its type with one-line summary.
     4|     4|     4|> Read this first to find relevant pages for any query.
| Last updated: 2026-04-24 | 603 | Note: Open Source Games section is partial (65/153 games indexed; all 153 games exist in open-source-game/ directory)
     6|     6|     6|
     7|     7|     7|## AI / LLM / Agent
     8|     8|     8|
     9|     9|     9|| [[llm-integration]] — 9 个 LLM Provider 统一接入（OpenAI/Claude/Gemini/DeepSeek 等） |
    10|    10|    10|| [[mempalace]] — AI 长期记忆系统，ChromaDB verbatim 存储 + 4 层记忆栈，LongMemEval 96.6%（无需 API） |
    11|    11|    11|| [[voxcpm-local-deployment]] — VoxCPM 2 本地部署配置：Python/CUDA/GPU 显存要求及快速运行示例 |
    12|    12|    12|| [[multi-agent-ai-simulation]] — 多智能体 AI 通用概念：记忆/任务/感知/决策 |
    13|    13|    13|| [[multi-agent-ai-game-impl]] — Microverse 实现：感知→决策→记忆→任务→对话完整链路 |
    14|    14|    14|| [[persistent-memory-system]] — AI 角色长期记忆持久化（ChatHistory + 时间戳） |
    15|    15|    15|| [[stanford-generative-agents]] — Stanford Generative Agents（AI Town）Memory/Reflection/Planning |
    16|    16|    16|| [[agentgpt]] — reworkd 开源浏览器端自主 AI Agent 平台：Next.js / Docker 部署，1.5k+ commits，12 releases，支持中/英/匈牙利语 |
    17|    17|    17|| [[babyagi]] — yoheinakajima 实验性自构建 Agent 框架：functionz 图结构函数注册表（依赖/触发器/密钥管理），SQLAlchemy + Flask Dashboard，MIT，已存档 |
    18|    18|    18|| [[llocal-search]] — nilsherzig 本地 AI 搜索 Agent：Ollama + langchaingo + SearXNG + ChromaDB，完全本地运行无需 API Key，MIT |
    19|    19|    19|| [[ai-game-devtools/academicodec]] — 高校开源音频 Codec 工具包：EnCodec/SoundStream/HiFi-Codec 训练代码+预训练权重，GRVQ 仅 4 codebook 高保真重建，适用于 VALL-E/AudioLM/MusicLM，MIT |
    20|    20|    20||| [[ai-game-devtools/01-project]] — OpenInterpreter 开源语音接口设备：Open Interpreter 驱动自然语言控制电脑，LiveKit 实时语音 + Deepgram STT + ElevenLabs TTS，支持 ESP32/桌面/移动端，AGPL |
    21|    21|    21|| [[open-deep-research]] — dzhng/Duet 深度研究 Agent：Firecrawl 搜索爬取 + o3-mini/R1 模型，递归深度搜索 + 并发处理，<500 LoC 极简实现，MIT |
    22|    22|    22|| [[open-interpreter]] — KillianLucas 本地代码执行 LLM 助手：自然语言→终端/浏览器/文件操作，OpenAI 兼容 API，MIT，让 AI 直接操控你的电脑 |
    23|    23|    23|| [[llocal-search]] — nilsherzig 本地 AI 搜索 Agent：Ollama + langchaingo + SearXNG + ChromaDB，完全本地运行无需 API Key，MIT |
    24|    24|    24||| [[ai-game-devtools/logic-games-solver]] — fabridigua AI 解数独/Stars/Skyscrapers 逻辑游戏：OpenCV 透视变换 + Keras CNN（MNIST）识别 + CSP 回溯求解，Python/TensorFlow |
    25|    25|    25|| [[aios]] — agiresearch AI Agent 操作系统：LLM 内核抽象层（调度/记忆/存储/工具），COLM 2025 论文，支持 OpenAGI/AutoGen/MetaGPT，Remote Kernel 模式支持边缘设备 |
    26|    26|    26|| [[chatdev]] — OpenBMB 零代码多智能体平台：YAML 配置驱动工作流（游戏开发/3D生成/数据分析/深度研究），Python SDK + Vue3 前端，NeurIPS 2025，Puppeteer-style RL 编排 |
    27|    27|    27|| [[chatgpt-api-unity]] — mochi-neko Unity ChatGPT API 客户端：IChatMemory 多策略 session 管理 / UniTask 异步 / Relent resilient HTTP / Function Calling / Streaming，MIT |
    28|    28|    28|| [[chatgptforunity]] — sunsvip Unity UPM 包：编辑器内 ChatGPT 对话窗口 / 代码块提取保存 / 聊天历史持久化 / gpt-3.5-turbo，MIT |
    29|    29|    29|| [[ai-game-devtools/unity-chatgpt]] — dilmerv Unity ChatGPT 实验项目：自然语言提示让 AI 动态生成 Unity C# 代码创建立方体、操控角色行为，Unity 2021.3+，MIT |
    30|    30|    30|| [[autoresearch]] — Karpathy 自主 LLM 研究框架：agent 修改 train.py → 5分钟实验 → val_bpb 评估 → keep/discard 循环，MIT，70.3k stars |
    31|    31|    31|| [[chatrwkv]] — BlinkDL RWKV-7 100% RNN LLM：Time Mixing + Channel Mixing，O(n) 推理复杂度，3GB VRAM 跑 14B 模型，HuggingFace 权重，MIT |
    32|    32|    32||| [[ai-game-devtools/rwkv-lm]] — BlinkDL RWKV 语言模型：RNN 式 Transformer 架构，线性注意力 + 高效推理，RWKV-4/5/6/7 全系列，Apache 2.0 |
    33|    33|    33||| [[ai-game-devtools/rwkv-runner]] — josStorer RWKV 模型 GUI/CLI 运行工具：一键下载模型+Gradio 对话界面+OpenAI 兼容 API，支持 RWKV-4/5/6/7 全系列，Apache 2.0 |
    34|    34|    34||| [[stanford-alpaca]] — Stanford 指令微调 LLaMA 模型（7B/13B），52K Self-Instruct 数据训练，< $500 数据生成成本，CC BY-NC 4.0，2023 年开源 LLM 里程碑 |
    35|    35|    35||| [[chinese-llama-alpaca-3]] — ymcui 中文 Llama-3 第三期：8B 基座+Instruct-v3（Elo 1627），原版 128K 词表复用，GQA+LoRA，HuggingFace/ModelScope |
    36|    36|    36||| [[openmaic]] — THU-MAIC 开源多智能体互动教室平台：两阶段课程生成（Outline→Scene）、LangGraph Director Graph 编排、AI Provider 抽象层（1300+行支持 9+ 提供商）、PBL Agentic Loop + MCP Tools、PPTX/HTML 导出、MinerU PDF 解析，v0.1.0，AGPL-3.0 |
    37|    37|    37||| [[coze-studio]] — Coze/字节跳动一站式 AI Agent 开发平台：可视化 Agent/Workflow 构建，微服务+DDD，Eino 运行时，FlowGram 编辑器，Apache-2.0，20.3k stars |
    38|    38|    38|| [[claude-code-game-studio-architecture]] — 49 Agent 层级结构、Model Tier 分配（Haiku/Sonnet/Opus）、五大协调规则、Subagents vs Agent Teams |
    39|    39|    39|| [[claude-code-game-studio-collaboration-protocol]] — Question → Options → Decision → Draft → Approval 工作流、文件写入协议、决策 UI 模式 |
    40|    40|    40||| [[hermes-agent]] — 生产级 AI Agent 框架：工具注册中心 / 持久 Async Loop / 并行执行 / Context Compression / 13+ 消息平台网关 |
    41|    41|    41||| [[gstack]] — Garry Tan 的 AI 软件工厂：23 个 Skills 把 Claude Code 变虚拟工程团队（CEO/设计师/QA/发布工程师），60天 600K+ LOC，71.3K stars |
    42|    42|    42||| [[ai-game-devtools/qwen-agent]] — 阿里 Qwen 团队 LLM Agent 框架：Qwen Chat 后端、工具调用/RAG/代码解释器/MCP/多智能体群聊、Docker 沙箱、1M+ token 超长文档 QA，Apache 2.0 |
    43|    43|    43||| [[ai-game-devtools/swe-agent]] — Princeton+Stanford 开源 Agent Computer Interface：LLM 自主修复 GitHub issue、EnIGMA 网络安全模式、YAML 配置驱动、SWE-bench SoTA，NeurIPS 2024，MIT |
    44|    44|    44||| [[ai-game-devtools/taskgen]] — 基于任务的 Agent 框架：StrictJSON 结构化输出、自动任务分解、分层 Agent、函数 RAG、Shared Variables 多模态共享，MIT |
    45|    45|    45|
    46|    46|    46|## Concepts
    47|    47|    47|
    48|    48|    48|||| [[registry-pattern-tool-discovery]] — 中心注册表模式：ToolRegistry 单例集中注册 + check_fn 环境检查，hermes-agent 核心架构 |
    49|    49|    49||| [[context-compression]] — hermes-agent 结构化摘要压缩：Prune+Protect Head+Protect Tail+Summarize Middle 四阶段，节省 context |
    50|    50|    50|| [[tool-registry-pattern]] — 中心注册表工具自注册模式：check_fn 环境门控、循环导入安全、工具集分组 |
    51|    51|    51|| [[agent-loop-architecture]] — AI Agent 循环架构：持久 Async Loop、并行工具执行、迭代预算控制 |
    52|    52|    52|| [[openai-tool-calling]] — OpenAI Tool Calling 协议解析：参数类型强制、工具对完整性、多 Provider 格式适配 |
    53|    53|    53|| [[concepts/agent-loop]] — AI Agent 的核心执行循环模式：LLM 与工具之间反复交互，直到任务完成或达到迭代上限。 |
    54|    54|    54|| [[concepts/agent-swarm]] — 一种多 Agent 协作架构模式：多个专用 Agent 在一个 Leader 协调下组成团队，共享任务、消息和工作空间，自主完成复杂目标。 |
    55|    55|    55|| [[concepts/ai-agent-development-platform]] — AI Agent Development Platform |
    56|    56|    56|| [[concepts/autonomous-llm-research]] — Human 提供： 1. 可修改的代码（train.py） 2. 固定评估标准（prepare.py/valbpb） 3. Agent 指令（program.md） |
    57|    57|    57|| [[concepts/broker-interface]] — 统一的 broker 抽象接口，BrokerInterface 是所有 broker 适配器的基类。支持 20+ broker，覆盖 Indian、US、International 市场。 |
    58|    58|    58|| [[concepts/channel-system]] — Channel System 是一种将多聊天平台接入与核心 Agent 逻辑解耦的架构模式。所有渠道通过统一 Message Bus 与核心通信，核心 Agent 不感知具体渠道细节。 |
    59|    59|    59|| [[concepts/datahub-architecture]] — 每个 screen/widget 独立轮询自己的数据: ~20 dashboard widgets + MarketPanel + WatchlistScreen + PortfolioBlotter 各有自己的 QTimer 55+ screens 有本地 timers 驱动各自的刷新周期 27  |
    60|    60|    60|| [[concepts/deer-flow-memory]] — DeerFlow 的长期记忆系统，通过 LLM 从对话中提取结构化事实并持久化，在后续交互中自动注入上下文。 |
    61|    61|    61|| [[concepts/deer-flow-runtime]] — DeerFlow 中 LangGraph agent 的执行环境，包括：RunManager（生命周期）、StreamBridge（流式解耦）、Checkpointer（状态持久化）、Store（KV存储）。 |
    62|    62|    62|| [[concepts/deer-flow-sandbox]] — DeerFlow 的隔离执行环境，通过虚拟路径映射让 Agent 操作文件/命令而不暴露 host 系统结构。 |
    63|    63|    63|| [[concepts/deer-flow-subagent]] — DeerFlow 中将复杂任务委托给后台子 Agent 执行的机制，核心是 SubagentExecutor + 三线程池架构。 |
    64|    64|    64|| [[concepts/eino-framework]] — Eino Framework |
    65|    65|    65|| [[concepts/fincept-terminal-architecture]] — Fincept Terminal v4 是纯原生 C++20 桌面应用，使用 Qt6 做 UI 和渲染，嵌入 Python 3.11+ 做分析引擎，在单一原生二进制中提供 Bloomberg Terminal 级别的性能。跨 Windows/macOS/Linux 三平台。 |
    66|    66|    66|| [[concepts/fincept-ai-agents]] — Fincept 内置 37 个 AI Agent，Trader/Investor 人格（Buffett/Graham/Lynch/Munger/Klarman/Marks...）、经济分析、地缘政治，Agno 框架驱动，支持多模型/工具调用/团队协作 |
    67|    67|    67|| [[concepts/fincept-auth-system]] — JWT 登录 + OTP/MFA 验证 + PIN 锁屏 + 会话恢复 + 设备 ID 生成，多层安全认证体系 |
    68|    68|    68|| [[concepts/fincept-data-connectors]] — 100+ 数据连接器，覆盖市场数据（Yahoo/Polygon/Kraken/AkShare）、经济数据（FRED/IMF/World Bank/DBnomics）、另类数据（Adanos/Polymarket） |
    69|    69|    69|| [[concepts/fincept-storage-system]] — SQLite 持久化 + Repository 模式（17+ 仓库）+ Migration 系统（18 个版本）+ CacheManager + SecureStorage 四层架构 |
    70|    70|    70|| [[concepts/fincept-ui-system]] — Obsidian 风格暗色主题 Qt6 组件库：55 个源文件实现 Card/SearchBar/DataTable/ChartFactory/MarkdownRenderer 等，ADS Docking 系统 |
    71|    71|    71|| [[concepts/fincept-workflow-engine]] — 可视化节点编辑器 + DAG 工作流引擎：NodeRegistry 注册、WorkflowExecutor 拓扑排序+并行执行、28+ 节点类别（Triggers/MarketData/Trading/AI/ControlFlow） |
    72|    72|    72|| [[concepts/flowgram]] — FlowGram |
    73|    73|    73|| [[concepts/godot-vs-unity-unreal]] — Godot (MIT) 完全免费，无版税，无隐藏费用 游戏代码和引擎均为 MIT，闭源游戏也完全合法 适合独立开发者和小团队 |
    74|    74|    74|| [[concepts/llm-providers]] — LlmService 支持多 LLM Provider，通过统一的 API 接口调用不同的模型。 |
    75|    75|    75|| [[concepts/mcp-system]] — MCP (Model Context Protocol) 让 LLM 能够调用 Fincept Terminal 的原生工具。系统包含: 外部 MCP Server: McpManager 管理生命周期 37 个内置 Tool: 覆盖市场/新闻/Portfolio/交易等 |
    76|    76|    76|| [[concepts/memory-system]] — AI Agent 中管理长期知识、对话历史和上下文窗口的架构设计。核心挑战：在有限上下文窗口内，维持"活"的记忆而不变成"噪声堆"。 |
    77|    77|    77|| [[concepts/multi-agent-interactive-classroom]] — Multi-Agent Interactive Classroom |
    78|    78|    78|| [[concepts/muon-optimizer]] — 问题： 标准 Adam 对 2D 矩阵（如 linear layer weights）不是最优的。 |
    79|    79|    79|| [[concepts/provider-registry]] — 一种插拔式（pluggable）LLM Provider 架构模式，通过单一数据结构（ProviderSpec 元组）集中定义所有 Provider 元数据，告别 ifelif 链。 |
    80|    80|    80|| [[concepts/pubsub-pattern]] — 发布/订阅模式是一种消息传递范式， publishers（发布者）和 subscribers（订阅者）通过 topic（主题）解耦。发布者不知道谁在订阅，订阅者不知道谁在发布。 |
    81|    81|    81|| [[concepts/quantlib-integration]] — QuantLib 封装层，18 个量化分析模块：期权定价/风险管理/随机过程/波动率建模/固定收益 |
    82|    82|    82|| [[concepts/python-integration]] — C++ 通过 PythonRunner (QProcess 子进程) 调用 scripts/ 下 100+ Python 脚本。脚本输出 JSON 到 stdout，C++ 解析后通过 DataHub 分发。 |
    83|    83|    83|
    84|    84|    84|## Game Projects & Studios
    85|    85|    85|
    86|    86|    86|| [[firered-openstoryline]] — FireRedTeam 开源 AI 视频创作工具，LangChain Agent + MCP + 15+ 视频节点管道，对话式视频剪辑 |
    87|    87|    87|| [[ksanadock]] — 游戏开发商，时空码头 |
    88|    88|    88|| [[microverse-project]] — Godot 4 多智能体 AI 社交模拟沙盒游戏 |
    89|    89|    89|| [[microverse-code-structure]] — Microverse 代码结构 / 模块解析 |
    90|    90|    90|| [[openbmb]] — 北京人工智能研究院 & 面壁智能，MiniCPM / VoxCPM 等模型背后的研究组织 |
    91|    91|    91||| [[ai-game-devtools/minicpm]] — OpenBMB 面壁智能高效小语言模型系列：MiniCPM-2B/4B 端侧部署 + MiniCPM-V 多模态 + MiniCPM-o 全模态，性能匹敌同量级 Llama，Apache 2.0 |
    92|    92|    92||| [[langflow]] — logspace AI 可视化 LLM 工作流构建器：拖放节点图 + FastAPI + LangChain，支持 50+ LLM/向量库，MIT |
    93|    93|    93||| [[claude-code-game-studios]] — Claude Code Game Studios：49 Agent / 72 Skill 游戏开发工作流，MIT 开源 |
    94|    94|    94||| [[voxcpm]] — OpenBMB 无 Tokenizer TTS 系统（MiniCPM-4 骨干 + LocDiT 扩散架构），800M 参数/44.1kHz，零样本语音克隆/流式合成/RTF~0.15，支持全量/LoRA 微调，Apache 2.0 |
    95|    95|    95||| [[ai-game-devtools/biomes]] — ill-inc 开源 Web 沙盒 MMORPG：Next.js + Three.js + WebAssembly (C++ voxeloo)，React 资源系统桥接 Three.js 状态，12+ 微服务架构（sync/logic/gaia 等），ECS+Bikkie 数据层，MIT |
    96|    96|    96|
    97|    97|    97|## Game Dev
    98|    98|    98|
    99|    99|    99|| [[godot-4]] — Godot 4 引擎：GDScript、Jolt Physics、XR、版本历史 |
   100|   100|   100|| [[gdscript-patterns]] — GDScript 10 种设计模式（单例/Signal/Lambda/寻路/物理检测） |
|| [[phaser-4-migration]] — Phaser 3 → Phaser 4 迁移指南：渲染器重写、Filter 统一、API 变更、移除功能 |
|| [[phaser-vue-integration]] — Phaser 3 + Vue 3 + TypeScript 官方模板与实战：Registry/Pinia 状态桥梁、生命周期管理 |
|| [[godot-animation-system]] — AnimatedSprite2D 帧动画 + CharacterController 状态机 |
|| [[godot-networking]] — 高级多人游戏 API：Scene Replication / RPC / MultiplayerPeer / 权威模式 |
|| [[godot-rendering-system]] — 三大渲染器（Forward+/Mobile/Compatibility）、7种 Shader Processor、Visual Shader |
|| [[godot-ui-system]] — Control 节点体系、Container 布局系统、Theme 资源管理、Anchor 响应式 |
|| [[microverse-character-system]] — 8 角色人格/职位/说话风格（CharacterPersonality） |
   103|   103|   103|| [[microverse-dialog-system]] — DialogService/ConversationManager/BackgroundStoryManager |
   104|   104|   104|| [[microverse-save-system]] — GameSaveManager JSON 存档（角色位置/任务/AI状态） |
|| [[game-design-document]] — 游戏设计文档 GDD 模板与指南：One Pager、核心循环、范围控制 |
|| [[gdd-reincarnator-v2]] — 转生者模拟器 v2 One Pager GDD：核心循环、USP、系统概览、技术架构、开发进度 |
|| [[indie-game-marketing]] — 独立游戏 Steam 营销研究：发布时机、像素艺术品类选择、Reddit 社区营销、收入参考 |
   105|   105|   105|## AI Game DevTools
   106|   106|   106|
   107|   107|   107|| [[ai-game-devtools/animate-diff]] — 开源文本到视频动画扩散模型：时序注意力模块插入冻结 SD UNet，支持 SD1.5/SDXL 后端，ComfyUI 集成，AnimateDiff v1/v2/v3 全系列，Apache 2.0 |
   108|   108|   108||| [[ai-game-devtools/any-accomp]] — Amphion Team 通用伴奏生成框架：Chromagram + VQ-VAE 量化旋律瓶颈 + Flow Matching 生成伴奏，支持人声/独奏乐器输入，Gradio UI，24kHz/3-30秒输入，MIT |
   109|   109|   109||| [[ai-game-devtools/chord2melody]] — tanreinama GPT-2 自动作曲工具：和弦进行→MIDI 旋律生成、已有 MIDI 续写、5 轨/17 轨 GM 乐器输出、14 种和弦类型，MIT |
   110|   110|   110|| [[ai-game-devtools/echo-mimic]] — Ant Group 音频驱动肖像动画：SD 1.5 扩散 + Whisper-Tiny 音频编码 + 地标 CNN，支持纯音频/纯地标/混合三种驱动，超越 SadTalker/Hallo，AAAI 2025 |
   111|   111|   111|||| [[ai-game-devtools/flux-music]] — 首个 Rectified Flow + 双流 Transformer 文本到音乐生成模型：T5-XXL+CLAP-L 条件编码 + AudioLDM2 VAE/Vocoder，支持 Small/Base/Large/Giant/Giant-Full 五种规格（512~2048 hidden），50 步采样，16kHz/10.24 秒，arXiv 2409.00587 |
   112|   112|   112|| [[ai-game-devtools/hunyuan3d-2]] — 腾讯混元 3D 资产生成：DiT 形状生成 (0.6B~3.0B) + PBR 纹理合成，文本/图像→高分辨率 3D 网格，FlashVDM 加速/ComfyUI/Blender 插件，6~16GB VRAM，Apache 2.0 |
   113|   113|   113|| [[ai-game-devtools/infllm-v2]] — 清华 InfLLM 高效长上下文推理：分块注意力 + 内存池压缩，O(L) 时间/内存复杂度，有效无限上下文窗口 (2M+ tokens)，兼容 Llama/Mistral/Qwen，MIT |
|| [[ai-game-devtools/llama2-c]] — Karpathy llama2.c 纯 C 实现 (~700 行)：零依赖 Llama 2 推理，无 PyTorch/CUDA，自定义二进制权重格式，INT8 量化支持，教育/嵌入式 AI，MIT |
||| [[ai-game-devtools/llm-c]] — Karpathy 纯 C/CUDA LLM 训练框架：零依赖 PyTorch/cPython，~1000 行 CPU 参考实现 + CUDA 主线路（比 PyTorch Nightly 快 7%），多 GPU/多节点/混合精度，GPT-2/GPT-3 复现，MIT |
||| [[ai-game-devtools/llocalsearch]] — nilsherzig 本地 AI 搜索 Agent：Ollama + langchaingo + SearXNG + ChromaDB，完全本地运行无需 API Key，MIT |
||| [[ai-game-devtools/litgpt]] — Lightning AI 轻量 GPT 实现：模块化 Llama/Mistral/Phi 等架构支持，LoRA/QLoRA 微调 + 多后端推理 + 量化，Lightning Fabric 分布式训练，Apache 2.0 |
   116|   116|   116|| [[ai-game-devtools/llava-next]] — 下一代 LLaVA 多模态模型：任意分辨率处理 + 图文交错理解 + 视频扩展，Llama 3/Qwen/Mistral 多 LLM 骨干，Apache 2.0 |
   117|   117|   117|||| [[ai-game-devtools/jukebox]] — OpenAI 先驱性自回归音乐生成模型（5B/5B_lyrics/1B_lyrics）：3级 VQ-VAE+分层 Transformer，支持歌词/艺术家/流派条件+音频提示，V100 3小时/20秒，非商用许可证
   118|   118|   118|||| [[ai-game-devtools/magenta]] — Google Brain AI 艺术与音乐生成研究项目：MelodyRNN/MusicVAE/NSynth/GANSynth 等多模型家族，MIDI/符号音乐+波形合成，pip 安装，~40 CLI 工具，Apache 2.0（已存档）
   119|   119|   119|||||| [[ai-game-devtools/musicgen]] — Meta AI 单阶段自回归音乐生成模型（300M~3.3B）：EnCodec tokenization(4 codebooks@50Hz)+T5文本编码+旋律条件，delay pattern并行预测(50 steps/sec)，20K小时训练，HuggingFace 10个预训练权重(含Stereo变体)，NeurIPS 2023
   120|   120|   120||||| [[ai-game-devtools/riffusion-app]] — Riffusion 实时音乐生成 Web 应用：Next.js+Three.js+Tone.js 前端，Stable Diffusion 频谱图→音频管线，Alpha 插值平滑过渡风格转换，Baseten 云端部署支持，已存档
   121|   121|   121|||| [[ai-game-devtools/yue]] — HKUST/M-A-P 开源音乐基础模型（Apache 2.0）：两阶段架构（7B+1B+Upsampler），歌词→完整歌曲生成，支持中英文日韩韩，CoT/单轨/双轨 ICL 三种模式，LoRA 微调，80GB GPU 全曲生成，arXiv 2503.08638 |
   122|   122|   122|| [[ai-game-devtools/qwen2-5]] — 阿里通义 Qwen 2.5 系列 (0.5B~72B)：128K 上下文，29+ 语言，强编码/数学能力，Base/Instruct/Coder/Math 变体，Apache 2.0 |
   123|   123|   123|| [[ai-game-devtools/visual-agent-bench]] — THUDM 视觉语言 Agent 评测基准：VQA/图像操作/图表推理/UI 导航多任务，评估 LLaVA/Qwen-VL/GPT-4V/Gemini 等 VLM Agent，Apache 2.0 |
   124|   124|   124|
   125|   125|   125|| [[ai-game-devtools/llama]] — Meta 基础 LLM 系列（1/2/3），7B-405B 多尺寸，开源 LLM 基石，Llama 2/3 Community License |
   126|   126|   126|| [[ai-game-devtools/llama-cpp]] — ggerganov 纯 C/C++ LLM 推理引擎：GGUF 格式 + 2-8bit 量化，CPU/GPU 跨平台部署，MIT，70K+ stars |
   127|   127|   127||| [[ai-game-devtools/vicuna]] — LMSYS Org 开源聊天模型：基于 LLaMA + 70K ShareGPT 对话微调，~$300 训练 13B，达 ChatGPT 90% 质量，FastChat 平台服务，LLaVA 语言骨干 |
   128|   128|   128|| [[ai-game-devtools/llava]] — UW-Madison 多模态视觉语言模型：CLIP ViT + Vicuna LLM + 线性投影层，开源 VLM 标杆，接近 GPT-4V 视觉指令跟随能力 |
   129|   129|   129|| [[ai-game-devtools/nanochat]] — Karpathy 极简聊天机器人训练代码：比 nanoGPT 更精简的对话模型训练管线，教育用途，单 GPU 可训练 |
   130|   130|   130||| [[ai-game-devtools/karpathy-llm101n]] — Karpathy "Neural Networks: Zero to Hero" 教育课程：从 micrograd 到 GPT 从零构建，涵盖反向传播/注意力/BPE 分词，LLM 原理最佳免费教程 |
   131|   131|   131|| [[ai-game-devtools/nanogpt]] — Karpathy 极简 GPT 训练代码（~300 行）：完整 GPT-2 架构复现，AdamW+DDP 分布式训练，PyTorch 单文件实现，MIT |
   132|   132|   132|| [[ai-game-devtools/sglang]] — 结构化 LLM 生成语言：RadixAttention 树状 KV 缓存自动共享前缀计算，正则约束输出 + Jump-forward 解码，比 vLLM 快 3.2×（多轮场景） |
   133|   133|   133|| [[ai-game-devtools/vllm]] — UC Berkeley 高吞吐 LLM 推理引擎：PagedAttention 分页 KV 缓存消除碎片 + 连续批处理 + OpenAI 兼容 API，2-4× 吞吐量优势，Apache 2.0 |
   134|   134|   134|| [[ai-game-devtools-catalog]] — Yuan-ManX 维护的 AI 游戏开发工具目录：840+ 项目覆盖16大类 |
   135|   135|   135|| [[ai-game-devtools/dify]] — LangGenius 开源 LLM 应用开发平台：可视化 Workflow + RAG Pipeline + Agent(Function Calling/ReAct) + 100+ 模型接入 + LLMOps，Docker 一键部署，Dify Open Source License |
   136|   136|   136||| [[ai-game-devtools/langchain]] — langchain-ai LLM 应用开发框架：Chain/Agent/Memory/Tool/Prompt 抽象 + LangGraph 编排，monorepo 结构（core/v1/partners），MIT |
   137|   137|   137||| [[ai-game-devtools/langgraph-studio]] — LangChain Agent IDE：可视化图结构调试 + Thread 状态编辑 + Interrupt 断点控制 + 热重载，Desktop/Web 双模式，需 LangSmith 认证 |
   138|   138|   138||| [[ai-game-devtools/llama-index]] — run-llama LLM 数据框架：300+集成/RAG管道/LlamaParse文档处理/多向量存储/图RAG，5行代码入门，MIT |
   139|   139|   139||| [[ai-game-devtools/llama2-webui]] — Llama 2 本地 Web UI + PyPI 封装包，支持 llama.cpp/transformers/GPTQ 多后端，MIT |
   140|   140|   140|| [[ai-game-devtools/text-generation-webui]] — oobabooga Gradio LLM Web UI：5后端(llama.cpp/ExLlamaV3/TensorRT-LLM)、多模态/Tool Calling/LoRA训练/图像生成，OpenAI兼容API，MIT |
   141|   141|   141||| [[ai-game-devtools/ai-writer]] — BlinkDL AI小说续写工具：RWKV 模型（12层/768维）+ 8849字词表，ctx_len=512，网文专精，已过时推荐 [[RWKV-Runner]]，Apache 2.0 |
   142|   142|   142||| [[ai-game-devtools/ai-shader]] — keijiro ChatGPT GLSL Shader 生成器：自然语言→Shader 代码，Unity Editor 集成，OpenAI API Key 配置，PoC（10 commits）|
   143|   143|   143|| [[ai-game-devtools/notebook-ai]] — indentlabs 写作/跑团世界观构建平台：32+内容类型（角色/地点/物品/魔法等）+关系图谱+隐私控制，Ruby on Rails 6.1 + React |
   144|   144|   144|| [[ai-game-devtools/novel]] — steven-tey Notion风格 WYSIWYG 编辑器 + OpenAI 自动补全，Tiptap 2 + Vercel AI SDK，多框架支持（Svelte/Vue/VSCode），Apache-2.0 |
   145|   145|   145|| [[ai-game-devtools/jaaz]] — 11cafe 开源多模态画布创意 Agent：无限画布 + AI Agent 生成图片/视频（GPT-4o/Midjourney/Flux/ComfyUI），LangGraph 编排 + tldraw 画布，隐私优先支持本地部署，AGPL |
   146|   146|   146||| [[ai-game-devtools/ragas]] — VibrantLabs LLM 应用评估框架：RAG/LLM 客观指标 + 测试数据自动生成 + LangChain/LlamaIndex 集成 + 生产反馈循环，Apache-2.0 |
   147|   147|   147||| [[ai-game-devtools/rpbench-auto]] — boson-ai LLM 角色扮演自动化评测流水线：ArenaHard 范式 pairwise 对比 + 裁判 LLM 打分 + Elo 排名（MLE/Online/WHR），覆盖 17+ 模型，Apache 2.0 |
   148|   148||| [[ai-game-devtools/higgs-audio]] — Boson AI 音频基础模型（3.6B→1B）：Llama-3.2 基座 + DualFFN 音频适配器 + 自研 25fps Tokenizer，EmergentTTS 情感胜率 75.7% 超 GPT-4o-mini-TTS，零样本语音克隆/多说话人对话/多语言，Apache 2.0 |
   149|   149|   148||| [[ai-game-devtools/llm-unity-integration]] — LLM 集成 Unity 架构模式：本地 llama.cpp/云 API/混合三种部署方案，NPC 对话流式输出/行为树集成/任务生成/性能优化全指南 |
   150|   150|   149|| [[ai-game-devtools/unreal-engine-5-llama-lora]] — bublint 用 UE 5.1 文档微调 Llama-7b LoRA：8bit 加载 + text-generation-webui 训练，8小时 3090Ti 完成，构建本地 UE5 问答助手，MIT |
   151|   151|   150||| [[ai-game-devtools/unrealgpt]] — TREE Industries UE5.6 AI Agent 插件：编辑器内 Chat 界面 + GPT Responses API + Python 脚本执行 + 场景查询 + Replicate 内容生成，Apache 2.0 |
   152|   152|   151||| [[ai-game-devtools/xagent]] — OpenBMB 开源 LLM 自主 Agent：Dispatcher+Planner+Actor 三层架构 + Docker 沙箱安全隔离，50+ 真实任务评测超越 AutoGPT，Apache 2.0 |
   153|   153|   152|| [[ai-game-devtools/aicommand]] — keijiro Unity Editor ChatGPT 插件：自然语言→Unity Editor C# 脚本生成执行，PoC 验证 AI 驱动编辑器自动化，Unlicense |
   154|   154|   153||| [[ai-game-devtools/agent-group-chat]] — MikeGu721/复旦 多智能体群聊模拟：竞争→合作→反射四阶段循环，LLM驱动角色对话，n-gram熵评估涌现行为，arXiv 2403.13433 |
   155|   155|   154|||| [[ai-game-devtools/agentrl]] — 强化学习 Agent 训练框架：PPO/DQN/Actor-Critic 算法 + 分布式训练 + 多智能体 RL，适用于 NPC 行为学习/游戏测试/策略 AI |
   156|   156|   155|||| [[ai-game-devtools/manus]] — Manus AI 通用自主 Agent：可跨网页/浏览器执行复杂任务，自主规划→分解→执行→交付，适用于资产研究/市场分析/文档自动化 |
   157|   157|   156||| [[ai-game-devtools/agentbench]] — THUDM LLM Agent 评测基准：8种环境（OS/DB/KG/游戏/推理等），评估 LLM 作为自主 Agent 的规划与工具使用能力，arXiv 2308.03688，MIT |
   158|   158|   157||| [[ai-game-devtools/ioa]] — OpenBMB 多智能体协作框架：AutoGPT/Open Interpreter异构 Agent 自主组队 + WebSocket 实时通信 + Milvus 向量注册，Apache 2.0 |
   159|   159|   158||| [[ai-game-devtools/kwaiagents]] — 快手 KwaiKEG LLM Agent 系统：KAgentSys-Lite + KAgentLMs(Meta-agent tuning 微调 Qwen/Baichuan) + KAgentInstruct(200K指令) + KAgentBench(3K评测)，KAgentBench 5维度评测（规划/工具使用/反思/总结/画像），Apache 2.0 |
   160|   160|   159||| [[ai-game-devtools/agent-laboratory]] — SamuelSchmidgall/Johns Hopkins LLM 自主研究 Agent：4阶段流水线（文献综述→实验→报告）+ AgentRxiv 知识累积框架，o1/o3-mini/GPT-4o/DeepSeek-V3，MIT |
   161|   161|   160|| [[ai-game-devtools/agentsims]] — PTA Studio 模拟城镇 LLM Agent 评测沙盒：QA评估+Github Actions CI、多智能体+建筑+NPC经济系统，ArXiv 2308.04026 |
   162|   162|   161|| [[ai-game-devtools/generative-agents]] — Stanford 交互式人类行为模拟（UIST 2023）：LLM驱动的25个AI角色在Smallville小镇生活，Memory Stream记忆架构+Reflection反思机制启发了 [[ai-town]] 和 [[cat-town]]，arXiv 2304.03442 |
   163|   163|   162|| [[ai-game-devtools/ai-town]] — a16z-infra 虚拟小镇模拟：Convex + PixiJS + Ollama/OpenAI，AI 角色自主聊天社交，灵感来自 Stanford Generative Agents 论文，JS/TS 入门套件 |
   164|   164|   163||| [[ai-game-devtools/cat-town]] — ykhli 猫咪主题模拟游戏：基于 AI-town fork，像素猫咪角色 + Cat Town Live Demo (Fly.io)，MIT |
   165|   165|   164|||| [[ai-game-devtools/codef]] — 内容变形场视频处理（CVPR 2024 Highlight）：Canonical content field + temporal deformation field 联合优化，零训练将图像算法提升到视频，10GB VRAM |
   166|   166|   165|||| [[ai-game-devtools/cogvideox]] — THUDM/ZhipuAI 开源视频生成模型家族：CogVideoX1.5-5B(1360×768/16fps)+2B/5B，T2V/I2V 双模，3D Causal VAE，diffusers 最低 3.6GB(INT8)，Apache 2.0 |
   167|   167|   166||||| [[ai-game-devtools/tora]] — 阿里 ali-videoai 轨迹导向 DiT 视频生成（CVPR'25）：首个集成文本/视觉/轨迹条件的 DiT 框架，Trajectory Extractor + Spatial-Temporal DiT + Motion-guidance Fuser，T2V/I2V 双模，~30GB 推理/~60GB 训练，CogVideoX 基座 |
   168|   168|   167|||||| [[ai-game-devtools/hunyuan-video]] — 腾讯混元 13B+ 参数开源视频生成模型：双流→单流 Full Attention Transformer + MLLM 文本编码器 + 3D VAE，专业评测综合排名 #1（运动质量 66.5%），720p 需 ~60GB VRAM，支持 FP8 量化/xDiT 多卡并行，Apache 2.0 |
   169|   169|   168||||||| [[ai-game-devtools/hunyuanvideo-1-5]] — 腾讯混元轻量级视频生成模型（8.3B 参数）：SSTA 选择性滑动注意力 + 3D Causal VAE，最低 14GB VRAM，CFG/Step 蒸馏 75% 加速 + 480→720→1080p 三级超分，Diffusers/ComfyUI/LightX2V 全支持，Tencent Hunyuan Community License |
   170|   170|   169|||||||| [[ai-game-devtools/skyreels-v1]] — Skywork AI 人类中心视频基础模型（T2V+I2V）：HunyuanVideo微调，VBench 82.43开源SOTA，33表情分类+400动作单元，SkyReelsInfer推理框架支持RTX4090+多卡并行，Apache 2.0
   171|   171|   170|||||| [[ai-game-devtools/ruyi]] — CreateAI 图像到视频扩散模型（7B）：768分辨率/24fps/120帧，镜头+运动幅度控制，TeaCache/FP8加速，RTX 3090/4090可运行，ComfyUI 3节点集成，Apache 2.0
   172|   172|   171||||||| [[ai-game-devtools/longlive]] — NVIDIA Labs 实时交互式长视频生成（ICLR 2026）：Wan2.1 基座 + Self-Forcing score distillation，240s 长视频/20.7 FPS 实时推理/32 H100 GPU-days 微调，Apache 2.0 |
   173|   173|   172|||||| [[ai-game-devtools/ltx-video]] — Lightricks 首个 DiT 架构统一视频生成模型：T2V/I2V/V2V/关键帧多模式 + 4K/50FPS 单次推理，2B/13B 双尺寸 + FP8 量化 + LoRA 微调，Apache 2.0 |
   174|   174|   173||||||| [[ai-game-devtools/lynx]] — ByteDance 高保真个性化视频生成（CVPR 2026）：Wan2.1-T2V-14B DiT 基座 + ID-Adapter/Ref-Adapter 双适配器，单图→身份一致视频，Full/Lite 双版本，Apache 2.0 |
   175|   175|   174|||||||| [[ai-game-devtools/moviigen-1-1]] — ZuluVision 电影级视频生成模型：Wan2.1-14B 微调（60 审美维度/11 专业评估）、+14.6% 清晰度/+4.3% 真实感、FastVideo 序列并行训练、720P/1080P、Qwen2.5 Prompt 扩展
   176|   176|   175|||||||| [[ai-game-devtools/step-video-t2v]] — 阶跃星辰 30B 参数文本到视频扩散模型：DiT 48层架构 + 深度压缩Video-VAE(16×16空间/8×时间) + 双语StepLLM+CLIP文本编码 + Video-DPO偏好优化，204帧/最高768px，4×80GB GPU，Turbo版10-15步，Apache 2.0 代码/非商用权重
   177|   177|   176|| [[ai-game-devtools/ovi]] — Character AI 双模态音视频生成模型（11B 参数）
   178|   178|   177|||| [[ai-game-devtools/opengvlab]] — 上海 AI Lab 视觉图形实验室：InternVL/Donut/OSPrey 等视觉语言模型家族，OCR-free 文档理解 + 大规模 VLM 预训练，Apache 2.0 |
   179|   179|   178|||| [[ai-game-devtools/blip-2]] — Salesforce 视觉语言模型：Q-Former 桥接冻结 ViT 视觉编码器+冻结 LLM，两阶段预训练，BSD 3-Clause，LAVIS 框架核心模型 |
   180|   180|   179||| [[ai-game-devtools/cogvlm]] — THUDM/ZhipuAI 开源 VLM 双模型：CogVLM-17B(10B视觉+7B语言,490×490)+CogAgent-18B(11B视觉+7B语言,1120×1120+GUI Agent)，MM-VET 52.8 SOTA，CVPR 2024 Highlight，INT4 仅需 11GB，Apache-2.0 |
   181|   181|   180||| [[ai-game-devtools/visualrwkv]] — howard-hou 基于 RWKV 架构的视觉语言模型：SigLIP+DINOv2+SAM 三编码器融合，0.1B~7B 多尺度，v7.0 VQAv2 79.84 超越 v6 同量级，RNN O(n) 推理适合实时游戏场景，arXiv 2406.13362 |
   182|   182|   181||||| [[ai-game-devtools/v-jepa]] — Meta FAIR 视频自监督学习：ViT 编码器 + 预测器在 latent space 预测掩码区域特征，无需预训练/负样本/标注，冻结骨干+轻量 probe 即达 K400 82.0%/IN1K 77.4%，ViT-L/H 双尺度，CC BY-NC 4.0 |
   183|   183|   182||| [[ai-game-devtools/character-glm-6b]] — 聆心智能&清华大学 CoAI 角色扮演对话大模型：基于 ChatGLM2-6B 微调，7维属性+行为建模，一致性/拟人化/吸引力三维评估，角色扮演场景超越 GPT-3.5，不可商用 |
   184|   184|   183||| [[ai-game-devtools/chatgpt-maya]] — LouisRossouw Maya ChatGPT 代码生成工具：自然语言提示→GPT-3生成Maya Python代码→exec()直接执行，简单自动化可用、复杂请求不佳，需mayapy安装openai包 |
   185|   185|   184||| [[ai-game-devtools/anime-gf]] — cyan/moecorp 桌面 LLM 聊天前端：Electron + React + tRPC + SQLite，支持 OpenAI/Anthropic/Mistral/Together AI 及任意 OpenAI兼容端点，角色卡系统，AGPL |
   186|   186|   185|| [[ai-game-devtools/anything-3d]] — Anything-of-anything 单视图3D重建框架：SAM分割+3DFuse/Zero-1-to-3/NeRF/HRN四路管线，单图→3D物体/新视角/面部重建，PyTorch3D+VoxNeRF，arXiv 2304.10261 |
   187|   187|   186||| [[ai-game-devtools/sf3d]] — Stability AI 单图到 3D 重建模型：扩散多视角合成 + 神经网格重建，秒级生成纹理 3D 网格（OBJ/GLB），游戏引擎可直接使用，Stability AI Community License |
   188|   188|   187|| [[ai-game-devtools/agentscope]] — 阿里巴巴通义实验室 Agent 框架（Apache 2.0）：ReAct/Voice/多Agent 工作流 + MCP/A2A 协议 + Trinity-RFT RL 微调 + K8s/OTel 生产部署，支持狼人杀等游戏示例 |
   189|   189|   188||| [[ai-game-devtools/behaviac]] — 腾讯游戏AI行为框架：行为树/FSM/HTN三种范式，编辑器仅Windows+运行时C++/C#全平台，支持热重载，BSD 3-Clause |
   190|   190|   189|| [[ai-game-devtools/infinity]] — FoundationVision 按位自回归图像生成框架：无限词表 Tokenizer + IVC（8.8T→0.13M 参数）+ BSC 自校正，CVPR 2025 Oral，1024×1024 图像 0.8s 生成，超越 SD3/SDXL |
   191|   191|   190|||| [[ai-game-devtools/byzer-agent]] — allwefantasy 分布式 Agent 框架：Ray + AutoGen 内核，支持本地/远程 Agent 通信，@byzerllm 装饰器定义 Prompt/Reply，Apache 2.0 |
   192|   192|   191|||| [[ai-game-devtools/comorag]] — EternityJune25 认知启发的记忆组织 RAG 系统：Reason→Probe→Retrieve→Consolidate→Resolve 迭代推理循环，三层记忆（Veridical/Semantic/Episodic），200K+ token 长叙事问答优于基线 11%，arXiv 2508.10419，MIT |
   193|   193|   192|||| [[ai-game-devtools/buffer-of-thoughts]] — 北京大学&UC Berkeley&Stanford 思维增强推理框架（NeurIPS 2024 Spotlight）：Meta Buffer 存储可复用思维模板+LightRAG检索，Llama3-8B+BoT可超越Llama3-70B，成本仅ToT的12%，MIT ||
   203|   194|   194|   193|||| [[ai-game-devtools/crewai]] — joaomdmoura 独立多Agent框架（无LangChain依赖）：Crew（自主Agent协作）+Flow（事件驱动生产工作流）+Sequential/Hierarchical双进程，5.76x快于LangGraph，MIT ||
   204|   195|   195|   194|||| [[ai-game-devtools/cwm]] — Meta FAIR 32B 代码世界模型：Python 执行轨迹+容器化环境交互训练，多任务 RL 后训练，SWE-bench Verified 65.8%，LCBv6 63.5%，非商业研究许可 |
   205|   196|   196|   195|||| [[ai-game-devtools/datarus-jupyter-agent]] — DatarusAI 数据科学 Jupyter Agent：基于 Datarus-R1-14B（Qwen 2.5 微调）驱动多步推理，Docker+Jupyter 隔离执行环境，ReAct/CoT 双模式，自动纠错，生成分析 Notebook，Apache 2.0 |
   196|   196|   195|| [[ai-game-devtools/everything-ai]] — AstraBert Docker 多任务 AI 助手：18 种任务模式（RAG/文本/图像/音频/视频/蛋白质折叠），Qdrant + llama.cpp + HuggingFace，支持本地 GGUF 和云端 API，MIT |
   197|   197|   196||| [[ai-game-devtools/easyphoto]] — 阿里巴巴 PAI AI 人像生成 WebUI 插件：5-20 张人脸照训练数字分身 LoRA + 两阶段扩散生成 + ControlNet 条件控制 + LCM 加速/视频生成/虚拟试衣，Apache 2.0 |
   198|   198|   197|| [[ai-game-devtools/fabric]] — Daniel Miessler 开源 AI 增强框架（Go）：Pattern 模式管理 20+ AI 提供商，CLI + REST API + Docker，prompts 即单元解决问题，MIT |
   199|   199|   198|| [[ai-game-devtools/fastgpt]] — labring AI Agent 构建平台：可视化 Flow 工作流编排 + 知识库 RAG + 双向 MCP + OpenAI 兼容 API + Docker 一键部署，FastGPT Open Source License |
   200|   200|   199|| [[ai-game-devtools/haystack]] — deepset 开源 RAG 框架：Pipeline 组件化架构（DocumentStore/Embedder/Retriever/LLMGenerator/Ranker），20+ 向量数据库后端，v2 重构组件接口，Apache 2.0 |
   201|   201|   200|| [[ai-game-devtools/fastrag]] — IntelLabs 高效 RAG 框架：基于 [[ai-game-devtools/haystack]] v2 构建，ColBERT+PLAID 高效检索 + REPLUG/FiD 多文档生成器 + Gaudi/ONNX/OpenVINO 多后端，已存档 |
   202|   202|   201||||| [[ai-game-devtools/gameaisdk]] — 腾讯开源游戏AI工具包：基于游戏画面采集→图像识别(DQN/IM/RainBOW强化学习)→手机端动作执行，支持跑酷/吃鸡/射击/MOBA类游戏自动化测试，GPL v3 |
   203|   203|   202|||| [[ai-game-devtools/gamegen-o]] — 腾讯光子×港科大×中科大 首个开放世界游戏视频生成Transformer模型，支持文本/操作信号/视频提示多模态控制，OGameData 15K 视频数据集，业内称"游戏工作室ChatGPT时刻" |
   204|   204|   203||||- [[ai-game-devtools/hunyuan-dit]] — 腾讯混元开源 DiT 文本到图像生成模型（1.5B 参数）：中英双语 CLIP+T5 双编码器 + DialogGen 多轮对话 + LoRA/ControlNet/IP-Adapter 全支持，ComfyUI/Diffusers 集成，6GB VRAM 可运行
   205|   205|   204|||||- [[ai-game-devtools/hunyuanimage-2-1]] — 腾讯混元 17B 两阶段扩散图像生成模型：Base(50步)+Refiner 管道，MLLM+byT5 双文本编码器，2K 原生分辨率，Arena 开源文生图 Top 1，最低 24GB VRAM
   206|   206|   205|||||||- [[ai-game-devtools/hunyuanimage-3-0]] — 腾讯混元原生多模态 MoE 图像模型（80B 总参/13B 激活）：自回归架构（非 DiT）、Prompt Self-Rewrite、CoT 思维链、图文到图像编辑、多图融合，3×80GB 可运行 Base 版
   207|   207|   206|||||||- [[ai-game-devtools/nextstep-1]] — StepFun 14B 自回归图像生成模型：连续 Token（非 VQ 离散化）+ Qwen2.5-14B 骨干 + 157M Flow Matching Head 双头架构，统一 next-token 预测框架，ICLR 2026 Oral
   208|   208|   207|||||| [[ai-game-devtools/hunyuan-gamecraft]] — 腾讯混元游戏视频生成：参考图+文本+键鼠动作→生成连贯游戏录像，混合历史条件+模型蒸馏(8步)，1M+ AAA游戏训练，HuggingFace开源 |
   209|   209|   208||||||| [[ai-game-devtools/hy-motion-1-0]] — 腾讯混元十亿参数文本到3D动作生成模型：DiT+Flow Matching架构，1.0B标准版/0.46B轻量版，>3000小时预训练+RLHF，SMPL骨骼输出，需24-26GB VRAM |
   210|   210|   209||||||| [[ai-game-devtools/humo]] — 清华&字节跳动人物中心视频生成模型：17B/1.7B双版本，文本+图像+音频多模态条件控制，基于Wan2.1+Whisper，HuMoSet数据集，720P推荐，HuggingFace权重
   211|   211|   210||||||| [[ai-game-devtools/hunyuanworld-1.0]] — 腾讯混元 3D 世界生成模型：文本/图像→360°全景图→分层3D mesh（背景+2层前景+天空），可导出Draco压缩mesh用于游戏引擎，BRISQUE/NIQE/CLIP 全面SOTA，Apache 2.0 |
   212|   212|   211|||||| [[ai-game-devtools/hunyuanworld-voyager]] — 腾讯混元 Voyager 可探索3D世界视频生成：单图→世界一致RGB-D视频+相机路径控制，WorldScore Benchmark综合第1（77.62），支持点云导出，Apache 2.0 |
   213|   213|   212||||||| [[ai-game-devtools/infinite-talk]] — MeiGen-AI 无限长度音频驱动说话视频生成：Wan2.1-I2V-14B基座+chinese-wav2vec2音频编码，streaming模式40s+，image/video双模式，FP8量化，Apache 2.0 |
   214|   214|   213|||||||- [[ai-game-devtools/instantid]] — InstantX Team/小红书 零样本身份保留图像生成：单图即可保持面部特征+文本可控，无需微调，IdentityNet(ControlNet)+IP-Adapter架构，LCM加速兼容，Kolors适配，Apache 2.0
   215|   215|   214||||||| [[ai-game-devtools/pulid]] — ByteDance NeurIPS 2024 零样本身份保留图像生成：对比对齐+注意力注入，单图即生成，支持 SDXL/FLUX，12GB VRAM 可运行，ID 保真度 +5pp(v0.9.1)
   216|   216|   215||||||| [[ai-game-devtools/omnigen]] — VectorSpaceLab 统一图像生成模型：Phi-3+DiT 架构，无需额外插件(ControlNet/IP-Adapter)直接多模态 prompt 生成，支持文本到图像/主体驱动/身份保留/图像编辑，MIT
   217|   217|   216|||||| [[ai-game-devtools/omnigen2]] — VectorSpaceLab/BAAI 下一代多模态图像生成：双解码通路(文本/图像独立参数)+解耦Tokenizer，新增视觉理解能力，TeaCache/TaylorSeer加速推理，最低17GB VRAM，MIT
   218|   218|   217|||||||| [[ai-game-devtools/omost]] — lllyasviel LLM 图像组合工具：LLM 生成 Python Canvas 代码描述空间布局（9×9×9=729 种边界框）+ 注意力分数操纵渲染，自然语言空间编码（非像素坐标），子提示<75 tokens 避免 CLIP 截断，Llama-3/Phi-3 基座 8GB VRAM
   219|   219|   218||||||||| [[ai-game-devtools/openpose-editor]] — Fkunn1326 A1111 WebUI 人体姿态编辑插件：Fabric.js Canvas 手动编辑骨骼关键点 + PyTorch OpenPose 自动检测，一键发送到 ControlNet，MIT
   220|   220|   219|||||||||- [[ai-game-devtools/irg]] — Osilly ICLR 2026 首个交错推理图像生成模型：Prompt→文本推理→初始图像→自我反思→精炼图像，GenEval 0.85 SoTA，基于 [[ai-game-devtools/bagel]] 架构，SFT+RL统一训练，Apache 2.0
   221|   221|   220|||||||| [[ai-game-devtools/rpg-diffusionmaster]] — ICML 2024 区域扩散范式：MLLM(GPT-4/DeepSeek-R1)自动拆解复杂提示为区域子提示+比例分配，SDXL/SD1.5/SD2.1/IterComp 多后端，零训练即插即用，支持 ControlNet 集成，Apache 2.0
   222|   222|   221||||||||| [[ai-game-devtools/qwen-image]] — Alibaba Qwen 团队 20B MMDiT 图像基础模型：复杂文字渲染（中文最强）+ 精确图像编辑，多版本（T2I/Edit/Layered/2.0），Apache 2.0 开源，AI Arena 开源第一
   223|   223|   222|||||||| [[ai-game-devtools/rich-text-to-image]] — UMD/Adobe/CMU ICCV 2023 富文本控制图像生成：字体颜色→精确色彩、字体大小→Token权重、字体样式→局部艺术风格、脚注→补充描述，Quill编辑器→JSON→区域扩散，SD1.5/SDXL/Animagine-XL后端，MIT
   224|   224|   223|||||||| [[ai-game-devtools/kolors]]
   225|   225|   224||||||| [[ai-game-devtools/hy-world-1.5]] — 腾讯混元 WorldPlay 实时交互世界模型
   226|   226|   225|||| [[ai-game-devtools/genagent]] — xxyQwQ/港科大 CVPR 2025 LLM Agent：在ComfyUI中自动生成Stable Diffusion工作流
   227|   227|   226||| [[ai-game-devtools/genesis]] — Genesis-Embodied-AI 通用物理引擎平台：6种求解器统一框架（Rigid/MPM/SPH/FEM/PBD/SF），43M FPS @ RTX 4090，光线追踪渲染+生成式数据引擎，Apache 2.0 |
   228|   228|   227|| [[ai-game-devtools/physrig]] — ICCV 2025 物理驱动骨骼绑定框架：MPM 软体模拟替代 LBS，可微分材质参数优化（杨氏模量/泊松比），Blender FBX 管线，支持骨骼驱动弹性形变 |
   229|   229|   228|| [[ai-game-devtools/gigax]] — GigaxGames 开源游戏运行时 LLM NPC 框架：Outlines 结构化生成保证输出格式，<1s GPU 推理，NPC-LLM-7B/3_8B 开源权重，MIT |
   229|   229|   229|| [[ai-game-devtools/interactive-llm-powered-npcs]] — AkshitIreddy 游戏 NPC 实时对话系统：DeepFace 面部识别+Cohere LLM+LangChain+ChromaDB 生成对话，SadTalker 唇形动画+Edge-TTS 语音，Pixel 替换叠加层适配任意游戏无需源码修改，MIT |
   230|   230|   230|| [[ai-game-devtools/mahatts]] — Dubverse.ai 多语言开源 TTS 模型：受 Tortoise 启发+M4T wav2vec2 语义编码，三阶段管线(84M Causal LM→430M Diffusion→13M HiFi-GAN)，11 种语言(英语+10 种印度语言)，Apache 2.0 商用许可 |
   231|   231|   231||| [[ai-game-devtools/matrix-game]] — Skywork AI 开源交互式游戏世界模型系列：Wan2.2 DiT 架构+键鼠动作条件化+长程记忆+流式生成，3.0 支持 INT8 量化/异步 VAE/FSDP，MIT |
   232|   232|   230|| [[ai-game-devtools/hipporag]] — OSU-NLP-Group 神经生物学启发 LLM 长期记忆框架（NeurIPS '24 / ICML '25）：知识图谱 + OpenIE + 非参数持续学习，多跳关联检索 SOTA，低索引成本 |
   233|   233|   231|||| [[ai-game-devtools/mindsearch]] — InternLM 开源 AI 深度搜索框架：动态图分解子问题 + 并行 SearcherAgent（ThreadPoolExecutor/asyncio）+ 5 种搜索引擎 + SSE 流式可视化，arXiv 2407.20183，Apache 2.0 ||
   234|   234|   232||| [[ai-game-devtools/mixture-of-agents]] — Together AI 多 LLM 分层聚合架构：并行调用多个开源模型 → 迭代精炼 → 聚合器综合，AlpacaEval 2.0 65.1% 超越 GPT-4 Omni（57.5%），纯推理时增强无需训练，Apache 2.0
   235|   235|   233||| [[ai-game-devtools/mmrole]] — YanqiDai ICLR 2025 多模态角色扮演 Agent 框架：85角色/11K图像/14K对话数据集 + Qwen-VL-Chat 微调 Agent + 8维3面评估，奖励模型评分，MIT
   236|   236|   234||| [[ai-game-devtools/mug-diffusion]] — Keytoyze AI 音游谱面自动生成工具：基于 Stable Diffusion 改造+音频波形条件化，支持 4K VSRG，osu!/Etterna 难度控制+风格控制，Gradio WebUI，CC0 1.0
   237|   237|   235||| [[ai-game-devtools/mvdream]] — ByteDance 多视角扩散模型：SD UNet + 相机位姿条件（16维），文本→4视角一致图像(4×256×256)，SDS 3D生成前置，OpenRAIL权重
   238|   238|   236||| [[ai-game-devtools/anytext]] — Alibaba ICLR 2024 Spotlight 多语言视觉文本生成扩散模型：SD1.5+ControlNet 架构+OCR 感知损失，中英双语文字无缝融入图像，FP16 ~7.5GB VRAM，LoRA 支持，AnyText2 已发布
   239|   239|   237||| [[ai-game-devtools/atomic-agents]]
   240|   240|   238|||| [[ai-game-devtools/autoagents]] — LinkSoul/IJCAI 2024 自动多 Agent 生成框架：LLM 驱动动态生成专家角色+执行计划，Observer 三层反射检查（Agents/Plan/Action），MIT |
   241|   241|   239|||| [[ai-game-devtools/bagel]] — ByteDance-Seed 开源统一多模态模型（7B 激活/14B 总参）：MoT 架构融合视觉理解+文生图+图像编辑+世界建模，MMBench 85.0 超 Qwen2.5-VL，GenEval 0.82 匹敌 FLUX-1.dev，Apache 2.0 |
   242|   242|   240|||| [[ai-game-devtools/blender-controlnet]] — coolzilj Blender + A1111 WebUI API 桥接脚本：F12 渲染→Compositor 条件图(canny/depth/openpose/seg)→POST /txt2img→AI 生成图加载回 Image Editor，支持 4 种 ControlNet 单位并行，MIT |
   243|   243|   241|||| [[ai-game-devtools/blender-gpt]] — gd3kr Blender GPT-4 插件：自然语言→Blender Python 代码生成+自动执行，侧边栏聊天界面+代码查看器，OpenAI API 集成，MIT |
   244|   244|   242|||| [[ai-game-devtools/blender-mcp]] — ahujasid Blender MCP 服务器：通过 Model Context Protocol 连接 Claude AI 与 Blender，JSON/TCP 双向通信，支持 Poly Haven/Sketchfab 资产集成+Hyper3D 3D 生成，MIT |
   245|   245|   243||| [[ai-game-devtools/brivl]] — BAAI WuDao 中文图文多模态预训练模型（1B 参数）：EfficientNet-B5 + Chinese RoBERTa 双编码器 + MoCo 对比学习，图文检索超 CLIP/UNITER，可独立部署
   246|   246|   244||| [[ai-game-devtools/autogen]] — Microsoft Research 多 Agent 协作框架（维护模式）：Core/AgentChat/Extensions 三层架构，MCP/A2A 支持，后继者 Microsoft Agent Framework，MIT |
   247|   247|   245||| [[ai-game-devtools/autostudio]] — donahowe/AutoStudio CVPRW 2026 多轮交互式图像生成框架：四智能体（Subject Manager/LayoutGenerator/Supervisor/Drawer）+ Parallel-UNet + 免训练，保持多主题一致性，FID +13.65% |
   248|   248|   246|||| [[ai-game-devtools/catvton]] — ICLR 2025 虚拟试穿扩散模型：899M 参数/仅 49.57M 可训练，SD1.5 Inpainting 基础+拼接融合，1024×768 <8GB 显存，支持 VITON-HD/DressCode，CC BY-NC-SA 4.0 |
   249|   249|   247|||| [[ai-game-devtools/clipasso]] — SIGGRAPH 2022 语义感知图像转草图工具：CLIP 感知损失 + diffvg 可微栅格化，贝塞尔曲线优化输出 SVG，笔画数控制抽象程度，CC BY-NC-SA 4.0 |
   250|   250|   248|||| [[ai-game-devtools/comfyui]] — comfyanonymous 最强模块化视觉 AI 引擎：节点/图/流程图界面设计 SD 管线，18.7万行代码，578 Py文件，SD/Flux/视频/音频全支持，图执行引擎+增量缓存+智能显存管理，GPL v3 |
   251|   251|   249||||| [[ai-game-devtools/conceptlab]] — Tel Aviv University VLM引导创意概念生成：Kandinsky 2.1 扩散先验 + BLIP VLM 自适应负约束，生成从未存在的新概念/进化混合/风格创造，MIT |
   252|   252|   250|||| [[ai-game-devtools/controlnet]] — ICCV 2023：零卷积架构(SD encoder locked+trainable copy)控制扩散模型，9种条件图(canny/depth/pose/seg/normal等)，可组合多ControlNet并行，支持Guess Mode无提示生成 |
   253|   253|   251|| [[ai-game-devtools/aworld]] — inclusionAI 多智能体 Agent Harness 框架：CAST 代码分析 + Benchmark-Driven Development + Self-Evolution Loop，GAIA/OSWorld/XBench 多项 Leaderboard 1st，MIT |
   254|   254|   252||| [[ai-game-devtools/backgroundremover]] — nadermx U2Net AI 抠图工具：CLI+HTTP API+Python 库+Docker 支持，图像/视频/批量/管道模式，Alpha 精细抠边，ProRes 4444 透明视频输出，GPU 加速 5-10x，MIT |
   255|   255|   253|| [[ai-game-devtools/cradle]] — BAAI 游戏/软件 Agent 框架： screenshot→LLM推理→键鼠动作，RDR2/Stardew/CitiesSkylines/Dealer'sLife2 + Chrome/Outlook/Capcut，Skill Registry + Planner + Memory + SAM/GroundingDINO 视觉，MIT |
   256|   256|   254|| [[ai-game-devtools/agent-group-chat]] —
   257|   257|   255||| [[ai-game-devtools/longcat-flash]] — 美团 560B MoE LLM（激活 27B），ScMoE 架构 >100 TPS，128K context，Agent 任务 SOTA（τ²-Bench 73.68），MIT |
   258|   258|   256|| [[ai-game-devtools/longwriter]] — THUDM 超长文本生成 LLM（10K+ 词），基于 GLM-4-9B/Llama-3.1-8B 微调，AgentWrite 流水线，vLLM 推理 1 万词/分钟，Apache 2.0 |
   259|   259|   257||| [[ai-game-devtools/larp]] — MiAO 认知架构语言角色 Agent：4模块记忆处理（语义/情景/程序记忆）+ Wickelgren 遗忘定律 + 个性化 LoRA 适配 + 可学习动作空间，arXiv:2312.17653
   260|   260|   258||| [[ai-game-devtools/large-world-model-lwm]] — UC Berkeley/Scale AI 百万 token 上下文多模态模型（视频+语言+图像），RingAttention + Blockwise Transformer，7B 参数 1M context，Apache 2.0 |
   261|   261|   259|| [[ai-game-devtools/lumina-t2x]] — OpenGVLab 多模态 DiT 生成框架（图像/视频/3D点云/音频/音乐），Flag-DiT 5B / Next-DiT 2B，Flow Matching + RoPE，MIT |
   262|   262|   260|| [[ai-game-devtools/llama-3]] — Meta Llama 3 LLM 系列（8B/70B），128K 词表 + GQA + 15T tokens 预训练，ChatFmt 对话格式，MMLU 82.0（70B），已废弃 ||
   263|   263|   261|||| [[ai-game-devtools/llama-3-1]] — Meta Llama 3.1 系列（8B/70B/405B），128K context + GQA 全系列，15T+ tokens，TikToken，Llama 3.1 系列统一仓库 ||
   264|   264|   262|||| [[ai-game-devtools/llm-answer-engine]] — Developers Digest Perplexity 风格答案引擎：Groq Mixtral/Llama3 + Brave Search + Langchain.JS RAG，支持 function calling/流式响应/多模态结果，MIT ||
   265|   265|   263||||| [[ai-game-devtools/corenet]] — Apple 深度神经网络训练库：支持 LLM/CLIP/ViT 等 foundation models 的训练，含 FSDP 分布式训练 |
   266|   266|   264|| [[ai-game-devtools/cosmos]] — NVIDIA 物理 AI 世界基础模型平台：Predict/Transfer/Reason 三类模型，服务自动驾驶与机器人仿真 |
   267|   267|   265|| [[ai-game-devtools/dbrx]] — Databricks 132B MoE LLM：16 experts 选4，36B 激活参数，12T tokens 预训练，32K context，Databricks Open Model License |
   268|   268|   266||| [[ai-game-devtools/deepfloyd-if]] — DeepFloyd Lab/StabilityAI 级联像素扩散文本到图像模型：T5+三级UNet（64→256→1024px），FID 6.66 SOTA，支持 Dream/风格迁移/超分辨率/修复四种模式，Modified MIT |
   269|   269|   267||| [[ai-game-devtools/dclm]] — MLFoundations LLM 训练框架：300T+ tokens 数据集构建流程，Ray 分布式处理 + Rust deduplication，支持 400M-7B 规模模型训练评估 |
||| [[ai-game-devtools/depth-anything-v2]] — HKU+TikTok 单目深度估计 V2：DINOv2 ViT 骨干(4档:24.8M~1.3B)+DPT 解码头，中间层特征提取，Apple Core ML/TensorRT/ComfyUI/Transformers 集成，V2-Small Apache-2.0 可商用 |
||| [[ai-game-devtools/sam-2]] — Meta AI SAM 2 图像视频分割基础模型：Hiera骨干+流式记忆Transformer，实时视频分割+多目标跟踪，SA-V数据集训练，4尺寸模型(38M-224M)，Apache 2.0 |
||| [[ai-game-devtools/sd-webui-depth-lib]] — jexom A1111 WebUI 深度图管理插件：预置手部/形状深度图库 + Fabric.js 画布组合编辑 + 一键发送到 [[ai-game-devtools/controlnet]]，开源无 LICENSE |
   272|   272|   270||| [[ai-game-devtools/interactml-unity]]
   273|   273|   271||| [[ai-game-devtools/iml-ue4]] — Interactml Unreal Engine 4/5 C++ 插件：与 Unity 版共享 RapidLib 后端，kNN/MLP/DTW，原生 Blueprint 节点配置，Win64，MIT |
   274|   274|   272||| [[ai-game-devtools/index-1.9b]] — Bilibili 开源轻量级大语言模型（1.9B 参数）：2.8T 中英文语料预训练，含 Base/Chat/Character/32K 长上下文多版本，RAG 角色扮演 + INT4 量化 + LoRA 微调，Apache-2.0 + 可商用权重 |
   275|   275|   273|||||| [[ai-game-devtools/internlm]] — 上海 AI Lab 大模型系列（1.8B-20B），InternLM3-8B 仅 4T tokens 训练成本降低 75%，Deep Thinking Mode 支持长思维链推理，支持 LMDeploy/vLLM/SGLang 多推理后端 |
   276|   276|   274|||||||| [[ai-game-devtools/internlm-xcomposer]] — 上海 AI Lab 多模态 LVLM 系列（1.0→2.5），7B 参数达 GPT-4V 水平，支持 4K 图像/96K 上下文/视频理解，独有网页生成能力（指令→HTML/CSS/JS）|
   277|   277|   275|||||||| [[ai-game-devtools/motionllm]] — IDEA/清华/CUHK-SZ 视频+动作联合理解 LLM：Vicuna 1.5-7B + LoRA + SMPL 动作编码，MoVid 数据集，行为描述/时空理解/推理，arXiv 2405.20340 |
   278|   278|   276|||| [[ai-game-devtools/design2code]] — Stanford SALT Lab screenshot-to-code benchmark：484网页截图生成HTML代码，Design2Code-18B (CogAgent微调) + GPT-4V/Gemini/Claude 3.5 多模型评测，arXiv 2024 |
   279|   279|   277||||| [[ai-game-devtools/demogpt]] — DemoGPT 自动生成 AI 应用框架：自然语言 → Streamlit App 流水线（Plan/Task/Code/Final），内置 AgentHub 支持工具调用 + RAG |
   280|   280|   278|||||| [[ai-game-devtools/devika]] — Devika AI 软件工程师：Devin 开源替代方案，多 Agent 架构（Planner/Researcher/Coder 等），支持 Claude/GPT/Ollama，MIT |
   281|   281|   279||||||| [[ai-game-devtools/metagpt]] — MetaGPT 多 Agent 软件公司框架：PM/Architect/Engineer 角色协作，Code=SOP(Team) 核心理念，ICLR 2024，支持游戏代码生成，MIT |
   282|   282|   280||||||| [[ai-game-devtools/olmo]] — AI2 OLMo 开源 LLM 系列（1B/7B/13B/32B），两阶段训练 + 模型 soup 平均，HuggingFace 格式，Apache 2.0 |
   283|   283|   281|||||| [[ai-game-devtools/mlc-llm]] — mlc-ai 通用 LLM 部署引擎：TVM ML 编译优化，跨平台支持（Linux/Win/macOS/iOS/Android/Web/WASM），MLCEngine 统一推理接口，Apache 2.0 |
   284|   284|   282||||||| [[ai-game-devtools/mobillama]] — MBZUAI 轻量级 SLM（0.5B/0.8B/1B），参数共享策略降低训练和部署成本，HellaSwag 52.52（0.5B）超越 Pythia-410m，ICLR'25 SLLM Spotlight，Apache 2.0 |
   285|   285|   283||||||| [[ai-game-devtools/next-gpt]] — NExT++/NUS any-to-any 多模态 LLM（文字/图像/视频/音频任意组合），ImageBind 编码 + Vicuna-7B + LoRA 微调，ICML 2024 Oral，BSD 3-Clause |
   286|   286|   284||||||| [[ai-game-devtools/moshi]] — Kyutai 全双工语音对话基础模型，Mimi 流式神经编解码器（1.1kbps/80ms），7B Temporal+Depth Transformer，160ms 理论延迟，CC-BY 4.0 |
   287|   287|   285||||| [[ai-game-devtools/minimax-01]] — MiniMax 456B MoE LLM（激活 45.9B）+ VL 双模型，Lightning Attention + MoE，4M token 推理上下文，RULER 1M 0.910（最佳），MIT |
   288|   288|   286||| [[ai-game-devtools/flowise]] — FlowiseAI 可视化拖拽 LLM 应用构建平台
   289|   289|   287|| [[ai-game-devtools/gptscript]] — Acorn Labs LLM 工具调用框架：.gpt 脚本语言连接 OpenAPI/CLI/文件系统，Go 实现，Apache 2.0 |
   290|   290|   288|| [[ai-game-devtools/deepseek-v3]]
   291|   291|   289|| [[ai-game-devtools/devon]] — entropy-research 开源 AI 结对编程助手：支持 Claude/GPT-4o/Groq/Ollama 多模型，Electron+TUI 双界面，专注代码库编辑/探索/测试生成，AGPL |
   292|   292|   290||| [[ai-game-devtools/chrome-gpt]] — AutoGPT agent 控制 Chrome 浏览器：Selenium + LangChain，支持 Auto-GPT/BabyAGI/Zero-shot 多种 agent 类型 |
   293|   293|   291|||| [[ai-game-devtools/glm-4]] — THUDM/ZhipuAI 32B LLM 系列（GLM-4/Z1/Z1-Rumination），Agent 优化，128K context，BFCL 69.6%，函数调用优于 GPT-4o |
   294|   294|   292|||| [[ai-game-devtools/glm-4.5]] — THUDM/ZhipuAI GLM-4.5/4.6/4.7 系列，MoE 架构（355B-A32B），混合推理+工具调用，MIT 许可 |
   295|   295|   293|||| [[ai-game-devtools/gpt4all]] — Nomic 本地 LLM 运行平台：桌面 GUI + Python/TS 绑定 + llama.cpp 后端，支持 Vulkan/CUDA GPU 加速，MIT |
   296|   296|   294||||| [[ai-game-devtools/gpt-oss]] — OpenAI 开放权重推理模型（120B/20B MoE），Apache 2.0，MXFP4 量化，单卡 80GB 可运行，含 Browser/Python/ApplyPatch 工具 |
   297|   297|   295|||| [[ai-game-devtools/orion-14b]] — OrionStarAI 14B 多语言 LLM（中文/英文/日文/韩文），2.5T tokens 预训练，C-Eval 72.9/CMMLU 70.6/MMLU 69.9 全面超越同尺寸竞品，LongChat 支持 320k token，Apache 2.0 |
   298|   298|   296|||| [[ai-game-devtools/pandallm]] — DandelionsLLM 中文开源大模型：PandaLLM（LLaMA1/2 中文预训练）+ PandaLLMOps（全流程训练推理部署工具）+ PandaCommunity 社区，Apache 2.0 |
   299|   299|   297|||||| [[ai-game-devtools/stable-lm]] — Stability AI 开源 LLM 系列（3B/7B/13B），StableLM-3B-4E1T 多 epoch 训练 4T tokens SOTA，CC BY-SA-4.0 |
   300|   300|   298||||||| [[ai-game-devtools/webgpt]] — 0hq 纯浏览器端 GPT 推理：WebGPU + WGSL 自定义着色器，117M~1.5B 模型免构建直接开 HTML 运行，适合教育目的，MIT |
   301|   301|   299|||||||| [[ai-game-devtools/wordgpt]] — filippofinke Microsoft Word Office 插件：OpenAI text-davinci-003 集成，Prompt 输入→生成→插入文档，React + Fluent UI，MIT |
   302|   302|   300||| [[ai-game-devtools/nvidia-nemo-agent-toolkit]] — NVIDIA 开源多智能体编排框架（Apache 2.0）：框架无关的 Agent 连接层，插件支持 LangChain/CrewAI/LlamaIndex 等 7+ 框架，企业级可观测性+评估+安全测试，CLI 工作流驱动，Python 3.11-3.13，无需 GPU |
   303|   303|   301||| [[ai-game-devtools/om-agent]] — OmAI Lab 多模态语言智能体框架：Conductor 工作流引擎 + YAML 配置驱动、8 种推理算子(ReAct/CoT/SC-CoT/PoT 等)、VLM/视频理解/STT 多模态、Redis/Milvus 双记忆、Lite 模式无需中间件
   304|   304|   302||| [[ai-game-devtools/openagents]] — XLang NLP Lab 开源语言 Agent 平台：Data/Plugins/Web 三大 Agent + Next.js Chat UI + Flask 后端 + MongoDB/Redis 存储 + Chrome 扩展自动浏览，基于 LangChain，3000+ 用户，Apache 2.0
   305|   305|   303|||| [[ai-game-devtools/open-oasis]] — Decart×Etched 交互式世界模型：DiT 架构 + ViT VAE，键盘动作→自回归游戏画面帧生成，500M 参数开源版，HuggingFace 权重
   306|   306|   304|||| [[ai-game-devtools/pipecat]] — pipecat-ai 实时语音/多模态 AI Agent 框架：Frame-based 管道架构、60+ AI 服务集成（STT/LLM/TTS/Vision）、Daily/LiveKit WebRTC 传输、多平台 SDK（JS/React/Swift/Kotlin/C++）、BSD-2-Clause
   307|   307|   305|||| [[ai-game-devtools/sotana]] — DeepSoftwareAnalytics 软件工程指令微调模型：LLaMA + LoRA（7B/13B/30B），覆盖 Stack Overflow 问答/代码生成/代码摘要三类任务，PEFT 高效微调 |
   308|   308|   306|||| [[ai-game-devtools/ten-agent]] — TEN-framework 开源实时多模态对话 AI 框架：低延迟语音/视频 Agent，多语言架构(Python/C/C++/TS/Rust/Go)、VAD/Turn Detection/唇形同步/ESP32 硬件支持、RTC/WebSocket 双传输，Apache 2.0
   309|   309|   307|||| [[ai-game-devtools/translation-agent]] — Andrew Ng 反射式 Agent 翻译工作流：翻译→反思→改进三步循环，支持区域语言变体/术语表定制，Gradio WebUI 多 LLM 端点，MIT
   310|   310|   308|||| [[ai-game-devtools/video2game]] — 视频转 3D 游戏场景管线：NeRF→网格提取→纹理烘焙→碰撞体生成→Three.js/Unreal 集成，Omnidata 先验+V-HACD 凸分解，单视频生成可交互 3D 环境
   311|   311|   309|||| [[ai-game-devtools/video-chatgpt]] — MBZUAI 视频对话模型（ACL 2024）：CLIP ViT-L/14 + Vicuna LLM + 100K 视频指令数据，MSVD-QA 64.9%/ActivityNet-QA 35.2% SOTA，CC BY-NC-SA 4.0
   312|   312|   310|||| [[ai-game-devtools/video-of-thought]] — 首个视频 Chain-of-Thought 推理框架（ICML 2024 Oral）：MotionEpic 视频 MLLM(Vicuna-7B+CLIP ViT-L/14+STSG 图编码器) + 5 步 VoT 推理链(任务定义→对象跟踪→动作分析→排序问答→答案验证)，BSD
   313|   313|   311|||| [[ai-game-devtools/webdesignagent]] — 阿里达摩院自主网站生成 Agent：多模态输入(文本/模板/图片)→结构规划→Tailwind CSS 网页生成，GUI+CLI 双模式，人机反馈循环，Apache 2.0
   314|   314|   312||| [[ai-game-devtools/wordware-twitter]] — Wordware AI Twitter 人格分析 Agent：Next.js + TypeScript + Neon DB + Drizzle ORM，三通道 Twitter 数据抓取降级（API/Apify/SocialData），模块化 Prompt 系统（ROAST/FULL/PAIR），Stripe + PostHog + Loops 完整 SaaS 架构
   315|   315|   313|| [[ai-game-devtools/streamlit]] — Snowflake 开源 Python Web 框架：纯 Python 构建 ML/Data 应用，@st.cache 缓存系统+多模态组件+chat_message 对话 UI，HuggingFace Spaces 默认支持，Apache 2.0 |
   316|   316|   314|||| [[ai-game-devtools/csgo]] — InstantX 内容-风格解耦图像生成框架：SDXL 基座 + IP-Adapter，4 内容 Token + 16/32 风格 Token，支持文本/图像/编辑驱动风格化合成，DeepSpeed Zero2 训练，HuggingFace 权重 |
   317|   317|   315||||| [[ai-game-devtools/index-anisora]] — Bilibili 开源动漫视频生成模型（IJCAI'25）：V1基于CogVideoX-5B/V2基于Wan2.1-14B，时空掩码模块+多引导控制（姿态/深度/线稿/音频），VBench运动平滑度99.34 SOTA，RLHF训练管线，1000万+数据支持
   318|   318|   316|
   319|   319|   317||| [[ai-game-devtools/mini-gemini]] — Mini-Gemini (MGM) 多模态 VLM 系列（2B~34B/MoE）：双视觉编码器+Patch Info Mining，同时支持图像理解与生成，Apache 2.0 代码
   320|   320|   318|||||| [[ai-game-devtools/mochi-1]] — Genmo 10B 参数文本到视频扩散模型：AsymmDiT 非对称架构（视觉 dim 3072 / 文本 dim 1536）+ AsymmVAE（8x8 空间/6x 时间压缩），Apache 2.0，单卡需 ~60GB VRAM
   321|   321|   319||||| [[ai-game-devtools/mora]] — Lehigh 多智能体视频生成框架（arXiv 2403.13248）：SDXL+SVD-XT 多 Agent 协作管线，支持 T2V/I2V/视频扩展/编辑/连接/世界模拟，80s 生成接近 Sora 时长
   322|   322|   320||| [[ai-game-devtools/money-printer-turbo]] — harry0703 全自动短视频生成工具：主题/关键词→LLM文案+Pexels素材+TTS语音+字幕+BGM→高清视频，15+LLM提供商/MVC架构/FastAPI+Streamlit，MIT
   323|   323|   321||| [[ai-game-devtools/shortgpt]] — RayVentura AI 视频自动化框架：LLM驱动JSON编辑管线、短视频/长视频/视频翻译三引擎、MoviePy渲染+ElevenLabs/EdgeTTS配音、Pexels素材源、Gradio UI、Docker部署，MIT
   324|   324|   322|||||| [[ai-game-devtools/mofa-video]] — 腾讯 AI Lab/东京大学 ECCV 2024 可控图像动画工具：冻结 SVD 模型 + MOFA-Adapter 注入，支持轨迹/关键点/混合三种控制模式，音频/视频驱动面部动画，长视频生成（周期性采样），Apache 2.0
   325|   325|   323|||||| [[ai-game-devtools/hotshot-xl]] — Natural Synthetics 文本到GIF扩散模型
   326|   326|   324||||| [[ai-game-devtools/diffsynth-studio]] — ModelScope 开源扩散模型引擎：FLUX/Wan/Qwen-Image 等多模型推理+训练+极低显存管理(6GB)，Apache 2.0
   327|   327|   325||||| [[ai-game-devtools/drawingspinup]] — SIGGRAPH Asia 2024 单图角色绘制→3D 风格化动画：FFC-ResNet 轮廓移除 + 多视图扩散重建 + Few-Shot Patch-Based Training 风格恢复，Blender 渲染管线，Mixamo 骨骼绑定
   328|   328|   326||||| [[ai-game-devtools/dolphin]] — BUAA+NTU 视频交互平台：LangChain Agent + 17 种视频工具（理解/处理/生成/音频/图像），多 GPU 分配 + YAML 配置驱动 + Gradio UI，支持中英双语
   328|   328|   326||||| [[ai-game-devtools/dream-cinema]] — 清华大学电影迁移框架：3D AIGC 角色生成 + 相机轨迹优化 + 结构引导运动迁移，arXiv 2408.12601，MIT，代码未发布
   329|   329|   327||| [[ai-game-devtools/edge]] — Stanford TML CVPR 2023 音乐驱动可编辑舞蹈生成：Transformer Decoder + Gaussian Diffusion + Jukebox 音乐特征 + FiLM 条件调制，支持关节级编辑和帧间插补，AIST++ 数据集
   330|   330|   328|||| [[ai-game-devtools/motionclone]] — Bujiazi 免训练运动克隆视频生成框架：稀疏时序注意力权重作为运动表征，单次去噪步提取(无需DDIM反转)，支持T2V/I2V/草图到视频，基于SD 1.5+AnimateDiff v3
   331|   331|   329||||| [[ai-game-devtools/motiondirector]] — 新国大 Show Lab 视频运动定制扩散模型：双路径 LoRA（空间外观+时间运动），ZeroScope/ModelScopeT2V 基础，14GB VRAM/数分钟训练，支持运动/电影镜头/图像动画/外观+运动联合定制，HuggingFace Spaces of the Week
   332|   332|   330|||| [[ai-game-devtools/open-sora]] — HPCAitech 开源视频生成项目（ColossalAI 团队）：11B MMDiT 模型，T2V+I2V 统一，Rectified Flow+3D-VAE+Score Condition，$200K 训练成本，VBench 接近 Sora（差距 0.69%），Apache 2.0
   333|   333|   331|||| [[ai-game-devtools/open-sora-plan]] — PKU-兔展 开源 Sora 复现项目：8.5B SUV 稀疏 U 型 DiT + 8×8×8 WFVAE 高压缩编解码，40M 视频+1.1B 图像训练，VBench 83.02%（媲美 13B HunyuanVideo），Ascend 910B 全链路训练推理，MIT
   334|   334|   332||| [[ai-game-devtools/vchitect-2-0]] — Vchitect 团队 2B 参数文本到视频扩散模型：Parallel Transformer 架构，720×480/8fps 基座+VEnhancer 2K/24fps 后处理，Apache 2.0
   335|   335|   333||||| [[ai-game-devtools/wan2-1]] — 阿里巴巴 Wan 团队开源视频基础模型套件：DiT+Flow Matching 架构，1.3B/14B 双尺寸，T2V/I2V/FLF2V/VACE 全任务覆盖，3D Causal VAE 支持无限长度 1080P 编码，Prompt Extension + FSDP/xDiT 多卡并行
   336|   336|   334|||||| [[ai-game-devtools/wan2-2]] — 阿里巴巴 Wan2.2 视频生成重大升级：MoE 双专家架构（27B总/14B激活）、Cinematic美学数据训练、Wan2.2-VAE高压缩(16×16×4)、TI2V-5B消费级GPU可跑720P@24fps、新增S2V语音→视频+Animate角色动画/替换，Apache 2.0
||||| [[ai-game-devtools/waver]] — FoundationVision 工业级视频基础模型：Rectified Flow DiT 架构，12B参数，T2V/I2V/T2I统一，1080p/2-10秒，Artificial Analysis Top 3，级联480p/720p→1080p加速40-60%，Wan-VAE+flan-t5-xxl+Qwen2.5-32B，APG防过饱和
||| [[ai-game-devtools/whisper]] — OpenAI 通用语音识别 Transformer 模型：多语言 ASR + 语音翻译 + 语言识别，6 种尺寸(39M~1550M)，99 种语言，滑动 30s 窗口自回归推理，MIT 开源，语音领域事实标准基线
|||| [[ai-game-devtools/vgen]] — 阿里巴巴通义实验室全景视频生成生态系统：I2VGen-XL 两阶段图像→视频(1280×720)+DreamVideo 主体/运动定制+HiGen/TF-T2V，Python/PyTorch/YAML 驱动，~2 分钟推理
   339|   339|   337||||||| [[ai-game-devtools/view-crafter]] — TPAMI 2025: 视频扩散模型高保真新视角合成，单/稀疏图像→多视角，576×1024/25帧/23.5GB，精确相机位姿控制
   340|   340|   338||||| [[ai-game-devtools/video-elevator]] — AAAI 2025 训练-free 视频质量提升框架：T2V时序精炼+T2I空间注入交替管线，无需微调即兼容多种扩散后端，<11GB VRAM可运行
   341|   341|   339|| [[ai-game-devtools/agent-k]] — The autoagentic AGI. AgentK is a selfevolving AGI made of collaborating agents that can create new agents as needed to complete user tasks. Built on L |
   342|   342|   340|| [[ai-game-devtools/ai-command]] — AICommand (keijiro/AICommand) is a Unity Editor proofofconcept integration of ChatGPT that allows controlling the Editor using natural language prompt |
   343|   343|   341|| [[ai-game-devtools/ai-scientist]] — The AI Scientist (by SakanaAI(https://sakana.ai)) is the first fully automated scientific discovery system — an LLMpowered agent that conducts indepen |
   344|   344|   342|| [[ai-game-devtools/animate-x]] — ICLR 2025 论文：通用角色图像动画框架，基于潜在扩散模型（LDM），适用于多种角色类型（包括拟人化角色） |
   345|   345|   343|| [[ai-game-devtools/animatediff]] — AnimateDiff 是一个即插即用的运动模块（Motion Module），可将大多数社区 Stable Diffusion 模型转换为文本到视频（T2V）动画生成器，无需额外训练。 |
   346|   346|   344|| [[ai-game-devtools/animatelcm]] — AnimateLCM (Animate Latent Consistency Model) 是由 CUHKMMLab 团队（FuYun Wang 等）开发的计算高效个性化风格视频生成框架，arXiv 2402.00769。核心创新：将扩散模型动画生成从 2550 步推理加速至 18 步（通常 4 步 |
   347|   347|   345|| [[ai-game-devtools/animation-gpt]] — GitHub: https://github.com/fyyakaxyy/AnimationGPT License: MIT Authors: Yihao Liao, Yiyu Fu, Ziming Cheng, Jiangfeiyang Wang Year: 2024 |
   348|   348|   346|| [[ai-game-devtools/assistant-cli]] — A Node.js CLI tool for integrating with OpenAI ChatGPT service directly from the terminal, developed by Paolo Di Ciaula. |
   349|   349|   347|| [[ai-game-devtools/audiolcm]] — GitHub: https://github.com/liuhuadai/AudioLCM arXiv: 2406.00356(https://arxiv.org/abs/2406.00356v1) HuggingFace: Weights(https://huggingface.co/liuhua |
   350|   350|   348|| [[ai-game-devtools/auto-gpt]] — AutoGPT is a browserbased AI agent platform (183k GitHub stars) for creating, deploying, and managing continuous AI agents that automate complex workf |
   351|   351|   349|| [[ai-game-devtools/babyagi-ui]] — miurla BabyAGI Web UI 实现：Next.js + LangChain.js + Pinecone，ChatGPT 风格实时对话界面，支持并行任务处理/技能扩展/搜索集成，Vercel 一键部署，MIT |
   352|   352|   350|| [[ai-game-devtools/baichuan-13b]] — 百川智能开发的 130 亿参数开源可商用双语 LLM（Base + Chat 两个版本），2023 年 8 月发布。在 CEval、MMLU、CMMLU 等权威中英文 benchmark 上取得同尺寸最优效果。 |
   353|   353|   351|| [[ai-game-devtools/baichuan-2]] — 在多个权威中英文 benchmark 上显著超越 LLaMA213B： |
   354|   354|   352|   352|| [[ai-game-devtools/baichuan-7b]] — 基于Hugging Face Transformers实现，支持AutoModelForCausalLM直接加载。 |
   355|   355|   353|   353|| [[ai-game-devtools/bert-vits2]] — VITS2+多语言BERT语音合成：BERT语义特征增强音素级语音生成、多说话人训练、ONNX导出、VTuber/NPC语音，短期维护暂停（后继[[ai-game-devtools/fish-speech]]） |
   356|   356|   354|   354|| [[ai-game-devtools/bisheng]] — Bisheng is an open LLM application devops platform focused on enterprise scenarios, developed by DataElement(https://github.com/dataelement). Named af |
   357|   357|   355|   355|| [[ai-game-devtools/cambrian-1]] — Cambrian1 是由 NYU Vision X（Yann LeCun、Saining Xie 参与）开发的开源多模态大语言模型（MLLM），主打视觉中心能力。发布于 20240624，提供 8B / 13B / 34B 三种参数规模，在多项 benchmark 上与 GPT4V、GeminiPr |
   358|   358|   356|   356|| [[ai-game-devtools/character-llm]] — CharacterLLM 是一个可训练的角色扮演 LLM agent，由复旦大学 NLP 实验室于 EMNLP 2023 发表。与基于 Prompt 的角色扮演不同，CharacterLLM 通过 Experience Reconstruction 技术对 LLaMA7B 进行微调，使模型内化特定人 |
   359|   359|   357|   357|| [[ai-game-devtools/chatyuan]] — ChatYuanlargev2 是由 ClueAI（元语智能） 开发的中英双语对话大语言模型，发布于 2023 年 3 月 23 日。基于 T5 架构，是 ChatGPT 风格的功能型对话模型。 |
   360|   360|   358|   358|| [[ai-game-devtools/cogvlm2]] — CogVLM2 is THUDM/ZhipuAI's secondgeneration Visual Language Model series, based on MetaLlama38BInstruct with a visual expert adapter. Released 2024052 |
   361|   361|   359|   359|| [[ai-game-devtools/deepseek-r1]] — DeepSeekR1 是 DeepSeekAI 发布的第一代推理模型系列，包括 DeepSeekR1Zero（纯 RL 无 SFT）和 DeepSeekR1（冷启动 + RL）。基于 DeepSeekV3Base 的 MoE 架构（671B 总参，37B 激活），在数学、代码和推理任务上性能与 Op |
   362|   362|   360|   360|| [[ai-game-devtools/dots-vlm1]] — dots.vlm1 是小红书（rednotehilab）发布的首个视觉语言模型，属于 dots 模型家族。基于 12 亿参数的 NaViT 视觉编码器和 DeepSeek V3 LLM 构建，在 OCR/文档理解、STEM 推理、多图像理解等多个基准上达到接近 SOTA水平。 |
   363|   363|   360|| [[ai-game-devtools/evf-sam]] — EVFSAM 是由华中科技大学（HUST）和 vivo AI Lab 联合开发的开源多模态分割模型，将 SAM（Segment Anything Model）的图像分割能力与文本提示相结合，实现"指代表达分割"（Referring Expression Segmentation）。支持图像和视频的文 |
   364|   364|   361|| [[ai-game-devtools/flux]] — FLUX is the openweight image generation model family by Black Forest Labs (https://bfl.ai), founded by Stability AI alumni including Robin Rombach (co |
   365|   365|   362|| [[ai-game-devtools/follow-your-click]] — AAAI 2025 论文官方实现：开放域区域图像动画，通过简短文本提示精确控制静态图像的局部运动，无需复杂指令或密集运动掩码。 |
   366|   366|   363|| [[ai-game-devtools/fooocus]] — Fooocus is an opensource, free, offline image generation tool by lllyasviel (the creator of ControlNet), built on the Stable Diffusion XL architecture |
   367|   367|   364|| [[ai-game-devtools/gemma]] — Gemma is a family of lightweight, stateoftheart open models built from research and technology used to create Google Gemini models. This repository (g |
   368|   368|   365|| [[ai-game-devtools/gemma-cpp]] — gemma.cpp is a lightweight, standalone C++ inference engine for Google Gemma foundation models (Gemma 2, Gemma 3, RecurrentGemma, PaliGemma 2). It pri |
   369|   369|   366|| [[ai-game-devtools/giffusion]] — GIFfusion is an opensource web UI for generating animated GIFs and videos using Stable Diffusion via the Hugging Face Diffusers library. It specialize |
   370|   370|   367|| [[ai-game-devtools/glm-v]] — GLMV 是智谱AI（Zhipu AI）开源的视觉语言模型（VLM）系列，包含 GLM4.6V、GLM4.5V、GLM4.1V9BThinking 三个主要版本，参数规模覆盖 9B 到 106B，支持原生多模态函数调用、链式推理、任意长宽比图像等能力。GitHub 仓库地址：https://gith |
   371|   371|   368|| [[ai-game-devtools/hua]] — Hua (画, meaning "paint" in Chinese) is an AI image editor frontend built by BlinkDL (also known for aigamedevtools/chatrwkv and RWKVLM). It provides a |
   372|   372|   369|| [[ai-game-devtools/hugging-face-api-unity-integration]] — Official Hugging Face Unity package (com.huggingface.api v0.8.0, Unity 2020.3+) providing a clean C facade over the Hugging Face Inference API. Grants |
   373|   373|   370|| [[ai-game-devtools/hunyuan-mt]] — HunyuanMT 是腾讯混元团队开源的机器翻译模型系列，包含两个核心模型： |
   374|   374|   371|| [[ai-game-devtools/ic-light]] — ICLight (Imposing Consistent Light) 是由 lllyasviel 开发的图像光照操控项目，基于 Stable Diffusion 1.5 架构，通过扩散模型实现高质量的图像重新打光（relighting）。发表于 ICLR 2025。 |
   375|   375|   372|| [[ai-game-devtools/imagebind]] — ImageBind 是 Meta AI (FAIR) 开发的六模态联合嵌入模型，将图像、视频、文本、音频、深度图、热成像、IMU 六种模态映射到统一向量空间，实现跨模态检索与组合推理。 |
   376|   376|   373|| [[ai-game-devtools/img2img-turbo]] — 一句话: CMU + Adobe 联合研发的单步扩散模型图像翻译工具，基于 SDTurbo + LoRA + 对抗学习，实现 0.11s 极速推理（512×512，A100）。 |
   377|   377|   374|| [[ai-game-devtools/jan]] — Jan is a desktop application that runs local LLMs 100% offline, providing full control and privacy. Think ChatGPT but private, local, and under comple |
   378|   378|   375|| [[ai-game-devtools/janus]] — Janus is DeepSeek's family of unified multimodal models that simultaneously handle visual understanding (VLM) and texttoimage generation in a single a |
   379|   379|   376|| [[ai-game-devtools/kangaroo]] — A powerful 8B parameter VideoLanguage Model (Video LMM) developed by KangarooGroup, capable of processing long videos up to 160 frames (22k tokens). A |
   380|   380|   377|| [[ai-game-devtools/kimi-k2]] — Kimi K2 是 Moonshot AI（Kimikimi 月之暗面）发布的最新一代稀疏混合专家（MoE）大语言模型，总参数 1 万亿，激活参数 320 亿。专为 Agent 能力优化，在代码生成、工具调用和数学推理任务上达到开源 SOTA。 |
   381|   381|   378|| [[ai-game-devtools/kwai-keye-vl]] — 快手可灵团队（Kwai Keye Team）开发的多模态大语言模型，专注于视频理解、视觉感知和推理任务。 |
   382|   382|   379|| [[ai-game-devtools/kitten-tts]] — KittenML 超轻量 ONNX TTS 库：15M-80M 参数（25-80MB），纯 CPU 推理，8 内置音色，流式输出支持，Apache 2.0 |
   383|   383|   379|| [[ai-game-devtools/overflow]] — KTH 开源 TTS 模型 (Interspeech 2023)：HMM 神经 transducer + 归一化流解码器，Tacotron2 编码器 + HiFi-GAN 声码器，预训练男女声权重，说话速率/温度可调，MIT，已集成到 Coqui TTS |
   384|   383|   383|   379|| [[ai-game-devtools/la-vague]] — lavague-ai 开源 LAM 框架：多模态 LLM World Model + Action Engine 架构，Selenium/Playwright/Chrome Extension 三驱动，自然语言→浏览器自动化，llama-index 底层，Apache 2.0 |
   385|   384|   380|| [[ai-game-devtools/lamini]] — Lamini 是一个 Python SDK + 云端平台，用于快速构建和微调自定义生成式 AI 模型。提供从数据上传、模型微调、推理到评估的完整 LLM 工作流，并支持基于链式生成器/验证器的 Agentic Pipeline 架构。v3.2.22，Apache 2.0。 |
   386|   385|   381|| [[ai-game-devtools/lamini-lm]] — Best performers per size: LaMiniFlanT5 variants and LaMiniGPT1.5B are recommended. |
   387|   386|   382|| [[ai-game-devtools/lavi-bridge]] — ECCV 2024 Bridging Language & Vision Models for TexttoImage Generation |
   388|   387|   383|| [[ai-game-devtools/layer-diffusion]] — LayerDiffuse 是由 lllyasviel（张吕敏，aigamedevtools/controlnet 和 aigamedevtools/fooocus 的作者）开发的透明图像层扩散项目，通过 latent transparency 技术实现原生透明通道生成，而非后处理抠图。 |
   389|   388|   384|| [[ai-game-devtools/lemur]] — Lemur is an open foundation model optimized for both natural language and code, purposebuilt as the backbone of versatile language agents. Developed b |
   390|   389|   385|| [[ai-game-devtools/lepton-ai]] — Photon abstraction — Core class that turns any Python code into a REST API service via @Photon.handler decorator HuggingFace model launcher — Oneliner |
   391|   390|   386|| [[ai-game-devtools/lit-llama]] — LitLLaMA 是 LLaMA(https://github.com/facebookresearch/llama) 预训练、微调和推理代码的独立开源实现，基于 nanoGPT(https://github.com/karpathy/nanoGPT) 构建，完全使用 Apache 2.0 许可证开 |
   392|   391|   387|| [[ai-game-devtools/llama-agentic-system]] — Meta 官方提供的 Llama 3.1+ agentic 应用示例项目，现归属 Llama Stack(https://github.com/metallama/llamastack) 生态（仓库地址变更为 llamastack/llamastackapps）。 |
   393|   392|   388|| [[ai-game-devtools/llasm]] — LLaSM (Large Language and Speech Model) 是首个支持中英文语音文本多模态对话的开源可商用对话模型。由 LinkSoulAI 开发，Apache2.0 许可。 |
   394|||| [[ai-game-devtools/speechgpt]] — Fudan University 首个语音-文本跨模态对话 LLM：LLaMA-7B 基座 + mHuBERT 语音离散化 + 三阶段训练（模态适应预训练/跨模态指令微调/链式模态 LoRA），SpeechInstruct 数据集(9M对)，含 SpeechGPT-Gen(8B, CoIG流匹配)子项目
   395|   393|   389|| [[ai-game-devtools/llava-onevision]] — LLaVAOneVision (是 LLaVANeXT 项目的一个子系列) 是一个支持单图、多图和视频输入的多模态大模型（VLM），在 47 个 benchmark 上达到或接近 SOTA，有时甚至媲美顶级商业模型（如 GPT4V、GeminiPro）。 |
   396|   394|   390|| [[ai-game-devtools/llava-pp]] — MBZUAI LLaVA++：将 Phi-3 Mini 3.8B 和 LLaMA-3 8B 集成到 LLaVA 1.5 视觉指令框架，支持预训练/LoRA/全量/S² 微调，Apache 2.0 |
   397|   395|   391|| [[ai-game-devtools/llm.c]] — llm.c 是 Andrej Karpathy 的开源项目，用简洁、纯净的 C/CUDA 实现 LLM（GPT2/GPT3）训练，无需 PyTorch（245MB）或 cPython（107MB）任何外部 ML 框架依赖。项目同时提供 PyTorch 参考实现（traingpt2.py，基于 nan |
   398|   396|   392|| [[ai-game-devtools/llmunity]] — Undream AI(https://undream.ai) 出品的 Unity LLM 集成插件（v3.0.3），将大语言模型直接嵌入 Unity 游戏引擎，支持 PC/移动端/VR 全平台运行。 |
   399|   397|   393|| [[ai-game-devtools/longva]] — LongVA (Long Vision Assistant) is a large multimodal model (LMM) developed by SLab at Nanyang Technological University (NTU), led by researchers inclu |
   400|   398|   394|| [[ai-game-devtools/lumina-dimoo]] — An omni foundational model for seamless multimodal generation and understanding, developed by researchers from Shanghai AI Laboratory, Shanghai Jiao T |
   401|   399|   395|| [[ai-game-devtools/mean-audio]] — MeanAudio 是基于 MeanFlow 目标的文本到音频生成模型，由上海交通大学 Xiquan Li 等人开发。核心优势是单步生成高质量音频，在单张 RTX 3090 上实时率 (RTF) 仅 0.013。 |
   402|   400|   396|| [[ai-game-devtools/migc]] — MIGC (MultiInstance Generation Controller) 是浙江大学 ReLER Lab 与华为合作开发的多实例文本到图像生成控制框架。MIGC 解决了标准扩散模型在生成包含多个不同对象且需要精确定位和属性控制的图像时的常见失败模式，通过 adapter 架构实现对每个实 |
   403|   401|   397|| [[ai-game-devtools/mimicbrush]] — MimicBrush 是阿里巴巴达摩院（alivilab）开发的零样本图像编辑工具，通过参考图像模仿（Reference Imitation）实现对目标图像指定区域的纹理/风格迁移。用户只需提供源图像、绘制编辑区域蒙版、提供参考图像，即可实现高质量的内容替换，同时可选择是否保留原始几何形状。 |
   404|   402|   398|| [[ai-game-devtools/minicpm-2b]] — MiniCPM2B (OpenBMB/MiniCPM) is an efficient large language model with 2B parameters released in February 2024. Developed by openbmb (Beijing Academy o |
   405|   403|   399|| [[ai-game-devtools/minicpm-llama3-v-2.5]] — MiniCPMLlama3V 2.5 (OpenBMB, 2024.05.20) is an opensource visual language model achieving GPT4Vlevel performance with only ~3B parameters. It was the  |
   406|   404|   400|| [[ai-game-devtools/minicpm-v-4.0]] — MiniCPMV 4.0 and MiniCPMo 4.5 (OpenBMB/THUNLP, 2025) are the latest in the MiniCPMV series of ondevice multimodal LLMs. MiniCPMV 4.0 (4.1B params) foc |
   407|   405|   401|| [[ai-game-devtools/minigpt-4]] — ViT encoder: frozen vision transformer, image size 224×224 QFormer: BLIP2 style, 32 query tokens; maps visual features to LLM embedding space via a si |
   408|   406|   402|| [[ai-game-devtools/minigpt-5]] — UC Santa Cruz 提出的交叠式图文生成模型，通过 Generative Vokens 机制实现文本与图像的协同生成，无需详细图像描述即可训练。 |
   409|   407|   403|| [[ai-game-devtools/moe-llava]] — MoELLaVA (Mixture of Experts for Large VisionLanguage Models) 是北京大学 & PKUYuanGroup 提出的基于 MoE 架构的高效多模态大模型，通过稀疏激活参数显著降低计算成本。 |
   410|   408|   404|| [[ai-game-devtools/moss]] — MOSS is a bilingual (Chinese/English) opensource conversational language model with plugin support, developed by OpenLMLab at Fudan University. The mo |
   411|   409|   405|| [[ai-game-devtools/mplug-owl]] — mPLUGOwl is a family of MultiModal Large Language Models (MLLMs) developed by Alibaba DAMO Academy(https://damo.alibaba.com/), spanning three major ve |
   412|   410|   406|| [[ai-game-devtools/omnilmm]] — OmniLMM (OpenBMB MiniCPMV & MiniCPMo) is an opensource suite of ondevice multimodal LLMs for vision, speech, and fullduplex multimodal live streaming. |
   413||| [[ai-game-devtools/onellm]] — OneLLM (One Framework to Align All Modalities with Language) is a CVPR 2024 unified multimodal framework that aligns 8 modalities with language via a  |
   414||||| [[ai-game-devtools/one-shot-voice-cloning]] — Unet-TTS 单样本语音克隆：U-Net+AdaIN 架构，仅需一段参考音频克隆说话人声音，Style Encoder 自动估算音素时长统计，TensorFlowTTS 二次开发，MIT
   415||||| [[ai-game-devtools/openvoice]] — MyShell AI 即时语音克隆框架：VITS 架构，精准音色克隆+风格控制+零样本跨语言（EN/ES/FR/ZH/JA/KO），内置水印，MIT 开源
   416|||| [[ai-game-devtools/open-assistant]]
   417|   413|   409|| [[ai-game-devtools/opendevin]] — AIdriven autonomous software engineering agent. Formerly known as OpenDevin; rebranded to OpenHands. |
   418|   414|   410|| [[ai-game-devtools/perplexica]] — GitHub: https://github.com/ItzCrazyKns/Perplexica License: MIT Tech Stack: Next.js, TypeScript, SearxNG, Drizzle ORM, Docker Category: LLM & Tool — AI |
   419|   415|   411|| [[ai-game-devtools/pllava]] — PLLaVA (Pooling LLaVA) is a parameterfree LLaVA extension that adapts imagelanguage pretrained models for video understanding via temporal pooling, ac |
   420|   416|   412|| [[ai-game-devtools/points-reader]] — POINTSReader is a distillationfree visionlanguage model for endtoend document conversion, developed by Tencent. It was accepted to EMNLP 2025 Main Con |
   421|   417|   413|| [[ai-game-devtools/poster-craft]] — PosterCraft 是一个统一框架，用于高质量美学海报生成（ICLR'26），在精确文字渲染、抽象艺术融合和布局风格和谐方面表现出色。 |
   422|   418|   414|| [[ai-game-devtools/prompt-enhancer]] — Tencent Hunyuan 开源的 CoT（ChainofThought）提示重写工具，将用户输入的简单提示词重构为更清晰、结构化的版本，以提升下游图像生成质量，同时严格保留原始创意意图。 |
   423|   419|   415|   411|| [[ai-game-devtools/qwen-vl]] — QwenVL 是阿里巴巴通义千问（Qwen）系列的多模态视觉语言大模型（LVLM）。支持图像 + 文本 + 边界框输入，输出文本和边界框。2023年8月由阿里巴巴云开源发布。 |
|| [[ai-game-devtools/qwen-7b]] — 阿里巴巴通义千问原始开源 LLM 系列（1.8B/7B/14B/72B），2023 年发布，中英双语+工具调用+Int4/Int8 量化，Tongyi Qianwen License，已停止维护 |
   424|   420|   416|   412|| [[ai-game-devtools/qwen1.5]] — Qwen (通义千问) is Alibaba DAMO Academy's opensource LLM series spanning Qwen1.5 → Qwen2 → Qwen2.5 → Qwen3. The QwenLM/Qwen1.5 GitHub repository serves as |
   425|   421|   417|| [[ai-game-devtools/qwen2]] — Alibaba Cloud（通义千问）第二代大语言模型系列。参数范围 0.5B–72B，支持 vLLM / SGLang / llama.cpp 等推理框架，Apache 2.0 开源。 |
   426|   422|   418|| [[ai-game-devtools/qwen2.5-coder]] — Alibaba 通义千问代码模型系列，由 Qwen2.5Coder（稠密模型）演进至 Qwen3Coder（Hybrid Attention + MoE）。Qwen3CoderNext 主打 Agentic Coding，支持 Qwen Code、CLINE、Claude Code、OpenClaw |
   427|   423|   419|| [[ai-game-devtools/qwen3]] — 阿里巴巴通义千问第三代大语言模型，由 Qwen 团队开发。Qwen3 首次引入 MoE 架构和多模态能力，支持 thinking/nonthinking 双模式灵活切换。 |
   428|   424|   420|| [[ai-game-devtools/repoagent]] — An LLMpowered opensource framework for repositorylevel Python code documentation generation. Built by OpenBMB(https://github.com/OpenBMB). |
   429|   425|   421|| [[ai-game-devtools/s1]] — s1 是由 SimpleScaling 团队发布的 LLM 推理增强方法，通过测试时扩展（testtime scaling） 和 budget forcing 技术，仅用 1,000 个样本微调即实现了与 OpenAI o1preview 相当的推理能力。核心论文 arXiv:2501.19393( |
   430|   426|   422|| [[ai-game-devtools/sanity-ai-engine]] — An AI engine for the Unity Game Editor(https://unity.com/) providing classical game AI algorithms through Unity components and scripts. The engine off |
   431|   427|   423|| [[ai-game-devtools/sapiens]] — Meta Reality Labs 的人体视觉基础模型套件，ECCV 2024 Best Paper Candidate。覆盖 2D pose、part segmentation、depth、normal 全套任务，原生 1024×1024 分辨率，在 3 亿张野外人体图像上预训练，泛化能力强。 |
   432|   428|   424|| [[ai-game-devtools/scikit-llm]] — ScikitLLM 将强大的语言模型（如 ChatGPT）无缝集成到 scikitlearn 生态中，为文本分析任务提供 LLM 驱动的分类、摘要、翻译、实体识别和向量化功能。通过遵循 sklearn 的 fit/predict/transform API 规范，可无缝嵌入现有的 sklearn P |
   433|   429|   425|| [[ai-game-devtools/search-gpt]] — A lightweight Node.js CLI tool that connects ChatGPT (GPT3.5turbo) to live Google Search results, enabling internetaware AI responses beyond the model |
   434|   430|   426|| [[ai-game-devtools/seed-oss]] — ByteDance Seed Team 的 36B 开源 LLM 系列（Base + Instruct），20250820 发布，Apache2.0 许可。 |
   435|   431|   427|| [[ai-game-devtools/seed-story]] — TencentARC 多模态长故事生成模型，从用户提供的起始图片/文本出发，生成角色和风格一致的多模态叙事序列。 |
   436|   432|   428|| [[ai-game-devtools/sharegpt4v]] — Improving Large Multimodal Models with Better Captions — ECCV 2024. |
   437|   433|   429|| [[ai-game-devtools/simpleollamaunity]] — C Unity 包，通过 HTTP 包装 Ollama(https://ollama.com/) REST API，为 Unity 游戏提供本地 LLM 推理能力。支持任何 Ollama 模型（qwen、llama、mistral 等），连接 localhost:11434。 |
   438|   434|   430|| [[ai-game-devtools/skythought]] — aigamedevtools/skythoughtSkyThought 是 openbmbNovaSky AI（UC Berkeley Sky Computing Lab）开源的推理模型训练与评测框架，核心贡献是 SkyT1 系列可训练的 O1preview 复现模型。 |
   439|   435|   431|| [[ai-game-devtools/skywork]] — Skywork is a series of large language models developed by the Kunlun Group · Skywork team, released in October 2023. The project opensources base, cha |
   440||| [[ai-game-devtools/solo]] — SOLO (A Single Transformer for Scalable VisionLanguage Modeling) is a unified VLM architecture published at TMLR (2024). Its key innovation: uses a si |
   441||| [[ai-game-devtools/speech-to-text-gpt3-unity]] — dr-iskandar 的 Whisper STT + ChatGPT + ElevenLabs TTS Unity 语音交互原型：Flask 中间件桥接 Unity 与云端 API，实现语音识别→LLM 对话→语音合成完整管线，极简 33 行代码，MIT |
   442||| [[ai-game-devtools/stable-cascade]] — Stable Cascade 是由 Stability AI 开发的开源级联图像生成模型。基于 aigamedevtools/wuerstchen 架构，其核心创新在于使用极小的潜在空间（压缩因子 42）进行扩散生成，相比 aigamedevtools/stablediffusionwebuiSta |
   443|   438|   434|| [[ai-game-devtools/stable-diffusion]] — Stable Diffusion is the foundational latent texttoimage diffusion model developed by CompVis (University of Heidelberg) in collaboration with Stabilit |
   444|   439|   435|| [[ai-game-devtools/stable-diffusion-webui]] — Stable Diffusion web UI (commonly known as AUTOMATIC1111 WebUI) is the most popular opensource web interface for running stablediffusion models locall |
   445||| [[ai-game-devtools/stable-diffusion-webui-chinese]] — VinsonLaro/stablediffusionwebuichinese(https://github.com/VinsonLaro/stablediffusionwebuichinese) 是 AUTOMATIC1111 Stable Diffusion WebUI(https://githu |
   446||   441|   437|| [[ai-game-devtools/stable-speech]] — HuggingFace 开源自然语言控制 TTS 模型（Parler-TTS Mini 880M/Large 2.3B），自然语言描述控制语音风格，34 预设说话人，SDPA/FlashAttention/torch.compile 优化，流式输出 <500ms，Apache 2.0 |
   447||   442|   438|| [[ai-game-devtools/storymaker]] — StoryMaker: Towards consistent characters in texttoimage generation |
   448|   442|   438|| [[ai-game-devtools/streamdiffusion]] — StreamDiffusion is a pipelinelevel solution for realtime interactive image generation built on top of the diffusers library. It wraps any StableDiffus |
   449|   444|   440|| [[ai-game-devtools/style-avatar3d]] — StyleAvatar3D: Leveraging ImageText Diffusion Models for HighFidelity 3D Avatar Generation |
| [[ai-game-devtools/style-tts-2]] — 哥伦比亚大学人类级 TTS 模型：风格扩散（无需参考语音）+ WavLM 对抗训练，LJSpeech 超越人类录音，LibriTTS 零样本适配 SOTA，MIT |
| [[ai-game-devtools/whisperspeech]] — Collabora 开源 Whisper 逆向 TTS 系统：Whisper 语义提取 + EnCodec 声学 token + Vocos 声码器两阶段管线，支持语音克隆/多语言/12× 实时推理，MIT/Apache-2.0 全链路开源可商用
| [[ai-game-devtools/sygil-webui]]
   452|   445|   441|| [[ai-game-devtools/syncdreamer]] — SyncDreamer: Generating Multiviewconsistent Images from a Singleview Image |
   453|   446|   442|| [[ai-game-devtools/tinychatengine]] — Ondevice LLM/VLM inference engine from MIT Han Lab. Runs 4bit quantized LLaMA3/CodeLLaMA/Mistral and VILA/LLaVA on laptops (RTX 4070), Apple M1/M2, an |
   454|   447|   443|| [[ai-game-devtools/toolbench]] — ToolBench（ToolLLM）是 OpenBMB 开源的大规模指令微调 SFT 数据集项目，旨在赋予开源 LLM 通用工具使用能力，让模型掌握数千种真实世界 REST API。核心贡献是通过 DFSDT（深度优先搜索决策树）方法自动构建高质量工具调用训练数据。 |
   455|   448|   444|| [[ai-game-devtools/ultraedit]] — UltraEdit is a largescale (~4M editing samples) instructionbased image editing dataset and training framework from Peking University, BIGAI, UCLA, and |
   456|   449|   445|| [[ai-game-devtools/ultrapixel]] — UltraPixel 是一个超高分辨率图像生成模型，NeurIPS 2024 发表论文。基于 aigamedevtools/stablecascade 和 TransinR 构建，能够生成细节丰富、质量极高的超高分辨率图像。支持文本到图像、个性化 LoRA 和 ControlNet 工作流。 |
   459|   457|   450|   446|| [[ai-game-devtools/unity-openai-api-integration]] — Integrates OpenAI GPT3 / ChatGPT API into a Unity project for natural language processing capabilities in games. |
   460|| [[ai-game-devtools/unityneurospeech]] — HardCodeDev 开源 Unity 全离线语音交互 AI NPC 框架：whisper.unity 本地 STT + Ollama 本地 LLM + Coqui XTTS 自定义语音克隆，情绪/动作标签自动解析，UniTask 异步，Windows Mono/IL2CPP 双后端，MIT |
   461|| [[ai-game-devtools/uso]] — USO (Unified Style driven and subjectdriven GeneratiOn) 是字节跳动智能创作实验室 UXO 团队开发的统一图像生成框架，将风格驱动和主体驱动生成统一到单个模型中。基于 ai-game-devtools/flux 架构构建，2025 年 8 月开源，A |
| [[ai-game-devtools/uniaudio2]] — 清华/港中文统一音频基础模型：ReasoningCodec 双分支音频 tokenization + LLaMA 3.2 自回归架构，100B 文本 + 60B 音频 token 训练，覆盖 TTS/ASR/音乐/音效 25+ 任务，MIT |
| [[ai-game-devtools/video-agent]] — VideoAgent answers freeform questions about input videos using a twophase architecture: memory construction (extract and store structured information) |
   460|   453|   449|| [[ai-game-devtools/video-ccam]] — 腾讯多媒体研究团队开发的视频语言多模态大模型（VideoMLLM）系列，核心创新为 Causal CrossAttention Masks（因果交叉注意力掩码），用于提升短视频和长视频的理解能力。 |
   461|   454|   450|| [[ai-game-devtools/video-llama-3]] — DAMONLPSG 开发的前沿多模态基础模型，专注于图像和视频理解。ArXiv: 2501.13106，Apache 2.0 许可。 |
   462|   455|   451|| [[ai-game-devtools/video-llava]] — VideoLLaVA: Learning United Visual Representation by Alignment Before Projection |
   463|   456|   452|| [[ai-game-devtools/video-mamba]] — URL: https://github.com/OpenGVLab/VideoMamba HF: https://huggingface.co/OpenGVLab/VideoMamba Paper: arXiv:2403.06977 License: Apache 2.0 Authors: Kunc |
   464|   457|   453|| [[ai-game-devtools/video-mme]] — VideoMME (Multimodal Evaluation) is the firstever comprehensive evaluation benchmark for Multimodal Large Language Models (MLLMs) in video analysis. A |
   465|   458|   454|| [[ai-game-devtools/videollama2]] — VideoLLaMA 2 是 VideoLLaMA 系列的第二代，2024 年 6 月发布。基于 LLaVA 1.5 + FastChat 代码库构建，在多个视频LLM 基准上达到 SOTA（MLVU Top1、VideoMME Top1 ~7B 类模型）。 |
   466|   459|   455|| [[ai-game-devtools/vila]] — NVlabs 出品的开源 VLM 家族，专注于视频理解与多图理解的效率与精度优化。历经 VILA1.0 → VILA1.5 → NVILA(VILA2.0) → LongVILA 多代迭代，2025年1月并入 NVIDIA Cosmos Nemotron 系列。 |
   467|   460|   456|| [[ai-game-devtools/vitron]] — Vitron 是 Skywork AI 与新加坡国立大学（NUS）、南洋理工大学（NTU）联合开发的统一像素级视觉 LLM，发表在 NeurIPS 2024。一个模型同时覆盖图像和视频的理解、生成、分割、编辑四大任务。 |
   468|   461|   457||| [[ai-game-devtools/wavjourney]] — 萨里大学 LLM 驱动的组合式音频创作：GPT-4 文本→JSON 剧本→Python 代码→多轨混音（语音Bark+音乐MusicGen+音效AudioGen），内置声纹克隆/预设，VRAM>16GB |
   469|   462|   458|| [[ai-game-devtools/web3-gpt]] — AIpowered smart contract development platform. Chat with agents that can write, deploy, and verify Solidity contracts on EVMcompatible chains. |
   473|   469|   462|   458|| [[ai-game-devtools/yi]] — 所有 base model 有 200K 上下文变体。 |
   474|   470|   463|   459|| [[ai-game-devtools/zero-1-to-3]] — Columbia University Computer Vision Lab · ICCV 2023 · MIT License |
   475|   471|   464|   460|||| [[ai-game-devtools/stabletts]] — 首个 Flow-Matching + DiT 开源 TTS（31M 参数）：中日英三语合成、零样本声音克隆、CFG 支持、MAS 对齐、Gradio WebUI，MIT
   485|   476|   472|   465|   461|| [[ai-game-devtools/ludo-ai]] — Ludo.ai 统一 AI 游戏开发生态系统：概念生成/精灵图+3D+音频+视频资产生成/可玩原型构建/市场趋势分析，MCP 集成 Claude/Cursor，Unity/Ubisoft/Voodoo 等工作室采用
   486|   477|   473|| [[ai-game-devtools/unityaiwithchatgpt]] — 基于 Unity 的 ChatGPT + UnityChan 语音交互演示：OpenAI API 对话 + RTVoice TTS + LipSync 唇形同步，完整虚拟角色交互方案
   487|   478|   474|## Avatar
   476|   467|   463||| [[ai-game-devtools/animate-anyone]] — Alibaba 智能计算研究院扩散模型角色动画框架：ReferenceNet + Pose Guider + 时空注意力UNet，单图+姿态序列→一致性动画视频，DeepGPU加速 ~40%，支持虚拟试衣/说话头像集成
   477|   468|   464|||| [[ai-game-devtools/aniportrait]] — Tencent Games Zhiji 音频驱动肖像动画：wav2vec2 → audio2mesh/audio2pose → 3DMM参数 + AnimateDiff Motion Module 3D UNet，支持自驱动/人脸重演/音频驱动三模式，Apache 2.0 |
   478|   469|   465||| [[ai-game-devtools/calm]] — NVIDIA Research Isaac Gym 虚拟角色控制：CALM对抗式潜在模型 + HRL两级架构（HLC任务决策/LLC运动执行），AMP动作先预训练 + 风格约束精确训练 + 无额外推理，剑盾风格人形角色，NVIDIA License |
   479|   470|   466||| [[ai-game-devtools/ditto-talkinghead]] — Ant Group ACM MM 2025 实时说话头部合成：motion-space 扩散(LMDM) + HuBERT 音频编码 + LivePortrait 面部操控，TensorRT/PyTorch 双后端，实时流式推理，Apache 2.0 |
   480|   471|   467|||| [[ai-game-devtools/chatdollkit]] — uezo Unity 3D 虚拟助手 SDK：LLM(ChatGPT/Claude/Gemini/Dify) + STT/TTS 完整语音管线，VRM 表情/动画/口型同步驱动，支持 WebGL/iOS/VR/AR，Silero VAD + Barge-in 打断 + 多 AITuber 对话，MIT |
   481|   472|   468|||| [[ai-game-devtools/dreamtalk]] — 清华大学&蚂蚁 arXiv 2023 扩散模型音频驱动说话头像生成：Wav2Vec2音频编码 + 3DMM风格扩散(DDPM/DDIM) + PIRender面部渲染，多风格控制(CFG)，支持歌曲/多语言/嘈杂音频，非商用许可 |
   482|   473|   469||| [[ai-game-devtools/duix]] — duix.com 移动端实时 AI Avatar SDK：Android/iOS 原生部署 + NCNN/ONNX 离线推理 + PCM流式音频驱动 + 口型同步/动作控制，<120ms延迟，Community License |
   483|   474|   470|||| [[ai-game-devtools/echomimic]] — Ant Group AAAI 2025 音频驱动肖像动画：SD v1.5 扩散 + Whisper-Tiny 音频编码 + 轻量地标 CNN，支持纯音频/纯地标/混合三种驱动，HDTF FID 29.13/FVD 493，超越 SadTalker/AniPortrait/Hallo，学术研究许可 |
   484|   475|   471||||| [[ai-game-devtools/emoportraits]] — Nikita Drobyshev arXiv 2024 情绪增强单镜头头像生成：两阶段 volumetric 3D 表示(基础avatar+情绪增强)，VoxCeleb2 HQ+FEED 数据集训练，视频驱动运动迁移+极端/非对称表情保留 |
   485|   476|   472|||| [[ai-game-devtools/emovoca]] — WACV 2025 语音驱动情感 3D 说话头像：Spiral Autoencoder 双编码(说话+情感)共享解码器 + FLAME 3D 人脸模型 + Wav2Vec2 音频特征，11 种情绪/3 级强度可控，CC BY-NC 4.0 |
   486|   477|   473|||| [[ai-game-devtools/e3-gen]] — ACM MM '24 3D 人体 Avatar 生成：SMPL-X + FLAME 模型集成 + 自定义 Deformer，2×RTX 3090 训练，支持生成/迁移/编辑/新姿态动画，学术研究许可 |
   487|   478|   474|||| [[ai-game-devtools/exavatar]] — ECCV 2024 全身可驱动 3D 高斯 Avatar：SMPL-X+FLAME 参数化驱动 + 修改版 3DGS 外观建模，手机视频→可动画 Avatar，支持自定义/NeuMan/XHumans 数据集 |
   488|   479|   475|||| [[ai-game-devtools/facefusion]] — 行业领先的人脸操作平台：人脸检测/交换/增强/唇同步/表情恢复等多处理器组合，Gradio Web UI + headless/batch 模式 + 作业管理系统，OpenRAIL-AS 许可 |
   489|   480|   476|||| [[ai-game-devtools/geneavatar]] — CVPR 2024 单图像 3D 头部 Avatar 编辑框架：3DMM 驱动三平面修改场 + 体渲染几何变形/纹理混合 + 自动解码优化实现 2D→3D 编辑提升，支持 INSTA/NeRFBlendShape/Next3D 多种表示，代码待发布
   490|   481|   477|||| [[ai-game-devtools/geneface-plus-plus]] — 中科院/浙大 通用稳定实时音频驱动 3D 说话头像生成：三阶段管线(Audio2Motion VAE → PostNet CNN+LLE → RADNeRF 渲染)，3DMM(BFM2009)参数化表示，支持眨眼注入/口型幅度控制，PyTorch+CUDA 11.7，预训练权重可下载 |
|||| [[ai-game-devtools/geneface]] — 浙江大学&字节跳动 ICLR 2023 音频驱动 3D 说话面部合成：3D地标VAE+NeRF渲染管线，RAD-NeRF实时推理/10h训练，跨说话人/语种高泛化，MIT
|||| [[ai-game-devtools/panic3d-anime-reconstruction]] — CVPR 2023 动漫角色单视图风格化 3D 重建：线填充模型跨越插图到 3D 域差距 + 体辐射场表示复杂几何，11.2k Vroid 3D 模型训练，支持 talking head 演示
|||| [[ai-game-devtools/hallo]] — 复旦大学音频驱动肖像动画：SD 1.5+AnimateDiff Motion Module 基础+Wav2Vec 音频编码+InsightFace 人脸分析，层级式跨模态注意力融合，两阶段训练，ComfyUI 集成
   493|   484|   480||||| [[ai-game-devtools/hallo2]] — 复旦大学 ICLR 2025 长时长高分辨率音频驱动肖像动画：两阶段管线(扩散动画+CodeFormer超分)，支持4K/最长1小时输出，基于SD 1.5+AnimateDiff v2+Wav2Vec+InsightFace
   494|   485|   481|||||| [[ai-game-devtools/hunyuan-portrait]] — 腾讯混元 CVPR 2025 视频驱动肖像动画：SVD UNet3D 主干+DINOv2 身份编码+ArcFace 特征+HeadExpression/HeadPose 运动解耦，IntensityAwareMotionRefiner 精炼，软掩码贴回原分辨率，单3090可运行
   495|   486|   482||||||| [[ai-game-devtools/hunyuanvideo-avatar]] — 腾讯混元 MM-DiT 架构音频驱动多人角色动画：角色图像注入模块+情感控制(AEM)+面部感知音频适配器(FAA)独立注入，支持写实/卡通/3D/拟人多风格，10GB-96GB VRAM 弹性配置
   496|   487|   483|||||||| [[ai-game-devtools/skyreels-a1]] — Skywork AI 视频扩散 Transformer 肖像动画框架（DiT 架构）：表情感知地标条件化 + 身份一致性 + 任意长度输出，支持视频/音频驱动
   497|   488|   484||||| [[ai-game-devtools/id-animator]] — 零样本身份保留人体视频生成：单张面部照片→个性化视频，Face Adapter 注入身份嵌入到 AnimateDiff UNet3D，支持身份混合/ControlNet 兼容，无需微调
   498|   489|   485|||||| [[ai-game-devtools/intrinsic-avatar]] — CVPR 2024 单目视频动态人体逆渲染：显式光线追踪+物理 PBR 材质分解(albedo/roughness/metallic/normal)，SMPL 参数化驱动+LBS 变形+NeRFAcc 重要性采样，支持新视角合成+HDRI 重打光
   499|   490|   486||||| [[ai-game-devtools/liveportrait]] — 快手高效视频驱动肖像动画：Stitching+Retargeting 控制、图像/视频双模输入、Animals mode（猫/狗）、Motion Template 隐私保护、跨平台支持、Apache 2.0
   500|   491|   487|||||| [[ai-game-devtools/motiongpt]] — OpenMotionLab NeurIPS 2023 统一运动-语言模型：VQ-VAE将3D运动离散化为token+T5/GPT-2联合训练，支持文本到运动/运动字幕/运动预测/运动补间四任务，MIT

| [[ai-game-devtools/tortoise-tts]] — 高质量多音色文本转语音库：GPT2自回归+扩散两阶段生成，CLVP输出选择，支持流式TTS <500ms延迟，DeepSpeed/KV cache/FP16优化，Apache 2.0
| [[ai-game-devtools/tts-generation-webui]] — rsxdalv 全合一 TTS Web 界面：20+ TTS 模型统一接入(Bark/Tortoise/Kokoro/CosyVoice 等)+音乐生成(MusicGen)+音频工具(RVC/Whisper/Demucs)，Gradio+React 双前端，OpenAI 兼容 API，Docker 部署，MIT
   501|| [[ai-game-devtools/vibevoice]] — 微软开源前沿语音 AI 框架：TTS+ASR 双模型系列，7.5Hz 超低帧率连续语音 tokenizer+LLM+Diffusion 架构，ASR-7B 支持 50+语言/60min 单遍处理，TTS-1.5B 90min 长文本生成/4说话人轮转，Realtime-0.5B 流式 300ms 首音延迟，MIT
|| [[ai-game-devtools/voicebox]] — Meta FAIR 文本引导通用语音生成模型：50K+小时训练的非自回归流匹配 TTS，零样本跨语言合成/噪声消除/风格转换，比 VALL-E 快 20 倍，Speechify PyTorch 实现，MIT
||| [[ai-game-devtools/voicecraft]] — UT Austin/Meta 零样本语音合成+语音编辑模型：Token infilling 神经编解码 LM，giga330M/830M 双规格，仅需几秒参考音频克隆声音，支持智能转录/长文本分段处理/语音编辑，HuggingFace Spaces/Colab/Docker/CLI 多部署，CC BY-NC-SA 4.0 代码+Coqui PML 权重
|||| [[ai-game-devtools/x-e-speech]] — 跨语言情感语音生成框架：Whisper 编码器 + VITS 联合训练 TTS+VC，冻结说话人层/微调内容层消除口音，支持中日英三语情感合成与语音转换，MIT
||||| [[ai-game-devtools/xtts]] — Coqui.ai 开源先进 TTS 生成库：支持 1100+ 语言/16 语零样本语音克隆/<200ms 流式延迟，集成 XTTS/VITS/Bark/Tortoise 等 10+ 架构，PyTorch 训练+推理+微调全链路，MPL 2.0
|||||| [[ai-game-devtools/yourtts]] — 零样本多说话人多语言 TTS/VC 模型：VITS 架构 + Speaker Encoder 实现零样本克隆，ICML 2022 论文，<1 分钟微调即可 SOTA，支持 Coqui TTS 集成，CC BY-NC-ND 4.0
|||||||| [[ai-game-devtools/zmm-tts]] — NII Yamagishi Lab 零样本多语言多说话人 TTS：XLSR-53+XPhoneBERT 自监督离散表示 + 三阶段级联 (txt2vec→vec2mel→vec2wav+HifiGAN)，6 语言 (EN/FR/DE/PT/ES/SV) 零样本说话人克隆，BSD-3-Clause
|||||||| [[ai-game-devtools/index-tts2]] — Bilibili IndexTTS 团队工业级自回归零样本 TTS：精确时长控制+情感音色解耦+Qwen3 软指令情感生成，arXiv 2506.21619，HuggingFace/ModelScope 权重
