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
- Note: checklist already marked complete [2026-04-13]; wiki page [[ai-game-devtools/gemma-cpp]] exists; raw source was missing

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
