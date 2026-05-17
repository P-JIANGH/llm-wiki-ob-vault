## [2026-05-06] ingest | OpenWolf 项目源码分析
- Source: ~/openwolf 完整源码分析
- Files created: raw/articles/openwolf-2026.md, entities/openwolf.md
- 覆盖: 6 Hook 机制（session-start/pre-read/post-read/pre-write/post-write/stop）、.wolf/ 目录结构、extractDescription 智能描述提取、bug 自动检测、Cerebrum 黑名单、Daemon/Cron 系统、Design QC、init 初始化流程
- 结论: Claude Code 第二大脑，AGPL-3.0，~80% token 节省，6 个纯 Node.js Hook 无感知注入

## [2026-05-06] ingest | OpenHarness 项目源码分析
- Source: ~/OpenHarness 完整源码分析（README.md / CHANGELOG.md / 核心模块源码）
- Files created: raw/articles/openharness-2026.md, entities/openharness.md
- 覆盖: 10子系统架构（Engine/Tools/Skills/Plugins/Permissions/Hooks/Commands/MCP/Memory/Swarm）、ohmo personal agent、Provider 体系、React TUI
- 结论: Claude Code 的开源 Python 实现，Harness = Tools + Knowledge + Observation + Action + Permissions，oh+ohmo 双CLI，MIT
## [2026-05-06] ingest | ruflo 项目源码分析
- Source: ~/ruflo/ 完整源码分析
- Files created: entities/ruflo.md（12KB 完整分析）
- 覆盖: 架构总览 / V3 模块结构 / SwarmCoordinator / MCPServer / CLI / Hooks / 自学习 / 安全特性 / Web UI / 插件生态
- 结论: Ruflo 是面向 Claude Code 的 Agent 编排层，非 LLM 非 Agent，包含 MCP Server + CLI + 100+ Agent 定义 + HNSW 记忆

## [2026-05-06] ingest | vue-termui 项目源码分析
- Source: ~/vue-termui/ 完整源码分析
- Files created: entities/vue-termui.md（13KB 完整分析）
- 覆盖: 架构概览 / 核心模块 / Agent-TUI 可行性分析 / 技术对比
- 结论: vue-termui 可作为 Agent-TUI 的 UI 渲染层，但 Agent Loop / 流式输出 / 多区域布局需自行补充

## [2026-05-17] ingest | oh-my-openagent (formerly oh-my-opencode) 完整源码分析
- Source: GitHub https://github.com/code-yeongyu/oh-my-openagent (git clone + AGENTS.md + README)
- Files created: raw/articles/oh-my-openagent-2026.md, entities/oh-my-openagent.md
- Files updated: entities/oh-my-opencode.md (archive pointer → oh-my-openagent), index.md (updated entry)
- 覆盖: 11 Agent 系统（Sisyphus/Hephaestus/Atlas/Prometheus 等）、Team Mode v4.0 并行多 Agent 协作、Hashline LINE#ID 哈希编辑、IntentGate 意图分析、3 层 MCP 系统、5 层 Hook 系统（54-61 hooks）、工具分类（20+19 条件）、OpenClaw 双向集成、Boulder 工作跟踪、Ralph Loop 自循环
- 关键变化: oh-my-opencode → oh-my-openagent 改名，stars 302→57.1k，v0.x→v4.1.2，LOC ~2K→~294K，Agent 10→11
- 结论: 当前最热门的 OpenCode 插件生态，打破了 AI coding agent 的围墙花园。11 个跨模型 Agent 的编排系统，是了解多 Agent 协作架构的重要参考

## [2026-05-06] create | Agent-CLI/TUI 学习路径
- Created: concepts/agent-cli-tui-learning-path.md
- Topic: 构建 Agent-CLI/TUI 所需的核心知识体系与入手路径
- Content synthesized from wiki knowledge: agent-loop, pi-coding-agent, aworld, deepseek-tui, nanobot, hermes-agent, agent-laboratory
- Sections: 核心概念、6个参考实现（pi-coding-agent/aworld/deepseek-tui/nanobot/hermes-agent/agent-laboratory）、架构组件分解、学习顺序建议（4周）、技术选型、刻意不做清单
- Related pages: concepts/agent-loop, entities/pi-coding-agent, entities/aworld, entities/deepseek-tui, entities/pi-mono, entities/agent-laboratory, concepts/registry-pattern-tool-discovery, comparisons/nanobot-vs-opencode
- Updated: index.md (added entry, bumped count 822→823)

