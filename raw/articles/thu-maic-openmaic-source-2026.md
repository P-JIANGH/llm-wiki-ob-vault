# OpenMAIC Source Code — Deep Dive (2026-04-12)

## Repository
- **URL**: https://github.com/THU-MAIC/OpenMAIC
- **Local**: ~/OpenMAIC
- **Version**: v0.1.0 (2026-03-26)
- **License**: AGPL-3.0

## Tech Stack
- Next.js 16 (App Router)
- React 19
- TypeScript 5
- LangGraph 1.1 (StateGraph orchestration)
- Tailwind CSS 4
- Vercel AI SDK (`ai` package)
- pptxgenjs (PPTX export)
- pnpm workspaces

## Project Structure

```
OpenMAIC/
├── app/                          # Next.js App Router
│   ├── api/                      # ~18 API endpoints
│   │   ├── generate-classroom/   # Async classroom job creation + status
│   │   ├── generate/             # Scene generation pipeline (outline/agent-profiles/scene-content/scene-actions/image/tts/video)
│   │   ├── chat/                 # Multi-agent discussion (SSE streaming)
│   │   ├── quiz-grade/           # Real-time quiz grading
│   │   ├── pbl/chat/            # Project-Based Learning chat
│   │   ├── parse-pdf/            # PDF parsing (MinerU optional)
│   │   ├── transcription/        # Audio transcription
│   │   └── ...
│   └── classroom/[id]/page.tsx  # Classroom playback page
│
├── lib/                          # Core business logic (~25 subdirs)
│   ├── generation/               # Two-stage lesson pipeline
│   │   ├── outline-generator.ts  # Stage 1: user requirements → scene outlines
│   │   ├── scene-generator.ts    # Stage 2: outline → full scene content
│   │   ├── scene-builder.ts      # Build complete scenes from outlines
│   │   ├── action-parser.ts      # Parse structured text+action chunks
│   │   ├── interactive-post-processor.ts
│   │   ├── json-repair.ts
│   │   └── prompts.ts            # LLM prompt templates
│   ├── orchestration/            # LangGraph multi-agent
│   │   ├── director-graph.ts     # StateGraph: director + agent_generate nodes
│   │   ├── director-prompt.ts    # Director LLM prompt builder
│   │   ├── prompt-builder.ts     # Structured system prompt for agents
│   │   ├── stateless-generate.ts # Stream parsing for interleaved text/actions
│   │   ├── tool-schemas.ts      # Agent action validation
│   │   └── registry/            # Agent registry (store)
│   ├── pbl/                      # Project-Based Learning
│   │   ├── generate-pbl.ts       # PBL agentic loop (Vercel AI SDK + MCP tools)
│   │   ├── pbl-system-prompt.ts
│   │   └── mcp/                  # 4 MCP tool domains
│   │       ├── mode-mcp.ts       # Mode switching (project_info/agent/issueboard/idle)
│   │       ├── project-mcp.ts    # Project title/description
│   │       ├── agent-mcp.ts      # Agent role CRUD
│   │       └── issueboard-mcp.ts # Issue tracking + Question/Judge agents
│   ├── ai/
│   │   └── providers.ts         # Unified provider config (1300+ lines)
│   │                             # Supports: OpenAI/GPT-5/o4-mini/o3,
│   │                             # Anthropic/Claude 4.x, Google/Gemini 3.x,
│   │                             # GLM, Qwen, DeepSeek, MiniMax, Grok, SiliconFlow
│   ├── export/                   # PPTX + HTML export
│   │   ├── use-export-pptx.ts    # pptxgenjs PPTX export (1181 lines)
│   │   ├── latex-to-omml.ts      # LaTeX → Office Math ML
│   │   ├── svg-path-parser.ts     # SVG → cubic/quadratic bezier points
│   │   ├── svg2base64.ts
│   │   └── html-parser.ts        # HTML → AST for PPTX export
│   ├── playback/                 # State machine (idle→playing→live)
│   │   ├── engine.ts
│   │   ├── derived-state.ts
│   │   └── types.ts
│   ├── action/                   # Execution engine (speech, whiteboard)
│   ├── chat/                     # Chat infrastructure
│   ├── audio/                    # TTS via MiniMax/custom providers
│   ├── pdf/                      # PDF parsing
│   ├── prosemirror/             # Rich text editor
│   ├── whiteboard/              # SVG drawing
│   ├── store/                   # React state (Zustand)
│   ├── hooks/                   # 55+ React custom hooks
│   ├── web-search/              # Tavily web search
│   └── ...
├── components/                  # React UI
│   ├── agent/                   # Agent avatar/persona
│   ├── scene-renderers/         # Quiz, Interactive, PBL renderers
│   ├── slide-renderer/          # Canvas-based slide editor
│   ├── whiteboard/              # SVG whiteboard
│   └── ui/                      # shadcn/ui + Radix primitives
└── packages/                    # Workspace packages
    ├── mathml2omml/             # MathML → OOML conversion
    └── pptxgenjs/              # PowerPoint generation (fork/customized)
```

