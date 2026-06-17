# TinyChatEngine — On-Device LLM/VLM Inference Library

> Source: https://github.com/mit-han-lab/TinyChatEngine (gitcode mirror clone)
> Cloned: 2026-04-14
> License: MIT

## Overview

TinyChatEngine is an on-device LLM/VLM inference engine developed by MIT Han Lab. It enables running compressed large language models (LLaMA, CodeLLaMA, Mistral, etc.) and vision language models (VILA, LLaVA) on edge devices including laptops (NVIDIA RTX 4070), Apple M1/M2 Macs, and Raspberry Pi — with no external library dependencies (pure C/C++ implementation).

**Key innovation:** Co-designed with [AWQ](https://github.com/mit-han-lab/llm-awq) and [SmoothQuant](https://github.com/mit-han-lab/smoothquant) quantization methods. TinyChatEngine received the **Best Paper Award at MLSys 2024**.

## Architecture

### Quantization: AWQ + SmoothQuant

- **AWQ (Activation-aware Weight Quantization):** Protects salient weight channels by analyzing activation magnitude. 4-bit weight quantization (W4A16 on GPU, W4A32/W4A8 on CPU).
- **SmoothQuant:** Migrates quantization difficulty from activations to weights via mathematically equal transformation. Supports int8 weight quantization.

### Inference Engine

- **Pure C/C++** — no external ML framework dependencies
- **Backends:** x86 (Intel/AMD), ARM (Apple M1/M2, Raspberry Pi), CUDA (Nvidia GPU compute capability ≥ 6.1)
- **Precision support:** FP32, W4A16 (GPU), W4A32, W4A8, W8A8 (CPU)
- **SIMD optimizations:** 128-bit (ARM), 256-bit (x86) for weight reordering
- **Device-specific weight layouts:** QM_ARM (ARM 128-bit SIMD), QM_x86 (x86 256-bit SIMD), QM_CUDA (Nvidia GPU)

### Supported Models (via [Model Zoo](https://huggingface.co/mit-han-lab/tinychatengine-model-zoo))

| Model | Precision | x86 | ARM | CUDA |
|-------|-----------|-----|-----|------|
| LLaMA-3 8B Instruct | FP32 / INT4 | ✅ | ✅ | — |
| LLaMA-2 7B/13B Chat | FP32 / INT4 | ✅ | ✅ | ✅ |
| CodeLLaMA 7B/13B Instruct | FP32 / INT4 | ✅ | ✅ | ✅ |
| Mistral-7B Instruct v0.2 | FP32 / INT4 | ✅ | ✅ | — |
| VILA-7B (VLM) | FP32 / INT4 | ✅ | ✅ | — |
| LLaVA-1.5 7B/13B (VLM) | FP32 / INT4 | ✅ | ✅ | — |
| StarCoder 15.5B | FP32 / INT4 | ✅ | ✅ | — |
| OPT series (1.3B–6.7B) | FP32 / INT8 / INT4 | ✅ | ✅ | — |

## Key Source Files

```
TinyChatEngine/
├── llm/
│   ├── src/              # Core inference engine (C/C++)
│   ├── include/          # Headers
│   ├── kernels/         # CUDA/Metal compute kernels
│   ├── Makefile         # Build configuration
│   ├── tools/
│   │   ├── download_model.py   # Download from model zoo
│   │   ├── llama_exporter.py    # Convert HuggingFace → TinyChat format
│   │   └── model_quantizer.py   # AWQ quantization
│   ├── application/     # Chat applications (chat, vila, voicechat)
│   └── scripts/         # Shell scripts for building/running
├── kernels/             # CUDA kernels
├── pyproject.toml       # Python tooling config (black, isort, mypy, pylint)
└── requirements.txt     # Python dependencies
```

## Build & Run

```bash
# 1. Install Python deps
pip install -r requirements.txt

# 2. Download quantized model
python llm/tools/download_model.py --model LLaMA_3_8B_Instruct_awq_int4 --QM QM_x86

# 3. Compile
make chat -j

# 4. Run
./chat
```

## Related Projects

- [TinyEngine](https://github.com/mit-han-lab/tinyengine) — Memory-efficient NN library for microcontrollers
- [AWQ](https://github.com/mit-han-lab/llm-awq) — Activation-aware Weight Quantization (MLSys 2024 Best Paper)
- [SmoothQuant](https://github.com/mit-han-lab/smoothquant) — Post-training quantization for LLMs
- [llama.cpp](https://github.com/ggerganov/llama.cpp) — Reference C/C++ LLM inference (acknowledged in README)
- [whisper.cpp](https://github.com/ggerganov/whisper.cpp) — Reference C/C++ Whisper (acknowledged)

## Notes

- For Raspberry Pi, 8GB RAM recommended; tested on RPi 4 Model B Rev 1.4 (aarch64)
- CUDA backend requires GPU compute capability ≥ 6.1
- VLM support (VILA, LLaVA) added Feb 2024; recommended for M1/M2 MacBooks
- Python only used for model downloading/conversion — inference is pure C/C++
