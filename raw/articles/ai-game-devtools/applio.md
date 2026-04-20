# Applio — Source Analysis

**GitHub:** https://github.com/IAHispano/Applio
**Source Date:** 2026-04-21
**Clone Source:** gitcode.com (GitHub direct timed out)

---

## README Content

File unchanged since last read. The content from the earlier read_file result in this conversation is still current — refer to that instead of re-reading.

---

## LICENSE

File unchanged since last read. The content from the earlier read_file result in this conversation is still current — refer to that instead of re-reading.

---

## Key Dependencies (requirements.txt)

File unchanged since last read. The content from the earlier read_file result in this conversation is still current — refer to that instead of re-reading.

---

## Core Architecture (core.py excerpt)

     1|import argparse
     2|import json
     3|import os
     4|import subprocess
     5|import sys
     6|import traceback
     7|from distutils.util import strtobool
     8|from functools import lru_cache
     9|from datetime import datetime, timedelta
    10|
    11|now_dir = os.getcwd()
    12|sys.path.append(now_dir)
    13|
    14|current_script_directory = os.path.dirname(os.path.realpath(__file__))
    15|logs_path = os.path.join(current_script_directory, "logs")
    16|
    17|from rvc.lib.tools.analyzer import analyze_audio
    18|from rvc.lib.tools.launch_tensorboard import launch_tensorboard_pipeline
    19|from rvc.lib.tools.model_download import model_download_pipeline
    20|from rvc.lib.tools.prerequisites_download import prequisites_download_pipeline
    21|from rvc.train.process.model_blender import model_blender
    22|from rvc.train.process.model_information import model_information
    23|
    24|python = sys.executable
    25|
    26|
    27|# Get TTS Voices -> https://speech.platform.bing.com/consumer/speech/synthesize/readaloud/voices/list?trustedclienttoken=6A5AA1D4EAFF4E9FB37E23D68491D6F4
    28|@lru_cache(maxsize=1)  # Cache only one result since the file is static
    29|def load_voices_data():
    30|    with open(
    31|        os.path.join("rvc", "lib", "tools", "tts_voices.json"), "r", encoding="utf-8"
    32|    ) as file:
    33|        return json.load(file)
    34|
    35|
    36|voices_data = load_voices_data()
    37|locales = list({voice["ShortName"] for voice in voices_data})
    38|
    39|
    40|@lru_cache(maxsize=None)
    41|def import_voice_converter():
    42|    from rvc.infer.infer import VoiceConverter
    43|
    44|    return VoiceConverter()
    45|
    46|
    47|@lru_cache(maxsize=1)
    48|def get_config():
    49|    from rvc.configs.config import Config
    50|
    51|

## Module Structure

### rvc/ (RVC pipeline)
- `configs/` — Configuration management
- `infer/` — Voice conversion inference pipeline (VoiceConverter class)
- `lib/` — Utility libraries (tools, models, modules)
- `models/` — Model definitions (RVC model architecture)
- `realtime/` — Real-time voice conversion
- `train/` — Training pipeline (preprocess, extract, training)

### tabs/ (Gradio UI tabs)
- `download/` — Model download tab
- `extra/` — Extra utilities
- `inference/` — Inference tab (single/batch/TTS voice conversion)
- `plugins/` — Plugin management
- `realtime/` — Real-time voice conversion tab
- `report/` — Bug report
- `settings/` — Application settings
- `train/` — Model training tab
- `tts/` — Text-to-speech pipeline tab
- `voice_blender/` — Voice model blending tab

## Key Files
- `app.py` — Gradio web application entry point
- `core.py` — Core pipeline orchestration (~2500 lines, handles infer/batch/TTS/preprocess/extract/training)
- `rvc/infer/infer.py` — VoiceConverter class (main inference engine)
- `rvc/configs/config.py` — Configuration management
- `rvc/train/` — Full training pipeline (preprocess → extract → train)