## Key Architecture Patterns

### 1. Two-Stage Generation Pipeline

```
Stage 1: generateSceneOutlinesFromRequirements()
  Input: UserRequirements (text, language, userNickname, userBio)
         + optional PDF text/images
  Output: SceneOutline[] (structured lesson plan)

Stage 2: generateFullScenes() → generateSceneContent() → generateSceneActions()
  Input: SceneOutline[]
  Output: Scene[] with slides/quiz/interactive/PBL content
          + Actions (speech, spotlight, laser, whiteboard)
```

Key types:
- `UserRequirements`: `{ text, language, userNickname?, userBio? }`
- `SceneOutline`: one outline item per scene
- `Scene`: `{ id, type, content, actions }`
- Scene types: `slides | quiz | interactive | pbl`

### 2. Director Graph — Multi-Agent Orchestration

LangGraph StateGraph with two node types:

```
START → director → [END]
             ↓
      agent_generate → director (loop)
```

**Director node strategy** (varies by agent count):
- Single agent: pure code, zero LLM calls
  - turn 0: dispatch the sole agent
  - turn 1+: cue user (return `shouldEnd: true`)
- Multi-agent: LLM-based with code fast-paths
  - turn 0 + triggerAgentId: dispatch trigger (skip LLM)
  - otherwise: LLM decides next agent / USER / END

**State** (LangGraph Annotation):
```typescript
// Input (set once)
messages, storeState, availableAgentIds, maxTurns,
languageModel, thinkingConfig, discussionContext,
triggerAgentId, userProfile, agentConfigOverrides

// Mutable
currentAgentId, turnCount, agentResponses[],
whiteboardLedger[], shouldEnd, totalActions
```

**AgentGenerate node**:
- Streams events via `config.writer()`: `agent_start`, `text_delta`, `action`, `agent_end`, `error`
- Uses `AISdkLangGraphAdapter` wrapping Vercel AI SDK
- Parses structured chunks: interleaved text + action JSON
- Whiteboard actions (`wb_*`) recorded to ledger
- Action validation: `getEffectiveActions(agentConfig.allowedActions, sceneType)`

### 3. AI Provider System

`lib/ai/providers.ts` — 1300+ lines, unified via Vercel AI SDK:

**Supported providers:**
- OpenAI: GPT-5.2/5.1/5/5-mini/5-nano, GPT-4o/4o-mini/4-turbo, o4-mini, o3/o3-mini, o1
- Anthropic: Claude Opus/Sonnet/Haiku 4.6/4.5
- Google: Gemini 3.1 Pro Preview, Gemini 3 Flash Preview, Gemini 2.5 Pro/Flash/Flash-Lite
- GLM: GLM-5/4.7/4.6/4.5 series (OpenAI-compatible)
- Qwen: Qwen3.5/3.1/2.5 series (DashScope compatible)
- DeepSeek: DeepSeek V3, DeepSeek R1
- MiniMax: MiniMax series (Anthropic-compatible)
- Grok: Grok series
- SiliconFlow: OpenAI-compatible aggregator

**Model capabilities tracked:**
```typescript
interface ModelCapabilities {
  streaming: boolean
  tools: boolean
  vision: boolean
  thinking?: {
    toggleable: boolean
    budgetAdjustable: boolean
    defaultEnabled: boolean
  }
}
```

**Thinking budget support**: models like GPT-5, o3/o4-mini, Claude Opus 4.6, Gemini 3.x support configurable thinking budgets.

### 4. PBL — Agentic Loop with MCP Tools

`lib/pbl/generate-pbl.ts` — Uses Vercel AI SDK `generateText` + `stopWhen(stepCountIs(30))`:

**4 MCP tool domains** (all operate on shared `PBLProjectConfig` state):
1. **ModeMCP**: mode switching — `project_info | agent | issueboard | idle`
2. **ProjectMCP**: project metadata — `update_title`, `update_description`
3. **AgentMCP**: agent role CRUD — `create_agent`, `update_agent`, `delete_agent`
4. **IssueboardMCP**: issue tracking + auto-creates Question/Judge agents per issue

