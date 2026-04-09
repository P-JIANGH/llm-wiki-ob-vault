# Wiki Log

> Chronological record of all wiki actions. Append-only.
> Format: `## [YYYY-MM-DD] action | subject`
> Actions: ingest, update, query, lint, create, archive, delete
> When this file exceeds 500 entries, rotate: rename to log-YYYY.md, start fresh.

## [2026-04-09] ingest | OpenRA wiki note
- Created: open-source-game/openra.md (C# RTS 引擎复刻 Westwood 经典，.NET 8 + SDL2 + OpenGL，Order 驱动网络同步，OpenRA.Game/Mods/Server 模块化架构，16.6k stars，GPL-3.0)
- Updated: index.md (新增 openra 条目，total pages: 62), open-source-games-learning-checklist.md (行155 OpenRA checkbox, 学习记录74), log.md
- Note: GitHub API 可达但 git clone/tarball download 均超时；通过 GitHub API tree + raw content 端点获取源码结构完成分析

## [2026-04-09] ingest | wipEout Rewrite wiki note
- Created: open-source-game/wipeout-rewrite.md (wipEout 1995 PSX 清洁室重实现，纯 C 双平台后端 SDL2/Sokol + 三渲染器架构 GL/GLES2/Software，~4000 LOC)
- Updated: index.md (新增 wipeout-rewrite 条目，total pages: 61), open-source-games-learning-checklist.md (行147 wipEout checkbox, 学习记录72), log.md
- Skip: Trigger Rally (sourceforge git 不可访问)

## [2026-04-09] ingest | Kandria wiki note
- Created: open-source-game/kandria.md (Common Lisp 动作 RPG，TRIAL 引擎 + alloy OpenGL，~19K LOC 全 Lisp，BVH2 碰撞，内置编辑器)
- Updated: index.md (新增 kandria 条目，total pages: 62), open-source-games-learning-checklist.md (行205 Kandria checkbox, 学习记录73), log.md

## [2026-04-10] ingest | OpenBW wiki note
- Created: open-source-game/openbw.md (StarCraft: Brood War 核心引擎清洁室重实现，header-only C++ ~28K LOC，bwgame.h 22K行单文件含完整引擎，确定性锁步网络 sync.h，mini-openbwapi BWAPI 兼容层)
- Updated: index.md (新增 openbw 条目), open-source-games-learning-checklist.md (行168 OpenBW checkbox, 学习记录90), log.md

## [2026-04-10] ingest | 0 A.D. Empires Ascendant wiki note
- Created: open-source-game/0-ad.md (历史古代战争 RTS，Pyrogenesis 自研 3D 引擎，C++/JavaScript 混合架构，Simulation/Graphics 分离，~15GB 仓库，29K+ commits)
- Updated: index.md (新增 0-ad 条目), open-source-games-learning-checklist.md (行153 0 A.D. checkbox, 学习记录84), log.md
- Note: Gitea 仓库被 Anubis 反爬虫保护封禁，GitHub mirror 已废弃；通过 Web 搜索 + GitHub API tree 端点 + mycplus 技术分析完成分析；Pyrogenesis 源码结构：simulation2/ (模拟) + renderer/graphics/ (渲染) + scriptinterface/ (JS 绑定) + ps/ (主应用)

## [2026-04-10] ingest | Shattered Pixel Dungeon wiki note
- Created: open-source-game/shattered-pixel-dungeon.md (传统 Roguelike 地牢爬行器，libGDX 跨平台架构（Desktop/Android/iOS），Java/JDK 21，程序化关卡生成，5 大区域+天赋系统，6k stars，GPLv3)
- Updated: index.md (新增 shattered-pixel-dungeon 条目，total pages: 75), open-source-games-learning-checklist.md (行192 ShatteredPD checkbox, 学习记录105), log.md
- Note: GitHub git clone 超时；通过 GitHub API tarball download (51MB JAR) 获取可运行游戏包；JAR 分析：libGDX/LWJGL 渲染，2663 类，主包 com.shatteredpixel.shatteredpixeldungeon，多平台 native libs (Win/Mac/Linux)；API tree 获取源码结构：core/(1743项) + desktop/ + android/ + ios/ + services/

## [2026-04-10] ingest | BrogueCE wiki note
- Created: open-source-game/brogue-ce.md (极简主义 Roguelike，Pure C 代码库，22个.c模块+Dijkstra寻路+确定性游戏回放系统，SDL2/curses 双渲染后端，1.3k stars)
- Updated: index.md (新增 brogue-ce 条目，total pages: 74), open-source-games-learning-checklist.md (行191 BrogueCE checkbox, 学习记录104), log.md
- Note: GitHub git clone 和 tarball download 均超时；通过 GitHub web API (repo tree + raw content 端点) 获取源码结构完成分析；src/brogue/ 核心模块：RogueMain.c(入口) + Architect.c(地牢生成) + Dijkstra.c(寻路) + Recordings.c(回放) + Monsters.c(AI) + Items.c(物品)

## [2026-04-10] ingest | OpenNefia wiki note
- Created: open-source-game/opennefia.md (Elona 模组化引擎复刻，.NET 8.0 + Love2dCS 渲染，Core/Content/EntryPoint 三层架构，Harmony 运行时补丁 + NuGet Mod 加载，2058 C# + 436 Lua 文件)
- Updated: index.md (新增 opennefia 条目), open-source-games-learning-checklist.md (行193 OpenNefia checkbox, 学习记录106), log.md
- Note: GitHub git clone 超时(GnuTLS); 通过 GitHub API tarball download (master.tar.gz 21MB) 获取源码完成分析；OpenNefia.Core/Content 双模块架构 + IoC 依赖注入 + YAML 原型系统 + NLua 脚本 + NuGet 包管理 Mod 加载

## [2026-04-09] ingest | RVGL 开源赛车游戏 wiki note
- Created: open-source-game/rvgl.md (Re-Volt 现代跨平台复刻，SDL2+OpenGL/Vulkan，核心引擎私有+工具链/资产开源，Pack 内容管理系统，支持 16 人多人)
- Updated: index.md (新增 rvgl 条目，total pages: 60), open-source-games-learning-checklist.md (行143 RVGL checkbox, 学习记录70), log.md

## [2026-04-10] ingest | Standard Of Iron 布匿战争 RTS wiki note
- Created: open-source-game/standard-of-iron.md (C++20/Qt6/OpenGL 3.3 布匿战争历史 RTS，ECS 架构，骨骼动画+布料物理，MIT)
- Updated: index.md (新增 standard-of-iron 条目), open-source-games-learning-checklist.md (行165 Standard Of Iron checkbox, 学习记录89), log.md

## [2026-04-09] ingest | Stunt Rally 3 开源赛车游戏 wiki note
- Created: open-source-game/stunt-rally-3.md (3D 科幻赛车，Ogre-Next 3.0 渲染+VDrift 仿真，232 赛道+33 载具，GPLv3)
- Updated: index.md (新增 stunt-rally-3 条目，total pages: 59), open-source-games-learning-checklist.md (行142 Stunt Rally checkbox, 学习记录69), log.md

## [2026-04-09] ingest | TORCS 开源赛车模拟器 wiki note
- Created: open-source-game/torcs.md (3D 赛车模拟器，plib OpenGL 渲染，simu 模块化物理仿真，标准化 Robot AI 接口，广泛用于学术研究)
- Updated: index.md (新增 torcs 条目，total pages: 59), open-source-games-learning-checklist.md (行139 TORCS checkbox, 学习记录67), log.md

## [2026-04-09] ingest | Fish Folk Punchy wiki note
- Created: open-source-game/fish-folk-punchy.md (Bevy 0.9 + Rapier2D 物理 2.5D 清版动作游戏，fighter_state.rs 2228 行状态机，15+ Bevy 插件体系，支持 WASM/Web)
- Updated: index.md (新增 fish-folk-punchy 条目，total pages: 53), open-source-games-learning-checklist.md (行121 Fish Folk Punchy checkbox, 学习记录59), log.md

## [2026-04-09] ingest | Frogatto & Friends 开源游戏 wiki note
- Created: open-source-game/frogatto.md (Anura 引擎模块分离架构，FFC 数据驱动脚本，16 语言本地化，v5.1 模块格式)
- Updated: index.md (total pages: 52), open-source-games-learning-checklist.md (行119 Frogatto checkbox, 学习记录57), log.md

## [2026-04-09] ingest | OpenGOAL Jak & Daxter PC 移植 wiki note
- Created: open-source-game/open-goal.md (Jak & Daxter PC 移植，2.3M LOC GOAL 反编译+goalc GOAL 编译器[49K LOC C++]+decompiler[344K LOC C++]+game runtime[241K LOC C++]，四组件架构，Jak1 Complete/Jak2 Beta/Jak3 In Progress)
- Updated: index.md (新增 open-goal 条目), open-source-games-learning-checklist.md (行115 OpenGOAL checkbox, 学习记录53), log.md

## [2026-04-09] ingest | Sonic Robo Blast 2 wiki note
- Created: open-source-game/sonic-robo-blast-2.md (3D 索尼克同人作，基于 Doom Legacy 双渲染器[OpenGL+SDL2]，Lua 脚本+DEHACKED 扩展，252K LOC C，211 C 文件 + 180 头文件，v2.2.16 nightly)
- Updated: index.md (total pages: 51), open-source-games-learning-checklist.md (行117 Sonic Robo Blast 2 checkbox, 学习记录55), log.md

## [2026-04-09] ingest | VVVVVV 开源游戏 wiki note
- Created: open-source-game/vvvvvv.md (重力翻转平台游戏，SDL2 极简依赖全部静态链接，Entity 159K+Game 229K+Labclass 177K+Editor 141K LOC，完整内置关卡编辑器，data.zip PhysicsFS 虚拟文件系统)
- Updated: index.md (total pages: 50), open-source-games-learning-checklist.md (行114 checkbox, 学习记录52), log.md

## [2026-04-09] ingest | Omnispeak Commander Keen 4/5/6 开源重实现 wiki note
- Created: open-source-game/omnispeak.md (多后端渲染架构[SDL2/GL/Vulkan/SDL3]，Nuked OPL3 FM 合成器，约 51.8K LOC C，Episode 分离模块化)
- Updated: index.md (新增 omnispeak 条目，total pages: 55), open-source-games-learning-checklist.md (行123 Omnispeak checkbox), log.md

## [2026-04-09] lint | 整理 index.md
- 统一前缀格式：`| [[wikilink]] — 描述`（清除 `||||`、`||>`、`|>` 等混乱前缀）
- 修复 `!![open-source-game/hurry-curry]` → `[[open-source-game/hurry-curry]]`
- 重新分组为 5 个 section：AI/LLM/Agent、Game Projects & Studios、Game Dev、Open Source Games、Comparisons
- 更新: index.md, log.md

## [2026-04-09] ingest | MemPalace AI 记忆系统
- Created: entities/mempalace.md (AI 长期记忆系统，ChromaDB verbatim 存储 + 4 层记忆栈，LongMemEval 96.6% raw / 100% hybrid，$0 无 API，MCP Server 19 工具，Claude Code Hook 集成，AAAK lossy 压缩实验性)
- Updated: index.md (total pages: 49), log.md

## [2026-04-09] ingest | Descent 3 6DOF 太空射击 wiki note
- Created: open-source-game/descent-3.md (经典 6DOF 太空射击引擎，SDL3+OpenGL 跨平台，CMake+vcpkg 构建，GPL-3.0，模块化子系统架构，需原版游戏数据，v1.6.0)
- Updated: index.md (新增 descent-3 条目), open-source-games-learning-checklist.md (行99 checkbox, 行347 学习记录48), log.md

## [2026-04-09] ingest | Liblast Godot 4 多人 FPS wiki note
- Created: open-source-game/liblast.md (Godot 4.3+Godot Jolt 物理，多人 FPS 框架，Freeman Character System 模块化角色系统，Git LFS 资产管理，多窗口调试架构，⚠️ 主仓库已弃用迁移至 liblast-framework)
- Updated: index.md (total pages: 46), open-source-games-learning-checklist.md (行298+学习记录46, 行97 Liblast checkbox), log.md

## [2026-04-09] ingest | Xonotic 竞技场射击 wiki note
- Created: open-source-game/xonotic.md (Darkplaces 引擎 Quake 分支，精湛移动机械 Bunny Hop/Strafe Jump/Blaster Jump，.pk3dir 数据包格式，QuakeC 字节码，ENet UDP，GPLv3)
- Updated: index.md (total pages: 46), open-source-game/xonotic.md, open-source-games-learning-checklist.md, log.md

## [2026-04-09] ingest | Red Eclipse 竞技场射击 wiki note
- Created: open-source-game/red-eclipse.md (Tesseract引擎派生FPS，跑酷射击wall-run/boost/dash，~34K LOC game/，协作WYSIWYG地图编辑，ENet UDP网络，GPLv3)
- Updated: index.md (total pages: 45), open-source-game/red-eclipse.md, open-source-games-learning-checklist.md, log.md

## [2026-04-09] ingest | JFDuke3D Duke Nukem 3D 端口 wiki note
- Created: open-source-game/jfduke3d.md (Jonathon Fowler 移植版，jfbuild Build引擎子模块，Polymost OpenGL渲染，SDL2跨平台，~45K LOC C，GPLv2)
- Updated: index.md (total pages: 44), open-source-games-learning-checklist.md, log.md

## [2026-04-09] ingest | EDuke32 Build Engine 端口 wiki note
- Created: open-source-game/eduke32.md (多游戏 Build 端口(Duke3D/SW/Blood/Ion Fury)，~116K LOC C++，mimalloc/libxmp/PhysicsFS/imgui 嵌入式依赖，GPLv2)
- Updated: index.md (total pages: 43), open-source-games-learning-checklist.md, log.md

## [2026-04-09] ingest | ECWolf Wolfenstein 3D 增强源码端口 wiki note
- Created: open-source-game/ecwolf.md (Wolf4SDL/ZDoom 混合体验，软件 Raycasting，多游戏IWAD支持，无限推墙/Things，~67K LOC C++，CMake+SDL2)
- Updated: index.md (total pages: 42), open-source-games-learning-checklist.md, log.md

## [2026-04-09] ingest | Chocolate Doom 开源 Doom 源码端口 wiki note
- Created: open-source-game/chocolate-doom.md (精准还原 DOS Doom 的源码端口，Bug-Compatible 设计哲学，SDL2 跨平台，支持 Doom/Heretic/Hexen/Strife 多游戏，GPL)
- Updated: index.md (total pages: 41), open-source-games-learning-checklist.md, log.md

## [2026-04-09] ingest | DOOM64-RE 开源游戏逆向工程 wiki note
- Created: open-source-game/doom-64-re.md (Doom 64 N64 完全逆向工程、C+MIPS汇编、N64 SDK交叉编译、WESS音频库、三阶段软件渲染管线、恢复锁定功能)
- Updated: index.md (total pages: 41), open-source-games-learning-checklist.md, log.md

## [2026-04-09] ingest | Wolfenstein 3D 开源 FPS 源码 wiki note
- Created: open-source-game/wolfenstein-3d.md (Raycasting渲染、Borland C++3.0+80x86汇编、DOS 16位定点数系统、John Carmack 2012代码点评)
- Updated: index.md (total pages: 40), open-source-games-learning-checklist.md, log.md

## [2026-04-09] ingest | Quake 2 开源 FPS 源码 wiki note
- Created: open-source-game/quake-2.md (双渲染器架构、143K LOC C、ref_gl+ref_soft并行、模块化client/server/game分离)
- Updated: index.md (total pages: 38), log.md
## [2026-04-09] ingest | Doom (id Software) 开源 FPS 源码 wiki note
- Created: open-source-game/doom.md (BSP渲染架构、模块子系统分析、54K LOC C、info.c状态机数据驱动)
- Updated: index.md (total pages: 37), log.md
## [2026-04-08] create | Wiki initialized
## [2026-04-08] update | Godot 4 concept page expanded
- Expanded: concepts/godot-4.md (architecture, GDScript, physics, XR, version history)
## [2026-04-08] update | GDScript patterns concept page created
- Created: concepts/gdscript-patterns.md (10 patterns from Microverse source)
## [2026-04-08] explore | Dialog system and Stanford AI Town
- Created: concepts/microverse-dialog-system.md (DialogService/ConversationManager/BackgroundStoryManager)
- Created: concepts/stanford-generative-agents.md (Memory/Reflection/Planning, comparison table)
## [2026-04-08] explore | Save system, character system, animation
- Created: concepts/microverse-save-system.md (GameSaveManager collect/apply, JSON structure)
- Expanded: concepts/llm-integration.md (9 providers, request formats, response parsers)
- Created: concepts/microverse-character-system.md (8 characters, PERSONITY_CONFIG, prompt injection)
- Created: concepts/godot-animation-system.md (SpriteFrames, AnimatedSprite2D state machine)
## [2026-04-08] ingest | VoxCPM / VoxCPM2 研究
- Captured: raw/articles/voxcpm-openbmb-2025.md
- Created: entities/voxcpm.md (VoxCPM2, 2B params, Tokenizer-Free TTS, 30 languages + 9 Chinese dialects)
- Created: entities/openbmb.md (OpenBMB = BAAI + 面壁智能, MiniCPM/VoxCPM 背后的研究组织)
- Created: concepts/voxcpm-local-deployment.md (本地部署配置：Python/CUDA/GPU 显存/安装步骤/运行示例)
## [2026-04-08] ingest | Pioneer 太空模拟器 wiki note
- Created: open-source-game/pioneer.md (银河程序化生成、经济/派系系统、OpenGL渲染、Lua脚本)
- Updated: index.md, log.md
## [2026-04-08] ingest | Claude Code Game Studios 研究
- Captured: raw/articles/claude-code-game-studios-2026.md (克隆自 github.com/Donchitos/Claude-Code-Game-Studios)
## [2026-04-08] ingest | ScummVM 经典冒险引擎 wiki note
- Created: open-source-game/scummvm.md (141引擎插件架构、AdvancedDetector、跨平台后端抽象)
- Updated: index.md, log.md
- Created: entities/claude-code-game-studios.md (项目概览：49 agents, 72 skills, MIT license, 协作模式)
- Created: concepts/claude-code-game-studio-architecture.md (Agent 层级结构、Model Tier、五大协调规则、Subagents vs Agent Teams)
- Created: concepts/claude-code-game-studio-collaboration-protocol.md (Question→Options→Decision→Draft→Approval 协议、文件写入规则、决策 UI 模式)
## [2026-04-08] ingest | Open Source Games List 研究
- Captured: raw/articles/open-source-games-list-2026.md (克隆自 gitcode.com/GitHub_Trending/op/open-source-games)
- Created: entities/open-source-games-list.md (18+ 品类开源游戏列表：FPS/RPG/RTS/Roguelike/城市建造/赛车等)
- Created: comparisons/open-source-game-engines-comparison.md (开源游戏引擎对比：Godot/Bevy/CUBE/Spring/OpenMW，含公司技术栈推荐)
## [2026-04-09] ingest | Zelda Twilight Princess 反向工程项目 wiki note
- Created: open-source-game/the-legend-of-zelda-twilight-princess.md (多版本条件编译、objdiff对比工具、CC0无版权)
- Updated: index.md, open-source-games-learning-checklist.md, log.md
## [2026-04-09] ingest | Zelda3 开源游戏 wiki note
- Created: open-source-game/zelda3.md (Zelda A Link to the Past 完全重实现，70-80kLOC C，SNES 仿真层+逐帧 RAM 验证)
- Updated: index.md, open-source-games-learning-checklist.md, log.md
## [2026-04-09] ingest | Dead Ascend 开源游戏 wiki note
- Created: open-source-game/dead-ascend.md (Qt/QML 手绘点击冒险，僵尸塔楼密室解谜，Tiled TMX 地图格式)
- Updated: index.md, open-source-games-learning-checklist.md, log.md
## [2026-04-09] ingest | CorsixTH 开源游戏 wiki note
- Created: open-source-game/corsixth.md (Theme Hospital 开源克隆，C++/Lua 混合架构，SDL 渲染，数据驱动游戏逻辑)
- Updated: index.md, open-source-games-learning-checklist.md, log.md
## [2026-04-09] ingest | OpenLoco 开源游戏 wiki note
- Created: open-source-game/openloco.md (Chris Sawyer's Locomotion 清洁室逆向重实现，C++/SDL3，模块化架构，vcpkg 依赖管理，运输帝国经营模拟)
- Updated: index.md, open-source-games-learning-checklist.md, log.md
## [2026-04-09] ingest | OpenRCT2 开源游戏 wiki note
- Created: open-source-game/openrct2.md (RollerCoaster Tycoon 2 开源重实现，游乐园建造管理，C++20/CMake/Duktape JS插件引擎，TCP/IP多人合作)
- Updated: index.md, open-source-games-learning-checklist.md, log.md

## [2026-04-09] ingest | OpenTTD 开源游戏 wiki note
- Created: open-source-game/openttd.md (Transport Tycoon Deluxe 开源复刻，C++/CMake/vcpkg，SDL2+OpenGL，多人锁步网络，NewGRF 图形扩展，AI Script 双引擎)
- Updated: index.md, open-source-games-learning-checklist.md, log.md

## [2026-04-09] ingest | Hurry Curry! 开源游戏 wiki note
- Created: open-source-game/hurry-curry.md (合作式 3D 多人烹饪游戏，Godot 4.5 + Rust 混合架构，WebSocket JSON 协议三层移动实现（客户端预测+服务端校验），YAML ASCII-art 地图数据驱动)
- Updated: index.md, open-source-games-learning-checklist.md, log.md

## [2026-04-09] ingest | Cytopia 开源游戏 wiki note
- Created: open-source-game/cytopia.md (复古像素城市建造，自定义 SDL2 等距渲染引擎，JSON TileData 数据驱动模组系统，libnoise 程序化地形生成，Conan/CMake 依赖管理)

## [2026-04-09] ingest | Egregoria 开源游戏 wiki note
- Created: open-source-game/egregoria.md (Cities: Skylines 风格 Rust 城市建造，模拟/渲染分离架构，确定性锁步网络，PBR wgpu 渲染器，混合 Factorio+自由市场经济模型)
- Updated: index.md, open-source-games-learning-checklist.md, log.md

## [2026-04-09] ingest | Julius 开源游戏 wiki note
- Created: open-source-game/julius.md (Caesar III 清洁室重实现，SDL2 跨平台复刻，100% 存档兼容，约93K LOC C代码)
- Updated: index.md, open-source-games-learning-checklist.md, log.md

## [2026-04-09] ingest | Unknown Horizons 开源游戏 wiki note（补全）
- Indexed: open-source-game/unknown-horizons.md（由前次运行创建）
- Updated: open-source-games-learning-checklist.md, index.md, log.md

## [2026-04-09] ingest | Citybound 开源游戏 wiki note
- Created: open-source-game/citybound.md (微观模型城市建造，Rust Actor模型(kay)，协作规划理念，浏览器WebGL UI+双终端开发模式)
- Updated: index.md, open-source-games-learning-checklist.md, log.md

## [2026-04-09] ingest | Akhenaten 开源游戏 wiki note
- Created: open-source-game/akhenaten.md (Pharaoh 法老城市建造游戏开源重实现，Julius/Augustus 分支，SDL2 跨平台，MUJS JS 脚本，约140K LOC C++，GNU AGPL)
- Updated: index.md, open-source-games-learning-checklist.md, log.md

## [2026-04-09] ingest | micropolisJS 开源游戏 wiki note
- Created: open-source-game/micropolisjs.md (SimCity 经典城市模拟 JavaScript 移植版，TypeScript+JS 混合，BlockMap 多维度数据追踪，jQuery 最小依赖，GPLv3)
- Updated: index.md, open-source-games-learning-checklist.md, log.md

## [2026-04-09] ingest | Doom 3 BFG Edition 开源游戏 wiki note
- Created: open-source-game/doom-3-bfg.md (id Tech 4 引擎源码，Portal 渲染架构，Lua 脚本，doomclassic Doom 1 重制，BFG Edition 收录)
- Updated: index.md, open-source-games-learning-checklist.md, log.md

## [2026-04-09] ingest | Quake 开源游戏 wiki note
- Created: open-source-game/quake.md (1996年3D FPS里程碑，WinQuake软件渲染+GLQuake OpenGL+QuakeWorld多人网络，BSP树+PVS，约87K LOC C，GPLv2)
- Updated: index.md, open-source-games-learning-checklist.md, log.md

## [2026-04-09] ingest | Quake III Arena 开源游戏 wiki note
- Created: open-source-game/quake-iii-arena.md (id Software 竞技场射击源码，QVM 虚拟机架构驱动游戏逻辑，BOT AI 路由编译，纯多人竞技，GPL)
- Updated: index.md, open-source-games-learning-checklist.md, log.md


## [2026-04-09] ingest | UZDoom 开源游戏 wiki note
- Created: open-source-game/uzdoom.md (GZDoom/ZDoom 延续，现代 DOOM 源码端口，双渲染器架构，ZScript VM，~592K LOC C++)
- Updated: index.md, open-source-games-learning-checklist.md, log.md
## [2026-04-09] ingest | Chocolate Quake 开源游戏 wiki note
- Created: open-source-game/chocolate-quake.md (精准还原 Quake v1.09 DOS 体验的极简源码端口，Bug 兼容优先，纯软件渲染无硬件加速，C99+CMake)
- Updated: index.md, open-source-games-learning-checklist.md, log.md

## [2026-04-09] ingest | FTEQW 开源游戏 wiki note
- Created: open-source-game/fteqw.md (先进可移植 Quake 引擎，多后端渲染、插件系统、自研 FTEQCC 编译器，GPL-2.0)
- Updated: index.md, open-source-games-learning-checklist.md, log.md

## [2026-04-09] ingest | Wolf4SDL 开源游戏 wiki note
- Created: open-source-game/wolf4sdl.md (Wolfenstein 3D SDL 移植版，id Software 原始代码复用，OPL2 双模拟器 GPL/MAME 切换，version.h 多版本条件编译)
- Updated: index.md, open-source-games-learning-checklist.md, log.md

## [2026-04-09] ingest | Duke Nukem 3D 开源游戏 wiki note
- Created: open-source-game/duke-nukem-3d.md (3D Realms 经典 FPS 源码，Build Engine 驱动，Ken Silverman Sector/Portal 渲染，GPLv2 开源)
- Updated: index.md, open-source-games-learning-checklist.md, log.md

## [2026-04-09] ingest | Shadow Warrior 开源游戏 wiki note
- Created: open-source-game/shadow-warrior.md (3D Realms 经典 FPS，Build 引擎，118K LOC C，GPL+商业数据双许可，Lo Wang 中国忍者)
- Updated: index.md, open-source-games-learning-checklist.md, log.md

## [2026-04-09] ingest | Raze Build engine 多游戏合一引擎 wiki note
- Created: open-source-game/raze.md (Build engine 多游戏合一，GZDoom 技术栈，支持 Duke/Blood/Redneck/SW/Exhumed，三渲染器 GL/GLES/Vulkan，~578K LOC C++)
- Updated: index.md (total pages: 44), open-source-games-learning-checklist.md, log.md

## [2026-04-09] ingest | NBlood 开源游戏 wiki note
- Created: open-source-game/nblood.md (Blood / Exhumed / Redneck Rampage 逆向工程端口，基于 EDuke32，多游戏合一，GNU Make 跨平台构建，GPL-2.0)
- Updated: index.md, open-source-games-learning-checklist.md, log.md


## [2026-04-09] ingest | JFShadowWarrior 开源游戏 wiki note
- Created: open-source-game/jfshadowwarrior.md (Jonathon Fowler 的 Shadow Warrior 现代端口，jfbuild submodule，Polymost OpenGL/GLES2，多平台，GTK+ UI 可选)
- Updated: index.md (total pages: 45), open-source-games-learning-checklist.md, log.md

## [2026-04-09] ingest | BuildGDX 开源游戏 wiki note
- Created: open-source-game/buildgdx.md (Java/LibGDX 跨平台 Build Engine 移植，三渲染器(Polymost+软件+GL)架构，~74K LOC Java，LWJGL3+GLFW 桌面后端+Android 支持，支持 Duke3D/Shadow Warrior/Blood 等多游戏)
- Updated: index.md (total pages: 45), open-source-games-learning-checklist.md, log.md


## [2026-04-09] ingest | NuBuildGDX 开源游戏 wiki note
- Created: open-source-game/nubuildgdx.md (BuildGDX 稳定化分支，stability-first fork，atsb 维护，libGDX 1.9.10 旧依赖策略，375 Java 文件)
- Updated: index.md, open-source-games-learning-checklist.md, log.md

## [2026-04-09] ingest | AssaultCube CUBE Engine 派生 FPS wiki note
- Created: open-source-game/assault-cube.md (CUBE Engine 派生 FPS，ZLIB 极宽松许可，ENet 低延迟网络，协作地图编辑)
- Updated: index.md, open-source-games-learning-checklist.md, log.md

## [2026-04-09] ingest | Cube 2: Sauerbraten 开源游戏 wiki note
- Created: open-source-game/cube-2-sauerbraten.md (CUBE Engine 2 代体素 FPS，~65K LOC C++，稀疏八叉树场景，实时游戏内地图编辑，ENet UDP 网络，ZLIB 许可)
- Updated: index.md (total pages: 45), open-source-games-learning-checklist.md, log.md

## [2026-04-09] ingest | .kkrieger 开源游戏 wiki note
- Created: open-source-game/kkrieger.md (Farbrausch fr_public 仓库，Werkkzeug3 引擎分支源码，Portal 渲染 6-Pass 光照，操作符树动画系统，KKriegerGame FPS 游戏逻辑，V2 合成器，122K LOC C++，BSD 许可)
- Updated: index.md (total pages: 47), open-source-games-learning-checklist.md (行98 checkbox, 学习记录47), log.md

## [2026-04-09] ingest | AvP Forever 开源游戏 wiki note
- Created: open-source-game/avp-forever.md (Aliens versus Predator 1999 源码维护项目，多分支 rebasing 策略叠加 icculus/neuromancer/scraft 等源码，Direct3D/SDL 多平台层，三族独立行为系统，嵌入式 Bink/Smacker/Miles 二进制库，需原版游戏数据)
- Updated: index.md (total pages: 48), open-source-games-learning-checklist.md (行103 checkbox, 学习记录49), log.md

## [2026-04-09] ingest | The Dark Mod 开源游戏 wiki note
- Created: open-source-game/the-dark-mod.md (Doom 3/id Tech 4 引擎潜行 FPS，AAS 区域感知+AI 通信子系统+Memory 系统，170+ 社区任务，源码 GPL+资产 CC BY-NC-SA 3.0 双许可，C++17/CMake 跨平台)
- Updated: index.md (total pages: 48), open-source-games-learning-checklist.md (行100 checkbox, 学习记录50), log.md

## [2026-04-09] ingest | NakedAVP 开源游戏 wiki note
- Created: open-source-game/nakedavp.md (Aliens vs Predator Classic 2000 SDL3 端口，双渲染器自动降级（OpenGL/GLES2），Win API 抽象层，三族独立 AI/武器/HUD，约 45K LOC C/C++)
- Updated: index.md (total pages: 49), open-source-games-learning-checklist.md (行104 checkbox, 学习记录51), log.md

## [2026-04-09] ingest | Surreal Engine 开源游戏 wiki note
- Created: open-source-game/surreal-engine.md (Unreal Engine 1 清洁室重实现，D3D11+Vulkan 双渲染器，~99K LOC C++，SHA1DB 多游戏识别，Engine/Editor/Debugger 三应用入口，Unrealscript VM 部分实现（缺网络），仅 UT436/UnrealGold 可玩)
- Updated: index.md (total pages: 49), open-source-games-learning-checklist.md (行107 checkbox, 学习记录52), log.md

## [2026-04-09] ingest | Super Mario 64 开源游戏 wiki note
- Created: open-source-game/super-mario-64.md (N64 经典 3D 平台跳跃完整反编译源码，2746 C 文件，src/engine/ 图节点渲染+src/game/ 游戏逻辑，支持 jp/us/eu/sh/cn 多版本构建，GPLv2，binutils-mips 交叉编译，baserom 资产提取)
- Updated: index.md (total pages: 50), open-source-games-learning-checklist.md (行113 checkbox, 学习记录53), log.md

## [2026-04-09] ingest | DDraceNetwork 开源游戏 wiki note
- Created: open-source-game/ddnet.md (Teeworlds DDRace 模组社区延续版，合作 2D 平台跳跃游戏，ddnet-libs C++/Rust 分层架构（rust-bridge/engine接口 + src/engine/ + src/game/），CMake+Ninja 构建，SDL2+OpenGL 渲染，SQLite 持久化排行榜，datasrc/Python 地图数据编译管线，合作 DDRace 机制 Freeeze/teehelp/共享重生点，ISC 许可)
- Updated: index.md (total pages: 50), open-source-games-learning-checklist.md (行116 checkbox, 学习记录54), log.md

## [2026-04-09] ingest | Rigel Engine 开源游戏 wiki note
- Created: open-source-game/rigel-engine.md (Duke Nukem II 清洁室逆向重实现，C++17/SDL2+OpenGL 双渲染器，约 45K LOC，GPLv2，模块化 ECS 架构 engine/game_logic/frontend/renderer/ui)
- Updated: index.md (total pages: 51), open-source-games-learning-checklist.md (行118 checkbox, 学习记录), log.md

## [2026-04-09] ingest | Fish Folk: Jumpy 开源游戏 wiki note
- Created: open-source-game/fish-folk-jumpy.md (战术 2D 射击游戏，Bevy/Rust + rapier2d 确定性物理，2-4 人本地/联机，bones_framework 游戏框架，v0.12.2)
- Updated: index.md (total pages: 53), open-source-games-learning-checklist.md (行120 Fish Folk Jumpy checkbox, 学习记录58), log.md

## [2026-04-09] ingest | Commander-Genius wiki note
- Created: open-source-game/commander-genius.md (Commander Keen 1-6+Dreams 开源解释器，C++完全重写[仅存0.02% CloneKeen代码]，SDL2+OpenGL，LUA Mod，多人4人支持，289 cpp+297 h，GsKit共享库，内置游戏下载器，Cosmos引擎submodule)
- Updated: index.md (新增 commander-genius 条目, total pages: 54), open-source-games-learning-checklist.md (行122 Commander-Genius checkbox, 学习记录60), log.md

## [2026-04-09] ingest | Portal64 Still Alive wiki note
- Created: open-source-game/portal64.md (Valve Portal N64 demake，移除 libultra 私有库，Skeletool64 骨骼动画+显示列表生成，17 室可玩，EPA/GJK 碰撞检测，约 41K LOC C)
- Updated: index.md (total pages: 56), open-source-games-learning-checklist.md (行131 Portal64 checkbox, 学习记录63), log.md

## [2026-04-09] ingest | Commander Keen in Keen Dreams wiki note
- Created: open-source-game/commander-keen-in-keen-dreams.md (Commander Keen Episode 4 源码，2014 众筹开源，id Software 早期 C+汇编架构，VGA 13h 软件渲染，LZHUF 压缩，约 23K LOC，GPLv2+)
- Updated: index.md (新增 commander-keen-in-keen-dreams 条目, total pages: 55), open-source-games-learning-checklist.md (行124 Commander Keen in Keen Dreams checkbox), log.md

## [2026-04-09] ingest | Whatajong wiki note
- Created: open-source-game/whatajong.md (麻将消消乐 Roguelite，Solid.js + TypeScript + Electron，Vanilla Extract CSS，rand-seed 确定性随机，Howler.js 音频，MIT)
- Updated: index.md (新增 whatajong 条目, total pages: 57), open-source-games-learning-checklist.md (行132 Whatajong checkbox, 学习记录64), log.md

## [2026-04-09] ingest | BlockOut II wiki note
- Created: open-source-game/blockout-ii.md (3D 俄罗斯方块，C++/OpenGL/SDL，~12K LOC，评估函数驱动 Bot AI，回放 .bl2replay 系统，在线排行榜，ImageLib 独立图像库，GPLv2)
- Updated: index.md (新增 blockout-ii 条目, total pages: 57), open-source-games-learning-checklist.md (行130 BlockOut II checkbox, 学习记录65), log.md

## [2026-04-09] ingest | SuperTuxKart wiki note
- Created: open-source-game/supertuxkart.md (开源卡丁车派对游戏，Bullet Physics btKart 趣味物理引擎，ENet UDP 事件回滚网络同步，SERVER_ONLY 无 GUI 服务器构建，多后端渲染 OpenGL/GLES/DX9，~274K LOC C++，GPLv3)
- Updated: index.md (新增 supertuxkart 条目, total pages: 58), open-source-games-learning-checklist.md (行138 SuperTuxKart checkbox, 学习记录65), log.md

## [2026-04-09] ingest | Rigs of Rods wiki note
- Created: open-source-game/rigs-of-rods.md (软体物理沙盒，节点-弹簧车辆形变实时仿真，OGRE 1.11 + AngelScript，2005 年项目，GPLv2，约 19K LOC C++)
- Updated: index.md (新增 rigs-of-rods 条目, total pages: 59), open-source-games-learning-checklist.md (行140 Rigs of Rods checkbox, 学习记录68), log.md


## [2026-04-09] ingest | VDrift 开源游戏 wiki note
- Created: open-source-game/vdrift.md
- Updated: index.md, log.md
- Clone: https://github.com/VDrift/vdrift

## [2026-04-09] ingest | Yorg 开源赛车游戏 wiki note
- Created: open-source-game/yorg.md (TrackMania 风格开源赛车，Panda3D 引擎驱动，Python 3.x，多人 XMPP 同步，GPLv3)
- Updated: index.md (新增 yorg 条目), open-source-games-learning-checklist.md (行145 Yorg checkbox, 学习记录71), log.md
- Clone: https://github.com/cflavio/yorg

## [2026-04-09] ingest | Beyond All Reason wiki note
- Created: open-source-game/beyond-all-reason.md (Spring/Recoil 引擎 RTS，约4.3GB仓库含资源，Lua数据驱动三层架构(luarules/luaui/luaai)，BARb AI JSON配置分层设计，GL4着色器，Busted+Lux测试框架)
- Updated: index.md (新增 beyond-all-reason 条目, total pages: 63), open-source-games-learning-checklist.md (行154 BAR checkbox, 学习记录75), log.md
- Clone: https://github.com/beyond-all-reason/Beyond-All-Reason (tarball下载超时332MB/4.3GB总大，通过GitHub API获取源码结构分析)

## [2026-04-09] ingest | Warzone 2100 wiki note
- Created: open-source-game/warzone-2100.md (3D RTS，157K LOC C++，三后端渲染(OpenGL/Vulkan/GLES)，gamelib/framework/ivis_opengl模块化架构，400+科技树，lib/netplay帧同步多人，WebAssembly支持)
- Updated: index.md (新增 warzone-2100 条目), open-source-games-learning-checklist.md (行156 checkbox, 学习记录75), log.md
- Clone: https://github.com/Warzone2100/warzone2100 (depth=1成功)

## [2026-04-09] ingest | Widelands wiki note
- Created: open-source-game/widelands.md (Settlers II 风格开源 RTS，~301K LOC C++，CMake/SDL2+OpenGL，Lua 脚本驱动，Flag-Route 经济链（economy/50+文件），帧同步多人 GameHost/GameClient 架构)
- Updated: index.md (新增 widelands 条目，total pages: 64), open-source-games-learning-checklist.md (行157 Widelands checkbox, 学习记录76), log.md
- Clone: https://github.com/widelands/widelands (depth=1 成功，约25155文件)

## [2026-04-09] ingest | Mindustry wiki note
- Created: open-source-game/mindustry.md (自动化塔防 RTS，Arc Engine + 代码生成 ECS + 帧同步多人，27.1k stars)
- Updated: index.md (新增 mindustry 条目), open-source-games-learning-checklist.md (行158 Mindustry checkbox, 学习记录77), log.md
- Clone: https://github.com/Anuken/Mindustry (API tarball via web_extract 成功，因 git clone 超时，改用 raw.githubusercontent.com 获取源码分析)

## [2026-04-09] ingest | Trigger Rally wiki note
- Created: open-source-game/trigger-rally.md (纯 C++ 拉力赛车，PEngine/PSim/Trigger 三层架构，程序化地形)
- Updated: index.md (新增 trigger-rally 条目), open-source-games-learning-checklist.md (行146 Trigger Rally checkbox, 学习记录78)
- Clone: https://sourceforge.net/projects/trigger-rally (SVN 仓库，git clone 超时，改用 GitHub mirror Cebion/trigger-rally_pm + web_extract 源码分析)

## [2026-04-09] ingest | OpenAge wiki note
- Created: open-source-game/openage.md (Age of Empires 引擎复刻，C++20+Python3 双语言架构，Cython 绑定，nyan 配置格式，827 C++/h + 291 Python 文件)
- Updated: index.md (新增 openage 条目), open-source-games-learning-checklist.md (行159 OpenAge checkbox)
- Clone: https://github.com/SFTtech/openage (git clone --depth=1 成功)

## [2026-04-10] ingest | OpenHV wiki note
- Created: open-source-game/openhv.md (OpenRA Mod 科幻 RTS，改编自 Hard Vacuum，MiniYAML 数据驱动 + C# Traits 系统)
- Updated: index.md (新增 openhv 条目), open-source-games-learning-checklist.md (行160 OpenHV checkbox)
- Clone: https://github.com/OpenHV/OpenHV (git fetch origin main 后台成功)

## [2026-04-09] ingest | KeeperFX wiki note
- Created: open-source-game/keeper-fx.md (Dungeon Keeper 开源增强版，Ariadne A*寻路+lua脚本+ENet多人，~235K LOC C/C++，GPLv2)
- Updated: index.md (新增 keeper-fx 条目), open-source-games-learning-checklist.md (行161 Keeper FX checkbox, 学习记录85)
- Clone: https://github.com/dkfans/keeperfx (git clone --depth=1 成功)

## [2026-04-10] ingest | Dune II The Maker wiki note
- Created: open-source-game/dune-ii-the-maker.md (C++23 Dune II 重制，SDL2 全家桶，三速 tick 游戏循环，cGameState 状态机，cPlayerBrain Mission 队列 AI)
- Updated: index.md (新增 dune-ii-the-maker 条目), open-source-games-learning-checklist.md (行162 checkbox, 学习记录86)
- Clone: https://github.com/stefanhendriks/Dune-II---The-Maker (git clone --depth=1 成功)

## [2026-04-10] ingest | Freeserf.net wiki note
- Created: open-source-game/freeserf-net.md (The Settlers I C# 清洁室重实现，Silk.NET 跨平台渲染，BASS 音频，~200 文件 ~35K LOC，多人网络开发中)
- Updated: index.md (新增 freeserf-net 条目), open-source-games-learning-checklist.md (行163 checkbox, 学习记录87)
- Clone: https://github.com/Pyrdacor/freeserf.net (git clone --depth=1 成功)

## [2026-04-10] ingest | Permafrost Engine wiki note
- Created: open-source-game/permafrost-engine.md (OpenGL 3.3 RTS 游戏引擎，纯 C + Python 2.7 脚本，GPU 骨骼动画+分层流场寻路+Fiber 协作多任务，旗舰游戏 EVERGLORY，2739 stars)
- Updated: index.md (新增 permafrost-engine 条目，total pages: 65), open-source-games-learning-checklist.md (行164 checkbox)
- Clone: https://github.com/eduard-permyakov/permafrost-engine (git clone 超时；仓库 ~320MB，GitHub API 获取结构和 README 完成分析)

## [2026-04-10] ingest | War1gus wiki note
- Created: open-source-game/war1gus.md (Warcraft: Orcs & Humans 重实现，Stratagus 引擎 + Lua 脚本数据驱动，war1tool.cpp 4059 LOC 数据提取工具，scale2x 像素放大，GPLv2)
- Updated: index.md (新增 war1gus 条目), open-source-games-learning-checklist.md (行169 checkbox, 学习记录91)
- Clone: https://github.com/Wargus/war1gus (git clone --depth=1 成功)

## [2026-04-10] ingest | Wargus wiki note
- Created: open-source-game/wargus.md (Warcraft II mod using the Stratagus engine，wartool 数据提取工具链（wartool.cpp 3432 LOC），StormLib MPQ 归档处理，GPLv2，v2.4.1)
- Updated: index.md (新增 wargus 条目，total pages: 67), open-source-games-learning-checklist.md (行170 checkbox, 学习记录92)
- Clone: https://github.com/Wargus/wargus (git clone --depth=1 成功)

## [2026-04-09] ingest | Wyrmsun wiki note
- Created: open-source-game/wyrmsun.md (神话/历史/虚构融合 RTS，Stratagus 引擎（Wyrmgus）数据层，双仓库架构，持久英雄+物品掉落系统，GPL 2.0)
- Updated: index.md (新增 wyrmsun 条目，total pages: 68), open-source-games-learning-checklist.md (行171 checkbox, 学习记录93)
- Clone: https://github.com/Andrettin/Wyrmsun (git clone --depth=1 成功，923MB 内容仓库)

## [2026-04-10] ingest | Stargus wiki note
- Created: open-source-game/stargus.md (StarCraft 1998 资产导入 Stratagus 引擎的工具，~15K LOC C++，GPLv2)
- Updated: index.md (新增 stargus 条目，total pages: 69), open-source-games-learning-checklist.md (行172 checkbox)
- Clone: https://github.com/Wargus/stargus (git clone --depth=1 成功)

## [2026-04-10] ingest | Warsmash Mod Engine wiki note
- Created: open-source-game/warsmash-mod-engine.md (Warcraft III 模拟器，LibGDX + Java17，~97K LOC，2118 Java 文件，AGPL)
- Updated: index.md (新增 warsmash-mod-engine 条目，total pages: 70), open-source-games-learning-checklist.md (行173 checkbox, 学习记录95)
- Clone: https://github.com/Retera/WarsmashModEngine (git clone --depth=1 成功)

## [2026-04-10] ingest | Command & Conquer Remastered Collection wiki note
- Created: open-source-game/cnc-remastered-collection.md (EA 官方开源 C&C TD+RA 源码，C+汇编+C# MapEditor，GPL v3)
- Updated: index.md (新增 cnc-remastered-collection 条目，total pages: 71), open-source-games-learning-checklist.md (行176 checkbox, 学习记录96)
- Clone: https://github.com/electronicarts/CnC_Remastered_Collection (git clone --depth=1 成功)

## [2026-04-10] ingest | C&C Generals + Zero Hour wiki note
- Created: open-source-game/cnc-generals-zero-hour.md (EA 官方源码 Generals~1280cpp + GeneralsMD~1421cpp，W3DDevice+DX9，GameSpy帧同步，AI分层对象组件，MSVC 6.0)
- Updated: index.md (新增 cnc-generals-zero-hour 条目，total pages: 72), open-source-games-learning-checklist.md (行177 checkbox, 学习记录97)
- Clone: https://github.com/electronicarts/CnC_Generals_Zero_Hour (git clone --depth=1 成功)

## [2026-04-10] ingest | CnC Red Alert wiki note
- Created: open-source-game/cn-c-red-alert.md (EA 官方红色警戒(1996)源码，Westwood DOS 游戏，C++17.9MB/Assembly 5.1MB，CODE/WIN32LIB/VQA/IPX 多层架构，Watcom+TASM 编译，GPL v3)
- Updated: index.md (新增 cnc-red-alert 条目，total pages: 69), open-source-games-learning-checklist.md (行178 checkbox, 学习记录98)
- Clone: https://github.com/electronicarts/CnC_Red_Alert (git clone --depth=1 成功)

## [2026-04-10] ingest | Zero-K wiki note
- Created: open-source-game/zero-k.md (Spring Engine 纯 Lua 游戏内容仓库(2383 Lua)，GadgetHandler 模块化事件驱动架构(ai_CAI 4173行)，物理弹道+智能单位预判，PlanetWars 单机战役，PBR 自定义 Shader，GPL v2)
- Updated: index.md (新增 zero-k 条目，total pages: 73), open-source-games-learning-checklist.md (行182 Zero-K checkbox, 学习记录99)
- Clone: https://github.com/ZeroK-RTS/Zero-K (git clone --depth=1 成功，1.1GB仓库含大型美术资源)

## [2026-04-10] ingest | Dungeon Crawl Stone Soup wiki note
- Created: open-source-game/dungeon-crawl-stone-soup.md (~412K LOC C++，310 .cc/.h，ASCII+SDL Tiles 双模式渲染，.des Vault 手绘关卡系统，17+ 神祇契约系统，数据驱动物品/怪物/魔法配置，GPLv2+，20年开源迭代)
- Updated: index.md (新增 dungeon-crawl-stone-soup 条目，total pages: 70), open-source-games-learning-checklist.md (行188 DCSS checkbox, 学习记录100)
- Clone: https://github.com/crawl/crawl (git clone --depth=1 成功，crawl-ref/ 子目录结构)

## [2026-04-10] ingest | CnC Tiberian Dawn wiki note
- Created: open-source-game/cnc-tiberian-dawn.md (EA 官方 C&C 原版(1995)源码，Watcom C+++x86 汇编，OOP 类层次 FootClass/UnitClass/BuildingClass/AircraftClass，COMBUF ACK/Retry 网络系统，IPX/Modem 多人大战雾，DirectX Win95 移植，GPLv3)
- Updated: index.md (新增 cnc-tiberian-dawn 条目，total pages: 72), open-source-games-learning-checklist.md (行179 Tiberian Dawn checkbox, 学习记录101)
- Clone: https://github.com/electronicarts/CnC_Tiberian_Dawn (git clone/tarball 均超时；通过 GitHub API tree + raw content 端点获取 ~150 文件结构完成分析)

## [2026-04-10] ingest | Cataclysm: Dark Days Ahead wiki note
- Created: open-source-game/cataclysm-dark-days-ahead.md (480K LOC C++ (434cpp/457h)，JSON数据驱动~130K行JSON内容，双渲染器 SDL2/Tiles+Ncurses，Character/NPC/Vehicle/Mutation 系统，~242MB仓库含游戏数据，CC BY-SA 3.0，16.2k stars)
- Updated: index.md (新增 cataclysm-dark-days-ahead 条目，total pages: 72), open-source-games-learning-checklist.md (行189 Cataclysm checkbox, 学习记录102)
- Clone: https://github.com/CleverRaven/Cataclysm-DDA (git clone --depth=1 成功，242MB 仓库含游戏数据)

## [2026-04-10] ingest | NetHack wiki note
- Created: open-source-game/nethack.md (纯 C 无引擎架构，163MB仓库，18,442 commits，3,536 stars；src/ 核心游戏逻辑，dat/ Lua 地牢脚本（14职业），win/ Qt/X11/tty/curses 多前端抽象，sys/ 跨平台抽象；3.7 架构：Lua 替代 yacc/lex 编译，跨平台编译支持，可移植存档，Play Again 无退出重开)
- Updated: index.md (新增 nethack 条目，total pages: 73), open-source-games-learning-checklist.md (行190 NetHack checkbox, 学习记录103)
- Clone: https://github.com/NetHack/NetHack (git clone 超时；通过 GitHub API 获取源码结构信息完成分析)

## [2026-04-10] ingest | Meritous wiki note
- Created: open-source-game/meritous.md (PSI 充能攻击动作地牢探索，纯 C ~10K LOC，SDL 2D Tile，程序化地牢生成 mapgen.c 972 行，boss.c 1829 行，demon.c 2613 行，levelblit.c 2646 行，GPLv3)
- Updated: index.md (新增 meritous 条目), open-source-games-learning-checklist.md (Meritous checkbox 行194, 学习记录107)
- Clone: https://github.com/Patashu/Meritous (git clone --depth=1 成功)

## [2026-04-10] ingest | OpenMW wiki note
- Created: open-source-game/openmw.md (Morrowind 引擎清洁室重实现，C++20 + OpenSceneGraph + Bullet Physics，双脚本系统(遗留MWScript+现代Lua)，OMW::Engine 总线聚合所有子系统，完整工具链(opencs/bsatool/esmtool/navmeshtool)，~2768源文件~55K LOC，GPLv3，v0.51.0)
- Updated: index.md (新增 openmw 条目，total pages: 76), open-source-games-learning-checklist.md (OpenMW checkbox 行201, 学习记录108)
- Clone: https://github.com/OpenMW/openmw (git clone --depth=1 成功)

## [2026-04-10] ingest | Daggerfall Unity wiki note
- Created: open-source-game/daggerfall-unity.md (Unity 引擎重制《上古卷轴 II：匕首雨》，DaggerfallConnect Arena2 资产读取，MaterialReader/MeshReader/SoundReader 三件套，AudioSynthesis 全自研 MIDI/SF2/Sfz 合成，QuestMachine QRC 任务系统，TalkManager NPC 对话 AI（3736 行），SaveLoadManager FullSerializer 存档，ModManager 模组支持，MIT)
- Updated: index.md (新增 daggerfall-unity 条目，total pages: 77), open-source-games-learning-checklist.md (行202 Daggerfall Unity checkbox, 学习记录 109)
- Clone: https://github.com/Interkarma/daggerfall-unity (git clone --depth=1 成功)

## [2026-04-10] ingest | Veloren wiki note
- Created: open-source-game/veloren.md (Rust 体素多人 RPG，400K LOC，24 crates workspace，ECS specs + QUIC 网络 + 自研体素渲染器，GPLv3)
- Updated: index.md (新增 veloren 条目，total pages: 77), open-source-games-learning-checklist.md (行203 Veloren checkbox, 学习记录 110)
- Clone: https://gitlab.com/veloren/veloren (git clone --depth=1 成功，81MB；GitHub 镜像 clone/tarball/zipball 均超时，GitLab 主仓库 clone 成功)
- Note: GitHub 是只读镜像，主开发在 GitLab；v0.18.0 使用 Rust 2024 edition；世界生成使用 no_overflow profile（禁 overflow-check 提升性能）

## [2026-04-10] ingest | Space Station 14 wiki note
- Created: open-source-game/space-station-14.md (SS13 现代 C# 重制版，Robust Toolbox 自研引擎，Entity-Component 系统，YAML 原型数据驱动，MIT+CC-BY-SA，3.6k stars)
- Updated: index.md (新增 space-station-14 条目), open-source-games-learning-checklist.md (行204 Space Station 14 checkbox, 学习记录111), log.md
- Clone: https://github.com/space-wizards/space-station-14 (git clone/tarball/zipball 均超时/卡死；repo 大小 893MB；通过 GitHub API tree + README.md web extract 完成分析)
- Note: SS14 是 SS13 的现代 C# 重写版，引擎 Robust Toolbox（Lidgren UDP + NetSerializer + Avalonia XAML UI），Content.Client/Server/Shared 三模块架构，7591 C# + 2573 YAML 原型文件，NPC AI 系统（183 文件）最大子系统；游戏资产 MIT+CC-BY-SA 双许可

## [2026-04-10] ingest | Naev wiki note
- Created: open-source-game/naev.md (2D 太空贸易战斗 RPG，Escape Velocity 风格，C+Rust ~155K LOC + Meson 构建，SDL3+OpenGL 3.3+，Lua 脚本驱动，插件系统，GPLv3，Codeberg)
- Updated: index.md (新增 naev 条目，total pages: 78), open-source-games-learning-checklist.md (行206 Naev checkbox, 学习记录 112), log.md
- Clone: https://codeberg.org/naev/naev (git clone --depth=1 成功)
- Note: C+Rust 混合架构（C 主体 + Rust faction.rs/pilot.rs 等），Meson 构建支持 C11+Rust 2024 双语言；bindgen 0.72 生成 FFI；naev-artwork 作为 submodule 独立管理；严格 AI 禁止政策；gettext 国际化 + Weblate；插件系统 v0.13.0 内置 Manager；pilot/faction/economy/mission/space/event 子系统模块化设计

## [2026-04-10] ingest | Oolite wiki note
- Created: open-source-game/oolite.md (Elite 1984 风格太空开放世界贸易战斗，Objective-C + C 双后端架构(Cocoa+SDL)，GPLv2，OXP 插件扩展系统，无原版游戏数据依赖)
- Updated: index.md (新增 oolite 条目), open-source-games-learning-checklist.md (行207 Oolite checkbox, 学习记录 113), log.md
- Clone: https://github.com/OoliteProject/oolite (git clone --depth=1 成功)
- Note: 双渲染后端(Cocoa macOS + SDL Windows/Linux)共享同一 Core 层；81K+ LOC Objective-C Entity 基类；CollisionRegion 碰撞分区网格优化；Materials/ 目录完整 OpenGL Shader PBR 材质系统；OXP 插件包架构(Schemata XML 定义 + AddOns 目录热加载)；DebugOXP 开发调试扩展；Oolite Extension 社区驱动大量扩展内容

## [2026-04-10] ingest | Ambermoon.net wiki note
- Created: open-source-game/ambermoon-net.md (Ambermoon 经典 RPG C# 完全重写，.NET 6 多平台，Core/Data/Renderer/Frontend 分层模块化架构，Legacy/Pyrdacor 双数据后端，虚拟文件系统，MIT)
- Updated: index.md (新增 ambermoon-net 条目，total pages: 79), open-source-games-learning-checklist.md (行208 Ambermoon.net checkbox, 学习记录 114), log.md
- Clone: https://github.com/Pyrdacor/Ambermoon.net (git clone --depth=1 成功)
- Note: .NET Solution 含 20+ 子项目（Core/Data Common/FileSystems/Legacy/Pyrdacor/Renderer.OpenGL/Frontend/Audio/Android 等）；外部游戏数据需从 Pyrdacor/Ambermoon 仓库单独下载；支持原版 1.20 和 Ambermoon Advanced 1.33；v1.12.0 2025-11-24

## [2026-04-10] ingest | Exult wiki note
- Created: open-source-game/exult.md (Ultima VII 游戏引擎清洁室重实现，SDL 跨平台，完整支持《黑门》+《毒岛》，GPL v2，~48K LOC C++)
- Updated: index.md (新增 exult 条目，total pages: 80), open-source-games-learning-checklist.md (行211 Exult checkbox, 学习记录 115), log.md
- Clone: https://github.com/exult/exult (git clone --depth=1 成功)
- Note: 清洁室完全重写，SDL 统一跨平台抽象层，content/ 子目录含 bg/si 等社区补丁数据，autotools 多编译器支持（g++/clang++/MSVC），9+ CI 平台（Linux/macOS/Win/Android/iOS/FreeBSD/OmniOS），actors.cc 5370行角色系统+schedule.cc 6115行 AI 调度为最大源文件

## [2026-04-10] ingest | GemRB wiki note
- Created: open-source-game/gemrb.md (Infinity Engine 重实现，Baldur's Gate / Icewind Dale / Planescape: Torment，C++14 + Python3 脚本，40+ 插件化架构，46K LOC 核心引擎，GPLv2)
- Updated: index.md (新增 gemrb 条目), open-source-games-learning-checklist.md (行212 GemRB checkbox, 学习记录 116), log.md
- Clone: https://github.com/gemrb/gemrb (git clone --depth=1 成功)
- Note: PluginHolder<T> 模板实现插件化架构，40+ 插件分离视频/音频/资源导入，Python3 GUIScript 插件驱动游戏逻辑，Interface.cpp 4266行引擎主循环，Map.cpp 4029行场景管理，EffectQueue.cpp 2571行 AD&D 2E 效果系统，BIF/KEY 资源打包格式参考价值高

## [2026-04-10] ingest | Fallout Community Edition wiki note
- Created: open-source-game/fallout-community-edition.md (Fallout 1 引擎清洁室重实现，SDL2 跨平台，135K LOC C++，227 源文件，game/int/plib 三层架构，MIT)
- Updated: index.md (新增 fallout-community-edition 条目), open-source-games-learning-checklist.md (行215 Fallout1 CE checkbox, 学习记录 117), log.md
- Clone: https://github.com/alexbatalov/fallout1-ce (GitHub API tarball 下载成功)
- Note: game/ 138文件核心业务层(art/combat/critter/anim/inventry/dialog/gmovie/editor等)；int/ 解释器层(intrpert script VM/datafile/dialog/audiof等)；plib/ 平台抽象层(gnw图形窗口/db数据库/color/assoc)；需持有原版 DAT 游戏数据；多平台 Win/Linux/macOS/iOS/Android

## [2026-04-10] ingest | Fallout 2 Community Edition wiki note
- Created: open-source-game/fallout2-ce.md (Fallout 2 清洁室重实现，C++17/SDL2 多平台，378 文件，4.5MB+ C++，Sfall 兼容性层，MIT)
- Updated: index.md (新增 fallout2-ce 条目), open-source-games-learning-checklist.md (行216 Fallout2 CE checkbox, 学习记录 118), log.md
- Clone: https://github.com/alexbatalov/fallout2-ce (git clone + tarball download 均超时；通过 GitHub API tree/readme 端点获取源码结构完成分析)
- Note: src/interpreter.cc 脚本 VM 核心引擎；src/mapper/ 内置地图编辑器(mp_scrpt/targt/text/func)；SDL2 跨平台抽象；Sfall 兼容性(sfall_config/globals/opcodes/metarules)；third_party vendored SDL2/zlib；6 分支(main+5 feature)；os/android/ios/macos/windows 多平台适配；需原版 master.dat/critter.dat 游戏数据

## [2026-04-10] ingest | OpenEnroth wiki note
- Created: open-source-game/openenroth.md (Might and Magic VI-VIII 引擎清洁室重实现，C++23 + CMake，~136K LOC，9 大子系统模块化架构，22 个 Git Submodules，LuaJIT + sol2 脚本，GPLv2)
- Updated: index.md (新增 openenroth 条目), open-source-games-learning-checklist.md (行219 OpenEnroth checkbox, 学习记录 119), log.md
- Clone: https://github.com/OpenEnroth/OpenEnroth (git clone 超时；GitHub API tarball 下载成功)
- Note: 子系统 Architecture/Engine(60项)/GUI(16项)/Io(12项)/Library(26项)/Media(19项)/Scripting(27项)/Utility(22项)/Arcomage(4项) 高度模块化；22 个第三方 submodules(LuaJIT/ImGui-docking/spdlog/fmt/nlohmann_json/magic_enum等)；C++23 强制标准；ccache/sccache + mold/lld 链接器支持；GitHub Actions 三平台 CI (Windows/Linux/macOS)；目前仅 MM7 可玩，MM6/MM8 WIP；需持有原版 Might and Magic VII 游戏数据

## [2026-04-10] ingest | OpenNox wiki note
- Created: open-source-game/opennox.md (Nox (Westwood 2000) 引擎清洁室重实现，SDL2+OpenGL+OpenAL 跨平台抽象，compat 层分离 win/posix/mss，32位模式(-m32)保持原版数据布局，Emscripten WebAssembly 支持，自研 VQA 视频解码器，MIT)
- Updated: index.md (新增 opennox 条目), open-source-games-learning-checklist.md (行220 OpenNox checkbox, 学习记录 120), log.md
- Clone: https://github.com/noxworld-dev/opennox (git clone 超时；GitHub API tarball 下载成功)
- Note: 41 源文件(~20 .c/.cpp) 清洁室重写 Nox 游戏引擎；compat 层分离 Windows/ POSIX/ MSS 音频库兼容；VQA 视频解码器 vqa/ 子目录纯 C++ 实现；Emscripten 支持可通过 WebAssembly 在浏览器运行；需要持有原版 Nox 游戏数据

## [2026-04-10] ingest | reone wiki note
- Created: open-source-game/reone.md (KotOR/KotOR 2 引擎清洁室重实现，SDL2+OpenGL 3.3 自研引擎，NWScript 虚拟机，GFF/2DA 资源解析，~438 源文件，C++17，GPLv3)
- Updated: index.md (新增 reone 条目), open-source-games-learning-checklist.md (行221 reone checkbox, 学习记录 121), log.md
- Clone: https://github.com/seedhartha/reone (git clone --depth=1 成功)
- Note: 清洁室设计原则（不反编译，基于 BioWare 公开格式规格）；libs/ 下 10 个子系统模块化(audio/game/graphics/gui/input/movie/resource/scene/script/system)；NWScript VM 完整实现；支持 Steam 版 KotOR + TSL；非商业项目 GPLv3

## [2026-04-10] ingest | Severed Chains wiki note
- Created: open-source-game/severed-chains.md (PS1《龙骑士传说》逆向工程 Java 重实现，904 Java 文件三层架构(core/game/lodmod)，PS1 硬件仿真层(GTE/GPU/SPU)，Scus94491BpeSegment 5 分段重实现，Event-based 模组 API，LodMod.java 完整模组系统，Java 21 + LWJGL 3，需原版 ISO 运行时提取资产)
- Updated: index.md (新增 severed-chains 条目，total pages: 80), open-source-games-learning-checklist.md (行222 Severed Chains checkbox, 学习记录 122), log.md
- Clone: https://github.com/Legend-of-Dragoon-Modding/Severed-Chains (git clone --depth=1 成功)
- Note: 核心引擎代码量意外精简（Scus94491BpeSegment 总计仅 ~1023 行 Java），PS1 MIPS 汇编逆向重写的艺术；`legend.core.gpu/` 的 GpuCommand 系列命令封装设计精巧；Event-based 模组 API（LodBattleActions/LodEquipment/LodItems/LodShops 等 RegistryEvent）值得参考

## [2026-04-10] ingest | U7 Revisited wiki note
- Created: open-source-game/u7-revisited.md (Ultima VII: The Black Gate 3D 重制引擎，Ghost(raylib 3D)+Geist(Lua)双引擎分离架构，~49.5K LOC C++，StateMachine 驱动游戏流程，Lua 替代原版 Usecode 脚本，Gump UI 系统，8 阶段 Roadmap)
- Updated: index.md (新增 u7-revisited 条目), open-source-games-learning-checklist.md (行223 U7 Revisited checkbox, 学习记录 123), log.md
- Clone: https://github.com/ViridianGames/U7Revisited (git clone --depth=1 成功)
- Note: Ghost(渲染)/Geist(逻辑)双引擎分离架构清晰；StateMachine 基类派生 Loading/Title/Main/Conversation 等状态；Shape Editor 内置调试工具(F1)值得借鉴；8 阶段 Roadmap 展示清洁室重实现的阶段性规划

## [2026-04-10] ingest | DevilutionX wiki note
- Created: open-source-game/devilutionx.md (Diablo + Hellfire 开源端口，清洁室逆向工程，259 C++/163 H ~54K LOC，CMake 多平台（17+平台），帧同步多人 dvlnet/，Lua 脚本扩展，MIT)
- Updated: index.md (新增 devilutionx 条目，total pages: 81), open-source-games-learning-checklist.md (行226 DevilutionX checkbox, 学习记录 124), log.md
- Clone: https://github.com/diasurgical/devilutionX (git clone --depth=1 成功)
- Note: 清洁室重实现需用户提供原始 MPQ 数据文件；dvlnet/ 帧同步网络支持 ZeroTier 穿透和多平台 TCP P2P；engine/ 子目录 4K+ LOC 处理 sprite 加载（CEL/CL2/CLX 专有格式）和渲染；levels/ 的 drlg_l1~4.cpp 程序化地下城生成设计精巧；Lua REPL 嵌入提供运行时脚本扩展能力

## [2026-04-10] ingest | Freeablo wiki note
- Created: open-source-game/freeablo.md (Diablo 1 引擎清洁室重实现，双线程架构（渲染/逻辑分离），确定性锁步网络，Nuklear GUI，~38K LOC C++17，**已归档**，MIT)
- Updated: index.md (新增 freeablo 条目，total pages: 82), open-source-games-learning-checklist.md (行227 Freeablo checkbox, 学习记录 125), log.md
- Clone: https://github.com/wheybags/freeablo (git clone --depth=1 成功)
- Note: 项目已归档(2020年)；双线程架构(渲染/逻辑分离)保证模拟速度独立性；确定性锁步网络(禁用浮点数+定点数数学)；StormLib 读取原版 MPQ 数据；Nuklear GUI 替代 librocket；依赖管理从 Hunter 切换到完全内嵌

## [2026-04-10] ingest | Open Diablo II wiki note
- Created: open-source-game/open-diablo-2.md (Go+Ebiten v2 2D 游戏引擎实现的 Diablo 2 开源复刻，模块化 d2app/d2core/d2game/d2networking/d2script，帧同步 P2P 多人，otto JS 脚本引擎，项目已拆分：引擎→AbyssEngine，游戏→OpenDiablo2)
- Updated: index.md (新增 open-diablo-2 条目，total pages: 83), open-source-games-learning-checklist.md (行228 Open Diablo II checkbox, 学习记录 126), log.md
- Clone: https://github.com/OpenDiablo2/OpenDiablo2 (git clone --depth=1 成功)
- Note: Go 语言用于游戏引擎的可行性验证；MPQ 数据文件与引擎代码完全分离的设计；otto JS 引擎嵌入用于脚本扩展；Ebiten v2 轻量级 2D 渲染框架；项目拆分策略值得参考：引擎通用化 + 游戏项目专用化

## [2026-04-10] ingest | Abyss Engine wiki note
- Created: open-source-game/abyss-engine.md (Diablo 2 清洁室重实现引擎，纯 C 编写，~72 文件 ~4859 LOC C99，SDL2+FFmpeg+ZLIB+LibArchive 依赖栈，Manager 单例模式，Scene 状态机，过场动画支持，MIT)
- Updated: index.md (新增 abyss-engine 条目，total pages: 84), open-source-games-learning-checklist.md (行229 Abyss Engine checkbox, 学习记录 127), log.md
- Clone: https://github.com/AbyssEngine/AbyssEngine (git clone --depth=1 成功)
- Note: 纯 C 代码库 C99 标准确保最大兼容性；与 [[open-source-game/devilutionx|EvilutionX]] 清洁室逆向相比，AbyssEngine 选择完全重写路线；LibArchive 直接读取 MPQ 容器复用原版数据是快速启动项目的好方法；VideoManager 处理 FFmpeg 视频解码是 2D 游戏过场动画的标准方案

## [2026-04-10] ingest | OpenKore wiki note
- Created: open-source-game/openkore.md (Ragnarok Online 自动化助手，Perl + C XS 扩展，Task 链式 AI 架构，三模式连接 XKore/XKore2/XKoreProxy，txt 数据驱动配置，GPLv2)
- Updated: index.md (新增 openkore 条目，total pages: 85), open-source-games-learning-checklist.md (行233 OpenKore checkbox, 学习记录 128), log.md
- Clone: https://github.com/OpenKore/openkore (git clone --depth=1 成功，299MB 含大量游戏数据)
- Note: Perl + C XS 混合架构证明脚本语言可用于高性能游戏自动化；Task 链式设计适合复杂 AI 行为编排；三模式网络架构(XKore/XKore2/XKoreProxy)展示灵活连接方案；纯 txt 配置数据驱动，无需修改代码即可改变 bot 行为
