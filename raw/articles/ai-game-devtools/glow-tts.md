# Glow-TTS: A Generative Flow for Text-to-Speech via Monotonic Alignment Search

**Source:** https://github.com/jaywalnut310/glow-tts
**Paper:** https://arxiv.org/abs/2005.11129
**Authors:** Jaehyeon Kim, Sungwon Kim, Jungil Kong, Sungroh Yoon
**Date:** 2020-05-22
**License:** MIT
**Clone:** ~/tmp/ai-game-devtools/glow-tts/ (GitHub direct, success)

## README Summary

Glow-TTS is a flow-based generative model for parallel text-to-speech (TTS) that does not require any external aligner. By combining the properties of flows and dynamic programming, the model searches for the most probable monotonic alignment between text and the latent representation of speech on its own.

**Key innovation:** Monotonic Alignment Search (MAS) — enforces hard monotonic alignments enabling robust TTS that generalizes to long utterances. Employing generative flows enables fast, diverse, and controllable speech synthesis.

**Performance:** Order-of-magnitude speed-up over autoregressive Tacotron 2 at synthesis, with comparable speech quality. Easily extendable to multi-speaker setting.

**Update Notes:** Two modifications improve quality: (1) HiFi-GAN vocoder reduces noise, (2) blank token between input tokens improves pronunciation. Pretrained model and config available.

## Architecture

### Core Components (from source code analysis)

| File | Purpose |
|------|---------|
| `models.py` | Core model: TextEncoder, FlowSpecDecoder, FlowGenerator (326 lines) |
| `modules.py` | Building blocks: ActNorm, InvConvNear, CouplingBlock, ConvReluNorm |
| `attentions.py` | Encoder with multi-head self-attention, LayerNorm, FFN, CouplingBlock |
| `monotonic_align/` | Cython implementation of Maximum Path search (MAS algorithm) |
| `train.py` | DDP distributed training with apex mixed-precision, TensorBoard logging |
| `data_utils.py` | TextMelLoader dataset + TextMelCollate for batching |
| `commons.py` | Utility functions: Adam optimizer with warmup scheduler, losses, sequence ops |

### Model Architecture

```
TextEncoder (n_vocab → hidden → out_channels):
  - Embedding → ConvReluNorm (optional prenet)
  - Transformer Encoder (n_heads, n_layers)
  - DurationPredictor: text duration estimation (logw)
  - Projects to mean (x_m) and log-variance (x_logs)

FlowSpecDecoder (latent → mel spectrogram):
  - n_blocks of [ActNorm → InvConvNear → CouplingBlock]
  - Each CouplingBlock: WN (WaveNet-style dilated convolutions)
  - Squeeze/unsqueeze operations for channel manipulation

FlowGenerator (end-to-end):
  - TextEncoder + FlowSpecDecoder + Speaker Embedding (optional)
  - Training: MLE loss + Duration loss (dual objective)
  - Inference: Duration prediction → path generation → reverse flow
```

### Training Setup
- **Dataset:** LJ Speech (single speaker), extendable to multi-speaker
- **Optimizer:** Adam with warmup scheduler
- **Distributed:** DDP (multi-GPU), apex mixed-precision (O1)
- **Loss:** `l_mle` (maximum likelihood) + `l_length` (duration)
- **Batch:** Configurable batch size, 8 worker dataloader

### Key Technical Details
- **Monotonic Alignment Search:** Cython-optimized `maximum_path` function uses dynamic programming to find optimal monotonic alignment between text and mel spectrogram
- **Duration Predictor:** 2-layer Conv1d network predicts phoneme durations from encoder output
- **Flow blocks:** 12 blocks of [ActNorm → InvConvNear → CouplingBlock] with WN (WaveNet) conditioning
- **Speaker embedding:** Optional multi-speaker support via embedding layer + global conditioning

### Comparison with Other TTS Models
- **vs Tacotron 2:** Parallel (not autoregressive), order-of-magnitude faster synthesis, no external teacher aligner needed
- **vs FastSpeech:** No external aligner (self-supervised MAS vs teacher-student distillation)
- **vs VITS:** VITS later combined Glow-TTS + HiFi-GAN into end-to-end model; Glow-TTS is the flow-based acoustic model precursor

### Environments
- Python 3.6.9, PyTorch 1.2.0, librosa 0.7.1
- NVIDIA Apex for mixed-precision training (commit: 37cdaf4)
- HiFi-GAN submodule for vocoder (improved quality variant)
