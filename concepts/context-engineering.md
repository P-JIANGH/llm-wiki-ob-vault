---
title: Context Engineering
created: 2026-05-22
updated: 2026-05-22
type: concept
tags: [architecture, llm, design-pattern, agent, workflow]
sources: [raw/articles/12-factor-agents-2026.md]
---

# Context Engineering

> The practice of engineering what goes **INTO** the LLM — optimizing inputs for maximum information density, token efficiency, and model performance.
> The term was popularized through [[entities/12-factor-agents]] (Dex / HumanLayer), and is closely related to Andrej Karpathy's concept of prompt engineering as an engineering discipline.

## What It Is

Context Engineering is the systematic practice of designing, optimizing, and managing the input context passed to an LLM. It goes beyond simple "prompt engineering" to encompass everything the LLM sees:

- System prompts and instructions
- Conversation history / thread representation
- RAG-retrieved documents
- Tool call results
- Memory and knowledge snippets
- Structured output schemas

The core insight: **the LLM's input is fundamentally "here's what happened so far, what's next?"** — and how you represent that "what happened so far" directly determines output quality.

## Key Principles

### 1. Custom Formats Over Standard Message Roles
Don't default to the OpenAI/Anthropic message format (system/user/assistant/tool). Build your own context format tailored to your use case. Examples:

```
<!-- XML-style format with semantic tags -->
<slack_message>From: @alex, Text: Can you deploy the backend?</slack_message>
<list_git_tags>intent: "list_git_tags"</list_git_tags>
<list_git_tags_result>tags: [{name: "v1.2.3", ...}]</list_git_tags_result>
```

```
<!-- YAML format for dense information -->
thread:
  - event: slack_message
    from: alex
    text: Can you deploy the backend?
  - event: tool_call
    intent: list_git_tags
  - event: tool_result
    tags:
      - name: v1.2.3
```

### 2. Information Density First
Every token in the context window has a cost (both monetary and in model attention). Maximize signal-to-noise ratio:
- Summarize verbose tool outputs
- Drop irrelevant conversation turns
- Compress repetitive patterns
- Redact sensitive information (with markers)

### 3. Context Is State
Following [[entities/12-factor-agents]] Factor 5, the context window IS your execution state. If you need to know the current step, retry count, or any metadata — it should be derivable from the context, not from a separate tracking system.

### 4. Pre-fetch vs. Ask
From Factor 13: If you know which tools the agent will need, call them deterministically before the loop starts. This saves a full LLM round-trip and gives the model more information upfront. Remove pre-fetched results from the available tool options.

## Relationship to Other Concepts

- **[[concepts/agent-loop-architecture]]** — Context Engineering is the craft of what goes INTO the loop's prompt
- **[[concepts/context-compression]]** — A specific technique within Context Engineering: compressing long context to fit within model limits
- **[[concepts/memory-system]]** — Memory is a type of context that persists across sessions; Context Engineering handles the session-level representation
- **[[entities/12-factor-agents]]** Factor 3 specifically — "Own Your Context Window" is the definitive statement of this concept
- **[[concepts/rag-systems]]** — RAG is a source of context; how you format and inject retrieved docs is a Context Engineering decision
- **[[entities/karpathy-llm101n]]** — Karpathy's work on prompt engineering as engineering

## Why It Matters

The difference between a mediocre agent and a great one is often not the model, the tools, or the architecture — it's how the context is engineered. Two agents with the same LLM and same tools can produce wildly different results based on:

1. How tool results are formatted in context
2. How conversation history is summarized or retained
3. What information is made prominent vs. buried
4. How errors are presented for self-healing ([[entities/12-factor-agents]] Factor 9)

As LLMs improve, Context Engineering becomes **more** important, not less — because the bottleneck shifts from model capability to input quality.