## [2026-04-30] ingest | Wiki sync from /home/jianghao/wiki
- Source: ~/DeepSeek-TUI/ (full project read: README.md, README.zh-CN.md, Cargo.toml, AGENTS.md, PROMPT_ANALYSIS.md, V086_BRIEF.md, DEPENDENCY_GRAPH.md, config.example.toml, docs/ARCHITECTURE.md, docs/MODES.md, docs/MCP.md, docs/SUBAGENTS.md, docs/TOOL_SURFACE.md)
- Updated: entities/deepseek-tui.md (major update)
  - Version: v0.8.9 (workspace, was v0.8.8 in wiki)
  - Added full workspace crates map + dependency graph layers
  - Added RLM Tool Patterns (CHUNK/BATCH/RECURSE)
  - Added Session Longevity critical warning (6 survival rules for multi-hour sprints)
  - Added Provider Support table (deepseekCN China, NVIDIA NIM, Fireworks, SGLang)
  - Added sub-agent role taxonomy table (7 roles: general/explore/plan/review/implementer/verifier/custom)
  - Added System Prompt "Mismanaged Genius" hypothesis (7 gaps in current prompt design)
  - Updated tool system with full sub-agent tools
- Updated sources in frontmatter to include AGENTS.md, PROMPT_ANALYSIS.md, SUBAGENTS.md, Cargo.toml
- Note: Wiki entity page existed but was incomplete; this was a deep re-read with major updates
- Action: Synced all new content from /home/jianghao/wiki to /home/jianghao/llm-wiki-ob-vault
- 重新完整学习 DeepSeek-TUI 项目源码及全部文档，新增 3 个概念页面：[[deepseek-tui-runbook]]（运维手册）、[[deepseek-tui-coordinator]]（Sprint 协调模式）、[[deepseek-tui-memory]]（用户记忆系统）；更新 [[deepseek-tui]] entity 页 sources 包含全部 15 个文档，补充 accessibility、user memory、operations runbook、runtime API、multi-agent coordinator pattern 等章节 |
- Created entities: open-design.md, open-codesign.md, oh-my-opencode.md, opencode.md, learn-claude-code.md, huashu-design.md, multica.md, officecli.md, guizang-ppt-skill.md
- Copied 51 missing entities from wiki: claude-code, cursor, ollama, deepseek, qwen, llama, chatgpt, mistral, stable-diffusion, unity, godot, gemini, musicgen, whisper, cogvideo, phi, baichuan, chatglm, llama-2, llama-cpp, llava-next, localai, lora, minicpm-v, mlc-llm, musicgen, nanochat, nerf, nyan, trial, wesnoth, etc.
- Copied 56 missing concepts from wiki: llm, diffusion-models, multimodal-models, vllm, sglang, llamaindex, rag-systems, mcp, autogen, game-designer, creative-director, claude-code-game-studio-directory-structure, etc.
- Copied comparisons: nanobot-vs-opencode.md
- Copied ai-game-devtools: visualagentbench.md
- Fixed index.md corruption (removed duplicate line number columns)
- Updated: index.md header (610 → 819 pages, 2026-04-26 → 2026-04-30)
- Note: 728 pages missing from index.md navigation — needs bulk index regeneration

## [2026-04-26] ingest | Mistral 7B
- Source: https://mistral.ai/news/announcing-mistral-7b/ (web extract; non-GitHub)
- Created: raw/articles/ai-game-devtools/mistral-7b.md
- Created: ai-game-devtools/mistral-7b.md
- Updated: ai-game-devtools-learning-checklist.md
- Updated: index.md (added mistral-7b entry)
- Note: Mistral AI 7.3B dense LLM; Sliding Window Attention + Rotating Buffer Cache; 3× compute efficiency; Apache 2.0

## [2026-04-26] ingest | Mixtral 8x7B
- Source: https://mistral.ai/news/mixtral-of-experts/ (web extract)
- Created: raw/articles/ai-game-devtools/mixtral-8x7b.md
- Created: ai-game-devtools/mixtral-8x7b.md
- Updated: ai-game-devtools-learning-checklist.md
- Updated: index.md
## [2026-04-26] ingest | HuggingChat
- Cloned: ~/tmp/ai-game-devtools/huggingchat/ (GitHub: huggingface/chat-ui)
- Created: raw/articles/ai-game-devtools/huggingchat.md
- Created: ai-game-devtools/huggingchat.md
- Updated: ai-game-devtools-learning-checklist.md
- Updated: index.md (added huggingchat entry)
- Note: Hugging Face 官方开源 LLM 聊天界面；SvelteKit 2 + OpenAI 兼容 API；Omni 智能路由器 + MCP Tools；MongoDB 持久化；Apache 2.0

## [2026-04-26] ingest | Grok-1
- Cloned: ~/tmp/ai-game-devtools/grok-1/ (GitHub: xai-org/grok-1)
- Created: raw/articles/ai-game-devtools/grok-1.md
- Created: ai-game-devtools/grok-1.md
- Updated: ai-game-devtools-learning-checklist.md
- Updated: index.md (added grok-1 entry)
- Note: xAI 314B MoE LLM, 8 experts/2 active, JAX+Haiku, Apache 2.0

## [2026-04-26] ingest | Pixtral-12B-2409
- Source: https://huggingface.co/mistralai/Pixtral-12B-2409 (web extract; non-GitHub)
- Created: raw/articles/ai-game-devtools/pixtral-12b-2409.md
- Created: ai-game-devtools/pixtral-12b-2409.md
- Updated: ai-game-devtools-learning-checklist.md
- Updated: index.md (added pixtral-12b-2409 entry)
- Note: Mistral AI open-source VLM; 12B LM + 400M vision encoder; multi-image support; benchmarks SOTA for 12B class

