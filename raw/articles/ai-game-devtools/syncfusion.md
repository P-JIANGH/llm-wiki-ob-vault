# SyncFusion — Raw Source

**Source:** https://github.com/mcomunita/syncfusion
**Paper:** https://arxiv.org/abs/2310.15247
**Webpage:** https://mcomunita.github.io/syncfusion-webpage/
**Publication:** ICASSP 2024 (IEEE International Conference on Acoustics, Speech and Signal Processing)

## Authors
Marco Comunità (Queen Mary University of London), Riccardo F. Gramaccioni (Sapienza University of Rome), Emilian Postolache (Sapienza), Emanuele Rodolà (Sapienza), Danilo Comminiello (Sapienza), Joshua D. Reiss (Queen Mary University of London)

## Abstract
Sound design involves creatively selecting, recording, and editing sound effects for various media like cinema, video games, and virtual/augmented reality. One of the most time-consuming steps when designing sound is synchronizing audio with video. In some cases, environmental recordings from video shoots are available, which can aid in the process. However, in video games and animations, no reference audio exists, requiring manual annotation of event timings from the video.

SyncFusion proposes a system to extract repetitive actions onsets from a video, which are then used — in conjunction with audio or textual embeddings — to condition a diffusion model trained to generate a new synchronized sound effects audio track. This leaves complete creative control to the sound designer while removing the burden of synchronization with video. Editing the onset track or changing the conditioning embedding requires much less effort than editing the audio track itself, simplifying the sonification process.

## Architecture

### Two-Model Pipeline

#### 1. Onset Model (Video → Onset Track)
- **Input:** Video frames (from Greatest Hits dataset)
- **Output:** Binary onset track (timestamps of repetitive actions)
- **Architecture:** VideoOnsetNet (ResNet-based video encoder + temporal classifier)
- **Training:** PyTorch Lightning CLI, BCE loss with positive/negative weighting
- **Data Augmentation:** Optional temporal augmentation for robustness
- **Metrics:** Average Precision, Binary Accuracy, Number of Onsets Accuracy
- **Config:** `cfg/model/model-onset.yaml`, `cfg/data/data-onset-greatesthit.yaml`

#### 2. Diffusion Model (Onsets + Conditioning → Audio)
- **Input:** Onset track + conditioning (audio embeddings OR text embeddings)
- **Output:** Synchronized Foley sound effects audio waveform
- **Architecture:**
  - `audio_diffusion_pytorch.DiffusionModel` — core diffusion backbone
  - `Encoder1d` — onsets encoder (projects onset track to latent space)
  - CLAP (630k-audioset-best.pt) — frozen audio/text embedder for conditioning
- **Training:** Hydra config, AdamW optimizer, WandB logging with audio/spectrogram samples
- **Conditioning modes:** Audio conditioning (CLAP audio embedding) or Text conditioning (CLAP text embedding)
- **Inference:** Can use ground-truth onsets OR predicted onsets from onset model
- **Config:** `exp/model/diffusion.yaml`, `exp/train_diffusion_gh.yaml`

### Key Files
- `main/module_diffusion.py` — Diffusion Lightning module with CLAP embedder integration, SampleLogger callback for WandB audio logging
- `main/module_onset.py` — Onset Lightning module with BCLoss (weighted BCE), metrics computation (AP/Acc/OnsetNumAcc)
- `main/onset_net.py` — VideoOnsetNet architecture
- `main/resnet.py` — ResNet backbone for video frame encoding
- `main/datamodule_diffusion.py` — WebDataset-based diffusion dataloader
- `main/datamodule_onset.py` — Onset model dataloader
- `CondFoleyGen/` — Conditional Foley Generation baseline (used for comparison)
- `script/` — Training/testing/evaluation shell scripts for both models

### Dataset
- **Greatest Hits** (https://andrewowens.com/vis/) — videos of objects being struck, with synchronized audio-visual onsets
- Pre-processed shards available on Zenodo: https://zenodo.org/records/12634671
- Checkpoints on Zenodo: https://zenodo.org/records/12634630

### Dependencies
- Python < 3.10
- PyTorch 1.13.1, PyTorch Lightning 2.1.3
- audio-diffusion-pytorch 0.1.3
- laion-clap 1.1.4, transformers 4.30.2
- librosa 0.10.1, torchaudio 0.13.1
- webdataset 0.2.86
- hydra-core 1.3.2
- WandB for experiment tracking

### License
Not explicitly specified in repository (no LICENSE file found).

## Game Dev Relevance
- **Foley Sound Generation:** Automatically generates synchronized sound effects for game actions (footsteps, object impacts, weapon hits) from gameplay video/animations
- **No Manual Timing:** Removes the need for sound designers to manually annotate when sounds should play
- **Multi-modal Conditioning:** Can use reference audio (style transfer) or text prompts (creative direction) to control the generated sounds
- **Editable Pipeline:** Edit onset timing track (much easier than editing audio) to adjust synchronization
