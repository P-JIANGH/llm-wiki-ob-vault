# Wiki Index

> Content catalog. Every wiki page listed under its type with one-line summary.
> Read this first to find relevant pages for any query.
> Last updated: 2026-04-12 | Total wiki-layer pages: 205 | Note: Open Source Games section is partial (65/153 games indexed; all 153 games exist in open-source-game/ directory)

## AI / LLM / Agent

| [[llm-integration]] — 9 个 LLM Provider 统一接入（OpenAI/Claude/Gemini/DeepSeek 等） |
| [[mempalace]] — AI 长期记忆系统，ChromaDB verbatim 存储 + 4 层记忆栈，LongMemEval 96.6%（无需 API） |
| [[voxcpm-local-deployment]] — VoxCPM 2 本地部署配置：Python/CUDA/GPU 显存要求及快速运行示例 |
| [[multi-agent-ai-simulation]] — 多智能体 AI 通用概念：记忆/任务/感知/决策 |
| [[multi-agent-ai-game-impl]] — Microverse 实现：感知→决策→记忆→任务→对话完整链路 |
| [[persistent-memory-system]] — AI 角色长期记忆持久化（ChatHistory + 时间戳） |
| [[stanford-generative-agents]] — Stanford Generative Agents（AI Town）Memory/Reflection/Planning |
| [[agentgpt]] — reworkd 开源浏览器端自主 AI Agent 平台：Next.js / Docker 部署，1.5k+ commits，12 releases，支持中/英/匈牙利语 |
| [[aios]] — agiresearch AI Agent 操作系统：LLM 内核抽象层（调度/记忆/存储/工具），COLM 2025 论文，支持 OpenAGI/AutoGen/MetaGPT，Remote Kernel 模式支持边缘设备 |
| [[autoresearch]] — Karpathy 自主 LLM 研究框架：agent 修改 train.py → 5分钟实验 → val_bpb 评估 → keep/discard 循环，MIT，70.3k stars |
| [[openmaic]] — THU-MAIC 开源多智能体互动教室平台：两阶段课程生成（Outline→Scene）、LangGraph Director Graph 编排、AI Provider 抽象层（1300+行支持 9+ 提供商）、PBL Agentic Loop + MCP Tools、PPTX/HTML 导出、MinerU PDF 解析，v0.1.0，AGPL-3.0 |
| [[coze-studio]] — Coze/字节跳动一站式 AI Agent 开发平台：可视化 Agent/Workflow 构建，微服务+DDD，Eino 运行时，FlowGram 编辑器，Apache-2.0，20.3k stars |
| [[claude-code-game-studio-architecture]] — 49 Agent 层级结构、Model Tier 分配（Haiku/Sonnet/Opus）、五大协调规则、Subagents vs Agent Teams |
|| [[claude-code-game-studio-collaboration-protocol]] — Question → Options → Decision → Draft → Approval 工作流、文件写入协议、决策 UI 模式 |
|| [[hermes-agent]] — 生产级 AI Agent 框架：工具注册中心 / 持久 Async Loop / 并行执行 / Context Compression / 13+ 消息平台网关 |

## Concepts

|| [[registry-pattern-tool-discovery]] — 中心注册表模式：ToolRegistry 单例集中注册 + check_fn 环境检查，hermes-agent 核心架构 |
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
| [[claude-code-game-studios]] — Claude Code Game Studios：49 Agent / 72 Skill 游戏开发工作流，MIT 开源 |
| [[voxcpm]] — OpenBMB 开源语音合成系统，Tokenizer-Free 架构支持 30 语言 + 9 种中文方言 |

## Game Dev

| [[godot-4]] — Godot 4 引擎：GDScript、Jolt Physics、XR、版本历史 |
| [[gdscript-patterns]] — GDScript 10 种设计模式（单例/Signal/Lambda/寻路/物理检测） |
| [[godot-animation-system]] — AnimatedSprite2D 帧动画 + CharacterController 状态机 |
| [[microverse-character-system]] — 8 角色人格/职位/说话风格（CharacterPersonality） |
| [[microverse-dialog-system]] — DialogService/ConversationManager/BackgroundStoryManager |
| [[microverse-save-system]] — GameSaveManager JSON 存档（角色位置/任务/AI状态） |

## Open Source Games

- [[open-source-game/ancient-beast]] — 回合制策略，7派系单位收集+1v1/2v2对战，Phaser CE 引擎，TypeScript+Webpack，AGPL-3.0+CC-BY-SA-4.0 双许可
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
|| [[ai-scientist]] — SakanaAI 全自动科学研究系统：LLM 自主生成ideas→写代码→跑实验→生成 LaTeX 论文→同行评审，支持 Claude/GPT-4o/DeepSeek，附 Docker 安全容器 |
| [[langchain]] — LLM应用开发框架，Chain/Agent/Memory/Tool/Prompt抽象，LangGraph基础 |
|| [[sandbox]] — 隔离执行环境模式：虚拟路径+容器/进程级隔离，DeerFlow/nanobot核心基础设施 |

## Comparisons

| [[godot-vs-unity-unreal]] — Godot vs Unity vs Unreal：许可/2D/3D/选型指南 |
| [[open-source-game-engines-comparison]] — 开源游戏引擎对比：Godot/Bevy/CUBE/Spring/OpenMW，含公司项目推荐 |