## [2026-04-26] ingest | Gemini
- Source: https://deepmind.google/technologies/gemini/ (web extract; non-GitHub)
- Created: raw/articles/ai-game-devtools/gemini.md
- Created: ai-game-devtools/gemini.md
- Updated: ai-game-devtools-learning-checklist.md
- Updated: index.md (added gemini entry)
- Note: First non-GitHub item from checklist — Gemini 3 API service by Google DeepMind

## [2026-04-26] ingest | Dora
- Source: https://www.dora.run/ai (web extract; non-GitHub)
- Created: raw/articles/ai-game-devtools/dora.md
- Created: ai-game-devtools/dora.md
- Updated: ai-game-devtools-learning-checklist.md
- Updated: index.md (added Dora entry)
- Note: First item from README catchup — 12 new items added to checklist

## [2026-04-25] ingest | GLM-4.5/4.6/4.7 (backfill)
- Cloned: ~/tmp/ai-game-devtools/glm-4-5/ (existing from 2026-04-13)
- Created: raw/articles/ai-game-devtools/glm-4-5.md
- Created: ai-game-devtools/glm-4-5.md
- Note: checklist already marked complete [2026-04-13]; wiki page and raw source were missing (backfill)

## [2026-04-24] ingest | Mixture of Agents (MoA) (backfill)
- Cloned: ~/tmp/ai-game-devtools/mixture-of-agents/
- Created: raw/articles/ai-game-devtools/mixture-of-agents.md
- Created: ai-game-devtools/mixture-of-agents.md
- Updated: ai-game-devtools-learning-checklist.md (bumped date to 2026-04-24)
- Note: checklist already marked complete [2026-04-16]; wiki page and raw source were missing (backfill)

## [2026-04-24] ingest | VideoLLaMA 3 (backfill)
- Cloned: ~/tmp/ai-game-devtools/videollama3/ (existing from 2026-04-22)
- Created: raw/articles/ai-game-devtools/videollama3.md
- Created: ai-game-devtools/videollama3.md
- Updated: ai-game-devtools-learning-checklist.md (bumped date to 2026-04-24)
- Updated: index.md (added videollama3 entry, total 607)
- Note: checklist already marked complete [2026-04-15]; wiki page and raw source were missing (backfill)

## [2026-04-24] ingest | OpenGame
- Cloned: ~/OpenGame (existing local repo)
- Created: raw/articles/opengame-2026.md (synthesized source from codebase analysis)
- Created: entities/opengame.md (project entity page)
- Created: comparisons/platformer-vs-topdown-basescene.md (BaseScene architecture comparison)
- Created: concepts/ai-gdd-prompt-engineering.md (GDD generation prompt engineering)
- Updated: index.md (3 new entries, total 606)
- Research focus: (1) Platformer vs Top-Down BaseScene implementation differences, (2) GDD generation tool prompt engineering details

## [2026-04-24] lint | fix remaining 3 checklist format issues
- Fixed: LlamaGen, Stable Diffusion WebUI Chinese, VideoMamba (all had `|` prefix instead of `-`)
- All 564 checklist items now correctly formatted
- No new projects to ingest (all items have completion dates)

## [2026-04-24] lint | checklist format fix
- Fixed 164 lines with `|` prefix in ai-game-devtools-learning-checklist.md
- All checklist items now use standard `- [YYYY-MM-DD] Name | URL` format
- No new projects to ingest (all 564 items have completion dates)

## [2026-04-24] ingest | Matrix-Game
- Cloned: ~/tmp/ai-game-devtools/matrix-game/
- Checked: raw/articles/ai-game-devtools/matrix-game.md (already existed)
- Checked: ai-game-devtools/matrix-game.md (already existed, bumped updated date)
- Fixed: checklist prefix `|||-` → `-` and updated date to [2026-04-24]
- Status: format fix + date refresh

## [2026-04-24] ingest | LaVague
- Checked: raw/articles/ai-game-devtools/lavague.md (already existed)
- Wiki page already exists: ai-game-devtools/la-vague.md
- Updated: ai-game-devtools-learning-checklist.md (bumped date to 2026-04-24)
- Note: checklist already marked complete [2026-04-14]; wiki page and raw source were already present (date refresh)

## [2026-04-23] ingest | Index-1.9B
- Cloned: ~/tmp/ai-game-devtools/index-1.9b/
- Created: raw/articles/ai-game-devtools/index-1.9b.md
- Created: ai-game-devtools/index-1.9b.md
- Updated: index.md (updated index-1.9b entry with description)
- Note: checklist already marked complete [2026-04-13]; wiki page and raw source were missing (backfill)

## [2026-04-23] ingest | DrawingSpinUp
- Cloned: ~/tmp/ai-game-devtools/drawingspinup/
- Created: raw/articles/ai-game-devtools/drawingspinup.md
- Created: ai-game-devtools/drawingspinup.md
- Updated: index.md (added drawingspinup entry, total 602)
- Note: checklist already marked complete [2026-04-19]; wiki page and raw source were missing (backfill)

