# Wiki Log

> Chronological record of all wiki actions. Append-only.
> Format: `## [YYYY-MM-DD] action | subject`
> Actions: ingest, update, query, lint, create, archive, delete
> When this file exceeds 500 entries, rotate: rename to log-YYYY.md, start fresh.

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

