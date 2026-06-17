# Wav2Lip: Accurately Lip-syncing Videos In The Wild

**Source:** https://github.com/Rudrabha/Wav2Lip
**Paper:** ACM Multimedia 2020
**Authors:** Prajwal K R, Rudrabha Mukhopadhyay, Vinay P. Namboodiri, C.V. Jawahar

## Overview

Wav2Lip is a deep learning model for accurate lip-syncing of videos. Given any video and any audio, it generates a new video where the person's lip movements are synchronized to the audio. Works for any identity, voice, language, CGI faces, and synthetic voices.

## Architecture

### Wav2Lip Model (Generator)
- **Input:** Face frames (96x96) + mel-spectrogram chunks (80x16)
- **Face Encoder:** 6-stage convolutional encoder (96x96 → 1x1), channels 6→16→32→64→128→256→512
  - Input: concatenated [masked_face, original_face] where lower half of face is zeroed out
- **Audio Encoder:** 5-stage conv encoder processing 2D mel-spectrogram, output 512-dim embedding
- **Face Decoder:** 7-stage transposed conv decoder with skip connections from face encoder (U-Net style)
  - At each decoder stage, concatenates audio embedding + face encoder features
- **Output Block:** Conv layers → 3-channel RGB face output with sigmoid activation

### Wav2Lip_disc_qual (Visual Quality Discriminator)
- Separate discriminator trained adversarially to improve visual quality
- Takes only the lower half of the generated face (lip region)
- Outputs binary real/fake prediction

### SyncNet_color (Expert Lip-Sync Discriminator)
- **Purpose:** Pre-trained expert that judges lip-sync accuracy
- **Face Encoder:** Processes 5 consecutive face frames (15 channels = 5x3 RGB) stacked temporally
- **Audio Encoder:** Same architecture as Wav2Lip audio encoder
- **Output:** Cosine similarity between audio and face embeddings
- Used as a perceptual loss during training, not for inference

## Key Training Details

1. **Two-stage training:**
   - Stage 1: Train SyncNet expert discriminator on LRS2 dataset
   - Stage 2: Train Wav2Lip model using SyncNet as perceptual loss
2. **Dataset:** LRS2 (Oxford LRS2 lip reading dataset)
3. **Hyperparameters:** img_size=96, fps=25, batch_size=16, sample_rate=16000
4. **Mel-spectrogram:** 80 channels, hop_size=200, n_fft=800, fmax=7600
5. **Loss functions:** Sync loss (lip-sync accuracy) + L1 reconstruction + GAN loss (visual quality)

## Inference Pipeline

1. Extract frames from input video using OpenCV
2. Detect faces using S3FD (from face_alignment library)
3. Smooth face bounding boxes over temporal window (T=5)
4. Extract mel-spectrogram from audio (ffmpeg → librosa)
5. Chunk mel-spectrogram at 80/25=3.2 frames per step, chunk_size=16
6. For each chunk: create masked face input, run Wav2Lip model
7. Paste generated lip region back onto original frame
8. Merge audio with generated video via ffmpeg

## Project Structure

```
wav2lip/
├── models/
│   ├── wav2lip.py          # Main generator model (Wav2Lip + Wav2Lip_disc_qual)
│   ├── syncnet.py          # Expert discriminator (SyncNet_color)
│   └── conv.py             # Custom Conv2d/Conv2dTranspose wrappers
├── face_detection/         # S3FD face detector (ported from face_alignment)
├── inference.py            # Single-command inference script
├── wav2lip_train.py        # Wav2Lip training script
├── hq_wav2lip_train.py     # Training with visual quality discriminator
├── color_syncnet_train.py  # SyncNet expert training
├── preprocess.py           # Dataset preprocessing (video → frames + audio)
├── audio.py                # Mel-spectrogram extraction utilities
├── hparams.py              # All hyperparameters
├── evaluation/             # Evaluation scripts + test filelists (LRS2/LRS3/LRW)
└── filelists/              # Train/val/test split text files
```

## Commercial vs Open Source

The GitHub README now primarily promotes Sync.so commercial API (sync.so). The open-source version:
- Trained on LRS2 only — commercial use strictly prohibited
- Lower quality than commercial models
- Weights available on Google Drive
- Non-commercial/research/personal use only

## License

Non-commercial use only (trained on LRS2 dataset). For commercial use, contact the authors at sync.so.