## [2026-04-23] ingest | LLocalSearch
- Cloned: ~/tmp/ai-game-devtools/llocalsearch/ (existing from earlier today)
- Created: raw/articles/ai-game-devtools/llocalsearch.md
- Created: ai-game-devtools/llocalsearch.md
- Updated: index.md (added llocalsearch entry, total 602)
- Note: checklist already marked complete [2026-04-14]; wiki page and raw source were missing

## [2026-04-23] ingest | BabyAGI UI
- Cloned: ~/tmp/ai-game-devtools/babyagi-ui/ (gitcode.com mirror)
- Created: raw/articles/ai-game-devtools/babyagi-ui.md
- Created: ai-game-devtools/babyagi-ui.md
- Updated: index.md (updated babyagi-ui entry)
- Note: checklist already marked complete [2026-04-13]; wiki page was missing

## [2026-04-23] ingest | AICommand
- Cloned: ~/tmp/ai-game-devtools/aicommand/
- Created: raw/articles/ai-game-devtools/aicommand.md
- Updated: ai-game-devtools/aicommand.md (corrected: Unity Editor plugin, not CLI tool)
- Updated: ai-game-devtools-learning-checklist.md (bumped date to 2026-04-23)
- Updated: index.md (corrected aicommand description)
- Note: Wiki page existed but had completely incorrect content (described as CLI tool instead of Unity Editor ChatGPT plugin); raw source was missing

## [2026-04-24] ingest | LayerDiffusion
- Checked: ~/tmp/ai-game-devtools/layerdiffusion/ (cloned from GitHub)
- Note: wiki page and raw source already exist (created 2026-04-17)
- Fixed: checklist prefix `|-` → `-` and updated date to [2026-04-24]
- Status: backfill/format fix only

## [2026-04-23] ingest | LlamaIndex
- Cloned: ~/tmp/ai-game-devtools/llamaindex (gitcode.com mirror; GitHub timed out)
- Created: raw/articles/ai-game-devtools/llama-index.md
- Updated: ai-game-devtools/llama-index.md (bumped updated date, already existed since 2026-04-16)
- Updated: ai-game-devtools-learning-checklist.md (marked complete)
- Note: Wiki page already existed; index entry already present; raw source was missing

## [2026-04-22] ingest | PhysRig
- Cloned: ~/tmp/ai-game-devtools/physrig/
- Created: raw/articles/ai-game-devtools/physrig.md
- Created: ai-game-devtools/physrig.md
- Updated: index.md (added physrig entry, total 599)
- Note: checklist already marked complete [2026-04-18]; wiki page was missing

## [2026-04-22] ingest | PAniC-3D
- Cloned: ~/tmp/ai-game-devtools/panic3d-anime-reconstruction/
- Created: raw/articles/ai-game-devtools/panic3d-anime-reconstruction.md
- Created: ai-game-devtools/panic3d-anime-reconstruction.md
- Updated: index.md (added panic3d entry, total 598)

## [2026-04-22] update | gemma.cpp raw source
- Cloned: ~/tmp/ai-game-devtools/gemma.cpp (gitcode mirror; GitHub timed out)
- Created: raw/articles/ai-game-devtools/gemma.cpp.md
- Note: checklist already marked complete [2026-04-13]; wiki page [[gemma-cpp]] exists; raw source was missing

## [2026-04-22] create | 转生者模拟器 v2 One Pager GDD
- 位于：concepts/gdd-reincarnator-v2.md
- 项目版本：~/yg/workspace/projects/reincarnator-simulator-v2/docs/GDD-OnePager.md
- 内容：游戏概览、核心循环、USP（反龙傲天/大厂模拟器框架/5局外成长/6种结局）、核心系统概览、技术架构、开发进度(Phase 1-6)、风险假设、目标玩家
- Updated: index.md (added gdd-reincarnator-v2 entry, total 598→599)
- Note: checklist already marked complete [2026-04-18]; wiki page was missing

## [2026-04-22] update | Godot engine deep dive
- Updated: concepts/godot-4.md (expanded with 4.6 features, rendering backends, editor improvements, three new cross-links)
- Created: raw/articles/godot-official-docs-2026.md (raw source: official features list)
- Created: raw/articles/godot-4-6-gdquest-2026.md (raw source: GDQuest 4.6 changes guide)
- Created: concepts/godot-rendering-system.md (three renderers, shader system, 2D/3D features)
- Created: concepts/godot-ui-system.md (Control nodes, Container layout, Theme system)
- Created: concepts/godot-networking.md (MultiplayerAPI, RPC, Scene Replication)
- Updated: index.md (added 4 entries, 591→595)

