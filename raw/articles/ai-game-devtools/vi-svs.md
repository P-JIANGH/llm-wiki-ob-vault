# VI-SVS — Variational Inference with adversarial learning for end-to-end Singing Voice Synthesis

**Source:** https://github.com/PlayVoice/VI-SVS
**Extracted:** 2026-04-21
**License:** Apache 2.0

## Overview

VI-SVS is an end-to-end singing voice synthesis system based on variational inference with adversarial learning. It is a simplified variant of VITS — it removes the Monotonic Alignment Search (MAS) and DurationPredictor modules, making it a learning-focused project for understanding SVS architecture.

The author notes: "作为一个用于学习的项目，就这样了：Pitch的预测是需要改进的地方" (As a learning project, this is it: pitch prediction needs improvement).

## Architecture

### Core Design
- **Based on VITS** but without MAS and DurationPredictor
- **TextEncoder**: Combines 4 embedding types — phone labels (63), pitch notes (128), pitch (256), and slur (2)
- **PosteriorEncoder**: WaveNet-based encoder with 16 layers
- **ResidualCouplingBlock**: Normalizing flow with 4 flows for probabilistic modeling
- **Generator**: VITS decoder with BigVGAN-inspired design, upsampling rates [5,4,4,2,2]
- **Multi-scale discriminators**: MPD (Multi-Period) + MRD (Multi-Resolution) for adversarial training

### Training Pipeline
1. Download and resample data to 32kHz
2. Generate labels (phone, pitch, slur, score from MIDI)
3. Generate train/validation filelists
4. Train SVS model (`svs_train.py`)
5. Optionally train separate pitch prediction model (`pit_train.py`)

### Inference Options
- **F0 from score**: Uses MIDI pitch directly (better quality)
- **F0 predicted**: Uses separate pitch model (noted as suboptimal)

### Key Configuration
- Sampling rate: 32kHz
- Hidden channels: 192
- Filter channels: 640
- Batch size: 6
- Learning rate: 1e-4
- Hop length: 320

### Dependencies
Python: torch 1.6.0, librosa 0.8.0, scipy 1.5.2, numpy 1.18.5, Cython, phonemizer, matplotlib, tensorboard

## Key Files

| File | Purpose |
|------|---------|
| `svs_train.py` | Main SVS training script |
| `svs_infer.py` | Inference with F0 from score |
| `svs_infer_pitch.py` | Inference with predicted pitch |
| `svs_song.py` | Full song synthesis |
| `svs_export.py` | Model export |
| `pit_train.py` | Pitch prediction training |
| `pit_export.py` | Pitch model export |
| `vits/models.py` | Core model: TextEncoder, PosteriorEncoder, ResidualCouplingBlock, SynthesizerTrn |
| `vits/attentions.py` | Attention mechanisms (RoFormer-based) |
| `vits_decoder/generator.py` | Neural vocoder generator |
| `vits_decoder/bigv.py` | BigVGAN-style activations |
| `configs/singing_base.yaml` | Full training configuration |

## Data

- Uses OpenCpop dataset (https://wenet.org.cn/opencpop/)
- Requires pre-segmented audio with phoneme, pitch, and slur annotations

## References

- VISinger paper: https://arxiv.org/abs/2110.08813
- VITS: https://github.com/jaywalnut310/vits
- BigVGAN: https://github.com/NVIDIA/BigVGAN
- UniVNet: https://github.com/mindslab-ai/univnet
- RoFormer: https://arxiv.org/abs/2104.09864
- DiffVar, Diff-HierVC for pitch diffusion
- Muskits, DiffSinger for SVS reference

## Notes

- Author states this is a learning project — pitch prediction needs improvement
- Pitch and Duration planned as add-on modules
- Author has related projects: so-vits-svc-5.0, DiffSinger involvement
