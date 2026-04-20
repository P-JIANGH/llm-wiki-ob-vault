# MiDashengLM-7B Raw Source

**Source:** https://github.com/xiaomi-research/dasheng-lm
**Date:** 2026-04-20

## Overview

MiDashengLM-7B is an efficient audio understanding model by Xiaomi Research (MiLM Plus team). It combines the Dasheng audio encoder with Qwen2.5-Omni-7B Thinker decoder through a caption-based alignment strategy.

## Key Highlights

- **State-of-the-Art Performance:** Outperforms Qwen2.5-Omni-7B and Kimi-Audio-Instruct-7B on multiple audio understanding tasks
- **High Efficiency:** 3.2× throughput speedup at comparable batch sizes vs Qwen2.5-Omni-7B; up to 20x speedup with larger batches (tested up to batch_size=512 for 30s audio on 80GB GPUs)
- **TTFT:** Up to 4x speedup vs Qwen2.5-Omni-7B
- **Caption-based Alignment:** Trained with general audio captions (not ASR transcripts) for holistic audio understanding
- **Open Source:** Apache License 2.0, public-source training data

## Architecture

- **Audio Encoder:** Built on [Dasheng](https://github.com/XiaoMi/dasheng) - open-source audio encoder for general audio understanding
- **Decoder:** Initialized from [Qwen2.5-Omni-7B Thinker](https://huggingface.co/Qwen/Qwen2.5-Omni-7B)
- **Alignment Strategy:** General audio captions instead of ASR (captures speech, environmental sounds, music in unified text format)

### Why Captions Instead of ASR?

ASR Limitations:
- Discards non-speech audio (music/environmental sounds)
- Misses paralinguistic info (speaker emotion, acoustic properties)
- Monotonic alignment provides trivial learning signal

Caption Advantages:
- Utilizes all audio content
- Captures global audio context
- Non-monotonic alignment provides harder learning signal

## Training Dataset: ACAVCaps

- 38,662 hours of general audio captions
- Derived from ACAV100M audio repository
- Six categories: Pure Speech, Pure Sound, Pure Music, Mixed Music, Mixed Speech, Mixed Sound
- Three-step curation: multi-expert analysis → LLM reasoning (DeepSeek-R1) → filtering (Dasheng-GLAP)
- Dataset release pending ICASSP 2026 review

## Model Variants

| Variant | Format |
|---------|--------|
| midashenglm-7b | FP32 |
| midashenglm-7b-bf16 | BF16 (recommended for general use) |
| midashenglm-7b-fp8 | FP8 (Hopper-class GPUs) |
| midashenglm-7b-w4a16-gptq | GPTQ W4A16 (resource-constrained) |

## Key Features

- Supports audio input via file path, URL, or numpy array
- Transformers-compatible (AutoModelForCausalLM, AutoProcessor, AutoTokenizer)
- vLLM support (official integration submitted)
- MDL-Toolkit for fine-tuning (included in repo)
- ms-swift integration by community

## Evaluation Tasks

- Automatic Speech Recognition (WER)
- Single-target Audio Tagging (ACC)
- Gender Recognition (ACC)
- Multi-target Audio Tagging (mAP)
- Audio Captioning (FENSE)
- Open Audio QA (FENSE)
- Audio QA with Options (ACC)

## Benchmarks

- MECAT benchmark: https://github.com/xiaomi-research/mecat
- MMAU benchmark: https://github.com/Sakshi113/mmau

## Efficiency Results

| Batch Size | MiDashengLM-7B (samples/s) | Qwen2.5-Omni-7B (samples/s) | Speedup |
|-----------|---------------------------|---------------------------|---------|
| 1 | 0.45 | 0.36 | 1.25x |
| 4 | 1.40 | 0.91 | 1.53x |
| 8 | 2.72 | 1.15 | 2.36x |
| 16 | 5.18 | OOM | - |
| 32 | 9.78 | OOM | - |
| 64 | 17.07 | OOM | - |
| 128 | 22.73 | OOM | - |
| 200 | 25.15 | OOM | - |

## License

Apache License 2.0

## Links

- arXiv: https://arxiv.org/abs/2508.03983
- HuggingFace: https://huggingface.co/models?search=midashenglm-7b
- ModelScope: https://www.modelscope.cn/collections/MiDashengLM-7B-1021-459c73ff1d6d4c
- Demo: https://modelscope.cn/studios/midasheng/MiDashengLM-7B
- Project Page: https://xiaomi-research.github.io/dasheng-lm/
- MDL-Toolkit: https://github.com/xiaomi-research/dasheng-lm/tree/main/mdl-toolkit
