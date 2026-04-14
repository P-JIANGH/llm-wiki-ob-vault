# Moshi — Raw Source

**Source:** https://github.com/kyutai-labs/moshi
**Fetched:** 2026-04-14
**Stars:** 9.9k | **Forks:** 918 | **Contributors:** 26
**Paper:** arXiv:2410.00037
**License:** CC-BY 4.0 (models), MIT (code)

---

## Overview

Moshi is a **speech-text foundation model** and **full-duplex spoken dialogue framework** developed by Kyutai Labs. It uses Mimi, a state-of-the-art streaming neural audio codec, to enable real-time bidirectional voice conversation with an AI.

Key capabilities:
- Real-time full-duplex dialogue (both sides can speak simultaneously)
- Theoretical latency of **160ms** (80ms frame size + 80ms acoustic delay)
- Practical latency as low as **200ms on L4 GPU**
- Inner monologue prediction for improved generation quality

## Architecture

### Moshi (Language Model)
- Models **two streams of audio**: Moshi speaking + user speaking simultaneously
- Predicts text tokens for its own speech (inner monologue)
- **Depth Transformer**: models inter-codebook dependencies at each time step
- **Temporal Transformer**: 7B parameters, models temporal dependencies

### Mimi (Neural Audio Codec)
- Processes **24 kHz audio** → **12.5 Hz representation**
- Bitrate: **1.1 kbps** (fully streaming, 80ms latency)
- Uses WavLM self-supervised representation for semantic + acoustic modeling
- Adversarial training loss (no L1/L2 reconstruction loss)
- Better quality than SpeechTokenizer (50 Hz, 4kbps) and SemantiCodec (50 Hz, 1.3kbps)

## Available Models

| Model    | Voice           | Backend                   | Quantization          |
|----------|-----------------|---------------------------|-----------------------|
| Moshika  | Female synthetic| PyTorch, MLX, Rust/Candle | bf16, int8, int4, q8  |
| Moshiko  | Male synthetic  | PyTorch, MLX, Rust/Candle | bf16, int8, int4, q8  |

Hugging Face repos: `kyutai/moshika-pytorch-bf16`, `kyutai/moshiko-pytorch-bf16`, MLX q4/q8 variants, Candle q8.

## Repository Structure

```
moshi/
├── moshi/          # PyTorch implementation (research)
├── moshi_mlx/      # MLX implementation (Apple Silicon)
├── rust/           # Rust implementation (production)
├── client/         # Web UI for demo
├── configs/        # Configuration files
├── scripts/        # Utility scripts
└── data/           # Data processing
```

## Requirements
- Python ≥3.10 (3.12 recommended)
- PyTorch GPU: ~24GB memory (no quantization)
- MLX: MacBook Pro M3+ or iPhone
- Rust: recent toolchain for Rust backend

## Related Kyutai Models
- **Hibiki**: Simultaneous speech translation (github.com/kyutai-labs/hibiki)
- **Delayed Streams Modeling**: Text-to-Speech / Speech-to-Text

## Installation
```bash
pip install moshi        # PyTorch
pip install moshi_mlx    # MLX (Apple Silicon)
pip install rustymimi    # Rust backend Python bindings
```
