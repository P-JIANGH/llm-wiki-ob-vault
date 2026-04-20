# GPTAbleton - GPT to Ableton MIDI Bridge

**Source:** https://github.com/BurnedGuitarist/GPTAbleton
**Extracted:** 2026-04-21
**Method:** web_extract (GitHub clone timed out; gitcode/gitee also unavailable)

## Overview

A Python draft script that generates synchronized MIDI patterns via OpenAI's GPT and injects them directly into Ableton Live clips using OSC (Open Sound Control). Designed to create three parallel tracks (Melody, Drums, Bass) from a single AI prompt.

**Author:** @BurnedGuitarist
**License:** MIT License (Copyright 2023)
**Repository size:** 3 files (gpt_to_ableton.py, requirements.txt, LICENSE.txt), 1 commit

## Architecture

- **Input:** Natural language prompt sent to OpenAI GPT API
- **Processing:** Parse GPT response into MIDI note tables (pitch, start_time, duration, velocity)
- **Output:** OSC messages sent to Ableton Live via AbletonOSC Max for Live device
- **Communication:** UDP OSC to 127.0.0.1:11000

## Key Files

### gpt_to_ableton.py
- **`get_openai_response()`**: Calls legacy OpenAI API (text-davinci-003), temperature 0.9, max 350 tokens
- **`find_substring()`**: Extracts text between two keywords using rindex()
- **`parse_table_to_list()`**: Regex-splits rows, filters valid MIDI notes (30-90), enforces schema [pitch, start_time, duration, velocity]
- **`calculate_pattern_duration()`**: Computes total clip length from start_time + cumulative duration
- **`initiate_clips()`**: Sends OSC to set tempo (60 BPM default) and create/resize clips in Ableton
- **`send_events()`**: Loops through parsed data, sends note OSC messages with auto-incrementing pointer

### OSC Endpoints Used
```
/live/song/set/tempo
/live/clip_slot/delete_clip
/live/clip_slot/create_clip
/live/clip/add/notes  # Args: (track, clip, pitch, start, duration, velocity, 0)
```

### GPT Prompt Template
Asks GPT to output three space-separated tables (Melody, Drum, Bass) with columns: pitch, start_time, duration, velocity. Tables must have the same sum of durations and be synchronized.

## Dependencies
- OpenAI API key (OPENAI_API_KEY env var)
- AbletonOSC Max for Live device (https://github.com/ideoforms/AbletonOSC)
- python-osc library
- Legacy model: text-davinci-003 (deprecated; should update to gpt-3.5-turbo-instruct or gpt-4)

## Limitations
- Uses deprecated text-davinci-003 model
- Script exits on malformed/incomplete GPT output (no retry logic)
- Unused imports: io, itertools
- Format strictness: GPT must output space-separated values (no tabs/markdown tables)
- Valid MIDI notes filtered to range 30-90
