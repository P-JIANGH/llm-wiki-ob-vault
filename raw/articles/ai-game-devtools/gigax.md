# Gigax — AI Game DevTools Source

> Cloned from: https://github.com/GigaxGames/gigax

## Overview

Gigax is a runtime LLM-powered NPC framework for games. It provides NPCs that can speak, jump, attack, and perform any developer-defined actions. The key innovation is structured generation with Outlines ensuring the output format is always respected.

## Key Features

- NPCs that `<speak>`, `<jump>`, `<attack>` and perform any other action defined
- <1 second GPU inference on most machines
- Open-weights models available on HuggingFace, fine-tuned from: Llama-3, Phi-3, Mistral
- Structured generation with Outlines
- Coming soon: Local server mode, runtime quest generation, vector DB memory

## Models (on HuggingFace)

- `Gigax/NPC-LLM-7B` — Mistral-7B fine-tune
- `Gigax/NPC-LLM-3_8B` — Phi-3 fine-tune
- `Gigax/NPC-LLM-3_8B-128k` — Phi-3 128k context fine-tune
- GGUF formats for CPU inference via llama_cpp

## Architecture

### Package Structure

```
gigax/
├── __init__.py      # Package exports
├── step.py          # NPCStepper: handles prompting + output parsing
├── prompt.py        # NPCPrompt (Jinja2 template) + llama_chat_template
├── parse.py         # CharacterAction parsing + get_guided_regex
└── scene.py         # Pydantic models: Character, Location, Item, Skill, ProtagonistCharacter
```

### Core Classes

**`NPCStepper`** (step.py): Main class for stepping NPCs
- `get_action()`: Async method that takes context, locations, NPCs, protagonist, items, events → returns `CharacterAction`
- Supports both API mode (AsyncOpenAI) and local mode (LlamaCpp/Transformers via Outlines)
- `generate_local()`: Uses Outlines regex guided generation
- `generate_api()`: Calls Gigax API with guided_regex

**`NPCPrompt`** (prompt.py): Jinja2 template composing:
- World knowledge, locations, NPCs, current location, items
- Last events (conversation history)
- Protagonist: name, description, memories, quests, skills, psychological profile

**`CharacterAction`** (parse.py): Parses LLM output using compiled regex
- `from_str()`: Parses command string into structured CharacterAction
- `get_guided_regex()`: Generates combined regex pattern for all skills

**Scene Models** (scene.py): Pydantic BaseModels
- `Location`, `Item`, `Character`, `ProtagonistCharacter`
- `Skill` with `ParameterType` enum: character, location, item, amount, content
- `Skill.to_regex()`: Generates regex for each skill

### Dependencies

- `outlines` — structured generation
- `pydantic` — data models
- `openai` — API client
- `transformers` — local model support
- `llama-cpp-python` — CPU/GPU inference
- `jinja2` — prompt templating
- `dotenv` — env config

## Usage Example

```python
from gigax.step import NPCStepper
from gigax.scene import Character, Location, ProtagonistCharacter, Skill, ParameterType, Item

stepper = NPCStepper(model=model)
action = await stepper.get_action(
    context="Medieval world",
    locations=[current_location],
    NPCs=[npc],
    protagonist=protagonist,
    items=[Item(name="Sword", description="A sharp blade")],
    events=[previous_action],
)
```

## License

MIT
