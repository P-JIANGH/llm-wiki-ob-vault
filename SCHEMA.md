# Wiki Schema

## Domain
Project engineering notes and general learning — technical topics, tool workflows, architecture decisions, lessons learned, and knowledge accumulated across projects.

## Conventions
- File names: lowercase, hyphens, no spaces (e.g., `nextjs-api-design.md`)
- Every wiki page starts with YAML frontmatter (see below)
- Use `[[wikilinks]]` to link between pages (minimum 2 outbound links per page)
- When updating a page, always bump the `updated` date
- Every new page must be added to `index.md` under the correct section
- Every action must be appended to `log.md`
- raw/ directory is immutable — corrections go in wiki pages, never modify raw sources

## Frontmatter
  ```yaml
  ---
  title: Page Title
  created: YYYY-MM-DD
  updated: YYYY-MM-DD
  type: entity | concept | comparison | query | summary
  tags: [from taxonomy below]
  sources: [raw/articles/source-name.md]
  ---
  ```

## Tag Taxonomy
Add new tags here BEFORE using them.

**Topics:**
- project, architecture, backend, frontend, database, devops, infra, api, framework
- ai, llm, ml, agent, workflow, multimodal, vision, vlm, game-engine
- game, game-dev, game-genre, simulation, multiplayer, retro, modding
- multi-agent, reasoning, rag, evaluation, benchmark, fine-tuning, rlhf, distillation, quantization, moe, world-model, inference, on-device, edge, long-context
- vision-language, speech, computer-vision, semantic-search, vector-database, autonomous
- tts, asr, audio, music, voice-cloning, speech-synthesis
- image-generation, image-model, video-generation, video-model, 3d-generation, texture-generation
- coding, tool-calling, code-generation, code-completion, agentic-llm
- memory, context-compression, persistent-memory, long-context
- research, benchmark, evaluation, benchmark-construction
- design, ui, ux, tool, platform

**Tools & Tech:**
- tool, cli, script, automation
- netsuite, oracle, flowable, prisma, nextjs, python, typescript, docker
- rust, tauri, desktop-app, semantic-search, code, code-generation, code-completion
- image-generation, diffusion, autoregressive, flow-matching, 3d, video, audio, music, avatar, animation
- unity, godot, sdl2, bevy, panda3d, phaser, idtech, stratagus, ogre-next
- cpp, java, csharp, lua, javascript, kotlin, go, c, rust, objective-c, cython, lisp, webassembly
- electron, mobile, android, wasm, qt, qt6, blender, reverse-engineering, source-port, clean-room

**Game Genres:**
- fps, rts, rpg, platformer, roguelike, city-building, racing, simulation, strategy, adventure, puzzle, sandbox, mmo

**Organizations:**
- organization, company, research-lab, university
- chinese-llm, open-source-game, chinese

**Open Source & Licensing:**
- open-source, community-edition

**Meta:**
- notes, learning, how-to, reference, decision, retrospective, tip, pitfall

## Page Thresholds
- **Create a page** when an entity/concept appears in 2+ sources OR is central to one source
- **Add to existing page** when a source mentions something already covered
- **DON'T create a page** for passing mentions, minor details, or things outside the domain
- **Split a page** when it exceeds ~200 lines — break into sub-topics with cross-links
- **Archive a page** when its content is fully superseded — move to `_archive/`, remove from index

## Entity Pages
One page per notable entity. Include:
- Overview / what it is
- Key facts and dates
- Relationships to other entities ([[wikilinks]])
- Source references

## Concept Pages
One page per concept or topic. Include:
- Definition / explanation
- Current state of knowledge
- Open questions or debates
- Related concepts ([[wikilinks]])

## Comparison Pages
Side-by-side analyses. Include:
- What is being compared and why
- Dimensions of comparison (table format preferred)
- Verdict or synthesis
- Sources

## Update Policy
When new information conflicts with existing content:
1. Check the dates — newer sources generally supersede older ones
2. If genuinely contradictory, note both positions with dates and sources
3. Mark the contradiction in frontmatter: `contradictions: [page-name]`
4. Flag for user review in the lint report