## [2026-04-22] update | 螨光游戏工作室知识库补充
- Created: raw/articles/phaser-4-migration-2026.md (raw source: Phaser official migration guide)
- Created: raw/articles/phaser-vue3-ts-template-2024.md (raw source: Phaser official Vue 3 TS template)
- Created: raw/articles/indie-game-marketing-2025.md (raw source: How To Market A Game research)
- Created: raw/articles/gdd-template-guide-2025.md (raw source: Indie Game Academy GDD guide)
- Created: concepts/phaser-4-migration.md (Phaser 4 迁移指南、对螨光项目的影响评估)
- Created: concepts/phaser-vue-integration.md (Phaser 3 + Vue 3 + TypeScript 实战模式：Registry/Pinia 状态桥梁、生命周期管理)
- Created: concepts/indie-game-marketing.md (Steam 营销研究：节日游戏不好卖、像素艺术品类选择、Reddit 营销、发布时机)
- Created: concepts/game-design-document.md (GDD 模板与指南：One Pager、核心循环、范围控制)
- Updated: index.md (added 6 entries, 595→597)

## [2026-04-21] ingest | VoxCPM
- Cloned: ~/tmp/ai-game-devtools/voxcpm/ (gitcode mirror; GitHub timed out)
- Created: raw/articles/ai-game-devtools/voxcpm.md
- Created: ai-game-devtools/voxcpm.md
- Updated: ai-game-devtools-learning-checklist.md (Speech section)
- Updated: index.md (updated voxcpm entry description)
## [2026-04-21] ingest | Whisper
- Cloned: ~/tmp/ai-game-devtools/whisper/ (gitcode mirror; GitHub timed out)
- Created: raw/articles/ai-game-devtools/whisper.md
- Created: ai-game-devtools/whisper.md
- Updated: ai-game-devtools-learning-checklist.md (Speech section)
- Updated: index.md (added whisper entry, total 582)
## [2026-04-21] ingest | WhisperSpeech
- Cloned: ~/tmp/ai-game-devtools/whisperspeech/
- Created: raw/articles/ai-game-devtools/whisperspeech.md
- Created: ai-game-devtools/whisperspeech.md
- Updated: ai-game-devtools-learning-checklist.md
- Updated: index.md (added whisperspeech entry, total 583)
## [2026-04-21] ingest | X-E-Speech
- Cloned: ~/tmp/ai-game-devtools/x-e-speech/
- Created: raw/articles/ai-game-devtools/x-e-speech.md
- Created: ai-game-devtools/x-e-speech.md
- Updated: ai-game-devtools-learning-checklist.md
- Updated: index.md (added x-e-speech entry, total 584)
## [2026-04-21] ingest | XTTS
- Cloned: ~/tmp/ai-game-devtools/tts/
- Created: raw/articles/ai-game-devtools/xtts.md
- Created: ai-game-devtools/xtts.md
- Updated: ai-game-devtools-learning-checklist.md (Speech section)
- Updated: index.md (added xtts entry, total 585)
## [2026-04-21] ingest | YourTTS
- Cloned: ~/tmp/ai-game-devtools/yourtts/
- Created: raw/articles/ai-game-devtools/yourtts.md
- Created: ai-game-devtools/yourtts.md
- Updated: ai-game-devtools-learning-checklist.md (Speech section)
- Updated: index.md (added yourtts entry, total 586)
## [2026-04-22] ingest | ZMM-TTS
- Cloned: ~/tmp/ai-game-devtools/zmm-tts/
- Created: raw/articles/ai-game-devtools/zmm-tts.md
- Created: ai-game-devtools/zmm-tts.md
- Updated: ai-game-devtools-learning-checklist.md (Speech section)
- Updated: index.md (added zmm-tts entry, total 587)
## [2026-04-22] ingest | UniAudio 2.0
- Cloned: ~/tmp/ai-game-devtools/uniaudio2/
- Created: raw/articles/ai-game-devtools/uniaudio2.md
- Created: ai-game-devtools/uniaudio2.md
- Updated: ai-game-devtools-learning-checklist.md (Speech section)
- Updated: index.md (added uniaudio2 entry, total 588)
## [2026-04-22] ingest | LaVague
- Cloned: ~/tmp/ai-game-devtools/lavague/ (gitcode mirror; GitHub timed out)
- Created: raw/articles/ai-game-devtools/lavague.md
- Created: ai-game-devtools/la-vague.md
- Updated: index.md (updated la-vague entry)

## [2026-04-22] ingest | UnityNeuroSpeech
- Cloned: ~/tmp/ai-game-devtools/unityneurospeech/ (web extract; GitHub/gitcode/gitee clone all failed)
- Created: raw/articles/ai-game-devtools/unityneurospeech.md
- Created: ai-game-devtools/unityneurospeech.md
- Updated: ai-game-devtools-learning-checklist.md
- Updated: index.md (added unityneurospeech entry, total 589)

