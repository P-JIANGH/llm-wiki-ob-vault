---
title: LLM Unity Integration
created: 2026-04-20
updated: 2026-04-20
type: concept
tags: [ai, llm, game-engine, integration]
sources: []
---

## Overview

**LLM Unity Integration** describes the architectural pattern for integrating large language models into the Unity game engine. This enables dynamic NPC dialogue, adaptive quest generation, intelligent companion behavior, and other AI-driven game features powered by LLMs.

## Architecture Patterns

### Pattern 1: Local LLM via llama.cpp
```
Unity Game → llama.cpp (C++ DLL) → GGUF Model → Responses
```
- **Pros**: Fully offline, no API costs, privacy, low latency
- **Cons**: Limited by device GPU/RAM, smaller models
- **Best For**: Single-player games, offline play, NPC dialogue with 7B-13B models
- **Tools**: [[llama-cpp]] for inference, GGUF format models

### Pattern 2: Cloud API Integration
```
Unity Game → UnityWebRequest → LLM API (OpenAI/Claude/etc.) → Responses
```
- **Pros**: Full model capabilities, no local hardware requirements
- **Cons**: Requires internet, per-token costs, latency, privacy concerns
- **Best For**: Multiplayer games, complex reasoning, large context windows
- **Tools**: [[chatgpt-api-unity]] for API client implementation

### Pattern 3: Hybrid (Local + Cloud)
```
Unity Game → Router → Local LLM (simple tasks) / Cloud API (complex tasks)
```
- **Pros**: Best of both worlds — fast local + powerful cloud fallback
- **Cons**: More complex architecture
- **Best For**: Games with mixed requirements (local NPC chat + cloud quest generation)

## Key Integration Components

### Dialogue System Integration
- **Response Streaming**: Stream LLM output for real-time typing effect
- **Context Management**: Maintain conversation history per NPC
- **System Prompts**: Inject character personality, lore, and constraints
- **Response Parsing**: Extract actions, emotions, and speech from LLM output

### Behavior Tree / State Machine Integration
```csharp
// LLM-driven NPC decision making
public class LLMDrivenNPC : MonoBehaviour
{
    public LLMClient llm;
    public string personalityPrompt;
    public string worldState;
    
    public async Task<string> DecideAction(string playerInput)
    {
        var prompt = $"{personalityPrompt}\nWorld: {worldState}\nPlayer says: {playerInput}";
        var response = await llm.ChatAsync(prompt);
        return ParseAction(response);
    }
}
```

### Quest / Content Generation
- Dynamic quest generation from world state and player history
- Procedural NPC backstories and dialogue trees
- Lore-consistent item descriptions and world text

## Performance Considerations

| Factor | Recommendation |
|--------|---------------|
| Latency | Use streaming responses; target <200ms for real-time dialogue |
| Caching | Cache common responses; use semantic similarity for retrieval |
| Model Size | 7B models for local, API for complex reasoning |
| Quantization | Q4_K_M or Q5_K_M for balance of quality/performance |
| Memory | Limit context to 4K-8K tokens for responsive gameplay |

## Unity Ecosystem Tools

- [[chatgpt-api-unity]] — Full-featured Unity ChatGAPI client with streaming, function calling, memory management
- [[chatgptforunity]] — UPM package for editor-time ChatGPT integration, code generation assistance
- [[unity-chatgpt]] — Experimental project for runtime LLM code generation

## Implementation Checklist

1. **Choose deployment mode**: Local (llama.cpp) vs Cloud (API) vs Hybrid
2. **Select model**: Vicuna/Mistral/Llama for local, GPT-4/Claude for cloud
3. **Implement client**: HTTP client for API or native binding for local
4. **Design prompt templates**: System prompts per NPC, context management
5. **Handle streaming**: Real-time text display with typing animation
6. **Add safety filters**: Content moderation, response validation
7. **Optimize performance**: Caching, batching, context window management
8. **Test thoroughly**: Edge cases, network failures, model hallucinations

## Security & Safety

- **API Key Protection**: Never embed keys in builds; use server-side proxy
- **Content Filtering**: Validate LLM output before displaying to players
- **Rate Limiting**: Prevent abuse of cloud API endpoints
- **Privacy**: Local processing preferred for player data

## Related Patterns

- [[ai-shader]] — Natural language to GLSL shader generation in Unity
- [[unreal-engine-5-llama-lora]] — Similar pattern for Unreal Engine with fine-tuned models
- [[multi-agent-ai-game-impl]] — Multi-agent AI implementation in game environments

## References

- Unity ML-Agents: https://github.com/Unity-Technologies/ml-agents
- llama.cpp Unity bindings: Various community projects
- OpenAI Unity SDK: https://github.com/RageAgainstThePixel/OpenAI-Unity
