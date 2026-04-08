# Wiki Index

> Content catalog. Every wiki page listed under its type with a one-line summary.
> Read this first to find relevant pages for any query.
> Last updated: 2026-04-09 | Total pages: 28

## Entities
||[[ksanadock]] — 游戏开发商，时空码头
||[[microverse-project]] — Godot 4 多智能体 AI 社交模拟沙盒游戏
||[[microverse-code-structure]] — Microverse 代码结构 / 模块解析
||[[VoxCPM]] — OpenBMB 开源语音合成系统，Tokenizer-Free 架构支持 30 语言 + 9 种中文方言
||[[openbmb]] — 北京人工智能研究院 & 面壁智能，MiniCPM / VoxCPM 等模型背后的研究组织
>[[claude-code-game-studios]] — Claude Code Game Studios：49 Agent / 72 Skill 游戏开发工作流，MIT 开源
>[[open-source-games-list]] — GitHub 开源游戏精选列表：18+ 品类（FPS/RPG/RTS/ Roguelike/城市建造等），含源码链接

## Open Source Games
>[[open-source-game/corsixth]] — Theme Hospital 开源克隆，C++/Lua 混合架构，SDL 渲染，数据驱动游戏逻辑，完整战役可通关
>[[open-source-game/dead-ascend]] — Qt/QML 手绘点击冒险游戏，僵尸塔楼密室解谜，Tiled TMX 地图格式，跨平台（Linux/Mac/Win/Android/iOS）
>[[open-source-game/zelda3]] — Zelda A Link to the Past 完全重实现，70-80kLOC C 代码，SNES 仿真层+逐帧 RAM 验证
>[[open-source-game/the-legend-of-zelda-twilight-princess]] — Zelda TP 反向工程，字节级匹配反编译，多版本条件编译架构（Ninja构建）
>[[open-source-game/scummvm]] — 经典图形冒险引擎复刻，支持141+游戏引擎（SCUMM/Myst/Blade Runner等），GPLv3+
>[[open-source-game/pioneer]] — 31世纪银河太空冒险RPG，程序化星系/经济/派系系统，开放世界探索+贸易+战斗
>[[open-source-game/openloco]] — Chris Sawyer's Locomotion 清洁室逆向重实现，C++/SDL3，运输帝国经营模拟，正在开发多人网络模式
>[[open-source-game/openrct2]] — RollerCoaster Tycoon 2 开源重实现，游乐园建造管理模拟，C++20/CMake/Duktape JS插件引擎，TCP/IP多人合作

## Concepts

### Workflow & Architecture
>[[claude-code-game-studio-architecture]] — 49 Agent 层级结构、Model Tier 分配（Haiku/Sonnet/Opus）、五大协调规则、Subagents vs Agent Teams
>[[claude-code-game-studio-collaboration-protocol]] — Question → Options → Decision → Draft → Approval 工作流、文件写入协议、决策 UI 模式

### Engine & Language
[[godot-4]] — Godot 4 引擎：GDScript、Jolt Physics、XR、版本历史
[[gdscript-patterns]] — GDScript 10 种设计模式（单例/Signal/Lambda/寻路/物理检测）
[[godot-animation-system]] — AnimatedSprite2D 帧动画 + CharacterController 状态机

### AI & LLM
|[[llm-integration]] — 9 个 LLM Provider 统一接入（OpenAI/Claude/Gemini/DeepSeek 等）
|[[VoxCPM local deployment|VoxCPM 本地部署]] — VoxCPM 2 本地部署配置：Python/CUDA/GPU 显存要求及快速运行示例
[[multi-agent-ai-simulation]] — 多智能体 AI 通用概念：记忆/任务/感知/决策
[[multi-agent-ai-game-impl]] — Microverse 实现：感知→决策→记忆→任务→对话完整链路
[[persistent-memory-system]] — AI 角色长期记忆持久化（ChatHistory + 时间戳）
[[microverse-dialog-system]] — DialogService/ConversationManager/BackgroundStoryManager
[[stanford-generative-agents]] — Stanford Generative Agents（AI Town）Memory/Reflection/Planning

### Game Features
[[microverse-character-system]] — 8 角色人格/职位/说话风格（CharacterPersonality）
[[microverse-save-system]] — GameSaveManager JSON 存档（角色位置/任务/AI状态）

### Comparison
|[[godot-vs-unity-unreal]] — Godot vs Unity vs Unreal：许可/2D/3D/选型指南
|[[open-source-game-engines-comparison]] — 开源游戏引擎对比：Godot/Bevy/CUBE/Spring/OpenMW，含公司项目推荐
