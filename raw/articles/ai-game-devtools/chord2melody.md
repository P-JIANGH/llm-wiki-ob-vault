# Chord2Melody - Automatic Music Generation AI

**Source:** https://github.com/tanreinama/chord2melody
**Author:** Toshiyuki Sakamoto (tanreinama)
**License:** MIT
**Year:** 2020

## Overview

Chord2Melody is an AI that composes music with MIDI output, based on GPT-2 architecture. Users can generate music of arbitrary length, specify chord progressions to guide generation, or compose continuations of music they've been working on. Output music is free of copyright restrictions.

## Architecture

### Model Architecture
- **Base:** GPT-2 Transformer decoder (12 layers, 12 heads, 768 embedding dim, 1024 context window)
- **Parameters:** ~86M (base_5tr) / ~87M (base_17tr)
- **Framework:** TensorFlow 1.15.4 (GPU)
- **Vocabulary:** 86M+ tokens encoding multi-track piano roll note events

### Two Pretrained Models

| Model | Tracks | Params |
|-------|--------|--------|
| base_5tr | Drums, Piano, Guitar, Bass, Strings | 86,167,296 |
| base_17tr | 17 GM instrument tracks (full General MIDI palette) | 86,941,440 |

### Key Components

1. **chord2melody.py** — Main generation script
   - Accepts chord progression via `--chord` option (format: "C|Am|F|G7")
   - Supports 14 chord types (major, minor, 7th, M7, m7, dim, sus4, aug, etc.)
   - `--num_bars` for arbitrary output length
   - `--top_p` / `--top_k` for generation temperature control
   - Outputs multi-track MIDI files via pypianoroll

2. **melody2melody.py** — Continuation generation
   - Takes existing MIDI as `--input`
   - Generates continuation that matches the style/key of input

3. **train/src/model.py** — GPT-2 implementation
   - Standard transformer block: LayerNorm → Multi-head Attention → Residual → MLP (GELU) → Residual
   - Causal masking for autoregressive generation
   - Past KV caching for efficient inference
   - Weight tying (output projection = transposed token embedding)

4. **Training Pipeline**
   - Dataset: Lakh Pianoroll Dataset (LPD-5 / LPD-17)
   - Data augmentation via random key modulation
   - `encode.py` → `train.py` pipeline
   - Supports fine-tuning from pretrained models

### Token Encoding Scheme
- Note tokens: track_id * note_size + note_index (84 notes per track, offset 24)
- Special tokens: time_note (beat boundary), end_note (sequence end)
- Chord tokens encoded as bass note + piano chord voicing (root, 3rd, 5th, 7th)

## Usage Examples

```bash
# Generate 48 bars with specified chord progression
python3 chord2melody.py --chord "C|C|C|C|Dm|Dm|Dm|Dm|G7|G7|G7|G7|Am|Am|Am|Am" --chordbeat 4 --num_bars 48

# Continue from existing MIDI
python3 melody2melody.py --input halfway.mid

# Control generation creativity
python3 chord2melody.py --top_k 25 --top_p 0
```

## Dependencies
- numpy
- tqdm
- pypianoroll==0.5.3
- tensorflow-gpu==1.15.4

## Samples
- 20 MIDI samples included: 10 chord-to-melody + 10 melody-to-melody continuations

## Links
- Demo: http://ailab.nama.ne.jp/#chord2melody
- Melody2Melody Demo: http://ailab.nama.ne.jp/#melody2melody
- Paper: report/paper.pdf (PDF)
- Chord List: chordlist.txt