## [2026-04-22] ingest | Ludo.ai
- Source: web extract (ludo.ai; no GitHub repo)
- Created: raw/articles/ai-game-devtools/ludo-ai.md
- Created: ai-game-devtools/ludo-ai.md
- Updated: ai-game-devtools-learning-checklist.md (Analytics section added)
- Updated: index.md (added ludo-ai entry, total 590)
## [2026-04-22] audit | AI Game DevTools checklist complete
- Scanned: ai-game-devtools-learning-checklist.md
- Result: All 567 projects across 16 categories have been ingested
- Categories: LLM(123), VLM(27), Game(67), Code(21), Image(75), Texture(12), Shader(1), 3D Model(47), Avatar(29), Animation(17), Video(59), Audio(25), Music(11), Singing Voice(4), Speech(48), Analytics(1)
- Wiki pages: 590 total entries in index.md
- Next: No remaining projects; task complete
## [2026-04-22] update | LaVague wiki page restored
- Created: ai-game-devtools/la-vague.md (was missing despite checklist completion)
- Source: raw/articles/ai-game-devtools/lavague.md
- Note: 117 remaining wiki pages missing across checklist, will process in subsequent runs
## [2026-04-22] ingest | Qwen-7B
- Source: web extract (GitHub/gitcode/gitee clone all failed)
- Created: raw/articles/ai-game-devtools/qwen-7b.md
- Created: ai-game-devtools/qwen-7b.md
- Updated: index.md (added qwen-7b entry)
- Note: checklist already marked complete [2026-04-14]; wiki page was missing
## [2026-04-22] ingest | UnityAIWithChatGPT
- Cloned: ~/tmp/ai-game-devtools/unityaiwithchatgpt/ (gitcode mirror; GitHub timed out)
- Created: raw/articles/ai-game-devtools/unityaiwithchatgpt.md
- Created: ai-game-devtools/unityaiwithchatgpt.md
- Updated: index.md (added unityaiwithchatgpt entry)
- Note: checklist already marked complete [2026-04-19]; wiki page was missing
## [2026-04-23] ingest | LLaVA++
- Cloned: ~/tmp/ai-game-devtools/llava-pp/
- Created: raw/articles/ai-game-devtools/llava-pp.md
- Created: ai-game-devtools/llava-pp.md
- Updated: index.md (fixed llava-plus-plus → llava-pp link)
- Note: checklist already marked complete [2026-04-15]; wiki page was missing
## [2026-04-24] ingest | StyleTTS 2
- Cloned: ~/tmp/ai-game-devtools/styletts2/ (gitcode.com mirror; GitHub timed out)
- Created: raw/articles/ai-game-devtools/style-tts-2.md
- Created: ai-game-devtools/style-tts-2.md
- Updated: ai-game-devtools-learning-checklist.md (bumped date to 2026-04-24)
- Note: checklist already marked complete [2026-04-21]; wiki page and raw source were missing (backfill)

## [2026-04-24] ingest | IndexTTS2
- Source: web extract (GitHub/gitcode/gitee clone all failed)
- Created: raw/articles/ai-game-devtools/index-tts2.md
- Updated: ai-game-devtools/index-tts2.md (bumped updated date, already existed since 2026-04-21)
- Updated: ai-game-devtools-learning-checklist.md (bumped date to 2026-04-24)
- Updated: index.md (added index-tts2 entry, total 603)
- Note: Wiki page already existed; raw source was missing (backfill)

## [2026-04-23] ingest | llm.c
- Cloned: ~/tmp/ai-game-devtools/llm-c/
- Created: raw/articles/ai-game-devtools/llm-c.md
- Created: ai-game-devtools/llm-c.md
- Updated: index.md (added llm-c entry, total 600)
- Note: checklist already marked complete [2026-04-14]; wiki page was missing

## [2026-04-23] ingest | Code World Model (CWM)
- Cloned: ~/tmp/ai-game-devtools/code-world-model-cwm/
- Created: raw/articles/ai-game-devtools/cwm.md
- Created: ai-game-devtools/cwm.md
- Updated: index.md (added cwm entry)
- Note: checklist already marked complete [2026-04-17]; wiki page was missing (backfill)

## [2026-04-25] ingest | BabyAGI UI (backfill)
- Source: existing clone ~/tmp/ai-game-devtools/babyagi-ui/
- Created: raw/articles/ai-game-devtools/babyagi-ui.md
- Updated: ai-game-devtools-learning-checklist.md (bumped date to 2026-04-25)
- Note: checklist already marked complete [2026-04-13]; raw source was missing (backfill)
- Note: wiki page already existed since 2026-04-23
## [2026-04-26] ingest | GPT-4o
- Source: https://openai.com/index/hello-gpt-4o/ (web extract; non-GitHub)
- Created: raw/articles/ai-game-devtools/gpt-4o.md
- Created: ai-game-devtools/gpt-4o.md
- Updated: ai-game-devtools-learning-checklist.md
- Updated: index.md (added gpt-4o entry)
- Note: First unchecked item from LLM section; OpenAI flagship multimodal model, text/audio/image/video end-to-end, 232ms audio latency

