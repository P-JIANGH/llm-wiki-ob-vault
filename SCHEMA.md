# Wiki Schema

## Domain
AI Agent 系统架构 / Agentic System Design — agent 框架、多智能体协作、MCP/A2A 协议、工具调用、记忆系统、推理模式、LLM 基础设施、生产部署。核心关注：Agentic System Designer 职业路径所需的知识体系。

## Conventions
- File names: lowercase, hyphens, no spaces (e.g., `langgraph-architecture.md`)
- Every wiki page starts with YAML frontmatter (see below)
- Use `[[wikilinks]]` to link between pages (minimum 2 outbound links per page)
- When updating a page, always bump the `updated` date
- Every new page must be added to `index.md` under the correct section
- Every action must be appended to `log.md`
- raw/ directory is immutable — corrections go in wiki pages, never modify raw sources
- Archived content goes to `_archive/` — preserves original directory structure under it

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

**Topic Areas:**
- agent, multi-agent, agent-framework, agent-swarm, agent-orchestration
- harness, plugin, capability-seam, event-sourcing
- llm, foundation-model, reasoning, planning, inference
- tool-calling, function-calling, mcp, a2a, protocol
- memory, rag, context, vector-database, embedding
- workflow, pipeline, state-machine, event-driven
- coding, code-generation, code-completion, developer-tools
- evaluation, benchmark, testing, observability
- deployment, production, scaling, monitoring
- fine-tuning, rlhf, distillation, quantization

**Architecture & Design:**
- architecture, design-pattern, state-management, middleware
- authentication, security, privacy, hitl (human-in-the-loop)
- streaming, realtime, async, concurrency

**Tech Stack:**
- python, typescript, rust, dotnet, go
- open-source, framework, library, sdk, cli, tui
- docker, kubernetes, cloud, azure, aws

**Organizations:**
- organization, company, research-lab, university
- microsoft, google, meta, openai, anthropic, alibaba

**Meta:**
- notes, learning, how-to, reference, decision, retrospective, tip, pitfall
- career, learning-path, skill-tree

## Page Thresholds
- **Create a page** when an entity/concept appears in 2+ sources OR is central to one source
- **Add to existing page** when a source mentions something already covered
- **DON'T create a page** for passing mentions, minor details, or things outside the domain
- **Split a page** when it exceeds ~200 lines — break into sub-topics with cross-links
- Archive a page** when its content is fully superseded or no longer in scope — move to `_archive/`, remove from index, update cross-references

## Navigation
- **`_meta/topic-map.md`** — Primary entry point. Organized by Agentic System Designer skill areas.
- **`index.md`** — Complete flat catalog of all wiki pages by type.
- **`log.md`** — Chronological record of all wiki actions.

## Entity Pages
One page per notable entity (framework, tool, organization). Include:
- Overview / what it is
- Key facts and dates
- Architecture summary (if a framework)
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