**Agent roles** in PBL:
- `person_in_charge`: responsible agent
- `question_agent_name`: generates guiding questions (auto-created per issue)
- `judge_agent_name`: evaluates student work (auto-created per issue)

**Post-processing after agentic loop:**
1. Sort issues by index, activate first
2. Generate initial questions via Question Agent
3. Add welcome message to chat

### 5. PPTX Export

`lib/export/use-export-pptx.ts` — 1181 lines:

**HTML → PPTX text**: `formatHTML()` parses HTML AST, maps to pptxgenjs `TextProps[]`
- Handles: bold, italic, underline, strikethrough, superscript/subscript, font size/color/face, hyperlinks, bullet lists (ul/ol), indent levels, line spacing

**SVG → PPTX shapes**: `formatPoints()` converts SVG paths to pptxgenjs bezier points:
- MoveTo, LineTo, CubicBezier, QuadBezier, Arc, ClosePath

**Shadow config**: `getShadowOption()` — maps CSS shadow (blur, offset, angle) to pptxgen shadow

**LaTeX → OMML**: `latexToOmml()` via `mathml2omml` package

**Slide elements supported**: text, image (base64/SVG/remote), shape, table, chart, slide link

**Image handling**: Media placeholders resolved from `useMediaGenerationStore`; remote images fetched and converted to base64 for embedding.

### 6. Stateless SSE Streaming

All real-time features use Server-Sent Events via LangGraph's `config.writer()`:

**Event types:**
```typescript
type StatelessEvent =
  | { type: 'thinking'; data: { stage, agentId? } }
  | { type: 'agent_start'; data: { messageId, agentId, agentName, agentAvatar, agentColor } }
  | { type: 'text_delta'; data: { content, messageId } }
  | { type: 'action'; data: { actionId, actionName, params, agentId, messageId } }
  | { type: 'agent_end'; data: { messageId, agentId } }
  | { type: 'cue_user'; data: { fromAgentId? } }
  | { type: 'error'; data: { message } }
```

### 7. Whiteboard System

**Action types**: `wb_*` prefix — whiteboard drawing actions recorded to ledger.
- Real-time SVG drawing in browser
- Persisted as action records in `whiteboardLedger`
- Replayed during classroom playback

### 8. Playback State Machine

`lib/playback/engine.ts`:
- States: `idle → playing → live`
- Manages scene progression, action execution timing
- Derived state computation for UI

## API Routes Summary

| Route | Purpose |
|-------|---------|
| `POST /api/generate-classroom` | Create async classroom generation job |
| `GET /api/generate-classroom/[jobId]` | Poll job status |
| `POST /api/chat` | Multi-agent discussion (SSE) |
| `POST /api/generate/scene-outlines-stream` | Stream scene outlines |
| `POST /api/generate/agent-profiles` | Generate agent personas |
| `POST /api/generate/scene-content` | Generate scene content |
| `POST /api/generate/scene-actions` | Generate agent actions |
| `POST /api/generate/image` | Image generation |
| `POST /api/generate/tts` | Text-to-speech |
| `POST /api/generate/video` | Video generation |
| `POST /api/quiz-grade` | AI quiz grading |
| `POST /api/pbl/chat` | PBL chat |
| `POST /api/parse-pdf` | PDF parsing (MinerU) |
| `POST /api/transcription` | Audio transcription |
| `POST /api/web-search` | Tavily web search |

## v0.1.0 Changelog (2026-03-26)

- Discussion TTS (text-to-speech for discussions)
- Immersive mode
- Keyboard shortcuts
- Whiteboard enhancements
- New AI providers
- And more

## Deployment

- **Vercel**: One-click deploy button (recommended)
- **Docker**: `docker-compose up -d`
- **Local**: `pnpm dev` → http://localhost:3000
- **PDF parsing**: Optional MinerU (`PDF_MINERU_BASE_URL`, `PDF_MINERU_API_KEY`)
- **OpenClaw**: `clawhub install openmaic` — supports Feishu/Slack/Discord/Telegram/WhatsApp

## Observations

1. **No native WeChat/钉钉 integration** — only international platforms via OpenClaw
2. **Server-only files**: `thinking-context.ts` uses `node:async_hooks` (server-only), excluded from client bundle via `ai/providers.ts` import guard
3. **Agent registry is a Zustand store**: `useAgentRegistry.getState().getAgent(id)`
4. **Request-scoped agent overrides**: generated agent configs travel with the request, don't need to be in global registry
5. **Action allowlist per scene type**: `getEffectiveActions()` filters agent actions based on scene type (e.g., spotlight/laser only on slides)
