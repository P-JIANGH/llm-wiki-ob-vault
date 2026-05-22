# 12-Factor Agents

> A design philosophy for building reliable LLM-powered software.
> Created by Dex (Dexter Horthy), founder of HumanLayer (YC F24).
> Content license: CC BY-SA 4.0 | Code license: Apache 2.0

## Project Info

- **GitHub:** https://github.com/humanlayer/12-factor-agents
- **Stars:** ~20,500 (as of 2026-05)
- **Author:** Dex (dexhorthy) — previously Replicated.com (7 years, Kubernetes products), now HumanLayer (YC F24)
- **Created:** Early 2025, first published April 2025
- **Influences:** Classic [12 Factor Apps](https://12factor.net/) by Heroku
- **Community:** Widely covered on Hacker News, DZone, Medium, Dev.to; spawned derivative "12-Factor Blueprint for GenAI Agents" works
- **Talks:** Presented at AI Engineer World's Fair (17-min talk on YouTube), YC events
- **What it is NOT:** A framework, SDK, or library. It is a **design principles document** — 12 actionable guidelines for building LLM-powered software that is reliable enough for production customers.

## The Author: Dex (Dexter Horthy)

- Founder/CEO of HumanLayer (YC F24) — human-in-the-loop API for AI agents
- Previously 7 years at Replicated.com (Kubernetes distribution platform)
- Prolific writer: Substack blog "The Outer Loop", podcast "AI That Works" (co-hosted with @hellovai from Boundary)
- Widely credited with coining the term **"Context Engineering"** — the practice of optimizing LLM inputs for maximum information density and token efficiency
- GitHub: https://github.com/dexhorthy
- Typically uses TypeScript for agent work (see his LinkedIn post on "LLMs + TypeScript")

## The Motivation

Dex interviewed 100+ technical founders building AI products. The typical journey:

1. Decide to build an agent
2. Grab a popular framework ($FRAMEWORK) to move fast
3. Get to 70-80% quality bar quickly
4. Realize 80% isn't good enough for customer-facing features
5. Realize getting past 80% requires reverse-engineering the framework
6. Start over from scratch

**Key observation:** Most products billing themselves as "AI Agents" are mostly deterministic code with LLM steps sprinkled in at strategic points. The good agents don't follow the "here's your prompt, here's a bag of tools, loop until goal" pattern.

**Core thesis:** There are core engineering techniques — not framework magic — that make LLM-powered software reliable, scalable, and maintainable. These can be learned and applied by most skilled software engineers.

## The 12 Factors (Summary)

### Factor 1: Natural Language to Tool Calls
Translate natural language commands into structured JSON objects that trigger deterministic code. The most fundamental building block of agent architecture.
- Human: "create a payment link..."
- LLM output: `{function: "create_payment_link", params: {...}}`
- Code: `stripe.paymentlinks.create(params)`

### Factor 2: Own Your Prompts
Don't outsource prompt engineering to frameworks. Treat prompts as first-class code. Framework abstractions like `Agent(role="...", goal="...")` are black boxes that make debugging, testing, and fine-tuning harder.
- Use typed prompt functions (e.g., BAML, Instructor) with union return types
- Enables eval-driven iteration
- Allows "role hacking" — using system/user/assistant roles in non-standard ways

### Factor 3: Own Your Context Window
The LLM's input is fundamentally "here's what happened so far, what's next?" — engineer that representation. Don't use standard message formats; build your own context format for maximum information density and token efficiency.
- Use XML-style tags, YAML, or custom format
- Implement context compression, summarization, and pruning
- Inspired by Karpathy's context engineering work
- Called **Context Engineering** — the practice of optimizing what goes INTO the LLM

### Factor 4: Tools Are Just Structured Outputs
A tool call is just a JSON object that the LLM outputs, triggering deterministic code. There's nothing special about tool "calling". Think in terms of union types:
```typescript
type NextStep = CreateIssue | SearchIssues | RequestHumanInput | DoneForNow
```
The LLM outputs one; your switch statement handles it. Understand the tradeoffs between prompting, JSON mode, function calling, and constrained generation.

### Factor 5: Unify Execution State and Business State
Don't maintain separate state for "execution metadata" (current step, retries) and "business state" (agent history). The context window already contains all history — derive execution state from it. This makes serialization, debugging, recovery, and forking trivial.

### Factor 6: Launch/Pause/Resume with Simple APIs
Agents are programs. They should have standard start, query, pause, and resume APIs. Both deterministic code AND the agent itself should be able to pause an agent (e.g., waiting for human input), then resume from where it left off via external trigger (webhook).
- Crucially: allow pause BETWEEN tool selection and tool execution — this is where human review/approval is needed

### Factor 7: Contact Humans with Tool Calls
Always output JSON. Define tools for human interaction (`request_human_input`), rather than sometimes returning plain text and sometimes JSON. This enables **Outer Loop Agents** — agents triggered by cron/webhook that work autonomously for minutes, then contact a human for input.
- Human interaction is a first-class tool, not a side channel
- Enables giving agents high-risk tools (you can always reach a human for approval)

### Factor 8: Own Your Control Flow
Not all tool calls are equal — some are synchronous (fetch data, let the LLM retry), some break the loop (human approval), some need retry logic, caching, or LLM-as-judge validation. Build your own loop — don't let a framework hide this.
- This is where framework black boxes do the most damage
- By owning the loop, you get: logging, tracing, metrics, client-side rate limiting, persistent pause/waiting for events

### Factor 9: Compact Errors into Context Window
When a tool call fails, append the formatted error to the context window and let the LLM self-heal. Implement a `consecutive_errors` counter (~3 retries limit), then escalate or break.
- The self-healing pattern — LLM reads the error and tries a different approach
- Error formatting matters — you may want to compress, summarize, or redact parts of errors

### Factor 10: Small, Focused Agents
Don't build one giant agent that tries to do everything. Build small agents focused on 3-10 step workflows within one domain. Agents are just a building block in a larger, mostly-deterministic system.
- Even better LLMs need this — context grows, LLMs lose focus
- Expand agent scope gradually as LLMs improve, like refactoring a large codebase
- Inspired by NotebookLM team: "The most magical AI moments happen when you're exactly at the boundary of the model's capabilities"

### Factor 11: Trigger from Anywhere
Allow users to trigger agents from Slack, email, SMS, or any channel. When you have Factor 6 (pause/resume) and Factor 7 (human contact), you can build "outer loop agents" — like a digital colleague that can be triggered by events, act independently, then loop in a human for input.

### Factor 12: Make Your Agent a Stateless Reducer
Think of an agent as a reduce/fold function: `agent(thread, event) -> updated_thread`. This is more of a conceptual framing than a practical rule — but it's a good mental model.

### Appendix 13: Pre-fetch All Context You Might Need
If you already know which tools the agent will need, call them DETERMINISTICALLY before the loop starts and put the results in context. This saves an LLM round-trip.
- Example: instead of prompting "list git tags, then tell us", actually fetch the tags and put them in context
- Remove the `list_git_tags` tool from options — the info is already there

## The Ecosystem

### HumanLayer (the company)
- Core product: Human-in-the-loop API — contact humans via Slack, SMS, email, WhatsApp for agent approval/input
- Python and TypeScript SDKs
- Works with any agent framework + any LLM
- `@hl.require_approval()` decorator or `human_as_tool()` function
- **New product: CodeLayer** — a "post-IDE IDE" that orchestrates AI coding agents, marketed as "Claude Code's Superhuman" with hotkeys, parallel sessions, remote cloud workers
- Website: https://www.humanlayer.dev
- YC batch: F24

### AgentControlPlane (formerly KubeChain)
- GitHub: https://github.com/humanlayer/agentcontrolplane
- Stars: ~409
- A Kubernetes-native agent orchestrator (CRDs: LLM, Agent, Task, ToolCall, MCPServer, ContactChannel)
- Implements 12-Factor principles directly: async persistent execution, checkpointing at tool call/agent delegation, human approval via ContactChannel
- Supports OpenAI, Anthropic, Vertex AI, Mistral AI
- MCP support (stdio and HTTP)
- Sub-agent delegation, OpenTelemetry tracing

### got-agents/agents (Reference implementations)
- GitHub: https://github.com/got-agents/agents
- Stars: ~76
- Small, concrete agent implementations following 12-Factor principles
- `deploybot-ts/` (TypeScript deployment bot), `linear-assistant-ts/` (Linear assistant)
- Shared `knowledge.md` file as a simple knowledge base

### create-12-factor-agent (Scaffolding tool)
- CLI: `npx create-12-factor-agent` or `uvx create-12-factor-agent`
- Scaffolds a TypeScript Express project with BAML (prompt compiler) + HumanLayer SDK + Zod
- 10-chapter workshop building a calculator agent from "hello world" to production
- Core modules: index.ts, cli.ts, server.ts (webhooks), agent.ts (loop), state.ts (disk persistence), a2h.ts (Agent-to-Human types)

### walkthroughgen (Documentation tool)
- YAML-driven walkthrough generator for the 12-factor workshops
- Generates markdown with file diffs, code highlights, and collapsible sections
- Multiple output targets: markdown, per-section folders (cumulative state), final project directory

### promptx (Agent persona system)
- Initializes `.promptx/` directory structure in projects
- Contains specialized agent persona files for Claude Code: Developer Agent, Code Reviewer, Rebaser, Merger, Multiplan Manager
- Tool to give AI coding assistants structured role definitions

## Related / Competing Philosophies

### Anthropic's "Building Effective Agents" (Dec 2024)
- By Erik Schluntz and Barry Zhang
- Three principles: (1) Don't build agents for everything; (2) Keep it simple; (3) Adopt the agent's perspective
- Defines "workflows" (orchestrated LLM with predefined patterns) vs "agents" (LLMs dynamically directing themselves)
- Widely cited, especially Simon Willison: "The most practical article on 'agents' I've seen"
- 12-Factor is more concrete and engineering-focused; Anthropic's is more philosophical

### BAML (BoundaryML)
- Prompt compiler used extensively in 12-Factor reference implementations
- Defines typed prompt functions with union return types
- Used in create-12-factor-agent template + walkthroughgen

## Key Concepts

### Context Engineering
A term Dex helped popularize. The practice of engineering what goes INTO the LLM — prompt engineering, RAG document formatting, tool call history representation, memory compression, structured output instructions. The unifying theme across all 12 factors.

### Outer Loop Agents
Agents that are triggered not just by user chat, but by cron, webhooks, events. They work independently for minutes, then can contact a human for input/approval before taking high-risk actions. This is the "agent as a colleague" pattern.

### Agent = Prompt + Switch Statement + Accumulated Context + For Loop
Dex's formula: an agent is just four things you build yourself. No framework magic.

## References
- https://github.com/humanlayer/12-factor-agents
- https://www.youtube.com/watch?v=8kMaTybvDUw (AI Engineer World's Fair talk)
- https://humanlayer.dev
- https://github.com/humanlayer/agentcontrolplane
- https://github.com/got-agents/agents
- https://www.anthropic.com/engineering/building-effective-agents
- https://theouterloop.substack.com
