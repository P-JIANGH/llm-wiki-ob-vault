# Wiki Log

> Chronological record of all wiki actions. Append-only.
> Format: `## [YYYY-MM-DD] action | subject`
> Actions: ingest, update, query, lint, create, archive, delete
> When this file exceeds 500 entries, rotate: rename to log-YYYY.md, start fresh.

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
