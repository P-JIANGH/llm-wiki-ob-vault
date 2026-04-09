# Wiki Index

> Content catalog. Every wiki page listed under its type with one-line summary.
> Read this first to find relevant pages for any query.
| Last updated: 2026-04-09 | Total pages: 64

## AI / LLM / Agent

| [[llm-integration]] — 9 个 LLM Provider 统一接入（OpenAI/Claude/Gemini/DeepSeek 等） |
| [[mempalace]] — AI 长期记忆系统，ChromaDB verbatim 存储 + 4 层记忆栈，LongMemEval 96.6%（无需 API） |
| [[VoxCPM local deployment]] — VoxCPM 2 本地部署配置：Python/CUDA/GPU 显存要求及快速运行示例 |
| [[multi-agent-ai-simulation]] — 多智能体 AI 通用概念：记忆/任务/感知/决策 |
| [[multi-agent-ai-game-impl]] — Microverse 实现：感知→决策→记忆→任务→对话完整链路 |
| [[persistent-memory-system]] — AI 角色长期记忆持久化（ChatHistory + 时间戳） |
| [[stanford-generative-agents]] — Stanford Generative Agents（AI Town）Memory/Reflection/Planning |
| [[claude-code-game-studio-architecture]] — 49 Agent 层级结构、Model Tier 分配（Haiku/Sonnet/Opus）、五大协调规则、Subagents vs Agent Teams |
| [[claude-code-game-studio-collaboration-protocol]] — Question → Options → Decision → Draft → Approval 工作流、文件写入协议、决策 UI 模式 |

## Game Projects & Studios

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

- [[open-source-game/mindustry]] — 自动化塔防 RTS，Arc Engine + 代码生成 ECS + 帧同步多人
- [[open-source-game/openage]] — Age of Empires 引擎复刻，C++20+Python3 双语言架构，Cython 绑定，nyan 配置格式，GPLv3

| [[open-source-game/commander-keen-in-keen-dreams]] — Commander Keen Episode 4 源码
| [[open-source-game/doom]] — id Software 经典 FPS，1997年 Carmack 开源，BSP 树渲染，GPLv2，约 54K LOC C |
| [[open-source-game/doom-3-bfg]] — id Tech 4 引擎源码，含 Portal 渲染、Lua 脚本、BFG Edition 收录 Doom Classic，GPL |
| [[open-source-game/doom-64-re]] — Doom 64 完全逆向工程，C+MIPS 汇编，N64 SDK 交叉编译，~50K LOC C |
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
| [[open-source-game/nakedavp]] — Aliens vs Predator Classic (2000) SDL3 现代化端口，双渲染器自动降级（OpenGL/GLES2） |
| [[open-source-game/omnispeak]] — Commander Keen 4/5/6 开源重实现，多后端渲染架构（SDL2/GL/Vulkan/SDL3），Nuked OPL3 FM 合成器，约 51.8K LOC C |
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
| [[open-source-game/openrct2]] — RollerCoaster Tycoon 2 开源重实现，C++20/CMake/Duktape JS插件引擎，TCP/IP多人合作 |
| [[open-source-game/openra]] — C# RTS 引擎，复刻 Westwood 经典（C&C/红警/沙丘2000），.NET 8 + SDL2 + OpenGL，Order 驱动网络同步，16.6k stars，GPL-3.0 |
| [[open-source-game/openloco]] — Chris Sawyer's Locomotion 清洁室逆向重实现，C++/SDL3，运输帝国经营模拟 |
| [[open-source-game/corsixth]] — Theme Hospital 开源克隆，C++/Lua 混合架构，SDL 渲染，数据驱动游戏逻辑 |
| [[open-source-game/julius]] — Caesar III 清洁室重实现，SDL2 跨平台，100% 存档兼容，约93K LOC C |
| [[open-source-game/akhenaten]] — Pharaoh 法老城市建造游戏开源重实现，Julius/Augustus 分支，SDL2 跨平台，GNU AGPL |
| [[open-source-game/citybound]] — 微观模型城市建造，Rust Actor模型(kay)，协作规划理念，浏览器WebGL UI |
| [[open-source-game/unknown-horizons]] — 2D 实时策略城市建造模拟，FIFE→Godot 4 移植项目，GDScript |
| [[open-source-game/egregoria]] — Cities: Skylines 风格 Rust 城市建造，确定性锁步网络，PBR wgpu 渲染器 |
| [[open-source-game/pioneer]] — 31世纪银河太空冒险RPG，程序化星系/经济/派系系统，开放世界探索+贸易+战斗 |
| [[open-source-game/zelda3]] — Zelda A Link to the Past 完全重实现，70-80kLOC C，SNES 仿真层+逐帧 RAM 验证 |
| [[open-source-game/the-legend-of-zelda-twilight-princess]] — Zelda TP 反向工程，字节级匹配反编译，多版本条件编译架构 |
| [[open-source-game/dead-ascend]] — Qt/QML 手绘点击冒险游戏，僵尸塔楼密室解谜，Tiled TMX 地图格式，跨平台 |
| [[open-source-game/torcs]] — 开源 3D 赛车模拟器，plib OpenGL 渲染，模块化物理仿真(simu)，标准化 Robot AI 接口，广泛用于学术研究 |
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
| [[open-source-games-list]] — GitHub 开源游戏精选列表：18+ 品类（FPS/RPG/RTS/Roguelike/城市建造等），含源码链接 |

- [[open-source-game/trigger-rally]] — 纯 C++ 拉力赛车游戏，PEngine/PSim/Trigger 三层架构，程序化地形高度图生成，GPL v2
- [[open-source-game/vdrift]] — 开源漂移赛车模拟器，Bullet 物理 + SDL3
- [[open-source-game/wipeout-rewrite]] — wipEout (1995 PSX) 清洁室重实现，纯 C 双平台后端(SDL2/Sokol) + 三渲染器架构
- [[open-source-game/kandria]] — Common Lisp 动作 RPG，TRIAL 引擎 + alloy OpenGL 渲染，~19K LOC 全 Lisp，BVH2 碰撞检测，内置关卡编辑器
- [[open-source-game/warzone-2100]] — 开源 3D RTS，含剧情战役+10人多人，157K LOC C++，多渲染后端(OpenGL/Vulkan/GLES)，400+科技树
- [[open-source-game/widelands]] — Settlers II 风格开源 RTS，~301K LOC C++，CMake/SDL2+OpenGL，Lua 脚本驱动，Flag-Route 经济链，帧同步多人

## Comparisons

| [[godot-vs-unity-unreal]] — Godot vs Unity vs Unreal：许可/2D/3D/选型指南 |
| [[open-source-game-engines-comparison]] — 开源游戏引擎对比：Godot/Bevy/CUBE/Spring/OpenMW，含公司项目推荐 |
