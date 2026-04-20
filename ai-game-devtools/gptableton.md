---
title: GPTAbleton
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [tool, music, audio, python, script, open-source]
sources: [raw/articles/ai-game-devtools/gptableton.md]
---

# GPTAbleton

**GPT-to-Ableton MIDI Bridge — AI-generated music patterns injected into Ableton Live via OSC**

## Overview

GPTAbleton is a Python script by @BurnedGuitarist that uses OpenAI's GPT to generate synchronized MIDI patterns (Melody, Drums, Bass) from a natural language prompt, then injects them directly into Ableton Live clips via OSC (Open Sound Control).

## Key Facts

| Aspect | Detail |
|--------|--------|
| **Developer** | @BurnedGuitarist |
| **License** | MIT |
| **Language** | Python |
| **Repo Size** | 3 files, 1 commit |
| **Input** | Natural language prompt → OpenAI GPT API |
| **Output** | OSC messages to Ableton Live |
| **Communication** | UDP OSC to 127.0.0.1:11000 |

## Architecture

- **GPT Prompt**: Asks GPT for three synchronized MIDI tables (Melody, Drum, Bass) with columns: pitch, start_time, duration, velocity
- **Response Parser**: Extracts text between track markers, regex-splits rows, filters valid MIDI notes (30-90)
- **OSC Client**: Uses python-osc to send `/live/clip/add/notes` and clip management messages
- **Dependency**: Requires [[AbletonOSC]] Max for Live device running in Ableton Live

## Core Functions

- `get_openai_response()` — Calls GPT API (currently legacy text-davinci-003)
- `parse_table_to_list()` — Parses GPT output into structured MIDI note data
- `initiate_clips()` — Creates/resizes clips in Ableton via OSC
- `send_events()` — Injects notes into clips track by track

## Usage in AI Game Development

- **Procedural music generation**: AI creates synchronized multi-track MIDI from prompts
- **Game jam rapid prototyping**: Generate background music without manual composition
- **Interactive audio systems**: Could be extended to generate music based on game state prompts

## Limitations

- Uses deprecated text-davinci-003 model (needs update to gpt-4 or gpt-3.5-turbo-instruct)
- No retry logic — exits on malformed GPT output
- Format strictness: GPT must output space-separated values (no markdown tables)
- MIDI note range limited to 30-90
- Single BPM (60) hardcoded

## Related Tools

Complements [[musicgen]] (AI music generation model) and other audio tools by providing a direct Ableton Live integration bridge. Similar concept to how [[audiogpt]] bridges AI and audio tools.

## Links

- GitHub: https://github.com/BurnedGuitarist/GPTAbleton
- AbletonOSC: https://github.com/ideoforms/AbletonOSC
