---
title: MOSS
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, model, bilingual, plugin, open-source]
sources: [raw/articles/ai-game-devtools/moss.md]
---

# MOSS

MOSS is a bilingual (Chinese/English) open-source conversational language model with plugin support, developed by [[OpenLMLab]] at Fudan University. The moss-moon series has **16 billion parameters** and can run on single A100/A800 or dual 3090 GPUs.

## Overview

| Attribute | Value |
|-----------|-------|
| Parameters | 16B |
| Pretraining tokens | ~700B |
| Languages | Chinese + English + Code |
| Developed by | Fudan University |
| License | Apache 2.0 (code) / AGPL 3.0 (model) |

## Key Models

| Model | Description | VRAM (FP16) |
|-------|-------------|-------------|
| `moss-moon-003-base` | Base pretraining model | 31GB |
| `moss-moon-003-sft` | Instruction-tuned | 31GB |
| `moss-moon-003-sft-plugin` | + Web search, image gen, calculator, solver | 31GB |
| `moss-moon-003-sft-int4` | 4-bit quantized | 12GB |
| `moss-moon-003-sft-int8` | 8-bit quantized | 24GB |

## Plugin System

MOSS uses structured special-token output to interface with plugins:

```
<|Human|>: query<eoh>
<|Inner Thoughts|>: reasoning<eot>
<|Commands|>: Search("...") / Calculate("...") / Text2Image("...")<eoc>
<|Results|>: plugin output<eor>
<|MOSS|>: response<eom>
```

Supported plugins:
- **Web Search**: Real-time information retrieval
- **Calculator**: Arithmetic expressions
- **Equation Solver**: Mathematical equations
- **Text-to-Image**: Image generation (via Canny-edge controlled diffusion)

## Architecture

Built on `Hugging Face Transformers`, MOSS uses:
- [[LLaMA-style architecture]] adapted for Chinese
- Custom MossBlock modules for model parallelism
- Triton-based GPTQ quantization for efficient inference (Linux only)
- Supports [[Accelerate]] + DeepSpeed for multi-GPU/multi-node fine-tuning

## Deployment

- **Single GPU**: A100/A800 with FP16 (~30GB)
- **Multi-GPU**: 2x3090 with model parallelism via `load_checkpoint_and_dispatch`
- **Quantized**: INT4 runs on single 3090 (12GB)
- **Demos**: Streamlit web UI, Gradio, REST API, CLI
- **Jittor backend**: Memory-efficient alternative using CPU-GPU memory swapping

## Comparison

MOSS vs other Chinese LLMs:

| Feature | MOSS | [[ChatGLM]] | [[Baichuan]] |
|---------|------|------------|--------------|
| Parameters | 16B | 6B/130B | 7B/13B |
| Plugin support | Yes | Limited | No |
| Bilingual | Yes | Yes | Yes |
| Open source | Full | Partial | Partial |

## Related Tools

- [[MOSS Vortex]] — deployment & inference engine
- [[LangChain]] — similar chain-of-thought agent framework
- [[ChatDev]] — multi-agent development paradigm

## References

- GitHub: https://github.com/OpenLMLab/MOSS
- HuggingFace: https://huggingface.co/fnlp/moss-moon-003-sft
- Paper: https://link.springer.com/article/10.1007/s11633-024-1502-8
