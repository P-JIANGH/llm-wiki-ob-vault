---
title: Wav2Lip
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, video, animation, avatar, open-source, tool]
sources: [raw/articles/ai-game-devtools/wav2lip.md]
---

# Wav2Lip: Accurately Lip-syncing Videos In The Wild

**GitHub:** [Rudrabha/Wav2Lip](https://github.com/Rudrabha/Wav2Lip)
**Paper:** ACM Multimedia 2020 — "A Lip Sync Expert Is All You Need for Speech to Lip Generation In The Wild"
**Authors:** Prajwal K R, Rudrabha Mukhopadhyay, Vinay P. Namboodiri, C.V. Jawahar (IIIT Hyderabad)

## Overview

Wav2Lip is a deep learning model that accurately lip-syncs any video to any target audio. It works for any identity, voice, language, and even CGI faces and synthetic voices. The core insight is using a pre-trained expert lip-sync discriminator (SyncNet) as a perceptual loss during training — hence the paper title "A Lip Sync Expert Is All You Need."

## Architecture

### Generator (Wav2Lip)
- **U-Net style encoder-decoder** with audio conditioning
- **Face Encoder:** 6-stage conv downscaling (96×96 → 1×1), taking concatenated [masked_face + original_face] as input
- **Audio Encoder:** Processes mel-spectrogram chunks (80×16) → 512-dim embedding
- **Face Decoder:** 7-stage transposed conv upscaling with skip connections from face encoder
- **Output:** 96×96 RGB face frame with synthesized lip movements

### Expert Discriminator (SyncNet)
- Dual-branch network encoding both audio and face sequences into a shared embedding space
- Cosine similarity between audio and face embeddings measures lip-sync accuracy
- Pre-trained on LRS2 dataset, then used frozen as perceptual loss

### Visual Quality Discriminator (Wav2Lip_disc_qual)
- Optional adversarial discriminator focused on the lower face (lip region)
- Improves visual quality at slight cost to lip-sync accuracy
- Trained in the HQ variant (hq_wav2lip_train.py)

## Key Technical Details

| Parameter | Value |
|-----------|-------|
| Input face resolution | 96×96 |
| Mel-spectrogram | 80 channels, 16-frame chunks |
| Audio sample rate | 16000 Hz |
| Frame rate | 25 FPS |
| Training dataset | LRS2 (Oxford Lip Reading Sentences) |
| Face detection | S3FD (face_alignment) |

## Inference Pipeline

1. **Face detection** — S3FD detects faces in each frame, with temporal smoothing
2. **Audio processing** — ffmpeg extracts audio → librosa computes mel-spectrogram
3. **Frame-audio alignment** — Mel chunks aligned to video frames at 80/25 ratio
4. **Generation** — Wav2Lip generates lip-synced face patches per batch
5. **Composition** — Generated faces pasted back onto original frames
6. **Mux** — ffmpeg merges generated video with original audio

## Models Available

| Model | Description | Quality |
|-------|-------------|---------|
| Wav2Lip | Standard model | Highly accurate lip-sync |
| Wav2Lip + GAN | With visual quality discriminator | Slightly inferior sync, better visual quality |
| Wav2Lip HD | 192×288 output (commercial) | Higher resolution |

## Usage

```bash
python inference.py --checkpoint_path wav2lip.pth --face video.mp4 --audio audio.wav
```

Output saved to `results/result_voice.mp4` by default.

## License

**Non-commercial only** — trained on LRS2 dataset which restricts commercial use. For commercial requests, contact the authors at [Sync.so](https://sync.so).

## Related

- [[sadtalker]] — CVPR 2023 audio-driven portrait animation with 3DMM
- [[geneface]] — ICLR 2023 3D talking face with NeRF rendering
- [[hallo]] — Fudan University audio-driven portrait with SD 1.5 + AnimateDiff
