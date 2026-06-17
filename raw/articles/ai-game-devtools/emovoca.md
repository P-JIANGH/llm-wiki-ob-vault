# EmoVOCA — Speech-Driven Emotional 3D Talking Heads

Source: https://github.com/miccunifi/EmoVOCA
Published: WACV 2025
Authors: Federico Nocentini, Claudio Ferrari, Stefano Berretti (MICC, University of Florence)
License: CC BY-NC 4.0

## Overview

EmoVOCA is a data-driven framework for generating speech-driven emotional 3D talking head animations. It addresses the lack of comprehensive 3D datasets that combine diversity in spoken sentences with a variety of facial expressions.

The key innovation is a synthetic dataset creation technique that combines inexpressive 3D talking heads (from VOCASET) with expressive 3D sequences (from Florence 4D Facial Expression Dataset) to produce emotionally-aware talking head animations.

## Architecture

### DE-SD Framework (Dataset Generation)
- Two separate Spiral Autoencoders encode talking and expressive 3D head displacements
- Common decoder reconstructs combined displacements
- At inference, latent vectors from both encoders are concatenated
- Outputs: combination of speech-driven lip movements + expressive facial traits
- Uses FLAME 3D face model (5023 vertices)
- Spiral Convolution on mesh geometry for encoding/decoding

### ES2L Framework (Emotional Speech to Landmarks)
- Audio → 3D facial landmarks pipeline
- Uses Wav2Vec2 (facebook/wav2vec2-base-960h) for audio feature extraction
- Input: audio + emotion label + intensity + actor landmarks
- Output: 68 facial landmarks (3D coordinates, sequence)

### ES2D Framework (Emotional Speech to 3D Mesh)
- Landmarks → 3D mesh vertices pipeline
- Spiral Decoder converts landmark displacements to full mesh
- Output: per-frame 3D meshes (PLY format)

### Demo Pipeline
1. Audio input → Wav2Vec2 features
2. ES2L: audio + emotion + intensity → 3D landmarks
3. ES2D: landmarks → 3D mesh sequence
4. Render: pyrender + OpenCV → MP4 video with synced audio

## Key Technical Details

- **Mesh Processing**: trimesh library, spiral convolutions on mesh topology
- **Audio Processing**: librosa, Wav2Vec2 (768-dim features, 16kHz)
- **Rendering**: pyrender (OpenGL), ffmpeg for video composition
- **3D Face Model**: FLAME (5023 vertices, 68 landmarks)
- **Spiral Autoencoder**: 5-level pyramid (downsampling factors [4,4,4,4])
  - Encoder filters: [3, 16, 32, 64, 128]
  - Decoder filters: [128, 64, 32, 32, 16]
  - Latent size: 256 (DE-SD), 16 (ES2D)

## Emotion Categories (11 labels)
Afraid(0), Disgust(1), Irritated(2), Sad(3), Smile/Happy(4), Drunk(5), Ill(6), Moody(7), Pleased(8), Suspicious(9), Upset(10)

## Intensity Levels
Low(0), Mid(1), High(2)

## Datasets Required
- VOCASET: 3D talking head sequences with audio
- Florence 4D Facial Expression Dataset: expressive 3D sequences
- Both require authorization to access

## Pretrained Models
Three models released:
1. `emovoca_generator.tar` — DE-SD framework for dataset generation
2. `es2l.tar` — ES2L: Speech → Landmarks
3. `es2d.tar` — ES2D: Landmarks → 3D Mesh

## Tech Stack
Python 3.8, PyTorch 2.1.0 (CUDA 12.1), trimesh, pyrender, librosa, OpenCV, scikit-learn, transformers (Wav2Vec2), ffmpeg

## GitHub
https://github.com/miccunifi/EmoVOCA

## Project Page
https://fedenoce.github.io/emovoca/

## Paper
https://arxiv.org/abs/2403.12886