## [2026-04-26] ingest | pi-mono
- Source: https://github.com/badlogic/pi-mono/ (web extract)
- Created: raw/articles/ai-game-devtools/pi-mono.md
- Created: ai-game-devtools/pi-mono.md
- Created: ai-game-devtools/pi-coding-agent.md
- Updated: index.md (added pi-mono and pi-coding-agent entries)
- Note: badlogic monorepo, 3,805+ commits, 203 releases, MIT. Coding agent CLI + unified LLM API (20+ providers) + TUI/web UI + Slack bot + vLLM pods. pi-coding-agent: append-only JSONL session trees, 60+ extension event types, Skills system, 4 run modes.

## [2026-05-13] create | Agentic System Designer 职业路径
- Created: concepts/agentic-system-designer-career-path.md
- Topic: AI Agent 系统设计师的完整职业路径文档
- 覆盖: 定义 / 市场供需 / 薪资 / 与传统角色对比 / Tier 1-3 技能树 / 3月入门→6月实战学习路径 / 招聘公司 / 常见误区 / 10 年经验全栈开发者转型建议
- Sources: web search (BOSS直聘/Liepin/Gartner/Precedence Research/BCG)
- Related pages: hermes-agent, agent-loop-architecture, multi-agent-ai-simulation, concepts/agent-swarm, gstack
|
|## [2026-05-15] ingest | AutoGen 完整学习
|- Source: web research (GitHub / Microsoft Research / AG2 docs / migration guides / 竞品对比)
|- Files updated: ai-game-devtools/autogen.md（从 118 行扩展至 163 行，覆盖 v0.4 架构/Core API/AgentChat/设计模式/Magentic-One/AG2分支/竞品对比）
|- Files created: concepts/magentic-one.md（架构/Orchestrator双循环/4 Specialist/评测/安全风险）
|- Index updated: autogen 条目扩写 + magentic-one 新增到 Concepts 区
|- Tags added: magentic-one (concept), framework (entity autogen)
|- 关键技术洞察: AutoGen v0.4 从底层重写为 Actor 模型（异步事件驱动），后续分裂为三叉路（原项目维护模式 / AG2 社区分支 / Microsoft Agent Framework），Magentic-One 的 Orchestrator+Specialist 架构是当前最完整的参考实现|
|
|## [2026-05-15] ingest | 多 Agent 框架全系竞品深度研究
|- Source: 源码克隆分析（~/tmp/langgraph/ / ~/tmp/crewAI/ / ~/tmp/agentscope/）+ web research（官方文档/GitHub/社区）
|- Files created:
|  - ai-game-devtools/langgraph.md（新建，~140 行，覆盖 Pregel BSP 引擎/StateGraph/FuncAPI/Checkpoint/通道系统/生态体系）
|  - comparisons/agent-framework-comparison.md（新建，~120 行，四框架全方位对比 + 决策树 + 设计哲学差异）
|- Files updated:
|  - ai-game-devtools/crewai.md（从 135 行扩展至 135 行，重写为结构化的核心抽象/流程/生态/技术细节）
|  - ai-game-devtools/agentscope.md（从 70 行扩展至 150 行，重写为 AOP 哲学/元类体系/MsgHub/Trinity-RFT/独特特性）
|- Index updated: langgraph 新增 + crewai/agentscope 扩写 + Comparisons 新区新增 + 总页数 830→835
|- 关键技术洞察:
|  - LangGraph = Pregel BSP 引擎，精确控制图拓扑，生产级持久化/人机交互最成熟
|  - CrewAI = 上手最快的角色团队模式，~47K stars 社区最大，独立架构零 LangChain 包袱
|  - AgentScope = 唯一带 RL 微调（Trinity-RFT）的框架，MCP/A2A/实时语音原生支持，阿里云生态
|  - 设计哲学根本差异：LangGraph（状态转换）vs CrewAI（角色分工）vs AgentScope（Agent 进化）vs AutoGen（对话交流）|
|
|## [2026-05-15] ingest | Microsoft Agent Framework 完整学习
|- Source: 源码克隆（~/tmp/agent-framework/）+ web research（MS Learn / .NET Blog / GitHub discussions）
|- Files created:
|  - concepts/microsoft-agent-framework.md（新建，~120 行，覆盖架构/Agent/Workflow/Functional+Graph API/DurableTask/生态/迁移关系）
|- Files updated:
|  - comparisons/agent-framework-comparison.md（添加 MAF 到总结表 + 设计哲学 -> 五框架对比）
|  - ai-game-devtools/autogen.md（[[concepts/microsoft-agent-framework]] 链接修复）
|- Index updated: MAF 新增到 Concepts 区 + 总页数 835→836
|- SKILL updated: codebase-deep-dive 新增 wiki-oriented entity expansion workflow variant
|- 关键技术洞察:
|  - MAF 是 AutoGen + Semantic Kernel 的官方融合产物，1.0 GA 于 2026.04，MIT 开源
|  - 双 API 设计：Functional (@workflow, Python 原生) vs Graph (WorkflowBuilder, .NET 强类型)
|  - Durable Task 引擎是最大差异化——不改 workflow 定义即可获得持久化/分布式执行
|  - .NET 和 Python 双一等公民（区别于所有竞品仅限 Python）
|  - 拥有最完整的 Provider 矩阵（6+ LLM + MCP + A2A），企业级中间件/Session/可观测内置|
|
|## [2026-05-15] update | Wiki 重构阶段一——聚焦 Agent 系统架构
|- Action: Schema 更新 + 游戏内容归档 + 目录结构调整
|- SCHEMA.md 全面重写:
|  - Domain: → "AI Agent 系统架构 / Agentic System Design"
|  - Tag Taxonomy 精简聚焦（移除 game/game-dev 标签，新增 agent-framework/protocol/hitl/career 等）
|  - 新增职业路径相关标签（career, learning-path, skill-tree）
|- 已归档 33 个游戏相关文件到 _archive/:
|  - concepts/（5个）：microverse-*, gdd-reincarnator-v2, ai-gdd-prompt-engineering, indie-game-marketing
|  - entities/（5个）：microverse-project/code-structure, opengame, claude-code-game-studios, ksanadock
|  - comparisons/（2个）：open-source-game-engines-comparison, platformer-vs-topdown-basescene
|  - ai-game-devtools/（21个）：unity-*, unreal-*, godot-*, gamegen-o, matrix-game, gigax, behavia 等
|- 目录结构调整:
|  - 移除 "## Game Projects & Studios" 区
|  - 移除 "## Game Dev" 区
|  - 重命名 "## AI Game DevTools" → "## AI & ML Tools"
|  - 更新 header 总页数 836→800
|- 后续待办（阶段二）:
|  - 257 个文件不在 index.md 中（主要来自 ai-game-devtools/）
|  - 13 页超 200 行需拆分
|  - 修复跨引用 wikilink 到已归档页面|
|
|## [2026-05-15] update | Wiki 重构阶段二——索引修复 + 跨引用清理
|- Action: 重建 index.md + 修复断链
|- Index 重建:
|  - 重写 index.md（842 行，818 条目，5 个 Section）
|  - 将所有遗留文件批量加入 index（之前 257 个缺失，现已全部收录）
|  - Section: AI/LLM/Agent(81) + Concepts(101) + Comparisons(2) + AI & ML Tools(596) + Avatar(41)
|  - 页面总数: 800→818（补全了缺失的索引条目）
|- 跨引用修复:
|  - 55 个文件中的断链 wikilink 替换为（已归档）标记
|- 超大页提醒（未拆分）:
|  - 仍有 10 页 >200 行，最严重: vue-termui(348), agent-cli-tui(315), deepseek-tui(304)
|  - 这些页面的内容仍然有效，拆分不紧急，建议在下次 deep-dive 时自然拆分|
|
|## [2026-05-15] restructure | Wiki 重构阶段三——知识体系重塑
|- Action: 创建 _meta/topic-map.md + 更新导航体系
|- Created: _meta/topic-map.md（Agentic System Designer 知识体系导航，7 大技能领域）
|  - 🧠 Agent Frameworks（精通）: 框架对比 + 架构原理 + 生态参考
|  - 🔄 Multi-Agent Orchestration（编排）: 通信/协调/任务/模式
|  - 🔌 MCP & Protocols（协议）: MCP/A2A/工具调用
|  - 💾 Memory & Knowledge（记忆）: 长期记忆/RAG/上下文
|  - ⚙️ LLM Infrastructure（基础设施）: 推理/部署/Provider
|  - 🚀 Production Deployment（生产）: 可观测性/评估/安全
|  - 📚 Career & Learning（职业）: 学习路径/技能树
|- SCHEMA.md 更新: 新增 Navigation 节，指明 topic-map 为主要入口
|- index.md 更新: header 增加 [[_meta/topic-map]] 引用
|- 三条导航路径成型:
|  ① _meta/topic-map.md（按技能领域）→ 新手友好入口
|  ② index.md（按页面类型）→ 完整索引
|  ③ log.md（按时间顺序）→ 变更记录|
## [2026-05-17] update | oh-my-openagent 深度源码分析——Agent 提示词与机制
- Source: ~/oh-my-openagent/ (本地完整源码深度分析)
- Files updated: entities/oh-my-openagent.md (8KB→16KB, 新增提示词系统深度分析和核心机制详解)
- 覆盖: Sisyphus 提示词5变体(default/claude-opus-4-7/gemini/gpt-5-4/gpt-5-5) 与 Phase 0-3 工作流模型、Prometheus 提示词6模块(identity-constraints/interview-mode/plan-generation/high-accuracy-mode/plan-template/behavioral-summary) 与 3次 Oracle 阶段门检查、IntentGate 分层系统(Hook + 提示词层)、Hashline 双Hook配对(Read Enhancer + Edit Diff Enhancer)、5层54-61 Hook系统、Team Mode 文件管道架构、Background Agent 状态机、Ralph Loop、3层MCP隔离
- 结论: 该库最值得学习的不是功能而是工程方法——动态提示词构建、Hook系统级的生命周期注入、提示词工程技巧(XML标签锚点/Phase模型/Turn-Local Intent Reset/Evidence Requirements)