# Wiki Log

> Chronological record of all wiki actions. Append-only.
> Format: `## [YYYY-MM-DD] action | subject`
> Actions: ingest, update, query, lint, create, archive, delete
> When this file exceeds 500 entries, rotate: rename to log-YYYY.md, start fresh.

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
- Created: entities/claude-code-game-studios.md (项目概览：49 agents, 72 skills, MIT license, 协作模式)
- Created: concepts/claude-code-game-studio-architecture.md (Agent 层级结构、Model Tier、五大协调规则、Subagents vs Agent Teams)
- Created: concepts/claude-code-game-studio-collaboration-protocol.md (Question→Options→Decision→Draft→Approval 协议、文件写入规则、决策 UI 模式)
## [2026-04-08] ingest | Open Source Games List 研究
- Captured: raw/articles/open-source-games-list-2026.md (克隆自 gitcode.com/GitHub_Trending/op/open-source-games)
- Created: entities/open-source-games-list.md (18+ 品类开源游戏列表：FPS/RPG/RTS/Roguelike/城市建造/赛车等)
- Created: comparisons/open-source-game-engines-comparison.md (开源游戏引擎对比：Godot/Bevy/CUBE/Spring/OpenMW，含公司技术栈推荐)
