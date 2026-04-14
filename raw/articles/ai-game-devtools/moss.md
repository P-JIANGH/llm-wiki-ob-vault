# MOSS - AI Game DevTools Source

## Source
- URL: https://github.com/OpenLMLab/MOSS
- License: Apache 2.0 (code), CC BY-NC 4.0 (data), GNU AGPL 3.0 (model)
- Organization: OpenLMLab / Fudan University

## Overview
MOSS is a bilingual (Chinese/English) open-source conversational language model with plugin support, developed by Fudan University. The moss-moon series has 16 billion parameters and supports tool use (web search, text-to-image, calculator, equation solver).

## Key Models
- **moss-moon-003-base**: Base model, ~700B tokens pretraining
- **moss-moon-003-sft**: SFT version with instruction following
- **moss-moon-003-sft-plugin**: SFT + plugin capability (search, image gen, calculator, solver)
- **moss-moon-003-sft-int4/int8**: Quantized versions (INT4 needs 12GB VRAM)

## Architecture
- 16B parameters
- Base pretraining: ~700B Chinese/English/code tokens
- SFT: ~1.1M multi-turn dialogue turns
- Plugin data: ~300K plugin-enhanced dialogue turns
- Framework: Hugging Face Transformers

## Hardware Requirements
| Precision | Load | One Turn | Max Context (2048) |
|-----------|------|----------|-------------------|
| FP16     | 31GB | 42GB     | 81GB              |
| Int8     | 16GB | 24GB     | 46GB              |
| Int4     | 7.8GB| 12GB     | 26GB              |

## Deployment Options
- Single GPU (A100/A800) with FP16
- Multi-GPU (2x3090) with model parallelism
- INT4/INT8 quantized on single 3090
- APIs: Streamlit web demo, Gradio, REST API, CLI

## Plugin System
MOSS uses a structured output format with special tokens:
- `<|Human|>`: User input
- `<|Inner Thoughts|>`: Model reasoning
- `<|Commands|>`: Plugin calls (Search, Calculate, Text2Image, Solve)
- `<|Results|>`: Plugin execution results
- `<|MOSS|>`: Final response

## Fine-tuning
- Uses Accelerate + DeepSpeed
- Supports multi-node multi-GPU training
- Data format: conversation_without_plugins / conversation_with_plugins

## Related Projects
- MOSS Vortex: deployment/inference solution
- MOSS WebSearchTool: search plugin
- MOSS Frontend: Flutter-based UI
- MOSS Backend: Go-based backend
