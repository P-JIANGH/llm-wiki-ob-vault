# CTAG — Creative Text-to-Audio Generation via Synthesizer Programming

**Source**: https://github.com/PapayaResearch/ctag
**Paper**: ICML 2024 — [arXiv:2406.00294](https://arxiv.org/abs/2406.00294)
**Website**: https://ctag.media.mit.edu/
**Authors**: Manuel Cherep (MIT), Nikhil Singh (MIT), Jessica Shand
**License**: MIT

## Overview

CTAG generates sounds from text prompts by optimizing the parameters of a virtual modular synthesizer using evolutionary strategies. Instead of training a neural network to directly output audio waveforms, CTAG treats sound synthesis as a black-box optimization problem: it searches for synthesizer parameter configurations whose output sounds semantically match the text description, using CLAP embeddings as the fitness function.

## Core Architecture

### Three-Component Pipeline

1. **Text Embedding**: Text prompts are embedded using LAION-CLAP (Contrastive Language-Audio Pretraining), producing fixed-dimensional vectors in a shared text-audio latent space.

2. **Synthesizer (SynthAX)**: A fast modular synthesizer built in JAX. Supports multiple synth architectures:
   - `voice` — Voice-like synthesis (default)
   - Other modular synth configurations via `ctag/conf/synth/`

3. **Evolutionary Optimization**: Uses the `evosax` library to search synthesizer parameter space. Supports 30+ strategies:
   - CMA-ES, BIPOP-CMA-ES, IPOP-CMA-ES, Sep-CMA-ES
   - NES variants: xNES, CR-FM-NES, SNES, DES, LM-MA-ES
   - ES variants: OpenES, GuidedES, PersistentES, NoiseReuseES, ESMC
   - GA variants: SimpleGA, LGA, SAMR-GA, GESMR-GA, MR15-GA
   - Others: PSO, ARS, PGPE, DE, Simulated Annealing, PBT, ASEBO
   - Default: **LES** (Linear Evolution Strategy) — empirically best performer

### Optimization Loop

```
Text Prompt → CLAP Text Embedding (fixed)
    ↓
Evolutionary Strategy:
  For each iteration:
    1. ASK: Generate batch of synthesizer parameters
    2. Synthesize audio from parameters via SynthAX (JAX JIT-compiled)
    3. EVALUATE: Embed audio via CLAP, compute cosine similarity with text embedding
    4. TELL: Update strategy state based on fitness scores
    5. Log best audio + parameters
    ↓
Output: Best synthesizer parameters → WAV file
```

### Key Design Decisions

- **CLAP as fitness function**: Cosine similarity between synthesized audio embedding and text prompt embedding. Score clamped to [-1, 0] (evosax minimizes).
- **JAX JIT compilation**: SynthAX synthesis is JIT-compiled for GPU/TPU acceleration.
- **Hydra configuration**: All hyperparameters configurable via YAML (model, strategy, synth, iterations, population size).
- **TensorBoard logging**: Optional experiment tracking with audio, parameters, and fitness curves.
- **AX hyperparameter sweeping**: Built-in support for automated hyperparameter optimization via `--multirun`.

## Directory Structure

```
ctag/
├── text2synth.py           # Main entry (344 lines) — Hydra-based CLI
├── embedding.py            # BaseModel + CLAPModel wrapper (88 lines)
├── logger.py               # Audio logging utilities
├── config.py               # Hydra config dataclass
├── conf/                   # Hydra configs
│   ├── config.yaml         # Main config
│   ├── strategy/           # 40+ strategy configs (CMA_ES, PSO, LES, etc.)
│   ├── model/clap/         # CLAP model variants (audioset, music-speech, fusion)
│   └── synthconfig/        # Synth configuration presets
├── data/
│   └── esc50-sounds.txt    # Default ESC-50 sound prompts
├── utils/
│   ├── misc.py             # Prompt loading, config printing
│   ├── random.py           # PRNG key management
│   ├── hparam.py           # Hyperparameter dict builder
│   └── softfilelock.py     # File locking for concurrent runs
└── checkpoints.txt         # LAION-CLAP checkpoint URLs
```

## Dependencies

- **JAX/Flax** (0.4.14) — Neural network framework with JIT compilation
- **evosax** (0.1.5) — Evolutionary strategies library (30+ algorithms)
- **synthax** (0.2.1) — Modular synthesizer in JAX (dependency project)
- **laion-clap** (1.1.4) — Text-audio contrastive embeddings
- **hydra-core** (1.3.2) — Configuration management
- **PyTorch** (2.0.0) — CLAP model loading
- **TensorBoard** (2.13.0) — Experiment logging
- **SoundFile** (0.12.1) — WAV audio I/O
- Python 3.9

## Default Configuration

| Parameter | Default | Description |
|-----------|---------|-------------|
| Model | CLAP audioset-best | LAION-CLAP checkpoint |
| Strategy | LES | Linear Evolution Strategy |
| Synth | voice | Voice-like synthesizer |
| SynthConfig | default | Default synth parameters |
| Iterations | 300 | Optimization steps |
| Population Size | 50 | Candidates per iteration |
| Duration | 2s | Output audio length |
| Device | CPU | Can switch to CUDA |

## Usage

```bash
# Basic usage (CPU, default prompts)
cd ctag
python text2synth.py

# GPU + larger population
python text2synth.py system.device=cuda general.popsize=100

# Custom prompts from string
python text2synth.py general.prompts='"a bird tweeting;walking on leaves"'

# Custom prompts from file
python text2synth.py general.prompts=/path/to/prompts.txt

# Hyperparameter sweep
pip install ax-platform==0.2.8
python text2synth.py --multirun
```

## Key Facts

- **ICML 2024** paper
- **MIT License** — permissive, game-dev friendly
- **No neural audio generation** — purely optimization-based, unlike diffusion/autoregressive models
- **SynthAX dependency** — separate project by same authors (AES Convention 155, 2023)
- **CLAP checkpoint required** — must download LAION-CLAP weights from HuggingFace
- **Requires ≥2 prompts** — due to CLAP PyPI package limitation
- Authors: Manuel Cherep, Nikhil Singh (MIT), Jessica Shand
- Partial financial support from Fulbright Spain, MIT SuperCloud, Lincoln Laboratory
